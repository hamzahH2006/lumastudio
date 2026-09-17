import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { LumaStudioLogo } from './LumaStudioLogo';
import { Project } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { LangThemeControls } from './LangThemeControls';
import { localizeProject } from '../utils/localize';

interface TopBarProps {
  currentPath?: string;
  onNavigate: (target: string) => void;
  onCtaClick?: () => void;
  projects?: Project[];
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPath = '/',
  onNavigate,
  onCtaClick,
  projects = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { t, lang } = useLocale();
  const localizedProjects = projects.map((p) => localizeProject(p, lang));

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    onNavigate(target);
  };

  const productsActive = currentPath.startsWith('/projects');

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
      <nav
        aria-label="LumaStudio Main Navigation"
        className="pointer-events-auto mx-auto max-w-[1400px] w-full flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-7 py-3 rounded-2xl border border-line bg-surface/80 backdrop-blur-2xl topbar-shadow transition-all duration-300"
      >
        {/* Left: LumaStudio Logo + Wordmark */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 group focus:outline-none cursor-pointer text-left"
          title="LumaStudio"
        >
          <LumaStudioLogo
            logoSrc="/assets/lumastudio-logo.png"
            size={26}
            className="w-6 h-6"
            showWordmark={true}
            wordmarkClassName="font-sans font-bold text-[16px] sm:text-[17px] tracking-tight text-ink group-hover:text-ink/80 transition-colors"
          />
        </button>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-1 text-[13.5px] font-medium text-muted">
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => handleLinkClick('projects-showcase')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 hover:text-ink hover:bg-fill cursor-pointer ${
                productsActive ? 'text-ink bg-fill-strong' : ''
              }`}
            >
              <span>{t('nav.products')}</span>
              <ChevronDown className="w-3 h-3 text-coral transition-transform duration-200" />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                <div className="rounded-2xl bg-surface/95 backdrop-blur-2xl border border-line-strong card-shadow p-2 space-y-1 text-left">
                  {projects.length === 0 && (
                    <div className="p-3 text-[11px] text-faint text-center">
                      {t('nav.noProjects')}
                    </div>
                  )}
                  {localizedProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleLinkClick(`/projects/${project.id}`)}
                      className="w-full p-2.5 rounded-xl hover:bg-fill transition-colors text-left flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-crimson/15 border border-coral/30 flex items-center justify-center text-amber shrink-0 mt-0.5 overflow-hidden">
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
                        <div className="text-ink text-xs font-semibold group-hover:text-amber transition-colors">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-faint leading-tight mt-0.5">
                          {project.category}
                        </div>
                      </div>
                    </button>
                  ))}

                  <div className="pt-1 border-t border-line">
                    <button
                      onClick={() => handleLinkClick('projects-showcase')}
                      className="w-full text-center py-1.5 text-[11px] text-amber hover:text-ink transition-colors cursor-pointer"
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
            className="px-3 py-1.5 rounded-full hover:text-ink hover:bg-fill transition-all cursor-pointer"
          >
            {t('nav.explore')}
          </button>

          <button
            onClick={() => handleLinkClick('about')}
            className="px-3 py-1.5 rounded-full hover:text-ink hover:bg-fill transition-all cursor-pointer"
          >
            {t('nav.about')}
          </button>

          <button
            onClick={() => handleLinkClick('contact')}
            className="px-3 py-1.5 rounded-full hover:text-ink hover:bg-fill transition-all cursor-pointer"
          >
            {t('nav.contact')}
          </button>
        </div>

        {/* Right Actions: Lang/Theme + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LangThemeControls />

          <button
            onClick={onCtaClick}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-b from-keycap to-keycap-dim hover:to-keycap-hover text-keycap-ink text-[12px] sm:text-[12.5px] font-semibold tracking-tight shadow-[0_2px_10px_rgba(0,0,0,0.35),inset_0_1px_0_#ffffff] hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] transition-all duration-150 active:scale-95 cursor-pointer focus:outline-none shrink-0"
            title={t('nav.getStarted')}
          >
            <span>{t('nav.getStarted')}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-muted hover:text-ink hover:bg-fill transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-surface/95 backdrop-blur-2xl border border-line card-shadow flex flex-col gap-2.5 lg:hidden text-left">
            <button
              onClick={() => handleLinkClick('projects-showcase')}
              className={`py-2 px-3 rounded-xl text-[14px] font-medium flex items-center justify-between cursor-pointer transition-colors ${
                productsActive ? 'text-ink bg-fill' : 'text-muted hover:text-ink hover:bg-fill'
              }`}
            >
              <span>{t('nav.explore')}</span>
            </button>

            {localizedProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleLinkClick(`/projects/${project.id}`)}
                className={`py-2 px-3 rounded-xl text-[14px] font-medium transition-colors flex items-center justify-between cursor-pointer ${productsActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                <span>{project.title}</span>
                <span className="text-[11px] text-amber">{project.category}</span>
              </button>
            ))}

            <button
              onClick={() => handleLinkClick('about')}
              className="py-2 px-3 rounded-xl text-[14px] font-medium text-muted hover:text-ink hover:bg-fill transition-colors text-left cursor-pointer"
            >
              {t('nav.about')}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="py-2 px-3 rounded-xl text-[14px] font-medium text-muted hover:text-ink hover:bg-fill transition-colors text-left cursor-pointer"
            >
              {t('nav.contact')}
            </button>

            <div className="pt-2 border-t border-line flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <LangThemeControls />
              </div>
              <button
                onClick={() => {
                  onCtaClick?.();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-keycap to-keycap-dim text-keycap-ink text-[12px] font-semibold cursor-pointer"
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