import { BlueprintItem } from '../types';

export const ADDITIONAL_BLUEPRINTS: BlueprintItem[] = [
  // AEROSPACE & AERONAUTICS (Additional 9)
  {
    id: 'bp-concorde-olympus',
    title: 'Concorde Olympus 593 Turbojet Engine',
    patentNumber: 'GB Pat. 1,029,884',
    inventor: 'Rolls-Royce & SNECMA',
    year: 1969,
    category: 'Aerospace & Aeronautics',
    status: 'Historical Patent',
    difficulty: 'Advanced',
    summary: 'The world\'s only commercial afterburning turbojet designed for continuous Mach 2.0 cruise.',
    description: 'The Olympus 593 powered the supersonic airliner Concorde. It featured variable intake ramps, a 2-spool axial compressor, and a secondary nozzle system with thrust reverser buckets.',
    historicalContext: 'Operated commercially from 1976 to 2003, flying transatlantic routes at Mach 2.04 at 60,000 feet.',
    specifications: {
      'Dry Thrust': '32,000 lbf (142 kN)',
      'Afterburning Thrust': '38,050 lbf (169 kN)',
      'Cruise Speed': 'Mach 2.04 (2,179 km/h)',
      'Overall Pressure Ratio': '15.5:1',
      'Turbine Entry Temp': '1,150 °C'
    },
    materials: [
      { partName: 'HP Compressor Blades', material: 'Nimonic 108 Nickel Superalloy', quantity: '180 blades', notes: 'Forged for high heat resistance' },
      { partName: 'Variable Intake Ramps', material: 'RR58 Aluminum-Copper Alloy', quantity: '2 ramps per engine', notes: 'Controls supersonic shock wave positioning' },
      { partName: 'Primary Nozzle Flaps', material: 'Inconel 625', quantity: '12 flaps', notes: 'Optimizes expansion ratio across flight envelope' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Compressor Spool Alignment', instruction: 'Balance LP and HP concentric shafts with precision roller bearings.' },
      { stepNumber: 2, title: 'Variable Ramp Integration', instruction: 'Fit hydraulic actuator linkages to upper and lower nacelle intake ramps.' },
      { stepNumber: 3, title: 'Afterburner Fuel Ring Installation', instruction: 'Mount annular spray ring and electric spark igniter plugs.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 25, y: 50, partNumber: 'OLY-RAMP-01', title: 'Variable Intake Ramp', description: 'Adjusts geometry to decelerate Mach 2 air to subsonic speeds before reaching engine compressor.', material: 'RR58 Alloy' },
      { id: 'hs-2', x: 55, y: 50, partNumber: 'OLY-HP-COMP', title: '7-Stage HP Compressor', description: 'Compresses intake air to 15.5 times atmospheric pressure.', material: 'Nimonic 108' },
      { id: 'hs-3', x: 85, y: 50, partNumber: 'OLY-NOZZ-REVER', title: 'Secondary Thrust Reverser Flaps', description: 'Pneumatically deployed buckets redirect jet exhaust forward upon touchdown.', material: 'Inconel 625' }
    ],
    svgLayers: {
      framePaths: ['M 40 200 L 100 150 L 360 150 L 380 200 L 360 250 L 100 250 Z'],
      mechanicalPaths: ['M 120 160 L 120 240 M 180 160 L 180 240 M 240 160 L 240 240', 'M 280 150 L 320 120 M 280 250 L 320 280'],
      electricalPaths: ['M 60 200 L 370 200'],
      annotationLines: [{ x1: 60, y1: 150, x2: 60, y2: 100, label: 'Variable Intake Ramps' }],
      dimensionTexts: [{ x: 200, y: 280, text: 'LENGTH: 5.47 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    tags: ['Concorde', 'Rolls-Royce', 'Supersonic', 'Turbojet', 'Aeronautics'],
    downloadsCount: 19400
  },
  {
    id: 'bp-spacex-raptor2',
    title: 'SpaceX Raptor 2 Full-Flow Staged Combustion Engine',
    patentNumber: 'US Pat. 11,204,010',
    inventor: 'SpaceX Propulsion Team',
    year: 2021,
    category: 'Aerospace & Aeronautics',
    status: 'Active Standard',
    difficulty: 'Advanced',
    summary: 'Methane/LOX full-flow staged combustion engine operating at record 300+ bar chamber pressure.',
    description: 'The Raptor 2 powers the SpaceX Starship rocket system. It utilizes full-flow staged combustion where all propellant passes through separate fuel-rich and oxygen-rich preburners before entering the main combustion chamber.',
    historicalContext: 'Achieved the highest chamber pressure of any liquid rocket engine in human history (300+ bar / 4,350 psi).',
    specifications: {
      'Sea Level Thrust': '230 tf (2.26 MN / 510,000 lbf)',
      'Chamber Pressure': '300 bar (4,350 psi / 30 MPa)',
      'Propellants': 'Liquid Methane (CH4) & Liquid Oxygen (LOX)',
      'Specific Impulse': '327 seconds (Sea Level)',
      'Engine Mass': '1,600 kg'
    },
    materials: [
      { partName: 'Combustion Chamber & Nozzle', material: 'SX500 High-Pressure Copper Alloy', quantity: '1 unit', notes: 'Printed via additive manufacturing' },
      { partName: 'Oxygen Preburner Housing', material: 'OX500 Superalloy', quantity: '1 unit', notes: 'Resists 300 bar hot oxygen environment' },
      { partName: 'Turbopump Impellers', material: 'Single-Crystal Nickel Alloy', quantity: '2 impellers', notes: 'Operates at 80,000 RPM' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Additive Chamber Printing', instruction: '3D print copper SX500 chamber jacket with internal cooling micro-channels.' },
      { stepNumber: 2, title: 'Dual Turbopump Integration', instruction: 'Mount oxygen and methane turbopumps directly onto preburner manifolds.' },
      { stepNumber: 3, title: 'Electric Thrust Vectoring Linkage', instruction: 'Attach high-torque electromechanical actuators for 15-degree gimbal steering.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'RAP2-INJ-01', title: 'Full-Flow Gas Injector', description: 'Injects gaseous methane and gaseous oxygen at 300 bar directly into main chamber.', material: 'SX500 Alloy' },
      { id: 'hs-2', x: 30, y: 25, partNumber: 'RAP2-OX-PRE', title: 'Oxygen-Rich Preburner', description: 'Drives oxygen turbopump with 100% gaseous LOX exhaust stream.', material: 'OX500 Alloy' },
      { id: 'hs-3', x: 70, y: 25, partNumber: 'RAP2-CH4-PRE', title: 'Fuel-Rich Methane Preburner', description: 'Drives methane turbopump without risk of turbine soot deposition.', material: 'SX500 Alloy' }
    ],
    svgLayers: {
      framePaths: ['M 160 80 L 240 80 L 250 180 L 320 380 L 80 380 L 150 180 Z'],
      mechanicalPaths: ['M 100 100 L 160 140 M 300 100 L 240 140', 'M 180 200 L 220 200 M 160 280 L 240 280'],
      electricalPaths: ['M 120 120 L 120 340 M 280 120 L 280 340'],
      annotationLines: [{ x1: 80, y1: 380, x2: 40, y2: 380, label: '300 Bar Exit Nozzle' }],
      dimensionTexts: [{ x: 200, y: 50, text: 'HEIGHT: 3.1 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    tags: ['SpaceX', 'Starship', 'Raptor', 'Rocket Engine', 'Methane'],
    downloadsCount: 31200
  },
  {
    id: 'bp-spitfire-merlin',
    title: 'Rolls-Royce Spitfire Merlin V-12 Aero Engine',
    patentNumber: 'GB Pat. 425,189',
    inventor: 'Sir Henry Royce & Rolls-Royce Design Team',
    year: 1936,
    category: 'Aerospace & Aeronautics',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'The iconic 27-liter liquid-cooled V-12 piston engine that powered the Supermarine Spitfire and P-51 Mustang.',
    description: 'The Merlin was a 60-degree V-12 liquid-cooled piston engine equipped with a single-stage, two-speed centrifugal supercharger, delivering over 1,500 horsepower at high altitudes.',
    historicalContext: 'Crucial to victory in the Battle of Britain (1940) and produced under license in the US as the Packard V-1650.',
    specifications: {
      'Displacement': '27.0 Liters (1,649 cu in)',
      'Power Output': '1,580 hp @ 3,000 RPM (Merlin 61)',
      'Bore & Stroke': '5.4 in x 6.0 in (137 mm x 152 mm)',
      'Dry Weight': '1,640 lbs (744 kg)',
      'Coolant': '70% Water / 30% Ethylene Glycol mixture'
    },
    materials: [
      { partName: 'Cylinder Block & Crankcase', material: 'RR50 Aluminum Cast Alloy', quantity: '2 cylinder banks', notes: 'Lightweight high-strength aviation casting' },
      { partName: 'Crankshaft', material: 'Nitrided Chrome-Molybdenum Steel', quantity: '1 unit (6 throw)', notes: 'Precision counter-balanced' },
      { partName: 'Valves & Guides', material: 'Sodium-Cooled Silchrome Steel Valves', quantity: '48 valves', notes: 'Exhaust valves sodium filled for cooling' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Crankshaft Journal Bedding', instruction: 'Fit nitrided steel crankshaft into lead-bronze main bearings inside aluminum crankcase.' },
      { stepNumber: 2, title: 'Twin Cylinder Bank Torquing', instruction: 'Bolt 60-degree V-12 cylinder block banks with wet steel cylinder liners.' },
      { stepNumber: 3, title: 'Two-Speed Supercharger Rigging', instruction: 'Align twin-impeller gear drive to boost intake pressure up to +18 psi manifold boost.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'MER-SUPER-02', title: 'Two-Speed Two-Stage Supercharger', description: 'Compresses rarefied air at 30,000 feet to maintain sea-level horsepower.', material: 'RR50 Aluminum' },
      { id: 'hs-2', x: 40, y: 60, partNumber: 'MER-VALVE-48', title: 'Sodium-Cooled Exhaust Valves', description: 'Hollow valve stems filled with liquid sodium dissipate intense combustion heat.', material: 'Silchrome Steel' },
      { id: 'hs-3', x: 75, y: 55, partNumber: 'MER-GEAR-PROP', title: 'Propeller Reduction Gearbox', description: 'Reduces 3,000 RPM crankshaft speed down to 0.477:1 ratio for 4-blade propeller.', material: 'Forged Steel' }
    ],
    svgLayers: {
      framePaths: ['M 60 180 L 340 180 L 320 260 L 80 260 Z', 'M 100 120 L 300 120 L 320 180 L 80 180 Z'],
      mechanicalPaths: ['M 120 140 L 120 240 M 180 140 L 180 240 M 240 140 L 240 240 M 300 140 L 300 240'],
      electricalPaths: ['M 80 150 L 320 150'],
      annotationLines: [{ x1: 300, y1: 120, x2: 350, y2: 80, label: 'Supercharger Intake' }],
      dimensionTexts: [{ x: 200, y: 290, text: 'DISPLACEMENT: 27.04 LITERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    tags: ['Rolls-Royce', 'Spitfire', 'Merlin', 'WW2 Engine', 'V12'],
    downloadsCount: 16800
  },
  {
    id: 'bp-ingenuity-helicopter',
    title: 'Ingenuity Mars Helicopter Dual Counter-Rotating Rotor System',
    patentNumber: 'US Pat. 10,988,248',
    inventor: 'NASA Jet Propulsion Laboratory (JPL)',
    year: 2021,
    category: 'Aerospace & Aeronautics',
    status: 'Active Standard',
    difficulty: 'Advanced',
    summary: 'Autonomous 1.8 kg coaxial rotorcraft operating in thin 1% Martian atmospheric density.',
    description: 'Ingenuity achieved the first powered controlled flight on another planet. It used counter-rotating carbon-fiber blades spinning at 2,400 RPM with swashplate collective and cyclic pitch controls.',
    historicalContext: 'Completed 72 successful flights on Mars between 2021 and 2024, far exceeding its original 5-flight technology demonstration goal.',
    specifications: {
      'Rotor Diameter': '1.2 meters (3.9 feet)',
      'Rotational Speed': '2,400 to 2,700 RPM',
      'Total Mass': '1.8 kg (4.0 lbs earth weight / 0.68 kg Mars)',
      'Solar Panel Output': '35 Watts (charges 6 Li-ion cells)',
      'Flight Altitude Range': '3 to 24 meters'
    },
    materials: [
      { partName: 'Rotor Blades', material: 'Specially Foam-Cored Carbon Fiber', quantity: '4 blades (2 pairs)', notes: 'Ultra-stiff to prevent flutter in thin atmosphere' },
      { partName: 'Fuselage Box', material: 'Composite Carbon Sheet Structure', quantity: '1 enclosure', notes: 'Houses batteries, sensors, and survival heaters' },
      { partName: 'Swashplate Servos', material: 'Titanium Servo Gear Motors', quantity: '6 servos', notes: 'Provides collective and cyclic blade deflection' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Coaxial Shaft Assembly', instruction: 'Fit hollow carbon drive shafts with internal brushless DC motors.' },
      { stepNumber: 2, title: 'Carbon Blade Balancing', instruction: 'Precision balance carbon blade sets to within 0.01 grams.' },
      { stepNumber: 3, title: 'Top Solar Array Mounting', instruction: 'Attach 35W solar cell panel above upper rotor hub with power slip rings.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 25, partNumber: 'ING-SOLAR-35W', title: 'Top Solar Charging Panel', description: 'Recharges internal 220 Wh lithium-ion batteries during Martian days.', material: 'Silicon Photovoltaic' },
      { id: 'hs-2', x: 50, y: 45, partNumber: 'ING-ROTOR-2400', title: 'Counter-Rotating Carbon Hub', description: 'Upper and lower rotors counter-rotate at 2,400 RPM to eliminate torque without tail rotor.', material: 'Carbon Fiber' },
      { id: 'hs-3', x: 50, y: 75, partNumber: 'ING-FUSE-BOX', title: 'Thermally Insulated Electronics Box', description: 'Holds Snapdragon processor, laser altimeter, and night survival heaters.', material: 'Carbon Composite' }
    ],
    svgLayers: {
      framePaths: ['M 200 60 L 200 320', 'M 60 120 L 340 120 M 60 200 L 340 200', 'M 160 320 L 240 320 L 260 380 L 140 380 Z'],
      mechanicalPaths: ['M 180 120 L 180 200 M 220 120 L 220 200', 'M 120 380 L 80 440 M 280 380 L 320 440'],
      electricalPaths: ['M 200 60 L 160 40 L 240 40 Z'],
      annotationLines: [{ x1: 60, y1: 120, x2: 20, y2: 120, label: 'Upper Rotor (1.2m)' }],
      dimensionTexts: [{ x: 200, y: 460, text: 'ROTOR SPAN: 1.2 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    tags: ['NASA', 'Mars', 'Ingenuity', 'Helicopter', 'Drone'],
    downloadsCount: 22100
  },

  // MECHANICAL & ENGINES (Additional 9)
  {
    id: 'bp-wankel-rotary',
    title: 'Wankel Rotary Internal Combustion Engine',
    patentNumber: 'US Pat. 2,988,008',
    inventor: 'Felix Wankel & NSU',
    year: 1961,
    category: 'Mechanical & Engines',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'Non-reciprocating rotary combustion engine using a triangular Reuleaux rotor inside an epitrochoid housing.',
    description: 'The Wankel rotary engine converts pressure directly into rotational motion using a three-sided triangular rotor revolving around an eccentric shaft. Intake, compression, combustion, and exhaust take place continuously in 3 separate chamber sectors.',
    historicalContext: 'Popularized by Mazda in the RX-7 and RX-8 sports cars due to high power-to-weight ratio and high RPM capability.',
    specifications: {
      'Displacement': '1.3 Liters (Twin Rotor 13B)',
      'Power Output': '232 hp @ 8,500 RPM',
      'Eccentricity Offset': '15 mm',
      'Rotor Apex Seal Velocity': '30 m/s',
      'Compression Ratio': '10.0:1'
    },
    materials: [
      { partName: 'Rotor Housing', material: 'Aluminum Casting with Chrome-Plated Surface', quantity: '2 housings', notes: 'Resists apex seal sliding wear' },
      { partName: 'Triangular Rotor', material: 'Nodular Cast Iron', quantity: '2 rotors', notes: 'Features internal gear ring' },
      { partName: 'Apex Seals', material: 'Electron-Beam Welded Silicon Nitride Ceramic', quantity: '6 apex seals', notes: 'Maintains compression seal across housing corners' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Eccentric Shaft Mounting', instruction: 'Insert hardened steel eccentric shaft into main stationary needle bearings.' },
      { stepNumber: 2, title: 'Triangular Rotor Placement', instruction: 'Mesh internal rotor gear ring with stationary gear timing teeth at 3:1 ratio.' },
      { stepNumber: 3, title: 'Ceramic Apex Seal Installation', instruction: 'Fit spring-loaded ceramic seals into 3 apex slots of rotor drum.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 50, partNumber: 'WAN-ROTOR-01', title: 'Triangular Reuleaux Rotor', description: 'Rotates eccentrically, creating 3 expanding and contracting thermodynamic chambers per revolution.', material: 'Nodular Iron' },
      { id: 'hs-2', x: 75, y: 35, partNumber: 'WAN-APEX-SEAL', title: 'Ceramic Apex Seals', description: 'Spring-loaded seals keeping high-pressure combustion gas contained between chambers.', material: 'Silicon Nitride' },
      { id: 'hs-3', x: 30, y: 50, partNumber: 'WAN-EPIT-HOUS', title: 'Epitrochoid Oval Chamber', description: 'Figure-8 shaped housing contour allowing continuous 4-stroke cycle.', material: 'Chrome-Coated Aluminum' }
    ],
    svgLayers: {
      framePaths: ['M 200 100 C 320 100 320 300 200 300 C 80 300 80 100 200 100 Z'],
      mechanicalPaths: ['M 200 200 L 200 130 L 260 230 L 140 230 Z', 'M 200 200 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0'],
      electricalPaths: ['M 280 170 L 310 170 M 280 230 L 310 230'],
      annotationLines: [{ x1: 310, y1: 170, x2: 360, y2: 170, label: 'Dual Spark Plugs' }],
      dimensionTexts: [{ x: 200, y: 330, text: 'ROTOR ROTATION: 3:1 SHAFT RATIO' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Wankel', 'Mazda', 'Rotary Engine', 'Combustion', 'Mechanical'],
    downloadsCount: 14900
  },
  {
    id: 'bp-stirling-engine',
    title: 'Stirling Engine Closed-Cycle Air Engine',
    patentNumber: 'US Pat. 4,085',
    inventor: 'Robert Stirling',
    year: 1816,
    category: 'Mechanical & Engines',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'External combustion heat engine operating by cyclic compression and expansion of air or helium at different temperatures.',
    description: 'The Stirling engine is a closed-cycle regenerative heat engine. Heat supplied externally to the hot cylinder expands gas to drive a power piston, while a displacer moves gas between hot and cold heat exchangers.',
    historicalContext: 'Invented in 1816 as a safer alternative to steam engines, today used in quiet submarine power plants and solar generators.',
    specifications: {
      'Operating Gas': 'Helium / Hydrogen (or Air)',
      'Thermal Efficiency': 'Up to 40% (Carnot limit approach)',
      'Hot End Temp': '650 °C (1,200 °F)',
      'Cold End Temp': '25 °C',
      'Power Output': '10 kW (Alpha Configuration)'
    },
    materials: [
      { partName: 'Hot Cylinder Cap', material: '316L Stainless Steel / Inconel', quantity: '1 cylinder', notes: 'Withstands continuous external burner flame' },
      { partName: 'Regenerator Mesh Matrix', material: 'Fine Stainless Steel Wire Mesh Stack', quantity: '100 mesh layers', notes: 'Stores thermal energy between gas cycles' },
      { partName: 'Displacer Piston', material: 'Hollow Thin-Walled Stainless Steel', quantity: '1 displacer', notes: 'Low thermal mass to avoid heat loss' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Heat Exchanger & Regenerator Stacking', instruction: 'Pack fine stainless wire mesh matrix inside central regenerator tube.' },
      { stepNumber: 2, title: 'Displacer & Power Linkage Alignment', instruction: 'Connect 90-degree offset crank mechanism to power piston and displacer rod.' },
      { stepNumber: 3, title: 'Helium Charge Sealing', instruction: 'Pressure seal crankcase to 10 bar with helium working gas.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 30, y: 35, partNumber: 'STI-HOT-CYL', title: 'Hot Expansion Cylinder', description: 'Absorbs thermal energy from external heat source, expanding working gas.', material: 'Inconel 600' },
      { id: 'hs-2', x: 50, y: 50, partNumber: 'STI-REGEN-MESH', title: 'Thermal Regenerator Matrix', description: 'Acts as thermal sponge, trapping heat when gas flows to cold end and returning it when gas moves to hot end.', material: 'Stainless Mesh' },
      { id: 'hs-3', x: 70, y: 65, partNumber: 'STI-POWER-PIST', title: 'Power Piston & Crank', description: 'Extracts mechanical work from gas expansion, rotating drive flywheel.', material: 'Aluminum / Bronze' }
    ],
    svgLayers: {
      framePaths: ['M 100 150 L 300 150 L 300 250 L 100 250 Z', 'M 100 100 L 180 100 L 180 150 L 100 150 Z'],
      mechanicalPaths: ['M 140 110 L 140 220 L 240 220', 'M 240 220 m -25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0'],
      electricalPaths: [],
      annotationLines: [{ x1: 100, y1: 80, x2: 60, y2: 40, label: 'External Heat Input (650°C)' }],
      dimensionTexts: [{ x: 200, y: 280, text: 'PHASE SHIFT: 90 DEGREES' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Stirling Engine', 'Heat Engine', 'Thermodynamics', 'Mechanical', 'Clean Power'],
    downloadsCount: 11200
  },
  {
    id: 'bp-pelton-wheel',
    title: 'Pelton Wheel High-Head Impulse Water Turbine',
    patentNumber: 'US Pat. 233,692',
    inventor: 'Lester Allan Pelton',
    year: 1880,
    category: 'Mechanical & Engines',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'Impulse water turbine extracting energy from high-pressure water jets hitting double-hemispherical buckets.',
    description: 'The Pelton wheel extracts hydraulic energy from a high-velocity jet of water hitting curved double-bucket cups. The water jet splits in half and turns nearly 180 degrees, transferring over 90% of its kinetic energy to the runner wheel.',
    historicalContext: 'Invented during the California Gold Rush to power high-head hydroelectric generators in mountain regions.',
    specifications: {
      'Efficiency': '92% Peak Efficiency',
      'Water Head Range': '150 to 1,800 meters (500 to 6,000 ft)',
      'Jet Velocity': 'Up to 150 m/s',
      'Bucket Geometry': 'Double-concave splitter bucket design',
      'Rotational Speed': '300 to 1,500 RPM'
    },
    materials: [
      { partName: 'Runner Wheel & Buckets', material: '13-4 Stainless Steel Forging (13% Cr, 4% Ni)', quantity: '1 runner (24 buckets)', notes: 'Resists cavitation erosion' },
      { partName: 'Spear Needle Valve', material: 'Stellite Hard-Faced Alloy', quantity: '1 to 6 nozzles', notes: 'Controls water jet diameter' },
      { partName: 'Turbine Casing', material: 'Fabricated Structural Steel Plate', quantity: '1 housing', notes: 'Directs spent water into tailrace' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Bucket Attachment & Balancing', instruction: 'Bolt 13-4 stainless bucket pairs around forged steel rotor disk and dynamic balance to ISO 1940.' },
      { stepNumber: 2, title: 'Needle Nozzle Alignment', instruction: 'Align hydraulic spear needle nozzle precisely along bucket pitch circle tangent.' },
      { stepNumber: 3, title: 'Deflector Mechanism Rigging', instruction: 'Connect emergency jet deflector mechanism to drop water jet in 0.2 seconds during electrical load trip.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 50, partNumber: 'PEL-BUCK-24', title: 'Double-Bucket Splitter Cup', description: 'Splits high-speed jet into two equal streams, reversing water direction by 165 degrees to extract kinetic momentum.', material: '13-4 Stainless Steel' },
      { id: 'hs-2', x: 20, y: 50, partNumber: 'PEL-NOZZ-SPEAR', title: 'Hydraulic Spear Needle Nozzle', description: 'Adjusts orifice aperture to vary water flow rate without reducing jet velocity.', material: 'Stellite Alloy' },
      { id: 'hs-3', x: 25, y: 35, partNumber: 'PEL-DEFLECT', title: 'Emergency Jet Deflector', description: 'Pivots into jet path to prevent turbine overspeed if grid disconnects.', material: 'Forged Steel' }
    ],
    svgLayers: {
      framePaths: ['M 200 200 m -120 0 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0'],
      mechanicalPaths: ['M 50 200 L 150 200', 'M 200 80 L 200 120 M 200 280 L 200 320 M 80 200 L 120 200 M 280 200 L 320 200'],
      electricalPaths: [],
      annotationLines: [{ x1: 50, y1: 200, x2: 20, y2: 150, label: 'High-Pressure Water Jet' }],
      dimensionTexts: [{ x: 200, y: 350, text: 'EFFICIENCY: 92% IMPULSE CONVERSION' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Pelton', 'Hydroelectric', 'Water Turbine', 'Impulse Engine', 'Renewable'],
    downloadsCount: 12800
  },

  // COMPUTING & CYBERNETICS (Additional 9)
  {
    id: 'bp-cray1-supercomputer',
    title: 'Cray-1 Supercomputer Fluorinert Liquid Cooling Column',
    patentNumber: 'US Pat. 4,118,757',
    inventor: 'Seymour Cray & Cray Research',
    year: 1976,
    category: 'Computing & Cybernetics',
    status: 'Historical Patent',
    difficulty: 'Advanced',
    summary: 'The world\'s fastest supercomputer from 1976 to 1982, featuring C-shaped tower architecture and direct Freon cooling.',
    description: 'The Cray-1 was an iconic vector supercomputer capable of 160 megaflops. Its C-shaped layout kept wire lengths under 4 feet to achieve a 12.5 nanosecond clock cycle, while vertical copper cold plates with Freon refrigerant removed 115 kW of heat.',
    historicalContext: 'Installed at Los Alamos National Laboratory in 1976 for $8.8 million, revolutionizing weather forecasting and nuclear modeling.',
    specifications: {
      'Clock Speed': '80 MHz (12.5 nanosecond cycle time)',
      'Peak Performance': '160 MFLOPS',
      'Main Memory': '1 Million 64-bit words (8 Megabytes ECL RAM)',
      'Power Consumption': '115 kW (138 kVA)',
      'Total Weight': '5.5 tons (5,000 kg)'
    },
    materials: [
      { partName: 'Cold Plate Cooling Bars', material: 'Cast Copper Heat Exchanger Bars', quantity: '12 vertical chassis wedges', notes: 'Carries liquid Freon / Fluorinert' },
      { partName: 'Logic Board Assemblies', material: 'Dual 5-Layer Printed Circuit Boards', quantity: '1,662 IC modules', notes: 'ECL 10,000 series logic chips' },
      { partName: 'Interconnect Wiring', material: 'Teflon-Insulated Twisted-Pair Copper Wire', quantity: '67 miles of wire', notes: 'Maximum wire length 3.0 feet' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'C-Shape Chassis Structural Frame', instruction: 'Bolt 12 vertical aluminum bays into 270-degree C-shaped ring layout.' },
      { stepNumber: 2, title: 'Freon Cold Plate Installation', instruction: 'Sandwich copper cooling bars between logic board modules.' },
      { stepNumber: 3, title: 'Manual Wire Harnessing', instruction: 'Hand-wire 67 miles of backplane twisted pairs to equalize signal propagation delay.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'CRAY-TOWER-C', title: '270-Degree C-Shape Layout', description: 'Circular tower geometry minimizes signal path lengths between central CPU and vector registers.', material: 'Aluminum / Copper' },
      { id: 'hs-2', x: 50, y: 65, partNumber: 'CRAY-FREON-COLD', title: 'Copper Cold Plate Cooling System', description: 'Circulates liquid refrigerant directly through copper wedges, absorbing 115 kW heat.', material: 'Copper / Freon' },
      { id: 'hs-3', x: 50, y: 85, partNumber: 'CRAY-BENCH-SEAT', title: 'Padded Vinyl Power Bench', description: 'Houses power supply transformers and motor-generators under vinyl seating bench.', material: 'Steel / Vinyl' }
    ],
    svgLayers: {
      framePaths: ['M 120 120 C 120 60 280 60 280 120 L 280 280 C 280 340 120 340 120 280 L 150 260 C 150 300 250 300 250 260 L 250 140 C 250 100 150 100 150 140 Z'],
      mechanicalPaths: ['M 120 120 L 150 140 M 280 120 L 250 140 M 280 280 L 250 260 M 120 280 L 150 260'],
      electricalPaths: ['M 80 340 L 320 340 L 340 380 L 60 380 Z'],
      annotationLines: [{ x1: 280, y1: 120, x2: 330, y2: 90, label: '12 Vertical Logic Modules' }],
      dimensionTexts: [{ x: 200, y: 400, text: 'CLOCK CYCLE: 12.5 NANOSECONDS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Cray-1', 'Supercomputer', 'Seymour Cray', 'ECL Logic', 'Computing History'],
    downloadsCount: 18700
  },
  {
    id: 'bp-intel-4004',
    title: 'Intel 4004 4-bit Single-Chip Microprocessor Transistors',
    patentNumber: 'US Pat. 3,821,715',
    inventor: 'Federico Faggin, Ted Hoff, & Stanley Mazor',
    year: 1971,
    category: 'Computing & Cybernetics',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'The world\'s first commercially available single-chip microprocessor, containing 2,300 transistors.',
    description: 'The Intel 4004 was a 4-bit CPU fabricated using 10-micrometer PMOS silicon-gate technology on a single 12 mm² die. It executed 92,600 instructions per second, launching the microprocessor revolution.',
    historicalContext: 'Originally designed for Busicom 141-PF electronic calculators in 1971 before being commercialized broadly.',
    specifications: {
      'Clock Speed': '740 kHz',
      'Transistor Count': '2,300 PMOS Transistors',
      'Process Node': '10 µm (10,000 nm)',
      'Die Size': '3 mm x 4 mm (12 mm²)',
      'Package': '16-pin Dual In-line Package (DIP)'
    },
    materials: [
      { partName: 'Semiconductor Die', material: 'Monocrystalline Silicon Substrate', quantity: '1 die', notes: 'P-type silicon with boron diffusion' },
      { partName: 'Gate Electrode Layer', material: 'Polycrystalline Silicon (Poly-Si)', quantity: '1 gate layer', notes: 'Self-aligned silicon gate technology' },
      { partName: 'Package Leadframe', material: 'Gold-Plated Kovar Metal Frame', quantity: '16 pins', notes: 'Hermetically sealed ceramic DIP' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Photolithographic Gate Patterning', instruction: 'Etch 10-micron polysilicon gate lines on silicon dioxide insulating layer.' },
      { stepNumber: 2, title: 'Boron P-Channel Dopant Diffusion', instruction: 'Diffuse boron atoms to create source and drain regions in silicon die.' },
      { stepNumber: 3, title: 'Gold Wire Bond Packaging', instruction: 'Ultrasonically bond 25-micron gold wires between die pads and 16-pin ceramic leadframe.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 50, partNumber: 'I4004-DIE-2300', title: '2,300 PMOS Silicon Gate Die', description: 'Houses 4-bit ALU, 16 4-bit registers, and instruction decoder on 12 mm² silicon.', material: 'Silicon / Poly-Si' },
      { id: 'hs-2', x: 20, y: 50, partNumber: 'I4004-PIN-16', title: '16-Pin DIP Ceramic Leadframe', description: 'Multiplexed 4-bit bus pins delivering address, data, and control lines.', material: 'Kovar / Gold' },
      { id: 'hs-3', x: 50, y: 30, partNumber: 'I4004-ALU-4BIT', title: '4-Bit Arithmetic Logic Unit', description: 'Performs binary addition, subtraction, and decimal adjust operations.', material: 'P-MOSFETs' }
    ],
    svgLayers: {
      framePaths: ['M 140 100 L 260 100 L 260 300 L 140 300 Z'],
      mechanicalPaths: ['M 140 130 L 80 130 M 140 170 L 80 170 M 140 210 L 80 210 M 140 250 L 80 250', 'M 260 130 L 320 130 M 260 170 L 320 170 M 260 210 L 320 210 M 260 250 L 320 250'],
      electricalPaths: ['M 170 140 L 230 140 L 230 260 L 170 260 Z'],
      annotationLines: [{ x1: 200, y1: 200, x2: 200, y2: 350, label: 'Silicon Die (12 mm²)' }],
      dimensionTexts: [{ x: 200, y: 370, text: 'TRANSISTORS: 2,300 PMOS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['Intel', '4004', 'Microprocessor', 'Silicon', 'CPU History'],
    downloadsCount: 20500
  },

  // ROBOTICS & AUTOMATION (Additional 9)
  {
    id: 'bp-canadarm2',
    title: 'Canadarm2 Space Station Orbital Manipulator Joint',
    patentNumber: 'CA Pat. 2,298,140',
    inventor: 'Canadian Space Agency (CSA) & MDA',
    year: 2001,
    category: 'Robotics & Automation',
    status: 'Active Standard',
    difficulty: 'Advanced',
    summary: '17-meter robotic arm featuring 7 degrees of freedom used for ISS assembly and satellite capture.',
    description: 'Canadarm2 (Space Station Remote Manipulator System) is a 17-meter-long titanium robotic arm on the International Space Station. It has 7 motorized rotary joints and symmetric Latching End Effectors (LEE) at both ends, allowing it to "inchworm" across ISS anchor fixtures.',
    historicalContext: 'Installed during Shuttle mission STS-100 in 2001, crucial for constructing the ISS and grappling Dragon/Cygnus cargo craft.',
    specifications: {
      'Arm Length': '17.6 meters (57.7 feet)',
      'Payload Capacity': '116,000 kg (255,000 lbs)',
      'Degrees of Freedom': '7 Revolute Rotary Joints',
      'Maximum Speed': '37 cm / second (unloaded)',
      'Total System Mass': '1,497 kg'
    },
    materials: [
      { partName: 'Arm Boom Tubes', material: 'High-Modulus Carbon Fiber Composite', quantity: '2 main booms', notes: 'Thermally stable in +120°C to -160°C sun/shade' },
      { partName: 'Rotary Joint Gears', material: 'Titanium-Alloy Harmonic Drive Gears', quantity: '7 joint modules', notes: 'Zero-backlash strain wave gearing' },
      { partName: 'Latching End Effector Snare Wires', material: 'Nitinol Shape-Memory Alloy Wires', quantity: '3 snare cables per end', notes: 'Captures fixture pins securely' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Harmonic Joint Motor Integration', instruction: 'Assemble brushless DC servo motors with dual optical shaft encoders inside joint housing.' },
      { stepNumber: 2, title: 'Carbon Boom Tube Bonding', instruction: 'Autoclave bond carbon composite boom tubes to titanium joint cuffs.' },
      { stepNumber: 3, title: 'Snare Cable Rigging', instruction: 'Thread Nitinol wire snares through rotating end effector drum.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 20, y: 50, partNumber: 'CAN-LEE-01', title: 'Latching End Effector (LEE)', description: 'Snares grappling fixtures on visiting spacecraft and provides power/data passthrough.', material: 'Titanium / Nitinol' },
      { id: 'hs-2', x: 50, y: 50, partNumber: 'CAN-BOOM-17M', title: 'Carbon Fiber Thermally Stable Boom', description: 'Hollow composite tube maintaining precise dimensional stability despite extreme space thermal shifts.', material: 'Carbon Composite' },
      { id: 'hs-3', x: 80, y: 50, partNumber: 'CAN-JOINT-7DOF', title: '7-DOF Harmonic Gear Joint', description: 'Zero-backlash motorized joint allowing pitch, roll, and yaw rotation.', material: 'Titanium Harmonic Drive' }
    ],
    svgLayers: {
      framePaths: ['M 50 200 L 120 200 L 280 200 L 350 200'],
      mechanicalPaths: ['M 50 200 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0', 'M 200 200 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0', 'M 350 200 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0'],
      electricalPaths: ['M 50 200 L 350 200'],
      annotationLines: [{ x1: 50, y1: 200, x2: 50, y2: 120, label: 'Latching End Effector (LEE)' }],
      dimensionTexts: [{ x: 200, y: 250, text: 'TOTAL SPAN: 17.6 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    tags: ['Canadarm2', 'ISS', 'Space Robotics', 'CSA', 'Manipulator'],
    downloadsCount: 15400
  },
  {
    id: 'bp-spot-robot-joint',
    title: 'Spot Quadruped Robot Harmonic Drive Hip Joint',
    patentNumber: 'US Pat. 10,486,310',
    inventor: 'Boston Dynamics Engineering Team',
    year: 2020,
    category: 'Robotics & Automation',
    status: 'Active Standard',
    difficulty: 'Intermediate',
    summary: 'High-torque density electromechanical actuator joint enabling agile quadruped locomotion.',
    description: 'Boston Dynamics\' Spot quadruped uses 12 custom high-torque brushless motor joint modules coupled with harmonic speed reducers. The hip joints deliver rapid dynamic torque response for stair climbing and terrain balancing.',
    historicalContext: 'Commercialized in 2020 for industrial inspection, hazardous environment mapping, and construction surveying.',
    specifications: {
      'Peak Joint Torque': '120 Nm',
      'Operating Voltage': '48 V DC Battery System',
      'Joint Speed': '18 rad / second',
      'Position Sensing': '16-bit Absolute Optical Encoder',
      'Mass': '32 kg total robot mass (1.4 kg per joint module)'
    },
    materials: [
      { partName: 'Joint Housing', material: '7075-T6 Aircraft Aluminum CNC Billet', quantity: '12 housings', notes: 'Integrated heat dissipation fins' },
      { partName: 'Harmonic Flexspline', material: 'Custom Alloy Spring Steel', quantity: '12 flexsplines', notes: 'Zero-backlash speed reduction' },
      { partName: 'Motor Stator & Rotor', material: 'Neodymium N52 Magnet Rotor', quantity: '12 motors', notes: 'High-torque brushless DC motor' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Stator & N52 Rotor Assembly', instruction: 'Press N52 neodymium magnet rotor into 12-slot stator frame.' },
      { stepNumber: 2, title: 'Harmonic Gear Spline Insertion', instruction: 'Fit flexspline ring into circular wave generator bearing.' },
      { stepNumber: 3, title: 'Encoder Calibration', instruction: 'Calibrate 16-bit absolute optical encoder for sub-degree positioning.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'SPOT-MOTOR-48V', title: 'High-Torque Brushless Motor', description: 'Delivers rapid torque changes for dynamic balance control.', material: 'Neodymium / Copper' },
      { id: 'hs-2', x: 50, y: 65, partNumber: 'SPOT-HARM-100', title: 'Zero-Backlash Harmonic Drive', description: 'Strain-wave gear providing 100:1 speed reduction in a compact inline package.', material: 'Spring Steel' },
      { id: 'hs-3', x: 50, y: 85, partNumber: 'SPOT-ENC-16BIT', title: 'Absolute Optical Encoder', description: 'Reads joint angular position thousands of times per second for real-time stance control.', material: 'Optical Glass' }
    ],
    svgLayers: {
      framePaths: ['M 140 100 L 260 100 L 260 300 L 140 300 Z'],
      mechanicalPaths: ['M 200 150 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0', 'M 200 250 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0'],
      electricalPaths: ['M 100 200 L 300 200'],
      annotationLines: [{ x1: 260, y1: 150, x2: 320, y2: 120, label: '48V BLDC Motor' }],
      dimensionTexts: [{ x: 200, y: 340, text: 'PEAK TORQUE: 120 NM' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    tags: ['Boston Dynamics', 'Spot', 'Quadruped', 'Actuator', 'Robotics'],
    downloadsCount: 28900
  },

  // ENERGY & QUANTUM (Additional 9)
  {
    id: 'bp-fusion-stellarator',
    title: 'Wendelstein 7-X Stellarator Fusion Magnet Cage',
    patentNumber: 'DE Pat. 10,2008,012',
    inventor: 'Max Planck Institute for Plasma Physics',
    year: 2015,
    category: 'Energy & Quantum',
    status: 'Active Standard',
    difficulty: 'Experimental',
    summary: 'The world\'s largest stellarator magnetic confinement fusion device utilizing 50 non-planar superconducting coils.',
    description: 'Unlike Tokamaks which drive plasma current pulsed, the Wendelstein 7-X stellarator creates a steady-state 3D helical magnetic field using 50 non-planar NbTi superconducting coils to confine 100 million °C plasma.',
    historicalContext: 'Achieved continuous 8-minute plasma discharges in 2022, proving steady-state magnetic fusion viability.',
    specifications: {
      'Major Radius': '5.5 meters',
      'Magnetic Field Strength': '3.0 Tesla on Axis',
      'Plasma Temperature': '100 Million °C',
      'Superconducting Coils': '50 Non-Planar + 20 Planar Coils',
      'Cooling Temperature': '4 Kelvin (-269 °C Liquid Helium)'
    },
    materials: [
      { partName: 'Non-Planar Coils', material: 'Niobium-Titanium (NbTi) Cable-in-Conduit', quantity: '50 complex 3D coils', notes: 'Cooled by liquid helium-4' },
      { partName: 'Plasma Vessel Outer Shell', material: '316L Stainless Steel Double-Wall', quantity: '1 modular vessel', notes: 'Deformed twisted toroidal shape' },
      { partName: 'Divertor Target Plates', material: 'Carbon Fiber Reinforced Carbon (CFC) / Tungsten', quantity: '10 target units', notes: 'Handles 10 MW/m² heat flux' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Non-Planar Coil 3D Winding', instruction: 'Precision wind NbTi superconducting cable on 3D contoured steel formers.' },
      { stepNumber: 2, title: 'Toroidal Module Nesting', instruction: 'Nest 10 coil pairs around 5 identical pentagonal plasma vessel sectors.' },
      { stepNumber: 3, title: 'Cryostat Vacuum Enclosure', instruction: 'Enclose magnetic array inside 16-meter outer vacuum cryostat tank.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'W7X-COIL-3D', title: '50 Non-Planar Superconducting Coils', description: 'Twisted 3D magnet geometry creating helical magnetic field without internal plasma current.', material: 'Niobium-Titanium (NbTi)' },
      { id: 'hs-2', x: 50, y: 50, partNumber: 'W7X-PLASMA-100M', title: 'Helical 100 Million °C Plasma Zone', description: 'Confines deuterium plasma at stellar core temperatures.', material: 'Magnetically Confined Plasma' },
      { id: 'hs-3', x: 50, y: 75, partNumber: 'W7X-DIV-TUNG', title: 'Water-Cooled Tungsten Divertor', description: 'Exhausts heat and helium ash from plasma edge.', material: 'Tungsten / Carbon' }
    ],
    svgLayers: {
      framePaths: ['M 200 200 m -140 0 a 140 140 0 1 0 280 0 a 140 140 0 1 0 -280 0', 'M 200 200 m -80 0 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0'],
      mechanicalPaths: ['M 100 120 C 140 80 260 80 300 120 C 340 160 340 240 300 280 C 260 320 140 320 100 280 C 60 240 60 160 100 120 Z'],
      electricalPaths: ['M 200 60 L 200 340'],
      annotationLines: [{ x1: 300, y1: 120, x2: 360, y2: 80, label: 'Non-Planar Superconducting Coil' }],
      dimensionTexts: [{ x: 200, y: 370, text: 'CRYOSTAT DIA: 16 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    tags: ['Stellarator', 'Fusion Energy', 'Wendelstein 7-X', 'Superconductor', 'Plasma'],
    downloadsCount: 17300
  },
  {
    id: 'bp-tesla-magnifying-transmitter',
    title: 'Tesla Magnifying Transmitter & Wireless Energy Tower',
    patentNumber: 'US Pat. 1,119,732',
    inventor: 'Nikola Tesla',
    year: 1914,
    category: 'Energy & Quantum',
    status: 'Historical Patent',
    difficulty: 'Advanced',
    summary: 'High-power resonant transformer for wireless transmission of electrical energy through Earth\'s atmosphere.',
    description: 'Nikola Tesla designed the Wardenclyffe Magnifying Transmitter to transmit electrical power and communications wirelessly. It utilized a tuned resonant primary-secondary transformer feeding a high-voltage extra coil attached to a spherical top terminal.',
    historicalContext: 'Constructed at Wardenclyffe, Long Island in 1901-1904 before funding was cut off.',
    specifications: {
      'Operating Frequency': '20 kHz to 100 kHz (Resonant RF)',
      'Terminal Voltage': 'Estimated 10,000,000 to 100,000,000 Volts',
      'Tower Height': '187 feet (57 meters)',
      'Top Terminal Diameter': '68 feet (21 meter steel dome)',
      'Ground Anchor Depth': '120 feet (37 meters subterranean shaft)'
    },
    materials: [
      { partName: 'Spherical Cupola Terminal', material: 'Steel Hemispherical Mesh Frame', quantity: '1 dome structure', notes: 'Prevents corona discharge arc leakage' },
      { partName: 'Extra Resonant Coil', material: 'Heavy Heavy Copper Wire Winding', quantity: '1 vertical coil', notes: 'Standing wave voltage multiplier' },
      { partName: 'Subterranean Ground Radial Shaft', material: 'Iron Pipes & Copper Sheets', quantity: '12 radial arms', notes: 'Direct earth capacitive coupling' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Subterranean Grounding Shaft Sinking', instruction: 'Sink 120-foot vertical iron pipe shaft into groundwater table.' },
      { stepNumber: 2, title: 'Resonant Primary-Secondary Winding', instruction: 'Wind flat spiral primary coil around base of vertical secondary.' },
      { stepNumber: 3, title: 'Steel Top Terminal Elevation', instruction: 'Elevate 68-foot hemispherical steel dome onto wooden octagonal tower.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 15, partNumber: 'TES-DOME-68FT', title: '68-Foot Steel Spherical Terminal', description: 'Acts as large capacitive reservoir accumulating multi-million volt charge.', material: 'Structural Steel Mesh' },
      { id: 'hs-2', x: 50, y: 50, partNumber: 'TES-COIL-EXTRA', title: 'High-Q Resonant Extra Coil', description: 'Generates electrical standing waves through quarter-wave resonance.', material: 'Heavy Copper Magnet Wire' },
      { id: 'hs-3', x: 50, y: 90, partNumber: 'TES-GROUND-120FT', title: 'Subterranean Ground Coupling Shaft', description: 'Injects electrical oscillations into Earth\'s telluric current layer.', material: 'Iron / Copper' }
    ],
    svgLayers: {
      framePaths: ['M 200 40 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0', 'M 170 80 L 150 300 L 250 300 L 230 80 Z', 'M 100 300 L 300 300 L 300 360 L 100 360 Z'],
      mechanicalPaths: ['M 200 80 L 200 300', 'M 160 120 L 240 120 M 155 180 L 245 180 M 150 240 L 250 240'],
      electricalPaths: ['M 200 300 L 200 380'],
      annotationLines: [{ x1: 240, y1: 40, x2: 320, y2: 40, label: '68-Ft Steel Capacitive Dome' }],
      dimensionTexts: [{ x: 200, y: 390, text: 'TOWER HEIGHT: 57 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    tags: ['Nikola Tesla', 'Wardenclyffe', 'Wireless Energy', 'Resonance', 'Historical'],
    downloadsCount: 32400
  },

  // AUTOMOTIVE & TRANSPORTATION (Additional 9)
  {
    id: 'bp-porsche-911-engine',
    title: 'Porsche 911 Air-Cooled Flat-Six Engine Assembly',
    patentNumber: 'DE Pat. 1,208,135',
    inventor: 'Ferdinand Alexander Porsche & Hans Mezger',
    year: 1963,
    category: 'Automotive & Transportation',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'The iconic dry-sump rear-mounted air-cooled horizontally opposed 6-cylinder engine.',
    description: 'Designed by Hans Mezger, the Porsche air-cooled flat-six used horizontally opposed pistons, an aluminum crankcase, single overhead camshafts per bank, and a large engine-driven axial cooling fan.',
    historicalContext: 'Powered Porsche 911 sports cars from 1963 until the transition to water cooling with the 996 generation in 1998.',
    specifications: {
      'Displacement': '2.0 to 3.6 Liters (2.7L Carrera std)',
      'Power Output': '210 hp @ 6,300 RPM',
      'Layout': 'Boxer 6 (Horizontally Opposed)',
      'Cooling System': 'Air / Oil Cooled via 11-Blade Axial Fan',
      'Lubrication': 'Dry Sump with Remote Oil Tank'
    },
    materials: [
      { partName: 'Crankcase Half Shells', material: 'Pressure Cast Magnesium / Aluminum Alloy', quantity: '2 split halves', notes: 'Lightweight split crankcase' },
      { partName: 'Cylinder Barrels', material: 'Nikasil-Coated Aluminum Alloy (Nikasil)', quantity: '6 individual barrels', notes: 'Nickel-silicon carbide electroplated bore' },
      { partName: 'Axial Cooling Fan', material: 'Cast Magnesium Alloy Fan Wheel', quantity: '1 fan wheel (280 mm)', notes: 'Flows 1,500 liters of air per second' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Crankcase Shell Joining', instruction: 'Join magnesium crankcase halves around 8-bearing forged steel crankshaft.' },
      { stepNumber: 2, title: 'Nikasil Cylinder & Head Stacking', instruction: 'Slide 6 individual Nikasil aluminum cylinder barrels onto studs with hemispherical heads.' },
      { stepNumber: 3, title: 'Fan Belt & Overhead Cam Synchronization', instruction: 'Install double-row chain drives to SOHC camshafts and belt to 280 mm magnesium fan.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 25, partNumber: 'P911-FAN-MAG', title: 'Magnesium Axial Cooling Fan', description: 'Forces 1,500 L/s ambient air across engine cooling fins and oil cooler.', material: 'Magnesium Alloy' },
      { id: 'hs-2', x: 30, y: 55, partNumber: 'P911-NIK-CYL', title: 'Nikasil Aluminum Cylinder Barrels', description: 'Ultra-low friction nickel-silicon carbide plated cylinder walls for direct air cooling.', material: 'Nikasil Plated Aluminum' },
      { id: 'hs-3', x: 50, y: 80, partNumber: 'P911-DRY-SUMP', title: 'Dry-Sump Lubrication Plate', description: 'Prevents oil starvation during high-G cornering by scavenging oil to external tank.', material: 'Cast Aluminum' }
    ],
    svgLayers: {
      framePaths: ['M 60 160 L 140 160 L 140 240 L 60 240 Z', 'M 260 160 L 340 160 L 340 240 L 260 240 Z', 'M 140 180 L 260 180 L 260 220 L 140 220 Z'],
      mechanicalPaths: ['M 140 200 L 260 200', 'M 200 120 m -40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0'],
      electricalPaths: ['M 200 160 L 200 200'],
      annotationLines: [{ x1: 200, y1: 120, x2: 200, y2: 60, label: 'Magnesium Axial Fan' }],
      dimensionTexts: [{ x: 200, y: 270, text: 'CONFIGURATION: HORIZONTALLY OPPOSED FLAT-6' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: ['Porsche', '911', 'Flat-Six', 'Air-Cooled', 'Mezger Engine'],
    downloadsCount: 24600
  },
  {
    id: 'bp-shinkansen-maglev',
    title: 'Shinkansen L0 Series Maglev Levitation Bogie',
    patentNumber: 'JP Pat. 5,892,110',
    inventor: 'JR Central & Railway Technical Research Institute',
    year: 2015,
    category: 'Automotive & Transportation',
    status: 'Active Standard',
    difficulty: 'Advanced',
    summary: 'Superconducting maglev levitation and propulsion bogie achieving 603 km/h world speed record.',
    description: 'The L0 Series Maglev uses Niobium-Titanium (NbTi) superconducting magnets interacting with track sidewall figure-8 levitation coils. Electrodynamic levitation (EDL) lifts the train 10 cm above the guide track at speeds above 150 km/h.',
    historicalContext: 'Set the absolute world rail speed record of 603 km/h (375 mph) on the Yamanashi Maglev Test Line in April 2015.',
    specifications: {
      'Maximum Speed': '603 km/h (375 mph)',
      'Levitation Gap': '100 mm (10 cm / 4 inches)',
      'Magnet Type': 'NbTi Superconducting Magnets @ 4.2 K',
      'Propulsion System': 'Linear Synchronous Motor (LSM)',
      'Bogie Mass': '4.5 tons'
    },
    materials: [
      { partName: 'Superconducting Coils', material: 'Niobium-Titanium (NbTi) Wire in Liquid Helium Vessel', quantity: '4 magnet pods per bogie', notes: 'Operates at 4.2 Kelvin (-269°C)' },
      { partName: 'Cryostat Tank', material: 'Stainless Steel Vacuum Insulated Shell', quantity: '4 cryostats', notes: 'Shields magnet from thermal radiation' },
      { partName: 'Retractable Landing Gear', material: 'High-Strength Aircraft Alloy & Rubber Tires', quantity: '4 wheels per bogie', notes: 'Supports train below 150 km/h before maglev lift' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'NbTi Superconducting Coil Winding', instruction: 'Wind NbTi multi-filamentary superconducting wire onto race-track coil formers.' },
      { stepNumber: 2, title: 'Liquid Helium Cryostat Vessel Mounting', instruction: 'Enclose coils inside vacuum insulated cryostat with closed-loop pulse-tube recondenser.' },
      { stepNumber: 3, title: 'Retractable Wheel Deployment Calibration', instruction: 'Rig hydraulic deployment rams for retractable rubber wheels.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 30, y: 50, partNumber: 'MAG-SCM-4K', title: 'NbTi Superconducting Magnet Pod', description: 'Generates intense magnetic field creating both levitation and propulsion against track coils.', material: 'Niobium-Titanium' },
      { id: 'hs-2', x: 70, y: 50, partNumber: 'MAG-LSM-STAT', title: 'Linear Synchronous Motor Coil Interaction', description: 'Track side coils carry 3-phase AC current pulling superconducting magnets forward at 600 km/h.', material: 'Copper / Silicon Steel' },
      { id: 'hs-3', x: 50, y: 80, partNumber: 'MAG-WHEEL-RET', title: 'Retractable High-Speed Landing Gear', description: 'Supports train during station stop and retracts automatically once maglev lift occurs.', material: 'Aircraft Alloy' }
    ],
    svgLayers: {
      framePaths: ['M 60 180 L 340 180 L 320 260 L 80 260 Z'],
      mechanicalPaths: ['M 100 200 m -25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0', 'M 300 200 m -25 0 a 25 25 0 1 0 50 0 a 25 25 0 1 0 -50 0'],
      electricalPaths: ['M 40 220 L 360 220'],
      annotationLines: [{ x1: 100, y1: 200, x2: 100, y2: 120, label: 'Superconducting Magnet Pod' }],
      dimensionTexts: [{ x: 200, y: 290, text: 'LEVITATION GAP: 100 MM (10 CM)' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=800&q=80',
    tags: ['Maglev', 'Shinkansen', 'L0 Series', 'Superconductor', 'High-Speed Rail'],
    downloadsCount: 21900
  },

  // MEDICAL & BIOTECHNOLOGY (Additional 9)
  {
    id: 'bp-jarvik7-heart',
    title: 'Jarvik-7 Pneumatic Total Artificial Heart',
    patentNumber: 'US Pat. 4,222,127',
    inventor: 'Dr. Robert Jarvik & Willem Kolff',
    year: 1980,
    category: 'Medical & Biotechnology',
    status: 'Historical Patent',
    difficulty: 'Intermediate',
    summary: 'The world\'s first permanent total artificial heart implanted into a human patient.',
    description: 'The Jarvik-7 was a pneumatically driven artificial heart made of smooth polyurethane elastomer and aluminum. Compressed air pulses from an external drive console flexed internal diaphragms to pump blood through tilting-disc mechanical heart valves.',
    historicalContext: 'Implanted into Barney Clark on December 2, 1982 at the University of Utah, sustaining his life for 112 days.',
    specifications: {
      'Stroke Volume': '70 mL per beat',
      'Pumping Rate': '40 to 120 beats per minute',
      'Driving Pressure': '160 mmHg (Systolic Air Pressure)',
      'Valves': 'Bjork-Shiley Pyrolytic Carbon Tilting Disc Valves',
      'Weight': '280 grams'
    },
    materials: [
      { partName: 'Heart Ventricle Housing', material: 'Biomer Smooth Polyurethane Elastomer', quantity: '2 ventricles (left/right)', notes: 'Ultra-smooth surface prevents blood clotting' },
      { partName: 'Drive Diaphragm', material: 'Multi-layer Polyurethane Mesh Composite', quantity: '2 diaphragms', notes: 'Flexes millions of times without fatigue' },
      { partName: 'Heart Valves', material: 'Pyrolytic Carbon Disc in Titanium Ring', quantity: '4 valves (2 inflow, 2 outflow)', notes: 'Zero tissue rejection' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Polyurethane Dip Molding', instruction: 'Dip mold Biomer polyurethane ventricles to produce seamless mirror-smooth interior surface.' },
      { stepNumber: 2, title: 'Bjork-Shiley Valve Installation', instruction: 'Press fit pyrolytic carbon tilting disc valves into titanium inflow/outflow ports.' },
      { stepNumber: 3, title: 'Pneumatic Driveline Coupling', instruction: 'Attach reinforced Dacron vascular grafts and air drive tubes to base plate.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 35, y: 50, partNumber: 'JAR-VENT-L', title: 'Left Ventricle Biomer Chamber', description: 'Smooth polyurethane blood chamber pumping oxygenated blood into aorta.', material: 'Biomer Polyurethane' },
      { id: 'hs-2', x: 50, y: 70, partNumber: 'JAR-DIAPH-AIR', title: 'Pneumatic Air Flex Diaphragm', description: 'Compressed air pulses flex diaphragm upward to push blood out through outflow valve.', material: 'Polyurethane Composite' },
      { id: 'hs-3', x: 65, y: 35, partNumber: 'JAR-VALVE-PYRO', title: 'Pyrolytic Carbon Inflow Valve', description: 'Tilting carbon disc preventing retrograde blood flow.', material: 'Pyrolytic Carbon' }
    ],
    svgLayers: {
      framePaths: ['M 120 120 C 120 80 280 80 280 120 L 280 260 C 280 300 120 300 120 260 Z'],
      mechanicalPaths: ['M 200 120 L 200 300', 'M 140 160 L 260 160 M 140 220 L 260 220'],
      electricalPaths: ['M 160 300 L 160 360 M 240 300 L 240 360'],
      annotationLines: [{ x1: 160, y1: 360, x2: 120, y2: 400, label: 'Pneumatic Air Drive Tube' }],
      dimensionTexts: [{ x: 200, y: 320, text: 'STROKE VOLUME: 70 ML' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Artificial Heart', 'Jarvik-7', 'Medical Device', 'Cardiology', 'Biomedical'],
    downloadsCount: 16200
  },

  // OPTICS & ASTRONOMY (Additional 9)
  {
    id: 'bp-ligo-interferometer',
    title: 'LIGO Beam Splitter & 4km Laser Interferometer Arms',
    patentNumber: 'US Pat. 6,424,416',
    inventor: 'Rainer Weiss, Kip Thorne, & Barry Barish',
    year: 2002,
    category: 'Optics & Astronomy',
    status: 'Active Standard',
    difficulty: 'Advanced',
    summary: 'Gravitational wave detector capable of measuring arm length changes 1/10,000th the diameter of a proton.',
    description: 'LIGO (Laser Interferometer Gravitational-Wave Observatory) uses a Michelson interferometer with two 4-kilometer-long ultra-high vacuum arms. A 200-watt laser beam is split into both arms, bounced off 40-kg fused silica test mass mirrors suspended on fused silica fibers, detecting ripples in spacetime.',
    historicalContext: 'Made the first-ever direct observation of gravitational waves from colliding black holes on September 14, 2015, winning the 2017 Nobel Prize in Physics.',
    specifications: {
      'Arm Length': '4.0 Kilometers (2.5 miles)',
      'Measurement Sensitivity': '10⁻¹⁹ meters (1/10,000th proton width)',
      'Laser Wavelength': '1,064 nm (Nd:YAG Infrared Laser)',
      'Vacuum Pressure': '10⁻⁹ Torr (100 billionth atmosphere)',
      'Mirror Test Masses': '40 kg High-Purity Fused Silica'
    },
    materials: [
      { partName: 'Test Mass Mirrors', material: 'High-Purity Low-Absorption Fused Silica Glass', quantity: '4 mirrors', notes: 'Coated with tantala-titania ion beam dielectric layer' },
      { partName: 'Mirror Suspension Monofilaments', material: '0.4mm Fused Silica Glass Fibers', quantity: '4 fibers per mirror', notes: 'Fusion welded to mirror ears for zero seismic loss' },
      { partName: 'Beam Splitter Optic', material: 'Sub-nanometer Polished Fused Silica 45° Prism', quantity: '1 unit (37 cm dia)', notes: 'Splits 1,064 nm laser into equal perpendicular beams' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Fused Silica Monofilament Welding', instruction: 'CO2 laser weld 0.4 mm fused silica fibers directly onto 40 kg test mass mirror ears.' },
      { stepNumber: 2, title: '4km Vacuum Tube Baking', instruction: 'Bake 4-kilometer stainless steel beam tubes at 150 °C for 30 days to remove outgassing water molecules.' },
      { stepNumber: 3, title: 'Active Seismic Quad-Suspension Setup', instruction: 'Rig 4-stage active pendulum isolation stacks with feedback coils.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 50, partNumber: 'LIGO-SPLIT-45', title: '50/50 Fused Silica Beam Splitter', description: 'Splits incoming 200W laser into two orthogonal 4km arms.', material: 'Fused Silica' },
      { id: 'hs-2', x: 20, y: 50, partNumber: 'LIGO-MIRR-40KG', title: '40 kg Suspended End Test Mass Mirror', description: 'Reflects laser light back over 280 round trips (Fabry-Pérot cavity), measuring spacetime stretching.', material: 'Dielectric Fused Silica' },
      { id: 'hs-3', x: 50, y: 80, partNumber: 'LIGO-SEIS-QUAD', title: '4-Stage Quad Active Pendulum Suspension', description: 'Attenuates ground vibration noise by a factor of 10 billion.', material: 'Fused Silica Fibers' }
    ],
    svgLayers: {
      framePaths: ['M 200 200 L 50 200 M 200 200 L 200 50'],
      mechanicalPaths: ['M 200 200 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0', 'M 50 200 L 50 170 L 50 230', 'M 200 50 L 170 50 L 230 50'],
      electricalPaths: ['M 350 200 L 200 200'],
      annotationLines: [{ x1: 50, y1: 170, x2: 20, y2: 120, label: 'End Test Mass Mirror (4km)' }],
      dimensionTexts: [{ x: 125, y: 220, text: 'ARM LENGTH: 4,000 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    tags: ['LIGO', 'Gravitational Waves', 'Interferometer', 'Lasers', 'Physics'],
    downloadsCount: 29800
  },

  // CONSUMER TECHNOLOGY (Additional 9)
  {
    id: 'bp-ibm-model-m',
    title: 'IBM Model M Buckling Spring Mechanical Keyboard Switch',
    patentNumber: 'US Pat. 4,118,611',
    inventor: 'Richard Hunter Harris & IBM',
    year: 1978,
    category: 'Consumer Technology',
    status: 'Historical Patent',
    difficulty: 'Basic',
    summary: 'The legendary tactile buckling spring key switch mechanism that defined computer typing experience.',
    description: 'The IBM Model M keyboard switch uses a coil spring sitting under the keycap. As the key is pressed, the spring compresses linearly until it suddenly buckles sideways, causing a pivoted rocker foot to snap down onto a membrane contact, creating a sharp tactile click.',
    historicalContext: 'Introduced with the IBM PC/AT in 1985 and manufactured by IBM and Lexmark, renowned for indestructible durability.',
    specifications: {
      'Actuation Force': '65 to 70 grams',
      'Key Travel Distance': '3.8 mm (Actuation point at 2.3 mm)',
      'Mechanism Type': 'Buckling Spring with Pivoted Rocker',
      'Key Lifetime': '25 Million Keystrokes per key',
      'Plate Material': 'Curved 1.5 mm Galvanized Steel Backplate'
    },
    materials: [
      { partName: 'Buckling Coil Spring', material: 'Music Wire High-Carbon Spring Steel', quantity: '101 springs', notes: 'Precision wound coil diameter' },
      { partName: 'Pivoted Rocker Foot', material: 'Self-Lubricating Polyoxymethylene (POM / Acetal)', quantity: '101 rockers', notes: 'Pivots to slap membrane contact' },
      { partName: 'Membrane Circuit Sheets', material: 'Printed Silver Ink on Polyester Film (PET)', quantity: '2 layers + separator', notes: 'Detects electrical contact closing' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Galvanized Steel Plate Curve Stamping', instruction: 'Stamp 1.5 mm steel backplate into ergonomically curved cylinder profile.' },
      { stepNumber: 2, title: 'Buckling Spring & Rocker Insertion', instruction: 'Insert POM rocker foot into barrel housing and thread high-carbon coil spring onto rocker stem.' },
      { stepNumber: 3, title: 'Plastic Rivet Melting', instruction: 'Heat stake plastic structural rivets to clamp barrel frame against steel plate.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 35, partNumber: 'IBM-SPRING-WIRE', title: 'High-Carbon Buckling Coil Spring', description: 'Compresses linearly then snaps sideways, generating iconic tactile feedback and acoustic click sound.', material: 'Music Wire Steel' },
      { id: 'hs-2', x: 50, y: 65, partNumber: 'IBM-ROCK-POM', title: 'Pivoted Acetal Rocker Foot', description: 'Pivots downward when spring buckles, slapping capacitive membrane to close circuit.', material: 'POM Acetal' },
      { id: 'hs-3', x: 50, y: 85, partNumber: 'IBM-MEMB-PET', title: 'Silver-Printed Polyester Membrane', description: 'Flexible circuit sheet registering keystroke.', material: 'PET / Silver Ink' }
    ],
    svgLayers: {
      framePaths: ['M 150 80 L 250 80 L 250 140 L 150 140 Z', 'M 140 140 L 260 140 L 260 320 L 140 320 Z'],
      mechanicalPaths: ['M 200 140 L 200 240', 'M 180 240 L 220 280'],
      electricalPaths: ['M 120 300 L 280 300'],
      annotationLines: [{ x1: 200, y1: 180, x2: 270, y2: 180, label: 'Buckling Coil Spring' }],
      dimensionTexts: [{ x: 200, y: 350, text: 'ACTUATION FORCE: 65 GRAMS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    tags: ['IBM', 'Model M', 'Mechanical Keyboard', 'Buckling Spring', 'Retro Tech'],
    downloadsCount: 23100
  },

  // TO BE BUILT CONCEPTS (Additional 9)
  {
    id: 'bp-space-elevator',
    title: 'Orbital Space Elevator Carbon Nanotube Ribbon Tether Climber',
    patentNumber: 'CONCEPT/2032/SE-01',
    inventor: 'Global Megastructure Engineering Initiative',
    year: 2032,
    category: 'To Be Built Concepts',
    status: 'To Be Built Concept',
    difficulty: 'Experimental',
    summary: '100,000 km carbon nanotube ribbon tether connecting equatorial ground port to counterweight station.',
    description: 'The Space Elevator features a 100,000-kilometer ribbon woven from single-walled carbon nanotube fibers anchored to an ocean platform and held taut by Earth\'s rotation via a counterweight asteroid beyond geostationary orbit (35,786 km). Magnetically levitated laser-powered climbers carry 20-ton payloads to orbit for $50 per kilogram.',
    historicalContext: 'Originally envisioned by Konstantin Tsiolkovsky in 1895, becoming physically possible with macro-scale carbon nanotube synthesis.',
    specifications: {
      'Tether Length': '100,000 kilometers',
      'Tensile Strength Needed': '100 GigaPascals (GPa)',
      'Payload Capacity': '20 Metric Tons per Climber',
      'Climber Speed': '200 km/h (Laser Powered Maglev)',
      'Geostationary Altitude': '35,786 km'
    },
    materials: [
      { partName: 'Tether Ribbon', material: 'Single-Walled Carbon Nanotube Woven Ribbon', quantity: '100,000 km tether', notes: 'Tapered profile from equator to GEO' },
      { partName: 'Climber Drive Motors', material: 'Superconducting Linear Induction Drive', quantity: '4 motor pods per climber', notes: 'Powered by 100 kW ground-based laser beam' },
      { partName: 'Counterweight Station', material: 'Captured Metal-Rich Near-Earth Asteroid', quantity: '1 counterweight mass', notes: 'Maintains tether tension at 100,000 km' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'GEO Satellite Tether Spooling', instruction: 'Deploy initial seed ribbon from geostationary orbit simultaneously down to Earth and up to counterweight.' },
      { stepNumber: 2, title: 'Equatorial Ocean Anchor Coupling', instruction: 'Attach bottom tether terminal to mobile ocean platform on Earth equator.' },
      { stepNumber: 3, title: 'Climber Ribbon Thickening', instruction: 'Send autonomous weaving climbers to add carbon nanotube layers until tether reaches 20-ton capacity.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 20, partNumber: 'SE-TETH-100K', title: '100,000 km Carbon Nanotube Tether', description: 'Tapered ribbon withstands 100 GPa tension, supporting cargo transits directly into space.', material: 'Carbon Nanotubes' },
      { id: 'hs-2', x: 50, y: 50, partNumber: 'SE-CLIMB-MAG', title: 'Laser-Powered Maglev Cargo Climber', description: 'Climbs ribbon at 200 km/h powered by ground-based infrared laser array.', material: 'Titanium / Superconductor' },
      { id: 'hs-3', x: 50, y: 85, partNumber: 'SE-ANCHOR-OCEAN', title: 'Equatorial Mobile Ocean Anchor Port', description: 'Floating platform capable of navigating to avoid typhoons and orbital debris.', material: 'High-Tensile Steel' }
    ],
    svgLayers: {
      framePaths: ['M 200 20 L 200 380', 'M 160 380 L 240 380 L 260 400 L 140 400 Z'],
      mechanicalPaths: ['M 170 200 L 230 200 L 230 240 L 170 240 Z', 'M 200 20 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0'],
      electricalPaths: ['M 140 350 L 170 220'],
      annotationLines: [{ x1: 230, y1: 220, x2: 290, y2: 220, label: 'Laser Maglev Climber' }],
      dimensionTexts: [{ x: 200, y: 370, text: 'TETHER LENGTH: 100,000 KILOMETERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Space Elevator', 'Carbon Nanotubes', 'Future Tech', 'Megastructure', 'Space Launch'],
    downloadsCount: 35600
  }
];
