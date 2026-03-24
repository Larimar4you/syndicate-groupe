import { MIN_SLIDES_TO_SHOW } from './constants.js';

/**
 * Normalizes fallback slides-per-view value.
 * @param {unknown} value - Candidate fallback value.
 * @returns {number} Safe integer that is >= MIN_SLIDES_TO_SHOW.
 */
function parseSlidesFallback(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return MIN_SLIDES_TO_SHOW;
  }

  const rounded = Math.floor(parsed);
  return rounded >= MIN_SLIDES_TO_SHOW ? rounded : MIN_SLIDES_TO_SHOW;
}

/**
 * Parses data-attribute slides-per-view value with safe fallback.
 * @param {unknown} rawValue - Data attribute value from markup.
 * @param {unknown} fallback - Instance fallback option value.
 * @returns {number} Safe integer slides count.
 */
function parseSlidesSetting(rawValue, fallback) {
  const normalizedFallback = parseSlidesFallback(fallback);
  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed)) {
    return normalizedFallback;
  }

  const rounded = Math.floor(parsed);
  return rounded >= MIN_SLIDES_TO_SHOW ? rounded : normalizedFallback;
}

/**
 * Breakpoint-aware slides-per-view values resolved from dataset/options.
 * @typedef {Object} SlidesConfig
 * @property {number} mobile - Slides count for mobile viewport.
 * @property {number} tablet - Slides count for tablet viewport.
 * @property {number} desktop - Slides count for desktop viewport.
 */

/**
 * Resolves slides configuration from root dataset with options fallback.
 * @param {HTMLElement} root - Carousel root element with data attributes.
 * @param {{ slidesMobile: unknown, slidesTablet: unknown, slidesDesktop: unknown }} options - Instance options.
 * @returns {SlidesConfig} Normalized slides configuration by breakpoint.
 */
export function getSlidesConfig(root, options) {
  return {
    mobile: parseSlidesSetting(
      root.dataset.carouselSlidesMobile,
      options.slidesMobile
    ),
    tablet: parseSlidesSetting(
      root.dataset.carouselSlidesTablet,
      options.slidesTablet
    ),
    desktop: parseSlidesSetting(
      root.dataset.carouselSlidesDesktop,
      options.slidesDesktop
    ),
  };
}
