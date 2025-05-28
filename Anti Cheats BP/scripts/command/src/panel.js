import { newCommand } from "../../handle.js"; // Path relative to src/
import { showAdminPanel } from "../../../forms/admin_panel.js"; // Path relative to src/

newCommand({
    name: "panel",
    description: "Opens the Admin Panel.",
    adminOnly: true, // Ensures only admins can use it
    run: ({ player }) => {
        showAdminPanel(player);
    }
});
