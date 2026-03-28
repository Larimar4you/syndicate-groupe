export const ACTIVE_NAV_LINK_CLASS = 'is-active';
export const OPEN_CLASS = 'is-open';
export const SCROLLED_CLASS = 'is-scrolled';
export const HEADER_HEIGHT_VARIABLE = '--header-height';
export const SECTION_SPY_VIEWPORT_TRIGGER_RATIO = 0.32;
export const SECTION_SPY_MIN_TRIGGER_GAP = 24;

export const HEADER_SELECTORS = Object.freeze({
  headerRoot: '[data-site-header]',
  navLink: '[data-nav-link][href^="#"]',
  backdrop: '[data-menu]',
  menuOpenButton: '[data-menu-open]',
  menuCloseButton: '[data-menu-close]',
  languageDropdown: '[data-language-dropdown]',
  languageTrigger: '[data-language-trigger]',
  languageOption: '[data-language-option][data-language]',
  languageCurrent: '[data-language-current]',
});
