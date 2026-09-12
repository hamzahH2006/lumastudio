import rawData from '../../data/projects.json';
import { Project, SiteSettings } from '../types';
import { normalizeProject } from '../utils/normalizeProject';

const RAW = rawData as { settings?: Partial<SiteSettings>; projects?: unknown[] };

export const DEFAULT_SETTINGS: SiteSettings = {
  studioName: RAW.settings?.studioName || 'LumaStudio',
  ownerName: RAW.settings?.ownerName || 'Hamzah',
  tagline: RAW.settings?.tagline || '',
  email: RAW.settings?.email || '',
  github: RAW.settings?.github || '',
  linkedin: RAW.settings?.linkedin || '',
  twitter: RAW.settings?.twitter || '',
};

export const INITIAL_PROJECTS: Project[] = (RAW.projects || []).map(normalizeProject);