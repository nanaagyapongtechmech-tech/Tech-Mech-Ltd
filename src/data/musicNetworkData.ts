import { MusicianProfile, MusicTrack, MomentPost, JamCollabRequest, LiveChatMessage } from '../types';

export const INITIAL_MUSICIANS: MusicianProfile[] = [
  {
    id: 'm1',
    name: 'Maya Vance',
    handle: '@mayavance_synth',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Synthesizer & Keys',
    secondaryRoles: ['Music Producer & DJ', 'Lead Vocals'],
    genres: ['Synthwave & Electronic', 'Cinematic & Ambient', 'Lo-Fi & Hip Hop'],
    location: 'Berlin, Germany',
    bio: 'Analog synth lover, modular sound designer, and touring electronic producer. Building lush 80s soundscapes and cinematic sound tracks.',
    matchStatus: 'Open for Collabs',
    followers: 48200,
    fanSubscribers: 3120,
    gearList: ['Moog Subsequent 37', 'Roland Juno-106', 'Sequential Prophet-6', 'Ableton Push 3'],
    socialLinks: {
      spotify: 'https://spotify.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com'
    },
    verified: true
  },
  {
    id: 'm2',
    name: 'Julian "Jax" Thorne',
    handle: '@jax_leadguitar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Electric Guitar',
    secondaryRoles: ['Acoustic Guitar', 'Audio Engineer'],
    genres: ['Heavy Metal & Rock', 'Indie & Alternative', 'Jazz Fusion & Soul'],
    location: 'Austin, TX, USA',
    bio: 'Guitar soloist, riff architect, and tube amp enthusiast. Shredding high-gain leads and blues grooves. Looking to build a progressive rock powerhouse band.',
    matchStatus: 'Looking for Band',
    followers: 32100,
    fanSubscribers: 1850,
    gearList: ['PRS Custom 24', 'Fender Custom Shop Strat', 'Kemper Profiler Stage', 'Mesa Boogie Dual Rectifier'],
    socialLinks: {
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com'
    },
    verified: true
  },
  {
    id: 'm3',
    name: 'Aria Chen',
    handle: '@ariachen_vocals',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Lead Vocals',
    secondaryRoles: ['Acoustic Guitar', 'Synthesizer & Keys'],
    genres: ['R&B & Funk', 'Indie & Alternative', 'Acoustic & Folk'],
    location: 'London, UK',
    bio: 'Alt-R&B vocalist & lyricist with a 4-octave range. Writing heartfelt melodies, vocal harmonies, and chill nocturnal ballads.',
    matchStatus: 'Open for Collabs',
    followers: 67400,
    fanSubscribers: 5400,
    gearList: ['Neumann U87 Ai', 'Universal Audio Apollo Twin X', 'Shure KSM9', 'TC-Helicon Voicelive 3'],
    socialLinks: {
      spotify: 'https://spotify.com',
      instagram: 'https://instagram.com',
      soundcloud: 'https://soundcloud.com'
    },
    verified: true
  },
  {
    id: 'm4',
    name: 'Marcus "Groove" Miller',
    handle: '@marcus_percussion',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Drums & Percussion',
    secondaryRoles: ['Music Producer & DJ'],
    genres: ['Jazz Fusion & Soul', 'R&B & Funk', 'Lo-Fi & Hip Hop'],
    location: 'Chicago, IL, USA',
    bio: 'Session drummer & pocket master. Tight snare rolls, syncopated funk breaks, and hybrid acoustic-electronic beat making.',
    matchStatus: 'Producer for Hire',
    followers: 28900,
    fanSubscribers: 1200,
    gearList: ['DW Collector Series Birch Kit', 'Zildjian K Custom Cymbals', 'Roland SPD-SX Pro'],
    socialLinks: {
      instagram: 'https://instagram.com'
    },
    verified: false
  },
  {
    id: 'm5',
    name: 'Sora Takahashi',
    handle: '@sora_lowend',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1200&q=80',
    primaryRole: 'Bass Guitar',
    secondaryRoles: ['Audio Engineer'],
    genres: ['Synthwave & Electronic', 'Heavy Metal & Rock', 'Jazz Fusion & Soul'],
    location: 'Tokyo, Japan',
    bio: 'Slap bass virtuoso and synth-bass designer. Bridging Japan city-pop grooves with modern synthwave drive.',
    matchStatus: 'Jamming Casual',
    followers: 19500,
    fanSubscribers: 890,
    gearList: ['Music Man StingRay 5', 'Darkglass Microtubes 900', 'Moog Minitaur'],
    socialLinks: {
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com'
    },
    verified: true
  }
];

