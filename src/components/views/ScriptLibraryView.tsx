import React, { useState } from 'react';
import { useScript } from '../../context/ScriptContext';
import {
  FolderKanban,
  Search,
  Plus,
  ArrowRight,
  Clock,
  LayoutGrid,
  List,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';

export const ScriptLibraryView: React.FC = () => {
  const {
    scripts,
    activeScript,
    setActiveScriptById,
    setActiveNavTab,
    setIsUploadModalOpen,
  } = useScript();

  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = scripts.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || s.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto text-paper-100">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-odyssey-depth/80 border border-forge-cyan/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-glass-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-forge-sky uppercase tracking-widest font-semibold">
            <FolderKanban className="w-4 h-4 text-bronze-light" />
            <span>Master Screenplay Archive</span>
          </div>
          <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-paper-50">
            Script Library & Portfolio Studio
          </h1>
          <p className="text-xs text-paper-300">
            Manage your screenplay repository, story intelligence metrics, and draft revisions.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan transition-all"
        >
          <Plus className="w-4 h-4 text-bronze-light" />
          <span>Upload New Screenplay</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-paper-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scripts by title, logline, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-odyssey-depth/90 border border-forge-cyan/20 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
            />
          </div>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-odyssey-depth/90 border border-forge-cyan/20 text-xs text-paper-200 focus:outline-none focus:border-forge-cyan cursor-pointer"
          >
            <option value="All">All Genres</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Noir">Noir</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-odyssey-depth border border-forge-cyan/20 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-forge-navy text-paper-50' : 'text-paper-400'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs ${viewMode === 'list' ? 'bg-forge-navy text-paper-50' : 'text-paper-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((script) => {
            const isSelected = script.id === activeScript.id;
            return (
              <div
                key={script.id}
                onClick={() => {
                  setActiveScriptById(script.id);
                  setActiveNavTab('studio');
                }}
                className={`p-6 rounded-3xl bg-odyssey-depth/70 hover:bg-odyssey-trench border cursor-pointer transition-all duration-300 group shadow-inner-glow flex flex-col justify-between ${
                  isSelected ? 'border-forge-cyan ring-1 ring-forge-cyan shadow-glow-cyan/20' : 'border-forge-cyan/15 hover:border-forge-cyan/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-odyssey-void text-forge-sky border border-forge-cyan/30 font-semibold">
                      {script.genre}
                    </span>
                    <ScoreBadge score={script.storyIntelligenceScore} size="sm" showGoldAccent />
                  </div>

                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-paper-50 group-hover:text-forge-sky transition-colors">
                      {script.title}
                    </h3>
                    <div className="text-xs text-paper-400">
                      by <span className="text-paper-200">{script.author}</span> • {script.pageCount} Pages
                    </div>
                  </div>

                  <p className="text-xs text-paper-300 line-clamp-3 italic leading-relaxed">
                    "{script.logline}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-paper-500/10 flex items-center justify-between text-xs text-paper-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-paper-500" />
                    <span>{script.lastEdited}</span>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-forge-sky group-hover:translate-x-1 transition-transform">
                    <span>Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((script) => (
            <div
              key={script.id}
              onClick={() => {
                setActiveScriptById(script.id);
                setActiveNavTab('studio');
              }}
              className="p-4 rounded-2xl bg-odyssey-depth/70 hover:bg-odyssey-trench border border-forge-cyan/20 hover:border-forge-cyan/40 cursor-pointer flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-4">
                <ScoreBadge score={script.storyIntelligenceScore} size="sm" />
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-paper-100 group-hover:text-forge-sky transition-colors">
                    {script.title}
                  </h3>
                  <div className="text-xs text-paper-400">
                    {script.genre} • {script.pageCount} Pages • by {script.author}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-paper-300 italic hidden md:inline max-w-sm truncate">
                  "{script.logline}"
                </span>
                <ArrowRight className="w-4 h-4 text-paper-400 group-hover:text-forge-cyan group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
