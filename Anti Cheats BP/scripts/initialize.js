import * as Minecraft from '@minecraft/server';
import { logDebug, scoreboardAction } from './assets/util';
import * as config from './config';
import { globalBanList } from './assets/globalBanList.js'; // Added import
import { i18n } from './assets/i18n.js'; // Import i18n

const PACKAGED_LANGUAGE_DATA = {
    "en_US": `##bridge-file-version: #3
pack.name=Anti Cheats
pack.description=Anti Cheats Pack
item.ac:admin_panel=Admin Panel
# Player Class Messages
player.warn.manual.approachingBan=§r§6[§eAnti Cheats§6]§4 Warning!§c Next warning from an admin will result in a permanent ban.
player.kick.manualWarnings.3=§r§6[§eAnti Cheats§6]§r §4You are permanently banned.\n§4Reason: §cReaching 3 manual warnings.\n§4Banned by: §cAnti Cheats AntiCheat
player.notify.admin.permBannedForManualWarnings=§r§6[§eAnti Cheats Notify§6]§4 The player §c%%playerName%%§4 was permanently banned for reaching 3 manual warnings.
player.error.invalidModuleForWarning=Invalid module type for setWarning: %%module%%
player.error.failedToSetWarning=Failed to set warning for %%playerName%% with module %%module%%
player.error.failedToClearWarnings=Failed to clear warnings for %%playerName%%
player.error.parsingBanInfo=Error parsing banInfo JSON for player %%playerName%%
player.error.failedToSetBanInfoUnbanned=Failed to set dynamic property for unbanned player %%playerName%% in getBan
player.error.parsingMuteInfo=Error parsing muteInfo JSON for player %%playerName%%
player.error.ban.adminPermission=The player "%%adminName%%" does not have permission to ban
player.error.ban.targetIsAdmin=Player "%%playerName%%" cannot be banned, is admin
player.error.ban.reasonTooLong=Reason length is more than allowed 200 characters long (is %%length%%)
player.error.ban.alreadyBanned=Player "%%playerName%%" is already banned
player.error.ban.logFailed=Failed to generate ban log for %%playerName%%
player.error.ban.setDynamicPropertyFailed=Failed to ban player %%playerName%%
player.notify.admin.banFailed=§c[Anti Cheats] Failed to ban %%playerName%%. Check console for errors.
player.error.unban.failedToSetQueue=Failed to set unbanQueue dynamic property for %%playerName%%
player.error.unban.failedToSetBanInfo=Failed to set banInfo dynamic property for %%playerName%% during unban
player.error.unban.parsingFailed=Error parsing banInfo JSON for player %%playerName%% during unban. Force clearing ban state.
player.error.freeze.type=Type of freeze is "%%type%%" should be boolean
player.error.freeze.failed=Failed to set freeze status for %%playerName%% to %%status%%
player.error.mute.adminPermission=The player "%%adminName%%" does not have permission to mute
player.error.mute.paramTypeReason=Type of reason is "%%type%%" should be string
player.error.mute.paramTypeDuration=Type of durationMs is "%%type%%" should be number
player.mute.successAdmin=§6[§eAnti Cheats§6]§f You have muted §e%%playerName%%§f for §e%%duration%%.
player.notify.admin.muteSuccess=§6[§eAnti Cheats Notify§6]§e %%playerName%%§f has been muted for §e%%duration%%§f by §e%%adminName%%§f. Reason: §e%%reason%%§f
player.error.mute.failed=Failed to mute player %%playerName%%
player.notify.admin.muteFailed=§c[Anti Cheats] Failed to mute %%playerName%%. Check console for errors.
player.error.unmute.notMuted="%%playerName%%" is not muted
player.error.unmute.failed=Failed to unmute player %%playerName%%
player.notify.admin.banLogError=§6[§eAnti Cheats§6]§c There was an error creating a ban log for §4%%playerName%%§c Error: \n§4%%error%%
player.error.mute.adminInstance=Parameter "adminPlayer" is not instanceof player
player.error.invalidModuleReference="%%moduleName%%" isn't a safeguard module.
# Command Messages
command.panel.noPermission=§cYou do not have permission to use this command.
command.ban.usage=§cUsage: .ban <player name> [reason]
command.ban.notFound=§6[§eSafeGuard§6]§f Player §e%%targetName%%§f was not found
command.ban.self=§6[§eSafeGuard§6]§f Cannot execute this command on yourself!
command.ban.success=§6[§eSafeGuard§6]§f Successfully banned §e%%targetName%%§f for: %%reason%%
command.ban.error=§cAn error occurred while trying to ban the player. Please check the console.
command.unban.usage=§cUsage: .unban <player name>
command.unban.error=§cAn error occurred while trying to unban the player. Please check the console.
command.invsee.notFound=§6[§eSafeGuard§6]§f Player §e%%targetName%%§f was not found
command.invsee.targetIsAdmin=§6[§eSafeGuard§6]§f Can't view the inventory of §e%%targetName%%§f, they're an admin.
command.invsee.error=§cAn error occurred while trying to view inventory. Please check the console.
command.copyinv.notFound=§6[§eAnti Cheats§6]§f Player §e%%targetName%%§f was not found
command.copyinv.targetIsAdmin=§6[§eAnti Cheats§6]§f Can't copy the inventory of §e%%targetName%%§f, they're an admin.
command.copyinv.error=§cAn error occurred while trying to copy inventory. Please check the console.
command.mute.usage=§6[§eSafeGuard§6]§f Usage: !mute <player name> [time S | M | H | D] [reason]
command.mute.error.missingQuote=§6[§eSafeGuard§6]§f Invalid format! Closing quotation mark missing for player name.
command.mute.notFound=§6[§eSafeGuard§6]§f Player §e%%playerName%%§f was not found.
command.mute.error.invalidTimeFormat=§6[§eSafeGuard§6]§f Usage: !mute <player name> [time S | M | H | D] [reason]. Invalid time format.
command.mute.error.invalidTimeUnit=§6[§eSafeGuard§6]§f Invalid time unit. Use S, M, H, or D.
command.mute.error=§cAn error occurred while trying to mute the player. Please check the console.
command.summon_npc.error=§cAn error occurred while trying to summon the NPC. Please check the console.
command.vanish.error=§cAn error occurred while trying to toggle vanish. Please check the console.
command.notify.error=§cAn error occurred while trying to toggle notifications. Please check the console.
# General UI Messages
ui.main.title=User Interface
ui.main.button.playerList=Player List
ui.playerlist.comingSoon=Player list coming soon!
ui.error.generic=An error occurred with the User Interface. Please try again.
ui.playerlist.title=Online Players
ui.playerlist.category.owners=§l§c-- Owners --
ui.playerlist.category.admins=§l§6-- Admins --
ui.playerlist.category.members=§l§a-- Members --
ui.playerlist.noneOnline=None online.
ui.button.back=Back
ui.playerlist.label.owner=§c[Owner] 
ui.playerlist.label.admin=§6[Admin] 
# General Terms
general.term.permanent=permanent
# Chat Messages (Index.js)
chat.mute.status=§6[§eAnti Cheats§6]§4 You were muted by §c%%adminName%%§4 Time remaining: §c%%timeRemaining%% §4reason: §c%%reason%%
chat.spam.kick.invalidPacket=§6[§eAnti Cheats§6]§r You have been permanently banned for sending invalid packet.
chat.spam.notify.invalidPacketAdmin=§6[§eAnti Cheats Notify§6]§c %%playerName%%§4 was automatically banned for sending an invalid text packet (length=%%length%%)
chat.spam.error.repeating=§r§c Please don't send repeating messages!
chat.spam.error.commandsTooQuick=§r§c You're sending commands too quickly!
chat.spam.error.tooQuick=§r§c You're sending messages too quickly!
chat.spam.error.tooLong=§r§c Sorry! Your message has too many characters!
chat.spam.error.tooManyWords=§r§c Please keep your message below %%maxWords%% words!
chat.error.commandProcessing=§cAn error occurred while processing your command.
chat.error.generalChatProcessing=§cAn error occurred processing your chat message.
# Player Event Messages (Index.js)
chat.namespoof.kickMessage=§6[§eAnti Cheats§6]§r You have been permanently banned for namespoof.
chat.namespoof.adminNotify=§6[§eAnti Cheats Notify§6]§r %%playerName%%§r§4 was automatically banned for namespoof
system.setup.warningAdmins=§r§6[§eAnti Cheats§6]§r§4 WARNING! §cThe Anti Cheats is not setup, some features may not work. Please run §7/function setup/setup§c to setup!
system.version.updateNotification=§r§6[§eAnti Cheats§6]§f Anti Cheats has successfully updated to v%%version%%
player.kick.globalBan.default=§r§6[§eAnti Cheats§6]§r §4Your name was found in the global ban list.
player.kick.globalBan.detailed=§r§6[§eAnti Cheats§6]§r §4You are on the global ban list.\n§4Reason: §c%%reason%%\n§4Banned by: §c%%bannedBy%%
player.unban.queue.success=§r§6[§eAnti Cheats§6]§r You were unbanned.
player.kick.existingBan.permanent=§r§6[§eAnti Cheats§6]§r §4You are permanently banned.\n§4Reason: §c%%reason%%\n§4Banned by: §c%%bannedBy%%
player.kick.existingBan.temporary=§r§6[§eAnti Cheats§6]§r §4You are banned.\n§4Time Remaining: §c%%timeRemaining%%\n§4Reason: §c%%reason%%\n§4Banned by: §c%%bannedBy%%
player.kick.deviceBan.adminNotify=§6[§eAnti Cheats§6]§4 The player §c%%playerName%%§4 was kicked for joining on banned device: §c%%deviceType%%
player.kick.deviceBan.playerMessage=§r§6[§eAnti Cheats§6]§r §4Sorry, the administrators have banned the device you are playing on.
player.join.welcomer.firstTime=§r§e%%playerName%%§b is joining for the first time! This realm is protected by §eAnti Cheats§b, enjoy your stay!§r
player.join.welcomer.returning=§r§e%%playerName%%§b is joining on §e%%deviceType%%
player.dimension.lock.endSpawn=§6[§eAnti Cheats§6]§r§4 The end was locked by an admin!
player.dimension.lock.netherSpawn=§6[§eAnti Cheats§6]§r§4 The nether was locked by an admin!
player.combatLog.notify.detected=§r§6[§eAnti Cheats§6]§e %%playerName%%§r Was detected combat logging!
player.combatLog.punish.kill=§r§6[§eAnti Cheats§6]§r You were killed for combat logging
player.combatLog.punish.clearInventory=§r§6[§eAnti Cheats§6]§r Your inventory was cleared for combat logging
player.combatLog.punish.tempBanKick=§r§6[§eAnti Cheats§6]§r You were temporarily banned for combat logging.
player.event.error.spawn=§cAn error occurred during the spawn process. Please notify an admin.
player.dimension.lock.endChange=§6[§eAnti Cheats§6]§r§4 The end was locked by an admin!
player.dimension.lock.netherChange=§6[§eAnti Cheats§6]§r§4 The nether was locked by an admin!
player.event.error.dimensionChange=§cAn error occurred processing your dimension change.
# System & Event Messages (Index.js Part 3)
player.combatLog.expired=§r§6[§eAnti Cheats§6]§r You are no longer in combat.
world.border.reached=§6[§eAnti Cheats§6]§r You reached the border of §e%%distance%%§f blocks!
player.death.coordinates=§6[§eAnti Cheats§6]§r §eYou died at %%x%%, %%y%%, %%z%% (in %%dimension%%)
player.combatLog.warning.initial=§r§6[§eAnti Cheats§6]§r You are now in combat, leaving during combat will result in a punishment.
player.combatLog.warning.reminder=§r§6[§eAnti Cheats§6]§r You are now in combat.
item.adminPanel.noPermission=§6[§eAnti Cheats§6]§r §4You need admin tag to use admin panel!§r
item.adminPanel.error.notSetup=§6[§eAnti Cheats§6]§c§l ERROR: §r§4Anti Cheats not setup!§r
item.adminPanel.error.notSetup.instruction=§6[§eAnti Cheats§6]§r§4 Run §c/function setup/setup§4 to setup Anti Cheats!§r
world.block.break.illegal=§6[§eAnti Cheats§6]§r§c§l §r§c%%playerName%%§4 Attempted to break §c%%blockId%%
world.block.break.notify.diamondOre=§6[§eAnti Cheats§6]§5§l §r§e%%playerName%%§f mined x1 §ediamond ore§r
world.block.break.notify.netheriteOre=§6[§eAnti Cheats§6]§5§l §r§e%%playerName%%§f mined x1 §enetherite ore§r
# Util.js Messages
util.invsee.error.noInventoryComponent="§cCould not retrieve target player's inventory component."
util.invsee.error.noArmorComponent="§cCould not retrieve target player's armor component."
util.invsee.error.general="§cAn error occurred while trying to display the inventory."
util.invsee.title=§6[§eAnti Cheats§6]§f %%playerName%%'s inventory:\n\n
util.invsee.slotItem=§6[§eAnti Cheats§6]§f Slot §e%%slot%%§f: §e%%itemName%%§f x§e%%amount%%
util.invsee.slotItemWithNameTag=§6[§eAnti Cheats§6]§f Slot §e%%slot%%§f: §e%%itemName%%§f x§e%%amount%% §fItem Name: §r%%nameTag%%
util.unbanQueue.alreadyPending=§6[§eAnti Cheats§6]§f The player §e%%playerName%%§f is already pending an unban.
util.unbanQueue.error.saveFailed=§cError saving unban queue. Player may not be unbanned on rejoin.
util.unbanQueue.success=§6[§eAnti Cheats§6]§f The player §e%%playerName%%§f was successfully put into unban queue, they will be unbanned when they join.
util.unbanQueue.error.general=§cAn error occurred while adding player to unban queue.
util.copyInv.error.noInventoryComponent=§cError accessing inventory components.
util.copyInv.error.noArmorComponent=§cError accessing armor/equippable components.
util.copyInv.success=§6[§eAnti Cheats§6]§f Finished copying inventory of §e%%playerName%%
util.copyInv.error.general=§cAn error occurred while copying the inventory.
util.copyInv.error.scheduleFailed=§cAn error occurred while trying to schedule the inventory copy.
util.alert.autoModKick.adminNotify=§6[§eAnti Cheats Notify§6]§r§c %%playerName%%§r was automatically kicked by Anti Cheats AutoMod module. Detection[%%module%% = %%detectionValue%%]
util.alert.autoModKick.playerReason=§6[§eAnti Cheats AutoMod§6]§r You have been detected cheating. Module[%%module%% = %%detectionValue%%]
util.alert.general=§6[§eAnti Cheats§6]§r §c§l%%playerName%%§r§4 was detected using §l§c%%detectionType%%§r§4 with a value of §l§c%%detectionValue%%§r§4!
util.formatMilliseconds.noTimeSet=No time set.
util.formatMilliseconds.days= Days
util.formatMilliseconds.hours= Hours
util.formatMilliseconds.mins= Mins
# Module Messages
modules.reach.notify.adminFlag=§6[§eAnti Cheats Notify§6]§c Player %%playerName%% flagged for Reach (%%reachType%%). Distance: %%actualDistance%%/%%maxAllowedDistance%%
modules.contextualKillaura.notify.adminFlag=§6[§eAnti Cheats Notify§6]§c Player %%playerName%% flagged for Killaura (%%violationType%%).
modules.fastuse.notify.adminFlag=§6[§eAnti Cheats Notify§6]§c Player %%playerName%% flagged for FastUse (%%itemName%%).
modules.noswing.notify.adminFlag=§6[§eAnti Cheats Notify§6]§c Player %%playerName%% flagged for NoSwing Killaura.
modules.rotation.notify.adminFlag=§6[§eAnti Cheats Notify§6]§c Player %%playerName%% flagged for Invalid Rotation (%%type%%: %%value%%).
player.vanish.reminder=§l§7You are vanished.§r
system.error.manualFunctionExecute=ERROR: This function shouldn't be ran manually
antiGrief.notify.tntSummon=%%playerName%% was detected summoning a TNT!
antiGrief.warning.itemDisabled=You are not allowed to use %%itemName%% while anti-grief is active.
antiGrief.notify.itemDisabledAdmin=Player %%playerName%% attempted to use %%itemName%% (Anti-grief active).
antiGrief.notify.entityKilledAdmin=Killed a spawned %%entityType%% due to anti-grief measures (Initiator: %%initiatorName%%).
antiGrief.notify.entityKilledAdminNoInitiator=Killed a spawned %%entityType%% due to anti-grief measures (Initiator unknown or global setting).
`,
    "es_ES": `
pack.name=Anti Trampas
pack.description=Pack Anti Trampas
item.ac:admin_panel=Panel de Admin
chat.spam.error.repeating=§r§c ¡Por favor no repitas mensajes!
player.join.welcomer.firstTime=§r§e¡%%playerName%%§b se une por primera vez! Este reino está protegido por §eAnti Trampas§b, ¡disfruta tu estancia!§r
player.vanish.reminder=§l§7Estás invisible.§r
command.panel.noPermission=§cNo tienes permiso para usar este comando.
ui.button.back=Atrás
system.error.manualFunctionExecute=ERROR: Esta función no debe ejecutarse manualmente
`
};