export const INITIAL_TRACKS: MusicTrack[] = [
  {
    id: 't1',
    title: 'Neon Horizon (Midnight Drift)',
    artistId: 'm1',
    artistName: 'Maya Vance',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    audioSynthPattern: {
      tempo: 124,
      baseNote: 220,
      synthType: 'sawtooth',
      drumBeat: 'synth'
    },
    durationSeconds: 218,
    genre: 'Synthwave & Electronic',
    bpm: 124,
    keySignature: 'F# Minor',
    plays: 142800,
    likes: 18450,
    reposts: 2310,
    hasStems: true,
    stems: [
      { id: 's1', name: 'Lead Synth Arp', type: 'synth', color: '#06b6d4', volume: 1, muted: false, solo: false },
      { id: 's2', name: 'Analog Bassline', type: 'bass', color: '#a855f7', volume: 1, muted: false, solo: false },
      { id: 's3', name: '808 Gated Drums', type: 'drums', color: '#f43f5e', volume: 1, muted: false, solo: false },
      { id: 's4', name: 'Atmospheric Vocals', type: 'vocals', color: '#10b981', volume: 0.9, muted: false, solo: false }
    ],
    lyrics: `[Intro - Analog Pad Fade]
Midnight neon burning through the rain
Washing out the static and the pain
Speeding down the highway of the grid
Chasing memories of what we did

[Chorus]
Take me to the neon horizon
Where the analog dreams keep rising
Hold the signal, don't let it fade
In the digital twilight we made...`,
    commentary: 'Recorded live with my Moog Subsequent 37 and Juno-106. The drums were gated through an empirical labs distressor for that punchy 1984 reverb bounce.',
    releasedAt: '2 hours ago',
    tags: ['synthwave', 'retrowave', 'analog', 'moog', 'stems-included']
  },
  {
    id: 't2',
    title: 'Titanium Solitude',
    artistId: 'm2',
    artistName: 'Julian "Jax" Thorne',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    audioSynthPattern: {
      tempo: 140,
      baseNote: 196,
      synthType: 'square',
      drumBeat: 'rock'
    },
    durationSeconds: 265,
    genre: 'Heavy Metal & Rock',
    bpm: 140,
    keySignature: 'D Minor',
    plays: 98400,
    likes: 12300,
    reposts: 1840,
    hasStems: true,
    stems: [
      { id: 's5', name: 'Lead Guitar Riff', type: 'guitar', color: '#eab308', volume: 1, muted: false, solo: false },
      { id: 's6', name: 'Rhythm Crunch', type: 'guitar', color: '#f97316', volume: 0.9, muted: false, solo: false },
      { id: 's7', name: 'Thunder Drums', type: 'drums', color: '#ef4444', volume: 1, muted: false, solo: false },
      { id: 's8', name: 'Distorted Bass', type: 'bass', color: '#8b5cf6', volume: 1, muted: false, solo: false }
    ],
    lyrics: `[Guitar Solo - Sweep Picking]
[Verse 1]
Cold steel under open sky
Standing on the edge where eagles fly
Feel the engine roar inside my chest
No surrender, no time to rest!

[Chorus]
Titanium solitude, unbreakable chain
Forged in fire, standing through the rain!`,
    commentary: 'Recorded the solo using my PRS Custom 24 cranked through a Mesa Boogie Dual Rectifier. Download the stem to try your own lead or drum remix!',
    releasedAt: '1 day ago',
    tags: ['progrock', 'guitarsolo', 'shred', 'stems-available']
  },
  {
    id: 't3',
    title: 'Velvet Rain & Coffee Cups',
    artistId: 'm3',
    artistName: 'Aria Chen',
    artistAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverArt: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    audioSynthPattern: {
      tempo: 85,
      baseNote: 261.63,
      synthType: 'sine',
      drumBeat: 'lofi'
    },
    durationSeconds: 192,
    genre: 'R&B & Funk',
    bpm: 85,
    keySignature: 'Bb Major',
    plays: 215000,
    likes: 34100,
    reposts: 5120,
    hasStems: true,
    stems: [
      { id: 's9', name: 'Silk Lead Vocals', type: 'vocals', color: '#ec4899', volume: 1, muted: false, solo: false },
      { id: 's10', name: 'Rhodes Electric Piano', type: 'synth', color: '#3b82f6', volume: 1, muted: false, solo: false },
      { id: 's11', name: 'Chill Vinyl Beats', type: 'drums', color: '#10b981', volume: 0.85, muted: false, solo: false },
      { id: 's12', name: 'Groove Bass', type: 'bass', color: '#6366f1', volume: 1, muted: false, solo: false }
    ],
    lyrics: `[Soft Rhodes Intro]
Raindrops tapping on the window glass
Watching shadows of the hours pass
Warm mug resting in my hand
Songs we sang that no one understands

[Chorus]
Velvet rain falling soft and slow
Whisper secrets only lovers know...`,
    commentary: 'Vocal chain: Neumann U87 through UA 610 tube preamp. Added subtle vinyl crackle and a vintage Fender Rhodes sample.',
    releasedAt: '3 days ago',
    tags: ['rnb', 'lofi', 'chill', 'soothing', 'vocals']
  },
  {
    id: 't4',
    title: 'Funk Matrix 3000',
    artistId: 'm4',
    artistName: 'Marcus "Groove" Miller',
    artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    audioSynthPattern: {
      tempo: 115,
      baseNote: 220,
      synthType: 'triangle',
      drumBeat: 'funk'
    },
    durationSeconds: 210,
    genre: 'Jazz Fusion & Soul',
    bpm: 115,
    keySignature: 'E Minor',
    plays: 76200,
    likes: 9800,
    reposts: 1200,
    hasStems: true,
    stems: [
      { id: 's13', name: 'Live Drum Breaks', type: 'drums', color: '#f59e0b', volume: 1, muted: false, solo: false },
      { id: 's14', name: 'Slap Bass', type: 'bass', color: '#10b981', volume: 1, muted: false, solo: false },
      { id: 's15', name: 'Funk Horn Section', type: 'other', color: '#ec4899', volume: 0.9, muted: false, solo: false }
    ],
    lyrics: '[Instrumental Funk Showcase - No Vocals]',
    commentary: '100% live pocket drums recorded in Chicago. Looking for a saxophonist or synth player to add a 2nd verse solo!',
    releasedAt: '5 days ago',
    tags: ['funk', 'drumbreak', 'groove', 'liveinstruments']
  }
];

