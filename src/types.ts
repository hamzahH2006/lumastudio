export type ProjectCategory = 'Mobile' | 'Desktop' | 'Web';

export interface ProjectAttachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  detailedDescription: string;
  screenshots: string[];
  icon?: string;
  downloadUrl: string;
  downloadLabel: string;
  attachment?: ProjectAttachment;
  isFeatured: boolean;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface SiteSettings {
  studioName: string;
  ownerName: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export type ProjectFormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  skills: string[];
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
  budget?: string;
}