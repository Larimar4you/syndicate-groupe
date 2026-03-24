import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGE_VALUES,
} from './constants.js';
import { I18nDomBinder } from './dom-binder.js';
import { LanguagePolicy } from './language-policy.js';
import { I18nService } from './service.js';
import { I18nStorage } from './storage.js';
import { TRANSLATIONS } from './translations.js';
import { I18nTranslator } from './translator.js';

/**
 * Creates browser-ready i18n service with concrete runtime dependencies.
 * @param {{
 * documentRef?: Document,
 * localStorageRef?: Storage,
 * navigatorRef?: Navigator,
 * logger?: Pick<Console, 'error'>
 * }} [config] - Optional runtime overrides (useful for tests).
 * @returns {I18nService} Configured i18n service instance.
 */
export const createI18nService = (config = {}) => {
  const documentRef = config.documentRef ?? document;
  const localStorageRef = config.localStorageRef ?? window.localStorage;
  const navigatorRef = config.navigatorRef ?? navigator;
  const logger = config.logger ?? console;

  const policy = new LanguagePolicy({
    defaultLanguage: DEFAULT_LANGUAGE,
    supportedLanguages: SUPPORTED_LANGUAGE_VALUES,
  });

  const storage = new I18nStorage({
    storageKey: LANGUAGE_STORAGE_KEY,
    localStorageRef,
  });

  const translator = new I18nTranslator({
    translations: TRANSLATIONS,
    defaultLanguage: DEFAULT_LANGUAGE,
    normalizeLanguage: language => policy.normalize(language),
  });

  const domBinder = new I18nDomBinder({
    documentRef,
  });

  return new I18nService({
    policy,
    storage,
    translator,
    domBinder,
    browserLanguageReader: () => navigatorRef.language,
    logger,
  });
};
