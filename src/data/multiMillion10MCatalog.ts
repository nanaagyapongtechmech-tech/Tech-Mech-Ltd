import { BlueprintItem, BlueprintCategory } from '../types';

export function getMultiMillion10BlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS_10M = [
    { name: 'Kardashev Type-II Solar Dyson Swarm Collector Node', cat: 'Energy & Quantum', year: 2045, pat: 'CONCEPT/2045/DYSON-NODE-', inv: 'Global Dyson Swarm Engineering Guild', tag: 'Dyson Node' },
    { name: 'Quantum Gravitational Singularity Pulse Resonator', cat: 'Computing & Cybernetics', year: 2042, pat: 'CONCEPT/2042/QUANTUM-SINGULARITY-', inv: 'CERN & Perimeter Institute Quantum Group', tag: 'Singularity Resonator' },
    { name: 'Terraforming Atmospheric Gas Synthesis Refinery', cat: 'Aerospace & Aeronautics', year: 2040, pat: 'CONCEPT/2040/TERRAFORM-REFINERY-', inv: 'SpaceX Martian Atmospheric Engineering', tag: 'Terraform Refinery' },
    { name: 'Sub-Atomic Bose-Einstein Condensate Laser Interferometer', cat: 'Optics & Astronomy', year: 2038, pat: 'US Pat. 13,850,', inv: 'MIT Center for Ultracold Atoms & Max Planck', tag: 'BEC Interferometer' },
    { name: 'Bio-Synthetic DNA Digital Data Storage Crystal Matrix', cat: 'Consumer Technology', year: 2036, pat: 'US Pat. 13,500,', inv: 'Microsoft Research & Twist Bioscience', tag: 'DNA Data Crystal' },
    { name: 'Sub-Oceanic Mariana Trench Maglev Super-Corridor Tunnel', cat: 'Architecture & Mega-Structures', year: 2041, pat: 'CONCEPT/2041/TRENCH-CORRIDOR-', inv: 'Pacific Deep-Ocean Transit Consortium', tag: 'Trench Corridor' },
    { name: 'Autonomous Micro-Swarm Nanite Cell Repair Array', cat: 'Medical & Biotechnology', year: 2035, pat: 'US Pat. 13,380,', inv: 'Stanford NanoMedicine & DeepMind Health', tag: 'Nanite Repair Array' },
    { name: 'Magnetoplasmadynamic Sub-Orbital Launch Accelerator Ring', cat: 'Automotive & Transportation', year: 2039, pat: 'US Pat. 13,620,', inv: 'SpinLaunch & Blue Origin Propulsion', tag: 'MPD Accelerator' },
    { name: 'Superconducting Magnetic Levitation Hydrofoil Drive', cat: 'Mechanical & Engines', year: 2034, pat: 'US Pat. 13,210,', inv: 'Rolls-Royce Marine & Mitsubishi Heavy', tag: 'Maglev Hydrofoil' },
    { name: 'Self-Assembling Reconfigurable Bionic Exo-Skeleton Frame', cat: 'Robotics & Automation', year: 2037, pat: 'US Pat. 13,440,', inv: 'Cyberdyne & Sarcos Robotics', tag: 'Exo Frame' }
  ];

  const SUB_SYSTEMS_10M = [
    { title: 'Primary Monocoque Carbon-Graphene Chassis', code: 'CHAS-CARB', mat: 'Carbon Nanotube-Titanium Super-Matrix' },
    { title: 'Sub-Micron Precision Harmonic Reduction Gearbox', code: 'GEAR-HARM', mat: 'Ultra-Hard Nitrosintered Alloy' },
    { title: 'Superfluid Liquid Krypton Cryo Heat Heatpipe', code: 'PIPE-CRYO', mat: 'High-Purity Copper-Beryllium Matrix' },
    { title: 'Ultra-Pure Synthetic Diamond Optical Prism Window', code: 'OPT-DIAM', mat: 'CVD Synthetic Diamond Monocrystal' },
    { title: 'High-Voltage Solid-State Superconducting Busbar', code: 'BUS-SUPER', mat: 'High-Temp Superconducting YBCO Ribbon' },
    { title: 'Grain-Oriented Laminated Electromagnetic Stator Core', code: 'CORE-STAT', mat: 'Low-Loss Cobalt-Iron Permendur Steel' },
    { title: 'High-Pressure Overpressure Hydraulic Bypass Valve', code: 'BYPASS-HYD', mat: 'Corrosion-Resistant Monel K500' },
    { title: 'Magnetic Field Containment Flux Superconductor Ring', code: 'RING-FLUX', mat: 'Niobium-Tin Nb3Sn Superconducting Tube' },
    { title: 'Micro-Channel Liquid Metal Thermal Exchange Plate', code: 'PLATE-THERM', mat: 'Lithium-Aluminum Graphene Composite' },
    { title: 'Sub-Angstrom Piezoelectric Laser Actuator Stage', code: 'STAGE-ACT', mat: 'Lead Titanate Multilayer Ceramic' }
  ];

  const seed = SEEDS_10M[i % SEEDS_10M.length];
  const sub = SUB_SYSTEMS_10M[i % SUB_SYSTEMS_10M.length];
  const index = i + 1;
  const series = Math.floor(i / (SEEDS_10M.length * SUB_SYSTEMS_10M.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-m10m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${sub.title}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${sub.title.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 10,000,000 master CAD engineering index. Ref: ${seed.tag}-${sub.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 100)}`,
      'Design Tolerance': `±${(0.000002 + (index % 100) * 0.000008).toFixed(7)} mm`,
      'Operational Rating': `${1000 + (index * 41) % 50000} Nominal Units`,
      'Thermal Max': `${600 + (index * 71) % 10000} °C`,
      'Mass Weight': `${(0.02 + (index * 1.1) % 1500).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-10M Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Main Substrate`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal distortion grade' },
      { partName: 'Secondary Precision Flange Joint', material: 'Nitrosintered Alloy', quantity: '8 sets', notes: 'Friction resistant surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Laser Interferometric Mount', instruction: `Mount ${seed.tag} main unit inside optical alignment jig.` },
      { stepNumber: 2, title: 'Sub-Component Torque Fastening', instruction: `Insert ${sub.title.toLowerCase()} and torque structural flange bolts.` },
      { stepNumber: 3, title: 'Sub-Angstrom Calibration Sweep', instruction: 'Perform 360 degree automated laser sweep to verify sub-micron clearance.' }
    ],
    hotspots: [
      { id: `hs-m10m1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m10m2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitrosintered Alloy' }
    ],
    svgLayers: {
      framePaths: [
        `M ${30 + (index % 40) * 2} ${30 + (index % 40) * 2} L ${370 - (index % 40) * 2} ${30 + (index % 40) * 2} L ${370 - (index % 40) * 2} ${330 - (index % 40) * 2} L ${30 + (index % 40) * 2} ${330 - (index % 40) * 2} Z`
      ],
      mechanicalPaths: [
        `M 65 115 L 335 285 M 335 115 L 65 285`,
        `M 200 200 m -${12 + (index % 28)} 0 a ${12 + (index % 28)} ${12 + (index % 28)} 0 1 0 ${24 + (index % 28) * 2} 0 a ${12 + (index % 28)} ${12 + (index % 28)} 0 1 0 -${24 + (index % 28) * 2} 0`
      ],
      electricalPaths: [`M 40 200 L 360 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 300, y2: 50, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 352, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, sub.code, 'Master CAD 10M', `${seed.year}`],
    downloadsCount: Math.floor(10000 + (index * 2490) % 99000)
  };
}