export const INITIAL_MOMENTS: MomentPost[] = [
  {
    id: 'p1',
    artistId: 'm1',
    artistName: 'Maya Vance',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    artistRole: 'Synthesizer & Keys',
    mediaType: 'gear_shot',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
    caption: 'Late night studio patch testing! Just wired my modular rack through a stereo tape delay. Listen to how fat this sub bass frequency is hitting 🎛️⚡',
    location: 'Synthesizer Vault, Berlin',
    timestamp: '35 mins ago',
    likes: 842,
    comments: [
      {
        id: 'c1',
        userName: 'Jax Thorne',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        isMusician: true,
        text: 'That tape saturation sounds unreal Maya! Would love to track some heavy fuzz guitar over that synth loop.',
        timestamp: '20 mins ago',
        likes: 18
      },
      {
        id: 'c2',
        userName: 'ElectroFan_99',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        isMusician: false,
        text: 'Can we get this as a full track release on SoundPulse soon please?! 🔥',
        timestamp: '12 mins ago',
        likes: 9
      }
    ],
    tags: ['studio', 'modularsynth', 'gearhead', 'behindthescenes'],
    relatedTrackId: 't1'
  },
  {
    id: 'p2',
    artistId: 'm2',
    artistName: 'Julian "Jax" Thorne',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    artistRole: 'Electric Guitar',
    mediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1000&q=80',
    caption: 'Soundcheck done at Stubb’s Austin! 🎸 Stage lights are hot and the tube amps are warm. Who is coming out tonight?!',
    location: 'Stubb’s Amphitheater, Austin, TX',
    timestamp: '2 hours ago',
    likes: 1240,
    comments: [
      {
        id: 'c3',
        userName: 'Aria Chen',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        isMusician: true,
        text: 'Crush it out there Jax!! Have a killer show!',
        timestamp: '1 hour ago',
        likes: 24
      }
    ],
    tags: ['livemusic', 'tourlife', 'austin', 'guitarist']
  },
  {
    id: 'p3',
    artistId: 'm3',
    artistName: 'Aria Chen',
    artistAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    artistRole: 'Lead Vocals',
    mediaType: 'audio_demo',
    mediaUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=80',
    caption: 'Raw acoustic vocal warm-up in the dressing room before heading into Abbey Road Studio B 🎙️✨ What genre should I tackle next?',
    location: 'Abbey Road Studios, London',
    timestamp: '5 hours ago',
    likes: 2150,
    comments: [],
    tags: ['vocalwarmup', 'abbeyroad', 'acapella', 'singersongwriter']
  }
];

