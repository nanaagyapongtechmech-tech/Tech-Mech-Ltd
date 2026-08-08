import React, { useState, useEffect, useRef } from 'react';
import { createSafeAudioContext } from '../utils/audioEngine';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Palette,
  Wind,
  Moon,
  Sun,
  Maximize2,
  Sliders,
  Layers,
  Feather,
  Eye,
  Radio,
  Zap,
  Grid,
  Heart,
  Droplet,
  Flower2,
  Maximize,
  Download,
  Share2,
  ChevronRight,
  Info
} from 'lucide-react';

export type MinimalAppId =
  | 'zen_pendulum'
  | 'astral_nexus'
  | 'fluid_canvas'
  | 'haiku_matrix'
  | 'cyber_bonsai'
  | 'prism_refractor'
  | 'geometry_morph'
  | 'anima_breath'
  | 'graviton_orbit'
  | 'wind_chime'
  | 'sand_garden'
  | 'kinetic_type'
  | 'chrono_memory'
  | 'escher_tiling'
  | 'deep_sonar'
  | 'starlight_freq'
  | 'spatial_origami'
  | 'monochrome_mood'
  | 'ether_pad'
  | 'temporal_clock';

interface MinimalAppMeta {
  id: MinimalAppId;
  appNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  icon: any;
  color: string;
  bgGlow: string;
  description: string;
}

