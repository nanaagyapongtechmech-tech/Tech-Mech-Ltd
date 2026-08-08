import React, { useState } from 'react';
import { MusicianProfile, JamCollabRequest, InstrumentRole, MusicGenre } from '../types';
import {
  Users,
  Search,
  Filter,
  MapPin,
  Music,
  Clock,
  Sparkles,
  Send,
  Sliders,
  Radio,
  CheckCircle2,
  Briefcase,
  Plus,
  Play
} from 'lucide-react';

interface MusicianMatchmakerProps {
  musicians: MusicianProfile[];
  jamRequests: JamCollabRequest[];
  onSelectMusician: (musicianId: string) => void;
  onApplyJamRequest: (requestTitle: string) => void;
  onOpenNewPost: () => void;
}

export const MusicianMatchmaker: React.FC<MusicianMatchmakerProps> = ({
  musicians,
  jamRequests,
  onSelectMusician,
  onApplyJamRequest,
  onOpenNewPost
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'musicians' | 'jams'>('musicians');
  const [selectedRole, setSelectedRole] = useState<InstrumentRole | 'All'>('All');
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const rolesList: (InstrumentRole | 'All')[] = [
    'All',
    'Lead Vocals',
    'Electric Guitar',
    'Acoustic Guitar',
    'Bass Guitar',
    'Drums & Percussion',
    'Synthesizer & Keys',
    'Saxophone & Brass',
    'Music Producer & DJ'
  ];

  const filteredMusicians = musicians.filter((m) => {
    const matchesRole =
      selectedRole === 'All' ||
      m.primaryRole === selectedRole ||
      m.secondaryRoles.includes(selectedRole as any);
    const matchesGenre = selectedGenre === 'All' || m.genres.includes(selectedGenre as any);
    const matchesSearch =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.gearList.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesGenre && matchesSearch;
  });

  const filteredJams = jamRequests.filter((j) => {
    const matchesRole =
      selectedRole === 'All' || j.requiredRoles.includes(selectedRole as any);
    const matchesGenre = selectedGenre === 'All' || j.genre === selectedGenre;
    const matchesSearch =
      !searchQuery ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesGenre && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-28">
      
      {/* Sub-navigation & Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight font-mono flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" /> MUSICIAN CONNECT & JAM BOARD
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Find bandmates, producers, session musicians & open jam collaboration requests
            </p>
          </div>

          <button
            onClick={onOpenNewPost}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>POST JAM REQUEST</span>
          </button>
        </div>

        {/* Sub-tabs Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('musicians')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'musicians'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            🎸 MUSICIAN DIRECTORY ({filteredMusicians.length})
          </button>

          <button
            onClick={() => setActiveSubTab('jams')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              activeSubTab === 'jams'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            🎙️ JAM COLLAB BOARD ({filteredJams.length})
          </button>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by gear, location, artist..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Instrument Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {rolesList.map((role) => (
              <option key={role} value={role}>
                Role: {role}
              </option>
            ))}
          </select>

          {/* Genre Filter */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">Genre: All Genres</option>
            <option value="Synthwave & Electronic">Synthwave & Electronic</option>
            <option value="Indie & Alternative">Indie & Alternative</option>
            <option value="Jazz Fusion & Soul">Jazz Fusion & Soul</option>
            <option value="Heavy Metal & Rock">Heavy Metal & Rock</option>
            <option value="R&B & Funk">R&B & Funk</option>
            <option value="Lo-Fi & Hip Hop">Lo-Fi & Hip Hop</option>
          </select>

        </div>
      </div>

      {/* SubTab 1: Musician Directory */}
      {activeSubTab === 'musicians' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusicians.map((musician) => (
            <div
              key={musician.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover & Avatar Header */}
                <div className="relative h-28 bg-slate-950">
                  <img
                    src={musician.coverImage}
                    alt={musician.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  
                  <img
                    src={musician.avatar}
                    alt={musician.name}
                    className="absolute bottom-2 left-4 w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl"
                  />

                  <span className="absolute top-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 font-bold">
                    {musician.matchStatus}
                  </span>
                </div>

                {/* Info Body */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3
                        onClick={() => onSelectMusician(musician.id)}
                        className="font-bold text-white text-lg font-mono hover:text-cyan-300 cursor-pointer"
                      >
                        {musician.name}
                      </h3>
                      {musician.verified && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs font-mono text-cyan-400">{musician.handle}</p>
                    <p className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {musician.location}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 font-sans line-clamp-3 leading-relaxed">
                    {musician.bio}
                  </p>

                  {/* Gear Rack */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      PRIMARY GEAR
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {musician.gearList.slice(0, 3).map((gear, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {gear}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400 text-[11px]">
                  {musician.followers.toLocaleString()} Fans
                </span>

                <button
                  onClick={() => onSelectMusician(musician.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>VIEW PROFILE</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* SubTab 2: Jam Collab Requests */}
      {activeSubTab === 'jams' && (
        <div className="space-y-4">
          {filteredJams.map((jam) => (
            <div
              key={jam.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-xl transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                      {jam.genre}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> Deadline: {jam.deadline}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      • {jam.bpm} BPM ({jam.keySignature})
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base font-mono">{jam.title}</h3>
                  
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {jam.description}
                  </p>
                </div>

                {/* Host Info & Apply Button */}
                <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                  <div
                    onClick={() => onSelectMusician(jam.hostMusician.id)}
                    className="flex items-center gap-2 cursor-pointer hover:underline"
                  >
                    <img
                      src={jam.hostMusician.avatar}
                      alt={jam.hostMusician.name}
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400/50"
                    />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      Host: {jam.hostMusician.name}
                    </span>
                  </div>

                  <button
                    onClick={() => onApplyJamRequest(jam.title)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>APPLY / SUBMIT AUDITION</span>
                  </button>
                </div>

              </div>

              {/* Roles Needed Strip */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[10px]">ROLES NEEDED:</span>
                  {jam.requiredRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 bg-slate-950 text-amber-300 border border-amber-800/50 rounded"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <span className="text-slate-400 text-[11px]">
                  {jam.applicantsCount} Applicants
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
