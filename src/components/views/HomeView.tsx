import React, { useState } from 'react';
import { SectionId, ResearchProject, Idea, Equation, UniverseParams } from '../../types/lab';
import { Atom, Lightbulb, Sigma, Globe, BookOpen, Sparkles, ArrowRight, Activity, Plus, Search, Layers, Bot, ChevronRight, ShieldAlert } from 'lucide-react';

interface HomeViewProps {
  projects: ResearchProject[];
  activeProject: ResearchProject;
  onNavigate: (section: SectionId) => void;
  onOpenCommandPalette: () => void;
  onQuickAsk: (prompt: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  activeProject,
  onNavigate,
  onOpenCommandPalette,
  onQuickAsk
}) => {
  const [promptInput, setPromptInput] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onQuickAsk(promptInput.trim());
    setPromptInput('');
  };

  const allIdeas = projects.flatMap(p => p.ideas);
  const allEquations = projects.flatMap(p => p.equations);
  const allUniverses = projects.flatMap(p => p.universes);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hero Header & Universal Command Bar */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Atom className="w-3.5 h-3.5 animate-spin-slow" />
            THE EVERYTHING LAB • DIGITAL RESEARCH ENVIRONMENT
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Idea <span className="text-cyan-400">→</span> Theory <span className="text-cyan-400">→</span> Mathematics <span className="text-cyan-400">→</span> Simulation <span className="text-cyan-400">→</span> Codex
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            Welcome to your unified digital laboratory for exploring mathematics, theoretical physics, Universal Automation (UA), Universal Identity Mathematics (UIM), dimensions, consciousness, vacuum mechanics, emergent systems, devices, and creative inventions.
          </p>

          {/* Prompt Bar */}
          <form onSubmit={handlePromptSubmit} className="pt-2 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder='Ask Everything Lab... (e.g., "Create a universe with four dimensions" or "Analyze equation")'
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Execute</span>
            </button>
          </form>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'ACTIVE PROJECTS', val: projects.length, icon: BookOpen, section: 'projects' as SectionId, color: 'text-cyan-400' },
          { label: 'CAPTURED IDEAS', val: allIdeas.length, icon: Lightbulb, section: 'idea-lab' as SectionId, color: 'text-amber-400' },
          { label: 'EQUATION OBJECTS', val: allEquations.length, icon: Sigma, section: 'equation-lab' as SectionId, color: 'text-emerald-400' },
          { label: 'SAVED UNIVERSES', val: allUniverses.length, icon: Globe, section: 'universe-sim' as SectionId, color: 'text-indigo-400' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigate(stat.section)}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">{stat.label}</div>
                <div className={`text-2xl font-black ${stat.color} mt-1 font-mono`}>{stat.val}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 text-slate-400 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Project Card */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">CURRENT RESEARCH FOCUS</h2>
            </div>
            <button
              onClick={() => onNavigate('research-lab')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
            >
              Open Workspace <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100">{activeProject.title}</h3>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {activeProject.category}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{activeProject.summary}</p>
          </div>

          {/* Quick Metrics of Active Project */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500">IDEAS & HYPOTHESES</div>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeProject.ideas.length + activeProject.hypotheses.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500">EQUATIONS</div>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeProject.equations.length}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] font-mono text-slate-500">CODEX CHAPTERS</div>
              <div className="text-sm font-bold text-slate-200 mt-1">{activeProject.chapters.length}</div>
            </div>
          </div>
        </div>

        {/* Quick Section Launchpad */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">FEATURED LAB MODULES</h2>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { id: 'ua-lab' as SectionId, title: 'Universal Automation (UA)', desc: 'Identity → Difference → Emergence' },
              { id: 'uim-lab' as SectionId, title: 'UIM Mathematics Lab', desc: 'Symbolic identity algebra & proof workspace' },
              { id: 'dimension-lab' as SectionId, title: 'Dimension Lab (0D - 36D)', desc: 'Higher-dimensional spatial projections' },
              { id: 'device-builder' as SectionId, title: 'Device Builder', desc: 'Node-based physical transducer canvas' },
              { id: 'hypothesis-lab' as SectionId, title: 'Hypothesis Lab', desc: '6-Role AI pressure testing & critique' },
              { id: '3d-workshop' as SectionId, title: '3D Workshop', desc: 'Interactive Three.js visualizer' }
            ].map((lab) => (
              <button
                key={lab.id}
                onClick={() => onNavigate(lab.id)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">{lab.title}</div>
                  <div className="text-[10px] text-slate-400">{lab.desc}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Equations & Ideas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equations */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sigma className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">KEY EQUATIONS</h2>
            </div>
            <button onClick={() => onNavigate('equation-lab')} className="text-xs text-emerald-400 hover:text-emerald-300 font-mono">
              Equation Lab →
            </button>
          </div>

          <div className="space-y-3">
            {allEquations.slice(0, 3).map((eq) => (
              <div key={eq.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="text-xs font-bold text-slate-200">{eq.title}</div>
                <div className="p-2 rounded bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto border border-slate-800">
                  {eq.latex}
                </div>
                <div className="text-[11px] text-slate-400">{eq.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ideas */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">CAPTURED IDEAS</h2>
            </div>
            <button onClick={() => onNavigate('idea-lab')} className="text-xs text-amber-400 hover:text-amber-300 font-mono">
              Idea Lab →
            </button>
          </div>

          <div className="space-y-3">
            {allIdeas.slice(0, 3).map((idea) => (
              <div key={idea.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{idea.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                    {idea.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{idea.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
