import React, { useState, useEffect } from 'react';
import { SectionId } from '../types/lab';
import { NAV_GROUPS } from './SidebarNav';
import { Search, Command, ArrowRight, Sparkles, X, Globe, Lightbulb, Sigma, Layers, Bot, BookOpen } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: SectionId) => void;
  onExecutePrompt: (query: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onExecutePrompt
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten items
  const allNavItems = NAV_GROUPS.flatMap(g => g.items);
  const filteredNavItems = query.trim()
    ? allNavItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : allNavItems.slice(0, 8);

  const handleAction = (item: typeof allNavItems[0]) => {
    onSelectSection(item.id);
    onClose();
  };

  const handleSubmitCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onExecutePrompt(query.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Input Bar */}
        <form onSubmit={handleSubmitCustomQuery} className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ask Everything Lab... (e.g. "Create a universe with four dimensions", "Analyze equation", "Build device")'
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-300 rounded ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Suggestions / Filtered Items */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {/* AI Trigger Suggestion if query looks like a command */}
          {query.trim().length > 3 && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between group cursor-pointer hover:bg-cyan-900/30 transition-all"
                 onClick={() => { onExecutePrompt(query); onClose(); }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-cyan-200">Execute Natural Language Command with AI</div>
                  <div className="text-[11px] text-cyan-400/80">"{query}"</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          <div className="text-[10px] font-bold text-slate-500 font-mono tracking-wider px-2 uppercase">
            {query.trim() ? 'MATCHING SECTIONS & LABS' : 'QUICK JUMP TO LABS'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleAction(item)}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800/60 hover:border-cyan-500/30 text-left transition-all text-xs font-medium text-slate-200 group"
                >
                  <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {!query.trim() && (
            <div className="mt-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-bold text-slate-500 font-mono tracking-wider px-2 mb-1.5 uppercase">
                EXEMPLAR COMMANDS
              </div>
              <div className="space-y-1">
                {[
                  'Create a universe with four dimensions',
                  'Turn this idea into a mathematical hypothesis',
                  'Analyze equation: I(A) + Delta -> I(B)',
                  'Build a conceptual machine for vacuum transduction',
                  'Find contradictions in topological invariance theory',
                  'Create a 3D cellular automata simulation',
                  'Turn research into Chapter 1 of the Universal Codex'
                ].map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => { onExecutePrompt(cmd); onClose(); }}
                    className="w-full text-left px-2.5 py-1.5 rounded bg-slate-950/40 hover:bg-slate-800/60 text-xs text-slate-400 hover:text-cyan-300 flex items-center justify-between font-mono text-[11px] transition-colors"
                  >
                    <span>"{cmd}"</span>
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Navigate with Keyboard & AI Prompting</span>
          <span>Esc to Close</span>
        </div>
      </div>
    </div>
  );
};
