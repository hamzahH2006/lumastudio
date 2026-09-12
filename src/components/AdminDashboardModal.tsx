import React, { useState, useEffect } from 'react';
import {
  X, Lock, Key, Save, RotateCcw, Plus, Trash2,
  Image as ImageIcon, Download, Check, Star, Pencil, CalendarPlus, FolderUp, Settings, Globe, AlertTriangle
} from 'lucide-react';
import { Project, ProjectFormData, ProjectCategory, SiteSettings } from '../types';
import { formatDriveImageUrl } from '../utils/driveUrlParser';
import { ScreenshotUploader } from './ScreenshotUploader';
import { AttachmentUploader } from './AttachmentUploader';
import { AppIconUploader } from './AppIconUploader';
import { attachFile, removeFile, getAttachedFile } from '../utils/attachmentStore';
import { resetSettings, DEFAULT_SETTINGS } from '../utils/settingsStore';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  settings: SiteSettings;
  onSaveProjects: (updated: Project[]) => void;
  onResetProjects: () => void;
  onDeleteProject: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onAddProject: (data: ProjectFormData) => Project;
  onSaveSettings: (next: SiteSettings) => void;
  onUpdateProject: (id: string, patch: Partial<Project>) => void;
}

const EMPTY_FORM: ProjectFormData = {
  title: '',
  category: 'Desktop',
  description: '',
  detailedDescription: '',
  screenshots: [],
  downloadUrl: '',
  downloadLabel: 'Download',
  isFeatured: false,
  techStack: [],
  githubUrl: '',
  liveUrl: '',
};

