import { Project } from '../types';
import { getAttachedFile } from './attachmentStore';

// Downloads the project's locally attached binary via its in-session object URL.
// Returns false when no live blob is available this session.
export const downloadProject = (project: Project): boolean => {
  const attached = getAttachedFile(project.id);
  if (!attached) return false;

  const a = document.createElement('a');
  a.href = attached.url;
  a.download = attached.file.name;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
  return true;
};