import React, { useState } from 'react';
import { BlueprintItem, BlueprintStyleMode } from '../types';
import { Download, Eye, Bookmark, Calendar, User, Sparkles, Scale, Layers, Camera } from 'lucide-react';
import { getRealPhotographUrl, getNodePictureUrl } from '../utils/photoImages';

interface BlueprintCardProps {
  blueprint: BlueprintItem;
  styleMode: BlueprintStyleMode;
  onView: (bp: BlueprintItem) => void;
  onDownload: (bp: BlueprintItem) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
  onSelectForCompare?: (bp: BlueprintItem) => void;
  isCompared?: boolean;
  is3D?: boolean;
}

const BlueprintCardComponent: React.FC<BlueprintCardProps> = ({
  blueprint,
  styleMode,
  onView,
  onDownload,
  onToggleBookmark,
  isBookmarked,
  onSelectForCompare,
  isCompared,
  is3D = true
}) => {
  const [isHovered3D, setIsHovered3D] = useState(false);
  const [forcePhotoMode, setForcePhotoMode] = useState(false);

  const isRealPhoto = styleMode === 'real-photograph' || styleMode === 'slare-infographic' || forcePhotoMode;
  const photoUrl = blueprint.imageUrl || getRealPhotographUrl(blueprint.id, blueprint.category);

  // Theme dependent card container styles
  const getThemeCardStyles = () => {
    switch (styleMode) {
      case 'dark-cad':
        return 'bg-zinc-900/90 border-zinc-800 hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]';
      case 'vintage-sepia':
        return 'bg-[#FDFBF7] border-amber-900/20 text-amber-950 hover:border-amber-700 shadow-[0_4px_15px_rgba(120,53,15,0.1)]';
      case 'architectural-white':
        return 'bg-white border-slate-200 text-slate-900 hover:border-slate-400 shadow-md';
      case 'slare-infographic':
        return 'bg-slate-950 border-cyan-500/60 text-slate-100 shadow-[0_8px_40px_rgba(6,182,212,0.35)] ring-1 ring-amber-500/30';
      case 'real-photograph':
        return 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-[0_8px_35px_rgba(6,182,212,0.25)]';
      case 'classic-blue':
      default:
        return 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/40 text-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.3)]';
    }
  };

  const getCanvasBackground = () => {
    switch (styleMode) {
      case 'dark-cad':
        return 'bg-[#121215] border-zinc-800';
      case 'vintage-sepia':
        return 'bg-[#F5EFE6] border-amber-200';
      case 'architectural-white':
        return 'bg-slate-50 border-slate-200';
      case 'slare-infographic':
      case 'real-photograph':
        return 'bg-slate-950 border-cyan-500/50';
      case 'classic-blue':
      default:
        return 'bg-[#0A192F] border-slate-800';
    }
  };

  const getStrokeColor = () => {
    switch (styleMode) {
      case 'dark-cad':
        return '#4ADE80'; // Emerald
      case 'vintage-sepia':
        return '#451A03'; // Dark sepia ink
      case 'architectural-white':
        return '#334155'; // Dark slate
      case 'real-photograph':
        return '#38BDF8'; // High contrast cyan
      case 'classic-blue':
      default:
        return '#38BDF8'; // Bright cyan
    }
  };

  return (
    <div
      className={`group relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${getThemeCardStyles()}`}
    >
      {/* Blueprint Header Bar */}
      <div className="p-5 pb-3 border-b border-inherit flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider">
              {blueprint.patentNumber}
            </span>
            {styleMode === 'slare-infographic' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-blue-500/20 text-amber-300 border border-amber-500/40 font-black tracking-wide animate-pulse">
                📊 SLARE INFOGRAPHIC
              </span>
            )}
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                blueprint.status === 'To Be Built Concept'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1 font-bold'
                  : blueprint.status === 'Active Standard'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80'
              }`}
            >
              {blueprint.status === 'To Be Built Concept' && <Sparkles className="w-3 h-3 text-amber-400" />}
              {blueprint.status}
            </span>
          </div>

          <h3 className="text-base font-bold tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-2 font-sans">
            {blueprint.title}
          </h3>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onToggleBookmark(blueprint.id)}
          title={isBookmarked ? 'Remove from Vault' : 'Save to Vault'}
          className={`p-2 rounded-xl border transition-all ${
            isBookmarked
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-cyan-300'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Interactive Vector Schematic / Real Photograph Preview Window */}
      <div
        onClick={() => onView(blueprint)}
        onMouseEnter={() => setIsHovered3D(true)}
        onMouseLeave={() => setIsHovered3D(false)}
        className={`relative aspect-[16/10] m-4 rounded-2xl border cursor-pointer overflow-hidden group/canvas flex items-center justify-center transition-all duration-500 ${getCanvasBackground()}`}
        style={{
          perspective: '900px'
        }}
      >
        {/* Real Photograph Image Background (when in real photo mode) */}
        {isRealPhoto ? (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={photoUrl}
              alt={blueprint.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.15] saturate-[1.1] transition-transform duration-700 group-hover/canvas:scale-110"
            />
            {/* Photographic Vignette & Laser Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        ) : (
          /* Grid pattern overlay */
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
        )}

        {/* 3D Extruded CAD Canvas / Photo Overlay Wrapper */}
        <div
          className="w-full h-full p-6 transition-all duration-700 ease-out flex items-center justify-center relative z-10"
          style={{
            transformStyle: 'preserve-3d',
            transform: is3D && !isRealPhoto
              ? isHovered3D
                ? 'rotateX(38deg) rotateZ(-25deg) rotateY(12deg) scale3d(1.08, 1.08, 1.08) translateY(-6px)'
                : 'rotateX(30deg) rotateZ(-20deg) rotateY(8deg) scale3d(1.02, 1.02, 1.02)'
              : 'rotateX(0deg) rotateZ(0deg) scale3d(1, 1, 1)'
          }}
        >
          {/* Render Vector Paths in 3D Depth Layers */}
          <svg
            viewBox="0 0 400 400"
            className={`w-full h-full overflow-visible drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-10 ${
              isRealPhoto ? 'opacity-90' : 'opacity-100'
            }`}
          >
            {/* Base Grid 3D Shadow Floor */}
            {is3D && !isRealPhoto && (
              <rect
                x="20"
                y="20"
                width="360"
                height="360"
                rx="16"
                fill="none"
                stroke={getStrokeColor()}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.25"
                style={{ transform: 'translateZ(-20px)' }}
              />
            )}

            {/* Frame Paths Layer */}
            {blueprint.svgLayers.framePaths?.map((path, idx) => (
              <path
                key={`frame-${idx}`}
                d={path}
                fill="none"
                stroke={isRealPhoto ? '#38BDF8' : getStrokeColor()}
                strokeWidth={isRealPhoto ? '3' : '2.5'}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: is3D && !isRealPhoto ? 'translateZ(10px)' : 'none' }}
              />
            ))}

            {/* Mechanical Paths Layer */}
            {blueprint.svgLayers.mechanicalPaths?.map((path, idx) => (
              <path
                key={`mech-${idx}`}
                d={path}
                fill="none"
                stroke={isRealPhoto ? '#38BDF8' : getStrokeColor()}
                strokeWidth="1.5"
                strokeDasharray="4 2"
                opacity={isRealPhoto ? '0.95' : '0.85'}
                style={{ transform: is3D && !isRealPhoto ? 'translateZ(25px)' : 'none' }}
              />
            ))}

            {/* Electrical Paths Layer */}
            {blueprint.svgLayers.electricalPaths?.map((path, idx) => (
              <path
                key={`elec-${idx}`}
                d={path}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                opacity="0.9"
                style={{ transform: is3D && !isRealPhoto ? 'translateZ(40px)' : 'none' }}
              />
            ))}

            {/* Hotspot Indicators */}
            {blueprint.hotspots?.map((hs, idx) => (
              <g
                key={`hs-${idx}`}
                style={{ transform: is3D && !isRealPhoto ? 'translateZ(55px)' : 'none' }}
              >
                <circle
                  cx={(hs.x / 100) * 400}
                  cy={(hs.y / 100) * 400}
                  r="6"
                  fill={isRealPhoto ? '#38BDF8' : getStrokeColor()}
                  className="animate-ping opacity-75"
                />
                <circle
                  cx={(hs.x / 100) * 400}
                  cy={(hs.y / 100) * 400}
                  r="4"
                  fill="#0F172A"
                  stroke={isRealPhoto ? '#38BDF8' : getStrokeColor()}
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Mode Toggle Controls Floating Top Left */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setForcePhotoMode(!forcePhotoMode);
            }}
            className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-md ${
              isRealPhoto
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-extrabold shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                : 'bg-slate-950/90 text-slate-300 border-slate-700 hover:text-cyan-400'
            }`}
            title="Toggle Real Photograph View vs CAD View"
          >
            <Camera className="w-3 h-3 text-cyan-300" />
            <span>{isRealPhoto ? '📷 Photo' : '📷 Photo View'}</span>
          </button>

          {!isRealPhoto && (
            <div className="bg-slate-950/90 border border-cyan-500/30 rounded-md px-2 py-0.5 text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider shadow">
              <span>🧊 3D CAD</span>
            </div>
          )}
        </div>

        {/* Canvas Overlay Hover CTA */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] opacity-0 group-hover/canvas:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-20 p-4 text-center">
          <span className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-xl ${
            styleMode === 'slare-infographic'
              ? 'bg-gradient-to-r from-amber-500 via-cyan-500 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
              : 'bg-cyan-500 text-slate-950'
          }`}>
            <Eye className="w-4 h-4" />
            <span>{styleMode === 'slare-infographic' ? '📊 Open SLARE Infographic Poster' : 'Inspect CAD Specs'}</span>
          </span>
          {styleMode === 'slare-infographic' && (
            <span className="text-[10px] font-mono text-amber-300 font-bold bg-slate-950/90 px-2.5 py-1 rounded-md border border-amber-500/30">
              Interactive Cutaways • Vector Callouts • Technical Specs
            </span>
          )}
        </div>

        {/* Badge Hotspots Count */}
        <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-mono text-cyan-300 flex items-center gap-1 z-10">
          <Layers className="w-3 h-3" />
          <span>{blueprint.hotspots?.length || 0} Points</span>
        </div>
      </div>

      {/* Blueprint Metadata & Specs Summary */}
      <div className="px-5 py-2 space-y-3 text-xs">
        <p className="line-clamp-2 text-slate-400 font-sans leading-relaxed">{blueprint.summary}</p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-slate-400 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{blueprint.inventor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Year {blueprint.year}</span>
          </div>
        </div>

        {/* Category & Tags & Node Picture Preview Strip */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700/80">
              {blueprint.category}
            </span>
            {blueprint.tags.slice(0, 1).map((tag, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-500 border border-slate-800">
                #{tag}
              </span>
            ))}
          </div>

          {/* Node Component Picture Strip */}
          <div className="flex items-center -space-x-1.5 overflow-hidden">
            {[1, 2, 3].map((nodeId) => (
              <img
                key={nodeId}
                src={getNodePictureUrl(nodeId, blueprint.title)}
                alt={`Node #${nodeId}`}
                className="w-5 h-5 rounded-full border border-cyan-400/80 object-cover shadow-sm bg-slate-900"
                title={`Node Component #${nodeId} Photograph`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 mt-2 bg-slate-950/60 border-t border-inherit flex items-center justify-between gap-2">
        <button
          onClick={() => onView(blueprint)}
          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            styleMode === 'slare-infographic'
              ? 'bg-gradient-to-r from-amber-500 via-cyan-500 to-blue-600 text-slate-950 border-amber-400 font-extrabold shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:brightness-110'
              : 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:bg-slate-700 text-cyan-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{styleMode === 'slare-infographic' ? '📊 SLARE Poster' : 'Inspect CAD'}</span>
        </button>

        <button
          onClick={() => onDownload(blueprint)}
          title="Download Blueprint Package"
          className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-300 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        {onSelectForCompare && (
          <button
            onClick={() => onSelectForCompare(blueprint)}
            title={isCompared ? 'Selected for Comparison' : 'Compare with another blueprint'}
            className={`p-2 rounded-xl border transition-colors ${
              isCompared
                ? 'bg-indigo-900/80 text-indigo-300 border-indigo-500'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-indigo-300'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export const BlueprintCard = React.memo(BlueprintCardComponent);
