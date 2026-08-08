import { BlueprintItem, BlueprintCategory } from '../types';

export function getMillion2BlueprintByIndex(i: number): BlueprintItem {
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

  const SEEDS_2M = [
    { name: 'Magnetoplasmadynamic Deep Space Interstellar Engine', cat: 'Aerospace & Aeronautics', year: 2031, pat: 'US Pat. 12,800,', inv: 'NASA Jet Propulsion Lab & SpaceX Propulsion', tag: 'MPD Interstellar' },
    { name: 'Sub-Mantle Geothermal Magma Tap Thermal Generator', cat: 'Energy & Quantum', year: 2033, pat: 'CONCEPT/2033/MAGMA-TAP-', inv: 'Global Clean Geothermal Consortium', tag: 'Magma Tap' },
    { name: '10,000 Qubit Topo-Quantum Superconducting Processing Core', cat: 'Computing & Cybernetics', year: 2028, pat: 'US Pat. 12,450,', inv: 'IBM Quantum Systems & Google Quantum AI', tag: 'Topo QPU' },
    { name: 'Bionic Synthetic Myocardium Artificial Heart Valve Array', cat: 'Medical & Biotechnology', year: 2027, pat: 'US Pat. 12,380,', inv: 'Johns Hopkins Medical & SynCardia Systems', tag: 'Synthetic Myocardium' },
    { name: 'Trans-Pacific Vacuum Tube Levitation Transit Pod', cat: 'Automotive & Transportation', year: 2034, pat: 'CONCEPT/2034/TRANS-PACIFIC-', inv: 'Pacific Rim Hyperloop Alliance', tag: 'Pacific Maglev' },
    { name: 'Multi-Legged Planetary Excavator Walking Chassis', cat: 'Robotics & Automation', year: 2029, pat: 'US Pat. 12,620,', inv: 'Boston Dynamics & NASA Artemis Mobility', tag: 'Planetary Excavator' },
    { name: 'Extreme Ultraviolet Sub-Nanometer Lithography Reflective Mirror', cat: 'Optics & Astronomy', year: 2026, pat: 'US Pat. 12,190,', inv: 'ASML Veldhoven & Carl Zeiss Optics', tag: 'Sub-nm Litho Mirror' },
    { name: 'Super-Structure Diamondoid Tensile Strut Anchor', cat: 'Architecture & Mega-Structures', year: 2036, pat: 'CONCEPT/2036/DIAMONDOID-', inv: 'International Mega-Structure Guild', tag: 'Diamondoid Strut' },
    { name: 'Cryogenic Liquid Hydrogen Turbo-Pump Impeller', cat: 'Mechanical & Engines', year: 2025, pat: 'US Pat. 12,050,', inv: 'Aerojet Rocketdyne & ArianeGroup', tag: 'Cryo LH2 Pump' },
    { name: 'Solid-State Ceramic Phase-Change Energy Storage Cell', cat: 'Consumer Technology', year: 2027, pat: 'US Pat. 12,280,', inv: 'Tesla Energy & CATL Innovation Lab', tag: 'Ceramic Battery' }
  ];

  const SUB_SYSTEMS_2M = [
    { title: 'Primary Monocoque Structural Enclosure', code: 'STR-MONO', mat: 'Titanium-Graphene Composite Matrix' },
    { title: 'High-Torque Planetary Reduction Driveshaft', code: 'DRV-PLANET', mat: 'Nitride Hardened Tool Steel' },
    { title: 'Superfluid Helium Heat Distribution Manifold', code: 'MANI-CRYO', mat: 'Beryllium Copper High Conduction Matrix' },
    { title: 'Sub-Nanometer Laser Interferometer Lens Mount', code: 'OPT-NANO', mat: 'Ultra-Low Expansion Fused Quartz' },
    { title: 'High-Current Solid-State Superconducting Terminal', code: 'TERM-SUPER', mat: 'Gold-Plated YBCO Ribbon Matrix' },
    { title: 'Electromagnetic Field Stator Coil Core', code: 'STAT-COIL', mat: 'Laminated Silicon Steel Grain-Oriented' },
    { title: 'Hydraulic High-Pressure Relief Valve Sleeve', code: 'VALVE-SLEEVE', mat: 'Corrosion-Resistant Monel K500' },
    { title: 'Magnetic Flux Containment Shield Collar', code: 'SHLD-COLLAR', mat: 'Niobium-Titanium Superconducting Tube' },
    { title: 'Microfluidic Active Cooling Channel Plate', code: 'PLATE-COOL', mat: 'Anodized Aircraft Aluminum-Lithium' },
    { title: 'Piezoelectric Position Adjustment Stage', code: 'STAGE-PIEZO', mat: 'PZT Ceramic Multilayer Stack' }
  ];

  const seed = SEEDS_2M[i % SEEDS_2M.length];
  const sub = SUB_SYSTEMS_2M[i % SUB_SYSTEMS_2M.length];
  const index = i + 1;
  const series = Math.floor(i / (SEEDS_2M.length * SUB_SYSTEMS_2M.length)) + 1;

  const title = series === 1
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Unit #${index})`;

  const patentNumber = `${seed.pat}${1000 + (index % 8999)}`;
  const category = (seed.cat || CATEGORIES[i % CATEGORIES.length]) as BlueprintCategory;
  const isConcept = seed.year >= 2026;

  return {
    id: `bp-m2m-${index}`,
    title,
    patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Vector CAD blueprint specification for ${seed.name} (${sub.title}).`,
    description: `Official technical schematic detailing internal tolerances, material matrices, stress ratings, and assembly procedure for ${seed.name} focusing on the ${sub.title.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Indexed in the global 2,000,000 master CAD engineering index. Ref: ${seed.tag}-${sub.code}-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 100)}`,
      'Design Tolerance': `±${(0.000008 + (index % 100) * 0.000015).toFixed(6)} mm`,
      'Operational Rating': `${300 + (index * 31) % 12000} Nominal Units`,
      'Thermal Max': `${400 + (index * 53) % 6000} °C`,
      'Mass Weight': `${(0.08 + (index * 1.5) % 900).toFixed(2)} kg`,
      'ISO Compliance': `ISO-9001 / CAD-2M Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Main Substrate`, material: sub.mat, quantity: '1 unit', notes: 'Zero thermal distortion grade' },
      { partName: 'Secondary High-Torque Joint Pin', material: 'Hardened Nitride Tool Steel', quantity: '4 sets', notes: 'Friction resistant surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Laser Alignment & Chassis Locking', instruction: `Mount ${seed.tag} main unit inside laser interferometry test bed.` },
      { stepNumber: 2, title: 'Sub-Component Torque Fastening', instruction: `Insert ${sub.title.toLowerCase()} and torque structural flange bolts.` },
      { stepNumber: 3, title: 'Sub-Micron Calibration Sweep', instruction: 'Perform 360 degree automated laser sweep to verify sub-micron clearance.' }
    ],
    hotspots: [
      { id: `hs-m2m1-${index}`, x: 25 + (index % 50), y: 35 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-m2m2-${index}`, x: 75 - (index % 40), y: 65 - (index % 30), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${38 + (index % 32) * 2} ${38 + (index % 32) * 2} L ${362 - (index % 32) * 2} ${38 + (index % 32) * 2} L ${362 - (index % 32) * 2} ${322 - (index % 32) * 2} L ${38 + (index % 32) * 2} ${322 - (index % 32) * 2} Z`
      ],
      mechanicalPaths: [
        `M 72 122 L 328 278 M 328 122 L 72 278`,
        `M 200 200 m -${15 + (index % 25)} 0 a ${15 + (index % 25)} ${15 + (index % 25)} 0 1 0 ${30 + (index % 25) * 2} 0 a ${15 + (index % 25)} ${15 + (index % 25)} 0 1 0 -${30 + (index % 25) * 2} 0`
      ],
      electricalPaths: [`M 50 200 L 350 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 290, y2: 60, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 348, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, category, sub.code, 'Master CAD 2M', `${seed.year}`],
    downloadsCount: Math.floor(10000 + (index * 2110) % 99000)
  };
}
