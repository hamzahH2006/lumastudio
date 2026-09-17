import React, { useState } from 'react';
import {
  ArrowLeft, Download, ExternalLink, Image as ImageIcon,
  X, Maximize2, ArrowRight, FolderKanban, Sparkles
} from 'lucide-react';
import { Project, SiteSettings } from '../types';
import { formatDriveImageUrl } from '../utils/driveUrlParser';
import { downloadProject } from '../utils/downloadProject';
import { localizeProject } from '../utils/localize';
import { useLocale } from '../i18n/LocaleContext';

interface ProjectDetailPageProps {
  project: Project;
  onGoBack: () => void;
  settings: SiteSettings;
  onNavigateToContact: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onGoBack,
  settings,
  onNavigateToContact,
}) => {
  const { t, lang } = useLocale();
  const localized = localizeProject(project, lang);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [downloadNote, setDownloadNote] = useState<string | null>(null);

  const screenshots = project.screenshots.map(formatDriveImageUrl).filter(Boolean);
  const activeImage = screenshots[activeImageIndex] || null;

  const openLive = () => {
    if (project.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownload = () => {
    setDownloadNote(null);
    if (downloadProject(project)) return;
    if (project.downloadUrl && !project.downloadUrl.startsWith('#')) {
      window.open(project.downloadUrl, '_blank', 'noopener,noreferrer');
    } else if (project.attachment) {
      setDownloadNote(t('detail.attachNote'));
    } else {
      setDownloadNote(`${project.downloadLabel || t('detail.download')} requested.`);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 font-sans text-body selection:bg-crimson/30 selection:text-amber">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* NAVIGATION TOP SUB-BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-coral" />
            <span>{t('detail.back')}</span>
          </button>
        </div>

        {/* HERO HEADER */}
        <div className="space-y-6 text-left max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fill border border-line text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.icon && (
              <img
                src={project.icon}
                alt={`${localized.title} icon`}
                className="w-12 h-12 rounded-2xl object-cover border border-line-strong shadow-lg"
                referrerPolicy="no-referrer"
              />
            )}
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl text-ink tracking-tight">
              {localized.title}{' '}
              <span className="warm-gradient-accent">{project.isFeatured ? t('detail.featured') : t('detail.product')}</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-ink font-semibold leading-relaxed">
            {localized.description}
          </p>

          {localized.detailedDescription && (
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {localized.detailedDescription}
            </p>
          )}

          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-fill border border-line text-[11px] text-body"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {(project.downloadUrl || project.attachment) && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:from-white hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{project.downloadLabel || t('detail.download')}</span>
              </button>
            )}

            {project.liveUrl && project.liveUrl !== '#' && (
              <button
                onClick={openLive}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-amber" />
                <span>{t('detail.livePreview')}</span>
              </button>
            )}
          </div>

          {downloadNote && (
            <div className="max-w-xl px-3 py-2 rounded-xl bg-crimson/10 border border-crimson/30 text-amber text-[11px]">
              {downloadNote}
            </div>
          )}
        </div>

        {/* SCREENSHOTS GALLERY */}
        <section className="space-y-6 text-left">
          <div className="flex items-end justify-between gap-4 pb-2 border-b border-line">
            <div>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-ink">
                <span className="warm-gradient-accent">{t('detail.screenshotsTitle')}</span>
              </h2>
              <p className="text-faint text-xs sm:text-sm mt-1">
                {screenshots.length > 0
                  ? t('detail.screenshotsCount', { count: screenshots.length })
                  : t('detail.noScreenshots')}
              </p>
            </div>
          </div>

          {activeImage ? (
            <div className="space-y-3">
              {/* Main image with lightbox */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="w-full relative rounded-2xl overflow-hidden border border-line bg-surface card-shadow-deep group cursor-zoom-in text-left"
              >
                <img
                  src={activeImage}
                  alt={`${localized.title} screenshot ${activeImageIndex + 1}`}
                  className="w-full max-h-[640px] object-contain bg-card transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber" />
                  <span>{t('detail.expand')}</span>
                </div>
              </button>

              {/* Thumbnails */}
              {screenshots.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {screenshots.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-28 h-20 shrink-0 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        i === activeImageIndex
                          ? 'border-coral ring-2 ring-coral/30'
                          : 'border-line hover:border-line-bright'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${localized.title} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 p-14 rounded-2xl border border-dashed border-line-strong bg-fill text-center">
              <div className="w-12 h-12 rounded-xl bg-fill border border-line flex items-center justify-center text-coral">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-ink font-sans font-semibold text-sm">{t('detail.noScreenshots')}</div>
                <div className="text-faint text-xs">
                  {t('detail.noScreenshotsSub')}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* OVERVIEW / DETAIL PANEL */}
        {(localized.detailedDescription || project.techStack.length > 0) && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-surface/85 backdrop-blur-xl border border-line card-shadow space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <Sparkles className="w-4 h-4 text-coral" />
                <span>{t('detail.overview')}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {localized.detailedDescription || localized.description}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-surface/85 backdrop-blur-xl border border-line card-shadow space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-ink">
                <FolderKanban className="w-4 h-4 text-amber" />
                <span>{t('detail.details')}</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-faint">{t('detail.category')}</span>
                  <span className="text-ink font-medium">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-faint">{t('detail.visibility')}</span>
                  <span className="text-amber font-medium">
                    {project.isFeatured ? t('detail.visibilityFeatured') : t('detail.visibilityListed')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-faint">{t('detail.technologies')}</span>
                  <span className="text-ink font-medium text-right">{project.techStack.join(', ') || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-faint">{t('detail.created')}</span>
                  <span className="text-ink font-medium">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM ACTION CARD */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-surface to-card-deep border border-line text-center space-y-6 relative overflow-hidden card-shadow">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent pointer-events-none" />

          <h3 className="font-sans font-bold text-2xl sm:text-3xl text-ink">
            {t('detail.interestedTitle', { title: localized.title })}
          </h3>
          <p className="text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t('detail.interestedBody')}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:from-white hover:to-keycap-hover text-keycap-ink font-sans font-semibold text-xs tracking-tight shadow-lg cursor-pointer"
            >
              {t('detail.ctaProposal')}
            </button>

            <button
              onClick={onGoBack}
              className="px-5 py-3 rounded-xl bg-fill hover:bg-fill-strong border border-line text-body hover:text-ink font-sans text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-coral" />
              {t('detail.backPortfolio')}
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxOpen && activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt={`${localized.title} fullscreen`}
            className="max-h-[85vh] max-w-full object-contain rounded-2xl card-shadow border border-white/10"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};