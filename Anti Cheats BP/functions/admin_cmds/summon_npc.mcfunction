execute as @s[tag=admin] run summon npc ~ ~ ~
tellraw @s[tag=admin] {"rawtext":[{"text":"§6[§eAnti Cheats§6]§r §aSuccessfully summoned the NPC!§r"}]}
playsound random.levelup @s[tag=admin]
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eAnti Cheats§6]§r §4You need admin tag to run this!"}]}
playsound random.anvil_land @s[tag=!admin]
execute as @s[tag=admin] run tellraw @a[tag=admin,scores={ac:notify=1}] {"rawtext":[{"text":"§6[§eAnti Cheats Notify§6]§5§l "},{"selector":"@s"},{"text":" §bsummoned an§l§5 NPC! §r"}]}