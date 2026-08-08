import React, { useState } from 'react';
import { createSafeAudioContext } from '../utils/audioEngine';
import {
  Mic,
  Volume2,
  Play,
  Pause,
  Radio,
  Sparkles,
  Sliders,
  Download,
  Plus,
  Trash2,
  RotateCcw,
  Music2,
  Tv
} from 'lucide-react';

interface DialogueLine {
  id: string;
  speaker: string;
  avatarColor: string;
  text: string;
  pitch: number; // 0.5 .. 1.5
  speed: number; // 0.5 .. 2.0
}

const VOICE_PRESETS = [
  { name: 'Aetherius AI Core', color: 'text-cyan-400 bg-cyan-950 border-cyan-800' },
  { name: 'Commander Vance', color: 'text-amber-400 bg-amber-950 border-amber-800' },
  { name: 'Dr. Nova Synth', color: 'text-purple-400 bg-purple-950 border-purple-800' },
  { name: 'Cyber Glitch Unit', color: 'text-rose-400 bg-rose-950 border-rose-800' }
];

export const CyberVoiceStudio: React.FC = () => {
  const [dialogue, setDialogue] = useState<DialogueLine[]>([
    {
      id: '1',
      speaker: 'Aetherius AI Core',
      avatarColor: 'text-cyan-400 bg-cyan-950 border-cyan-800',
      text: 'Welcome to the Aether Suite CyberVoice Studio. All 10 applications are synchronized and operational.',
      pitch: 1.0,
      speed: 1.0
    },
    {
      id: '2',
      speaker: 'Commander Vance',
      avatarColor: 'text-amber-400 bg-amber-950 border-amber-800',
      text: 'Outstanding. Initiate quantum audio synthesis for episode #104.',
      pitch: 0.9,
      speed: 1.1
    }
  ]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [reverbEffect, setReverbEffect] = useState<number>(20);
  const [newText, setNewText] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState(VOICE_PRESETS[0]);

  const handleAddLine = () => {
    if (!newText.trim()) return;
    const newLine: DialogueLine = {
      id: String(Date.now()),
      speaker: selectedVoice.name,
      avatarColor: selectedVoice.color,
      text: newText,
      pitch: 1.0,
      speed: 1.0
    };
    setDialogue((prev) => [...prev, newLine]);
    setNewText('');
  };

  const handleDeleteLine = (id: string) => {
    setDialogue((prev) => prev.filter((d) => d.id !== id));
  };

  const handlePlayAll = () => {
    if (dialogue.length === 0) return;
    setIsPlaying(true);
    let idx = 0;
    setActiveLineIndex(0);

    const playInterval = setInterval(() => {
      idx++;
      if (idx < dialogue.length) {
        setActiveLineIndex(idx);
      } else {
        clearInterval(playInterval);
        setIsPlaying(false);
        setActiveLineIndex(null);
      }
    }, 2800);
  };

  const handleTriggerSfx = (name: string) => {
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = name === 'laser' ? 880 : name === 'warp' ? 220 : 440;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('SFX trigger error:', e);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-purple-800/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" /> APP 10 • CYBERVOICE AI STUDIO
            </span>
            <span className="text-xs text-slate-400 font-mono">PODCASTER & TTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Radio className="w-8 h-8 text-purple-400" />
            CyberVoice AI Podcaster & Voice Morph Studio
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Synthesize multi-character AI podcaster scripts, trigger real-time sound FX, tweak vocal pitch/speed, and export high-fidelity audio tracks.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePlayAll}
            disabled={isPlaying || dialogue.length === 0}
            className="px-5 py-2.5 rounded-2xl bg-purple-500 hover:bg-purple-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer transition-all disabled:opacity-50"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Playing Podcast...' : 'Play Full Episode'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Script Editor */}
        <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 p-5">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" />
              Podcast Script & Dialogue Timeline
            </span>
            <span className="text-xs text-purple-400 font-mono">{dialogue.length} Dialogue Lines</span>
          </h3>

          <div className="space-y-3 mb-6">
            {dialogue.map((line, idx) => {
              const isActive = activeLineIndex === idx;

              return (
                <div
                  key={line.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isActive
                      ? 'bg-purple-950/80 border-purple-500/80 ring-2 ring-purple-400 shadow-xl'
                      : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${line.avatarColor}`}>
                        {line.speaker}
                      </span>
                      {isActive && <span className="text-[10px] text-purple-300 font-mono animate-pulse">● SPEAKING</span>}
                    </div>
                    <p className="text-sm text-slate-100 font-sans leading-relaxed">{line.text}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteLine(line.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Delete Line"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Line Input */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Speaker Persona:</span>
              {VOICE_PRESETS.map((voice) => (
                <button
                  key={voice.name}
                  onClick={() => setSelectedVoice(voice)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    selectedVoice.name === voice.name ? voice.color : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {voice.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddLine()}
                placeholder="Type spoken dialogue text here..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans"
              />
              <button
                onClick={handleAddLine}
                disabled={!newText.trim()}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Line</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right SFX & Audio Effects Bar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Sound FX Soundboard */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Music2 className="w-4 h-4 text-purple-400" />
              Live SFX Soundboard
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTriggerSfx('laser')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-mono text-purple-300 font-bold cursor-pointer hover:bg-slate-800 transition-all text-center"
              >
                ⚡ Laser Pulse
              </button>
              <button
                onClick={() => handleTriggerSfx('warp')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-mono text-cyan-300 font-bold cursor-pointer hover:bg-slate-800 transition-all text-center"
              >
                🌌 Warp Drive
              </button>
              <button
                onClick={() => handleTriggerSfx('chime')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-mono text-amber-300 font-bold cursor-pointer hover:bg-slate-800 transition-all text-center"
              >
                🔔 Sci-Fi Chime
              </button>
              <button
                onClick={() => handleTriggerSfx('boom')}
                className="p-3 bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl text-xs font-mono text-rose-300 font-bold cursor-pointer hover:bg-slate-800 transition-all text-center"
              >
                💥 Bass Drop
              </button>
            </div>
          </div>

          {/* Reverb & Echo Modulation */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              Spatial Reverb & Acoustics ({reverbEffect}%)
            </h4>

            <input
              type="range"
              min="0"
              max="100"
              value={reverbEffect}
              onChange={(e) => setReverbEffect(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
