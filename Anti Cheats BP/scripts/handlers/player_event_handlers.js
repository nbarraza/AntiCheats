import { world, system } from "@minecraft/server"; // Ensure world and system are imported
import { CONFIG as config, i18n } from "../config.js";
import { sendMessageToAdmins, getScore, getPlayerRank, 효율, logDebug } from "../util.js"; // Assuming 효율 is still needed, otherwise remove
import { ACModule } from "../classes/module.js";
import { seedGlobalBanList } from "../assets/global_ban_list.js"; // Assuming this is used or will be used
import { inMemoryPlayerActivityLogs, MAX_LOG_ENTRIES, initializePlayerState, removePlayerState } from "../systems/periodic_checks.js";

const gamertagRegex = /^[a-zA-Z0-9_ ]{3,16}$/; // Max length 16 for Xbox, 3-24 generally

// Function to add player activity log
function addPlayerActivityLog(player, activity) {
    if (inMemoryPlayerActivityLogs.length >= MAX_LOG_ENTRIES) {
        inMemoryPlayerActivityLogs.shift(); // Remove the oldest entry
    }
    inMemoryPlayerActivityLogs.push({
        timestamp: new Date().toISOString(),
        player: player.name,
        activity: activity
    });
}

// Player Join Event
world.afterEvents.playerJoin.subscribe((eventData) => {
    const player = eventData.player;
    const playerId = player.id;
    const initialLocation = player.location;
    const currentTick = system.currentTick;

    initializePlayerState(playerId, initialLocation, currentTick);

    addPlayerActivityLog(player, "joined");

    // Global Ban Check
    if (seedGlobalBanList.includes(player.name)) {
        player.kick(i18n.getText("system.global_ban_kick_message", {}, player));
        sendMessageToAdmins("system.global_ban_alert", { player: player.name });
        return; // Stop further processing for banned player
    }

    // Gamertag validation
    if (!gamertagRegex.test(player.name)) {
        player.kick(i18n.getText("system.invalid_gamertag_kick", {}, player));
        sendMessageToAdmins("system.invalid_gamertag_alert", { player: player.name });
        return;
    }

    // Welcome message
    if (config.enable_welcome_message) {
        player.sendMessage(i18n.getText("system.welcome_message", { player: player.name }, player));
    }

    // Admin join notification
    if (player.hasTag("admin")) {
        sendMessageToAdmins("system.admin_join_notification", { player: player.name }, true); // true to exclude self
    }

    // Dynamic property initialization for modules (example)
    ACModule.getAllModules().forEach(module => {
        if (module.dynamicProperties && player.getDynamicProperty(module.id) === undefined) {
            player.setDynamicProperty(module.id, module.defaultDynamicValue);
        }
    });
});

// Player Leave Event
world.afterEvents.playerLeave.subscribe((eventData) => {
    const playerName = eventData.playerName; // In case player object is not available
    const playerId = eventData.playerId;

    // It's good practice to ensure player object exists if needed for addPlayerActivityLog
    // However, for removePlayerState, only playerId is needed.
    // The 'player' variable was defined as eventData.player which might be undefined on leave.
    // For addPlayerActivityLog, if it requires a Player object, it might need adjustment
    // or to use a placeholder if the full Player object isn't guaranteed.
    // For now, assuming addPlayerActivityLog can handle 'playerName' if 'player' object is not fully available.
    // If addPlayerActivityLog strictly needs a Player object, this might be:
    // const playerForLog = world.getPlayer(playerName);
    // if(playerForLog) addPlayerActivityLog(playerForLog, ...); else addPlayerActivityLog({name: playerName}, ...);

    addPlayerActivityLog({ name: playerName }, `left (Reason: ${eventData.cause})`); // Minecraft API does not provide cause directly

    removePlayerState(playerId);
});

// Player Dimension Change Event
world.afterEvents.playerDimensionChange.subscribe((eventData) => {
    const player = eventData.player;
    addPlayerActivityLog(player, `changed dimension from ${eventData.oldDimension.identifier} to ${eventData.newDimension.identifier}`);
    // Example: Resetting fall distance to prevent false positives in NoFall detection
    player.setDynamicProperty("fall_distance_custom", 0);
});

// Player Spawn Event
world.afterEvents.playerSpawn.subscribe((eventData) => {
    const player = eventData.player;
    if (eventData.initialSpawn) {
        addPlayerActivityLog(player, "initially spawned");
        // Perform actions specific to the very first time a player spawns in the world

        // Set player language preference based on their client locale
        try {
            const playerLocale = player.locale;
            const availableLanguages = i18n.getAvailableLanguages(); // Ensure i18n is imported

            if (availableLanguages.includes(playerLocale)) {
                player.setDynamicProperty("ac:user_language", playerLocale);
                logDebug(`[PlayerLang] Set language for ${player.name} to ${playerLocale} based on client locale.`);
            } else {
                logDebug(`[PlayerLang] Player ${player.name}'s locale ${playerLocale} is not in available languages: [${availableLanguages.join(', ')}]. User language not set.`);
            }
        } catch (e) {
            logDebug(`[PlayerLang] Error setting language for ${player.name}: ${e}`);
        }
    } else {
        addPlayerActivityLog(player, "respawned");
        // Perform actions for respawns (e.g., after death)
    }
    // Resetting properties on spawn might be needed for some checks
    // player.setDynamicProperty("last_ground_time", world.currentTick); // Will be handled by internal state
    // player.setDynamicProperty("last_position_y", player.location.y); // Will be handled by internal state
    // For spawn, if state needs re-initialization or specific updates (like lastGroundTime):
    const playerState = removePlayerState(player.id); // Remove old state if any (e.g. if player re-logged quickly)
    initializePlayerState(player.id, player.location, system.currentTick); // Re-initialize state
    // Or, more selectively:
    // const state = getPlayerState(player.id);
    // if (state) {
    //     state.lastGroundTime = system.currentTick;
    //     state.lastPositionY = player.location.y;
    //     state.lastLocation = player.location; // Update location on respawn
    // } else {
    //     // This case might happen if player joins and spawns in the same tick, or if there's a leave/join issue
    //     initializePlayerState(player.id, player.location, system.currentTick);
    // }
});

// Player Game Mode Change Event
world.afterEvents.playerGameModeChange.subscribe((eventData) => {
    const player = eventData.player;
    addPlayerActivityLog(player, `game mode changed from ${eventData.oldGameMode} to ${eventData.newGameMode}`);
    if (config.log_gamemode_changes) {
        sendMessageToAdmins("system.gamemode_change_alert", {
            player: player.name,
            old_gamemode: eventData.oldGameMode,
            new_gamemode: eventData.newGameMode
        });
    }
});

// Export functions if they need to be called from elsewhere.
// For event subscriptions, side effects are often enough.
// addPlayerActivityLog might be useful elsewhere if direct logging is needed outside events.
export { addPlayerActivityLog, gamertagRegex };
