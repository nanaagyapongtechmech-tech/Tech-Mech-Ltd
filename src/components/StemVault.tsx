import React, { useState } from 'react';
import { MusicTrack, TrackStem } from '../types';
import { audioEngine } from '../utils/audioEngine';
import {
  Sliders,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Download,
  Music,
  Disc,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

interface StemVaultProps {
  currentTrack: MusicTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  allTracks: MusicTrack[];
  onSelectTrack: (track: MusicTrack) => void;
}

export const StemVault: React.FC<StemVaultProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  allTracks,
  onSelectTrack
}) => {
  const [stemsState, setStemsState] = useState<TrackStem[]>(currentTrack.stems || []);
  const [tempoBpm, setTempoBpm] = useState(currentTrack.bpm);

  const handleVolumeChange = (stemId: string, type: string, newVol: number) => {
    setStemsState((prev) =>
      prev.map((s) => (s.id === stemId ? { ...s, volume: newVol } : s))
    );
    audioEngine.setStemVolume(type, newVol);
  };

  const handleMuteToggle = (stemId: string, type: string) => {
    setStemsState((prev) =>
      prev.map((s) => {
        if (s.id === stemId) {
          const nextMuted = !s.muted;
          audioEngine.setStemMute(type, nextMuted);
          return { ...s, muted: nextMuted };
        }
        return s;
      })
    );
  };

  const handleSoloToggle = (stemId: string, type: string) => {
    setStemsState((prev) =>
      prev.map((s) => {
        if (s.id === stemId) {
          const nextSolo = !s.solo;
          audioEngine.setStemSolo(type, nextSolo);
          return { ...s, solo: nextSolo };
        }
        return s;
      })
    );
  };

  const resetAllStems = () => {
    setStemsState((prev) =>
      prev.map((s) => {
        audioEngine.setStemVolume(s.type, 1);
        audioEngine.setStemMute(s.type, false);
        audioEngine.setStemSolo(s.type, false);
        return { ...s, volume: 1, muted: false, solo: false };
      })
    );
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Header & Track Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-xl font-mono">MULTI-STEM MIXER VAULT</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                PRO STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Solo, mute, isolate, & mix individual stems for remixes and practice
            </p>
          </div>
        </div>

        {/* Track Selector Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto font-mono text-xs">
          <label className="text-slate-400 shrink-0">Select Track:</label>
          <select
            value={currentTrack.id}
            onChange={(e) => {
              const found = allTracks.find((t) => t.id === e.target.value);
              if (found) {
                onSelectTrack(found);
                setStemsState(found.stems || []);
                setTempoBpm(found.bpm);
              }
            }}
            className="flex-1 md:w-64 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            {allTracks.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} - {t.artistName}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Mixer Console */}
      <div className="bg-slate-900/95 border-2 border-cyan-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.1)] space-y-6">
        
        {/* Track Info Bar & Master Playback */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono">
          <div className="flex items-center gap-3">
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-xl object-cover border border-cyan-400/50"
            />
            <div>
              <h3 className="font-bold text-white text-sm">{currentTrack.title}</h3>
              <p className="text-xs text-slate-400">{currentTrack.artistName} • {currentTrack.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'PAUSE MIX' : 'PLAY MIX'}</span>
            </button>

            <button
              onClick={resetAllStems}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset All Stems"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stem Fader Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stemsState.map((stem) => (
            <div
              key={stem.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                stem.solo
                  ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : stem.muted
                  ? 'bg-slate-950/60 border-slate-800 opacity-60'
                  : 'bg-slate-950 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {/* Stem Header */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stem.color }}
                  />
                  {stem.name}
                </span>

                <span className="text-[10px] text-slate-500 uppercase">{stem.type}</span>
              </div>

              {/* Mute & Solo Buttons */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => handleMuteToggle(stem.id, stem.type)}
                  className={`py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                    stem.muted
                      ? 'bg-rose-500 text-slate-950 border-rose-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  MUTE
                </button>

                <button
                  onClick={() => handleSoloToggle(stem.id, stem.type)}
                  className={`py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                    stem.solo
                      ? 'bg-amber-400 text-slate-950 border-amber-300'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  SOLO
                </button>
              </div>

              {/* Vertical Fader Visualizer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Volume</span>
                  <span className="text-cyan-400 font-bold">{Math.round(stem.volume * 100)}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={stem.volume}
                  onChange={(e) => handleVolumeChange(stem.id, stem.type, parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg accent-cyan-400 cursor-pointer"
                />
              </div>

            </div>
          ))}
        </div>

        {/* Stem Download Action Bar */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            <span className="text-white font-bold">WAV / MP3 Multi-Track Export:</span> 24-bit 48kHz lossless stems. Free for collaborative remixing on SoundPulse.
          </div>

          <button
            onClick={() => alert(`Downloading high-definition ZIP stems archive for ${currentTrack.title}...`)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold transition-all cursor-pointer shadow-md shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD ZIP STEMS</span>
          </button>
        </div>

      </div>

    </div>
  );
};
