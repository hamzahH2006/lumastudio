import React from 'react';
import { X, Download, Printer, ExternalLink, Terminal, HardDrive, ShieldCheck, Mail, Github, Linkedin, Check, Sparkles, FileText } from 'lucide-react';
import { BIO_SUMMARY } from '../data/initialData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/[0.1] shadow-[0_24px_80px_rgba(0,0,0,0.9)] bg-[#07080a] overflow-hidden text-[#c8c8cb]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#ffb347]">
            <FileText className="w-4 h-4 text-[#ff6b4a]" />
            <span>CURRICULUM VITAE // HAMZAH_ENGINEERING.PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#c8c8cb] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#ff6b4a]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-[#848487] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans">
          
          {/* Header Title */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Hamzah</h1>
              <p className="text-[#ffb347] font-mono text-sm font-semibold mt-1">
                Senior Systems Engineer &amp; Full-Stack Architect
              </p>
              <p className="text-[#848487] text-xs font-mono mt-1">
                Low-level Windows &amp; Linux internals • High-throughput TypeScript &amp; React
              </p>
            </div>

            <div className="font-mono text-xs text-[#9c9c9d] space-y-1 text-left sm:text-right">
              <div className="text-white">{BIO_SUMMARY.email}</div>
              <div>{BIO_SUMMARY.location}</div>
              <div className="text-emerald-400 font-medium">Status: Ready for High-Impact Engagements</div>
            </div>
          </div>

          {/* Core Projects Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffb347] flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#ff6b4a]" />
              <span>Flagship Engineering Highlights</span>
            </h2>

            {/* Omni Explorer */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-white font-sans text-base">
                  Omni Explorer <span className="text-[#ff6b4a] font-normal text-xs font-mono">[Windows Desktop Systems Tool]</span>
                </div>
                <div className="font-mono text-[11px] text-[#ffb347]">C# Native Core • Flutter UI • Win32 MFT</div>
              </div>
              <p className="text-xs text-[#9c9c9d] leading-relaxed">
                Created a high-performance Windows desktop file manager built to eliminate Explorer I/O latency. Parsed NTFS Master File Table (MFT) raw sectors directly, achieving sub-50ms search times across 2,000,000+ files. Developed Instant Super Peek (spacebar code and binary preview without spawning heavy processes), safe cache heuristics cleaner, and system tray residency.
              </p>
            </div>

            {/* QPay */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-white font-sans text-base">
                  QPay <span className="text-[#ff6b4a] font-normal text-xs font-mono">[Mobile Fintech Application]</span>
                </div>
                <div className="font-mono text-[11px] text-[#ffb347]">Flutter • Dart • AES-256 GCM • WebSockets</div>
              </div>
              <p className="text-xs text-[#9c9c9d] leading-relaxed">
                Architected an end-to-end encrypted mobile wallet and peer-to-peer payment application. Implemented modern neo-brutalist tactile UI layouts with 60fps rendering, biometric secure enclave authentication, real-time JSON transaction ledger inspection, and dynamic virtual card CVV cycling.
              </p>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffb347] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#ff6b4a]" />
              <span>Technical Skills &amp; Domain Expertise</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a]" />
                  <span>Systems &amp; Native Core</span>
                </div>
                <p className="text-[#848487] text-[11px] leading-relaxed">
                  C#, Win32 API, NTFS MFT / USN Journal, Memory-Mapped Files, Direct I/O, Python System Tools, Linux Kernel / POSIX.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb347]" />
                  <span>Full-Stack &amp; Web Platforms</span>
                </div>
                <p className="text-[#848487] text-[11px] leading-relaxed">
                  TypeScript, React 19, Node.js, Express, Tailwind CSS, REST APIs, WebSockets, Performance Profiling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a]" />
                  <span>Cross-Platform UI &amp; Mobile</span>
                </div>
                <p className="text-[#848487] text-[11px] leading-relaxed">
                  Flutter, Dart, Neo-Brutalist Layouts, Dark Glassmorphism, Micro-interactions, State Management.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb347]" />
                  <span>Security &amp; DevOps</span>
                </div>
                <p className="text-[#848487] text-[11px] leading-relaxed">
                  AES-256 GCM, Git/GitHub CI/CD, Binary Delta Updates, SHA-256 Checksums, Enclave Signatures.
                </p>
              </div>
            </div>
          </div>

          {/* Work Principles */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-[#ff6b4a]/30 text-xs font-mono text-[#c8c8cb] space-y-1.5">
            <div className="font-bold text-[#ffb347] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ff6b4a]" />
              <span>Engineering Guarantee: Deterministic Code &amp; Clean Architecture</span>
            </div>
            <p className="text-[#848487] text-[11px] leading-relaxed">
              Every system is delivered with complete diagnostic instrumentation, strict type definitions, and rigorous benchmarks against latency thresholds.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-[#848487]">
          <span>Available worldwide for contracting &amp; systems roles</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-sans font-bold cursor-pointer transition-colors shadow"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
