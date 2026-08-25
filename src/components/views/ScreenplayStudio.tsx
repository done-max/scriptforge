import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Sparkles,
  PenTool,
  Upload,
  FileDown,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  Ship,
} from 'lucide-react';
import { CraftCard } from '../common/CraftCard';
import { ScoreBadge } from '../common/ScoreBadge';
import { downloadScreenplayText } from '../../utils/coveragePdf';
import { sanitizeScreenplayText } from '../../utils/fountainParser';

export const ScreenplayStudio: React.FC = () => {
  const {
    activeScript,
    activeSceneIndex,
    setActiveSceneIndex,
    activeScene,
    setActiveNavTab,
    setIsUploadModalOpen,
    setIsAIAssistantOpen,
  } = useScript();

  const [showAINotes, setShowAINotes] = useState(true);
  const [activeTabMobile, setActiveTabMobile] = useState<'scenes' | 'read' | 'notes'>('read');

  const scenes = activeScript.scenes || [];
  const currentAnnotations = activeScene?.aiAnnotations || [];

  const getWaypointName = (sceneNum: number, totalScenes: number) => {
    const ratio = sceneNum / Math.max(1, totalScenes);
    if (ratio <= 0.15) return { symbol: '🏛️', name: 'Waypoint I: Ithaca (The Status Quo)' };
    if (ratio <= 0.3) return { symbol: '🌿', name: 'Waypoint II: The Lotus Eaters (The Temptation)' };
    if (ratio <= 0.45) return { symbol: '👁️', name: 'Waypoint III: The Cyclops Cave (First Major Obstacle)' };
    if (ratio <= 0.6) return { symbol: '💨', name: 'Waypoint IV: The Winds of Aeolus (False Victory)' };
    if (ratio <= 0.75) return { symbol: '🔮', name: 'Waypoint V: Circe’s Isle (Metamorphosis)' };
    if (ratio <= 0.85) return { symbol: '⚡', name: 'Waypoint VI: The Underworld (The Dark Night)' };
    if (ratio <= 0.95) return { symbol: '🧜‍♀️', name: 'Waypoint VII: Scylla & Charybdis (The Dilemma)' };
    return { symbol: '🏹', name: 'Waypoint VIII: The Bow of Odysseus (The Climax)' };
  };

  const waypoint = getWaypointName(activeScene?.sceneNumber || 1, scenes.length);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden text-paper-100">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-forge-cyan/20 bg-odyssey-abyss p-2 gap-1 z-20">
        <button
          onClick={() => setActiveTabMobile('scenes')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTabMobile === 'scenes'
              ? 'bg-forge-navy text-paper-50 border border-forge-cyan/40'
              : 'text-paper-400'
          }`}
        >
          Scenes ({scenes.length})
        </button>
        <button
          onClick={() => setActiveTabMobile('read')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTabMobile === 'read'
              ? 'bg-forge-navy text-paper-50 border border-forge-cyan/40'
              : 'text-paper-400'
          }`}
        >
          Read Screenplay
        </button>
        <button
          onClick={() => setActiveTabMobile('notes')}
          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTabMobile === 'notes'
              ? 'bg-forge-navy text-paper-50 border border-forge-cyan/40'
              : 'text-paper-400'
          }`}
        >
          AI Notes ({currentAnnotations.length})
        </button>
      </div>

      {/* Main Studio Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================= LEFT PANE: SCENE NAVIGATOR ================= */}
        <div
          className={`w-full lg:w-72 border-r border-forge-cyan/15 bg-odyssey-abyss/80 flex flex-col ${
            activeTabMobile === 'scenes' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-forge-cyan/15 bg-odyssey-void/60 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-forge-sky uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-bronze-light" />
                <span>Odyssey Waypoints</span>
              </div>
              <h3 className="font-cinzel text-xs font-bold text-paper-100 truncate max-w-[170px]">
                {activeScript.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-odyssey-depth text-paper-300 border border-forge-cyan/20">
              {scenes.length} Scenes
            </span>
          </div>

          {/* Scene List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {scenes.map((scene) => {
              const isCurrent = scene.sceneNumber === activeSceneIndex;
              const sceneWp = getWaypointName(scene.sceneNumber, scenes.length);

              return (
                <div
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(scene.sceneNumber);
                    setActiveTabMobile('read');
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                    isCurrent
                      ? 'bg-forge-navy/90 text-paper-50 border-forge-cyan shadow-glow-cyan/20 ring-1 ring-forge-cyan'
                      : 'bg-odyssey-depth/50 hover:bg-odyssey-trench text-paper-300 border-forge-cyan/10 hover:border-forge-cyan/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-forge-sky flex items-center gap-1">
                      <span>{sceneWp.symbol}</span>
                      <span>SCENE 0{scene.sceneNumber}</span>
                    </span>
                    <span className="text-[9px] font-mono text-paper-400">pg {scene.pageNumber}</span>
                  </div>

                  <div className="font-screenplay text-xs font-bold text-paper-100 truncate mb-1">
                    {sanitizeScreenplayText(scene.slugline)}
                  </div>

                  <p className="text-[10px] text-paper-400 line-clamp-1 italic">
                    {scene.summary}
                  </p>
                </div>
              );
            })}

            {scenes.length === 0 && (
              <div className="p-6 text-center text-paper-400 text-xs">
                No scenes parsed yet. Click Upload to add a screenplay.
              </div>
            )}
          </div>

          {/* Bottom Upload Action */}
          <div className="p-3 border-t border-forge-cyan/15 bg-odyssey-void/60 flex gap-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/30 transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-forge-sky" />
              <span>Upload Script</span>
            </button>
          </div>
        </div>

        {/* ================= CENTER PANE: CLEAN COURIER SCREENPLAY READER ================= */}
        <div
          className={`flex-1 flex flex-col bg-odyssey-depth/40 overflow-hidden ${
            activeTabMobile === 'read' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Reader Top Action Bar */}
          <div className="px-6 py-3 border-b border-forge-cyan/15 bg-odyssey-abyss/90 flex flex-wrap items-center justify-between gap-3">
            {/* Scene Info & Homeric Waypoint Banner */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-bronze-light bg-bronze/10 px-2.5 py-1 rounded-lg border border-bronze/30 font-bold">
                <Ship className="w-3.5 h-3.5" />
                <span>{waypoint.name}</span>
              </div>
              <span className="text-paper-500">|</span>
              <span className="text-xs font-mono text-paper-300 uppercase">
                SCENE {activeScene?.sceneNumber || 1} • Page {activeScene?.pageNumber || 1}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Toggle AI Notes Button */}
              <button
                onClick={() => setShowAINotes(!showAINotes)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  showAINotes
                    ? 'bg-bronze/20 text-bronze-light border-bronze/40'
                    : 'bg-odyssey-depth/60 text-paper-400 border-paper-500/20'
                }`}
                title={showAINotes ? 'Hide AI Story Notes' : 'Show AI Story Notes'}
              >
                {showAINotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{showAINotes ? 'AI Notes Active' : 'Clean Reading Mode'}</span>
              </button>

              {/* Rewrite Button */}
              <button
                onClick={() => setActiveNavTab('rewrite')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forge-navy/80 hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/40 transition-all shadow-inner-glow"
              >
                <PenTool className="w-3.5 h-3.5 text-bronze-light" />
                <span>Rewrite Scene</span>
              </button>

              {/* Download Fountain / TXT */}
              <button
                onClick={() => downloadScreenplayText(activeScript, 'fountain')}
                className="p-1.5 text-paper-300 hover:text-paper-100 hover:bg-odyssey-depth rounded-lg transition-colors border border-paper-500/20"
                title="Download Screenplay (.fountain)"
              >
                <FileDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reader Paper Sheet */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
            <div className="w-full max-w-2xl screenplay-sheet p-6 sm:p-12 rounded-2xl border border-forge-cyan/20 bg-odyssey-abyss shadow-2xl relative">
              {/* Homeric Watermark & Header */}
              <div className="flex justify-between items-center text-xs font-mono text-paper-500 mb-8 border-b border-paper-500/20 pb-2">
                <span className="tracking-widest">{sanitizeScreenplayText(activeScript.title).toUpperCase()}</span>
                <span>PAGE {activeScene?.pageNumber || 1}</span>
              </div>

              {/* Clean Screenplay Content Rendered in Courier Prime */}
              <div className="space-y-4 font-screenplay">
                {activeScene ? (
                  sanitizeScreenplayText(activeScene.content)
                    .split('\n\n')
                    .map((block, idx) => {
                      const trimmed = sanitizeScreenplayText(block.trim());
                      const isSlug = /^(INT\.|EXT\.|INT\/EXT\.|I\/E\.)/i.test(trimmed);

                      if (isSlug) {
                        return (
                          <div key={idx} className="script-slugline flex items-center justify-between group">
                            <span>{trimmed}</span>
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] font-sans font-normal text-bronze-light px-2 py-0.5 rounded bg-bronze/10 border border-bronze/30">
                              Scene {activeScene.sceneNumber}
                            </span>
                          </div>
                        );
                      }

                      // Check if dialogue block
                      const lines = trimmed.split('\n');
                      if (lines.length >= 2 && lines[0] === lines[0].toUpperCase() && !lines[0].includes('.')) {
                        const charName = lines[0];
                        const paren = lines.length === 3 ? lines[1] : null;
                        const dial = lines[lines.length - 1];

                        return (
                          <div key={idx} className="my-4 group relative">
                            <div className="script-character">{charName}</div>
                            {paren && <div className="script-parenthetical">{paren}</div>}
                            <div className="script-dialogue relative">
                              <span>{dial}</span>
                              {showAINotes && (
                                <span
                                  className="inline-flex ml-2 align-middle w-4 h-4 rounded-full bg-bronze/20 border border-bronze text-bronze-light items-center justify-center text-[9px] font-bold shadow-glow-gold"
                                  title="Odyssey Story Subtext Note"
                                >
                                  ✦
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="script-action leading-relaxed">
                          {trimmed}
                        </p>
                      );
                    })
                ) : (
                  <div className="p-8 text-center text-paper-400">No screenplay scene loaded.</div>
                )}
              </div>

              {/* Bottom Scene Paging Controls */}
              <div className="mt-12 pt-4 border-t border-paper-500/20 flex items-center justify-between text-xs font-mono text-paper-400">
                <button
                  disabled={activeSceneIndex <= 1}
                  onClick={() => setActiveSceneIndex(activeSceneIndex - 1)}
                  className="flex items-center gap-1 hover:text-forge-sky disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV SCENE</span>
                </button>
                <span className="text-paper-500 font-mono">
                  SCENE {activeScene?.sceneNumber || 1} OF {scenes.length}
                </span>
                <button
                  disabled={activeSceneIndex >= scenes.length}
                  onClick={() => setActiveSceneIndex(activeSceneIndex + 1)}
                  className="flex items-center gap-1 hover:text-forge-sky disabled:opacity-30 transition-colors"
                >
                  <span>NEXT SCENE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANE: STORY INTELLIGENCE & AI NOTES ================= */}
        {showAINotes && (
          <div
            className={`w-full lg:w-80 border-l border-forge-cyan/15 bg-odyssey-abyss/90 flex flex-col ${
              activeTabMobile === 'notes' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {/* Header */}
            <div className="p-4 border-b border-forge-cyan/15 bg-odyssey-void/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-bronze-light" />
                <h3 className="font-cinzel text-xs font-bold text-paper-50 tracking-wider">
                  ODYSSEY CRAFT DIAGNOSTICS
                </h3>
              </div>
              <ScoreBadge score={activeScript.storyIntelligenceScore} size="sm" showGoldAccent />
            </div>

            {/* Craft Notes Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-[10px] font-mono uppercase text-forge-sky tracking-wider font-semibold">
                Scene {activeScene?.sceneNumber} Story Consultant Notes
              </div>

              {currentAnnotations.length > 0 ? (
                currentAnnotations.map((ann) => (
                  <CraftCard
                    key={ann.id}
                    title={ann.title}
                    category={ann.type.toUpperCase()}
                    observation={ann.observation}
                    whyItMatters={ann.whyItMatters}
                    suggestion={ann.suggestion}
                    severity={ann.severity}
                    actionLabel="Open in Rewrite Studio"
                    onApplySuggestion={() => setActiveNavTab('rewrite')}
                  />
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-odyssey-depth/40 border border-forge-cyan/15 text-center space-y-2">
                  <BookOpen className="w-6 h-6 text-forge-sky mx-auto opacity-60" />
                  <p className="text-xs text-paper-300">
                    Scene {activeScene?.sceneNumber} meets Homeric narrative pacing standards.
                  </p>
                  <button
                    onClick={() => setIsAIAssistantOpen(true)}
                    className="text-xs text-forge-sky hover:underline font-semibold"
                  >
                    Ask Story Consultant AI →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
