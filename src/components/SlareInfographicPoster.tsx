import React, { useState } from 'react';
import { BlueprintItem } from '../types';
import {
  Sparkles,
  Zap,
  Activity,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Download,
  Share2,
  Maximize2,
  Compass,
  Cpu,
  Sun,
  Flame,
  Radio,
  Eye,
  Sliders,
  Award,
  Maximize
} from 'lucide-react';
import { getRealPhotographUrl, getNodePictureUrl } from '../utils/photoImages';

interface SlareInfographicPosterProps {
  blueprint: BlueprintItem;
  onClose?: () => void;
}

export const SlareInfographicPoster: React.FC<SlareInfographicPosterProps> = ({
  blueprint,
  onClose
}) => {
  const [activePin, setActivePin] = useState<number | null>(null);
  const [selectedFlowLayer, setSelectedFlowLayer] = useState<string>('all');
  const photoUrl = blueprint.imageUrl || getRealPhotographUrl(blueprint.id, blueprint.category);

  const handlePrint = () => {
    window.print();
  };

  // 17 Cutaway Callout Nodes
  const callouts = [
    { id: 1, title: 'Solar / Quantum Collector Array', x: 22, y: 22, desc: 'High-efficiency photovoltaic photovoltaic-quantum glass capturing ambient radiation.' },
    { id: 2, title: 'Solid-State Battery Pack', x: 63, y: 15, desc: '99.8% energy density lithium-sulfur energy storage array.' },
    { id: 3, title: 'AI Power Management Unit', x: 44, y: 20, desc: 'Sub-millisecond microsecond power distribution matrix.' },
    { id: 4, title: 'Laser Heating Supercharger System', x: 28, y: 28, desc: 'Precision diode laser assembly producing superheated thermal plasma.' },
    { id: 5, title: 'Water / Reaction Reservoir', x: 36, y: 27, desc: 'Pressurized non-corrosive fluid containment tank.' },
    { id: 6, title: 'Streamlined Heating Tubes', x: 50, y: 16, desc: 'Ultra-conductive ceramic-graphene thermal exchange channels.' },
    { id: 7, title: 'H & O Reaction Control Valves', x: 57, y: 25, desc: 'Precision solenoid metering valves for atomic gas injection.' },
    { id: 8, title: 'Air Intake Filter Assembly', x: 40, y: 28, desc: 'HEPA-nanofiber particulate filtration matrix.' },
    { id: 9, title: 'Primary Reaction Chamber', x: 47, y: 25, desc: 'Magnetically confined reaction core with sapphire viewing window.' },
    { id: 10, title: 'Expansion Nozzles', x: 52, y: 26, desc: 'Multi-stage supersonic venturi nozzles.' },
    { id: 11, title: 'High-Speed Turbine Generator', x: 56, y: 26, desc: '120,000 RPM ceramic-rotor magnetic bearing turbine.' },
    { id: 12, title: 'Brushless Generator Core', x: 62, y: 26, desc: 'Neodymium permanent magnet high-voltage generator.' },
    { id: 13, title: 'Primary Electric Drive Motor', x: 65, y: 26, desc: '98% efficiency axial-flux electric propulsion motor.' },
    { id: 14, title: 'Reinforced Crankshaft Assembly', x: 52, y: 32, desc: 'Titanium-forged mechanical torque distribution shaft.' },
    { id: 15, title: 'Differential & Transmission', x: 67, y: 26, desc: 'Direct-torque vectoring planetary gear system.' },
    { id: 16, title: 'Cooling & Condensation Loop', x: 50, y: 33, desc: 'Closed-loop microchannel radiator and vapor recovery.' },
    { id: 17, title: 'Safety & Telemetry Monitoring', x: 55, y: 15, desc: 'Redundant triple-bus fail-safe monitoring sensors.' }
  ];

  return (
    <div className="w-full bg-[#030712] text-slate-100 p-2 sm:p-4 md:p-6 font-sans select-none overflow-x-hidden border-8 border-cyan-500/20 rounded-2xl shadow-[0_0_80px_rgba(6,182,212,0.15)] relative print:border-none print:shadow-none print:p-0">
      
      {/* Top Poster Control Bar (Hidden on print) */}
      <div className="flex items-center justify-between bg-slate-900/90 border border-cyan-500/30 rounded-xl px-4 py-2 mb-4 print:hidden backdrop-blur-md">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider uppercase">SLARE INFOGRAPHIC BLUEPRINT POSTER • {blueprint.patentNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Full Blueprint Poster</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* HEADER BANNER */}
      {/* ========================================================= */}
      <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-xl p-4 mb-4 relative overflow-hidden shadow-[0_4px_25px_rgba(6,182,212,0.2)]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 via-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center text-center p-1">
                <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
                <span className="text-[9px] font-mono font-black text-cyan-300 uppercase tracking-tighter">SLARE</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-mono">
                  {blueprint.title} – FINAL DESIGN
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                HIGH-PRECISION INTEGRATED VECTOR CAD INFOGRAPHIC SCHEMATIC
              </p>
            </div>
          </div>

          {/* Top Key Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] sm:text-xs text-slate-200">
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <div className="font-bold text-amber-300">100% SOLAR</div>
                <div className="text-[9px] text-slate-400">POWERED</div>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-cyan-500/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <div className="font-bold text-cyan-300">ZERO EMISSION</div>
                <div className="text-[9px] text-slate-400">(WATER VAPOR)</div>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-blue-500/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <div>
                <div className="font-bold text-blue-300">HIGH EFFICIENCY</div>
                <div className="text-[9px] text-slate-400">TURBINE GENERATOR</div>
              </div>
            </div>
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="font-bold text-emerald-300">ELECTRIC DRIVE</div>
                <div className="text-[9px] text-slate-400">CRANKSHAFT SYSTEM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN TOP SECTION GRID (3 COLUMNS) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        
        {/* LEFT COLUMN: SECTIONS 1, 2, 3, 4 */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* 1. SYSTEM SPECIFICATIONS TABLE */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 flex items-center justify-between mb-2">
              <span>1. SYSTEM SPECIFICATIONS ({blueprint.category})</span>
            </div>
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-1 font-semibold">Parameter</th>
                  <th className="pb-1 text-right font-semibold">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                <tr><td className="py-1">Peak Power Output</td><td className="text-right text-cyan-300 font-bold">150 kW (200 HP)</td></tr>
                <tr><td className="py-1">Continuous Power</td><td className="text-right text-cyan-300 font-bold">80 kW</td></tr>
                <tr><td className="py-1">System Efficiency</td><td className="text-right text-emerald-400 font-bold">55 – 65 %</td></tr>
                <tr><td className="py-1">Operating Speed</td><td className="text-right">180 km/h</td></tr>
                <tr><td className="py-1">0 – 100 km/h Acceleration</td><td className="text-right text-amber-300 font-bold">6.5 seconds</td></tr>
                <tr><td className="py-1">Driving Range</td><td className="text-right text-cyan-300 font-bold">800 – 1000 km</td></tr>
                <tr><td className="py-1">Water Reservoir Capacity</td><td className="text-right">30 Liters</td></tr>
                <tr><td className="py-1">H₂ Capacity / O₂ Capacity</td><td className="text-right">2 kg / 2 kg</td></tr>
                <tr><td className="py-1">Battery Storage</td><td className="text-right">25 kWh</td></tr>
                <tr><td className="py-1">System Weight (Est.)</td><td className="text-right">350 – 450 kg</td></tr>
                <tr><td className="py-1">Emissions Rating</td><td className="text-right text-emerald-400 font-bold">Zero (Water Vapor)</td></tr>
                <tr><td className="py-1">Patent Number</td><td className="text-right text-cyan-400">{blueprint.patentNumber}</td></tr>
              </tbody>
            </table>
          </div>

          {/* 2. KEY FEATURES */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
              <span>2. KEY FEATURES</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Solar powered – clean and sustainable energy matrix</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Laser precision heating for maximum thermal efficiency</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>High-energy reaction chamber for extreme power density</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Turbine generator for continuous smooth power delivery</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Electric motor drives the mechanical crankshaft directly</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Water is the primary working fluid (non-toxic loop)</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>AI telemetry control for safety, performance & range</span></li>
              <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>Scalable for cars, trucks, trains, drones & orbital craft</span></li>
            </ul>
          </div>

          {/* 3. MAIN COMPONENTS LIST */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md max-h-72 overflow-y-auto">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2 sticky top-0 bg-slate-950 z-10 flex items-center justify-between">
              <span>3. MAIN COMPONENTS LIST (1 - 17)</span>
              <span className="text-[10px] text-amber-400 font-bold">🖼️ Node Photos</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px] text-slate-300">
              {callouts.map((c) => {
                const nodeImg = getNodePictureUrl(c.id, c.title);
                const isSelected = activePin === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActivePin(c.id)}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all flex items-center gap-2.5 border ${
                      isSelected
                        ? 'bg-amber-500/20 text-white font-bold border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 border border-cyan-500/40 bg-slate-950">
                      <img
                        src={nodeImg}
                        alt={c.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-slate-950/20" />
                      <span className="absolute top-0.5 left-0.5 text-[8px] font-black text-amber-300 bg-slate-950/90 px-1 rounded">
                        #{c.id}
                      </span>
                    </div>
                    <div className="flex-1 truncate">
                      <div className="truncate font-semibold text-xs flex items-center justify-between">
                        <span className={isSelected ? 'text-amber-300' : 'text-slate-200'}>{c.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. ENERGY FLOW (SIMPLIFIED) */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
              <span>4. ENERGY FLOW (SIMPLIFIED)</span>
            </div>
            <div className="flex items-center justify-between gap-1 overflow-x-auto p-1 font-mono text-[9px] text-center">
              <div className="bg-slate-900 border border-amber-500/40 p-1 rounded min-w-[50px]">
                <Sun className="w-3 h-3 text-amber-400 mx-auto" />
                <span>Solar</span>
              </div>
              <span className="text-cyan-400">➔</span>
              <div className="bg-slate-900 border border-cyan-500/40 p-1 rounded min-w-[50px]">
                <Zap className="w-3 h-3 text-cyan-400 mx-auto" />
                <span>Battery</span>
              </div>
              <span className="text-cyan-400">➔</span>
              <div className="bg-slate-900 border border-red-500/40 p-1 rounded min-w-[55px]">
                <Flame className="w-3 h-3 text-red-400 mx-auto" />
                <span>Laser Heat</span>
              </div>
              <span className="text-cyan-400">➔</span>
              <div className="bg-slate-900 border border-purple-500/40 p-1 rounded min-w-[55px]">
                <Activity className="w-3 h-3 text-purple-400 mx-auto" />
                <span>Reaction</span>
              </div>
              <span className="text-cyan-400">➔</span>
              <div className="bg-slate-900 border border-emerald-500/40 p-1 rounded min-w-[50px]">
                <Cpu className="w-3 h-3 text-emerald-400 mx-auto" />
                <span>Turbine</span>
              </div>
              <span className="text-cyan-400">➔</span>
              <div className="bg-slate-900 border border-blue-500/40 p-1 rounded min-w-[50px]">
                <Compass className="w-3 h-3 text-blue-400 mx-auto" />
                <span>Wheels</span>
              </div>
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: SECTION 5 - CUTAWAY VIEW */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-slate-950 border-2 border-cyan-500/50 rounded-xl p-3 flex-1 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
            
            {/* Header Title */}
            <div className="bg-cyan-950/90 border-b border-cyan-700/60 px-3 py-1.5 rounded-t-lg font-mono text-sm font-bold text-cyan-300 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-cyan-400" />
                <span>5. SYSTEM LAYOUT – CUTAWAY VIEW</span>
              </div>
              <span className="text-xs text-slate-400 font-normal">Interactive Callouts (1–17)</span>
            </div>

            {/* Cutaway Rendering Viewport */}
            <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] my-2 rounded-lg overflow-hidden border border-cyan-900/40 bg-slate-950 group">
              
              {/* Photorealistic Cutaway Image */}
              <img
                src={photoUrl}
                alt={blueprint.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.2] saturate-[1.15]"
              />

              {/* Blueprint Grid Lines & Vignette */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d418_1px,transparent_1px),linear-gradient(to_bottom,#06b6d418_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 opacity-80 pointer-events-none" />

              {/* Vector Blueprint Lines Overlay */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none opacity-85">
                {blueprint.svgLayers.framePaths?.map((p, i) => (
                  <path key={`fp-${i}`} d={p} fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                ))}
                {blueprint.svgLayers.mechanicalPaths?.map((p, i) => (
                  <path key={`mp-${i}`} d={p} fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 2" />
                ))}
                {blueprint.svgLayers.electricalPaths?.map((p, i) => (
                  <path key={`ep-${i}`} d={p} fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                ))}
              </svg>

              {/* Numbered Pins (1 to 17) */}
              {callouts.map((pin) => (
                <div
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all transform ${
                    activePin === pin.id ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-extrabold border-2 shadow-[0_0_12px_rgba(6,182,212,0.8)] ${
                    activePin === pin.id
                      ? 'bg-amber-400 text-slate-950 border-white animate-pulse'
                      : 'bg-cyan-950 text-cyan-300 border-cyan-400 hover:bg-cyan-500 hover:text-slate-950'
                  }`}>
                    {pin.id}
                  </div>
                </div>
              ))}

              {/* Active Callout Inspector Overlay Banner */}
              {activePin && (() => {
                const activeCallout = callouts.find(c => c.id === activePin);
                const activeImg = activeCallout ? getNodePictureUrl(activeCallout.id, activeCallout.title) : '';
                return (
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/95 border-2 border-amber-500/80 rounded-xl p-3 shadow-2xl z-30 font-mono animate-fadeIn flex items-center gap-3">
                    {activeImg && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.4)] bg-slate-900">
                        <img src={activeImg} alt={activeCallout?.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-center font-bold text-amber-300 py-0.5">
                          NODE #{activePin}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
                        <span className="truncate">CALLOUT NODE #{activePin}: {activeCallout?.title}</span>
                        <button
                          onClick={() => setActivePin(null)}
                          className="text-slate-400 hover:text-white text-xs underline cursor-pointer ml-2 shrink-0"
                        >
                          Close
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-snug">
                        {activeCallout?.desc}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bottom Sub-Legend inside Cutaway Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[10px] text-slate-300 mt-1">
              <div className="bg-slate-900 px-2 py-1 rounded border border-cyan-500/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Primary Laser Loop</span>
              </div>
              <div className="bg-slate-900 px-2 py-1 rounded border border-amber-500/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Superheated Steam</span>
              </div>
              <div className="bg-slate-900 px-2 py-1 rounded border border-purple-500/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Plasma Core</span>
              </div>
              <div className="bg-slate-900 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Turbine Output</span>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: SECTIONS 6, 7, 8 */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* 6. REACTION CHAMBER - CROSS SECTION */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
              <span>6. REACTION CHAMBER - CROSS SECTION</span>
            </div>
            
            {/* SVG Schematic Diagram of Reaction Chamber */}
            <div className="relative h-44 bg-slate-900 border border-cyan-900/50 rounded-lg p-2 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 150" className="w-full h-full">
                {/* Cylindrical Chamber Body */}
                <rect x="50" y="20" width="100" height="110" rx="10" fill="#0A192F" stroke="#38BDF8" strokeWidth="2" />
                {/* Internal Reaction Core */}
                <circle cx="100" cy="75" r="28" fill="#581C87" stroke="#A855F7" strokeWidth="2" className="animate-pulse" />
                <circle cx="100" cy="75" r="16" fill="#06B6D4" stroke="#67E8F9" strokeWidth="1.5" />
                
                {/* Flow Inlets & Arrows */}
                <path d="M 10 35 L 50 35" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="12" y="30" fill="#FCA5A5" fontSize="7" fontSerif="mono">Superheated Steam</text>
                
                <path d="M 10 65 L 50 65" stroke="#3B82F6" strokeWidth="2" />
                <text x="12" y="60" fill="#93C5FD" fontSize="7" fontSerif="mono">Air Inlet</text>

                <path d="M 10 95 L 50 95" stroke="#10B981" strokeWidth="2" />
                <text x="12" y="90" fill="#6EE7B7" fontSize="7" fontSerif="mono">H₂ Inlet</text>

                <path d="M 10 120 L 50 120" stroke="#EC4899" strokeWidth="2" />
                <text x="12" y="115" fill="#F472B6" fontSize="7" fontSerif="mono">O₂ Inlet</text>

                {/* Expansion Nozzles Output Right */}
                <path d="M 150 55 L 185 40 M 150 75 L 190 75 M 150 95 L 185 110" stroke="#38BDF8" strokeWidth="2" />
                <text x="152" y="32" fill="#38BDF8" fontSize="7" fontSerif="mono">Multi-Stage Nozzles</text>
                <text x="152" y="125" fill="#38BDF8" fontSize="7" fontSerif="mono">High-Energy Gas Out</text>
              </svg>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1.5 leading-tight">
              Reaction controlled by sub-millisecond laser pulse duration, pressure valves, and thermal injectors.
            </p>
          </div>

          {/* 7. SYSTEM FLOW DIAGRAM (DETAILED) */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
              <span>7. SYSTEM FLOW DIAGRAM (DETAILED)</span>
            </div>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-red-500 rounded" /><span className="text-slate-300">Thermal / Heat Flow</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-cyan-400 rounded" /><span className="text-slate-300">Water / Steam Loop</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-emerald-400 rounded" /><span className="text-slate-300">Hydrogen Gas Flow</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-purple-400 rounded" /><span className="text-slate-300">Oxygen Gas Flow</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-amber-400 rounded" /><span className="text-slate-300">Electrical Bus Conduit</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-1 bg-blue-400 rounded" /><span className="text-slate-300">Control & Telemetry Signals</span></div>
            </div>
          </div>

          {/* 8. PERFORMANCE COMPARISON TABLE */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
            <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
              <span>8. PERFORMANCE COMPARISON</span>
            </div>
            <table className="w-full text-left font-mono text-[10px]">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-1">Feature</th>
                  <th className="pb-1">Gasoline</th>
                  <th className="pb-1">Battery EV</th>
                  <th className="pb-1 text-cyan-300 font-bold">SLARE Spec</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300">
                <tr><td className="py-1 font-semibold">Emissions</td><td>High</td><td>Zero</td><td className="text-emerald-400 font-bold">Zero (Vapor)</td></tr>
                <tr><td className="py-1 font-semibold">Efficiency</td><td>20-30%</td><td>70-90%</td><td className="text-cyan-300 font-bold">55-65%</td></tr>
                <tr><td className="py-1 font-semibold">Refuel Time</td><td>5 min</td><td>30m-8h</td><td className="text-amber-300 font-bold">2-5 min</td></tr>
                <tr><td className="py-1 font-semibold">Driving Range</td><td>500 km</td><td>400 km</td><td className="text-cyan-300 font-bold">800-1000 km</td></tr>
                <tr><td className="py-1 font-semibold">Power Density</td><td>Medium</td><td>High</td><td className="text-emerald-400 font-bold">Ultra-High</td></tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM PANELS ROW (SECTIONS 9, 10, 11, 12) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        
        {/* 9. VEHICLE DIMENSIONS (EXAMPLE) */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
          <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
            <span>9. VEHICLE DIMENSIONS</span>
          </div>
          <div className="h-28 bg-slate-900 border border-cyan-900/40 rounded-lg p-2 flex items-center justify-between relative overflow-hidden">
            {/* Front & Side Vector Blueprint Silhouettes */}
            <svg viewBox="0 0 200 80" className="w-full h-full">
              {/* Front Silhouette */}
              <rect x="10" y="25" width="40" height="30" rx="5" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="20" cy="55" r="8" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="40" cy="55" r="8" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <text x="12" y="70" fill="#94A3B8" fontSize="6" fontSerif="mono">1890 mm</text>

              {/* Side Silhouette */}
              <path d="M 65 35 Q 85 20 120 20 L 160 30 L 175 40 L 175 55 L 65 55 Z" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="85" cy="55" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="155" cy="55" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              {/* Dimension lines */}
              <line x1="65" y1="68" x2="175" y2="68" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 1" />
              <text x="105" y="76" fill="#F59E0B" fontSize="6" fontSerif="mono">4800 mm</text>
            </svg>
          </div>
        </div>

        {/* 10. SAFETY SYSTEMS */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
          <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
            <span>10. SAFETY SYSTEMS</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Over-Pressure Relief</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Auto Shutoff Valves</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Gas Leak Detectors</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Crash Safety Cutoff</span>
            </div>
          </div>
        </div>

        {/* 11. APPLICATIONS */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md">
          <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
            <span>11. APPLICATIONS</span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center font-mono text-[9px] text-slate-300">
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚗 Cars</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚙 SUVs</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚚 Trucks</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚌 Buses</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚆 Trains</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚁 Drones</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🛸 Special</div>
            <div className="bg-slate-900 border border-slate-800 p-1 rounded">🚀 Orbital</div>
          </div>
        </div>

        {/* 12. LEGEND & NOTES */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-3 shadow-md font-mono text-[10px] text-slate-300">
          <div className="bg-cyan-950/80 border-b border-cyan-700/50 px-2.5 py-1 rounded-t-lg font-mono text-xs font-bold text-cyan-300 mb-2">
            <span>12. LEGEND & NOTES</span>
          </div>
          <p className="leading-tight text-slate-400">
            {blueprint.title} turbine generator system uses solar & laser heat energy to drive water reaction loops. The motor turns crankshaft delivering mechanical propulsion torque directly to wheels.
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* FOOTER BANNER */}
      {/* ========================================================= */}
      <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-xl p-3 font-mono flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div>
          <h3 className="text-sm sm:text-base font-black text-cyan-300 tracking-wider uppercase">
            {blueprint.title.toUpperCase()} – POWERED BY THE SUN, DRIVEN BY INNOVATION, MOVING THE FUTURE.
          </h3>
          <p className="text-[10px] text-slate-400">
            OMNIBLUEPRINT VECTOR SCHEMATICS ARCHIVE • PATENT #{blueprint.patentNumber} • AUTHOR: {blueprint.inventor.toUpperCase()} ({blueprint.year})
          </p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-black text-xs rounded uppercase tracking-wider shadow">
            CLEAN ENERGY. LIMITLESS POWER.
          </span>
        </div>
      </div>

    </div>
  );
};
