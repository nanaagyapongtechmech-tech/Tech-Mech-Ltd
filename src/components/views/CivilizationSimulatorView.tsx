import React, { useState } from 'react';
import { CivilizationState } from '../../types/lab';
import { Users, ShieldAlert, Play, RotateCcw, TrendingUp } from 'lucide-react';

export const CivilizationSimulatorView: React.FC = () => {
  const [civ, setCiv] = useState<CivilizationState>({
    id: 'civ-1',
    name: 'Type-I Sol Federation',
    populationBillions: 12.4,
    techLevel: 1.25,
    energyLevelGW: 450000,
    stabilityPct: 92,
    educationIndex: 0.94,
    timelineYears: 2150,
    currentEra: 'Interplanetary Dyson-Swarm Expansion',
    logs: ['Year 2150: First Orbital Vacuum Resonance Harvester commissioned.']
  });

  const handleAdvanceEra = () => {
    setCiv(prev => ({
      ...prev,
      timelineYears: prev.timelineYears + 25,
      techLevel: +(prev.techLevel + 0.1).toFixed(2),
      energyLevelGW: Math.round(prev.energyLevelGW * 1.5),
      populationBillions: +(prev.populationBillions + 0.8).toFixed(1),
      logs: [`Year ${prev.timelineYears + 25}: Kardashev Level increased to ${(prev.techLevel + 0.1).toFixed(2)}.`, ...prev.logs]
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Simulation Outcome Notice:</strong> Civilization metrics are fictional speculative models for studying techno-social dynamics, not predictions of real societies.
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            CIVILIZATION SIMULATOR • KARDASHEV SCALE ENGINE
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">{civ.name} (Year {civ.timelineYears})</h1>
          <p className="text-xs text-slate-400 mt-1">{civ.currentEra}</p>
        </div>

        <button
          onClick={handleAdvanceEra}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Advance Era (+25 Years)</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">KARDASHEV SCALE</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">Type {civ.techLevel}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">ENERGY HARVESTING</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{civ.energyLevelGW.toLocaleString()} GW</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">POPULATION</div>
          <div className="text-xl font-bold text-slate-200 mt-1">{civ.populationBillions} Billion</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-slate-500 text-[10px]">STABILITY INDEX</div>
          <div className="text-xl font-bold text-amber-400 mt-1">{civ.stabilityPct}%</div>
        </div>
      </div>
    </div>
  );
};
