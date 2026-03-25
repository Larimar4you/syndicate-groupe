import { OPEN_CLASS } from './constants.js';

export class MobileMenuController {
  constructor(config) {
    this.menuElement = config.menuElement;
    this.openButton = config.openButton;
    this.closeButton = config.closeButton;
    this.navigationLinks = config.navigationLinks;
    this.documentRef = config.documentRef;

    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleEscapeClose = this.handleEscapeClose.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  init() {
    if (!this.menuElement || !this.openButton || !this.closeButton) return;

    this.openButton.setAttribute('aria-expanded', 'false');

    this.openButton.addEventListener('click', () => this.openMenu());
    this.closeButton.addEventListener('click', this.closeMenu);
    this.menuElement.addEventListener('click', this.handleBackdropClick);
    this.documentRef.addEventListener('keydown', this.handleEscapeClose);

    this.navigationLinks.forEach(link => {
      link.addEventListener('click', this.closeMenu);
    });
  }

  openMenu() {
    this.menuElement.classList.add(OPEN_CLASS);
    this.documentRef.body.classList.add('no-scroll');
    this.openButton.setAttribute('aria-expanded', 'true');
  }

  closeMenu() {
    this.menuElement.classList.remove(OPEN_CLASS);
    this.documentRef.body.classList.remove('no-scroll');
    this.openButton.setAttribute('aria-expanded', 'false');
  }

  handleBackdropClick(event) {
    if (event.target === this.menuElement) {
      this.closeMenu();
    }
  }

  handleEscapeClose(event) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }
}