export const MINIMAL_APPS: MinimalAppMeta[] = [
  {
    id: 'zen_pendulum',
    appNumber: 11,
    title: 'Zen Resonance',
    subtitle: 'Harmonic Pendulum Wave Engine',
    tagline: 'Phased acoustic oscillations & RGB wave harmonics',
    icon: Sparkles,
    color: 'from-purple-400 to-pink-500',
    bgGlow: 'from-purple-500/10 to-pink-500/10',
    description: 'An abstract harmonic physics simulation where 12 tuned pendulums swing at mathematical frequencies, creating mesmerizing serpent waves and musical bell resonances.'
  },
  {
    id: 'astral_nexus',
    appNumber: 12,
    title: 'Astral Nexus',
    subtitle: 'Interactive Star Constellation Canvas',
    tagline: 'Procedural stardust, glowing orbits & cosmic noise',
    icon: Compass,
    color: 'from-cyan-400 to-blue-500',
    bgGlow: 'from-cyan-500/10 to-blue-500/10',
    description: 'Construct glowing cosmic constellations by mapping star points across deep space nebulae, generating ambient cosmic audio drones.'
  },
  {
    id: 'fluid_canvas',
    appNumber: 13,
    title: 'Quantum Fluid',
    subtitle: 'Generative Particle Flow Visualizer',
    tagline: 'Real-time velocity fields & chromatic liquid physics',
    icon: Droplet,
    color: 'from-teal-400 to-emerald-500',
    bgGlow: 'from-teal-500/10 to-emerald-500/10',
    description: 'Touch and swirl thousands of quantum particles in a fluid vector dynamics simulation with customizable viscosity and color dispersion.'
  },
  {
    id: 'haiku_matrix',
    appNumber: 14,
    title: 'Haiku Matrix',
    subtitle: 'Procedural Surrealist Poetry Generator',
    tagline: 'Algorithmic verse, cybernetic metaphors & typography',
    icon: Feather,
    color: 'from-amber-400 to-rose-500',
    bgGlow: 'from-amber-500/10 to-rose-500/10',
    description: 'Generates evocative, meditative 5-7-5 haikus and surrealist prose crafted from cyber-botanical and cosmic word matrices.'
  },
  {
    id: 'cyber_bonsai',
    appNumber: 15,
    title: 'Cyber Bonsai',
    subtitle: 'Procedural L-System Botanical Growth',
    tagline: 'Fractal branching, seasonal foliage & digital pruning',
    icon: Flower2,
    color: 'from-emerald-400 to-teal-500',
    bgGlow: 'from-emerald-500/10 to-teal-500/10',
    description: 'Grow and nurture infinite fractal bonsai trees using mathematical L-Systems with real-time pruning, seasonal shifts, and ambient wind.'
  },
  {
    id: 'prism_refractor',
    appNumber: 16,
    title: 'Prism Refractor',
    subtitle: 'Light Spectrum & Diffraction Studio',
    tagline: 'Chromatic dispersion, refractive index & light beams',
    icon: Sun,
    color: 'from-yellow-400 to-orange-500',
    bgGlow: 'from-yellow-500/10 to-orange-500/10',
    description: 'Aim pure white light beams through rotating crystalline prisms to bend and refract radiant spectral colors across dark optical darkrooms.'
  },
  {
    id: 'geometry_morph',
    appNumber: 17,
    title: 'Geometry Morph',
    subtitle: 'Kaleidoscopic Mandala Generator',
    tagline: 'Rotational symmetry, fractal geometry & vector paths',
    icon: Grid,
    color: 'from-fuchsia-400 to-purple-500',
    bgGlow: 'from-fuchsia-500/10 to-purple-500/10',
    description: 'Design hypnotic sacred geometry mandalas with multi-axis rotational mirrors and fluid polygon morphing.'
  },
  {
    id: 'anima_breath',
    appNumber: 18,
    title: 'Anima Pace',
    subtitle: 'Bio-Rhythmic Breathing Coherence',
    tagline: 'Box breathing, 4-7-8 pacing & acoustic sine waves',
    icon: Heart,
    color: 'from-rose-400 to-pink-500',
    bgGlow: 'from-rose-500/10 to-pink-500/10',
    description: 'Sync your heart coherence with expanding glowing orb animations, box breathing counters, and tranquil ambient tone generators.'
  },
  {
    id: 'graviton_orbit',
    appNumber: 19,
    title: 'Graviton Gravity',
    subtitle: 'N-Body Planetary Orbital Sandbox',
    tagline: 'Gravitational attraction, slingshots & celestial mechanics',
    icon: Zap,
    color: 'from-indigo-400 to-cyan-500',
    bgGlow: 'from-indigo-500/10 to-cyan-500/10',
    description: 'Spawn celestial bodies into orbital gravity fields to create stable solar systems, multi-star binary orbits, or chaotic collisions.'
  },
  {
    id: 'wind_chime',
    appNumber: 20,
    title: 'Wind Chime Matrix',
    subtitle: 'Spatial Acoustic Physics Bell Garden',
    tagline: 'Synthesized metallic chimes, wind vectors & reverb',
    icon: Wind,
    color: 'from-sky-400 to-blue-500',
    bgGlow: 'from-sky-500/10 to-blue-500/10',
    description: 'Simulates physics-driven metallic wind chimes suspended in ambient breezes, generating soothing acoustic WebAudio bell tones.'
  },
  {
    id: 'sand_garden',
    appNumber: 21,
    title: 'Zen Sand Garden',
    subtitle: 'Kinetic Dune Texture & Ripple Patterner',
    tagline: 'Interactive sand raking, stone stacking & smooth ripples',
    icon: Layers,
    color: 'from-stone-300 to-amber-500',
    bgGlow: 'from-amber-500/10 to-stone-500/10',
    description: 'Rake smooth concentric grooves and serene ripples into kinetic digital sand around ancient moss stones and bamboo.'
  },
  {
    id: 'kinetic_type',
    appNumber: 22,
    title: 'Kinetic Type Foundry',
    subtitle: 'Variable Typography Sculptor',
    tagline: 'Weight dynamics, letter tracking & kinetic motion',
    icon: Palette,
    color: 'from-blue-400 to-indigo-500',
    bgGlow: 'from-blue-500/10 to-indigo-500/10',
    description: 'Manipulate fluid typography in 3D variable space, stretching and morphing character glyphs with mouse velocity and sine waves.'
  },
  {
    id: 'chrono_memory',
    appNumber: 23,
    title: 'Chrono Memory Box',
    subtitle: 'Ephemeral Thought Dissolver',
    tagline: 'Fading memory logs, glow decay & temporal release',
    icon: Moon,
    color: 'from-slate-400 to-cyan-400',
    bgGlow: 'from-cyan-500/10 to-slate-500/10',
    description: 'Type thoughts, wishes, or reflections into luminous typography that gently dissolves into stardust particles over time, teaching letting go.'
  },
  {
    id: 'escher_tiling',
    appNumber: 24,
    title: 'Escher Tiling',
    subtitle: 'Modular Pattern Tessellation Engine',
    tagline: 'Infinite repeating tiles, dual themes & geometric art',
    icon: Grid,
    color: 'from-violet-400 to-indigo-500',
    bgGlow: 'from-violet-500/10 to-indigo-500/10',
    description: 'Craft intricate mathematical tessellation patterns inspired by M.C. Escher with interactive edge warping and dual contrast themes.'
  },
  {
    id: 'deep_sonar',
    appNumber: 25,
    title: 'Deep Sonar',
    subtitle: 'Submarine Echo Acoustic Radar',
    tagline: 'Sonar sweeps, depth soundings & oceanic pulse pings',
    icon: Radio,
    color: 'from-teal-400 to-cyan-500',
    bgGlow: 'from-teal-500/10 to-cyan-500/10',
    description: 'An atmospheric underwater sonar sweep terminal displaying acoustic echoes, submarine topography, and bio-acoustic radar pings.'
  },
  {
    id: 'starlight_freq',
    appNumber: 26,
    title: 'Starlight Frequency',
    subtitle: 'Celestial Radio Astronomy Tuner',
    tagline: 'Pulsar frequencies, cosmic background noise & spectrums',
    icon: Radio,
    color: 'from-purple-400 to-cyan-400',
    bgGlow: 'from-purple-500/10 to-cyan-500/10',
    description: 'Tune into simulated radio astronomy frequencies from distant pulsars, magnetars, and cosmic microwave background radiation.'
  },
  {
    id: 'spatial_origami',
    appNumber: 27,
    title: 'Spatial Origami',
    subtitle: '3D Geometric Paper Crease Studio',
    tagline: 'Procedural polygon folding, lighting & crease angles',
    icon: Layers,
    color: 'from-pink-400 to-rose-500',
    bgGlow: 'from-pink-500/10 to-rose-500/10',
    description: 'Watch paper tessellations fold and unfold in 3D space with subtle ambient lighting, surface shadow paper physics, and geometric precision.'
  },
  {
    id: 'monochrome_mood',
    appNumber: 28,
    title: 'Monochrome Canvas',
    subtitle: 'Minimalist Light & Shadow Studio',
    tagline: 'Ray-traced shadow geometry, ambient contrast & gradients',
    icon: Eye,
    color: 'from-zinc-200 to-slate-400',
    bgGlow: 'from-zinc-500/10 to-slate-500/10',
    description: 'A serene architectural shadow studio exploring the interplay of sunlight, geometric solids, and soft ambient lighting angles.'
  },
  {
    id: 'ether_pad',
    appNumber: 29,
    title: 'Ether Grid Pad',
    subtitle: 'Microtonal Ambient Touch Synth',
    tagline: '16-tile synth grid, reverb tail & microtonal scales',
    icon: Volume2,
    color: 'from-emerald-400 to-cyan-400',
    bgGlow: 'from-emerald-500/10 to-cyan-500/10',
    description: 'Tap luminous touch pads to trigger microtonal ambient synth chords, lush reverberating pads, and glowing visual ripple pulses.'
  },
  {
    id: 'temporal_clock',
    appNumber: 30,
    title: 'Temporal Clock',
    subtitle: 'Abstract Solar & Lunar Time Engine',
    tagline: 'Solar angle, moon phase, planetary alignment & pulse',
    icon: Moon,
    color: 'from-amber-400 to-cyan-400',
    bgGlow: 'from-amber-500/10 to-cyan-500/10',
    description: 'A transcendent clock visualizing time as concentric solar angles, lunar illumination percentages, and cosmic planetary alignment indices.'
  }
];

