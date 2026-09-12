import React, { useRef, useState } from 'react';
import { Upload, ImagePlus, X, AlertTriangle, Check } from 'lucide-react';

interface AppIconUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

export const AppIconUploader: React.FC<AppIconUploaderProps> = ({
  value: iconUrl,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (PNG, JPG, WEBP, SVG).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Icon must be smaller than 2MB.');
      return;
    }
    const url = await fileToDataUrl(file);
    onChange(url);
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2.5">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
            e.target.value = '';
          }
        }}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        className={`rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#ffb347] bg-[#ff6b4a]/10 ring-4 ring-[#ff6b4a]/20'
            : 'border-white/[0.12] bg-white/[0.02] hover:border-[#ff6b4a]/50 hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          {iconUrl ? (
            <div className="relative shrink-0">
              <img
                src={iconUrl}
                alt="App icon"
                className="w-16 h-16 rounded-2xl object-cover border border-white/[0.1]"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-black/80 border border-white/10 text-white hover:text-[#ff2f3a] transition-colors cursor-pointer"
                title="Remove icon"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#ffb347]">
              <ImagePlus className="w-6 h-6" />
            </div>
          )}

          <div className="text-left space-y-1">
            <div className="text-[#c8c8cb] text-xs font-medium">
              Drag & drop or browse for an app icon
            </div>
            <div className="text-[#848487] text-[11px]">
              PNG, JPG, WEBP or SVG — synced to /public/apps/&lt;slug&gt;/icons on Save
            </div>
            {iconUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white text-[11px] transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3 text-[#ffb347]" />
                Replace
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-2 rounded-xl bg-[#ff2f3a]/15 border border-[#ff2f3a]/40 text-[#ffb347] text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {done && (
        <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>App icon staged — saved to its asset folder on Save.</span>
        </div>
      )}
    </div>
  );
};