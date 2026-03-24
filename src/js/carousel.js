import EmblaCarousel from 'embla-carousel';

const DEFAULT_OPTIONS = Object.freeze({
  loop: true,
  align: 'start',
  dragFree: false,
  containScroll: 'trimSnaps',
  slidesMobile: 1,
  slidesTablet: 2,
  slidesDesktop: 3,
});

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

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
    this.dotButtons = [];
    this.embla = null;
    this.logicalSlideCount = 0;

    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleReInit = this.handleReInit.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.syncUi = this.syncUi.bind(this);
  }

  init() {
    if (!this.root) return;

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

    this.viewport = requiredElements.viewport;
    this.track = requiredElements.track;
    this.prevButton = requiredElements.prevButton;
    this.nextButton = requiredElements.nextButton;
    this.dotsRoot = requiredElements.dotsRoot;

    this.logicalSlideCount = this.getSlidesCount();
    this.updateSlidesToShow();
    this.embla = EmblaCarousel(this.viewport, this.getEmblaOptions());

    this.createDots();
    this.bindEvents();
    this.syncUi();
  }

  bindEvents() {
    this.withEmbla(embla => {
      this.prevButton.addEventListener('click', this.handlePrevClick);
      this.nextButton.addEventListener('click', this.handleNextClick);

      embla.on('pointerDown', this.handlePointerDown);
      embla.on('pointerUp', this.handlePointerUp);
      embla.on('select', this.syncUi);
      embla.on('reInit', this.handleReInit);

      window.addEventListener('resize', this.handleResize, { passive: true });
    });
  }

  withEmbla(callback) {
    if (!this.embla) return false;
    callback(this.embla);

    return true;
  }

  getSlidesConfig() {
    const mobile = Number(
      this.root.dataset.carouselSlidesMobile || this.options.slidesMobile
    );

    const tablet = Number(
      this.root.dataset.carouselSlidesTablet || this.options.slidesTablet
    );

    const desktop = Number(
      this.root.dataset.carouselSlidesDesktop || this.options.slidesDesktop
    );

    return {
      mobile: Number.isNaN(mobile) ? DEFAULT_OPTIONS.slidesMobile : mobile,
      tablet: Number.isNaN(tablet) ? DEFAULT_OPTIONS.slidesTablet : tablet,
      desktop: Number.isNaN(desktop) ? DEFAULT_OPTIONS.slidesDesktop : desktop,
    };
  }

  getSlidesCount() {
    if (!this.track) return 0;
    return this.track.children.length;
  }

  getCurrentSlidesToShow() {
    const slides = this.getSlidesConfig();

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
    this.createDots();
    this.syncUi();
  }

  createDots() {
    this.withEmbla(embla => {
      const snapCount = embla.scrollSnapList().length;
      const dotsCount =
        this.logicalSlideCount > 0 ? this.logicalSlideCount : snapCount;

      this.dotsRoot.textContent = '';
      this.dotButtons = [];

      for (let index = 0; index < dotsCount; index += 1) {
        const dotButton = document.createElement('button');

        dotButton.type = 'button';
        dotButton.className = 'carousel-dot';
        dotButton.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotButton.addEventListener('click', () => this.scrollToLogical(index));
        this.dotsRoot.append(dotButton);
        this.dotButtons.push(dotButton);
      }
    });
  }

  scrollToLogical(logicalIndex) {
    this.withEmbla(embla => embla.scrollTo(logicalIndex));
  }

  syncUi() {
    this.withEmbla(embla => {
      const canScroll = embla.canScrollPrev() || embla.canScrollNext();
      this.prevButton.disabled = !canScroll;
      this.nextButton.disabled = !canScroll;

      const activeIndex = embla.selectedScrollSnap();
      const logicalCount =
        this.logicalSlideCount > 0
          ? this.logicalSlideCount
          : this.dotButtons.length;
      const activeLogicalIndex =
        logicalCount > 0 ? activeIndex % logicalCount : activeIndex;

      this.dotButtons.forEach((dotButton, index) => {
        const isActive = index === activeLogicalIndex;
        dotButton.classList.toggle('is-active', isActive);
        dotButton.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    });
  }

  destroy() {
    this.withEmbla(embla => {
      this.prevButton.removeEventListener('click', this.handlePrevClick);
      this.nextButton.removeEventListener('click', this.handleNextClick);
      this.root.classList.remove('is-dragging');

      embla.off('pointerDown', this.handlePointerDown);
      embla.off('pointerUp', this.handlePointerUp);
      embla.off('select', this.syncUi);
      embla.off('reInit', this.handleReInit);

      window.removeEventListener('resize', this.handleResize);
      embla.destroy();

      this.embla = null;
      this.dotButtons = [];
      this.logicalSlideCount = 0;
    });
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