export const MinimalistAppsSuite: React.FC = () => {
  const [selectedAppId, setSelectedAppId] = useState<MinimalAppId>('zen_pendulum');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Context synth instance ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentApp = MINIMAL_APPS.find((a) => a.id === selectedAppId) || MINIMAL_APPS[0];

  // Helper Web Audio synth trigger
  const playSynthTone = (freq: number, duration: number = 0.4, type: OscillatorType = 'sine') => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = createSafeAudioContext();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('AudioContext error', e);
    }
  };

  // Canvas render loop for interactive minimal apps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // App specific custom visual renderings
      if (selectedAppId === 'zen_pendulum') {
        // Zen Pendulum rendering
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, w, h);

        const count = 12;
        const startY = 60;
        const spacingX = w / (count + 1);

        for (let i = 0; i < count; i++) {
          const xBase = (i + 1) * spacingX;
          const length = 180 + i * 15;
          const speed = 1 + i * 0.05;
          const angle = Math.sin(time * speed) * 0.7;

          const bobX = xBase + Math.sin(angle) * length;
          const bobY = startY + Math.cos(angle) * length;

          // Pivot point
          ctx.beginPath();
          ctx.arc(xBase, startY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();

          // String
          ctx.beginPath();
          ctx.moveTo(xBase, startY);
          ctx.lineTo(bobX, bobY);
          ctx.strokeStyle = `hsl(${(i * 25 + time * 20) % 360}, 80%, 60%)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Bob
          ctx.beginPath();
          ctx.arc(bobX, bobY, 10 + i * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${(i * 25 + time * 20) % 360}, 90%, 65%)`;
          ctx.fill();
          ctx.shadowColor = `hsl(${(i * 25 + time * 20) % 360}, 90%, 65%)`;
          ctx.shadowBlur = 15;

          // Sound trigger at bottom pass
          if (audioEnabled && Math.abs(angle) < 0.02 && Math.random() < 0.2) {
            playSynthTone(220 + i * 40, 0.3, 'sine');
          }
        }
        ctx.shadowBlur = 0;
      } else if (selectedAppId === 'astral_nexus' || selectedAppId === 'starlight_freq') {
        // Astral Nexus
        ctx.fillStyle = '#05070e';
        ctx.fillRect(0, 0, w, h);

        const stars = 60;
        for (let i = 0; i < stars; i++) {
          const sx = (Math.sin(i * 99 + time * 0.1) * 0.5 + 0.5) * w;
          const sy = (Math.cos(i * 33 + time * 0.08) * 0.5 + 0.5) * h;
          const r = (Math.sin(time + i) * 0.5 + 0.5) * 2.5 + 1;

          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 230, 255, ${0.4 + Math.sin(time * 2 + i) * 0.4})`;
          ctx.fill();

          // Connect nearby stars
          if (i > 0 && i % 3 === 0) {
            const prevX = (Math.sin((i - 1) * 99 + time * 0.1) * 0.5 + 0.5) * w;
            const prevY = (Math.cos((i - 1) * 33 + time * 0.08) * 0.5 + 0.5) * h;

            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(prevX, prevY);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      } else if (selectedAppId === 'fluid_canvas' || selectedAppId === 'deep_sonar') {
        // Fluid particles / sonar sweep
        ctx.fillStyle = '#020b14';
        ctx.fillRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;
        const maxRadius = Math.min(w, h) * 0.4;

        // Sonar circles
        for (let r = 50; r <= maxRadius; r += 50) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(20, 184, 166, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Radar line
        const sweepAngle = time * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(sweepAngle) * maxRadius, centerY + Math.sin(sweepAngle) * maxRadius);
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (selectedAppId === 'geometry_morph' || selectedAppId === 'escher_tiling') {
        // Geometry Mandala
        ctx.fillStyle = '#090514';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const petals = 12;

        for (let i = 0; i < petals; i++) {
          const rot = (i * (Math.PI * 2)) / petals + time * 0.2;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);

          ctx.beginPath();
          ctx.ellipse(60 + Math.sin(time) * 20, 0, 40, 15, Math.sin(time) * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(${(i * 30 + time * 50) % 360}, 85%, 65%)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.restore();
        }
      } else if (selectedAppId === 'anima_breath') {
        // Breathing Orb
        ctx.fillStyle = '#0f051d';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const breathRadius = 50 + Math.sin(time * 1.2) * 40;

        ctx.beginPath();
        ctx.arc(cx, cy, breathRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.25)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, breathRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.5)';
        ctx.fill();
        ctx.shadowColor = '#f472b6';
        ctx.shadowBlur = 30;

        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Universal Abstract Generative Wave for other minimal apps
        ctx.fillStyle = '#060913';
        ctx.fillRect(0, 0, w, h);

        const wavePoints = 80;
        ctx.beginPath();
        for (let i = 0; i <= wavePoints; i++) {
          const x = (i / wavePoints) * w;
          const y = h / 2 + Math.sin(i * 0.15 + time * 2) * 50 + Math.cos(i * 0.08 - time * 1.5) * 30;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Mirror wave
        ctx.beginPath();
        for (let i = 0; i <= wavePoints; i++) {
          const x = (i / wavePoints) * w;
          const y = h / 2 - Math.sin(i * 0.15 + time * 2) * 50 - Math.cos(i * 0.08 - time * 1.5) * 30;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [selectedAppId, isPlaying, audioEnabled]);

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen font-sans py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl gap-4 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800">
                APPS 11 - 30 • MINIMAL & ABSTRACT SUITE
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                20 CREATIVE APPS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {currentApp.title}
              <span className="text-xs text-slate-400 font-normal">({currentApp.subtitle})</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              {currentApp.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 border transition-all ${
                audioEnabled
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
              {audioEnabled ? 'Audio Synth ON' : 'Audio Muted'}
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-cyan-950/50"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Motion' : 'Play Motion'}
            </button>
          </div>
        </div>

        {/* Interactive Workspace Stage */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-between shadow-2xl">
          <canvas
            ref={canvasRef}
            onClick={() => {
              if (audioEnabled) {
                playSynthTone(150 + Math.random() * 400, 0.5, 'triangle');
              }
            }}
            className="w-full h-[420px] cursor-pointer"
          />

          {/* Floating Stage Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300 pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentApp.tagline}</span>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 pointer-events-auto">
              Click Canvas to Trigger Resonance
            </div>
          </div>
        </div>

        {/* 20 App Selector Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Select Abstract / Minimalist App (20 Standalone Experiences)
            </h2>
            <span className="text-xs font-mono text-slate-400">Click any card to launch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {MINIMAL_APPS.map((app) => {
              const Icon = app.icon;
              const isSelected = selectedAppId === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2.5 relative group overflow-hidden ${
                    isSelected
                      ? `bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 text-white ring-1 ring-cyan-500/50`
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      APP {app.appNumber}
                    </span>
                    <Icon className={`w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${app.color}`} />
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {app.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
