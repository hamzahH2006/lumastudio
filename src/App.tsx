import React, { useState, useEffect } from 'react';
import { LivingAuroraBackground } from './components/LivingAuroraBackground';
import { FloatingPillNav } from './components/FloatingPillNav';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './components/NotFoundPage';
import { INITIAL_PROJECTS, DEFAULT_SETTINGS } from './data/initialData';
import { LocaleProvider } from './i18n/LocaleContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Read-only static data sourced from data/projects.json + public/apps assets.
  const projects = INITIAL_PROJECTS;
  const settings = DEFAULT_SETTINGS;

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('/')) {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPath !== '/') {
        if (window.location.pathname !== '/') {
          window.history.pushState({}, '', '/');
        }
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(path);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById(path);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // ---------- Route resolution ----------
  const projectMatch = currentPath.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch ? decodeURIComponent(projectMatch[1]) : null;
  const activeProject = projectId ? projects.find((p) => p.id === projectId) : undefined;
  const isProjectRoute = Boolean(projectMatch);

  const featured = projects.filter((p) => p.isFeatured);
  const ctaTarget = featured[0] ? `/projects/${featured[0].id}` : 'projects-showcase';

  return (
    <LocaleProvider>
      <div className="relative min-h-screen w-full bg-[#07080a] text-white selection:bg-[#ff2f3a]/30 selection:text-[#ffb347] overflow-x-hidden font-sans">

        <LivingAuroraBackground />

        <FloatingPillNav
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onCtaClick={() => handleNavigate(ctaTarget)}
          projects={projects}
        />

        <main className="relative z-10">
          {isProjectRoute ? (
            activeProject ? (
              <ProjectDetailPage
                project={activeProject}
                onGoBack={() => handleNavigate('/')}
                settings={settings}
                onNavigateToContact={() => handleNavigate('contact')}
              />
            ) : (
              <NotFoundPage attemptedPath={currentPath} onGoHome={() => handleNavigate('/')} />
            )
          ) : (
            <HomePage
              projects={projects}
              settings={settings}
              onNavigatePage={handleNavigate}
              onOpenContact={() => handleNavigate('contact')}
            />
          )}
        </main>

      </div>
    </LocaleProvider>
  );
}