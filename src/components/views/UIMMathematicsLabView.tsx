import React, { useState } from 'react';
import { Equation } from '../../types/lab';
import { Calculator, Sigma, Plus, Sparkles, Check, HelpCircle, ArrowRight, Layers } from 'lucide-react';

interface UIMMathematicsLabViewProps {
  equations: Equation[];
  onAddEquation: (eq: Equation) => void;
  onAskAI: (prompt: string) => void;
}

export const UIMMathematicsLabView: React.FC<UIMMathematicsLabViewProps> = ({
  equations,
  onAddEquation,
  onAskAI
}) => {
  const [latexInput, setLatexInput] = useState('I(\\mathcal{A}) \\oplus \\Delta_{\\text{diff}} \\xrightarrow{\\Phi} I(\\mathcal{B})');
  const [titleInput, setTitleInput] = useState('Identity Preservation Under Mapping');
  const [descInput, setDescInput] = useState('Symbolic transformation defining structural identity preservation across topological manifolds.');
  const [activeSubTab, setActiveSubTab] = useState<'editor' | 'symbols' | 'equality-vs-identity' | 'proof'>('editor');

  const SYMBOLS = [
    { symbol: '\\oplus', label: 'Identity Addition' },
    { symbol: '\\otimes', label: 'Identity Tensor Product' },
    { symbol: '\\neq_I', label: 'Identity Non-Equality' },
    { symbol: '\\xrightarrow{\\Phi}', label: 'Transformational Operator' },
    { symbol: '\\nabla_{ID}', label: 'Identity Gradient' },
    { symbol: '\\partial_I', label: 'Partial Identity Derivative' },
    { symbol: '\\oint_I', label: 'Closed Identity Path Integral' }
  ];

  const handleAddSymbol = (sym: string) => {
    setLatexInput(prev => prev + ' ' + sym);
  };

  const handleCreateEquation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim() || !latexInput.trim()) return;

    const newEq: Equation = {
      id: 'eq-uim-' + Date.now(),
      title: titleInput.trim(),
      latex: latexInput.trim(),
      description: descInput.trim(),
      domain: 'UIM Mathematics',
      variables: [
        { symbol: 'I(A)', name: 'Base Identity', unit: 'ID', defaultValue: 1.0, description: 'Original identity tensor' }
      ],
      assumptions: ['Topological continuity of identity manifold'],
      isSpeculative: true
    };

    onAddEquation(newEq);
    setTitleInput('');
    setDescInput('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            UNIVERSAL IDENTITY MATHEMATICS (UIM) LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Symbolic Identity Algebra & Proof Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore non-Euclidean identity systems, matrix operations, and the distinction between numerical equality and individual identity.
          </p>
        </div>

        <button
          onClick={() => onAskAI(`Check logical consistency and derive proofs for UIM equation: "${latexInput}"`)}
          className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Derive & Check Proof</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'editor' as const, label: 'Equation Editor & Library' },
          { id: 'symbols' as const, label: 'UIM Symbol Palette' },
          { id: 'equality-vs-identity' as const, label: 'Numerical Equality vs. Identity' },
          { id: 'proof' as const, label: 'Proof Workspace' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
              activeSubTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Form */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase font-mono">UIM EQUATION BUILDER</h2>

            <form onSubmit={handleCreateEquation} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">TITLE</label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">LATEX EXPRESSION</label>
                <textarea
                  value={latexInput}
                  onChange={(e) => setLatexInput(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">DESCRIPTION</label>
                <textarea
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Save Equation to Library</span>
              </button>
            </form>
          </div>

          {/* Equation Library */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase font-mono">UIM EQUATION LIBRARY ({equations.length})</h2>

            <div className="space-y-3">
              {equations.map((eq) => (
                <div key={eq.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-100">{eq.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {eq.domain}
                    </span>
                  </div>
                  <div className="p-3 rounded bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-800 overflow-x-auto">
                    {eq.latex}
                  </div>
                  <p className="text-xs text-slate-400">{eq.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'symbols' && (
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase font-mono">UIM SYMBOL PALETTE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SYMBOLS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleAddSymbol(s.symbol)}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
              >
                <div className="text-sm font-mono text-cyan-400 group-hover:scale-105 transition-transform">{s.symbol}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-sans">{s.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'equality-vs-identity' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100">Numerical Equality vs. Individual Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-300 font-mono">NUMERICAL EQUALITY (x = y)</h3>
              <p className="leading-relaxed">
                Refers to attribute identicalness. Two particles or variables are numerically equal if all measurable scalar quantities (e.g., mass = 1.0, charge = -1) are identical.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-300 font-mono">INDIVIDUAL IDENTITY (I_A =_I I_B)</h3>
              <p className="leading-relaxed">
                Refers to structural and topological invariance along a continuous trajectory. Even if attributes match, Entity A and Entity B remain non-identical in structural space unless connected by a continuous identity mapping.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'proof' && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-100">UIM Formal Proof Workspace</h2>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
            <div>Theorem 1: Topological Identity Invariance</div>
            <div className="text-slate-500">Let M be a smooth 4-manifold with metric tensor g_mu_nu.</div>
            <div className="text-cyan-400">1. Assume I(A) is defined as the integrated Betti topology over M.</div>
            <div className="text-cyan-400">2. Apply smooth deformation field Phi(x).</div>
            <div className="text-cyan-400">3. Since homology groups are topological invariants, Betti(M) is preserved.</div>
            <div className="text-emerald-400 font-bold pt-2">Q.E.D. Identity is invariant under continuous metric shifts.</div>
          </div>
        </div>
      )}
    </div>
  );
};
