import React from 'react';

export const LivingAuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#07080a]">
      {/* 1. Deep ambient dark base layer */}
      <div className="absolute inset-0 bg-[#07080a]" />

      {/* 2. Living Warm Aurora Blades (Diagonal Light-Blades) */}
      {/* Blended with 'screen', pure CSS keyframes on staggered 15-22s loops */}
      <div className="absolute inset-0 overflow-hidden mix-blend-screen opacity-90">
        
        {/* Blade 1: Primary upper-diagonal crimson-to-amber blade */}
        <div
          className="aurora-blade-1 absolute top-[-18%] left-[12%] w-[850px] h-[340px] rounded-full blur-[85px]"
          style={{
            background: 'linear-gradient(115deg, transparent 0%, rgba(255, 47, 58, 0.75) 30%, rgba(255, 107, 74, 0.8) 55%, rgba(255, 179, 71, 0.7) 75%, transparent 100%)',
          }}
        />

        {/* Blade 2: Secondary center-right diagonal blade */}
        <div
          className="aurora-blade-2 absolute top-[15%] right-[2%] w-[780px] h-[280px] rounded-full blur-[90px]"
          style={{
            background: 'linear-gradient(125deg, transparent 0%, rgba(255, 47, 58, 0.7) 25%, rgba(255, 107, 74, 0.75) 50%, rgba(255, 179, 71, 0.6) 80%, transparent 100%)',
          }}
        />

        {/* Blade 3: Core intense warm crimson glow center */}
        <div
          className="aurora-core absolute top-[8%] left-[26%] w-[680px] h-[360px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 47, 58, 0.65) 0%, rgba(255, 107, 74, 0.45) 45%, rgba(255, 179, 71, 0.25) 70%, transparent 85%)',
          }}
        />

        {/* Blade 4: Lower-sweeping diagonal accent blade */}
        <div
          className="aurora-blade-3 absolute top-[38%] left-[8%] w-[920px] h-[260px] rounded-full blur-[95px]"
          style={{
            background: 'linear-gradient(108deg, transparent 0%, rgba(255, 47, 58, 0.6) 35%, rgba(255, 107, 74, 0.65) 60%, rgba(255, 179, 71, 0.5) 85%, transparent 100%)',
          }}
        />

        {/* Blade 5: Deep ambient under-streak */}
        <div
          className="aurora-blade-4 absolute top-[28%] right-[18%] w-[650px] h-[220px] rounded-full blur-[80px]"
          style={{
            background: 'linear-gradient(130deg, transparent 0%, rgba(255, 47, 58, 0.5) 30%, rgba(255, 107, 74, 0.6) 55%, rgba(255, 179, 71, 0.4) 80%, transparent 100%)',
          }}
        />

      </div>

      {/* 3. Subtle SVG feTurbulence Film-Grain Overlay */}
      {/* Ensures it reads as crafted organic light rather than a flat CSS gradient */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="basalt-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#basalt-film-grain)" />
      </svg>

      {/* 4. Radial Vignette Overlay: Fades seamless into the #07080a ground */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 35%, transparent 20%, rgba(7, 8, 10, 0.4) 55%, rgba(7, 8, 10, 0.92) 85%, #07080a 100%)',
        }}
      />

      {/* 5. Edge vignette for ultra-clean contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07080a] opacity-90 pointer-events-none" />
    </div>
  );
};
