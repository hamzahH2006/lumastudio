import { ProjectAttachment } from '../types';

export interface AttachedFile {
  file: File;
  url: string;
}

// In-memory registry of locally attached binary files, keyed by project id.
// Object URLs are session-bound, so binaries live here — not in localStorage —
// while only their metadata (name/size/type) is persisted with the project.
const registry = new Map<string, AttachedFile>();

export const attachFile = (projectId: string, file: File): ProjectAttachment => {
  const existing = registry.get(projectId);
  if (existing) {
    URL.revokeObjectURL(existing.url);
  }
  const url = URL.createObjectURL(file);
  registry.set(projectId, { file, url });
  return { name: file.name, size: file.size, type: file.type || 'application/octet-stream' };
};

export const removeFile = (projectId: string): void => {
  const existing = registry.get(projectId);
  if (existing) {
    URL.revokeObjectURL(existing.url);
  }
  registry.delete(projectId);
};

export const getAttachedFile = (projectId: string): AttachedFile | undefined => {
  return registry.get(projectId);
};

export const clearAllAttachments = (): void => {
  registry.forEach((entry) => URL.revokeObjectURL(entry.url));
  registry.clear();
};

export const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${unit === 0 ? value : value.toFixed(1)} ${units[unit]}`;
};