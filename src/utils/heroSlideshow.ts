export interface HeroSlide {
  id: string;
  src: string;
  position: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: 'hero-a',
    src: '/assets/images/HeroA.jpg',
    position: 'center 48%',
  },
  {
    id: 'hero-b',
    src: '/assets/images/HeroB.jpg',
    position: 'center 44%',
  },
  {
    id: 'hero-c',
    src: '/assets/images/HeroC.jpg',
    position: 'center 58%',
  },
];

export const HERO_SLIDE_INTERVAL_MS = 5500;
export const HERO_FADE_DURATION_MS = 1500;

export interface HeroSlideState {
  activeIndex: number;
  previousIndex: number | null;
}

export const INITIAL_SLIDE_STATE: HeroSlideState = {
  activeIndex: 0,
  previousIndex: null,
};

export function getNextSlideState(
  current: HeroSlideState,
  totalSlides: number = HERO_SLIDES.length
): HeroSlideState {
  if (totalSlides <= 1) {
    return { activeIndex: 0, previousIndex: null };
  }
  const normalizedActive = ((current.activeIndex % totalSlides) + totalSlides) % totalSlides;
  const nextIndex = (normalizedActive + 1) % totalSlides;
  return {
    activeIndex: nextIndex,
    previousIndex: normalizedActive,
  };
}

export interface SlideLayerStyle {
  zIndex: number;
  opacity: number;
  transition: string;
}

/**
 * Computes layered crossfade styles so the outgoing slide stays fully opaque
 * underneath (zIndex 1) while the incoming slide fades smoothly from 0 to 1
 * on top (zIndex 2), preventing any background bleed or dimming during crossfades.
 */
export function getSlideLayerStyle(
  index: number,
  state: HeroSlideState,
  reducedMotion: boolean = false
): SlideLayerStyle {
  if (reducedMotion) {
    return {
      zIndex: index === 0 ? 2 : 0,
      opacity: index === 0 ? 1 : 0,
      transition: 'none',
    };
  }

  if (index === state.activeIndex) {
    return {
      zIndex: 2,
      opacity: 1,
      transition: state.previousIndex === null
        ? 'none'
        : `opacity ${HERO_FADE_DURATION_MS}ms ease-in-out`,
    };
  }

  if (index === state.previousIndex) {
    return {
      zIndex: 1,
      opacity: 1,
      transition: 'none',
    };
  }

  return {
    zIndex: 0,
    opacity: 0,
    transition: 'none',
  };
}
