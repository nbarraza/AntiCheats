import { world } from '@minecraft/server';
import { logDebug } from '../util.js'; // Assuming util.js is in the same directory
import { CONFIG as config } from '../config.js'; // Added import

const translations = {};
let initialized = false;
let serverDefaultLanguageCode = "en_US"; // Renamed and will be updated from config
let currentlyLoadedLangInTranslations = null; // Added variable

const fallbackTranslations = {
    "system.error.criticalLoadFailed": "Anti Cheats Critical Error: Core language file (en_US) not found in dynamic properties. Some features may be disabled or messages may be missing. Please ensure the addon is set up correctly.",
    "system.setup.prompt": "Anti Cheats: Setup might be required. If you are an admin, please check the configuration and run initial setup commands if necessary.",
    "general.term.permanent": "Permanent" // A common term that might be used in early messages
};

let englishTranslations = {};

function loadEnglishBase() {
    englishTranslations = {}; // Clear/re-initialize

    // Start with hardcoded fallbacks
    for (const key in fallbackTranslations) {
        if (Object.hasOwnProperty.call(fallbackTranslations, key)) {
            englishTranslations[key] = fallbackTranslations[key];
        }
    }
    let fallbackCount = Object.keys(englishTranslations).length;
    // console.log(`[i18n-debug] Loaded ${fallbackCount} keys from hardcoded fallbackTranslations into englishTranslations.`); // Temporary direct console log

    try {
        const langFileContent = world.getDynamicProperty("ac:lang/en_US");
        if (typeof langFileContent === 'string') {
            const lines = langFileContent.split('\n'); // Ensure this is a double backslash for literal 

            let dynamicEnCount = 0;
            lines.forEach(line => {
                const parts = line.split('=');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join('=').trim();
                    if (key && !key.startsWith('#')) {
                        englishTranslations[key] = value; // Overwrites fallback if key is the same
                        dynamicEnCount++;
                    }
                }
            });
            // console.log(`[i18n-debug] Loaded/merged ${dynamicEnCount} keys from 'ac:lang/en_US'. Total english keys: ${Object.keys(englishTranslations).length}.`); // Temporary
        } else {
            // console.log("[i18n-debug] 'ac:lang/en_US' dynamic property not found. Using only hardcoded fallbacks for English base."); // Temporary
        }
    } catch (e) {
        // console.log(`[i18n-debug] Error loading 'ac:lang/en_US' for englishTranslations: ${e}. Using fallbacks.`); // Temporary
    }
}

function loadLanguageFile(langCode = serverDefaultLanguageCode) { // Default param changed
    initialized = false;
    Object.keys(translations).forEach(key => delete translations[key]);

    // Validate langCode before using it
    const availableLangs = i18n.getAvailableLanguages ? i18n.getAvailableLanguages() : (getAvailableLanguages ? getAvailableLanguages() : ["en_US"]); // Defensive
    if (!langCode || !availableLangs.includes(langCode)) {
        logDebug(`[i18n] loadLanguageFile: Invalid or unavailable langCode "${langCode}". Defaulting to en_US.`);
        langCode = "en_US"; // Fallback to en_US if provided langCode is bad
    }
    
    // At this point, langCode is either the valid provided one or en_US.

    if (langCode === "en_US") {
        if (Object.keys(englishTranslations).length === 0) {
            logDebug("[i18n] englishTranslations is empty during loadLanguageFile('en_US'). Re-running loadEnglishBase.");
            loadEnglishBase();
        }
        for (const key in englishTranslations) {
            if (Object.hasOwnProperty.call(englishTranslations, key)) {
                translations[key] = englishTranslations[key];
            }
        }
        initialized = true;
        currentlyLoadedLangInTranslations = "en_US"; // Set for en_US
        logDebug(`[i18n] Loaded en_US translations into main context. Total keys: ${Object.keys(translations).length}.`);
    } else {
        // Logic for non-English languages
        try {
            const langFileContent = world.getDynamicProperty(`ac:lang/${langCode}`);
            if (typeof langFileContent === 'string') {
                const lines = langFileContent.split('\n');
                let loadedCount = 0;
                lines.forEach(line => {
                    const parts = line.split('=');
                    if (parts.length >= 2) {
                        const key = parts[0].trim();
                        const value = parts.slice(1).join('=').trim();
                        if (key && !key.startsWith('#')) {
                            translations[key] = value;
                            loadedCount++;
                        }
                    }
                });
                initialized = true; 
                currentlyLoadedLangInTranslations = langCode; // Set for the loaded language
                logDebug(`[i18n] Successfully loaded ${loadedCount} translation keys for ${langCode} from dynamic property into main translations.`);
            } else {
                logDebug(`[i18n] Dynamic property 'ac:lang/${langCode}' not found or not a string. Will fallback to English in getText if keys are missing.`);
                initialized = true; 
                // translations object is empty for langCode, so English fallback will be used.
                // What should currentlyLoadedLangInTranslations be? If it's empty, getText will try en_US.
                // For clarity, if it fails to load specific lang, it's not truly that lang in translations.
                // However, getText logic should handle the actual fallback to englishTranslations.
                // Let's leave currentlyLoadedLangInTranslations as langCode, indicating an attempt was made.
                // The critical part is that 'translations' is empty for this 'langCode'.
                currentlyLoadedLangInTranslations = langCode; // Still reflects the target, even if empty
            }
        } catch (e) {
            logDebug(`[i18n] Error loading language file for ${langCode}: ${e}. Will fallback to English in getText.`);
            initialized = true;
            currentlyLoadedLangInTranslations = langCode; // As above
        }
    }
}

