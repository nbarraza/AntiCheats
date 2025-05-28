// behaviour/scripts/tests/ui.test.js

/**
 * Processes (filters and sorts) an array of ban logs based on specified options.
 * This logic is extracted from the banLogForm function in ui.js for testability.
 *
 * @param {Array<Object>} allLogs An array of log objects. Each log object is expected
 *                                to have at least properties:
 *                                - a: playerName (string)
 *                                - b: adminName (string)
 *                                - c: timestamp (number or date string)
 *                                - logId: uniqueLogId (string)
 * @param {object} [filterOptions={}] Optional parameters for filtering and sorting.
 * @param {string} [filterOptions.playerName=""] Filter logs by player name (case-insensitive, partial match).
 * @param {string} [filterOptions.adminName=""] Filter logs by admin name (case-insensitive, partial match).
 * @param {"date"|"playerName"|"adminName"} [filterOptions.sortBy="date"] Criteria to sort logs by.
 * @param {"asc"|"desc"} [filterOptions.sortOrder="desc"] Order to sort logs in.
 * @returns {Array<Object>} The processed (filtered and sorted) array of logs.
 */
function processBanLogs(allLogs, filterOptions = {}) {
    let filteredLogs = [...allLogs];

    // Apply Player Name Filter
    if (filterOptions.playerName && filterOptions.playerName.trim() !== "") {
        const filterPlayer = filterOptions.playerName.trim().toLowerCase();
        filteredLogs = filteredLogs.filter(log => log.a && log.a.toLowerCase().includes(filterPlayer));
    }

    // Apply Admin Name Filter
    if (filterOptions.adminName && filterOptions.adminName.trim() !== "") {
        const filterAdmin = filterOptions.adminName.trim().toLowerCase();
        filteredLogs = filteredLogs.filter(log => log.b && log.b.toLowerCase().includes(filterAdmin));
    }

    // Apply Sorting
    const sortBy = filterOptions.sortBy || "date";
    const sortOrder = filterOptions.sortOrder || "desc"; // Default sort order descending

    filteredLogs.sort((log1, log2) => {
        let val1, val2;
        switch (sortBy) {
            case "playerName":
                val1 = (log1.a || "").toLowerCase();
                val2 = (log2.a || "").toLowerCase();
                break;
            case "adminName":
                val1 = (log1.b || "").toLowerCase();
                val2 = (log2.b || "").toLowerCase();
                break;
            case "date":
            default:
                val1 = typeof log1.c === 'string' ? new Date(log1.c).getTime() : Number(log1.c || 0);
                val2 = typeof log2.c === 'string' ? new Date(log2.c).getTime() : Number(log2.c || 0);
                break;
        }

        if (typeof val1 === 'string' && typeof val2 === 'string') {
            return sortOrder === "asc" ? val1.localeCompare(val2) : val2.localeCompare(val1);
        } else { // Handles numbers (timestamps)
            return sortOrder === "asc" ? val1 - val2 : val2 - val1;
        }
    });

    return filteredLogs;
}

/**
 * Deletes a specific log entry from an array of ban logs based on its logId.
 * This logic is extracted for testability.
 *
 * @param {Array<Object>} currentLogsArray An array of log objects.
 * @param {string} logIdToDelete The unique ID of the log entry to delete.
 * @returns {Array<Object>|null} A new array with the log entry removed.
 *                               Returns the original array if logIdToDelete is null/undefined
 *                               or if the log entry is not found. Consider returning null or specific error for "not found" if needed by callers.
 *                               For this test version, let's return a new array always, even if no change.
 */
function deleteBanLogEntry(currentLogsArray, logIdToDelete) {
    if (!logIdToDelete) {
        // Or throw new Error("logIdToDelete cannot be null or undefined");
        return [...currentLogsArray]; // Return a copy, no change
    }
    const filteredLogs = currentLogsArray.filter(log => log.logId !== logIdToDelete);
    return filteredLogs;
}

/**
 * Formats the button text for a command log entry.
 * Mimics logic from showCommandLogsForm in ui.js.
 * @param {object} log - The command log object, expected: { playerName: string, command: string, timestamp: number }
 * @returns {string} Formatted button text.
 */
function formatCommandLogButtonText(log) {
    if (!log || typeof log.command === 'undefined' || typeof log.timestamp === 'undefined') return "Invalid log data";
    const cmdPreview = log.command.length > 25 ? log.command.substring(0, 22) + "..." : log.command;
    const time = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // Actual format in ui.js: `§e${log.playerName}§r: ${cmdPreview}
//§7${time}`
    // For testing, we'll just check the core components for now, not the color codes unless essential.
    return `${log.playerName || 'N/A'}: ${cmdPreview} (${time})`;
}

/**
 * Formats the detail string for a command log entry.
 * Mimics logic from showCommandLogDetailForm in ui.js.
 * @param {object} log - The command log object, expected: { playerName: string, playerId: string, timestamp: number, command: string }
 * @returns {string} Formatted detail string.
 */
function formatCommandLogDetail(log) {
    if (!log) return "Invalid log data";
    const timestampStr = new Date(log.timestamp || 0).toLocaleString();
    // Actual format in ui.js uses line breaks and labels.
    // For testing, checking content.
    return `Player: ${log.playerName || 'N/A'}, ID: ${log.playerId || "N/A"}, Timestamp: ${timestampStr}, Command: ${log.command || ''}`;
}

