import React, { useState } from 'react';

interface LumaStudioLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  badge?: string;
  logoSrc?: string;
}

export const LumaStudioLogo: React.FC<LumaStudioLogoProps> = ({
  className = 'w-5 h-5',
  size = 22,
  showWordmark = false,
  wordmarkClassName = 'font-sans font-bold text-[15px] tracking-tight text-white',
  badge,
  logoSrc = '/assets/lumastudio-logo.svg',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Dynamic Logo Image Slot / Vector Monogram */}
      <div className="relative flex items-center justify-center shrink-0">
        {!imgError ? (
          <img
            src={logoSrc}
            alt="LumaStudio Logo"
            width={size}
            height={size}
            className={`${className} object-contain drop-shadow-[0_0_8px_rgba(255,87,51,0.55)] transition-transform duration-200 group-hover:scale-105`}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Inline SVG Intertwined LS Monogram Vector */
          <div className={`relative ${className} flex items-center justify-center`}>
            <svg
              className="w-full h-full drop-shadow-[0_0_8px_rgba(255,87,51,0.65)]"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="ls-vector-mask">
                  <rect width="500" height="500" fill="white" />
                  {/* L channel cutout */}
                  <path
                    d="M 106 138 V 338 H 350"
                    fill="none"
                    stroke="black"
                    strokeWidth="16"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                  {/* S channel cutout */}
                  <path
                    d="M 434 162 H 280 A 58 58 0 0 0 280 278 H 360 A 58 58 0 0 1 360 394 H 164 V 418"
                    fill="none"
                    stroke="black"
                    strokeWidth="16"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </mask>
              </defs>
              <g mask="url(#ls-vector-mask)">
                {/* L shape */}
                <path
                  d="M 106 114 V 338 H 350"
                  fill="none"
                  stroke="#FF5733"
                  strokeWidth="50"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                {/* S shape */}
                <path
                  d="M 434 138 H 280 A 58 58 0 0 0 280 254 H 360 A 58 58 0 0 1 360 370 H 140 V 418 H 164"
                  fill="none"
                  stroke="#FF5733"
                  strokeWidth="50"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Wordmark and Optional Badge */}
      {showWordmark && (
        <div className="flex items-center gap-2">
          <span className={`${wordmarkClassName} group-hover:text-white/90 transition-colors`}>
            LumaStudio
          </span>
          {badge && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-sans text-[#ffb347]">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
