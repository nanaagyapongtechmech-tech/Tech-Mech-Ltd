import React, { useState } from 'react';
import { MusicGenre, InstrumentRole, MusicTrack, MomentPost, JamCollabRequest } from '../types';
import { X, Music, Camera, Users, Upload, Sparkles, Send } from 'lucide-react';

interface NewPostModalProps {
  onClose: () => void;
  onAddTrack: (track: MusicTrack) => void;
  onAddMoment: (moment: MomentPost) => void;
  onAddJamRequest: (jam: JamCollabRequest) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  onClose,
  onAddTrack,
  onAddMoment,
  onAddJamRequest
}) => {
  const [postType, setPostType] = useState<'track' | 'moment' | 'jam'>('track');

  // Track Form State
  const [trackTitle, setTrackTitle] = useState('');
  const [trackGenre, setTrackGenre] = useState<MusicGenre>('Synthwave & Electronic');
  const [trackBpm, setTrackBpm] = useState(120);
  const [trackKey, setTrackKey] = useState('A Minor');
  const [trackCommentary, setTrackCommentary] = useState('');

  // Moment Form State
  const [momentCaption, setMomentCaption] = useState('');
  const [momentLocation, setMomentLocation] = useState('');
  const [momentTags, setMomentTags] = useState('studio, synth, newmusic');

  // Jam Form State
  const [jamTitle, setJamTitle] = useState('');
  const [jamGenre, setJamGenre] = useState<MusicGenre>('Heavy Metal & Rock');
  const [jamRole, setJamRole] = useState<InstrumentRole>('Electric Guitar');
  const [jamDesc, setJamDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postType === 'track') {
      if (!trackTitle.trim()) return;
      const newTrack: MusicTrack = {
        id: `t_${Date.now()}`,
        title: trackTitle,
        artistId: 'm1',
        artistName: 'Maya Vance',
        artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        audioSynthPattern: {
          tempo: trackBpm,
          baseNote: 220,
          synthType: 'sawtooth',
          drumBeat: 'synth'
        },
        durationSeconds: 210,
        genre: trackGenre,
        bpm: trackBpm,
        keySignature: trackKey,
        plays: 1,
        likes: 0,
        reposts: 0,
        hasStems: true,
        stems: [
          { id: `s1_${Date.now()}`, name: 'Lead Synth', type: 'synth', color: '#06b6d4', volume: 1, muted: false, solo: false },
          { id: `s2_${Date.now()}`, name: 'Kick & Drums', type: 'drums', color: '#f43f5e', volume: 1, muted: false, solo: false },
          { id: `s3_${Date.now()}`, name: 'Bass Line', type: 'bass', color: '#a855f7', volume: 1, muted: false, solo: false }
        ],
        commentary: trackCommentary || 'Brand new release uploaded to SoundPulse Network!',
        releasedAt: 'Just now',
        tags: ['newrelease', trackGenre.toLowerCase().replace(/[^a-z]/g, '')]
      };
      onAddTrack(newTrack);
    } else if (postType === 'moment') {
      if (!momentCaption.trim()) return;
      const newMoment: MomentPost = {
        id: `p_${Date.now()}`,
        artistId: 'm1',
        artistName: 'Maya Vance',
        artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        artistRole: 'Synthesizer & Keys',
        mediaType: 'photo',
        mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
        caption: momentCaption,
        location: momentLocation || 'Studio Session',
        timestamp: 'Just now',
        likes: 1,
        comments: [],
        tags: momentTags.split(',').map((t) => t.trim())
      };
      onAddMoment(newMoment);
    } else if (postType === 'jam') {
      if (!jamTitle.trim()) return;
      const newJam: JamCollabRequest = {
        id: `j_${Date.now()}`,
        title: jamTitle,
        hostMusician: {
          id: 'm1',
          name: 'Maya Vance',
          handle: '@mayavance_synth',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          coverImage: '',
          primaryRole: 'Synthesizer & Keys',
          secondaryRoles: [],
          genres: [jamGenre],
          location: 'Berlin',
          bio: '',
          matchStatus: 'Open for Collabs',
          followers: 48200,
          fanSubscribers: 3120,
          gearList: [],
          socialLinks: {},
          verified: true
        },
        requiredRoles: [jamRole],
        genre: jamGenre,
        bpm: 120,
        keySignature: 'C Minor',
        description: jamDesc || 'Looking for collaborators on a new song project.',
        deadline: 'In 1 week',
        applicantsCount: 0,
        status: 'Open'
      };
      onAddJamRequest(newJam);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl p-6 max-w-xl w-full space-y-6 font-mono shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" /> CREATE NEW POST
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setPostType('track')}
            className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              postType === 'track'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>MUSIC TRACK</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('moment')}
            className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              postType === 'moment'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>MOMENT</span>
          </button>

          <button
            type="button"
            onClick={() => setPostType('jam')}
            className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
              postType === 'jam'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>JAM COLLAB</span>
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {postType === 'track' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">TRACK TITLE</label>
                <input
                  type="text"
                  required
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="e.g., Midnight Odyssey"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">GENRE</label>
                  <select
                    value={trackGenre}
                    onChange={(e) => setTrackGenre(e.target.value as any)}
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

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">BPM ({trackBpm})</label>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    value={trackBpm}
                    onChange={(e) => setTrackBpm(parseInt(e.target.value))}
                    className="w-full bg-slate-950 accent-cyan-400 cursor-pointer py-2"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">STUDIO NOTES / COMMENTARY</label>
                <textarea
                  rows={3}
                  value={trackCommentary}
                  onChange={(e) => setTrackCommentary(e.target.value)}
                  placeholder="Gear used, recording stories, inspiration..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </>
          )}

          {postType === 'moment' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">CAPTION</label>
                <textarea
                  rows={3}
                  required
                  value={momentCaption}
                  onChange={(e) => setMomentCaption(e.target.value)}
                  placeholder="What's happening behind the scenes?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">LOCATION</label>
                  <input
                    type="text"
                    value={momentLocation}
                    onChange={(e) => setMomentLocation(e.target.value)}
                    placeholder="e.g., Abbey Road Studio B"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">TAGS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={momentTags}
                    onChange={(e) => setMomentTags(e.target.value)}
                    placeholder="studio, gear, live"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </>
          )}

          {postType === 'jam' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">JAM TITLE</label>
                <input
                  type="text"
                  required
                  value={jamTitle}
                  onChange={(e) => setJamTitle(e.target.value)}
                  placeholder="e.g., Progressive Metal Track - Need Vocalist"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">GENRE</label>
                  <select
                    value={jamGenre}
                    onChange={(e) => setJamGenre(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Heavy Metal & Rock">Heavy Metal & Rock</option>
                    <option value="Synthwave & Electronic">Synthwave & Electronic</option>
                    <option value="Jazz Fusion & Soul">Jazz Fusion & Soul</option>
                    <option value="R&B & Funk">R&B & Funk</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">ROLE NEEDED</label>
                  <select
                    value={jamRole}
                    onChange={(e) => setJamRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Lead Vocals">Lead Vocals</option>
                    <option value="Electric Guitar">Electric Guitar</option>
                    <option value="Bass Guitar">Bass Guitar</option>
                    <option value="Drums & Percussion">Drums & Percussion</option>
                    <option value="Synthesizer & Keys">Synthesizer & Keys</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">PROJECT DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={jamDesc}
                  onChange={(e) => setJamDesc(e.target.value)}
                  placeholder="Describe your song concept, deadlines, stems provided..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
            >
              PUBLISH POST
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