export const INITIAL_JAM_REQUESTS: JamCollabRequest[] = [
  {
    id: 'j1',
    title: 'Dystopian Synth-Metal Track - Need Metal Drummer & Screamer',
    hostMusician: INITIAL_MUSICIANS[1], // Jax Thorne
    requiredRoles: ['Drums & Percussion', 'Lead Vocals'],
    genre: 'Heavy Metal & Rock',
    bpm: 145,
    keySignature: 'E Minor',
    description: 'Looking for an aggressive heavy metal drummer (double bass pedal preferred) and a powerful rock vocalist to finish a 4-minute cyberpunk metal anthem. Stems provided!',
    deadline: 'In 5 days',
    applicantsCount: 12,
    status: 'Open',
    audioSnippetTitle: 'CyberMetal_Draft_v2.wav'
  },
  {
    id: 'j2',
    title: 'Chill Lo-Fi Chillhop EP - Saxophone / Flute Soloist Wanted',
    hostMusician: INITIAL_MUSICIANS[0], // Maya Vance
    requiredRoles: ['Saxophone & Brass', 'Acoustic Guitar'],
    genre: 'Lo-Fi & Hip Hop',
    bpm: 82,
    keySignature: 'C Major',
    description: 'Collaborating on a 3-track cozy study lo-fi EP. Need smooth alto sax melodies and jazzy acoustic guitar chord vamps.',
    deadline: 'In 2 weeks',
    applicantsCount: 8,
    status: 'Open',
    audioSnippetTitle: 'Rainy_Coffee_Beat_82bpm.mp3'
  },
  {
    id: 'j3',
    title: 'Neo-Soul Groove Session - Bass & Keyboard Player Jam',
    hostMusician: INITIAL_MUSICIANS[2], // Aria Chen
    requiredRoles: ['Bass Guitar', 'Synthesizer & Keys'],
    genre: 'R&B & Funk',
    bpm: 94,
    keySignature: 'A Minor',
    description: 'Looking for a tight bass player and Rhodes piano keys player to lay down rhythm backing tracks for my upcoming soul single.',
    deadline: 'In 3 days',
    applicantsCount: 15,
    status: 'Open',
    audioSnippetTitle: 'Soul_Vocals_ScratchDemo.wav'
  }
];

export const INITIAL_LIVE_CHAT: LiveChatMessage[] = [
  {
    id: 'lc1',
    userId: 'u1',
    userName: 'SynthWave_Lover',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    userBadge: 'VIP Fan',
    text: 'That modular synth intro was absolutely insane Maya!! 🔥',
    timestamp: 'Just now',
    tipAmount: 10
  },
  {
    id: 'lc2',
    userId: 'u2',
    userName: 'GuitarHero_Alex',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    userBadge: 'PRO Musician',
    text: 'Jax what amp settings are you using on that lead solo?',
    timestamp: '1 min ago'
  },
  {
    id: 'lc3',
    userId: 'u3',
    userName: 'Sophie_Vibe',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    userBadge: 'Top Supporter',
    text: 'Sent 250 SoundPulse Gems! Keep rocking guys!! 💎💎',
    timestamp: '2 mins ago',
    tipAmount: 25
  }
];
