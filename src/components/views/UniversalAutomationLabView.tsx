import React, { useState } from 'react';
import { Cpu, Play, RotateCcw, ArrowRight, Plus, Sparkles, ShieldAlert, Layers } from 'lucide-react';

interface UAEntity {
  id: string;
  name: string;
  identityVector: number[];
  state: string;
}

interface UARule {
  id: string;
  name: string;
  condition: string;
  transformation: string;
}

export const UniversalAutomationLabView: React.FC = () => {
  const [entities, setEntities] = useState<UAEntity[]>([
    { id: 'e1', name: 'Identity Entity A', identityVector: [1, 0, 0, 1], state: 'Stable Base' },
    { id: 'e2', name: 'Identity Entity B', identityVector: [0, 1, 1, 0], state: 'Excited Potential' }
  ]);

  const [rules, setRules] = useState<UARule[]>([
    { id: 'r1', name: 'Identity Difference Operator', condition: 'Diff(A, B) > 0.5', transformation: 'Generate Emergent Relation R' },
    { id: 'r2', name: 'Recursive Feedback Rule', condition: 'State == Excited Potential', transformation: 'Apply Transformation Matrix M' }
  ]);

  const [step, setStep] = useState(0);
  const [activeStage, setActiveStage] = useState<'Identity' | 'Difference' | 'Relationship' | 'Transformation' | 'Emergence'>('Identity');
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    'System initialized with 2 Base UA Entities.',
    'Axioms validated: Non-zero identity differential detected.'
  ]);

  const handleRunStep = () => {
    const stages: ('Identity' | 'Difference' | 'Relationship' | 'Transformation' | 'Emergence')[] = [
      'Identity', 'Difference', 'Relationship', 'Transformation', 'Emergence'
    ];
    const nextStage = stages[(step + 1) % stages.length];
    setStep(step + 1);
    setActiveStage(nextStage);

    setSimulationLogs(prev => [
      `Step ${step + 1}: Transitioning stage to [${nextStage}]`,
      `Computed transformation operator on vector space...`,
      ...prev
    ]);
  };

  const handleReset = () => {
    setStep(0);
    setActiveStage('Identity');
    setSimulationLogs(['System reset to initial UA configuration.']);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Disclaimer Header */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>User-Created Framework Notice:</strong> Universal Automation (UA) is a user-created philosophical and mathematical framework for modeling structural emergence.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold text-amber-400">SPECULATIVE MODEL</span>
      </div>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            UNIVERSAL AUTOMATION (UA) LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Identity → Difference → Relationship → Transformation → Emergence</h1>
          <p className="text-xs text-slate-400 mt-1">
            Construct axiomatic entities, define identity differences, and observe emergent dynamics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunStep}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run Transformation Step</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Stage Pipeline */}
      <div className="grid grid-cols-5 gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        {(['Identity', 'Difference', 'Relationship', 'Transformation', 'Emergence'] as const).map((stage, idx) => {
          const isActive = activeStage === stage;
          return (
            <div
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.2)] scale-105'
                  : 'bg-slate-950/60 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500">STAGE {idx + 1}</div>
              <div className="text-xs font-bold font-mono mt-0.5">{stage}</div>
            </div>
          );
        })}
      </div>

      {/* Entities & Rules Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entities List */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-slate-200 uppercase font-mono">UA ENTITIES & IDENTITY VECTORS</h2>
            <span className="text-[10px] font-mono text-cyan-400">{entities.length} Entities</span>
          </div>

          <div className="space-y-3">
            {entities.map((e) => (
              <div key={e.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100">{e.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {e.state}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                  Vector: [{e.identityVector.join(', ')}]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules & Transformations */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-slate-200 uppercase font-mono">AXIOMATIC TRANSFORMATION RULES</h2>
            <span className="text-[10px] font-mono text-cyan-400">{rules.length} Rules</span>
          </div>

          <div className="space-y-3">
            {rules.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-amber-300">{r.name}</div>
                <div className="text-[11px] text-slate-300 font-mono">IF {r.condition}</div>
                <div className="text-[11px] text-cyan-400 font-mono">THEN {r.transformation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Simulation Logs */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 font-mono">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">UA SIMULATION LOGS</h3>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 max-h-40 overflow-y-auto space-y-1 text-xs text-slate-300 custom-scrollbar">
          {simulationLogs.map((log, i) => (
            <div key={i} className="text-[11px]">
              <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
