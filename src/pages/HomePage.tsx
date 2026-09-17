import React from 'react';
import { ArrowRight, ExternalLink, PackageOpen } from 'lucide-react';
import { BasaltHero } from '../components/BasaltHero';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ProductPhotoShowcase } from '../components/ProductPhotoShowcase';
import { Project, SiteSettings } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { localizeProject } from '../utils/localize';

interface HomePageProps {
  projects: Project[];
  settings: SiteSettings;
  onNavigatePage: (path: string) => void;
  onOpenContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  settings,
  onNavigatePage,
  onOpenContact,
}) => {
  const { t, lang } = useLocale();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featured = projects.filter((p) => p.isFeatured);
  const base = featured.length > 0 ? featured : projects;
  const displayedProjects = base.map((p) => localizeProject(p, lang));

  return (
    <div className="min-h-screen text-body selection:bg-crimson/30 selection:text-amber">

      {/* HERO SECTION */}
      <BasaltHero onScrollToSection={handleScrollToSection} />

      {/* DYNAMIC PROJECTS SHOWCASE */}
      <section id="projects-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 scroll-mt-24">

        <div className="mb-14 pb-4 border-b border-line text-left">
          <h2 className="font-sans font-bold text-3xl sm:text-5xl text-ink tracking-tight">
            {t('showcase.title')}
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            {t('showcase.subtitle')}
          </p>
        </div>

        {displayedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 p-16 rounded-3xl border border-dashed border-line-strong bg-fill/60 text-center">
            <div className="w-16 h-16 rounded-2xl bg-fill border border-line flex items-center justify-center text-coral">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md">
              <div className="text-ink font-sans font-bold text-lg">{t('showcase.emptyTitle')}</div>
              <div className="text-muted text-sm leading-relaxed">{t('showcase.empty')}</div>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-fill-strong border border-line text-[11px] text-faint font-sans">
              {t('showcase.emptyHint')}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-surface/85 backdrop-blur-xl border border-line hover:border-line-bright p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 card-shadow hover:card-shadow-glow text-left overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="space-y-6">
                  <div
                    onClick={() => onNavigatePage(`/projects/${project.id}`)}
                    className="cursor-pointer"
                  >
                    <ProductPhotoShowcase
                      projectId={project.id}
                      title={project.title}
                      photoUrl={project.screenshots[0]}
                      icon={project.icon}
                      compact={true}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-2xl sm:text-3xl text-ink group-hover:text-ink transition-colors">
                        {project.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-md bg-fill border border-line text-[10px] text-amber">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-line flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onNavigatePage(`/projects/${project.id}`)}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:from-white hover:to-keycap-hover text-keycap-ink font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>{t('showcase.explore')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  {project.liveUrl && project.liveUrl !== '#' && (
                    <button
                      onClick={() =>
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                      }
                      className="py-3 px-4 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title={t('detail.livePreview')}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber" />
                      <span>{t('detail.livePreview')}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* SYSTEMS ARCHITECTURE MANIFESTO & ABOUT */}
      <AboutSection />

      {/* INITIATE CONTACT & PROPOSAL FORM */}
      <ContactSection settings={settings} />

      {/* FOOTER */}
      <Footer
        settings={settings}
        projects={projects}
        onNavigate={(path) => {
          if (path.startsWith('/')) {
            onNavigatePage(path);
          } else {
            handleScrollToSection(path);
          }
        }}
      />

    </div>
  );
};