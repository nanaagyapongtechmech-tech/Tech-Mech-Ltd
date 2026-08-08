import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Activity } from 'lucide-react';

export const EmergenceLabView: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [gridSize, setGridSize] = useState<number>(30);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [ruleType, setRuleType] = useState<'Conway B3/S23' | 'HighLife B36/S23' | 'Seeds B2/S'>('Conway B3/S23');

  useEffect(() => {
    // Init cellular grid
    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.random() > 0.7)
    );
    setGrid(newGrid);
  }, [gridSize]);

  useEffect(() => {
    if (!isRunning || grid.length === 0) return;

    const interval = setInterval(() => {
      setGrid(prevGrid => {
        const rows = prevGrid.length;
        const cols = prevGrid[0].length;
        const nextGrid = prevGrid.map(row => [...row]);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            let neighbors = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = (r + dr + rows) % rows;
                const nc = (c + dc + cols) % cols;
                if (prevGrid[nr][nc]) neighbors++;
              }
            }

            if (prevGrid[r][c]) {
              nextGrid[r][c] = neighbors === 2 || neighbors === 3;
            } else {
              nextGrid[r][c] = neighbors === 3;
            }
          }
        }
        return nextGrid;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, grid.length]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            EMERGENCE LAB • CELLULAR AUTOMATA & AGENT SYSTEMS
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">State → Rule → Transition → Emergent Pattern</h1>
          <p className="text-xs text-slate-400 mt-1">
            Observe complex macrodynamics emerge spontaneously from simple local micro-interaction rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : 'Start'} Simulation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Grid */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="aspect-square max-h-[400px] rounded-xl bg-slate-950 border border-slate-800 p-2 grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => {
                    const next = grid.map(row => [...row]);
                    next[r][c] = !next[r][c];
                    setGrid(next);
                  }}
                  className={`rounded-sm transition-colors cursor-pointer ${
                    cell ? 'bg-cyan-400 shadow-[0_0_6px_rgba(56,189,248,0.5)]' : 'bg-slate-900/40 hover:bg-slate-800'
                  }`}
                />
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-xs font-bold text-slate-300 uppercase">EMERGENCE RULE SETS</h2>
          <div className="space-y-2">
            {(['Conway B3/S23', 'HighLife B36/S23', 'Seeds B2/S'] as const).map((rule) => (
              <button
                key={rule}
                onClick={() => setRuleType(rule)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                  ruleType === rule
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {rule}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
