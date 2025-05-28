# Anti Cheats Addon for Minecraft Bedrock Edition

## Description

This addon for Minecraft Bedrock Edition helps server admins by providing anti-cheat measures and server management tools. It detects common cheats, moderates chat, and offers configuration options.

## Key Features

*   **Cheat Detection:**
    *   **Movement:** Detects Fly, Speed, High Velocity, and Invalid Head Rotations.
    *   **Combat:** Detects AutoClicker (CPS check), Killaura (various checks), and Reach.
    *   **World Interaction:** Detects Nuker, Scaffold, FastUse, and X-Ray (suspicious ore mining).
    *   **Player:** Detects Anti-Gamemode Creative (Anti-GMC) and Namespoof.
*   **Administrative Tools:**
    *   **Admin Panel:** In-game item (`ac:admin_panel`) for managing settings and players.
    *   **Player Management:** Commands for ban, kick, mute, freeze, ranks, warnings, etc.
    *   **World Management:** End/Nether dimension lock, world border.
*   **Chat Moderation:**
    *   Anti-Spam: Prevents message flooding and repetition.
    *   Rank-Based Formatting: Displays player ranks and custom chat colors.
*   **Logging:**
    *   In-game command logging.
    *   Player join/leave logging.
    *   General operational logs.
*   **Configuration:**
    *   Extensive settings via `behaviour/scripts/config.js`.
    *   In-game commands for some configurations (via admin panel).
*   **Owner System:** Designates an owner for full administrative control.

## Installation

1.  **Download:** Get the `.mcaddon` file.
2.  **Import:** Import the `.mcaddon` into Minecraft (usually by opening the file or through game settings).
3.  **Apply to World:**
    *   In a new or existing world, go to "Behavior Packs" and activate "Anti Cheats BP". The "Anti Cheats RP" (Resource Pack) should apply automatically.
    *   **Enable "Beta APIs"** in your world settings. This is required.

## Configuration

Customize the addon via `behaviour/scripts/config.js` in the behavior pack.

*   **Owner Setup (Crucial for Full Control):**
    *   **Method 1: Pre-designate in Config:** Set the `ownerPlayerNameManual` field in `config.js` to the exact Gamertag of the owner. If this is set when the addon first loads in a world and no owner is recorded, this player becomes the owner.
    *   **Method 2: Claim with Password:** If no owner is set by the above method or already present, a player can claim ownership in-game using the command: `!owner <actual_password_here>`.
        *   Replace `<actual_password_here>` with the password defined in `OWNER_PASSWORD` in `config.js`.
        *   **Security Warning:** It is **critical** to change the default `OWNER_PASSWORD` in `config.js` to a strong, unique password.
*   **Module Toggles & Settings:** Enable/disable features and adjust parameters (e.g., max CPS, reach distance).
*   **Ranks:** Define custom ranks with permissions, display text, and colors.

**Note:** Always be careful when editing configuration files. Incorrect changes can cause errors.

## Setup After Installation & Configuration

1.  **Initial Load:** After applying the addon and (ideally) configuring an owner in `config.js`, load your world.
2.  **Finalize Setup:** The designated Owner (or any player with operator permissions if an owner hasn't been set up via `config.js` yet) should run the command:
    `/function ac`
    This command initializes necessary components like scoreboard objectives. A success message should appear. If you claimed ownership using the `!owner` command after this step, re-run `/function ac`.

## Usage

*   **Commands:** Admin commands typically use the prefix `!` (e.g., `!ban <player> <reason>`). See `config.js` for aliases.
*   **Admin Panel:** The "Admin Panel" item (`ac:admin_panel`) is usable by "Owner" or players with the `admin` tag for UI-based management.
*   **Permissions:**
    *   The "Owner" has all permissions.
    *   Players with the `admin` tag (grantable by the Owner) have most admin capabilities.
    *   Custom ranks allow varied access levels.
