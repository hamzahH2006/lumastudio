import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Code, Layers } from 'lucide-react';

export const DeveloperAvatar: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Decorative cybernetic ring */}
      <div className="absolute w-[88%] h-[88%] rounded-full border border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[98%] h-[98%] rounded-full border border-white/5 pointer-events-none" />

      {/* Center Avatar Container */}
      <div className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-b from-[#19222d] to-[#0f1318] border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex items-center justify-center group">
        {/* Background grid inside avatar container */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Ambient code tags watermark inside container */}
        <div className="absolute top-3 left-4 font-mono text-[10px] text-cyan-400/40 tracking-wider">
          &lt;developer_spec id="hamzah" /&gt;
        </div>
        <div className="absolute bottom-3 right-4 font-mono text-[10px] text-cyan-400/30 tracking-wider">
          MEM_LOCK: 0x7FFE00
        </div>

        {/* High-End Vector Graphic / Silhouette */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#090D14" />
            </linearGradient>

            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="cyanGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0891B2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#164E63" stopOpacity="0.9" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shoulders & Tech Hoodie */}
          <path
            d="M 50 320 C 50 250 85 225 125 215 C 135 235 150 245 160 245 C 170 245 185 235 195 215 C 235 225 270 250 270 320 Z"
            fill="url(#hoodieGrad)"
            stroke="rgba(34, 211, 238, 0.25)"
            strokeWidth="1.5"
          />

          {/* Hoodie Collar & Zip details */}
          <path
            d="M 125 215 L 160 275 L 195 215"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
          <line x1="160" y1="275" x2="160" y2="320" stroke="#22D3EE" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

          {/* Neck */}
          <path
            d="M 140 185 L 140 220 C 150 225 170 225 180 220 L 180 185 Z"
            fill="#1E293B"
          />

          {/* Head / Jaw Silhouette */}
          <path
            d="M 115 135 C 115 80 140 65 160 65 C 180 65 205 80 205 135 C 205 175 185 200 160 200 C 135 200 115 175 115 135 Z"
            fill="url(#faceGrad)"
            stroke="rgba(34, 211, 238, 0.4)"
            strokeWidth="1.2"
          />

          {/* Modern Hair Silhouette with geometric angular styling */}
          <path
            d="M 115 120 C 110 75 140 50 160 50 C 185 50 215 70 210 115 C 200 85 185 75 165 75 C 145 75 130 85 115 120 Z"
            fill="#0F172A"
          />

          {/* Cyan Rim Lighting on Head and Shoulders */}
          <path
            d="M 116 110 C 114 135 118 165 130 185"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.85"
          />
          <path
            d="M 204 110 C 206 135 202 165 190 185"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.85"
          />
          <path
            d="M 60 300 C 70 260 100 235 128 220"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 260 300 C 250 260 220 235 192 220"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Developer Glasses (Sleek Cybernetic Frames with Glowing Cyan Lenses) */}
          <g filter="url(#neonGlow)">
            {/* Left Frame */}
            <rect
              x="125"
              y="118"
              width="30"
              height="20"
              rx="4"
              fill="url(#lensGrad)"
              stroke="#22D3EE"
              strokeWidth="2"
            />
            {/* Left Lens reflection slash */}
            <line x1="128" y1="124" x2="148" y2="134" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

            {/* Bridge */}
            <line x1="155" y1="126" x2="165" y2="126" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Frame */}
            <rect
              x="165"
              y="118"
              width="30"
              height="20"
              rx="4"
              fill="url(#lensGrad)"
              stroke="#22D3EE"
              strokeWidth="2"
            />
            {/* Right Lens reflection slash */}
            <line x1="168" y1="124" x2="188" y2="134" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

            {/* Temples / Arms going back */}
            <line x1="125" y1="125" x2="114" y2="124" stroke="#22D3EE" strokeWidth="1.8" />
            <line x1="195" y1="125" x2="206" y2="124" stroke="#22D3EE" strokeWidth="1.8" />
          </g>

          {/* Minimalist Tech Earbuds / Audio Monitor */}
          <circle cx="113" cy="142" r="3.5" fill="#22D3EE" filter="url(#neonGlow)" />
          <circle cx="207" cy="142" r="3.5" fill="#22D3EE" filter="url(#neonGlow)" />
        </svg>

        {/* Scanline line overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-16 w-full animate-[bounce_6s_infinite] pointer-events-none" />
      </div>

      {/* Floating 3D Tech Badges surrounding avatar */}
      {/* Badge 1: Python / System (Top Right) */}
      <motion.div
        animate={{ y: [-5, 5, -5], x: [2, -2, 2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-2 sm:top-2 sm:-right-6 z-20"
      >
        <div className="glass-card px-3 py-1.5 rounded-xl border border-cyan-400/30 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">PYTHON / SYSTEM</div>
            <div className="text-[9px] text-slate-400 font-mono">Kernel Interop</div>
          </div>
        </div>
      </motion.div>

      {/* Badge 2: Win32 / Architecture (Bottom Left) */}
      <motion.div
        animate={{ y: [6, -6, 6], x: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -left-2 sm:bottom-4 sm:-left-8 z-20"
      >
        <div className="glass-card px-3 py-1.5 rounded-xl border border-teal-400/30 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="w-6 h-6 rounded-lg bg-teal-950/80 border border-teal-400/50 flex items-center justify-center text-teal-300">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-teal-300 font-semibold tracking-wider">WIN32 / ARCHITECTURE</div>
            <div className="text-[9px] text-slate-400 font-mono">MFT &amp; Raw I/O</div>
          </div>
        </div>
      </motion.div>

      {/* Badge 3: JS / Engine (Top Left) */}
      <motion.div
        animate={{ y: [-4, 6, -4], x: [2, -2, 2] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-8 -left-3 sm:top-12 sm:-left-10 z-20"
      >
        <div className="glass-card px-3 py-1.5 rounded-xl border border-amber-400/30 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="w-6 h-6 rounded-lg bg-amber-950/80 border border-amber-400/50 flex items-center justify-center text-amber-300">
            <Code className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-amber-300 font-semibold tracking-wider">JS / V8 ENGINE</div>
            <div className="text-[9px] text-slate-400 font-mono">Microtasks &amp; EventLoop</div>
          </div>
        </div>
      </motion.div>

      {/* Badge 4: C# / Native Core (Bottom Right) */}
      <motion.div
        animate={{ y: [5, -5, 5], x: [-1, 3, -1] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -bottom-4 right-0 sm:-bottom-2 sm:-right-4 z-20"
      >
        <div className="glass-card px-3 py-1.5 rounded-xl border border-sky-400/30 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="w-6 h-6 rounded-lg bg-sky-950/80 border border-sky-400/50 flex items-center justify-center text-sky-300">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-sky-300 font-semibold tracking-wider">C# / NATIVE CORE</div>
            <div className="text-[9px] text-slate-400 font-mono">Zero-Alloc Memory</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
