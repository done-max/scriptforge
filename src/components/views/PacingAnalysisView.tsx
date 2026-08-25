import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const PacingAnalysisView: React.FC = () => {
  const { activeScript, setActiveSceneIndex, setActiveNavTab } = useScript();
  const scenes = activeScript.scenes;

  const [selectedSceneNumber, setSelectedSceneNumber] = useState<number>(1);

  const selectedScene = scenes.find((s) => s.sceneNumber === selectedSceneNumber) || scenes[0];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <Activity className="w-4 h-4 text-bronze-light" />
            <span>Narrative Velocity & Tension Hydrodynamics</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Pacing & Scene-Density Analysis
          </h1>
          <p className="text-xs text-paper-300">
            Visual tension wave, dialogue vs. action ratios, and momentum rhythm for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={activeScript.categoryScores.pacing} label="Pacing Index" size="md" showGoldAccent />
        </div>
      </div>

      {/* Cinematic Scene-Density Wave Graph */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-6 shadow-glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-forge-cyan/15">
          <div>
            <h3 className="font-cinzel text-base font-bold text-paper-50 flex items-center gap-2">
              <Zap className="w-4 h-4 text-bronze-light" />
              <span>Cinematic Scene-Density & Conflict Wave</span>
            </h3>
            <p className="text-xs text-paper-400">
              Interactive scene trajectory measuring conflict intensity, duration, and dialogue mass.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-forge-cyan" />
              <span className="text-paper-300">Conflict Intensity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-bronze" />
              <span className="text-paper-300">Dialogue Density</span>
            </div>
          </div>
        </div>

        {/* The Wave Bars & Timeline */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {scenes.map((scene) => {
              const isSelected = scene.sceneNumber === selectedSceneNumber;
              return (
                <div
                  key={scene.id}
                  onClick={() => setSelectedSceneNumber(scene.sceneNumber)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-forge-navy/90 border-bronze shadow-glow-gold/30 scale-105'
                      : 'bg-odyssey-abyss/80 hover:bg-odyssey-trench border-forge-cyan/15 hover:border-forge-cyan/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="font-bold text-forge-sky">SCN {scene.sceneNumber}</span>
                    <span className="text-paper-400">pg {scene.pageNumber}</span>
                  </div>

                  {/* Dual Bar Graphic */}
                  <div className="h-28 flex items-end justify-center gap-2 my-2 py-1 px-2 bg-odyssey-void/60 rounded-xl border border-paper-500/10">
                    {/* Conflict Bar */}
                    <div className="w-3 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full bg-gradient-to-t from-forge-ocean to-forge-cyan rounded-t-sm transition-all"
                        style={{ height: `${scene.conflictIntensity}%` }}
                        title={`Conflict: ${scene.conflictIntensity}%`}
                      />
                    </div>

                    {/* Dialogue Density Bar */}
                    <div className="w-3 flex flex-col items-center justify-end h-full">
                      <div
                        className="w-full bg-gradient-to-t from-bronze-dark to-bronze rounded-t-sm transition-all"
                        style={{ height: `${scene.dialogueDensity}%` }}
                        title={`Dialogue Density: ${scene.dialogueDensity}%`}
                      />
                    </div>
                  </div>

                  <div className="text-[10px] font-screenplay truncate text-paper-200 mt-1">
                    {scene.location.slice(0, 14)}
                  </div>
                  <div className="text-[9px] font-mono text-bronze-light text-right">
                    ~{scene.estDurationMinutes}m
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Scene Pacing Diagnostics */}
      {selectedScene && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Detailed Scene Metrics */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-4 shadow-glass-card">
              <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                <div>
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold">
                    Scene {selectedScene.sceneNumber} Pacing Profile
                  </span>
                  <h3 className="font-screenplay text-sm font-bold text-paper-50 truncate">
                    {selectedScene.slugline}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setActiveSceneIndex(selectedScene.sceneNumber);
                    setActiveNavTab('studio');
                  }}
                  className="text-xs text-forge-sky hover:underline font-mono flex items-center gap-1"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Sliders Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-paper-300">Conflict Intensity</span>
                    <span className="font-mono text-forge-sky font-bold">{selectedScene.conflictIntensity}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-odyssey-void overflow-hidden">
                    <div className="h-full bg-forge-cyan rounded-full" style={{ width: `${selectedScene.conflictIntensity}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-paper-300">Dialogue Density</span>
                    <span className="font-mono text-bronze-light font-bold">{selectedScene.dialogueDensity}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-odyssey-void overflow-hidden">
                    <div className="h-full bg-bronze rounded-full" style={{ width: `${selectedScene.dialogueDensity}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-paper-300">Action & Kinetic Velocity</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedScene.actionDensity}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-odyssey-void overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${selectedScene.actionDensity}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/15 text-xs text-paper-200 space-y-1">
                <div className="text-[10px] font-mono uppercase text-forge-sky font-bold">Scene Objective Summary</div>
                <p className="italic text-paper-300">{selectedScene.summary}</p>
              </div>
            </div>
          </div>

          {/* Automated Story Pacing Alerts */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-4 shadow-glass-card">
              <div className="flex items-center gap-2 pb-3 border-b border-forge-cyan/15">
                <AlertTriangle className="w-4 h-4 text-bronze-light" />
                <h3 className="font-cinzel text-sm font-bold text-paper-50">
                  Pacing & Momentum Health Alerts
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 font-cinzel">
                    <span>Inciting Momentum Acceleration</span>
                    <span className="text-[10px] font-mono">Scene 1 → Scene 2</span>
                  </div>
                  <p className="text-xs text-paper-200">
                    Conflict intensity rises smoothly from 65% in the opening downpour to 88% upon the carriage entry, delivering immediate audience hook.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-bronze/10 border border-bronze/30 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-bronze-light font-cinzel">
                    <span>Midpoint Dramatic Pivot Respiration</span>
                    <span className="text-[10px] font-mono">Scene 3</span>
                  </div>
                  <p className="text-xs text-paper-200">
                    Dialogue density reaches 88% during the unsent letters reveal. Ensure characters have physical business (handling envelopes) to prevent auditory fatigue.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/20 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-forge-sky font-cinzel">
                    <span>Dawn Decompression Velocity</span>
                    <span className="text-[10px] font-mono">Scene 4</span>
                  </div>
                  <p className="text-xs text-paper-200">
                    Action density increases back to 60% as the characters step onto the harbor pier, providing emotional release and visual closure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
