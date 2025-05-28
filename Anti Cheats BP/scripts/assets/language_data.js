// This file stores the packaged language data for the Anti Cheats addon.
// It is imported by initialize.js to set up language dynamic properties.

export const PACKAGED_LANGUAGE_DATA = {
    "en_US": `##bridge-file-version: #3
pack.name=Anti Cheats
pack.description=Anti Cheats Pack
item.ac:admin_panel=Admin Panel
# Player Class Messages
player.warn.manual.approachingBan=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a74 Warning!\u00a7c Next warning from an admin will result in a permanent ban.
player.kick.manualWarnings.3=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74You are permanently banned.\n\u00a74Reason: \u00a7cReaching 3 manual warnings.\n\u00a74Banned by: \u00a7cAnti Cheats AntiCheat
player.notify.admin.permBannedForManualWarnings=\u00a7r\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a74 The player \u00a7c%%playerName%%\u00a74 was permanently banned for reaching 3 manual warnings.
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
player.notify.admin.banFailed=\u00a7c[Anti Cheats] Failed to ban %%playerName%%. Check console for errors.
player.error.unban.failedToSetQueue=Failed to set unbanQueue dynamic property for %%playerName%%
player.error.unban.failedToSetBanInfo=Failed to set banInfo dynamic property for %%playerName%% during unban
player.error.unban.parsingFailed=Error parsing banInfo JSON for player %%playerName%% during unban. Force clearing ban state.
player.error.freeze.type=Type of freeze is "%%type%%" should be boolean
player.error.freeze.failed=Failed to set freeze status for %%playerName%% to %%status%%
player.error.mute.adminPermission=The player "%%adminName%%" does not have permission to mute
player.error.mute.paramTypeReason=Type of reason is "%%type%%" should be string
player.error.mute.paramTypeDuration=Type of durationMs is "%%type%%" should be number
player.mute.successAdmin=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f You have muted \u00a7e%%playerName%%\u00a7f for \u00a7e%%duration%%.
player.notify.admin.muteSuccess=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7e %%playerName%%\u00a7f has been muted for \u00a7e%%duration%%\u00a7f by \u00a7e%%adminName%%\u00a7f. Reason: \u00a7e%%reason%%\u00a7f
player.error.mute.failed=Failed to mute player %%playerName%%
player.notify.admin.muteFailed=\u00a7c[Anti Cheats] Failed to mute %%playerName%%. Check console for errors.
player.error.unmute.notMuted="%%playerName%%" is not muted
player.error.unmute.failed=Failed to unmute player %%playerName%%
player.notify.admin.banLogError=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7c There was an error creating a ban log for \u00a74%%playerName%%\u00a7c Error: \n\u00a74%%error%%
player.error.mute.adminInstance=Parameter "adminPlayer" is not instanceof player
player.error.invalidModuleReference="%%moduleName%%" isn't a safeguard module.
# Command Messages
command.panel.noPermission=\u00a7cYou do not have permission to use this command.
command.ban.usage=\u00a7cUsage: .ban <player name> [reason]
command.ban.notFound=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Player \u00a7e%%targetName%%\u00a7f was not found
command.ban.self=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Cannot execute this command on yourself!
command.ban.success=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Successfully banned \u00a7e%%targetName%%\u00a7f for: %%reason%%
command.ban.error=\u00a7cAn error occurred while trying to ban the player. Please check the console.
command.unban.usage=\u00a7cUsage: .unban <player name>
command.unban.error=\u00a7cAn error occurred while trying to unban the player. Please check the console.
command.invsee.notFound=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Player \u00a7e%%targetName%%\u00a7f was not found
command.invsee.targetIsAdmin=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Can't view the inventory of \u00a7e%%targetName%%\u00a7f, they're an admin.
command.invsee.error=\u00a7cAn error occurred while trying to view inventory. Please check the console.
command.copyinv.notFound=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Player \u00a7e%%targetName%%\u00a7f was not found
command.copyinv.targetIsAdmin=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Can't copy the inventory of \u00a7e%%targetName%%\u00a7f, they're an admin.
command.copyinv.error=\u00a7cAn error occurred while trying to copy inventory. Please check the console.
command.mute.usage=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Usage: !mute <player name> [time S | M | H | D] [reason]
command.mute.error.missingQuote=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Invalid format! Closing quotation mark missing for player name.
command.mute.notFound=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Player \u00a7e%%playerName%%\u00a7f was not found.
command.mute.error.invalidTimeFormat=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Usage: !mute <player name> [time S | M | H | D] [reason]. Invalid time format.
command.mute.error.invalidTimeUnit=\u00a76[\u00a7eSafeGuard\u00a76]\u00a7f Invalid time unit. Use S, M, H, or D.
command.mute.error=\u00a7cAn error occurred while trying to mute the player. Please check the console.
command.summon_npc.error=\u00a7cAn error occurred while trying to summon the NPC. Please check the console.
command.vanish.error=\u00a7cAn error occurred while trying to toggle vanish. Please check the console.
command.notify.error=\u00a7cAn error occurred while trying to toggle notifications. Please check the console.
# General UI Messages
ui.main.title=User Interface
ui.main.button.playerList=Player List
ui.playerlist.comingSoon=Player list coming soon!
ui.error.generic=An error occurred with the User Interface. Please try again.
ui.playerlist.title=Online Players
ui.playerlist.category.owners=\u00a7l\u00a7c-- Owners --
ui.playerlist.category.admins=\u00a7l\u00a76-- Admins --
ui.playerlist.category.members=\u00a7l\u00a7a-- Members --
ui.playerlist.noneOnline=None online.
ui.button.back=Back
ui.playerlist.label.owner=\u00a7c[Owner] 
ui.playerlist.label.admin=\u00a76[Admin] 
# General Terms
general.term.permanent=permanent
# Chat Messages (Index.js)
chat.mute.status=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a74 You were muted by \u00a7c%%adminName%%\u00a74 Time remaining: \u00a7c%%timeRemaining%% \u00a74reason: \u00a7c%%reason%%
chat.spam.kick.invalidPacket=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You have been permanently banned for sending invalid packet.
chat.spam.notify.invalidPacketAdmin=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c %%playerName%%\u00a74 was automatically banned for sending an invalid text packet (length=%%length%%)
chat.spam.error.repeating=\u00a7r\u00a7c Please don't send repeating messages!
chat.spam.error.commandsTooQuick=\u00a7r\u00a7c You're sending commands too quickly!
chat.spam.error.tooQuick=\u00a7r\u00a7c You're sending messages too quickly!
chat.spam.error.tooLong=\u00a7r\u00a7c Sorry! Your message has too many characters!
chat.spam.error.tooManyWords=\u00a7r\u00a7c Please keep your message below %%maxWords%% words!
chat.error.commandProcessing=\u00a7cAn error occurred while processing your command.
chat.error.generalChatProcessing=\u00a7cAn error occurred processing your chat message.
# Player Event Messages (Index.js)
chat.namespoof.kickMessage=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You have been permanently banned for namespoof.
chat.namespoof.adminNotify=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7r %%playerName%%\u00a7r\u00a74 was automatically banned for namespoof
system.setup.warningAdmins=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 WARNING! \u00a7cThe Anti Cheats is not setup, some features may not work. Please run \u00a77/function setup/setup\u00a7c to setup!
system.version.updateNotification=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Anti Cheats has successfully updated to v%%version%%
player.kick.globalBan.default=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74Your name was found in the global ban list.
player.kick.globalBan.detailed=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74You are on the global ban list.\n\u00a74Reason: \u00a7c%%reason%%\n\u00a74Banned by: \u00a7c%%bannedBy%%
player.unban.queue.success=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You were unbanned.
player.kick.existingBan.permanent=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74You are permanently banned.\n\u00a74Reason: \u00a7c%%reason%%\n\u00a74Banned by: \u00a7c%%bannedBy%%
player.kick.existingBan.temporary=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74You are banned.\n\u00a74Time Remaining: \u00a7c%%timeRemaining%%\n\u00a74Reason: \u00a7c%%reason%%\n\u00a74Banned by: \u00a7c%%bannedBy%%
player.kick.deviceBan.adminNotify=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a74 The player \u00a7c%%playerName%%\u00a74 was kicked for joining on banned device: \u00a7c%%deviceType%%
player.kick.deviceBan.playerMessage=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74Sorry, the administrators have banned the device you are playing on.
player.join.welcomer.firstTime=\u00a7r\u00a7e%%playerName%%\u00a7b is joining for the first time! This realm is protected by \u00a7eAnti Cheats\u00a7b, enjoy your stay!\u00a7r
player.join.welcomer.returning=\u00a7r\u00a7e%%playerName%%\u00a7b is joining on \u00a7e%%deviceType%%
player.dimension.lock.endSpawn=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 The end was locked by an admin!
player.dimension.lock.netherSpawn=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 The nether was locked by an admin!
player.combatLog.notify.detected=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7e %%playerName%%\u00a7r Was detected combat logging!
player.combatLog.punish.kill=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You were killed for combat logging
player.combatLog.punish.clearInventory=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r Your inventory was cleared for combat logging
player.combatLog.punish.tempBanKick=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You were temporarily banned for combat logging.
player.event.error.spawn=\u00a7cAn error occurred during the spawn process. Please notify an admin.
player.dimension.lock.endChange=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 The end was locked by an admin!
player.dimension.lock.netherChange=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 The nether was locked by an admin!
player.event.error.dimensionChange=\u00a7cAn error occurred processing your dimension change.
# System & Event Messages (Index.js Part 3)
player.combatLog.expired=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You are no longer in combat.
world.border.reached=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You reached the border of \u00a7e%%distance%%\u00a7f blocks!
player.death.coordinates=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a7eYou died at %%x%%, %%y%%, %%z%% (in %%dimension%%)
player.combatLog.warning.initial=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You are now in combat, leaving during combat will result in a punishment.
player.combatLog.warning.reminder=\u00a7r\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r You are now in combat.
item.adminPanel.noPermission=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a74You need admin tag to use admin panel!\u00a7r
item.adminPanel.error.notSetup=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7c\u00a7l ERROR: \u00a7r\u00a74Anti Cheats not setup!\u00a7r
item.adminPanel.error.notSetup.instruction=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a74 Run \u00a7c/function setup/setup\u00a74 to setup Anti Cheats!\u00a7r
world.block.break.illegal=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r\u00a7c\u00a7l \u00a7r\u00a7c%%playerName%%\u00a74 Attempted to break \u00a7c%%blockId%%
world.block.break.notify.diamondOre=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a75\u00a7l \u00a7r\u00a7e%%playerName%%\u00a7f mined x1 \u00a7ediamond ore\u00a7r
world.block.break.notify.netheriteOre=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a75\u00a7l \u00a7r\u00a7e%%playerName%%\u00a7f mined x1 \u00a7enetherite ore\u00a7r
# Util.js Messages
util.invsee.error.noInventoryComponent="\u00a7cCould not retrieve target player's inventory component."
util.invsee.error.noArmorComponent="\u00a7cCould not retrieve target player's armor component."
util.invsee.error.general="\u00a7cAn error occurred while trying to display the inventory."
util.invsee.title=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f %%playerName%%'s inventory:\n\n
util.invsee.slotItem=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Slot \u00a7e%%slot%%\u00a7f: \u00a7e%%itemName%%\u00a7f x\u00a7e%%amount%%
util.invsee.slotItemWithNameTag=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Slot \u00a7e%%slot%%\u00a7f: \u00a7e%%itemName%%\u00a7f x\u00a7e%%amount%% \u00a7fItem Name: \u00a7r%%nameTag%%
util.unbanQueue.alreadyPending=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f The player \u00a7e%%playerName%%\u00a7f is already pending an unban.
util.unbanQueue.error.saveFailed=\u00a7cError saving unban queue. Player may not be unbanned on rejoin.
util.unbanQueue.success=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f The player \u00a7e%%playerName%%\u00a7f was successfully put into unban queue, they will be unbanned when they join.
util.unbanQueue.error.general=\u00a7cAn error occurred while adding player to unban queue.
util.copyInv.error.noInventoryComponent=\u00a7cError accessing inventory components.
util.copyInv.error.noArmorComponent=\u00a7cError accessing armor/equippable components.
util.copyInv.success=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7f Finished copying inventory of \u00a7e%%playerName%%
util.copyInv.error.general=\u00a7cAn error occurred while copying the inventory.
util.copyInv.error.scheduleFailed=\u00a7cAn error occurred while trying to schedule the inventory copy.
util.alert.autoModKick.adminNotify=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7r\u00a7c %%playerName%%\u00a7r was automatically kicked by Anti Cheats AutoMod module. Detection[%%module%% = %%detectionValue%%]
util.alert.autoModKick.playerReason=\u00a76[\u00a7eAnti Cheats AutoMod\u00a76]\u00a7r You have been detected cheating. Module[%%module%% = %%detectionValue%%]
util.alert.general=\u00a76[\u00a7eAnti Cheats\u00a76]\u00a7r \u00a7c\u00a7l%%playerName%%\u00a7r\u00a74 was detected using \u00a7l\u00a7c%%detectionType%%\u00a7r\u00a74 with a value of \u00a7l\u00a7c%%detectionValue%%\u00a7r\u00a74!
util.formatMilliseconds.noTimeSet=No time set.
util.formatMilliseconds.days= Days
util.formatMilliseconds.hours= Hours
util.formatMilliseconds.mins= Mins
# Module Messages
modules.reach.notify.adminFlag=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c Player %%playerName%% flagged for Reach (%%reachType%%). Distance: %%actualDistance%%/%%maxAllowedDistance%%
modules.contextualKillaura.notify.adminFlag=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c Player %%playerName%% flagged for Killaura (%%violationType%%).
modules.fastuse.notify.adminFlag=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c Player %%playerName%% flagged for FastUse (%%itemName%%).
modules.noswing.notify.adminFlag=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c Player %%playerName%% flagged for NoSwing Killaura.
modules.rotation.notify.adminFlag=\u00a76[\u00a7eAnti Cheats Notify\u00a76]\u00a7c Player %%playerName%% flagged for Invalid Rotation (%%type%%: %%value%%).
player.vanish.reminder=\u00a7l\u00a77You are vanished.\u00a7r
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
chat.spam.error.repeating=\u00a7r\u00a7c ¡Por favor no repitas mensajes!
player.join.welcomer.firstTime=\u00a7r\u00a7e¡%%playerName%%\u00a7b se une por primera vez! Este reino está protegido por \u00a7eAnti Trampas\u00a7b, ¡disfruta tu estancia!\u00a7r
player.vanish.reminder=\u00a7l\u00a77Estás invisible.\u00a7r
command.panel.noPermission=\u00a7cNo tienes permiso para usar este comando.
ui.button.back=Atrás
system.error.manualFunctionExecute=ERROR: Esta función no debe ejecutarse manually
`
};
