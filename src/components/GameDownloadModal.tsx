import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Smartphone,
  Laptop,
  Copy,
  Check,
  ExternalLink,
  Share2,
  Sparkles,
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
  Lock,
  CheckCircle2,
  Layers
} from 'lucide-react';

export type SeparateAppId = 'music' | 'blueprints' | 'game' | 'studio' | 'typing' | 'ide' | 'trading' | 'holocad' | 'biosynth' | 'voice' | 'minimalist' | 'premium' | 'dashboard';

interface GameDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAppId?: SeparateAppId | 'starships' | 'cybercity' | 'worldbuilder' | 'launcher' | 'studio';
}

export const GameDownloadModal: React.FC<GameDownloadModalProps> = ({
  isOpen,
  onClose,
  initialAppId = 'dashboard'
}) => {
  // Normalize initialAppId
  const normalizeAppId = (id: string): SeparateAppId => {
    if (id === 'music') return 'music';
    if (id === 'blueprints') return 'blueprints';
    if (id === 'studio') return 'studio';
    if (id === 'typing') return 'typing';
    if (id === 'ide') return 'ide';
    if (id === 'trading') return 'trading';
    if (id === 'holocad') return 'holocad';
    if (id === 'biosynth') return 'biosynth';
    if (id === 'voice') return 'voice';
    if (id === 'minimalist') return 'minimalist';
    if (id === 'premium') return 'premium';
    if (id === 'game' || id === 'starships' || id === 'cybercity' || id === 'worldbuilder') return 'game';
    return 'dashboard';
  };

  const [selectedApp, setSelectedApp] = useState<SeparateAppId>(normalizeAppId(initialAppId));
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    setSelectedApp(normalizeAppId(initialAppId));
  }, [initialAppId, isOpen]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const appDetails = {
    dashboard: {
      id: 'dashboard',
      title: 'Aether Suite - Master Dashboard Hub',
      badge: 'Master Suite Hub',
      icon: Layers,
      color: 'from-cyan-500 via-blue-600 to-purple-600',
      description: 'The master launcher linking all 4 separate applications: Music Lab, Blueprint Vault, 3D Gaming Realm, and ToonStudio.',
      query: '?app=dashboard'
    },
    music: {
      id: 'music',
      title: 'App 1: Aether Music Lab',
      badge: 'APP 1 • MUSIC & AUDIO',
      icon: Music,
      color: 'from-pink-500 via-purple-600 to-indigo-600',
      description: 'AI Song Generator, Stem Vault audio player, Musician Matchmaker, and Live Fan Lounge for music creators & producers.',
      query: '?app=music'
    },
    blueprints: {
      id: 'blueprints',
      title: 'App 2: Aether Blueprint Vault',
      badge: 'APP 2 • BLUEPRINTS & CAD',
      icon: FileCode,
      color: 'from-emerald-500 via-teal-600 to-cyan-600',
      description: 'Architectural blueprint catalog, 3D/CAD schematic viewer, spec comparison matrix, and high-res infographic poster downloader.',
      query: '?app=blueprints'
    },
    game: {
      id: 'game',
      title: 'App 3: Aetherius 3D Gaming Realm',
      badge: 'APP 3 • 3D GAMING SUITE',
      icon: Gamepad2,
      color: 'from-amber-500 via-rose-600 to-purple-600',
      description: '3D Gaming Suite featuring 200 Space Warships, Neo-Chroma Metropolis open-world RPG, 3D Hovercraft Racing, Voxel Defense, and Haute Couture Fashion.',
      query: '?app=game'
    },
    studio: {
      id: 'studio',
      title: 'App 4: ToonStudio Comic & Video Maker',
      badge: 'APP 4 • CARTOON & VIDEO MAKER',
      icon: Video,
      color: 'from-purple-500 via-pink-600 to-rose-600',
      description: 'Interactive Multi-panel Comic Strip Creator, 2D/3D Animated Movie Director, AI Storyboard Generator, and Audio SFX Synthesizer.',
      query: '?app=studio'
    },
    typing: {
      id: 'typing',
      title: 'App 5: Type2Earn Information Portal',
      badge: 'APP 5 • TYPE TO EARN CASH',
      icon: Keyboard,
      color: 'from-emerald-500 via-teal-600 to-cyan-600',
      description: 'Real-time information transcription challenges with cash rewards, flexible subscriptions ($2/mo, $44/yr, $100), unlocked vaults, and instant withdrawals.',
      query: '?app=typing'
    },
    ide: {
      id: 'ide',
      title: 'App 6: AI NeuroCode IDE & Quantum Lab',
      badge: 'APP 6 • NEUROCODE IDE',
      icon: Code2,
      color: 'from-cyan-500 via-blue-600 to-indigo-600',
      description: 'Quantum algorithm Q# editor, Python neural agent workspace, WebAssembly Rust execution, and AI refactoring assistant.',
      query: '?app=ide'
    },
    trading: {
      id: 'trading',
      title: 'App 7: AstroTrader 3D Market',
      badge: 'APP 7 • GALACTIC EXCHANGE',
      icon: TrendingUp,
      color: 'from-amber-500 via-orange-600 to-emerald-600',
      description: 'Live simulated inter-stellar stock exchange, order books, sparkline analytics, and net worth portfolio tracker.',
      query: '?app=trading'
    },
    holocad: {
      id: 'holocad',
      title: 'App 8: HoloCad 3D Spatial Studio',
      badge: 'APP 8 • HOLOCAD 3D',
      icon: Ruler,
      color: 'from-teal-500 via-cyan-600 to-blue-600',
      description: 'Futuristic space habitat & starship bridge floor plan designer with 3D object snapping and lighting profiles.',
      query: '?app=holocad'
    },
    biosynth: {
      id: 'biosynth',
      title: 'App 9: BioSynth Alien Genome Lab',
      badge: 'APP 9 • ALIEN GENOME LAB',
      icon: Dna,
      color: 'from-emerald-500 via-teal-600 to-green-600',
      description: 'Alien DNA strand recombination, mutation probability probes, power scoring, and genome research dossiers.',
      query: '?app=biosynth'
    },
    voice: {
      id: 'voice',
      title: 'App 10: CyberVoice AI Podcaster',
      badge: 'APP 10 • CYBERVOICE AI',
      icon: Mic,
      color: 'from-purple-500 via-indigo-600 to-pink-600',
      description: 'Multi-character AI podcaster script builder, sci-fi sound FX soundboard, vocal pitch modulation, and episode player.',
      query: '?app=voice'
    }
  };

  const currentDetail = appDetails[selectedApp];

  const getFullUrl = (query: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}${query}`;
  };

  const handleCopyLink = (appKey: SeparateAppId) => {
    const url = getFullUrl(appDetails[appKey].query);
    navigator.clipboard.writeText(url);
    setCopiedLink(appKey);
    setTimeout(() => setCopiedLink(null), 3000);
  };

  const handleOpenNewTab = (appKey: SeparateAppId) => {
    const url = getFullUrl(appDetails[appKey].query);
    window.open(url, '_blank');
  };

  const handlePWAInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDownloadSuccess('App added to your Home Screen successfully!');
      }
      setDeferredPrompt(null);
    } else {
      setDownloadSuccess('Follow the step-by-step instructions below to add this icon directly to your home screen!');
    }
  };

  const handleDownloadDesktopShortcut = (appKey: SeparateAppId) => {
    const detail = appDetails[appKey];
    const targetUrl = getFullUrl(detail.query);

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${detail.title}</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <style>
    body { background: #020617; color: #38bdf8; font-family: monospace; text-align: center; padding-top: 20%; }
    a { color: #4ade80; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Launching ${detail.title}...</h2>
  <p>If you are not redirected automatically, <a href="${targetUrl}">click here to open ${detail.title}</a>.</p>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Aether_${detail.id}_App.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    setDownloadSuccess(`Downloaded "${detail.title}" Desktop File! Double click anytime to launch directly.`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 shrink-0">
            📲
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
              DIRECT APP LINKS & HOMEPAGE INSTALLER
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">Access The 3 Separate Apps</h2>
            <p className="text-xs text-slate-400 font-sans">Open any of the 3 separate apps directly in a new tab or save to your device home screen.</p>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* App Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['music', 'blueprints', 'game', 'dashboard'] as const).map((key) => {
            const item = appDetails[key];
            const Icon = item.icon;
            const isSelected = selectedApp === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedApp(key)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="text-[9px] font-bold text-cyan-400">{item.badge.split(' • ')[0]}</span>
                </div>
                <span className="text-xs font-bold truncate">{item.title.replace('App 1: ', '').replace('App 2: ', '').replace('App 3: ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Selected App Card Details */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentDetail.color}`} />
                <h3 className="text-sm font-bold text-white">{currentDetail.title}</h3>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">{currentDetail.description}</p>
            </div>
          </div>

          {/* Copy Direct App Link Bar */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct App URL Link</label>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 pl-3">
              <input
                type="text"
                readOnly
                value={getFullUrl(currentDetail.query)}
                className="bg-transparent text-xs text-cyan-300 font-mono w-full focus:outline-none select-all"
              />
              <button
                onClick={() => handleCopyLink(selectedApp)}
                className="px-3 py-1.5 bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copiedLink === selectedApp ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-slate-950" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
              <button
                onClick={() => handleOpenNewTab(selectedApp)}
                className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-500 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                title="Open directly in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open
              </button>
            </div>
          </div>

          {/* Direct Launch / Download Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Primary Action: PWA Add to Home Screen */}
            <button
              onClick={handlePWAInstall}
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Add to Mobile Home Screen</span>
            </button>

            {/* Secondary Action: Download Desktop File */}
            <button
              onClick={() => handleDownloadDesktopShortcut(selectedApp)}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Laptop className="w-4 h-4 text-cyan-400" />
              <span>Download Desktop Launcher (.html)</span>
            </button>
          </div>
        </div>

        {/* All 3 Apps Quick Links Summary List */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" /> Quick Links to All 3 Apps
          </h4>

          <div className="space-y-2 text-xs">
            {/* Music App Row */}
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-pink-500/40">
              <div className="flex items-center gap-2.5">
                <Music className="w-4 h-4 text-pink-400" />
                <div>
                  <span className="font-bold text-white">App 1: Music Lab</span>
                  <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">AI Songs, Audio Player & Stems</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink('music')}
                  className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-cyan-300 hover:text-white cursor-pointer"
                >
                  {copiedLink === 'music' ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => handleOpenNewTab('music')}
                  className="text-[10px] px-2 py-1 bg-pink-600 text-white rounded font-bold hover:bg-pink-500 cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Open
                </button>
              </div>
            </div>

            {/* Blueprints App Row */}
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-emerald-500/40">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="font-bold text-white">App 2: Blueprint Vault</span>
                  <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">Architectural Specs & Comparison</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink('blueprints')}
                  className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-cyan-300 hover:text-white cursor-pointer"
                >
                  {copiedLink === 'blueprints' ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => handleOpenNewTab('blueprints')}
                  className="text-[10px] px-2 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-500 cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Open
                </button>
              </div>
            </div>

            {/* Game App Row */}
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-amber-500/40">
              <div className="flex items-center gap-2.5">
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-bold text-white">App 3: 3D Metaverse Game</span>
                  <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">Starships, GTA CyberCity & Voxel</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink('game')}
                  className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-cyan-300 hover:text-white cursor-pointer"
                >
                  {copiedLink === 'game' ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => handleOpenNewTab('game')}
                  className="text-[10px] px-2 py-1 bg-amber-500 text-slate-950 rounded font-bold hover:bg-amber-400 cursor-pointer flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Open
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-sans border-t border-slate-800/60 pt-4">
          <span>All 3 applications sync state and user credits across your ecosystem.</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:underline font-mono font-bold cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
