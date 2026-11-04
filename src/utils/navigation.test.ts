import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeNavFontSize,
  isHamburgerActive,
  isLinkActive,
  NAV_LINKS,
  MIN_DESKTOP_NAV_FONT_PX,
  MAX_DESKTOP_NAV_FONT_PX,
  HAMBURGER_BREAKPOINT_PX,
} from './navigation';

test('navigation links list includes all required destinations', () => {
  const labels = NAV_LINKS.map((l) => l.label);
  assert.deepEqual(labels, [
    'Home',
    'About Us',
    'Our Services',
    'Our Team',
    'Our Process',
    'Contact Us',
  ]);
});

test('desktop navigation font size smoothly scales and never drops below 12px', () => {
  const testWidths = [1920, 1600, 1440, 1280, 1024, 900];

  for (const w of testWidths) {
    const size = computeNavFontSize(w);
    assert.ok(
      size >= MIN_DESKTOP_NAV_FONT_PX,
      `At ${w}px, font size ${size} should be >= ${MIN_DESKTOP_NAV_FONT_PX}px`
    );
    assert.ok(
      size <= MAX_DESKTOP_NAV_FONT_PX,
      `At ${w}px, font size ${size} should be <= ${MAX_DESKTOP_NAV_FONT_PX}px`
    );
  }

  // Progressive decrease verification:
  // 1920 >= 1600 >= 1440 >= 1280 >= 1024 >= 900
  assert.ok(computeNavFontSize(1920) >= computeNavFontSize(1440));
  assert.ok(computeNavFontSize(1440) > computeNavFontSize(1280));
  assert.ok(computeNavFontSize(1280) > computeNavFontSize(1024));
  assert.ok(computeNavFontSize(1024) > computeNavFontSize(900));
  assert.equal(computeNavFontSize(900), 12, 'At 900px font size reaches minimum 12px');
});

test('hamburger breakpoint triggers at or below HAMBURGER_BREAKPOINT_PX (880px)', () => {
  assert.equal(HAMBURGER_BREAKPOINT_PX, 880);
  assert.equal(isHamburgerActive(1920), false);
  assert.equal(isHamburgerActive(1440), false);
  assert.equal(isHamburgerActive(1024), false);
  assert.equal(isHamburgerActive(900), false);
  assert.equal(isHamburgerActive(880), true);
  assert.equal(isHamburgerActive(768), true);
  assert.equal(isHamburgerActive(600), true);
  assert.equal(isHamburgerActive(480), true);
  assert.equal(isHamburgerActive(375), true);
  assert.equal(isHamburgerActive(320), true);
});

test('route active state resolution handles nested routes and team alias', () => {
  assert.equal(isLinkActive('/', '/'), true);
  assert.equal(isLinkActive('/', '/about'), false);
  assert.equal(isLinkActive('/services', '/services'), true);
  assert.equal(isLinkActive('/services', '/services/reliability-engineering'), true);
  assert.equal(isLinkActive('/leadership', '/leadership'), true);
  assert.equal(isLinkActive('/leadership', '/team'), true);
  assert.equal(isLinkActive('/leadership', '/leadership/marvelous-ngoatle'), true);
  assert.equal(isLinkActive('/leadership', '/leadership/marvellous-ngoatle'), true);
  assert.equal(isLinkActive('/leadership', '/leadership/thabang-ngoatle'), true);
  assert.equal(isLinkActive('/leadership', '/leadership/jonas-lufuluaabo'), true);
  assert.equal(isLinkActive('/process', '/process'), true);
  assert.equal(isLinkActive('/contact', '/contact'), true);
});

