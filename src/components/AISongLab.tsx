import React, { useState } from 'react';
import { Sparkles, Music, Sliders, FileText, Send, Disc, Play, Check, Copy } from 'lucide-react';

export const AISongLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('Synthwave & Electronic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    songTitle: string;
    vibeDescription: string;
    bpm: number;
    keySignature: string;
    chordProgression: string[];
    lyricHook: string;
    instrumentArrangement: string[];
  } | null>({
    songTitle: 'Cybernetic Echoes in the Rain',
    vibeDescription: 'An atmospheric, high-energy 80s synthwave track with driving basslines and melancholic vocal chops.',
    bpm: 124,
    keySignature: 'F# Minor',
    chordProgression: ['F#m', 'D', 'A', 'E'],
    lyricHook: `Neon lights in a city of chrome\nSearching for a place to call home\nAnalog signals lost in the wire\nBurning out in the digital fire...`,
    instrumentArrangement: ['Moog Bass Oscillator', 'Roland Juno Arp', 'Gated 808 Drums', 'Reverb Saxophone Solo']
  });

  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult({
        songTitle: `${prompt.split(' ')[0] || 'Midnight'} ${genre.split(' ')[0]} Odyssey`,
        vibeDescription: `A customized ${genre.toLowerCase()} track inspired by "${prompt}". Packed with rich dynamic contrast and emotional depth.`,
        bpm: genre.includes('Metal') ? 142 : genre.includes('Lo-Fi') ? 85 : 120,
        keySignature: 'D Minor',
        chordProgression: ['Dm', 'Bb', 'F', 'C'],
        lyricHook: `[Generated Chorus]\n${prompt}\nEchoes running through the night\nUnderneath the starlight bright\nWe keep moving till the morning light...`,
        instrumentArrangement: ['Lead Synth / Guitar', 'Sub Bass', 'Tight Pocket Drums', 'Ambient Vocal Pads']
      });
    }, 1200);
  };

  const copyLyrics = () => {
    if (generatedResult) {
      navigator.clipboard.writeText(generatedResult.lyricHook);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white text-xl">AI SONG LAB & LYRIC CREATOR</h2>
            <p className="text-xs text-slate-400">
              Brainstorm chord progressions, lyric hooks, BPM, and track arrangements
            </p>
          </div>
        </div>
      </div>

      {/* Main Generator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Input Console */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 font-mono text-xs">
          
          <div className="space-y-2">
            <label className="text-slate-300 font-bold block">1. SELECT GENRE VIBE</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Synthwave & Electronic">Synthwave & Electronic</option>
              <option value="Indie & Alternative">Indie & Alternative</option>
              <option value="Jazz Fusion & Soul">Jazz Fusion & Soul</option>
              <option value="Heavy Metal & Rock">Heavy Metal & Rock</option>
              <option value="Lo-Fi & Hip Hop">Lo-Fi & Hip Hop</option>
              <option value="R&B & Funk">R&B & Funk</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 font-bold block">2. ENTER THEME / INSPIRATION</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Late night driving in Tokyo under rainy neon lights, feeling lonely but hopeful..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none font-sans"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'AI IS COMPOSING...' : 'GENERATE SONG CONCEPT'}</span>
          </button>

        </div>

        {/* Right Output Card */}
        {generatedResult && (
          <div className="lg:col-span-2 bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6 font-mono">
            
            {/* Song Title & Attributes */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                  AI SONG BLUEPRINT
                </span>
                <span className="text-slate-400 text-xs">
                  {generatedResult.bpm} BPM • {generatedResult.keySignature}
                </span>
              </div>

              <h3 className="text-white font-bold text-xl">{generatedResult.songTitle}</h3>
              <p className="text-xs text-slate-300 font-sans">{generatedResult.vibeDescription}</p>
            </div>

            {/* Chord Progression */}
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold text-xs uppercase">RECOMMENDED CHORD PROGRESSION</span>
              <div className="flex items-center gap-3">
                {generatedResult.chordProgression.map((chord, idx) => (
                  <div
                    key={idx}
                    className="flex-1 p-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-center font-bold text-white text-base shadow-inner"
                  >
                    {chord}
                  </div>
                ))}
              </div>
            </div>

            {/* Lyric Hook Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold text-xs uppercase">LYRIC HOOK / CHORUS CONCEPT</span>
                <button
                  onClick={copyLyrics}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED!' : 'COPY LYRICS'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                {generatedResult.lyricHook}
              </div>
            </div>

            {/* Arrangement Stems */}
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold text-xs uppercase">RECOMMENDED INSTRUMENTATION</span>
              <div className="flex flex-wrap gap-2">
                {generatedResult.instrumentArrangement.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    🎹 {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
