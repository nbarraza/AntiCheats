import { addPlayerToUnbanQueue, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';
import { i18n } from '../../assets/i18n.js';

newCommand({
    name:"unban",
    description:"<player> Unbans a player",
    /**
     * Executes the unban command.
     * Adds the specified player to an unban queue, typically processed when the player attempts to join.
     *
     * @param {object} data - The data object provided by the command handler.
     * @param {Minecraft.Player} data.player - The player who executed the command.
     * @param {string[]} data.args - The command arguments. Expects `args[1...]` to form the name of the player to be unbanned.
     * @returns {void} Sends a message to the command executor (e.g., usage error, confirmation/error from unban queue process).
     */
    run: (data) => {
        try {
            const {player, args} = data; // Ensure args is destructured
            const setNameUnban = args.slice(1).join(" ").replace(/["@]/g, "");
            
            if (!setNameUnban) { // Basic validation for player name
                player.sendMessage(i18n.getText("command.unban.usage", {}, player));
                return;
            }

            addPlayerToUnbanQueue(player,setNameUnban); // Already wrapped in util.js
        } catch (e) {
            logDebug("[SafeGuard ERROR][unban]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage(i18n.getText("command.unban.error", {}, data.player));
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][unban] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})