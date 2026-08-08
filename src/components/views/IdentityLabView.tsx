import React, { useState } from 'react';
import { Fingerprint, GitBranch, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface EntityNode {
  id: string;
  name: string;
  attributes: { key: string; val: string }[];
  identityToken: string;
}

export const IdentityLabView: React.FC = () => {
  const [entities, setEntities] = useState<EntityNode[]>([
    {
      id: 'ent-1',
      name: 'Entity Alpha (Observer Baseline)',
      attributes: [{ key: 'Mass', val: '1.0' }, { key: 'Spin', val: '1/2' }, { key: 'Location', val: 'Vector(0,0,0)' }],
      identityToken: 'ID_ALPHA_001_A9F'
    },
    {
      id: 'ent-2',
      name: 'Entity Beta (Attribute Match)',
      attributes: [{ key: 'Mass', val: '1.0' }, { key: 'Spin', val: '1/2' }, { key: 'Location', val: 'Vector(1,2,0)' }],
      identityToken: 'ID_BETA_002_C3E'
    }
  ]);

  const [similarityScore, setSimilarityScore] = useState(0.85);
  const [identityEquivalence, setIdentityEquivalence] = useState(false);

  const handleComputeMatrix = () => {
    setSimilarityScore(0.92);
    setIdentityEquivalence(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Fingerprint className="w-4 h-4" />
            IDENTITY LAB • STRUCTURAL & ONTOLOGICAL ANALYSIS
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Identity, Difference & Multiplicity Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze self-reference, similarity metrics, equivalence classes, and non-Euclidean identity transformations.
          </p>
        </div>

        <button
          onClick={handleComputeMatrix}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Compute Identity Matrix</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entities.map((ent) => (
          <div key={ent.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100">{ent.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {ent.identityToken}
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase">ATTRIBUTES</div>
              {ent.attributes.map((attr, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-950 text-xs font-mono border border-slate-800">
                  <span className="text-slate-400">{attr.key}:</span>
                  <span className="text-cyan-300">{attr.val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Identity Matrix Result */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">COMPUTED MATRIX RESULTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-500 text-[10px]">NUMERICAL SIMILARITY</div>
            <div className="text-lg font-bold text-emerald-400 mt-1">{(similarityScore * 100).toFixed(1)}%</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-500 text-[10px]">INDIVIDUAL IDENTITY EQUIVALENCE</div>
            <div className="text-lg font-bold text-amber-400 mt-1">{identityEquivalence ? 'TRUE' : 'FALSE (DISTINCT)'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-500 text-[10px]">DIFFERENCE DELTA (Δ_diff)</div>
            <div className="text-lg font-bold text-cyan-400 mt-1">0.381 ID-Units</div>
          </div>
        </div>
      </div>
    </div>
  );
};
