import React, { useState } from 'react';
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
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  Sliders,
  Zap,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    setIsLandingPage,
    setIsUploadModalOpen,
    setActiveNavTab,
  } = useScript();

  // Interactive Live Sandbox State
  const [sandboxSceneIdx, setSandboxSceneIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const SANDBOX_SCENES = [
    {
      title: 'The Ticking Clock Confrontation',
      slug: 'INT. SUBWAY CAR - 2:14 AM',
      character: 'JULIAN',
      dialogue: 'Look at the schedule. The last ferry leaves in twenty minutes.',
      surface: 'Julian is discussing transit logistics and train arrival times.',
      subtext: 'Julian is terrified that if they reach the harbor, they will never see each other again. The timetable is a shield against admitting love.',
      rewrite: '(quietly, without looking at her)\nThe boat leaves at three. After that, there are no more crossings.',
      technique: 'Temporal displacement: Replaces logistical complaint with irrevocable symbolic finality.',
    },
    {
      title: 'The Unspoken Betrayal',
      slug: 'INT. CORRIDOR - NIGHT',
      character: 'MAYA',
      dialogue: 'I heard you got the promotion in Chicago. Congratulations.',
      surface: 'Polite workplace congratulations between colleagues.',
      subtext: 'Maya knows he took the credit for her investigative report to secure the transfer. The congratulation is an accusation wrapped in silk.',
      rewrite: '(a slow, measured smile)\nChicago in November. You always did hate the cold.',
      technique: 'Siren Subtext: Masks fury behind intimate historical familiarity.',
    },
    {
      title: 'The Impossible Ultimatum',
      slug: 'EXT. PIER - DAWN',
      character: 'CAPTAIN VANCE',
      dialogue: 'If the storm hits the reef, we lose the cargo.',
      surface: 'Nautical weather warning and financial concern.',
      subtext: 'Vance knows the cargo contains smuggled survivors. He is giving his first mate the choice to become a murderer or a mutineer.',
      rewrite: 'The tide is turning, Marcus. In five minutes, the water makes the decision for us.',
      technique: 'The Cyclops Dilemma: Transfers moral responsibility onto an immovable natural force.',
    },
  ];

  const activeSandbox = SANDBOX_SCENES[sandboxSceneIdx];

  const FAQS = [
    {
      q: 'What screenplay formats does ScriptForge support?',
      a: 'ScriptForge supports industry-standard .fountain, .pdf, .txt, .docx, and .fdx (Final Draft) files. Our parser automatically sanitizes text, extracts scenes, sluglines, dialogue, and character arcs with zero encoding glitches.',
    },
    {
      q: 'Does ScriptForge train on my screenplays?',
      a: 'Never. Your screenplays, treatments, and proprietary ideas are completely private and protected under strict Row Level Security (RLS). Your drafts are never shared or used for model training.',
    },
    {
      q: 'How does the Odyssey 8-Waypoint storytelling framework work?',
      a: 'The Odyssey framework bridges classical Homeric structure with modern 3-Act and Save-the-Cat methodologies: Ithaca (Status Quo), Lotus Eaters (Passive Protagonist), Cyclops (Point of No Return), Aeolus (False Victory), Circe (Internal Transformation), Underworld (Dark Night of the Soul), Scylla & Charybdis (The Dilemma), and Bow of Odysseus (The Climax).',
    },
    {
      q: 'Can I export clean PDF coverage reports for producers or film festivals?',
      a: 'Yes! ScriptForge generates 1-click comprehensive studio coverage reports in formatted PDF including Executive Summaries, Loglines, Radar Scores, Strengths, Development Notes, and Market Viability ratings.',
    },
    {
      q: 'Can I use ScriptForge as a solo writer or in a writers’ room?',
      a: 'ScriptForge is engineered for both solo emerging screenwriters and collaborative writers’ rooms, offering instant scene rewrites, dialogue subtext analysis, and continuity checks.',
    },
  ];

  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden text-paper-100 selection:bg-forge-ocean/60 selection:text-forge-light">
      {/* Background Decorative Depth & Constellation Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[900px] pointer-events-none opacity-40">
        <div className="absolute top-16 left-1/4 w-[550px] h-[550px] bg-forge-ocean/20 rounded-full blur-[170px]" />
        <div className="absolute top-36 right-1/4 w-[450px] h-[450px] bg-bronze/15 rounded-full blur-[150px]" />
      </div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative z-10 pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-8">
        {/* Odyssey System Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-odyssey-depth/90 border border-forge-cyan/40 text-xs font-mono tracking-widest uppercase text-forge-sky shadow-glow-cyan/20 animate-fadeIn">
          <Compass className="w-3.5 h-3.5 text-bronze-light animate-spin-slow" />
          <span>The Odyssey Screenplay Intelligence Studio</span>
        </div>

        {/* Major Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-paper-50">
            Your screenplay deserves a <span className="bg-gradient-to-r from-paper-50 via-forge-sky to-bronze-light bg-clip-text text-transparent">second reader.</span>
          </h1>
          <p className="font-sans text-base sm:text-xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
            ScriptForge understands your story, diagnoses flat dialogue and pacing drag, and gives you craft-based explanations for every rewrite.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-sm font-bold border border-forge-cyan/50 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-bronze-light" />
            <span>Analyze Your Screenplay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsLandingPage(false);
              setActiveNavTab('studio');
            }}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-odyssey-depth/80 hover:bg-odyssey-trench text-paper-200 hover:text-paper-50 text-sm font-semibold border border-forge-cyan/30 hover:border-forge-cyan/60 shadow-inner-glow transition-all"
          >
            <Play className="w-4 h-4 text-forge-sky" />
            <span>Launch Writing Studio →</span>
          </button>
        </div>

        {/* The 6 Pillars Ribbon */}
        <div className="pt-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-widest text-paper-400 uppercase py-2.5 px-6 rounded-2xl bg-odyssey-depth/50 border border-forge-cyan/20 backdrop-blur-md">
            <span>STRUCTURE</span>
            <span className="text-bronze">•</span>
            <span>CHARACTER</span>
            <span className="text-bronze">•</span>
            <span>SUBTEXT</span>
            <span className="text-bronze">•</span>
            <span>PACING</span>
            <span className="text-bronze">•</span>
            <span>CONTINUITY</span>
            <span className="text-bronze">•</span>
            <span>AUTEUR TONES</span>
          </div>
        </div>
      </section>

      {/* ================= 2. LIVE INTERACTIVE SCREENPLAY SANDBOX ================= */}
      <section className="relative z-10 mt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-mono uppercase text-bronze-light font-bold flex items-center justify-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Live Demo</span>
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-paper-50">
            See How AI Story Consultant Elevates Scenes in Real Time
          </h2>
        </div>

        {/* Scene Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {SANDBOX_SCENES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSandboxSceneIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                sandboxSceneIdx === idx
                  ? 'bg-forge-navy text-paper-50 border-bronze/50 shadow-glow-gold'
                  : 'bg-odyssey-depth/60 text-paper-400 border-forge-cyan/20 hover:text-paper-200'
              }`}
            >
              Scene {idx + 1}: {s.title}
            </button>
          ))}
        </div>

        {/* Sandbox Glass Box */}
        <div className="rounded-3xl bg-odyssey-depth/90 border border-forge-cyan/30 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          {/* Left: Original Draft in Courier */}
          <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-odyssey-void/80 border border-forge-cyan/15 font-screenplay">
            <div className="flex items-center justify-between text-xs text-forge-sky font-bold">
              <span>{activeSandbox.slug}</span>
              <span className="text-[10px] font-sans font-normal px-2 py-0.5 rounded bg-forge-navy/80 text-paper-300">
                Original Draft
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="script-character text-center text-bronze-light font-bold">
                {activeSandbox.character}
              </div>
              <div className="script-dialogue text-center text-paper-100 max-w-[32ch] mx-auto">
                "{activeSandbox.dialogue}"
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-paper-500/10 text-xs font-sans text-paper-300">
              <strong className="text-forge-sky font-mono uppercase text-[10px] block mb-1">
                Surface Reading:
              </strong>
              {activeSandbox.surface}
            </div>
          </div>

          {/* Right: AI Subtext Diagnosis & Rewrite */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-odyssey-trench/90 border border-forge-cyan/30 space-y-1.5 shadow-inner-glow">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-bronze-light" />
                    <span>Unspoken Subtext Layer</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Tension Index: 92%</span>
                </div>
                <p className="text-xs text-paper-200 leading-relaxed">
                  {activeSandbox.subtext}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bronze/10 border border-bronze/30 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-bronze-light font-bold block">
                  AI Craft Rewrite Recommendation
                </span>
                <div className="font-screenplay text-xs text-paper-50 whitespace-pre-line leading-relaxed">
                  {activeSandbox.rewrite}
                </div>
                <p className="text-[11px] font-sans text-paper-300 italic pt-1 border-t border-bronze/20 mt-2">
                  <strong className="text-bronze-light not-italic font-semibold">Craft Technique: </strong>
                  {activeSandbox.technique}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLandingPage(false);
                setActiveNavTab('rewrite');
              }}
              className="w-full py-2.5 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/40 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Try Full Rewrite Studio with Your Own Scene</span>
              <ArrowRight className="w-3.5 h-3.5 text-bronze-light" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 3. CENTRAL PHILOSOPHY ================= */}
      <section className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
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

      {/* ================= 4. FEATURE GRID ================= */}
      <section className="relative z-10 mt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-paper-50">
            A Complete Screenplay Intelligence Suite
          </h2>
          <p className="text-xs sm:text-sm text-paper-400 max-w-lg mx-auto">
            From the initial beat sheet to festival-ready draft, navigate your narrative with navigational precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Scroll,
              title: 'Screenplay Studio',
              desc: 'Authentic Courier Prime reading with 4 visual themes (Midnight, Parchment, Paper, OLED), scene jump, and table read audio.',
              action: () => { setIsLandingPage(false); setActiveNavTab('studio'); },
            },
            {
              icon: Compass,
              title: 'Story Intelligence',
              desc: 'The 8 Homeric Waypoints of The Odyssey mapped against 3-Act and Save-the-Cat turning points with dramatic tension nodes.',
              action: () => { setIsLandingPage(false); setActiveNavTab('story'); },
            },
            {
              icon: Users,
              title: 'Character Dossiers',
              desc: 'Deep psychological profiling: external wants, internal wounds, voice cadence profiles, and visual transformation arcs.',
              action: () => { setIsLandingPage(false); setActiveNavTab('characters'); },
            },
            {
              icon: MessageSquareQuote,
              title: 'Dialogue Diagnostics',
              desc: 'Subtext audits, Siren Subtext warnings, on-the-nose alerts, and alternative line generation preserving character voice.',
              action: () => { setIsLandingPage(false); setActiveNavTab('dialogue'); },
            },
            {
              icon: Flame,
              title: 'Rewrite Studio & Auteur Tones',
              desc: 'Side-by-side original vs rewrite workshop with auteur tone sliders (Fincher, Sorkin, Nolan, Gerwig, Tarantino).',
              action: () => { setIsLandingPage(false); setActiveNavTab('rewrite'); },
            },
            {
              icon: ShieldAlert,
              title: 'Continuity Guard',
              desc: 'Automated detection of timeline contradictions, prop tracking discrepancies, and character knowledge mismatches.',
              action: () => { setIsLandingPage(false); setActiveNavTab('continuity'); },
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={feat.action}
                className="p-6 rounded-2xl bg-odyssey-depth/60 hover:bg-odyssey-trench/80 border border-forge-cyan/20 hover:border-forge-cyan/50 backdrop-blur-md cursor-pointer transition-all duration-300 group hover:shadow-glow-cyan/20 text-left"
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

      {/* ================= 5. HOLLYWOOD CRAFT TESTIMONIALS ================= */}
      <section className="relative z-10 mt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-mono uppercase text-bronze-light font-bold flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-bronze-light" />
            <span>Screenwriter Testimonials</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-paper-50">
            Trusted by Emerging Screenwriters & Film Fellows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              quote: "The Siren Subtext Warning flagged three scenes where my characters were speaking too plainly. Rewriting with ScriptForge helped me place in the Austin Film Festival second round.",
              author: "Marcus Thorne",
              role: "Nicholl Fellowship Semifinalist",
            },
            {
              quote: "Having the 8 Homeric Waypoints alongside Save-the-Cat gave me the macro clarity I needed to fix my sagging second act in 48 hours.",
              author: "Elena Vance",
              role: "AFI Screenwriting Fellow",
            },
            {
              quote: "The Auteur Tone Presets in the Rewrite Studio are astounding. Shifting a stale dinner scene into Fincher terse subtext elevated the entire draft.",
              author: "Devon Reed",
              role: "Indie Dramatic Feature Writer",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-4 text-left shadow-inner-glow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-bronze-light opacity-60" />
                <p className="text-xs text-paper-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-paper-500/10">
                <div className="font-cinzel text-xs font-bold text-paper-100">{t.author}</div>
                <div className="text-[10px] font-mono text-forge-sky">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. PRICING & FILM SCHOOL PASSES ================= */}
      <section className="relative z-10 mt-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs font-mono uppercase text-bronze-light font-bold">
            Transparent Pricing
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-paper-50">
            Choose Your Screenwriting Pass
          </h2>
          <p className="text-xs sm:text-sm text-paper-400 max-w-md mx-auto">
            Start free, then unlock full unlimited AI consulting and auteur rewrites when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Tier 1: Free Draft Pass */}
          <div className="p-6 rounded-3xl bg-odyssey-depth/60 border border-forge-cyan/20 space-y-6 text-left shadow-inner-glow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-paper-400 font-bold">Free Writer Pass</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-black text-paper-50">$0</span>
                <span className="text-xs text-paper-400 font-mono">/ forever</span>
              </div>
              <p className="text-xs text-paper-300">Perfect for exploring your draft with essential diagnostics.</p>

              <div className="space-y-2.5 pt-4 border-t border-paper-500/10 text-xs text-paper-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3 Screenplay Uploads (.fountain, .pdf, .txt)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clean Courier Prime Screenplay Reader</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Story Score & 8 Waypoint Breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic Subtext & Pacing Warnings</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLandingPage(false);
                setActiveNavTab('studio');
              }}
              className="w-full py-3 rounded-xl bg-odyssey-trench hover:bg-odyssey-navy text-paper-100 text-xs font-bold border border-paper-500/20 transition-all"
            >
              Start Free Draft
            </button>
          </div>

          {/* Tier 2: Odyssey Pro (Featured) */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-forge-navy/90 via-odyssey-depth to-odyssey-abyss border-2 border-bronze-light shadow-glow-gold space-y-6 text-left flex flex-col justify-between relative transform lg:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-bronze text-odyssey-void text-[10px] font-mono uppercase font-black tracking-wider">
              MOST POPULAR
            </div>

            <div className="space-y-4 pt-1">
              <div className="text-xs font-mono uppercase text-bronze-light font-bold">Odyssey Pro Studio</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-black text-paper-50">$19</span>
                <span className="text-xs text-paper-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-paper-300">Complete AI story consulting, auteur tone rewrites, and PDF coverage.</p>

              <div className="space-y-2.5 pt-4 border-t border-forge-cyan/20 text-xs text-paper-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-light shrink-0" />
                  <span><strong>Unlimited</strong> Screenplay Uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-light shrink-0" />
                  <span>Full Rewrite Studio with 5 Auteur Tones</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-light shrink-0" />
                  <span>Subtext Generator & Dialogue Presets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-light shrink-0" />
                  <span>Continuity Engine with 1-Click Patches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-bronze-light shrink-0" />
                  <span>Studio PDF Coverage Report Downloads</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLandingPage(false);
                setActiveNavTab('studio');
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forge-ocean to-forge-azure text-paper-50 text-xs font-black border border-forge-cyan shadow-glow-cyan transition-all"
            >
              Get Odyssey Pro Pass
            </button>
          </div>

          {/* Tier 3: Film School & Writers' Room */}
          <div className="p-6 rounded-3xl bg-odyssey-depth/60 border border-forge-cyan/20 space-y-6 text-left shadow-inner-glow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-paper-400 font-bold">Film School Fellowship</div>
              <div className="flex items-baseline gap-1">
                <span className="font-cinzel text-3xl font-black text-paper-50">$49</span>
                <span className="text-xs text-paper-400 font-mono">/ month</span>
              </div>
              <p className="text-xs text-paper-300">For university writing cohorts, labs, and collaborative writers' rooms.</p>

              <div className="space-y-2.5 pt-4 border-t border-paper-500/10 text-xs text-paper-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Up to 10 Screenwriter Seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Shared Script Library & Versioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom Pedagogical Craft Rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority GPU AI Inference Speed</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLandingPage(false);
                setActiveNavTab('studio');
              }}
              className="w-full py-3 rounded-xl bg-odyssey-trench hover:bg-odyssey-navy text-paper-100 text-xs font-bold border border-paper-500/20 transition-all"
            >
              Fellowship Pass
            </button>
          </div>
        </div>
      </section>

      {/* ================= 7. FAQ ACCORDION ================= */}
      <section className="relative z-10 mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-left space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-mono uppercase text-bronze-light font-bold">
            Got Questions?
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-paper-50">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-odyssey-trench/40 transition-colors"
                >
                  <span className="font-cinzel text-sm font-bold text-paper-100">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-forge-sky" /> : <ChevronDown className="w-4 h-4 text-paper-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-paper-300 leading-relaxed border-t border-paper-500/10 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 8. BOTTOM CTA ================= */}
      <section className="relative z-10 mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-odyssey-depth to-odyssey-void border border-forge-cyan/30 shadow-glow-navy space-y-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-forge-navy border border-bronze/40 flex items-center justify-center">
            <Compass className="w-6 h-6 text-bronze-light" />
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-black text-paper-50">
            Begin your story odyssey today.
          </h2>
          <p className="text-xs sm:text-sm text-paper-300 max-w-md mx-auto">
            Upload your draft in seconds or explore our pre-loaded award-caliber screenplays.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setIsLandingPage(false);
                setActiveNavTab('studio');
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-black border border-forge-cyan/50 shadow-glow-cyan transition-all"
            >
              Launch ScriptForge Studio Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
