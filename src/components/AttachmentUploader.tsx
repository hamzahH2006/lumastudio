import React, { useRef, useState } from 'react';
import {
  Package, FolderUp, FileText, X, RefreshCw, ShieldCheck, AlertTriangle, Check
} from 'lucide-react';
import { ProjectAttachment } from '../types';
import { formatFileSize } from '../utils/attachmentStore';

interface AttachmentUploaderProps {
  file?: File | null;
  meta?: ProjectAttachment | null;
  onAttach: (file: File) => void;
  onRemove: () => void;
  className?: string;
}

const ALLOWED_EXTENSIONS = ['.exe', '.apk', '.zip', '.dmg'];

const extensionOf = (name: string): string => {
  const idx = name.lastIndexOf('.');
  return idx >= 0 ? name.slice(idx).toLowerCase() : '';
};

export const AttachmentUploader: React.FC<AttachmentUploaderProps> = ({
  file,
  meta,
  onAttach,
  onRemove,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const attachedName = file?.name || meta?.name || '';
  const attachedSize = file?.size ?? (meta ? meta.size : 0);
  const hasAttachment = Boolean(attachedName);

  const handleFiles = (files: Iterable<File>) => {
    setError(null);
    const list = Array.from(files);
    for (const f of list) {
      const ext = extensionOf(f.name);
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setError(`"${f.name}" is not supported. Use .exe, .apk, .zip, or .dmg.`);
        continue;
      }
      onAttach(f);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
      return;
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

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        type="file"
        ref={inputRef}
        accept=".exe,.apk,.zip,.dmg,application/octet-stream,application/zip"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = '';
          }
        }}
      />

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
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
            <Package className="w-5 h-5" />
          </div>
          <div className="text-[#c8c8cb] text-xs font-medium">
            {isDragging ? 'Drop the app file here' : `Drag & drop your app file here`}
          </div>
          <div className="text-[#848487] text-[11px]">
            or <span className="text-[#ffb347] underline underline-offset-2">browse from device</span> — .exe · .apk · .zip · .dmg
          </div>
          <div className="text-[10px] text-[#666]">
            Synced to /public/apps/&lt;slug&gt;/binaries on Save — survives reloads &amp; deploys
          </div>
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <div className="p-2.5 rounded-xl bg-[#ff2f3a]/15 border border-[#ff2f3a]/40 text-[#ffb347] text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {done && (
        <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>App file attached — live on the Download button.</span>
        </div>
      )}

      {/* Attached file card */}
      {hasAttachment && (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0b0d11] border border-[#ff6b4a]/25">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-b from-[#ff6b4a]/25 to-[#ff2f3a]/10 border border-[#ff6b4a]/30 flex items-center justify-center text-[#ffb347]">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-xs font-semibold truncate" title={attachedName}>
              {attachedName}
            </div>
            <div className="text-[11px] text-[#848487] flex items-center gap-1.5">
              <span>{attachedSize > 0 ? formatFileSize(attachedSize) : 'Unknown size'}</span>
              <span className="w-1 h-1 rounded-full bg-[#666]" />
              <span>{file ? 'attached this session — press Save & Sync Assets to persist' : 'metadata only — re-attach the file to sync it'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-[#c8c8cb] hover:text-white text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Replace file"
            >
              <RefreshCw className="w-3 h-3" />
              Replace
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#ff2f3a]/10 hover:bg-[#ff2f3a]/20 border border-[#ff2f3a]/30 text-[#ffb347] text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              title="Remove attached file"
            >
              <X className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {!hasAttachment && (
        <div className="flex items-center gap-2 text-[11px] text-[#666]">
          <FolderUp className="w-3.5 h-3.5" />
          <span>No app file attached — the Download button will fall back to the URL above.</span>
        </div>
      )}
    </div>
  );
};