/**
 * Formats the button text for a player activity log entry.
 * Mimics logic from showPlayerActivityLogsForm in ui.js.
 * @param {object} log - The activity log object, expected: { playerName: string, eventType: 'join'|'leave', timestamp: number }
 * @returns {string} Formatted button text.
 */
function formatPlayerActivityLogButtonText(log) {
    if (!log || !log.eventType || typeof log.timestamp === 'undefined') return "Invalid log data";
    const eventText = log.eventType === 'join' ? 'Joined' : 'Left'; // Simplified from color codes for testing
    const time = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // Actual format: `§e${log.playerName}§r (${eventTextWithColor}§r)
//§7${time}`
    return `${log.playerName || 'N/A'} (${eventText}) (${time})`;
}

/**
 * Formats the detail string for a player activity log entry.
 * Mimics logic from showPlayerActivityLogDetailForm in ui.js.
 * @param {object} log - The activity log object, expected: { playerName: string, playerId: string, eventType: 'join'|'leave', timestamp: number }
 * @returns {string} Formatted detail string.
 */
function formatPlayerActivityLogDetail(log) {
    if (!log || !log.eventType) return "Invalid log data";
    const eventTypeStr = log.eventType === 'join' ? 'Player Join' : 'Player Leave';
    const timestampStr = new Date(log.timestamp || 0).toLocaleString();
    return `Player: ${log.playerName || 'N/A'}, ID: ${log.playerId || "N/A"}, Event: ${eventTypeStr}, Timestamp: ${timestampStr}`;
}

/**
 * Extracts and processes data similar to how showSystemInformation does.
 * This is for testing the data aggregation logic.
 * @param {Array<object>} mockPlayers - Array of mock player objects. Each player should have methods like isOwner(), hasTag(), and a name property.
 * @param {string|null} mockBanLogsProperty - Mock string content of 'ac:banLogs' dynamic property.
 * @param {string|null} mockTpsProperty - Mock string content of 'ac:systemInfo_scriptTps' dynamic property.
 * @returns {object} An object containing aggregated system information.
 */
function extractSystemInformationData(mockPlayers, mockBanLogsProperty, mockTpsProperty) {
    const output = {
        onlinePlayerCount: 0,
        ownerNames: [],
        adminNames: [],
        normalPlayerNames: [],
        ownerOnlineCount: 0,
        adminsOnlineCount: 0,
        normalPlayerCount: 0,
        bannedPlayersCount: "0", // Default to "0" if no logs property
        scriptTps: "N/A"
    };

    if (mockPlayers) {
        output.onlinePlayerCount = mockPlayers.length;
        for (const p of mockPlayers) {
            if (p.isOwner()) {
                output.ownerNames.push(`§c${p.name}§r`);
            } else if (p.hasTag('admin')) {
                output.adminNames.push(`§6${p.name}§r`);
            } else {
                output.normalPlayerNames.push(`§a${p.name}§r`);
            }
        }
        output.ownerOnlineCount = output.ownerNames.length;
        output.adminsOnlineCount = output.adminNames.length;
        output.normalPlayerCount = output.normalPlayerNames.length;
    }

    try {
        if (mockBanLogsProperty) {
            const banLogs = JSON.parse(mockBanLogsProperty);
            if (Array.isArray(banLogs)) {
                output.bannedPlayersCount = banLogs.length.toString();
            } else {
                output.bannedPlayersCount = "Error reading logs (not an array)";
            }
        } else {
             // Already defaulted to "0", but explicit if property is null/undefined
            output.bannedPlayersCount = "0";
        }
    } catch (e) {
        // In a real scenario, logDebug would be called.
        output.bannedPlayersCount = "Error reading logs";
    }

    if (mockTpsProperty) {
        output.scriptTps = mockTpsProperty;
    }
    
    // We won't format the full bodyText here, just return the raw data.
    // The serverTime is also omitted as it's environment-dependent.
    return output;
}

/**
 * Simulates adding a log entry to an in-memory log array and applying a size limit.
 * @param {object} logEntry The log entry to add.
 * @param {Array<object>} currentInMemoryArray The current in-memory array of logs.
 * @param {number} trimThreshold If array length exceeds this, it's trimmed from the start.
 * @param {number} trimToSize The size to trim the array down to.
 * @returns {Array<object>} The new state of the in-memory array.
 */
function simulateAddInMemoryLog(logEntry, currentInMemoryArray, trimThreshold, trimToSize) {
    const newArray = [...currentInMemoryArray]; // Work on a copy
    newArray.push(logEntry);
    if (newArray.length > trimThreshold) {
        return newArray.slice(newArray.length - trimToSize);
    }
    return newArray;
}

/**
 * Simulates the core logic of processing and preparing logs for saving from an in-memory queue.
 * @param {Array<object>} inMemoryLogs The array of new logs currently in memory.
 * @param {string|null} existingRawLogsString The raw JSON string of logs from the dynamic property.
 * @param {number} maxEntries The maximum number of log entries to keep in total.
 * @returns {{ logsToSaveString: string, finalLogsArray: Array<object> }}
 *           - logsToSaveString: The JSON string to be saved to the dynamic property.
 *           - finalLogsArray: The array representing the state after combining and trimming.
 */
