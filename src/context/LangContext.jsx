import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import ta from '../i18n/ta.json';
import hi from '../i18n/hi.json';

const translations = { en, ta, hi };
const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('tripcraft_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('tripcraft_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (pathKey, fallback = '') => {
    const dict = translations[lang] || translations.en;
    const parts = pathKey.split('.');
    let curr = dict;
    for (const p of parts) {
      if (curr && typeof curr === 'object' && p in curr) {
        curr = curr[p];
      } else {
        return fallback || pathKey;
      }
    }
    return typeof curr === 'string' ? curr : fallback || pathKey;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
