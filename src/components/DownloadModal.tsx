import React, { useState } from 'react';
import { BlueprintItem } from '../types';
import { X, FileCode, FileText, Image as ImageIcon, Printer, CheckCircle, Download } from 'lucide-react';

interface DownloadModalProps {
  blueprint: BlueprintItem | null;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ blueprint, onClose }) => {
  if (!blueprint) return null;

  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  // Download SVG file
  const handleDownloadSvg = () => {
    const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="1200" height="1200" style="background-color: #0A192F;">`;
    const framePaths = blueprint.svgLayers.framePaths?.map((p) => `<path d="${p}" fill="none" stroke="#38BDF8" stroke-width="2.5"/>`).join('\n') || '';
    const mechPaths = blueprint.svgLayers.mechanicalPaths?.map((p) => `<path d="${p}" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="4 2"/>`).join('\n') || '';
    const elecPaths = blueprint.svgLayers.electricalPaths?.map((p) => `<path d="${p}" fill="none" stroke="#F59E0B" stroke-width="1.5"/>`).join('\n') || '';
    const svgFooter = `</svg>`;

    const fullSvgStr = `${svgHeader}\n${framePaths}\n${mechPaths}\n${elecPaths}\n${svgFooter}`;

    const blob = new Blob([fullSvgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${blueprint.patentNumber.replace(/[^a-zA-Z0-9]/g, '_')}_blueprint.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat('SVG Vector Graphic');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  // Download CAD JSON
  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${blueprint.patentNumber.replace(/[^a-zA-Z0-9]/g, '_')}_cad_spec.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat('CAD JSON Specifications');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  // Print Formatted PDF / Spec Document
  const handlePrintDocument = () => {
    window.print();
    setDownloadedFormat('Printable Technical Document');
    setTimeout(() => setDownloadedFormat(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="bg-slate-900 border border-cyan-900/80 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs text-cyan-400 font-bold">{blueprint.patentNumber}</span>
          <h3 className="text-lg font-bold text-white tracking-tight">{blueprint.title}</h3>
          <p className="text-xs text-slate-400 font-sans">Select export format for CAD rendering and manufacturing specs.</p>
        </div>

        {downloadedFormat && (
          <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Successfully exported: {downloadedFormat}</span>
          </div>
        )}

        <div className="space-y-3 text-xs">
          {/* Vector SVG Option */}
          <button
            onClick={handleDownloadSvg}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 hover:border-cyan-400 text-left flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-cyan-300">Vector SVG Blueprint</h4>
                <p className="text-[11px] text-slate-400 font-sans">Scalable vector graphics CAD schematic drawing</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-cyan-400" />
          </button>

          {/* CAD JSON Option */}
          <button
            onClick={handleDownloadJson}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 hover:border-cyan-400 text-left flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-indigo-300">Full CAD JSON Data</h4>
                <p className="text-[11px] text-slate-400 font-sans">Complete parts list, materials, assembly steps & specs</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-indigo-400" />
          </button>

          {/* Printable Document Option */}
          <button
            onClick={handlePrintDocument}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-cyan-900/60 hover:border-cyan-400 text-left flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-amber-300">Printable Technical PDF</h4>
                <p className="text-[11px] text-slate-400 font-sans">Formatted patent specification summary sheet</p>
              </div>
            </div>
            <Printer className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        <div className="pt-2 text-center text-[10px] text-slate-500 font-sans">
          All exports include royalty-free technical documentation under Apache-2.0.
        </div>
      </div>
    </div>
  );
};
