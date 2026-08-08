import React, { useState } from 'react';
import { GitBranch, Plus, ArrowRight, Sparkles } from 'lucide-react';

interface BranchNode {
  id: string;
  title: string;
  condition: string;
  probability: number;
  events: string[];
}

export const PossibilityEngineView: React.FC = () => {
  const [branches, setBranches] = useState<BranchNode[]>([
    {
      id: 'b1',
      title: 'Timeline A: Zero-Point Energy Breakthrough',
      condition: 'Casimir micro-piston achieves >10 kW/m³ density',
      probability: 0.65,
      events: ['Grid decarbonization complete', 'Interplanetary plasma propulsion deployed']
    },
    {
      id: 'b2',
      title: 'Timeline B: Sub-optimal Coupling Friction',
      condition: 'Vacuum fluctuations constrained by thermal noise',
      probability: 0.35,
      events: ['Alternative fusion containment prioritized']
    }
  ]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <GitBranch className="w-4 h-4" />
            POSSIBILITY ENGINE • SCENARIO TREE & DECISION BRANCHING
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Branching Scenario & Contingency Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Model conditional branching trees, causal dependencies, assumptions, and probabilistic outcomes.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {branches.map((b) => (
          <div key={b.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="text-sm font-bold text-slate-100">{b.title}</span>
              <span className="text-xs font-bold text-cyan-400">Probability: {Math.round(b.probability * 100)}%</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">IF: {b.condition}</div>
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              {b.events.map((ev, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  ➔ {ev}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
