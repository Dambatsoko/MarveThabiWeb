import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
  HERO_FADE_DURATION_MS,
  INITIAL_SLIDE_STATE,
  getNextSlideState,
  getSlideLayerStyle,
} from './heroSlideshow';

test('HERO_SLIDES uses exact HeroA, HeroB, HeroC sequence', () => {
  assert.deepEqual(
    HERO_SLIDES.map((s) => s.src),
    [
      '/assets/images/HeroA.jpg',
      '/assets/images/HeroB.jpg',
      '/assets/images/HeroC.jpg',
    ]
  );
});

test('slideshow timing stays within 5-6s interval and ~1.5s fade', () => {
  assert.ok(HERO_SLIDE_INTERVAL_MS >= 5000 && HERO_SLIDE_INTERVAL_MS <= 6000);
  assert.equal(HERO_FADE_DURATION_MS, 1500);
});

test('getNextSlideState cycles continuously HeroA -> HeroB -> HeroC -> HeroA', () => {
  const s0 = INITIAL_SLIDE_STATE;
  assert.deepEqual(s0, { activeIndex: 0, previousIndex: null });

  const s1 = getNextSlideState(s0);
  assert.deepEqual(s1, { activeIndex: 1, previousIndex: 0 });

  const s2 = getNextSlideState(s1);
  assert.deepEqual(s2, { activeIndex: 2, previousIndex: 1 });

  const s3 = getNextSlideState(s2);
  assert.deepEqual(s3, { activeIndex: 0, previousIndex: 2 });
});

test('getSlideLayerStyle keeps outgoing slide opaque underneath while incoming fades in on top', () => {
  const s1 = getNextSlideState(INITIAL_SLIDE_STATE); // active: 1, prev: 0
  assert.deepEqual(getSlideLayerStyle(0, s1), {
    zIndex: 1,
    opacity: 1,
    transition: 'none',
  });
  assert.deepEqual(getSlideLayerStyle(1, s1), {
    zIndex: 2,
    opacity: 1,
    transition: `opacity ${HERO_FADE_DURATION_MS}ms ease-in-out`,
  });
  assert.deepEqual(getSlideLayerStyle(2, s1), {
    zIndex: 0,
    opacity: 0,
    transition: 'none',
  });
});

test('getSlideLayerStyle respects prefers-reduced-motion', () => {
  const s2 = { activeIndex: 2, previousIndex: 1 };
  assert.deepEqual(getSlideLayerStyle(0, s2, true), {
    zIndex: 2,
    opacity: 1,
    transition: 'none',
  });
  assert.deepEqual(getSlideLayerStyle(1, s2, true), {
    zIndex: 0,
    opacity: 0,
    transition: 'none',
  });
  assert.deepEqual(getSlideLayerStyle(2, s2, true), {
    zIndex: 0,
    opacity: 0,
    transition: 'none',
  });
});