let inMemoryGeneralLogs = [];
const MAX_GENERAL_LOG_ENTRIES = 100; 

const world = Minecraft.world;

// Make sure 'world' and 'logDebug' are accessible.
// 'world' is typically: const world = Minecraft.world; (already in the file)
// 'logDebug' should be imported: import { logDebug, ... } from './assets/util'; (already in the file)
// 'PACKAGED_LANGUAGE_DATA' should also be defined in this file (from the previous step).

function setupLanguageDynamicProperties() {
    logDebug("[Anti Cheats] Setting up language dynamic properties...");
    const loadedLanguageCodes = [];
    
    if (typeof PACKAGED_LANGUAGE_DATA !== 'object' || PACKAGED_LANGUAGE_DATA === null) {
        logDebug("[Anti Cheats ERROR] PACKAGED_LANGUAGE_DATA is not defined or not an object. Cannot setup languages.");
        // Still set a default for availableLanguages to prevent errors in i18n.js
        try {
            world.setDynamicProperty("ac:availableLanguages", JSON.stringify(["en_US"]));
        } catch (e) {
            logDebug("[Anti Cheats ERROR] Failed to set default ac:availableLanguages:", e);
        }
        return;
    }

    for (const langCode in PACKAGED_LANGUAGE_DATA) {
        if (Object.hasOwnProperty.call(PACKAGED_LANGUAGE_DATA, langCode)) {
            const langContentString = PACKAGED_LANGUAGE_DATA[langCode];
            try {
                world.setDynamicProperty(`ac:lang/${langCode}`, langContentString);
                loadedLanguageCodes.push(langCode);
                logDebug(`[Anti Cheats] Stored translations for [${langCode}] in dynamic property.`);
            } catch (e) {
                logDebug(`[Anti Cheats ERROR] Failed to set dynamic property for language ${langCode}:`, e);
            }
        }
    }

    try {
        world.setDynamicProperty("ac:availableLanguages", JSON.stringify(loadedLanguageCodes.length > 0 ? loadedLanguageCodes : ["en_US"]));
        logDebug(`[Anti Cheats] Set 'ac:availableLanguages' to: ${JSON.stringify(loadedLanguageCodes)}`);
    } catch (e) {
        logDebug("[Anti Cheats ERROR] Failed to set 'ac:availableLanguages' dynamic property:", e);
    }
}

