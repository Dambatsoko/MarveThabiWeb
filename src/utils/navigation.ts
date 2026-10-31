/**
 * Pure navigation and responsive header logic.
 * Decoupled from React DOM for deterministic testing and validation.
 */

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'home', label: 'Home', href: '/', ariaLabel: 'Navigate to Home page' },
  { id: 'about', label: 'About Us', href: '/about', ariaLabel: 'Navigate to About Us page' },
  { id: 'services', label: 'Our Services', href: '/services', ariaLabel: 'Navigate to Engineering Services catalogue' },
  { id: 'team', label: 'Our Team', href: '/leadership', ariaLabel: 'Navigate to Leadership and Team page' },
  { id: 'process', label: 'Our Process', href: '/process', ariaLabel: 'Navigate to Engineering Process page' },
  { id: 'contact', label: 'Contact Us', href: '/contact', ariaLabel: 'Navigate to Contact Us page' },
];

export const HAMBURGER_BREAKPOINT_PX = 880;
export const MIN_DESKTOP_NAV_FONT_PX = 12;
export const MAX_DESKTOP_NAV_FONT_PX = 16;

/**
 * Calculates desktop navigation font size in pixels given the viewport width.
 * Requirement:
 * - Scales smoothly down as available space decreases
 * - Clamped to a minimum of 12px
 * - Never below 12px while desktop navigation is displayed
 * - Never above 16px
 */
export function computeNavFontSize(viewportWidth: number): number {
  if (viewportWidth <= HAMBURGER_BREAKPOINT_PX) {
    // Under mobile breakpoint, desktop nav is not shown; mobile drawer uses readable 16px+
    return 16;
  }
  // Formula matching CSS clamp(12px, 0.65vw + 6px, 16px):
  const rawSize = 0.0065 * viewportWidth + 6;
  const clamped = Math.min(MAX_DESKTOP_NAV_FONT_PX, Math.max(MIN_DESKTOP_NAV_FONT_PX, rawSize));
  // Round to 2 decimal places
  return Math.round(clamped * 100) / 100;
}

/**
 * Checks if the hamburger menu should be active for a given screen width.
 */
export function isHamburgerActive(viewportWidth: number): boolean {
  return viewportWidth <= HAMBURGER_BREAKPOINT_PX;
}

/**
 * Determines whether a given navigation link is active based on current path.
 */
export function isLinkActive(linkHref: string, currentPath: string): boolean {
  const normCurrent = (currentPath || '/').replace(/\/+$/, '') || '/';
  const normLink = linkHref.replace(/\/+$/, '') || '/';

  if (normLink === '/') {
    return normCurrent === '/';
  }

  if (normLink === '/services') {
    return normCurrent === '/services' || normCurrent.startsWith('/services/');
  }

  if (normLink === '/leadership') {
    return normCurrent === '/leadership' || normCurrent === '/team' || normCurrent.startsWith('/leadership/');
  }

  return normCurrent === normLink;
}
