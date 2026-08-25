import React from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Scroll,
  Users,
  MessageSquareQuote,
  ShieldAlert,
  Flame,
  Play,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    setIsLandingPage,
    setIsUploadModalOpen,
    setActiveNavTab,
  } = useScript();

  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden text-paper-100">
      {/* Background Decorative Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-forge-ocean/20 rounded-full blur-[160px]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-bronze/10 rounded-full blur-[140px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        {/* Odyssey System Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-odyssey-depth/80 border border-forge-cyan/30 text-xs font-mono tracking-widest uppercase text-forge-sky shadow-glow-cyan/15 animate-fadeIn">
          <Compass className="w-3.5 h-3.5 text-bronze-light animate-spin-slow" />
          <span>The Odyssey Screenplay Intelligence System</span>
        </div>

        {/* Major Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-paper-50">
            Your screenplay deserves a <span className="bg-gradient-to-r from-paper-50 via-forge-sky to-bronze-light bg-clip-text text-transparent">second reader.</span>
          </h1>
          <p className="font-sans text-base sm:text-xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
            ScriptForge understands your story, finds what isn't working, and helps you rewrite with precision.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-sm font-bold border border-forge-cyan/50 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-bronze-light" />
            <span>Analyze Your Script</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsLandingPage(false);
              setActiveNavTab('studio');
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-odyssey-depth/80 hover:bg-odyssey-trench text-paper-200 hover:text-paper-50 text-sm font-semibold border border-forge-cyan/20 hover:border-forge-cyan/40 shadow-inner-glow transition-all"
          >
            <Play className="w-3.5 h-3.5 text-forge-cyan" />
            <span>Explore ScriptForge Studio</span>
          </button>
        </div>

        {/* The 6 Pillars Ribbon */}
        <div className="pt-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-widest text-paper-400 uppercase py-2.5 px-6 rounded-2xl bg-odyssey-depth/40 border border-forge-cyan/15 backdrop-blur-md">
            <span>STRUCTURE</span>
            <span className="text-bronze">•</span>
            <span>CHARACTER</span>
            <span className="text-bronze">•</span>
            <span>DIALOGUE</span>
            <span className="text-bronze">•</span>
            <span>PACING</span>
            <span className="text-bronze">•</span>
            <span>THEME</span>
            <span className="text-bronze">•</span>
            <span>VISUAL STORYTELLING</span>
          </div>
        </div>

        {/* Hero Visual: Floating 3D Screenplay Blueprint with Live Annotations */}
        <div className="relative pt-12 pb-6 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-odyssey-depth/90 via-odyssey-abyss to-odyssey-void border border-forge-cyan/30 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl overflow-hidden text-left">
            {/* Top Bar of Studio */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-forge-cyan/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-paper-400">THE_LAST_TRAIN_DRAFT_4.fountain</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-forge-sky">STORY INDEX: 82/100</span>
                <span className="px-2 py-0.5 rounded bg-bronze/15 border border-bronze/30 text-[10px] font-cinzel font-bold text-bronze-light">
                  RECOMMEND
                </span>
              </div>
            </div>

            {/* Screenplay Mock Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Screenplay Page Text */}
              <div className="lg:col-span-7 font-screenplay text-xs leading-relaxed space-y-3 bg-odyssey-void/60 p-5 rounded-xl border border-forge-cyan/10">
                <div className="text-forge-sky font-bold">EXT. RAILYARD TERMINAL - NIGHT</div>
                <p className="text-paper-300">A relentless coastal downpour lashing against rusting freight cars. The rain turns the gravel into black glass.</p>
                <div className="text-forge-sky font-bold mt-4">INT. PASSENGER CAR 3 - CONTINUOUS</div>
                <div className="text-bronze-light font-bold text-center">ARJUN</div>
                <div className="text-paper-400 text-center italic">(without looking up)</div>
                <div className="text-paper-100 max-w-[28ch] mx-auto">You almost missed it.</div>
                <div className="text-bronze-light font-bold text-center mt-2">ELENA</div>
                <div className="text-paper-100 max-w-[28ch] mx-auto">I wasn't sure I wanted to catch it.</div>
              </div>

              {/* AI Story Consultant Overlays */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-3.5 rounded-xl bg-odyssey-trench/90 border border-forge-cyan/30 space-y-1.5 shadow-inner-glow">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-forge-sky uppercase font-bold">Subtext Analysis</span>
                    <span className="text-[10px] font-mono text-emerald-400">Score 92/100</span>
                  </div>
                  <p className="text-xs text-paper-200">
                    <strong className="text-paper-50">High Dramatic Friction:</strong> Arjun uses timetable punctuality to conceal his panic that Elena would abandon him forever.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-bronze/10 border border-bronze/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-bronze-light uppercase font-bold">Continuity Guard</span>
                    <span className="text-[10px] font-mono text-bronze">Alert Verified</span>
                  </div>
                  <p className="text-xs text-paper-200">
                    Prop consistency matched: The silver coin introduced in Scene 1 correctly transfers ownership in Scene 4.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="odyssey-divider max-w-md mx-auto" />
        <div className="text-xs font-mono uppercase tracking-widest text-bronze-light font-bold">
          The Central Philosophy
        </div>
        <blockquote className="font-cinzel text-2xl sm:text-4xl text-paper-50 font-bold max-w-3xl mx-auto leading-snug">
          "Don't just write better pages. Understand why they work."
        </blockquote>
        <p className="text-sm text-paper-300 max-w-xl mx-auto leading-relaxed">
          ScriptForge doesn't replace your creative voice. It gives you the structural mastery, subtext diagnostics, and psychological insights of a Hollywood veteran sitting right beside your keyboard.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-paper-50">
            A Complete Screenplay Intelligence Suite
          </h2>
          <p className="text-xs sm:text-sm text-paper-400 max-w-lg mx-auto">
            From the initial treatment to final draft polish, navigate your narrative with navigational precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Scroll,
              title: 'Screenplay Studio',
              desc: '3-column workspace with authentic Courier formatting, scene navigation, and live inline craft annotations.',
              action: () => { setIsLandingPage(false); setActiveNavTab('studio'); },
            },
            {
              icon: Compass,
              title: 'Story Intelligence',
              desc: 'Interactive 3-Act and Save-the-Cat beat timeline with visual tension nodes and dramatic turning points.',
              action: () => { setIsLandingPage(false); setActiveNavTab('story'); },
            },
            {
              icon: Users,
              title: 'Character Dossiers',
              desc: 'Deep psychological profiling: external goals, core fears, dialogue cadence, and visual arc graphs.',
              action: () => { setIsLandingPage(false); setActiveNavTab('characters'); },
            },
            {
              icon: MessageSquareQuote,
              title: 'Dialogue Diagnostics',
              desc: 'Subtext audits, on-the-nose warnings, and alternative line generators that strictly preserve character voice.',
              action: () => { setIsLandingPage(false); setActiveNavTab('dialogue'); },
            },
            {
              icon: Flame,
              title: 'Rewrite Studio',
              desc: 'Side-by-side original vs. rewrite diff workshop with presets to raise stakes, deepen subtext, and tighten pacing.',
              action: () => { setIsLandingPage(false); setActiveNavTab('rewrite'); },
            },
            {
              icon: ShieldAlert,
              title: 'Continuity Engine',
              desc: 'Automated detection of timeline contradictions, prop discrepancies, and character knowledge mismatches with 1-click patches.',
              action: () => { setIsLandingPage(false); setActiveNavTab('continuity'); },
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={feat.action}
                className="p-6 rounded-2xl bg-odyssey-depth/60 hover:bg-odyssey-trench/80 border border-forge-cyan/20 hover:border-forge-cyan/50 backdrop-blur-md cursor-pointer transition-all duration-300 group hover:shadow-glow-cyan/20"
              >
                <div className="w-10 h-10 rounded-xl bg-forge-navy/80 border border-forge-cyan/30 flex items-center justify-center mb-4 group-hover:border-bronze transition-all">
                  <Icon className="w-5 h-5 text-forge-sky group-hover:text-bronze-light transition-colors" />
                </div>
                <h3 className="font-cinzel text-base font-bold text-paper-100 mb-2 group-hover:text-forge-sky transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-paper-300 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-odyssey-depth to-odyssey-void border border-forge-cyan/30 shadow-glow-navy space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-forge-navy border border-bronze/40 flex items-center justify-center">
            <Compass className="w-6 h-6 text-bronze-light" />
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-black text-paper-50">
            Begin your odyssey today.
          </h2>
          <p className="text-xs sm:text-sm text-paper-300 max-w-md mx-auto">
            Upload your draft in seconds or test with our pre-loaded award-caliber screenplays.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/50 shadow-glow-cyan transition-all"
            >
              Analyze Your Screenplay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
