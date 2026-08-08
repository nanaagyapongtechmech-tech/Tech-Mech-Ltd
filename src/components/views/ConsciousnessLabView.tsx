import React, { useState } from 'react';
import { CognitiveNode } from '../../types/lab';
import { Brain, Network, Play, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

export const ConsciousnessLabView: React.FC = () => {
  const [nodes, setNodes] = useState<CognitiveNode[]>([
    { id: 'c1', module: 'Perception', name: 'Sensorium Input Array', description: 'Gathers external dimensional telemetry.', activityLevel: 0.85, signals: ['Data_Stream_01'] },
    { id: 'c2', module: 'Memory', name: 'Episodic Store Matrix', description: 'Retains high-dimensional state vectors.', activityLevel: 0.60, signals: ['Memory_Recall'] },
    { id: 'c3', module: 'Self-model', name: 'Recursive Self-Observer', description: 'Calculates identity invariants and internal state feedback.', activityLevel: 0.92, signals: ['Self_Reference_Loop'] },
    { id: 'c4', module: 'Goals', name: 'Teleological Utility Engine', description: 'Evaluates goal vectors and optimization paths.', activityLevel: 0.75, signals: ['Action_Command'] }
  ]);

  const [integrationScore, setIntegrationScore] = useState(4.28);

  const handlePulse = () => {
    setNodes(prev => prev.map(n => ({
      ...n,
      activityLevel: Math.min(1.0, Math.max(0.2, n.activityLevel + (Math.random() * 0.3 - 0.15)))
    })));
    setIntegrationScore(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Cognitive Modeling Notice:</strong> Models in this lab are conceptual artificial cognitive architectures and mathematical feedback graphs, not biological sentient entities.
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            CONSCIOUSNESS & COGNITIVE ARCHITECTURE LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Information Integration & Self-Referential Feedback</h1>
          <p className="text-xs text-slate-400 mt-1">
            Model artificial perception, episodic memory, recursive self-models, and teleological feedback loops.
          </p>
        </div>

        <button
          onClick={handlePulse}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Simulate Cognitive Pulse</span>
        </button>
      </div>

      {/* Metric Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">INTEGRATED INFORMATION Φ (PHI)</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{integrationScore} bits</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">RECURSIVE FEEDBACK LOOPS</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">12 Active Loops</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">SELF-MODEL STABILITY</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">98.4% Invariant</div>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div key={node.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">{node.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {node.module}
              </span>
            </div>
            <p className="text-xs text-slate-400">{node.description}</p>

            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                <span>ACTIVITY LEVEL</span>
                <span>{Math.round(node.activityLevel * 100)}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${node.activityLevel * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