function simulateProcessLogsForSave(inMemoryLogs, existingRawLogsString, maxEntries) {
    let existingLogs = [];
    if (typeof existingRawLogsString === 'string') {
        try {
            existingLogs = JSON.parse(existingRawLogsString);
            if (!Array.isArray(existingLogs)) existingLogs = [];
        } catch { existingLogs = []; }
    }

    const combinedLogs = existingLogs.concat(inMemoryLogs);
    const finalLogsArray = combinedLogs.slice(-maxEntries); // Keep only the last maxEntries
    const logsToSaveString = JSON.stringify(finalLogsArray);

    return { logsToSaveString, finalLogsArray };
}

/**
 * Simulates the world.addLog logic for adding to an in-memory general log queue.
 * @param {string} message The message to log.
 * @param {Array<object>} currentInMemoryGeneralLogs The current in-memory general logs.
 * @param {number} maxGeneralLogEntries Max entries for this log type.
 * @returns {Array<object>} The new state of in-memory general logs.
 */
function simulateWorldAddLog(message, currentInMemoryGeneralLogs, maxGeneralLogEntries) {
    const newLogs = [...currentInMemoryGeneralLogs];
    if (newLogs.length >= maxGeneralLogEntries) {
        newLogs.shift(); 
    }
    newLogs.push(`[${new Date().toISOString().substring(0,10)}] ${message}`); // Simplified timestamp for predictable testing
    return newLogs;
}

/**
 * Simulates the UI log cache and retrieval logic for testing.
 */
const testUiLogCache = {
    cache: {},
    CACHE_DURATION_MS: 3000, // Same as in ui.js for consistency in testing
    
    /**
     * Simulates world.getDynamicProperty for testing purposes.
     * @param {string} key The property key.
     * @returns {string | undefined}
     */
    mockGetDynamicProperty: function(key) {
        // This should be populated by tests to simulate different raw values
        return this.mockProperties[key];
    },
    mockProperties: {}, // Test will set this

    /**
     * Simulates getLogsFromPropertyWithCache from ui.js
     */
    getLogs: function(dynamicPropertyKey, logTypeNameForError) {
        const cached = this.cache[dynamicPropertyKey];
        const currentTime = Date.now(); // Use real time for expiration testing
        const rawLogs = this.mockGetDynamicProperty(dynamicPropertyKey);

        if (cached && (currentTime - cached.timestamp < this.CACHE_DURATION_MS) && cached.raw === rawLogs) {
            cached.hit = true; // Mark a cache hit for test assertion
            return cached.data;
        }

        let logsArray = [];
        if (typeof rawLogs === 'string') {
            try {
                logsArray = JSON.parse(rawLogs);
                if (!Array.isArray(logsArray)) {
                    logsArray = [];
                }
            } catch (e) {
                logsArray = [];
            }
        }
        
        this.cache[dynamicPropertyKey] = { data: logsArray, timestamp: currentTime, raw: rawLogs, hit: false };
        return logsArray;
    },

    /**
     * Clears a specific cache entry, e.g., for invalidation.
     */
    clearCacheEntry: function(dynamicPropertyKey) {
        delete this.cache[dynamicPropertyKey];
    },

    /**
     * Resets the entire cache and mock properties for clean tests.
     */
    reset: function() {
        this.cache = {};
        this.mockProperties = {};
    }
};

/**
 * Simulates the creation of a Set of banned player names from a list of ban entries.
 * Mirrors the logic used in initialize.js for world.dynamicGbanNameSet.
 * @param {Array<object|string>} gbanListArray - Array of ban entries (string names or objects with a 'name' property).
 * @returns {Set<string>} A Set containing all unique banned player names.
 */
function createGbanNameSet(gbanListArray) {
    if (!Array.isArray(gbanListArray)) return new Set();
    return new Set(gbanListArray.map(entry => (typeof entry === 'string' ? entry : entry.name)));
}

/**
 * Simulates the logic within _createBasicLogViewerListForm for determining
 * the body message and the slice of logs to display.
 * @param {Array<object>} allDisplayLogs - All logs for the current view (e.g., already reversed).
 * @param {number} maxButtons - The maximum number of log buttons to display.
 * @param {string} logTypeName - User-friendly name for the log type (e.g., "command", "player activity").
 * @returns {{body: string, logsToShow: Array<object>}}
 */
function simulateLogViewerListPresentation(allDisplayLogs, maxButtons, logTypeName) {
    let body;
    let logsToShow;

    if (allDisplayLogs.length > 0) {
        logsToShow = allDisplayLogs.slice(0, maxButtons);
        if (allDisplayLogs.length > maxButtons) {
            body = `Displaying the ${maxButtons} most recent ${logTypeName} logs. (${allDisplayLogs.length} total logs found)`;
        } else {
            body = `Select a log entry to view details. (${allDisplayLogs.length} logs found)`;
        }
    } else {
        logsToShow = [];
        body = `No ${logTypeName} logs found.`;
    }
    return { body, logsToShow };
}

// --- Test Cases ---

const mockLogs = [
    { a: "PlayerA", b: "AdminX", c: 1678886400000, d: "Reason1", logId: "log1" }, // Mar 15 2023 12:00:00
    { a: "PlayerB", b: "AdminY", c: 1678972800000, d: "Reason2", logId: "log2" }, // Mar 16 2023 12:00:00
    { a: "playerA", b: "AdminZ", c: 1678790400000, d: "Reason3", logId: "log3" }, // Mar 14 2023 12:00:00 (note lowercase player)
    { a: "PlayerC", b: "adminX", c: 1679059200000, d: "Reason4", logId: "log4" }, // Mar 17 2023 12:00:00 (note lowercase admin)
    { a: "AnotherPlayer", b: "AdminW", c: 1678880000000, d: "Reason5", logId: "log5" } // Mar 15 2023 10:13:20
];