/**
 * Initializes the Anti Cheats addon.
 * This function is responsible for setting up various components of the addon when the world loads.
 * Key operations include:
 * - Ensuring necessary scoreboard objectives are created (`ac:gametest_on`, `ac:vanish`, `ac:notify`, `ac:setup_success`).
 * - Setting default game rules (`sendCommandFeedback: false`, `commandBlockOutput: false`) if not already set.
 * - Loading and applying the world border from a dynamic property (`ac:worldBorder`).
 * - Initializing world dynamic properties for persistent data storage, including:
 *   - `ac:unbanQueue`: Stores a list of player names pending unban.
 *   - `ac:deviceBan`: Stores a list of banned device IDs.
 *   - `ac:logs`: Stores general addon operational logs (via `world.addLog`).
 *   - `ac:version`: Tracks the current version of the addon.
 *   - `ac:config`: Stores user-modified configuration settings.
 *   - `ac:gbanList`: Stores the global ban list, seeded from `globalBanList.js` if not present.
 * - Designating the world owner: Checks for an existing owner in dynamic properties. If not found, it checks the `ownerPlayerNameManual` field in `config.js`. If an owner is still not set, it can then be claimed using the `!owner` command.
 * - Starting a script-observed TPS (Ticks Per Second) monitor, which periodically calculates and stores the script execution TPS in `ac:systemInfo_scriptTps`.
 * - Marking the script setup as complete (`ac:scriptSetupComplete`, `world.acInitialized`).
 * All operations that modify world state or subscribe to events are typically run within `Minecraft.system.run()`
 * to ensure they execute in a safe context after the world is fully loaded.
 * @returns {void}
 */
