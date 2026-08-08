import React, { useState } from 'react';
import { Activity, Play, Pause, RotateCcw, Sliders } from 'lucide-react';

export const SimulationEngineView: React.FC = () => {
  const [initialVal, setInitialVal] = useState<number>(100);
  const [decayRate, setDecayRate] = useState<number>(0.05);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            SIMULATION ENGINE • NUMERICAL INTEGRATION
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">General Numerical State Engine</h1>
          <p className="text-xs text-slate-400 mt-1">
            Run differential equations, time-series numerical integrations, and phase-space projections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-xs font-bold text-slate-300 uppercase">INITIAL CONDITIONS</h2>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>INITIAL STATE VALUE (S0)</span>
              <span className="text-cyan-400">{initialVal}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              value={initialVal}
              onChange={(e) => setInitialVal(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>DECAY / GROWTH RATE (k)</span>
              <span className="text-cyan-400">{decayRate.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={decayRate}
              onChange={(e) => setDecayRate(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase">TIME-SERIES INTEGRATION GRAPH</h2>

          <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-end justify-between gap-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const val = initialVal * Math.exp(-decayRate * i);
              const heightPct = Math.min(100, (val / 500) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-cyan-400/80 transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[9px] font-mono text-slate-600">t{i}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
