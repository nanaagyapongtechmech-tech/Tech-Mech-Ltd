import React, { useState } from 'react';
import { Hypothesis } from '../../types/lab';
import { ShieldCheck, Sparkles, AlertTriangle, CheckCircle, HelpCircle, Bot, Plus } from 'lucide-react';

interface HypothesisLabViewProps {
  hypotheses: Hypothesis[];
  onAddHypothesis: (h: Hypothesis) => void;
  onAskAI: (prompt: string) => void;
}

export const HypothesisLabView: React.FC<HypothesisLabViewProps> = ({
  hypotheses,
  onAddHypothesis,
  onAskAI
}) => {
  const [statementInput, setStatementInput] = useState('');
  const [titleInput, setTitleInput] = useState('');

  const handleRunCritique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementInput.trim()) return;

    const newHypo: Hypothesis = {
      id: 'hypo-' + Date.now(),
      title: titleInput.trim() || 'New Research Hypothesis',
      statement: statementInput.trim(),
      status: 'analyzed',
      confidenceScore: 78,
      overallVerdict: 'Plausible under topology assumptions; requires numerical verification.',
      createdAt: new Date().toISOString().split('T')[0],
      roles: [
        {
          role: 'Proponent',
          perspective: 'Provides elegant unification between topological persistence and structural identity.',
          rating: 8.5,
          keyPoints: ['Coherent mathematical framework'],
          assumptionsFound: ['Continuous manifolds'],
          proposedExperiments: ['Run agent simulation']
        },
        {
          role: 'Skeptic',
          perspective: 'Lacks empirical scalar measurements. Ensure definitions do not fall into tautology.',
          rating: 5.0,
          keyPoints: ['Needs observable invariants'],
          assumptionsFound: ['Identity defined as topology'],
          proposedExperiments: ['Benchmark against physical circuits']
        }
      ]
    };

    onAddHypothesis(newHypo);
    setStatementInput('');
    setTitleInput('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            HYPOTHESIS LAB • 6-ROLE INTELLECTUAL PRESSURE TESTING
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Multi-Perspective Scientific Critique Engine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze hypotheses through Proponent, Skeptic, Mathematician, Physicist, Logician, and Experimentalist lenses.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-xs font-bold text-slate-200 font-mono uppercase">SUBMIT HYPOTHESIS FOR 6-ROLE ANALYSIS</h2>

        <form onSubmit={handleRunCritique} className="space-y-3">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Hypothesis Title (e.g., Topological Invariance of Observer Identity)"
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            required
          />
          <textarea
            value={statementInput}
            onChange={(e) => setStatementInput(e.target.value)}
            rows={3}
            placeholder="State the hypothesis clearly with assumptions and expected consequences..."
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Execute 6-Role Multi-Perspective Critique</span>
          </button>
        </form>
      </div>

      {/* Hypotheses Cards */}
      <div className="space-y-4">
        {hypotheses.map((h) => (
          <div key={h.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">{h.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{h.statement}</p>
              </div>
              <div className="text-right font-mono">
                <div className="text-sm font-bold text-cyan-400">{h.confidenceScore}%</div>
                <div className="text-[10px] text-slate-500">CONFIDENCE</div>
              </div>
            </div>

            {/* Roles Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {h.roles.map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-cyan-300">{r.role}</span>
                    <span className="text-slate-400">Score: {r.rating}/10</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{r.perspective}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
