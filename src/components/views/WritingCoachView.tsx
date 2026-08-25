import React from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const WritingCoachView: React.FC = () => {
  const { setActiveNavTab, setIsAIAssistantOpen } = useScript();

  const PRINCIPLES = [
    {
      title: 'The Law of Subtextual Friction',
      axiom: 'Characters must never say what they feel—only what they want the other person to do.',
      example: 'Instead of saying "I am devastated you missed the funeral", say "Did the coat keep the rain out in Rotterdam?"',
      category: 'Dialogue Craft',
    },
    {
      title: 'Physical Armor & Prop Storytelling',
      axiom: 'Every high-stakes scene should feature a physical object that acts as an emotional lightning rod.',
      example: 'Arjun rolling his silver coin or Elena placing her violin case as a physical wall between them on the train seat.',
      category: 'Visual Storytelling',
    },
    {
      title: 'The Midpoint Reversal Anchor',
      axiom: 'At page 55 (or 50% runtime), the nature of the stakes must invert from external survival to inescapable moral reckoning.',
      example: 'The discovery of the unsent prison letters transforms Arjun from an indifferent deadbeat into a tragic political victim.',
      category: 'Structure',
    },
    {
      title: 'The Ticking Clock Compression',
      axiom: 'Without a concrete temporal deadline, characters will talk instead of act. Always define the moment the train hits the terminal.',
      example: '90 minutes until the final harbor stop before the ferry leaves at dawn.',
      category: 'Pacing',
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <GraduationCap className="w-4 h-4 text-bronze-light" />
            <span>Hollywood Dramaturgy & Film School Workshop</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            ScriptForge Writing Coach & Masterclass
          </h1>
          <p className="text-xs text-paper-300">
            "Don't just write better pages. Understand why they work."
          </p>
        </div>

        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan transition-all"
        >
          <Sparkles className="w-4 h-4 text-bronze-light" />
          <span>Consult Senior AI Advisor</span>
        </button>
      </div>

      {/* Craft Principles Grid */}
      <div className="space-y-4">
        <h2 className="font-cinzel text-lg font-bold text-paper-50 tracking-wider">
          Fundamental Screenwriting Axioms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRINCIPLES.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-3 shadow-inner-glow"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-forge-navy text-forge-sky border border-forge-cyan/30 font-semibold">
                  {p.category}
                </span>
                <span className="text-[10px] font-mono text-bronze-light font-bold">Rule 0{idx + 1}</span>
              </div>

              <h3 className="font-cinzel text-base font-bold text-paper-50">{p.title}</h3>

              <p className="text-xs text-paper-200 leading-relaxed font-medium">
                {p.axiom}
              </p>

              <div className="p-3 rounded-xl bg-odyssey-abyss/80 border border-paper-500/10 text-xs text-paper-300 italic">
                <strong className="text-bronze-light not-italic">Application: </strong>{p.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Film School Exercise */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-odyssey-depth to-odyssey-void border border-bronze/30 space-y-4 shadow-glass-card">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-bronze-light" />
          <h3 className="font-cinzel text-base font-bold text-paper-50">
            Interactive Craft Exercise: The Unspoken Confession
          </h3>
        </div>

        <p className="text-xs text-paper-300 leading-relaxed max-w-3xl">
          Take Scene 2 of your current screenplay. Identify the line where your protagonist is most honest about their fear. Delete the line. Replace it with a physical action involving a prop or a sudden subject change regarding weather or logistics.
        </p>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveNavTab('rewrite')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-inner-glow transition-all"
          >
            <span>Launch Exercise in Rewrite Studio</span>
            <ArrowRight className="w-4 h-4 text-bronze-light" />
          </button>
        </div>
      </div>
    </div>
  );
};
