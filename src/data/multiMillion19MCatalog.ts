import { BlueprintItem, BlueprintCategory } from '../types';

export function getMultiMillion19BlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS_19M = [
    { name: 'Tachyon Field Singularity Condenser Matrix', cat: 'Energy & Quantum', year: 2055, pat: 'FINAL-19.7M/TACHYON-', inv: 'Global Quantum Energy Federation', tag: 'Tachyon Condenser' },
    { name: 'Planetary Magnetosphere Shielding Grid Node', cat: 'Architecture & Mega-Structures', year: 2052, pat: 'FINAL-19.7M/MAGNETO-', inv: 'United Earth Geo-Engineering Authority', tag: 'Magnetosphere Grid' },
    { name: 'Sub-Quark Lattice Graviton Vector Modulator', cat: 'Aerospace & Aeronautics', year: 2058, pat: 'FINAL-19.7M/GRAVITON-', inv: 'Deep Space Warp Institute', tag: 'Graviton Modulator' },
    { name: 'Dyson Swarm Photonic Collector Array Segment', cat: 'Energy & Quantum', year: 2060, pat: 'FINAL-19.7M/DYSON-', inv: 'Solar Energy Mega-Consortium', tag: 'Dyson Array' },
    { name: 'Trans-Dimensional Quantum Memory Core Matrix', cat: 'Computing & Cybernetics', year: 2054, pat: 'FINAL-19.7M/QUANTUM-MEM-', inv: 'Exa-Scale Cybernetics Lab', tag: 'Quantum Core' },
    { name: 'Dark Matter Thermal Conversion Primary Cell', cat: 'Energy & Quantum', year: 2056, pat: 'FINAL-19.7M/DARK-MATTER-', inv: 'CERN & Astrophysical Research', tag: 'Dark Matter Converter' },
    { name: 'Bionic Synthetic Genome Bioreactor Chamber', cat: 'Medical & Biotechnology', year: 2051, pat: 'FINAL-19.7M/SYNTH-GENOME-', inv: 'Biotech Synthetic Life Inst.', tag: 'Synthetic Genome' },
    { name: 'Autonomous Orbital Megastructure Assembly Unit', cat: 'Robotics & Automation', year: 2053, pat: 'FINAL-19.7M/ORBITAL-ROBOT-', inv: 'Orbital Robotics Corp', tag: 'Orbital Assembler' },
    { name: 'Maglev Relativistic Particle Conduit Tube', cat: 'Automotive & Transportation', year: 2049, pat: 'FINAL-19.7M/MAGLEV-TUBE-', inv: 'Hyper-Transit Network', tag: 'Maglev Conduit' },
    { name: 'Sub-Picometer Femto-Laser Interferometer Mirror', cat: 'Optics & Astronomy', year: 2057, pat: 'FINAL-19.7M/FEMTO-MIRROR-', inv: 'Global Optics Observatory', tag: 'Femto Mirror' }
  ];

  const SUB_SYSTEMS_19M = [
    { title: 'Sub-Quark Monocrystalline Alloy Framework', code: 'QUARK-FRAME', mat: 'Carbon-Graphene-Titanium Matrix' },
    { title: 'Zero-Point Thermal Superconductor Loop', code: 'CRYO-LOOP', mat: 'Superconducting YBCO-Graphene Ribbon' },
    { title: 'Plasma Magnetic Containment Torus Ring', code: 'PLASMA-TORUS', mat: 'Niobium-Titanium Super-Alloy' },
    { title: 'Photonic Synaptic Optical Switch Node', code: 'OPT-SWITCH', mat: 'Synthetic Monocrystal Diamond' },
    { title: 'Hyper-Density Terawatt Bus Conductor', code: 'TERA-BUS', mat: 'Silver-Copper Superconductive Lattice' },
    { title: 'Piezoelectric Micron Positioner Actuator', code: 'PIEZO-ACT', mat: 'Lead Zirconate Titanate Stack' },
    { title: 'Cavitation Resistant Liquid Metal Cooling Channel', code: 'LIQ-COOL', mat: 'Gallium-Indium Eutectic Alloy' },
    { title: 'Interferometric Laser Alignment Sensor', code: 'LASER-SENS', mat: 'Gold-Coated Quartz Substrate' },
    { title: 'Structural High-Tensile Carbon Nanotube Web', code: 'CNT-WEB', mat: 'Ultra-High Density Carbon Nanotube' },
    { title: 'Quantum Phase Shift Resonator Array', code: 'PHASE-RES', mat: 'Carburized Diamond Nitride Film' }
  ];

  const seed = SEEDS_19M[i % SEEDS_19M.length];
  const sub = SUB_SYSTEMS_19M[i % SUB_SYSTEMS_19M.length];
  const globalNum = 18000000 + i + 1;
  const index = i + 1;

  const title = `${seed.name} - ${sub.title} (Spec #${globalNum.toLocaleString()})`;
  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = seed.cat as BlueprintCategory;

  return {
    id: `bp-m19m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: 'To Be Built Concept',
    difficulty: 'Experimental',
    summary: `Final Tier 19.7M CAD Blueprint Specification for ${seed.name} (${sub.title}).`,
    description: `Ultimate CAD vector schematic from the final 1.7 million blueprint index tier. Complete structural breakdown of ${seed.name} featuring ${sub.title.toLowerCase()} constructed from ${sub.mat}. Designed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the final 19,700,000 master CAD engineering archive. Global CAD Index #${globalNum.toLocaleString()}. Ref: ${seed.tag}-${sub.code}.`,
    specifications: {
      'Master Catalog Index': `#${globalNum.toLocaleString()} of 19,700,000`,
      'Technical Tier': 'Final 1.7M Frontier Tier',
      'Design Tolerance': `±${(0.0000001 + (index % 50) * 0.0000002).toFixed(8)} mm`,
      'Operational Energy Rating': `${5000 + (index * 97) % 500000} TW`,
      'Thermal Max': `${1200 + (index * 137) % 25000} °C`,
      'ISO Compliance': `ISO-9001 / CAD-19.7M Ultimate Standard`
    },
    materials: [
      { partName: `${sub.title} Main Core`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal expansion sub-quark grade' },
      { partName: 'Structural Anchor Coupling Flange', material: 'Carburized Diamond Steel', quantity: '16 sets', notes: 'Atomic-level frictionless coating' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Sub-Quark Core Alignment', instruction: `Mount ${seed.tag} primary assembly in zero-gravity vacuum chamber.` },
      { stepNumber: 2, title: 'Superconductor Loop Integration', instruction: `Attach ${sub.title.toLowerCase()} and lock laser flange bolts.` },
      { stepNumber: 3, title: 'Final 19.7M Calibration Sweep', instruction: 'Perform automated femto-laser 3D sweep for absolute tolerance verification.' }
    ],
    hotspots: [
      { id: `hs-m19m1-${index}`, x: 30 + (index % 40), y: 30 + (index % 40), partNumber: `CAD-19.7M-${index}-A`, title: `${sub.title} Core`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m19m2-${index}`, x: 70 - (index % 35), y: 70 - (index % 35), partNumber: `CAD-19.7M-${index}-B`, title: 'High-Energy Confinement Junction', description: 'Thermal and magnetic shielding interface.', material: 'Superconducting Matrix' }
    ],
    svgLayers: {
      framePaths: [
        `M ${20 + (index % 40) * 2} ${20 + (index % 40) * 2} L ${380 - (index % 40) * 2} ${20 + (index % 40) * 2} L ${380 - (index % 40) * 2} ${340 - (index % 40) * 2} L ${20 + (index % 40) * 2} ${340 - (index % 40) * 2} Z`
      ],
      mechanicalPaths: [
        `M 50 100 L 350 300 M 350 100 L 50 300`,
        `M 200 200 m -${15 + (index % 25)} 0 a ${15 + (index % 25)} ${15 + (index % 25)} 0 1 0 ${30 + (index % 25) * 2} 0 a ${15 + (index % 25)} ${15 + (index % 25)} 0 1 0 -${30 + (index % 25) * 2} 0`
      ],
      electricalPaths: [`M 30 200 L 370 200`],
      annotationLines: [{ x1: 200, y1: 140, x2: 320, y2: 40, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 360, text: `FINAL CATALOG SPEC #${globalNum.toLocaleString()}` }]
    },
    tags: [seed.tag, category, sub.code, 'Final 1.7M Tier', '19.7 Million Index', `${seed.year}`],
    downloadsCount: 15000 + (index * 73) % 850000
  };
}
