import { world, system, EffectType } from "@minecraft/server";
import CONFIG from "../config.js";
import { i18n } from "../assets/i18n.js"; // Assuming i18n is from assets
import { sendMessageToAllAdmins, saveLogToFile, LOG_FILE_PREFIX } from "../assets/util.js";
import { logDebug } from "../assets/logger.js"; // Assuming logDebug is in util.js or assets/util.js

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
}

export function removePlayerState(playerId) {
    const deleted = playerInternalStates.delete(playerId);
    if (deleted) {
        // Removed logDebug for successful state removal
    } else {
        logDebug(`Attempted to remove state for player ${playerId}, but no state was found.`);
    }
}

export function getPlayerState(playerId) {
    const state = playerInternalStates.get(playerId);
    if (!state) {
        // This case should ideally be prevented by robust join/leave event handling.
        // Depending on strictness, could return a default state or null/undefined.
        // For now, returning what Map.get() returns (undefined if not found) is acceptable.
    }
    return state;
}
import { ModuleStatusManager } from "../classes/module.js";
import { Vector3utils } from "../classes/vector3.js";

// Log arrays and constants
export const MAX_LOG_ENTRIES = 100; // Define how many entries to keep in memory
export let inMemoryCommandLogs = [];
export let inMemoryPlayerActivityLogs = [];

let currentTickCounter = 0;

// --- Main Tick-Based Interval (Fly, Speed, NoFall updates, etc.) ---
system.runInterval(() => {
    currentTickCounter++;

    for (const player of world.getAllPlayers()) {
        const playerVelocity = player.getVelocity();
        const isPlayerOnGround = player.isOnGround;

        let state = getPlayerState(player.id);
        if (!state) {
            logDebug(`[AntiCheats_PeriodicChecks] No state found for player ${player.name} (${player.id}). Attempting to initialize state now.`);
            // Ensure initializePlayerState and system are available in this scope
            // (initializePlayerState is exported by this file, system is imported from @minecraft/server)
            initializePlayerState(player.id, player.location, system.currentTick);
            state = getPlayerState(player.id); // Attempt to retrieve the state again
            if (!state) {
                logDebug(`[AntiCheats_PeriodicChecks] CRITICAL: Failed to initialize state for player ${player.name} (${player.id}) on demand. Skipping tick.`);
                continue;
            }
        }
        state.deepValuableOresBrokenThisTick = 0; // Add this line to reset before any other logic uses it for the current tick

        // --- 10-Tick Interval Checks (Speed, Fly) ---
        if (currentTickCounter % 10 === 0) {
            const movementSpeed = Vector3utils.magnitude({ x: playerVelocity.x, y: 0, z: playerVelocity.z }); // Horizontal speed
            const maxSpeed = player.isSprinting ? CONFIG.movement.speed.highSpeedThreshold : CONFIG.movement.speed.highSpeedThreshold;

            // Speed Check
            if (ModuleStatusManager.getModuleStatus(ModuleStatusManager.Modules.velocityCheck) && movementSpeed > maxSpeed && !player.hasEffect(EffectType.get("speed")) && !player.isFlying) {
                state.speedVL = (state.speedVL || 0) + 1;
                if (state.speedVL >= CONFIG.movement.speed.speedViolationThreshold) {
                    sendMessageToAllAdmins("detection.speed_detected_admin", { player: player.name, speed: movementSpeed.toFixed(2), max_speed: maxSpeed, vl: state.speedVL });
                    state.speedVL = 0;
                }
            }

            // Fly Check (basic ground check)
            let lastGroundTime = state.lastGroundTime;
            if (ModuleStatusManager.getModuleStatus(ModuleStatusManager.Modules.flyCheck) && !isPlayerOnGround && !player.isFlying && !player.hasEffect(EffectType.get("levitation")) && (system.currentTick - lastGroundTime > 200 /* TODO: Revisit fly_max_air_time_ticks, was configData.fly_max_air_time_ticks */)) {
                // More sophisticated checks: e.g., vertical speed, obstacles, gliding
                state.flyVL = (state.flyVL || 0) + 1;
                if (state.flyVL >= CONFIG.movement.fly.flyViolationThreshold) {
                    sendMessageToAllAdmins("detection.fly_detected_admin", { player: player.name, vl: state.flyVL });
                    state.flyVL = 0;
                }
            } else if (isPlayerOnGround) {
                state.lastGroundTime = system.currentTick;
                state.flyVL = 0; // Reset VL when on ground
            }

            // Nuker VL decay/check
            console.warn("[AntiCheats_Debug] typeof ModuleStatusManager: " + typeof ModuleStatusManager);
            console.warn("[AntiCheats_Debug] typeof ModuleStatusManager.getModuleStatus: " + typeof ModuleStatusManager.getModuleStatus);
            if (ModuleStatusManager && typeof ModuleStatusManager === 'object') { console.warn("[AntiCheats_Debug] ModuleStatusManager keys: " + Object.keys(ModuleStatusManager).join(", ")); }
            if (ModuleStatusManager && ModuleStatusManager.constructor) { console.warn("[AntiCheats_Debug] ModuleStatusManager constructor name: " + ModuleStatusManager.constructor.name); }
            if (ModuleStatusManager.getModuleStatus(ModuleStatusManager.Modules.nukerCheck)) {
                let nukerBreakVl = state.nukerVLBreak || 0; // Read from state
                if (nukerBreakVl > CONFIG.world.nuker.maxBlocks) {
                     sendMessageToAllAdmins("detection.nuker_detected_admin", { player: player.name, blocks: nukerBreakVl });
                }
                state.nukerVLBreak = 0; // Reset in state
            }
        }

        // Update player position for next tick
        state.lastLocation = { x: player.location.x, y: player.location.y, z: player.location.z };
    }
}, 1); // Run every tick for core checks like NoFall updates

