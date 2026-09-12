import { Project } from '../types';
import { getAttachedFile } from './attachmentStore';

// Downloads the project's binary: prefers the in-session object URL, then the
// persisted /apps/... path written by the asset pipeline.
// Returns false when nothing is available this session.
export const downloadProject = (project: Project): boolean => {
  const attached = getAttachedFile(project.id);
  if (attached) {
    const a = document.createElement('a');
    a.href = attached.url;
    a.download = attached.file.name;
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  }

  if (project.attachment?.url && !project.attachment.url.startsWith('blob:')) {
    if (project.attachment.url.startsWith('/')) {
      window.open(project.attachment.url, '_blank', 'noopener,noreferrer');
    } else {
      const a = document.createElement('a');
      a.href = project.attachment.url;
      a.download = project.attachment.name;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    return true;
  }

  return false;
};