/**
 * Pure navigation and responsive header logic.
 * Decoupled from React DOM for deterministic testing and validation.
 */

import { Language } from '../i18n/types';
import { localizePath, stripLanguagePrefix } from '../i18n/routing';
import { UI_TRANSLATIONS } from '../i18n/translations/ui';

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

/**
 * Returns navigation links localized for the active language, preserving English URLs
 * and prefixing French URLs with '/fr/'.
 */
export function getNavLinks(lang: Language): NavLinkItem[] {
  if (lang === 'en') return NAV_LINKS;
  const nav = UI_TRANSLATIONS[lang].nav;
  return [
    { id: 'home', label: nav.home, href: localizePath('/', lang), ariaLabel: nav.ariaHome },
    { id: 'about', label: nav.about, href: localizePath('/about', lang), ariaLabel: nav.ariaAbout },
    { id: 'services', label: nav.services, href: localizePath('/services', lang), ariaLabel: nav.ariaServices },
    { id: 'team', label: nav.team, href: localizePath('/leadership', lang), ariaLabel: nav.ariaTeam },
    { id: 'process', label: nav.process, href: localizePath('/process', lang), ariaLabel: nav.ariaProcess },
    { id: 'contact', label: nav.contact, href: localizePath('/contact', lang), ariaLabel: nav.ariaContact },
  ];
}

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
 * Determines whether a given navigation link is active based on current path,
 * agnostic of '/fr/' language prefixes and route aliases.
 */
export function isLinkActive(linkHref: string, currentPath: string): boolean {
  const normCurrent = stripLanguagePrefix(currentPath || '/');
  const normLink = stripLanguagePrefix(linkHref || '/');

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
