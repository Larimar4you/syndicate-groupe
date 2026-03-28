import { Carousel } from './carousel/index.js';
import { initHeader } from './header/index.js';
import { createI18nService } from './i18n/bootstrap.js';
import { initScrollAnimations } from './proposal/animations.js';
import './to-top.js';

const setFooterYear = () => {
  const yearElement = document.querySelector('.js-current-year');
  if (!yearElement) return;
  yearElement.textContent = String(new Date().getFullYear());
};

const i18nService = createI18nService();
const activeLanguage = i18nService.setLanguage(
  i18nService.resolveInitialLanguage()
);

document.documentElement.dataset.appLanguage = activeLanguage;
initHeader({ i18nService });
Carousel.initAll();
initScrollAnimations();
setFooterYear();
