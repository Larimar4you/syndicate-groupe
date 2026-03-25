import { Carousel } from './carousel/index.js';
import { initHeader } from './header/index.js';
import { createI18nService } from './i18n/bootstrap.js';
import './to-top.js';

const i18nService = createI18nService();
const activeLanguage = i18nService.setLanguage(
  i18nService.resolveInitialLanguage()
);

document.documentElement.dataset.appLanguage = activeLanguage;
initHeader({ i18nService });
Carousel.initAll();
