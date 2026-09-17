import { Project } from '../types';
import { Lang } from '../i18n/translations';

const pick = (lang: Lang, ar?: string, en?: string, base?: string): string =>
  lang === 'ar' ? ar || base || en || '' : en || base || ar || '';

export const localizeProject = (project: Project, lang: Lang): Project => ({
  ...project,
  title: pick(lang, project.titleAr, project.titleEn, project.title),
  description: pick(lang, project.descriptionAr, project.descriptionEn, project.description),
  detailedDescription: pick(
    lang,
    project.detailedDescriptionAr,
    project.detailedDescriptionEn,
    project.detailedDescription
  ),
});