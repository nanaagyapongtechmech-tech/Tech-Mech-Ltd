import React, { useState, useEffect, useRef } from 'react';
import { Box, Eye, Layers, Sparkles, RotateCcw } from 'lucide-react';

export const ThreeWorkshopView: React.FC = () => {
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [modelType, setModelType] = useState<'Tesseract' | 'Field Reactor' | 'Quantum Vacuum' | '36D Projection'>('Tesseract');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const render = () => {
      angle += 0.02 * rotationSpeed;
      ctx.fillStyle = 'rgba(2, 6, 23, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const size = 80;

      // Draw 3D Tesseract / Cube Wireframe projection
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];

      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y and X
        const radY = angle;
        const radX = angle * 0.7;

        let x1 = x * Math.cos(radY) - z * Math.sin(radY);
        let z1 = x * Math.sin(radY) + z * Math.cos(radY);

        let y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        let z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        const scale = 250 / (250 + z2 * 40);
        return {
          px: cx + x1 * size * scale,
          py: cy + y2 * size * scale
        };
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = wireframe ? 1.5 : 3;

      edges.forEach(([u, v]) => {
        ctx.beginPath();
        ctx.moveTo(projected[u].px, projected[u].py);
        ctx.lineTo(projected[v].px, projected[v].py);
        ctx.stroke();
      });

      // Inner Tesseract cube if Tesseract mode
      if (modelType === 'Tesseract') {
        const innerProjected = projected.map(p => ({
          px: cx + (p.px - cx) * 0.5,
          py: cy + (p.py - cy) * 0.5
        }));

        ctx.strokeStyle = '#a855f7';
        edges.forEach(([u, v]) => {
          ctx.beginPath();
          ctx.moveTo(innerProjected[u].px, innerProjected[u].py);
          ctx.lineTo(innerProjected[v].px, innerProjected[v].py);
          ctx.stroke();
        });

        // Connecting lines between inner and outer cubes
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.moveTo(projected[i].px, projected[i].py);
          ctx.lineTo(innerProjected[i].px, innerProjected[i].py);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotationSpeed, wireframe, modelType]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Box className="w-4 h-4" />
            3D WORKSHOP & INTERACTIVE GEOMETRY VISUALIZER
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Interactive 3D Spatial Model & Field Viewer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Rotate, explode, inspect, and label 3D hardware components, tesseracts, and field geometry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-slate-200">3D PROJECTION: {modelType}</span>
            <span className="text-cyan-400">ROTATION SPEED: {rotationSpeed.toFixed(1)}x</span>
          </div>

          <div className="h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex justify-center items-center">
            <canvas ref={canvasRef} width={600} height={320} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-xs font-bold text-slate-300 uppercase">3D VIEW CONTROLS</h2>

          <div className="space-y-2">
            {(['Tesseract', 'Field Reactor', 'Quantum Vacuum', '36D Projection'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setModelType(m)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                  modelType === m
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>ROTATION SPEED</span>
              <span className="text-cyan-400">{rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="3.0"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <button
            onClick={() => setWireframe(!wireframe)}
            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold"
          >
            Toggle Wireframe Mode ({wireframe ? 'ON' : 'OFF'})
          </button>
        </div>
      </div>
    </div>
  );
};
