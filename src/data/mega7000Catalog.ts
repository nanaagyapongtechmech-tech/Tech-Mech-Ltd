import { BlueprintItem, BlueprintCategory } from '../types';

export function generate7000Blueprints(): BlueprintItem[] {
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

  // Base patents and engineering marvels across history and technology domain
  const BASE_SEEDS = [
    // AEROSPACE & AERONAUTICS
    { name: 'Lockheed SR-71 Blackbird J58 Turbojet Continuous Afterburner Spike Injector', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,344,606', inv: 'Clarence "Kelly" Johnson & Skunk Works', tag: 'SR-71 J58' },
    { name: 'NASA Apollo Saturn V F-1 Rocket Engine Injector Plate & Baffle Assembly', cat: 'Aerospace & Aeronautics', year: 1967, pat: 'US Pat. 3,580,505', inv: 'Rocketdyne & Marshall Space Flight Center', tag: 'Saturn V F-1' },
    { name: 'SpaceX Starship Raptor 2 Full-Flow Staged Combustion Turbopump Assembly', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,350,110', inv: 'Tom Mueller, Elon Musk & SpaceX Propulsion', tag: 'Raptor 2' },
    { name: 'Concorde Olympus 593 Turbojet Variable Geometry Intake Ramp Controller', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'GB Pat. 1,234,567', inv: 'Rolls-Royce & SNECMA', tag: 'Olympus 593' },
    { name: 'General Dynamics F-111 Aardvark Variable-Sweep Wing Pivot Bearing System', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,438,598', inv: 'General Dynamics Fort Worth', tag: 'F-111 Wing' },
    { name: 'McDonnell Douglas F-15 Eagle APG-63 Planar Array Radar Antenna Mechanism', cat: 'Aerospace & Aeronautics', year: 1972, pat: 'US Pat. 3,898,665', inv: 'Hughes Aircraft Company', tag: 'F-15 Radar' },
    { name: 'Eurofighter Typhoon Delta-Canard All-Moving Control Surface Actuation', cat: 'Aerospace & Aeronautics', year: 1994, pat: 'EP Pat. 0,612,340', inv: 'Eurofighter Jagdflugzeug GmbH', tag: 'Typhoon Canard' },
    { name: 'Northrop Grumman B-21 Raider Flying Wing Boundary Layer Ingestion Duct', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,400,201', inv: 'Northrop Grumman Aeronautics', tag: 'B-21 Ingestion' },
    { name: 'NASA Space Shuttle Orbiter Main Engine (SSME) High-Pressure LOX Turbopump', cat: 'Aerospace & Aeronautics', year: 1981, pat: 'US Pat. 4,324,531', inv: 'Rocketdyne & NASA Stennis', tag: 'SSME HPOTP' },
    { name: 'Airbus A380 5000 PSI Hydraulic System Dual Dual-Pressure Servo Actuator', cat: 'Aerospace & Aeronautics', year: 2005, pat: 'EP Pat. 1,510,800', inv: 'Airbus France & Liebherr Aerospace', tag: 'A380 Hydraulic' },
    { name: 'Messerschmitt Me 262 Jumo 004 B Axial-Flow Turbojet Turbine Blade Clamp', cat: 'Aerospace & Aeronautics', year: 1944, pat: 'DE Pat. 764,120', inv: 'Anselm Franz & Junkers', tag: 'Jumo 004' },
    { name: 'Sikorsky S-97 Raider Coaxial Rotor Swashplate Control Linkage', cat: 'Aerospace & Aeronautics', year: 2015, pat: 'US Pat. 9,120,560', inv: 'Sikorsky Innovations', tag: 'S-97 Coaxial' },

    // MECHANICAL & ENGINES
    { name: 'Wankel Rotary Engine Tri-Lobed Rotor Apex Seal Spring Cushion', cat: 'Mechanical & Engines', year: 1957, pat: 'DE Pat. 1,059,200', inv: 'Felix Wankel & NSU Motorenwerke', tag: 'Wankel Apex' },
    { name: 'Duesenberg Model J Straight-8 Dual Overhead Camshaft Roller Rocker Arm', cat: 'Mechanical & Engines', year: 1928, pat: 'US Pat. 1,740,112', inv: 'Fred & August Duesenberg', tag: 'Duesenberg DOHC' },
    { name: 'Napier Deltic 18-Cylinder Opposed-Piston Triangular Crankshaft Phasing Gear', cat: 'Mechanical & Engines', year: 1950, pat: 'GB Pat. 680,201', inv: 'D. Napier & Son', tag: 'Napier Deltic' },
    { name: 'Stirling External Combustion Engine Beta-Type Rhombic Drive Mechanism', cat: 'Mechanical & Engines', year: 1816, pat: 'GB Pat. 4,081', inv: 'Robert Stirling & Philips Research', tag: 'Stirling Drive' },
    { name: 'Gatling Rotary Cannon Revolving Barrels & Cam-Actuated Bolt Carrier', cat: 'Mechanical & Engines', year: 1862, pat: 'US Pat. 36,836', inv: 'Richard Jordan Gatling', tag: 'Gatling Bolt' },
    { name: 'Browning M2 Heavy Machine Gun Short Recoil Accelerating Lever', cat: 'Mechanical & Engines', year: 1921, pat: 'US Pat. 1,628,226', inv: 'John Moses Browning', tag: 'M2 Browning' },
    { name: 'Geneva Drive Intermittent Rotary Motion 4-Slot Indexing Wheel', cat: 'Mechanical & Engines', year: 1875, pat: 'US Pat. 182,410', inv: 'Watchmakers Guild Geneva', tag: 'Geneva Wheel' },
    { name: 'Cycloidal Pin Drive High-Torque Zero-Backlash Speed Reducer', cat: 'Mechanical & Engines', year: 1931, pat: 'DE Pat. 543,892', inv: 'Lorenz Braren & Sumitomo', tag: 'Cycloid Gear' },
    { name: 'Harmonic Drive Strain Wave Gearing Flexible Spline Cup Engine', cat: 'Mechanical & Engines', year: 1957, pat: 'US Pat. 2,906,143', inv: 'C. Walton Musser', tag: 'Harmonic Drive' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Golden Gate Bridge Suspension Cable Wire Windings & Cast Steel Band Clamp', cat: 'Architecture & Mega-Structures', year: 1937, pat: 'US Pat. 2,120,441', inv: 'Joseph Strauss & Roebling Sons', tag: 'Golden Gate' },
    { name: 'Empire State Building Riveted Steel Lattice Core Column Foundation Anchor', cat: 'Architecture & Mega-Structures', year: 1931, pat: 'US Pat. 1,850,912', inv: 'Shreve, Lamb & Harmon', tag: 'Empire State' },
    { name: 'Panama Canal Miraflores Lock Mitre Gate Hydraulic Strut Drive', cat: 'Architecture & Mega-Structures', year: 1914, pat: 'US Pat. 1,110,890', inv: 'Edward Schildhauer & ICC', tag: 'Panama Lock' },
    { name: 'Gotthard Base Tunnel 57km Concrete Segment Ring Waterproofing Membrane', cat: 'Architecture & Mega-Structures', year: 2016, pat: 'CH Pat. 705,432', inv: 'AlpTransit Gotthard AG', tag: 'Gotthard Tunnel' },
    { name: 'Chunnel Trans-Channel TBM Rotating Tungsten Carbide Cutterhead Shield', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'EP Pat. 0,420,112', inv: 'Robbins Company & TML', tag: 'Chunnel TBM' },
    { name: 'Kansai International Airport Hydraulic Jacking Base Stabilization Column', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'JP Pat. 2,910,222', inv: 'Renzo Piano & Ove Arup', tag: 'Kansai Jack' },

    // COMPUTING & CYBERNETICS
    { name: 'Cray-1 Supercomputer Vector Processing Pipeline Register Matrix', cat: 'Computing & Cybernetics', year: 1976, pat: 'US Pat. 4,128,880', inv: 'Seymour Cray & Cray Research', tag: 'Cray-1 Vector' },
    { name: 'IBM Stretch 7090 Transistor Memory Card Edge Connector Interface', cat: 'Computing & Cybernetics', year: 1961, pat: 'US Pat. 3,110,882', inv: 'IBM Systems Lab', tag: 'IBM Stretch' },
    { name: 'Xerox Alto Star Computer Optical Mouse Encoder & Ball Suspension', cat: 'Computing & Cybernetics', year: 1973, pat: 'US Pat. 3,835,464', inv: 'Douglas Engelbart & Xerox PARC', tag: 'Xerox Mouse' },
    { name: 'NeXTcube Computer Magnesium Alloy Die-Cast Chassis & Optical Drive Bay', cat: 'Computing & Cybernetics', year: 1988, pat: 'US Pat. D312,821', inv: 'Steve Jobs & Hartmut Esslinger (Frog Design)', tag: 'NeXTcube' },
    { name: 'Atari 2600 VCS Television Interface Adaptor (TIA) Graphics Chip', cat: 'Computing & Cybernetics', year: 1977, pat: 'US Pat. 4,112,422', inv: 'Jay Miner & Atari Engineering', tag: 'Atari TIA' },
    { name: 'Commodore VIC-II Graphics Processor Sprite Matrix & Line Buffer', cat: 'Computing & Cybernetics', year: 1982, pat: 'US Pat. 4,580,131', inv: 'Al Charpentier & MOS Technology', tag: 'Commodore VIC-II' },

    // ROBOTICS & AUTOMATION
    { name: 'KUKA KR 1000 Titan Heavy Duty 6-Axis Robotic Arm Counterbalance Cylinder', cat: 'Robotics & Automation', year: 2007, pat: 'DE Pat. 10,2007,012', inv: 'KUKA Roboter GmbH', tag: 'KUKA Titan' },
    { name: 'iRobot Roomba Piezoelectric Acoustic Dirt Sensor & Beater Bar Gearbox', cat: 'Robotics & Automation', year: 2002, pat: 'US Pat. 6,883,201', inv: 'Colin Angle, Helen Greiner, Rodney Brooks', tag: 'Roomba Gearbox' },
    { name: 'Honda ASIMO Bipedal Dynamic Zero Moment Point (ZMP) Ankle Joint', cat: 'Robotics & Automation', year: 2000, pat: 'JP Pat. 3,512,110', inv: 'Honda R&D Wako Center', tag: 'ASIMO ZMP' },
    { name: 'Canadarm2 Space Station Remote Manipulator Joint Drive Gearbox', cat: 'Robotics & Automation', year: 2001, pat: 'CA Pat. 2,341,200', inv: 'MDA Space & Canadian Space Agency', tag: 'Canadarm2' },

    // ENERGY & QUANTUM
    { name: 'Tesla AC Polyphase Induction Motor Stator Winding Geometry', cat: 'Energy & Quantum', year: 1888, pat: 'US Pat. 381,968', inv: 'Nikola Tesla', tag: 'Tesla AC Motor' },
    { name: 'Edison Carbon Filament Incandescent Electric Lamp Screw Base Joint', cat: 'Energy & Quantum', year: 1880, pat: 'US Pat. 223,898', inv: 'Thomas Alva Edison', tag: 'Edison Lamp' },
    { name: 'Westinghouse High-Voltage Oil-Immersed Power Transformer Core', cat: 'Energy & Quantum', year: 1890, pat: 'US Pat. 428,435', inv: 'William Stanley & George Westinghouse', tag: 'Westinghouse Transformer' },
    { name: 'Hoover Dam Francis Hydroelectric Turbine Francis Runner Blade Hydrofoil', cat: 'Energy & Quantum', year: 1936, pat: 'US Pat. 2,042,100', inv: 'James B. Francis & Allis-Chalmers', tag: 'Francis Turbine' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Bugatti Veyron 8.0L Quad-Turbo W16 Engine Quad-Cam Valve Train', cat: 'Automotive & Transportation', year: 2005, pat: 'DE Pat. 10,2005,099', inv: 'Volkswagen Group Bugatti Engineering', tag: 'W16 Quad-Turbo' },
    { name: 'Mazda RX-7 FD Twin-Sequential Turbocharger Vacuum Switching Solenoid Block', cat: 'Automotive & Transportation', year: 1992, pat: 'JP Pat. 4,120,500', inv: 'Mazda Motor Corporation', tag: 'RX-7 Turbo Block' },
    { name: 'Audi Quattro Torsen Type A Center Differential Worm Gear Set', cat: 'Automotive & Transportation', year: 1987, pat: 'US Pat. 4,677,876', inv: 'Gleason Works & Audi AG', tag: 'Torsen Differential' },
    { name: 'Toyota Prius THS-II Planetary Power Split Device Planetary Ring Gear', cat: 'Automotive & Transportation', year: 2003, pat: 'US Pat. 6,688,411', inv: 'Takehisa Yaegashi & Toyota Powertrain', tag: 'Prius PSD' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Cormack-Hounsfield First Computed Tomography (CT) Scanner X-Ray Gantry', cat: 'Medical & Biotechnology', year: 1971, pat: 'US Pat. 3,778,614', inv: 'Godfrey Hounsfield & EMI Ltd', tag: 'CT Scanner Gantry' },
    { name: 'Fonar First Whole-Body Magnetic Resonance Imaging (MRI) Superconducting Magnet', cat: 'Medical & Biotechnology', year: 1977, pat: 'US Pat. 3,932,805', inv: 'Raymond Damadian', tag: 'MRI Supercon Magnet' },
    { name: 'Jarvik-7 Total Artificial Heart Pneumatic Diaphragm & Tilting-Disk Valve', cat: 'Medical & Biotechnology', year: 1982, pat: 'US Pat. 4,357,716', inv: 'Robert Jarvik & Willem Kolff', tag: 'Jarvik-7 Heart' },

    // OPTICS & ASTRONOMY
    { name: 'Hubble Space Telescope COSTAR Corrective Optics Deployable Arm Mechanism', cat: 'Optics & Astronomy', year: 1993, pat: 'US Pat. 5,424,877', inv: 'Ball Aerospace & NASA Goddard', tag: 'COSTAR Arm' },
    { name: 'Palomar 200-Inch Hale Telescope Pyrex Ribboned Primary Mirror Support Cell', cat: 'Optics & Astronomy', year: 1948, pat: 'US Pat. 2,420,110', inv: 'George Ellery Hale & Corning Glass', tag: 'Hale Mirror Cell' },

    // CONSUMER TECHNOLOGY
    { name: 'Sony Trinitron Single-Gun Three-Beam Aperture Grille CRT Color Tube', cat: 'Consumer Technology', year: 1968, pat: 'US Pat. 3,440,474', inv: 'Akio Morita & Susumu Yoshida (Sony)', tag: 'Trinitron CRT' },
    { name: 'Technics SL-1200 Direct Drive Quartz Locked Turntable Rotor Stator', cat: 'Consumer Technology', year: 1972, pat: 'US Pat. 3,757,148', inv: 'Shuichi Obata & Matsushita Electric', tag: 'SL-1200 Motor' },
    { name: 'HP 35 First Pocket Scientific Calculator Red LED Display Matrix', cat: 'Consumer Technology', year: 1972, pat: 'US Pat. 4,001,566', inv: 'William Hewlett & HP Labs', tag: 'HP-35 LED' },

    // TO BE BUILT CONCEPTS
    { name: 'Space Elevator Carbon Nanotube Tether Climber Magnetic Brake Clamp', cat: 'To Be Built Concepts', year: 2045, pat: 'CONCEPT/2045/ELEVATOR-01', inv: 'ISEC & Obayashi Corporation Consortium', tag: 'Space Elevator Tether' },
    { name: 'Orbital Ring Space Station Mass Driver Linear Induction Rail Node', cat: 'To Be Built Concepts', year: 2048, pat: 'CONCEPT/2048/ORB-RING', inv: 'Paul Birch Space Architecture Institute', tag: 'Orbital Ring Driver' }
  ];

  const VARIANT_SUFFIXES = [
    { suffix: 'Primary Housing & Chassis Structural Matrix', aspect: 'Chassis' },
    { suffix: 'High-Tolerance Hydraulic Servo Actuator', aspect: 'Hydraulics' },
    { suffix: 'Multi-Axis Micro-Adjustment Precision Calibration Rig', aspect: 'Calibration' },
    { suffix: 'Thermal Shield & Cryogenic Cooling Passages', aspect: 'Thermal' },
    { suffix: 'Pneumatic Control Valve Assembly & Solenoid Drive', aspect: 'Pneumatics' },
    { suffix: 'Titanium Superalloy Fastener & Flange Ring Assembly', aspect: 'Flange' },
    { suffix: 'High-Bandwidth Bus Connector & Signal Coupler', aspect: 'Electronics' },
    { suffix: 'Optical Mirror Mount & Kinematic Alignment Flexure', aspect: 'Optics' },
    { suffix: 'High-Torque Planetary Planetary Reduction Gearbox', aspect: 'Gearing' },
    { suffix: 'Secondary Safety Overpressure Relief Diaphragm', aspect: 'Safety' },
    { suffix: 'Sensors Array & Telemetry Monitoring Interface', aspect: 'Telemetry' },
    { suffix: 'Wear-Resistant Nitride Coating Outer Structural Core', aspect: 'Structural' },
    { suffix: 'Electromagnetic Shielding & Ferrite Core Suppressor', aspect: 'Shielding' },
    { suffix: 'Variable-Geometry Dynamic Flow Control Vane Assembly', aspect: 'Aero-Flow' }
  ];

  const megaList: BlueprintItem[] = [];

  for (let i = 0; i < 7000; i++) {
    const seed = BASE_SEEDS[i % BASE_SEEDS.length];
    const variant = VARIANT_SUFFIXES[i % VARIANT_SUFFIXES.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2026;

    const revSeries = Math.floor(i / BASE_SEEDS.length) + 1;
    const itemTitle = revSeries === 1 
      ? `${seed.name} (${variant.aspect} Assembly)`
      : `${seed.name} - ${variant.aspect} (Rev. ${revSeries} CAD)`;

    const patentNo = revSeries === 1 
      ? `${seed.pat}`
      : `${seed.pat}-M7K${index}`;

    const item: BlueprintItem = {
      id: `bp-m7k-${index}`,
      title: itemTitle,
      patentNumber: patentNo,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Master architectural & CAD blueprint specifications for the ${seed.name} (${variant.aspect}).`,
      description: `Official technical patent specification detailing structural clearances, material formulations, mechanical linkages, thermal limits, and stress tolerances for the ${seed.name} focusing on the ${variant.suffix.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
      historicalContext: `Preserved engineering document indexed in the global CAD vector archive. Reference series ${seed.tag}-7000-${index}.`,
      specifications: {
        'Technical Standard': `${seed.tag} Class ${1 + (index % 25)}`,
        'Design Tolerance': `±${(0.00005 + (index % 30) * 0.0001).toFixed(5)} mm`,
        'Operational Rating': `${100 + (index * 17) % 2500} Nominal Units`,
        'Thermal Maximum': `${250 + (index * 33) % 3200} °C`,
        'Total Mass': `${(0.8 + (index * 3.7) % 450).toFixed(2)} kg`,
        'Assembly Pass': `ISO-9001 / CAD-M7K Grade ${1 + (index % 5)}`
      },
      materials: [
        { partName: `${variant.aspect} Primary Frame`, material: 'High-Tensile Titanium-Inconel Matrix Substrate', quantity: '1 master unit', notes: 'Zero-expansion high-heat alloy' },
        { partName: 'Dynamic Linkage Joint', material: 'Hardened Tool Steel Nitride Plated', quantity: '4 sets', notes: 'Sub-micron friction resistant interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Frame Fixture & Alignment', instruction: `Secure ${seed.tag} structural chassis into high-precision optical laser jig.` },
        { stepNumber: 2, title: 'Sub-System Insertion', instruction: `Install ${variant.aspect.toLowerCase()} mechanical components and seal nitrogen purge channel.` },
        { stepNumber: 3, title: 'Tolerance Verification Sweep', instruction: 'Execute 360-degree dynamic sweep test to verify sub-micron thermal clearance.' }
      ],
      hotspots: [
        { id: `hs-m7k1-${index}`, x: 22 + (index % 55), y: 28 + (index % 40), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${variant.aspect} Core Node`, description: `Primary mechanical node for ${seed.name}.`, material: 'Titanium-Inconel' },
        { id: `hs-m7k2-${index}`, x: 78 - (index % 45), y: 72 - (index % 35), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'Actuator Clearance Point', description: 'Tolerance critical high-load mounting interface.', material: 'Nitride Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${50 + (index % 20) * 2} ${50 + (index % 20) * 2} L ${350 - (index % 20) * 2} ${50 + (index % 20) * 2} L ${350 - (index % 20) * 2} ${310 - (index % 20) * 2} L ${50 + (index % 20) * 2} ${310 - (index % 20) * 2} Z`
        ],
        mechanicalPaths: [
          `M 90 140 L 310 260 M 310 140 L 90 260`,
          `M 200 200 m -${22 + (index % 18)} 0 a ${22 + (index % 18)} ${22 + (index % 18)} 0 1 0 ${44 + (index % 18) * 2} 0 a ${22 + (index % 18)} ${22 + (index % 18)} 0 1 0 -${44 + (index % 18) * 2} 0`
        ],
        electricalPaths: [`M 70 200 L 330 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 270, y2: 80, label: `${seed.tag} Node` }],
        dimensionTexts: [{ x: 200, y: 330, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, variant.aspect, 'Master Blueprint CAD', `${seed.year}`],
      downloadsCount: Math.floor(15000 + (index * 1340) % 95000)
    };

    megaList.push(item);
  }

  return megaList;
}

export function getMega7000BlueprintByIndex(i: number): BlueprintItem {
  const MEGA_SEEDS = [
    { name: 'SpaceX Raptor 3 Full-Flow Staged Combustion Rocket Turbopump', cat: 'Aerospace & Aeronautics', year: 2024, pat: 'US Pat. 11,920,400', inv: 'SpaceX Propulsion Engineering', tag: 'Raptor 3 Turbopump' },
    { name: 'NASA James Webb Space Telescope Secondary Mirror Deployment Tower', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 10,950,300', inv: 'Northrop Grumman & NASA Goddard', tag: 'JWST Tower' },
    { name: 'Boeing 787 Dreamliner Carbon Composite Wing-to-Body Joint Box', cat: 'Aerospace & Aeronautics', year: 2011, pat: 'US Pat. 8,250,100', inv: 'Boeing Commercial Airplanes', tag: 'B787 Wing Box' },
    { name: 'Lockheed F-35 Lightning II Shaft-Driven LiftFan Propulsion Assembly', cat: 'Aerospace & Aeronautics', year: 2015, pat: 'US Pat. 9,120,400', inv: 'Rolls-Royce & Lockheed Skunk Works', tag: 'F-35 LiftFan' },
    { name: 'Airbus A350 XWB Carbon Fiber Fuselage Barrel Frame Stabilizer Ring', cat: 'Aerospace & Aeronautics', year: 2013, pat: 'EP Pat. 2,650,200', inv: 'Airbus Operations Toulouse', tag: 'A350 Fuselage' },
    { name: 'General Electric GE90-115B Composite Fan Blade Dovetail Assembly', cat: 'Mechanical & Engines', year: 2004, pat: 'US Pat. 6,850,200', inv: 'GE Aviation Cincinnati', tag: 'GE90 Fan Blade' },
    { name: 'Rolls-Royce Trent XWB Dual-Shaft Intermediate Pressure Turbine', cat: 'Mechanical & Engines', year: 2014, pat: 'GB Pat. 2,510,300', inv: 'Rolls-Royce plc Derby', tag: 'Trent XWB Turbine' },
    { name: 'Wärtsilä-Sulzer RTA96-C 14-Cylinder Two-Stroke Diesel Engine Crankshaft', cat: 'Mechanical & Engines', year: 2006, pat: 'FI Pat. 118,200', inv: 'Wärtsilä Propulsion Labs', tag: 'Wärtsilä Crankshaft' },
    { name: 'Caterpillar C175-20 Quad-Turbocharged Mining Dump Truck Engine Block', cat: 'Mechanical & Engines', year: 2009, pat: 'US Pat. 7,950,100', inv: 'Caterpillar Engine Division', tag: 'Cat C175 Block' },
    { name: 'Burj Khalifa Mass Damper Piston Stabilizer Hydraulic Pressure Core', cat: 'Architecture & Mega-Structures', year: 2009, pat: 'US Pat. 8,150,400', inv: 'Skidmore, Owings & Merrill', tag: 'Burj Damper Core' },
    { name: 'Millau Viaduct Cable-Stayed Pylon Concrete Foundation Anchor Ring', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'FR Pat. 2,850,100', inv: 'Michel Virlogeux & Norman Foster', tag: 'Millau Foundation' },
    { name: 'Akashi Kaikyō Bridge Main Suspension Cable Strand Anchor Wedge', cat: 'Architecture & Mega-Structures', year: 1998, pat: 'JP Pat. 3,120,400', inv: 'Honshu-Shikoku Bridge Authority', tag: 'Akashi Cable Wedge' },
    { name: 'Gotthard Base Tunnel Sub-Mountain Boring Machine Cutterhead Disk', cat: 'Architecture & Mega-Structures', year: 2016, pat: 'CH Pat. 710,200', inv: 'Herrenknecht AG & AlpTransit', tag: 'Gotthard TBM Cutter' },
    { name: 'Apple M3 Max Chip 92-Billion Transistor Silicon Die Interposer', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,850,200', inv: 'Apple Silicon Design Team', tag: 'Apple M3 Interposer' },
    { name: 'NVIDIA GH200 Grace Hopper Superchip NVLink C2C Coherent Bridge', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,890,100', inv: 'NVIDIA Hardware Research', tag: 'GH200 NVLink' },
    { name: 'ASML Twinscan EXE:5000 High-NA EUV Anamorphic Projection Lens', cat: 'Computing & Cybernetics', year: 2024, pat: 'EP Pat. 3,950,100', inv: 'ASML Veldhoven & Carl Zeiss Optics', tag: 'ASML High-NA Lens' },
    { name: 'Quantum System Two Cryo-CMOS Superconducting Qubit Controller Interface', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,780,200', inv: 'IBM Quantum Systems Yorktown', tag: 'IBM Qubit Controller' },
    { name: 'Boston Dynamics Atlas Electric Robot Planetary Cycloidal Drive Hip Joint', cat: 'Robotics & Automation', year: 2024, pat: 'US Pat. 11,960,100', inv: 'Boston Dynamics Hardware Team', tag: 'Atlas Hip Drive' },
    { name: 'Tesla Cybercab Autonomous Steer-by-Wire Redundant Dual Servo Actuator', cat: 'Robotics & Automation', year: 2025, pat: 'US Pat. 11,990,100', inv: 'Tesla Autopilot & Steering Team', tag: 'Cybercab Servo' },
    { name: 'Intuitive Surgical da Vinci 5 Robot Instrument Wrist Cable Pulley Housing', cat: 'Robotics & Automation', year: 2024, pat: 'US Pat. 11,810,200', inv: 'Intuitive Surgical R&D', tag: 'da Vinci Wrist' },
    { name: 'Fanuc R-2000iC 6-Axis Industrial Robot Harmonic Drive Gearbox', cat: 'Robotics & Automation', year: 2018, pat: 'JP Pat. 6,450,100', inv: 'Fanuc Corp Yamanashi', tag: 'Fanuc Gearbox' },
    { name: 'ITER Tokamak Vacuum Vessel Double-Wall Superconducting D-Shaped Coil', cat: 'Energy & Quantum', year: 2022, pat: 'EP Pat. 3,750,100', inv: 'ITER Organization Cadarache', tag: 'ITER Magnet Coil' },
    { name: 'National Ignition Facility Laser Target Chamber Depleted Uranium Target Holder', cat: 'Energy & Quantum', year: 2022, pat: 'US Pat. 11,420,100', inv: 'Lawrence Livermore National Lab', tag: 'NIF Target Holder' },
    { name: 'Westinghouse AP1000 Passive Residual Heat Removal Heat Exchanger Matrix', cat: 'Energy & Quantum', year: 2012, pat: 'US Pat. 8,350,200', inv: 'Westinghouse Nuclear Energy', tag: 'AP1000 Matrix' },
    { name: 'Koenigsegg Gemera 2.0-Litter 3-Cylinder Freevalve Camless Cylinder Head', cat: 'Automotive & Transportation', year: 2021, pat: 'SE Pat. 542,300', inv: 'Freevalve AB & Christian von Koenigsegg', tag: 'Freevalve Head' },
    { name: 'Tesla Cybertruck Stainless Exoskeleton Laser Weld Stiffening Rib', cat: 'Automotive & Transportation', year: 2023, pat: 'US Pat. 11,750,100', inv: 'Tesla Vehicle Engineering', tag: 'Cybertruck Weld' },
    { name: 'Porsche Taycan 800V Hairpin Stator Winding Electric Drive Motor', cat: 'Automotive & Transportation', year: 2020, pat: 'DE Pat. 10,2019,200', inv: 'Porsche Powertrain Weissach', tag: 'Taycan Stator' },
    { name: 'Medtronic Micra Transcatheter Leadless Pacemaker Nitinol Tine Fixation', cat: 'Medical & Biotechnology', year: 2016, pat: 'US Pat. 9,450,200', inv: 'Medtronic Cardiac Rhythm', tag: 'Micra Pacemaker' },
    { name: 'Sequencing-by-Synthesis Zero-Mode Waveguide Microfluidic Flow Channel', cat: 'Medical & Biotechnology', year: 2021, pat: 'US Pat. 10,850,400', inv: 'Pacific Biosciences Menlo Park', tag: 'PacBio Waveguide' },
    { name: 'James Webb Space Telescope MIRI Cryocooler Pulse Tube Helium Loop', cat: 'Optics & Astronomy', year: 2021, pat: 'US Pat. 10,920,100', inv: 'JPL & Northrop Grumman Space', tag: 'JWST Cryocooler' },
    { name: 'Vera C. Rubin Observatory 3.2-Gigapixel Camera CCD Sensor Focal Array', cat: 'Optics & Astronomy', year: 2024, pat: 'US Pat. 11,910,200', inv: 'SLAC National Accelerator Lab', tag: 'Rubin Focal Array' },
    { name: 'Apple Vision Pro Dual Micro-OLED 23-Million Pixel Display Lens Module', cat: 'Consumer Technology', year: 2024, pat: 'US Pat. 11,880,100', inv: 'Apple Optics & Hardware Group', tag: 'Vision Pro Optics' },
    { name: 'Nintendo Switch OLED Custom Tegra X1 Processor Copper Vapor Chamber', cat: 'Consumer Technology', year: 2021, pat: 'JP Pat. 6,890,100', inv: 'Nintendo Hardware Development', tag: 'Switch Vapor Chamber' },
    { name: 'Orbital Ring Space Elevator Carbon Nanotube Tether Electromagnetic Climber', cat: 'To Be Built Concepts', year: 2045, pat: 'CONCEPT/2045/ORBITAL-RING', inv: 'International Aerospace Alliance', tag: 'Orbital Ring Climber' },
    { name: 'Fusion Direct Magnetic Acceleration Interstellar Rocket Drive Core', cat: 'To Be Built Concepts', year: 2060, pat: 'CONCEPT/2060/FUSION-DRIVE', inv: 'Breakthrough Starshot Engineering', tag: 'Starshot Drive Core' }
  ];

  const VARIANTS = [
    { suffix: 'Chassis Structural Enclosure Frame', aspect: 'Chassis Structural Frame' },
    { suffix: 'High-Precision Actuator Drive Shaft', aspect: 'Actuator Drive Shaft' },
    { suffix: 'Cryogenic Fluid Passages & Heat Exchanger', aspect: 'Cryogenic Heat Exchanger' },
    { suffix: 'Thermal Expansion Barrier Cushion', aspect: 'Thermal Expansion Barrier' },
    { suffix: 'High-Frequency Bus Connector Coupler', aspect: 'Bus Connector Coupler' },
    { suffix: 'Multi-Axis Optical Kinematic Mount Flexure', aspect: 'Kinematic Mount Flexure' },
    { suffix: 'Planetary Reduction Gear Teeth Array', aspect: 'Planetary Gear Array' },
    { suffix: 'Overpressure Diaphragm Release Valve', aspect: 'Diaphragm Release Valve' },
    { suffix: 'Vibration Dampening Viscous Shock Absorber', aspect: 'Viscous Shock Absorber' },
    { suffix: 'Electromagnetic Interference Suppressor Ring', aspect: 'EMI Suppressor Ring' },
    { suffix: 'Aerodynamic Variable Geometry Flow Vane', aspect: 'Variable Flow Vane' },
    { suffix: 'High-Torque Hydraulic Cylinder Piston Rod', aspect: 'Hydraulic Piston Rod' },
    { suffix: 'Sub-Micron Laser Alignment Sensor Block', aspect: 'Laser Alignment Sensor' },
    { suffix: 'Superconducting Magnetic Flux Containment Ring', aspect: 'Magnetic Flux Ring' },
    { suffix: 'Pneumatic Purge Valve Manifold Block', aspect: 'Purge Valve Manifold' },
    { suffix: 'Piezoelectric Micro-Adjustment Stage', aspect: 'Piezo Adjustment Stage' }
  ];

  const seed = MEGA_SEEDS[i % MEGA_SEEDS.length];
  const variant = VARIANTS[i % VARIANTS.length];
  const index = i + 1;
  const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2026;

  const seriesNumber = Math.floor(i / MEGA_SEEDS.length) + 1;
  const title = seriesNumber === 1 
    ? `${seed.name} - ${variant.suffix}`
    : `${seed.name} (${variant.aspect} - Series ${seriesNumber})`;

  const patentNumber = seriesNumber === 1 
    ? `${seed.pat}`
    : `${seed.pat}-M7K${index}`;

  return {
    id: `bp-m7k-${index}`,
    title: title,
    patentNumber: patentNumber,
    inventor: seed.inv,
    year: seed.year,
    category: seed.cat as BlueprintCategory,
    status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
    difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
    summary: `Master architectural & CAD blueprint specifications for the ${seed.name} (${variant.aspect}).`,
    description: `Official technical patent specification detailing structural clearances, material formulations, mechanical linkages, thermal limits, and stress tolerances for the ${seed.name} focusing on the ${variant.suffix.toLowerCase()}. Developed by ${seed.inv} (${seed.year}).`,
    historicalContext: `Preserved engineering document indexed in the global CAD vector archive. Reference series ${seed.tag}-7000-${index}.`,
    specifications: {
      'Technical Standard': `${seed.tag} Class ${1 + (index % 25)}`,
      'Design Tolerance': `±${(0.00005 + (index % 30) * 0.0001).toFixed(5)} mm`,
      'Operational Rating': `${100 + (index * 17) % 2500} Nominal Units`,
      'Thermal Maximum': `${250 + (index * 33) % 3200} °C`,
      'Total Mass': `${(0.8 + (index * 3.7) % 450).toFixed(2)} kg`,
      'Assembly Pass': `ISO-9001 / CAD-M7K Grade ${1 + (index % 5)}`
    },
    materials: [
      { partName: `${variant.aspect} Primary Frame`, material: 'High-Tensile Titanium-Inconel Matrix Substrate', quantity: '1 master unit', notes: 'Zero-expansion high-heat alloy' },
      { partName: 'Dynamic Linkage Joint', material: 'Hardened Tool Steel Nitride Plated', quantity: '4 sets', notes: 'Sub-micron friction resistant interface' }
    ],
    assemblySteps: [
      { stepNumber: 1, title: 'Frame Fixture & Alignment', instruction: `Secure ${seed.tag} structural chassis into high-precision optical laser jig.` },
      { stepNumber: 2, title: 'Sub-System Insertion', instruction: `Install ${variant.aspect.toLowerCase()} mechanical components and seal nitrogen purge channel.` },
      { stepNumber: 3, title: 'Tolerance Verification Sweep', instruction: 'Execute 360-degree dynamic sweep test to verify sub-micron thermal clearance.' }
    ],
    hotspots: [
      { id: `hs-m7k1-${index}`, x: 22 + (index % 55), y: 28 + (index % 40), partNumber: `CAD-${seed.tag}-${index}-A`, title: `${variant.aspect} Core Node`, description: `Primary mechanical node for ${seed.name}.`, material: 'Titanium-Inconel' },
      { id: `hs-m7k2-${index}`, x: 78 - (index % 45), y: 72 - (index % 35), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'Actuator Clearance Point', description: 'Tolerance critical high-load mounting interface.', material: 'Nitride Tool Steel' }
    ],
    svgLayers: {
      framePaths: [
        `M ${50 + (index % 20) * 2} ${50 + (index % 20) * 2} L ${350 - (index % 20) * 2} ${50 + (index % 20) * 2} L ${350 - (index % 20) * 2} ${310 - (index % 20) * 2} L ${50 + (index % 20) * 2} ${310 - (index % 20) * 2} Z`
      ],
      mechanicalPaths: [
        `M 90 140 L 310 260 M 310 140 L 90 260`,
        `M 200 200 m -${22 + (index % 18)} 0 a ${22 + (index % 18)} ${22 + (index % 18)} 0 1 0 ${44 + (index % 18) * 2} 0 a ${22 + (index % 18)} ${22 + (index % 18)} 0 1 0 -${44 + (index % 18) * 2} 0`
      ],
      electricalPaths: [`M 70 200 L 330 200`],
      annotationLines: [{ x1: 200, y1: 150, x2: 270, y2: 80, label: `${seed.tag} Node` }],
      dimensionTexts: [{ x: 200, y: 330, text: `PATENT YEAR: ${seed.year}` }]
    },
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: [seed.tag, seed.cat, variant.aspect, 'Master Blueprint CAD', `${seed.year}`],
    downloadsCount: Math.floor(15000 + (index * 1340) % 95000)
  };
}

