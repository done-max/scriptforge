import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import { useAuth } from '../../context/AuthContext';
import {
  Volume2,
  VolumeX,
  FileDown,
  Sparkles,
  ChevronDown,
  Upload,
  Plus,
  Compass,
  Menu,
  X,
  Mail,
  LogOut,
  Database,
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen, onOpenAdmin }) => {
  const {
    scripts,
    activeScript,
    setActiveScriptById,
    isAudioPlaying,
    toggleAmbientAudio,
    setIsExportModalOpen,
    setIsUploadModalOpen,
    setIsAIAssistantOpen,
    isAIAssistantOpen,
    createBlankScript,
    setActiveNavTab,
  } = useScript();

  const { user, logout, setIsEmailModalOpen, emails, lastEmailNotice } = useAuth();
  const [isScriptDropdownOpen, setIsScriptDropdownOpen] = useState(false);

  return (
    <>
      {/* Email Dispatched Toast Banner */}
      {lastEmailNotice && (
        <div className="bg-gradient-to-r from-forge-navy via-bronze-dark/60 to-forge-navy border-b border-bronze/40 px-4 py-1.5 text-xs text-paper-50 flex items-center justify-between z-40 animate-fadeIn">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Mail className="w-4 h-4 text-bronze-light shrink-0" />
            <span className="font-mono text-bronze-light font-semibold">EMAIL SENT:</span>
            <span className="truncate">{lastEmailNotice}</span>
          </div>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="text-[11px] underline text-bronze-light hover:text-paper-50 font-mono ml-3 shrink-0"
          >
            Open Inbox →
          </button>
        </div>
      )}

      <header className="relative z-30 h-16 border-b border-forge-cyan/15 bg-odyssey-abyss/90 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-paper-300 hover:text-paper-100 hover:bg-odyssey-depth/60 rounded-lg transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* ScriptForge Logo */}
          <div
            onClick={() => setActiveNavTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-forge-navy to-odyssey-depth border border-forge-cyan/30 flex items-center justify-center shadow-inner-glow group-hover:border-bronze transition-all">
              <Compass className="w-4 h-4 text-bronze-light group-hover:rotate-45 transition-transform duration-500" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-extrabold text-base tracking-wider bg-gradient-to-r from-paper-100 via-paper-200 to-forge-sky bg-clip-text text-transparent">
                  SCRIPTFORGE
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-bronze/15 border border-bronze/30 text-bronze-light font-semibold tracking-wider">
                  STUDIO 2.0
                </span>
              </div>
              <span className="text-[9px] font-sans text-paper-500 tracking-widest uppercase hidden sm:inline">
                Screenplay Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Center: Script Switcher Pill */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsScriptDropdownOpen(!isScriptDropdownOpen)}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-odyssey-depth/80 hover:bg-odyssey-trench border border-forge-cyan/20 hover:border-forge-cyan/40 text-paper-100 transition-all text-xs shadow-inner-glow"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-paper-100 max-w-[180px] truncate">{activeScript.title}</span>
            <span className="text-paper-500">|</span>
            <span className="text-paper-400 font-mono">{activeScript.genre}</span>
            <span className="px-1.5 py-0.2 bg-bronze/20 text-bronze-light rounded text-[10px] font-cinzel font-bold">
              {activeScript.storyIntelligenceScore}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-paper-400" />
          </button>

          {/* Script Dropdown */}
          {isScriptDropdownOpen && (
            <div
              onMouseLeave={() => setIsScriptDropdownOpen(false)}
              className="absolute left-0 mt-2 w-72 rounded-xl bg-odyssey-depth/95 border border-forge-cyan/30 backdrop-blur-2xl shadow-glass-card p-2 z-50 animate-fadeIn"
            >
              <div className="text-[10px] uppercase font-mono text-paper-500 px-2.5 py-1 tracking-wider">
                Select Screenplay to Read & Edit
              </div>
              <div className="space-y-1 my-1 max-h-60 overflow-y-auto">
                {scripts.map((script) => (
                  <button
                    key={script.id}
                    onClick={() => {
                      setActiveScriptById(script.id);
                      setIsScriptDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition-all ${
                      script.id === activeScript.id
                        ? 'bg-forge-navy/60 text-paper-50 border border-forge-cyan/30'
                        : 'text-paper-300 hover:bg-odyssey-trench hover:text-paper-100'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium text-paper-100 truncate">{script.title}</div>
                      <div className="text-[10px] text-paper-500">{script.genre} • {script.pageCount} pgs</div>
                    </div>
                    <span className="font-cinzel text-xs font-bold text-bronze-light">
                      {script.storyIntelligenceScore}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 mt-1 border-t border-paper-500/10 flex gap-1.5">
                <button
                  onClick={() => {
                    setIsScriptDropdownOpen(false);
                    setIsUploadModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[11px] bg-forge-navy/80 hover:bg-forge-ocean text-paper-100 border border-forge-cyan/30 transition-all"
                >
                  <Upload className="w-3 h-3 text-forge-cyan" />
                  <span>Upload Script</span>
                </button>
                <button
                  onClick={() => {
                    setIsScriptDropdownOpen(false);
                    createBlankScript();
                  }}
                  className="flex items-center justify-center p-1.5 rounded-lg bg-odyssey-trench hover:bg-odyssey-navy text-paper-300 border border-paper-500/20 transition-all"
                  title="Create Blank Script"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          {/* Admin Database Control Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-forge-navy/80 hover:bg-forge-ocean border border-forge-cyan/40 hover:border-bronze text-paper-50 transition-all shadow-inner-glow"
            title="Open Master Database & Backend Admin Controller"
          >
            <Database className="w-3.5 h-3.5 text-bronze-light" />
            <span className="hidden sm:inline">DB Controller</span>
          </button>

          {/* Email Inbox Button */}
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-odyssey-depth/70 hover:bg-odyssey-trench border border-bronze/30 hover:border-bronze text-bronze-light transition-all shadow-inner-glow"
            title="View Dispatched Login & Verification Emails"
          >
            <Mail className="w-3.5 h-3.5 text-bronze" />
            <span className="hidden sm:inline">Emails</span>
            <span className="w-4 h-4 rounded-full bg-bronze/20 text-bronze-light text-[10px] font-mono flex items-center justify-center font-bold">
              {emails.length}
            </span>
          </button>

          {/* Ambient Focus Audio Synthesizer */}
          <button
            onClick={toggleAmbientAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isAudioPlaying
                ? 'bg-forge-ocean/30 text-forge-sky border-forge-cyan/50 shadow-glow-cyan'
                : 'bg-odyssey-depth/50 text-paper-400 hover:text-paper-200 border-paper-500/20 hover:border-forge-cyan/30'
            }`}
            title={isAudioPlaying ? 'Mute Oceanic Focus Ambient' : 'Play Oceanic Focus Atmosphere'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-forge-cyan animate-pulse" />
                <span className="hidden md:inline text-[11px]">Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[11px]">Audio</span>
              </>
            )}
          </button>

          {/* Export Report */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-odyssey-depth/60 hover:bg-odyssey-trench border border-paper-500/20 hover:border-forge-cyan/40 text-paper-200 hover:text-paper-50 transition-all shadow-inner-glow"
          >
            <FileDown className="w-3.5 h-3.5 text-forge-cyan" />
            <span className="hidden sm:inline">PDF Coverage</span>
          </button>

          {/* Script Consultant AI Drawer Trigger */}
          <button
            onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy border border-forge-cyan/40 text-paper-50 hover:border-bronze hover:shadow-glow-gold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-bronze-light animate-spin-slow" />
            <span className="hidden sm:inline">AI Consultant</span>
          </button>

          {/* User Signout */}
          <button
            onClick={logout}
            className="p-2 text-paper-400 hover:text-red-400 hover:bg-red-950/30 rounded-xl border border-transparent hover:border-red-500/30 transition-all"
            title={`Logged in as @${user?.username || 'user'}. Click to Log Out.`}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>
    </>
  );
};
