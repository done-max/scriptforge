import React, { useState, useRef } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  Upload,
  X,
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScriptUploadModal: React.FC = () => {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadAndProcessScreenplay,
    setActiveScriptById,
    scripts,
  } = useScript();

  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [scriptTitle, setScriptTitle] = useState('');
  const [scriptAuthor, setScriptAuthor] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('upload');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const STAGES = [
    { title: 'READING SCREENPLAY', desc: 'Parsing scene headings, character tracks, and raw sluglines...' },
    { title: 'MAPPING STRUCTURE', desc: 'Identifying Three-Act boundaries and Save-the-Cat dramatic beats...' },
    { title: 'ANALYZING CHARACTERS', desc: 'Evaluating external objectives, internal wounds, and voice rhythm...' },
    { title: 'LISTENING TO DIALOGUE', desc: 'Auditing subtext density, exposition leakage, and on-the-nose lines...' },
    { title: 'TRACKING THEMES', desc: 'Synthesizing recurring symbols, motifs, and dramatic questions...' },
    { title: 'EVALUATING PACING', desc: 'Calculating conflict density, scene velocity, and dramatic tension...' },
    { title: 'BUILDING STORY INTELLIGENCE', desc: 'Assembling executive coverage and personalized craft roadmap...' },
  ];

  if (!isUploadModalOpen) return null;

  const runAnalysisPipeline = (text: string, title?: string, author?: string) => {
    setIsProcessing(true);
    setCurrentStageIndex(0);
    setProgressPercent(5);

    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < STAGES.length) {
        setCurrentStageIndex(stage);
        setProgressPercent(Math.round(((stage + 1) / STAGES.length) * 95));
      } else {
        clearInterval(interval);
        setProgressPercent(100);
        setTimeout(() => {
          uploadAndProcessScreenplay(text, title || scriptTitle || 'NEW SCREENPLAY', author || scriptAuthor || 'Screenwriter');
          setIsProcessing(false);
          setIsUploadModalOpen(false);

          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#4AA3DF', '#C5A46D', '#70C7F5', '#175A9C'],
            });
          } catch {
            // ignore
          }
        }, 600);
      }
    }, 700);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const fileNameClean = file.name.replace(/\.[^/.]+$/, '');
      setScriptTitle(fileNameClean);
      runAnalysisPipeline(text, fileNameClean, 'Author');
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    runAnalysisPipeline(pastedText, scriptTitle || 'UNTITLED DRAFT', scriptAuthor || 'Screenwriter');
  };

  const handleSelectSample = (sampleId: string) => {
    setActiveScriptById(sampleId);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-odyssey-void/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-odyssey-depth/95 border border-forge-cyan/30 rounded-2xl shadow-glass-card overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-forge-cyan/20 flex items-center justify-between bg-odyssey-abyss/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forge-navy border border-forge-cyan/40 flex items-center justify-center">
              <Compass className="w-4 h-4 text-bronze-light" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-base text-paper-50 tracking-wider">
                Begin the Journey
              </h3>
              <p className="text-xs text-paper-400">
                Upload your screenplay and let ScriptForge read between the lines.
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="p-1.5 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isProcessing ? (
            /* 7-Stage Odyssey Analysis Animation */
            <div className="py-8 space-y-6 text-center">
              {/* Progress Ring & Icon */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-forge-ocean/30 animate-ping opacity-25" />
                <div className="w-20 h-20 rounded-full bg-forge-navy/80 border border-forge-cyan/50 flex items-center justify-center shadow-glow-cyan">
                  <Compass className="w-8 h-8 text-bronze-light animate-spin-slow" />
                </div>
                <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-bronze/20 border border-bronze/40 text-[10px] font-mono font-bold text-bronze-light">
                  {progressPercent}%
                </div>
              </div>

              {/* Current Stage Headline */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-widest text-forge-sky font-semibold">
                  Stage {currentStageIndex + 1} of {STAGES.length}
                </div>
                <h4 className="font-cinzel text-lg font-bold text-paper-50 tracking-wider">
                  {STAGES[currentStageIndex]?.title}
                </h4>
                <p className="text-xs text-paper-300 max-w-md mx-auto italic">
                  {STAGES[currentStageIndex]?.desc}
                </p>
              </div>

              {/* Stage Progress Pills */}
              <div className="grid grid-cols-7 gap-1.5 pt-4 max-w-md mx-auto">
                {STAGES.map((s, idx) => (
                  <div
                    key={s.title}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx < currentStageIndex
                        ? 'bg-emerald-400'
                        : idx === currentStageIndex
                        ? 'bg-forge-cyan shadow-glow-cyan animate-pulse'
                        : 'bg-odyssey-trench'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Upload Options */
            <div className="space-y-5">
              {/* Tabs */}
              <div className="flex rounded-xl bg-odyssey-trench p-1 border border-paper-500/20">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'upload'
                      ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 shadow-inner-glow'
                      : 'text-paper-400 hover:text-paper-200'
                  }`}
                >
                  File Upload (PDF/FDX/TXT/Fountain)
                </button>
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'paste'
                      ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 shadow-inner-glow'
                      : 'text-paper-400 hover:text-paper-200'
                  }`}
                >
                  Paste Screenplay Text
                </button>
                <button
                  onClick={() => setActiveTab('samples')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === 'samples'
                      ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 shadow-inner-glow'
                      : 'text-paper-400 hover:text-paper-200'
                  }`}
                >
                  Sample Scripts
                </button>
              </div>

              {activeTab === 'upload' && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                    dragActive
                      ? 'border-forge-cyan bg-forge-ocean/20 shadow-glow-cyan'
                      : 'border-forge-cyan/30 bg-odyssey-abyss/60 hover:border-forge-cyan/60 hover:bg-odyssey-trench/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".fountain,.txt,.pdf,.docx,.fdx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="w-14 h-14 mx-auto rounded-2xl bg-forge-navy/60 border border-forge-cyan/30 flex items-center justify-center mb-4 shadow-inner-glow">
                    <Upload className="w-6 h-6 text-forge-sky animate-bounce" />
                  </div>

                  <h4 className="font-cinzel text-sm font-bold text-paper-100 mb-1">
                    Drop your screenplay here
                  </h4>
                  <p className="text-xs text-paper-400 mb-4">
                    Supports <span className="text-forge-sky font-semibold">PDF, Fountain, TXT, FDX, DOCX</span>
                  </p>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-semibold border border-forge-cyan/40 transition-all shadow-inner-glow"
                  >
                    Browse Files
                  </button>
                </div>
              )}

              {activeTab === 'paste' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Script Title (e.g. THE ODYSSEY: ITHACA)"
                      value={scriptTitle}
                      onChange={(e) => setScriptTitle(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/20 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan"
                    />
                    <input
                      type="text"
                      placeholder="Writer / Author Name"
                      value={scriptAuthor}
                      onChange={(e) => setScriptAuthor(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-odyssey-abyss/80 border border-forge-cyan/20 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan"
                    />
                  </div>

                  <textarea
                    rows={8}
                    placeholder="Paste screenplay scenes here in standard or Fountain formatting (e.g. INT. COFFEE SHOP - NIGHT)..."
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-odyssey-abyss/90 border border-forge-cyan/25 text-xs font-screenplay text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan resize-none leading-relaxed"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handlePasteSubmit}
                      disabled={!pastedText.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 disabled:opacity-50 transition-all shadow-glow-cyan"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-bronze-light" />
                      <span>Begin AI Analysis</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'samples' && (
                <div className="space-y-2">
                  <div className="text-xs text-paper-400 mb-2">
                    Select a curated Hollywood-caliber sample to explore the intelligence engine immediately:
                  </div>
                  {scripts.map((sample) => (
                    <div
                      key={sample.id}
                      onClick={() => handleSelectSample(sample.id)}
                      className="p-3 rounded-xl bg-odyssey-abyss/80 hover:bg-odyssey-trench border border-forge-cyan/20 hover:border-forge-cyan/50 cursor-pointer flex items-center justify-between transition-all group"
                    >
                      <div className="space-y-0.5">
                        <div className="font-cinzel text-xs font-bold text-paper-100 group-hover:text-forge-sky transition-colors">
                          {sample.title}
                        </div>
                        <div className="text-[11px] text-paper-400">
                          {sample.genre} • {sample.pageCount} Pages • by {sample.author}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-cinzel text-xs font-bold text-bronze-light bg-bronze/10 px-2 py-0.5 rounded border border-bronze/30">
                          Score {sample.storyIntelligenceScore}
                        </span>
                        <ArrowRight className="w-4 h-4 text-paper-400 group-hover:text-forge-cyan group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
