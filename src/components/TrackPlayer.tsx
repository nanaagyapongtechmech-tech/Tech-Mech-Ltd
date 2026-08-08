import React, { useState, useEffect, useRef } from 'react';
import { MusicTrack } from '../types';
import { audioEngine } from '../utils/audioEngine';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sliders,
  FileText,
  Heart,
  Repeat,
  Radio,
  Sparkles,
  ChevronUp,
  X
} from 'lucide-react';

interface TrackPlayerProps {
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onToggleStemVault: () => void;
}

export const TrackPlayer: React.FC<TrackPlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onToggleStemVault
}) => {
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [eqPreset, setEqPreset] = useState<'flat' | 'bass' | 'vocal' | 'edm'>('flat');
  const [currentStep, setCurrentStep] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsubTick = audioEngine.subscribeTick((step) => {
      setCurrentStep(step);
    });
    return () => {
      unsubTick();
    };
  }, []);

  // Visualizer Animation Frame
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const data = audioEngine.getFrequencyData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 4;
      const gap = 2;
      const count = Math.min(16, data.length);

      for (let i = 0; i < count; i++) {
        const value = isPlaying ? data[i] || Math.floor(Math.random() * 150 + 50) : 10;
        const barHeight = (value / 255) * canvas.height;
        const x = i * (barWidth + gap);
        const y = canvas.height - barHeight;

        // Gradient
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#06b6d4');
        grad.addColorStop(1, '#a855f7');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  if (!currentTrack) return null;

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setIsMuted(v === 0);
    audioEngine.setMasterVolume(v);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setMasterVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setMasterVolume(0);
    }
  };

  return (
    <>
      {/* Floating Bottom Track Player Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 border-t border-cyan-500/30 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.8)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Track Cover & Artist Info */}
          <div className="flex items-center gap-3 w-full md:w-1/4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-900 group">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform ${
                  isPlaying ? 'scale-105' : ''
                }`}
              />
              <span className="absolute inset-0 bg-slate-950/20" />
            </div>

            <div className="flex-1 truncate">
              <h4 className="font-bold text-white text-xs truncate flex items-center gap-1.5">
                {currentTrack.title}
                {currentTrack.hasStems && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded">
                    STEMS
                  </span>
                )}
              </h4>
              <p className="text-[11px] font-mono text-slate-400 truncate">{currentTrack.artistName}</p>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLiked ? 'text-rose-500 bg-rose-500/10' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Center: Playback Controls & Audio Visualizer Canvas */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-1/2">
            
            <div className="flex items-center gap-4">
              <button
                onClick={onPrevTrack}
                className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={onNextTrack}
                className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Rhythm Beat Indicator & Canvas Spectrum */}
            <div className="w-full flex items-center justify-center gap-3 font-mono text-[10px] text-slate-400">
              <span className="text-cyan-400 font-bold">{currentTrack.bpm} BPM</span>
              
              <canvas
                ref={canvasRef}
                width={100}
                height={16}
                className="rounded bg-slate-900/80 px-1 border border-slate-800"
              />

              <span className="text-slate-300 font-bold">{currentTrack.keySignature}</span>
            </div>
          </div>

          {/* Right: Stem Vault Drawer, Lyrics Toggle & Volume Controls */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/4">
            
            {/* EQ Selector */}
            <select
              value={eqPreset}
              onChange={(e) => setEqPreset(e.target.value as any)}
              className="bg-slate-900 text-slate-300 border border-slate-800 text-[10px] font-mono rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500"
            >
              <option value="flat">EQ: Flat</option>
              <option value="bass">EQ: Bass Boost</option>
              <option value="vocal">EQ: Vocal Clarity</option>
              <option value="edm">EQ: EDM Punch</option>
            </select>

            {/* Stem Vault Button */}
            <button
              onClick={onToggleStemVault}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 text-[11px] font-mono font-bold transition-all cursor-pointer"
              title="Open Multi-Stem Mixer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">STEMS</span>
            </button>

            {/* Lyrics Button */}
            {currentTrack.lyrics && (
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className={`p-1.5 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                  showLyrics
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Song Lyrics"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button onClick={toggleMute} className="text-slate-400 hover:text-white cursor-pointer">
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-slate-800 accent-cyan-400 rounded cursor-pointer"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Lyrics Drawer Modal Overlay */}
      {showLyrics && currentTrack.lyrics && (
        <div className="fixed bottom-20 right-4 z-50 w-80 max-w-full bg-slate-950/95 border-2 border-amber-500/70 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-amber-300 text-xs font-mono">SONG LYRICS</h3>
            </div>
            <button onClick={() => setShowLyrics(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto pr-1 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {currentTrack.lyrics}
          </div>
        </div>
      )}
    </>
  );
};
