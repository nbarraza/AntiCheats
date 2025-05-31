import { world, system } from '@minecraft/server'; // Ensure system and world are imported
// Local Script Imports
import CONFIG from "./config.js"; // CONFIG is the default export from config.js
import "./command/importer.js"; // Essential for registering chat commands (e.g., "!ban").
import "./slash_commands.js"; // Essential for registering slash commands (e.g., "/ac:ban").

import "./classes/player.js"; // Player prototype extensions
import { Initialize } from './initialize.js';
import { initializeReachCheck } from './modules/reach_check.js';
import { initializeNoSwingCheck } from './modules/noswing_check.js';

// Import new refactored modules for their side effects (event subscriptions, system.runInterval calls)
import "./managers/chat_manager.js";
import "./handlers/player_event_handlers.js";
import "./handlers/combat_event_handlers.js";
import "./handlers/world_interaction_handlers.js";
import "./systems/periodic_checks.js";
import { playerInternalStates, initializePlayerState } from './systems/periodic_checks.js';


// --- Global Variables and Constants ---
// Most global variables (currentTickCounter, log arrays, MAX_LOG_ENTRIES, gamertagRegex)
// have been moved to their respective modules (e.g., periodic_checks.js, player_event_handlers.js).
// `world` is imported directly in modules that need it.


// --- Removed Event Subscriptions and Functions ---
// All event subscriptions (chatSend, playerJoin, playerLeave, entityHitEntity, etc.)
// and their helper functions (handleMute, handleAntiSpam, addPlayerActivityLog, etc.)
// have been moved to the new modules.

// --- Removed Periodic Checks ---
// All system.runInterval blocks (main tick loop, Night Vision, log saving, vanish reminder)
// have been moved to `systems/periodic_checks.js`.
// The `betaFeatures` function is also moved there.


// --- Remaining Initial Setup ---

/**
 * Executes a one-time setup routine when the script module is initially loaded by the server.
 * This block is intended for final initializations that should occur once the world is active
 * and other core systems are expected to be available.
 */
system.run(() => { // Final initialization run
	try {
		if(!world.acInitialized) Initialize(); // Ensure main initialization logic is called
		
		// Ensure state is initialized for all currently online players
		for (const player of world.getPlayers()) { // Using world.getPlayers() as it's already in use here
			try {
                // Ensure state is initialized for all players who might have been present before script load
                if (!playerInternalStates.has(player.id)) {
                    try {
                        console.warn(`[Anti Cheats Index] Initializing missing state for player ${player.name} (${player.id}) on script load.`);
                        initializePlayerState(player.id, player.location, system.currentTick);
                    } catch (e) {
                        console.warn(`[Anti Cheats Index] Error initializing state for player ${player.name} (${player.id}) on script load: ${e} Stack: ${e?.stack}`);
                    }
                }
			} catch (_playerError) { // playerError -> _playerError
			    // Errors for individual player setup shouldn't stop others, but log them.
                console.warn(`[Anti Cheats Index] Error during initial setup for player: ${_playerError} Stack: ${_playerError?.stack}`);
			}
		}
		
		initializeReachCheck(); 
		initializeNoSwingCheck(); 


	} catch (_e) { // e -> _e
	    // Log main initialization errors. Initialize() or sub-initializers might also log specifics.
        console.warn(`[Anti Cheats Index] Error during final initialization: ${_e} Stack: ${_e?.stack}`);
	}
});

// Any other essential, top-level logic that doesn't fit into the new modules would remain here.
// For instance, one-time version checks or dynamic property initializations for the world itself, if any.
system.run(async () => {
    try {
        const currentVersion = world.getDynamicProperty("ac:version");
        if (currentVersion !== CONFIG.version) {
            world.setDynamicProperty("ac:version", CONFIG.version);
            // Potentially send a message to admins about the update if it's a significant version change
            // This could also be part of Initialize() or a dedicated update/migration script.
        }
    } catch (_e) { // e -> _e
        // Version check failure is not critical but log it.
        console.warn(`[Anti Cheats Index] Error during version check: ${_e} Stack: ${_e?.stack}`);
    }
});
