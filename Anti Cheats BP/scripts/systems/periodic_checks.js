import { world, system, Player, EffectType, EntityDamageCause, GameMode } from "@minecraft/server";
import { CONFIG as config, i18n } from "../config.js";
// import { sendMessageToAdmins, saveLogToFile, LOG_FILE_PREFIX } from "../assets/util.js";
// import { logDebug } from "../assets/util.js"; // Assuming logDebug is in util.js or assets/util.js

// Define the playerInternalStates Map
export const playerInternalStates = new Map();

// Helper Functions for State Management
export function initializePlayerState(playerId, initialLocation, currentTick) {
    const newState = {
        lastLocation: { x: initialLocation.x, y: initialLocation.y, z: initialLocation.z },
        fallDistanceCustom: 0,
        lastPositionY: initialLocation.y,
        speedVL: 0,
        flyVL: 0,
        nukerVLBreak: 0,
        lastGroundTime: currentTick,
        deepValuableOresBrokenThisTick: 0 // Add this line
    };
    playerInternalStates.set(playerId, newState);
    // logDebug(`Initialized internal state for player ${playerId}`);
}

export function removePlayerState(playerId) {
    const deleted = playerInternalStates.delete(playerId);
    if (deleted) {
        // logDebug(`Removed internal state for player ${playerId}`);
    } else {
        // logDebug(`Attempted to remove state for player ${playerId}, but no state was found.`);
    }
}

export function getPlayerState(playerId) {
    const state = playerInternalStates.get(playerId);
    if (!state) {
        // This case should ideally be prevented by robust join/leave event handling.
        // // logDebug(`[WARNING] No internal state found for player ${playerId}. This might indicate an issue with state initialization on join.`);
        // Depending on strictness, could return a default state or null/undefined.
        // For now, returning what Map.get() returns (undefined if not found) is acceptable.
    }
    return state;
}
import { ACModule } from "../classes/module.js";
import { Vector3Utils } from "../classes/vector3utils.js";

// Log arrays and constants
export const MAX_LOG_ENTRIES = 100; // Define how many entries to keep in memory
export let inMemoryCommandLogs = [];
export let inMemoryPlayerActivityLogs = [];

let currentTickCounter = 0;

// Beta Features Warning (if used)
function betaFeatures() {
    if (config.enable_beta_features_warning) {
        world.sendMessage(i18n("system.beta_features_enabled"));
    }
}

