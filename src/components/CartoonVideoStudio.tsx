import React, { useState, useEffect, useRef } from 'react';
import { createSafeAudioContext } from '../utils/audioEngine';
import {
  Video,
  Film,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Plus,
  Trash2,
  Move,
  Layers,
  Palette,
  Camera,
  Music,
  Zap,
  MessageSquare,
  Smile,
  Type,
  Image as ImageIcon,
  CheckCircle2,
  Tv,
  Eye,
  Sliders,
  Wand2,
  Award
} from 'lucide-react';

// Character Library for Comics & Cartoons
interface ComicCharacter {
  id: string;
  name: string;
  avatar: string;
  role: string;
  color: string;
}

const CHARACTERS: ComicCharacter[] = [
  { id: 'char_1', name: 'Captain Astro', avatar: '👨‍🚀', role: 'Space Hero', color: 'border-cyan-500 bg-cyan-950/50' },
  { id: 'char_2', name: 'Cyber Samurai Kai', avatar: '🥷', role: 'Neon Assassin', color: 'border-rose-500 bg-rose-950/50' },
  { id: 'char_3', name: 'Voxel Bot 9000', avatar: '🤖', role: 'Heavy Gunner', color: 'border-amber-500 bg-amber-950/50' },
  { id: 'char_4', name: 'Acid Alien Xeno', avatar: '👾', role: 'Cosmic Trickster', color: 'border-emerald-500 bg-emerald-950/50' },
  { id: 'char_5', name: 'Star Sorceress', avatar: '🧝‍♀️', role: 'Magic Operator', color: 'border-purple-500 bg-purple-950/50' }
];

// Comic Backgrounds
interface ComicBackground {
  id: string;
  name: string;
  gradient: string;
  emoji: string;
}

const BACKGROUNDS: ComicBackground[] = [
  { id: 'bg_1', name: 'Neo-Chroma Alley', gradient: 'from-slate-950 via-purple-950 to-slate-900', emoji: '🏙️' },
  { id: 'bg_2', name: 'Volcanic Magma Crater', gradient: 'from-rose-950 via-red-950 to-orange-950', emoji: '🌋' },
  { id: 'bg_3', name: 'Starship Control Deck', gradient: 'from-cyan-950 via-blue-950 to-slate-950', emoji: '🚀' },
  { id: 'bg_4', name: 'Cryo Glacier Outpost', gradient: 'from-sky-950 via-indigo-950 to-slate-900', emoji: '❄️' },
  { id: 'bg_5', name: 'Acid Jungle Canopy', gradient: 'from-emerald-950 via-teal-950 to-slate-950', emoji: '🌴' }
];

// Action SFX Badges
const ACTION_BADGES = ['POW!', 'BAM!', 'BOOM!', 'ZAP!', 'WHAM!', 'KA-BOOM!', 'CRASH!'];

// Panel Data Structure for Comic Strip
interface ComicPanel {
  id: string;
  title: string;
  backgroundId: string;
  characterId: string;
  speechBubbleText: string;
  bubbleType: 'speech' | 'thought' | 'shout';
  actionBadge?: string;
  captionText: string;
}

