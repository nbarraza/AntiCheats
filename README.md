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

1.  **Download the Addon Files:**
    *   **Option 1: `.mcaddon` file (Recommended for most users)**
        *   Download the `AC.<version>.mcaddon` file (e.g., `AC.v1.2.3.mcaddon`) from the project's releases page. This single file bundles both the Behavior Pack and Resource Pack.
    *   **Option 2: Separate `.mcpack` files**
        *   Alternatively, you can download the individual pack files from the project's releases page:
            *   `AC BPv<version>.mcpack` (Behavior Pack)
            *   `AC RPv<version>.mcpack` (Resource Pack)
        *   This method is for users who prefer to install or manage the packs separately.

2.  **Import into Minecraft:**
    *   **If using the `.mcaddon` file:**
        *   Open the `.mcaddon` file (e.g., by double-clicking it). Minecraft should launch and import both the Behavior and Resource packs automatically.
    *   **If using separate `.mcpack` files:**
        *   Open the `AC BPv<version>.mcpack` file. Minecraft should launch and import the Behavior Pack.
        *   Then, open the `AC RPv<version>.mcpack` file. Minecraft should launch and import the Resource Pack.
        *   You may need to do this one at a time.

3.  **Apply to Your World:**
    *   Create a new world or edit an existing one.
    *   Go to **Behavior Packs** under "Add-Ons". Find "Anti Cheats BP" in the "Available" packs and activate it.
    *   Go to **Resource Packs**. "Anti Cheats RP" should be automatically activated in the "Active" packs list. If not, find it in "Available" and activate it.
    *   **Enable "Beta APIs" AND "Custom Components V2"** in your world's "Experiments" settings. Both are required for the addon to function correctly.

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
