# Anti Cheats Addon for Minecraft Bedrock Edition

## Description

This is a comprehensive addon for Minecraft Bedrock Edition designed to assist server administrators by providing robust anti-cheat measures and server management tools. It focuses on detecting and mitigating common cheats, moderating chat, and offering configuration options to tailor its behavior to your server's needs.

## Key Features

*   **Advanced Cheat Detection:**
    *   **Movement:** Flags suspicious movement patterns like Fly, Speed, High Velocity, and Invalid Head Rotations.
    *   **Combat:** Detects AutoClicker (CPS check), Killaura (Multi-target, Invalid Context, NoSwing), and Reach.
    *   **World Interaction:** Identifies Nuker behavior (including deep ore nuking), Scaffold, FastUse, and X-Ray (suspicious ore mining).
    *   **Player:** Checks for Anti-Gamemode Creative (Anti-GMC) and Namespoof.
*   **Administrative Tools:**
    *   **Admin Panel:** An in-game item (`ac:admin_panel`) for admins to manage addon settings and players.
    *   **Player Management:** Commands for ban, kick, mute, freeze, rank setting, warnings, etc.
    *   **World Management:** End/Nether dimension lock, world border.
*   **Chat Moderation:**
    *   Anti-Spam: Prevents message flooding and repetition.
    *   Rank-Based Formatting: Displays player ranks and custom chat colors.
*   **Logging:**
    *   In-game command logging.
    *   Player join/leave logging.
    *   General operational logs.
*   **Configuration:**
    *   Extensive settings via `behaviour/scripts/config.js` allowing customization of most features.
    *   In-game commands for some configurations (linked to the admin panel).
*   **Owner System:** Designates an owner based on configuration or an in-game command. Ensures administrative control from the start.

## Installation

1.  **Download:** Obtain the `.mcaddon` file for this pack.
2.  **Import:** Import the `.mcaddon` file into Minecraft. This can usually be done by opening the file with Minecraft or importing it through the game's settings.
3.  **Apply to World:**
    *   Create a new world or edit an existing one.
    *   Go to "Behavior Packs" and activate the "Anti Cheats BP". The "Anti Cheats RP" (Resource Pack) should be automatically applied as a dependency.
    *   Ensure the "Beta APIs" experimental toggle is **enabled** in your world settings for this addon to function correctly.

## Setup

1.  **Initial Load:** Once the addon is applied to a world and the world is loaded, the addon will perform its initial setup.
2.  **Owner Designation:** The addon uses a specific process to establish the "Owner" (see "Configuration" and "Usage" sections for details on setting/claiming ownership).
3.  **Setup Command:** The designated Owner (or any player with operator permissions if the Owner isn't set up yet) should run the command:
    `/function ac`
    This command finalizes the setup, including creating necessary scoreboard objectives. You should see a success message.

## Configuration

Most of the addon's behavior can be customized through the `behaviour/scripts/config.js` file within the behavior pack.

*   **Owner Designation & `OWNER_PASSWORD`**:
    *   You can pre-designate an owner by setting the `ownerPlayerNameManual` field in `behaviour/scripts/config.js`. If this is set when the addon initializes and no owner is already recorded, this player will become the owner.
    *   If no owner is set via config or already in place, a player can claim ownership by using the command `!owner <actual_password_here>`, replacing `<actual_password_here>` with the password set in `OWNER_PASSWORD` in `config.js`.
    *   It is **highly recommended** to change the default `OWNER_PASSWORD` in `config.js` to something secure, as this password is used for the `!owner` command.
*   **Module Toggles:** Many features can be enabled or disabled, and their detection parameters (e.g., max CPS, reach distance) can be adjusted.
*   **Ranks:** Define custom ranks with specific permissions, display text, and colors.

Always be careful when editing configuration files. Incorrect changes can lead to errors.

## Usage

*   **Commands:** Admin commands typically use the prefix `!` (e.g., `!ban <player> <reason>`). A list of aliases can be found in `config.js`.
*   **Admin Panel:** The "Admin Panel" item (`ac:admin_panel`) can be used by players with the "admin" tag (or the Owner) to access UI-based settings and player management tools.
*   **Permissions:**
    *   The "Owner" (established via configuration, the `!owner` command, or if an owner was already present from a previous version) has all permissions.
    *   Players with the `admin` tag (which can be granted by the Owner) have most administrative capabilities.
    *   Custom ranks can be configured for varying levels of access.

## Contributing

Contributions are welcome! If you'd like to contribute to the development of this addon:

1.  **Fork the Repository:** Create your own fork of the project.
2.  **Create a Branch:** Make a new branch in your fork for your feature or bug fix (e.g., `feature/new-check` or `fix/killaura-bug`).
3.  **Make Your Changes:** Implement your improvements or fixes.
4.  **Test Thoroughly:** Ensure your changes work as expected and don't break existing functionality.
5.  **Submit a Pull Request:** Create a pull request from your branch to the main repository, detailing the changes you've made.
