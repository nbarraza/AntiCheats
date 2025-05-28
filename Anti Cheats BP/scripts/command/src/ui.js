import { Player } from "@minecraft/server";
import { showPublicInfoPanel } from "../../assets/ui"; // Adjust path as necessary
import { logDebug } from "../../assets/util";

/**
 * Command configuration object for the "ui" command.
 * This command allows players to open a public information panel.
 * @type {object}
 * @property {string} name - The name of the command ("ui").
 * @property {string} description - A brief description of the command.
 * @property {string} type - The type of command (e.g., "alias").
 * @property {function(Player): boolean} permission - Function to check if a player can use the command.
 * @property {function(Player, string[], object=): void} run - Function to execute the command.
 */
export const command = {
    name: "ui",
    description: "Opens the public information panel.",
    type: "alias", // Assuming it follows the same pattern as other prefix commands
    /**
     * Checks if a player has permission to use the "ui" command.
     * Currently, this command is available to all players.
     * @param {Player} player - The player attempting to use the command.
     * @returns {boolean} True if the player has permission, false otherwise.
     */
    permission: (player) => true, // Available to all players
    /**
     * Executes the "ui" command.
     * Opens the public information panel for the player who executed the command.
     *
     * @param {Player} player - The player who executed the command.
     * @param {string[]} args - The command arguments (currently not used by this command).
     * @param {object} [data] - Additional data from the command handler (currently not used by this command).
     * @returns {void}
     */
    run: (player, args, data) => {
        try {
            if (!(player instanceof Player)) {
                logDebug("[!ui Command] Error: Sender is not a valid player object.");
                return;
            }
            // Call the function that will show the UI panel
            // This function will be fully implemented in a subsequent step in ui.js
            showPublicInfoPanel(player); 
        } catch (e) {
            logDebug(`[!ui Command] Error: ${e} ${e.stack}`);
            if (player instanceof Player) {
                player.sendMessage("§cAn error occurred while trying to open the UI. Please contact an admin.");
            }
        }
    }
};

// Ensure the command is registered by the command handler system
// This might involve adding it to an array or map in handle.js or importer.js
// For now, its export from this file and import in importer.js should suffice
// if the command handler iterates through imported command modules.
// Based on importer.js structure, simply importing it there makes it available.
