import { world } from '@minecraft/server';
import { logDebug } from './util.js';
import { CONFIG as config } from '../config.js'; // Added import

// Removed: translations, initialized, serverDefaultLanguageCode, currentlyLoadedLangInTranslations, englishTranslations

const fallbackTranslations = {
    "system.error.criticalLoadFailed": "Anti Cheats Critical Error: Core language file (en_US) not found in dynamic properties. Some features may be disabled or messages may be missing. Please ensure the addon is set up correctly.",
    "system.setup.prompt": "Anti Cheats: Setup might be required. If you are an admin, please check the configuration and run initial setup commands if necessary.",
    "general.term.permanent": "Permanent" // A common term that might be used in early messages
};

// Removed: loadEnglishBase function
// Removed: loadLanguageFile function
// Removed: Initial load sequence (calls to loadEnglishBase and loadLanguageFile)

export const i18n = {
    /**
     * Retrieves a translated string by its key and replaces placeholders.
     * @param {string} key - The translation key (e.g., "chat.message.welcome").
     * @param {object} [placeholders={}] - An object mapping placeholder names to their values.
     *                                     Example: { playerName: "Steve", count: 5 }
     *                                     Placeholders in the string should be like %%placeholderName%%.
     * @param {(Player|string|null)} [targetPlayerOrLangCode=null] - Optional. A Player object to get user-specific language,
     *                                                              or a language code string. If null or invalid,
     *                                                              uses server default or ultimately "en_US".
     * @returns {string} The translated and formatted string, or the key if not found.
     */
    getText: function(key, placeholders = {}) { // Remove targetPlayerOrLangCode from parameters
        let text = fallbackTranslations[key];

        if (typeof text !== 'string') {
            // If key is not in fallbackTranslations, construct a string that includes the key itself
            // and any provided placeholders, so it's clear what text is missing but also what data it had.
            let missingMsg = key; // Start with the key itself
            if (Object.keys(placeholders).length > 0) {
                missingMsg += " (";
                missingMsg += Object.entries(placeholders)
                    .map(([pk, pv]) => `${pk}: ${String(pv)}`)
                    .join(", ");
                missingMsg += ")";
            }
            // Do not attempt to replace placeholders in the 'key' string itself if it's being returned.
            // The original placeholder replacement loop should only run if 'text' was found in fallbacks.
            return missingMsg; // Return the key and its placeholder values
        }

        // If text IS found in fallbackTranslations, process placeholders in THAT string.
        for (const placeholder in placeholders) {
            if (Object.hasOwnProperty.call(placeholders, placeholder)) {
                const regex = new RegExp(`%%${placeholder}%%`, 'g');
                text = text.replace(regex, String(placeholders[placeholder]));
            }
        }
        return text;
    },

    // Removed: reloadLanguages function
    // Removed: setLanguage function
    // Removed: getAvailableLanguages function
};

// It's good practice to ensure dynamic properties are loaded by a setup function.
// For example, a function in Initialize.js could read the en_US.lang file content
// (if possible through some mechanism like reading a structure block with the text, or if an API becomes available)
// and set it to `world.setDynamicProperty("ac:lang/en_US", fileContentAsStringWithEscapedNewlines);`
// For now, this i18n.js assumes `ac:lang/en_US` is somehow populated.
