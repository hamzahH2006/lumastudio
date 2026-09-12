import React, { useState, useRef } from 'react';
import { Terminal, Cpu, Zap, Activity, HardDrive, ShieldCheck, Layers } from 'lucide-react';

interface InteractiveTiltHeroProps {
  onExploreClick: () => void;
}

export const InteractiveTiltHero: React.FC<InteractiveTiltHeroProps> = ({ onExploreClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [activeCycle, setActiveCycle] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle 3D tilt angles (max ~12 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlight(prev => ({ ...prev, active: false }));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 [perspective:1200px]">
      
      {/* Ambient background glow radiating behind card */}
      <div 
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00F0FF]/20 via-cyan-500/10 to-[#00F0FF]/20 blur-2xl opacity-40 transition-opacity duration-500 pointer-events-none"
      />

      {/* 3D Tilt Card Surface */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveCycle((prev) => (prev + 1) % 3)}
        style={{
          transform: `perspective(1200px) rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg) scale3d(${spotlight.active ? 1.015 : 1}, ${spotlight.active ? 1.015 : 1}, 1)`,
          transition: spotlight.active ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative overflow-hidden rounded-3xl bg-[#0d0f12]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer select-none group"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        {spotlight.active && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0, 240, 255, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Card Header: Systems Kernel Monitor */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-slate-500 tracking-wider">
              kernel::win32_subsystem // x86_64
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded-full border border-[#00F0FF]/30">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>0.04ms Index Latency</span>
          </div>
        </div>

        {/* Interactive Systems Code / Architectural Core Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Code Stream Graphic */}
          <div className="md:col-span-7 space-y-4 text-left font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#08090A] border border-white/5 space-y-2 text-slate-300 shadow-inner">
              <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-white/5">
                <span>NTFS_USN_JOURNAL.cs</span>
                <span className="text-[#00F0FF]">LIVE HEAP</span>
              </div>
              
              <p className="text-slate-400">
                <span className="text-[#00F0FF] font-bold">unsafe void</span> IndexVolumeSector(<span className="text-cyan-300">IntPtr</span> hVol) &#123;
              </p>
              <p className="pl-4 text-slate-400">
                <span className="text-slate-500">// Direct low-level MFT cluster query</span><br />
                <span className="text-amber-300">USN_JOURNAL_DATA</span> data = Win32.QueryJournal(hVol);
              </p>
              <p className="pl-4 text-slate-400">
                <span className="text-purple-400">while</span> (stream.ReadNext(&amp;record, <span className="text-emerald-400">0x1000</span>)) &#123;
              </p>
              <p className="pl-8 text-slate-400">
                MemoryTrie.<span className="text-[#00F0FF]">InsertFast</span>(record.FileRef, record.Name);
              </p>
              <p className="pl-4 text-slate-400">&#125;</p>
              <p className="text-slate-400">&#125;</p>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
              <span>Interactive 3D Hardware Canvas</span>
              <span className="text-[#00F0FF] group-hover:underline">Click card to cycle core mode ({activeCycle + 1}/3)</span>
            </div>
          </div>

          {/* Right Column: Live Telemetry Gauges */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3 font-mono text-xs">
            
            <div className="p-3.5 rounded-2xl bg-[#08090A] border border-white/5 space-y-1 text-left group-hover:border-[#00F0FF]/30 transition-colors">
              <div className="text-slate-500 text-[10px] flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-[#00F0FF]" />
                <span>INDEXING</span>
              </div>
              <div className="text-lg font-bold text-white font-display tracking-tight">2.4M+</div>
              <div className="text-[10px] text-emerald-400">Files in memory</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#08090A] border border-white/5 space-y-1 text-left group-hover:border-[#00F0FF]/30 transition-colors">
              <div className="text-slate-500 text-[10px] flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#00F0FF]" />
                <span>CPU SLA</span>
              </div>
              <div className="text-lg font-bold text-[#00F0FF] font-display tracking-tight">&lt; 0.2%</div>
              <div className="text-[10px] text-slate-400">Idle baseline</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#08090A] border border-white/5 space-y-1 text-left group-hover:border-[#00F0FF]/30 transition-colors">
              <div className="text-slate-500 text-[10px] flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#00F0FF]" />
                <span>RENDER</span>
              </div>
              <div className="text-lg font-bold text-white font-display tracking-tight">60 FPS</div>
              <div className="text-[10px] text-emerald-400">Skia GPU engine</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#08090A] border border-white/5 space-y-1 text-left group-hover:border-[#00F0FF]/30 transition-colors">
              <div className="text-slate-500 text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#00F0FF]" />
                <span>CIPHER</span>
              </div>
              <div className="text-lg font-bold text-[#00F0FF] font-display tracking-tight">AES-256</div>
              <div className="text-[10px] text-slate-400">Hardware enclave</div>
            </div>

          </div>

        </div>

        {/* Tech Pills Row inside Hero Card */}
        <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#08090A] border border-white/10 text-white font-mono text-xs font-semibold hover:border-[#00F0FF]/50 transition-colors">
              C# / Win32
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#08090A] border border-white/10 text-white font-mono text-xs font-semibold hover:border-[#00F0FF]/50 transition-colors">
              Flutter
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#08090A] border border-white/10 text-[#00F0FF] font-mono text-xs font-semibold border-[#00F0FF]/30 bg-[#00F0FF]/5 transition-colors">
              Low-Level Architecture
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-500 hidden sm:inline">
            // cursor tracking active
          </div>
        </div>

      </div>

    </div>
  );
};
