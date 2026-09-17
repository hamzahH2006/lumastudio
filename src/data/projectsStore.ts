import { Project, SiteSettings } from '../types';
import { INITIAL_PROJECTS, DEFAULT_SETTINGS } from './initialData';
import { normalizeProject } from '../utils/normalizeProject';

export const PROJECTS_STORAGE_KEY = 'lumastudio_projects_v1';
export const PROJECTS_CHANGE_EVENT = 'lumastudio:projects-change';

export interface StoredBundle {
  settings?: Partial<SiteSettings>;
  projects?: unknown[];
}

export const loadProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) return INITIAL_PROJECTS;
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return INITIAL_PROJECTS;
    const normalized = parsed.map(normalizeProject);
    return normalized.length > 0 ? normalized : INITIAL_PROJECTS;
  } catch {
    return INITIAL_PROJECTS;
  }
};

export const persistProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent(PROJECTS_CHANGE_EVENT, { detail: projects }));
  } catch {
    // storage unavailable — keep in-memory only
  }
};

export const clearStorage = (): void => {
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(PROJECTS_CHANGE_EVENT, { detail: INITIAL_PROJECTS }));
};

export const exportProjectsBundle = (projects: Project[], settings: SiteSettings): Blob => {
  const bundle: StoredBundle = {
    settings,
    projects: projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      category: p.category,
      description: p.description,
      descriptionEn: p.descriptionEn,
      descriptionAr: p.descriptionAr,
      detailedDescription: p.detailedDescription,
      detailedDescriptionEn: p.detailedDescriptionEn,
      detailedDescriptionAr: p.detailedDescriptionAr,
      screenshots: p.screenshots,
      icon: p.icon,
      file: p.downloadUrl && p.downloadUrl.startsWith('/apps/') ? p.downloadUrl.split('/').pop() : undefined,
      downloadUrl: p.downloadUrl && !p.downloadUrl.startsWith('/apps/') ? p.downloadUrl : undefined,
      downloadLabel: p.downloadLabel,
      isFeatured: p.isFeatured,
      techStack: p.techStack,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
  };
  return new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
};

export const importProjectsBundle = (text: string): Project[] => {
  const parsed = JSON.parse(text) as StoredBundle;
  const rawProjects = Array.isArray(parsed.projects) ? parsed.projects : [];
  const normalized = rawProjects.map(normalizeProject);
  persistProjects(normalized);
  return normalized;
};