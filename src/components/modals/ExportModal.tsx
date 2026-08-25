import React from 'react';
import { useScript } from '../../context/ScriptContext';
import { exportScriptCoveragePdf, downloadScreenplayText } from '../../utils/coveragePdf';
import { X, FileDown, CheckCircle2, AlertCircle, Sparkles, Scroll } from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const ExportModal: React.FC = () => {
  const { isExportModalOpen, setIsExportModalOpen, activeScript } = useScript();

  if (!isExportModalOpen) return null;

  const coverage = activeScript.coverage;
  const isRecommend = coverage.recommendation === 'RECOMMEND';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-odyssey-void/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-odyssey-depth/95 border border-forge-cyan/30 rounded-2xl shadow-glass-card flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-forge-cyan/20 flex items-center justify-between bg-odyssey-abyss/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forge-navy border border-forge-cyan/40 flex items-center justify-center">
              <Scroll className="w-4 h-4 text-bronze-light" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base text-paper-50 tracking-wider">
                Executive Script Coverage & Export
              </h3>
              <p className="text-xs text-paper-400">
                Industry-standard script coverage analysis and multi-format exports for {activeScript.title}.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1.5 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coverage Content Viewer */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Executive Header Banner */}
          <div className="p-5 rounded-2xl bg-odyssey-abyss/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-forge-sky tracking-widest font-semibold">
                CONFIDENTIAL STORY INTELLIGENCE
              </div>
              <h2 className="font-cinzel text-xl font-bold text-paper-50">{activeScript.title}</h2>
              <div className="text-xs text-paper-400">
                Writer: <span className="text-paper-200 font-medium">{activeScript.author}</span> • Genre: <span className="text-paper-200">{activeScript.genre}</span> • Pages: <span className="text-paper-200">{activeScript.pageCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 rounded-xl font-cinzel font-bold text-xs tracking-wider border shadow-inner-glow flex items-center gap-2 ${
                  isRecommend
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>RATING: {coverage.recommendation}</span>
              </div>
              <ScoreBadge score={activeScript.storyIntelligenceScore} size="md" label="Story Index" showGoldAccent />
            </div>
          </div>

          {/* 6 Category Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { label: 'Structure', val: activeScript.categoryScores.structure },
              { label: 'Character', val: activeScript.categoryScores.character },
              { label: 'Dialogue', val: activeScript.categoryScores.dialogue },
              { label: 'Pacing', val: activeScript.categoryScores.pacing },
              { label: 'Theme', val: activeScript.categoryScores.theme },
              { label: 'Visuals', val: activeScript.categoryScores.visualStorytelling },
            ].map((cat) => (
              <div key={cat.label} className="p-2.5 rounded-xl bg-odyssey-trench/80 border border-forge-cyan/15 text-center">
                <div className="text-[10px] text-paper-400 uppercase font-mono">{cat.label}</div>
                <div className="font-cinzel text-sm font-bold text-bronze-light mt-0.5">{cat.val}/100</div>
              </div>
            ))}
          </div>

          {/* Logline & Synopsis */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-odyssey-abyss/60 border border-forge-cyan/20 space-y-1.5">
              <div className="text-[10px] uppercase font-mono tracking-wider text-forge-sky font-semibold">Logline</div>
              <p className="text-xs text-paper-100 italic leading-relaxed">"{coverage.logline || activeScript.logline}"</p>
            </div>

            <div className="p-4 rounded-xl bg-odyssey-abyss/60 border border-forge-cyan/20 space-y-1.5">
              <div className="text-[10px] uppercase font-mono tracking-wider text-forge-sky font-semibold">Synopsis</div>
              <p className="text-xs text-paper-200 leading-relaxed">{coverage.synopsis}</p>
            </div>
          </div>

          {/* Strengths & Development Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-cinzel">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Craft Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-paper-200">
                {coverage.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider font-cinzel">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Development Notes</span>
              </div>
              <ul className="space-y-1.5 text-xs text-paper-200">
                {coverage.areasForDevelopment.map((a, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-odyssey-abyss/60 border border-bronze/30 space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-bronze-light font-semibold">
              Executive Consultant Verdict
            </div>
            <p className="text-xs text-paper-100 leading-relaxed">{coverage.executiveSummary}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-forge-cyan/20 bg-odyssey-abyss/90 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-paper-400">
            Export ready in PDF, Fountain, and text formats.
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => downloadScreenplayText(activeScript, 'txt')}
              className="px-3 py-2 rounded-xl bg-odyssey-depth hover:bg-odyssey-trench text-paper-300 text-xs font-medium border border-paper-500/20 transition-all"
            >
              Export TXT
            </button>
            <button
              onClick={() => downloadScreenplayText(activeScript, 'fountain')}
              className="px-3 py-2 rounded-xl bg-odyssey-depth hover:bg-odyssey-trench text-paper-200 text-xs font-medium border border-forge-cyan/30 transition-all"
            >
              Export Fountain
            </button>
            <button
              onClick={() => exportScriptCoveragePdf(activeScript)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan transition-all"
            >
              <FileDown className="w-4 h-4 text-bronze-light" />
              <span>Download PDF Coverage Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
