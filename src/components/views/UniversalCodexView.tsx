import React, { useState } from 'react';
import { CodexChapter } from '../../types/lab';
import { FileText, Download, Printer, Plus, Edit3, Sparkles } from 'lucide-react';

interface UniversalCodexViewProps {
  chapters: CodexChapter[];
  onAddChapter: (c: CodexChapter) => void;
}

export const UniversalCodexView: React.FC<UniversalCodexViewProps> = ({
  chapters,
  onAddChapter
}) => {
  const [selectedChapId, setSelectedChapId] = useState<string>(chapters[0]?.id || 'chap-1');
  const selectedChapter = chapters.find(c => c.id === selectedChapId) || chapters[0];

  const handlePrintPDF = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    if (!selectedChapter) return;
    const blob = new Blob([`# ${selectedChapter.title}\n\n${selectedChapter.content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedChapter.title.replace(/\s+/g, '_')}.md`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            UNIVERSAL CODEX • COMPREHENSIVE DOCUMENTATION STUDIO
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Research Papers, Codex Chapters & Export Suite</h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesize theories, equations, device schematics, and hypotheses into formal publication codices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-mono flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Export Markdown
          </button>
          <button
            onClick={handlePrintPDF}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase">CODEX CHAPTERS ({chapters.length})</h2>
          {chapters.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapId(chap.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedChapId === chap.id
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold font-mono">{chap.title}</div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{chap.summary}</div>
            </button>
          ))}
        </div>

        {/* Reader Document View */}
        {selectedChapter && (
          <div className="lg:col-span-2 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 font-sans">
            <h1 className="text-2xl font-black text-slate-100 border-b border-slate-800 pb-4">{selectedChapter.title}</h1>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedChapter.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