// Initial load sequence
loadEnglishBase();
loadLanguageFile("en_US"); // Initialize with English, this will set currentlyLoadedLangInTranslations to "en_US"

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
    getText: function(key, placeholders = {}, targetPlayerOrLangCode = null) {
        let effectiveLangCode = null;
        if (typeof targetPlayerOrLangCode === 'string') {
            effectiveLangCode = targetPlayerOrLangCode;
        } else if (targetPlayerOrLangCode && typeof targetPlayerOrLangCode.getDynamicProperty === 'function') {
            try {
                const playerLang = targetPlayerOrLangCode.getDynamicProperty("ac:user_language");
                if (typeof playerLang === 'string' && playerLang) {
                    effectiveLangCode = playerLang;
                }
            } catch (e) {
                logDebug(`[i18n] Error getting dynamic property "ac:user_language" for player ${targetPlayerOrLangCode.nameTag}: ${e}`);
            }
        }

        const availableLangs = this.getAvailableLanguages ? this.getAvailableLanguages() : (i18n.getAvailableLanguages ? i18n.getAvailableLanguages() : ["en_US"]);

        if (effectiveLangCode && !availableLangs.includes(effectiveLangCode)) {
            logDebug(`[i18n] Player/target language "${effectiveLangCode}" is not available. Falling back.`);
            effectiveLangCode = null; 
        }
        
        if (!effectiveLangCode) {
            effectiveLangCode = config.default?.other?.defaultLanguage || serverDefaultLanguageCode;
        }

        if (!availableLangs.includes(effectiveLangCode)) {
            logDebug(`[i18n] Effective language "${effectiveLangCode}" is not available after config/serverDefault. Using "en_US".`);
            effectiveLangCode = "en_US";
        }

        // Ensure English base is always loaded if somehow it's empty
        if (Object.keys(englishTranslations).length === 0) {
            loadEnglishBase();
            if (Object.keys(englishTranslations).length === 0) { // Critical failure
                console.error("[i18n] CRITICAL: English base translations (including hardcoded fallbacks) failed to load. Cannot provide any translations.");
                return `Untranslated key: [${key}] - I18N CRITICAL FAILURE`;
            }
        }
        
        // Conditional loading of translations
        if (initialized && currentlyLoadedLangInTranslations !== effectiveLangCode) {
            // logDebug(`[i18n] getText: Current translations for '${currentlyLoadedLangInTranslations}', need '${effectiveLangCode}'. Reloading.`);
            loadLanguageFile(effectiveLangCode); 
        } else if (!initialized) {
            loadLanguageFile(effectiveLangCode);
        }
        // At this point, 'translations' should hold data for 'effectiveLangCode' (or en_US if effectiveLangCode failed to load)
        // and 'initialized' should be true, and 'currentlyLoadedLangInTranslations' should match 'effectiveLangCode' (or "en_US").

        let text = translations[key];

        if (typeof text !== 'string') { 
            if (currentlyLoadedLangInTranslations !== "en_US") {
                // logDebug(`[i18n] Key "${key}" not found in ${currentlyLoadedLangInTranslations}. Attempting English fallback.`);
            }
            text = englishTranslations[key]; 
        }

        if (typeof text !== 'string') { 
            logDebug(`[i18n] Key "${key}" not found in English translations either.`);
            let missingText = `Missing translation for [${key}]`;
            Object.entries(placeholders).forEach(([pk, pv]) => missingText += ` (${pk}: ${pv})`);
            return missingText;
        }

        for (const placeholder in placeholders) {
            const regex = new RegExp(`%%${placeholder}%%`, 'g');
            text = text.replace(regex, String(placeholders[placeholder]));
        }
        return text;
    },

    /**
     * Manually forces the loading/reloading of language data.
     * Could be used after updating language dynamic properties.
     */
    reloadLanguages: function() {
       logDebug("[i18n] Reloading all language data...");
       initialized = false; 

       loadEnglishBase(); 
       
       // Load the server's default language. This will update 'translations' and 'currentlyLoadedLangInTranslations'.
       // serverDefaultLanguageCode should ideally be up-to-date from config if Initialize.js has run.
       loadLanguageFile(serverDefaultLanguageCode); 

       if (!initialized) {
           logDebug("[i18n] Warning: reloadLanguages completed, but system is not marked as initialized. Check for errors in loadLanguageFile or loadEnglishBase.");
       } else {
           logDebug(`[i18n] Reloading complete. Server default language: ${serverDefaultLanguageCode}. Main translations cache (for ${currentlyLoadedLangInTranslations}) has ${Object.keys(translations).length} keys. English base has ${Object.keys(englishTranslations).length} keys.`);
       }
    },

    setLanguage: function(newLangCode) { // This sets the SERVER's default language
        logDebug(`[i18n] Attempting to set SERVER DEFAULT language to: ${newLangCode}`);
        if (typeof newLangCode !== 'string' || newLangCode.trim().length === 0) {
            logDebug(`[i18n] Invalid language code provided for server default: "${newLangCode}". Server default language not changed.`);
            return;
        }

        const availableLanguages = this.getAvailableLanguages();
        if (!availableLanguages.includes(newLangCode)) {
            logDebug(`[i18n] Language code "${newLangCode}" is not in the list of available languages: [${availableLanguages.join(', ')}]. Server default language not changed from "${serverDefaultLanguageCode}".`);
            return; 
        }

        serverDefaultLanguageCode = newLangCode;
        // We also update the main 'translations' cache to this new server default.
        // This makes it the active language if no player-specific language is requested.
        initialized = false; 
        // No need to clear translations here, loadLanguageFile does it.
        
        loadLanguageFile(serverDefaultLanguageCode); 

        if (!initialized) {
            logDebug(`[i18n] Failed to initialize language files for new server default: ${serverDefaultLanguageCode}. Subsequent calls to getText may fallback to en_US.`);
        } else {
            logDebug(`[i18n] Server default language set to: ${serverDefaultLanguageCode}. Main translations cache updated. Loaded ${Object.keys(translations).length} keys for ${currentlyLoadedLangInTranslations}.`);
        }
    },

    getAvailableLanguages: function() {
        const defaultLanguages = ["en_US"];
        try {
            const availableLangsProp = world.getDynamicProperty("ac:availableLanguages");
            if (typeof availableLangsProp === 'string') {
                const parsedLangs = JSON.parse(availableLangsProp);
                if (Array.isArray(parsedLangs) && parsedLangs.every(lang => typeof lang === 'string')) {
                    // Optionally, ensure "en_US" is always in the list if it's the ultimate fallback
                    if (!parsedLangs.includes("en_US")) {
                        // This case should ideally not happen if setup is done correctly
                        // and en_US is always packaged.
                        logDebug("[i18n] 'en_US' not found in available languages list from dynamic property. Adding it by default.");
                        // Add en_US to the start if not present, to ensure it's considered.
                        // However, this might hide a setup issue. For now, let's trust the list if it exists.
                        // If parsedLangs is empty, it will fall through to default.
                    }
                    return parsedLangs.length > 0 ? parsedLangs : defaultLanguages;
                } else {
                    logDebug("[i18n] 'ac:availableLanguages' dynamic property is not a valid JSON array of strings. Using default.");
                }
            } else if (availableLangsProp !== undefined) { // Property exists but not a string
                 logDebug("[i18n] 'ac:availableLanguages' dynamic property is not a string. Using default.");
            } else { // Property does not exist
                logDebug("[i18n] 'ac:availableLanguages' dynamic property not found. Using default.");
            }
        } catch (e) {
            logDebug(`[i18n] Error parsing 'ac:availableLanguages' dynamic property: ${e}. Using default.`);
        }
        return defaultLanguages;
    }
};

// It's good practice to ensure dynamic properties are loaded by a setup function.
// For example, a function in Initialize.js could read the en_US.lang file content
// (if possible through some mechanism like reading a structure block with the text, or if an API becomes available)
// and set it to `world.setDynamicProperty("ac:lang/en_US", fileContentAsStringWithEscapedNewlines);`
// For now, this i18n.js assumes `ac:lang/en_US` is somehow populated.
