import React from 'react';
import { GhostPill } from './GhostPill';
import { useLocale } from '../i18n/LocaleContext';

interface BasaltHeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const BasaltHero: React.FC<BasaltHeroProps> = ({ onScrollToSection }) => {
  const { t } = useLocale();

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-center selection:bg-crimson/30 selection:text-amber overflow-x-hidden">

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-8 flex flex-col items-center z-10">

        <div className="mb-6 sm:mb-8">
          <div
            id="hero-eyebrow-chip"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fill hover:bg-fill-strong backdrop-blur-xl border border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
            </span>
            <span className="font-sans text-[12.5px] font-medium tracking-tight text-muted">
              {t('hero.eyebrow')}
            </span>
          </div>
        </div>

        <div className="mb-5 sm:mb-6 max-w-4xl mx-auto px-2">
          <h1 className="hero-headline">
            {t('hero.1')}
            <span className="warm-gradient-text">{t('hero.2')}</span>
            {t('hero.3')}
          </h1>
        </div>

        <p className="font-sans text-[17px] sm:text-[18px] font-normal text-muted max-w-[660px] mx-auto leading-[1.6] tracking-[0.2px] mb-8 sm:mb-10 px-4">
          {t('hero.subtitle')}
        </p>

        <GhostPill
          label={t('hero.cta')}
          onClick={() => onScrollToSection('projects-showcase')}
        />

      </main>
    </div>
  );
};