// --- Night Vision Detection Interval ---
if (CONFIG.world.nightVisionDetection.enableNightVisionCheck) {
    system.runInterval(() => {
        for (const player of world.getAllPlayers()) {
            if (player.hasEffect(EffectType.get("night_vision"))) {
                // const effect = player.getEffect(EffectType.get("night_vision")); // Unused variable: effect
                // Check if duration is unnaturally long or amplifier too high if not given by admin commands
                // This requires tracking how players get effects, which is complex.
                // A simpler check could be if they have it for > X minutes without admin intervention.
                // For now, this is a placeholder for more specific logic.
                // Example: if (effect.duration > CONFIG.world.nightVisionDetection.suspicionThreshold && !isAdmin(player)) { ... } // Placeholder for actual config path
            }
        }
    }, CONFIG.world.nightVisionDetection.checkIntervalTicks);
}

// --- Log Saving Interval ---
// Removed if (configData.enable_log_saving) condition
system.runInterval(() => {
    if (Array.isArray(inMemoryCommandLogs) && inMemoryCommandLogs.length > 0) {
        saveLogToFile(LOG_FILE_PREFIX.COMMAND, inMemoryCommandLogs.map(log => `[${log.timestamp}] ${log.player}: ${log.command}`).join("\n"));
        inMemoryCommandLogs = [];
    } else if (!Array.isArray(inMemoryCommandLogs) && inMemoryCommandLogs) {
        logDebug(`[AntiCheats_PeriodicChecks] CRITICAL: inMemoryCommandLogs is not an array. Type: ${typeof inMemoryCommandLogs}. Attempting to log value: ${String(inMemoryCommandLogs)}. Resetting.`);
        inMemoryCommandLogs = [];
    }
    if (Array.isArray(inMemoryPlayerActivityLogs) && inMemoryPlayerActivityLogs.length > 0) {
        saveLogToFile(LOG_FILE_PREFIX.ACTIVITY, inMemoryPlayerActivityLogs.map(log => `[${log.timestamp}] ${log.player}: ${log.activity}`).join("\n"));
        inMemoryPlayerActivityLogs = [];
    } else if (!Array.isArray(inMemoryPlayerActivityLogs) && inMemoryPlayerActivityLogs) {
        logDebug(`[AntiCheats_PeriodicChecks] CRITICAL: inMemoryPlayerActivityLogs is not an array. Type: ${typeof inMemoryPlayerActivityLogs}. Attempting to log value: ${String(inMemoryPlayerActivityLogs)}. Resetting.`);
        inMemoryPlayerActivityLogs = [];
    }
}, 1200 /* TODO: Revisit log_save_interval_ticks, was configData.log_save_interval_ticks */);


// --- Vanish Reminder Interval ---
// Removed if (ModuleStatusManager.getModuleStatus("vanish")) condition
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag("vanished") && typeof player.hasAdmin === 'function' && player.hasAdmin()) {
            player.onScreenDisplay.setActionBar(i18n.getText("system.vanish_reminder"));
        }
    }
}, 6000 /* TODO: Revisit vanish_reminder_interval_ticks, was configData.vanish_reminder_interval_ticks */);


// No explicit exports needed for the intervals themselves as they are self-running.
// Log arrays are exported for other modules to use.
// currentTickCounter is module-local.
