import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  MessageSquareQuote,
  Sparkles,
  PenTool,
  Copy,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const DialogueIntelligenceView: React.FC = () => {
  const { activeScript, setActiveNavTab } = useScript();

  // Aggregate all dialogue lines from all scenes or current scene
  const allDialogues = activeScript.scenes.flatMap((s) => s.dialogueLines);
  const displayLines = allDialogues.length > 0 ? allDialogues : [];

  const [selectedLineId, setSelectedLineId] = useState<string>(displayLines[0]?.id || 'd-1');
  const [copiedAlternative, setCopiedAlternative] = useState<string | null>(null);

  const selectedLine = displayLines.find((l) => l.id === selectedLineId) || displayLines[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlternative(text);
    setTimeout(() => setCopiedAlternative(null), 2000);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <MessageSquareQuote className="w-4 h-4 text-bronze-light" />
            <span>Subtext Acoustics & Voice Calibration</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Dialogue Intelligence & Subtext Diagnostic
          </h1>
          <p className="text-xs text-paper-300">
            Line-by-line subtext auditing, on-the-nose exposition detection, and voice-preserving alternative synthesis for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={activeScript.categoryScores.dialogue} label="Dialogue Index" size="md" showGoldAccent />
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/15 space-y-1 text-center">
          <div className="text-[10px] font-mono uppercase text-paper-400">Subtext Density</div>
          <div className="font-cinzel text-lg font-bold text-emerald-400">84% Optimal</div>
          <p className="text-[10px] text-paper-400">Layered intention</p>
        </div>

        <div className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/15 space-y-1 text-center">
          <div className="text-[10px] font-mono uppercase text-paper-400">Voice Distinctiveness</div>
          <div className="font-cinzel text-lg font-bold text-bronze-light">91% High</div>
          <p className="text-[10px] text-paper-400">Character rhythm</p>
        </div>

        <div className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/15 space-y-1 text-center">
          <div className="text-[10px] font-mono uppercase text-paper-400">Exposition Leakage</div>
          <div className="font-cinzel text-lg font-bold text-amber-400">12% Minor</div>
          <p className="text-[10px] text-paper-400">Flagged on page 2</p>
        </div>

        <div className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/15 space-y-1 text-center">
          <div className="text-[10px] font-mono uppercase text-paper-400">On-the-Nose Risk</div>
          <div className="font-cinzel text-lg font-bold text-forge-sky">Low (8%)</div>
          <p className="text-[10px] text-paper-400">High behavioral subtext</p>
        </div>
      </div>

      {/* Main Dialogue Workshop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Highlighted Screenplay Dialogue Stream */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono uppercase text-forge-sky font-semibold">
              Screenplay Dialogue Lines ({displayLines.length})
            </span>
            <span className="text-[10px] text-paper-400 font-mono">
              Click any line to inspect subtext
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/20 space-y-3 max-h-[600px] overflow-y-auto">
            {displayLines.map((dLine) => {
              const isSelected = dLine.id === selectedLineId;
              const hasAlert = dLine.isOnTheNose || dLine.hasExpositionRisk;

              return (
                <div
                  key={dLine.id}
                  onClick={() => setSelectedLineId(dLine.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border text-left font-screenplay ${
                    isSelected
                      ? 'bg-forge-navy/90 border-bronze shadow-glow-gold/20 ring-1 ring-bronze'
                      : hasAlert
                      ? 'bg-amber-950/20 hover:bg-amber-950/40 border-amber-500/30'
                      : 'bg-odyssey-abyss/80 hover:bg-odyssey-trench border-forge-cyan/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 font-sans">
                    <span className="font-cinzel text-xs font-bold text-bronze-light">
                      {dLine.character}
                    </span>
                    <div className="flex items-center gap-2">
                      {hasAlert && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {dLine.isOnTheNose ? 'On-the-Nose' : 'Exposition'}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-paper-400">
                        Subtext: {dLine.subtextScore}%
                      </span>
                    </div>
                  </div>

                  {dLine.parenthetical && (
                    <div className="text-[11px] text-paper-400 italic mb-1">
                      ({dLine.parenthetical})
                    </div>
                  )}

                  <p className="text-xs text-paper-100 leading-relaxed font-screenplay">
                    "{dLine.line}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Line Diagnostic & Alternative Generator */}
        <div className="lg:col-span-6 space-y-4">
          {selectedLine ? (
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/30 space-y-5 shadow-glass-card">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                <div>
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold tracking-wider">
                    Dialogue Consultant Breakdown
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-paper-50">
                    Line by {selectedLine.character}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-paper-400">Tension:</span>
                  <span className="text-forge-sky font-bold">{selectedLine.tensionScore}%</span>
                </div>
              </div>

              {/* WHY THIS WORKS / WHY THIS STRUGGLES */}
              {selectedLine.subtextAnalysis && (
                <div className="space-y-3.5 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/20 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-forge-sky font-bold">
                      Surface Dialogue vs Emotional Intention
                    </div>
                    <p className="text-paper-200">
                      <strong className="text-paper-100">Surface: </strong>"{selectedLine.subtextAnalysis.surfaceMeaning}"
                    </p>
                    <p className="text-paper-300 italic">
                      <strong className="text-bronze-light not-italic">True Subtext: </strong>{selectedLine.subtextAnalysis.underlyingEmotion}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bronze/10 border border-bronze/30 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-bronze-light font-bold">
                      Why It Works or Struggles (Craft Principle)
                    </div>
                    <p className="text-paper-100">{selectedLine.subtextAnalysis.whyItWorksOrStruggles}</p>
                  </div>

                  {/* VOICE PRESERVING ALTERNATIVES */}
                  <div className="space-y-2 pt-2 border-t border-forge-cyan/15">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-paper-100 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-bronze-light" />
                        <span>Voice-Preserving Alternatives</span>
                      </span>
                      <span className="text-[10px] font-mono text-paper-400">Preserves {selectedLine.character}'s voice</span>
                    </div>

                    {/* Option 1: Deepened Subtext */}
                    <div className="p-3 rounded-xl bg-odyssey-trench/80 border border-forge-cyan/20 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-forge-sky">
                        <span>OPTION 1: DEEPENED SUBTEXT</span>
                        <button
                          onClick={() => handleCopy(selectedLine.subtextAnalysis?.suggestedAlternative || '')}
                          className="hover:text-paper-100 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedAlternative === selectedLine.subtextAnalysis.suggestedAlternative ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="font-screenplay text-xs text-paper-100">
                        "{selectedLine.subtextAnalysis.suggestedAlternative}"
                      </p>
                    </div>

                    {/* Option 2: High Tension */}
                    {selectedLine.subtextAnalysis.highTensionAlternative && (
                      <div className="p-3 rounded-xl bg-odyssey-trench/80 border border-red-500/20 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-red-400">
                          <span>OPTION 2: ESCALATED TENSION</span>
                          <button
                            onClick={() => handleCopy(selectedLine.subtextAnalysis?.highTensionAlternative || '')}
                            className="hover:text-paper-100 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedAlternative === selectedLine.subtextAnalysis.highTensionAlternative ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="font-screenplay text-xs text-paper-100">
                          "{selectedLine.subtextAnalysis.highTensionAlternative}"
                        </p>
                      </div>
                    )}

                    {/* Option 3: Visual / Terse */}
                    {selectedLine.subtextAnalysis.visualTerseAlternative && (
                      <div className="p-3 rounded-xl bg-odyssey-trench/80 border border-bronze/25 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-bronze-light">
                          <span>OPTION 3: TERSE / VISUAL RHYTHM</span>
                          <button
                            onClick={() => handleCopy(selectedLine.subtextAnalysis?.visualTerseAlternative || '')}
                            className="hover:text-paper-100 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedAlternative === selectedLine.subtextAnalysis.visualTerseAlternative ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="font-screenplay text-xs text-paper-100">
                          "{selectedLine.subtextAnalysis.visualTerseAlternative}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-3 border-t border-forge-cyan/15 flex justify-end">
                <button
                  onClick={() => setActiveNavTab('rewrite')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-forge-navy hover:bg-forge-ocean text-paper-50 border border-forge-cyan/40 transition-all shadow-inner-glow"
                >
                  <PenTool className="w-3.5 h-3.5 text-bronze-light" />
                  <span>Insert into Rewrite Studio</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-odyssey-depth/40 border border-forge-cyan/20 text-center text-paper-400">
              Select a dialogue line to inspect subtext analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
