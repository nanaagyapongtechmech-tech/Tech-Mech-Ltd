import React, { useState, useEffect } from 'react';
import { BlueprintItem, BlueprintStyleMode, Hotspot } from '../types';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Download,
  Info,
  Sliders,
  FileText,
  Wrench,
  Sparkles,
  Share2,
  Printer,
  CheckCircle,
  ExternalLink,
  Tag,
  RefreshCw,
  Loader2,
  Zap,
  Camera
} from 'lucide-react';
import { getRealPhotographUrl, getNodePictureUrl } from '../utils/photoImages';
import { SlareInfographicPoster } from './SlareInfographicPoster';

interface BlueprintViewerProps {
  blueprint: BlueprintItem | null;
  onClose: () => void;
  styleMode: BlueprintStyleMode;
  setStyleMode: (mode: BlueprintStyleMode) => void;
  onDownload: (bp: BlueprintItem) => void;
  onBlueprintUpdated?: (updatedBp: BlueprintItem) => void;
}

export const BlueprintViewer: React.FC<BlueprintViewerProps> = ({
  blueprint,
  onClose,
  styleMode,
  setStyleMode,
  onDownload,
  onBlueprintUpdated
}) => {
  if (!blueprint) return null;

  // Auto Update State
  const [isAutoUpdating, setIsAutoUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [upgradeNotes, setUpgradeNotes] = useState<string[] | null>(null);

  // Zoom and Pan states
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 3D Isometric View States
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [rotateX3D, setRotateX3D] = useState<number>(35);
  const [rotateY3D, setRotateY3D] = useState<number>(12);
  const [rotateZ3D, setRotateZ3D] = useState<number>(-20);
  const [is3DAutoRotating, setIs3DAutoRotating] = useState<boolean>(false);
  const [forcePhotoMode, setForcePhotoMode] = useState<boolean>(false);

  const isRealPhoto = styleMode === 'real-photograph' || forcePhotoMode;
  const photoUrl = blueprint.imageUrl || getRealPhotographUrl(blueprint.id, blueprint.category);

  // Auto 3D rotation timer effect
  useEffect(() => {
    let animId: number;
    if (is3DMode && is3DAutoRotating) {
      const animate = () => {
        setRotateZ3D((prev) => (prev + 0.5) % 360);
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [is3DMode, is3DAutoRotating]);

  // Layer Toggles
  const [showFrame, setShowFrame] = useState<boolean>(true);
  const [showMechanical, setShowMechanical] = useState<boolean>(true);
  const [showElectrical, setShowElectrical] = useState<boolean>(true);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Inspector Active Tab
  const [inspectorTab, setInspectorTab] = useState<'overview' | 'specs' | 'bom' | 'assembly'>('overview');

  // Selected Hotspot detail modal/card
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Copy share link notification
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auto-Update Handler
  const handleAutoUpdate = async (focusArea = '2026+ Modern Quantum & Composite Upgrades') => {
    setIsAutoUpdating(true);
    setUpdateError(null);
    setUpgradeNotes(null);

    try {
      const res = await fetch('/api/ai/auto-update-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blueprint.id, blueprint, focusArea })
      });

      if (!res.ok) {
        throw new Error('Gemini Auto-Update request failed');
      }

      const data = await res.json();
      if (data.blueprint && onBlueprintUpdated) {
        onBlueprintUpdated(data.blueprint);
      }
      setUpgradeNotes(data.upgradeHighlights || ['Upgraded specifications', 'Evolved materials and CAD paths']);
    } catch (err: any) {
      console.error('Error auto-updating blueprint:', err);
      setUpdateError(err.message || 'Failed to auto-update');
    } finally {
      setIsAutoUpdating(false);
    }
  };

  // Theme Styles mapping
  const getCanvasBg = () => {
    switch (styleMode) {
      case 'dark-cad':
        return 'bg-[#121215] text-emerald-400';
      case 'vintage-sepia':
        return 'bg-[#FAF4E8] text-amber-950';
      case 'architectural-white':
        return 'bg-slate-100 text-slate-900';
      case 'real-photograph':
        return 'bg-slate-950 text-cyan-300';
      case 'classic-blue':
      default:
        return 'bg-[#0A192F] text-cyan-300';
    }
  };

  const getPrimaryStroke = () => {
    switch (styleMode) {
      case 'dark-cad':
        return '#4ADE80'; // Emerald
      case 'vintage-sepia':
        return '#3B1A06'; // Sepia Ink
      case 'architectural-white':
        return '#1E293B'; // Dark Slate
      case 'real-photograph':
        return '#38BDF8'; // Bright Cyan
      case 'classic-blue':
      default:
        return '#38BDF8'; // Bright Cyan
    }
  };

  // Zoom / Pan Logic
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 400));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetView = () => {
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleShare = async () => {
    try {
      const fullUrl = `${window.location.origin}/?bp=${blueprint.id}`;
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl, customCode: blueprint.id })
      });
      if (res.ok) {
        const data = await res.json();
        await navigator.clipboard.writeText(data.shortUrl || fullUrl);
      } else {
        await navigator.clipboard.writeText(fullUrl);
      }
    } catch {
      await navigator.clipboard.writeText(`${window.location.origin}/?bp=${blueprint.id}`);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col overflow-hidden font-sans text-slate-100">
      {/* Top Header Controls Bar */}
      <div className="bg-slate-900/90 border-b border-cyan-900/50 px-4 py-2.5 flex items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60 text-xs font-bold">
            {blueprint.patentNumber}
          </span>
          <h2 className="text-base font-bold text-white tracking-tight truncate">{blueprint.title}</h2>
          <span className="text-xs text-slate-400 hidden lg:inline">| {blueprint.category} ({blueprint.year})</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Selector */}
          <div className="hidden sm:flex items-center bg-slate-950 border border-cyan-900/60 rounded p-0.5 text-xs">
            <button
              onClick={() => setStyleMode('classic-blue')}
              className={`px-2 py-1 rounded ${styleMode === 'classic-blue' ? 'bg-cyan-900 text-cyan-200 font-bold' : 'text-slate-400'}`}
            >
              Cyan
            </button>
            <button
              onClick={() => setStyleMode('dark-cad')}
              className={`px-2 py-1 rounded ${styleMode === 'dark-cad' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-slate-400'}`}
            >
              CAD
            </button>
            <button
              onClick={() => setStyleMode('vintage-sepia')}
              className={`px-2 py-1 rounded ${styleMode === 'vintage-sepia' ? 'bg-amber-950 text-amber-200 font-bold' : 'text-slate-400'}`}
            >
              Sepia
            </button>
            <button
              onClick={() => setStyleMode('architectural-white')}
              className={`px-2 py-1 rounded ${styleMode === 'architectural-white' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400'}`}
            >
              White
            </button>
            <button
              onClick={() => setStyleMode('real-photograph')}
              className={`px-2 py-1 rounded flex items-center gap-1 ${styleMode === 'real-photograph' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-slate-400'}`}
            >
              <span>📷 Photo</span>
            </button>
            <button
              onClick={() => setStyleMode('slare-infographic')}
              className={`px-2 py-1 rounded flex items-center gap-1 ${styleMode === 'slare-infographic' ? 'bg-gradient-to-r from-amber-500 via-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'text-slate-400 hover:text-white'}`}
              title="Full SLARE Multi-Panel Infographic Blueprint Poster"
            >
              <span>📊 SLARE Poster</span>
            </button>
          </div>

          <button
            onClick={() => handleAutoUpdate()}
            disabled={isAutoUpdating}
            className="px-3 py-1.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] cursor-pointer"
            title="Auto-update specifications, materials, and CAD vectors using Gemini 3.6 Flash"
          >
            {isAutoUpdating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{isAutoUpdating ? 'Auto-Updating...' : 'Gemini Auto-Update'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => onDownload(blueprint)}
            className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CAD Package</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-800 border border-slate-700 hover:bg-rose-950 hover:border-rose-500 text-slate-400 hover:text-rose-200 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Studio Body or SLARE Infographic Poster View */}
      {styleMode === 'slare-infographic' ? (
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#030712]">
          <SlareInfographicPoster blueprint={blueprint} onClose={onClose} />
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Interactive Vector Canvas */}
        <div className="flex-1 relative flex flex-col bg-slate-950 overflow-hidden select-none">
          {/* Canvas Floating Toolbar */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/90 border border-cyan-900/60 rounded-lg p-1.5 backdrop-blur-md flex items-center gap-1 font-mono text-xs shadow-xl">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1.5 hover:bg-cyan-950 rounded text-cyan-300 hover:text-cyan-100"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1.5 hover:bg-cyan-950 rounded text-cyan-300 hover:text-cyan-100"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              title="Reset Zoom & Pan"
              className="p-1.5 hover:bg-cyan-950 rounded text-cyan-300 hover:text-cyan-100"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 text-cyan-400 border-l border-cyan-900/60">{zoomLevel}%</span>

            {/* 3D & Real Photo Mode Toggle Buttons */}
            <div className="border-l border-cyan-900/60 pl-1 ml-1 flex items-center gap-1">
              <button
                onClick={() => {
                  setForcePhotoMode(!forcePhotoMode);
                }}
                className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  isRealPhoto
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Photorealistic Studio Photograph Mode"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-300" />
                <span>📷 Real Photo</span>
              </button>

              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                  is3DMode && !isRealPhoto
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle 3D Isometric Extrusion Mode"
              >
                <span>🧊 3D Mode</span>
              </button>

              {is3DMode && !isRealPhoto && (
                <button
                  onClick={() => setIs3DAutoRotating(!is3DAutoRotating)}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                    is3DAutoRotating
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Toggle 3D Auto-Orbit Spin"
                >
                  <span>{is3DAutoRotating ? 'Spinning' : 'Orbit'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Canvas Layer Toggle Drawer floating top right */}
          <div className="absolute top-4 right-4 z-20 bg-slate-900/90 border border-cyan-900/60 rounded-lg p-2 backdrop-blur-md font-mono text-xs shadow-xl space-y-1">
            <div className="flex items-center gap-1 text-cyan-400 border-b border-cyan-900/50 pb-1 mb-1 font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>Layers</span>
            </div>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300">
              <input type="checkbox" checked={showFrame} onChange={(e) => setShowFrame(e.target.checked)} />
              <span>Frame / Structure</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300">
              <input type="checkbox" checked={showMechanical} onChange={(e) => setShowMechanical(e.target.checked)} />
              <span>Mechanical Actuators</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300">
              <input type="checkbox" checked={showElectrical} onChange={(e) => setShowElectrical(e.target.checked)} />
              <span>Electrical Circuits</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300">
              <input type="checkbox" checked={showAnnotations} onChange={(e) => setShowAnnotations(e.target.checked)} />
              <span>Dimensions & Notes</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300">
              <input type="checkbox" checked={showHotspots} onChange={(e) => setShowHotspots(e.target.checked)} />
              <span>Callout Pins ({blueprint.hotspots?.length})</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-cyan-300 pt-1 border-t border-slate-800">
              <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
              <span>CAD Grid</span>
            </label>
          </div>

          {/* Interactive SVG Canvas Area */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center p-8 transition-colors ${getCanvasBg()}`}
            style={{
              perspective: '1200px'
            }}
          >
            {/* Grid Overlay */}
            {showGrid && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:24px_24px]" />
            )}

            {/* Transformable Canvas Group with 3D & Photorealistic Photo Support */}
            <div
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel / 100}) ${
                  is3DMode && !isRealPhoto
                    ? `rotateX(${rotateX3D}deg) rotateY(${rotateY3D}deg) rotateZ(${rotateZ3D}deg)`
                    : 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
                }`,
                transformOrigin: 'center center',
                transition: isDragging || is3DAutoRotating ? 'none' : 'transform 0.3s ease-out'
              }}
              className="relative w-full max-w-2xl aspect-square flex items-center justify-center pointer-events-auto rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-cyan-500/30"
            >
              {/* Real Photograph Studio Background */}
              {isRealPhoto && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={blueprint.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.18] saturate-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 opacity-75" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d420_1px,transparent_1px),linear-gradient(to_bottom,#06b6d420_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>
              )}

              <svg viewBox="0 0 400 400" className={`w-full h-full overflow-visible z-10 relative ${isRealPhoto ? 'drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]' : 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]'}`}>
                {/* 3D Grid Shadow Base Floor */}
                {is3DMode && !isRealPhoto && (
                  <rect
                    x="10"
                    y="10"
                    width="380"
                    height="380"
                    rx="20"
                    fill="none"
                    stroke={getPrimaryStroke()}
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    opacity="0.3"
                    style={{ transform: 'translateZ(-30px)' }}
                  />
                )}

                {/* 1. Structural Frame Layer */}
                {showFrame &&
                  blueprint.svgLayers.framePaths?.map((path, idx) => (
                    <path
                      key={`frame-${idx}`}
                      d={path}
                      fill="none"
                      stroke={getPrimaryStroke()}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transform: is3DMode ? 'translateZ(15px)' : 'none' }}
                    />
                  ))}

                {/* 2. Mechanical Layer */}
                {showMechanical &&
                  blueprint.svgLayers.mechanicalPaths?.map((path, idx) => (
                    <path
                      key={`mech-${idx}`}
                      d={path}
                      fill="none"
                      stroke={getPrimaryStroke()}
                      strokeWidth="1.5"
                      strokeDasharray="5 3"
                      opacity="0.85"
                      style={{ transform: is3DMode ? 'translateZ(35px)' : 'none' }}
                    />
                  ))}

                {/* 3. Electrical Layer */}
                {showElectrical &&
                  blueprint.svgLayers.electricalPaths?.map((path, idx) => (
                    <path
                      key={`elec-${idx}`}
                      d={path}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      style={{ transform: is3DMode ? 'translateZ(55px)' : 'none' }}
                    />
                  ))}

                {/* 4. Annotations & Dimension Lines */}
                {showAnnotations && (
                  <g className="font-mono text-[9px]" fill={getPrimaryStroke()}>
                    {blueprint.svgLayers.annotationLines?.map((line, idx) => (
                      <g key={`ann-${idx}`}>
                        <line
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="#94A3B8"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                        {line.label && (
                          <text x={(line.x1 + line.x2) / 2} y={(line.y1 + line.y2) / 2 - 4} textAnchor="middle">
                            {line.label}
                          </text>
                        )}
                      </g>
                    ))}

                    {blueprint.svgLayers.dimensionTexts?.map((dim, idx) => (
                      <text key={`dim-${idx}`} x={dim.x} y={dim.y} textAnchor="middle" fontWeight="bold">
                        {dim.text}
                      </text>
                    ))}
                  </g>
                )}

                {/* 5. Hotspot Interactive Pins */}
                {showHotspots &&
                  blueprint.hotspots?.map((hs) => {
                    const cx = (hs.x / 100) * 400;
                    const cy = (hs.y / 100) * 400;
                    const isSelected = selectedHotspot?.id === hs.id;

                    return (
                      <g
                        key={hs.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHotspot(hs);
                        }}
                        className="cursor-pointer group/pin"
                        style={{ transform: is3DMode ? 'translateZ(75px)' : 'none' }}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? '10' : '7'}
                          fill={isSelected ? '#F59E0B' : getPrimaryStroke()}
                          className="animate-pulse opacity-80"
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r="5"
                          fill="#0F172A"
                          stroke={isSelected ? '#F59E0B' : getPrimaryStroke()}
                          strokeWidth="2"
                        />
                        <text
                          x={cx}
                          y={cy + 3}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {hs.partNumber ? hs.partNumber.split('-').pop() : '●'}
                        </text>
                      </g>
                    );
                  })}
              </svg>

              {/* Selected Hotspot Tooltip Overlay */}
              {selectedHotspot && (() => {
                const hsImg = getNodePictureUrl(selectedHotspot.partNumber || selectedHotspot.id, selectedHotspot.title);
                return (
                  <div
                    style={{
                      left: `${selectedHotspot.x}%`,
                      top: `${selectedHotspot.y}%`
                    }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-full mb-3 w-72 bg-slate-900 border-2 border-amber-500/90 rounded-xl p-3 shadow-2xl text-xs font-mono text-slate-100 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
                  >
                    <div className="flex items-center justify-between border-b border-amber-500/40 pb-1.5 mb-2">
                      <span className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
                        <Tag className="w-3 h-3" /> NODE #{selectedHotspot.partNumber}
                      </span>
                      <button
                        onClick={() => setSelectedHotspot(null)}
                        className="text-slate-400 hover:text-white font-bold px-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-amber-400/80 shadow-md bg-slate-950">
                        <img src={hsImg} alt={selectedHotspot.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-xs mb-1">{selectedHotspot.title}</h4>
                        <p className="text-slate-300 text-[10px] leading-snug mb-1.5">{selectedHotspot.description}</p>
                        {selectedHotspot.material && (
                          <div className="text-[9px] text-amber-200 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60 font-semibold">
                            Material: {selectedHotspot.material}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Bottom Canvas Footer Metadata */}
          <div className="bg-slate-900/90 border-t border-cyan-900/50 px-4 py-2 font-mono text-xs flex items-center justify-between text-slate-400">
            <div>
              <span>DRG NO: <strong className="text-cyan-300">{blueprint.patentNumber}</strong></span>
              <span className="ml-4 hidden sm:inline">SCALE: 1:1 VECTOR CAD</span>
            </div>
            <div>
              <span>INVENTOR: <strong className="text-slate-200">{blueprint.inventor}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Tabbed Inspector Sidebar */}
        <div className="w-full md:w-96 lg:w-[420px] bg-slate-900 border-l border-cyan-900/50 flex flex-col font-mono text-xs overflow-hidden">
          {/* Inspector Navigation Tabs */}
          <div className="bg-slate-950 border-b border-cyan-900/40 flex items-center justify-between p-1">
            <button
              onClick={() => setInspectorTab('overview')}
              className={`flex-1 py-2 text-center rounded flex items-center justify-center gap-1 transition-all ${
                inspectorTab === 'overview' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setInspectorTab('specs')}
              className={`flex-1 py-2 text-center rounded flex items-center justify-center gap-1 transition-all ${
                inspectorTab === 'specs' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Specs</span>
            </button>
            <button
              onClick={() => setInspectorTab('bom')}
              className={`flex-1 py-2 text-center rounded flex items-center justify-center gap-1 transition-all ${
                inspectorTab === 'bom' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>BOM</span>
            </button>
            <button
              onClick={() => setInspectorTab('assembly')}
              className={`flex-1 py-2 text-center rounded flex items-center justify-center gap-1 transition-all ${
                inspectorTab === 'assembly' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Assembly</span>
            </button>
          </div>

          {/* Inspector Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-900">
            {/* 1. OVERVIEW TAB */}
            {inspectorTab === 'overview' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-3 rounded-lg border border-cyan-900/50 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Patent Classification</span>
                    <span className="text-cyan-300 font-bold">{blueprint.patentNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Filing / Build Era</span>
                    <span className="text-slate-200">{blueprint.year}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Complexity Grade</span>
                    <span className="text-amber-400">{blueprint.difficulty}</span>
                  </div>
                </div>

                {/* Gemini Auto-Update Card */}
                <div className="bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 p-3.5 rounded-lg border border-amber-500/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Gemini Auto-Update Option
                    </span>
                    <span className="text-[10px] text-amber-400/80 bg-amber-950 border border-amber-800/60 px-1.5 py-0.5 rounded">
                      Gemini 3.6 Flash
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    Auto-evolve this blueprint's CAD vector paths, specifications, materials, and assembly steps using AI reasoning.
                  </p>

                  <div className="flex gap-1.5 pt-1">
                    <button
                      onClick={() => handleAutoUpdate('2026+ Modern Quantum & Composite Upgrades')}
                      disabled={isAutoUpdating}
                      className="flex-1 py-1.5 px-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-[11px] rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {isAutoUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                      <span>{isAutoUpdating ? 'Evolving...' : 'Auto-Update Blueprint'}</span>
                    </button>

                    <button
                      onClick={() => handleAutoUpdate('Superconductor & Efficiency Optimization')}
                      disabled={isAutoUpdating}
                      className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 font-bold text-[10px] rounded border border-cyan-800/60 transition-colors cursor-pointer"
                      title="Auto-update for maximum efficiency & room-temp superconductors"
                    >
                      ⚡ Superconductors
                    </button>
                  </div>

                  {upgradeNotes && (
                    <div className="mt-2 p-2 bg-emerald-950/80 border border-emerald-600/60 rounded text-[11px] text-emerald-200 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-emerald-300">
                        <CheckCircle className="w-3.5 h-3.5" /> Auto-Updated Successfully!
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-300 font-sans">
                        {upgradeNotes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {updateError && (
                    <div className="p-2 bg-rose-950 border border-rose-800 rounded text-[10px] text-rose-300">
                      {updateError}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Operational Principles
                  </h3>
                  <p className="text-slate-300 font-sans leading-relaxed text-xs bg-slate-950/60 p-3 rounded border border-slate-800">
                    {blueprint.description}
                  </p>
                </div>

                {blueprint.historicalContext && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Historical Significance & Impact
                    </h3>
                    <p className="text-slate-400 font-sans leading-relaxed text-xs bg-slate-950/40 p-3 rounded border border-slate-800/80">
                      {blueprint.historicalContext}
                    </p>
                  </div>
                )}

                {/* Callout Hotspots List */}
                <div>
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Annotated Callout Points ({blueprint.hotspots?.length})</span>
                    <span className="text-[10px] text-amber-400 font-normal">🖼️ Node Photos</span>
                  </h3>
                  <div className="space-y-2">
                    {blueprint.hotspots?.map((hs) => {
                      const hsImg = getNodePictureUrl(hs.partNumber || hs.id, hs.title);
                      return (
                        <div
                          key={hs.id}
                          onClick={() => setSelectedHotspot(hs)}
                          className={`p-2.5 rounded-lg border cursor-pointer transition-all flex gap-3 items-center ${
                            selectedHotspot?.id === hs.id
                              ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                              : 'bg-slate-950 border-slate-800 hover:border-cyan-700 text-slate-300'
                          }`}
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-cyan-500/40 bg-slate-900">
                            <img src={hsImg} alt={hs.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 truncate">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="font-bold text-cyan-300 text-xs">{hs.partNumber}</span>
                              <span className="text-[10px] text-slate-400">({hs.x}%, {hs.y}%)</span>
                            </div>
                            <p className="font-bold text-white text-xs truncate">{hs.title}</p>
                            <p className="text-slate-400 font-sans text-[11px] truncate mt-0.5">{hs.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. SPECIFICATIONS TAB */}
            {inspectorTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  Technical Specifications Matrix
                </h3>
                <div className="border border-cyan-900/50 rounded-lg overflow-hidden bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-cyan-950/80 text-cyan-300 border-b border-cyan-900/60 font-bold">
                      <tr>
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Design Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {Object.entries(blueprint.specifications || {}).map(([key, val], idx) => (
                        <tr key={idx} className="hover:bg-slate-900/60">
                          <td className="p-2.5 text-slate-400 font-medium">{key}</td>
                          <td className="p-2.5 text-cyan-300 font-bold">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. BILL OF MATERIALS (BOM) TAB */}
            {inspectorTab === 'bom' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Bill of Materials (Parts & Metallurgy)</span>
                  <span className="text-[10px] text-amber-400 font-normal">🖼️ Node Spec Photos</span>
                </h3>
                <div className="space-y-2">
                  {blueprint.materials?.map((mat, idx) => {
                    const matImg = getNodePictureUrl(idx + 1, mat.partName);
                    return (
                      <div key={idx} className="p-3 bg-slate-950 border border-cyan-900/40 rounded-xl space-y-1 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-cyan-500/40 bg-slate-900">
                          <img src={matImg} alt={mat.partName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 truncate">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs truncate">{mat.partName}</span>
                            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                              Qty: {mat.quantity}
                            </span>
                          </div>
                          <div className="text-amber-300 text-[11px]">
                            Material: <strong>{mat.material}</strong>
                          </div>
                          {mat.notes && <p className="text-slate-400 font-sans text-[10px] truncate">{mat.notes}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. ASSEMBLY GUIDE TAB */}
            {inspectorTab === 'assembly' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Sequential Assembly Instructions</span>
                  <span className="text-[10px] text-amber-400 font-normal">🖼️ Assembly Step Photos</span>
                </h3>
                <div className="space-y-3">
                  {blueprint.assemblySteps?.map((step) => {
                    const stepImg = getNodePictureUrl(step.stepNumber, step.title);
                    return (
                      <div key={step.stepNumber} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-cyan-500/40 bg-slate-900 mt-0.5">
                          <img src={stepImg} alt={step.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-center font-bold text-cyan-300">
                            STEP {step.stepNumber}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xs">{step.title}</h4>
                          <p className="text-slate-300 font-sans text-xs mt-1 leading-relaxed">{step.instruction}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Inspector Export Action Footer */}
          <div className="p-3 bg-slate-950 border-t border-cyan-900/50 flex items-center justify-between gap-2">
            <button
              onClick={() => onDownload(blueprint)}
              className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> Download Complete Blueprint Package
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
