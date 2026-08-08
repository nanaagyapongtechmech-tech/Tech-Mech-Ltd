import React, { useState } from 'react';
import { MusicTrack, MusicGenre, MusicianProfile } from '../types';
import {
  Play,
  Pause,
  Sliders,
  Heart,
  Repeat,
  Share2,
  FileText,
  Disc,
  Flame,
  Radio,
  Tag,
  MessageSquare,
  Sparkles,
  Users
} from 'lucide-react';

interface DiscoverFeedProps {
  tracks: MusicTrack[];
  musicians: MusicianProfile[];
  currentTrackId: string | null;
  isPlaying: boolean;
  onPlayTrack: (track: MusicTrack) => void;
  onOpenStemVaultForTrack: (track: MusicTrack) => void;
  onSelectMusician: (musicianId: string) => void;
  searchQuery: string;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  tracks,
  musicians,
  currentTrackId,
  isPlaying,
  onPlayTrack,
  onOpenStemVaultForTrack,
  onSelectMusician,
  searchQuery
}) => {
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | 'All'>('All');
  const [expandedCommentaryTrackId, setExpandedCommentaryTrackId] = useState<string | null>(null);

  const genresList: (MusicGenre | 'All')[] = [
    'All',
    'Synthwave & Electronic',
    'Indie & Alternative',
    'Jazz Fusion & Soul',
    'Heavy Metal & Rock',
    'Acoustic & Folk',
    'Lo-Fi & Hip Hop',
    'R&B & Funk'
  ];

  const filteredTracks = tracks.filter((t) => {
    const matchesGenre = selectedGenre === 'All' || t.genre === selectedGenre;
    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-28">
      
      {/* Featured Musician Spotlight & Network Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900/90 shadow-[0_0_40px_rgba(6,182,212,0.15)] p-6 md:p-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            SPOTLIGHT TRACK RELEASE
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
            NEON HORIZON <span className="text-cyan-400">(MIDNIGHT DRIFT)</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            By <strong className="text-cyan-300 font-mono">Maya Vance</strong> • Multi-Stem Synthwave Release.
            Listen to raw analog Moog oscillators, 808 gated drums, and download individual stems for remixing!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => onPlayTrack(tracks[0])}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
            >
              {currentTrackId === tracks[0]?.id && isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" /> PAUSE NOW
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" /> LISTEN TO SPOTLIGHT
                </>
              )}
            </button>

            <button
              onClick={() => onOpenStemVaultForTrack(tracks[0])}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-950 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>OPEN STEM MIXER</span>
            </button>
          </div>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-slate-400">
          <span className="font-bold text-white flex items-center gap-2">
            <Disc className="w-4 h-4 text-cyan-400" /> BROWSE BY GENRE & SOUND
          </span>
          <span>{filteredTracks.length} TRACKS AVAILABLE</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {genresList.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer border ${
                selectedGenre === genre
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Music Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredTracks.map((track) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          const isCommentaryOpen = expandedCommentaryTrackId === track.id;

          return (
            <div
              key={track.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Track Top Row: Cover Art, Title & Play Button */}
                <div className="flex gap-4">
                  
                  {/* Cover Art Image */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-slate-700 shadow-md bg-slate-950">
                    <img
                      src={track.coverArt}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => onPlayTrack(track)}
                      className={`absolute inset-0 m-auto w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                        isThisPlaying
                          ? 'bg-cyan-400 text-slate-950 scale-100 shadow-[0_0_20px_rgba(6,182,212,0.8)]'
                          : 'bg-slate-950/80 text-white hover:scale-110 border border-cyan-400/50'
                      }`}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-5 h-5 fill-slate-950" />
                      ) : (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                        {track.genre}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {track.releasedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-300 transition-colors">
                      {track.title}
                    </h3>

                    {/* Artist Profile Trigger */}
                    <div
                      onClick={() => onSelectMusician(track.artistId)}
                      className="flex items-center gap-2 mt-1.5 cursor-pointer hover:underline text-xs font-mono text-slate-300"
                    >
                      <img
                        src={track.artistAvatar}
                        alt={track.artistName}
                        className="w-5 h-5 rounded-full object-cover border border-cyan-400/50"
                      />
                      <span>{track.artistName}</span>
                    </div>

                    {/* Stats & Key/BPM */}
                    <div className="flex items-center gap-3 mt-3 font-mono text-[11px] text-slate-400">
                      <span className="text-cyan-400 font-bold">{track.bpm} BPM</span>
                      <span>•</span>
                      <span>{track.keySignature}</span>
                      <span>•</span>
                      <span>{Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>

                {/* Tags Strip */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {track.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Commentary Dropdown Box */}
                {isCommentaryOpen && (
                  <div className="mt-3 p-3 bg-slate-950 border border-cyan-500/30 rounded-xl text-xs font-mono text-slate-300 space-y-2 animate-in fade-in duration-200">
                    <div className="text-cyan-400 font-bold text-[10px]">ARTIST COMMENTARY & GEAR NOTES</div>
                    <p className="leading-relaxed">{track.commentary}</p>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Play className="w-3.5 h-3.5 text-cyan-400" />
                    {track.plays.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    {track.likes.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedCommentaryTrackId(isCommentaryOpen ? null : track.id)}
                    className="p-1.5 rounded-lg bg-slate-950 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                    title="Read Studio Notes"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  {track.hasStems && (
                    <button
                      onClick={() => onOpenStemVaultForTrack(track)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 font-bold transition-all cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>STEMS ({track.stems.length})</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
