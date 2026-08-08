import React from 'react';
import {
  Music,
  FileCode,
  Gamepad2,
  Video,
  Keyboard,
  Code2,
  TrendingUp,
  Ruler,
  Dna,
  Mic,
  Atom,
  Download,
  Play,
  Sparkles,
  ExternalLink,
  Share2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Lock
} from 'lucide-react';
import { WalletState } from '../types';
import { MainAppId } from './HeaderNav';

interface AppSuiteLauncherProps {
  onLaunchApp: (appId: MainAppId) => void;
  onOpenDownloadModal: (appId?: MainAppId) => void;
  wallet: WalletState;
}

export const AppSuiteLauncher: React.FC<AppSuiteLauncherProps> = ({
  onLaunchApp,
  onOpenDownloadModal,
  wallet
}) => {
  const [copiedApp, setCopiedApp] = React.useState<string | null>(null);

  const getFullAppUrl = (query: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}${query}`;
  };

  const handleCopyLink = (appId: string, query: string) => {
    const url = getFullAppUrl(query);
    navigator.clipboard.writeText(url);
    setCopiedApp(appId);
    setTimeout(() => setCopiedApp(null), 3000);
  };

  const apps = [
    {
      id: 'everything-lab' as MainAppId,
      number: '00',
      title: 'The Everything AI Lab',
      subtitle: '28 Interconnected AI Research, Math, Simulation & Codex Engines',
      badge: 'FLAGSHIP • 28 UNIFIED LABS',
      query: '?app=everything-lab',
      tagline: 'Idea Lab • Deep Research • UIM Math • Quantum Physics • Universe Sim • Codex • Gemini AI',
      icon: Atom,
      gradient: 'from-cyan-400 via-teal-500 to-emerald-500',
      borderAccent: 'border-cyan-500/50 hover:border-cyan-400',
      bgGlow: 'from-cyan-500/10 via-emerald-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'Explore the complete 28-module unified AI laboratory. Conduct deep research, model Universal Identity Mathematics, run multi-dimensional universe physics simulations, and co-author the Universal Codex.',
      features: [
        '28 Interconnected Labs: Idea, Research, UIM Math, Vacuum Transducer & Consciousness',
        'Multi-Dimensional Universe & Multiverse Cosmological Simulator',
        'Universal Identity Mathematics (UIM) Equation Solver & Tensor Visualizer',
        'Gemini Pro AI Researcher with Live Chat & Hypothesis Evaluator',
        'Universal Codex Library with LaTeX Math & Knowledge Graph Network'
      ],
      quickStats: {
        stat1: '28 Sub-Labs',
        stat2: '36 Dimensions',
        stat3: 'Gemini AI'
      }
    },
    {
      id: 'music' as MainAppId,
      number: '01',
      title: 'Aether Music Lab',
      subtitle: 'AI Song Generator, Stems Vault & Musician Match',
      badge: 'APP 1 • MUSIC & AUDIO',
      query: '?app=music',
      tagline: 'AI Song Generation • Stems Isolation • Audio Player • Live Fan Lounge',
      icon: Music,
      gradient: 'from-pink-500 via-purple-600 to-indigo-600',
      borderAccent: 'border-pink-500/40 hover:border-pink-400',
      bgGlow: 'from-pink-500/10 via-purple-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      description: 'Generate original tracks with prompt AI, split vocal & synth stems, play high-res audio tracks, find musician collaborators, and host real-time fan listening sessions.',
      features: [
        'AI Song Lab: Generate custom synthwave, EDM, metal & lo-fi tracks',
        'Interactive Track Player with waveform visualizer & lyric sync',
        'Multi-track Stem Vault (Vocals, Bass, Drums, Synths isolation)',
        'Musician Matchmaker: Connect with artists & producers worldwide',
        'Live Fan Lounge with real-time audio room chat & tipping'
      ],
      quickStats: {
        stat1: 'AI Songs',
        stat2: '4-Track Stems',
        stat3: 'Live Fan Lounge'
      }
    },
    {
      id: 'blueprints' as MainAppId,
      number: '02',
      title: 'Aether Blueprint Vault',
      subtitle: 'Architectural CAD Specs & Comparison Studio',
      badge: 'APP 2 • BLUEPRINTS & CAD',
      query: '?app=blueprints',
      tagline: '39.7 Million Schematics • 19.7M Original & 20M AI Added • CAD Inspector • Specs Matrix',
      icon: FileCode,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      borderAccent: 'border-emerald-500/40 hover:border-emerald-400',
      bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      description: 'Access the complete 39.7 million schematic blueprint vault. Inspect 19.7 million original historical & modern CAD schematics plus 20 million AI-added "To Be Built" concepts.',
      features: [
        '39.7 Million Schematics (19.7M Original Patents + 20M AI Added Concepts)',
        'Interactive CAD Schematic Inspection & Layer Toggle',
        'Side-by-Side Blueprint Specs Comparison Engine',
        'Bookmarking & Offline Schematic Vault Export',
        'Printable High-Res PDF Infographic Poster Creator'
      ],
      quickStats: {
        stat1: '19.7M Original',
        stat2: '20M AI Added',
        stat3: '39.7M Total'
      }
    },
    {
      id: 'game' as MainAppId,
      number: '03',
      title: 'Aetherius 3D Gaming Realm',
      subtitle: 'Space Voidfleet, Neo-Chroma Metropolis & Voxel Architect',
      badge: 'APP 3 • 3D GAMING SUITE',
      query: '?app=game',
      tagline: '200 Starships • Neo-Chroma Open World • Haute Couture Fashion • Voxel Station Builder',
      icon: Gamepad2,
      gradient: 'from-amber-500 via-rose-600 to-purple-600',
      borderAccent: 'border-amber-500/40 hover:border-amber-400',
      bgGlow: 'from-amber-500/10 via-rose-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
      description: 'Pilot 200 warships across 200 star systems, explore Neo-Chroma cyberpunk city districts, race hyper-neon hovercrafts, defend against alien waves, and customize haute couture avatars.',
      features: [
        '200 Pilotable Warships & 200 Systems Orbital Mining',
        'Neo-Chroma Metropolis Open-World Syndicate Quests',
        '3D Hovercraft Racing & Voxel Vanguard Defense',
        'Chroma Haute Couture 3D Avatar Fashion Studio',
        '3D WebGL Voxel Station Architect & Star-Bazaar Trade Market'
      ],
      quickStats: {
        stat1: '200 Starships',
        stat2: 'Neo-Chroma City',
        stat3: 'Level 1000 Prestige'
      }
    },
    {
      id: 'studio' as MainAppId,
      number: '04',
      title: 'ToonStudio Comic & Video Maker',
      subtitle: 'Comic Book Creator, 2D/3D Animated Movie & AI Storyboard Director',
      badge: 'APP 4 • CARTOON & VIDEO MAKER',
      query: '?app=studio',
      tagline: 'Comic Strip Builder • 2D/3D Animated Movie Renderer • AI Storyboard Generator • Audio SFX Synth',
      icon: Video,
      gradient: 'from-purple-500 via-pink-600 to-rose-600',
      borderAccent: 'border-purple-500/40 hover:border-purple-400',
      bgGlow: 'from-purple-500/10 via-pink-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      description: 'Design multi-panel comic strips, direct keyframe animated cartoon movies, generate AI storyboards, overlay speech bubbles & action badges, and export HD videos with custom audio FX.',
      features: [
        'Interactive Multi-Panel Comic Book Strip Builder with Speech Bubbles',
        '2D/3D Animated Cartoon Movie Director & Keyframe Scrubber',
        'Web Audio Synthesizer for Lasers, Explosions & Cartoon SFX',
        'AI Storyboard Script Generator from Custom Natural Language Prompts',
        'High-Res PNG & 1080p Animated Video MP4 Exporter'
      ],
      quickStats: {
        stat1: 'Comic Builder',
        stat2: 'Animated Movies',
        stat3: 'AI Storyboards'
      }
    },
    {
      id: 'typing' as MainAppId,
      number: '05',
      title: 'Type2Earn Information Portal',
      subtitle: 'Make Money Transcribing Information & Paid Content Unlocks',
      badge: 'APP 5 • TYPE TO EARN CASH',
      query: '?app=typing',
      tagline: 'Type For Cash Rewards • Subscriptions ($2/mo, $44/yr, $100) • Unlocked Info Vault • Instant Cashouts',
      icon: Keyboard,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      borderAccent: 'border-emerald-500/40 hover:border-emerald-400',
      bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      description: 'Transcribe high-value information, quantum specs, financial reports, and technical dossiers. Earn cash rewards for every task typed and unlock classified knowledge vaults with flexible subscriptions.',
      features: [
        'Real-time Typing Challenge Engine with WPM & Accuracy Meter',
        'Direct Cash Rewards Paid per Completed Information Snippet',
        'Flexible Subscription Tier Unlocks ($2/mo, $44/yr, $100 Premium)',
        'Mandatory User Signup & Account Profile Authentication Gate',
        'Instant Payouts to PayPal, Crypto USDT, or Bank Transfer'
      ],
      quickStats: {
        stat1: '$2 / $44 / $100 Plans',
        stat2: 'Real Cash Rewards',
        stat3: 'Instant Cashout'
      }
    },
    {
      id: 'ide' as MainAppId,
      number: '06',
      title: 'AI NeuroCode IDE & Quantum Lab',
      subtitle: 'Write, Compile & Optimize Quantum & AI Code',
      badge: 'APP 6 • NEUROCODE IDE',
      query: '?app=ide',
      tagline: 'Multi-language Editor • Quantum Q# & Python • AI Refactoring Assistant • Terminal Execution',
      icon: Code2,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      borderAccent: 'border-blue-500/40 hover:border-blue-400',
      bgGlow: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      description: 'An advanced code workspace for quantum search algorithms, neural agent execution, and WebAssembly Rust performance routines with AI auto-refactoring.',
      features: [
        'Interactive Code Editor with Syntax Highlighting & Presets',
        'Simulated Quantum Q# & Python Execution Kernel',
        'AI NeuroCode Refactor Assistant with Prompt Injections',
        'Terminal Compiler Logs with Real-time Diagnostics',
        'Direct File Exporter for .qsharp, .py, .rs, and .ts'
      ],
      quickStats: {
        stat1: 'Quantum Q#',
        stat2: 'AI Refactor',
        stat3: 'Live Terminal'
      }
    },
    {
      id: 'trading' as MainAppId,
      number: '07',
      title: 'AstroTrader 3D Market',
      subtitle: 'Galactic Stock Exchange & Asset Trading',
      badge: 'APP 7 • GALACTIC EXCHANGE',
      query: '?app=trading',
      tagline: 'Simulated Real-time Tickers • Order Books • Portfolio Net Worth Tracker • Instant Trades',
      icon: TrendingUp,
      gradient: 'from-amber-500 via-orange-600 to-emerald-600',
      borderAccent: 'border-amber-500/40 hover:border-amber-400',
      bgGlow: 'from-amber-500/10 via-orange-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      description: 'Trade futuristic assets, quantum compute tokens, and terraforming commodities on a live simulated ticker stream with portfolio analytics.',
      features: [
        'Dynamic Real-time Stock & Crypto Ticker Feeds',
        'Interactive Sparkline Chart Analytics',
        'Simulated Buy/Sell Order Execution Terminal',
        'Portfolio Balance & Total Net Worth Calculator',
        'Galactic Energy & Space Commodity Market Assets'
      ],
      quickStats: {
        stat1: 'Live Tickers',
        stat2: 'Instant Trades',
        stat3: 'Portfolio Tracker'
      }
    },
    {
      id: 'holocad' as MainAppId,
      number: '08',
      title: 'HoloCad 3D Spatial Studio',
      subtitle: 'Interior Architectural CAD & Habitat Designer',
      badge: 'APP 8 • HOLOCAD 3D',
      query: '?app=holocad',
      tagline: '2D/3D Grid Floor Plans • Object Snapping • Cyber Neon Lighting Modes • CAD Specs',
      icon: Ruler,
      gradient: 'from-teal-500 via-cyan-600 to-blue-600',
      borderAccent: 'border-teal-500/40 hover:border-teal-400',
      bgGlow: 'from-teal-500/10 via-cyan-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'Design high-tech space habitats, starship bridge layouts, and spatial rooms with 3D furniture placement, grid snapping, and lighting profiles.',
      features: [
        'Interactive CAD Floor Plan Grid Canvas',
        '3D Objects Catalog: Quantum Reactors, Command Desks, Cryo Pods',
        '90° Object Rotation & Positioning Controls',
        'Cyber Neon, Daylight, and Stealth Spatial Lighting Modes',
        'Room Dimensions & Area Calculation Metrics'
      ],
      quickStats: {
        stat1: 'Grid Floor Plan',
        stat2: '3D Placement',
        stat3: 'Neon Lighting'
      }
    },
    {
      id: 'biosynth' as MainAppId,
      number: '09',
      title: 'BioSynth Alien Genome Lab',
      subtitle: 'DNA Strand Splicing & Mutation Simulator',
      badge: 'APP 9 • ALIEN GENOME LAB',
      query: '?app=biosynth',
      tagline: 'Alien Gene Trait Splicing • Mutation Probability Probe • Evolutionary Power Scoring',
      icon: Dna,
      gradient: 'from-emerald-500 via-teal-600 to-green-600',
      borderAccent: 'border-emerald-500/40 hover:border-emerald-400',
      bgGlow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
      description: 'Recombine alien DNA strands, activate exotrait mutations, and evaluate organistic power scores in a simulated biotech research lab.',
      features: [
        'Gene Trait Strand Splicing: Bioluminescent Skin, Cyber Reflexes, Telepathy',
        'Mutation Probability Rate Probes',
        'Organism Evolutionary Power Scoring Engine',
        'Real-time Genome Lab Terminal Output Logs',
        'Biotech Research Dossier Exporter'
      ],
      quickStats: {
        stat1: 'DNA Splicing',
        stat2: 'Mutations',
        stat3: 'Power Score'
      }
    },
    {
      id: 'voice' as MainAppId,
      number: '10',
      title: 'CyberVoice AI Podcaster Studio',
      subtitle: 'Multi-Speaker Dialogue Script & Voice Morphing',
      badge: 'APP 10 • CYBERVOICE AI',
      query: '?app=voice',
      tagline: 'Multi-Persona Scripting • Live Sound FX Board • Spatial Reverb Control • Episode Player',
      icon: Mic,
      gradient: 'from-purple-500 via-indigo-600 to-pink-600',
      borderAccent: 'border-purple-500/40 hover:border-purple-400',
      bgGlow: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      description: 'Synthesize multi-character AI podcaster dialogues, trigger sci-fi sound FX, tweak vocal pitch and acoustics, and export episode recordings.',
      features: [
        'Multi-Speaker Persona Script Timeline Editor',
        'Voice Personas: Aetherius AI, Commander Vance, Dr. Nova Synth',
        'Live Sci-Fi SFX Soundboard: Lasers, Warps, Chimes & Bass Drops',
        'Spatial Acoustics & Reverb Modulation',
        'Full Podcast Episode Playback Engine'
      ],
      quickStats: {
        stat1: 'Podcaster Studio',
        stat2: 'SFX Soundboard',
        stat3: 'Voice Morph'
      }
    },
    {
      id: 'minimalist' as MainAppId,
      number: '11-30',
      title: '20 Minimalistic & Abstract Apps',
      subtitle: 'Zen Pendulum, Astral Nexus, Quantum Fluid & More',
      badge: 'APPS 11 - 30 • 20 CREATIVE APPS',
      query: '?app=minimalist',
      tagline: 'Harmonic Physics • Interactive Constellations • Fluid Dynamics • Procedural Poetry',
      icon: Sparkles,
      gradient: 'from-cyan-400 via-purple-500 to-pink-500',
      borderAccent: 'border-cyan-500/40 hover:border-cyan-400',
      bgGlow: 'from-cyan-500/10 via-purple-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=80',
      description: 'A collection of 20 expressive, abstract, and minimalist digital art installations, sound generators, and harmonic simulations.',
      features: [
        'Zen Resonance Harmonic Pendulum Wave Engine',
        'Astral Nexus Interactive Star Constellation Generator',
        'Quantum Fluid Particle Vector Flow Visualizer',
        'Haiku Matrix Procedural Surrealist Poetry Generator',
        'Cyber Bonsai L-System Botanical Growth Simulator'
      ],
      quickStats: {
        stat1: '20 Minimal Apps',
        stat2: 'Audio Synths',
        stat3: 'Abstract Art'
      }
    },
    {
      id: 'premium' as MainAppId,
      number: '31-40',
      title: '10 VIP Premium Locked Apps',
      subtitle: 'Exquisite Banking, AI Supercomputer, Algo Bot & More',
      badge: 'APPS 31 - 40 • EXQUISITE BANKING & VIP',
      query: '?app=premium',
      tagline: 'Multi-currency Wires • Holographic VIP Cards • AI Quantum Computing • Dolby Atmos',
      icon: Lock,
      gradient: 'from-amber-400 via-yellow-500 to-emerald-500',
      borderAccent: 'border-amber-500/40 hover:border-amber-400',
      bgGlow: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      bannerImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      description: 'Ten exquisite high-value premium applications including the Multi-Currency Banking Ledger & Wire Transfer Engine, Apex AI Supercomputer, and Algo Trading Bot Terminal.',
      features: [
        'Exquisite Vault Banking & Multi-Currency Wire Engine',
        'Apex AI Quantum Supercomputer & Agent Sandbox',
        'High-Frequency Algo Trading Bot Terminal',
        'Sovereign Wealth & Luxury Asset Portfolio Ledger',
        'Ray-Traced Hologram CAD Spatial Renderer'
      ],
      quickStats: {
        stat1: '10 VIP Apps',
        stat2: 'Exquisite Banking',
        stat3: 'Instant Unlock'
      }
    }
  ];

  return (
    <div className="space-y-10 font-mono text-slate-100">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-slate-950 uppercase tracking-widest shadow-md">
              AETHER SUITE DASHBOARD
            </span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
              80+ INTERACTIVE APPLICATIONS IN ONE SUITE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-teal-300 to-amber-400">Aether Suite</span>: 80+ Apps in 1 Platform
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl">
            Welcome to the unified master suite. Explore 80+ interactive applications merged into one: The Everything AI Lab (28 research, math, simulation & codex modules), 10 Major Standalone Applications, 20 Minimalist & Abstract Tools, and 10 VIP Premium Apps (including the Exquisite Multi-Currency Banking & Wire Ledger).
          </p>

          {/* Master Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenDownloadModal('dashboard')}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 cursor-pointer shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>GET DIRECT LINKS TO ALL APPS</span>
            </button>

            <button
              onClick={() => onLaunchApp('everything-lab')}
              className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <Atom className="w-4 h-4 text-cyan-400" />
              <span>OPEN EVERYTHING AI LAB</span>
            </button>
          </div>
        </div>
      </div>

      {/* Standalone Apps Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> STANDALONE APPLICATIONS & AI LABS
            </h2>
            <p className="text-xs text-slate-400 font-sans">Click "Launch App" or copy the direct link to access any app independently.</p>
          </div>
          <button
            onClick={() => onOpenDownloadModal('dashboard')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Direct Links Modal
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className={`group relative bg-slate-900/90 border ${app.borderAccent} rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${app.bgGlow} pointer-events-none`} />

                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={app.bannerImg}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {app.badge}
                      </span>
                    </div>

                    {/* App Number */}
                    <div className="absolute bottom-3 right-4 text-4xl font-black text-white/20 group-hover:text-cyan-400/40 transition-colors">
                      {app.number}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                        <Icon className="w-5 h-5 text-cyan-400" />
                        {app.title}
                      </h3>
                      <p className="text-xs font-bold text-cyan-400 mt-0.5">{app.subtitle}</p>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                      {app.description}
                    </p>

                    {/* Key Feature Bullets */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      {app.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] font-sans text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Stats Pills */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="bg-slate-950/80 p-2 rounded-xl text-center border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-sans">Module 1</span>
                        <span className="text-xs font-bold text-pink-300">{app.quickStats.stat1}</span>
                      </div>
                      <div className="bg-slate-950/80 p-2 rounded-xl text-center border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-sans">Module 2</span>
                        <span className="text-xs font-bold text-emerald-300">{app.quickStats.stat2}</span>
                      </div>
                      <div className="bg-slate-950/80 p-2 rounded-xl text-center border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-sans">Module 3</span>
                        <span className="text-xs font-bold text-amber-300">{app.quickStats.stat3}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 space-y-2.5 relative z-10">
                  <button
                    onClick={() => onLaunchApp(app.id)}
                    className={`w-full py-3 bg-gradient-to-r ${app.gradient} text-white font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-110 transition-all`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>LAUNCH {app.title.toUpperCase()}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(app.id, app.query)}
                      className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      {copiedApp === app.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied Direct Link!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" /> Copy App Link
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenDownloadModal(app.id)}
                      className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-2xl text-xs cursor-pointer transition-all"
                      title="Download Home Screen Shortcut"
                    >
                      <Download className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
