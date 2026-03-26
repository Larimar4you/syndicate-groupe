export class I18nStorage {
  constructor(config) {
    this.storageKey = config.storageKey;
    this.localStorageRef = config.localStorageRef;
  }

  /**
   * Reads persisted language value.
   * @returns {ReadLanguageResult} Stored value or typed error.
   */
  read() {
    try {
      return {
        ok: true,
        value: this.localStorageRef.getItem(this.storageKey),
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  /**
   * Persists language value.
   * @param {string} language - Language code.
   * @returns {WriteLanguageResult} Write status.
   */
  write(language) {
    try {
      this.localStorageRef.setItem(this.storageKey, language);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
