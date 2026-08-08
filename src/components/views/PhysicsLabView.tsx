import React, { useState } from 'react';
import { Atom, ShieldCheck, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

type PhysicsDomain =
  | 'mechanics'
  | 'electromagnetism'
  | 'relativity'
  | 'quantum'
  | 'thermodynamics'
  | 'fields'
  | 'plasma'
  | 'cosmology'
  | 'information';

interface PhysicsModule {
  id: PhysicsDomain;
  title: string;
  icon: string;
  establishedEq: string;
  speculativeEq: string;
  overview: string;
  details: string;
}

const MODULES: PhysicsModule[] = [
  {
    id: 'quantum',
    title: 'Quantum Mechanics & Vacuum Fields',
    icon: '⚛️',
    establishedEq: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi',
    speculativeEq: '\\langle 0 | \\hat{T}_{\\mu\\nu} | 0 \\rangle \\implies \\text{Zero Point Casimir Differential Engine}',
    overview: 'Schrödinger wave equation, state vectors, and quantum vacuum fluctuation pressure.',
    details: 'Established quantum mechanics governs atomic energy levels and field quantizations. Speculative models explore harnessing vacuum fluctuations for macro-scale forces.'
  },
  {
    id: 'relativity',
    title: 'Relativity & Spacetime Curvature',
    icon: '🌌',
    establishedEq: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
    speculativeEq: 'g_{\\mu\\nu}(\\Phi_{\\text{UIM}}) = \\eta_{\\mu\\nu} + h_{\\mu\\nu}(\\Delta_{\\text{identity}})',
    overview: 'Einstein field equations, geodesic motion, and metric tensor distortions.',
    details: 'General relativity treats gravity as geometric curvature of 4D spacetime. Speculative UIM metrics explore coupling identity gradients with spacetime metrics.'
  },
  {
    id: 'cosmology',
    title: 'Cosmology & Multi-Dimensional Expansion',
    icon: '🪐',
    establishedEq: 'H^2 = \\frac{8\\pi G}{3}\\rho - \\frac{k c^2}{a^2} + \\frac{\\Lambda c^2}{3}',
    speculativeEq: '\\Omega_{\\text{dark}} = \\sum_{d=4}^{36} \\int d^{d-4}x \\,\\rho_{\\text{higher-dim}}',
    overview: 'Friedmann equations, dark energy density, and higher-dimensional projections.',
    details: 'Standard Lambda-CDM cosmology models cosmic inflation and expansion. Multi-dimensional extensions explore dark matter as higher-dimensional spatial projections.'
  },
  {
    id: 'plasma',
    title: 'Plasma & Magnetohydrodynamics (MHD)',
    icon: '⚡',
    establishedEq: '\\frac{\\partial \\mathbf{B}}{\\partial t} = \\nabla \\times (\\mathbf{v} \\times \\mathbf{B}) + \\eta \\nabla^2 \\mathbf{B}',
    speculativeEq: '\\mathbf{J}_{\\text{transduction}} = \\sigma (\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B}) + \\nabla \\cdot \\Psi_{\\text{vacuum}}',
    overview: 'Maxwell-Vlasov equations, plasma magnetic reconnection, and pinch confinement.',
    details: 'Magnetohydrodynamics governs high-temperature ionized gas dynamics. Speculative designs model plasma pinch transducers for space propulsion.'
  },
  {
    id: 'information',
    title: 'Information Physics & Landauer Principle',
    icon: '💻',
    establishedEq: 'S = -k_B \\sum p_i \\ln p_i \\quad \\Delta E \\ge k_B T \\ln 2',
    speculativeEq: 'I(\\text{Matter}) \\equiv S_{\\text{Bekenstein}} \\times \\nabla_{\\text{ID}}',
    overview: 'Shannon entropy, thermodynamic erasure cost, and holographic bounds.',
    details: 'Information physics establishes that information is physical. Erasure of 1 bit produces mandatory heat dissipation kB T ln(2).'
  }
];

export const PhysicsLabView: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<PhysicsDomain>('quantum');
  const activeModule = MODULES.find(m => m.id === selectedDomain) || MODULES[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Atom className="w-4 h-4" />
            PHYSICS LAB • ESTABLISHED & SPECULATIVE MODELS
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Theoretical & Applied Physics Explorer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore mechanics, quantum fields, relativity, plasma, cosmology, and information physics with clear scientific distinctions.
          </p>
        </div>
      </div>

      {/* Domain Grid Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {MODULES.map((m) => {
          const isActive = selectedDomain === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedDomain(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="text-lg">{m.icon}</div>
              <div className="text-xs font-bold mt-1 line-clamp-1">{m.title}</div>
            </button>
          );
        })}
      </div>

      {/* Module Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Established Physics */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">ESTABLISHED PHYSICS</h2>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-100">{activeModule.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activeModule.overview}</p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-slate-500">CANONICAL EQUATION</div>
              <div className="text-xs font-mono text-emerald-300 overflow-x-auto">{activeModule.establishedEq}</div>
            </div>
          </div>
        </div>

        {/* Speculative Physics */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">SPECULATIVE / LAB EXTENSIONS</h2>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">{activeModule.details}</p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-slate-500">SPECULATIVE EXTENSION EQUATION</div>
              <div className="text-xs font-mono text-amber-300 overflow-x-auto">{activeModule.speculativeEq}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
