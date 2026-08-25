import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Users,
  Sparkles,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const ContinuityEngineView: React.FC = () => {
  const { activeScript, resolveContinuityIssue } = useScript();
  const issues = activeScript.continuityIssues;

  const [selectedIssueId, setSelectedIssueId] = useState<string>(issues[0]?.id || 'cont-1');
  const [resolutionFeedback, setResolutionFeedback] = useState<string | null>(null);

  const selectedIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  const handleResolve = (issueId: string, optionIdx: number) => {
    resolveContinuityIssue(issueId, optionIdx);
    setResolutionFeedback(`Issue successfully resolved & screenplay updated!`);
    setTimeout(() => setResolutionFeedback(null), 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Timeline':
        return Clock;
      case 'Location':
        return MapPin;
      case 'Prop':
        return Package;
      default:
        return Users;
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <ShieldAlert className="w-4 h-4 text-bronze-light" />
            <span>Temporal & Spatio-Logic Continuity Guard</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Continuity Engine & Logic Checker
          </h1>
          <p className="text-xs text-paper-300">
            Scanning character memory, prop states, timeline coordinates, and geographical logic for <span className="text-paper-100 font-semibold">{activeScript.title}</span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ScoreBadge score={issues.filter((i) => !i.resolved).length === 0 ? 99 : 88} label="Continuity Health" size="md" showGoldAccent />
        </div>
      </div>

      {resolutionFeedback && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
          <span>✓ {resolutionFeedback}</span>
        </div>
      )}

      {/* Continuity Issues Grid */}
      {issues.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Issues List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono uppercase text-forge-sky font-semibold">
                Detected Discrepancies ({issues.length})
              </span>
              <span className="text-[10px] text-paper-400 font-mono">
                {issues.filter((i) => i.resolved).length} Resolved
              </span>
            </div>

            <div className="space-y-2">
              {issues.map((issue) => {
                const Icon = getCategoryIcon(issue.category);
                const isSelected = issue.id === selectedIssueId;

                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border text-left ${
                      isSelected
                        ? 'bg-forge-navy/90 border-bronze shadow-glow-gold/20 ring-1 ring-bronze'
                        : issue.resolved
                        ? 'bg-odyssey-depth/40 opacity-70 border-emerald-500/20'
                        : 'bg-odyssey-depth/60 hover:bg-odyssey-trench border-forge-cyan/15 hover:border-forge-cyan/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-forge-sky" />
                        <span className="text-[10px] font-mono uppercase font-bold text-forge-sky">
                          {issue.category}
                        </span>
                      </div>

                      {issue.resolved ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>RESOLVED</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                          {issue.severity}
                        </span>
                      )}
                    </div>

                    <h3 className="font-cinzel text-xs font-bold text-paper-100 mb-1">
                      {issue.title}
                    </h3>
                    <p className="text-[11px] text-paper-300 line-clamp-2">
                      {issue.description}
                    </p>
                    <div className="text-[10px] font-mono text-paper-400 mt-2">
                      Between Scene {issue.firstScene} & Scene {issue.secondScene}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Issue Deep Diagnostic & 1-Click Resolvers */}
          <div className="lg:col-span-7">
            {selectedIssue ? (
              <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-6 shadow-glass-card">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-forge-cyan/15">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold tracking-wider">
                      CONTINUITY ALERT • {selectedIssue.category.toUpperCase()}
                    </span>
                    <h2 className="font-cinzel text-lg font-bold text-paper-50">{selectedIssue.title}</h2>
                  </div>

                  <span className="text-xs font-mono text-paper-400">
                    Scene {selectedIssue.firstScene} ↔ Scene {selectedIssue.secondScene}
                  </span>
                </div>

                {/* Evidence Comparison Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-forge-sky font-bold">
                      Evidence A (Scene {selectedIssue.firstScene})
                    </div>
                    <blockquote className="text-xs font-screenplay text-paper-100 italic">
                      "{selectedIssue.evidenceA}"
                    </blockquote>
                  </div>

                  <div className="p-4 rounded-xl bg-odyssey-abyss/80 border border-red-500/25 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-red-400 font-bold">
                      Evidence B (Scene {selectedIssue.secondScene})
                    </div>
                    <blockquote className="text-xs font-screenplay text-paper-100 italic">
                      "{selectedIssue.evidenceB}"
                    </blockquote>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-odyssey-void/60 border border-paper-500/15 text-xs text-paper-200">
                  <strong className="text-paper-100 font-medium">Diagnostic: </strong>
                  {selectedIssue.description}
                </div>

                {/* Resolution Options */}
                <div className="space-y-3 pt-2 border-t border-forge-cyan/15">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel text-xs font-bold text-paper-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-bronze-light" />
                      <span>Proposed Craft Resolutions (1-Click Screenplay Patch)</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {selectedIssue.resolutionOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-odyssey-trench/70 border border-forge-cyan/20 space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1">
                          <div className="font-cinzel text-xs font-bold text-paper-100">
                            Option {idx + 1}: {opt.optionTitle}
                          </div>
                          <p className="font-screenplay text-xs text-paper-200 bg-odyssey-void/80 p-2.5 rounded-lg border border-paper-500/10">
                            Patch: "{opt.proposedPatch}"
                          </p>
                          <p className="text-[11px] text-paper-400 italic">
                            Impact: {opt.impactDescription}
                          </p>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => handleResolve(selectedIssue.id, idx)}
                            disabled={selectedIssue.resolved}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-forge-navy hover:bg-forge-ocean text-paper-50 border border-forge-cyan/40 disabled:opacity-50 transition-all shadow-inner-glow"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-bronze-light" />
                            <span>{selectedIssue.resolved ? 'Applied' : 'Resolve & Patch Script'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-odyssey-depth/40 border border-forge-cyan/20 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="font-cinzel text-lg font-bold text-paper-50">Zero Continuity Conflicts</h3>
          <p className="text-xs text-paper-300 max-w-md mx-auto">
            Timeline parameters, prop tracking, and character memory vectors across all {activeScript.scenes.length} scenes are in harmony.
          </p>
        </div>
      )}
    </div>
  );
};
