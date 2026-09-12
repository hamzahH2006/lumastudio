import React, { useState } from 'react';
import {
  ArrowLeft, Download, ExternalLink, Image as ImageIcon,
  X, Maximize2, ArrowRight, FolderKanban, Sparkles
} from 'lucide-react';
import { Project, SiteSettings } from '../types';
import { formatDriveImageUrl } from '../utils/driveUrlParser';
import { downloadProject } from '../utils/downloadProject';
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
  const { t } = useLocale();
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
    <div className="min-h-screen pt-28 pb-24 font-sans text-[#c8c8cb] selection:bg-[#ff2f3a]/30 selection:text-[#ffb347]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* NAVIGATION TOP SUB-BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white font-sans text-xs transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff6b4a]" />
            <span>{t('detail.back')}</span>
          </button>
        </div>

        {/* HERO HEADER */}
        <div className="space-y-6 text-left max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#9c9c9d]">
            <span className="w-2 h-2 rounded-full bg-[#ff6b4a] animate-pulse" />
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.icon && (
              <img
                src={project.icon}
                alt={`${project.title} icon`}
                className="w-12 h-12 rounded-2xl object-cover border border-white/[0.15] shadow-lg"
                referrerPolicy="no-referrer"
              />
            )}
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight">
              {project.title}{' '}
              <span className="warm-gradient-accent">{project.isFeatured ? t('detail.featured') : t('detail.product')}</span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-white font-semibold leading-relaxed">
            {project.description}
          </p>

          {project.detailedDescription && (
            <p className="text-sm sm:text-base text-[#9c9c9d] leading-relaxed">
              {project.detailedDescription}
            </p>
          )}

          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[11px] text-[#c8c8cb]"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-sans font-semibold text-xs shadow-[0_4px_16px_rgba(255,255,255,0.15)] transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{project.downloadLabel || t('detail.download')}</span>
              </button>
            )}

            {project.liveUrl && project.liveUrl !== '#' && (
              <button
                onClick={openLive}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white font-sans text-xs transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#ffb347]" />
                <span>{t('detail.livePreview')}</span>
              </button>
            )}
          </div>

          {downloadNote && (
            <div className="max-w-xl px-3 py-2 rounded-xl bg-[#ff2f3a]/10 border border-[#ff2f3a]/30 text-[#ffb347] text-[11px]">
              {downloadNote}
            </div>
          )}
        </div>

        {/* SCREENSHOTS GALLERY */}
        <section className="space-y-6 text-left">
          <div className="flex items-end justify-between gap-4 pb-2 border-b border-white/[0.06]">
            <div>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white">
                <span className="warm-gradient-accent">{t('detail.screenshotsTitle')}</span>
              </h2>
              <p className="text-[#848487] text-xs sm:text-sm mt-1">
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
                className="w-full relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#07080a] shadow-[0_24px_80px_rgba(0,0,0,0.6)] group cursor-zoom-in text-left"
              >
                <img
                  src={activeImage}
                  alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                  className="w-full max-h-[640px] object-contain bg-[#0a0c10] transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#ffb347]" />
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
                          ? 'border-[#ff6b4a] ring-2 ring-[#ff6b4a]/30'
                          : 'border-white/[0.08] hover:border-white/[0.25]'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${project.title} thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 p-14 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ff6b4a]">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-white font-sans font-semibold text-sm">{t('detail.noScreenshots')}</div>
                <div className="text-[#848487] text-xs">
                  {t('detail.noScreenshotsSub')}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* OVERVIEW / DETAIL PANEL */}
        {(project.detailedDescription || project.techStack.length > 0) && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#07080a]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ff6b4a]" />
                <span>{t('detail.overview')}</span>
              </div>
              <p className="text-sm text-[#9c9c9d] leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#07080a]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FolderKanban className="w-4 h-4 text-[#ffb347]" />
                <span>{t('detail.details')}</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#848487]">{t('detail.category')}</span>
                  <span className="text-white font-medium">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#848487]">{t('detail.visibility')}</span>
                  <span className="text-[#ffb347] font-medium">
                    {project.isFeatured ? t('detail.visibilityFeatured') : t('detail.visibilityListed')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#848487]">{t('detail.technologies')}</span>
                  <span className="text-white font-medium text-right">{project.techStack.join(', ') || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#848487]">{t('detail.created')}</span>
                  <span className="text-white font-medium">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BOTTOM ACTION CARD */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#07080a] to-[#0d0f14] border border-white/[0.08] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff6b4a]/40 to-transparent pointer-events-none" />

          <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white">
            {t('detail.interestedTitle', { title: project.title })}
          </h3>
          <p className="text-[#9c9c9d] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t('detail.interestedBody')}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-sans font-semibold text-xs tracking-tight shadow-lg cursor-pointer"
            >
              {t('detail.ctaProposal')}
            </button>

            <button
              onClick={onGoBack}
              className="px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white font-sans text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 text-[#ff6b4a]" />
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
            alt={`${project.title} fullscreen`}
            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};