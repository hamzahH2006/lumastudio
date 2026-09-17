import React, { useState, useEffect, useCallback } from 'react';
import { LivingAuroraBackground } from './components/LivingAuroraBackground';
import { TopBar } from './components/TopBar';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLogin } from './admin/AdminLogin';
import { AdminPanel } from './admin/AdminPanel';
import { DEFAULT_SETTINGS } from './data/initialData';
import { Project } from './types';
import { isAuthenticated } from './admin/auth';
import {
  loadProjects,
  persistProjects,
  PROJECTS_CHANGE_EVENT,
} from './data/projectsStore';
import { LocaleProvider } from './i18n/LocaleContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [projects, setProjects] = useState<Project[]>(() => loadProjects());
  const [, forceRender] = useState(0);

  // Settings stay read-only (static source). Projects are user-editable via the
  // admin panel and persisted to localStorage on top of src/data/projects.json.
  const settings = DEFAULT_SETTINGS;

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const sync = () => setProjects(loadProjects());
    window.addEventListener(PROJECTS_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PROJECTS_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const handleNavigate = useCallback((path: string) => {
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
  }, [currentPath]);

  const onProjectsChange = useCallback((next: Project[]) => {
    setProjects(next);
    persistProjects(next);
  }, []);

  // ---------- Route resolution ----------
  const isAdminRoute = currentPath.startsWith('/admin');
  const adminAuthed = isAuthenticated();

  if (isAdminRoute) {
    // /admin/login is the only unlock door. Any other /admin/* path answers
    // with the public 404 page for non-authenticated visitors, so the panel
    // stays fully invisible.
    if (currentPath === '/admin/login' && !adminAuthed) {
      return (
        <LocaleProvider>
          <AdminLogin
            onSuccess={() => {
              forceRender((t) => t + 1);
              handleNavigate('/admin');
            }}
          />
        </LocaleProvider>
      );
    }

    if (adminAuthed) {
      return (
        <LocaleProvider>
          <AdminPanel
            projects={projects}
            settings={settings}
            onProjectsChange={onProjectsChange}
            onExit={() => handleNavigate('/')}
            onNavigate={handleNavigate}
          />
        </LocaleProvider>
      );
    }

    return <NotFoundPage attemptedPath={currentPath} onGoHome={() => handleNavigate('/')} />;
  }

  const projectMatch = currentPath.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch ? decodeURIComponent(projectMatch[1]) : null;
  const activeProject = projectId ? projects.find((p) => p.id === projectId) : undefined;
  const isProjectRoute = Boolean(projectMatch);

  const featured = projects.filter((p) => p.isFeatured);
  const ctaTarget = featured[0] ? `/projects/${featured[0].id}` : 'projects-showcase';

  return (
    <LocaleProvider>
      <div className="relative min-h-screen w-full bg-surface text-ink selection:bg-crimson/30 selection:text-amber overflow-x-hidden font-sans">

        <LivingAuroraBackground />

        <TopBar
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