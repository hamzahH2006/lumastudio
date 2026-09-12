import { Project, ProjectCategory } from '../types';
import { slugify } from './slugify';

const STORAGE_KEY = 'lumastudio_portfolio_projects';
const LEGACY_KEYS = ['hamzah_portfolio_projects', 'lumastudio_projects', 'lumastudio_projects_seeded'];

const CATEGORIES: ProjectCategory[] = ['Mobile', 'Desktop', 'Web'];

const toScreenshotUrl = (s: unknown): string => {
  if (typeof s === 'string') return s;
  if (s && typeof s === 'object') {
    const obj = s as { url?: unknown };
    if (typeof obj.url === 'string') return obj.url;
  }
  return '';
};

export const normalizeProject = (raw: unknown): Project => {
  const r = (raw ?? {}) as Record<string, unknown>;
  const now = Date.now();

  const screenshots = Array.isArray(r.screenshots) ? r.screenshots.map(toScreenshotUrl).filter(Boolean) : [];

  // Persisted attachment metadata (name/size/type). The binary itself lives in
  // the in-memory attachmentStore only — localStorage cannot hold blobs.
  let attachment;
  if (r.attachment && typeof r.attachment === 'object') {
    const a = r.attachment as Record<string, unknown>;
    if (typeof a.name === 'string' && a.name) {
      attachment = {
        name: a.name,
        size: typeof a.size === 'number' ? a.size : 0,
        type: typeof a.type === 'string' ? a.type : 'application/octet-stream',
        url: typeof a.url === 'string' && a.url ? a.url : undefined,
      };
    }
  }

  const category = CATEGORIES.includes(r.category as ProjectCategory) ? (r.category as ProjectCategory) : 'Desktop';
  const rawTitle = typeof r.title === 'string' && r.title ? r.title : 'Untitled Project';

  return {
    id: typeof r.id === 'string' && r.id ? r.id : `project-${now}-${Math.random().toString(36).slice(2, 9)}`,
    slug: typeof r.slug === 'string' && r.slug ? slugify(r.slug) : slugify(rawTitle),
    title: rawTitle,
    category,
    description: typeof r.description === 'string' ? r.description : '',
    detailedDescription: typeof r.detailedDescription === 'string' ? r.detailedDescription : '',
    screenshots,
    downloadUrl: typeof r.downloadUrl === 'string' ? r.downloadUrl : '',
    downloadLabel: typeof r.downloadLabel === 'string' && r.downloadLabel ? r.downloadLabel : 'Download',
    attachment,
    isFeatured: Boolean(r.isFeatured),
    techStack: Array.isArray(r.techStack) ? r.techStack.map(String).filter(Boolean) : [],
    githubUrl: typeof r.githubUrl === 'string' ? r.githubUrl : '',
    liveUrl: typeof r.liveUrl === 'string' ? r.liveUrl : '',
    createdAt: typeof r.createdAt === 'number' ? r.createdAt : now,
    updatedAt: typeof r.updatedAt === 'number' ? r.updatedAt : now,
  };
};

export const loadProjects = (seed: Project[]): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeProject);
      }
    }
  } catch {
    // Ignore corrupt storage
  }
  return seed.map((p) => normalizeProject(p));
};

export const persistProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // Ignore quota errors
  }
};

export const clearProjects = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Ignore
  }
};

export const createProject = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  const now = Date.now();
  return normalizeProject({
    ...data,
    id: `project-${now}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  });
};

export const updateProjectInList = (projects: Project[], id: string, updates: Partial<Project>): Project[] => {
  return projects.map((p) => {
    if (p.id !== id) return p;
    return normalizeProject({ ...p, ...updates, updatedAt: Date.now() });
  });
};

export const deleteProjectFromList = (projects: Project[], id: string): Project[] => {
  return projects.filter((p) => p.id !== id);
};