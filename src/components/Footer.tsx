import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Project, SiteSettings } from '../types';
import { LumaStudioLogo } from './LumaStudioLogo';
import { useLocale } from '../i18n/LocaleContext';
import { localizeProject } from '../utils/localize';

interface FooterProps {
  settings: SiteSettings;
  projects: Project[];
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, projects, onNavigate }) => {
  const { t, lang } = useLocale();
  const localizedProjects = projects.map((p) => localizeProject(p, lang));

  return (
    <footer className="relative border-t border-line bg-surface py-16 text-muted font-sans text-xs z-10 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <LumaStudioLogo showWordmark={true} size={24} wordmarkClassName="font-sans font-bold text-lg text-ink tracking-tight" />
            </div>

            <p className="text-faint text-xs sm:text-sm max-w-md leading-relaxed">
              {settings.tagline || t('footer.brand')}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-fill hover:bg-fill-strong border border-line flex items-center justify-center text-muted hover:text-ink transition-colors"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-fill hover:bg-fill-strong border border-line flex items-center justify-center text-muted hover:text-ink transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={settings.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-fill hover:bg-fill-strong border border-line flex items-center justify-center text-muted hover:text-ink transition-colors"
                title="Twitter / X"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-8 h-8 rounded-full bg-fill hover:bg-fill-strong border border-line flex items-center justify-center text-muted hover:text-amber transition-colors"
                title={t('contact.primaryEmail')}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-ink font-semibold font-sans text-sm">{t('footer.navigation')}</div>
            <ul className="space-y-2 text-faint">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  {t('footer.home')}
                </button>
              </li>
              {projects.slice(0, 3).map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => onNavigate(`/projects/${project.id}`)}
                    className="hover:text-ink transition-colors cursor-pointer text-left"
                  >
                    {project.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-ink transition-colors cursor-pointer text-left"
                >
                  {t('footer.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="md:col-span-3 space-y-3 text-left">
            <div className="text-ink font-semibold font-sans text-sm">{t('footer.products')}</div>
            <ul className="space-y-2 text-faint">
              {localizedProjects.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => onNavigate(`/projects/${project.id}`)}
                    className="hover:text-amber transition-colors cursor-pointer text-left"
                  >
                    {project.title}
                  </button>
                </li>
              ))}
              {projects.length === 0 && (
                <li className="text-faint">{t('nav.noProjects')}</li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4 text-[11px] text-faint">
          <div className="relative">
            <span className="text-faint text-left select-none">
              {t('footer.rights', { studio: settings.studioName })}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};