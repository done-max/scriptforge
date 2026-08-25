import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Sparkles,
  X,
  Send,
  Compass,
  Lightbulb,
} from 'lucide-react';
import { CraftCard } from '../common/CraftCard';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  craftOutput?: {
    title: string;
    category: string;
    observation: string;
    whyItMatters: string;
    suggestion: string;
  };
}

export const AIAssistantDrawer: React.FC = () => {
  const {
    isAIAssistantOpen,
    setIsAIAssistantOpen,
    activeScript,
    activeScene,
    setActiveNavTab,
  } = useScript();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Good evening. I am ScriptForge Intelligence, your story consultant for "${activeScript.title}". I evaluate your screenplay using Hollywood story structure, subtext density, and character psychodynamics. How can we elevate your pages?`,
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  if (!isAIAssistantOpen) return null;

  const CONTEXTUAL_PROMPTS = [
    { label: "Why isn't this scene working?", prompt: `Why isn't Scene ${activeScene?.sceneNumber || 1} working as effectively as it could?` },
    { label: "Where does the tension drop?", prompt: `Analyze the dramatic tension in "${activeScript.title}" and identify where momentum stalls.` },
    { label: "What's the subtext here?", prompt: `What is the true emotional subtext beneath the dialogue in Scene ${activeScene?.sceneNumber || 1}?` },
    { label: "Show me the weakest scene", prompt: `Identify the scene with the lowest dramatic conflict index and explain how to elevate it.` },
    { label: "Find continuity problems", prompt: `Scan the script for timeline, character memory, or prop inconsistencies.` },
    { label: "Make this scene more visual", prompt: `Convert the verbal dialogue in Scene ${activeScene?.sceneNumber || 1} into visceral visual storytelling.` },
    { label: "Give 3 stronger endings", prompt: `Suggest three alternate climactic resolutions that heighten thematic resonance.` },
    { label: "Continue from here", prompt: `Generate the next sequential story beat following Scene ${activeScene?.sceneNumber || 1}.` },
  ];

  const handleSendPrompt = (promptText: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: promptText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      let craftResp: {
        title: string;
        category: string;
        observation: string;
        whyItMatters: string;
        suggestion: string;
      };

      const q = promptText.toLowerCase();

      if (q.includes('continuity')) {
        craftResp = {
          title: 'Continuity & Temporal Audit',
          category: 'Continuity Engine',
          observation: `Detected a temporal discrepancy between the 11:58 PM departure clock in Scene 1 and the 7:00 AM dawn arrival in Scene 4 without an on-screen mechanical delay explanation.`,
          whyItMatters: `Audience suspension of disbelief weakens when physical space-time parameters contradict without dramatic intention.`,
          suggestion: `Introduce a 1-line conductor radio announcement regarding a switch track holdover, or calibrate the opening timestamp to 04:45 AM.`,
        };
      } else if (q.includes('tension') || q.includes('weakest')) {
        craftResp = {
          title: 'Dramatic Tension Arc Audit',
          category: 'Pacing & Momentum',
          observation: `In Scene ${activeScene?.sceneNumber || 2}, dialogue friction plateaus between lines 3 and 6 as both characters state their grievances openly rather than attacking each other\'s defense mechanisms.`,
          whyItMatters: `When characters state what they feel rather than what they want, dramatic tension diffuses into melodrama.`,
          suggestion: `Have Elena attack Arjun\'s physical routine (the rolling coin or his damp coat) instead of directly referencing the funeral timeline.`,
        };
      } else if (q.includes('visual') || q.includes('more visual')) {
        craftResp = {
          title: 'Visual Storytelling Transmutation',
          category: 'Visual Craft',
          observation: `The scene relies on 70% verbal exchange to establish emotional distance.`,
          whyItMatters: `Cinema is a visual medium where an actor\'s interaction with the environment communicates ten times faster than dialogue.`,
          suggestion: `Have Arjun deliberately slide the damp coin across the wet vinyl divider, forcing Elena to either accept the silver or push it back into the dark.`,
        };
      } else if (q.includes('ending') || q.includes('resolution')) {
        craftResp = {
          title: 'Alternative Climactic Resolutions',
          category: 'Structure & Theme',
          observation: `The current resolution achieves quiet catharsis at dawn, but can explore differing thematic trajectories.`,
          whyItMatters: `The climax is the philosophical argument of your entire screenplay.`,
          suggestion: `Option 1: The Departed Ferry (They miss the boat voluntarily to finish the conversation). Option 2: The Coin in the Deep (Elena drops the coin into the harbor salt water, signaling clean break). Option 3: Shared Silence (Fade out before the coffee is poured).`,
        };
      } else {
        craftResp = {
          title: `Scene ${activeScene?.sceneNumber || 1} Craft Diagnosis`,
          category: 'Story Intelligence',
          observation: `Scene ${activeScene?.sceneNumber || 1} establishes strong sensory isolation with ${activeScene?.conflictIntensity || 75}% conflict intensity, but the transition into the core debate requires tighter stakes.`,
          whyItMatters: `The audience needs to feel that failure in this room will permanently destroy the protagonist's life trajectory.`,
          suggestion: `Tighten the opening beat by 3 lines and emphasize the non-negotiable deadline before the train arrives at the terminal.`,
        };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        craftOutput: craftResp,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 850);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-odyssey-depth/95 border-l border-forge-cyan/30 backdrop-blur-2xl shadow-glass-card flex flex-col animate-slideLeft">
      {/* Drawer Header */}
      <div className="px-5 py-4 border-b border-forge-cyan/20 flex items-center justify-between bg-odyssey-abyss/90">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-forge-navy border border-bronze/40 flex items-center justify-center shadow-inner-glow">
            <Sparkles className="w-4 h-4 text-bronze-light animate-pulse" />
          </div>
          <div>
            <h3 className="font-cinzel font-bold text-sm text-paper-50 tracking-wider flex items-center gap-2">
              <span>SCRIPTFORGE INTELLIGENCE</span>
            </h3>
            <p className="text-[10px] font-mono text-paper-400">Senior Story Consultant AI</p>
          </div>
        </div>

        <button
          onClick={() => setIsAIAssistantOpen(false)}
          className="p-1.5 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-paper-500 mb-1 px-1">{msg.timestamp}</div>

            {msg.text && (
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] ${
                  msg.sender === 'user'
                    ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 rounded-tr-sm'
                    : 'bg-odyssey-abyss/80 text-paper-200 border border-forge-cyan/20 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            )}

            {msg.craftOutput && (
              <div className="w-full mt-1">
                <CraftCard
                  title={msg.craftOutput.title}
                  category={msg.craftOutput.category}
                  observation={msg.craftOutput.observation}
                  whyItMatters={msg.craftOutput.whyItMatters}
                  suggestion={msg.craftOutput.suggestion}
                  severity="medium"
                  actionLabel="Jump to Rewrite Studio"
                  onApplySuggestion={() => {
                    setActiveNavTab('rewrite');
                    setIsAIAssistantOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-odyssey-abyss/60 border border-forge-cyan/20 text-xs text-forge-sky animate-pulse">
            <Compass className="w-4 h-4 animate-spin" />
            <span>Consulting screenplay dramaturgy...</span>
          </div>
        )}
      </div>

      {/* Contextual Action Chips */}
      <div className="p-3 border-t border-forge-cyan/15 bg-odyssey-abyss/60">
        <div className="text-[10px] uppercase font-mono text-paper-500 mb-2 font-semibold flex items-center gap-1.5">
          <Lightbulb className="w-3 h-3 text-bronze-light" />
          <span>Contextual Story Consultant Triggers</span>
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
          {CONTEXTUAL_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p.prompt)}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-odyssey-depth/80 hover:bg-forge-navy text-paper-300 hover:text-paper-100 border border-forge-cyan/20 hover:border-forge-cyan/50 transition-all text-left"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputQuery.trim()) {
            handleSendPrompt(inputQuery);
          }
        }}
        className="p-3 border-t border-forge-cyan/20 bg-odyssey-abyss/90 flex gap-2"
      >
        <input
          type="text"
          placeholder="Ask your script consultant anything..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-xl bg-odyssey-depth/90 border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-3.5 py-2 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-100 border border-forge-cyan/40 disabled:opacity-40 transition-all"
        >
          <Send className="w-4 h-4 text-forge-sky" />
        </button>
      </form>
    </div>
  );
};
