import React, { useState, useEffect } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  PenTool,
  Sparkles,
  RefreshCw,
  Check,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewriteStudioView: React.FC = () => {
  const {
    activeScript,
    activeScene,
    activeSceneIndex,
    setActiveSceneIndex,
    applySceneRewrite,
  } = useScript();

  const [originalText, setOriginalText] = useState(activeScene?.content || '');
  const [rewrittenText, setRewrittenText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string>('deepenSubtext');
  const [preserveVoice, setPreserveVoice] = useState(true);
  const [preservePlot, setPreservePlot] = useState(true);
  const [showChangesDiff, setShowChangesDiff] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customDirective, setCustomDirective] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    if (activeScene) {
      setOriginalText(activeScene.content);
      const suggestions = activeScene.rewriteSuggestions;
      if (suggestions) {
        setRewrittenText(suggestions.deepenSubtext || suggestions.tightenPacing || activeScene.content);
      } else {
        setRewrittenText(activeScene.content);
      }
    }
  }, [activeScene]);

  const PRESETS = [
    { id: 'tightenPacing', label: 'Tighten Pacing', desc: 'Trim dialogue fat, maximize momentum.' },
    { id: 'increaseTension', label: 'Increase Tension', desc: 'Escalate stakes, sharpen conflict vectors.' },
    { id: 'deepenSubtext', label: 'Deepen Subtext', desc: 'Conceal overt exposition in behavioral deflection.' },
    { id: 'raiseStakes', label: 'Raise Stakes', desc: 'Amplify catastrophic consequences of failure.' },
    { id: 'strengthenVoice', label: 'Strengthen Character Voice', desc: 'Accentuate distinct speech rhythms.' },
    { id: 'makeVisual', label: 'Make More Visual', desc: 'Convert verbal exchanges into physical prop actions.' },
    { id: 'reduceExposition', label: 'Reduce Exposition', desc: 'Eliminate on-the-nose backstory dumps.' },
    { id: 'fixContinuity', label: 'Fix Continuity', desc: 'Align timeline and character knowledge constraints.' },
  ];

  const handleRunRewrite = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setIsGenerating(true);

    setTimeout(() => {
      let generated = '';
      const suggestions = activeScene?.rewriteSuggestions;

      if (presetKey === 'tightenPacing' && suggestions?.tightenPacing) {
        generated = suggestions.tightenPacing;
      } else if (presetKey === 'increaseTension' && suggestions?.increaseTension) {
        generated = suggestions.increaseTension;
      } else if (presetKey === 'deepenSubtext' && suggestions?.deepenSubtext) {
        generated = suggestions.deepenSubtext;
      } else if (presetKey === 'raiseStakes' && suggestions?.raiseStakes) {
        generated = suggestions.raiseStakes;
      } else if (presetKey === 'strengthenVoice' && suggestions?.strengthenVoice) {
        generated = suggestions.strengthenVoice;
      } else if (presetKey === 'reduceExposition' && suggestions?.reduceExposition) {
        generated = suggestions.reduceExposition;
      } else {
        // Dynamic procedural rewrite
        generated = `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[REWRITTEN WITH DIRECTIVE: ${presetKey.toUpperCase()}]\n\n${originalText
          .replace(/Practical as ever.*/, 'Practical. Like staying in Rotterdam through November.')
          .replace(/I wasn't sure I wanted to catch it.*/, 'Ticket agent said there was another at six. Almost waited.')}`;
      }

      setRewrittenText(generated);
      setIsGenerating(false);
    }, 600);
  };

  const handleApplyRewrite = () => {
    if (activeScene && rewrittenText) {
      applySceneRewrite(activeScene.id, rewrittenText);
      setOriginalText(rewrittenText);
      setSuccessToast(true);

      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#4AA3DF', '#C5A46D', '#70C7F5'],
        });
      } catch {
        // ignore
      }

      setTimeout(() => setSuccessToast(false), 3500);
    }
  };

  // Simple line-by-line diff calculator
  const originalLines = originalText.split('\n');
  const rewrittenLines = rewrittenText.split('\n');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden text-paper-100">
      {/* Top Studio Bar */}
      <div className="px-6 py-3.5 border-b border-forge-cyan/20 bg-odyssey-abyss/90 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-forge-navy border border-bronze/40 flex items-center justify-center shadow-inner-glow">
            <PenTool className="w-4 h-4 text-bronze-light" />
          </div>
          <div>
            <h2 className="font-cinzel text-sm font-bold text-paper-50 tracking-wider flex items-center gap-2">
              <span>REWRITE STUDIO</span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-bronze/15 border border-bronze/30 text-bronze-light">
                Scene {activeScene?.sceneNumber}
              </span>
            </h2>
            <p className="text-[11px] text-paper-400 font-mono">
              Collaborative AI scene workshop with voice retention controls
            </p>
          </div>
        </div>

        {/* Scene Selector Pill */}
        <div className="flex items-center gap-3">
          <select
            value={activeSceneIndex}
            onChange={(e) => setActiveSceneIndex(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-odyssey-depth border border-forge-cyan/30 text-xs text-paper-200 focus:outline-none focus:border-forge-cyan cursor-pointer"
          >
            {activeScript.scenes.map((s) => (
              <option key={s.id} value={s.sceneNumber}>
                Scene {s.sceneNumber}: {s.slugline.slice(0, 30)}...
              </option>
            ))}
          </select>

          <button
            onClick={handleApplyRewrite}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-paper-50 text-xs font-bold shadow-glow-cyan transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept Rewrite into Script</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-2 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
          <span>✓ Rewrite successfully incorporated into {activeScript.title} Master Draft!</span>
          <button onClick={() => setSuccessToast(false)} className="hover:text-emerald-100">✕</button>
        </div>
      )}

      {/* 3-Pane Workshop Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ================= PANE 1: ORIGINAL SCENE (LEFT) ================= */}
        <div className="flex-1 border-r border-forge-cyan/15 bg-odyssey-void/60 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-forge-cyan/15 bg-odyssey-abyss/80 flex items-center justify-between text-xs">
            <span className="font-cinzel font-bold text-paper-300 uppercase tracking-wider">
              Original Draft (Scene {activeScene?.sceneNumber})
            </span>
            <span className="text-[10px] font-mono text-paper-500">Read-Only Source</span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 font-screenplay text-xs text-paper-300 whitespace-pre-wrap leading-relaxed">
            {originalText}
          </div>
        </div>

        {/* ================= PANE 2: AI SUGGESTIONS & DIFF (CENTER) ================= */}
        <div className="flex-1 border-r border-forge-cyan/15 bg-odyssey-depth/30 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-forge-cyan/15 bg-odyssey-abyss/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-bronze-light" />
              <span className="font-cinzel font-bold text-paper-100 uppercase tracking-wider">
                Consultant Rewrite
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-mono text-paper-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showChangesDiff}
                  onChange={(e) => setShowChangesDiff(e.target.checked)}
                  className="rounded border-forge-cyan bg-odyssey-depth text-forge-cyan focus:ring-0"
                />
                <span>Show Diff</span>
              </label>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 font-screenplay text-xs text-paper-100 whitespace-pre-wrap leading-relaxed relative">
            {isGenerating ? (
              <div className="h-full flex items-center justify-center gap-3 text-forge-sky font-sans animate-pulse">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Re-orchestrating scene dialogue & subtext...</span>
              </div>
            ) : showChangesDiff ? (
              <div className="space-y-1">
                {rewrittenLines.map((rLine, idx) => {
                  const oLine = originalLines[idx];
                  const isModified = oLine !== undefined && oLine !== rLine;
                  const isNew = oLine === undefined;

                  if (isModified || isNew) {
                    return (
                      <div
                        key={idx}
                        className="bg-emerald-950/30 text-emerald-200 border-l-2 border-emerald-400 pl-2 py-0.5 rounded-r"
                      >
                        + {rLine}
                      </div>
                    );
                  }

                  return <div key={idx} className="text-paper-300">{rLine}</div>;
                })}
              </div>
            ) : (
              <textarea
                value={rewrittenText}
                onChange={(e) => setRewrittenText(e.target.value)}
                className="w-full h-full bg-transparent resize-none focus:outline-none text-paper-100 leading-relaxed font-screenplay"
              />
            )}
          </div>
        </div>

        {/* ================= PANE 3: REWRITE CONTROLS (RIGHT) ================= */}
        <div className="w-full lg:w-80 bg-odyssey-abyss/95 flex flex-col overflow-y-auto p-5 space-y-5">
          {/* Header */}
          <div>
            <h3 className="font-cinzel text-xs font-bold text-paper-50 tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-forge-sky" />
              <span>Rewrite Calibration Directives</span>
            </h3>
            <p className="text-[11px] text-paper-400 mt-0.5">
              Select craft presets or customize prompts.
            </p>
          </div>

          {/* Voice & Plot Guard Toggles */}
          <div className="p-3.5 rounded-xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-2.5 text-xs">
            <div className="text-[10px] font-mono uppercase text-forge-sky font-bold">
              Voice & Narrative Guardrails
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-paper-200">Preserve Character Voice</span>
              <input
                type="checkbox"
                checked={preserveVoice}
                onChange={(e) => setPreserveVoice(e.target.checked)}
                className="rounded border-forge-cyan bg-odyssey-depth text-forge-cyan"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-paper-200">Preserve Plot Outcomes</span>
              <input
                type="checkbox"
                checked={preservePlot}
                onChange={(e) => setPreservePlot(e.target.checked)}
                className="rounded border-forge-cyan bg-odyssey-depth text-forge-cyan"
              />
            </label>
          </div>

          {/* Craft Presets List */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-paper-500 font-bold">
              Craft Strategy Presets
            </div>

            <div className="space-y-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleRunRewrite(p.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs ${
                    selectedPreset === p.id
                      ? 'bg-forge-navy text-paper-50 border-forge-cyan shadow-inner-glow'
                      : 'bg-odyssey-depth/50 hover:bg-odyssey-trench text-paper-300 border-paper-500/10 hover:border-forge-cyan/30'
                  }`}
                >
                  <div className="font-semibold text-paper-100 flex items-center justify-between">
                    <span>{p.label}</span>
                    <Sparkles className="w-3 h-3 text-bronze-light opacity-60" />
                  </div>
                  <div className="text-[10px] text-paper-400 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Directive Input */}
          <div className="space-y-2 pt-2 border-t border-forge-cyan/15">
            <div className="text-[10px] font-mono uppercase text-paper-400 font-bold">
              Custom Writer Directive
            </div>
            <textarea
              rows={3}
              placeholder="e.g. Make Arjun hesitate 5 seconds before speaking..."
              value={customDirective}
              onChange={(e) => setCustomDirective(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-odyssey-depth/90 border border-forge-cyan/20 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan resize-none"
            />
            <button
              onClick={() => handleRunRewrite('custom')}
              disabled={!customDirective.trim()}
              className="w-full py-2 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/30 disabled:opacity-40 transition-all shadow-inner-glow"
            >
              Execute Custom Directive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
