import React, { useState } from 'react';
import { MultiverseNode } from '../../types/lab';
import { GitFork, ZoomIn, ZoomOut, Maximize2, Plus, ArrowRight } from 'lucide-react';

interface MultiverseMapViewProps {
  multiverse: MultiverseNode[];
  onAddMultiverseNode: (node: MultiverseNode) => void;
}

export const MultiverseMapView: React.FC<MultiverseMapViewProps> = ({
  multiverse,
  onAddMultiverseNode
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(multiverse[0]?.id || 'mult-1');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const selectedNode = multiverse.find(m => m.id === selectedNodeId) || multiverse[0];

  const handleBranchUniverse = () => {
    const newNode: MultiverseNode = {
      id: 'mult-' + Date.now(),
      name: `${selectedNode.name} (Child Branch)`,
      universe: {
        ...selectedNode.universe,
        id: 'uni-' + Date.now(),
        name: `${selectedNode.universe.name} (Branch)`,
        dimensions: selectedNode.universe.dimensions,
        parentUniverseId: selectedNode.universe.id
      },
      position: { x: selectedNode.position.x + 180, y: selectedNode.position.y + 100 },
      childrenIds: [],
      tags: ['Branched', 'Speculative']
    };

    onAddMultiverseNode(newNode);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <GitFork className="w-4 h-4" />
            MULTIVERSE MAP & COSMIC BRANCHING
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Multi-Cosmos Node Topology</h1>
          <p className="text-xs text-slate-400 mt-1">
            Map, branch, merge, and compare universes across dimensional parameters and energy metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBranchUniverse}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Branch Selected Universe</span>
          </button>
        </div>
      </div>

      {/* Multiverse Graph Node Map Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-slate-300">MULTIVERSE MAP ({multiverse.length} UNIVERSES)</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))} className="p-1 rounded hover:bg-slate-800"><ZoomOut className="w-3.5 h-3.5" /></button>
              <span>{Math.round(zoomLevel * 100)}%</span>
              <button onClick={() => setZoomLevel(z => Math.min(2.0, z + 0.1))} className="p-1 rounded hover:bg-slate-800"><ZoomIn className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="h-96 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden p-6 custom-scrollbar">
            <div
              className="relative w-full h-full transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
            >
              {multiverse.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ left: `${node.position.x / 10}%`, top: `${node.position.y / 6}%` }}
                    className={`absolute p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105 z-10'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono">{node.name}</div>
                    <div className="text-[10px] font-mono text-cyan-400 mt-1">{node.universe.dimensions}D Cosmos</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Universe Node Details */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">SELECTED COSMOS METRICS</h2>

          {selectedNode && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-500 text-[10px]">COSMOS NAME</div>
                <div className="text-sm font-bold text-slate-100 mt-0.5">{selectedNode.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">DIMENSIONS</div>
                  <div className="text-xs font-bold text-cyan-400">{selectedNode.universe.dimensions}D</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-500 text-[10px]">ENERGY DENSITY</div>
                  <div className="text-xs font-bold text-emerald-400">{selectedNode.universe.energyDensity}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
