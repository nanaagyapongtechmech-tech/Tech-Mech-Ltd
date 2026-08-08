import React, { useState, useEffect } from 'react';
import { WalletState, UserAccount } from '../types';
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
  Grid,
  DollarSign,
  Download,
  Layers,
  Sparkles,
  Sliders,
  Users,
  Radio,
  BookOpen,
  ArrowRightLeft,
  Shirt,
  Box,
  ShoppingBag,
  ExternalLink,
  Share2,
  User,
  ArrowUpRight,
  Lock,
  Atom
} from 'lucide-react';

export type MainAppId = 'everything-lab' | 'music' | 'blueprints' | 'game' | 'studio' | 'typing' | 'ide' | 'trading' | 'holocad' | 'biosynth' | 'voice' | 'minimalist' | 'premium' | 'dashboard';

export type MusicTab = 'song_lab' | 'player' | 'stems' | 'matchmaker' | 'lounge';
export type BlueprintTab = 'vault' | 'comparison' | 'catalog' | 'poster';
export type GameTab = 'space' | 'cybercity' | 'racing' | 'defense' | 'avatar' | 'voxel' | 'market';

interface HeaderNavProps {
  activeApp: MainAppId;
  setActiveApp: (appId: MainAppId) => void;
  
  musicTab: MusicTab;
  setMusicTab: (tab: MusicTab) => void;

  blueprintTab: BlueprintTab;
  setBlueprintTab: (tab: BlueprintTab) => void;

  gameTab: GameTab;
  setGameTab: (tab: GameTab) => void;

