import { Project, ProjectCategory } from '../types';
import { slugify } from './slugify';

const CATEGORIES: ProjectCategory[] = ['Mobile', 'Desktop', 'Web'];

const toScreenshotUrl = (s: unknown): string => {
  if (typeof s === 'string') return s;
  if (s && typeof s === 'object') {
    const obj = s as { url?: unknown };
    if (typeof obj.url === 'string') return obj.url;
  }
  return '';
};

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

export const normalizeProject = (raw: unknown): Project => {
  const r = (raw ?? {}) as Record<string, unknown>;
  const now = Date.now();

  const slug = slugify(asString(r.slug, asString(r.title, 'untitled')));
  const file = asString(r.file).trim();

  const screenshots = Array.isArray(r.screenshots)
    ? r.screenshots.map(toScreenshotUrl).filter(Boolean).map((name) =>
        name.startsWith('/') || /^(https?:|data:)/.test(name)
          ? name
          : `/apps/${slug}/screenshots/${name}`
      )
    : [];

  const icon = asString(r.icon).trim();
  const category = CATEGORIES.includes(r.category as ProjectCategory) ? (r.category as ProjectCategory) : 'Desktop';

  return {
    id: asString(r.id, `project-${now}`),
    slug,
    title: asString(r.title, 'Untitled Project'),
    titleEn: asString(r.titleEn) || undefined,
    titleAr: asString(r.titleAr) || undefined,
    category,
    description: asString(r.description),
    descriptionEn: asString(r.descriptionEn) || undefined,
    descriptionAr: asString(r.descriptionAr) || undefined,
    detailedDescription: asString(r.detailedDescription),
    detailedDescriptionEn: asString(r.detailedDescriptionEn) || undefined,
    detailedDescriptionAr: asString(r.detailedDescriptionAr) || undefined,
    screenshots,
    downloadUrl: file ? `/apps/${slug}/${file}` : asString(r.downloadUrl),
    downloadLabel: asString(r.downloadLabel, file ? 'Download' : 'Download'),
    isFeatured: Boolean(r.isFeatured),
    techStack: Array.isArray(r.techStack) ? r.techStack.map(String).filter(Boolean) : [],
    githubUrl: asString(r.githubUrl),
    liveUrl: asString(r.liveUrl),
    createdAt: typeof r.createdAt === 'number' ? r.createdAt : now,
    updatedAt: typeof r.updatedAt === 'number' ? r.updatedAt : now,
  };
};