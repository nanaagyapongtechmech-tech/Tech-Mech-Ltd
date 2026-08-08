import { BlueprintItem, BlueprintCategory } from '../types';

export function getMultiMillionBlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS_5M = [
    { name: 'Hyper-Dimensional Sub-Space Signal Transceiver', cat: 'Computing & Cybernetics', year: 2038, pat: 'CONCEPT/2038/SUBSPACE-', inv: 'Deep Space Quantum Communication Lab', tag: 'Subspace Transceiver' },
    { name: 'Orbital Ring Elevator Carbon-Nanotube Tether Joint', cat: 'Architecture & Mega-Structures', year: 2040, pat: 'CONCEPT/2040/ORBITAL-RING-', inv: 'Global Orbital Logistics Authority', tag: 'Orbital Tether' },
    { name: 'Sub-Atomic Muon-Catalyzed Fusion Injection Nozzle', cat: 'Energy & Quantum', year: 2032, pat: 'US Pat. 13,100,', inv: 'CERN & Tokamak Energy Labs', tag: 'Muon Fusion Nozzle' },
    { name: 'Zero-Gravity Molecular Synthesis Cleanroom Chamber', cat: 'Consumer Technology', year: 2030, pat: 'US Pat. 12,950,', inv: 'SpaceX Materials & Orbital Corp', tag: 'Zero-G Cleanroom' },
    { name: 'Autonomous Deep-Crust Subterranean Burrowing Probe', cat: 'Robotics & Automation', year: 2035, pat: 'US Pat. 13,250,', inv: 'DARPA SubT & Borehole Robotics', tag: 'Subterranean Probe' },
    { name: 'Photonic Crystal Fiber Optics Gravitational Interferometer', cat: 'Optics & Astronomy', year: 2029, pat: 'US Pat. 12,710,', inv: 'LIGO Scientific & Zeiss Quantum', tag: 'Photonic Interferometer' },
    { name: 'Cryogenic Liquid Krypton Superconducting Turbine Stator', cat: 'Mechanical & Engines', year: 2028, pat: 'US Pat. 12,580,', inv: 'General Electric & Siemens Energy', tag: 'Krypton Turbine' },
    { name: 'Bionic Synthetic Stem-Cell Organ Printing Matrix Collar', cat: 'Medical & Biotechnology', year: 2027, pat: 'US Pat. 12,410,', inv: 'Organovo & Harvard Wyss Institute', tag: 'Stem Cell Collar' },
    { name: 'Maglev Atmospheric Hypersonic Cargo Glider Wing Assembly', cat: 'Automotive & Transportation', year: 2033, pat: 'US Pat. 13,020,', inv: 'Boeing Phantom Works & Virgin Hyperloop', tag: 'Hypersonic Glider' },
    { name: 'Magneto-Hydrodynamic Plasma Shield Grid Emitter', cat: 'Aerospace & Aeronautics', year: 2036, pat: 'CONCEPT/2036/PLASMA-GRID-', inv: 'U.S. Air Force Research Lab & NASA', tag: 'MHD Plasma Shield' }
  ];

  const SUB_SYSTEMS_5M = [
    { title: 'Primary Monocoque Superalloy Housing', code: 'HOUS-SUPER', mat: 'Titanium-Inconel Graphene Matrix' },
    { title: 'Sub-Micron Planetary Torque Gears', code: 'GEAR-PLANET', mat: 'Carburized Nitride Tool Steel' },
    { title: 'Superconductive Liquid Nitrogen Cooling Ring', code: 'CRYO-RING', mat: 'Beryllium Copper Superconducting Matrix' },
    { title: 'High-Purity Fused Silica Optical Prism Mount', code: 'OPT-PRISM', mat: 'Synthetic Fused Silica Glass' },
    { title: 'Solid-State Terawatt Power Bus Connector', code: 'CONN-BUS', mat: 'Gold-Plated Beryllium Copper' },
    { title: 'Precision Laminated Silicon Core Magnetic Stator', code: 'STAT-MAG', mat: 'Laminated Grain-Oriented Silicon Steel' },
    { title: 'Extreme Pressure Relief Hydraulic Valve Sleeve', code: 'SLEEVE-HYD', mat: 'Corrosion-Resistant Monel K500' },
    { title: 'High-Flux Superconducting Tube Shielding Collar', code: 'SHLD-COLLAR', mat: 'Niobium-Titanium Tube Superconductor' },
    { title: 'Micro-Channel Active Thermal Radiator Plate', code: 'PLATE-RAD', mat: 'Anodized Aircraft Aluminum 7075-T6' },
    { title: 'Sub-Nanometer Piezoelectric Alignment Actuator', code: 'ACT-PIEZO', mat: 'Lead Zirconate Titanate Stack' }
  ];

  const seed = SEEDS_5M[i % SEEDS_5M.length];
  const sub = SUB_SYSTEMS_5M[i % SUB_SYSTEMS_5M.length];
  const index = i + 1;
  const series = Math.floor(i / (SEEDS_5M.length * SUB_SYSTEMS_5M.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-m5m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${sub.title}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${sub.title.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 5,000,000 master CAD engineering index. Ref: ${seed.tag}-${sub.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 100)}`,
      'Design Tolerance': `±${(0.000005 + (index % 100) * 0.00001).toFixed(6)} mm`,
      'Operational Rating': `${500 + (index * 37) % 20000} Nominal Units`,
      'Thermal Max': `${500 + (index * 61) % 8000} °C`,
      'Mass Weight': `${(0.05 + (index * 1.3) % 1200).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-5M Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Main Chassis`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal distortion grade' },
      { partName: 'Secondary High-Torque Joint Bolt', material: 'Hardened Nitride Tool Steel', quantity: '6 sets', notes: 'Friction resistant surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Laser Alignment & Chassis Locking', instruction: `Mount ${seed.tag} main unit inside laser interferometry test bed.` },
      { stepNumber: 2, title: 'Sub-Component Torque Fastening', instruction: `Insert ${sub.title.toLowerCase()} and torque structural flange bolts.` },
      { stepNumber: 3, title: 'Sub-Micron Calibration Sweep', instruction: 'Perform 360 degree automated laser sweep to verify sub-micron clearance.' }
    ],
    hotspots: [
      { id: `hs-m5m1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m5m2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${35 + (index % 35) * 2} ${35 + (index % 35) * 2} L ${365 - (index % 35) * 2} ${35 + (index % 35) * 2} L ${365 - (index % 35) * 2} ${325 - (index % 35) * 2} L ${35 + (index % 35) * 2} ${325 - (index % 35) * 2} Z`
      ],
      mechanicalPaths: [
        `M 70 120 L 330 280 M 330 120 L 70 280`,
        `M 200 200 m -${14 + (index % 26)} 0 a ${14 + (index % 26)} ${14 + (index % 26)} 0 1 0 ${28 + (index % 26) * 2} 0 a ${14 + (index % 26)} ${14 + (index % 26)} 0 1 0 -${28 + (index % 26) * 2} 0`
      ],
      electricalPaths: [`M 45 200 L 355 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 295, y2: 55, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 350, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, sub.code, 'Master CAD 5M', `${seed.year}`],
    downloadsCount: Math.floor(10000 + (index * 2350) % 99000)
  };
}
