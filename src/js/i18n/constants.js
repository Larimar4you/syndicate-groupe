export const SUPPORTED_LANGUAGE = Object.freeze({
  EN: 'en',
  UA: 'ua',
});

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGE.EN;
export const LANGUAGE_STORAGE_KEY = 'APP_I18N_LANGUAGE';

export const SUPPORTED_LANGUAGE_VALUES = new Set(
  Object.values(SUPPORTED_LANGUAGE)
);
