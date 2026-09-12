import React from 'react';

interface KeycapDownloadButtonsProps {
  onDownloadOmni: () => void;
  onExploreQPay: () => void;
}

export const KeycapDownloadButtons: React.FC<KeycapDownloadButtonsProps> = ({
  onDownloadOmni,
  onExploreQPay,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      {/* Row of two tactile keycap-raised download & explore buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
        
        {/* Button 1: Download Omni Explorer (Windows glyph) */}
        <button
          id="btn-download-omni"
          onClick={onDownloadOmni}
          className="keycap-button flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-3.5 w-full sm:w-auto cursor-pointer select-none focus:outline-none group"
          title="Download Omni Explorer for Windows (v2.4.1 Setup.exe)"
        >
          {/* Windows Glyph (inline SVG) */}
          <svg
            className="w-4 h-4 fill-[#2f3031] group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
          </svg>
          <span className="font-sans font-semibold text-[14px] text-[#2f3031] tracking-tight">
            Download Omni Explorer
          </span>
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/10 text-[#404142]">
            v2.4
          </span>
        </button>

        {/* Button 2: Explore QPay Mobile (Mobile / Flutter glyph) */}
        <button
          id="btn-explore-qpay"
          onClick={onExploreQPay}
          className="keycap-button flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-3.5 w-full sm:w-auto cursor-pointer select-none focus:outline-none group"
          title="Explore QPay Mobile Fintech & Digital Wallet"
        >
          {/* Mobile phone glyph */}
          <svg
            className="w-4 h-4 fill-[#2f3031] group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
          </svg>
          <span className="font-sans font-semibold text-[14px] text-[#2f3031] tracking-tight">
            Explore QPay Mobile
          </span>
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/10 text-[#404142]">
            Fintech
          </span>
        </button>

      </div>
    </div>
  );
};

