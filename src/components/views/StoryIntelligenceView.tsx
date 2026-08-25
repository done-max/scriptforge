import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Compass,
  ArrowRight,
  Layers,
  Ship,
} from 'lucide-react';
import { CraftCard } from '../common/CraftCard';
import { ScoreBadge } from '../common/ScoreBadge';

export const StoryIntelligenceView: React.FC = () => {
  const { activeScript, setActiveSceneIndex, setActiveNavTab } = useScript();
  const beats = activeScript.storyBeats;

  const [selectedBeatId, setSelectedBeatId] = useState<string>(beats[0]?.id || 'beat-1');

  // The 8 Homeric Odyssey Waypoints
  const ODYSSEY_WAYPOINTS = [
    {
      symbol: '🏛️',
      name: 'I. Departure from Ithaca',
      meaning: 'The Status Quo & The Ordinary World',
      description: 'The protagonist leaves their familiar shore behind. The initial inciting incident makes staying impossible.',
    },
    {
      symbol: '🌿',
      name: 'II. The Lotus Eaters',
      meaning: 'The Temptation of Stagnation & Apathy',
      description: 'Characters encounter the illusion of comfort that threatens to extinguish their true narrative mission.',
    },
    {
      symbol: '👁️',
      name: 'III. The Cyclops Cave',
      meaning: 'The First Immovable Obstacle (Point of No Return)',
      description: 'A physical or ideological titan traps the protagonist. Survival requires wit and permanent sacrifice.',
    },
    {
      symbol: '💨',
      name: 'IV. The Winds of Aeolus',
      meaning: 'False Victory & Premature Hope',
      description: 'Home seems within grasp, but character pride or betrayal unleashes a tempest that drives them into the abyss.',
    },
    {
      symbol: '🔮',
      name: 'V. Circe’s Metamorphosis',
      meaning: 'Internal Transformation & Unmasking',
      description: 'The illusion is stripped away. Characters are forced to confront their bestial impulses and true wounds.',
    },
    {
      symbol: '⚡',
      name: 'VI. The Underworld (Nekuia)',
      meaning: 'The Dark Night of the Soul & The Prophecy',
      description: 'Odysseus speaks with Tiresias. The character confronts death and learns the non-negotiable truth of their destiny.',
    },
    {
      symbol: '🧜‍♀️',
      name: 'VII. Scylla & Charybdis',
      meaning: 'The Impossible Dilemma (Midpoint to Crisis)',
      description: 'Steering between two fatal choices where loss is guaranteed. Character tests their willingness to endure grief.',
    },
    {
      symbol: '🏹',
      name: 'VIII. The Bow of Odysseus',
      meaning: 'The Climax & Reclaiming the Throne',
      description: 'Only the true hero can string the great bow. Character synthesizes growth and takes decisive moral action.',
    },
  ];

  const selectedBeat = beats.find((b) => b.id === selectedBeatId) || beats[0];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <Compass className="w-4 h-4 text-bronze-light animate-spin-slow" />
            <span>The Odyssey Narrative Astrolabe & Macro Structure</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Story Intelligence & The 8 Odyssey Waypoints
          </h1>
          <p className="text-xs text-paper-300">
            Mapping Homeric turning points, 3-Act orchestration, and structural dramaturgy for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={activeScript.categoryScores.structure} label="Structure Index" size="md" showGoldAccent />
        </div>
      </div>

      {/* Cinematic Horizontal Beat Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-widest text-forge-sky font-semibold flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-bronze-light" />
            <span>Cinematic Beat Nodes (Save the Cat & Odyssey Chart)</span>
          </div>
          <div className="text-[11px] text-paper-400 font-mono">
            {beats.length} Strategic Nodes Mapped
          </div>
        </div>

        {/* Scrollable Timeline Track */}
        <div className="p-6 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/20 overflow-x-auto shadow-inner-glow">
          <div className="min-w-[760px] relative pb-6 pt-4">
            {/* The Connecting Golden Blue Cable */}
            <div className="absolute top-10 left-6 right-6 h-0.5 bg-gradient-to-r from-forge-cyan via-bronze to-forge-sky opacity-40" />

            {/* Nodes */}
            <div className="flex items-start justify-between relative z-10">
              {beats.map((beat, idx) => {
                const isSelected = beat.id === selectedBeatId;
                const isClimax = beat.beatName.toLowerCase().includes('climax') || beat.beatName.toLowerCase().includes('midpoint');

                return (
                  <div
                    key={beat.id}
                    onClick={() => setSelectedBeatId(beat.id)}
                    className="flex flex-col items-center cursor-pointer group max-w-[120px] text-center"
                  >
                    {/* Beat Node Circle */}
                    <div
                      className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-forge-navy to-forge-ocean border-2 border-bronze-light shadow-glow-gold scale-110'
                          : isClimax
                          ? 'bg-odyssey-abyss border-2 border-bronze/60 group-hover:border-bronze-light'
                          : 'bg-odyssey-abyss border-2 border-forge-cyan/40 group-hover:border-forge-sky group-hover:shadow-glow-cyan'
                      }`}
                    >
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-bronze-light' : 'text-paper-200'}`}>
                        0{idx + 1}
                      </span>

                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-bronze-light animate-ping" />
                      )}
                    </div>

                    {/* Act & Scene Tags */}
                    <div className="mt-3 space-y-0.5">
                      <div className={`font-cinzel text-[11px] font-bold leading-tight truncate ${isSelected ? 'text-bronze-light' : 'text-paper-200 group-hover:text-forge-sky'}`}>
                        {beat.beatName}
                      </div>
                      <div className="text-[10px] font-mono text-paper-400">
                        Scene {beat.actualScene} • Pg {beat.targetPage}
                      </div>
                      <div className="text-[9px] font-mono text-forge-sky uppercase">
                        {beat.act}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Beat Deep-Dive Breakdown */}
      {selectedBeat && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Beat Meta & Dramatic Function */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/30 space-y-4 shadow-glass-card">
              <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                <div>
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold">
                    {selectedBeat.act} Structural Anchor
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-paper-50">
                    {selectedBeat.beatName}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                  {selectedBeat.craftEvaluation}
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <div className="text-[10px] font-mono uppercase text-paper-400 font-semibold mb-1">
                    Dramatic Objective
                  </div>
                  <p className="text-paper-200">{selectedBeat.dramaticFunction}</p>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase text-paper-400 font-semibold mb-1">
                    Screenplay Scene Occurrence
                  </div>
                  <p className="text-paper-300 italic">{selectedBeat.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-forge-cyan/15 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveSceneIndex(selectedBeat.actualScene);
                    setActiveNavTab('studio');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-forge-navy hover:bg-forge-ocean text-paper-50 border border-forge-cyan/40 transition-all shadow-inner-glow"
                >
                  <span>Jump to Scene {selectedBeat.actualScene}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-bronze-light" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Consultant Craft Feedback for Beat */}
          <div className="lg:col-span-7">
            <CraftCard
              title={`${selectedBeat.beatName} — Odyssey Story Diagnosis`}
              category={selectedBeat.act}
              observation={selectedBeat.aiFeedback.observation}
              whyItMatters={selectedBeat.aiFeedback.whyItMatters}
              suggestion={selectedBeat.aiFeedback.suggestion}
              severity="low"
              actionLabel="Refine in Rewrite Studio"
              onApplySuggestion={() => setActiveNavTab('rewrite')}
            />
          </div>
        </div>
      )}

      {/* THE 8 HOMERIC WAYPOINTS OF THE ODYSSEY */}
      <div className="space-y-4 pt-4 border-t border-forge-cyan/15">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs font-mono uppercase text-bronze-light font-bold flex items-center gap-2">
              <Ship className="w-4 h-4 text-bronze" />
              <span>The 8 Mythic Waypoints of the Writer's Voyage</span>
            </div>
            <h2 className="font-cinzel text-lg font-bold text-paper-50">
              The Homeric Screenplay Paradigm
            </h2>
          </div>
          <span className="text-xs font-mono text-paper-400">Classical Dramaturgy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ODYSSEY_WAYPOINTS.map((wp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/15 hover:border-bronze/40 space-y-2.5 transition-all shadow-inner-glow group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{wp.symbol}</span>
                <span className="text-[9px] font-mono text-bronze-light uppercase px-2 py-0.5 rounded bg-bronze/10 border border-bronze/25 font-bold">
                  Waypoint 0{idx + 1}
                </span>
              </div>

              <h3 className="font-cinzel text-sm font-bold text-paper-100 group-hover:text-bronze-light transition-colors">
                {wp.name}
              </h3>

              <div className="text-[11px] font-mono text-forge-sky font-semibold">
                {wp.meaning}
              </div>

              <p className="text-xs text-paper-300 leading-relaxed">
                {wp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
