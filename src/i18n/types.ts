export type Language = 'en' | 'fr';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'fr'] as const;
export const DEFAULT_LANGUAGE: Language = 'en';
export const LANGUAGE_STORAGE_KEY = 'marvethabi_lang';
