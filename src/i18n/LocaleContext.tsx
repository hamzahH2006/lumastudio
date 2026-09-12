import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Lang, translations } from './translations';

interface LocaleState {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleState | null>(null);

export const useLocale = (): LocaleState => {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // During SSR or outside provider, return safe defaults
    return {
      lang: 'en',
      dir: 'ltr',
      setLang: () => {},
      theme: 'dark',
      toggleTheme: () => {},
      t: (key) => key,
    };
  }
  return ctx;
};

const THEME_KEY = 'lumastudio_theme';
const LANG_KEY = 'lumastudio_lang';

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(LANG_KEY) as Lang) || 'en';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (l: Lang) => setLangState(l);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const t = (key: string, params?: Record<string, string | number>): string => {
    const raw = translations[lang][key] ?? translations.en[key] ?? key;
    if (!params) return raw;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
      raw
    );
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', dir);
    root.setAttribute('lang', lang);
    root.setAttribute('data-theme', theme);

    if (theme === 'light') {
      document.body.style.backgroundColor = '#f4f4f2';
      document.body.style.color = '#17181d';
    } else {
      document.body.style.backgroundColor = '#07080a';
      document.body.style.color = '#ffffff';
    }

    try {
      localStorage.setItem(LANG_KEY, lang);
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [lang, theme, dir]);

  return (
    <LocaleContext.Provider value={{ lang, dir, setLang, theme, toggleTheme, t }}>
      {children}
    </LocaleContext.Provider>
  );
};