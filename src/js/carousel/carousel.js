import EmblaCarousel from 'embla-carousel';
import {
  DEFAULT_OPTIONS,
  DESKTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
} from './constants.js';
import { DotNavigation } from './dot-navigation.js';
import { getSlidesConfig } from './slide-settings.js';

/**
 * Slider requirements:
 * 1. The root element must have the `data-carousel` attribute.
 * 2. The root must contain:
 *    - `[data-carousel-viewport]`
 *    - `.carousel-track` with slide items
 *    - `[data-carousel-prev]` and `[data-carousel-next]` buttons
 *    - `[data-carousel-dots]` container
 * 3. `embla-carousel` must be installed and bundled.
 * 4. Run `Carousel.initAll()` after the markup is present in the DOM.
 */
export class Carousel {
  constructor(rootElement, options = {}) {
    this.root = rootElement;
    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.viewport = null;
    this.track = null;
    this.prevButton = null;
    this.nextButton = null;
    this.dotsRoot = null;
    this.dots = null;
    this.embla = null;
    this.logicalSlideCount = 0;
    this.isInitialized = false;

    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleReInit = this.handleReInit.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleDotSelect = this.handleDotSelect.bind(this);
    this.syncUi = this.syncUi.bind(this);
  }

  init() {
    if (!this.root || this.isInitialized) return;

    const requiredElements = this.getRequiredElements();

    this.viewport = requiredElements.viewport;
    this.track = requiredElements.track;
    this.prevButton = requiredElements.prevButton;
    this.nextButton = requiredElements.nextButton;
    this.dotsRoot = requiredElements.dotsRoot;
    this.dots = new DotNavigation(this.dotsRoot, this.handleDotSelect);

    this.logicalSlideCount = this.getSlidesCount();
    this.updateSlidesToShow();
    this.embla = EmblaCarousel(this.viewport, this.getEmblaOptions());

    this.createDots();
    this.bindEvents();
    this.syncUi();

    this.isInitialized = true;
  }

  getRequiredElements() {
    const requiredElements = {
      viewport: this.root.querySelector('[data-carousel-viewport]'),
      track: this.root.querySelector('.carousel-track'),
      prevButton: this.root.querySelector('[data-carousel-prev]'),
      nextButton: this.root.querySelector('[data-carousel-next]'),
      dotsRoot: this.root.querySelector('[data-carousel-dots]'),
    };

    const missingElements = Object.entries(requiredElements)
      .filter(([, element]) => !element)
      .map(([name]) => name);

    if (missingElements.length > 0) {
      const message = `Carousel init failed: missing required element(s): ${missingElements.join(', ')}`;

      console.error(message, { root: this.root, missingElements });
      throw new Error(message);
    }

    return /** @type {typeof requiredElements} */ (requiredElements);
  }

  bindEvents() {
    if (!this.embla) return;

    this.prevButton.addEventListener('click', this.handlePrevClick);
    this.nextButton.addEventListener('click', this.handleNextClick);

    this.embla.on('pointerDown', this.handlePointerDown);
    this.embla.on('pointerUp', this.handlePointerUp);
    this.embla.on('select', this.syncUi);
    this.embla.on('reInit', this.handleReInit);

    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  unbindEvents() {
    if (!this.embla) return;

    this.prevButton.removeEventListener('click', this.handlePrevClick);
    this.nextButton.removeEventListener('click', this.handleNextClick);

    this.embla.off('pointerDown', this.handlePointerDown);
    this.embla.off('pointerUp', this.handlePointerUp);
    this.embla.off('select', this.syncUi);
    this.embla.off('reInit', this.handleReInit);

    window.removeEventListener('resize', this.handleResize);
  }

  withEmbla(callback) {
    if (!this.embla) return false;

    callback(this.embla);
    return true;
  }

  getSlidesCount() {
    if (!this.track) return 0;

    return this.track.children.length;
  }

  getCurrentSlidesToShow() {
    const slides = getSlidesConfig(this.root, this.options);

    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      return slides.desktop;
    }

    if (window.innerWidth >= TABLET_BREAKPOINT) {
      return slides.tablet;
    }

    return slides.mobile;
  }

  updateSlidesToShow() {
    const slidesToShow = this.getCurrentSlidesToShow();

    this.root.style.setProperty(
      '--carousel-slides-to-show',
      String(slidesToShow)
    );
  }

  shouldUseLoop() {
    if (!this.options.loop) return false;

    return this.logicalSlideCount > this.getCurrentSlidesToShow();
  }

  getEmblaOptions() {
    return {
      loop: this.shouldUseLoop(),
      align: this.options.align,
      dragFree: this.options.dragFree,
      containScroll: this.options.containScroll,
    };
  }

  handleResize() {
    const previous = this.root.style.getPropertyValue(
      '--carousel-slides-to-show'
    );

    this.updateSlidesToShow();

    const next = this.root.style.getPropertyValue('--carousel-slides-to-show');

    if (previous !== next) {
      this.withEmbla(embla => embla.reInit(this.getEmblaOptions()));
    }
  }

  handlePointerDown() {
    this.root.classList.add('is-dragging');
  }

  handlePointerUp() {
    this.root.classList.remove('is-dragging');
  }

  handlePrevClick() {
    this.withEmbla(embla => embla.scrollPrev());
  }

  handleNextClick() {
    this.withEmbla(embla => embla.scrollNext());
  }

  handleReInit() {
    this.logicalSlideCount = this.getSlidesCount();
    this.createDots();
    this.syncUi();
  }

  handleDotSelect(logicalIndex) {
    this.scrollToLogical(logicalIndex);
  }

  createDots() {
    this.withEmbla(embla => {
      const snapCount = embla.scrollSnapList().length;
      const dotsCount =
        this.logicalSlideCount > 0 ? this.logicalSlideCount : snapCount;

      if (!this.dots) return;

      this.dots.render(dotsCount);
    });
  }

  scrollToLogical(logicalIndex) {
    this.withEmbla(embla => embla.scrollTo(logicalIndex));
  }

  syncUi() {
    this.withEmbla(embla => {
      const canScroll = embla.canScrollPrev() || embla.canScrollNext();
      const activeIndex = embla.selectedScrollSnap();
      let logicalCount = this.logicalSlideCount;

      if (logicalCount <= 0 && this.dots) {
        logicalCount = this.dots.getCount();
      }

      const activeLogicalIndex =
        logicalCount > 0 ? activeIndex % logicalCount : activeIndex;

      this.prevButton.disabled = !canScroll;
      this.nextButton.disabled = !canScroll;

      if (this.dots) {
        this.dots.setActive(activeLogicalIndex);
      }
    });
  }

  destroy() {
    if (!this.isInitialized) return;

    this.root.classList.remove('is-dragging');
    this.unbindEvents();

    if (this.dots) {
      this.dots.destroy();
      this.dots = null;
    }

    if (this.embla) {
      this.embla.destroy();
      this.embla = null;
    }

    this.logicalSlideCount = 0;
    this.isInitialized = false;
  }

  static initAll(selector = '[data-carousel]') {
    const roots = document.querySelectorAll(selector);

    return [...roots].map(root => {
      const carousel = new Carousel(root);

      carousel.init();
      return carousel;
    });
  }
}
