import React, { useState, useEffect, useRef } from 'react';
import { UniverseParams } from '../../types/lab';
import { Globe, Play, Pause, RotateCcw, SkipForward, Rewind, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

interface UniverseSimulatorViewProps {
  universes: UniverseParams[];
  onAddUniverse: (uni: UniverseParams) => void;
}

export const UniverseSimulatorView: React.FC<UniverseSimulatorViewProps> = ({
  universes,
  onAddUniverse
}) => {
  const [activeUniverse, setActiveUniverse] = useState<UniverseParams>(
    universes[0] || {
      id: 'uni-1',
      name: 'Universe Alpha',
      dimensions: 4,
      energyDensity: 1.0,
      massMultiplier: 1.0,
      informationRate: 2.5,
      vacuumFluctuation: 0.1,
      interactionStrength: 1.0,
      expansionRate: 1.02,
      recursionLevel: 1,
      isSpeculative: false
    }
  );

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [ticks, setTicks] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particles state for canvas simulation
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string }[]>([]);

  useEffect(() => {
    // Initialize particles
    const count = 60;
    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * 600,
      y: Math.random() * 350,
      vx: (Math.random() - 0.5) * activeUniverse.interactionStrength * 2,
      vy: (Math.random() - 0.5) * activeUniverse.interactionStrength * 2,
      color: activeUniverse.dimensions > 4 ? '#38bdf8' : '#a855f7'
    }));
  }, [activeUniverse.id, activeUniverse.dimensions, activeUniverse.interactionStrength]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTicks(t => t + 1);

      // Render canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles and attraction/repulsion lines
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * simSpeed * activeUniverse.expansionRate;
        p.y += p.vy * simSpeed * activeUniverse.expansionRate;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 60})`;
            ctx.stroke();
          }
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, simSpeed, activeUniverse]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Simulation Outcome Notice:</strong> Outcomes represent abstract computational model results rather than predictions of real cosmological systems.
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            UNIVERSE SIMULATOR & PARAMETER ENGINE
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">{activeUniverse.name} ({activeUniverse.dimensions}D)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate physical constants, vacuum fluctuations, expansion rates, and particle coupling fields.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setTicks(0)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="px-3 py-1 font-mono text-xs text-slate-300">
            Speed: {simSpeed}x
          </div>
        </div>
      </div>

      {/* Main Simulation View & Parameter Tuning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Render */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-slate-200 uppercase">SIMULATION TIME STEP: {ticks}</span>
            <span className="text-cyan-400">Dim: {activeUniverse.dimensions}D • Exp: {activeUniverse.expansionRate}</span>
          </div>

          <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              width={600}
              height={350}
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">COSMOLOGICAL CONSTANTS</h2>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>DIMENSIONS</span>
                <span className="text-cyan-400">{activeUniverse.dimensions}D</span>
              </div>
              <input
                type="range"
                min="1"
                max="36"
                value={activeUniverse.dimensions}
                onChange={(e) => setActiveUniverse({ ...activeUniverse, dimensions: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>INTERACTION STRENGTH</span>
                <span className="text-cyan-400">{activeUniverse.interactionStrength.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={activeUniverse.interactionStrength}
                onChange={(e) => setActiveUniverse({ ...activeUniverse, interactionStrength: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>EXPANSION RATE</span>
                <span className="text-cyan-400">{activeUniverse.expansionRate.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.05"
                value={activeUniverse.expansionRate}
                onChange={(e) => setActiveUniverse({ ...activeUniverse, expansionRate: Number(e.target.value) })}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
