scoreboard players add @s[tag=admin] ac:vanish 1
scoreboard players set @s[tag=admin,scores={ac:vanish=2..}] ac:vanish 0
effect @s[tag=admin,scores={ac:vanish=0}] invisibility 0 0
effect @s[tag=admin,scores={ac:vanish=0}] night_vision 0 0
effect @s[tag=admin,scores={ac:vanish=1}] invisibility 99999 0 true
effect @s[tag=admin,scores={ac:vanish=1}] night_vision 99999 10 true
tellraw @s[tag=admin,scores={ac:vanish=1}] {"rawtext":[{"text":"§6[§eAnti Cheats§6]§r §7Poof! You vanished!§r"}]}
tellraw @s[tag=admin,scores={ac:vanish=0}] {"rawtext":[{"text":"§6[§eAnti Cheats§6]§r §7Poof! You re-appeared!§r"}]}
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eAnti Cheats§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin] ~~~
playsound note.bass @s[tag=admin] ~~~
#notify
execute as @s[scores={ac:vanish=1}] run tellraw @a[tag=admin,scores={ac:notify=1}] {"rawtext":[{"text":"§6[§eAnti Cheats Notify§6]§5§l "},{"selector":"@s"},{"text":" §bvanished!§r"}]}
execute as @s[scores={ac:vanish=0}] run tellraw @a[tag=admin,scores={ac:notify=1}] {"rawtext":[{"text":"§6[§eAnti Cheats Notify§6]§5§l "},{"selector":"@s"},{"text":" §bre-appeared from vanish!§r"}]}