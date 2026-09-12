import { Project } from '../types';

// Hands the user the product's distributable file from public/apps/<slug>/.
// External links open in a new tab; same-origin /apps/... files are saved.
export const downloadProject = (project: Project): boolean => {
  const url = project.downloadUrl;
  if (!url || url.startsWith('#') || url.startsWith('data:')) return false;

  const fileName = url.split('/').pop() || 'download';

  if (/^https?:\/\//i.test(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
  return true;
};