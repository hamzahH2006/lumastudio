import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileUp,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { Project, SiteSettings } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { logout } from './auth';
import { ProjectEditor } from './ProjectEditor';
import { localizeProject } from '../utils/localize';
import {
  exportProjectsBundle,
  importProjectsBundle,
  clearStorage,
  loadProjects,
} from '../data/projectsStore';
import { LumaStudioLogo } from '../components/LumaStudioLogo';

interface AdminPanelProps {
  projects: Project[];
  settings: SiteSettings;
  onProjectsChange: (next: Project[]) => void;
  onExit: () => void;
  onNavigate: (target: string) => void;
}

type View = { type: 'list' } | { type: 'editor'; id?: string };

export const AdminPanel: React.FC<AdminPanelProps> = ({
  projects,
  settings,
  onProjectsChange,
  onExit,
  onNavigate,
}) => {
  const { t, lang } = useLocale();
  const [view, setView] = useState<View>({ type: 'list' });
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const localized = projects.map((p) => localizeProject(p, lang));

  const backToList = () => setView({ type: 'list' });

  const handleSave = (next: Project) => {
    const exists = projects.some((p) => p.id === next.id);
    const updated = exists
      ? projects.map((p) => (p.id === next.id ? next : p))
      : [next, ...projects];
    onProjectsChange(updated);
    setNotice(t('admin.saved'));
    backToList();
  };

  const handleDelete = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id));
    setConfirmId(null);
  };

  const handleExport = () => {
    const blob = exportProjectsBundle(projects, settings);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleImportFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const result = importProjectsBundle(String(reader.result ?? ''));
        onProjectsChange(result);
        setNotice(t('admin.importDone', { count: result.length }));
      } catch {
        setNotice(t('admin.importError'));
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleReset = () => {
    clearStorage();
    onProjectsChange(loadProjects());
    setNotice(t('admin.importDone', { count: loadProjects().length }));
  };

  const activeProject = view.type === 'editor' && view.id
    ? projects.find((p) => p.id === view.id)
    : undefined;

  return (
    <div className="min-h-screen w-full bg-surface text-body selection:bg-crimson/30 selection:text-amber font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Panel header */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
          <div className="flex items-center gap-3">
            <LumaStudioLogo
              logoSrc="/assets/lumastudio-logo.png"
              size={30}
              className="w-8 h-8"
              showWordmark={true}
              wordmarkClassName="font-sans font-bold text-lg tracking-tight text-ink"
            />
            <span className="px-2.5 py-1 rounded-full bg-fill border border-line text-[10px] font-semibold text-amber">
              <LayoutDashboard className="w-3 h-3 inline -mt-0.5 mr-1" />
              {t('admin.projects')}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-coral" />
              <span>{t('admin.backToSite')}</span>
            </button>
            <button
              onClick={() => {
                logout();
                onExit();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-crimson/10 hover:bg-crimson/15 border border-crimson/30 text-amber font-sans text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('admin.logout')}</span>
            </button>
          </div>
        </header>

        {/* Notice */}
        {notice && (
          <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-fill border border-line text-xs text-body">
            <span>{notice}</span>
            <button
              onClick={() => setNotice(null)}
              className="text-faint hover:text-ink transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {view.type === 'editor' ? (
          <ProjectEditor
            key={view.id ?? 'new'}
            project={activeProject}
            onSave={handleSave}
            onCancel={backToList}
          />
        ) : (
          <>
            {/* List toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="font-sans font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                  {t('admin.title')}
                </h1>
                <p className="text-sm text-muted mt-1">{t('admin.subtitle')}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setView({ type: 'editor' })}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('admin.addProject')}</span>
                </button>
                <button
                  onClick={handleExport}
                  title={t('admin.export')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('admin.export')}</span>
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  title={t('admin.import')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-colors cursor-pointer"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('admin.import')}</span>
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.confirm(t('admin.resetConfirm'))) {
                      handleReset();
                    }
                  }}
                  title={t('admin.reset')}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('admin.reset')}</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportFile(file);
                    e.target.value = '';
                  }}
                />
              </div>
            </div>

            {/* Project list / empty state */}
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 p-16 rounded-2xl border border-dashed border-line-strong bg-fill text-center">
                <div className="w-14 h-14 rounded-2xl bg-fill border border-line flex items-center justify-center text-coral">
                  <LayoutDashboard className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-ink font-sans font-semibold text-sm">{t('admin.noProjects')}</div>
                  <div className="text-faint text-xs max-w-xs">{t('admin.noProjectsSub')}</div>
                </div>
                <button
                  onClick={() => setView({ type: 'editor' })}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs transition-all cursor-pointer"
                >
                  {t('admin.addProject')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {localized.map((p) => (
                  <div
                    key={p.id}
                    className="relative rounded-2xl bg-surface/90 backdrop-blur-xl border border-line hover:border-line-bright p-5 space-y-4 transition-all card-shadow text-left flex flex-col"
                  >
                    <div className="flex items-start gap-3">
                      {p.icon ? (
                        <img
                          src={p.icon}
                          alt=""
                          className="w-11 h-11 rounded-xl object-cover border border-line-strong"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-crimson/15 border border-coral/30 flex items-center justify-center text-amber font-bold text-sm">
                          {p.title.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="font-sans font-bold text-sm text-ink truncate">{p.title}</div>
                        <div className="text-[11px] text-faint mt-0.5">{p.category}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-fill border border-line text-[9px] font-semibold text-amber shrink-0">
                        {p.isFeatured ? t('detail.featured') : t('detail.visibilityListed')}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed line-clamp-2 min-h-[2rem]">
                      {p.description || '—'}
                    </p>

                    <div className="pt-3 mt-auto border-t border-line flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setView({ type: 'editor', id: p.id })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink text-[11px] transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3 h-3" />
                          {t('admin.editProject')}
                        </button>
                        <button
                          onClick={() => onNavigate(`/projects/${p.id}`)}
                          title={t('detail.livePreview')}
                          className="p-1.5 rounded-lg bg-fill hover:bg-fill-strong border border-line text-body hover:text-amber transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {confirmId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-crimson/15 border border-crimson/40 text-amber text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            {t('admin.deleteConfirm')}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1.5 rounded-lg bg-fill border border-line text-faint text-[11px] cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(p.id)}
                          className="p-1.5 rounded-lg bg-fill hover:bg-fill-strong border border-line text-body hover:text-coral transition-colors cursor-pointer"
                          title={t('admin.delete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};