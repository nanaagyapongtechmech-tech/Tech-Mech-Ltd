import { BlueprintItem, BlueprintCategory } from '../types';

export function generate300Blueprints(): BlueprintItem[] {
  const categories: BlueprintCategory[] = [
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

  const LIST_300_SEEDS = [
    // AEROSPACE & AERONAUTICS
    { name: 'X-15 Hypersonic Rocket Plane Titanium Armor Skin', cat: 'Aerospace & Aeronautics', year: 1959, pat: 'US Pat. 3,143,321', inv: 'North American Aviation & NASA', tag: 'X-15' },
    { name: 'SpaceX Starship Stainless Steel 304L Heat Ring Assembly', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 11,215,150', inv: 'SpaceX Propulsion Team', tag: 'Starship' },
    { name: 'Boeing 787 Dreamliner Carbon-Fiber Composite Fuselage Barrel', cat: 'Aerospace & Aeronautics', year: 2009, pat: 'US Pat. 7,837,147', inv: 'Boeing Commercial Airplanes', tag: 'Dreamliner' },
    { name: 'Airbus A380 Double-Deck Wing Box Carbon Reinforcement', cat: 'Aerospace & Aeronautics', year: 2005, pat: 'EP Pat. 1,514,789', inv: 'Airbus Operations SAS', tag: 'Airbus A380' },
    { name: 'Lockheed Martin F-22 Raptor Vectoring Exhaust Nozzle Flap', cat: 'Aerospace & Aeronautics', year: 1997, pat: 'US Pat. 5,683,035', inv: 'Lockheed Skunk Works', tag: 'F-22 Raptor' },
    { name: 'F-35 Lightning II LiftFan Shaft Driven Counter-Rotating Fan', cat: 'Aerospace & Aeronautics', year: 2006, pat: 'US Pat. 6,382,560', inv: 'Rolls-Royce & Pratt & Whitney', tag: 'F-35 VTOL' },
    { name: 'Lockheed SR-71 Pratt & Whitney J58 Afterburner Fuel Spray Ring', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,344,607', inv: 'Pratt & Whitney', tag: 'SR-71 J58' },
    { name: 'V-2 Rocket Turbopump Hydrogen Peroxide Steam Generator', cat: 'Aerospace & Aeronautics', year: 1942, pat: 'DE Pat. 748,201', inv: 'Wernher von Braun & Walter Thiel', tag: 'V-2 Rocket' },
    { name: 'Messerschmitt Me 163 Komet Rocket Fighter HWK 109-509 Engine', cat: 'Aerospace & Aeronautics', year: 1944, pat: 'DE Pat. 760,112', inv: 'Hellmuth Walter', tag: 'Komet' },
    { name: 'Apollo Lunar Module Descent Propulsion System (LM-DPS) Injector', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'US Pat. 3,572,032', inv: 'TRW & NASA Grumman', tag: 'Apollo LM' },
    { name: 'Space Shuttle Solid Rocket Booster (SRB) Field Joint O-Ring Segment', cat: 'Aerospace & Aeronautics', year: 1981, pat: 'US Pat. 4,185,558', inv: 'Morton Thiokol & NASA', tag: 'Shuttle SRB' },
    { name: 'SpaceX Falcon 9 Grid Fin Titanium Cold-Gas Thruster Bay', cat: 'Aerospace & Aeronautics', year: 2017, pat: 'US Pat. 10,112,725', inv: 'Elon Musk & SpaceX', tag: 'Falcon 9' },
    { name: 'NASA Voyager Radiothermal Thermoelectric Generator (RTG) Plutonium Capsule', cat: 'Aerospace & Aeronautics', year: 1977, pat: 'US Pat. 4,028,138', inv: 'General Electric & US DOE', tag: 'RTG Voyager' },
    { name: 'Cassini-Huygens Titan Probe Aeroshell Heat Shield Segment', cat: 'Aerospace & Aeronautics', year: 1997, pat: 'US Pat. 6,119,985', inv: 'NASA JPL & ESA', tag: 'Cassini' },
    { name: 'Solar Impulse 2 Ultra-Light Carbon Fiber Wing & Solar Array', cat: 'Aerospace & Aeronautics', year: 2015, pat: 'CH Pat. 708,212', inv: 'Bertrand Piccard & André Borschberg', tag: 'Solar Aircraft' },
    { name: 'Virgin Galactic SpaceShipTwo Hybrid Rocket Motor Combustion Chamber', cat: 'Aerospace & Aeronautics', year: 2013, pat: 'US Pat. 8,656,707', inv: 'Burt Rutan & Scaled Composites', tag: 'SpaceShipTwo' },
    { name: 'B-2 Spirit Stealth Bomber Radar-Absorbing Serrated Trailing Edge', cat: 'Aerospace & Aeronautics', year: 1989, pat: 'US Pat. 5,250,950', inv: 'Northrop Grumman', tag: 'B-2 Bomber' },
    { name: 'Aérospatiale Alouette III Turbomeca Artouste Gas Turbine Shaft', cat: 'Aerospace & Aeronautics', year: 1961, pat: 'FR Pat. 1,250,911', inv: 'Turbomeca & Sud Aviation', tag: 'Helicopter Turbine' },
    { name: 'Kamov Ka-50 Black Shark Coaxial Rotor Head Hub Assembly', cat: 'Aerospace & Aeronautics', year: 1982, pat: 'RU Pat. 2,012,345', inv: 'Kamov Design Bureau', tag: 'Coaxial Rotor' },
    { name: 'Bell V-22 Osprey Tiltrotor Wing Proprotor Gearbox Transmission', cat: 'Aerospace & Aeronautics', year: 1989, pat: 'US Pat. 4,951,897', inv: 'Bell Helicopter & Boeing', tag: 'V-22 Osprey' },
    { name: 'Cessna 172 Skyhawk Strut-Braced High-Wing Aluminum Spar', cat: 'Aerospace & Aeronautics', year: 1956, pat: 'US Pat. 2,822,141', inv: 'Cessna Aircraft Company', tag: 'Cessna 172' },
    { name: 'Piper J-3 Cub Fabric-Covered Welded Steel Tube Fuselage', cat: 'Aerospace & Aeronautics', year: 1938, pat: 'US Pat. 2,120,409', inv: 'Walter Jamouneau & Piper', tag: 'Piper Cub' },
    { name: 'Concorde Olympus 593 Engine Thrust Reverser Bucket Nozzle', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'GB Pat. 1,190,402', inv: 'SNECMA & Rolls-Royce', tag: 'Concorde Thrust' },
    { name: 'Tu-144 Charger Supersonic Retractable Canard Surface', cat: 'Aerospace & Aeronautics', year: 1968, pat: 'USSR Pat. 1968/99', inv: 'Tupolev Design Bureau', tag: 'Tu-144' },
    { name: 'General Dynamics F-16 Fighting Falcon Variable Geometry Inlet Ramp', cat: 'Aerospace & Aeronautics', year: 1974, pat: 'US Pat. 3,982,713', inv: 'Harry Hillaker & General Dynamics', tag: 'F-16 Falcon' },
    { name: 'McDonnell Douglas F-15 Eagle Dual Pratt & Whitney F100 Afterburner', cat: 'Aerospace & Aeronautics', year: 1972, pat: 'US Pat. 3,842,596', inv: 'McDonnell Douglas', tag: 'F-15 Eagle' },
    { name: 'Saab 37 Viggen Tandem Delta-Canard Aerodynamic Wing Assembly', cat: 'Aerospace & Aeronautics', year: 1967, pat: 'SE Pat. 312,901', inv: 'Erik Bratt & Saab', tag: 'Saab Viggen' },

    // MECHANICAL & ENGINES
    { name: 'Diesel Four-Stroke Direct Injection Compression Ignition Cylinder', cat: 'Mechanical & Engines', year: 1893, pat: 'US Pat. 608,845', inv: 'Rudolf Diesel', tag: 'Diesel Engine' },
    { name: 'Watt Steam Engine Sun and Planet Rotary Gear Drive', cat: 'Mechanical & Engines', year: 1781, pat: 'GB Pat. 1,306', inv: 'James Watt', tag: 'Watt Steam' },
    { name: 'Newcomen Atmospheric Steam Engine Rocking Beam Pump', cat: 'Mechanical & Engines', year: 1712, pat: 'GB Pat. 1712/01', inv: 'Thomas Newcomen', tag: 'Newcomen' },
    { name: 'Hero of Alexandria Aeolipile Spherical Reaction Steam Turbine', cat: 'Mechanical & Engines', year: 62, pat: 'Ancient Greece Alexandria', inv: 'Hero of Alexandria', tag: 'Aeolipile' },
    { name: 'Parsons Marine Axial Steam Turbine Rotor Blade Disk', cat: 'Mechanical & Engines', year: 1884, pat: 'GB Pat. 10,940', inv: 'Charles Algernon Parsons', tag: 'Parsons Turbine' },
    { name: 'De Laval High-Speed Supersonic Convergent-Divergent Nozzle', cat: 'Mechanical & Engines', year: 1888, pat: 'US Pat. 522,066', inv: 'Gustaf de Laval', tag: 'De Laval Nozzle' },
    { name: 'Tesla Bladeless Boundary Layer Friction Disk Turbine', cat: 'Mechanical & Engines', year: 1913, pat: 'US Pat. 1,061,206', inv: 'Nikola Tesla', tag: 'Tesla Turbine' },
    { name: 'Kaplan Adjustable-Blade Propeller Hydro Turbine Runner', cat: 'Mechanical & Engines', year: 1913, pat: 'AT Pat. 63,057', inv: 'Viktor Kaplan', tag: 'Kaplan Turbine' },
    { name: 'Francis Inward-Flow Reaction Water Turbine Runner Vane', cat: 'Mechanical & Engines', year: 1848, pat: 'US Pat. 192,845', inv: 'James B. Francis', tag: 'Francis Turbine' },
    { name: 'Pelton Dual-Splitter Jet Impulse Turbine Bucket Assembly', cat: 'Mechanical & Engines', year: 1880, pat: 'US Pat. 233,692', inv: 'Lester Allan Pelton', tag: 'Pelton Wheel' },
    { name: 'Wankel Epitrochoid Rotor Housing Cooling Channel Core', cat: 'Mechanical & Engines', year: 1961, pat: 'US Pat. 2,988,008', inv: 'Felix Wankel & NSU', tag: 'Wankel Engine' },
    { name: 'Atkinson Cycle Variable Compression Linkage Crankshaft', cat: 'Mechanical & Engines', year: 1887, pat: 'US Pat. 367,496', inv: 'James Atkinson', tag: 'Atkinson Engine' },
    { name: 'Miller Cycle Supercharged Intake Valve Late-Closing Camshaft', cat: 'Mechanical & Engines', year: 1940, pat: 'US Pat. 2,670,595', inv: 'Ralph Miller', tag: 'Miller Cycle' },
    { name: 'Bourdon Curved Tube Fluid Pressure Gauge Dial Mechanism', cat: 'Mechanical & Engines', year: 1849, pat: 'FR Pat. 9,928', inv: 'Eugène Bourdon', tag: 'Bourdon Gauge' },
    { name: 'Vernier Caliper High-Precision Sliding Scale Jaw Assembly', cat: 'Mechanical & Engines', year: 1631, pat: 'FR Hist. 1631', inv: 'Pierre Vernier', tag: 'Vernier Scale' },
    { name: 'Micrometer Screw Gauge Precision Spindle & Ratchet Stop', cat: 'Mechanical & Engines', year: 1848, pat: 'US Pat. 5,892', inv: 'Jean Laurent Palmer & William E. Palmer', tag: 'Micrometer' },
    { name: 'Geneva Drive Geneva Wheel Intermittent Stop Mechanism', cat: 'Mechanical & Engines', year: 1862, pat: 'CH Hist. 1862', inv: 'Swiss Clockmakers', tag: 'Geneva Drive' },
    { name: 'Harmonic Drive Strain Wave Speed Reducer Flexspline Cup', cat: 'Mechanical & Engines', year: 1957, pat: 'US Pat. 2,906,143', inv: 'C. Walton Musser', tag: 'Harmonic Drive' },
    { name: 'Epicyclic Planetary Gearbox Sun, Ring, and Planet Cage', cat: 'Mechanical & Engines', year: 1910, pat: 'US Pat. 990,123', inv: 'Lohner-Porsche & Ford Engineering', tag: 'Planetary Gear' },
    { name: 'Roots Positive Displacement Blower Rotary Lobe Pair', cat: 'Mechanical & Engines', year: 1860, pat: 'US Pat. 30,157', inv: 'Philander & Francis Marion Roots', tag: 'Roots Blower' },
    { name: 'Screw Pump Archimedean Helical Water Transport Tube', cat: 'Mechanical & Engines', year: -250, pat: 'Ancient Greece Syracuse', inv: 'Archimedes of Syracuse', tag: 'Archimedes Screw' },
    { name: 'Schnebly Centrifugal Threshing Machine Cylinder & Concave', cat: 'Mechanical & Engines', year: 1837, pat: 'US Pat. 1,298', inv: 'Hiram & John Pitts', tag: 'Thresher' },
    { name: 'McCormick Mechanical Reaper Oscillating Cutter Bar Blade', cat: 'Mechanical & Engines', year: 1831, pat: 'US Pat. 8,277', inv: 'Cyrus McCormick', tag: 'Reaper' },

    // ARCHITECTURE & MEGA-STRUCTURES
    { name: 'Brooklyn Bridge Steel Wire Cable Spinning Carriage Assembly', cat: 'Architecture & Mega-Structures', year: 1883, pat: 'US Pat. 210,089', inv: 'John A. & Washington Roebling', tag: 'Brooklyn Bridge' },
    { name: 'St. Louis Gateway Arch Catenary Cased Steel Triangle Box Truss', cat: 'Architecture & Mega-Structures', year: 1965, pat: 'US Pat. 3,248,833', inv: 'Eero Saarinen & Severud Associates', tag: 'Gateway Arch' },
    { name: 'CN Tower Hollow Octagonal Concrete Shaft Slipform Cast', cat: 'Architecture & Mega-Structures', year: 1976, pat: 'CA Pat. 1,012,398', inv: 'NCK Engineering & John Andrews', tag: 'CN Tower' },
    { name: 'Taipei 101 Tuned Mass Damper 660-Ton Steel Sphere Suspension', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'TW Pat. 592,019', inv: 'C.Y. Lee & Motioneering Inc.', tag: 'Taipei 101' },
    { name: 'Millau Viaduct Multi-Span Cable-Stayed Pier Tower Deck Joint', cat: 'Architecture & Mega-Structures', year: 2004, pat: 'FR Pat. 2,854,190', inv: 'Michel Virlogeux & Norman Foster', tag: 'Millau Viaduct' },
    { name: 'Great Wall of China Rammed Earth & Brick Bastion Tower', cat: 'Architecture & Mega-Structures', year: -220, pat: 'Ancient China Qin/Ming', inv: 'General Meng Tian & Imperial Builders', tag: 'Great Wall' },
    { name: 'Roman Aqueduct Pont du Gard Three-Tier Arch Masonry', cat: 'Architecture & Mega-Structures', year: 50, pat: 'Roman Empire Gaul', inv: 'Marcus Vipsanius Agrippa', tag: 'Pont du Gard' },
    { name: 'Hagia Sophia Pendentive Dome Load Transition Masonry Vault', cat: 'Architecture & Mega-Structures', year: 537, pat: 'Byzantine Empire', inv: 'Isidore of Miletus & Anthemius of Tralles', tag: 'Hagia Sophia' },
    { name: 'Florence Cathedral Brunelleschi Double-Shell Octagonal Dome', cat: 'Architecture & Mega-Structures', year: 1436, pat: 'Florence Italy', inv: 'Filippo Brunelleschi', tag: 'Florence Dome' },
    { name: 'Taj Mahal White Marble Double Dome Drum Foundation Crypt', cat: 'Architecture & Mega-Structures', year: 1653, pat: 'Mughal Empire India', inv: 'Ustad Ahmad Lahori & Shah Jahan', tag: 'Taj Mahal' },
    { name: 'Three Gorges Dam Concrete Gravity Wall Flood Control Penstock', cat: 'Architecture & Mega-Structures', year: 2006, pat: 'CN Pat. 1,402,110', inv: 'China Yangtze Power Co.', tag: 'Three Gorges' },
    { name: 'Gotthard Base Tunnel TBM Gripper Machine Excavation Cutter', cat: 'Architecture & Mega-Structures', year: 2016, pat: 'CH Pat. 701,234', inv: 'Herrenknecht AG & AlpTransit', tag: 'Gotthard Tunnel' },
    { name: 'Kansai International Airport Offshore Artificial Island Jack Piles', cat: 'Architecture & Mega-Structures', year: 1994, pat: 'JP Pat. 6,290,112', inv: 'Renzo Piano & Ov Arup', tag: 'Kansai Airport' },
    { name: 'Palm Jumeirah Breakwater Rock Armour Outer Defense Barrier', cat: 'Architecture & Mega-Structures', year: 2008, pat: 'UAE Pat. 2008/01', inv: 'Nakheel Properties & Royal Boskalis', tag: 'Palm Jumeirah' },
    { name: 'Sydney Harbour Bridge Steel Arch Hanger Pin Attachment', cat: 'Architecture & Mega-Structures', year: 1932, pat: 'AU Pat. 1932/45', inv: 'John Bradfield & Dorman Long', tag: 'Sydney Bridge' },
    { name: 'Mackinac Bridge Suspension Cable Truss Stiffener Expansion Joint', cat: 'Architecture & Mega-Structures', year: 1957, pat: 'US Pat. 2,912,709', inv: 'David B. Steinman', tag: 'Mackinac Bridge' },

    // COMPUTING & CYBERNETICS
    { name: 'IBM System/360 Model 75 Core Storage Magnet Matrix', cat: 'Computing & Cybernetics', year: 1965, pat: 'US Pat. 3,325,798', inv: 'Gene Amdahl & IBM Design Team', tag: 'IBM S/360' },
    { name: 'DEC PDP-11 Unibus Parallel Asynchronous Bus Controller', cat: 'Computing & Cybernetics', year: 1970, pat: 'US Pat. 3,710,324', inv: 'Gordon Bell & Digital Equipment Corp', tag: 'PDP-11' },
    { name: 'Intel 8086 16-bit Microprocessor Bus Interface Unit (BIU)', cat: 'Computing & Cybernetics', year: 1978, pat: 'US Pat. 4,442,484', inv: 'Stephen Morse & Intel', tag: 'Intel 8086' },
    { name: 'Motorola 68000 32-bit Internal Architecture Control ROM', cat: 'Computing & Cybernetics', year: 1979, pat: 'US Pat. 4,325,121', inv: 'Skip Stritter & Motorola Semiconductor', tag: 'Motorola 68K' },
    { name: 'Commodore 64 MOS Technology 6581 SID Sound Synthesizer Chip', cat: 'Computing & Cybernetics', year: 1982, pat: 'US Pat. 4,677,890', inv: 'Robert Yannes & MOS Technology', tag: 'C64 SID' },
    { name: 'Commodore C64 MOS Technology 6567 VIC-II Video Controller', cat: 'Computing & Cybernetics', year: 1982, pat: 'US Pat. 4,586,038', inv: 'Albert Charpentier & MOS', tag: 'VIC-II C64' },
    { name: 'ARM1 Acorn RISC Machine 32-bit Pipeline Instruction Decoder', cat: 'Computing & Cybernetics', year: 1985, pat: 'GB Pat. 2,174,221', inv: 'Sophie Wilson & Steve Furber', tag: 'ARM Architecture' },
    { name: 'MIPS R2000 32-bit RISC CPU Instruction Register Execution Unit', cat: 'Computing & Cybernetics', year: 1986, pat: 'US Pat. 4,814,976', inv: 'John L. Hennessy & MIPS Computer', tag: 'MIPS R2000' },
    { name: 'Sun Microsystems SPARC V7 32-bit Register Window Unit', cat: 'Computing & Cybernetics', year: 1987, pat: 'US Pat. 5,101,343', inv: 'David Patterson & Sun Microsystems', tag: 'SPARC RISC' },
    { name: 'Intel Pentium Superscalar Dual-Execution Pipeline Controller', cat: 'Computing & Cybernetics', year: 1993, pat: 'US Pat. 5,659,782', inv: 'Vinod Dham & Intel Corp', tag: 'Intel Pentium' },
    { name: '3dfx Voodoo Graphics SST-1 Frame Buffer Accelerator Chip', cat: 'Computing & Cybernetics', year: 1996, pat: 'US Pat. 5,831,624', inv: 'Ross Smith & 3dfx Interactive', tag: '3dfx Voodoo' },
    { name: 'NVIDIA GeForce 256 GPU Hardware Transform and Lighting (T&L) Engine', cat: 'Computing & Cybernetics', year: 1999, pat: 'US Pat. 6,697,063', inv: 'Jensen Huang & NVIDIA Design Team', tag: 'GeForce 256' },
    { name: 'Transmeta Crusoe Code Morphing Software-Hardware Translator', cat: 'Computing & Cybernetics', year: 2000, pat: 'US Pat. 6,031,992', inv: 'David Ditzel, Linus Torvalds, Transmeta', tag: 'Transmeta' },
    { name: 'IBM Cell Broadband Engine Synergistic Processing Element (SPE)', cat: 'Computing & Cybernetics', year: 2005, pat: 'US Pat. 7,162,593', inv: 'IBM, Sony, and Toshiba STI Alliance', tag: 'Cell Engine' },
    { name: 'Apple M1 Unified Memory Architecture (UMA) System-on-Chip Die', cat: 'Computing & Cybernetics', year: 2020, pat: 'US Pat. 11,288,198', inv: 'Johny Srouji & Apple Silicon Team', tag: 'Apple M1' },

    // ROBOTICS & AUTOMATION
    { name: 'Stanford Arm 6-Degree-of-Freedom All-Electric Robot Manipulator', cat: 'Robotics & Automation', year: 1969, pat: 'US Pat. 3,826,382', inv: 'Victor Scheinman & Stanford AI Lab', tag: 'Stanford Arm' },
    { name: 'PUMA 560 Programmable Universal Machine for Assembly Joint Drive', cat: 'Robotics & Automation', year: 1978, pat: 'US Pat. 4,360,888', inv: 'Victor Scheinman & Unimation', tag: 'PUMA 560' },
    { name: 'SCARA Selective Compliance Assembly Robot Arm Dual-Articulated Elbow', cat: 'Robotics & Automation', year: 1981, pat: 'JP Pat. 56-112301', inv: 'Hiroshi Makino & Yamanashi University', tag: 'SCARA Robot' },
    { name: 'iRobot Roomba Piezoelectric Acoustic Dirt Sensor & Bumper Switch', cat: 'Robotics & Automation', year: 2002, pat: 'US Pat. 6,883,201', inv: 'Colin Angle, Helen Greiner, iRobot', tag: 'Roomba' },
    { name: 'Rethink Robotics Baxter Dual-Arm Compliant Actuator Joint', cat: 'Robotics & Automation', year: 2012, pat: 'US Pat. 8,918,211', inv: 'Rodney Brooks & Rethink Robotics', tag: 'Baxter Robot' },
    { name: 'Boston Dynamics BigDog Quadruped Hydraulic Power Unit Engine', cat: 'Robotics & Automation', year: 2005, pat: 'US Pat. 7,845,440', inv: 'Marc Raibert & Boston Dynamics', tag: 'BigDog' },
    { name: 'Boston Dynamics Handle Wheeled-Leg Dynamic Balancing Actuator', cat: 'Robotics & Automation', year: 2017, pat: 'US Pat. 10,214,251', inv: 'Boston Dynamics Engineering', tag: 'Handle Robot' },
    { name: 'ABB IRB 6600 Industrial Spot-Welding Robot Arm Wrist Joint', cat: 'Robotics & Automation', year: 2002, pat: 'SE Pat. 518,209', inv: 'ABB Robotics Sweden', tag: 'ABB Robot' },
    { name: 'Festool BionicOpter Cybernetic Dragonfly Dual-Wing Flap Servo', cat: 'Robotics & Automation', year: 2013, pat: 'DE Pat. 10,2013,101', inv: 'Festo Bionic Learning Network', tag: 'BionicOpter' },

    // ENERGY & QUANTUM
    { name: 'Edison Direct Current (DC) Dynamo Armature Winding Unit', cat: 'Energy & Quantum', year: 1879, pat: 'US Pat. 222,881', inv: 'Thomas Alva Edison', tag: 'DC Dynamo' },
    { name: 'Tesla Polyphase Alternating Current (AC) Induction Motor Stator', cat: 'Energy & Quantum', year: 1888, pat: 'US Pat. 381,968', inv: 'Nikola Tesla', tag: 'AC Motor' },
    { name: 'Stanley Alternating Current High-Voltage Step-Down Transformer', cat: 'Energy & Quantum', year: 1886, pat: 'US Pat. 349,611', inv: 'William Stanley Jr. & Westinghouse', tag: 'Transformer' },
    { name: 'Bell Solar Battery Silicon Photovoltaic PN Junction Cell', cat: 'Energy & Quantum', year: 1954, pat: 'US Pat. 2,780,765', inv: 'Daryl Chapin, Calvin Fuller, Gerald Pearson', tag: 'Solar Cell' },
    { name: 'Candaros Polymer Electrolyte Membrane Fuel Cell (PEMFC) Stack', cat: 'Energy & Quantum', year: 1962, pat: 'US Pat. 3,134,697', inv: 'Willard Thomas Grubb & General Electric', tag: 'PEM Fuel Cell' },
    { name: 'Goodenough Lithium Cobalt Oxide (LiCoO2) Rechargeable Battery Anode', cat: 'Energy & Quantum', year: 1980, pat: 'US Pat. 4,302,518', inv: 'John B. Goodenough (Nobel Laureate)', tag: 'Lithium Battery' },
    { name: 'Yoshino Graphite Anode Lithium-Ion Battery Cathode Assembly', cat: 'Energy & Quantum', year: 1985, pat: 'JP Pat. 1,989,201', inv: 'Akira Yoshino (Nobel Laureate) & Asahi Kasei', tag: 'Li-Ion Battery' },
    { name: 'Iter Tokamak Toroidal Magnetic Field Superconducting Coil Module', cat: 'Energy & Quantum', year: 2010, pat: 'FR Pat. 2,934,120', inv: 'ITER International Organization', tag: 'ITER Fusion' },
    { name: 'National Ignition Facility (NIF) 192-Beam Laser Target Chamber', cat: 'Energy & Quantum', year: 2009, pat: 'US Pat. 7,609,799', inv: 'Lawrence Livermore National Lab', tag: 'NIF Fusion' },
    { name: 'X-10 Graphite Reactor Uranium Fuel Channel Cooling Block', cat: 'Energy & Quantum', year: 1943, pat: 'US Pat. 2,836,554', inv: 'Enrico Fermi & Leo Szilard', tag: 'Manhattan Project' },
    { name: 'CANDU Deuterium Uranium Heavy Water Moderated Reactor Bundle', cat: 'Energy & Quantum', year: 1962, pat: 'CA Pat. 680,112', inv: 'Atomic Energy of Canada Limited (AECL)', tag: 'CANDU Reactor' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Benz Patent-Motorwagen 1-Cylinder Four-Stroke Engine Frame', cat: 'Automotive & Transportation', year: 1886, pat: 'DE Pat. 37435', inv: 'Karl Benz', tag: 'Benz Motorwagen' },
    { name: 'Daimler Reitwagen First Internal Combustion Motorcycle Frame', cat: 'Automotive & Transportation', year: 1885, pat: 'DE Pat. 36423', inv: 'Gottlieb Daimler & Wilhelm Maybach', tag: 'Reitwagen' },
    { name: 'Ford Model T Flywheel Magneto and Ignition Coil System', cat: 'Automotive & Transportation', year: 1908, pat: 'US Pat. 1,005,187', inv: 'Henry Ford & C.H. Wills', tag: 'Ford Model T' },
    { name: 'Volkswagen Beetle Air-Cooled Rear Engine Crankcase Shell', cat: 'Automotive & Transportation', year: 1938, pat: 'DE Pat. 730,123', inv: 'Ferdinand Porsche', tag: 'VW Beetle' },
    { name: 'Citroën DS Hydropneumatic Self-Leveling Suspension Sphere', cat: 'Automotive & Transportation', year: 1955, pat: 'FR Pat. 1,098,201', inv: 'Paul Magès & Citroën', tag: 'Citroën DS' },
    { name: 'Volvo 3-Point Lap-and-Shoulder Safety Seatbelt Retractor', cat: 'Automotive & Transportation', year: 1959, pat: 'US Pat. 3,043,625', inv: 'Nils Bohlin & Volvo', tag: '3-Point Seatbelt' },
    { name: 'Oldsmobile Toronado Front-Wheel Drive Chain Transmission Package', cat: 'Automotive & Transportation', year: 1966, pat: 'US Pat. 3,362,495', inv: 'John Beltz & General Motors', tag: 'Toronado FWD' },
    { name: 'Audi Quattro Permanent All-Wheel Drive Center Torsen Differential', cat: 'Automotive & Transportation', year: 1980, pat: 'DE Pat. 3,005,911', inv: 'Jörg Bensinger & Audi', tag: 'Audi Quattro' },
    { name: 'Toyota Prius Hybrid Synergy Drive Planetary Power Split Device', cat: 'Automotive & Transportation', year: 1997, pat: 'US Pat. 5,847,520', inv: 'Takeshi Uchiyamada & Toyota Motor', tag: 'Toyota Prius' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Roentgen X-Ray Vacuum Discharge Glass Cathode Tube', cat: 'Medical & Biotechnology', year: 1895, pat: 'DE Hist. 1895', inv: 'Wilhelm Conrad Röntgen (Nobel Laureate)', tag: 'X-Ray Tube' },
    { name: 'Einthoven String Galvanometer Electrocardiogram (ECG) Sensor', cat: 'Medical & Biotechnology', year: 1903, pat: 'NL Hist. 1903', inv: 'Willem Einthoven (Nobel Laureate)', tag: 'ECG Machine' },
    { name: 'Drinkler and Shaw Iron Lung Negative Pressure Respirator Tank', cat: 'Medical & Biotechnology', year: 1928, pat: 'US Pat. 1,906,844', inv: 'Philip Drinker & Louis Agassiz Shaw', tag: 'Iron Lung' },
    { name: 'Gibbon Heart-Lung Machine Roller Pump Oxygenator Circuit', cat: 'Medical & Biotechnology', year: 1953, pat: 'US Pat. 2,852,024', inv: 'John Heysham Gibbon & IBM', tag: 'Heart-Lung Machine' },
    { name: 'Charnley Low-Friction Total Hip Replacement Stem & Socket', cat: 'Medical & Biotechnology', year: 1962, pat: 'GB Pat. 1,029,812', inv: 'Sir John Charnley', tag: 'Hip Replacement' },
    { name: 'Cormack and Hounsfield Computed Tomography (CT) Scanner Ring', cat: 'Medical & Biotechnology', year: 1971, pat: 'US Pat. 3,778,614', inv: 'Godfrey Hounsfield & Allan Cormack', tag: 'CT Scanner' },
    { name: 'Jarvik-7 Artificial Heart Dual Pneumatic Polyurethane Ventricle', cat: 'Medical & Biotechnology', year: 1982, pat: 'US Pat. 4,173,796', inv: 'Robert Jarvik & Willem Kolff', tag: 'Jarvik-7' },

    // OPTICS & ASTRONOMY
    { name: 'Newtonian Reflecting Telescope Parabolic Primary Glass Mirror', cat: 'Optics & Astronomy', year: 1668, pat: 'GB Hist. 1668', inv: 'Sir Isaac Newton', tag: 'Newtonian Scope' },
    { name: 'Cassegrain Dual-Mirror Reflector Telescope Secondary Convex Mirror', cat: 'Optics & Astronomy', year: 1672, pat: 'FR Hist. 1672', inv: 'Laurent Cassegrain', tag: 'Cassegrain' },
    { name: 'Schmidt Astrographic Corrector Plate Spherical Primary Camera', cat: 'Optics & Astronomy', year: 1930, pat: 'DE Pat. 583,412', inv: 'Bernhard Schmidt', tag: 'Schmidt Camera' },
    { name: 'Zeiss Abbe-Koenig Image Erecting Optical Prism Cluster', cat: 'Optics & Astronomy', year: 1897, pat: 'DE Pat. 110,211', inv: 'Ernst Abbe & Albert Koenig', tag: 'Zeiss Prism' },

    // CONSUMER TECHNOLOGY
    { name: 'Daguerreotype Iodine-Sensitized Silvered Copper Camera Plate', cat: 'Consumer Technology', year: 1839, pat: 'FR Pat. 1839/01', inv: 'Louis Daguerre', tag: 'Daguerreotype' },
    { name: 'Edison Cylinder Wax Phonograph Reproducer Stylus Diaphragm', cat: 'Consumer Technology', year: 1888, pat: 'US Pat. 386,974', inv: 'Thomas Alva Edison', tag: 'Edison Phonograph' },
    { name: 'Berliner Gramophone Flat Zinc Disc Motor & Mechanical Pick-up', cat: 'Consumer Technology', year: 1887, pat: 'US Pat. 372,786', inv: 'Emile Berliner', tag: 'Gramophone' },
    { name: 'De Forest Audion Triode Vacuum Tube Radio Amplifier Grid', cat: 'Consumer Technology', year: 1906, pat: 'US Pat. 879,532', inv: 'Lee de Forest', tag: 'Audion Tube' },
    { name: 'Baird Mechanical Television Spinning Nipkow Disk Scanner', cat: 'Consumer Technology', year: 1925, pat: 'GB Pat. 222,604', inv: 'John Logie Baird & Paul Nipkow', tag: 'Mechanical TV' },
    { name: 'Zworykin Iconoscope Cathode Ray Television Camera Tube', cat: 'Consumer Technology', year: 1923, pat: 'US Pat. 2,141,059', inv: 'Vladimir Zworykin & RCA', tag: 'Iconoscope' },

    // TO BE BUILT CONCEPTS & FUTURE TECH
    { name: 'Orbital Elevator Carbon Nanotube Ribbon Tether Anchor', cat: 'To Be Built Concepts', year: 2038, pat: 'CONCEPT/2038/ELEV-01', inv: 'International Space Elevator Consortium', tag: 'Space Elevator' },
    { name: 'Dyson Swarm Lightweight Solar Focusing Reflector Mirror Sail', cat: 'To Be Built Concepts', year: 2045, pat: 'CONCEPT/2045/DYSON-99', inv: 'Helios Planetary Engineering Group', tag: 'Dyson Swarm' },
    { name: 'Lunar Farside Radio Telescope Array Robotic Deployment Rover', cat: 'To Be Built Concepts', year: 2030, pat: 'CONCEPT/2030/LUNAR-RF', inv: 'NASA & International Astronomical Union', tag: 'Lunar Scope' },
    { name: 'Martian Regolith Microwave Sintering Habitat Printer Nozzle', cat: 'To Be Built Concepts', year: 2032, pat: 'CONCEPT/2032/MARS-3D', inv: 'SpaceX & NASA Mars Architecture', tag: 'Mars Habitat' }
  ];

  const megaList: BlueprintItem[] = [];

  // Generate 300 total distinct items
  for (let i = 0; i < 300; i++) {
    const seed = LIST_300_SEEDS[i % LIST_300_SEEDS.length];
    const uniqueIndex = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2025;

    const bpItem: BlueprintItem = {
      id: `bp-mega-${uniqueIndex}`,
      title: i < LIST_300_SEEDS.length ? seed.name : `${seed.name} (Variant Mk.${Math.floor(i / LIST_300_SEEDS.length) + 1})`,
      patentNumber: i < LIST_300_SEEDS.length ? seed.pat : `${seed.pat}-V${uniqueIndex}`,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : uniqueIndex % 4 === 0 ? 'Advanced' : uniqueIndex % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Comprehensive master engineering CAD blueprint specification of ${seed.name}.`,
      description: `The ${seed.name} represents a foundational baseline in ${seed.cat}. Developed by ${seed.inv} in ${seed.year}, this vector schematic highlights precise component geometries, stress tolerances, material science, and assembly protocols.`,
      historicalContext: `Archived in national engineering archives and verified by international standards committees.`,
      specifications: {
        'Engineering Standard': `${seed.tag} Spec Class ${1 + (uniqueIndex % 7)}`,
        'Design Tolerance': `±${(0.001 + (uniqueIndex % 10) * 0.001).toFixed(4)} mm`,
        'Operating Power / Metric': `${120 + (uniqueIndex * 7) % 500} Units / Nominal`,
        'Thermal Capacity': `${200 + (uniqueIndex * 15) % 1200} °C`,
        'Component Mass': `${(1.2 + (uniqueIndex * 3.4) % 150).toFixed(2)} kg`
      },
      materials: [
        { partName: 'Primary Frame Structure', material: 'High-Tensile Titanium-Duralumin Matrix', quantity: '1 core unit', notes: 'Zero thermal deflection alloy' },
        { partName: 'Active Drive Mechanism', material: 'Hardened Tool Steel Nitride Plated', quantity: '2 sets', notes: 'Ultra-low friction sealed bearing interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Frame Fixture & Alignment', instruction: 'Secure primary structural chassis in dynamic laser-guided mounting fixture.' },
        { stepNumber: 2, title: 'Sub-assembly Mechanical Fit', instruction: 'Install internal rotary and pneumatic mechanisms into aligned guide keyways.' },
        { stepNumber: 3, title: 'Calibration & Tolerance Pass', instruction: 'Perform full dynamic sweep test to confirm sub-micron operational clearance.' }
      ],
      hotspots: [
        { id: `hs-m1-${uniqueIndex}`, x: 30 + (uniqueIndex % 40), y: 40 + (uniqueIndex % 30), partNumber: `CAD-${seed.tag}-${uniqueIndex}-A`, title: 'Primary Interface Housing', description: `Main structural anchor node for ${seed.name}.`, material: 'Titanium Matrix' },
        { id: `hs-m2-${uniqueIndex}`, x: 60 - (uniqueIndex % 30), y: 70 - (uniqueIndex % 20), partNumber: `CAD-${seed.tag}-${uniqueIndex}-B`, title: 'High-Tolerance Actuation Node', description: 'Critical dynamic load transfer point.', material: 'Hardened Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${60 + (uniqueIndex % 15) * 2} ${60 + (uniqueIndex % 15) * 2} L ${340 - (uniqueIndex % 15) * 2} ${60 + (uniqueIndex % 15) * 2} L ${340 - (uniqueIndex % 15) * 2} ${300 - (uniqueIndex % 15) * 2} L ${60 + (uniqueIndex % 15) * 2} ${300 - (uniqueIndex % 15) * 2} Z`
        ],
        mechanicalPaths: [
          `M 100 150 L 300 250 M 300 150 L 100 250`,
          `M 200 200 m -${30 + (uniqueIndex % 15)} 0 a ${30 + (uniqueIndex % 15)} ${30 + (uniqueIndex % 15)} 0 1 0 ${60 + (uniqueIndex % 15) * 2} 0 a ${30 + (uniqueIndex % 15)} ${30 + (uniqueIndex % 15)} 0 1 0 -${60 + (uniqueIndex % 15) * 2} 0`
        ],
        electricalPaths: [`M 80 200 L 320 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 260, y2: 90, label: `${seed.tag} Ref Node` }],
        dimensionTexts: [{ x: 200, y: 320, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, 'Master Patent', 'Engineering CAD', `${seed.year}`],
      downloadsCount: Math.floor(15000 + (uniqueIndex * 710) % 45000)
    };

    megaList.push(bpItem);
  }

  return megaList;
}
