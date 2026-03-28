import {
  ACTIVE_NAV_LINK_CLASS,
  HEADER_HEIGHT_VARIABLE,
  SCROLLED_CLASS,
  SECTION_SPY_MIN_TRIGGER_GAP,
  SECTION_SPY_VIEWPORT_TRIGGER_RATIO,
} from './constants.js';

export class SectionSpyController {
  constructor(config) {
    this.headerElement = config.headerElement;
    this.navigationLinks = config.navigationLinks;
    this.documentRef = config.documentRef;
    this.windowRef = config.windowRef;
    this.sectionOrder = this.buildSectionOrder(this.navigationLinks);
    this.navigationLinkClickHandlers = new Map();
    this.isInitialized = false;

    this.isScrollUpdateQueued = false;
    this.handleResize = this.handleResize.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.queueScrollUpdate = this.queueScrollUpdate.bind(this);
  }

  init() {
    if (this.isInitialized || this.sectionOrder.length === 0) return;

    this.syncHeaderHeight();
    this.syncHeaderScrolledState();
    this.setActiveSection(this.sectionOrder[0]);

    this.navigationLinks.forEach(link => {
      const handleLinkClick = () => {
        const sectionId = link.dataset.section;
        if (sectionId) {
          this.setActiveSection(sectionId);
        }
      };

      this.navigationLinkClickHandlers.set(link, handleLinkClick);
      link.addEventListener('click', handleLinkClick);
    });

    this.windowRef.addEventListener('scroll', this.queueScrollUpdate, {
      passive: true,
    });
    this.windowRef.addEventListener('resize', this.handleResize);
    this.windowRef.addEventListener('hashchange', this.handleHashChange);

    this.recalculateActiveSection();
    this.isInitialized = true;
  }

  destroy() {
    if (!this.isInitialized) return;

    this.windowRef.removeEventListener('scroll', this.queueScrollUpdate);
    this.windowRef.removeEventListener('resize', this.handleResize);
    this.windowRef.removeEventListener('hashchange', this.handleHashChange);

    this.navigationLinkClickHandlers.forEach((handler, link) => {
      link.removeEventListener('click', handler);
    });

    this.navigationLinkClickHandlers.clear();
    this.isInitialized = false;
  }

  syncHeaderHeight() {
    const headerHeight = Math.ceil(
      this.headerElement.getBoundingClientRect().height
    );
    this.documentRef.documentElement.style.setProperty(
      HEADER_HEIGHT_VARIABLE,
      String(headerHeight) + 'px'
    );
  }

  recalculateActiveSection() {
    const activeSectionId = this.resolveActiveSection();
    this.setActiveSection(activeSectionId);
  }

  queueScrollUpdate() {
    if (this.isScrollUpdateQueued) return;

    this.isScrollUpdateQueued = true;
    this.windowRef.requestAnimationFrame(() => {
      this.syncHeaderScrolledState();
      this.recalculateActiveSection();
      this.isScrollUpdateQueued = false;
    });
  }

  handleResize() {
    this.syncHeaderHeight();
    this.syncHeaderScrolledState();
    this.recalculateActiveSection();
  }

  handleHashChange() {
    this.syncHeaderScrolledState();
    this.recalculateActiveSection();
  }

  syncHeaderScrolledState() {
    const isScrolled = this.windowRef.scrollY > 0;
    this.headerElement.classList.toggle(SCROLLED_CLASS, isScrolled);
  }

  setActiveSection(activeSectionId) {
    this.navigationLinks.forEach(link => {
      const isActive = link.dataset.section === activeSectionId;
      link.classList.toggle(ACTIVE_NAV_LINK_CLASS, isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  resolveActiveSection() {
    const firstSectionId = this.sectionOrder[0];
    const lastSectionId = this.sectionOrder[this.sectionOrder.length - 1];
    const headerHeight = Number.parseInt(
      getComputedStyle(this.documentRef.documentElement).getPropertyValue(
        HEADER_HEIGHT_VARIABLE
      ),
      10
    );

    const headerMarkerY = Number.isFinite(headerHeight)
      ? headerHeight + SECTION_SPY_MIN_TRIGGER_GAP
      : 120;

    const viewportMarkerY = Math.round(
      this.windowRef.innerHeight * SECTION_SPY_VIEWPORT_TRIGGER_RATIO
    );

    const markerY = Math.max(headerMarkerY, viewportMarkerY);
    const documentElementHeight = this.documentRef.documentElement.scrollHeight;

    const bodyHeight = this.documentRef.body
      ? this.documentRef.body.scrollHeight
      : 0;

    const pageHeight = Math.max(documentElementHeight, bodyHeight);
    const bottomThreshold = 2;

    const scrolledToBottom =
      this.windowRef.scrollY + this.windowRef.innerHeight >=
      pageHeight - bottomThreshold;

    if (scrolledToBottom) return lastSectionId;

    let fallbackSectionId = firstSectionId;

    for (const sectionId of this.sectionOrder) {
      const sectionElement = this.documentRef.getElementById(sectionId);
      if (!sectionElement) continue;

      const rectangle = sectionElement.getBoundingClientRect();
      const intersectsMarker =
        rectangle.top <= markerY && rectangle.bottom > markerY;

      if (intersectsMarker) return sectionId;

      if (rectangle.top <= markerY) {
        fallbackSectionId = sectionId;
      }
    }

    return fallbackSectionId;
  }

  buildSectionOrder(links) {
    const sectionIds = [];

    links.forEach(link => {
      const hrefValue = link.getAttribute('href');
      if (!hrefValue || !hrefValue.startsWith('#')) return;

      const sectionId = hrefValue.slice(1);
      if (!sectionId || sectionIds.includes(sectionId)) return;
      if (!this.documentRef.getElementById(sectionId)) return;

      sectionIds.push(sectionId);
    });

    return sectionIds;
  }
}
