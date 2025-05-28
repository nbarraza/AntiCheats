import { getPlayerByName } from "../../assets/util";
import { newCommand } from "../handle";
import {MemoryTier} from "@minecraft/server";

newCommand({
    name:"systeminfo",
    description:"Get the system info of a selected player.",
    /**
     * Executes the systeminfo command.
     * Retrieves and displays client system information (max render distance, memory tier, platform type)
     * for a specified target player, or for the command executor if no target is specified.
     *
     * @param {object} data - The data object provided by the command handler.
     * @param {Minecraft.Player} data.player - The player who executed the command.
     * @param {string[]} data.args - The command arguments. `args[1...]` can form the target player's name.
     * @returns {void} Sends a message to the command executor with the system information or an error message.
     */
    run:(data) => {
        try {
            const {player,args} = data;
            const targetPlayerName = args.slice(1).join(" ").replace(/["@]/g, "") || player.name; // Default to self if no name provided
            const targetPlayer = getPlayerByName(targetPlayerName); // Already wrapped
            
            if (!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetPlayerName}§f was not found`);
                return;
            }
            
            const clientInfo = targetPlayer.clientSystemInfo; // API access
            if (!clientInfo) {
                player.sendMessage(`§6[§eSafeGuard§6]§c Could not retrieve client system info for §e${targetPlayer.name}.`);
                logDebug(`[SafeGuard ERROR][systeminfo] clientSystemInfo was null or undefined for ${targetPlayer.name}`);
                return;
            }

            const {maxRenderDistance,memoryTier,platformType} = clientInfo;

            player.sendMessage(`§eClient Info for §6${targetPlayer.name}§e: \n\nMax Render Distance: §6${maxRenderDistance}§e\nMemory: §6${Object.keys(MemoryTier)[memoryTier]}§e\nPlatform: §6${platformType}`); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][systeminfo]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to get system info. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][systeminfo] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})