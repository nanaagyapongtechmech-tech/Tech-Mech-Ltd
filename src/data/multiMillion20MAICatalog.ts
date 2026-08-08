import { BlueprintItem, BlueprintCategory } from '../types';

export function getMultiMillion20MAIBlueprintByIndex(i: number): BlueprintItem {
  const CATEGORIES: BlueprintCategory[] = [
    'Aerospace & Aeronautics',
    'Mechanical & Engines',
    'Architecture & Mega-Structures',
    'Computing & Cybernetics',
    'Robotics & Automation',
    'Energy & Quantum',
    'Automotive & Transportation',
    'Medical & Biotechnology',
    'Optics & Astronomy',
    'Consumer Technology',
    'To Be Built Concepts'
  ];

  const AI_SEEDS_20M = [
    { name: 'Quantum Neuro-Synaptic Biomorphic Processor Core', cat: 'Computing & Cybernetics', year: 2026, pat: 'AI-40M/NEURO-', inv: 'Google DeepMind AI Engineering Core', tag: 'AI Neuro Core' },
    { name: 'Autonomous Orbital Solar Dyson Swarm Concentrator Node', cat: 'Energy & Quantum', year: 2027, pat: 'AI-40M/DYSON-', inv: 'Antigravity Autonomous CAD Agent', tag: 'Dyson Concentrator' },
    { name: 'Hyper-Dimensional Gravitational Lensing Antenna Array', cat: 'Optics & Astronomy', year: 2028, pat: 'AI-40M/GRAV-LENS-', inv: 'Gemini Neural Design System 3.6', tag: 'Gravitational Lens' },
    { name: 'Zero-Emission Atmospheric CO2-to-Graphene Synthesizer', cat: 'Architecture & Mega-Structures', year: 2026, pat: 'AI-40M/CO2-SYNTH-', inv: 'AI Cybernetic Synthesis Lab', tag: 'Graphene Synthesizer' },
    { name: 'Sub-Atomic Fusion Plasma Torus Magnetic Confinement Ring', cat: 'Energy & Quantum', year: 2029, pat: 'AI-40M/FUSION-RING-', inv: 'Google Quantum AI Division', tag: 'Fusion Plasma Ring' },
    { name: 'Self-Replicating Nanotech Cellular Tissue Regeneration Matrix', cat: 'Medical & Biotechnology', year: 2027, pat: 'AI-40M/NANO-REGEN-', inv: 'DeepMind Biotech AI Engine', tag: 'Tissue Regenerator' },
    { name: 'Relativistic Quantum Entangled Deep-Space Telemetry Transceiver', cat: 'Aerospace & Aeronautics', year: 2030, pat: 'AI-40M/ENTANGLED-TX-', inv: 'Deep Space AI Telemetry Lab', tag: 'Quantum Transceiver' },
    { name: 'Autonomous Ocean-Thermal Clean Desalination Power Plant', cat: 'Architecture & Mega-Structures', year: 2026, pat: 'AI-40M/DESAL-PLANT-', inv: 'Antigravity Infrastructure Agent', tag: 'Ocean Desalination' },
    { name: 'Superconducting Maglev Hyper-Loop Intercontinental Vessel', cat: 'Automotive & Transportation', year: 2028, pat: 'AI-40M/MAGLEV-VESSEL-', inv: 'AI Autonomous Transit Systems', tag: 'Hyper-Loop Vessel' },
    { name: 'AI Autonomous Robot Swarm Construction Exoskeleton Unit', cat: 'Robotics & Automation', year: 2026, pat: 'AI-40M/SWARM-EXO-', inv: 'Google Robotics AI Lab', tag: 'Swarm Exoskeleton' },
    { name: 'Photonic Neural Tensor Accelerator Crystal Lattice', cat: 'Computing & Cybernetics', year: 2027, pat: 'AI-40M/TENSOR-CRYSTAL-', inv: 'Gemini Hardware Design Agent', tag: 'Photonic Tensor' },
    { name: 'Synthetic Bio-Luminescent Oxygen Regenerative Algae Tower', cat: 'Medical & Biotechnology', year: 2026, pat: 'AI-40M/BIO-TOWER-', inv: 'AI Environmental Design Core', tag: 'Bio-Algae Tower' },
    { name: 'Micro-Singularity Gravity Stabilized Energy Storage Cell', cat: 'Energy & Quantum', year: 2031, pat: 'AI-40M/SINGULARITY-CELL-', inv: 'Quantum Graviton AI Research', tag: 'Singularity Cell' },
    { name: 'Deep Planetary Geothermal Plasma Drilling Rig', cat: 'Mechanical & Engines', year: 2027, pat: 'AI-40M/PLASMA-DRILL-', inv: 'Antigravity Geothermal Engine', tag: 'Plasma Drill Rig' },
    { name: 'Orbital Kinetic Space Elevator Climber Module', cat: 'Aerospace & Aeronautics', year: 2029, pat: 'AI-40M/ELEVATOR-CLIMB-', inv: 'DeepMind Aerospace CAD Agent', tag: 'Space Elevator' },
    { name: 'Sub-Femto Optical Quantum Holographic Projection Lens', cat: 'Optics & Astronomy', year: 2026, pat: 'AI-40M/HOLOGRAM-LENS-', inv: 'Gemini Photonics AI Division', tag: 'Quantum Holo-Lens' },
    { name: 'Autonomous Interstellar Probe Ion Magnetoplasmadynamic Engine', cat: 'Aerospace & Aeronautics', year: 2032, pat: 'AI-40M/INTERSTELLAR-ION-', inv: 'Google DeepMind Deep Space Core', tag: 'MPD Interstellar Engine' },
    { name: 'Neural Bio-Interface Synaptic Cortex Telepathic Transducer', cat: 'Consumer Technology', year: 2026, pat: 'AI-40M/NEURAL-TRANSDUCER-', inv: 'AI Cybernetic Interface Team', tag: 'Synaptic Transducer' },
    { name: 'Anti-Gravity Super-Conducting Metamaterial Levitation Engine', cat: 'Mechanical & Engines', year: 2030, pat: 'AI-40M/ANTIGRAV-LEVITATOR-', inv: 'Antigravity Propulsion Core', tag: 'Antigravity Levitator' },
    { name: 'Autonomous Cybernetic Quantum Cyber-Shielding Defensive Node', cat: 'Computing & Cybernetics', year: 2027, pat: 'AI-40M/QUANTUM-SHIELD-', inv: 'Gemini Cyber-Defense AI Agent', tag: 'Quantum Cyber-Shield' }
  ];

  const AI_SUB_SYSTEMS_20M = [
    { title: 'AI-Synthesized Nanotube Super-Lattice Grid', code: 'NANO-GRID', mat: 'AI-Optimized Single-Crystal Carbon' },
    { title: 'Neural-Optimized Superconducting Heat Channel', code: 'NEURAL-HEAT', mat: 'Superconducting YBCO-Graphene Matrix' },
    { title: 'Sub-Atomic Quantum Magnetic Torus Convolver', code: 'QUANTUM-TORUS', mat: 'Magnetic Metamaterial Alloy' },
    { title: 'Photonic Optoelectronic Neuromorphic Synapse Node', code: 'PHOTO-SYNAPSE', mat: 'Synthetic Diamond Optic Lattice' },
    { title: 'Hyper-Phase Terawatt Power Conversion Conduit', code: 'TERA-CONDUIT', mat: 'Silver-Graphene Super-Conductor' },
    { title: 'Piezo-Nanoband Micro-Actuator Array', code: 'PIEZO-NANO', mat: 'Barium Titanate Nanocrystal' },
    { title: 'Cryogenic Liquid Nitrogen Micro-Vortex Cooler', code: 'CRYO-VORTEX', mat: 'Liquid Nitrogen-Gallium Heat Pipe' },
    { title: 'DeepMind Calibrated Laser Alignment Transducer', code: 'LASER-ALIGN', mat: 'Single-Crystal Sapphire Mirror' },
    { title: 'Self-Healing Bio-Polymer Armor Shield', code: 'SELF-HEAL', mat: 'Cross-Linked Graphene Polymer' },
    { title: 'Quantum Entanglement Resonator Frequency Modulator', code: 'ENTANGLED-RES', mat: 'Carburized Silicon Carbide Matrix' }
  ];

  const seed = AI_SEEDS_20M[i % AI_SEEDS_20M.length];
  const sub = AI_SUB_SYSTEMS_20M[i % AI_SUB_SYSTEMS_20M.length];
  const globalNum = 19700000 + i + 1; // 19,700,001 up to 40,000,000
  const index = i + 1;

  const title = `[AI Concept] ${seed.name} - ${sub.title} (Spec #${globalNum.toLocaleString()})`;
  const patentNumber = `${seed.pat}${10000 + (index % 89999)}`;
  const category = seed.cat as BlueprintCategory;

  return {
    id: `bp-ai20m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: 'To Be Built Concept',
    difficulty: 'Experimental',
    summary: `AI Agent Designed CAD Blueprint Spec #${globalNum.toLocaleString()} for ${seed.name} (${sub.title}).`,
    description: `Generative AI vector CAD schematic designed by ${seed.inv}. Part of the 20 million AI blueprint conceptual expansion tier. Fully detailed structural spec of ${seed.name} featuring ${sub.title.toLowerCase()} crafted from ${sub.mat}. Designed autonomously in ${seed.year}.`,
    historicalContext: `Designed by Google AI Studio Antigravity AI Agent & DeepMind models. Indexed in the master 40,000,000 CAD blueprint archive. Global Index #${globalNum.toLocaleString()}. Ref: ${seed.tag}-${sub.code}.`,
    specifications: {
      'Master Catalog Index': `#${globalNum.toLocaleString()} of 40,000,000`,
      'Designed By': seed.inv,
      'Design Engine': 'Google DeepMind Antigravity AI CAD 3.6',
      'Design Tolerance': `±${(0.00000001 + (index % 100) * 0.00000005).toFixed(9)} mm`,
      'AI Neural Confidence': `${(99.99 + (index % 9) * 0.001).toFixed(3)}%`,
      'Calculated Power Density': `${10000 + (index * 149) % 1000000} TW/m³`,
      'ISO Compliance': 'ISO-9001 / AI-CAD-40M Master Standard'
    },
    materials: [
      { partName: `${sub.title} Primary Matrix`, material: sub.mat, quantity: '1 unit', notes: 'AI generative topological optimization' },
      { partName: 'Quantum Phase Coupling Flange', material: 'Graphene-Titanium Composite', quantity: '24 sets', notes: 'Zero thermal strain tolerance' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'AI Topological Frame Initialization', instruction: `Deploy ${seed.tag} primary framework in robotic assembly cell.` },
      { stepNumber: 2, title: 'Neural Matrix Integration', instruction: `Install ${sub.title.toLowerCase()} and initialize quantum alignment feedback loop.` },
      { stepNumber: 3, title: '40M AI Vector Verification Sweep', instruction: 'Perform automated femto-laser 3D sweep for absolute structural integrity validation.' }
    ],
    hotspots: [
      { id: `hs-ai20m1-${index}`, x: 25 + (index % 50), y: 25 + (index % 50), partNumber: `AI-40M-${index}-A`, title: `${sub.title} Node`, description: `Primary AI-generated operational module for ${seed.name}.`, material: sub.mat },
      { id: `hs-ai20m2-${index}`, x: 75 - (index % 40), y: 75 - (index % 40), partNumber: `AI-40M-${index}-B`, title: 'Neural Feedback Interface', description: 'Autonomous sensor feedback and power channel.', material: 'Superconducting Matrix' }
    ],
    svgLayers: {
      framePaths: [
        `M ${15 + (index % 30) * 2} ${15 + (index % 30) * 2} L ${385 - (index % 30) * 2} ${15 + (index % 30) * 2} L ${385 - (index % 30) * 2} ${345 - (index % 30) * 2} L ${15 + (index % 30) * 2} ${345 - (index % 30) * 2} Z`
      ],
      mechanicalPaths: [
        `M 40 80 L 360 320 M 360 80 L 40 320`,
        `M 200 180 m -${20 + (index % 30)} 0 a ${20 + (index % 30)} ${20 + (index % 30)} 0 1 0 ${40 + (index % 30) * 2} 0 a ${20 + (index % 30)} ${20 + (index % 30)} 0 1 0 -${40 + (index % 30) * 2} 0`
      ],
      electricalPaths: [`M 20 180 L 380 180`],
      annotationLines: [{ x1: 200, y1: 120, x2: 340, y2: 30, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 370, text: `AI DESIGNED SPEC #${globalNum.toLocaleString()} / 40,000,000` }]
    },
    tags: ['AI Designed', 'Gemini Neural Concept', seed.tag, category, sub.code, '40M Archive', `${seed.year}`],
    downloadsCount: 50000 + (index * 137) % 1200000
  };
}
