import React, { useState, useEffect } from 'react';
import { LivingAuroraBackground } from './components/LivingAuroraBackground';
import { FloatingPillNav } from './components/FloatingPillNav';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './components/NotFoundPage';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { INITIAL_PROJECTS } from './data/initialData';
import {
  loadProjects,
  persistProjects,
  clearProjects,
  createProject,
  updateProjectInList,
  deleteProjectFromList,
} from './utils/projectStore';
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from './utils/settingsStore';
import { LocaleProvider } from './i18n/LocaleContext';
import { Project, ProjectFormData, SiteSettings } from './types';
import { clearAllAttachments } from './utils/attachmentStore';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      return loadProjects(INITIAL_PROJECTS);
    }
    return INITIAL_PROJECTS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      return loadSettings();
    }
    return { ...DEFAULT_SETTINGS };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Open the admin panel directly via the hidden route only
  useEffect(() => {
    if (currentPath === '/admin') {
      setIsAdminOpen(true);
    }
  }, [currentPath]);

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

  // ---------- Project store glue ----------
  const persist = (next: Project[]) => {
    setProjects(next);
    persistProjects(next);
  };

  const handleSaveProjects = (updated: Project[]) => {
    persist(updated);
  };

  const handleSaveSettings = (next: SiteSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  const handleResetProjects = () => {
    clearAllAttachments();
    clearProjects();
    setProjects(INITIAL_PROJECTS.map((p) => ({ ...p, createdAt: Date.now(), updatedAt: Date.now() })));
  };

  const handleAddProject = (data: ProjectFormData): Project => {
    const next = createProject(data);
    persist([...projects, next]);
    return next;
  };

  const handleDeleteProject = (id: string) => {
    persist(deleteProjectFromList(projects, id));
  };

  const handleToggleFeatured = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    persist(updateProjectInList(projects, id, { isFeatured: !target.isFeatured }));
  };

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    persist(updateProjectInList(projects, projectId, updates));
  };

  // ---------- Route resolution ----------
  const projectMatch = currentPath.match(/^\/projects\/([^/]+)/);
  const projectId = projectMatch ? decodeURIComponent(projectMatch[1]) : null;
  const activeProject = projectId ? projects.find((p) => p.id === projectId) : undefined;
  const isProjectRoute = Boolean(projectMatch);

  const featured = projects.filter((p) => p.isFeatured);
  const ctaTarget = featured[0] ? `/projects/${featured[0].id}` : 'projects-showcase';

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (currentPath === '/admin' && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

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
              onOpenAdmin={() => setIsAdminOpen(true)}
              onOpenContact={() => handleNavigate('contact')}
            />
          )}
        </main>

        <AdminDashboardModal
          isOpen={isAdminOpen}
          onClose={handleCloseAdmin}
          projects={projects}
          settings={settings}
          onSaveSettings={handleSaveSettings}
          onSaveProjects={handleSaveProjects}
          onResetProjects={handleResetProjects}
          onDeleteProject={handleDeleteProject}
          onToggleFeatured={handleToggleFeatured}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
        />

      </div>
    </LocaleProvider>
  );
}