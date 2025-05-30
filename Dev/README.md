# Addon Development Resources

This folder contains useful resources, documentation links, and potentially helper scripts for the development and debugging of this Minecraft Bedrock Edition addon.

## Official Documentation & Samples

*   **Minecraft Creator Documentation (Bedrock)**:
    *   [https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable](https://learn.microsoft.com/en-us/minecraft/creator/?view=minecraft-bedrock-stable)
    *   The official hub for Bedrock addon development documentation.

*   **Mojang Bedrock Addon Samples**:
    *   [https://github.com/Mojang/bedrock-samples](https://github.com/Mojang/bedrock-samples)
    *   Example packs and scripts provided by Mojang.

*   **Mojang Minecraft Creator Tools**:
    *   [https://github.com/Mojang/minecraft-creator-tools](https://github.com/Mojang/minecraft-creator-tools)
    *   Tools to aid in the development of Minecraft addons.

*   **Microsoft Minecraft Samples**:
    *   [https://github.com/microsoft/minecraft-samples](https://github.com/microsoft/minecraft-samples)
    *   Various samples related to Minecraft development from Microsoft.

*   **Mojang Minecraft Scripting Libraries**:
    *   [https://github.com/Mojang/minecraft-scripting-libraries](https://github.com/Mojang/minecraft-scripting-libraries)
    *   Reusable scripting libraries from Mojang.

## Purpose of this Folder

This directory can be used by developers (including AI assistants like Jules) to:
- Store links to relevant external documentation.
- Keep notes on development practices specific to this addon.
- Place utility scripts for debugging or build processes.
- Maintain any other resources that facilitate understanding and working on this addon.

## Important Workflow Notes for AI Assistants

### Regarding File Deletions

**Issue:** When an AI assistant "deletes" a file in a feature branch, this deletion may not persist correctly when the feature branch is merged into the `main` branch. The file might reappear in `main` despite being deleted in the feature branch.

**Workaround/Procedure:** To ensure a file is properly removed from the project:

1.  **Empty the File:** Remove all content from the file you intend to delete.
2.  **Rename and Move:**
    *   Rename the file to clearly indicate its status and original type, e.g., `deleted_<original_name>.<original_extension>` or `deleted_1.<original_extension>`, `deleted_2.<original_extension>`, etc. if there are multiple.
    *   Move this emptied and renamed file to a dedicated subdirectory within the `Dev/` folder, such as `Dev/files_pending_deletion/`.
3.  **Commit Changes:** Commit the emptied file now located and renamed in the `Dev/files_pending_deletion/` directory.
4.  **Manual Deletion on `main`:** A human developer will then need to manually perform the final `git rm` of these files in the `Dev/files_pending_deletion/` directory directly on the `main` branch (or during the merge process if the platform allows direct commits to main or post-merge cleanups) to ensure they are properly removed from the repository's history.

This process makes the intent to delete clear and works around potential issues with how file deletions in branches are handled by the git tooling or merge process.
