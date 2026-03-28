export class I18nService {
  constructor(config) {
    this.policy = config.policy;
    this.storage = config.storage;
    this.translator = config.translator;
    this.domBinder = config.domBinder;
    this.browserLanguageReader = config.browserLanguageReader;
    this.logger = config.logger;
  }

  /**
   * Translates a key for the provided language.
   * @param {unknown} language - Requested language code.
   * @param {string} key - Dot-separated translation key.
   * @returns {string} Translated value.
   */
  translate(language, key) {
    return this.translator.translate(language, key);
  }

  /**
   * Applies translations to the current document.
   * @param {unknown} language - Target language code.
   * @returns {string} Applied language code.
   */
  applyTranslations(language) {
    const normalizedLanguage = this.policy.normalize(language);

    this.domBinder.apply(normalizedLanguage, key =>
      this.translator.translate(normalizedLanguage, key)
    );

    return normalizedLanguage;
  }

  /**
   * Resolves initial app language from persisted value or browser locale.
   * @returns {string} Initial language code.
   */
  resolveInitialLanguage() {
    const persistedResult = this.storage.read();

    if (persistedResult.ok && persistedResult.value !== null) {
      return this.policy.normalize(persistedResult.value);
    }

    if (!persistedResult.ok) {
      this.logger.error(
        '[i18n] Failed to read persisted language',
        persistedResult.error
      );
    }

    return this.policy.fromBrowserLocale(this.browserLanguageReader());
  }

  /**
   * Sets active language, optionally persists it, and applies translations.
   * @param {unknown} language - Selected language code.
   * @param {{ persist?: boolean }} [options] - Behavior options.
   * @returns {string} Applied language code.
   */
  setLanguage(language, options = {}) {
    const normalizedLanguage = this.applyTranslations(language);
    const shouldPersist = options.persist ?? true;

    if (shouldPersist) {
      const persistResult = this.storage.write(normalizedLanguage);

      if (!persistResult.ok) {
        this.logger.error(
          '[i18n] Failed to persist selected language',
          persistResult.error
        );
      }
    }

    return normalizedLanguage;
  }
}
