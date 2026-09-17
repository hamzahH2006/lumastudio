import React, { useState } from 'react';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { normalizeProject } from '../utils/normalizeProject';
import { slugify } from '../utils/slugify';
import { useLocale } from '../i18n/LocaleContext';

interface ProjectEditorProps {
  project?: Project;
  onSave: (next: Project) => void;
  onCancel: () => void;
}

const CATEGORIES: ProjectCategory[] = ['Mobile', 'Desktop', 'Web'];

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel }) => {
  const { t } = useLocale();
  const editing = Boolean(project);

  const [slug, setSlug] = useState(project?.slug ?? '');
  const [titleEn, setTitleEn] = useState(project?.titleEn ?? project?.title ?? '');
  const [titleAr, setTitleAr] = useState(project?.titleAr ?? '');
  const [category, setCategory] = useState<ProjectCategory>(project?.category ?? 'Desktop');
  const [descEn, setDescEn] = useState(project?.descriptionEn ?? project?.description ?? '');
  const [descAr, setDescAr] = useState(project?.descriptionAr ?? '');
  const [detailEn, setDetailEn] = useState(
    project?.detailedDescriptionEn ?? project?.detailedDescription ?? ''
  );
  const [detailAr, setDetailAr] = useState(project?.detailedDescriptionAr ?? '');
  const [screenshots, setScreenshots] = useState(project?.screenshots.join('\n') ?? '');
  const [icon, setIcon] = useState(project?.icon ?? '');
  const [stack, setStack] = useState(project?.techStack.join(', ') ?? '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl === '#' ? '' : (project?.liveUrl ?? ''));
  const [downloadUrl, setDownloadUrl] = useState(
    project?.downloadUrl && !project?.downloadUrl.startsWith('#') ? project?.downloadUrl : ''
  );
  const [downloadLabel, setDownloadLabel] = useState(
    project?.downloadLabel === 'Download' ? '' : (project?.downloadLabel ?? '')
  );
  const [isFeatured, setIsFeatured] = useState(Boolean(project?.isFeatured));

  const inputClass =
    'w-full px-3.5 py-2 rounded-xl bg-fill border border-line hover:border-line-strong text-ink placeholder-field font-sans text-sm focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition-all';
  const labelClass =
    'block text-[11px] font-semibold text-faint mb-1.5 tracking-wide';

  const save = () => {
    const baseTitle = titleEn.trim() || project?.title || 'Untitled Project';
    const raw: Record<string, unknown> = {
      id: project?.id,
      slug: slug.trim() || undefined,
      title: baseTitle,
      titleEn: titleEn.trim() || undefined,
      titleAr: titleAr.trim() || undefined,
      category,
      description: descEn.trim() || project?.description || '',
      descriptionEn: descEn.trim() || undefined,
      descriptionAr: descAr.trim() || undefined,
      detailedDescription: detailEn.trim() || project?.detailedDescription || '',
      detailedDescriptionEn: detailEn.trim() || undefined,
      detailedDescriptionAr: detailAr.trim() || undefined,
      screenshots: screenshots.split('\n').map((s) => s.trim()).filter(Boolean),
      icon: icon.trim() || undefined,
      downloadUrl: downloadUrl.trim() || '#',
      downloadLabel: downloadLabel.trim() || 'Download',
      isFeatured,
      techStack: stack.split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl: liveUrl.trim() || '#',
      createdAt: project?.createdAt,
      updatedAt: Date.now(),
    };
    const normalized = normalizeProject(raw);
    const finalSlug = normalized.slug || slugify(baseTitle);
    onSave({ ...normalized, slug: finalSlug });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-coral" />
            <span>{t('admin.cancel')}</span>
          </button>
          <h2 className="font-sans font-bold text-xl text-ink">
            {editing ? t('admin.editProject') : t('admin.newProject')}
          </h2>
        </div>
        <button
          onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs tracking-tight transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{t('admin.save')}</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-surface/90 backdrop-blur-xl border border-line card-shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldTitleEn')} *</label>
            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder={t('admin.fieldTitlePh')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('admin.fieldTitleAr')}</label>
            <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="الاسم بالعربية" dir="rtl" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldCategory')}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as ProjectCategory)} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('admin.fieldSlug')}</label>
            <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="my-app" className={inputClass} />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-coral cursor-pointer"
              />
              <span className="text-xs font-medium text-body">{t('admin.fieldFeatured')}</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldDescEn')} *</label>
            <textarea rows={2} value={descEn} onChange={(e) => setDescEn(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('admin.fieldDescAr')}</label>
            <textarea rows={2} value={descAr} onChange={(e) => setDescAr(e.target.value)} dir="rtl" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldDetailEn')}</label>
            <textarea rows={4} value={detailEn} onChange={(e) => setDetailEn(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('admin.fieldDetailAr')}</label>
            <textarea rows={4} value={detailAr} onChange={(e) => setDetailAr(e.target.value)} dir="rtl" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldScreenshots')}</label>
            <textarea rows={4} value={screenshots} onChange={(e) => setScreenshots(e.target.value)} placeholder="/apps/my-app/screenshots/shot-1.png" className={`${inputClass} font-mono`} />
            <p className="mt-1.5 text-[10px] text-faint">{t('admin.helperStatic')}</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>{t('admin.fieldIcon')}</label>
              <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="/apps/my-app/logo.png" className={`${inputClass} font-mono`} />
            </div>
            <div>
              <label className={labelClass}>{t('admin.fieldStack')}</label>
              <input value={stack} onChange={(e) => setStack(e.target.value)} placeholder="React, C#" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{t('admin.fieldLiveUrl')}</label>
            <input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://example.com"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div>
            <label className={labelClass}>{t('admin.fieldDownloadLabel')}</label>
            <input value={downloadLabel} onChange={(e) => setDownloadLabel(e.target.value)} placeholder="Setup.zip" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t('admin.fieldDownloadUrl')}</label>
          <input
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="/apps/my-app/Setup.zip"
            className={`${inputClass} font-mono`}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-fill border border-line text-faint text-[11px]">
        <Sparkles className="w-3.5 h-3.5 text-amber shrink-0" />
        <span>{t('admin.helperStatic')}</span>
      </div>
    </div>
  );
};