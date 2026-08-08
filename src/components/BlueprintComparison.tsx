import React, { useState } from 'react';
import { BlueprintItem, BlueprintStyleMode } from '../types';
import { Scale, ArrowLeftRight, Check, Sparkles } from 'lucide-react';
import { getBlueprintById } from '../data/catalogEngine';

interface BlueprintComparisonProps {
  blueprints: BlueprintItem[];
  styleMode: BlueprintStyleMode;
  onView: (bp: BlueprintItem) => void;
}

export const BlueprintComparison: React.FC<BlueprintComparisonProps> = ({
  blueprints,
  styleMode,
  onView
}) => {
  const [selectedA, setSelectedA] = useState<string>(blueprints[0]?.id || '');
  const [selectedB, setSelectedB] = useState<string>(blueprints[1]?.id || blueprints[0]?.id || '');

  const bpA = blueprints.find((b) => b.id === selectedA) || getBlueprintById(selectedA);
  const bpB = blueprints.find((b) => b.id === selectedB) || getBlueprintById(selectedB);

  // Collect unique spec keys from both
  const allSpecKeys = Array.from(
    new Set([...Object.keys(bpA?.specifications || {}), ...Object.keys(bpB?.specifications || {})])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-sans text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/90 border border-cyan-900/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Scale className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Schematic Matrix Analyzer</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Side-by-Side Blueprint Comparison</h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Compare mechanical design evolution, specifications, and metallurgy between two historical or futuristic blueprints.
          </p>
        </div>

        {/* Blueprint Selectors */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={selectedA}
            onChange={(e) => setSelectedA(e.target.value)}
            className="w-full sm:w-60 bg-slate-950 border border-cyan-900/60 rounded-lg p-2 text-cyan-200 text-xs font-mono"
          >
            {blueprints.map((bp) => (
              <option key={`a-${bp.id}`} value={bp.id}>
                {bp.title} ({bp.year})
              </option>
            ))}
          </select>

          <ArrowLeftRight className="w-5 h-5 text-indigo-400 shrink-0 hidden sm:block" />

          <select
            value={selectedB}
            onChange={(e) => setSelectedB(e.target.value)}
            className="w-full sm:w-60 bg-slate-950 border border-indigo-900/60 rounded-lg p-2 text-indigo-200 text-xs font-mono"
          >
            {blueprints.map((bp) => (
              <option key={`b-${bp.id}`} value={bp.id}>
                {bp.title} ({bp.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by Side Previews */}
      {bpA && bpB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Blueprint A */}
          <div className="bg-slate-900/90 border border-cyan-900/60 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-900/50 pb-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {bpA.patentNumber}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{bpA.title}</h3>
                <p className="text-slate-400 font-sans text-xs">{bpA.inventor} ({bpA.year})</p>
              </div>
              <button
                onClick={() => onView(bpA)}
                className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 hover:bg-cyan-900 text-[11px]"
              >
                Inspect CAD
              </button>
            </div>

            {/* Vector Render Mini */}
            <div className="aspect-[16/9] bg-[#0A192F] border border-cyan-950 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {bpA.svgLayers.framePaths?.map((path, idx) => (
                  <path key={idx} d={path} fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                ))}
              </svg>
            </div>

            <div className="space-y-2">
              <p className="text-slate-300 font-sans text-xs leading-relaxed">{bpA.summary}</p>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px]">Status Grade:</span>
                <p className="text-cyan-300 font-bold">{bpA.status} • {bpA.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Blueprint B */}
          <div className="bg-slate-900/90 border border-indigo-900/60 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-900/50 pb-2">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {bpB.patentNumber}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{bpB.title}</h3>
                <p className="text-slate-400 font-sans text-xs">{bpB.inventor} ({bpB.year})</p>
              </div>
              <button
                onClick={() => onView(bpB)}
                className="px-2.5 py-1 rounded bg-indigo-950 border border-indigo-700 text-indigo-300 hover:bg-indigo-900 text-[11px]"
              >
                Inspect CAD
              </button>
            </div>

            {/* Vector Render Mini */}
            <div className="aspect-[16/9] bg-[#0A192F] border border-indigo-950 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {bpB.svgLayers.framePaths?.map((path, idx) => (
                  <path key={idx} d={path} fill="none" stroke="#818CF8" strokeWidth="2.5" />
                ))}
              </svg>
            </div>

            <div className="space-y-2">
              <p className="text-slate-300 font-sans text-xs leading-relaxed">{bpB.summary}</p>
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-[10px]">Status Grade:</span>
                <p className="text-indigo-300 font-bold">{bpB.status} • {bpB.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Specification Matrix */}
      {bpA && bpB && (
        <div className="bg-slate-900/90 border border-cyan-900/50 rounded-xl p-6 font-mono text-xs space-y-4">
          <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4" /> Technical Metric Comparison Matrix
          </h3>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                <tr>
                  <th className="p-3">Design Metric</th>
                  <th className="p-3 text-cyan-300">{bpA.patentNumber} ({bpA.year})</th>
                  <th className="p-3 text-indigo-300">{bpB.patentNumber} ({bpB.year})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-sans text-xs">
                {allSpecKeys.map((key, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/50">
                    <td className="p-3 font-mono font-bold text-slate-400">{key}</td>
                    <td className="p-3 font-mono text-cyan-300">{bpA.specifications[key] || 'N/A'}</td>
                    <td className="p-3 font-mono text-indigo-300">{bpB.specifications[key] || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
