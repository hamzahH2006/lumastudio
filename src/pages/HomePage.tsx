import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { BasaltHero } from '../components/BasaltHero';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ProductPhotoShowcase } from '../components/ProductPhotoShowcase';
import { Project, SiteSettings } from '../types';
import { useLocale } from '../i18n/LocaleContext';

interface HomePageProps {
  projects: Project[];
  settings: SiteSettings;
  onNavigatePage: (path: string) => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  settings,
  onNavigatePage,
  onOpenAdmin,
  onOpenContact,
}) => {
  const { t } = useLocale();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedProjects = projects.filter((p) => p.isFeatured).length > 0
    ? projects.filter((p) => p.isFeatured)
    : projects;

  return (
    <div className="min-h-screen text-[#c8c8cb] selection:bg-[#ff2f3a]/30 selection:text-[#ffb347]">

      {/* HERO SECTION */}
      <BasaltHero onScrollToSection={handleScrollToSection} />

      {/* DYNAMIC PROJECTS SHOWCASE */}
      <section id="projects-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 scroll-mt-24">

        <div className="mb-14 pb-4 border-b border-white/[0.06] text-left">
          <h2 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t('showcase.title')}
          </h2>
          <p className="text-[#9c9c9d] text-sm sm:text-base mt-2">
            {t('showcase.subtitle')}
          </p>
        </div>

        {displayedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 p-14 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] text-center">
            <div className="text-white font-sans font-semibold text-sm">{t('showcase.emptyTitle')}</div>
            <div className="text-[#848487] text-xs">{t('showcase.empty')}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-[#07080a]/85 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.22] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_24px_60px_-12px_rgba(255,47,58,0.18)] text-left overflow-hidden"
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
                      <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-[#ffb347]">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#9c9c9d] leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onNavigatePage(`/projects/${project.id}`)}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>{t('showcase.explore')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  {project.liveUrl && project.liveUrl !== '#' && (
                    <button
                      onClick={() =>
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                      }
                      className="py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white font-sans text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title={t('detail.livePreview')}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#ffb347]" />
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
        onTriggerHiddenAdmin={onOpenAdmin}
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