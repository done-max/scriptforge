import React from 'react';
import { Eye, Flame, Compass, Sparkles } from 'lucide-react';

interface CraftCardProps {
  title?: string;
  category?: string;
  observation: string;
  whyItMatters: string;
  suggestion: string;
  severity?: 'low' | 'medium' | 'high';
  onApplySuggestion?: () => void;
  actionLabel?: string;
}

export const CraftCard: React.FC<CraftCardProps> = ({
  title,
  category,
  observation,
  whyItMatters,
  suggestion,
  severity = 'low',
  onApplySuggestion,
  actionLabel,
}) => {
  const getBorderColor = () => {
    if (severity === 'high') return 'border-red-500/30 bg-red-950/10';
    if (severity === 'medium') return 'border-bronze/40 bg-bronze/5';
    return 'border-forge-cyan/25 bg-odyssey-depth/40';
  };

  return (
    <div className={`p-4 rounded-xl border ${getBorderColor()} backdrop-blur-md transition-all duration-300 hover:border-forge-cyan/40 hover:shadow-glow-cyan/10`}>
      {/* Header */}
      {(title || category) && (
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-paper-500/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan" />
            <h4 className="font-cinzel text-xs uppercase tracking-wider font-semibold text-paper-100">{title || category}</h4>
          </div>
          {category && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-forge-ocean/30 text-forge-sky font-mono">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Craft Trio Grid */}
      <div className="space-y-3 text-xs leading-relaxed">
        {/* OBSERVATION */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-forge-sky uppercase">
            <Eye className="w-3 h-3 text-forge-cyan" />
            <span>Observation</span>
          </div>
          <p className="text-paper-200 pl-4 border-l border-forge-cyan/20">{observation}</p>
        </div>

        {/* WHY IT MATTERS */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-bronze-light uppercase">
            <Flame className="w-3 h-3 text-bronze" />
            <span>Why It Matters</span>
          </div>
          <p className="text-paper-300 pl-4 border-l border-bronze/25 italic">{whyItMatters}</p>
        </div>

        {/* SUGGESTION */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
            <Compass className="w-3 h-3 text-emerald-400" />
            <span>Consultant Suggestion</span>
          </div>
          <p className="text-paper-100 pl-4 border-l border-emerald-500/30">{suggestion}</p>
        </div>
      </div>

      {/* Optional Action Button */}
      {onApplySuggestion && (
        <div className="mt-3.5 pt-2.5 border-t border-paper-500/10 flex justify-end">
          <button
            onClick={onApplySuggestion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-forge-navy/80 hover:bg-forge-ocean text-paper-100 border border-forge-cyan/30 hover:border-forge-cyan transition-all shadow-inner-glow"
          >
            <Sparkles className="w-3 h-3 text-bronze-light" />
            <span>{actionLabel || 'Apply to Rewrite Studio'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
