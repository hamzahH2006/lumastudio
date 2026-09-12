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
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[#c8c8cb] hover:text-white text-[11px] font-semibold transition-all cursor-pointer"
      >
        <Languages className="w-3.5 h-3.5 text-[#ffb347]" />
        <span>{t('nav.switchLang')}</span>
      </button>

      <button
        onClick={toggleTheme}
        aria-label={t('nav.themeAria')}
        title={t('nav.themeAria')}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[#ffb347] transition-all cursor-pointer"
      >
        {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};