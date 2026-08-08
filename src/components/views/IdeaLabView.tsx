import React, { useState } from 'react';
import { Idea, IdeaType, SectionId } from '../../types/lab';
import { Lightbulb, Plus, Sparkles, ArrowRight, Tag, Check, Filter, Trash2, Edit3, Bot } from 'lucide-react';

interface IdeaLabViewProps {
  ideas: Idea[];
  onAddIdea: (idea: Idea) => void;
  onDeleteIdea: (id: string) => void;
  onNavigate: (section: SectionId) => void;
  onAskAI: (prompt: string) => void;
}

const IDEA_TYPES: IdeaType[] = [
  'question',
  'hypothesis',
  'theory',
  'equation',
  'experiment',
  'simulation',
  'invention',
  'document',
  'project'
];

export const IdeaLabView: React.FC<IdeaLabViewProps> = ({
  ideas,
  onAddIdea,
  onDeleteIdea,
  onNavigate,
  onAskAI
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<IdeaType>('hypothesis');
  const [tagInput, setTagInput] = useState('UIM, Physics');
  const [filterType, setFilterType] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newIdea: Idea = {
      id: 'idea-' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      type,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
      status: 'developing',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddIdea(newIdea);
    setTitle('');
    setContent('');
  };

  const filteredIdeas = filterType === 'all'
    ? ideas
    : ideas.filter(i => i.type === filterType);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            IDEA LAB • CONCEPT CAPTURE & CONVERSION
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Capture & Transform Scientific Ideas</h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn spark thoughts into questions, hypotheses, equations, device schematics, or codex documents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Idea Form */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase font-mono flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            CAPTURE NEW IDEA
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">IDEA TITLE</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Non-Euclidean Identity Preservation in High Dimensions"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">CLASSIFICATION</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as IdeaType)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 capitalize"
              >
                {IDEA_TYPES.map((t) => (
                  <option key={t} value={t} className="capitalize">{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">DESCRIPTION & DETAILS</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Elaborate on the intuition, parameters, questions or equations..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">TAGS (COMMA SEPARATED)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Save to Idea Lab</span>
            </button>
          </form>
        </div>

        {/* Ideas List & Conversion Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-colors shrink-0 ${
                filterType === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              All ({ideas.length})
            </button>
            {IDEA_TYPES.map((t) => {
              const count = ideas.filter(i => i.type === t).length;
              if (count === 0) return null;
              return (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-colors shrink-0 ${
                    filterType === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {t} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                      {idea.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-1.5">{idea.title}</h3>
                  </div>
                  <button
                    onClick={() => onDeleteIdea(idea.id)}
                    className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Delete Idea"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{idea.content}</p>

                {idea.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {idea.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Conversion Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-[10px] font-mono text-slate-500">CONVERT TO:</span>
                  <button
                    onClick={() => onNavigate('hypothesis-lab')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <span>Hypothesis Lab</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => onNavigate('equation-lab')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <span>Equation Lab</span>
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => onAskAI(`Analyze this idea and formulate a mathematical hypothesis: "${idea.title} - ${idea.content}"`)}
                    className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Bot className="w-3 h-3 text-cyan-400" />
                    <span>AI Analysis</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
