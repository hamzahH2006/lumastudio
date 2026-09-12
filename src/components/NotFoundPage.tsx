import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  attemptedPath: string;
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen pt-28 pb-24 font-sans text-[#c8c8cb] selection:bg-[#ff2f3a]/30 selection:text-[#ffb347]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#07080a]/90 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-14 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="text-6xl sm:text-8xl font-extrabold tracking-tight">
            <span className="text-white">4</span>
            <span className="warm-gradient-accent">0</span>
            <span className="text-white">4</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Page not found</h1>
            <p className="text-[#9c9c9d] text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <button
            onClick={onGoHome}
            className="px-6 py-3 rounded-xl bg-gradient-to-b from-[#e6e6e6] to-[#cfcfcf] hover:from-white hover:to-[#e0e0e0] text-[#1c1c1e] font-semibold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.12)] transition-all cursor-pointer mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};