export const CartoonVideoStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comic' | 'video' | 'ai_storyboard'>('comic');

  // Comic Maker State
  const [panelLayout, setPanelLayout] = useState<'4grid' | '3strip' | '6manga'>('4grid');
  const [panels, setPanels] = useState<ComicPanel[]>([
    {
      id: 'p1',
      title: 'Panel 1: The Alert',
      backgroundId: 'bg_3',
      characterId: 'char_1',
      speechBubbleText: 'Commander! Enemy starships detected in Sector Zero!',
      bubbleType: 'speech',
      actionBadge: 'ZAP!',
      captionText: 'Deep in the Aetherius Nebula...'
    },
    {
      id: 'p2',
      title: 'Panel 2: Power Up',
      backgroundId: 'bg_1',
      characterId: 'char_2',
      speechBubbleText: 'Charging plasma blades... I will handle the syndicate!',
      bubbleType: 'shout',
      actionBadge: 'WHAM!',
      captionText: 'Neo-Chroma Metropolis, 02:00 Hours'
    },
    {
      id: 'p3',
      title: 'Panel 3: Heavy Fire',
      backgroundId: 'bg_2',
      characterId: 'char_3',
      speechBubbleText: 'Voxel cannons calibrated. Target locked on Titan Boss!',
      bubbleType: 'speech',
      actionBadge: 'KA-BOOM!',
      captionText: 'Volcanic Caldera Ridge'
    },
    {
      id: 'p4',
      title: 'Panel 4: Victory',
      backgroundId: 'bg_5',
      characterId: 'char_4',
      speechBubbleText: 'Hehehe! Another successful cosmic raid completed!',
      bubbleType: 'thought',
      actionBadge: 'BOOM!',
      captionText: 'Planet Xeno Prime'
    }
  ]);

  const [selectedPanelId, setSelectedPanelId] = useState<string>('p1');
  const [filterStyle, setFilterStyle] = useState<'halftone' | 'vhs' | 'cyber' | 'ink'>('halftone');

  // Animated Video Maker State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [fps, setFps] = useState(24);
  const [cameraAngle, setCameraAngle] = useState<'wide' | 'closeup' | 'tracking'>('wide');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [renderProgress, setRenderProgress] = useState<number | null>(null);
  const [isRenderedModalOpen, setIsRenderedModalOpen] = useState(false);

  // AI Storyboard Prompt
  const [aiPrompt, setAiPrompt] = useState('Create a 4-panel comic about a Cyberpunk Ninja cat rescuing a stolen quantum battery from alien pirates');
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sound Synth Generator
  const playSfx = (type: 'zap' | 'boom' | 'cheer' | 'jump') => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'zap') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      } else if (type === 'boom') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      } else if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio fallback
    }
  };

  // Video Animation Render Loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 120);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [isPlaying, fps]);

  // 2D/3D Animated Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw Grid / City Skyline
      ctx.strokeStyle = filterStyle === 'cyber' ? '#06b6d4' : '#334155';
      ctx.lineWidth = 1;

      const t = currentFrame * 0.1;

      // Animated Background Stars or Neon Grid
      for (let i = 0; i < 40; i++) {
        const x = (i * 37 + t * 20) % w;
        const y = (i * 23) % h;
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#f43f5e';
        ctx.beginPath();
        ctx.arc(x, y, (i % 3) + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Camera Angle Transforms
      ctx.save();
      if (cameraAngle === 'closeup') {
        ctx.translate(w / 2, h / 2);
        ctx.scale(1.4, 1.4);
        ctx.translate(-w / 2, -h / 2);
      } else if (cameraAngle === 'tracking') {
        ctx.translate(Math.sin(t) * 20, Math.cos(t) * 10);
      }

      // Animated Character Sprite (Captain Astro / Cyber Samurai)
      const charX = w / 2 + Math.sin(t * 1.5) * 80;
      const charY = h / 2 + Math.cos(t * 2) * 15;

      // Character Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(charX, charY + 50, 40, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Character Body Box
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(charX - 25, charY - 40, 50, 80);

      // Character Visor
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(charX - 15, charY - 30, 30, 15);

      // Jetpack Flame Thrusters
      if (currentFrame % 4 < 2) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(charX - 15, charY + 40);
        ctx.lineTo(charX - 5, charY + 65);
        ctx.lineTo(charX + 5, charY + 40);
        ctx.fill();
      }

      // Speech Bubble in Animation
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(charX - 100, charY - 110, 200, 50, 12);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🚀 "Aetherius Toon Studio!"', charX, charY - 80);

      // Filter Overlay
      if (filterStyle === 'halftone') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        for (let x = 0; x < w; x += 8) {
          for (let y = 0; y < h; y += 8) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentFrame, cameraAngle, filterStyle]);

  // Selected Panel Helper
  const currentPanel = panels.find((p) => p.id === selectedPanelId) || panels[0];

  const updateSelectedPanel = (updates: Partial<ComicPanel>) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === selectedPanelId ? { ...p, ...updates } : p))
    );
  };

  // AI Storyboard Generation Simulation
  const handleGenerateAiStory = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      setPanels([
        {
          id: 'p1',
          title: 'Panel 1: The Heist Begins',
          backgroundId: 'bg_1',
          characterId: 'char_2',
          speechBubbleText: 'Target acquired: The Quantum Core is inside Sector 7!',
          bubbleType: 'speech',
          actionBadge: 'ZAP!',
          captionText: 'Neo-Chroma Metropolis, Midnight'
        },
        {
          id: 'p2',
          title: 'Panel 2: Alien Ambush',
          backgroundId: 'bg_2',
          characterId: 'char_4',
          speechBubbleText: 'Foolish mortal! You fell right into our cosmic trap!',
          bubbleType: 'shout',
          actionBadge: 'POW!',
          captionText: 'Volcanic Outpost Perimeter'
        },
        {
          id: 'p3',
          title: 'Panel 3: Bot Backup',
          backgroundId: 'bg_3',
          characterId: 'char_3',
          speechBubbleText: 'Voxel Shield activated! Firing orbital cannon now!',
          bubbleType: 'speech',
          actionBadge: 'KA-BOOM!',
          captionText: 'Starship Orbital Deck'
        },
        {
          id: 'p4',
          title: 'Panel 4: Mission Accomplished',
          backgroundId: 'bg_5',
          characterId: 'char_1',
          speechBubbleText: 'Great work team! Returning to Aetherius Base.',
          bubbleType: 'thought',
          actionBadge: 'WHAM!',
          captionText: 'Sector Zero Boundary'
        }
      ]);
      setIsGeneratingStory(false);
      playSfx('cheer');
    }, 1200);
  };

  // Render & Export Simulator
  const handleRenderMovie = () => {
    setRenderProgress(0);
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setIsRenderedModalOpen(true);
          playSfx('cheer');
          return null;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono shadow-2xl space-y-6 p-6">
      
      {/* App Title & Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-gradient-to-r from-pink-500 to-purple-600 text-slate-950 px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
              APP 4 • CARTOON & VIDEO MAKER
            </span>
            <h2 className="text-xl font-black text-white">ToonStudio: Comic Strip & Animated Video Maker</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Create multi-panel comic strips, 2D/3D animated cartoon videos, audio voiceovers, speech bubbles, and AI storyboards!
          </p>
        </div>

        {/* Mode Selector Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('comic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'comic'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Comic Book Maker</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Animated Movie Director</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_storyboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ai_storyboard'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>AI Storyboard Generator</span>
          </button>
        </div>
      </div>

      {/* ----------------- TAB 1: COMIC BOOK STRIP CREATOR ----------------- */}
      {activeTab === 'comic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Comic Strip Canvas Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Toolbar: Layout & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
              
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Grid Layout:</span>
                <button
                  onClick={() => setPanelLayout('4grid')}
                  className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                    panelLayout === '4grid' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  4-Panel Grid
                </button>
                <button
                  onClick={() => setPanelLayout('3strip')}
                  className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                    panelLayout === '3strip' ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  3-Panel Strip
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold">Art Filter:</span>
                {(['halftone', 'vhs', 'cyber', 'ink'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterStyle(f)}
                    className={`px-2.5 py-1 rounded-lg border text-[10px] uppercase font-bold cursor-pointer ${
                      filterStyle === f ? 'bg-pink-950 border-pink-400 text-pink-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

            </div>

            {/* Rendered Comic Strip Canvas */}
            <div className={`grid gap-4 bg-slate-950 p-5 rounded-3xl border-2 border-slate-800 shadow-inner ${
              panelLayout === '4grid' ? 'grid-cols-2' : panelLayout === '3strip' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3'
            }`}>
              {panels.map((p, idx) => {
                const bg = BACKGROUNDS.find((b) => b.id === p.backgroundId) || BACKGROUNDS[0];
                const char = CHARACTERS.find((c) => c.id === p.characterId) || CHARACTERS[0];
                const isSelected = selectedPanelId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPanelId(p.id)}
                    className={`relative min-h-[220px] rounded-2xl overflow-hidden border-4 transition-all cursor-pointer bg-gradient-to-b ${bg.gradient} p-4 flex flex-col justify-between ${
                      isSelected ? 'border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Caption Box */}
                    <div className="bg-amber-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500 uppercase tracking-wider self-start shadow-md">
                      {p.captionText || `PANEL #${idx + 1}`}
                    </div>

                    {/* Speech Bubble */}
                    <div className="relative my-2 bg-white text-slate-950 p-3 rounded-2xl shadow-xl font-sans text-xs font-bold leading-tight border-2 border-slate-900 self-center max-w-[85%] text-center">
                      <div className="text-[10px] uppercase font-mono text-pink-600 font-extrabold mb-0.5">
                        {p.bubbleType === 'shout' ? '⚡ SHOUT!' : p.bubbleType === 'thought' ? '💭 THOUGHT...' : '💬 SPEECH'}
                      </div>
                      "{p.speechBubbleText}"
                    </div>

                    {/* Character Avatar & Action Badge */}
                    <div className="flex items-end justify-between mt-2">
                      
                      {/* Character Sprite */}
                      <div className={`flex items-center gap-2 p-2 rounded-xl border ${char.color} backdrop-blur`}>
                        <span className="text-3xl">{char.avatar}</span>
                        <div>
                          <div className="text-xs font-black text-white">{char.name}</div>
                          <div className="text-[9px] text-slate-400">{char.role}</div>
                        </div>
                      </div>

                      {/* Action SFX Badge */}
                      {p.actionBadge && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            playSfx('zap');
                          }}
                          className="bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full border-2 border-slate-950 rotate-[-12deg] shadow-lg animate-pulse"
                        >
                          {p.actionBadge}
                        </div>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Export & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  alert('Exporting Comic Strip as High-Res PDF / PNG!');
                  playSfx('cheer');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT HIGH-RES COMIC</span>
              </button>

              <button
                onClick={() => playSfx('zap')}
                className="px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE TO COMMUNITY</span>
              </button>
            </div>

          </div>

          {/* Panel Inspector & Editor Sidebar */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" /> PANEL INSPECTOR ({currentPanel.title})
              </h3>
            </div>

            {/* Caption Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">CAPTION BANNER TEXT</label>
              <input
                type="text"
                value={currentPanel.captionText}
                onChange={(e) => updateSelectedPanel({ captionText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Dialogue Bubble Text */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">DIALOGUE / SPEECH TEXT</label>
              <textarea
                rows={3}
                value={currentPanel.speechBubbleText}
                onChange={(e) => updateSelectedPanel({ speechBubbleText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none resize-none"
              />
            </div>

            {/* Bubble Style Switcher */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">SPEECH BUBBLE STYLE</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['speech', 'thought', 'shout'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => updateSelectedPanel({ bubbleType: type })}
                    className={`py-1.5 rounded-lg border font-bold capitalize cursor-pointer ${
                      currentPanel.bubbleType === type ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">SELECT CHARACTER</label>
              <div className="grid grid-cols-1 gap-2">
                {CHARACTERS.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => updateSelectedPanel({ characterId: c.id })}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      currentPanel.characterId === c.id ? 'bg-slate-900 border-pink-400' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{c.avatar}</span>
                      <span className="text-xs font-bold text-white">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{c.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">SCENE ENVIRONMENT</label>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateSelectedPanel({ backgroundId: b.id })}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      currentPanel.backgroundId === b.id ? 'bg-slate-900 border-amber-400 text-amber-300' : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{b.emoji}</span>
                    <span className="truncate">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action SFX Badges */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-bold">ACTION BADGE</label>
              <div className="flex flex-wrap gap-1.5">
                {ACTION_BADGES.map((badge) => (
                  <button
                    key={badge}
                    onClick={() => {
                      updateSelectedPanel({ actionBadge: badge });
                      playSfx('zap');
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[10px] font-black cursor-pointer ${
                      currentPanel.actionBadge === badge ? 'bg-rose-500 text-slate-950 border-rose-400' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- TAB 2: ANIMATED MOVIE & VIDEO DIRECTOR ----------------- */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          
          {/* Main Animation Viewport Canvas */}
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 flex items-center justify-center">
            
            <canvas ref={canvasRef} width={800} height={400} className="w-full h-full object-contain" />

            {/* Camera Overlay HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono">
              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-cyan-400 font-bold flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>ANGLE: {cameraAngle.toUpperCase()}</span>
              </div>

              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-rose-400 font-bold">
                FRAME {currentFrame} / 120 ({fps} FPS)
              </div>
            </div>

          </div>

          {/* Timeline & Film Director Controls */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Play / Pause / Rewind */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying((p) => !p)}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlaying ? 'PAUSE ANIMATION' : 'PLAY MOVIE'}</span>
                </button>

                <button
                  onClick={() => setCurrentFrame(0)}
                  className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Camera Angle Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold">CAMERA:</span>
                {(['wide', 'closeup', 'tracking'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setCameraAngle(angle)}
                    className={`px-3 py-1.5 rounded-lg border font-bold capitalize cursor-pointer ${
                      cameraAngle === angle ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {angle}
                  </button>
                ))}
              </div>

              {/* Sound Triggers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playSfx('zap')}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400 rounded-lg cursor-pointer hover:border-cyan-500"
                >
                  ⚡ LASER SFX
                </button>
                <button
                  onClick={() => playSfx('boom')}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs font-bold text-rose-400 rounded-lg cursor-pointer hover:border-rose-500"
                >
                  💥 EXPLOSION SFX
                </button>
              </div>

            </div>

            {/* Frame Scrubber Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>KEYFRAME SCRUBBER</span>
                <span>{Math.floor((currentFrame / 120) * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={120}
                value={currentFrame}
                onChange={(e) => setCurrentFrame(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Render Movie Button */}
            <button
              onClick={handleRenderMovie}
              disabled={renderProgress !== null}
              className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <Tv className="w-5 h-5" />
              <span>{renderProgress !== null ? `RENDERING CARTOON MOVIE... (${renderProgress}%)` : 'RENDER & EXPORT MP4 CARTOON MOVIE'}</span>
            </button>

          </div>

        </div>
      )}

      {/* ----------------- TAB 3: AI STORYBOARD SCRIPT GENERATOR ----------------- */}
      {activeTab === 'ai_storyboard' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-5">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">AI Comic Script & Storyboard Generator</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Describe any cartoon concept or comic storyline, and AI will generate 4 distinct comic panels with character dialogues, background environments, and action badges!
          </p>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. A space hamster piloting a giant voxel robot to save a cosmic donut..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-white focus:border-amber-400 outline-none resize-none font-mono"
            />

            <button
              onClick={handleGenerateAiStory}
              disabled={isGeneratingStory}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{isGeneratingStory ? 'GENERATING STORYBOARD...' : 'GENERATE AI COMIC STRIP NOW'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Render Completed Modal */}
      {isRenderedModalOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-3xl max-w-md w-full space-y-4 text-center">
            <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-black text-white">CARTOON MOVIE RENDER COMPLETE!</h3>
            <p className="text-xs text-slate-300">
              Your 120-frame 2D/3D animated cartoon video has been rendered successfully at 1080p resolution!
            </p>

            <button
              onClick={() => setIsRenderedModalOpen(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-lg"
            >
              CLOSE & PREVIEW MOVIE
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
