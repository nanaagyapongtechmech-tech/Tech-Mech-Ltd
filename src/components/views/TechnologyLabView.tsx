import React, { useState } from 'react';
import { Wrench, Layers, Zap, Cpu, Atom, Sparkles } from 'lucide-react';

interface TechDomain {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  specifications: { key: string; val: string }[];
}

const TECH_ITEMS: TechDomain[] = [
  {
    id: 'tech-1',
    name: 'Vacuum-Casimir Transduction Reactor',
    icon: '⚡',
    category: 'Energy & Field Generation',
    description: 'A conceptual energy conversion device utilizing asymmetric nano-plate Casimir geometry to induce steady micro-force gradients.',
    specifications: [{ key: 'Power Output', val: '12.4 kW/m³' }, { key: 'Efficiency', val: '94.2%' }, { key: 'Fuel Source', val: 'Zero-Point Quantum Vacuum' }]
  },
  {
    id: 'tech-2',
    name: 'Magnetoplasmadynamic Helicon Thruster',
    icon: '🚀',
    category: 'Space Systems & Propulsion',
    description: 'High-specific-impulse plasma propulsion system utilizing RF helicon wave ionization and magnetic nozzle acceleration.',
    specifications: [{ key: 'Specific Impulse (Isp)', val: '8,500 sec' }, { key: 'Thrust Density', val: '420 N/m²' }, { key: 'Working Fluid', val: 'Ionized Hydrogen Plasma' }]
  },
  {
    id: 'tech-3',
    name: 'Molecular Assembler Nanogrid Array',
    icon: '🔬',
    category: 'Nanotechnology & Materials',
    description: 'Atomically precise mechanical manufacturing array capable of custom topological metamaterial synthesis.',
    specifications: [{ key: 'Resolution', val: '0.1 Nanometer' }, { key: 'Assembly Speed', val: '10^9 atoms/sec' }, { key: 'Substrate', val: 'Graphene Lattice' }]
  }
];

export const TechnologyLabView: React.FC = () => {
  const [selectedTechId, setSelectedTechId] = useState<string>('tech-1');
  const selectedTech = TECH_ITEMS.find(t => t.id === selectedTechId) || TECH_ITEMS[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            TECHNOLOGY & ADVANCED INVENTION LAB
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Advanced Inventions, Reactors & Space Systems</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore speculative engineering designs, energy transducers, plasma thrusters, and nanotech assemblers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tech Selector */}
        <div className="space-y-3">
          {TECH_ITEMS.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setSelectedTechId(tech.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedTechId === tech.id
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="text-xl mb-1">{tech.icon}</div>
              <div className="text-xs font-bold font-mono">{tech.name}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{tech.category}</div>
            </button>
          ))}
        </div>

        {/* Selected Tech Specification Sheet */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedTech.icon}</span>
              <h2 className="text-base font-bold text-slate-100">{selectedTech.name}</h2>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {selectedTech.category}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{selectedTech.description}</p>

          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-400 font-mono uppercase">ENGINEERING SPECIFICATIONS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {selectedTech.specifications.map((spec, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">{spec.key}</div>
                  <div className="text-sm font-bold text-cyan-300 mt-0.5">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
