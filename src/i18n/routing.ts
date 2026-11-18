import { Language } from './types';

/**
 * Normalizes a URL pathname by collapsing duplicate slashes and removing trailing slashes
 * (except for the root path '/').
 */
export function normalizeRawPath(pathname: string): string {
  if (!pathname) return '/';
  const cleaned = pathname.split('?')[0].split('#')[0].replace(/\/{2,}/g, '/');
  if (cleaned === '/' || cleaned === '') return '/';
  return cleaned.replace(/\/+$/, '') || '/';
}

/**
 * Determines the active language from the URL pathname.
 * Any route starting with '/fr' (exact '/fr' or '/fr/...') resolves to 'fr';
 * all other routes resolve to 'en'.
 */
export function getLanguageFromPath(pathname: string): Language {
  const norm = normalizeRawPath(pathname);
  if (norm === '/fr' || norm.startsWith('/fr/')) {
    return 'fr';
  }
  return 'en';
}

/**
 * Strips the '/fr' language prefix and maps route aliases (e.g. '/about-us' -> '/about',
 * '/team' -> '/leadership') so route matching works consistently across languages.
 */
export function stripLanguagePrefix(pathname: string): string {
  let norm = normalizeRawPath(pathname);
  if (norm === '/fr') {
    norm = '/';
  } else if (norm.startsWith('/fr/')) {
    norm = norm.slice(3) || '/';
  }

  // Canonical route aliases
  if (norm === '/about-us') {
    return '/about';
  }
  if (norm === '/team') {
    return '/leadership';
  }

  return norm;
}

/**
 * Converts a canonical or relative route path into the localized URL for the target language.
 * - English keeps existing root-level URLs unchanged ('/', '/about', '/services', ...).
 * - French uses the '/fr/' prefix ('/fr/', '/fr/about', '/fr/services', ...).
 */
export function localizePath(path: string, lang: Language): string {
  const basePath = stripLanguagePrefix(path);

  if (lang === 'en') {
    return basePath;
  }

  if (basePath === '/') {
    return '/fr/';
  }

  return `/fr${basePath}`;
}

/**
 * Computes the equivalent URL in the target language while preserving the user's current page.
 * Preserves '/fr/about-us' -> '/about' when switching to English, or '/about' -> '/fr/about'
 * when switching to French.
 */
export function switchLanguagePath(currentPathname: string, targetLang: Language): string {
  return localizePath(currentPathname, targetLang);
}

/**
 * Returns both English and French canonical paths for hreflang and alternate links.
 */
export function getAlternatePaths(pathname: string): { en: string; fr: string } {
  const basePath = stripLanguagePrefix(pathname);
  return {
    en: basePath,
    fr: basePath === '/' ? '/fr/' : `/fr${basePath}`,
  };
}
