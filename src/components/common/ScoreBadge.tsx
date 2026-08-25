import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showGoldAccent?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  size = 'md',
  label,
  showGoldAccent = false,
}) => {
  const getBadgeStyle = () => {
    if (score >= 85) return 'text-bronze-light border-bronze/40 bg-bronze/10 shadow-glow-gold';
    if (score >= 75) return 'text-forge-sky border-forge-cyan/40 bg-forge-ocean/15 shadow-glow-cyan';
    return 'text-paper-300 border-paper-500/30 bg-odyssey-depth/50';
  };

  const getDimensions = () => {
    if (size === 'sm') return 'w-9 h-9 text-xs';
    if (size === 'lg') return 'w-20 h-20 text-2xl';
    return 'w-13 h-13 text-base';
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative flex items-center justify-center font-cinzel font-bold rounded-full border transition-all duration-300 ${getDimensions()} ${getBadgeStyle()}`}
      >
        <span>{score}</span>
        {showGoldAccent && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-bronze animate-ping" />
        )}
      </div>
      {label && <span className="text-[10px] tracking-wider uppercase text-paper-400 font-medium">{label}</span>}
    </div>
  );
};