function runTests() {
    let testsPassed = 0;
    let testsFailed = 0;

    function assert(condition, message) {
        if (condition) {
            testsPassed++;
            console.log(`PASS: ${message}`);
        } else {
            testsFailed++;
            console.error(`FAIL: ${message}`);
        }
    }

    // Test 1: No filters, default sort (date desc)
    let result1 = processBanLogs(mockLogs);
    assert(result1.length === 5, "Test 1.1: No filters - length");
    assert(result1[0].logId === "log4" && result1[4].logId === "log3", "Test 1.2: No filters - default sort (date desc)");

    // Test 2: Filter by playerName (case-insensitive)
    let result2 = processBanLogs(mockLogs, { playerName: "playerA" });
    assert(result2.length === 2, "Test 2.1: Filter playerName 'playerA' - length");
    assert(result2.every(log => log.a.toLowerCase().includes("playera")), "Test 2.2: Filter playerName 'playerA' - content");
    assert(result2[0].logId === "log1" && result2[1].logId === "log3", "Test 2.3: Filter playerName 'playerA' - default sort (date desc)");


    // Test 3: Filter by adminName (case-insensitive)
    let result3 = processBanLogs(mockLogs, { adminName: "AdminX" });
    assert(result3.length === 2, "Test 3.1: Filter adminName 'AdminX' - length");
    assert(result3.every(log => log.b.toLowerCase().includes("adminx")), "Test 3.2: Filter adminName 'AdminX' - content");
    assert(result3[0].logId === "log4" && result3[1].logId === "log1", "Test 3.3: Filter adminName 'AdminX' - default sort (date desc)");

    // Test 4: Filter by playerName and adminName
    let result4 = processBanLogs(mockLogs, { playerName: "PlayerA", adminName: "AdminX" });
    assert(result4.length === 1, "Test 4.1: Filter playerName 'PlayerA' AND adminName 'AdminX' - length");
    assert(result4[0].logId === "log1", "Test 4.2: Filter playerName 'PlayerA' AND adminName 'AdminX' - content");

    // Test 5: Sort by playerName asc
    let result5 = processBanLogs(mockLogs, { sortBy: "playerName", sortOrder: "asc" });
    assert(result5[0].logId === "log5" && result5[4].logId === "log2", "Test 5.1: Sort playerName asc - order");
    // Expected: AnotherPlayer, PlayerA, playerA, PlayerB, PlayerC
    assert(result5[0].a === "AnotherPlayer" && result5[1].a === "PlayerA" && result5[2].a === "playerA" && result5[3].a === "PlayerB" && result5[4].a === "PlayerC", "Test 5.2: Sort playerName asc - names correct")


    // Test 6: Sort by adminName desc
    let result6 = processBanLogs(mockLogs, { sortBy: "adminName", sortOrder: "desc" });
    assert(result6[0].logId === "log3" && result6[4].logId === "log5", "Test 6.1: Sort adminName desc - order");
     // Expected: AdminZ, AdminY, AdminX, adminX, AdminW
    assert(result6[0].b === "AdminZ" && result6[1].b === "AdminY" && result6[2].b === "AdminX" && result6[3].b === "adminX" && result6[4].b === "AdminW", "Test 6.2: Sort adminName desc - names correct")

    // Test 7: Sort by date asc
    let result7 = processBanLogs(mockLogs, { sortBy: "date", sortOrder: "asc" });
    assert(result7[0].logId === "log3" && result7[4].logId === "log4", "Test 7: Sort date asc - order");

    // Test 8: Empty logs input
    let result8 = processBanLogs([], { playerName: "PlayerA" });
    assert(result8.length === 0, "Test 8: Empty logs input - length");

    // Test 9: Filter resulting in empty
    let result9 = processBanLogs(mockLogs, { playerName: "NonExistentPlayer" });
    assert(result9.length === 0, "Test 9: Filter results in empty - length");

    // Test 10: Logs with missing 'a' or 'b' properties for robustness
    const logsWithMissingProps = [
        { c: 1678886400000, d: "Reason1", logId: "log_missing_ab" },
        { a: "PlayerD", c: 1678972800000, d: "Reason2", logId: "log_missing_b" },
        { b: "AdminE", c: 1678790400000, d: "Reason3", logId: "log_missing_a" },
        mockLogs[0] // Add a valid log
    ];
    let result10_1 = processBanLogs(logsWithMissingProps, { playerName: "PlayerD" });
    assert(result10_1.length === 1 && result10_1[0].logId === "log_missing_b", "Test 10.1: Filter with missing 'b' property");
    
    let result10_2 = processBanLogs(logsWithMissingProps, { adminName: "AdminE" });
    assert(result10_2.length === 1 && result10_2[0].logId === "log_missing_a", "Test 10.2: Filter with missing 'a' property");

    let result10_3 = processBanLogs(logsWithMissingProps, { sortBy: "playerName", sortOrder: "asc" });
    // Should not crash, and logs without 'a' should be ordered consistently (e.g., as empty strings)
    assert(result10_3.length === 4, "Test 10.3: Sort playerName with missing 'a' properties - length");
    // Assuming logs with missing 'a' are treated as empty string and come first when ascending
    assert(result10_3[0].logId === "log_missing_ab" && result10_3[1].logId === "log_missing_a", "Test 10.3.1: Sort playerName with missing 'a' - order of missing");

    // --- Tests for deleteBanLogEntry ---
    console.log("\n--- Testing deleteBanLogEntry ---");

    // Test D1: Basic deletion
    let logsForDeletion = [
        { logId: "del1", a: "PlayerA" },
        { logId: "del2", a: "PlayerB" },
        { logId: "del3", a: "PlayerC" }
    ];
    let resultD1 = deleteBanLogEntry(logsForDeletion, "del2");
    assert(resultD1.length === 2, "Test D1.1: Basic deletion - length");
    assert(resultD1.find(log => log.logId === "del2") === undefined, "Test D1.2: Basic deletion - entry removed");
    assert(logsForDeletion.length === 3, "Test D1.3: Basic deletion - original array unmodified");

    // Test D2: logId not found
    let resultD2 = deleteBanLogEntry(logsForDeletion, "del4");
    assert(resultD2.length === 3, "Test D2.1: logId not found - length unchanged");
    assert(JSON.stringify(resultD2) === JSON.stringify(logsForDeletion), "Test D2.2: logId not found - array content unchanged (check by value)");


    // Test D3: Empty logs array
    let resultD3 = deleteBanLogEntry([], "del1");
    assert(resultD3.length === 0, "Test D3: Empty logs array - length");

    // Test D4: Null logIdToDelete
    let resultD4 = deleteBanLogEntry(logsForDeletion, null);
    assert(resultD4.length === 3, "Test D4.1: Null logIdToDelete - length unchanged");
    assert(JSON.stringify(resultD4) === JSON.stringify(logsForDeletion), "Test D4.2: Null logIdToDelete - array content unchanged");


    // Test D5: Undefined logIdToDelete
    let resultD5 = deleteBanLogEntry(logsForDeletion, undefined);
    assert(resultD5.length === 3, "Test D5.1: Undefined logIdToDelete - length unchanged");
    assert(JSON.stringify(resultD5) === JSON.stringify(logsForDeletion), "Test D5.2: Undefined logIdToDelete - array content unchanged");
    
    // Test D6: Deleting the only element
    let singleLogArray = [{ logId: "single", a: "PlayerSolo" }];
    let resultD6 = deleteBanLogEntry(singleLogArray, "single");
    assert(resultD6.length === 0, "Test D6: Deleting the only element - length");

    // --- Tests for Command Log Formatting ---
    console.log("\n--- Testing Command Log Formatting ---");
    const mockCmdLog = { playerName: "Tester", command: "test command run here", timestamp: 1679100000000, playerId: "p123" }; // Mar 17 2023 17:40:00 GMT
    const longCmdLog = { playerName: "SuperUser", command: "this is a very long command that will surely exceed twenty five characters limit", timestamp: 1679100060000, playerId: "p456" };
    
    let resultCLF1 = formatCommandLogButtonText(mockCmdLog);
    // Example time: "05:40:00 PM" or similar based on locale. Test for presence of core info.
    assert(resultCLF1.includes("Tester: test command run here") && resultCLF1.includes(new Date(mockCmdLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })), "Test CLF1: Command log button text - short command");

    let resultCLF2 = formatCommandLogButtonText(longCmdLog);
    assert(resultCLF2.includes("SuperUser: this is a very long co...") && resultCLF2.includes(new Date(longCmdLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })), "Test CLF2: Command log button text - long command (truncated)");

    let resultCLD1 = formatCommandLogDetail(mockCmdLog);
    assert(resultCLD1.includes("Player: Tester") && resultCLD1.includes("ID: p123") && resultCLD1.includes("Command: test command run here") && resultCLD1.includes(new Date(mockCmdLog.timestamp).toLocaleString()), "Test CLD1: Command log detail text");

    // --- Tests for Player Activity Log Formatting ---
    console.log("\n--- Testing Player Activity Log Formatting ---");
    const mockJoinLog = { playerName: "Joiner", eventType: "join", timestamp: 1679100120000, playerId: "p789" }; // Mar 17 2023 17:42:00 GMT
    const mockLeaveLog = { playerName: "Leaver", eventType: "leave", timestamp: 1679100180000, playerId: "p012" };

    let resultPALF1 = formatPlayerActivityLogButtonText(mockJoinLog);
    assert(resultPALF1.includes("Joiner (Joined)") && resultPALF1.includes(new Date(mockJoinLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })), "Test PALF1: Join log button text");
    
    let resultPALF2 = formatPlayerActivityLogButtonText(mockLeaveLog);
    assert(resultPALF2.includes("Leaver (Left)") && resultPALF2.includes(new Date(mockLeaveLog.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })), "Test PALF2: Leave log button text");

    let resultPALD1 = formatPlayerActivityLogDetail(mockJoinLog);
    assert(resultPALD1.includes("Player: Joiner") && resultPALD1.includes("ID: p789") && resultPALD1.includes("Event: Player Join") && resultPALD1.includes(new Date(mockJoinLog.timestamp).toLocaleString()), "Test PALD1: Join log detail text");

    let resultPALD2 = formatPlayerActivityLogDetail(mockLeaveLog);
    assert(resultPALD2.includes("Player: Leaver") && resultPALD2.includes("ID: p012") && resultPALD2.includes("Event: Player Leave") && resultPALD2.includes(new Date(mockLeaveLog.timestamp).toLocaleString()), "Test PALD2: Leave log detail text");
    
    // --- Tests for System Information Data Aggregation ---
    console.log("\n--- Testing System Information Data Aggregation ---");

    const mockPlayer = (name, roles = []) => ({
        name: name,
        isOwner: () => roles.includes('owner'),
        hasTag: (tag) => tag === 'admin' && roles.includes('admin')
    });

    const players1 = [
        mockPlayer("Owner1", ["owner"]),
        mockPlayer("Admin1", ["admin"]),
        mockPlayer("Player1"),
        mockPlayer("Admin2", ["admin"]),
        mockPlayer("Player2")
    ];
    const banLogs1 = JSON.stringify([{id:1},{id:2},{id:3}]); // 3 banned players
    const tps1 = "19.5";

    let resultSI1 = extractSystemInformationData(players1, banLogs1, tps1);
    assert(resultSI1.onlinePlayerCount === 5, "Test SI1.1: Online player count");
    assert(resultSI1.ownerOnlineCount === 1, "Test SI1.2: Owner count");
    assert(resultSI1.ownerNames.includes("§cOwner1§r"), "Test SI1.3: Owner names");
    assert(resultSI1.adminsOnlineCount === 2, "Test SI1.4: Admin count");
    assert(resultSI1.adminNames.includes("§6Admin1§r") && resultSI1.adminNames.includes("§6Admin2§r"), "Test SI1.5: Admin names");
    assert(resultSI1.normalPlayerCount === 2, "Test SI1.6: Normal player count");
    assert(resultSI1.normalPlayerNames.includes("§aPlayer1§r") && resultSI1.normalPlayerNames.includes("§aPlayer2§r"), "Test SI1.7: Normal player names");
    assert(resultSI1.bannedPlayersCount === "3", "Test SI1.8: Banned players count");
    assert(resultSI1.scriptTps === "19.5", "Test SI1.9: Script TPS");

    // Test SI2: No players, no ban logs, no TPS
    let resultSI2 = extractSystemInformationData([], null, null);
    assert(resultSI2.onlinePlayerCount === 0, "Test SI2.1: Zero online players");
    assert(resultSI2.ownerOnlineCount === 0, "Test SI2.2: Zero owners");
    assert(resultSI2.adminsOnlineCount === 0, "Test SI2.3: Zero admins");
    assert(resultSI2.normalPlayerCount === 0, "Test SI2.4: Zero normal players");
    assert(resultSI2.bannedPlayersCount === "0", "Test SI2.5: Banned count (no property)");
    assert(resultSI2.scriptTps === "N/A", "Test SI2.6: TPS (no property)");

    // Test SI3: Ban logs property is not an array
    const invalidBanLogs = JSON.stringify({ count: 5 }); // Not an array
    let resultSI3 = extractSystemInformationData([], invalidBanLogs, "20.0");
    assert(resultSI3.bannedPlayersCount === "Error reading logs (not an array)", "Test SI3.1: Invalid ban log format");

    // Test SI4: Ban logs property is unparseable JSON
    const unparseableBanLogs = "this is not json";
    let resultSI4 = extractSystemInformationData([], unparseableBanLogs, "20.0");
    assert(resultSI4.bannedPlayersCount === "Error reading logs", "Test SI4.1: Unparseable ban log JSON");
    
    // Test SI5: Null players array
    let resultSI5 = extractSystemInformationData(null, banLogs1, tps1);
    assert(resultSI5.onlinePlayerCount === 0, "Test SI5.1: Null players - online count");
    assert(resultSI5.ownerOnlineCount === 0, "Test SI5.2: Null players - owner count");
    assert(resultSI5.bannedPlayersCount === "3", "Test SI5.3: Null players - ban count still processed");
    assert(resultSI5.scriptTps === "19.5", "Test SI5.4: Null players - TPS still processed");
    
    // --- Tests for Optimized Logging Logic ---
    console.log("\n--- Testing Optimized Logging Logic ---");

    // Test L1: simulateAddInMemoryLog - basic add and trim
    let testCmdLogs = [];
    const logEntry1 = { t: 1, msg: "cmd1" };
    const logEntry2 = { t: 2, msg: "cmd2" };
    const logEntry3 = { t: 3, msg: "cmd3" };
    testCmdLogs = simulateAddInMemoryLog(logEntry1, testCmdLogs, 3, 2); // threshold 3, trimTo 2
    assert(testCmdLogs.length === 1 && testCmdLogs[0].msg === "cmd1", "Test L1.1: Add first log, no trim");
    testCmdLogs = simulateAddInMemoryLog(logEntry2, testCmdLogs, 3, 2);
    assert(testCmdLogs.length === 2 && testCmdLogs[1].msg === "cmd2", "Test L1.2: Add second log, no trim");
    testCmdLogs = simulateAddInMemoryLog(logEntry3, testCmdLogs, 3, 2); // Should not trim yet (length is 3, threshold is >3)
    assert(testCmdLogs.length === 3 && testCmdLogs[2].msg === "cmd3", "Test L1.3: Add third log, no trim (at threshold)");
    const logEntry4 = { t: 4, msg: "cmd4" };
    testCmdLogs = simulateAddInMemoryLog(logEntry4, testCmdLogs, 3, 2); // Now it trims
    assert(testCmdLogs.length === 2, "Test L1.4: Add fourth log, trim occurred - length");
    assert(testCmdLogs[0].msg === "cmd3" && testCmdLogs[1].msg === "cmd4", "Test L1.5: Add fourth log, trim occurred - content");

    // Test L2: simulateProcessLogsForSave - merging and limiting
    const currentMemLogs = [{ts: 3, data: "new1"}, {ts: 4, data: "new2"}];
    const existingLogsStr = JSON.stringify([{ts: 1, data: "old1"}, {ts: 2, data: "old2"}]);
    let saveResult1 = simulateProcessLogsForSave(currentMemLogs, existingLogsStr, 3); // Max 3 entries
    assert(saveResult1.finalLogsArray.length === 3, "Test L2.1: Process for save - final array length");
    assert(saveResult1.finalLogsArray[0].data === "old2" && saveResult1.finalLogsArray[2].data === "new2", "Test L2.2: Process for save - content merged and trimmed");
    let parsedSaveString1 = JSON.parse(saveResult1.logsToSaveString);
    assert(parsedSaveString1.length === 3 && parsedSaveString1[2].data === "new2", "Test L2.3: Process for save - string to save is correct");

    let saveResult2 = simulateProcessLogsForSave(currentMemLogs, null, 1); // Max 1 entry, no existing
    assert(saveResult2.finalLogsArray.length === 1 && saveResult2.finalLogsArray[0].data === "new2", "Test L2.4: Process for save - max 1, no existing");

    let saveResult3 = simulateProcessLogsForSave([{ts:5, data:"newer"}], existingLogsStr, 5); // Max 5, all should fit
    assert(saveResult3.finalLogsArray.length === 3, "Test L2.5: Process for save - all fit");
    assert(saveResult3.finalLogsArray[2].data === "newer", "Test L2.6: Process for save - all fit content check");


    // Test L3: simulateWorldAddLog
    let generalLogs = [];
    generalLogs = simulateWorldAddLog("Msg1", generalLogs, 2);
    assert(generalLogs.length === 1 && generalLogs[0].includes("Msg1"), "Test L3.1: world.addLog sim - first message");
    generalLogs = simulateWorldAddLog("Msg2", generalLogs, 2);
    assert(generalLogs.length === 2 && generalLogs[1].includes("Msg2"), "Test L3.2: world.addLog sim - second message");
    generalLogs = simulateWorldAddLog("Msg3", generalLogs, 2);
    assert(generalLogs.length === 2, "Test L3.3: world.addLog sim - third message, trim - length");
    assert(generalLogs[0].includes("Msg2") && generalLogs[1].includes("Msg3"), "Test L3.4: world.addLog sim - third message, trim - content");
    
    // --- Tests for UI Log Cache Logic ---
    console.log("\n--- Testing UI Log Cache Logic ---");
    
    // Test C1: Cache miss and populate
    testUiLogCache.reset();
    const testKey1 = "ac:testLogs1";
    const rawDataC1 = JSON.stringify([{id:1, msg:"Log1"}, {id:2, msg:"Log2"}]);
    testUiLogCache.mockProperties[testKey1] = rawDataC1;

    let logsC1_result = testUiLogCache.getLogs(testKey1, "test1");
    assert(logsC1_result.length === 2 && logsC1_result[0].id === 1, "Test C1.1: Cache miss - data loaded");
    assert(testUiLogCache.cache[testKey1] && testUiLogCache.cache[testKey1].hit === false, "Test C1.2: Cache miss - marked as miss");

    // Test C2: Cache hit
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Second call immediately
    assert(logsC1_result.length === 2 && logsC1_result[0].id === 1, "Test C2.1: Cache hit - data retrieved");
    assert(testUiLogCache.cache[testKey1] && testUiLogCache.cache[testKey1].hit === true, "Test C2.2: Cache hit - marked as hit");

    // Test C3: Cache expiration (simulated by adjusting timestamp)
    testUiLogCache.reset();
    testUiLogCache.mockProperties[testKey1] = rawDataC1;
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Populate cache
    assert(testUiLogCache.cache[testKey1] && testUiLogCache.cache[testKey1].hit === false, "Test C3.1: Expiration - initial load");
    
    // Simulate time passing beyond cache duration
    if (testUiLogCache.cache[testKey1]) {
      testUiLogCache.cache[testKey1].timestamp = Date.now() - (testUiLogCache.CACHE_DURATION_MS + 100);
    }
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Should be a miss now
    assert(testUiLogCache.cache[testKey1] && testUiLogCache.cache[testKey1].hit === false, "Test C3.2: Expiration - cache miss after time adjustment");
    assert(logsC1_result.length === 2, "Test C3.3: Expiration - data reloaded");

    // Test C4: Cache invalidation due to raw data change
    testUiLogCache.reset();
    testUiLogCache.mockProperties[testKey1] = rawDataC1;
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Populate
    assert(testUiLogCache.cache[testKey1] && !testUiLogCache.cache[testKey1].hit, "Test C4.1: Raw change - initial load");

    const rawDataC2 = JSON.stringify([{id:3, msg:"Log3"}]);
    testUiLogCache.mockProperties[testKey1] = rawDataC2; // Simulate underlying dynamic property changing
    
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Should be a miss due to raw data mismatch
    assert(testUiLogCache.cache[testKey1] && !testUiLogCache.cache[testKey1].hit, "Test C4.2: Raw change - cache miss");
    assert(logsC1_result.length === 1 && logsC1_result[0].id === 3, "Test C4.3: Raw change - new data loaded");

    // Test C5: Explicit cache clearing (simulates invalidation after delete)
    testUiLogCache.reset();
    testUiLogCache.mockProperties[testKey1] = rawDataC1;
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Populate
    assert(testUiLogCache.cache[testKey1], "Test C5.1: Cache clear - entry exists before clear");
    testUiLogCache.clearCacheEntry(testKey1);
    assert(!testUiLogCache.cache[testKey1], "Test C5.2: Cache clear - entry removed");
    logsC1_result = testUiLogCache.getLogs(testKey1, "test1"); // Re-populate
    assert(testUiLogCache.cache[testKey1] && !testUiLogCache.cache[testKey1].hit, "Test C5.3: Cache clear - re-populated as miss");

    // --- Tests for Global Ban List Set Creation ---
    console.log("\n--- Testing Global Ban List Set Creation ---");

    const mockGbanListArray1 = [
        { name: "Player1", reason: "grief" },
        "Player2",
        { name: "Player3", reason: "spam" },
        "Player1" // Duplicate name
    ];
    const gbanSet1 = createGbanNameSet(mockGbanListArray1);
    assert(gbanSet1.size === 3, "Test GB1.1: Gban Set size - includes unique names only");
    assert(gbanSet1.has("Player1"), "Test GB1.2: Gban Set has Player1");
    assert(gbanSet1.has("Player2"), "Test GB1.3: Gban Set has Player2 (from string)");
    assert(gbanSet1.has("Player3"), "Test GB1.4: Gban Set has Player3");
    assert(!gbanSet1.has("Player4"), "Test GB1.5: Gban Set does not have Player4");

    const mockGbanListArray2 = [];
    const gbanSet2 = createGbanNameSet(mockGbanListArray2);
    assert(gbanSet2.size === 0, "Test GB2.1: Gban Set from empty list");

    const mockGbanListArray3 = ["BannedUserA", "BannedUserB"];
    const gbanSet3 = createGbanNameSet(mockGbanListArray3);
    assert(gbanSet3.size === 2 && gbanSet3.has("BannedUserA") && gbanSet3.has("BannedUserB"), "Test GB3.1: Gban Set from string-only list");
    
    const mockGbanListArray4 = null; // Test with invalid input
    const gbanSet4 = createGbanNameSet(mockGbanListArray4);
    assert(gbanSet4.size === 0, "Test GB4.1: Gban Set from null input");

    // --- Tests for _createBasicLogViewerListForm Presentation Logic ---
    console.log("\n--- Testing _createBasicLogViewerListForm Presentation Logic ---");

    const mockLogsForPresenter = Array.from({length: 50}, (_, i) => ({ id: i, msg: `Log ${i}`})); // 50 logs
    const logTypeName = "test item";

    // Test LV1: More logs than maxButtons
    let pres1 = simulateLogViewerListPresentation([...mockLogsForPresenter], 45, logTypeName); // Assuming default maxButtons is 45
    assert(pres1.logsToShow.length === 45, "Test LV1.1: Logs to show is maxButtons when many logs");
    assert(pres1.body.startsWith("Displaying the 45 most recent"), "Test LV1.2: Body message for many logs");
    assert(pres1.body.includes("(50 total logs found)"), "Test LV1.3: Body message includes total count for many logs");

    // Test LV2: Fewer logs than maxButtons
    let fewLogs = mockLogsForPresenter.slice(0, 10); // 10 logs
    let pres2 = simulateLogViewerListPresentation(fewLogs, 45, logTypeName);
    assert(pres2.logsToShow.length === 10, "Test LV2.1: Logs to show is actual count when few logs");
    assert(pres2.body.startsWith("Select a log entry to view details."), "Test LV2.2: Body message for few logs");
    assert(pres2.body.includes("(10 logs found)"), "Test LV2.3: Body message includes total count for few logs");
    
    // Test LV3: Zero logs
    let pres3 = simulateLogViewerListPresentation([], 45, logTypeName);
    assert(pres3.logsToShow.length === 0, "Test LV3.1: Logs to show is 0 for no logs");
    assert(pres3.body === `No ${logTypeName} logs found.`, "Test LV3.2: Body message for no logs");

    // Test LV4: Exact number of logs as maxButtons
    let exactLogs = mockLogsForPresenter.slice(0, 45); // 45 logs
    let pres4 = simulateLogViewerListPresentation(exactLogs, 45, logTypeName);
    assert(pres4.logsToShow.length === 45, "Test LV4.1: Logs to show is maxButtons when exact match");
    assert(pres4.body.startsWith("Select a log entry to view details."), "Test LV4.2: Body message for exact match (not 'Displaying the X most recent')");
    assert(pres4.body.includes("(45 logs found)"), "Test LV4.3: Body message includes total count for exact match");

    console.log("\n--- Test Summary ---");
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
    console.log(`Passed: ${testsPassed}`);
    console.log(`Failed: ${testsFailed}`);
    
    if (testsFailed > 0) {
        // In a real test runner, this would throw an error or exit with a non-zero code.
        // For now, just logging prominently.
        console.error("\nSOME TESTS FAILED. CHECK THE LOGS ABOVE.");
    } else {
        console.log("\nALL TESTS PASSED!");
    }
}

// If this script is run directly (e.g., for manual testing via GameTest command or similar):
// runTests(); 
// For now, we are just defining the functions and tests.
// How to run these tests will depend on the project's setup.
// We might need a separate entry point or command if using GameTest Framework.

// To make functions available for potential import in a GameTest Framework test:
// export { processBanLogs, mockLogs, runTests }; // Or individually export as needed.
// For now, let's not export, as the primary goal is file creation with test content.
// The worker will create the file with this exact content.
