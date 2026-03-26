export class I18nDomBinder {
  constructor(config) {
    this.documentRef = config.documentRef;
  }

  /**
   * Applies text and attribute translations.
   * @param {string} language - Active language code.
   * @param {(key: string) => string} resolveTranslation - Translation resolver callback.
   * @returns {void}
   */
  apply(language, resolveTranslation) {
    const textNodes = this.documentRef.querySelectorAll('[data-i18n]');

    for (const node of textNodes) {
      const translationKey = node.getAttribute('data-i18n');
      if (!translationKey) continue;

      node.textContent = resolveTranslation(translationKey);
    }

    const attributeNodes =
      this.documentRef.querySelectorAll('[data-i18n-attr]');

    for (const node of attributeNodes) {
      const mapping = node.getAttribute('data-i18n-attr');
      if (!mapping) continue;

      const pairs = mapping.split(';');

      for (const pair of pairs) {
        const [attributeName, translationKey] = pair
          .split(':')
          .map(value => value?.trim());

        if (!attributeName || !translationKey) continue;

        node.setAttribute(attributeName, resolveTranslation(translationKey));
      }
    }

    this.documentRef.documentElement.lang = language;
  }
}
