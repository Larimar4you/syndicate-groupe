export class I18nTranslator {
  constructor(config) {
    this.translations = config.translations;
    this.defaultLanguage = config.defaultLanguage;
    this.normalizeLanguage = config.normalizeLanguage;
  }

  /**
   * Translates key for language with fallback to default language.
   * @param {unknown} language - Requested language code.
   * @param {string} key - Dot-separated translation key.
   * @returns {string} Translated value or key fallback.
   */
  translate(language, key) {
    const normalizedLanguage = this.normalizeLanguage(language);
    const selectedDictionary = this.translations[normalizedLanguage];
    const fallbackDictionary = this.translations[this.defaultLanguage];

    const value =
      this.getPathValue(selectedDictionary, key) ??
      this.getPathValue(fallbackDictionary, key);

    return value ?? key;
  }

  /**
   * Resolves nested value by dot-path.
   * @param {Record<string, unknown> | undefined} dictionary - Source dictionary.
   * @param {string} path - Dot-separated key path.
   * @returns {string | null} Resolved string value or null.
   */
  getPathValue(dictionary, path) {
    if (!dictionary) {
      return null;
    }

    const keys = path.split('.');
    let current = dictionary;

    for (const key of keys) {
      if (
        typeof current !== 'object' ||
        current === null ||
        !(key in current)
      ) {
        return null;
      }

      current = current[key];
    }

    return typeof current === 'string' ? current : null;
  }
}
