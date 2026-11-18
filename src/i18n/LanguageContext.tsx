import React, { createContext, useContext } from 'react';
import { Language, DEFAULT_LANGUAGE } from './types';
import { UI_TRANSLATIONS, UITranslations } from './translations/ui';

interface LanguageContextValue {
  lang: Language;
  t: UITranslations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANGUAGE,
  t: UI_TRANSLATIONS[DEFAULT_LANGUAGE],
});

interface LanguageProviderProps {
  lang: Language;
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ lang, children }) => {
  const value: LanguageContextValue = {
    lang,
    t: UI_TRANSLATIONS[lang] || UI_TRANSLATIONS[DEFAULT_LANGUAGE],
  };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

export function getUITranslations(lang: Language): UITranslations {
  return UI_TRANSLATIONS[lang] || UI_TRANSLATIONS[DEFAULT_LANGUAGE];
}
