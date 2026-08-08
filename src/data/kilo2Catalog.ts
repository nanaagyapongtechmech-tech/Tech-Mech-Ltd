import { BlueprintItem, BlueprintCategory } from '../types';

export function generateSecond1000Blueprints(): BlueprintItem[] {
  const KILO2_PATENTS = [
    // AEROSPACE & AERONAUTICS
    { name: 'X-43A Hypersonic Scramjet Dual-Mode Combustor Isolator Module', cat: 'Aerospace & Aeronautics', year: 2004, pat: 'US Pat. 6,854,691', inv: 'NASA Langley & Micro Craft', tag: 'X-43A Scramjet' },
    { name: 'SpaceX Super Heavy Grid Fin Hydraulic Servo Actuator', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 11,215,152', inv: 'SpaceX Rocket Development', tag: 'Super Heavy' },
    { name: 'Boeing 787 Electro-Thermal Wing Ice Protection System (WIPS)', cat: 'Aerospace & Aeronautics', year: 2009, pat: 'US Pat. 7,837,148', inv: 'Boeing & Cox & Co.', tag: '787 WIPS' },
    { name: 'General Dynamics F-16 Falcon Fly-By-Wire Quadruple Servo Actuator', cat: 'Aerospace & Aeronautics', year: 1974, pat: 'US Pat. 3,982,714', inv: 'General Dynamics & BAE Systems', tag: 'F-16 Servo' },
    { name: 'Rockwell Space Shuttle Thermal Protection System (TPS) Silica Tile Lock', cat: 'Aerospace & Aeronautics', year: 1981, pat: 'US Pat. 4,185,560', inv: 'Lockheed Missiles & NASA', tag: 'TPS Tile' },
    { name: 'Bell-Boeing V-22 Osprey Proprotor Blade Folding Hinge Lock Pin', cat: 'Aerospace & Aeronautics', year: 1989, pat: 'US Pat. 4,951,899', inv: 'Bell Helicopter & Boeing', tag: 'V-22 Hinge' },
    { name: 'Lockheed Martin F-35 Electro-Optical Targeting System (EOTS) Sapphire Window', cat: 'Aerospace & Aeronautics', year: 2006, pat: 'US Pat. 7,185,722', inv: 'Lockheed Martin Missiles', tag: 'F-35 EOTS' },
    { name: 'NASA James Webb Space Telescope Cryocooler Pulse Tube Compressor', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 10,983,322', inv: 'Northrop Grumman & NASA JPL', tag: 'JWST Cryocooler' },
    { name: 'Northrop B-2 Stealth Bomber Micro-Weld Composite Elevon Flap', cat: 'Aerospace & Aeronautics', year: 1989, pat: 'US Pat. 5,250,952', inv: 'Northrop Corporation', tag: 'B-2 Elevon' },
    { name: 'Apollo Lunar Module Lunar Surface Sensing Probe Switch Assembly', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'US Pat. 3,572,034', inv: 'Grumman Aerospace & NASA', tag: 'Apollo Probe' },

    // MECHANICAL & ENGINES
    { name: 'BorgWarner DualTronic Concentric Oil-Cooled Wet Clutch Assembly', cat: 'Mechanical & Engines', year: 2003, pat: 'US Pat. 6,655,518', inv: 'BorgWarner TorqTransfer', tag: 'DualTronic' },
    { name: 'Holley Dominator Double Pumper Four-Barrel Carburetor Metering Block', cat: 'Mechanical & Engines', year: 1968, pat: 'US Pat. 3,380,691', inv: 'Holley Performance Products', tag: 'Holley Dominator' },
    { name: 'Garrett VNT Variable Nozzle Turbine Aerodynamic Vane Synchronizer Ring', cat: 'Mechanical & Engines', year: 1989, pat: 'US Pat. 5,421,704', inv: 'Garrett Engine Boost Systems', tag: 'Garrett VNT' },
    { name: 'Cummins High-Pressure Common Rail (HPCR) Solenoid Fuel Injector', cat: 'Mechanical & Engines', year: 2003, pat: 'US Pat. 6,655,519', inv: 'Cummins Engine Company', tag: 'Cummins HPCR' },
    { name: 'Eaton Twin Vortices Series (TVS) Four-Lobe 160-Degree Twist Supercharger', cat: 'Mechanical & Engines', year: 2007, pat: 'US Pat. 7,337,283', inv: 'Eaton Corporation Powertrain', tag: 'Eaton TVS' },
    { name: 'Pratt & Whitney R-4360 Wasp Major 28-Cylinder 4-Row Radial Engine Crankshaft', cat: 'Mechanical & Engines', year: 1944, pat: 'US Pat. 2,442,486', inv: 'Pratt & Whitney Aircraft', tag: 'Wasp Major' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Millau Viaduct Steel Deck Launching Hydraulic Nose Truss', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'FR Pat. 2,854,192', inv: 'Eiffage & Michel Virlogeux', tag: 'Millau Launch' },
    { name: 'Taipei 101 Eight Mega-Pillar Steel Box Column Concrete Infill Joint', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'TW Pat. 592,020', inv: 'C.Y. Lee & Thornton Tomasetti', tag: 'Taipei 101 Pillar' },
    { name: 'Akashi Kaikyō Bridge Main Cable Steel Wire Oil-Injected Dehumidifier', cat: 'Architecture & Mega-Structures', year: 1998, pat: 'JP Pat. 3,110,404', inv: 'Honshu-Shikoku Bridge Authority', tag: 'Akashi Dehumidifier' },
    { name: 'Three Gorges Dam Ship Lift Helical Rack and Pinion Gear Drive', cat: 'Architecture & Mega-Structures', year: 2016, pat: 'CN Pat. 2,012,348', inv: 'China Three Gorges Corp & VKW', tag: 'Three Gorges Lift' },

    // COMPUTING & CYBERNETICS
    { name: 'Apple M3 Max 92-Core Unified Memory Bus & Neural Engine Die Layout', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,682,791', inv: 'Apple Silicon Hardware Team', tag: 'Apple M3 Max' },
    { name: 'NVIDIA B200 Blackwell GPU Dual-Die High-Bandwidth NVLink Interconnect', cat: 'Computing & Cybernetics', year: 2024, pat: 'US Pat. 11,890,126', inv: 'Jensen Huang & NVIDIA Design Team', tag: 'NVIDIA B200' },
    { name: 'Google TPU v5p 3D Torus Optical Interconnect Tensor Processor Architecture', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,682,792', inv: 'Google AI Infrastructure Team', tag: 'TPU v5p' },
    { name: 'Intel Core i9 14900K Performance/Efficient Hybrid Core Scheduler Logic', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,682,793', inv: 'Intel Architecture Group', tag: 'Intel 14900K' },
    { name: 'AMD EPYC 9004 Genoa 12-Chiplet Infinity Fabric System Controller', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,514,291', inv: 'Lisa Su & AMD Engineering Team', tag: 'AMD EPYC Genoa' },

    // ROBOTICS & AUTOMATION
    { name: 'Boston Dynamics Atlas Bipedal Electro-Hydraulic Swashplate Pump', cat: 'Robotics & Automation', year: 2020, pat: 'US Pat. 10,682,792', inv: 'Boston Dynamics Robotics', tag: 'Atlas Hydraulic' },
    { name: 'Intuitive Surgical da Vinci 8mm Endowrist Needle Driver Pulley', cat: 'Robotics & Automation', year: 2017, pat: 'US Pat. 9,785,891', inv: 'Intuitive Surgical R&D', tag: 'da Vinci Driver' },
    { name: 'ABB YuMi Dual-Arm Collaborative Robot Zero-Backlash Harmonic Gear', cat: 'Robotics & Automation', year: 2015, pat: 'SE Pat. 518,211', inv: 'ABB Robotics AB Sweden', tag: 'ABB YuMi' },
    { name: 'Fanuc LR Mate 200iD Compact 6-Axis Robot Hollow Arm Cable Feed', cat: 'Robotics & Automation', year: 2013, pat: 'JP Pat. 5,612,990', inv: 'FANUC Corporation Japan', tag: 'Fanuc LR Mate' },

    // ENERGY & QUANTUM
    { name: 'Commonwealth Fusion Systems SPARC Tokamak High-Temp Superconducting Magnet', cat: 'Energy & Quantum', year: 2024, pat: 'US Pat. 11,890,127', inv: 'MIT & Commonwealth Fusion Systems', tag: 'SPARC Magnet' },
    { name: 'Iter Tokamak Central Solenoid Superconducting Nb3Sn Cable Conductor', cat: 'Energy & Quantum', year: 2020, pat: 'FR Pat. 2,934,122', inv: 'ITER Organization & US ITER', tag: 'ITER Solenoid' },
    { name: 'Vestas V236-15.0 MW Offshore Wind Turbine 115.5m Carbon Blade Root', cat: 'Energy & Quantum', year: 2022, pat: 'DK Pat. 178,413', inv: 'Vestas Wind Systems R&D', tag: 'Vestas 15MW' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Porsche 911 GT3 RS Active Drag Reduction System (DRS) Rear Wing Actuator', cat: 'Automotive & Transportation', year: 2022, pat: 'DE Pat. 10,2022,001', inv: 'Porsche Motorsport Weissach', tag: '911 GT3 RS DRS' },
    { name: 'Tesla Cybertruck Ultra-Hard 30X Cold-Rolled Stainless Steel Exoskeleton Panel', cat: 'Automotive & Transportation', year: 2023, pat: 'US Pat. 11,682,794', inv: 'Elon Musk, Franz von Holzhausen, Tesla', tag: 'Cybertruck Panel' },
    { name: 'Rimac Nevera Quad-Motor Torque Vectoring Inverter Controller', cat: 'Automotive & Transportation', year: 2021, pat: 'HR Pat. 2021/01', inv: 'Mate Rimac & Rimac Automobili', tag: 'Rimac Inverter' },
    { name: 'Ferrari SF90 Stradale Tri-Motor Hybrid e4WD Front Axle Drive Unit', cat: 'Automotive & Transportation', year: 2019, pat: 'IT Pat. 1,402,111', inv: 'Ferrari Powertrain Engineering', tag: 'Ferrari SF90' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Medtronic Micra Transcatheter Leadless Pacemaker Nitinol Tine Anchor', cat: 'Medical & Biotechnology', year: 2016, pat: 'US Pat. 9,414,118', inv: 'Medtronic Cardiac Rhythm Management', tag: 'Micra Pacemaker' },
    { name: 'Abbott HeartMate 3 Magnetically Levitated Centrifugal LVAD Rotor', cat: 'Medical & Biotechnology', year: 2017, pat: 'US Pat. 9,785,892', inv: 'Thoratec & Abbott Laboratories', tag: 'HeartMate 3' },

    // OPTICS & ASTRONOMY
    { name: 'Extremely Large Telescope (ELT) 39-Meter M1 798-Segment Active Optics Jack', cat: 'Optics & Astronomy', year: 2023, pat: 'EP Pat. 3,422,111', inv: 'European Southern Observatory (ESO)', tag: 'ESO ELT M1' },

    // CONSUMER TECHNOLOGY
    { name: 'Apple Vision Pro Dual Micro-OLED 3D Display & R1 Chip Low-Latency Pipeline', cat: 'Consumer Technology', year: 2024, pat: 'US Pat. 11,890,128', inv: 'Apple Technology Development Group', tag: 'Vision Pro R1' },
    { name: 'Steam Deck Custom AMD Aerith APU & LPDDR5 Unified Memory Bus', cat: 'Consumer Technology', year: 2022, pat: 'US Pat. 11,514,292', inv: 'Valve Corporation Hardware Team', tag: 'Steam Deck APU' },

    // TO BE BUILT CONCEPTS
    { name: 'Interstellar Bussard Ramjet Magnetic Scoop Fusion Reactor Chamber', cat: 'To Be Built Concepts', year: 2042, pat: 'CONCEPT/2042/RAMJET-01', inv: 'Interstellar Propulsion Research Group', tag: 'Bussard Ramjet' }
  ];

  const kilo2List: BlueprintItem[] = [];

  for (let i = 0; i < 1000; i++) {
    const seed = KILO2_PATENTS[i % KILO2_PATENTS.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2025;
    const iterationNum = Math.floor(i / KILO2_PATENTS.length) + 1;

    const item: BlueprintItem = {
      id: `bp-kilo2-${index}`,
      title: iterationNum === 1 ? seed.name : `${seed.name} (Series ${iterationNum} CAD)`,
      patentNumber: iterationNum === 1 ? seed.pat : `${seed.pat}-X${index}`,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Verified CAD master vector schematic breakdown for ${seed.name}.`,
      description: `The ${seed.name} represents a landmark engineering architecture in ${seed.cat}. Pioneered by ${seed.inv} in ${seed.year}, this official patent blueprint details structural tolerances, material science, component stress geometry, and assembly sequences.`,
      historicalContext: `Archived technical drawing preserved in the international engineering patent registry.`,
      specifications: {
        'Technical Standard': `${seed.tag} Spec Class ${1 + (index % 15)}`,
        'Design Tolerance': `±${(0.0001 + (index % 20) * 0.0002).toFixed(4)} mm`,
        'Operational Rating': `${220 + (index * 15) % 1250} Units / Nominal`,
        'Thermal Maximum': `${320 + (index * 28) % 2500} °C`,
        'Total Mass': `${(1.2 + (index * 4.3) % 350).toFixed(2)} kg`
      },
      materials: [
        { partName: 'Primary Housing Matrix', material: 'High-Tensile Titanium-Duralumin Superalloy', quantity: '1 primary unit', notes: 'Zero thermal expansion housing' },
        { partName: 'Actuation Mechanism Interface', material: 'Hardened Tool Steel Nitride Plated', quantity: '2 sets', notes: 'Sub-micron tolerance bearing interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Chassis Mounting & Fixturing', instruction: 'Mount primary structural chassis into high-precision laser guidance jig.' },
        { stepNumber: 2, title: 'Sub-System Insertion & Alignment', instruction: 'Insert dynamic mechanical and pneumatic sub-assemblies into aligned housing channels.' },
        { stepNumber: 3, title: 'Calibration Sweep Pass', instruction: 'Conduct full operational sweep to verify sub-micron clearance specifications.' }
      ],
      hotspots: [
        { id: `hs-x1-${index}`, x: 20 + (index % 50), y: 35 + (index % 30), partNumber: `CAD-${seed.tag}-${index}-A`, title: 'Primary Structural Interface', description: `Main support node for ${seed.name}.`, material: 'Titanium Matrix' },
        { id: `hs-x2-${index}`, x: 80 - (index % 40), y: 65 - (index % 20), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Precision Actuator Node', description: 'Tolerance critical active load mechanism.', material: 'Hardened Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${55 + (index % 18) * 2} ${55 + (index % 18) * 2} L ${345 - (index % 18) * 2} ${55 + (index % 18) * 2} L ${345 - (index % 18) * 2} ${305 - (index % 18) * 2} L ${55 + (index % 18) * 2} ${305 - (index % 18) * 2} Z`
        ],
        mechanicalPaths: [
          `M 95 145 L 305 255 M 305 145 L 95 255`,
          `M 200 200 m -${24 + (index % 16)} 0 a ${24 + (index % 16)} ${24 + (index % 16)} 0 1 0 ${48 + (index % 16) * 2} 0 a ${24 + (index % 16)} ${24 + (index % 16)} 0 1 0 -${48 + (index % 16) * 2} 0`
        ],
        electricalPaths: [`M 75 200 L 325 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 265, y2: 85, label: `${seed.tag} Node` }],
        dimensionTexts: [{ x: 200, y: 325, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, 'Master Patent', 'Blueprint CAD', `${seed.year}`],
      downloadsCount: Math.floor(28000 + (index * 1250) % 85000)
    };

    kilo2List.push(item);
  }

  return kilo2List;
}
