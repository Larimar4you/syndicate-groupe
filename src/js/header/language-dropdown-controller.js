import { OPEN_CLASS } from './constants.js';

export class LanguageDropdownController {
  constructor(config) {
    this.dropdownElements = config.dropdownElements;
    this.setLanguage = config.setLanguage;
    this.documentRef = config.documentRef;
    this.onLanguageApplied = config.onLanguageApplied;

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleEscapeClose = this.handleEscapeClose.bind(this);
  }

  init(initialLanguage) {
    if (this.dropdownElements.length === 0) return;

    this.dropdownElements.forEach(dropdownElement => {
      const triggerElement = dropdownElement.querySelector(
        '[data-language-trigger]'
      );
      const optionElements = Array.from(
        dropdownElement.querySelectorAll(
          '[data-language-option][data-language]'
        )
      );

      if (!triggerElement || optionElements.length === 0) return;

      triggerElement.addEventListener('click', () => {
        const shouldOpen = !dropdownElement.classList.contains(OPEN_CLASS);
        this.closeAll();

        if (shouldOpen) {
          this.open(dropdownElement);
        }
      });

      optionElements.forEach(optionElement => {
        optionElement.addEventListener('click', () => {
          const selectedLanguage = optionElement.dataset.language;
          if (!selectedLanguage) return;

          const appliedLanguage = this.setLanguage(selectedLanguage);
          this.sync(appliedLanguage);
          this.onLanguageApplied(appliedLanguage);
          this.closeAll();
        });
      });
    });

    this.documentRef.addEventListener('click', this.handleOutsideClick);
    this.documentRef.addEventListener('keydown', this.handleEscapeClose);

    this.sync(initialLanguage);
  }

  sync(activeLanguage) {
    this.dropdownElements.forEach(dropdownElement => {
      const optionElements = Array.from(
        dropdownElement.querySelectorAll(
          '[data-language-option][data-language]'
        )
      );
      const currentLanguageElement = dropdownElement.querySelector(
        '[data-language-current]'
      );

      let activeLabel = activeLanguage.toUpperCase();

      optionElements.forEach(optionElement => {
        const isActive = optionElement.dataset.language === activeLanguage;
        optionElement.classList.toggle('is-active', isActive);
        optionElement.setAttribute(
          'aria-selected',
          isActive ? 'true' : 'false'
        );

        if (isActive) {
          activeLabel = optionElement.textContent?.trim() ?? activeLabel;
        }
      });

      if (currentLanguageElement) {
        currentLanguageElement.textContent = activeLabel;
      }
    });
  }

  closeAll() {
    this.dropdownElements.forEach(dropdownElement => {
      dropdownElement.classList.remove(OPEN_CLASS);
      const triggerElement = dropdownElement.querySelector(
        '[data-language-trigger]'
      );

      if (triggerElement) {
        triggerElement.setAttribute('aria-expanded', 'false');
      }
    });
  }

  open(dropdownElement) {
    dropdownElement.classList.add(OPEN_CLASS);
    const triggerElement = dropdownElement.querySelector(
      '[data-language-trigger]'
    );

    if (triggerElement) {
      triggerElement.setAttribute('aria-expanded', 'true');
    }
  }

  handleOutsideClick(event) {
    const targetElement = event.target;
    if (!(targetElement instanceof Element)) return;

    const clickedInsideDropdown = this.dropdownElements.some(dropdownElement =>
      dropdownElement.contains(targetElement)
    );

    if (!clickedInsideDropdown) {
      this.closeAll();
    }
  }

  handleEscapeClose(event) {
    if (event.key === 'Escape') {
      this.closeAll();
    }
  }
}
