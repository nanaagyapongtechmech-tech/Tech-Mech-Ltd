import React, { useState } from 'react';
import { Equation } from '../../types/lab';
import { Sigma, Plus, Sparkles, Sliders, Play, ShieldAlert } from 'lucide-react';

interface EquationLabViewProps {
  equations: Equation[];
  onAddEquation: (eq: Equation) => void;
  onAskAI: (prompt: string) => void;
}

export const EquationLabView: React.FC<EquationLabViewProps> = ({
  equations,
  onAddEquation,
  onAskAI
}) => {
  const [selectedEqId, setSelectedEqId] = useState<string>(equations[0]?.id || 'eq-uim-1');
  const selectedEq = equations.find(e => e.id === selectedEqId) || equations[0];

  const [varValues, setVarValues] = useState<Record<string, number>>({
    'I(\\mathcal{A})': 1.0,
    '\\Delta_{\\text{diff}}': 0.35,
    '\\Phi': 1.25
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Sigma className="w-4 h-4" />
            EQUATION LAB • LIVING MATHEMATICAL OBJECTS
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Interactive Equation Objects & AI Derivations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manipulate equations, tune live variable sliders, inspect hidden assumptions, and derive mathematical transformations.
          </p>
        </div>

        <button
          onClick={() => onAskAI(`Critique and derive assumptions for equation: "${selectedEq?.title} - ${selectedEq?.latex}"`)}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Derive & Critique with AI</span>
        </button>
      </div>

      {/* Equations Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {equations.map((eq) => (
          <button
            key={eq.id}
            onClick={() => setSelectedEqId(eq.id)}
            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all shrink-0 ${
              selectedEqId === eq.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {eq.title}
          </button>
        ))}
      </div>

      {selectedEq && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Equation Display */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-100">{selectedEq.title}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {selectedEq.domain}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-sm border border-slate-800 overflow-x-auto">
              {selectedEq.latex}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedEq.description}</p>

            {/* Assumptions */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase">MATHEMATICAL ASSUMPTIONS</div>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                {selectedEq.assumptions.map((asm, i) => (
                  <li key={i}>{asm}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Variables Sliders */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
            <h2 className="text-xs font-bold text-slate-300 uppercase">VARIABLE SLIDERS</h2>

            {selectedEq.variables.map((v) => (
              <div key={v.symbol} className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>{v.name} ({v.symbol})</span>
                  <span className="text-cyan-400">{varValues[v.symbol] ?? v.defaultValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.05"
                  value={varValues[v.symbol] ?? v.defaultValue}
                  onChange={(e) => setVarValues({ ...varValues, [v.symbol]: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
