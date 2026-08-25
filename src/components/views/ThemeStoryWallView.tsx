import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Network,
  Link,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const ThemeStoryWallView: React.FC = () => {
  const { activeScript, setActiveSceneIndex, setActiveNavTab } = useScript();
  const themes = activeScript.themeMotifs;

  const [selectedThemeId, setSelectedThemeId] = useState<string>(themes[0]?.id || 't-1');

  const selectedTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <Network className="w-4 h-4 text-bronze-light" />
            <span>Thematic Story Wall & Symbolic Resonance</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Theme & Motif Digital Story Wall
          </h1>
          <p className="text-xs text-paper-300">
            Tracking recurring symbols, emotional sub-currents, and visual motifs across scenes for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={activeScript.categoryScores.theme} label="Theme Index" size="md" showGoldAccent />
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const isSelected = theme.id === selectedThemeId;
          return (
            <div
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border text-left ${
                isSelected
                  ? 'bg-forge-navy/80 border-bronze shadow-glow-gold/20 ring-1 ring-bronze'
                  : 'bg-odyssey-depth/60 hover:bg-odyssey-trench border-forge-cyan/15 hover:border-forge-cyan/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-odyssey-abyss text-forge-sky border border-forge-cyan/30 font-semibold">
                  {theme.type.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-[10px] font-mono text-bronze-light">
                  <Link className="w-3 h-3 text-bronze" />
                  <span>{theme.sceneChain.length} scenes</span>
                </div>
              </div>

              <h3 className="font-cinzel text-sm font-bold text-paper-100 mb-1">
                {theme.name}
              </h3>
              <p className="text-xs text-paper-300 line-clamp-2 italic mb-3">
                {theme.description}
              </p>

              {/* Scene Chain Pill */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-paper-500/10">
                <span className="text-[10px] font-mono text-paper-400">Chain:</span>
                {theme.sceneChain.map((scn, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-odyssey-void text-paper-200 border border-paper-500/20">
                      0{scn}
                    </span>
                    {idx < theme.sceneChain.length - 1 && (
                      <span className="text-bronze text-xs">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Theme Story Wall Trace */}
      {selectedTheme && (
        <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-6 shadow-glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-forge-cyan/15">
            <div>
              <div className="text-[10px] font-mono text-bronze-light uppercase font-bold tracking-wider">
                Active Thematic Narrative Thread
              </div>
              <h2 className="font-cinzel text-xl font-bold text-paper-50">{selectedTheme.name}</h2>
              <p className="text-xs text-paper-300 italic">{selectedTheme.description}</p>
            </div>

            {/* Visual Scene Sequence Progression */}
            <div className="flex items-center gap-2 bg-odyssey-abyss/80 px-4 py-2 rounded-xl border border-forge-cyan/20">
              <span className="text-xs font-mono text-paper-400">Scene Progression:</span>
              <span className="font-mono text-xs font-bold text-forge-sky">
                {selectedTheme.sceneChain.map((s) => `Scene 0${s}`).join(' → ')}
              </span>
            </div>
          </div>

          {/* Occurrences Pinboard */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-sm font-bold text-paper-100 flex items-center gap-2">
              <Eye className="w-4 h-4 text-forge-sky" />
              <span>Scene Occurrence Evidences & Resonance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedTheme.occurrences.map((occ, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-odyssey-abyss/80 border border-forge-cyan/20 space-y-3 flex flex-col justify-between hover:border-forge-cyan/40 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-forge-sky bg-forge-navy/60 px-2 py-0.5 rounded border border-forge-cyan/30">
                        SCENE {occ.sceneNumber}
                      </span>
                      <span className="text-[10px] font-mono text-paper-500">Step {idx + 1} of {selectedTheme.occurrences.length}</span>
                    </div>

                    <blockquote className="text-xs font-screenplay text-paper-100 italic bg-odyssey-void/60 p-3 rounded-xl border border-paper-500/10">
                      "{occ.contextQuote}"
                    </blockquote>

                    <p className="text-xs text-paper-300 leading-relaxed">
                      <strong className="text-bronze-light font-normal">Resonance: </strong>{occ.thematicResonance}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-paper-500/10 flex justify-end">
                    <button
                      onClick={() => {
                        setActiveSceneIndex(occ.sceneNumber);
                        setActiveNavTab('studio');
                      }}
                      className="text-xs text-forge-sky hover:text-paper-100 font-mono flex items-center gap-1"
                    >
                      <span>Inspect Scene {occ.sceneNumber}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
