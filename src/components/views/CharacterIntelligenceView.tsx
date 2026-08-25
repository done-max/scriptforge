import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Users,
  Compass,
  Heart,
  Flame,
  Shield,
  MessageSquare,
  Activity,
  Sparkles,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const CharacterIntelligenceView: React.FC = () => {
  const { activeScript } = useScript();
  const characters = activeScript.characters;

  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(characters[0]?.id || 'char-1');

  const selectedChar = characters.find((c) => c.id === selectedCharacterId) || characters[0];

  const HOMERIC_ARCHETYPES = [
    {
      name: 'The Wayfarer (Odysseus)',
      role: 'The Protagonist navigating impossible crossing',
      trait: 'Tactical wit, deep internal wound, driven by the desire to return home.',
    },
    {
      name: 'The Mentor (Athena)',
      role: 'The Divine Catalyst & Conscience',
      trait: 'Provides strategic insight, challenges character pride, and demands accountability.',
    },
    {
      name: 'The Storm (Poseidon)',
      role: 'The Inescapable Antagonistic Force',
      trait: 'The external titan punishing hubris and blocking the horizon.',
    },
    {
      name: 'The Anchor (Penelope)',
      role: 'The Moral Center & What is at Stake',
      trait: 'The ultimate prize representing peace, fidelity, and true purpose.',
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <Users className="w-4 h-4 text-bronze-light" />
            <span>Homeric Character Archetypes & Psychodynamics</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Character Intelligence & Arc Diagnostics
          </h1>
          <p className="text-xs text-paper-300">
            Internal wounds, external objectives, voice cadence, and dramatic transformation for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={activeScript.categoryScores.character} label="Character Score" size="md" showGoldAccent />
        </div>
      </div>

      {/* Character Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => {
          const isSelected = char.id === selectedCharacterId;
          return (
            <div
              key={char.id}
              onClick={() => setSelectedCharacterId(char.id)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border text-left ${
                isSelected
                  ? 'bg-forge-navy/80 border-forge-cyan shadow-glow-cyan/20 ring-1 ring-forge-cyan'
                  : 'bg-odyssey-depth/60 hover:bg-odyssey-trench border-forge-cyan/15 hover:border-forge-cyan/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-odyssey-void border border-bronze/40 flex items-center justify-center font-cinzel font-bold text-bronze-light text-sm shadow-inner-glow">
                    {char.name.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-paper-100">{char.name}</h3>
                    <span className="text-[10px] font-mono text-forge-sky uppercase font-semibold">{char.role}</span>
                  </div>
                </div>

                <span className="text-xs font-mono px-2 py-0.5 rounded bg-odyssey-abyss text-paper-300 border border-paper-500/20">
                  {char.screenTimePercentage}% Screen Time
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-paper-300">
                <p className="line-clamp-2 italic">
                  <strong className="text-paper-100 font-normal">Arc: </strong>{char.arcSummary}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Character Deep Profile */}
      {selectedChar && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column A: Psychological Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-5 shadow-glass-card">
              <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                <div>
                  <span className="text-[10px] font-mono text-bronze-light uppercase font-bold tracking-wider">
                    Core Character Matrix
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-paper-50">{selectedChar.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-forge-navy border border-forge-cyan/30 text-forge-sky font-semibold">
                  {selectedChar.role}
                </span>
              </div>

              {/* Goal vs Need vs Fear */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/15 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-forge-sky uppercase font-mono">
                    <Compass className="w-3.5 h-3.5" />
                    <span>External Goal (Want)</span>
                  </div>
                  <p className="text-paper-200 leading-relaxed">{selectedChar.externalGoal}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-bronze/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-bronze-light uppercase font-mono">
                    <Heart className="w-3.5 h-3.5 text-bronze" />
                    <span>Internal Need (Wound)</span>
                  </div>
                  <p className="text-paper-200 leading-relaxed">{selectedChar.internalNeed}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-red-500/25 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase font-mono">
                    <Shield className="w-3.5 h-3.5 text-red-400" />
                    <span>Core Fear</span>
                  </div>
                  <p className="text-paper-200 leading-relaxed">{selectedChar.coreFear}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-amber-500/25 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase font-mono">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Stakes of Failure</span>
                  </div>
                  <p className="text-paper-200 leading-relaxed">{selectedChar.stakes}</p>
                </div>
              </div>

              {/* Voice Profile Breakdown */}
              <div className="p-4 rounded-xl bg-odyssey-trench/70 border border-forge-cyan/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-forge-sky uppercase">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Distinct Voice Profile</span>
                  </div>
                  <span className="text-[10px] font-mono text-bronze-light">Voice Authenticity: 94%</span>
                </div>

                <div className="space-y-1.5 text-xs text-paper-200">
                  <div>
                    <strong className="text-paper-100">Cadence & Rhythm: </strong>
                    {selectedChar.voiceProfile.dialogueRhythm}
                  </div>
                  <div>
                    <strong className="text-paper-100">Emotional Defense: </strong>
                    <span className="italic text-paper-300">{selectedChar.voiceProfile.emotionalDefenseMechanism}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Visual Character Arc Graph */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-4 shadow-glass-card">
              <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-forge-sky" />
                  <h3 className="font-cinzel text-sm font-bold text-paper-50">
                    Visual Transformation Arc
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-paper-400">
                  {selectedChar.arcStages.length} Measured Transition Stages
                </span>
              </div>

              <div className="text-xs text-paper-300 italic mb-2">
                Transformation Vector: <span className="text-bronze-light font-semibold not-italic">{selectedChar.arcSummary}</span>
              </div>

              {/* Arc Stages List with Visual Emotional Graph */}
              <div className="space-y-3">
                {selectedChar.arcStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-odyssey-abyss/70 border border-forge-cyan/15 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-forge-navy border border-forge-cyan/40 flex items-center justify-center text-[10px] font-mono font-bold text-forge-sky">
                          {idx + 1}
                        </span>
                        <span className="font-cinzel text-xs font-bold text-paper-100">{stage.stage}</span>
                      </div>
                      <span className="text-[10px] font-mono text-paper-400">
                        Scene {stage.sceneNumber} • Vulnerability Index: {stage.emotionalState}%
                      </span>
                    </div>

                    <p className="text-xs text-paper-300 pl-7 leading-relaxed">{stage.description}</p>

                    {/* Progress visual bar */}
                    <div className="w-full h-1.5 rounded-full bg-odyssey-void overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-forge-cyan to-bronze rounded-full"
                        style={{ width: `${stage.emotionalState}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homeric Archetypes Reference Grid */}
      <div className="space-y-4 pt-4 border-t border-forge-cyan/15">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-bronze-light font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Homeric Character Archetypes Reference</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOMERIC_ARCHETYPES.map((arch, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-odyssey-depth/60 border border-forge-cyan/15 space-y-1.5">
              <div className="font-cinzel text-xs font-bold text-paper-100">{arch.name}</div>
              <div className="text-[11px] font-mono text-forge-sky">{arch.role}</div>
              <p className="text-xs text-paper-300 leading-relaxed">{arch.trait}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
