import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { LumaStudioLogo } from './LumaStudioLogo';
import { Project } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { LangThemeControls } from './LangThemeControls';

interface FloatingPillNavProps {
  currentPath?: string;
  onNavigate: (target: string) => void;
  onCtaClick?: () => void;
  projects?: Project[];
}

export const FloatingPillNav: React.FC<FloatingPillNavProps> = ({
  currentPath = '/',
  onNavigate,
  onCtaClick,
  projects = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { t } = useLocale();

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    onNavigate(target);
  };

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="LumaStudio Main Navigation"
        className="pointer-events-auto relative flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-5 py-2 rounded-full bg-[#07080a]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:border-white/[0.16]"
      >
        {/* Left: LumaStudio Logo + Wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 group focus:outline-none cursor-pointer text-left"
          title="LumaStudio"
        >
          <LumaStudioLogo
            logoSrc="/assets/lumastudio-logo.png"
            size={22}
            className="w-5 h-5"
            showWordmark={true}
            wordmarkClassName="font-sans font-bold text-[15px] tracking-tight text-white"
          />
        </button>

        {/* Center Links: Products */}
        <div className="hidden lg:flex items-center gap-1 text-[13.5px] font-medium text-[#9c9c9d]">
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => handleLinkClick('projects-showcase')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 hover:text-white hover:bg-white/[0.04] cursor-pointer ${
                currentPath.startsWith('/projects') ? 'text-white bg-white/[0.06]' : ''
              }`}
            >
              <span>{t('nav.products')}</span>
              <ChevronDown className="w-3 h-3 text-[#ff6b4a] transition-transform duration-200" />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                <div className="rounded-2xl bg-[#07080a]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-2 space-y-1 text-left">
                  {projects.length === 0 && (
                    <div className="p-3 text-[11px] text-[#848487] text-center">
                      {t('nav.noProjects')}
                    </div>
                  )}
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleLinkClick(`/projects/${project.id}`)}
                      className="w-full p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-left flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ff2f3a]/15 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ffb347] shrink-0 mt-0.5 overflow-hidden">
                        {project.icon ? (
                          <img
                            src={project.icon}
                            alt=""
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="font-sans text-xs font-bold uppercase">
                            {project.title.slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold group-hover:text-[#ffb347] transition-colors">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-[#848487] leading-tight mt-0.5">
                          {project.category}
                        </div>
                      </div>
                    </button>
                  ))}

                  <div className="pt-1 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleLinkClick('projects-showcase')}
                      className="w-full text-center py-1.5 text-[11px] text-[#ffb347] hover:text-white transition-colors cursor-pointer"
                    >
                      {t('nav.viewAll')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('projects-showcase')}
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
          >
            {t('nav.explore')}
          </button>
        </div>

        {/* Right Actions: Lang/Theme + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LangThemeControls />

          <button
            onClick={onCtaClick}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-b from-[#f2f2f3] via-[#e6e6e8] to-[#d6d6d8] hover:from-white hover:to-[#e2e2e4] text-[#141416] text-[12px] sm:text-[12.5px] font-semibold tracking-tight shadow-[0_2px_10px_rgba(0,0,0,0.45),inset_0_1px_0_#ffffff] hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-150 active:scale-95 cursor-pointer focus:outline-none shrink-0"
            title={t('nav.getStarted')}
          >
            <span>{t('nav.getStarted')}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full text-[#9c9c9d] hover:text-white hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-[#07080a]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl flex flex-col gap-2.5 lg:hidden text-left">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleLinkClick(`/projects/${project.id}`)}
                className="py-2 px-3 rounded-xl text-[14px] text-white hover:bg-white/5 transition-colors font-medium flex items-center justify-between cursor-pointer"
              >
                <span>{project.title}</span>
                <span className="text-[11px] text-[#ffb347]">{project.category}</span>
              </button>
            ))}

            <button
              onClick={() => handleLinkClick('projects-showcase')}
              className="py-2 px-3 rounded-xl text-[14px] text-[#9c9c9d] hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              {t('nav.explore')}
            </button>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LangThemeControls />
              </div>
              <button
                onClick={() => {
                  onCtaClick?.();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#1c1c1e] text-[12px] font-semibold cursor-pointer"
              >
                <span>{t('nav.getStarted')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};