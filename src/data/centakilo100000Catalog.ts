import { BlueprintItem, BlueprintCategory } from '../types';

export function getCentakiloBlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS = [
    { name: 'Quantum Core Plasma Thruster', cat: 'Aerospace & Aeronautics', year: 2026, pat: 'US Pat. 12,010,', inv: 'Aerojet & Deep Space Propulsion', tag: 'Plasma Thruster' },
    { name: 'Fusion Arc Thermal Reactor Chamber', cat: 'Energy & Quantum', year: 2027, pat: 'US Pat. 12,040,', inv: 'Helion & Tokamak Research Lab', tag: 'Fusion Chamber' },
    { name: 'Sub-Atomic Quantum Silicon Interposer', cat: 'Computing & Cybernetics', year: 2025, pat: 'US Pat. 11,990,', inv: 'Intel & TSMC Advanced Labs', tag: 'Quantum Interposer' },
    { name: 'Hyperloop Maglev Vacuum Tube Stabilizer', cat: 'Automotive & Transportation', year: 2028, pat: 'US Pat. 12,080,', inv: 'Virgin & Boring Co Mobility', tag: 'Maglev Tube' },
    { name: 'Bionic Neural Interface Electrode Matrix', cat: 'Medical & Biotechnology', year: 2026, pat: 'US Pat. 12,120,', inv: 'Neuralink & Synchron Bionics', tag: 'Neural Matrix' },
    { name: 'Humanoid Bipedal Cycloidal Servo Actuator', cat: 'Robotics & Automation', year: 2025, pat: 'US Pat. 11,970,', inv: 'Boston Dynamics & Tesla Robotics', tag: 'Bipedal Servo' },
    { name: 'Deep Space Gravitational Lensing Receiver', cat: 'Optics & Astronomy', year: 2029, pat: 'US Pat. 12,150,', inv: 'JWST & ESA Deep Space Observatory', tag: 'Gravity Receiver' },
    { name: 'Hyper-Structure Carbon Nanotube Cable Truss', cat: 'Architecture & Mega-Structures', year: 2030, pat: 'CONCEPT/2030/HYPER-TRUSS-', inv: 'Global Mega-Engineering Corp', tag: 'Nanotube Truss' },
    { name: 'Hydrogen Fuel Cell Proton Exchange Stack', cat: 'Mechanical & Engines', year: 2024, pat: 'US Pat. 11,880,', inv: 'Toyota & Hyundai Eco Power', tag: 'Fuel Cell Stack' },
    { name: 'Solid-State Ceramic Electrolyte Battery Cell', cat: 'Consumer Technology', year: 2025, pat: 'US Pat. 11,940,', inv: 'QuantumScape & Panasonic Energy', tag: 'Solid State Battery' }
  ];

  const VARIANTS = [
    { name: 'Primary Core Enclosure Frame', code: 'CORE-FRM', mat: 'Titanium-Inconel Superalloy' },
    { name: 'High-Velocity Actuator Piston Rod', code: 'ACT-ROD', mat: 'Hardened Nitride Tool Steel' },
    { name: 'Cryogenic Liquid Nitrogen Heat Sink', code: 'CRYO-SINK', mat: 'Beryllium-Copper Copper Matrix' },
    { name: 'Sub-Micron Laser Alignment Optics', code: 'OPT-ALIGN', mat: 'Synthetic Fused Silica Quartz' },
    { name: 'High-Voltage Solid State Bus Coupling', code: 'BUS-COUP', mat: 'Gold-Plated Beryllium Copper' },
    { name: 'Precision Electromagnetic Field Stator', code: 'MAG-STAT', mat: 'Laminated Silicon Iron Core' },
    { name: 'Dynamic Hydraulic Relief Pressure Valve', code: 'VALVE-PRES', mat: 'Corrosion-Resistant Monel K500' },
    { name: 'Superconducting Flux Shielding Ring', code: 'MAG-SHIELD', mat: 'Niobium-Titanium Superconductor' }
  ];

  const seed = SEEDS[i % SEEDS.length];
  const variant = VARIANTS[i % VARIANTS.length];
  const index = i + 1;
  const series = Math.floor(i / (SEEDS.length * VARIANTS.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${variant.name}`
    : `${seed.name} (${variant.name} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-c100k-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${variant.name}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${variant.name.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 100,000 master CAD engineering index. Ref: ${seed.tag}-${variant.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 50)}`,
      'Design Tolerance': `±${(0.00001 + (index % 50) * 0.00005).toFixed(5)} mm`,
      'Operational Rating': `${200 + (index * 23) % 5000} Nominal Units`,
      'Thermal Max': `${300 + (index * 41) % 4000} °C`,
      'Mass Weight': `${(0.2 + (index * 2.1) % 600).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-100K Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${variant.name} Primary Component`, material: variant.mat, quantity: '1 unit', notes: 'Zero thermal distortion grade' },
      { partName: 'Secondary High-Torque Pin', material: 'Hardened Nitride Tool Steel', quantity: '4 sets', notes: 'Friction resistant surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Precision Chassis Seating', instruction: `Secure ${seed.tag} main unit into optical laser test jig.` },
      { stepNumber: 2, title: 'Sub-Component Torque Lock', instruction: `Seat ${variant.name.toLowerCase()} and tighten flange fasteners to spec.` },
      { stepNumber: 3, title: 'Operational Tolerance Test', instruction: 'Perform 360 degree automated laser sweep to verify sub-micron clearance.' }
    ],
    hotspots: [
      { id: `hs-c100k1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${variant.name} Node`, description: `Primary operational node for ${seed.name}.`, material: variant.mat },
      { id: `hs-c100k2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${45 + (index % 25) * 2} ${45 + (index % 25) * 2} L ${355 - (index % 25) * 2} ${45 + (index % 25) * 2} L ${355 - (index % 25) * 2} ${315 - (index % 25) * 2} L ${45 + (index % 25) * 2} ${315 - (index % 25) * 2} Z`
      ],
      mechanicalPaths: [
        `M 80 130 L 320 270 M 320 130 L 80 270`,
        `M 200 200 m -${18 + (index % 22)} 0 a ${18 + (index % 22)} ${18 + (index % 22)} 0 1 0 ${36 + (index % 22) * 2} 0 a ${18 + (index % 22)} ${18 + (index % 22)} 0 1 0 -${36 + (index % 22) * 2} 0`
      ],
      electricalPaths: [`M 60 200 L 340 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 280, y2: 70, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 340, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, variant.code, 'Master CAD 100K', `${seed.year}`],
    downloadsCount: Math.floor(10000 + (index * 1730) % 99000)
  };
}
