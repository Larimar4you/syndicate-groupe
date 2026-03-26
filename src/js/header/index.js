import { HeaderController } from './header-controller.js';

export const initHeader = config => {
  const controller = new HeaderController({
    documentRef: config.documentRef ?? document,
    windowRef: config.windowRef ?? window,
    i18nService: config.i18nService,
  });

  controller.init();
};
