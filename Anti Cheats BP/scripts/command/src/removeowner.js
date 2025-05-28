import { newCommand } from '../handle';

newCommand({
    name:"removeowner",
    description:"Removes your owner status",
    ownerOnly: true,
    /**
     * Executes the removeowner command.
     * Removes the owner status from the command executor by setting the "safeguard:ownerStatus" dynamic property to false.
     * This command can only be executed by a player who currently has owner status.
     *
     * @param {object} data - The data object provided by the command handler.
     * @param {Minecraft.Player} data.player - The player who executed the command (must be the owner).
     * @returns {void} Sends a confirmation message to the player or an error message if an issue occurs.
     */
    run: (data) => {
        try {
            const { player } = data;
            player.setDynamicProperty("safeguard:ownerStatus",false); // API Call
            player.sendMessage(`§6[§eSafeGuard§6]§f Your owner status was removed.`); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][removeowner]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to remove owner status. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][removeowner] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})