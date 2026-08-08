import React, { useState } from 'react';
import { KnowledgeNodeData, KnowledgeEdgeData } from '../../types/lab';
import { Share2, Filter, Search, Sparkles } from 'lucide-react';

interface KnowledgeGraphViewProps {
  nodes: KnowledgeNodeData[];
  edges: KnowledgeEdgeData[];
}

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({
  nodes,
  edges
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'kn-uim');
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Share2 className="w-4 h-4" />
            UNIFIED KNOWLEDGE GRAPH & ONTOLOGY MAP
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Cross-Lab Relationship Topology</h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore interconnected ideas, theories, equations, devices, universes, and codex chapters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Canvas */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="h-96 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden p-6">
            {/* Visual Node Network */}
            <div className="relative w-full h-full flex flex-wrap gap-4 items-center justify-center p-4">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[9px] uppercase text-cyan-400">{node.type}</div>
                    <div className="font-bold text-slate-100 mt-0.5">{node.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
          <h2 className="text-xs font-bold text-slate-300 uppercase">NODE METRICS & RELATIONS</h2>

          {selectedNode && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-cyan-400">{selectedNode.type}</span>
                <div className="text-sm font-bold text-slate-100">{selectedNode.label}</div>
                <p className="text-slate-400 text-xs font-sans mt-1">{selectedNode.description}</p>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase">CONNECTED EDGES</div>
                {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map((e) => (
                  <div key={e.id} className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                    <span className="text-cyan-400">{e.relation}</span> → {e.target === selectedNode.id ? e.source : e.target}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
