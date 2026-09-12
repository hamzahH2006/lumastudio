import React, { useState } from 'react';
import {
  Maximize2, X, Sparkles
} from 'lucide-react';
import { formatDriveImageUrl } from '../utils/driveUrlParser';

interface ProductPhotoShowcaseProps {
  projectId: string;
  title: string;
  photoUrl?: string;
  icon?: string;
  compact?: boolean;
  className?: string;
}

// Fallback high-fidelity SVG graphics for realistic default screenshots
const DEFAULT_PHOTOS: Record<string, string> = {
  'qpay': `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="100%" height="100%">
      <defs>
        <linearGradient id="qpay-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0d11"/><stop offset="50%" stop-color="#07080a"/><stop offset="100%" stop-color="#0e1117"/>
        </linearGradient>
        <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff6b4a"/><stop offset="50%" stop-color="#ff2f3a"/><stop offset="100%" stop-color="#b81622"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#qpay-bg)"/>
      <rect x="20" y="20" width="860" height="1160" rx="44" fill="#090b0e" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
      <rect x="340" y="44" width="220" height="34" rx="17" fill="#000000"/>
      <text x="60" y="130" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="700">QPay Wallet</text>
      <rect x="60" y="200" width="780" height="380" rx="28" fill="url(#card-grad)"/>
      <circle cx="760" cy="260" r="90" fill="#ffffff" opacity="0.08"/>
      <circle cx="160" cy="520" r="140" fill="#ffffff" opacity="0.05"/>
      <text x="100" y="260" fill="#ffffff" opacity="0.85" font-family="monospace" font-size="16" letter-spacing="3">QPAY PLATINUM DEBIT</text>
      <text x="100" y="340" fill="#ffffff" font-family="system-ui" font-size="48" font-weight="800">$28,450.90</text>
      <text x="100" y="380" fill="#ffffff" opacity="0.85" font-family="monospace" font-size="16">Available Instant Balance</text>
      <text x="100" y="520" fill="#ffffff" font-family="monospace" font-size="20" letter-spacing="4">&#8226;&#8226;&#8226;&#8226;  &#8226;&#8226;&#8226;&#8226;  &#8226;&#8226;&#8226;&#8226;  8824</text>
      <text x="660" y="520" fill="#ffffff" font-family="monospace" font-size="18" font-weight="700">08/29</text>
      <text x="60" y="760" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="700">Verified Ledger Stream</text>
    </svg>
  `)}`,
  'qpay-mobile': `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="100%" height="100%">
      <rect width="900" height="1200" fill="#07080a"/>
      <rect x="20" y="20" width="860" height="1160" rx="44" fill="#090b0e" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    </svg>
  `)}`,
  'omni-explorer': `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 850" width="100%" height="100%">
      <defs>
        <linearGradient id="omni-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#08090c"/><stop offset="100%" stop-color="#0e1117"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="850" rx="20" fill="url(#omni-bg)"/>
      <rect x="2" y="2" width="1396" height="846" rx="18" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
      <rect x="0" y="0" width="1400" height="54" rx="20" fill="#0c0e12"/>
      <circle cx="36" cy="27" r="6.5" fill="#ff5f56"/><circle cx="58" cy="27" r="6.5" fill="#ffbd2e"/><circle cx="80" cy="27" r="6.5" fill="#27c93f"/>
      <text x="120" y="32" fill="#ffffff" font-family="system-ui" font-size="15" font-weight="700">Omni Explorer v2.4.1</text>
      <text x="20" y="670" fill="#ffffff" font-family="system-ui" font-size="30" font-weight="700">High-Speed File Management Engine</text>
      <text x="20" y="706" fill="#ffb347" font-family="system-ui" font-size="16">Direct MFT parsing — sub-50ms searches across millions of files.</text>
      <rect x="20" y="730" width="420" height="60" rx="14" fill="rgba(255,107,74,0.15)" stroke="rgba(255,107,74,0.4)" stroke-width="2"/>
    </svg>
  `)}`
};

export const ProductPhotoShowcase: React.FC<ProductPhotoShowcaseProps> = ({
  projectId,
  title,
  photoUrl,
  icon,
  compact = false,
  className = ''
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = formatDriveImageUrl(photoUrl || '') || DEFAULT_PHOTOS[projectId] || DEFAULT_PHOTOS['qpay'];

  // Display-only compact mode (Homepage Cards)
  if (compact) {
    return (
      <div className={`relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#07080a] shadow-2xl ${className}`}>
        <div className="h-56 sm:h-64 overflow-hidden relative flex items-center justify-center bg-[#07080a]">
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        {/* App Icon */}
        {icon && (
          <div className="absolute bottom-3 right-3">
            <img
              src={icon}
              alt={`${title} icon`}
              className="w-11 h-11 rounded-xl object-cover border border-white/[0.15] shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    );
  }

  // Display-only Showcase Mode
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative rounded-2xl bg-[#07080a] border border-white/[0.1] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.95)]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

        <div className="px-5 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {icon && (
              <img src={icon} alt="" className="w-6 h-6 rounded-lg object-cover" referrerPolicy="no-referrer" />
            )}
            <span className="text-white font-semibold">{title}</span>
          </div>
          <button
            onClick={() => setLightboxOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white transition-colors cursor-pointer"
            title="View full resolution"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          className="relative min-h-[360px] sm:min-h-[480px] w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#090b0e] to-[#07080a] cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={currentImage}
            alt={title}
            className="max-h-[680px] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb347]" />
            <span>Click to expand</span>
          </span>
        </div>
      </div>

      {lightboxOpen && (
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
            src={currentImage}
            alt={`${title} fullscreen`}
            className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};