// --- Main Tick-Based Interval (Fly, Speed, NoFall updates, etc.) ---
system.runInterval(() => {
    currentTickCounter++;

    for (const player of world.getAllPlayers()) {
        const playerVelocity = player.getVelocity();
        const isPlayerOnGround = player.isOnGround;

        const state = getPlayerState(player.id);
        if (!state) {
            // This case should ideally not happen if join/leave events are correctly handled.
            // If it does, it might mean a player existed before the script fully initialized their state
            // or an issue with leave event. For safety, log and skip this player for this tick.
            console.warn(`[AntiCheats_PeriodicChecks] No state found for player ${player.name} (${player.id}). Skipping tick.`);
            continue; 
        }
        state.deepValuableOresBrokenThisTick = 0; // Add this line to reset before any other logic uses it for the current tick
        const lastTickPos = state.lastLocation; // Use state.lastLocation

        // Update fall distance for NoFall
        if (ACModule.isActive("nofall")) {
            let currentFallDistance = state.fallDistanceCustom;
            if (!isPlayerOnGround && player.location.y < state.lastPositionY) {
                state.fallDistanceCustom = currentFallDistance + (state.lastPositionY - player.location.y);
            } else if (isPlayerOnGround) {
                // If player is on ground, fall distance is typically reset by the entityHurt event
                // after damage calculation, or here if no damage (e.g. creative mode flight landing)
                // For now, we only accumulate. Resetting logic is primarily in entityHurt or when changing to fly modes.
                // If a more immediate reset on landing is needed here (outside of damage):
                // state.fallDistanceCustom = 0; // Uncomment if reset is desired here always on ground
            }
            state.lastPositionY = player.location.y;
        }


        // --- 10-Tick Interval Checks (Speed, Fly) ---
        if (currentTickCounter % 10 === 0) {
            const movementSpeed = Vector3Utils.magnitude({ x: playerVelocity.x, y: 0, z: playerVelocity.z }); // Horizontal speed
            const maxSpeed = player.isSprinting ? config.max_sprint_speed : config.max_walk_speed;

            // Speed Check
            if (ACModule.isActive("speed") && movementSpeed > maxSpeed && !player.hasEffect(EffectType.get("speed")) && !player.isFlying) {
                state.speedVL = (state.speedVL || 0) + 1;
                if (state.speedVL >= config.speed_detection_threshold) {
                    // sendMessageToAdmins("detection.speed_detected_admin", { player: player.name, speed: movementSpeed.toFixed(2), max_speed: maxSpeed, vl: state.speedVL });
                    if (config.speed_punish) { /* Implement punishment */ }
                    state.speedVL = 0;
                }
            }

            // Fly Check (basic ground check)
            let lastGroundTime = state.lastGroundTime;
            if (ACModule.isActive("fly") && !isPlayerOnGround && !player.isFlying && !player.hasEffect(EffectType.get("levitation")) && (system.currentTick - lastGroundTime > config.fly_max_air_time_ticks)) {
                // More sophisticated checks: e.g., vertical speed, obstacles, gliding
                state.flyVL = (state.flyVL || 0) + 1;
                if (state.flyVL >= config.fly_detection_threshold) {
                    // sendMessageToAdmins("detection.fly_detected_admin", { player: player.name, vl: state.flyVL });
                    if (config.fly_punish) { /* Implement punishment */ }
                    state.flyVL = 0;
                }
            } else if (isPlayerOnGround) {
                state.lastGroundTime = system.currentTick;
                state.flyVL = 0; // Reset VL when on ground
            }

            // Nuker VL decay/check
            if (ACModule.isActive("nuker")) {
                let nukerBreakVl = state.nukerVLBreak || 0; // Read from state
                if (nukerBreakVl > config.nuker_max_breaks_per_interval) {
                     // sendMessageToAdmins("detection.nuker_detected_admin", { player: player.name, blocks: nukerBreakVl });
                     if (config.nuker_punish) { /* punishment */ }
                }
                state.nukerVLBreak = 0; // Reset in state
            }
        }

        // Update player position for next tick
        state.lastLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
    }
}, 1); // Run every tick for core checks like NoFall updates

// --- Night Vision Detection Interval ---
if (ACModule.isActive("nightvision")) {
    system.runInterval(() => {
        for (const player of world.getAllPlayers()) {
            if (player.hasEffect(EffectType.get("night_vision"))) {
                const effect = player.getEffect(EffectType.get("night_vision"));
                // Check if duration is unnaturally long or amplifier too high if not given by admin commands
                // This requires tracking how players get effects, which is complex.
                // A simpler check could be if they have it for > X minutes without admin intervention.
                // For now, this is a placeholder for more specific logic.
                // Example: if (effect.duration > config.night_vision_max_duration && !isAdmin(player)) { ... }
            }
        }
    }, config.night_vision_check_interval_ticks);
}

// --- Log Saving Interval ---
if (config.enable_log_saving) {
    system.runInterval(() => {
        if (inMemoryCommandLogs.length > 0) {
            // saveLogToFile(LOG_FILE_PREFIX.COMMAND, inMemoryCommandLogs.map(log => `[${log.timestamp}] ${log.player}: ${log.command}`).join("\n"));
            inMemoryCommandLogs = []; // Clear after saving
        }
        if (inMemoryPlayerActivityLogs.length > 0) {
            // saveLogToFile(LOG_FILE_PREFIX.ACTIVITY, inMemoryPlayerActivityLogs.map(log => `[${log.timestamp}] ${log.player}: ${log.activity}`).join("\n"));
            inMemoryPlayerActivityLogs = []; // Clear after saving
        }
    }, config.log_save_interval_ticks);
}

// --- Vanish Reminder Interval ---
if (ACModule.isActive("vanish")) {
    system.runInterval(() => {
        for (const player of world.getAllPlayers()) {
            if (player.hasTag("vanished") && player.hasAdmin()) {
                player.onScreenDisplay.setActionBar(i18n("system.vanish_reminder"));
            }
        }
    }, config.vanish_reminder_interval_ticks);
}

// Call betaFeatures on load if enabled
betaFeatures();

// No explicit exports needed for the intervals themselves as they are self-running.
// Log arrays are exported for other modules to use.
// currentTickCounter is module-local.
// betaFeatures is module-local and called on load.
