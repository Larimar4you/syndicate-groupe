import { MIN_SLIDES_TO_SHOW } from './constants.js';

function parseSlidesFallback(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return MIN_SLIDES_TO_SHOW;
  }

  const rounded = Math.floor(parsed);
  return rounded >= MIN_SLIDES_TO_SHOW ? rounded : MIN_SLIDES_TO_SHOW;
}

function parseSlidesSetting(rawValue, fallback) {
  const normalizedFallback = parseSlidesFallback(fallback);
  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed)) {
    return normalizedFallback;
  }

  const rounded = Math.floor(parsed);
  return rounded >= MIN_SLIDES_TO_SHOW ? rounded : normalizedFallback;
}

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
