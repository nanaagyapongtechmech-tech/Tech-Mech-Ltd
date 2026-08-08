import { BlueprintItem } from '../types';
import { ADDITIONAL_BLUEPRINTS } from './expandedBlueprints';

export { ADDITIONAL_BLUEPRINTS };

export const CORE_BLUEPRINTS: BlueprintItem[] = [
  {
    id: 'bp-saturn-v-f1',
    title: 'Saturn V Rocket Engine (F-1 Combustion Chamber)',
    patentNumber: 'US Pat. 3,180,083',
    inventor: 'Wernher von Braun & Rocketdyne Team',
    year: 1965,
    category: 'Aerospace & Aeronautics',
    status: 'Historical Patent',
    difficulty: 'Advanced',
    summary: 'The single most powerful single-nozzle liquid-fueled rocket engine ever flown, generating 1.5 million lbs of thrust.',
    description: 'The F-1 engine powered the first stage of the Saturn V rocket that propelled Apollo astronauts to the Moon. It operated on RP-1 kerosene and liquid oxygen (LOX), utilizing a gas-generator power cycle driving a turbopump to force over 3 tons of propellant per second into the injector plate.',
    historicalContext: 'Faced severe combustion instability during early 1960s testing until acoustic baffles were added to the injector face.',
    specifications: {
      'Thrust (Sea Level)': '1,500,000 lbf (6,700 kN)',
      'Dry Weight': '18,500 lbs (8,400 kg)',
      'Specific Impulse': '263 seconds',
      'Chamber Pressure': '1,015 psi (7.0 MPa)',
      'Propellant Mix': 'RP-1 Rocket Grade Kerosene / Liquid Oxygen'
    },
    materials: [
      { partName: 'Thrust Chamber Tube Wall', material: 'Inconel X-750 Superalloy', quantity: '890 brazed tubes', notes: 'Regeneratively cooled by RP-1' },
      { partName: 'Injector Face Plate', material: 'AISI 347 Stainless Steel', quantity: '1 unit', notes: 'Features 3,700 orifice holes with acoustic baffles' },
      { partName: 'Turbopump Assembly', material: 'Titanium-Inconel Composite', quantity: '1 unit', notes: 'Delivers 55,000 horsepower' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Brazing Thrust Chamber Stack', instruction: 'Align 890 contoured nickel-alloy tubes in furnace jig and apply gold-copper braze alloy.' },
      { stepNumber: 2, title: 'Mounting Injector Face & Baffles', instruction: 'Precision weld 12 radial copper acoustic baffles to eliminate pressure resonance.' },
      { stepNumber: 3, title: 'Turbopump & Manifold Integration', instruction: 'Couple the dual-entry gas generator turbopump to the main LOX and fuel valves.' }
    ],
    hotspots: [
      { id: 'hs-1', x: 50, y: 32, partNumber: 'F1-INJ-01', title: 'Acoustic Baffled Injector', description: 'Combustion face with 3,700 coaxial orifices delivering LOX and RP-1 fuel.', material: 'Stainless 347', pressure: '1,015 psi' },
      { id: 'hs-2', x: 50, y: 58, partNumber: 'F1-TUBE-890', title: 'Regenerative Cooling Nozzle', description: '890 brazed Inconel tubes carrying cold RP-1 before injection into combustion chamber.', material: 'Inconel X-750' },
      { id: 'hs-3', x: 28, y: 40, partNumber: 'F1-PUMP-55K', title: '55,000 HP Turbopump', description: 'Drives liquid oxygen and fuel at 15,400 gpm at 1,500 psi.', material: 'Titanium / Inconel' }
    ],
    svgLayers: {
      framePaths: [
        'M 150 100 L 250 100 L 270 200 L 350 450 L 50 450 L 130 200 Z',
        'M 170 50 L 230 50 L 230 100 L 170 100 Z'
      ],
      mechanicalPaths: [
        'M 100 150 L 300 150 M 110 200 L 290 200 M 120 250 L 280 250 M 130 300 L 270 300 M 140 350 L 260 350 M 150 400 L 250 400',
        'M 200 100 L 200 450',
        'M 70 180 Q 50 250 100 280 M 330 180 Q 350 250 300 280'
      ],
      electricalPaths: [
        'M 170 70 L 120 70 L 120 180 M 230 70 L 280 70 L 280 180'
      ],
      annotationLines: [
        { x1: 200, y1: 100, x2: 380, y2: 80, label: '3,700-Orifice Injector Plate' },
        { x1: 200, y1: 250, x2: 380, y2: 230, label: 'Regenerative Inconel Tubes' },
        { x1: 200, y1: 400, x2: 380, y2: 380, label: '1,500,000 lbf Thrust Extension' }
      ],
      dimensionTexts: [
        { x: 200, y: 480, text: 'TOTAL HEIGHT: 5.6 METERS (18.5 FT)' },
        { x: 20, y: 275, text: 'EXIT DIA: 3.7 M' }
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    tags: ['NASA', 'Apollo', 'Saturn V', 'Rocketdyne', 'Moon Mission', 'F-1 Engine'],
    downloadsCount: 142500
  },
  {
    id: 'bp-dyson-swarm-node',
    title: 'Dyson Swarm Solar Harvesting Node',
    patentNumber: 'CONCEPT/2028/DYSON-SWARM-01',
    inventor: 'Global Orbital Engineering Union',
    year: 2028,
    category: 'To Be Built Concepts',
    status: 'To Be Built Concept',
    difficulty: 'Experimental',
    summary: 'Orbital power-transmitting array utilizing high-efficiency photo-voltaic sails and focused microwave beam steering for space-to-ground clean energy delivery.',
    description: 'Autonomous orbital solar satellite designed to operate in low solar orbit. Captures unfiltered solar radiation via ultra-thin graphene-perovskite photovoltaics and converts energy into coherent 5.8 GHz phased array microwave beams aimed at terrestrial rectenna stations.',
    historicalContext: 'Inspired by Freeman Dyson (1960) and modern space-based solar power (SBSP) initiatives.',
    specifications: {
      'Orbital Radius': '0.3 AU (Inner Solar Orbit)',
      'Harvesting Capacity': '1.2 Gigawatts per node',
      'Phased Array Freq': '5.8 GHz Microwave',
      'Structural Material': 'Carbon Nanotube Lattice',
      'Stationkeeping': 'Solar Sail Radiation Pressure'
    },
    materials: [
      { partName: 'Photovoltaic Membrane', material: 'Graphene-Perovskite Flexible Film', quantity: '2.5 sq km', notes: '92% optical capture efficiency' },
      { partName: 'Microwave Emitter Matrix', material: 'GaN High-Electron Power Transistors', quantity: '100,000 units', notes: 'Sub-millimeter beam phase control' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'In-Orbit Automated Unfurling', instruction: 'Deploy carbon fiber boom arms and unfurl graphene sail array.' },
      { stepNumber: 2, title: 'Phase-Lock Alignment', instruction: 'Calibrate laser beacon tracking with terrestrial rectenna array.' }
    ],
    hotspots: [
      { id: 'hs-d1', x: 50, y: 50, partNumber: 'DS-CORE-01', title: 'Quantum Stabilization Ring', description: 'Central gyroscopic node for orientation control.', material: 'Superconducting Alloy' },
      { id: 'hs-d2', x: 75, y: 30, partNumber: 'DS-SAIL-A', title: 'Graphene Solar Sail', description: 'Harvests solar radiation while using photon pressure for attitude control.', material: 'Perovskite Graphene' }
    ],
    svgLayers: {
      framePaths: ['M 200 50 L 350 200 L 200 350 L 50 200 Z'],
      mechanicalPaths: ['M 200 200 m -60 0 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0'],
      electricalPaths: ['M 50 200 L 350 200 M 200 50 L 200 350'],
      annotationLines: [{ x1: 200, y1: 200, x2: 320, y2: 120, label: 'Central Microwave Core' }],
      dimensionTexts: [{ x: 200, y: 380, text: 'SAIL SPAN: 1,500 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Dyson Sphere', 'Solar Power', 'Space Tech', 'Futuristic', 'Clean Energy'],
    downloadsCount: 98200
  },
  {
    id: 'bp-sr71-j58',
    title: 'SR-71 Blackbird Pratt & Whitney J58 Turbojet',
    patentNumber: 'US Pat. 3,344,606',
    inventor: 'Clarence "Kelly" Johnson & Pratt & Whitney',
    year: 1964,
    category: 'Aerospace & Aeronautics',
    status: 'Historical Patent',
    difficulty: 'Advanced',
    summary: 'Continuous-bleed jet engine capable of sustained Mach 3.2 flight using specialized JP-7 fuel.',
    description: 'The Pratt & Whitney J58 (JT11D-20) was a jet engine that operated as an afterburning turbojet at low speeds and transitioned into a turboramjet at high Mach numbers by bypassing air around the compressor directly into the afterburner.',
    historicalContext: 'Powered the world\'s fastest air-breathing manned aircraft, setting speed records that stand to this day.',
    specifications: {
      'Static Thrust': '32,500 lbf (145 kN) with Afterburner',
      'Maximum Speed': 'Mach 3.2+ (2,200+ mph)',
      'Fuel Grade': 'JP-7 High-Flashpoint Kerosene',
      'Compressor Bypasses': '6 Bleed Tubes to Afterburner'
    },
    materials: [
      { partName: 'Compressor Blades', material: 'Incoloy 901 & Waspaloy', quantity: '9 stages', notes: 'Withstands 427°C intake temperatures' },
      { partName: 'Bypass Ducting', material: 'Titanium Beta-120', quantity: '6 tubes', notes: 'Directs bleed air to afterburner' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Rotor Assembly Stack', instruction: 'Precision balance 9-stage compressor shaft inside titanium casing.' },
      { stepNumber: 2, title: 'Bypass Tube Routing', instruction: 'Attach 6 external bypass tubes from 4th stage compressor to afterburner duct.' }
    ],
    hotspots: [
      { id: 'hs-sr1', x: 30, y: 50, partNumber: 'J58-COMP-09', title: '9-Stage Axial Compressor', description: 'Compresses intake air up to Mach 2.5 before bleed system engages.', material: 'Waspaloy Titanium' },
      { id: 'hs-sr2', x: 65, y: 50, partNumber: 'J58-BYPASS-6', title: 'Ramjet Bleed Tubes', description: '6 bleed tubes route high-pressure air directly to afterburner at Mach 3+.', material: 'Titanium' }
    ],
    svgLayers: {
      framePaths: ['M 50 150 L 350 150 L 380 200 L 350 250 L 50 250 Z'],
      mechanicalPaths: ['M 100 150 L 100 250 M 150 150 L 150 250 M 200 150 L 200 250 M 250 150 L 250 250'],
      electricalPaths: ['M 50 120 L 350 120 M 50 280 L 350 280'],
      annotationLines: [{ x1: 200, y1: 120, x2: 290, y2: 90, label: 'Compressor Bleed Bypass' }],
      dimensionTexts: [{ x: 215, y: 280, text: 'ENGINE LENGTH: 5.5 METERS' }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    tags: ['SR-71 Blackbird', 'Pratt & Whitney', 'Jet Engine', 'Ramjet', 'Mach 3'],
    downloadsCount: 38900
  }
];
