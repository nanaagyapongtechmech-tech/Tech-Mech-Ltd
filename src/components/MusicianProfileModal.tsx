import React from 'react';
import { MusicianProfile, MusicTrack, MomentPost } from '../types';
import { X, MapPin, CheckCircle2, Play, Send, Sliders, Music, Camera, Sparkles } from 'lucide-react';

interface MusicianProfileModalProps {
  musician: MusicianProfile;
  tracks: MusicTrack[];
  moments: MomentPost[];
  onClose: () => void;
  onPlayTrack: (track: MusicTrack) => void;
  onInviteToJam: (musicianName: string) => void;
}

export const MusicianProfileModal: React.FC<MusicianProfileModalProps> = ({
  musician,
  tracks,
  moments,
  onClose,
  onPlayTrack,
  onInviteToJam
}) => {
  const musicianTracks = tracks.filter((t) => t.artistId === musician.id);
  const musicianMoments = moments.filter((m) => m.artistId === musician.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto font-mono shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Cover Header */}
        <div className="relative h-36 bg-slate-950">
          <img
            src={musician.coverImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'}
            alt={musician.name}
            className="w-full h-full object-cover opacity-60"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-950/80 rounded-full text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={musician.avatar}
            alt={musician.name}
            className="absolute -bottom-8 left-6 w-20 h-20 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
          />
        </div>

        {/* Profile Details */}
        <div className="pt-10 p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-xl">{musician.name}</h2>
                {musician.verified && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
              </div>
              <p className="text-xs text-cyan-400 font-mono">{musician.handle}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {musician.location} • {musician.primaryRole}
              </p>
            </div>

            <button
              onClick={() => onInviteToJam(musician.name)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>INVITE TO JAM</span>
            </button>
          </div>

          {/* Bio */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
            {musician.bio}
          </div>

          {/* Gear List */}
          <div className="space-y-2">
            <span className="text-cyan-400 font-bold text-xs uppercase">STUDIO GEAR RACK</span>
            <div className="flex flex-wrap gap-2">
              {musician.gearList.map((gear, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-xl bg-slate-950 text-slate-300 border border-slate-800"
                >
                  🎸 {gear}
                </span>
              ))}
            </div>
          </div>

          {/* Discography */}
          <div className="space-y-3">
            <span className="text-cyan-400 font-bold text-xs uppercase flex items-center gap-2">
              <Music className="w-4 h-4" /> TRACK DISCOGRAPHY ({musicianTracks.length})
            </span>

            {musicianTracks.map((track) => (
              <div
                key={track.id}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white">{track.title}</h4>
                    <p className="text-[10px] text-slate-400">{track.genre} • {track.bpm} BPM</p>
                  </div>
                </div>

                <button
                  onClick={() => onPlayTrack(track)}
                  className="p-2 bg-cyan-500 text-slate-950 rounded-lg font-bold hover:bg-cyan-400 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
