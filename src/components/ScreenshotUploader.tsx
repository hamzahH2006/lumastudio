import React, { useRef, useState } from 'react';
import { Upload, ImageIcon, X, Link as LinkIcon, Plus, AlertTriangle, Check } from 'lucide-react';
import { formatDriveImageUrl } from '../utils/driveUrlParser';

interface ScreenshotUploaderProps {
  screenshots: string[];
  onChange: (screenshots: string[]) => void;
  className?: string;
}

const MAX_DIM = 1400;
const MAX_FILE_MB = 8;

const fileToCompressedDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error(`${file.name} is not a readable image.`));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas is not supported in this browser.'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        try {
          let url = canvas.toDataURL('image/webp', 0.85);
          if (!url.startsWith('data:image/')) {
            url = canvas.toDataURL('image/jpeg', 0.85);
          }
          resolve(url);
        } catch {
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const ScreenshotUploader: React.FC<ScreenshotUploaderProps> = ({
  screenshots,
  onChange,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [urlAdded, setUrlAdded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: Iterable<File>) => {
    const list = Array.from(files);
    if (list.length === 0) return;

    setError(null);
    let pending = screenshots;
    let added = 0;

    for (const file of list) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`${file.name} is larger than ${MAX_FILE_MB}MB.`);
        continue;
      }
      try {
        const url = await fileToCompressedDataUrl(file);
        pending = [...pending, url];
        added += 1;
      } catch (err) {
        setError((err as Error).message);
      }
    }

    if (added > 0) {
      onChange(pending);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlValue.trim();
    if (!trimmed) return;
    onChange([...screenshots, formatDriveImageUrl(trimmed)]);
    setUrlValue('');
    setUrlInputOpen(false);
    setUrlAdded(true);
    setTimeout(() => setUrlAdded(false), 1800);
  };

  const removeAt = (index: number) => {
    onChange(screenshots.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = '';
          }
        }}
      />

      {/* Drag & Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#ffb347] bg-[#ff6b4a]/10 ring-4 ring-[#ff6b4a]/20'
            : 'border-white/[0.12] bg-white/[0.02] hover:border-[#ff6b4a]/50 hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#ffb347] ${
            isDragging ? 'bg-[#ff6b4a]/20 animate-bounce' : 'bg-white/[0.04] border border-white/[0.08]'
          }`}>
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-[#c8c8cb] text-xs font-medium">
            {isDragging ? 'Drop the images here' : 'Drag & drop images here'}
          </div>
          <div className="text-[#848487] text-[11px]">
            or <span className="text-[#ffb347] underline underline-offset-2">browse from device</span> — stored locally, no cloud
          </div>
          <div className="text-[10px] text-[#666]">
            PNG · JPG · WEBP · GIF — auto-compressed to fit in browser storage
          </div>
        </div>
      </div>

      {/* Error / success feedback */}
      {error && (
        <div className="p-2.5 rounded-xl bg-[#ff2f3a]/15 border border-[#ff2f3a]/40 text-[#ffb347] text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {urlAdded && (
        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Image URL added.</span>
        </div>
      )}

      {/* Paste URL toggle */}
      {urlInputOpen ? (
        <form onSubmit={handleUrlSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <LinkIcon className="w-3.5 h-3.5 text-[#ff6b4a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              placeholder="Paste an image URL or Google Drive share link"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs placeholder-[#666] focus:outline-none focus:border-[#ff6b4a]"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-[#ff6b4a] hover:bg-[#ffb347] text-[#07080a] font-bold text-xs cursor-pointer"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setUrlInputOpen(false)}
            className="px-2.5 py-2 rounded-xl bg-white/[0.04] text-[#848487] hover:text-white"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setUrlInputOpen(true)}
          className="inline-flex items-center gap-1.5 text-[11px] text-[#848487] hover:text-[#ffb347] transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          Add an image by URL (Google Drive supported)
        </button>
      )}

      {/* Preview grid */}
      {screenshots.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-[#848487] font-semibold">
            {screenshots.length} attached image{screenshots.length > 1 ? 's' : ''}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {screenshots.map((url, i) => (
              <div
                key={`${i}-${url.slice(0, 24)}`}
                className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-[#0b0d11] group"
              >
                <img
                  src={url}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {i === 0 && (
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-[#ff6b4a]/90 text-[#07080a] text-[9px] font-bold">
                    MAIN
                  </span>
                )}
                <button
                  onClick={() => removeAt(i)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/80 border border-white/10 text-[#848487] hover:text-[#ff2f3a] transition-colors cursor-pointer"
                  title={`Remove screenshot ${i + 1}`}
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end px-1.5 pb-1">
                  <span className="text-[9px] text-white/80 line-clamp-1">
                    {url.startsWith('data:') ? 'Local upload' : url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {screenshots.length === 0 && (
        <div className="flex items-center gap-2 text-[11px] text-[#666]">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>No screenshots attached yet — the first one becomes the main product photo.</span>
        </div>
      )}
    </div>
  );
};