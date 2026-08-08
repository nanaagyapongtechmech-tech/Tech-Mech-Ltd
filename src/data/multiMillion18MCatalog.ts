import { BlueprintItem, BlueprintCategory } from '../types';

export function getMultiMillion18BlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS_18M = [
    { name: 'Hyper-Scale Warp Field Space-Time Distortion Drive Node', cat: 'Aerospace & Aeronautics', year: 2050, pat: 'CONCEPT/2050/WARP-DRIVE-', inv: 'Interstellar Propulsion Consortium & NASA', tag: 'Warp Drive Node' },
    { name: 'Zero-Point Energy Vacuum Fluctuation Collector Matrix', cat: 'Energy & Quantum', year: 2048, pat: 'CONCEPT/2048/VACUUM-ENERGY-', inv: 'Quantum Electrodynamics Lab & CERN', tag: 'Zero-Point Matrix' },
    { name: 'Cerebral Neural Interface Holographic Synaptic Coupler', cat: 'Computing & Cybernetics', year: 2044, pat: 'CONCEPT/2044/NEURAL-COUPLER-', inv: 'Neuralink & Max Planck Brain Institute', tag: 'Neural Coupler' },
    { name: 'Sub-Orbital Electromagnetic Payload Rail Launcher Elevator', cat: 'Architecture & Mega-Structures', year: 2046, pat: 'CONCEPT/2046/RAIL-ELEVATOR-', inv: 'Global Launch Systems & JAXA', tag: 'Rail Launcher' },
    { name: 'Autonomous Deep-Space Asteroid Mining Molecular Refinery', cat: 'Robotics & Automation', year: 2043, pat: 'CONCEPT/2043/ASTEROID-REFINERY-', inv: 'Planetary Resources & Asteroid Corp', tag: 'Asteroid Refinery' },
    { name: 'Sub-Femtometer Gamma-Ray Laser Cavity Resonator', cat: 'Optics & Astronomy', year: 2041, pat: 'US Pat. 14,100,', inv: 'Lawrence Livermore & Optical Physics Lab', tag: 'Gamma Laser Resonator' },
    { name: 'Bionic Synthetic Organ Bio-Synthesis Reactor Chamber', cat: 'Medical & Biotechnology', year: 2039, pat: 'US Pat. 13,920,', inv: 'Organovo & Harvard Wyss Bio-Lab', tag: 'Bio-Reactor Chamber' },
    { name: 'Superconducting Maglev Atmosphere Cargo Pod Fuselage', cat: 'Automotive & Transportation', year: 2042, pat: 'US Pat. 14,050,', inv: 'Virgin Hyperloop & Shinkansen Labs', tag: 'Maglev Cargo Fuselage' },
    { name: 'Magneto-Hydrodynamic Sub-Acoustic Marine Turbine Impeller', cat: 'Mechanical & Engines', year: 2038, pat: 'US Pat. 13,780,', inv: 'General Electric Marine & Mitsubishi', tag: 'Sub-Acoustic Impeller' },
    { name: 'Photonic Quantum Computer Super-Density Optical Bus', cat: 'Consumer Technology', year: 2040, pat: 'US Pat. 13,990,', inv: 'IBM Quantum & PsiQuantum Research', tag: 'Quantum Optical Bus' }
  ];

  const SUB_SYSTEMS_18M = [
    { title: 'Primary Titanium-Graphene Superalloy Hull Chassis', code: 'HULL-TITAN', mat: 'Titanium-Inconel-Graphene Matrix' },
    { title: 'Sub-Micron Zero-Backlash Cycloidal Planetary Gearhead', code: 'GEAR-CYCLO', mat: 'Carburized Diamond-Coated Nitride Steel' },
    { title: 'Superconductive Liquid Helium Cryogenic Coolant Channel', code: 'CRYO-CHANN', mat: 'Beryllium-Copper Superconducting Tubing' },
    { title: 'High-Purity Single-Crystal Diamond Optical Beam Splitter', code: 'OPT-SPLIT', mat: 'CVD Synthetic Diamond Monocrystal' },
    { title: 'Solid-State Terawatt High-Current Conductive Bus Line', code: 'BUS-TERA', mat: 'YBCO High-Temp Superconductor Ribbon' },
    { title: 'Laminated Cobalt-Iron Electromagnetic Rotor Stator Core', code: 'ROTOR-STAT', mat: 'Permendur High-Permeability Steel' },
    { title: 'Extreme Pressure Hydraulic Cavitation Protection Valve', code: 'VALVE-CAVIT', mat: 'Monel K-500 Super-Corrosion Alloy' },
    { title: 'Quantum Magnetic Confinement Plasma Shielding Ring', code: 'RING-PLASMA', mat: 'Niobium-3-Tin Superconducting Coil' },
    { title: 'Micro-Channel Graphene Liquid Metal Heat Radiator Matrix', code: 'RAD-GRAPH', mat: 'Graphene-Gallium Composite Plate' },
    { title: 'Sub-Picometer Piezoelectric Optical Beam Steering Stage', code: 'STAGE-PICO', mat: 'Lead Zirconate Titanate Piezoelectric Stack' }
  ];

  const seed = SEEDS_18M[i % SEEDS_18M.length];
  const sub = SUB_SYSTEMS_18M[i % SUB_SYSTEMS_18M.length];
  const index = i + 1;
  const series = Math.floor(i / (SEEDS_18M.length * SUB_SYSTEMS_18M.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-m18m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${sub.title}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${sub.title.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 18,000,000 master CAD engineering index. Ref: ${seed.tag}-${sub.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 100)}`,
      'Design Tolerance': `±${(0.000001 + (index % 100) * 0.000005).toFixed(7)} mm`,
      'Operational Rating': `${2000 + (index * 47) % 100000} Nominal Units`,
      'Thermal Max': `${700 + (index * 83) % 12000} °C`,
      'Mass Weight': `${(0.01 + (index * 1.05) % 2000).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-18M Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Main Chassis`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal expansion grade' },
      { partName: 'Precision Fastening Flange Bolt', material: 'Carburized Diamond Steel', quantity: '12 sets', notes: 'Frictionless surface coating' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Quantum Interferometric Jig Mount', instruction: `Position ${seed.tag} main unit inside laser interferometry test bed.` },
      { stepNumber: 2, title: 'Structural Sub-Assembly Torque Locking', instruction: `Align ${sub.title.toLowerCase()} and torque structural flange bolts.` },
      { stepNumber: 3, title: 'Sub-Picometer Laser Calibration', instruction: 'Execute automated 360 degree optical laser sweep for micron validation.' }
    ],
    hotspots: [
      { id: `hs-m18m1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m18m2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Structural Node', description: 'Critical load bearing junction.', material: 'Carburized Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${25 + (index % 45) * 2} ${25 + (index % 45) * 2} L ${375 - (index % 45) * 2} ${25 + (index % 45) * 2} L ${375 - (index % 45) * 2} ${335 - (index % 45) * 2} L ${25 + (index % 45) * 2} ${335 - (index % 45) * 2} Z`
      ],
      mechanicalPaths: [
        `M 60 110 L 340 290 M 340 110 L 60 290`,
        `M 200 200 m -${10 + (index % 30)} 0 a ${10 + (index % 30)} ${10 + (index % 30)} 0 1 0 ${20 + (index % 30) * 2} 0 a ${10 + (index % 30)} ${10 + (index % 30)} 0 1 0 -${20 + (index % 30) * 2} 0`
      ],
      electricalPaths: [`M 35 200 L 365 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 305, y2: 45, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 355, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, sub.code, 'Master CAD 18M', `${seed.year}`],
    downloadsCount: Math.floor(15000 + (index * 2610) % 99000)
  };
}
