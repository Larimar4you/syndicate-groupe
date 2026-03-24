/**
 * Shared carousel configuration.
 * @typedef {Object} CarouselOptions
 * @property {boolean} loop - Enables infinite looping when enough slides exist.
 * @property {'start' | 'center' | 'end'} align - Initial snap alignment.
 * @property {boolean} dragFree - Enables free dragging between snaps.
 * @property {'trimSnaps' | 'keepSnaps'} containScroll - Snap containment strategy.
 * @property {number} slidesMobile - Slides visible on mobile viewport.
 * @property {number} slidesTablet - Slides visible on tablet viewport.
 * @property {number} slidesDesktop - Slides visible on desktop viewport.
 */

/**
 * Default carousel options used when instance options are not provided.
 * @type {Readonly<CarouselOptions>}
 */
export const DEFAULT_OPTIONS = Object.freeze({
  loop: true,
  align: 'start',
  dragFree: false,
  containScroll: 'trimSnaps',
  slidesMobile: 1,
  slidesTablet: 2,
  slidesDesktop: 3,
});

export const TABLET_BREAKPOINT = 768;
export const DESKTOP_BREAKPOINT = 1280;
export const MIN_SLIDES_TO_SHOW = 1;
