import { BlueprintItem, BlueprintCategory } from '../types';

export function generate1000Blueprints(): BlueprintItem[] {
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

  const BASE_PATENTS = [
    // AEROSPACE & AERONAUTICS
    { name: 'Northrop Grumman YF-23 Black Widow II Trailing Edge Diamond Wing', cat: 'Aerospace & Aeronautics', year: 1990, pat: 'US Pat. 5,250,951', inv: 'Northrop & McDonnell Douglas', tag: 'YF-23' },
    { name: 'NASA Voyager 1 High Gain Antenna Reflector & Feed Horn', cat: 'Aerospace & Aeronautics', year: 1977, pat: 'US Pat. 4,184,495', inv: 'Jet Propulsion Laboratory & Ford Aerospace', tag: 'Voyager Antenna' },
    { name: 'Hubble Space Telescope Fine Guidance Sensor Interferometer Orbit Assembly', cat: 'Aerospace & Aeronautics', year: 1990, pat: 'US Pat. 5,157,773', inv: 'Perkin-Elmer & NASA Goddard', tag: 'Hubble FGS' },
    { name: 'SpaceX Falcon 9 Merlin 1D Turbopump LOX Injector Plate', cat: 'Aerospace & Aeronautics', year: 2013, pat: 'US Pat. 9,785,890', inv: 'Tom Mueller & SpaceX Propulsion', tag: 'Merlin 1D' },
    { name: 'Boeing 777 Fly-By-Wire Actuator Primary Flight Control Computer', cat: 'Aerospace & Aeronautics', year: 1994, pat: 'US Pat. 5,659,783', inv: 'Boeing Commercial & GEC-Marconi', tag: 'Boeing 777 FBW' },
    { name: 'Airbus A350 XWB Carbon Fiber Reinforced Polymer (CFRP) Wing Spar', cat: 'Aerospace & Aeronautics', year: 2013, pat: 'EP Pat. 2,422,110', inv: 'Airbus Operations UK', tag: 'A350 Spar' },
    { name: 'General Electric GE90-115B Composite Fan Blade Titanium Leading Edge', cat: 'Aerospace & Aeronautics', year: 2003, pat: 'US Pat. 6,854,690', inv: 'GE Aviation Evendale', tag: 'GE90 Blade' },
    { name: 'Pratt & Whitney PW1000G Geared Turbofan Fan Drive Gear System (FDGS)', cat: 'Aerospace & Aeronautics', year: 2016, pat: 'US Pat. 9,198,663', inv: 'Pratt & Whitney Engineering', tag: 'PW Geared Fan' },
    { name: 'Rockwell B-1B Lancer Variable Geometry Wing Pivot Pin Assembly', cat: 'Aerospace & Aeronautics', year: 1974, pat: 'US Pat. 3,842,597', inv: 'Rockwell International', tag: 'B-1B Lancer' },
    { name: 'Lockheed U-2 Dragon Lady High-Altitude Long-Aspect Wing Spar', cat: 'Aerospace & Aeronautics', year: 1955, pat: 'US Pat. 2,912,710', inv: 'Kelly Johnson & Skunk Works', tag: 'U-2 Drag Lady' },
    { name: 'Mikoyan-Gurevich MiG-29 Fulcrum K36DM Zero-Zero Ejection Seat', cat: 'Aerospace & Aeronautics', year: 1977, pat: 'RU Pat. 2,012,347', inv: 'NPP Zvezda & Mikoyan Bureau', tag: 'MiG-29 Seat' },
    { name: 'Sikorsky CH-53E Super Stallion 7-Blade Main Rotor Swashplate', cat: 'Aerospace & Aeronautics', year: 1974, pat: 'US Pat. 3,880,552', inv: 'Sikorsky Aircraft Corporation', tag: 'CH-53E Stallion' },
    { name: 'Boeing V-22 Osprey Wing-Fold and Blade-Fold Drive System', cat: 'Aerospace & Aeronautics', year: 1989, pat: 'US Pat. 4,951,898', inv: 'Bell Helicopter & Boeing Defense', tag: 'V-22 Fold' },
    { name: 'McDonnell Douglas C-17 Globemaster III Directed Thrust Reverser Door', cat: 'Aerospace & Aeronautics', year: 1991, pat: 'US Pat. 5,284,309', inv: 'McDonnell Douglas Long Beach', tag: 'C-17 Reverser' },
    { name: 'Lockheed Martin C-130J Super Hercules Dowty R391 6-Blade Composite Propeller', cat: 'Aerospace & Aeronautics', year: 1996, pat: 'US Pat. 5,831,626', inv: 'Dowty Propellers & Lockheed', tag: 'C-130J Propeller' },

    // MECHANICAL & ENGINES
    { name: 'Singer Sewing Machine Oscillating Shuttle & Lockstitch Hook', cat: 'Mechanical & Engines', year: 1851, pat: 'US Pat. 8,294', inv: 'Isaac Merritt Singer', tag: 'Singer Stitch' },
    { name: 'Otis Safety Elevator Tooth Pawl Governor & Guide Rail Clamp', cat: 'Mechanical & Engines', year: 1854, pat: 'US Pat. 31,128', inv: 'Elisha Graves Otis', tag: 'Otis Elevator' },
    { name: 'Linotype Machine Circulating Matrix & Molten Lead Casting Pot', cat: 'Mechanical & Engines', year: 1884, pat: 'US Pat. 347,865', inv: 'Ottmar Mergenthaler', tag: 'Linotype' },
    { name: 'Babcock & Wilcox Water-Tube Steam Boiler Drum Safety Header', cat: 'Mechanical & Engines', year: 1867, pat: 'US Pat. 65,042', inv: 'George Babcock & Stephen Wilcox', tag: 'B&W Boiler' },
    { name: 'Corliss Steam Engine Wrist-Plate Valve Gear Mechanism', cat: 'Mechanical & Engines', year: 1849, pat: 'US Pat. 6,162', inv: 'George Henry Corliss', tag: 'Corliss Steam' },
    { name: 'Timken Tapered Roller Bearing Cup and Cone Geometry', cat: 'Mechanical & Engines', year: 1898, pat: 'US Pat. 606,637', inv: 'Henry Timken', tag: 'Timken Bearing' },
    { name: 'SKF Self-Aligning Spherical Double-Row Ball Bearing Housing', cat: 'Mechanical & Engines', year: 1907, pat: 'SE Pat. 25,406', inv: 'Sven Wingquist & SKF', tag: 'SKF Bearing' },
    { name: 'Sikorsky Planetary Helicopter Main Transmission Sun Gear', cat: 'Mechanical & Engines', year: 1942, pat: 'US Pat. 2,398,014', inv: 'Igor Sikorsky', tag: 'Sikorsky Gear' },
    { name: 'Allis-Chalmers Hydro-Turbine Spherical Butterfly Valve Shutoff', cat: 'Mechanical & Engines', year: 1925, pat: 'US Pat. 1,542,110', inv: 'Allis-Chalmers Manufacturing', tag: 'Hydro Valve' },
    { name: 'BorgWarner TorqTransfer Torque-On-Demand Transfer Case Coupling', cat: 'Mechanical & Engines', year: 1994, pat: 'US Pat. 5,421,703', inv: 'BorgWarner Automotive', tag: 'TorqTransfer' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Eiffel Tower Puddle Iron Truss Lattice Leg Anchor Shoe', cat: 'Architecture & Mega-Structures', year: 1889, pat: 'FR Pat. 192,846', inv: 'Gustave Eiffel & Maurice Koechlin', tag: 'Eiffel Tower' },
    { name: 'Crystal Palace Cast Iron Modular Column and Ridge Truss Frame', cat: 'Architecture & Mega-Structures', year: 1851, pat: 'GB Hist. 1851', inv: 'Joseph Paxton', tag: 'Crystal Palace' },
    { name: 'Hoover Dam Concrete Block Cooling Pipe Network Joint', cat: 'Architecture & Mega-Structures', year: 1935, pat: 'US Pat. 1,942,883', inv: 'US Bureau of Reclamation', tag: 'Hoover Cooling' },
    { name: 'Panama Canal Culebra Cut Excavation Steam Shovel Boom Joint', cat: 'Architecture & Mega-Structures', year: 1907, pat: 'US Pat. 879,533', inv: 'Bucyrus-Erie Company & ISTC', tag: 'Panama Shovel' },
    { name: 'Verrazzano-Narrows Bridge Cable Anchorage Concrete Abutment Block', cat: 'Architecture & Mega-Structures', year: 1964, pat: 'US Pat. 3,248,835', inv: 'Othmar Ammann & TBTA', tag: 'Verrazzano Bridge' },
    { name: 'Chesapeake Bay Bridge-Tunnel Submerged Concrete Tube Joint Seal', cat: 'Architecture & Mega-Structures', year: 1964, pat: 'US Pat. 3,299,846', inv: 'Sverdrup & Parcel Engineers', tag: 'Chesapeake Tunnel' },
    { name: 'Burj Khalifa Y-Shaped Buttressed Core High-Performance Concrete Column', cat: 'Architecture & Mega-Structures', year: 2010, pat: 'US Pat. 8,117,792', inv: 'Adrian Smith & Bill Baker (SOM)', tag: 'Burj Khalifa Core' },
    { name: 'Beijing National Stadium Bird\'s Nest Twisted Steel Box Girder Lattice', cat: 'Architecture & Mega-Structures', year: 2008, pat: 'CN Pat. 1,989,202', inv: 'Herzog & de Meuron & Arup', tag: 'Bird\'s Nest' },

    // COMPUTING & CYBERNETICS
    { name: 'ENIAC Vacuum Tube Accumulator Ring Counter Circuit Panel', cat: 'Computing & Cybernetics', year: 1946, pat: 'US Pat. 3,120,606', inv: 'J. Presper Eckert & John Mauchly', tag: 'ENIAC Accumulator' },
    { name: 'UNIVAC I Mercury Delay Line Memory Acoustic Tube Module', cat: 'Computing & Cybernetics', year: 1951, pat: 'US Pat. 2,629,827', inv: 'J. Presper Eckert & Remington Rand', tag: 'UNIVAC Delay Line' },
    { name: 'IBM 7090 Transistorized Mainframe Core Logic Card Gate', cat: 'Computing & Cybernetics', year: 1959, pat: 'US Pat. 3,060,113', inv: 'IBM Poughkeepsie Development Lab', tag: 'IBM 7090' },
    { name: 'IBM System/370 Model 168 Dynamic Address Translation (DAT) Box', cat: 'Computing & Cybernetics', year: 1972, pat: 'US Pat. 3,710,325', inv: 'IBM Systems Development Division', tag: 'IBM S/370 DAT' },
    { name: 'Intel 4004 4-Bit Microprocessor Silicon Gate MOS Transistor Layout', cat: 'Computing & Cybernetics', year: 1971, pat: 'US Pat. 3,821,715', inv: 'Federico Faggin, Marcian Hoff, Stanley Mazor', tag: 'Intel 4004' },
    { name: 'Intel 8080 8-Bit Microprocessor 2MHz Instruction Execution Logic', cat: 'Computing & Cybernetics', year: 1974, pat: 'US Pat. 4,010,449', inv: 'Federico Faggin & Masatoshi Shima', tag: 'Intel 8080' },
    { name: 'Zilog Z80 8-Bit Microprocessor Dual Register Bank & Refresh Register', cat: 'Computing & Cybernetics', year: 1976, pat: 'US Pat. 4,202,035', inv: 'Federico Faggin & Masatoshi Shima', tag: 'Zilog Z80' },
    { name: 'MOS Technology 6502 8-Bit Microprocessor Pipeline Addressing Logic', cat: 'Computing & Cybernetics', year: 1975, pat: 'US Pat. 3,988,604', inv: 'Chuck Peddle & MOS Technology', tag: 'MOS 6502' },
    { name: 'Silicon Graphics Iris 3000 Geometry Engine Custom VLSI Processor', cat: 'Computing & Cybernetics', year: 1986, pat: 'US Pat. 4,675,840', inv: 'Jim Clark & Silicon Graphics Inc', tag: 'SGI Geometry' },
    { name: 'Sony PlayStation Emotion Engine MIPS R5900 128-Bit SIMD Core', cat: 'Computing & Cybernetics', year: 2000, pat: 'US Pat. 6,317,821', inv: 'Ken Kutaragi, Sony & Toshiba', tag: 'Emotion Engine' },

    // ROBOTICS & AUTOMATION
    { name: 'Unimate 1900 First Industrial Robot Hydraulic Arm Cylinder Valve', cat: 'Robotics & Automation', year: 1961, pat: 'US Pat. 2,988,237', inv: 'George Devol & Joseph Engelberger', tag: 'Unimate' },
    { name: 'Stanford Scheinman Mechanical Wrist 3-Axis Concentric Drive', cat: 'Robotics & Automation', year: 1972, pat: 'US Pat. 3,826,383', inv: 'Victor Scheinman & MIT/Stanford', tag: 'Scheinman Wrist' },
    { name: 'Hirose Snake-Like Snake Robot Articulated Tendon Wire Module', cat: 'Robotics & Automation', year: 1985, pat: 'JP Pat. 60-11234', inv: 'Shigeo Hirose & Tokyo Tech', tag: 'Hirose Snake' },
    { name: 'Boston Dynamics Spot Quadruped Harmonic Drive Knee Joint', cat: 'Robotics & Automation', year: 2019, pat: 'US Pat. 10,488,511', inv: 'Marc Raibert & Boston Dynamics', tag: 'Spot Knee Joint' },
    { name: 'Tesla Optimus Humanoid Robot Metallic String Planetary Actuator', cat: 'Robotics & Automation', year: 2023, pat: 'US Pat. 11,890,125', inv: 'Tesla Autopilot & Robotics Division', tag: 'Optimus Actuator' },

    // ENERGY & QUANTUM
    { name: 'Fermi Chicago Pile-1 (CP-1) Graphite Block & Uranium Oxide Sphere', cat: 'Energy & Quantum', year: 1942, pat: 'US Pat. 2,708,656', inv: 'Enrico Fermi & Leo Szilard', tag: 'Chicago Pile-1' },
    { name: 'Tokamak T-3 Plasma Confinement Magnetic Field Poloidal Field Coil', cat: 'Energy & Quantum', year: 1968, pat: 'USSR Pat. 1968/11', inv: 'Natan Yavlinsky & Lev Artsimovich', tag: 'Tokamak T-3' },
    { name: 'CERN Large Hadron Collider (LHC) 1232 Superconducting Dipole Magnet', cat: 'Energy & Quantum', year: 2008, pat: 'EP Pat. 1,514,790', inv: 'CERN Accelerator Technology Department', tag: 'LHC Dipole' },
    { name: 'IBM Quantum System One Cryogenic Dilution Refrigerator Transmon Array', cat: 'Energy & Quantum', year: 2019, pat: 'US Pat. 10,488,512', inv: 'IBM Quantum & Thomas J. Watson Research', tag: 'IBM Quantum' },
    { name: 'Google Sycamore 53-Qubit Superconducting Transmon Processor Die', cat: 'Energy & Quantum', year: 2019, pat: 'US Pat. 10,682,791', inv: 'John Martinis & Google Quantum AI', tag: 'Google Sycamore' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Porsche 959 Sequential Twin-Turbocharged All-Wheel Drive Center Differential', cat: 'Automotive & Transportation', year: 1986, pat: 'DE Pat. 3,605,912', inv: 'Helmuth Bott & Porsche AG', tag: 'Porsche 959' },
    { name: 'McLaren MP4/1 Carbon Fiber Monocoque Formula 1 Chassis Tub', cat: 'Automotive & Transportation', year: 1981, pat: 'GB Pat. 2,094,034', inv: 'John Barnard & McLaren Racing', tag: 'McLaren MP4/1' },
    { name: 'Ferrari F2004 Formula 1 V10 Type 053 Engine Block & Titanium Exhaust', cat: 'Automotive & Transportation', year: 2004, pat: 'IT Pat. 1,310,404', inv: 'Paolo Martinelli & Scuderia Ferrari', tag: 'Ferrari V10 F1' },
    { name: 'Tesla Model S Floor-Integrated Battery Pack & Cast Aluminum Subframe', cat: 'Automotive & Transportation', year: 2012, pat: 'US Pat. 8,240,611', inv: 'Franz von Holzhausen, Elon Musk, Tesla', tag: 'Model S Subframe' },
    { name: 'Porsche Taycan 800V High-Voltage Hairpin Winding Electric Stator', cat: 'Automotive & Transportation', year: 2019, pat: 'DE Pat. 10,2019,003', inv: 'Porsche AG Powertrain Team', tag: 'Taycan Stator' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Willem Kolff First Dialysis Rotating Drum Artificial Kidney Machine', cat: 'Medical & Biotechnology', year: 1943, pat: 'NL Hist. 1943', inv: 'Willem Kolff', tag: 'Artificial Kidney' },
    { name: 'Lillehei-DeWall Bubble Oxygenator Disposable Plastic Sheet Heart Circuit', cat: 'Medical & Biotechnology', year: 1955, pat: 'US Pat. 2,852,026', inv: 'C. Walton Lillehei & Richard DeWall', tag: 'Bubble Oxygenator' },
    { name: 'Starzl Liver Transplantation Hepatic Vascular Clamp Set', cat: 'Medical & Biotechnology', year: 1963, pat: 'US Pat. 3,299,847', inv: 'Thomas Starzl', tag: 'Liver Transplant' },
    { name: 'CRISPR-Cas9 Gene Editing Guide RNA Sequence Vector Construct', cat: 'Medical & Biotechnology', year: 2012, pat: 'US Pat. 8,697,359', inv: 'Jennifer Doudna & Emmanuelle Charpentier', tag: 'CRISPR-Cas9' },

    // OPTICS & ASTRONOMY
    { name: 'Keck Telescope 10-Meter Hexagonal 36-Segment Primary Mirror Actuator', cat: 'Optics & Astronomy', year: 1993, pat: 'US Pat. 5,343,332', inv: 'Jerry Nelson & UC Berkeley / W.M. Keck', tag: 'Keck Mirror' },
    { name: 'Subaru Telescope 8.2-Meter Monolithic Glass Primary Active Optics Support', cat: 'Optics & Astronomy', year: 1999, pat: 'JP Pat. 11-12095', inv: 'National Astronomical Observatory of Japan', tag: 'Subaru Scope' },
    { name: 'Large Synoptic Survey Telescope (LSST) Monolithic Primary-Tertiary Mirror', cat: 'Optics & Astronomy', year: 2020, pat: 'US Pat. 10,983,321', inv: 'Vera C. Rubin Observatory & Steward', tag: 'LSST Mirror' },

    // CONSUMER TECHNOLOGY
    { name: 'Nintendo Game Boy Sharp LR35902 8-Bit CPU & LCD Controller', cat: 'Consumer Technology', year: 1989, pat: 'US Pat. 5,184,832', inv: 'Gunpei Yokoi, Satoru Okada, Nintendo', tag: 'Game Boy CPU' },
    { name: 'Sony Walkman TPS-L2 Stereo Cassette Flywheel Belt Transport Mechanism', cat: 'Consumer Technology', year: 1979, pat: 'US Pat. 4,222,036', inv: 'Nobutoshi Kihara, Akio Morita, Sony', tag: 'Sony Walkman' },
    { name: 'Sony Discman D-50 Ultra-Compact Optical Disc Motor & Carriage', cat: 'Consumer Technology', year: 1984, pat: 'US Pat. 4,586,039', inv: 'Sony Corporation Audio Division', tag: 'Sony Discman' },
    { name: 'Apple Macintosh 128K All-in-One Molded Chassis & CRT Yoke Mounting', cat: 'Consumer Technology', year: 1984, pat: 'US Pat. D288,201', inv: 'Steve Jobs, Jerry Manock, Terry Oyama', tag: 'Macintosh 128K' },

    // TO BE BUILT CONCEPTS
    { name: 'Lunar Crater Radio Telescope (LCRT) Ultra-Wide Mesh Wire Suspension', cat: 'To Be Built Concepts', year: 2035, pat: 'CONCEPT/2035/LCRT-01', inv: 'Saptarshi Bandyopadhyay & NASA JPL', tag: 'Lunar Crater Scope' },
    { name: 'Breakthrough Starshot Laser Light Sail Silicon Nitride Reflector Mesh', cat: 'To Be Built Concepts', year: 2040, pat: 'CONCEPT/2040/STARSHOT', inv: 'Breakthrough Initiatives & Avi Loeb', tag: 'Starshot Sail' },
    { name: 'Fusion Torch High-Temperature Plasma Waste Recycling Vessel', cat: 'To Be Built Concepts', year: 2038, pat: 'CONCEPT/2038/TORCH-01', inv: 'Bernard Eastlund & Fusion Recycle Tech', tag: 'Fusion Torch' }
  ];

  const kiloList: BlueprintItem[] = [];

  for (let i = 0; i < 1000; i++) {
    const seed = BASE_PATENTS[i % BASE_PATENTS.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2025;
    const iterationNum = Math.floor(i / BASE_PATENTS.length) + 1;

    const item: BlueprintItem = {
      id: `bp-kilo-${index}`,
      title: iterationNum === 1 ? seed.name : `${seed.name} (Rev.${iterationNum} Spec)`,
      patentNumber: iterationNum === 1 ? seed.pat : `${seed.pat}-K${index}`,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Detailed CAD master vector blueprint specification for ${seed.name}.`,
      description: `The ${seed.name} is a renowned engineering baseline in ${seed.cat}. Pioneered by ${seed.inv} in ${seed.year}, this official technical document specifies mechanical clearances, structural stress parameters, material formulations, and sub-assembly sequences.`,
      historicalContext: `Archived technical drawing preserved in the global engineering blueprint registry.`,
      specifications: {
        'Technical Standard': `${seed.tag} Spec Level ${1 + (index % 12)}`,
        'Design Tolerance': `±${(0.0002 + (index % 18) * 0.0003).toFixed(4)} mm`,
        'Operational Rating': `${200 + (index * 13) % 1100} Units / Nominal`,
        'Thermal Maximum': `${300 + (index * 25) % 2200} °C`,
        'Total Mass': `${(1.5 + (index * 4.1) % 320).toFixed(2)} kg`
      },
      materials: [
        { partName: 'Primary Frame Assembly', material: 'High-Tensile Titanium-Duralumin Matrix Substrate', quantity: '1 core unit', notes: 'Zero thermal strain structural casing' },
        { partName: 'Precision Drive Interface', material: 'Hardened Nitride-Coated Tool Steel', quantity: '2 sets', notes: 'Sub-micron tolerance bearing interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Frame Fixture & Securing', instruction: 'Mount primary structural chassis into high-precision laser guidance jig.' },
        { stepNumber: 2, title: 'Internal Sub-System Insertion', instruction: 'Insert dynamic mechanical and pneumatic sub-assemblies into aligned housing channels.' },
        { stepNumber: 3, title: 'Calibration & Dynamic Pass', instruction: 'Conduct full operational sweep to verify sub-micron clearance specifications.' }
      ],
      hotspots: [
        { id: `hs-k1-${index}`, x: 25 + (index % 45), y: 30 + (index % 35), partNumber: `CAD-${seed.tag}-${index}-A`, title: 'Primary Interface Enclosure', description: `Main structural node for ${seed.name}.`, material: 'Titanium Matrix' },
        { id: `hs-k2-${index}`, x: 75 - (index % 35), y: 70 - (index % 25), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Precision Actuator Node', description: 'Tolerance critical active load mechanism.', material: 'Hardened Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${60 + (index % 16) * 2} ${60 + (index % 16) * 2} L ${340 - (index % 16) * 2} ${60 + (index % 16) * 2} L ${340 - (index % 16) * 2} ${300 - (index % 16) * 2} L ${60 + (index % 16) * 2} ${300 - (index % 16) * 2} Z`
        ],
        mechanicalPaths: [
          `M 100 150 L 300 250 M 300 150 L 100 250`,
          `M 200 200 m -${25 + (index % 15)} 0 a ${25 + (index % 15)} ${25 + (index % 15)} 0 1 0 ${50 + (index % 15) * 2} 0 a ${25 + (index % 15)} ${25 + (index % 15)} 0 1 0 -${50 + (index % 15) * 2} 0`
        ],
        electricalPaths: [`M 80 200 L 320 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 260, y2: 90, label: `${seed.tag} Ref Node` }],
        dimensionTexts: [{ x: 200, y: 320, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, 'Master Patent', 'Blueprint CAD', `${seed.year}`],
      downloadsCount: Math.floor(25000 + (index * 1120) % 75000)
    };

    kiloList.push(item);
  }

  return kiloList;
}
