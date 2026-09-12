import { SiteSettings } from '../types';

const SETTINGS_KEY = 'lumastudio_settings';

export const DEFAULT_SETTINGS: SiteSettings = {
  studioName: 'LumaStudio',
  ownerName: 'Hamzah',
  tagline:
    'LumaStudio builds ultra-fast, high-performance command engines and developer utilities designed for modern engineering teams.',
  email: 'contact@lumastudio.io',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
};

const normalize = (raw: unknown): SiteSettings => {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    studioName: typeof r.studioName === 'string' && r.studioName ? r.studioName : DEFAULT_SETTINGS.studioName,
    ownerName: typeof r.ownerName === 'string' && r.ownerName ? r.ownerName : DEFAULT_SETTINGS.ownerName,
    tagline: typeof r.tagline === 'string' && r.tagline ? r.tagline : DEFAULT_SETTINGS.tagline,
    email: typeof r.email === 'string' && r.email ? r.email : DEFAULT_SETTINGS.email,
    github: typeof r.github === 'string' ? r.github : DEFAULT_SETTINGS.github,
    linkedin: typeof r.linkedin === 'string' ? r.linkedin : DEFAULT_SETTINGS.linkedin,
    twitter: typeof r.twitter === 'string' ? r.twitter : DEFAULT_SETTINGS.twitter,
  };
};

export const loadSettings = (): SiteSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return normalize(JSON.parse(stored));
    }
  } catch {
    // Ignore corrupt storage
  }
  return { ...DEFAULT_SETTINGS };
};

export const saveSettings = (settings: SiteSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(normalize(settings)));
  } catch {
    // Ignore quota errors
  }
};

export const resetSettings = (): void => {
  try {
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    // Ignore
  }
};