export function Initialize(){
    Minecraft.system.run(() => {
        /**
         * @description Ensures necessary scoreboard objectives for the addon are created if they don't already exist.
         */
        const objectives = [
            "ac:gametest_on",
            "ac:vanish",
            "ac:notify",
            "ac:setup_success"
        ];
        objectives.forEach(obj => {
            if (world.scoreboard.getObjective(obj) == undefined) {
                try {
                    world.scoreboard.addObjective(obj, obj); // Use obj as display name too, or customize
                    logDebug(`[Anti Cheats] Created scoreboard objective: ${obj}`);
                } catch (e) {
                    logDebug(`[Anti Cheats] Failed to create scoreboard objective ${obj}:`, e);
                }
            }
        });

        /**
         * @description Initializes specific game rules if they haven't been set by this addon before.
         * Sets `sendCommandFeedback` and `commandBlockOutput` to `false`.
         * Marks completion by setting the "ac:gamerulesSet" dynamic property.
         */
        if (world.getDynamicProperty("ac:gamerulesSet") === undefined) {
            try {
                world.gameRules.sendCommandFeedback = false;
                world.gameRules.commandBlockOutput = false;
                world.setDynamicProperty("ac:gamerulesSet", true);
                logDebug("[Anti Cheats] Initialized gamerules (sendCommandFeedback, commandBlockOutput).");
            } catch (e) {
                logDebug("[Anti Cheats] Failed to initialize gamerules:", e);
            }
        }

        /**
         * @description Loads the world border value from the "ac:worldBorder" dynamic property
         * and applies it to `world.worldBorder` if the property exists and is a number.
         */
        const existingWorldBorder = world.getDynamicProperty("ac:worldBorder");
        if (typeof existingWorldBorder === 'number') {
            world.worldBorder = existingWorldBorder;
        }

        // Initialize runtime variable for unban queue (will be populated from dynamic property).
        if (!world.acUnbanQueue) world.acUnbanQueue = [];
        
        // Determine if the script setup is complete by checking relevant dynamic properties or scoreboard objectives.
        world.acIsSetup = world.getDynamicProperty("ac:scriptSetupComplete") === true || 
                                 world.scoreboard.getObjective("ac:setup_success") !== undefined;
        
        /**
         * @description Initializes the unban queue (`world.acUnbanQueue`) by parsing the
         * "ac:unbanQueue" dynamic property. Defaults to an empty array if parsing fails or property doesn't exist.
         */
        try {
            const unbanQueueProperty = world.getDynamicProperty("ac:unbanQueue");
            world.acUnbanQueue = unbanQueueProperty ? JSON.parse(unbanQueueProperty) : [];
        } catch (error) {
            logDebug("[Anti Cheats] Error parsing unbanQueue JSON, defaulting to empty array:", error);
            world.acUnbanQueue = [];
        }
        logDebug(`[Anti Cheats] Unban Queue: `, JSON.stringify(world.acUnbanQueue));

        /**
         * @description Initializes the device ban list (`world.acDeviceBan`) by parsing the
         * "ac:deviceBan" dynamic property. Defaults to an empty array if parsing fails or property doesn't exist.
         */
        try {
            const deviceBanProperty = world.getDynamicProperty("ac:deviceBan");
            world.acDeviceBan = deviceBanProperty ? JSON.parse(deviceBanProperty) : [];
        } catch (error) {
            logDebug("[Anti Cheats] Error parsing deviceBan JSON, defaulting to empty array:", error);
            world.acDeviceBan = [];
        }
        logDebug(`[Anti Cheats] Device Ban List: `, JSON.stringify(world.acDeviceBan));

        /**
         * @description Checks the addon version stored in "ac:version" dynamic property.
         * If not set, it initializes it with the version from `config.default.version`.
         */
        world.acVersion = world.getDynamicProperty("ac:version");
        if(!world.acVersion){
            world.setDynamicProperty("ac:version",config.default.version);
            world.acVersion = config.default.version;
        }

        /**
         * @description Initializes the addon's operational logs (`world.acLogs`) by parsing the
         * "ac:logs" dynamic property. Defaults to an empty array if parsing fails or property doesn't exist.
         * This prepares the log system before defining `world.addLog`.
         */
        try {
            const logsProperty = world.getDynamicProperty("ac:logs");
            world.acLogs = logsProperty ? JSON.parse(logsProperty) : [];
            if (!Array.isArray(world.acLogs)) world.acLogs = []; // Ensure it's an array
        } catch (error) {
            logDebug("[Anti Cheats] Error parsing logs JSON, defaulting to empty array:", error);
            world.acLogs = [];
        }
        /**
         * @function addLog
         * @memberof world
         * @param {string} message - The message to log.
         * @description Adds a log message to `inMemoryGeneralLogs`.
         * Prepends a timestamp to the message. Limits the log to a maximum number of entries,
         * removing the oldest if the limit is exceeded.
         * This function is dynamically added to the `world` object during initialization.
         * @returns {void}
         * @example world.addLog("Player logged in.");
         */
        world.addLog = function(message) {
            if (inMemoryGeneralLogs.length >= MAX_GENERAL_LOG_ENTRIES) {
                inMemoryGeneralLogs.shift(); // Remove the oldest log
            }
            inMemoryGeneralLogs.push(`[${new Date().toISOString()}] ${message}`); // Add timestamp to message
        };
        
        // Example usage (commented out, but shows how it would be used):
        // world.addLog("This is a test log message.");

        Minecraft.system.runInterval(() => {
            try {
                if (inMemoryGeneralLogs.length > 0) {
                    // world.acLogs already holds logs loaded at initialization.
                    // Combine with new in-memory logs.
                    const combinedLogs = world.acLogs.concat(inMemoryGeneralLogs);
                    const finalLogs = combinedLogs.slice(-MAX_GENERAL_LOG_ENTRIES); // Keep only the most recent
    
                    try {
                        world.setDynamicProperty("ac:logs", JSON.stringify(finalLogs));
                        world.acLogs = finalLogs; // Update the in-memory "master" list
                        inMemoryGeneralLogs = [];   // Clear the temporary new entries
                    } catch (e) {
                        logDebug("[Anti Cheats ERROR] Failed to set dynamic property for general logs in interval:", e);
                    }
                }
            } catch (e) {
                logDebug("[Anti Cheats ERROR] Error in batched general log saving interval:", e, e.stack);
            }
        }, 240); // Save every 12 seconds (240 ticks)


        /**
         * @description Loads custom configuration settings from the "ac:config" dynamic property.
         * If found and parsable, it updates the `config.default` object with these settings.
         * Only existing keys in `config.default` are updated to prevent arbitrary additions.
         */
        const editedConfigString = world.getDynamicProperty("ac:config");
        if(editedConfigString){
            try {
                const editedConfig = JSON.parse(editedConfigString);
                for (const i of Object.keys(editedConfig)) {
                    if (config.default.hasOwnProperty(i)) { // Ensure we only update existing config keys
                        config.default[i] = editedConfig[i];
                    }
                }
                logDebug(`[Anti Cheats] Loaded config from dynamic properties.`);
            } catch (error) {
                logDebug(`[Anti Cheats] Error parsing editedConfig JSON from dynamic property "ac:config":`, error);
                // Proceed with default config if parsing fails
            }
        }

        /**
         * @description Initializes the dynamic global ban list (`world.dynamicGbanListArray` and `world.dynamicGbanNameSet`).
         * It attempts to load the list from the "ac:gbanList" dynamic property.
         * If the property is missing, malformed, or not an array, it falls back to the `globalBanList` (seed data)
         * and updates the dynamic property with this seed data.
         * The `world.dynamicGbanNameSet` is populated with names for quick lookups.
         */
        let loadedGbanList = [];
        const gbanListString = world.getDynamicProperty("ac:gbanList");
        if (typeof gbanListString === 'string') {
            try {
                loadedGbanList = JSON.parse(gbanListString);
                if (!Array.isArray(loadedGbanList)) {
                    logDebug("[Anti Cheats] ac:gbanList was not an array, attempting to re-initialize from seed.");
                    loadedGbanList = globalBanList; // Use imported seed
                    world.setDynamicProperty("ac:gbanList", JSON.stringify(loadedGbanList));
                }
            } catch (e) {
                logDebug("[Anti Cheats ERROR] Failed to parse ac:gbanList, attempting to re-initialize from seed. Error:", e);
                loadedGbanList = globalBanList; // Use imported seed
                world.setDynamicProperty("ac:gbanList", JSON.stringify(loadedGbanList));
            }
        } else {
            // If property doesn't exist, initialize from seed
            logDebug("[Anti Cheats] ac:gbanList not found, initializing from seedGlobalBanList.");
            loadedGbanList = globalBanList; // Use imported seed
            world.setDynamicProperty("ac:gbanList", JSON.stringify(loadedGbanList));
        }
        world.dynamicGbanListArray = loadedGbanList; // Store the array
        world.dynamicGbanNameSet = new Set(loadedGbanList.map(entry => (typeof entry === 'string' ? entry : entry.name)));
        logDebug(`[Anti Cheats] Dynamic Global Ban List initialized. ${world.dynamicGbanListArray.length} entries, Set size: ${world.dynamicGbanNameSet.size}`);

        setupLanguageDynamicProperties(); // Call the function to set up language dynamic properties
        i18n.reloadLanguages(); // Add this line
        logDebug("[Anti Cheats] i18n languages reloaded after setup."); // And this line for logging
        i18n.setLanguage(config.default.other.defaultLanguage);
        logDebug(`[Anti Cheats] Attempted to set initial language to configured default: ${config.default.other.defaultLanguage}`);

        // New Owner Designation Logic
        try {
            const existingOwner = world.getDynamicProperty("ac:ownerPlayerName");
            if (existingOwner !== undefined && typeof existingOwner === 'string' && existingOwner.trim() !== '') {
                logDebug(`[Anti Cheats] Existing Owner Found: ${existingOwner}`);
            } else {
                logDebug("[Anti Cheats] No existing owner found in dynamic property 'ac:ownerPlayerName'.");
                const configOwnerName = config.default.other.ownerPlayerNameManual;
                if (typeof configOwnerName === 'string' && configOwnerName.trim() !== '') {
                    world.setDynamicProperty("ac:ownerPlayerName", configOwnerName);
                    logDebug(`[Anti Cheats] Owner designated from config.js: ${configOwnerName}`);
                    // Consider adding a world.sendMessage or similar if you want to announce this.
                } else {
                    logDebug("[Anti Cheats] No owner manually set in config.js (ownerPlayerNameManual is blank). Owner can be claimed using !owner command.");
                }
            }
        } catch (e) {
            logDebug("[Anti Cheats ERROR] Error during new owner designation logic:", e, e.stack);
        }

        // Mark script setup as complete using both a dynamic property and a runtime flag.
        world.setDynamicProperty("ac:scriptSetupComplete", true);
        world.acInitialized = true; // General initialization flag for runtime checks.
        logDebug("[Anti Cheats] Initialized and script setup marked as complete.");
        

        /**
         * @description Initializes a mechanism to approximate the server's script execution TPS (Ticks Per Second).
         * This system periodically calculates how many game ticks have occurred within a set wall-clock time interval.
         * The result (e.g., "19.8" or "N/A") is stored in the dynamic property `ac:systemInfo_scriptTps`.
         *
         * **Methodology:**
         * 1. An initial value "Calculating..." is set for `ac:systemInfo_scriptTps`.
         * 2. After a 1-second delay (20 ticks) to allow the server to settle, the first measurement baseline is taken
         *    (current tick and current wall-clock time).
         * 3. A `system.runInterval` then runs every `SAMPLING_INTERVAL_TICKS` (e.g., 100 ticks / 5 seconds).
         * 4. In each interval:
         *    - It calculates `deltaTicks` (the number of game ticks passed since the last interval) and
         *      `deltaTimeMs` (the wall-clock time in milliseconds passed).
         *    - If `deltaTimeMs` is sufficient (>100ms, to avoid noise and division by zero), TPS is calculated as `deltaTicks / (deltaTimeMs / 1000)`.
         *    - The value is formatted to one decimal place (e.g., "19.8") and stored.
         *    - If the interval was too short for a reliable measurement (e.g., <100ms and 0 ticks passed),
         *      it may carry over the last known TPS or display "N/A".
         *    - Error handling sets the property to "Error" if issues occur during calculation.
         *
         * The dynamic property `ac:systemInfo_scriptTps` can be read by other scripts or systems (e.g., UI panels)
         * to display an indicator of the scripting engine's performance. This is not a true measure of server TPS
         * but rather an observation of how well the scripting environment is keeping up with game ticks.
         */
        // Script-Observed TPS Measurement
        let lastTickTime = 0;
        let lastWallClockTime = 0;
        const SAMPLING_INTERVAL_SECONDS = 5;
        const SAMPLING_INTERVAL_TICKS = SAMPLING_INTERVAL_SECONDS * 20; // Expected ticks in this interval (20 TPS)
        
        // Initialize dynamic property for TPS display
        try {
            world.setDynamicProperty("ac:systemInfo_scriptTps", "Calculating...");
        } catch (e) {
            logDebug("[Anti Cheats ERROR] Failed to set initial TPS dynamic property:", e, e.stack);
        }

        // Initial delay to let the server settle, then start TPS calculation
        /**
         * Initializes the baseline for TPS (Ticks Per Second) calculation after a brief server startup delay.
         * Sets the initial `lastTickTime` and `lastWallClockTime` used by the subsequent TPS calculation interval.
         *
         * @returns {void}
         */
        Minecraft.system.runTimeout(() => {
            lastTickTime = Minecraft.system.currentTick;
            lastWallClockTime = Date.now();

            /**
             * Periodically calculates the script-observed TPS (Ticks Per Second).
             * Compares game ticks passed against wall-clock time passed since the last interval
             * to estimate TPS, storing the formatted result in the "ac:systemInfo_scriptTps" dynamic property.
             * Handles potential errors during calculation.
             *
             * @returns {void}
             */
            Minecraft.system.runInterval(() => {
                try {
                    const currentTick = Minecraft.system.currentTick;
                    const currentWallClockTime = Date.now();

                    const deltaTicks = currentTick - lastTickTime;
                    const deltaTimeMs = currentWallClockTime - lastWallClockTime;
                    let observedTpsValue = "N/A"; // Default to N/A

                    if (deltaTimeMs > 100) { // Only calculate if a meaningful amount of time has passed
                        const deltaTimeSeconds = deltaTimeMs / 1000;
                        const tps = deltaTicks / deltaTimeSeconds;
                        observedTpsValue = tps.toFixed(1); // Format to one decimal place
                    } else if (deltaTicks === 0 && deltaTimeMs <= 100 && deltaTimeMs >= 0) {
                        // If no ticks passed and very little time passed, it's hard to get a reliable TPS.
                        // Attempt to use the last known good TPS value to avoid flickering "N/A".
                        const currentTPSProp = world.getDynamicProperty("ac:systemInfo_scriptTps");
                        if (typeof currentTPSProp === 'string' && !["Calculating...", "N/A", "Error"].includes(currentTPSProp)) {
                             observedTpsValue = currentTPSProp; // Keep last good value
                        } else {
                            observedTpsValue = "N/A"; // Fallback if no recent good value
                        }
                    }
                    // If deltaTimeMs is very small but deltaTicks > 0, it indicates very fast processing,
                    // the calculation `deltaTicks / (deltaTimeMs / 1000)` should handle this.

                    world.setDynamicProperty("ac:systemInfo_scriptTps", observedTpsValue);
                    // logDebug(`Script-Observed TPS: ${observedTpsValue}`); // Optional: for debugging TPS calculation

                    // Update baselines for the next interval
                    lastTickTime = currentTick;
                    lastWallClockTime = currentWallClockTime;
                } catch (e) {
                    logDebug("[Anti Cheats ERROR] Error during TPS calculation interval:", e, e.stack);
                    try {
                        world.setDynamicProperty("ac:systemInfo_scriptTps", "Error");
                    } catch (propError) {
                        logDebug("[Anti Cheats ERROR] Failed to set TPS dynamic property to Error:", propError, propError.stack);
                    }
                }
            }, SAMPLING_INTERVAL_TICKS);
        }, 20); // Initial 1-second delay (20 game ticks)

    });
}