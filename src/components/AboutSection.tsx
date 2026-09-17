import React from 'react';
import { Award, Zap, ShieldCheck, HardDrive, Sparkles } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';

export const AboutSection: React.FC = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="py-24 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header - Clean */}
        <div className="text-left mb-14 space-y-3">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink">
            {t('about.title')}<span className="warm-gradient-accent">{t('about.titleAccent')}</span>
          </h2>

          <p className="text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Systems Bio & Principles */}
          <div
            className="lg:col-span-7 relative rounded-2xl bg-surface/85 backdrop-blur-xl border border-line p-6 sm:p-8 space-y-6 text-left overflow-hidden card-shadow"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-coral font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-sm uppercase tracking-wider">{t('about.philosophy')}</span>
              </div>
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-ink mt-1">
                {t('about.philosophyTitle')}
              </h3>
            </div>

            <p className="text-body text-sm sm:text-base leading-relaxed">
              {t('about.bio1')}
            </p>

            <p className="text-muted text-sm leading-relaxed">
              {t('about.bio2')}
            </p>

            {/* Architecture Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-fill border border-line space-y-1">
                <div className="flex items-center gap-2 text-ink text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-coral" />
                  <span>{t('about.p1')}</span>
                </div>
                <p className="text-[11px] text-faint leading-relaxed">{t('about.p1d')}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-fill border border-line space-y-1">
                <div className="flex items-center gap-2 text-ink text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber" />
                  <span>{t('about.p2')}</span>
                </div>
                <p className="text-[11px] text-faint leading-relaxed">{t('about.p2d')}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-fill border border-line space-y-1">
                <div className="flex items-center gap-2 text-ink text-xs font-semibold">
                  <HardDrive className="w-3.5 h-3.5 text-coral" />
                  <span>{t('about.p3')}</span>
                </div>
                <p className="text-[11px] text-faint leading-relaxed">{t('about.p3d')}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-fill border border-line space-y-1">
                <div className="flex items-center gap-2 text-ink text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-amber" />
                  <span>{t('about.p4')}</span>
                </div>
                <p className="text-[11px] text-faint leading-relaxed">{t('about.p4d')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics */}
          <div
            className="lg:col-span-5 relative rounded-2xl bg-surface/90 backdrop-blur-xl border border-line p-6 flex flex-col justify-between space-y-4 text-left card-shadow"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-fill border border-line">
                <div className="text-ink font-semibold text-sm">{t('about.benchmarks')}</div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <div className="text-amber font-bold">18.4 ms</div>
                    <div className="text-[11px] text-faint">{t('about.m1')}</div>
                  </div>
                  <div>
                    <div className="text-amber font-bold">60 FPS</div>
                    <div className="text-[11px] text-faint">{t('about.m2')}</div>
                  </div>
                  <div>
                    <div className="text-amber font-bold">14.8 MB</div>
                    <div className="text-[11px] text-faint">{t('about.m3')}</div>
                  </div>
                  <div>
                    <div className="text-amber font-bold">0.8 ms</div>
                    <div className="text-[11px] text-faint">{t('about.m4')}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-fill border border-line">
                <div className="text-ink font-semibold text-sm">{t('about.flagships')}</div>
                <ul className="mt-3 space-y-2 text-sm text-body">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-coral" />
                    Omni Explorer (Windows)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-coral" />
                    QPay Mobile (Fintech)
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-fill border border-line">
                <div className="text-ink font-semibold text-sm">{t('about.sla')}</div>
                <div className="mt-3 text-emerald-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm">{t('about.slaSub')}</span>
                </div>
              </div>
            </div>

            {/* Footer Status */}
            <div className="pt-3 border-t border-line flex items-center justify-between text-[11px] text-faint">
              <span className="flex items-center gap-1 text-amber">
                <Award className="w-3.5 h-3.5" />
                <span>{t('about.policy')}</span>
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t('about.online')}</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};