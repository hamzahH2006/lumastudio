import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  attemptedPath: string;
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen pt-28 pb-24 font-sans text-body selection:bg-crimson/30 selection:text-amber">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-surface/90 backdrop-blur-xl border border-line p-8 sm:p-14 text-center space-y-6 card-shadow">
          <div className="text-6xl sm:text-8xl font-extrabold tracking-tight">
            <span className="text-ink">4</span>
            <span className="warm-gradient-accent">0</span>
            <span className="text-ink">4</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink">Page not found</h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>

          <button
            onClick={onGoHome}
            className="px-6 py-3 rounded-xl bg-gradient-to-b from-keycap to-keycap-dim hover:from-white hover:to-keycap-hover text-keycap-ink font-semibold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.12)] transition-all cursor-pointer mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};