const fromCommaList = (text: string): string[] =>
  text.split(',').map((s) => s.trim()).filter(Boolean);

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  projects,
  settings,
  onSaveProjects,
  onResetProjects,
  onDeleteProject,
  onToggleFeatured,
  onAddProject,
  onSaveSettings,
  onUpdateProject,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [editingProjects, setEditingProjects] = useState<Project[]>(projects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(settings);
  const [saveToast, setSaveToast] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Add-Project modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<ProjectFormData>(EMPTY_FORM);
  const [addAttachmentFile, setAddAttachmentFile] = useState<File | null>(null);

  useEffect(() => {
    setEditingProjects(projects);
    setSelectedProjectId((prev) =>
      prev && projects.some((p) => p.id === prev)
        ? prev
        : projects[0]?.id || ''
    );
  }, [projects]);

  useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = ['admin', 'lumastudio', 'studio', 'hamzah'];
    const validPass = ['omni-vault-2026', 'lumastudio2026', 'admin', 'luma'];
    if (
      validUsers.includes(username.toLowerCase().trim()) &&
      (validPass.includes(password.trim()) || password.trim() === '')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / omni-vault-2026');
    }
  };

  const showToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    opts?: { type?: string; placeholder?: string; rows?: number }
  ) => (
    <div className="space-y-1">
      <label className="text-[#848487] text-[11px]">{label}</label>
      {opts?.rows ? (
        <textarea
          rows={opts.rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={opts.placeholder}
          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs resize-y"
        />
      ) : (
        <input
          type={opts?.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={opts?.placeholder}
          className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
        />
      )}
    </div>
  );

  const currentProject = editingProjects.find((p) => p.id === selectedProjectId) || editingProjects[0];

  const handleUpdateCurrentProject = (updates: Partial<Project>) => {
    if (!currentProject) return;
    setEditingProjects((prev) =>
      prev.map((p) => (p.id === currentProject.id ? { ...p, ...updates } : p))
    );
  };

  // Screenshot changes are saved instantly so the main site showcase updates live
  const handleScreenshotsChange = (list: string[]) => {
    if (!currentProject) return;
    const updatedAt = Date.now();
    const next = editingProjects.map((p) =>
      p.id === currentProject.id ? { ...p, screenshots: list, updatedAt } : p
    );
    setEditingProjects(next);
    onSaveProjects(next);
  };

  // App-file attachment changes also flush instantly to the live Download CTA
  const flushAttachment = (projectId: string, patch: Partial<Project>) => {
    const updatedAt = Date.now();
    const next = editingProjects.map((p) =>
      p.id === projectId ? { ...p, ...patch, updatedAt } : p
    );
    setEditingProjects(next);
    onSaveProjects(next);
  };

  // Project icon changes flush instantly to the live cards/details
  const handleIconChange = (iconValue: string) => {
    if (!currentProject) return;
    const updatedAt = Date.now();
    const next = editingProjects.map((p) =>
      p.id === currentProject.id ? { ...p, icon: iconValue || undefined, updatedAt } : p
    );
    setEditingProjects(next);
    onUpdateProject(currentProject.id, { icon: iconValue || undefined, updatedAt });
  };

  const handleAttachCurrentFile = (file: File) => {
    if (!currentProject) return;
    const meta = attachFile(currentProject.id, file);
    flushAttachment(currentProject.id, { attachment: meta });
  };

  const handleRemoveCurrentFile = () => {
    if (!currentProject) return;
    removeFile(currentProject.id);
    flushAttachment(currentProject.id, { attachment: undefined });
  };

  // ---------- ADD PROJECT ----------
  const openAddModal = () => {
    setAddForm(EMPTY_FORM);
    setAddAttachmentFile(null);
    setShowAddModal(true);
  };

  const handleAddAttachment = (file: File) => {
    setAddAttachmentFile(file);
    setAddForm((f) => ({
      ...f,
      attachment: { name: file.name, size: file.size, type: file.type || 'application/octet-stream' },
    }));
  };

  const handleRemoveAddAttachment = () => {
    setAddAttachmentFile(null);
    setAddForm((f) => ({ ...f, attachment: undefined }));
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title.trim()) return;
    const newProject = onAddProject({
      ...addForm,
      title: addForm.title.trim(),
      screenshots: addForm.screenshots.map(formatDriveImageUrl),
      downloadUrl: formatDriveImageUrl(addForm.downloadUrl.trim()),
      techStack: fromCommaList(addForm.techStack.join(',')),
    });
    if (addAttachmentFile) {
      attachFile(newProject.id, addAttachmentFile);
    }
    setEditingProjects((prev) => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
    setShowAddModal(false);
    showToast();
  };

  // ---------- DELETE ----------
  const handleConfirmDelete = () => {
    if (!confirmDeleteId) return;
    removeFile(confirmDeleteId);
    onDeleteProject(confirmDeleteId);
    setEditingProjects((prev) => prev.filter((p) => p.id !== confirmDeleteId));
    setConfirmDeleteId(null);
    showToast();
  };

  // ---------- TOGGLE FEATURED ----------
  const handleToggleFeatured = () => {
    if (!currentProject) return;
    onToggleFeatured(currentProject.id);
    setEditingProjects((prev) =>
      prev.map((p) =>
        p.id === currentProject.id ? { ...p, isFeatured: !p.isFeatured, updatedAt: Date.now() } : p
      )
    );
    showToast();
  };

  const catOptions: ProjectCategory[] = ['Mobile', 'Desktop', 'Web'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-white/[0.1] shadow-[0_24px_80px_rgba(0,0,0,0.95)] bg-[#07080a] overflow-hidden text-[#c8c8cb]">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff2f3a]/15 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ffb347]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-white">Admin Dashboard</div>
              <div className="text-[11px] text-[#848487]">Portfolio Projects & Assets</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/[0.08] text-[#848487] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 max-w-md mx-auto w-full space-y-6 my-auto text-xs">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#ff2f3a]/15 border border-[#ff6b4a]/40 flex items-center justify-center mx-auto text-[#ffb347] mb-2">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-sans text-white">Authentication Required</h2>
              <p className="text-[#848487] text-xs">Enter credentials to manage portfolio projects and assets.</p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-[#ff2f3a]/20 border border-[#ff2f3a]/40 text-[#ffb347] text-[11px] flex items-center gap-2">
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[#848487]">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#555] focus:outline-none focus:border-[#ff6b4a]"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[#848487]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#555] focus:outline-none focus:border-[#ff6b4a]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Authenticate</span>
              </button>
            </form>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('omni-vault-2026');
                  setIsAuthenticated(true);
                }}
                className="w-full px-2.5 py-1 rounded-md bg-[#ff6b4a]/15 border border-[#ff6b4a]/30 text-[#ffb347] hover:text-white hover:bg-[#ff6b4a]/25 text-[11px] font-medium transition-all cursor-pointer"
              >
                Quick Login as Admin
              </button>
              <div className="text-[#666] text-[10px] text-center">
                admin / omni-vault-2026
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Admin Tab Switcher */}
            <div className="flex items-center gap-1 px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-gradient-to-r from-[#ff2f3a]/20 to-[#ff6b4a]/15 text-white border border-[#ff6b4a]/40'
                    : 'text-[#848487] hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <FolderUp className="w-3.5 h-3.5" />
                <span>Projects {`&`} Assets</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-[#ff2f3a]/20 to-[#ff6b4a]/15 text-white border border-[#ff6b4a]/40'
                    : 'text-[#848487] hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Studio Settings</span>
              </button>
            </div>

            {activeTab === 'settings' ? (
              /* SETTINGS PANEL */
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-left">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ff6b4a]/15 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ffb347]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-white">Studio Settings</div>
                    <div className="text-[11px] text-[#848487]">Contact details, branding &amp; social links shown across the public site</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#848487] text-[11px]">Studio Name</label>
                    <input
                      value={settingsDraft.studioName}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, studioName: e.target.value })}
                      placeholder="e.g. LumaStudio"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#848487] text-[11px]">Owner Name</label>
                    <input
                      value={settingsDraft.ownerName}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, ownerName: e.target.value })}
                      placeholder="e.g. Hamzah K."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#848487] text-[11px]">Tagline</label>
                  <input
                    value={settingsDraft.tagline}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, tagline: e.target.value })}
                    placeholder="Short brand statement shown in the footer"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#848487] text-[11px]">Contact Email</label>
                  <input
                    type="email"
                    value={settingsDraft.email}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, email: e.target.value })}
                    placeholder="hello@studio.com"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#848487] text-[11px]">GitHub URL</label>
                    <input
                      value={settingsDraft.github}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#848487] text-[11px]">LinkedIn URL</label>
                    <input
                      value={settingsDraft.linkedin}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#848487] text-[11px]">Twitter / X URL</label>
                    <input
                      value={settingsDraft.twitter}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, twitter: e.target.value })}
                      placeholder="https://x.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                    />
                  </div>
                </div>

                {saveToast && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved to Local Storage</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      onSaveSettings(settingsDraft);
                      showToast();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset studio settings back to factory defaults?')) {
                        resetSettings();
                        setSettingsDraft({ ...DEFAULT_SETTINGS });
                        onSaveSettings({ ...DEFAULT_SETTINGS });
                        showToast();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-[#848487] hover:text-white flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>

                  <span className="text-[10px] text-[#848487] flex items-center gap-1 ml-auto">
                    <AlertTriangle className="w-3 h-3 text-[#ffb347]" />
                    Public site updates instantly on save
                  </span>
                </div>
              </div>
            ) : (
              /* PROJECTS PANEL */
              <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">

            {/* Left Sidebar: Projects List */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.08] p-4 bg-[#07080a] space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#848487] uppercase tracking-wider font-semibold text-[10px]">
                  PROJECTS ({editingProjects.length})
                </span>
                <button
                  onClick={openAddModal}
                  className="p-1 rounded-lg bg-white/[0.04] text-[#ffb347] hover:bg-white/[0.08] flex items-center gap-1 cursor-pointer"
                  title="Add new project"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Add</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {editingProjects.length === 0 && (
                  <div className="p-3 text-[11px] text-[#848487] text-center">
                    No projects. Click Add to create one.
                  </div>
                )}
                {editingProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                      selectedProjectId === proj.id
                        ? 'bg-gradient-to-r from-[#ff2f3a]/20 to-[#ff6b4a]/15 text-white border border-[#ff6b4a]/40'
                        : 'text-[#848487] hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 shrink-0 ${proj.isFeatured ? 'text-[#ffb347] fill-[#ffb347]' : 'text-[#555]'}`}
                    />
                    <div className="min-w-0">
                      <span className="truncate block font-semibold">{proj.title}</span>
                      <span className="text-[10px] text-[#666] truncate block">{proj.category}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <button
                  onClick={() => {
                    onSaveProjects(editingProjects.map((p) => ({
                      ...p,
                      screenshots: p.screenshots.map(formatDriveImageUrl),
                    })));
                    showToast();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.1)] transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset ALL projects back to the factory defaults?')) {
                      onResetProjects();
                      setEditingProjects(projects);
                    }
                  }}
                  className="w-full py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-[#848487] hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory</span>
                </button>
              </div>

              {saveToast && (
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved to Local Storage</span>
                </div>
              )}
            </div>

            {/* Right Main Form: Active Project Details */}
            <div className="flex-1 p-6 space-y-6 text-xs overflow-y-auto">
              {currentProject ? (
                <div className="space-y-6 text-left">
                  {/* Basic Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput('Project Title', currentProject.title, (v) =>
                      handleUpdateCurrentProject({ title: v })
                    )}

                    <div className="space-y-1">
                      <label className="text-[#848487] text-[11px]">Category</label>
                      <select
                        value={currentProject.category}
                        onChange={(e) =>
                          handleUpdateCurrentProject({ category: e.target.value as ProjectCategory })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                      >
                        {catOptions.map((c) => (
                          <option key={c} value={c} className="bg-[#0b0d11]">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput('Short Description', currentProject.description, (v) =>
                      handleUpdateCurrentProject({ description: v })
                    )}
                    {renderInput('Download Label', currentProject.downloadLabel, (v) =>
                      handleUpdateCurrentProject({ downloadLabel: v })
                    )}
                  </div>

                  {renderInput('Detailed Description', currentProject.detailedDescription, (v) =>
                    handleUpdateCurrentProject({ detailedDescription: v })
                  , { rows: 3 })}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput(
                      'Download URL (fallback link — only used if no App File above)',
                      currentProject.downloadUrl,
                      (v) => handleUpdateCurrentProject({ downloadUrl: v }),
                      { placeholder: 'https://drive.google.com/... or a direct link' }
                    )}
                    {renderInput('Tech Stack (comma separated)', currentProject.techStack.join(', '), (v) =>
                      handleUpdateCurrentProject({ techStack: fromCommaList(v) })
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput('GitHub URL', currentProject.githubUrl, (v) =>
                      handleUpdateCurrentProject({ githubUrl: v })
                    )}
                    {renderInput('Live Preview URL', currentProject.liveUrl, (v) =>
                      handleUpdateCurrentProject({ liveUrl: v })
                    )}
                  </div>

                  {/* App Icon */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#ff6b4a]" />
                      <span>App Icon</span>
                      <span className="text-[10px] text-[#848487] font-normal">
                        Shown on product cards and the detail page — saves instantly
                      </span>
                    </div>
                    <AppIconUploader
                      value={currentProject.icon ?? ''}
                      onChange={handleIconChange}
                    />
                  </div>

                  {/* App File (Direct Download) */}
                  <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <FolderUp className="w-4 h-4 text-[#ff6b4a]" />
                      <span>App File (Download)</span>
                      <span className="text-[10px] text-[#848487] font-normal">
                        Binds to the Download button on the live site
                      </span>
                    </div>
                    <AttachmentUploader
                      file={getAttachedFile(currentProject.id)?.file ?? null}
                      meta={currentProject.attachment ?? null}
                      onAttach={handleAttachCurrentFile}
                      onRemove={handleRemoveCurrentFile}
                    />
                  </div>

                  {/* Screenshots Manager */}
                  <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#ff6b4a]" />
                      <span>Screenshots ({currentProject.screenshots.length})</span>
                      <span className="text-[10px] text-[#848487] font-normal">
                        Saves instantly to the live showcase
                      </span>
                    </div>
                    <ScreenshotUploader
                      screenshots={currentProject.screenshots}
                      onChange={handleScreenshotsChange}
                    />
                  </div>

                  {/* Visibility + Danger Zone */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      onClick={handleToggleFeatured}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                        currentProject.isFeatured
                          ? 'bg-[#ffb347]/20 text-[#ffb347] border border-[#ffb347]/40'
                          : 'bg-white/[0.03] text-[#848487] border border-white/[0.08] hover:text-white'
                      }`}
                      title="Toggle home page visibility"
                    >
                      <Star className={`w-4 h-4 ${currentProject.isFeatured ? 'fill-[#ffb347]' : ''}`} />
                      <span>{currentProject.isFeatured ? 'Featured (visible)' : 'Not featured'}</span>
                    </button>

                    {/* Delete */}
                    {confirmDeleteId === currentProject.id ? (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#ff2f3a]/15 border border-[#ff2f3a]/40">
                        <span className="text-[11px] text-[#ffb347]">Delete this project?</span>
                        <button
                          onClick={handleConfirmDelete}
                          className="px-3 py-1.5 rounded-lg bg-[#ff2f3a] text-white text-[11px] font-bold cursor-pointer"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.08] text-white text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(currentProject.id)}
                        className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-[#ff2f3a]/15 border border-white/[0.08] hover:border-[#ff2f3a]/40 text-[#848487] hover:text-[#ff2f3a] flex items-center gap-2 text-xs transition-all cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-[#848487]">
                  <button
                    onClick={openAddModal}
                    className="px-4 py-2 rounded-xl bg-white/[0.04] text-[#ffb347] text-xs flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add your first project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
          </div>
        )}

      </div>

      {/* ADD PROJECT MODAL */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/[0.1] shadow-[0_24px_80px_rgba(0,0,0,0.95)] bg-[#07080a] p-6 sm:p-8 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ff6b4a]/15 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ffb347]">
                  <CalendarPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-sans font-bold text-sm text-white">Add New Project</div>
                  <div className="text-[11px] text-[#848487]">
                    It renders a new route and card instantly — no code edits.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-white/[0.08] text-[#848487] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAdd} className="space-y-4 text-xs">
              {renderInput(
                'Project Name *',
                addForm.title,
                (v) => setAddForm((f) => ({ ...f, title: v })),
                { placeholder: 'e.g. Afaq' }
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#848487] text-[11px]">Category</label>
                  <select
                    value={addForm.category}
                    onChange={(e) =>
                      setAddForm((f) => ({ ...f, category: e.target.value as ProjectCategory }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs"
                  >
                    {catOptions.map((c) => (
                      <option key={c} value={c} className="bg-[#0b0d11]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 flex items-end pb-0">
                  <label className="flex items-center gap-2 cursor-pointer w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#c8c8cb]">
                    <input
                      type="checkbox"
                      checked={addForm.isFeatured}
                      onChange={(e) =>
                        setAddForm((f) => ({ ...f, isFeatured: e.target.checked }))
                      }
                      className="accent-[#ff6b4a]"
                    />
                    <span>Feature on home page</span>
                  </label>
                </div>
              </div>

              {renderInput('Short Description', addForm.description, (v) =>
                setAddForm((f) => ({ ...f, description: v }))
              )}

              {renderInput('Detailed Description', addForm.detailedDescription, (v) =>
                setAddForm((f) => ({ ...f, detailedDescription: v }))
              , { rows: 3 })}

              <div className="space-y-1">
                <label className="text-[#848487] text-[11px]">
                  App Icon (optional) — drag &amp; drop a square logo or icon
                </label>
                <AppIconUploader
                  value={addForm.icon ?? ''}
                  onChange={(iconValue) =>
                    setAddForm((f) => ({ ...f, icon: iconValue || undefined }))
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#848487] text-[11px]">
                  Screenshots — drag &amp; drop from your device (first one becomes the main photo)
                </label>
                <ScreenshotUploader
                  screenshots={addForm.screenshots}
                  onChange={(list) => setAddForm((f) => ({ ...f, screenshots: list }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderInput('Download Link', addForm.downloadUrl, (v) =>
                  setAddForm((f) => ({ ...f, downloadUrl: v }))
                , { placeholder: 'https://... or #download' })}
                {renderInput('Tech Stack (comma separated)', addForm.techStack.join(', '), (v) =>
                  setAddForm((f) => ({ ...f, techStack: fromCommaList(v) }))
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[#848487] text-[11px]">
                  App File (optional) — .exe · .apk · .zip · .dmg, binds to the Download button
                </label>
                <AttachmentUploader
                  file={addAttachmentFile}
                  meta={addForm.attachment ?? null}
                  onAttach={handleAddAttachment}
                  onRemove={handleRemoveAddAttachment}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#848487] hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!addForm.title.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};