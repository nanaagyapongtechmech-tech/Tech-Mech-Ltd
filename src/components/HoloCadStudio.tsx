import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Layers,
  RotateCw,
  Trash2,
  Download,
  Eye,
  Sun,
  Moon,
  Sparkles,
  Maximize2,
  Grid,
  Ruler,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface SpatialObject {
  id: string;
  name: string;
  category: 'Furniture' | 'Power & Energy' | 'Defense' | 'Tech Console';
  x: number; // percentage on grid 0..100
  y: number; // percentage on grid 0..100
  rotation: number; // 0, 90, 180, 270
  color: string;
}

const CATALOG_ITEMS = [
  { name: 'Quantum Reactor Core', category: 'Power & Energy' as const, color: '#06b6d4' },
  { name: 'Command Bridge Desk', category: 'Tech Console' as const, color: '#a855f7' },
  { name: 'Cryo Stasis Pod', category: 'Furniture' as const, color: '#10b981' },
  { name: 'Holographic Tactical Map', category: 'Tech Console' as const, color: '#f59e0b' },
  { name: 'Plasma Energy Barrier', category: 'Defense' as const, color: '#ef4444' },
  { name: 'Gravity Replicator Couch', category: 'Furniture' as const, color: '#3b82f6' }
];

export const HoloCadStudio: React.FC = () => {
  const [placedObjects, setPlacedObjects] = useState<SpatialObject[]>([
    { id: '1', name: 'Command Bridge Desk', category: 'Tech Console', x: 50, y: 40, rotation: 0, color: '#a855f7' },
    { id: '2', name: 'Quantum Reactor Core', category: 'Power & Energy', x: 20, y: 70, rotation: 90, color: '#06b6d4' },
    { id: '3', name: 'Cryo Stasis Pod', category: 'Furniture', x: 80, y: 30, rotation: 180, color: '#10b981' }
  ]);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('1');
  const [lightingMode, setLightingMode] = useState<'neon' | 'daylight' | 'stealth'>('neon');
  const [roomDimensions, setRoomDimensions] = useState<{ length: number; width: number }>({ length: 15, width: 12 });
  const [gridSnap, setGridSnap] = useState<boolean>(true);

  const selectedObject = placedObjects.find((o) => o.id === selectedObjectId);

  const handleAddItem = (item: typeof CATALOG_ITEMS[0]) => {
    const newObj: SpatialObject = {
      id: String(Date.now()),
      name: item.name,
      category: item.category,
      x: 35 + Math.floor(Math.random() * 30),
      y: 35 + Math.floor(Math.random() * 30),
      rotation: 0,
      color: item.color
    };
    setPlacedObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newObj.id);
  };

  const handleRotateSelected = () => {
    if (!selectedObjectId) return;
    setPlacedObjects((prev) =>
      prev.map((obj) => (obj.id === selectedObjectId ? { ...obj, rotation: (obj.rotation + 90) % 360 } : obj))
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedObjectId) return;
    setPlacedObjects((prev) => prev.filter((obj) => obj.id !== selectedObjectId));
    setSelectedObjectId(null);
  };

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedObjectId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    let yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    if (gridSnap) {
      xPercent = Math.round(xPercent / 5) * 5;
      yPercent = Math.round(yPercent / 5) * 5;
    }

    setPlacedObjects((prev) =>
      prev.map((obj) =>
        obj.id === selectedObjectId
          ? {
              ...obj,
              x: Math.max(5, Math.min(95, xPercent)),
              y: Math.max(5, Math.min(95, yPercent))
            }
          : obj
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 p-6 rounded-3xl border border-teal-800/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" /> APP 8 • HOLOCAD 3D ARCHITECTURE
            </span>
            <span className="text-xs text-slate-400 font-mono">SPATIAL STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Ruler className="w-8 h-8 text-teal-400" />
            HoloCad 3D Interior & Spatial Designer
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Design futuristic habitats, starship bridge layouts, and high-tech spatial rooms with 3D object snapping, lighting profiles, and CAD floor plan exports.
          </p>
        </div>

        {/* Lighting Mode Selectors */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
          <button
            onClick={() => setLightingMode('neon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'neon' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Cyber Neon
          </button>
          <button
            onClick={() => setLightingMode('daylight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'daylight' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> Daylight
          </button>
          <button
            onClick={() => setLightingMode('stealth')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              lightingMode === 'stealth' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" /> Stealth
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Catalog Sidebar */}
        <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            3D Spatial Catalog
          </h3>

          <div className="space-y-2 mb-6">
            {CATALOG_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleAddItem(item)}
                className="w-full text-left p-3 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/80 transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-400">{item.category}</div>
                </div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              </button>
            ))}
          </div>

          {/* Room Spec Controls */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono font-bold text-teal-400 mb-2">Room Dimensions</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400 block">Length (m)</label>
                <input
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) => setRoomDimensions((prev) => ({ ...prev, length: Number(e.target.value) }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Width (m)</label>
                <input
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) => setRoomDimensions((prev) => ({ ...prev, width: Number(e.target.value) }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Interactive 2D/3D Grid Floor Plan Canvas */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          <div
            onClick={handleGridClick}
            className={`relative h-96 w-full rounded-2xl border border-slate-800 overflow-hidden shadow-2xl cursor-crosshair transition-all ${
              lightingMode === 'neon'
                ? 'bg-slate-950'
                : lightingMode === 'daylight'
                ? 'bg-slate-900'
                : 'bg-black'
            }`}
          >
            {/* Grid Overlay Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

            {/* Room Dimension Label */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1 rounded-xl text-[11px] font-mono text-slate-300">
              CAD Grid: {roomDimensions.length}m x {roomDimensions.width}m ({roomDimensions.length * roomDimensions.width} m²)
            </div>

            {/* Placed Objects Rendering */}
            {placedObjects.map((obj) => {
              const isSelected = obj.id === selectedObjectId;

              return (
                <div
                  key={obj.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedObjectId(obj.id);
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border font-mono text-xs font-bold transition-all cursor-pointer shadow-lg flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-white bg-slate-900 shadow-teal-500/30 scale-105 z-20 ring-2 ring-teal-400'
                      : 'border-slate-800 bg-slate-900/80 hover:scale-100 z-10'
                  }`}
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    transform: `translate(-50%, -50%) rotate(${obj.rotation}deg)`
                  }}
                >
                  <div className="w-4 h-4 rounded-full mb-1" style={{ backgroundColor: obj.color }} />
                  <span className="text-[10px] text-white whitespace-nowrap">{obj.name}</span>
                </div>
              );
            })}
          </div>

          {/* Selected Object Control Toolbar */}
          {selectedObject ? (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedObject.color }} />
                <div>
                  <div className="font-bold text-sm text-white">{selectedObject.name}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    Pos: ({selectedObject.x}%, {selectedObject.y}%) | Rot: {selectedObject.rotation}°
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRotateSelected}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Rotate 90°</span>
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-2 rounded-xl bg-rose-950 border border-rose-800 hover:bg-rose-900 text-rose-300 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 font-mono text-center">
              Click any item on the CAD grid to select, rotate, or reposition it.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
