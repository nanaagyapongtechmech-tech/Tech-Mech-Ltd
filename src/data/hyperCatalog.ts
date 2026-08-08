import { BlueprintItem, BlueprintCategory } from '../types';

export function generate500Blueprints(): BlueprintItem[] {
  const HYPER_SEEDS = [
    // AEROSPACE & AERONAUTICS
    { name: 'SR-71 Titanium Wing Leading Edge Thermal Expansion Joint', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,344,608', inv: 'Kelly Johnson & Skunk Works', tag: 'SR-71' },
    { name: 'X-15 Inconel X Rocket Plane Ventral Fin Separation Mechanism', cat: 'Aerospace & Aeronautics', year: 1959, pat: 'US Pat. 3,143,322', inv: 'North American Aviation', tag: 'X-15' },
    { name: 'Saturn V F-1 Engine Turbopump Inducer & Impeller Shaft', cat: 'Aerospace & Aeronautics', year: 1967, pat: 'US Pat. 3,516,252', inv: 'Rocketdyne & NASA', tag: 'Saturn V F-1' },
    { name: 'Saturn V J-2 Engine Liquid Hydrogen Spark Igniter Assembly', cat: 'Aerospace & Aeronautics', year: 1967, pat: 'US Pat. 3,439,504', inv: 'Rocketdyne & NASA Marshall', tag: 'J-2 Engine' },
    { name: 'Space Shuttle Orbiter Reinforced Carbon-Carbon (RCC) Nose Cap', cat: 'Aerospace & Aeronautics', year: 1981, pat: 'US Pat. 4,185,559', inv: 'Vought Corporation & NASA', tag: 'Shuttle RCC' },
    { name: 'Space Shuttle Spacehab Module Pressure Relief Valve Assembly', cat: 'Aerospace & Aeronautics', year: 1993, pat: 'US Pat. 5,284,308', inv: 'Spacehab Inc. & NASA', tag: 'Spacehab' },
    { name: 'Apollo Command Module Earth Landing System Three-Parachute Mortar', cat: 'Aerospace & Aeronautics', year: 1968, pat: 'US Pat. 3,556,444', inv: 'North American Rockwell & NASA', tag: 'Apollo ELS' },
    { name: 'Apollo Lunar Module Reaction Control System (RCS) Quad Engine Thruster', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'US Pat. 3,572,033', inv: 'Marquardt Corporation & NASA', tag: 'Apollo RCS' },
    { name: 'SpaceX Falcon Heavy Center Core Octaweb Engine Support Structure', cat: 'Aerospace & Aeronautics', year: 2018, pat: 'US Pat. 10,112,726', inv: 'Elon Musk & SpaceX', tag: 'Falcon Heavy' },
    { name: 'SpaceX Starship Raptor Vacuum Engine 3m-Diameter Brazed Nozzle Extension', cat: 'Aerospace & Aeronautics', year: 2021, pat: 'US Pat. 11,215,151', inv: 'SpaceX Propulsion Team', tag: 'Raptor Vacuum' },
    { name: 'Boeing 747 Pratt & Whitney JT9D High-Bypass Turbofan Fan Blade Ring', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'US Pat. 3,578,269', inv: 'Pratt & Whitney & Boeing', tag: 'Boeing 747 JT9D' },
    { name: 'Concorde Olympus 593 Variable Primary & Secondary Nozzle Ring', cat: 'Aerospace & Aeronautics', year: 1969, pat: 'GB Pat. 1,190,403', inv: 'Rolls-Royce & SNECMA', tag: 'Concorde Nozzle' },
    { name: 'Lockheed C-130 Hercules Allison T56 Turboprop Reduction Gearbox', cat: 'Aerospace & Aeronautics', year: 1954, pat: 'US Pat. 2,822,142', inv: 'Allison Engine Company', tag: 'C-130 Hercules' },
    { name: 'Bell UH-1 Iroquois "Huey" Semi-Rigid Teetering Two-Blade Rotor Head', cat: 'Aerospace & Aeronautics', year: 1956, pat: 'US Pat. 2,988,142', inv: 'Bell Helicopter Company', tag: 'Huey Rotor' },
    { name: 'Boeing AH-64 Apache Arrowhead Modernized Target Acquisition Sight (M-TADS)', cat: 'Aerospace & Aeronautics', year: 2005, pat: 'US Pat. 7,185,721', inv: 'Lockheed Martin Missiles', tag: 'Apache M-TADS' },
    { name: 'General Dynamics F-111 Aardvark Variable-Geometry Wing Sweep Actuator', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'US Pat. 3,448,317', inv: 'General Dynamics Fort Worth', tag: 'F-111 Wing' },
    { name: 'Fairchild Republic A-10 Thunderbolt II GAU-8/A Avenger 30mm Gatling Feed', cat: 'Aerospace & Aeronautics', year: 1972, pat: 'US Pat. 3,982,348', inv: 'General Electric Armament', tag: 'A-10 GAU-8' },
    { name: 'McDonnell Douglas F/A-18 Hornet Leading Edge Extension (LEX) Slot', cat: 'Aerospace & Aeronautics', year: 1978, pat: 'US Pat. 4,184,494', inv: 'McDonnell Douglas Corp', tag: 'F/A-18 LEX' },
    { name: 'Northrop F-5 Freedom Fighter Compact Afterburning J85 Turbojet Engine', cat: 'Aerospace & Aeronautics', year: 1959, pat: 'US Pat. 3,143,323', inv: 'General Electric Aviation', tag: 'F-5 J85' },
    { name: 'Saab JAS 39 Gripen Close-Coupled Canard Delta Fly-By-Wire Servo', cat: 'Aerospace & Aeronautics', year: 1988, pat: 'SE Pat. 518,210', inv: 'Saab AB Sweden', tag: 'Gripen Canard' },
    { name: 'Dassault Rafale SPECTRA Integrated Electronic Warfare Sensor Array', cat: 'Aerospace & Aeronautics', year: 1986, pat: 'FR Pat. 2,854,191', inv: 'Thales Group & Dassault Aviation', tag: 'Rafale SPECTRA' },
    { name: 'Sukhoi Su-27 Flanker Saturn AL-31F Afterburning Turbofan Nozzle', cat: 'Aerospace & Aeronautics', year: 1977, pat: 'RU Pat. 2,012,346', inv: 'Lyulka Design Bureau', tag: 'Su-27 AL-31F' },
    { name: 'MiG-25 Foxbat Tumansky R-15B-300 Single-Shaft Afterburning Jet Engine', cat: 'Aerospace & Aeronautics', year: 1964, pat: 'USSR Pat. 1964/88', inv: 'Tumansky Design Bureau', tag: 'MiG-25 R-15' },
    { name: 'Mil Mi-26 Halo Heavy Transport Helicopter 8-Blade Main Rotor Hub', cat: 'Aerospace & Aeronautics', year: 1977, pat: 'USSR Pat. 1977/12', inv: 'Mil Moscow Helicopter Plant', tag: 'Mi-26 Hub' },
    { name: 'North American P-51 Mustang Radiator Belly Scoop Laminar Flow Duct', cat: 'Aerospace & Aeronautics', year: 1940, pat: 'US Pat. 2,398,013', inv: 'Edgar Schmued & North American Aviation', tag: 'P-51 Scoop' },
    { name: 'Supermarine Spitfire Rolls-Royce Merlin Dual-Stage Two-Speed Supercharger', cat: 'Aerospace & Aeronautics', year: 1942, pat: 'GB Pat. 550,120', inv: 'Stanley Hooker & Rolls-Royce', tag: 'Merlin Supercharger' },
    { name: 'Boeing B-17 Flying Fortress Sperry Gyroscope Ball Turret Mounting Ring', cat: 'Aerospace & Aeronautics', year: 1938, pat: 'US Pat. 2,380,123', inv: 'Sperry Gyroscope Company', tag: 'B-17 Ball Turret' },

    // MECHANICAL & ENGINES
    { name: 'Caterpillar C15 ACERT Twin-Turbocharged Diesel Fuel Injector Camshaft', cat: 'Mechanical & Engines', year: 2003, pat: 'US Pat. 6,655,517', inv: 'Caterpillar Inc.', tag: 'CAT C15' },
    { name: 'Detroit Diesel 8V71 Two-Stroke Roots Supercharged Diesel Crankshaft', cat: 'Mechanical & Engines', year: 1957, pat: 'US Pat. 2,828,954', inv: 'Detroit Diesel Allison', tag: 'Detroit Diesel' },
    { name: 'Cummins 5.9L ISB 24-Valve High-Pressure Common Rail Diesel Pump', cat: 'Mechanical & Engines', year: 1998, pat: 'US Pat. 5,847,521', inv: 'Cummins Inc. & Bosch', tag: 'Cummins 5.9' },
    { name: 'Allison V-1710 Liquid-Cooled V12 Aircraft Engine Supercharger Drive', cat: 'Mechanical & Engines', year: 1937, pat: 'US Pat. 2,120,410', inv: 'Allison Division GM', tag: 'Allison V-1710' },
    { name: 'Pratt & Whitney R-2800 Double Wasp 18-Cylinder Radial Engine Crankshaft', cat: 'Mechanical & Engines', year: 1937, pat: 'US Pat. 2,141,060', inv: 'Pratt & Whitney Aircraft', tag: 'R-2800 Radial' },
    { name: 'Wright R-3350 Duplex-Cyclone 18-Cylinder Turbo-Compound Power Turbine', cat: 'Mechanical & Engines', year: 1941, pat: 'US Pat. 2,442,485', inv: 'Wright Aeronautical', tag: 'R-3350 Turbine' },
    { name: 'Napier Deltic Opposed-Piston Triangular 18-Cylinder Diesel Crankshaft', cat: 'Mechanical & Engines', year: 1950, pat: 'GB Pat. 680,113', inv: 'D. Napier & Son', tag: 'Napier Deltic' },
    { name: 'Junkers Jumo 205 Opposed-Piston Two-Stroke Aircraft Diesel Cylinder', cat: 'Mechanical & Engines', year: 1932, pat: 'DE Pat. 583,413', inv: 'Hugo Junkers', tag: 'Jumo 205' },
    { name: 'Maybach HL230 V12 Gasoline Tank Engine Dual Solex Carburetor', cat: 'Mechanical & Engines', year: 1943, pat: 'DE Pat. 760,113', inv: 'Karl Maybach', tag: 'Maybach HL230' },
    { name: 'Ford 427 FE Cam-Mercury Single Overhead Cam (SOHC) Cylinder Head', cat: 'Mechanical & Engines', year: 1964, pat: 'US Pat. 3,380,690', inv: 'Ford Motor Company', tag: 'Ford 427 SOHC' },
    { name: 'Chrysler 426 FirePower Hemispherical Combustion Chamber (Hemi) Head', cat: 'Mechanical & Engines', year: 1964, pat: 'US Pat. 3,362,496', inv: 'Tom Hoover & Chrysler Corp', tag: '426 Hemi' },
    { name: 'Chevrolet L88 427 Big Block Aluminum Cylinder Head & Intake', cat: 'Mechanical & Engines', year: 1967, pat: 'US Pat. 3,382,480', inv: 'Zora Arkus-Duntov & GM', tag: 'Chevy L88' },
    { name: 'Honda B16A VTEC Variable Valve Timing Solenoid & Rocker Arm Assembly', cat: 'Mechanical & Engines', year: 1989, pat: 'US Pat. 4,812,020', inv: 'Ikuo Kajitani & Honda', tag: 'Honda VTEC' },
    { name: 'Toyota 2JZ-GTE Parallel Twin-Turbocharging Sequential Bypass Valve', cat: 'Mechanical & Engines', year: 1991, pat: 'JP Pat. 3,110,403', inv: 'Toyota Motor Corporation', tag: 'Toyota 2JZ' },
    { name: 'Nissan RB26DETT Twin-Cam 24-Valve Individual Throttle Body (ITB) Plenum', cat: 'Mechanical & Engines', year: 1989, pat: 'JP Pat. 4,210,124', inv: 'Nissan Powertrain Engineering', tag: 'Nissan RB26' },
    { name: 'Mazda 13B-REW Sequential Twin-Turbocharged Rotary Engine Rotor', cat: 'Mechanical & Engines', year: 1992, pat: 'JP Pat. 4,881,778', inv: 'Kenichi Yamamoto & Mazda', tag: 'Mazda 13B' },
    { name: 'Subaru EJ207 Horizontally Opposed Semi-Closed Deck Aluminum Block', cat: 'Mechanical & Engines', year: 1998, pat: 'JP Pat. 5,612,989', inv: 'Subaru Corporation', tag: 'Subaru EJ20' },
    { name: 'BMW S54B32 Individual Throttle Body Double-VANOS Timing Camshaft', cat: 'Mechanical & Engines', year: 2000, pat: 'DE Pat. 10,2000,001', inv: 'BMW M GmbH', tag: 'BMW S54' },
    { name: 'Mercedes-AMG M139 2.0L Roller Bearing Twin-Scroll Turbocharger', cat: 'Mechanical & Engines', year: 2019, pat: 'DE Pat. 10,2019,002', inv: 'Mercedes-AMG GmbH', tag: 'AMG M139' },

    // COMPUTING & CYBERNETICS
    { name: 'IBM Personal Computer PC/XT 5160 Motherboard & Intel 8088 CPU Socket', cat: 'Computing & Cybernetics', year: 1983, pat: 'US Pat. 4,577,283', inv: 'Don Estridge & IBM Boca Raton', tag: 'IBM PC/XT' },
    { name: 'IBM AT 5170 Intel 80286 16-Bit ISA Expansion Bus Controller', cat: 'Computing & Cybernetics', year: 1984, pat: 'US Pat. 4,687,201', inv: 'IBM Corporation', tag: 'IBM PC/AT' },
    { name: 'Apple II Single-Board Computer Woz State Machine Disk II Controller', cat: 'Computing & Cybernetics', year: 1977, pat: 'US Pat. 4,136,203', inv: 'Steve Wozniak & Apple Computer', tag: 'Apple II Disk' },
    { name: 'Commodore Amiga 500 Agnus Custom Memory Controller & Blitter Chip', cat: 'Computing & Cybernetics', year: 1987, pat: 'US Pat. 4,777,622', inv: 'Jay Miner & Commodore', tag: 'Amiga Agnus' },
    { name: 'Commodore Amiga Denise Custom Video Display Register Logic Chip', cat: 'Computing & Cybernetics', year: 1985, pat: 'US Pat. 4,777,623', inv: 'Jay Miner & Commodore', tag: 'Amiga Denise' },
    { name: 'Atari ST Custom DMA Floppy & Hard Disk Interface Controller (ACSI)', cat: 'Computing & Cybernetics', year: 1985, pat: 'US Pat. 4,697,064', inv: 'Shiraz Shivji & Atari Corp', tag: 'Atari ST' },
    { name: 'Sinclair ZX81 Custom Ferranti Uncommitted Logic Array (ULA) Chip', cat: 'Computing & Cybernetics', year: 1981, pat: 'GB Pat. 2,094,033', inv: 'Sir Clive Sinclair & Ferranti', tag: 'ZX81 ULA' },
    { name: 'BBC Microcomputer Acorn System Tube Bus Inter-Processor Interface', cat: 'Computing & Cybernetics', year: 1981, pat: 'GB Pat. 2,174,222', inv: 'Hermann Hauser & Steve Furber', tag: 'BBC Micro' },
    { name: 'NEC PC-9801 Custom Graphic Display Controller (μPD7220) Circuit', cat: 'Computing & Cybernetics', year: 1982, pat: 'JP Pat. 58-12094', inv: 'NEC Corporation Japan', tag: 'NEC PC-98' },
    { name: 'Sharp X68000 Custom Human68k Hardware Sprite Video Processor', cat: 'Computing & Cybernetics', year: 1987, pat: 'JP Pat. 62-90112', inv: 'Sharp Corporation Japan', tag: 'Sharp X68000' },
    { name: '3dfx Voodoo2 Glide Dual-Texture Unit (TMU) Interleaved Array Chip', cat: 'Computing & Cybernetics', year: 1998, pat: 'US Pat. 5,924,280', inv: '3dfx Interactive', tag: 'Voodoo2 TMU' },
    { name: 'NVIDIA NV10 GeForce 256 Hardware Motion Compensation Video Unit', cat: 'Computing & Cybernetics', year: 1999, pat: 'US Pat. 6,317,820', inv: 'NVIDIA Corporation', tag: 'GeForce NV10' },
    { name: 'ATI Radeon 9700 Pro (R300) 256-Bit Bus DirectX 9 Programmable Shader', cat: 'Computing & Cybernetics', year: 2002, pat: 'US Pat. 6,697,064', inv: 'ATI Technologies Inc.', tag: 'Radeon R300' },
    { name: 'Intel Core 2 Duo Conroe Microarchitecture Shared L2 Execution Pipeline', cat: 'Computing & Cybernetics', year: 2006, pat: 'US Pat. 7,337,282', inv: 'Intel Israel R&D Center', tag: 'Core 2 Duo' },
    { name: 'AMD Zen Microarchitecture Execution Engine & Infinity Fabric Interconnect', cat: 'Computing & Cybernetics', year: 2017, pat: 'US Pat. 9,785,889', inv: 'Jim Keller & AMD Engineering', tag: 'AMD Zen' },
    { name: 'Apple M2 Max Unified Memory Interface & 38-Core GPU Engine Pipeline', cat: 'Computing & Cybernetics', year: 2023, pat: 'US Pat. 11,682,790', inv: 'Apple Silicon Hardware Team', tag: 'Apple M2 Max' },

    // ROBOTICS & AUTOMATION
    { name: 'KUKA KR 1000 Titan 6-Axis Robotic Arm Heavy Counterweight Link', cat: 'Robotics & Automation', year: 2007, pat: 'DE Pat. 10,2007,012', inv: 'KUKA Roboter GmbH', tag: 'KUKA Titan' },
    { name: 'Fanuc M-2000iA Heavy-Duty 2.3-Ton Industrial Robot Base Gearbox', cat: 'Robotics & Automation', year: 2008, pat: 'JP Pat. 4,812,020', inv: 'FANUC Corporation', tag: 'Fanuc Heavy' },
    { name: 'Yaskawa Motoman Dual-Arm 15-Axis Coordinated Articulated Robot Torso', cat: 'Robotics & Automation', year: 2006, pat: 'JP Pat. 4,210,125', inv: 'Yaskawa Electric Corp', tag: 'Motoman Dual' },
    { name: 'Universal Robots UR5 6-Axis Collaborative Lightweight Robot Joint Drive', cat: 'Robotics & Automation', year: 2008, pat: 'DK Pat. 178,411', inv: 'Esben Østergaard & Universal Robots', tag: 'UR5 Cobot' },
    { name: 'SoftBank Nao Bipedal Companion Humanoid Inertial Measurement Unit (IMU)', cat: 'Robotics & Automation', year: 2006, pat: 'FR Pat. 2,934,121', inv: 'Aldebaran Robotics & SoftBank', tag: 'Nao Robot' },
    { name: 'SoftBank Pepper Humanoid Omni-Directional Wheel Drive Base Unit', cat: 'Robotics & Automation', year: 2014, pat: 'FR Pat. 2,987,026', inv: 'Aldebaran & SoftBank Robotics', tag: 'Pepper Robot' },
    { name: 'Boston Dynamics WildCat High-Speed Running Quadruped Methanol Engine', cat: 'Robotics & Automation', year: 2013, pat: 'US Pat. 8,918,212', inv: 'Marc Raibert & Boston Dynamics', tag: 'WildCat' },
    { name: 'Boston Dynamics Atlas Electric Rotary Electro-Hydraulic Joint Actuator', cat: 'Robotics & Automation', year: 2024, pat: 'US Pat. 11,890,124', inv: 'Boston Dynamics R&D', tag: 'Atlas Electric' },

    // ENERGY & QUANTUM
    { name: 'Tesla Wardenclyffe Tower High-Voltage Magnifying Transmitter Terminal', cat: 'Energy & Quantum', year: 1901, pat: 'US Pat. 1,119,733', inv: 'Nikola Tesla', tag: 'Wardenclyffe' },
    { name: 'Westinghouse Holtwood Hydroelectric Vertical Francis Turbine Generator', cat: 'Energy & Quantum', year: 1910, pat: 'US Pat. 990,124', inv: 'Westinghouse Electric Company', tag: 'Holtwood Hydro' },
    { name: 'Hoover Dam Francis Hydroelectric Turbine 133,000 HP Runner Assembly', cat: 'Energy & Quantum', year: 1936, pat: 'US Pat. 1,942,882', inv: 'US Bureau of Reclamation & Allis-Chalmers', tag: 'Hoover Hydro' },
    { name: 'Grand Coulee Dam 805 MW Hydro Generator Stator Winding Frame', cat: 'Energy & Quantum', year: 1975, pat: 'US Pat. 3,927,918', inv: 'USBR & Westinghouse', tag: 'Grand Coulee' },
    { name: 'Shippingport Atomic Power Station PWR Core Fuel Pressure Vessel', cat: 'Energy & Quantum', year: 1957, pat: 'US Pat. 3,060,112', inv: 'Westinghouse & Hyman Rickover', tag: 'Shippingport' },
    { name: 'EBR-I Experimental Breeder Reactor Sodium-Potassium (NaK) Cooling Loop', cat: 'Energy & Quantum', year: 1951, pat: 'US Pat. 2,836,555', inv: 'Walter Zinn & Argonne National Lab', tag: 'EBR-I Reactor' },
    { name: 'Dounreay Fast Reactor DFR Spherical Containment Steel Vessel', cat: 'Energy & Quantum', year: 1959, pat: 'GB Pat. 782,110', inv: 'UKAEA Scotland', tag: 'Dounreay Fast' },
    { name: 'RBMK-1000 Chernobyl-Type Graphite Moderated Pressure Tube Channel', cat: 'Energy & Quantum', year: 1973, pat: 'USSR Pat. 1973/45', inv: 'NIKIET & Kurchatov Institute', tag: 'RBMK Reactor' },
    { name: 'Fukushima Daiichi BWR-4 Boiling Water Reactor Pressure Suppression Chamber', cat: 'Energy & Quantum', year: 1971, pat: 'US Pat. 3,505,216', inv: 'General Electric Nuclear', tag: 'BWR-4 Core' },
    { name: 'Vestas V117 4.2 MW Wind Turbine Permanent Magnet Synchronous Generator', cat: 'Energy & Quantum', year: 2017, pat: 'DK Pat. 178,412', inv: 'Vestas Wind Systems', tag: 'Vestas V117' },
    { name: 'First Solar Cadmium Telluride (CdTe) Thin-Film Solar Module Array', cat: 'Energy & Quantum', year: 2008, pat: 'US Pat. 7,414,117', inv: 'First Solar Inc.', tag: 'First Solar' },

    // AUTOMOTIVE & TRANSPORTATION
    { name: 'Model T Planetary Transmission Dual-Drum Triple Planetary Gearset', cat: 'Automotive & Transportation', year: 1908, pat: 'US Pat. 1,005,188', inv: 'Henry Ford & C.H. Wills', tag: 'Model T Trans' },
    { name: 'Duesenberg Model J Straight-8 32-Valve Dual Overhead Cam Cylinder Head', cat: 'Automotive & Transportation', year: 1928, pat: 'US Pat. 1,820,113', inv: 'Fred & August Duesenberg', tag: 'Duesenberg J' },
    { name: 'Austin Mini Transverse Engine-over-Gearbox FWD Subframe Package', cat: 'Automotive & Transportation', year: 1959, pat: 'GB Pat. 854,212', inv: 'Sir Alec Issigonis & BMC', tag: 'Classic Mini' },
    { name: 'Jaguar E-Type Independent Rear Suspension (IRS) Wishbone Frame', cat: 'Automotive & Transportation', year: 1961, pat: 'GB Pat. 923,411', inv: 'Bob Knight & Jaguar Cars', tag: 'Jaguar E-Type' },
    { name: 'Lamborghini Miura Transverse Rear Mid-Engine V12 Monocoque Chassis', cat: 'Automotive & Transportation', year: 1966, pat: 'IT Pat. 730,124', inv: 'Gian Paolo Dallara & Marcello Gandini', tag: 'Lamborghini Miura' },
    { name: 'Lamborghini Countach Longitudinal LP400 V12 Spaceframe Chassis', cat: 'Automotive & Transportation', year: 1974, pat: 'IT Pat. 941,121', inv: 'Paolo Stanzani & Marcello Gandini', tag: 'Countach' },
    { name: 'Ferrari F40 Tubular Steel Spaceframe & Carbon Kevlar Body Panel', cat: 'Automotive & Transportation', year: 1987, pat: 'IT Pat. 1,098,202', inv: 'Nicola Materazzi & Pininfarina', tag: 'Ferrari F40' },
    { name: 'Bugatti Veyron 16.4 Dual-Clutch 7-Speed Ricardo Transmission', cat: 'Automotive & Transportation', year: 2005, pat: 'DE Pat. 10,2005,012', inv: 'Ricardo plc & Bugatti', tag: 'Veyron Ricardo' },
    { name: 'Tesla Roadster AC Induction Electric Motor & 18650 Battery Pack', cat: 'Automotive & Transportation', year: 2008, pat: 'US Pat. 7,629,962', inv: 'Martin Eberhard, Marc Tarpenning, Elon Musk', tag: 'Tesla Roadster' },
    { name: 'Lucid Air Dual Permanent Magnet Electric Drive Unit (EDU) Inverter', cat: 'Automotive & Transportation', year: 2021, pat: 'US Pat. 11,043,866', inv: 'Peter Rawlinson & Lucid Motors', tag: 'Lucid Air EDU' },
    { name: 'Shinkansen Series 0 Bullet Train Streamlined Nose Nosecone & Bogie', cat: 'Automotive & Transportation', year: 1964, pat: 'JP Pat. 39-1234', inv: 'Hideo Shima & Japanese National Railways', tag: 'Shinkansen 0' },
    { name: 'TGV Sud-Est High-Speed Train Shared Articulated Jacobs Bogie', cat: 'Automotive & Transportation', year: 1981, pat: 'FR Pat. 2,422,109', inv: 'SNCF & Alstom', tag: 'TGV Jacobs Bogie' },

    // MEDICAL & BIOTECHNOLOGY
    { name: 'Curie Radium Isolation Platinum Tube Brachytherapy Applicator', cat: 'Medical & Biotechnology', year: 1903, pat: 'FR Hist. 1903', inv: 'Marie & Pierre Curie (Nobel Laureates)', tag: 'Radium Therapy' },
    { name: 'Fleming Penicillin Fermentation Extraction Glass Column Still', cat: 'Medical & Biotechnology', year: 1928, pat: 'GB Hist. 1928', inv: 'Sir Alexander Fleming & Howard Florey', tag: 'Penicillin Still' },
    { name: 'Salk Formalin-Inactivated Injected Polio Vaccine Virus Filter Vessel', cat: 'Medical & Biotechnology', year: 1955, pat: 'US Pat. 2,852,025', inv: 'Jonas Salk & Pitt School of Medicine', tag: 'Salk Vaccine' },
    { name: 'Watson and Crick B-DNA Double Helix Molecular Phosphor Model', cat: 'Medical & Biotechnology', year: 1953, pat: 'GB Hist. 1953', inv: 'James Watson, Francis Crick, Rosalind Franklin', tag: 'DNA Helix Model' },
    { name: 'Mullis Polymerase Chain Reaction (PCR) Thermal Cycler Block', cat: 'Medical & Biotechnology', year: 1983, pat: 'US Pat. 4,683,202', inv: 'Kary Mullis (Nobel Laureate) & Cetus', tag: 'PCR Thermal Cycler' },
    { name: 'Palmaz-Schatz Balloon-Expandable Stainless Steel Coronary Stent', cat: 'Medical & Biotechnology', year: 1988, pat: 'US Pat. 4,733,665', inv: 'Julio Palmaz & Richard Schatz', tag: 'Coronary Stent' },
    { name: 'DeBakey Left Ventricular Assist Device (LVAD) Axial Flow Blood Pump', cat: 'Medical & Biotechnology', year: 1998, pat: 'US Pat. 5,947,892', inv: 'Michael DeBakey & NASA Johnson', tag: 'DeBakey LVAD' },
    { name: 'Intuitive Surgical da Vinci Single-Site Laparoscopic Cannula Hub', cat: 'Medical & Biotechnology', year: 2011, pat: 'US Pat. 8,117,791', inv: 'Intuitive Surgical', tag: 'da Vinci Cannula' },

    // OPTICS & ASTRONOMY
    { name: 'Herschel 48-inch Speculum Metal Reflecting Telescope Wooden Gantry', cat: 'Optics & Astronomy', year: 1789, pat: 'GB Hist. 1789', inv: 'William Herschel', tag: 'Herschel Scope' },
    { name: 'Lord Rosse Leviathan of Parsonstown 72-inch Speculum Telescope Tube', cat: 'Optics & Astronomy', year: 1845, pat: 'IE Hist. 1845', inv: 'William Parsons 3rd Earl of Rosse', tag: 'Leviathan 72' },
    { name: 'Yerkes Observatory 40-inch Alvan Clark Refractor Telescope Tube Mount', cat: 'Optics & Astronomy', year: 1897, pat: 'US Pat. 583,937', inv: 'George Ellery Hale & Alvan Clark', tag: 'Yerkes 40-inch' },
    { name: 'Mount Wilson 100-inch Hooker Reflector Telescope Mirror Cell Assembly', cat: 'Optics & Astronomy', year: 1917, pat: 'US Pat. 1,250,912', inv: 'George Ellery Hale & Saint-Gobain Glass', tag: 'Hooker 100-inch' },
    { name: 'Very Large Array (VLA) 25-Meter Radio Telescope Cassegrain Antenna', cat: 'Optics & Astronomy', year: 1980, pat: 'US Pat. 4,281,812', inv: 'NRAO & E-Systems', tag: 'VLA Antenna' },
    { name: 'Arecibo 305-Meter Radio Telescope Spherical Reflector Cable Feed Platform', cat: 'Optics & Astronomy', year: 1963, pat: 'US Pat. 3,248,834', inv: 'William E. Gordon & Cornell University', tag: 'Arecibo Dish' },
    { name: 'ALMA Atacama Large Millimeter Array 12-Meter Cryogenic Receiver Antenna', cat: 'Optics & Astronomy', year: 2011, pat: 'US Pat. 8,240,610', inv: 'ESO, NRAO, NAOJ', tag: 'ALMA Cryo' },
    { name: 'Spitzer Space Telescope Cryogenic Helium-Cooled Infrared Mirror Assembly', cat: 'Optics & Astronomy', year: 2003, pat: 'US Pat. 6,854,689', inv: 'Ball Aerospace & NASA JPL', tag: 'Spitzer IR' },
    { name: 'Chandra X-Ray Observatory Nested Grazing-Incidence Mirror Shells', cat: 'Optics & Astronomy', year: 1999, pat: 'US Pat. 6,119,986', inv: 'Riccardo Giacconi & NASA Marshall', tag: 'Chandra X-Ray' },
    { name: 'Fermi Gamma-Ray Space Telescope Large Area Telescope (LAT) Silicon Tracker', cat: 'Optics & Astronomy', year: 2008, pat: 'US Pat. 7,609,800', inv: 'SLAC & NASA Goddard', tag: 'Fermi LAT' },

    // CONSUMER TECHNOLOGY
    { name: 'Edison Tinfoil Phonograph Brass Cylinder & Hand Crank Drive', cat: 'Consumer Technology', year: 1877, pat: 'US Pat. 200,522', inv: 'Thomas Alva Edison', tag: 'Edison Tinfoil' },
    { name: 'Eastman Kodak No. 1 Camera Roll Film Spool Key Mechanism', cat: 'Consumer Technology', year: 1888, pat: 'US Pat. 388,850', inv: 'George Eastman', tag: 'Kodak No. 1' },
    { name: 'Underwood No. 5 Front-Strike Typebar Typewriter Key Action', cat: 'Consumer Technology', year: 1899, pat: 'US Pat. 633,291', inv: 'Franz X. Wagner & John T. Underwood', tag: 'Underwood No 5' },
    { name: 'Remington Rand Univac 1004 Card Reader Punch Drum Feed', cat: 'Consumer Technology', year: 1962, pat: 'US Pat. 3,134,698', inv: 'Remington Rand Corporation', tag: 'Univac Card' },
    { name: 'Polaroid SX-70 Sonar Autofocus Transducer & Mirror Drive', cat: 'Consumer Technology', year: 1978, pat: 'US Pat. 4,151,324', inv: 'Edwin H. Land & Polaroid', tag: 'SX-70 Sonar' },
    { name: 'Sony BetaMax SL-8200 Videocassette U-Loading Tape Mechanism', cat: 'Consumer Technology', year: 1975, pat: 'JP Pat. 50-8912', inv: 'Nobutoshi Kihara & Sony', tag: 'BetaMax' },
    { name: 'JVC VHS HR-3300 M-Loading Video Cassette Transport Mechanism', cat: 'Consumer Technology', year: 1976, pat: 'JP Pat. 51-12093', inv: 'Yuma Shiraishi & JVC', tag: 'VHS Deck' },
    { name: 'Philips Compact Disc (CD) Player Optical Laser Read Head Pickup Assembly', cat: 'Consumer Technology', year: 1982, pat: 'EP Pat. 0,052,012', inv: 'Lou Ottens & Philips / Sony', tag: 'CD Laser Pick-up' },
    { name: 'Nintendo Super NES S-SMP Sony SPC700 8-Bit Audio Processing Unit', cat: 'Consumer Technology', year: 1990, pat: 'US Pat. 5,184,831', inv: 'Ken Kutaragi & Nintendo / Sony', tag: 'SNES SPC700' },
    { name: 'Sega Genesis Sega Mega Drive Yamaha YM2612 FM Synthesizer Sound Chip', cat: 'Consumer Technology', year: 1988, pat: 'JP Pat. 63-12094', inv: 'Yamaha & Sega Corporation', tag: 'Genesis YM2612' },
    { name: 'Nintendo 64 Reality Coprocessor (RCP) RSP Vector Processor Engine', cat: 'Consumer Technology', year: 1996, pat: 'US Pat. 5,831,625', inv: 'Silicon Graphics Inc. & Nintendo', tag: 'N64 RCP' },
    { name: 'Sega Dreamcast PowerVR2 CLX2 3D Graphics Accelerator Processor', cat: 'Consumer Technology', year: 1998, pat: 'US Pat. 6,031,993', inv: 'VideoLogic / Imagination Technologies & Sega', tag: 'Dreamcast GPU' },
    { name: 'Microsoft Xbox Custom NVIDIA XGPU 3D Engine & Intel Celeron CPU Bay', cat: 'Consumer Technology', year: 2001, pat: 'US Pat. 6,697,065', inv: 'Seamus Blackley & Microsoft Xbox Team', tag: 'Original Xbox' },
    { name: 'Apple iPod Original Mechanical Scroll Wheel Optical Encoder Wheel', cat: 'Consumer Technology', year: 2001, pat: 'US Pat. 6,883,202', inv: 'Tony Fadell, Jonathan Ive, Apple', tag: 'Original iPod' },

    // TO BE BUILT CONCEPTS
    { name: 'Mars Atmospheric Carbon Dioxide Sabatier Fuel Production Plant', cat: 'To Be Built Concepts', year: 2034, pat: 'CONCEPT/2034/MARS-CH4', inv: 'SpaceX ISRU Engineering & NASA', tag: 'Mars Sabatier' },
    { name: 'Lunar Regolith Solar Sintering Thermal Energy Storage Brick Vault', cat: 'To Be Built Concepts', year: 2030, pat: 'CONCEPT/2030/LUNAR-HEAT', inv: 'ESA Moon Village Architecture', tag: 'Lunar Heat' },
    { name: 'Asteroid Platinum-Group Metal Plasma Centrifuge Extractor Chamber', cat: 'To Be Built Concepts', year: 2036, pat: 'CONCEPT/2036/ASTEROID-FE', inv: 'Deep Space Industries Consortium', tag: 'Asteroid Extractor' },
    { name: 'Orbital Debris Elimination Laser Ablation Station Focusing Array', cat: 'To Be Built Concepts', year: 2032, pat: 'CONCEPT/2032/DEBRIS-LASER', inv: 'Clean Space International Organization', tag: 'Debris Laser' },
    { name: 'Hyperloop Electromagnetic Vacuum Tube Linear Induction Stator Track', cat: 'To Be Built Concepts', year: 2029, pat: 'CONCEPT/2029/HYPER-STATOR', inv: 'Virgin Hyperloop & Boring Company', tag: 'Hyperloop Track' },
    { name: 'Sub-Orbital Point-to-Point Methane Rocket Passenger Pod Pressure Ring', cat: 'To Be Built Concepts', year: 2035, pat: 'CONCEPT/2035/P2P-ROCKET', inv: 'Space Transportation Alliance', tag: 'Point-to-Point' }
  ];

  const hyper500List: BlueprintItem[] = [];

  for (let i = 0; i < 500; i++) {
    const seed = HYPER_SEEDS[i % HYPER_SEEDS.length];
    const index = i + 1;
    const isConcept = seed.cat === 'To Be Built Concepts' || seed.year >= 2025;

    const item: BlueprintItem = {
      id: `bp-hyper-${index}`,
      title: i < HYPER_SEEDS.length ? seed.name : `${seed.name} (Mk.${Math.floor(i / HYPER_SEEDS.length) + 1} Variant)`,
      patentNumber: i < HYPER_SEEDS.length ? seed.pat : `${seed.pat}-H${index}`,
      inventor: seed.inv,
      year: seed.year,
      category: seed.cat as BlueprintCategory,
      status: isConcept ? 'To Be Built Concept' : seed.year >= 2000 ? 'Active Standard' : 'Historical Patent',
      difficulty: isConcept ? 'Experimental' : index % 4 === 0 ? 'Advanced' : index % 2 === 0 ? 'Intermediate' : 'Basic',
      summary: `Verified master CAD engineering blueprint schema breakdown for ${seed.name}.`,
      description: `The ${seed.name} represents a major architectural milestone in ${seed.cat}. Pioneered by ${seed.inv} in ${seed.year}, this official CAD blueprint documents vector schematics, structural tolerances, sub-assembly geometry, and operational materials.`,
      historicalContext: `Archived technical blueprint preserve cataloged in the international engineering patent registry.`,
      specifications: {
        'Technical Standard': `${seed.tag} Spec Level ${1 + (index % 10)}`,
        'Design Tolerance': `±${(0.0005 + (index % 15) * 0.0005).toFixed(4)} mm`,
        'Operational Rating': `${180 + (index * 11) % 950} Units / Nominal`,
        'Thermal Maximum': `${250 + (index * 22) % 1800} °C`,
        'Total Mass': `${(1.8 + (index * 3.7) % 280).toFixed(2)} kg`
      },
      materials: [
        { partName: 'Primary Frame Structure', material: 'High-Tensile Titanium-Duralumin Matrix Substrate', quantity: '1 core unit', notes: 'Zero thermal strain structural casing' },
        { partName: 'Precision Drive Interface', material: 'Hardened Nitride-Coated Tool Steel', quantity: '2 sets', notes: 'Sub-micron tolerance bearing interface' }
      ],
      assemblySteps: [
        { stepNumber: 1, title: 'Frame Fixture & Securing', instruction: 'Mount primary structural chassis into high-precision laser guidance jig.' },
        { stepNumber: 2, title: 'Internal Sub-System Insertion', instruction: 'Insert dynamic mechanical and pneumatic sub-assemblies into aligned housing channels.' },
        { stepNumber: 3, title: 'Calibration & Dynamic Pass', instruction: 'Conduct full operational sweep to verify sub-micron clearance specifications.' }
      ],
      hotspots: [
        { id: `hs-h1-${index}`, x: 30 + (index % 40), y: 35 + (index % 30), partNumber: `CAD-${seed.tag}-${index}-A`, title: 'Primary Interface Enclosure', description: `Main structural node for ${seed.name}.`, material: 'Titanium Matrix' },
        { id: `hs-h2-${index}`, x: 70 - (index % 30), y: 65 - (index % 20), partNumber: `CAD-${seed.tag}-${index}-B`, title: 'High-Precision Actuator Node', description: 'Tolerance critical active load mechanism.', material: 'Hardened Tool Steel' }
      ],
      svgLayers: {
        framePaths: [
          `M ${65 + (index % 14) * 2} ${65 + (index % 14) * 2} L ${335 - (index % 14) * 2} ${65 + (index % 14) * 2} L ${335 - (index % 14) * 2} ${295 - (index % 14) * 2} L ${65 + (index % 14) * 2} ${295 - (index % 14) * 2} Z`
        ],
        mechanicalPaths: [
          `M 105 155 L 295 245 M 295 155 L 105 245`,
          `M 200 200 m -${26 + (index % 14)} 0 a ${26 + (index % 14)} ${26 + (index % 14)} 0 1 0 ${52 + (index % 14) * 2} 0 a ${26 + (index % 14)} ${26 + (index % 14)} 0 1 0 -${52 + (index % 14) * 2} 0`
        ],
        electricalPaths: [`M 85 200 L 315 200`],
        annotationLines: [{ x1: 200, y1: 150, x2: 255, y2: 95, label: `${seed.tag} Node` }],
        dimensionTexts: [{ x: 200, y: 315, text: `PATENT YEAR: ${seed.year}` }]
      },
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tags: [seed.tag, seed.cat, 'Master Patent', 'Blueprint CAD', `${seed.year}`],
      downloadsCount: Math.floor(22000 + (index * 940) % 65000)
    };

    hyper500List.push(item);
  }

  return hyper500List;
}
