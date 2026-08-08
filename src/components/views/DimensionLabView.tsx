import React, { useState } from 'react';
import { Boxes, Sparkles, Layers, Box } from 'lucide-react';

export const DimensionLabView: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<number>(4);
  const [shapeType, setShapeType] = useState<'Hypercube' | 'Simplex' | 'Hypersphere'>('Hypercube');

  const verticesCount = shapeType === 'Hypercube'
    ? Math.pow(2, selectedDimension)
    : shapeType === 'Simplex'
    ? selectedDimension + 1
    : 'Infinite (Manifold)';

  const edgesCount = shapeType === 'Hypercube'
    ? selectedDimension * Math.pow(2, selectedDimension - 1)
    : shapeType === 'Simplex'
    ? (selectedDimension * (selectedDimension + 1)) / 2
    : 'N/A';

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Boxes className="w-4 h-4" />
            DIMENSION LAB (0D - 36D)
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Multi-Dimensional Spatial & Topological Projections</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore n-dimensional geometry, hypercubes (tesseracts, penteracts), simplexes, and lower-dimensional projections.
          </p>
        </div>
      </div>

      {/* Dimension Selector Slider */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between font-mono">
          <span className="text-xs font-bold text-slate-300">TARGET DIMENSION (N)</span>
          <span className="text-lg font-black text-cyan-400">{selectedDimension}D</span>
        </div>

        <input
          type="range"
          min="0"
          max="36"
          value={selectedDimension}
          onChange={(e) => setSelectedDimension(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />

        {/* Quick presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {[0, 1, 2, 3, 4, 5, 8, 11, 26, 36].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDimension(d)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors shrink-0 ${
                selectedDimension === d
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              {d}D
            </button>
          ))}
        </div>
      </div>

      {/* Shape Geometry & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase">HYPER-GEOMETRY TYPE</h2>
          <div className="space-y-2">
            {(['Hypercube', 'Simplex', 'Hypersphere'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setShapeType(type)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
                  shapeType === type
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono">
          <h2 className="text-xs font-bold text-slate-300 uppercase">MATHEMATICAL METRICS ({selectedDimension}D {shapeType})</h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px]">VERTICES COUNT</div>
              <div className="text-lg font-bold text-cyan-400 mt-1">{verticesCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px]">EDGES COUNT</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">{edgesCount}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <div className="text-cyan-400 font-bold">PROJECTION INTEGRAL FORMULA (ND → 3D)</div>
            <div className="text-slate-400">P_3D = ∫ M^{selectedDimension-3} d^{selectedDimension-3}x √( -g )</div>
          </div>
        </div>
      </div>
    </div>
  );
};
