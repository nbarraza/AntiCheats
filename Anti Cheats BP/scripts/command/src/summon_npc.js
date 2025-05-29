import { newCommand } from '../handle.js';
import { i18n } from '../../assets/i18n.js';
import { logDebug } from '../../assets/util.js';

newCommand({
    name:"summon_npc",
    description:"Summons a NPC at your location",
    /**
     * Executes the summon_npc command.
     * Summons a non-player character (NPC) at the command executor's current location
     * by running a Minecraft function (`admin_cmds/summon_npc`).
     *
     * @param {object} data - The data object provided by the command handler.
     * @param {Minecraft.Player} data.player - The player who executed the command.
     * @returns {void} Sends an error message to the command executor if an issue occurs.
     */
    run: (data) => {
        try {
            data.player.runCommand("function admin_cmds/summon_npc");
        } catch (e) {
            logDebug("[SafeGuard ERROR][summon_npc]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage(i18n.getText("command.summon_npc.error", {}, data.player));
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][summon_npc] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})