  wallet: WalletState;
  onOpenCashoutModal: () => void;
  onOpenDownloadModal: (appId?: MainAppId) => void;

  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeApp,
  setActiveApp,
  musicTab,
  setMusicTab,
  blueprintTab,
  setBlueprintTab,
  gameTab,
  setGameTab,
  wallet,
  onOpenCashoutModal,
  onOpenDownloadModal,
  currentUser,
  onOpenAuthModal
}) => {

  const [liveUrl, setLiveUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLiveUrl(window.location.href);
    }
  }, []);

  const mainApps = [
    { id: 'dashboard' as MainAppId, label: '📱 MASTER SUITE HUB', icon: Layers, color: 'text-amber-400' },
    { id: 'everything-lab' as MainAppId, label: '🔬 THE EVERYTHING LAB', icon: Atom, color: 'text-cyan-400' },
    { id: 'music' as MainAppId, label: '🎵 App 1: Music Lab', icon: Music, color: 'text-pink-400' },
    { id: 'blueprints' as MainAppId, label: '📐 App 2: Blueprint Vault', icon: FileCode, color: 'text-emerald-400' },
    { id: 'game' as MainAppId, label: '🎮 App 3: 3D Gaming Realm', icon: Gamepad2, color: 'text-amber-400' },
    { id: 'studio' as MainAppId, label: '🎬 App 4: ToonStudio', icon: Video, color: 'text-purple-400' },
    { id: 'typing' as MainAppId, label: '⌨️ App 5: Type2Earn Info', icon: Keyboard, color: 'text-teal-400' },
    { id: 'ide' as MainAppId, label: '💻 App 6: NeuroCode IDE', icon: Code2, color: 'text-blue-400' },
    { id: 'trading' as MainAppId, label: '📈 App 7: AstroTrader 3D', icon: TrendingUp, color: 'text-amber-400' },
    { id: 'holocad' as MainAppId, label: '🏛️ App 8: HoloCad 3D', icon: Ruler, color: 'text-teal-400' },
    { id: 'biosynth' as MainAppId, label: '🧬 App 9: BioSynth Genome', icon: Dna, color: 'text-emerald-400' },
    { id: 'voice' as MainAppId, label: '🎙️ App 10: CyberVoice AI', icon: Mic, color: 'text-purple-400' },
    { id: 'minimalist' as MainAppId, label: '✨ Apps 11-30: Minimal & Abstract (20 Apps)', icon: Sparkles, color: 'text-cyan-300' },
    { id: 'premium' as MainAppId, label: '🔒 Apps 31-40: Exquisite Banking & VIP (10 Apps)', icon: Lock, color: 'text-amber-400' }
  ];

  const musicTabs = [
    { id: 'song_lab' as MusicTab, label: '🎵 AI Song Lab', icon: Sparkles },
    { id: 'player' as MusicTab, label: '🎧 Track Player', icon: Music },
    { id: 'stems' as MusicTab, label: '🎚️ Stem Vault', icon: Sliders },
    { id: 'matchmaker' as MusicTab, label: '🤝 Musician Match', icon: Users },
    { id: 'lounge' as MusicTab, label: '💬 Fan Lounge', icon: Radio }
  ];

  const blueprintTabs = [
    { id: 'vault' as BlueprintTab, label: '📑 Saved Vault', icon: FileCode },
    { id: 'comparison' as BlueprintTab, label: '📐 Specs Matrix', icon: ArrowRightLeft },
    { id: 'catalog' as BlueprintTab, label: '📁 Full Catalog', icon: BookOpen },
    { id: 'poster' as BlueprintTab, label: '🖼️ Poster Studio', icon: Download }
  ];

  const gameTabs = [
    { id: 'space' as GameTab, label: '🚀 Aetherius Voidfleet & Orbitals', icon: Gamepad2 },
    { id: 'cybercity' as GameTab, label: '🏙️ Neo-Chroma Metropolis (Open World)', icon: Gamepad2 },
    { id: 'racing' as GameTab, label: '🏎️ Hyper-Neon Overdrive 3D', icon: Gamepad2 },
    { id: 'defense' as GameTab, label: '🧱 Voxel Vanguard Alien Defense', icon: Box },
    { id: 'avatar' as GameTab, label: '👗 Chroma Haute Couture Fashion', icon: Shirt },
    { id: 'voxel' as GameTab, label: '🧱 Aether Voxel Architect', icon: Box },
    { id: 'market' as GameTab, label: '📊 Galactic Star-Bazaar', icon: ShoppingBag }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-2">
        
        {/* Top Row: App Title + Main 3 Apps Switcher + Wallet */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Title with Live Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveApp('dashboard')}
              className="flex items-center gap-3 text-left cursor-pointer group"
              title="Click to go to Master Suite Dashboard"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                🌌
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-950"></span>
                </span>
              </div>
              <div>
                <h1 className="font-extrabold text-white text-base tracking-tight flex items-center gap-2">
                  AETHER SUITE
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-normal">
                    40 STANDALONE APPS
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400 font-sans">
                  {activeApp === 'everything-lab' && 'Unified AI Digital Lab: Idea → Theory → Math → Simulation → Codex'}
                  {activeApp === 'music' && 'App 1: AI Music Creator & Audio Stems Vault'}
                  {activeApp === 'blueprints' && 'App 2: Engineering Blueprint Vault & Specs'}
                  {activeApp === 'game' && 'App 3: Aetherius 3D Open World & Starships'}
                  {activeApp === 'studio' && 'App 4: ToonStudio - Cartoon, Comic & Video Maker'}
                  {activeApp === 'typing' && 'App 5: Type2Earn Info Portal & Subscriptions'}
                  {activeApp === 'ide' && 'App 6: AI NeuroCode IDE & Quantum Algorithmic Workspace'}
                  {activeApp === 'trading' && 'App 7: AstroTrader 3D - Galactic Exchange & Asset Market'}
                  {activeApp === 'holocad' && 'App 8: HoloCad 3D - Interior Spatial & Architectural Studio'}
                  {activeApp === 'biosynth' && 'App 9: BioSynth - Alien Genome Lab & DNA Sequencer'}
                  {activeApp === 'voice' && 'App 10: CyberVoice AI - Podcaster & Voice Morph Studio'}
                  {activeApp === 'minimalist' && 'Apps 11-30: 20 Minimalistic & Abstract Creative Experiences'}
                  {activeApp === 'premium' && 'Apps 31-40: 10 VIP Premium Apps & Exquisite Vault Banking'}
                  {activeApp === 'dashboard' && 'Master Suite linking 40 distinct standalone applications'}
                </p>
              </div>
            </button>

            {/* Live Web URL Direct Link Badge */}
            <a
              href={liveUrl || '#'}
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined') {
                  window.open(window.location.href, '_blank');
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold hover:bg-emerald-900 transition-all cursor-pointer shadow-md"
              title="Open Live Application URL in new tab"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE LINK 🔗</span>
            </a>
          </div>

          {/* 3 Separate Apps Navigation Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-2xl overflow-x-auto max-w-full">
            {mainApps.map((a) => {
              const Icon = a.icon;
              const isSelected = activeApp === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveApp(a.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : a.color}`} />
                  <span className="hidden sm:inline">{a.label}</span>
                  <span className="sm:hidden">{a.label.split(':')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Action Widgets: Direct App Links + Wallet + User Auth */}
          <div className="flex items-center gap-2">
            
            {/* Get App Links Modal Button */}
            <button
              onClick={() => onOpenDownloadModal(activeApp)}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-bold transition-all cursor-pointer shadow-lg hover:scale-105"
              title="Get Direct Share Links for the 3 Apps"
            >
              <Share2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">App Links</span>
            </button>

            {/* Real Money Wallet Widget */}
            <button
              onClick={onOpenCashoutModal}
              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/40 hover:border-emerald-400 text-white transition-all cursor-pointer shadow-lg group"
              title="Open Real Money Cashout & Wallet Bank"
            >
              <div className="w-6 h-6 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <DollarSign className="w-3.5 h-3.5" />
              </div>

              <div className="text-left font-mono">
                <div className="text-xs font-bold text-emerald-400">
                  {wallet.aethCredits.toLocaleString()} AETH
                </div>
                <div className="text-[10px] text-slate-400 hidden sm:block">
                  ≈ ${(wallet.aethCredits * wallet.exchangeRateUSDPerAeth).toFixed(2)} USD
                </div>
              </div>
            </button>

            {/* Direct Cash Out Button */}
            <button
              onClick={onOpenCashoutModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Cash Out</span>
            </button>

            {/* User Account / Auth Modal Button */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                currentUser && currentUser.isLoggedIn
                  ? 'bg-slate-900 border-cyan-500/50 hover:border-cyan-400 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black'
              }`}
              title={currentUser?.isLoggedIn ? `Account: ${currentUser.name}` : 'Sign Up or Log In'}
            >
              {currentUser && currentUser.isLoggedIn ? (
                <>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-cyan-400"
                  />
                  <span className="text-xs font-bold hidden xl:inline max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold">Sign In / Register</span>
                </>
              )}
            </button>

          </div>


        </div>

        {/* Sub-Navigation for active separate app */}
        {activeApp === 'music' && (
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1 border-t border-slate-800/60 pt-2">
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider shrink-0 mr-1">
              🎵 MUSIC APP NAV:
            </span>
            {musicTabs.map((t) => {
              const Icon = t.icon;
              const isActive = musicTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setMusicTab(t.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-pink-500/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {activeApp === 'blueprints' && (
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1 border-t border-slate-800/60 pt-2">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider shrink-0 mr-1">
              📐 BLUEPRINT APP NAV:
            </span>
            {blueprintTabs.map((t) => {
              const Icon = t.icon;
              const isActive = blueprintTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setBlueprintTab(t.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {activeApp === 'game' && (
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1 border-t border-slate-800/60 pt-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider shrink-0 mr-1">
              🎮 3D GAME APP NAV:
            </span>
            {gameTabs.map((t) => {
              const Icon = t.icon;
              const isActive = gameTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setGameTab(t.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        )}

      </div>
    </header>
  );
};
