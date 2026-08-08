import { BlueprintItem, BlueprintCategory } from '../types';

export function getMillionBlueprintByIndex(i: number): BlueprintItem {
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

  const MILLION_SEEDS = [
    { name: 'Relativistic Ion Drive Accelerator Ring', cat: 'Aerospace & Aeronautics', year: 2029, pat: 'US Pat. 12,500,', inv: 'Deep Space Ion Propulsion Lab', tag: 'Relativistic Ion' },
    { name: 'Kardashev Energy Collector Phased Emitter Node', cat: 'Energy & Quantum', year: 2035, pat: 'CONCEPT/2035/KARDASHEV-', inv: 'Global Orbital Energy Alliance', tag: 'Kardashev Node' },
    { name: '3D Optical Photonic Quantum Chiplet Matrix', cat: 'Computing & Cybernetics', year: 2026, pat: 'US Pat. 12,180,', inv: 'IBM Quantum & TSMC Optics', tag: 'Photonic Chiplet' },
    { name: 'Sub-Orbital Trans-Atmospheric Hypersonic Glide Engine', cat: 'Aerospace & Aeronautics', year: 2028, pat: 'US Pat. 12,320,', inv: 'Lockheed Skunk Works & NASA', tag: 'Hypersonic Glide' },
    { name: 'Sub-Sea Maglev Trench Transit Tunnel Pressure Vessel', cat: 'Architecture & Mega-Structures', year: 2032, pat: 'CONCEPT/2032/SUBSEA-', inv: 'Trans-Oceanic Engineering Guild', tag: 'Subsea Maglev' },
    { name: 'Graphene Nanotube Muscle Fiber Actuator Bundle', cat: 'Robotics & Automation', year: 2027, pat: 'US Pat. 12,210,', inv: 'MIT BioRobotics & Tesla Automation', tag: 'Graphene Muscle' },
    { name: 'Autonomous Orbital Solar Sail Mirror Reflector Array', cat: 'Optics & Astronomy', year: 2030, pat: 'US Pat. 12,410,', inv: 'JWST-II & ESA Deep Space Telescope', tag: 'Orbital Mirror' },
    { name: 'Proton-Exchange Solid Oxide Electrolyzer Stack', cat: 'Energy & Quantum', year: 2025, pat: 'US Pat. 11,980,', inv: 'Siemens Energy & Hydrogen Power', tag: 'Hydrogen Stack' },
    { name: 'Nanobot Synthetic Hemoglobin Cell Delivery Array', cat: 'Medical & Biotechnology', year: 2028, pat: 'US Pat. 12,290,', inv: 'Mayo Clinic Bionics & DeepMind Bio', tag: 'Nanobot Delivery' },
    { name: 'Superconducting Wireless Terawatt Grid Resonator', cat: 'Consumer Technology', year: 2027, pat: 'US Pat. 12,150,', inv: 'Tesla Wireless Power Foundation', tag: 'Terawatt Grid' }
  ];

  const SUB_SYSTEMS = [
    { title: 'Primary Core Monocoque Frame', code: 'CORE-FRM', mat: 'Titanium-Inconel Superalloy' },
    { title: 'High-Torque Cycloidal Drive Shaft', code: 'CYC-SHAFT', mat: 'Hardened Nitride Tool Steel' },
    { title: 'Superfluid Cryogenic Helium Heat Sink', code: 'CRYO-HE', mat: 'Beryllium-Copper Alloy' },
    { title: 'Sub-Micron Laser Interferometer Waveguide', code: 'OPT-WAVE', mat: 'Synthetic Fused Silica Quartz' },
    { title: 'High-Voltage Solid-State Bus Terminal', code: 'BUS-TERM', mat: 'Gold-Plated Beryllium Copper' },
    { title: 'Precision Electromagnetic Stator Ring', code: 'MAG-STAT', mat: 'Laminated Silicon Steel' },
    { title: 'Hydraulic Pressure Overpressure Relief Core', code: 'HYD-CORE', mat: 'Corrosion-Resistant Monel K500' },
    { title: 'Quantum Superconducting Magnetic Shield', code: 'MAG-SHLD', mat: 'Niobium-Titanium Superconductor' },
    { title: 'Microfluidic Cooling Manifold Matrix', code: 'COOL-MANI', mat: 'Anodized Aircraft Aluminum' },
    { title: 'Piezoelectric Micro-Adjustment Flexure', code: 'PIEZO-FLEX', mat: 'Lead Zirconate Titanate Ceramic' }
  ];

  const seed = MILLION_SEEDS[i % MILLION_SEEDS.length];
  const sub = SUB_SYSTEMS[i % SUB_SYSTEMS.length];
  const index = i + 1;
  const series = Math.floor(i / (MILLION_SEEDS.length * SUB_SYSTEMS.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-m1m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${sub.title}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${sub.title.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 1,000,000 master CAD engineering index. Ref: ${seed.tag}-${sub.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 100)}`,
      'Design Tolerance': `±${(0.00001 + (index % 100) * 0.00002).toFixed(5)} mm`,
      'Operational Rating': `${250 + (index * 29) % 10000} Nominal Units`,
      'Thermal Max': `${350 + (index * 47) % 5000} °C`,
      'Mass Weight': `${(0.1 + (index * 1.7) % 800).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-1M Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Primary Component`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal distortion grade' },
      { partName: 'Secondary High-Torque Pin', material: 'Hardened Nitride Tool Steel', quantity: '4 sets', notes: 'Friction resistant surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Precision Chassis Seating', instruction: `Secure ${seed.tag} main unit into optical laser test jig.` },
      { stepNumber: 2, title: 'Sub-Component Torque Lock', instruction: `Seat ${sub.title.toLowerCase()} and tighten flange fasteners to spec.` },
      { stepNumber: 3, title: 'Operational Tolerance Test', instruction: 'Perform 360 degree automated laser sweep to verify sub-micron clearance.' }
    ],
    hotspots: [
      { id: `hs-m1m1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m1m2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${40 + (index % 30) * 2} ${40 + (index % 30) * 2} L ${360 - (index % 30) * 2} ${40 + (index % 30) * 2} L ${360 - (index % 30) * 2} ${320 - (index % 30) * 2} L ${40 + (index % 30) * 2} ${320 - (index % 30) * 2} Z`
      ],
      mechanicalPaths: [
        `M 75 125 L 325 275 M 325 125 L 75 275`,
        `M 200 200 m -${16 + (index % 24)} 0 a ${16 + (index % 24)} ${16 + (index % 24)} 0 1 0 ${32 + (index % 24) * 2} 0 a ${16 + (index % 24)} ${16 + (index % 24)} 0 1 0 -${32 + (index % 24) * 2} 0`
      ],
      electricalPaths: [`M 55 200 L 345 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 285, y2: 65, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 345, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, sub.code, 'Master CAD 1M', `${seed.year}`],
    downloadsCount: Math.floor(10000 + (index * 1930) % 99000)
  };
}
