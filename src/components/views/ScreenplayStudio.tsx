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
  Volume2,
  VolumeX,
  Filter,
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
  const [readerTheme, setReaderTheme] = useState<'midnight' | 'parchment' | 'paper' | 'oled'>('midnight');
  const [fontSize, setFontSize] = useState<'compact' | 'standard' | 'large'>('standard');
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState<string>('all');
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const scenes = activeScript.scenes || [];
  const currentAnnotations = activeScene?.aiAnnotations || [];

  // Get distinct characters in the screenplay for filter
  const allCharacters = Array.from(
    new Set(scenes.flatMap((s) => s.charactersPresent || []))
  ).filter(Boolean);

  // Filtered scenes based on character appearance
  const filteredScenes = selectedCharacterFilter === 'all'
    ? scenes
    : scenes.filter((s) => s.charactersPresent?.includes(selectedCharacterFilter));

  const getWaypointName = (sceneNum: number, totalScenes: number) => {
    const ratio = sceneNum / Math.max(1, totalScenes);
    if (ratio <= 0.15) return { symbol: '🏛️', name: 'Waypoint I: Ithaca (Status Quo)' };
    if (ratio <= 0.3) return { symbol: '🌿', name: 'Waypoint II: Lotus Eaters (Temptation)' };
    if (ratio <= 0.45) return { symbol: '👁️', name: 'Waypoint III: Cyclops Cave (Obstacle)' };
    if (ratio <= 0.6) return { symbol: '💨', name: 'Waypoint IV: Winds of Aeolus (False Hope)' };
    if (ratio <= 0.75) return { symbol: '🔮', name: 'Waypoint V: Circe’s Isle (Metamorphosis)' };
    if (ratio <= 0.85) return { symbol: '⚡', name: 'Waypoint VI: The Underworld (Dark Night)' };
    if (ratio <= 0.95) return { symbol: '🧜‍♀️', name: 'Waypoint VII: Scylla & Charybdis (Dilemma)' };
    return { symbol: '🏹', name: 'Waypoint VIII: Bow of Odysseus (Climax)' };
  };

  const waypoint = getWaypointName(activeScene?.sceneNumber || 1, scenes.length);

  // Web Speech API Table Read Synthesis
  const toggleTableRead = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    if (!activeScene) return;

    const cleanText = sanitizeScreenplayText(activeScene.content);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsReadingAloud(false);
    utterance.onerror = () => setIsReadingAloud(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  // Theme styling definitions
  const themeClasses = {
    midnight: 'bg-odyssey-abyss border-forge-cyan/20 text-paper-100',
    parchment: 'bg-[#18130B] border-[#8C6D37]/40 text-[#F5E6CC]',
    paper: 'bg-[#FDFCFA] border-stone-300 text-[#1A1A1A]',
    oled: 'bg-black border-white/20 text-white',
  }[readerTheme];

  const fontSizeClass = {
    compact: 'text-[11px] leading-relaxed',
    standard: 'text-xs leading-relaxed',
    large: 'text-sm leading-loose',
  }[fontSize];

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
          Scenes ({filteredScenes.length})
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
          {/* Header & Character Filter */}
          <div className="p-3.5 border-b border-forge-cyan/15 bg-odyssey-void/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono text-forge-sky uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-bronze-light" />
                <span>Odyssey Waypoints</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-odyssey-depth text-paper-300 border border-forge-cyan/20">
                {filteredScenes.length} / {scenes.length} Scenes
              </span>
            </div>

            {/* Character Scene Filter */}
            {allCharacters.length > 0 && (
              <div className="flex items-center gap-1.5 bg-odyssey-depth/80 px-2.5 py-1.5 rounded-xl border border-forge-cyan/20">
                <Filter className="w-3 h-3 text-forge-sky shrink-0" />
                <select
                  value={selectedCharacterFilter}
                  onChange={(e) => setSelectedCharacterFilter(e.target.value)}
                  className="bg-transparent text-[11px] font-mono text-paper-200 focus:outline-none w-full cursor-pointer"
                >
                  <option value="all" className="bg-odyssey-abyss text-paper-100">Filter: All Characters</option>
                  {allCharacters.map((c) => (
                    <option key={c} value={c} className="bg-odyssey-abyss text-paper-100">
                      Character: {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Scene List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredScenes.map((scene) => {
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

            {filteredScenes.length === 0 && (
              <div className="p-6 text-center text-paper-400 text-xs">
                No scenes found for {selectedCharacterFilter}.
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
          <div className="px-4 sm:px-6 py-2.5 border-b border-forge-cyan/15 bg-odyssey-abyss/90 flex flex-wrap items-center justify-between gap-2.5">
            {/* Scene Info & Homeric Waypoint Banner */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-bronze-light bg-bronze/10 px-2.5 py-1 rounded-lg border border-bronze/30 font-bold truncate max-w-[210px] sm:max-w-none">
                <Ship className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{waypoint.name}</span>
              </div>
              <span className="text-paper-500 hidden sm:inline">|</span>
              <span className="text-xs font-mono text-paper-300 uppercase hidden sm:inline">
                SCENE {activeScene?.sceneNumber || 1} • Pg {activeScene?.pageNumber || 1}
              </span>
            </div>

            {/* Custom Reader Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Audio Table Read */}
              <button
                onClick={toggleTableRead}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isReadingAloud
                    ? 'bg-forge-ocean text-paper-50 border-forge-cyan shadow-glow-cyan animate-pulse'
                    : 'bg-odyssey-depth/60 text-paper-300 border-paper-500/20 hover:border-forge-cyan/40'
                }`}
                title="Live Scene Voice Table Read"
              >
                {isReadingAloud ? <Volume2 className="w-3.5 h-3.5 text-forge-cyan" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{isReadingAloud ? 'Reading...' : 'Table Read'}</span>
              </button>

              {/* Theme Switcher */}
              <div className="flex items-center bg-odyssey-depth/80 rounded-lg p-0.5 border border-paper-500/20">
                {(['midnight', 'parchment', 'paper', 'oled'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setReaderTheme(t)}
                    className={`px-2 py-1 text-[10px] font-mono rounded uppercase transition-all ${
                      readerTheme === t
                        ? 'bg-forge-navy text-paper-50 font-bold border border-forge-cyan/30'
                        : 'text-paper-400 hover:text-paper-200'
                    }`}
                    title={`${t} theme`}
                  >
                    {t[0].toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Font Size */}
              <div className="flex items-center bg-odyssey-depth/80 rounded-lg p-0.5 border border-paper-500/20">
                {(['compact', 'standard', 'large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`px-2 py-1 text-[10px] font-mono rounded uppercase transition-all ${
                      fontSize === s
                        ? 'bg-forge-navy text-paper-50 font-bold border border-forge-cyan/30'
                        : 'text-paper-400 hover:text-paper-200'
                    }`}
                    title={`${s} font size`}
                  >
                    {s === 'compact' ? 'S' : s === 'standard' ? 'M' : 'L'}
                  </button>
                ))}
              </div>

              {/* Toggle AI Notes Button */}
              <button
                onClick={() => setShowAINotes(!showAINotes)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  showAINotes
                    ? 'bg-bronze/20 text-bronze-light border-bronze/40'
                    : 'bg-odyssey-depth/60 text-paper-400 border-paper-500/20'
                }`}
                title={showAINotes ? 'Hide AI Story Notes' : 'Show AI Story Notes'}
              >
                {showAINotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">{showAINotes ? 'AI Notes' : 'Clean'}</span>
              </button>

              {/* Rewrite Button */}
              <button
                onClick={() => setActiveNavTab('rewrite')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forge-navy/80 hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/40 transition-all shadow-inner-glow"
              >
                <PenTool className="w-3.5 h-3.5 text-bronze-light" />
                <span className="hidden sm:inline">Rewrite</span>
              </button>

              {/* Download Fountain */}
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
            <div className={`w-full max-w-2xl screenplay-sheet p-6 sm:p-12 rounded-2xl border shadow-2xl relative transition-all duration-300 ${themeClasses}`}>
              {/* Homeric Watermark & Header */}
              <div className="flex justify-between items-center text-xs font-mono opacity-60 mb-8 border-b pb-2">
                <span className="tracking-widest">{sanitizeScreenplayText(activeScript.title).toUpperCase()}</span>
                <span>PAGE {activeScene?.pageNumber || 1}</span>
              </div>

              {/* Clean Screenplay Content Rendered in Courier Prime */}
              <div className={`space-y-4 font-screenplay ${fontSizeClass}`}>
                {activeScene ? (
                  sanitizeScreenplayText(activeScene.content)
                    .split('\n\n')
                    .map((block, idx) => {
                      const trimmed = sanitizeScreenplayText(block.trim());
                      const isSlug = /^(INT\.|EXT\.|INT\/EXT\.|I\/E\.)/i.test(trimmed);

                      if (isSlug) {
                        return (
                          <div key={idx} className="script-slugline flex items-center justify-between group font-bold tracking-wider">
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
                        const isFilteredMatch = selectedCharacterFilter !== 'all' && charName.includes(selectedCharacterFilter);

                        return (
                          <div
                            key={idx}
                            className={`my-4 group relative transition-all ${
                              isFilteredMatch ? 'p-2 rounded-xl bg-bronze/15 border border-bronze/40 shadow-glow-gold' : ''
                            }`}
                          >
                            <div className="script-character text-center font-bold tracking-wider">{charName}</div>
                            {paren && <div className="script-parenthetical text-center italic opacity-75">{paren}</div>}
                            <div className="script-dialogue text-center max-w-[34ch] mx-auto relative">
                              <span>{dial}</span>
                              {showAINotes && (
                                <span
                                  className="inline-flex ml-2 align-middle w-4 h-4 rounded-full bg-bronze/20 border border-bronze text-bronze-light items-center justify-center text-[9px] font-bold shadow-glow-gold cursor-pointer"
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
                  <div className="p-8 text-center opacity-60">No screenplay scene loaded.</div>
                )}
              </div>

              {/* Bottom Scene Paging Controls */}
              <div className="mt-12 pt-4 border-t opacity-60 flex items-center justify-between text-xs font-mono">
                <button
                  disabled={activeSceneIndex <= 1}
                  onClick={() => setActiveSceneIndex(activeSceneIndex - 1)}
                  className="flex items-center gap-1 hover:text-forge-sky disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV SCENE</span>
                </button>
                <span className="font-mono">
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
