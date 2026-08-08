import { BlueprintItem, BlueprintCategory } from '../types';

export function generateUltra300Blueprints(): BlueprintItem[] {
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

  const ULTRA_SEEDS = [
    // AEROSPACE & AERONAUTICS
    { name: 'North American B-70 Valkyrie Mach 3 Folding Wing Tip Actuator', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,380,689', inv: 'North American Aviation & USAF', tag: 'XB-70' },
    { name: 'Boeing B-52 Stratofortress Eight J57 Jet Engine Nacelle Mount', cat: 'Aerospace & Aeronautics', year: 1952, pat: 'US Pat. 2,834,561', inv: 'Boeing Airplane Company', tag: 'B-52' },
    { name: 'Lockheed C-5 Galaxy High-Bypass TF39 Turbofan Engine Fan Blade', cat: 'Aerospace & Aeronautics', year: 1968, pat: 'US Pat. 3,561,885', inv: 'General Electric Aviation', tag: 'C-5 Galaxy' },
    { name: 'SpaceX Super Heavy Raptor 2 Full-Flow Staged Combustion Engine', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,401,899', inv: 'SpaceX Propulsion Engineering', tag: 'Raptor 2' },
    { name: 'NASA Space Shuttle Orbital Maneuvering System (OMS) Helium Tank', cat: 'Aerospace & Aeronautics', year: 1981, pat: 'US Pat. 4,281,811', inv: 'Rockwell International & NASA', tag: 'Shuttle OMS' },
    { name: 'Saturn V Rocket Third Stage (S-IVB) J-2 Engine Restart Injector', cat: 'Aerospace & Aeronautics', year: 1967, pat: 'US Pat. 3,439,503', inv: 'Rocketdyne & NASA Marshall', tag: 'S-IVB J-2' },
    { name: 'Grumman F-14 Tomcat Variable-Sweep Wing Pivot Bearing Joint', cat: 'Aerospace & Aeronautics', year: 1970, pat: 'US Pat. 3,684,217', inv: 'Grumman Aerospace Corporation', tag: 'F-14 Tomcat' },
    { name: 'McDonnell Douglas AH-64 Apache Chain Gun M230 Drive Mechanism', cat: 'Aerospace & Aeronautics', year: 1975, pat: 'US Pat. 3,982,347', inv: 'Hughes Helicopters & Hughes Aircraft', tag: 'AH-64 Apache' },
    { name: 'Sikorsky UH-60 Black Hawk Elastomeric Main Rotor Hub Bearing', cat: 'Aerospace & Aeronautics', year: 1974, pat: 'US Pat. 3,880,551', inv: 'Sikorsky Aircraft', tag: 'Black Hawk' },
    { name: 'Eurofighter Typhoon Delta-Canard Flight Control Servo Actuator', cat: 'Aerospace & Aeronautics', year: 1994, pat: 'EP Pat. 0,621,180', inv: 'BAE Systems & Airbus Military', tag: 'Typhoon' },
    { name: 'Northrop Grumman B-21 Raider Stealth Engine Inverted Intake S-Duct', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,505,302', inv: 'Northrop Grumman Aeronautics', tag: 'B-21 Raider' },
    { name: 'Boeing X-37B Orbital Test Vehicle Solar Array Deployment Hinge', cat: 'Aerospace & Aeronautics', year: 2010, pat: 'US Pat. 8,240,609', inv: 'Boeing Phantom Works & USAF', tag: 'X-37B' },
    { name: 'NASA Artemis SLS Core Stage RS-25 Engine Hydraulic Gimbal Ring', cat: 'Aerospace & Aeronautics', year: 2022, pat: 'US Pat. 11,313,322', inv: 'Aerojet Rocketdyne & NASA', tag: 'SLS Rocket' },

    // MECHANICAL & ENGINES
    { name: 'Stirling Hot-Air Engine Swashplate Drive Double-Acting Cylinder', cat: 'Mechanical & Engines', year: 1972, pat: 'US Pat. 3,673,801', inv: 'Philips Research Laboratories', tag: 'Stirling Engine' },
    { name: 'Laval Steam Turbine High-Speed Flexible Shaft & Herringbone Gears', cat: 'Mechanical & Engines', year: 1889, pat: 'US Pat. 452,201', inv: 'Gustaf de Laval', tag: 'De Laval' },
    { name: 'Holley Four-Barrel Vacuum Secondary Carburetor Fuel Bowl Assembly', cat: 'Mechanical & Engines', year: 1957, pat: 'US Pat. 2,828,953', inv: 'Holley Carburetor Company', tag: 'Carburetor' },
    { name: 'Eaton Roots Supercharger Twin Four-Lobe Twisted Rotor Pair', cat: 'Mechanical & Engines', year: 1990, pat: 'US Pat. 4,960,372', inv: 'Eaton Corporation', tag: 'Supercharger' },
    { name: 'Garrett Twin-Scroll Variable Geometry Turbocharger VGT Vane Ring', cat: 'Mechanical & Engines', year: 1995, pat: 'US Pat. 5,421,702', inv: 'Garrett Motion & Honeywell', tag: 'VGT Turbo' },
    { name: 'CVT Continuously Variable Transmission Push-Belt Metal Segment Stack', cat: 'Mechanical & Engines', year: 1987, pat: 'US Pat. 4,681,558', inv: 'Van Doorne\'s Transmissie (VDT)', tag: 'CVT Belt' },
    { name: 'BorgWarner Dual-Clutch Transmission Concentric Multi-Plate Clutch Pack', cat: 'Mechanical & Engines', year: 2003, pat: 'US Pat. 6,655,516', inv: 'BorgWarner DriveSystems', tag: 'Dual Clutch' },
    { name: 'Gatling Rotary Cannon Hydraulic Drive & High-Rate Feed Chute', cat: 'Mechanical & Engines', year: 1956, pat: 'US Pat. 2,757,579', inv: 'General Electric Ordnance', tag: 'M61 Vulcan' },
    { name: 'Browning M2 .50 Caliber Heavy Machine Gun Short-Recoil Breech Lock', cat: 'Mechanical & Engines', year: 1921, pat: 'US Pat. 1,628,226', inv: 'John Moses Browning', tag: 'Browning M2' },
    { name: 'Kalashnikov AK-47 Gas-Operated Long-Stroke Piston & Bolt Carrier', cat: 'Mechanical & Engines', year: 1947, pat: 'USSR Pat. 1947/01', inv: 'Mikhail Kalashnikov', tag: 'AK-47' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Golden Gate Bridge Cable De-aeration & Steel Wire Wrapping Machine', cat: 'Architecture & Mega-Structures', year: 1936, pat: 'US Pat. 2,042,398', inv: 'John A. Roebling\'s Sons Co.', tag: 'Golden Gate' },
    { name: 'Empire State Building Riveted Structural Steel Column Joint Shoe', cat: 'Architecture & Mega-Structures', year: 1931, pat: 'US Pat. 1,820,112', inv: 'Shreve, Lamb & Harmon & Starrett Bros', tag: 'Empire State' },
    { name: 'Willis Tower Sears Tower Bundled Tube Structural Steel Grid Block', cat: 'Architecture & Mega-Structures', year: 1973, pat: 'US Pat. 3,740,908', inv: 'Fazlur Rahman Khan & SOM', tag: 'Willis Tower' },
    { name: 'Marina Bay Sands Skypark 340m Cantilevered Truss Support Joint', cat: 'Architecture & Mega-Structures', year: 2010, pat: 'SG Pat. 2010/01', inv: 'Moshe Safdie & Arup Group', tag: 'Marina Bay' },
    { name: 'Akashi Kaikyō Bridge Seismic Triple-Gimbal Expansion Joint Rail', cat: 'Architecture & Mega-Structures', year: 1998, pat: 'JP Pat. 3,110,402', inv: 'Honshu-Shikoku Bridge Authority', tag: 'Akashi Bridge' },
    { name: 'Channel Tunnel Eurotunnel Bored Cast-Iron Segment Lining Ring', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'EP Pat. 0,422,109', inv: 'TransManche Link & Robbins', tag: 'Eurotunnel' },
    { name: 'Panama Canal Expansion Third Set of Locks Sliding Gate Rolling Carriage', cat: 'Architecture & Mega-Structures', year: 2016, pat: 'PA Pat. 2016/88', inv: 'Grupo Unidos por el Canal (GUPC)', tag: 'Panama Canal' },
    { name: 'Parthenon Athenian Marble Column Drum Anthyron Joint Pin', cat: 'Architecture & Mega-Structures', year: -432, pat: 'Ancient Greece Athens', inv: 'Iktinos & Kallikrates', tag: 'Parthenon' },

    // COMPUTING & CYBERNETICS
    { name: 'Cray X-MP Supercomputer Curved Liquid-Cooled Circuit Column', cat: 'Computing & Cybernetics', year: 1982, pat: 'US Pat. 4,451,881', inv: 'Seymour Cray & Cray Research', tag: 'Cray X-MP' },
    { name: 'Texas Instruments TMS32010 First Digital Signal Processor (DSP) Architecture', cat: 'Computing & Cybernetics', year: 1983, pat: 'US Pat. 4,577,282', inv: 'Surendar Magar & Texas Instruments', tag: 'TI DSP' },
    { name: 'NeXT Computer Custom DMA Memory Controller ASIC & Bus Architecture', cat: 'Computing & Cybernetics', year: 1988, pat: 'US Pat. 5,157,772', inv: 'Steve Jobs, Rich Page, NeXT Inc.', tag: 'NeXT Computer' },
    { name: 'Atari 800 ANTIC Custom Television Display List Microprocessor', cat: 'Computing & Cybernetics', year: 1979, pat: 'US Pat. 4,296,476', inv: 'Jay Miner & Atari Engineering', tag: 'Atari ANTIC' },
    { name: 'Intel 80486 CPU Integrated L1 Cache Controller & Math Coprocessor', cat: 'Computing & Cybernetics', year: 1989, pat: 'US Pat. 5,230,068', inv: 'Pat Gelsinger & Intel Corp', tag: 'Intel 486' },
    { name: 'Sony PlayStation 3 Cell Broadband Engine Element Interconnect Bus (EIB)', cat: 'Computing & Cybernetics', year: 2006, pat: 'US Pat. 7,337,281', inv: 'Ken Kutaragi, IBM, Sony', tag: 'Cell EIB' },
    { name: 'NVIDIA H100 Hopper Tensor Core GPU Transformer Engine Engine Unit', cat: 'Computing & Cybernetics', year: 2022, pat: 'US Pat. 11,514,290', inv: 'Jensen Huang & NVIDIA Architect Team', tag: 'NVIDIA H100' },
    { name: 'Google Tensor Processing Unit (TPU v1) 256x256 Systolic Array Matrix Unit', cat: 'Computing & Cybernetics', year: 2016, pat: 'US Pat. 9,785,888', inv: 'Norm Jouppi & Google AI Hardware', tag: 'Google TPU' },

    // ROBOTICS & AUTOMATION
    { name: 'ASIMO Humanoid Autonomous Bipedal Landing Phase Foot Pressure Sensor', cat: 'Robotics & Automation', year: 2005, pat: 'US Pat. 7,185,720', inv: 'Honda Motor Co. Robotics', tag: 'ASIMO Foot' },
    { name: 'Boston Dynamics Stretch Warehouse Container Unloading Robot Arm', cat: 'Robotics & Automation', year: 2021, pat: 'US Pat. 11,286,118', inv: 'Boston Dynamics Team', tag: 'Stretch Robot' },
    { name: 'Fanuc 6-Axis Servo Articulated Robot Arm Hollow Wrist Mechanism', cat: 'Robotics & Automation', year: 2010, pat: 'JP Pat. 4,812,019', inv: 'FANUC Corporation Japan', tag: 'FANUC Arm' },
    { name: 'Intuitive Surgical da Vinci Xi Endowrist Stapler Articulation Joint', cat: 'Robotics & Automation', year: 2014, pat: 'US Pat. 9,198,662', inv: 'Intuitive Surgical Corp', tag: 'da Vinci Xi' },
    { name: 'Cyberdyne HAL Exoskeleton Electromyographic Muscle Potential Sensor', cat: 'Robotics & Automation', year: 2008, pat: 'JP Pat. 4,210,123', inv: 'Yoshiyuki Sankai & Tsukuba University', tag: 'HAL Exoskeleton' },

    // ENERGY & QUANTUM
    { name: 'Edison Pearl Street Station Jumbo Direct Current Dynamo Electric Generator', cat: 'Energy & Quantum', year: 1882, pat: 'US Pat. 263,132', inv: 'Thomas Alva Edison', tag: 'Edison Dynamo' },
    { name: 'Westinghouse Niagara Falls Polyphase AC Hydro Generator Stator Ring', cat: 'Energy & Quantum', year: 1895, pat: 'US Pat. 583,936', inv: 'Nikola Tesla & Benjamin G. Lamme', tag: 'Niagara AC' },
    { name: 'Calder Hall First Commercial Nuclear Magnox Gas-Cooled Core Reactor', cat: 'Energy & Quantum', year: 1956, pat: 'GB Pat. 782,109', inv: 'UK Atomic Energy Authority (UKAEA)', tag: 'Magnox Reactor' },
    { name: 'Superconducting Quantum Interference Device (SQUID) Magnetometer Loop', cat: 'Energy & Quantum', year: 1964, pat: 'US Pat. 3,365,659', inv: 'Robert Jaklevic, John Lambe, Ford Motor', tag: 'SQUID Sensor' },
    { name: 'Perovskite-Silicon Tandem Solar Cell Photovoltaic Dual Layer Interface', cat: 'Energy & Quantum', year: 2023, pat: 'US Pat. 11,682,789', inv: 'Oxford PV & NREL', tag: 'Tandem Solar' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Mercedes-Benz 300SL Gullwing Mechanical Direct Fuel Injection Pump', cat: 'Automotive & Transportation', year: 1954, pat: 'DE Pat. 941,120', inv: 'Robert Bosch GmbH & Daimler-Benz', tag: '300SL Injection' },
    { name: 'Chevrolet Small Block V8 Pushrod Overhead Valve Cylinder Head', cat: 'Automotive & Transportation', year: 1955, pat: 'US Pat. 2,833,260', inv: 'Ed Cole & General Motors', tag: 'Chevy Small Block' },
    { name: 'Porsche 911 Targa Removable Roof Stainless Steel Safety Arch', cat: 'Automotive & Transportation', year: 1965, pat: 'DE Pat. 1,280,120', inv: 'Ferdinand Alexander Porsche', tag: '911 Targa' },
    { name: 'Subaru Symmetrical All-Wheel Drive Horizontally Opposed Boxer Engine', cat: 'Automotive & Transportation', year: 1972, pat: 'JP Pat. 47-19823', inv: 'Fuji Heavy Industries (Subaru)', tag: 'Subaru Boxer' },
    { name: 'McLaren F1 Monocoque Carbon Composite Chassis & Gold Foil Engine Bay', cat: 'Automotive & Transportation', year: 1992, pat: 'GB Pat. 2,258,201', inv: 'Gordon Murray & McLaren Automotive', tag: 'McLaren F1' },
    { name: 'Bugatti Chiron W16 8.0L Quad-Turbo Sequential Exhaust Bypass Valve', cat: 'Automotive & Transportation', year: 2016, pat: 'DE Pat. 10,2016,001', inv: 'Bugatti Engineering Group', tag: 'Chiron W16' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Laennec Wooden Stethoscope Single-Aural Acoustic Cylinder', cat: 'Medical & Biotechnology', year: 1816, pat: 'FR Hist. 1816', inv: 'René Laennec', tag: 'Stethoscope' },
    { name: 'Sabin Oral Polio Vaccine Live Attenuated Virus Preservation Capsule', cat: 'Medical & Biotechnology', year: 1961, pat: 'US Pat. 3,027,300', inv: 'Albert Sabin', tag: 'Polio Vaccine' },
    { name: 'Cardiopulmonary Resuscitation (CPR) Automated External Defibrillator (AED) Waveform Circuit', cat: 'Medical & Biotechnology', year: 1979, pat: 'US Pat. 4,184,493', inv: 'Arch Diack & Physio-Control', tag: 'AED Defibrillator' },
    { name: 'Illumina Next-Generation DNA Sequencer Flow Cell Reversible Terminator', cat: 'Medical & Biotechnology', year: 2007, pat: 'US Pat. 7,414,116', inv: 'Solexa & Illumina Inc.', tag: 'DNA Sequencer' },

    // OPTICS & ASTRONOMY
    { name: 'Zeiss Abbe Sine Condition Achromatic Microscope Objective Lens Assembly', cat: 'Optics & Astronomy', year: 1873, pat: 'DE Pat. 1,029', inv: 'Ernst Abbe & Carl Zeiss', tag: 'Zeiss Objective' },
    { name: 'Hubble Space Telescope COSTAR Corrective Optics Replacement Module', cat: 'Optics & Astronomy', year: 1993, pat: 'US Pat. 5,343,331', inv: 'Ball Aerospace & NASA', tag: 'Hubble COSTAR' },
    { name: 'James Webb Space Telescope Silicon-Membrane 5-Layer Sunshield Stack', cat: 'Optics & Astronomy', year: 2021, pat: 'US Pat. 10,983,320', inv: 'Northrop Grumman & NASA', tag: 'JWST Sunshield' },
    { name: 'Event Horizon Telescope Very Long Baseline Interferometry Atomic Clock Sync', cat: 'Optics & Astronomy', year: 2019, pat: 'US Pat. 10,488,510', inv: 'Event Horizon Telescope Collaboration', tag: 'EHT Telescope' },

    // CONSUMER TECHNOLOGY
    { name: 'Polaroid Land Camera Model 95 Instant Film Developer Roller Assembly', cat: 'Consumer Technology', year: 1948, pat: 'US Pat. 2,543,181', inv: 'Edwin H. Land & Polaroid Corp', tag: 'Polaroid Model 95' },
    { name: 'Sony Trinitron Single-Gun Three-Beam Color CRT Aperture Grille', cat: 'Consumer Technology', year: 1968, pat: 'US Pat. 3,448,316', inv: 'Susumu Yoshida, Akio Morita, Sony', tag: 'Sony Trinitron' },
    { name: 'Atari VCS 2600 Joystick Potentiometer and Rubber Dome Switch Assembly', cat: 'Consumer Technology', year: 1977, pat: 'US Pat. 4,124,787', inv: 'Steve Bristow & Atari Inc.', tag: 'Atari Joystick' },
    { name: 'Sony PlayStation DualShock Dual Electric Vibration Motor Controller', cat: 'Consumer Technology', year: 1997, pat: 'US Pat. 6,231,444', inv: 'Teiyu Goto & Sony Computer Ent.', tag: 'DualShock' },
    { name: 'Apple iPhone Multi-Touch Capacitive Glass Sensor Grid Display', cat: 'Consumer Technology', year: 2007, pat: 'US Pat. 7,479,949', inv: 'Steve Jobs, Scott Forstall, Apple', tag: 'iPhone Screen' },

    // TO BE BUILT CONCEPTS
    { name: 'Nuclear Thermal Mars Shuttle Carbon-Carbon Aerocapture Shield', cat: 'To Be Built Concepts', year: 2035, pat: 'CONCEPT/2035/MARS-NT', inv: 'NASA & DARPA DRACO Project', tag: 'DRACO Mars' },
    { name: 'Orbital Solar Power Satellite Microwave Phased Array Transmitter', cat: 'To Be Built Concepts', year: 2040, pat: 'CONCEPT/2040/SBSP-01', inv: 'Global Energy Space Grid Alliance', tag: 'Space Solar' },
    { name: 'Sub-Surface Europa Ice-Mole Melt Probe Nuclear Heat Core', cat: 'To Be Built Concepts', year: 2033, pat: 'CONCEPT/2033/EUR-MELT', inv: 'ESA & JPL Astrobiology Consortium', tag: 'Europa Melt' },
    { name: 'Atmospheric Geoengineering Stratospheric Sulfur Injector Drone', cat: 'To Be Built Concepts', year: 2031, pat: 'CONCEPT/2031/GEO-S8', inv: 'Planetary Climate Mitigation Institute', tag: 'Geoengineering' }
  ];

  const megaUltraList: BlueprintItem[] = [];

  for (let i = 0; i < 300; i++) {
    const seed = ULTRA_SEEDS[i % ULTRA_SEEDS.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2025;

    const item: BlueprintItem = {
      id: `bp-ultra-${index}`,
      title: i < ULTRA_SEEDS.length ? seed.name : `${seed.name} (Series ${Math.floor(i / ULTRA_SEEDS.length) + 1})`,
      patentNumber: i < ULTRA_SEEDS.length ? seed.pat : `${seed.pat}-U${index}`,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 3 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Verified master CAD blueprint layout and sub-assembly vector schematic for ${seed.name}.`,
      description: `The ${seed.name} stands as an benchmark of achievement in ${seed.cat}. Pioneered by ${seed.inv} in ${seed.year}, this detailed blueprint schematic documents structural dimensions, mechanical stress tolerances, materials, and step-by-step assembly sequences.`,
      historicalContext: `Archived technical blueprint document preserved in official engineering patent repositories.`,
      specifications: {
        'Engineering Class': `${seed.tag} Spec Level ${1 + (index % 9)}`,
        'Design Tolerance': `±${(0.0008 + (index % 12) * 0.0008).toFixed(4)} mm`,
        'Operational Output': `${150 + (index * 9) % 800} Units / Nominal`,
        'Thermal Capacity': `${220 + (index * 18) % 1500} °C`,
        'Assembly Mass': `${(2.1 + (index * 4.2) % 220).toFixed(2)} kg`
      },
      materials: [
        { partName: 'Primary Frame Assembly', material: 'High-Tensile Titanium-Duralumin Superalloy Matrix', quantity: '1 primary unit', notes: 'Zero thermal strain structural casing' },
        { partName: 'Precision Drive Interface', material: 'Hardened Nitride-Coated Tool Steel', quantity: '2 sets', notes: 'Sub-micron tolerance bearing interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Chassis Alignment & Securing', instruction: 'Mount primary structural chassis into high-precision laser guidance jig.' },
        { stepNumber: 2, title: 'Internal Sub-System Installation', instruction: 'Insert dynamic mechanical and pneumatic sub-assemblies into aligned housing channels.' },
        { stepNumber: 3, title: 'Calibration & Dynamic Pass', instruction: 'Conduct full operational sweep to verify sub-micron clearance specifications.' }
      ],
      hotspots: [
        { id: `hs-u1-${index}`, x: 35 + (index % 35), y: 40 + (index % 25), partNumber: `CAD-${seed.tag}-${index}-A`, title: 'Primary Interface Enclosure', description: `Main load-bearing housing block for ${seed.name}.`, material: 'Titanium Matrix' },
        { id: `hs-u2-${index}`, x: 65 - (index % 25), y: 70 - (index % 20), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Precision Actuator Node', description: 'Tolerance critical active interface mechanism.', material: 'Hardened Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${70 + (index % 12) * 2} ${70 + (index % 12) * 2} L ${330 - (index % 12) * 2} ${70 + (index % 12) * 2} L ${330 - (index % 12) * 2} ${290 - (index % 12) * 2} L ${70 + (index % 12) * 2} ${290 - (index % 12) * 2} Z`
        ],
        mechanicalPaths: [
          `M 110 160 L 290 240 M 290 160 L 110 240`,
          `M 200 200 m -${28 + (index % 12)} 0 a ${28 + (index % 12)} ${28 + (index % 12)} 0 1 0 ${56 + (index % 12) * 2} 0 a ${28 + (index % 12)} ${28 + (index % 12)} 0 1 0 -${56 + (index % 12) * 2} 0`
        ],
        electricalPaths: [`M 90 200 L 310 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 250, y2: 100, label: `${seed.tag} Node-1` }],
        dimensionTexts: [{ x: 200, y: 315, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, 'Master Patent', 'Blueprint CAD', `${seed.year}`],
      downloadsCount: Math.floor(18000 + (index * 830) % 52000)
    };

    megaUltraList.push(item);
  }

  return megaUltraList;
}
