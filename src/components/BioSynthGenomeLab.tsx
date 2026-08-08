import React, { useState } from 'react';
import {
  Dna,
  Zap,
  Activity,
  Sparkles,
  FlaskConical,
  Bug,
  Shield,
  Eye,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface GeneTrait {
  id: string;
  name: string;
  code: string;
  category: 'Metabolic' | 'Defense' | 'Neural' | 'Exotic';
  powerLevel: number;
  description: string;
  active: boolean;
}

const INITIAL_GENES: GeneTrait[] = [
  {
    id: 'g1',
    name: 'Bioluminescent Skin',
    code: 'ATCG-LUM-88',
    category: 'Exotic',
    powerLevel: 42,
    description: 'Emits high-frequency neon light pulses underwater and in zero-G abysses.',
    active: true
  },
  {
    id: 'g2',
    name: 'Cyber Kinetic Reflexes',
    code: 'GCTA-NEU-99',
    category: 'Neural',
    powerLevel: 88,
    description: 'Accelerates synaptic transmission speed by 400% for hyper-agility.',
    active: true
  },
  {
    id: 'g3',
    name: 'Plasma Acid Secretion',
    code: 'CGAT-ACD-12',
    category: 'Defense',
    powerLevel: 75,
    description: 'Secretes corrosive thermal plasma capable of melting titanium hull plating.',
    active: false
  },
  {
    id: 'g4',
    name: 'Quantum Telepathic Link',
    code: 'TAAC-TEL-55',
    category: 'Neural',
    powerLevel: 95,
    description: 'Enables instant non-local telepathic communication across planetary systems.',
    active: true
  },
  {
    id: 'g5',
    name: 'Sub-Zero Cryo Adaptability',
    code: 'CGCG-ICE-04',
    category: 'Metabolic',
    powerLevel: 60,
    description: 'Prevents cellular freezing down to -270°C absolute zero conditions.',
    active: false
  }
];

export const BioSynthGenomeLab: React.FC = () => {
  const [genes, setGenes] = useState<GeneTrait[]>(INITIAL_GENES);
  const [mutationRate, setMutationRate] = useState<number>(35);
  const [organismName, setOrganismName] = useState<string>('Xeno-Aetherius Prime');
  const [simulationLog, setSimulationLog] = useState<string[]>([
    'Genome Sequencer Ready.',
    'Strand ATCG-LUM-88 verified for stable synthesis.'
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const toggleGene = (id: string) => {
    setGenes((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextState = !g.active;
          setSimulationLog((logs) => [
            ...logs,
            `[GENE SPLICE] Trait ${g.name} (${g.code}) ${nextState ? 'ACTIVATED' : 'DEACTIVATED'}.`
          ]);
          return { ...g, active: nextState };
        }
        return g;
      })
    );
  };

  const handleSimulateMutation = () => {
    setIsSimulating(true);
    setSimulationLog((logs) => [...logs, `[SIMULATION] Initiating Gene Mutation Probe at ${mutationRate}% rate...`]);

    setTimeout(() => {
      setIsSimulating(false);
      const randomTraitIndex = Math.floor(Math.random() * genes.length);
      const targetGene = genes[randomTraitIndex];
      const success = Math.random() * 100 < mutationRate;

      if (success) {
        setSimulationLog((logs) => [
          ...logs,
          `[MUTATION SUCCESS] Trait "${targetGene.name}" mutated into Hyper-Evolution Stage (+15 Power)!`
        ]);
        setGenes((prev) =>
          prev.map((g, idx) => (idx === randomTraitIndex ? { ...g, powerLevel: Math.min(100, g.powerLevel + 15), active: true } : g))
        );
      } else {
        setSimulationLog((logs) => [
          ...logs,
          `[MUTATION WARNING] Gene collision detected. Genome stabilized without defect.`
        ]);
      }
    }, 1200);
  };

  const activeGenes = genes.filter((g) => g.active);
  const totalPowerScore = activeGenes.reduce((sum, g) => sum + g.powerLevel, 0);
  const averageFidelity = Math.round((activeGenes.length / genes.length) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 rounded-3xl border border-emerald-800/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5" /> APP 9 • BIOSYNTH GENOME LAB
            </span>
            <span className="text-xs text-slate-400 font-mono">ALIEN DNA SEQUENCER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-emerald-400" />
            BioSynth Alien Genome & DNA Lab
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Recombine extraterrestrial DNA strands, simulate mutation evolutionary vectors, and synthesize custom bio-creatures with real-time gene trait splicing.
          </p>
        </div>

        {/* Organism Power Stats */}
        <div className="bg-slate-950/80 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">EVOLUTION POWER SCORE</div>
            <div className="text-xl font-extrabold text-white font-mono">{totalPowerScore} PTS</div>
            <div className="text-[11px] text-teal-400 font-mono">
              Fidelity Rate: {averageFidelity}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left DNA Traits Splicer */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Dna className="w-4 h-4 text-emerald-400" />
              DNA Gene Trait Strand Splicer
            </h3>
            <span className="text-xs font-mono text-emerald-400">{activeGenes.length} / {genes.length} Traits Active</span>
          </div>

          <div className="space-y-3">
            {genes.map((gene) => (
              <div
                key={gene.id}
                onClick={() => toggleGene(gene.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  gene.active
                    ? 'bg-emerald-950/60 border-emerald-500/60 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-white">{gene.name}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                      {gene.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 text-[10px] font-mono border border-teal-800">
                      {gene.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{gene.description}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-1">{gene.powerLevel} PWR</div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                    gene.active ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}>
                    {gene.active ? 'SPLICED' : 'INACTIVE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Mutation Simulator Panel */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Mutation Vector Probe
            </h4>

            <div className="mb-4">
              <label className="text-[10px] text-slate-400 font-mono block mb-1">MUTATION PROBABILITY RATE ({mutationRate}%)</label>
              <input
                type="range"
                min="5"
                max="95"
                value={mutationRate}
                onChange={(e) => setMutationRate(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <button
              onClick={handleSimulateMutation}
              disabled={isSimulating}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSimulating ? <Activity className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
              <span>{isSimulating ? 'Splicing Strand...' : 'Simulate Mutation'}</span>
            </button>
          </div>

          {/* Simulation Output Terminal */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Genome Lab Terminal</h5>
            <div className="p-3 bg-slate-900 rounded-xl h-40 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1">
              {simulationLog.map((log, idx) => (
                <div key={idx} className={log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('MUTATION') ? 'text-amber-300' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
