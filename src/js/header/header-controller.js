import { HEADER_SELECTORS } from './constants.js';
import { LanguageDropdownController } from './language-dropdown-controller.js';
import { MobileMenuController } from './mobile-menu-controller.js';
import { SectionSpyController } from './section-spy-controller.js';

export class HeaderController {
  constructor(config) {
    this.documentRef = config.documentRef;
    this.windowRef = config.windowRef;
    this.i18nService = config.i18nService;
  }

  init() {
    const headerElement = this.documentRef.querySelector(
      HEADER_SELECTORS.headerRoot
    );
    if (!headerElement) return;

    const navigationLinks = Array.from(
      this.documentRef.querySelectorAll(HEADER_SELECTORS.navLink)
    );

    this.initializeSectionSpy(headerElement, navigationLinks);
    this.initializeLanguageDropdown();
    this.initializeMobileMenu(navigationLinks);
  }

  initializeSectionSpy(headerElement, navigationLinks) {
    const sectionSpyController = new SectionSpyController({
      headerElement,
      navigationLinks,
      documentRef: this.documentRef,
      windowRef: this.windowRef,
    });

    sectionSpyController.init();
  }

  initializeLanguageDropdown() {
    const dropdownElements = Array.from(
      this.documentRef.querySelectorAll(HEADER_SELECTORS.languageDropdown)
    );

    const languageDropdownController = new LanguageDropdownController({
      dropdownElements,
      documentRef: this.documentRef,
      setLanguage: language => this.setLanguage(language),
      onLanguageApplied: language => {
        this.documentRef.documentElement.dataset.appLanguage = language;
      },
    });

    languageDropdownController.init(this.documentRef.documentElement.lang);
  }

  initializeMobileMenu(navigationLinks) {
    const menuElement = this.documentRef.querySelector(
      HEADER_SELECTORS.backdrop
    );
    const openButton = this.documentRef.querySelector(
      HEADER_SELECTORS.menuOpenButton
    );
    const closeButton = this.documentRef.querySelector(
      HEADER_SELECTORS.menuCloseButton
    );

    const mobileMenuController = new MobileMenuController({
      menuElement,
      openButton,
      closeButton,
      navigationLinks,
      documentRef: this.documentRef,
    });

    mobileMenuController.init();
  }

  setLanguage(language) {
    if (
      this.i18nService &&
      typeof this.i18nService.setLanguage === 'function'
    ) {
      return this.i18nService.setLanguage(language);
    }

    return language;
  }
}
