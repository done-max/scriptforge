import React, { useState, useEffect } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  PenTool,
  Sparkles,
  RefreshCw,
  Check,
  Sliders,
  Clapperboard,
  Copy,
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
  const [showChangesDiff, setShowChangesDiff] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customDirective, setCustomDirective] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

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

  const AUTEUR_PRESETS = [
    {
      id: 'fincher',
      label: 'David Fincher',
      tag: 'Clinical / Cold Subtext',
      desc: 'Terse sentences, zero emotional melodrama, psychological dread.',
      apply: (text: string) =>
        `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[AUTEUR REWRITE: DAVID FINCHER]\n\n` +
        text
          .replace(/I am|I feel/g, 'Evidently')
          .replace(/Look at the/g, 'Observe the')
          .replace(/\?/g, '. (a cold, uninterrupted stare)'),
    },
    {
      id: 'sorkin',
      label: 'Aaron Sorkin',
      tag: 'Walk-and-Talk / Rapid Rhythm',
      desc: 'Musical banter, rhetorical questions, sharp intellectual sparring.',
      apply: (text: string) =>
        `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[AUTEUR REWRITE: AARON SORKIN]\n\n` +
        text
          .replace(/You almost missed it\./, 'You were sixty-eight seconds late, which in Rotterdam is considered a deliberate insult to the railway ministry.')
          .replace(/I wasn't sure I wanted to catch it\./, "And yet you bought the ticket, stood on the platform, and here we are on track four having this conversation."),
    },
    {
      id: 'nolan',
      label: 'Christopher Nolan',
      tag: 'High Concept / Philosophical Dread',
      desc: 'Ticking clock mechanics, existential stakes, cross-cutting gravity.',
      apply: (text: string) =>
        `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[AUTEUR REWRITE: CHRISTOPHER NOLAN]\n\n` +
        text
          .replace(/The rain drums against/g, 'The storm closes in—inevitable as gravity.')
          .replace(/You almost missed it\./, 'Time is running backward for whoever is waiting on the other side of the bay.')
          .replace(/I wasn't sure I wanted to catch it\./, 'The question isn’t whether we arrive. It’s what version of ourselves gets off the train.'),
    },
    {
      id: 'gerwig',
      label: 'Greta Gerwig',
      tag: 'Vulnerable / Overlapping Warmth',
      desc: 'Messy emotional honesty, overlapping dialogue, heartbreaking warmth.',
      apply: (text: string) =>
        `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[AUTEUR REWRITE: GRETA GERWIG]\n\n` +
        text
          .replace(/You almost missed it\./, '(overlapping, half-laughing)\nI thought you weren’t coming. I stood there counting the tiles on the floor like an idiot.')
          .replace(/I wasn't sure I wanted to catch it\./, 'I almost didn’t! I had my hand on the handle of the door and I thought—why am I always running toward things that hurt?'),
    },
    {
      id: 'tarantino',
      label: 'Quentin Tarantino',
      tag: 'Pop-Culture / High-Tension Standoff',
      desc: 'Tangential analogies, simmering violence, high-stakes conversational deflection.',
      apply: (text: string) =>
        `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[AUTEUR REWRITE: QUENTIN TARANTINO]\n\n` +
        text
          .replace(/You almost missed it\./, 'You ever order coffee in Brussels at two in the morning, Elena? They don’t give you coffee. They give you warm chicory and an attitude.')
          .replace(/I wasn't sure I wanted to catch it\./, 'I’m not talking about the coffee, Arjun. I’m talking about what’s inside the trunk.'),
    },
  ];

  const CRAFT_PRESETS = [
    { id: 'tightenPacing', label: 'Tighten Pacing', desc: 'Trim dialogue fat, maximize momentum.' },
    { id: 'increaseTension', label: 'Increase Tension', desc: 'Escalate stakes, sharpen conflict vectors.' },
    { id: 'deepenSubtext', label: 'Deepen Subtext', desc: 'Conceal overt exposition in behavioral deflection.' },
    { id: 'raiseStakes', label: 'Raise Stakes', desc: 'Amplify catastrophic consequences of failure.' },
    { id: 'strengthenVoice', label: 'Strengthen Character Voice', desc: 'Accentuate distinct speech rhythms.' },
    { id: 'reduceExposition', label: 'Reduce Exposition', desc: 'Eliminate on-the-nose backstory dumps.' },
  ];

  const handleRunRewrite = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setIsGenerating(true);

    setTimeout(() => {
      let generated = '';
      const suggestions = activeScene?.rewriteSuggestions;

      const auteur = AUTEUR_PRESETS.find((a) => a.id === presetKey);
      if (auteur) {
        generated = auteur.apply(originalText);
      } else if (presetKey === 'tightenPacing' && suggestions?.tightenPacing) {
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
        generated = `${activeScene?.slugline || 'INT. SCENE - NIGHT'}\n\n[REWRITTEN WITH DIRECTIVE: ${customDirective || presetKey}]\n\n${originalText
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

  const handleCopyRevised = () => {
    navigator.clipboard.writeText(rewrittenText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const originalLines = originalText.split('\n');
  const rewrittenLines = rewrittenText.split('\n');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden text-paper-100">
      {/* Top Studio Bar */}
      <div className="px-6 py-3 border-b border-forge-cyan/20 bg-odyssey-abyss/90 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-forge-navy border border-bronze/40 flex items-center justify-center shadow-inner-glow">
            <PenTool className="w-4 h-4 text-bronze-light" />
          </div>
          <div>
            <h2 className="font-cinzel text-sm font-bold text-paper-50 tracking-wider flex items-center gap-2">
              <span>REWRITE STUDIO & AUTEUR TONES</span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-bronze/15 border border-bronze/30 text-bronze-light">
                Scene {activeScene?.sceneNumber}
              </span>
            </h2>
            <p className="text-[11px] text-paper-400 font-mono">
              Re-orchestrate dramatic friction with Hollywood auteur presets and subtext filters
            </p>
          </div>
        </div>

        {/* Scene Selector Pill & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <select
            value={activeSceneIndex}
            onChange={(e) => setActiveSceneIndex(Number(e.target.value))}
            className="px-3 py-1.5 rounded-xl bg-odyssey-depth border border-forge-cyan/30 text-xs text-paper-200 focus:outline-none focus:border-forge-cyan cursor-pointer"
          >
            {activeScript.scenes.map((s) => (
              <option key={s.id} value={s.sceneNumber}>
                Scene {s.sceneNumber}: {s.slugline.slice(0, 25)}...
              </option>
            ))}
          </select>

          <button
            onClick={handleCopyRevised}
            className="p-2 rounded-xl bg-odyssey-depth hover:bg-odyssey-trench text-paper-300 hover:text-paper-100 border border-paper-500/20 transition-all text-xs"
            title="Copy Revised Scene to Clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleApplyRewrite}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-paper-50 text-xs font-bold shadow-glow-cyan transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept into Master Draft</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-2 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
          <span>✓ Rewrite successfully incorporated into {activeScript.title} Master Screenplay!</span>
          <button onClick={() => setSuccessToast(false)} className="hover:text-emerald-100">✕</button>
        </div>
      )}

      {copiedToast && (
        <div className="bg-forge-navy/90 border-b border-forge-cyan px-6 py-2 text-xs font-mono text-forge-sky flex items-center justify-between animate-fadeIn">
          <span>✓ Revised screenplay scene copied to clipboard!</span>
          <button onClick={() => setCopiedToast(false)} className="hover:text-paper-100">✕</button>
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
                <span>Show Diff (+ / -)</span>
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
                        className="bg-emerald-950/30 text-emerald-200 border-l-2 border-emerald-400 pl-2 py-0.5 rounded-r font-medium"
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

        {/* ================= PANE 3: REWRITE & AUTEUR CONTROLS (RIGHT) ================= */}
        <div className="w-full lg:w-84 bg-odyssey-abyss/95 flex flex-col overflow-y-auto p-4 space-y-4">
          {/* Auteur Tone Presets Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-bronze-light font-bold">
              <Clapperboard className="w-3.5 h-3.5" />
              <span>Hollywood Auteur Tones</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {AUTEUR_PRESETS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => handleRunRewrite(a.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs ${
                    selectedPreset === a.id
                      ? 'bg-forge-navy text-paper-50 border-bronze-light shadow-glow-gold'
                      : 'bg-odyssey-depth/60 hover:bg-odyssey-trench text-paper-300 border-forge-cyan/15 hover:border-forge-cyan/35'
                  }`}
                >
                  <div className="flex items-center justify-between font-cinzel font-bold text-paper-100">
                    <span>{a.label}</span>
                    <span className="text-[9px] font-mono font-normal text-forge-sky">{a.tag}</span>
                  </div>
                  <div className="text-[10px] text-paper-400 mt-0.5 italic">{a.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Craft Presets Section */}
          <div className="space-y-2 pt-2 border-t border-forge-cyan/15">
            <div className="text-[10px] font-mono uppercase text-forge-sky font-bold flex items-center gap-1.5">
              <Sliders className="w-3 h-3" />
              <span>Craft Strategy Directives</span>
            </div>

            <div className="space-y-1">
              {CRAFT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleRunRewrite(p.id)}
                  className={`w-full text-left p-2 rounded-xl transition-all border text-xs ${
                    selectedPreset === p.id
                      ? 'bg-forge-navy text-paper-50 border-forge-cyan shadow-inner-glow'
                      : 'bg-odyssey-depth/40 hover:bg-odyssey-trench text-paper-300 border-paper-500/10 hover:border-forge-cyan/30'
                  }`}
                >
                  <div className="font-semibold text-paper-100 flex items-center justify-between">
                    <span>{p.label}</span>
                    <Sparkles className="w-3 h-3 text-bronze-light opacity-60" />
                  </div>
                  <div className="text-[10px] text-paper-400">{p.desc}</div>
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
              rows={2}
              placeholder="e.g. Make Arjun hesitate and whisper..."
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
