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

  /**
   * Initializes the carousel instance and attaches event listeners.
   * @returns {void}
   * @throws {Error} If required child elements are missing.
   */
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

  /**
   * Resolves required DOM elements for carousel operation.
   * @returns {{
   * viewport: Element,
   * track: Element,
   * prevButton: Element,
   * nextButton: Element,
   * dotsRoot: Element
   * }} Required DOM nodes.
   * @throws {Error} If any required element is missing.
   */
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

  /**
   * Binds UI and embla listeners.
   * @returns {void}
   */
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

  /**
   * Unbinds all registered listeners.
   * @returns {void}
   */
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

  /**
   * Executes callback only when embla is ready.
   * @param {(embla: ReturnType<typeof EmblaCarousel>) => void} callback - Action callback.
   * @returns {boolean} True when callback executed.
   */
  withEmbla(callback) {
    if (!this.embla) return false;

    callback(this.embla);
    return true;
  }

  /**
   * Returns raw slide count in the track.
   * @returns {number} Slide count.
   */
  getSlidesCount() {
    if (!this.track) return 0;

    return this.track.children.length;
  }

  /**
   * Returns slides-per-view for the current viewport width.
   * @returns {number} Slides-per-view value.
   */
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

  /**
   * Updates CSS custom property used by layout sizing.
   * @returns {void}
   */
  updateSlidesToShow() {
    const slidesToShow = this.getCurrentSlidesToShow();

    this.root.style.setProperty(
      '--carousel-slides-to-show',
      String(slidesToShow)
    );
  }

  /**
   * Checks whether loop mode should be enabled for current data.
   * @returns {boolean} True when looping is allowed and useful.
   */
  shouldUseLoop() {
    if (!this.options.loop) return false;

    return this.logicalSlideCount > this.getCurrentSlidesToShow();
  }

  /**
   * Returns embla options derived from current instance state.
   * @returns {{ loop: boolean, align: CarouselOptions['align'], dragFree: boolean, containScroll: CarouselOptions['containScroll'] }} Embla options.
   */
  getEmblaOptions() {
    return {
      loop: this.shouldUseLoop(),
      align: this.options.align,
      dragFree: this.options.dragFree,
      containScroll: this.options.containScroll,
    };
  }

  /**
   * Handles viewport resize and re-initializes embla if slides-per-view changed.
   * @returns {void}
   */
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

  /**
   * Pointer-down handler used for drag UI state.
   * @returns {void}
   */
  handlePointerDown() {
    this.root.classList.add('is-dragging');
  }

  /**
   * Pointer-up handler used for drag UI state cleanup.
   * @returns {void}
   */
  handlePointerUp() {
    this.root.classList.remove('is-dragging');
  }

  /**
   * Scrolls one snap backward.
   * @returns {void}
   */
  handlePrevClick() {
    this.withEmbla(embla => embla.scrollPrev());
  }

  /**
   * Scrolls one snap forward.
   * @returns {void}
   */
  handleNextClick() {
    this.withEmbla(embla => embla.scrollNext());
  }

  /**
   * Handles embla re-initialization.
   * @returns {void}
   */
  handleReInit() {
    this.logicalSlideCount = this.getSlidesCount();
    this.createDots();
    this.syncUi();
  }

  /**
   * Handles dot selection.
   * @param {number} logicalIndex - Logical slide index.
   * @returns {void}
   */
  handleDotSelect(logicalIndex) {
    this.scrollToLogical(logicalIndex);
  }

  /**
   * Renders dot navigation based on logical slide count.
   * @returns {void}
   */
  createDots() {
    this.withEmbla(embla => {
      const snapCount = embla.scrollSnapList().length;
      const dotsCount =
        this.logicalSlideCount > 0 ? this.logicalSlideCount : snapCount;

      if (!this.dots) return;

      this.dots.render(dotsCount);
    });
  }

  /**
   * Scrolls to the target logical slide index.
   * @param {number} logicalIndex - Slide index in logical sequence.
   * @returns {void}
   */
  scrollToLogical(logicalIndex) {
    this.withEmbla(embla => embla.scrollTo(logicalIndex));
  }

  /**
   * Synchronizes button disabled state and active dot indicator.
   * @returns {void}
   */
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

  /**
   * Destroys the carousel instance and releases resources.
   * @returns {void}
   */
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

  /**
   * Initializes all carousels matching selector.
   * @param {string} [selector='[data-carousel]'] - Root selector.
   * @returns {Carousel[]} Initialized carousel instances.
   */
  static initAll(selector = '[data-carousel]') {
    const roots = document.querySelectorAll(selector);

    return [...roots].map(root => {
      const carousel = new Carousel(root);

      carousel.init();
      return carousel;
    });
  }
}
