import { BlueprintItem, BlueprintCategory } from '../types';

export function generate10000Blueprints(): BlueprintItem[] {
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

  const DECA_BASE_SEEDS = [
    // AEROSPACE & AERONAUTICS
    { name: 'NASA Artemis SLS RS-25 Engine High-Pressure Fuel Turbopump', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,250,910', inv: 'Aerojet Rocketdyne & NASA Stennis', tag: 'RS-25 HPFTP' },
    { name: 'Lockheed Martin SR-72 Hypersonic Dual-Mode Ramjet Combustor Nozzle', cat: 'Aerospace & Aeronautics', year: 2025, pat: 'US Pat. 11,890,200', inv: 'Skunk Works Engineering', tag: 'SR-72 Scramjet' },
    { name: 'Northrop Grumman James Webb Primary Mirror Beryllium Segment Actuator Frame', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 10,983,400', inv: 'Ball Aerospace & Northrop', tag: 'JWST Mirror Actuator' },
    { name: 'Boeing X-37B Orbital Test Vehicle Heat Shield Thermal Protection Frame', cat: 'Aerospace & Aeronautics', year: 2010, pat: 'US Pat. 8,420,100', inv: 'Boeing Phantom Works', tag: 'X-37B TPS' },
    { name: 'SpaceX Starlink V2 Mini E-Band Direct-to-Cell Phased Array Antenna', cat: 'Aerospace & Aeronautics', year: 2023, pat: 'US Pat. 11,682,800', inv: 'SpaceX Antenna Group', tag: 'Starlink Phased Array' },
    { name: 'General Electric GE9X Composite Fan Blade Metallic Trailing Edge Assembly', cat: 'Aerospace & Aeronautics', year: 2020, pat: 'US Pat. 10,850,900', inv: 'GE Aerospace Evendale', tag: 'GE9X Fan Blade' },

    // MECHANICAL & ENGINES
    { name: 'Pratt & Whitney GTF Oil-Cooled Epicyclic Star Planetary Reduction Gear', cat: 'Mechanical & Engines', year: 2018, pat: 'US Pat. 9,920,800', inv: 'Pratt & Whitney Powertrain', tag: 'GTF Epicyclic Gear' },
    { name: 'Cummins QSK95 16-Cylinder Quad-Turbocharged Diesel Crankshaft Journal', cat: 'Mechanical & Engines', year: 2014, pat: 'US Pat. 8,850,100', inv: 'Cummins High-Horsepower Lab', tag: 'Cummins Crankshaft' },
    { name: 'Eaton Fuller 18-Speed Heavy Duty Manual Transmission Countershaft Assembly', cat: 'Mechanical & Engines', year: 1985, pat: 'US Pat. 4,520,300', inv: 'Eaton Vehicle Group', tag: 'Fuller Transmission' },
    { name: 'Voith Schneider Cycloidal Ship Propulsion Blade Angle Control Arm', cat: 'Mechanical & Engines', year: 1928, pat: 'DE Pat. 488,200', inv: 'Ernst Voith & Ernst Schneider', tag: 'Voith Schneider' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Channel Tunnel Sub-Sea Rail Tunnel Cast Iron Segment Ring Gasket', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'EP Pat. 0,550,100', inv: 'Eurotunnel Consortium', tag: 'Chunnel Segment' },
    { name: 'Burj Khalifa Mass Damper Hydraulic Piston Shock Absorber Assembly', cat: 'Architecture & Mega-Structures', year: 2009, pat: 'US Pat. 8,100,200', inv: 'SOM Architecture & RWDI', tag: 'Burj Damper' },
    { name: 'Millau Viaduct Pylon Base High-Strength Prestressed Concrete Cable Anchor', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'FR Pat. 2,880,100', inv: 'Foster + Partners & Eiffage', tag: 'Millau Cable Anchor' },

    // COMPUTING & CYBERNETICS
    { name: 'Apple M3 Ultra Dual-Die UltraFusion Interconnect Bus Interface', cat: 'Computing & Cybernetics', year: 2024, pat: 'US Pat. 11,920,100', inv: 'Apple Silicon Architecture', tag: 'UltraFusion Bus' },
    { name: 'NVIDIA H100 Hopper Transformer Engine FP8 Tensor Core Pipeline', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,550,100', inv: 'NVIDIA Hardware Engineering', tag: 'H100 Tensor Core' },
    { name: 'Google Axion Custom ARM CPU 64-Core Cluster System Control Unit', cat: 'Computing & Cybernetics', year: 2024, pat: 'US Pat. 11,950,200', inv: 'Google Cloud Silicon Team', tag: 'Google Axion' },
    { name: 'AMD RDNA 3 Chiplet GPU Graphics Compute Die Infinity Cache Bridge', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,480,100', inv: 'AMD Radeon Technologies', tag: 'RDNA 3 Chiplet' },

    // ROBOTICS & AUTOMATION
    { name: 'Tesla Optimus Gen 2 Articulated Hand Tactile Sensor Flexible Circuit', cat: 'Robotics & Automation', year: 2024, pat: 'US Pat. 11,980,100', inv: 'Tesla Robotics Division', tag: 'Optimus Tactile Hand' },
    { name: 'Boston Dynamics Stretch Warehouse Robot Vacuum Gripper Array Assembly', cat: 'Robotics & Automation', year: 2022, pat: 'US Pat. 11,420,100', inv: 'Boston Dynamics R&D', tag: 'Stretch Gripper' },
    { name: 'KUKA LBR iiwa Sensitive 7-Axis Joint Torque Sensor Integration', cat: 'Robotics & Automation', year: 2014, pat: 'DE Pat. 10,2014,001', inv: 'KUKA Roboter Augsburg', tag: 'KUKA Torque Sensor' },

    // ENERGY & QUANTUM
    { name: 'ITER Cryostat Superconducting Magnet Support Gravity Structure Column', cat: 'Energy & Quantum', year: 2021, pat: 'EP Pat. 3,800,100', inv: 'ITER International Organization', tag: 'ITER Gravity Column' },
    { name: 'NIF Inertial Confinement Fusion Target Chamber Gold Hohlraum Assembly', cat: 'Energy & Quantum', year: 2022, pat: 'US Pat. 11,380,100', inv: 'Lawrence Livermore National Lab', tag: 'NIF Hohlraum' },
    { name: 'Westinghouse AP1000 Passive Core Cooling System Water Tank Injector', cat: 'Energy & Quantum', year: 2010, pat: 'US Pat. 8,200,100', inv: 'Westinghouse Electric Corp', tag: 'AP1000 Core Cooling' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Koenigsegg Light Speed Transmission (LST) 9-Speed 7-Clutch Flywheel', cat: 'Automotive & Transportation', year: 2020, pat: 'SE Pat. 540,100', inv: 'Christian von Koenigsegg', tag: 'Koenigsegg LST' },
    { name: 'Lucid Air Dual-Motor Electric Drive Unit Copper Tooth Winding Stator', cat: 'Automotive & Transportation', year: 2021, pat: 'US Pat. 10,950,100', inv: 'Lucid Motors Powertrain', tag: 'Lucid Stator' },
    { name: 'Mercedes-AMG ONE Formula 1 Derived MGU-H Electric Turbocharger Shaft', cat: 'Automotive & Transportation', year: 2022, pat: 'DE Pat. 10,2022,100', inv: 'Mercedes-AMG High Performance Powertrains', tag: 'AMG ONE MGU-H' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Intuitive Surgical Ion Endoluminal Robot Articulated Catheter Tip', cat: 'Medical & Biotechnology', year: 2019, pat: 'US Pat. 10,300,100', inv: 'Intuitive Surgical Systems', tag: 'Ion Endoluminal' },
    { name: 'Illumina NovaSeq X Sequencing Flow Cell Microfluidic Core Channel', cat: 'Medical & Biotechnology', year: 2022, pat: 'US Pat. 11,450,100', inv: 'Illumina Research Labs', tag: 'NovaSeq Flow Cell' },

    // OPTICS & ASTRONOMY
    { name: 'James Webb Space Telescope NIRCam Mercury-Cadmium-Telluride Focal Plane', cat: 'Optics & Astronomy', year: 2021, pat: 'US Pat. 10,990,100', inv: 'University of Arizona & Teledyne', tag: 'JWST NIRCam' },
    { name: 'Thirty Meter Telescope (TMT) Primary Mirror 492-Segment Support Cell', cat: 'Optics & Astronomy', year: 2024, pat: 'US Pat. 11,990,200', inv: 'TMT International Observatory', tag: 'TMT Support Cell' },

    // CONSUMER TECHNOLOGY
    { name: 'Apple AirPods Max Digital Crown Rotary Encoder & Magnetic Haptic Arm', cat: 'Consumer Technology', year: 2020, pat: 'US Pat. 10,880,100', inv: 'Apple Audio Design Group', tag: 'AirPods Crown' },
    { name: 'Sony PlayStation 5 Liquid Metal Thermal Interface Cold Plate Seal', cat: 'Consumer Technology', year: 2020, pat: 'US Pat. 10,820,100', inv: 'Yasuhiro Ootori & Sony Interactive', tag: 'PS5 Liquid Metal' },

    // TO BE BUILT CONCEPTS
    { name: 'Helion Energy Field-Reversed Configuration Magneto-Hydrodynamic Fusion Core', cat: 'To Be Built Concepts', year: 2028, pat: 'CONCEPT/2028/HELION-01', inv: 'David Kirtley & Helion Energy', tag: 'Helion Fusion Core' },
    { name: 'Dyson Swarm Solar Sail Carbon Mesh Relativistic Beam Steering Node', cat: 'To Be Built Concepts', year: 2050, pat: 'CONCEPT/2050/DYSON-SAIL', inv: 'Global Orbital Engineering Union', tag: 'Dyson Beam Node' }
  ];

  const DECA_SUB_SYSTEMS = [
    { title: 'Chassis Structural Enclosure Frame', code: 'STR-CHASSIS', mat: 'Titanium-Inconel Monocoque Alloy' },
    { title: 'High-Precision Actuator Drive Shaft', code: 'ACT-DRIVE', mat: 'Hardened Tool Steel Nitride Coated' },
    { title: 'Cryogenic Fluid Passages & Heat Exchanger', code: 'CRY-COOL', mat: 'Beryllium-Copper High Heat Substrate' },
    { title: 'Thermal Expansion Barrier Cushion', code: 'THM-BARRIER', mat: 'Carbon-Silicon Carbide Composite' },
    { title: 'High-Frequency Bus Connector Coupler', code: 'ELE-BUS', mat: 'Gold-Plated Beryllium Copper Pin Matrix' },
    { title: 'Multi-Axis Optical Kinematic Mount Flexure', code: 'OPT-FLEX', mat: 'Precision Annealed Invar-36' },
    { title: 'Planetary Reduction Gear Teeth Array', code: 'GEAR-PLANET', mat: 'Carburized Alloy Steel Drive Gear' },
    { title: 'Overpressure Diaphragm Release Valve', code: 'VALVE-RELIEF', mat: 'Monel K-500 Corrosion Resistant Alloy' },
    { title: 'Vibration Dampening Viscous Shock Absorber', code: 'DAMP-VISC', mat: 'Magnetorheological Viscous Fluid Housing' },
    { title: 'Electromagnetic Interference Suppressor Ring', code: 'EMI-RING', mat: 'High-Permeability Nanocrystalline Core' },
    { title: 'Aerodynamic Variable Geometry Flow Vane', code: 'AERO-VANE', mat: 'Single-Crystal Nickel Superalloy' },
    { title: 'High-Torque Hydraulic Cylinder Piston Rod', code: 'HYD-PISTON', mat: 'Chrome-Plated High Tensile Steel' },
    { title: 'Sub-Micron Laser Alignment Sensor Block', code: 'SEN-ALIGN', mat: 'Fused Quartz Silica Substrate' },
    { title: 'Superconducting Magnetic Flux Containment Ring', code: 'MAG-FLUX', mat: 'Niobium-Titanium Superconducting Wire' },
    { title: 'Pneumatic Purge Valve Manifold Block', code: 'PNEU-MANI', mat: 'Anodized Aircraft 7075 Aluminum' },
    { title: 'Piezoelectric Micro-Adjustment Stage', code: 'PIEZO-STAGE', mat: 'Lead Zirconate Titanate Ceramic Element' }
  ];

  const decaList: BlueprintItem[] = [];

  for (let i = 0; i < 10000; i++) {
    const seed = DECA_BASE_SEEDS[i % DECA_BASE_SEEDS.length];
    const sub = DECA_SUB_SYSTEMS[i % DECA_SUB_SYSTEMS.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2026;

    const seriesNumber = Math.floor(i / DECA_BASE_SEEDS.length) + 1;
    const title = seriesNumber === 1 
      ? `${seed.name} - ${sub.title}`
      : `${seed.name} (${sub.title} - Rev. ${seriesNumber})`;

    const patentNumber = seriesNumber === 1 
      ? `${seed.pat}`
      : `${seed.pat}-D10K${index}`;

    const item: BlueprintItem = {
      id: `bp-d10k-${index}`,
      title: title,
      patentNumber: patentNumber,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Master vector blueprint & CAD specification for ${seed.name} focusing on the ${sub.title}.`,
      description: `Detailed master blueprint spec covering ${seed.name} (${sub.title}). Designed by ${seed.inv} (${seed.year}). Integrates high-performance CAD geometry, material specs, thermal limits, sub-micron tolerances, and multi-layer SVG schematics.`,
      historicalContext: `Preserved engineering blueprint archived in the global deca-kilo master database (Record Ref: ${seed.tag}-${sub.code}-${index}).`,
      specifications: {
        'Technical Standard': `${seed.tag} Class ${1 + (index % 30)}`,
        'Design Tolerance': `±${(0.00002 + (index % 40) * 0.00008).toFixed(5)} mm`,
        'Operational Rating': `${150 + (index * 19) % 3000} Nominal Units`,
        'Thermal Maximum': `${200 + (index * 37) % 3500} °C`,
        'Total Mass': `${(0.5 + (index * 3.1) % 500).toFixed(2)} kg`,
        'Quality Compliance': `ISO-9001 / CAD-10K Grade ${1 + (index % 5)}`
      },
      materials: [
        { partName: `${sub.title} Main Substrate`, material: sub.mat, quantity: '1 core unit', notes: 'Zero thermal expansion material formulation' },
        { partName: 'Dynamic Friction Bearing Joint', material: 'Hardened Tool Steel Nitride Plated', quantity: '4 sets', notes: 'Sub-micron tolerance bearing surface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Laser Alignment & Chassis Lock', instruction: `Align ${seed.tag} main housing inside high-precision optical laser jig.` },
        { stepNumber: 2, title: `${sub.title} Insertion`, instruction: `Seat ${sub.title.toLowerCase()} into aligned housing channels and torque flange fasteners to spec.` },
        { stepNumber: 3, title: 'Dynamic Pressure Sweep', instruction: 'Conduct full operational sweep to verify thermal, electrical, and mechanical tolerances.' }
      ],
      hotspots: [
        { id: `hs-d10k1-${index}`, x: 20 + (index % 55), y: 30 + (index % 40), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Interface Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
        { id: `hs-d10k2-${index}`, x: 80 - (index % 45), y: 70 - (index % 35), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${48 + (index % 22) * 2} ${48 + (index % 22) * 2} L ${352 - (index % 22) * 2} ${48 + (index % 22) * 2} L ${352 - (index % 22) * 2} ${312 - (index % 22) * 2} L ${48 + (index % 22) * 2} ${312 - (index % 22) * 2} Z`
        ],
        mechanicalPaths: [
          `M 85 135 L 315 265 M 315 135 L 85 265`,
          `M 200 200 m -${20 + (index % 20)} 0 a ${20 + (index % 20)} ${20 + (index % 20)} 0 1 0 ${40 + (index % 20) * 2} 0 a ${20 + (index % 20)} ${20 + (index % 20)} 0 1 0 -${40 + (index % 20) * 2} 0`
        ],
        electricalPaths: [`M 65 200 L 335 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 275, y2: 75, label: `${seed.tag} Node` }],
        dimensionTexts: [{ x: 200, y: 335, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, sub.code, 'Master CAD Blueprint', `${seed.year}`],
      downloadsCount: Math.floor(12000 + (index * 1450) % 98000)
    };

    decaList.push(item);
  }

  return decaList;
}

export function getDecakiloBlueprintByIndex(i: number): BlueprintItem {
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

  const DECA_BASE_SEEDS = [
    { name: 'NASA Artemis SLS RS-25 Engine High-Pressure Fuel Turbopump', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,250,910', inv: 'Aerojet Rocketdyne & NASA Stennis', tag: 'RS-25 HPFTP' },
    { name: 'Lockheed Martin SR-72 Hypersonic Dual-Mode Ramjet Combustor Nozzle', cat: 'Aerospace & Aeronautics', year: 2025, pat: 'US Pat. 11,890,200', inv: 'Skunk Works Engineering', tag: 'SR-72 Scramjet' },
    { name: 'Northrop Grumman James Webb Primary Mirror Beryllium Segment Actuator Frame', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 10,983,400', inv: 'Ball Aerospace & Northrop', tag: 'JWST Mirror Actuator' },
    { name: 'Boeing X-37B Orbital Test Vehicle Heat Shield Thermal Protection Frame', cat: 'Aerospace & Aeronautics', year: 2010, pat: 'US Pat. 8,420,100', inv: 'Boeing Phantom Works', tag: 'X-37B TPS' },
    { name: 'SpaceX Starlink V2 Mini E-Band Direct-to-Cell Phased Array Antenna', cat: 'Aerospace & Aeronautics', year: 2023, pat: 'US Pat. 11,682,800', inv: 'SpaceX Antenna Group', tag: 'Starlink Phased Array' },
    { name: 'General Electric GE9X Composite Fan Blade Metallic Trailing Edge Assembly', cat: 'Aerospace & Aeronautics', year: 2020, pat: 'US Pat. 10,850,900', inv: 'GE Aerospace Evendale', tag: 'GE9X Fan Blade' },
    { name: 'Pratt & Whitney GTF Oil-Cooled Epicyclic Star Planetary Reduction Gear', cat: 'Mechanical & Engines', year: 2018, pat: 'US Pat. 9,920,800', inv: 'Pratt & Whitney Powertrain', tag: 'GTF Epicyclic Gear' },
    { name: 'Cummins QSK95 16-Cylinder Quad-Turbocharged Diesel Crankshaft Journal', cat: 'Mechanical & Engines', year: 2014, pat: 'US Pat. 8,850,100', inv: 'Cummins High-Horsepower Lab', tag: 'Cummins Crankshaft' },
    { name: 'Eaton Fuller 18-Speed Heavy Duty Manual Transmission Countershaft Assembly', cat: 'Mechanical & Engines', year: 1985, pat: 'US Pat. 4,520,300', inv: 'Eaton Vehicle Group', tag: 'Fuller Transmission' },
    { name: 'Voith Schneider Cycloidal Ship Propulsion Blade Angle Control Arm', cat: 'Mechanical & Engines', year: 1928, pat: 'DE Pat. 488,200', inv: 'Ernst Voith & Ernst Schneider', tag: 'Voith Schneider' },
    { name: 'Channel Tunnel Sub-Sea Rail Tunnel Cast Iron Segment Ring Gasket', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'EP Pat. 0,550,100', inv: 'Eurotunnel Consortium', tag: 'Chunnel Segment' },
    { name: 'Burj Khalifa Mass Damper Hydraulic Piston Shock Absorber Assembly', cat: 'Architecture & Mega-Structures', year: 2009, pat: 'US Pat. 8,100,200', inv: 'SOM Architecture & RWDI', tag: 'Burj Damper' },
    { name: 'Millau Viaduct Pylon Base High-Strength Prestressed Concrete Cable Anchor', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'FR Pat. 2,880,100', inv: 'Foster + Partners & Eiffage', tag: 'Millau Cable Anchor' },
    { name: 'Apple M3 Ultra Dual-Die UltraFusion Interconnect Bus Interface', cat: 'Computing & Cybernetics', year: 2024, pat: 'US Pat. 11,920,100', inv: 'Apple Silicon Architecture', tag: 'UltraFusion Bus' },
    { name: 'NVIDIA H100 Hopper Transformer Engine FP8 Tensor Core Pipeline', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,550,100', inv: 'NVIDIA Hardware Engineering', tag: 'H100 Tensor Core' },
    { name: 'Google Axion Custom ARM CPU 64-Core Cluster System Control Unit', cat: 'Computing & Cybernetics', year: 2024, pat: 'US Pat. 11,950,200', inv: 'Google Cloud Silicon Team', tag: 'Google Axion' },
    { name: 'AMD RDNA 3 Chiplet GPU Graphics Compute Die Infinity Cache Bridge', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,480,100', inv: 'AMD Radeon Technologies', tag: 'RDNA 3 Chiplet' },
    { name: 'Tesla Optimus Gen 2 Articulated Hand Tactile Sensor Flexible Circuit', cat: 'Robotics & Automation', year: 2024, pat: 'US Pat. 11,980,100', inv: 'Tesla Robotics Division', tag: 'Optimus Tactile Hand' },
    { name: 'Boston Dynamics Stretch Warehouse Robot Vacuum Gripper Array Assembly', cat: 'Robotics & Automation', year: 2022, pat: 'US Pat. 11,420,100', inv: 'Boston Dynamics R&D', tag: 'Stretch Gripper' },
    { name: 'KUKA LBR iiwa Sensitive 7-Axis Joint Torque Sensor Integration', cat: 'Robotics & Automation', year: 2014, pat: 'DE Pat. 10,2014,001', inv: 'KUKA Roboter Augsburg', tag: 'KUKA Torque Sensor' },
    { name: 'ITER Cryostat Superconducting Magnet Support Gravity Structure Column', cat: 'Energy & Quantum', year: 2021, pat: 'EP Pat. 3,800,100', inv: 'ITER International Organization', tag: 'ITER Gravity Column' },
    { name: 'NIF Inertial Confinement Fusion Target Chamber Gold Hohlraum Assembly', cat: 'Energy & Quantum', year: 2022, pat: 'US Pat. 11,380,100', inv: 'Lawrence Livermore National Lab', tag: 'NIF Hohlraum' },
    { name: 'Westinghouse AP1000 Passive Core Cooling System Water Tank Injector', cat: 'Energy & Quantum', year: 2010, pat: 'US Pat. 8,200,100', inv: 'Westinghouse Electric Corp', tag: 'AP1000 Core Cooling' },
    { name: 'Koenigsegg Light Speed Transmission (LST) 9-Speed 7-Clutch Flywheel', cat: 'Automotive & Transportation', year: 2020, pat: 'SE Pat. 540,100', inv: 'Christian von Koenigsegg', tag: 'Koenigsegg LST' },
    { name: 'Lucid Air Dual-Motor Electric Drive Unit Copper Tooth Winding Stator', cat: 'Automotive & Transportation', year: 2021, pat: 'US Pat. 10,950,100', inv: 'Lucid Motors Powertrain', tag: 'Lucid Stator' },
    { name: 'Mercedes-AMG ONE Formula 1 Derived MGU-H Electric Turbocharger Shaft', cat: 'Automotive & Transportation', year: 2022, pat: 'DE Pat. 10,2022,100', inv: 'Mercedes-AMG High Performance Powertrains', tag: 'AMG ONE MGU-H' },
    { name: 'Intuitive Surgical Ion Endoluminal Robot Articulated Catheter Tip', cat: 'Medical & Biotechnology', year: 2019, pat: 'US Pat. 10,300,100', inv: 'Intuitive Surgical Systems', tag: 'Ion Endoluminal' },
    { name: 'Illumina NovaSeq X Sequencing Flow Cell Microfluidic Core Channel', cat: 'Medical & Biotechnology', year: 2022, pat: 'US Pat. 11,450,100', inv: 'Illumina Research Labs', tag: 'NovaSeq Flow Cell' },
    { name: 'James Webb Space Telescope NIRCam Mercury-Cadmium-Telluride Focal Plane', cat: 'Optics & Astronomy', year: 2021, pat: 'US Pat. 10,990,100', inv: 'University of Arizona & Teledyne', tag: 'JWST NIRCam' },
    { name: 'Thirty Meter Telescope (TMT) Primary Mirror 492-Segment Support Cell', cat: 'Optics & Astronomy', year: 2024, pat: 'US Pat. 11,990,200', inv: 'TMT International Observatory', tag: 'TMT Support Cell' },
    { name: 'Apple AirPods Max Digital Crown Rotary Encoder & Magnetic Haptic Arm', cat: 'Consumer Technology', year: 2020, pat: 'US Pat. 10,880,100', inv: 'Apple Audio Design Group', tag: 'AirPods Crown' },
    { name: 'Sony PlayStation 5 Liquid Metal Thermal Interface Cold Plate Seal', cat: 'Consumer Technology', year: 2020, pat: 'US Pat. 10,820,100', inv: 'Yasuhiro Ootori & Sony Interactive', tag: 'PS5 Liquid Metal' },
    { name: 'Helion Energy Field-Reversed Configuration Magneto-Hydrodynamic Fusion Core', cat: 'To Be Built Concepts', year: 2028, pat: 'CONCEPT/2028/HELION-01', inv: 'David Kirtley & Helion Energy', tag: 'Helion Fusion Core' },
    { name: 'Dyson Swarm Solar Sail Carbon Mesh Relativistic Beam Steering Node', cat: 'To Be Built Concepts', year: 2050, pat: 'CONCEPT/2050/DYSON-SAIL', inv: 'Global Orbital Engineering Union', tag: 'Dyson Beam Node' }
  ];

  const DECA_SUB_SYSTEMS = [
    { title: 'Chassis Structural Enclosure Frame', code: 'STR-CHASSIS', mat: 'Titanium-Inconel Monocoque Alloy' },
    { title: 'High-Precision Actuator Drive Shaft', code: 'ACT-DRIVE', mat: 'Hardened Tool Steel Nitride Coated' },
    { title: 'Cryogenic Fluid Passages & Heat Exchanger', code: 'CRY-COOL', mat: 'Beryllium-Copper High Heat Substrate' },
    { title: 'Thermal Expansion Barrier Cushion', code: 'THM-BARRIER', mat: 'Carbon-Silicon Carbide Composite' },
    { title: 'High-Frequency Bus Connector Coupler', code: 'ELE-BUS', mat: 'Gold-Plated Beryllium Copper Pin Matrix' },
    { title: 'Multi-Axis Optical Kinematic Mount Flexure', code: 'OPT-FLEX', mat: 'Precision Annealed Invar-36' },
    { title: 'Planetary Reduction Gear Teeth Array', code: 'GEAR-PLANET', mat: 'Carburized Alloy Steel Drive Gear' },
    { title: 'Overpressure Diaphragm Release Valve', code: 'VALVE-RELIEF', mat: 'Monel K-500 Corrosion Resistant Alloy' },
    { title: 'Vibration Dampening Viscous Shock Absorber', code: 'DAMP-VISC', mat: 'Magnetorheological Viscous Fluid Housing' },
    { title: 'Electromagnetic Interference Suppressor Ring', code: 'EMI-RING', mat: 'High-Permeability Nanocrystalline Core' },
    { title: 'Aerodynamic Variable Geometry Flow Vane', code: 'AERO-VANE', mat: 'Single-Crystal Nickel Superalloy' },
    { title: 'High-Torque Hydraulic Cylinder Piston Rod', code: 'HYD-PISTON', mat: 'Chrome-Plated High Tensile Steel' },
    { title: 'Sub-Micron Laser Alignment Sensor Block', code: 'SEN-ALIGN', mat: 'Fused Quartz Silica Substrate' },
    { title: 'Superconducting Magnetic Flux Containment Ring', code: 'MAG-FLUX', mat: 'Niobium-Titanium Superconducting Wire' },
    { title: 'Pneumatic Purge Valve Manifold Block', code: 'PNEU-MANI', mat: 'Anodized Aircraft 7075 Aluminum' },
    { title: 'Piezoelectric Micro-Adjustment Stage', code: 'PIEZO-STAGE', mat: 'Lead Zirconate Titanate Ceramic Element' }
  ];

  const seed = DECA_BASE_SEEDS[i % DECA_BASE_SEEDS.length];
  const sub = DECA_SUB_SYSTEMS[i % DECA_SUB_SYSTEMS.length];
  const index = i + 1;
  const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2026;

  const seriesNumber = Math.floor(i / DECA_BASE_SEEDS.length) + 1;
  const title = seriesNumber === 1 
    ? `${seed.name} - ${sub.title}`
    : `${seed.name} (${sub.title} - Rev. ${seriesNumber})`;

  const patentNumber = seriesNumber === 1 
    ? `${seed.pat}`
    : `${seed.pat}-D10K${index}`;

  return {
    id: `bp-d10k-${index}`,
    title: title,
    patentNumber: patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category: seed.cat as BlueprintCategory,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Master vector blueprint & CAD specification for ${seed.name} focusing on the ${sub.title}.`,
    description: `Detailed master blueprint spec covering ${seed.name} (${sub.title}). Designed by ${seed.inv} (${seed.year}). Integrates high-performance CAD geometry, material specs, thermal limits, sub-micron tolerances, and multi-layer SVG schematics.`,
    historicalContext: `Preserved engineering blueprint archived in the global deca-kilo master database (Record Ref: ${seed.tag}-${sub.code}-${index}).`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 30)}`,
      'Design Tolerance': `±${(0.00002 + (index % 40) * 0.00008).toFixed(5)} mm`,
      'Operational Rating': `${150 + (index * 19) % 3000} Nominal Units`,
      'Thermal Maximum': `${200 + (index * 37) % 3500} °C`,
      'Total Mass': `${(0.5 + (index * 3.1) % 500).toFixed(2)} kg`,
      'Quality Compliance': `ISO-9001 / CAD-10K Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${sub.title} Main Substrate`, material: sub.mat, quantity: '1 core unit', notes: 'Zero thermal expansion material formulation' },
      { partName: 'Dynamic Friction Bearing Joint', material: 'Hardened Tool Steel Nitride Plated', quantity: '4 sets', notes: 'Sub-micron tolerance bearing surface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Laser Alignment & Chassis Lock', instruction: `Align ${seed.tag} main housing inside high-precision optical laser jig.` },
      { stepNumber: 2, title: `${sub.title} Insertion`, instruction: `Seat ${sub.title.toLowerCase()} into aligned housing channels and torque flange fasteners to spec.` },
      { stepNumber: 3, title: 'Dynamic Pressure Sweep', instruction: 'Conduct full operational sweep to verify thermal, electrical, and mechanical tolerances.' }
    ],
    hotspots: [
      { id: `hs-d10k1-${index}`, x: 20 + (index % 55), y: 30 + (index % 40), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${sub.title} Interface Node`, description: `Primary operational node for ${seed.name}.`, material: sub.mat },
      { id: `hs-d10k2-${index}`, x: 80 - (index % 45), y: 70 - (index % 35), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Load Mounting Point', description: 'Tolerance critical structural node.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${48 + (index % 22) * 2} ${48 + (index % 22) * 2} L ${352 - (index % 22) * 2} ${48 + (index % 22) * 2} L ${352 - (index % 22) * 2} ${312 - (index % 22) * 2} L ${48 + (index % 22) * 2} ${312 - (index % 22) * 2} Z`
      ],
      mechanicalPaths: [
        `M 85 135 L 315 265 M 315 135 L 85 265`,
        `M 200 200 m -${20 + (index % 20)} 0 a ${20 + (index % 20)} ${20 + (index % 20)} 0 1 0 ${40 + (index % 20) * 2} 0 a ${20 + (index % 20)} ${20 + (index % 20)} 0 1 0 -${40 + (index % 20) * 2} 0`
      ],
      electricalPaths: [`M 65 200 L 335 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 275, y2: 75, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 335, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, seed.cat, sub.code, 'Master CAD Blueprint', `${seed.year}`],
    downloadsCount: Math.floor(12000 + (index * 1450) % 98000)
  };
}

