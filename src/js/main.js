import { Carousel } from './carousel/index.js';
import { createI18nService } from './i18n/bootstrap.js';
import './mobile-menu.js';

const i18nService = createI18nService();
const activeLanguage = i18nService.setLanguage(
  i18nService.resolveInitialLanguage()
);

/**
 * Temporary global API for future header language switcher integration.
 * Will be replaced with dedicated UI controls in header implementation.
 */
window.appI18n = Object.freeze({
  setLanguage: language => i18nService.setLanguage(language),
  getLanguage: () => document.documentElement.lang,
});

document.documentElement.dataset.appLanguage = activeLanguage;
Carousel.initAll();
