export class LanguagePolicy {
  constructor(config) {
    this.defaultLanguage = config.defaultLanguage;
    this.supportedLanguages = config.supportedLanguages;
  }

  /**
   * Normalizes and validates language code.
   * @param {unknown} language - Candidate language code.
   * @returns {string} Supported language code.
   */
  normalize(language) {
    if (typeof language !== 'string') return this.defaultLanguage;

    const normalized = language.trim().toLowerCase();
    return this.supportedLanguages.has(normalized)
      ? normalized
      : this.defaultLanguage;
  }

  /**
   * Resolves a supported language from browser locale.
   * @param {string | undefined} locale - Browser locale value.
   * @returns {string} Supported language code.
   */
  fromBrowserLocale(locale) {
    const languageCode = typeof locale === 'string' ? locale.slice(0, 2) : '';
    return this.normalize(languageCode);
  }
}
