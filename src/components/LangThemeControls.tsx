import React from 'react';
import { Languages, Sun, Moon } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

export const LangThemeControls: React.FC = () => {
  const { lang, setLang, theme, toggleTheme, t } = useLocale();

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        aria-label={t('nav.langAria')}
        title={t('nav.langAria')}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink text-[11px] font-semibold transition-all cursor-pointer"
      >
        <Languages className="w-3.5 h-3.5 text-amber" />
        <span>{t('nav.switchLang')}</span>
      </button>

      <button
        onClick={toggleTheme}
        aria-label={t('nav.themeAria')}
        title={t('nav.themeAria')}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-fill hover:bg-fill-strong border border-line text-amber transition-all cursor-pointer"
      >
        {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};