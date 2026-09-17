import React from 'react';
import { ArrowDown } from 'lucide-react';

interface GhostPillProps {
  onClick?: () => void;
  label?: string;
}

export const GhostPill: React.FC<GhostPillProps> = ({ 
  onClick, 
  label = "Explore Featured Projects & Architecture" 
}) => {
  return (
    <div className="flex justify-center pt-6 pb-6">
      <button
        id="btn-explore-projects-ghost-pill"
        onClick={onClick}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent border border-line-strong hover:border-line-bright text-[13px] font-sans font-medium text-muted hover:text-ink transition-all duration-200 hover:bg-fill cursor-pointer focus:outline-none shadow-sm"
      >
        <span>{label}</span>
        <ArrowDown className="w-3.5 h-3.5 text-amber group-hover:translate-y-0.5 transition-all duration-150" />
      </button>
    </div>
  );
};
