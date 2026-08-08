import React, { useState } from 'react';
import { CircleDot, Play, RotateCcw, Zap, Sparkles } from 'lucide-react';

export const VacuumLabView: React.FC = () => {
  const [cutoffMomentum, setCutoffMomentum] = useState(1.2);
  const [plateDistanceNm, setPlateDistanceNm] = useState(10);
  const [fieldStrength, setFieldStrength] = useState(0.5);

  const energyDensity = (1.0 / (plateDistanceNm * plateDistanceNm * plateDistanceNm)) * cutoffMomentum * 100;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <CircleDot className="w-4 h-4" />
            VACUUM MECHANICS & ZERO-POINT FIELD LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Vacuum, Fields, Space, Time & Boundaries</h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate Casimir force pressure differentials, quantum zero-point fluctuations, and vacuum boundary interactions.
          </p>
        </div>
      </div>

      {/* Control Panel & Live Energy Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">VACUUM PARAMETERS</h2>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>CASIMIR PLATE DISTANCE</span>
              <span className="text-cyan-400">{plateDistanceNm} nm</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={plateDistanceNm}
              onChange={(e) => setPlateDistanceNm(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>MOMENTUM CUTOFF Λ</span>
              <span className="text-cyan-400">{cutoffMomentum} GeV</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={cutoffMomentum}
              onChange={(e) => setCutoffMomentum(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>INDUCTION FIELD STRENGTH</span>
              <span className="text-cyan-400">{fieldStrength} T</span>
            </div>
            <input
              type="range"
              min="0"
              max="2.0"
              step="0.05"
              value={fieldStrength}
              onChange={(e) => setFieldStrength(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        {/* Live Visualizer Canvas & Metrics */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">VACUUM PRESSURE SIMULATION</h2>
            <span className="text-xs font-mono text-emerald-400">P_Casimir: {energyDensity.toFixed(2)} pN/μm²</span>
          </div>

          {/* Canvas Box representing Casimir plates */}
          <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
            {/* Left Casimir Plate */}
            <div className="absolute top-0 bottom-0 bg-slate-700 w-4 border-r border-cyan-400" style={{ left: '25%' }} />

            {/* Right Casimir Plate */}
            <div
              className="absolute top-0 bottom-0 bg-slate-700 w-4 border-l border-cyan-400 transition-all duration-300"
              style={{ left: `${25 + (plateDistanceNm / 100) * 50}%` }}
            />

            {/* Simulated Quantum Particles in vacuum */}
            <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-around">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"
                  style={{ animationDuration: `${0.4 + (i % 5) * 0.2}s` }}
                />
              ))}
            </div>

            <div className="absolute bottom-2 font-mono text-[10px] text-slate-500">
              Spatial Gap: {plateDistanceNm} nanometers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
