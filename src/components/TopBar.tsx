import React from 'react';
import { ResearchProject } from '../types/lab';
import { Search, Sparkles, Plus, Folder, Command, Bot, Atom } from 'lucide-react';

interface TopBarProps {
  projects: ResearchProject[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onOpenCommandPalette: () => void;
  onOpenNewIdea?: () => void;
  onNavigateToAI?: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onOpenCommandPalette,
  onOpenNewIdea,
  onNavigateToAI,
  searchTerm,
  onSearchChange
}) => {
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  return (
    <header className="h-14 bg-slate-950/80 backdrop-blur border-b border-slate-800/80 px-4 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Search / Command Bar Trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="flex-1 max-w-xl flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-400 text-xs transition-all shadow-inner group"
      >
        <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="truncate text-slate-300 font-sans">
          Ask Everything Lab... <span className="text-slate-500 font-mono text-[11px]">(e.g. "Create a universe with four dimensions")</span>
        </span>
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
          <Command className="w-3 h-3" /> K
        </kbd>
      </button>

      {/* Right Tools & Project Switcher */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Project Selector */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <Folder className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={activeProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[180px] truncate"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <button
          onClick={() => onOpenNewIdea?.()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Idea</span>
        </button>

        <button
          onClick={() => onNavigateToAI?.()}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/40 transition-all relative"
          title="Open AI Researcher"
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </button>
      </div>
    </header>
  );
};
