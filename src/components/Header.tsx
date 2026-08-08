import React from 'react';
import {
  Radio,
  Sparkles,
  Search,
  Music,
  Camera,
  Users,
  Sliders,
  Tv,
  PlusCircle,
  Bell,
  Disc,
  Mic2
} from 'lucide-react';

export type NavTab = 'discover' | 'moments' | 'matchmaker' | 'stems' | 'live_lounge' | 'ai_songlab';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNewPost: () => void;
  unreadNotifications: number;
  isPlaying: boolean;
  currentTrackTitle?: string;
  currentArtistName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenNewPost,
  unreadNotifications,
  isPlaying,
  currentTrackTitle,
  currentArtistName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Banner / Identity Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={() => setActiveTab('discover')}>
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center bg-slate-900">
            <img src="/app_icon.jpg" alt="SoundPulse App Logo" className="w-full h-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 to-transparent" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-wider font-mono uppercase bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                SOUNDPULSE
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                LIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 truncate hidden sm:block">
              Musician Network & Fan Lounge
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search musicians, instruments, tracks, or stems..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Now Playing Mini Indicator */}
          {isPlaying && currentTrackTitle && (
            <div
              onClick={() => setActiveTab('discover')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-cyan-950/80 border border-cyan-500/40 rounded-xl cursor-pointer hover:border-cyan-400 transition-all text-xs font-mono"
            >
              <Disc className="w-4 h-4 text-cyan-400 animate-spin" />
              <div className="truncate max-w-[140px]">
                <p className="text-cyan-300 font-bold truncate">{currentTrackTitle}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentArtistName}</p>
              </div>
            </div>
          )}

          {/* New Post Button */}
          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold font-mono text-xs rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">CREATE</span>
          </button>

          {/* Notifications Icon */}
          <button className="relative p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center font-mono animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* User Profile Avatar Pill */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="User Avatar"
              className="w-7 h-7 rounded-lg object-cover border border-cyan-400/50"
            />
            <span className="font-bold text-white hidden xl:inline">Maya Vance</span>
            <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800 hidden xl:inline">
              PRO
            </span>
          </div>

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/95 border-t border-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>DISCOVER TRACKS</span>
          </button>

          <button
            onClick={() => setActiveTab('moments')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'moments'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>BACKSTAGE MOMENTS</span>
          </button>

          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'matchmaker'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>MUSICIAN MATCH & JAMS</span>
          </button>

          <button
            onClick={() => setActiveTab('stems')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'stems'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>STEM VAULT</span>
          </button>

          <button
            onClick={() => setActiveTab('live_lounge')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'live_lounge'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>FAN LOUNGE & STAGE</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_songlab')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ai_songlab'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI SONG LAB</span>
          </button>

        </div>
      </div>
    </header>
  );
};
