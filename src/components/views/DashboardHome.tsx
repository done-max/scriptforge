import React from 'react';
import { useScript } from '../../context/ScriptContext';
import { useAuth } from '../../context/AuthContext';
import {
  Upload,
  Scroll,
  Mail,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const DashboardHome: React.FC = () => {
  const {
    scripts,
    activeScript,
    setActiveScriptById,
    setActiveNavTab,
    setIsUploadModalOpen,
  } = useScript();

  const { user, setIsEmailModalOpen } = useAuth();

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-odyssey-depth via-odyssey-abyss to-odyssey-void border border-forge-cyan/25 shadow-glass-card overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-forge-ocean/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
              <Compass className="w-4 h-4 text-bronze-light animate-spin-slow" />
              <span>Screenplay Intelligence Studio</span>
            </div>
            <h1 className="font-cinzel font-bold text-2xl sm:text-4xl text-paper-50 tracking-tight">
              Welcome back, @{user?.username || 'Writer'}.
            </h1>
            <p className="font-sans text-xs sm:text-sm text-paper-300 italic">
              "Don't just write better pages. Understand why they work."
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4 text-bronze-light" />
              <span>+ Upload Script</span>
            </button>

            <button
              onClick={() => setActiveNavTab('studio')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-odyssey-depth hover:bg-odyssey-trench text-paper-100 text-xs font-bold border border-forge-cyan/25 transition-all shadow-inner-glow"
            >
              <Scroll className="w-4 h-4 text-forge-sky" />
              <span>Read "{activeScript.title}"</span>
            </button>
          </div>
        </div>

        {/* 3 Easy Steps for Beginners */}
        <div className="mt-8 pt-6 border-t border-forge-cyan/15">
          <div className="text-[11px] font-mono uppercase text-bronze-light font-bold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How ScriptForge Works in 3 Simple Steps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="p-4 rounded-2xl bg-odyssey-void/70 hover:bg-odyssey-depth/80 border border-forge-cyan/15 hover:border-forge-cyan/40 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="text-xs font-mono font-bold text-forge-sky flex items-center justify-between">
                <span>01. UPLOAD YOUR SCRIPT</span>
                <Upload className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-paper-300">
                Drop your PDF, Fountain, TXT, or FDX file. Our AI parses scenes, dialogue, and characters in seconds.
              </p>
            </div>

            <div
              onClick={() => setActiveNavTab('studio')}
              className="p-4 rounded-2xl bg-odyssey-void/70 hover:bg-odyssey-depth/80 border border-forge-cyan/15 hover:border-forge-cyan/40 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="text-xs font-mono font-bold text-bronze-light flex items-center justify-between">
                <span>02. READ IN COURIER PRIME</span>
                <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-paper-300">
                Read your screenplay in authentic industry typography with inline AI subtext and craft annotations.
              </p>
            </div>

            <div
              onClick={() => setActiveNavTab('rewrite')}
              className="p-4 rounded-2xl bg-odyssey-void/70 hover:bg-odyssey-depth/80 border border-forge-cyan/15 hover:border-forge-cyan/40 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-between">
                <span>03. REWRITE WITH AI CONSULTANT</span>
                <Sparkles className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs text-paper-300">
                Tighten pacing, escalate dramatic tension, and deepen subtext while preserving your character voice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Screenplay Library Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-paper-50 tracking-wider">
              Your Screenplay Projects
            </h2>
            <p className="text-xs text-paper-400">
              Select any screenplay to read, edit, or analyze.
            </p>
          </div>

          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-bronze-light hover:underline font-mono"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Check Dispatched Login Emails →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scripts.map((script) => {
            const isSelected = script.id === activeScript.id;
            return (
              <div
                key={script.id}
                onClick={() => {
                  setActiveScriptById(script.id);
                  setActiveNavTab('studio');
                }}
                className={`p-6 rounded-3xl bg-odyssey-depth/70 hover:bg-odyssey-trench border cursor-pointer transition-all duration-300 group shadow-glass-card flex flex-col justify-between ${
                  isSelected
                    ? 'border-forge-cyan ring-1 ring-forge-cyan shadow-glow-cyan/20'
                    : 'border-forge-cyan/15 hover:border-forge-cyan/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-odyssey-abyss text-forge-sky border border-forge-cyan/30 font-semibold">
                      {script.genre}
                    </span>
                    <ScoreBadge score={script.storyIntelligenceScore} size="sm" showGoldAccent />
                  </div>

                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-paper-50 group-hover:text-forge-sky transition-colors">
                      {script.title}
                    </h3>
                    <div className="text-xs text-paper-400">
                      by <span className="text-paper-200">{script.author}</span> • {script.pageCount} Pages • {script.scenes?.length || 1} Scenes
                    </div>
                  </div>

                  <p className="text-xs text-paper-300 line-clamp-3 italic leading-relaxed">
                    "{script.logline}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-paper-500/10 flex items-center justify-between text-xs">
                  <span className="text-paper-400 font-mono text-[11px]">{script.lastEdited || 'Recent'}</span>
                  <div className="flex items-center gap-1 font-semibold text-forge-sky group-hover:translate-x-1 transition-transform">
                    <span>Read Full Script</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
