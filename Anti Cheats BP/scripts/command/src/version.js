import { newCommand } from '../handle.js';
import * as config from '../../config.js';
import { i18n } from '../../assets/i18n.js';
import { logDebug } from '../../assets/util.js';

// Define a reusable function to get the version message
/**
 * Retrieves a formatted string containing the SafeGuard version from the configuration.
 *
 * @export
 * @returns {string} The SafeGuard version message string (e.g., "§r§6[§eSafeGuard§6]§f Version: §evX.Y.Z").
 */
export function getSafeGuardVersionMessage() {
    return i18n.getText("command.version.message", { version: config.default.version });
}

newCommand({
    name:"version",
    description: "Shows the pack version",
    adminOnly: false,
    /**
     * Executes the version command.
     * Sends the current SafeGuard version message to the command executor.
     *
     * @param {object} data - The data object provided by the command handler.
     * @param {Minecraft.Player} data.player - The player who executed the command.
     * @returns {void} Sends the version message to the player or an error message if an issue occurs.
     */
    run: (data) => {
        try {
            data.player.sendMessage(getSafeGuardVersionMessage()); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][version]", e, e.stack);
            // Attempt to notify the player if possible, though sendMessage itself might be the issue
            if (data && data.player) {
                try {
                    // Avoid calling sendMessage if it's the source of the error
                    if (e.message && !e.message.includes("sendMessage")) {
                         data.player.sendMessage(i18n.getText("command.version.error", {}, data.player));
                    }
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][version] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})