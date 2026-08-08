export type MusicGenre =
  | 'Synthwave & Electronic'
  | 'Indie & Alternative'
  | 'Jazz Fusion & Soul'
  | 'Heavy Metal & Rock'
  | 'Acoustic & Folk'
  | 'Lo-Fi & Hip Hop'
  | 'Cinematic & Ambient'
  | 'R&B & Funk';

export type InstrumentRole =
  | 'Lead Vocals'
  | 'Electric Guitar'
  | 'Acoustic Guitar'
  | 'Bass Guitar'
  | 'Drums & Percussion'
  | 'Synthesizer & Keys'
  | 'Saxophone & Brass'
  | 'Music Producer & DJ'
  | 'Audio Engineer';

export interface MusicianProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  primaryRole: InstrumentRole;
  secondaryRoles: InstrumentRole[];
  genres: MusicGenre[];
  location: string;
  bio: string;
  matchStatus: 'Looking for Band' | 'Open for Collabs' | 'Producer for Hire' | 'Jamming Casual';
  followers: number;
  fanSubscribers: number;
  gearList: string[];
  socialLinks: {
    spotify?: string;
    instagram?: string;
    youtube?: string;
    soundcloud?: string;
    twitter?: string;
  };
  verified: boolean;
}

// Legacy type exports for clean backward compatibility
export type BlueprintCategory = string;
export type BlueprintStatus = string;
export type BlueprintStyleMode = string;
export interface Hotspot {
  id: string;
  x: number;
  y: number;
  partNumber: string;
  title: string;
  description: string;
  material?: string;
  [key: string]: any;
}
export interface BlueprintItem {
  id: string;
  title: string;
  patentNumber: string;
  inventor: string;
  year: number;
  category: string;
  status: string;
  difficulty: string;
  summary: string;
  description: string;
  historicalContext?: string;
  specifications: Record<string, string>;
  materials: any[];
  assemblySteps: any[];
  hotspots: Hotspot[];
  svgLayers: any;
  imageUrl?: string;
  tags: string[];
  downloadsCount?: number;
  isAiGenerated?: boolean;
}
export interface BlueprintFilterState {
  searchQuery: string;
  category: string;
  status: string;
  era: string;
  sortBy: string;
}

export interface TrackStem {
  id: string;
  name: string;
  type: 'vocals' | 'drums' | 'bass' | 'synth' | 'guitar' | 'other';
  color: string;
  volume: number; // 0 to 1
  muted: boolean;
  solo: boolean;
}

export interface MusicTrack {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  coverArt: string;
  audioSynthPattern: {
    tempo: number;
    baseNote: number;
    synthType: 'sine' | 'square' | 'sawtooth' | 'triangle';
    drumBeat: 'rock' | 'synth' | 'lofi' | 'metal' | 'funk' | 'ambient';
  };
  durationSeconds: number;
  genre: MusicGenre;
  bpm: number;
  keySignature: string;
  plays: number;
  likes: number;
  reposts: number;
  hasStems: boolean;
  stems: TrackStem[];
  lyrics?: string;
  commentary: string;
  releasedAt: string;
  tags: string[];
}

export interface MomentComment {
  id: string;
  userName: string;
  userAvatar: string;
  isMusician: boolean;
  text: string;
  timestamp: string;
  likes: number;
}

export interface MomentPost {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistRole: string;
  mediaType: 'photo' | 'video' | 'gear_shot' | 'audio_demo';
  mediaUrl: string;
  audioSampleUrl?: string;
  caption: string;
  location?: string;
  timestamp: string;
  likes: number;
  comments: MomentComment[];
  tags: string[];
  relatedTrackId?: string;
  isFanMoment?: boolean;
}

export interface JamCollabRequest {
  id: string;
  title: string;
  hostMusician: MusicianProfile;
  requiredRoles: InstrumentRole[];
  genre: MusicGenre;
  bpm: number;
  keySignature: string;
  description: string;
  deadline: string;
  applicantsCount: number;
  status: 'Open' | 'In Progress' | 'Completed';
  audioSnippetTitle?: string;
}

export interface LiveChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBadge?: 'VIP Fan' | 'PRO Musician' | 'Top Supporter' | 'Band Member';
  text: string;
  timestamp: string;
  tipAmount?: number;
}

// ==========================================
// AETHER ECHOES: LIFE & METAVERSE TYPES
// ==========================================

export type SpaceGameMode = 'mining_pve' | 'pvp_dogfight' | 'boss_raid' | 'planet_gta_sim';

export interface PlayerLevelProgress {
  level: number; // 1 to 1000
  currentExp: number;
  expToNextLevel: number;
  prestigeTitle: string;
  totalQuestsCompleted: number;
  unlockedDistricts: string[];
}

export interface InteractableNPC {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  locationDistrict: string;
  dialogue: string[];
  questTitle?: string;
  questDescription?: string;
  questRewardAeth?: number;
  questRewardExp?: number;
  questCompleted?: boolean;
}

export interface OpenWorldVehicle {
  id: string;
  name: string;
  type: 'Hover Roadster' | 'Cyber Bike' | 'Titan Mech' | 'Police Cruiser';
  speed: number;
  color: string;
  priceAeth: number;
  unlocked: boolean;
}

export interface GroundMiningNode {
  id: string;
  name: string;
  type: 'Aetherium Crystal' | 'Cyber Gold' | 'Titanium Ore' | 'Plasma Gem';
  valueAeth: number;
  expYield: number;
  position: [number, number, number];
  mined: boolean;
}

export interface PlanetSimDistrict {
  id: string;
  name: string;
  planetId: string;
  category: 'GTA Cyber Downtown' | 'Second Life Beach Resort' | 'Volcanic Outpost' | 'Sky Citadel' | 'Underground Bazaar';
  description: string;
  minLevelRequired: number;
  imageUrl: string;
  npcs: InteractableNPC[];
  miningNodes: GroundMiningNode[];
  featuredVehicles: OpenWorldVehicle[];
  themeColor: string;
}

export interface PlanetWorld {
  id: string;
  name: string;
  category: 'Terran Metropolis' | 'Gas Giant Citadel' | 'Volcanic Forge' | 'Oceanic Paradise' | 'Ice World';
  atmosphereColor: string;
  radius3D: number;
  rings: boolean;
  minLevel: number;
  description: string;
  sims: PlanetSimDistrict[];
}

export type ShipClass = 'Interceptor Frigate' | 'Assault Cruiser' | 'Dreadnought Titan' | 'Deep Space Mining Barge' | 'Voxel Carrier';

export interface StarShip {
  id: string;
  name: string;
  classType: ShipClass;
  hullIntegrity: number; // Max 100
  shieldPoints: number;
  maxShields: number;
  laserDPS: number;
  miningRate: number; // Ores per sec
  warpSpeed: number; // AU/s
  cargoCapacity: number; // m3
  priceAeth: number;
  blueprintRequired: string;
  imageUrl: string;
  model3DType: 'fighter' | 'cruiser' | 'titan' | 'miner' | 'shuttle';
  unlocked: boolean;
  equippedModules: string[];
}

export interface BossRaidEntity {
  id: string;
  name: string;
  title: string;
  phase: 1 | 2 | 3;
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  bountyAeth: number;
  bountyUSD: number;
  specialAbility: string;
  imageUrl: string;
  position: [number, number, number];
  isCloaked?: boolean;
}

export interface PvPOpponent {
  id: string;
  name: string;
  title: string;
  shipName: string;
  shipClass: ShipClass;
  rankTitle: string;
  pvpRating: number;
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  bountyAeth: number;
  position: [number, number, number];
  isTargeted?: boolean;
  status: 'Flying' | 'Attacking' | 'Shields Down' | 'Destroyed';
  avatarUrl: string;
}

export interface FloatingDamageNumber {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

export interface StarSystem {
  id: string;
  name: string;
  securityRating: number; // 1.0 (HighSec) to -1.0 (NullSec)
  faction: string;
  asteroidOre: string;
  pirateThreat: string;
  stationsCount: number;
  jumpGates: string[];
}

export type FashionCategory = 'Outfits' | 'Helmets & Visors' | 'Cyber Wings & FX' | 'Dance Poses' | 'Pets & Drones';

export interface AvatarFashionItem {
  id: string;
  name: string;
  category: FashionCategory;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Exotic';
  priceAeth: number;
  previewColor: string;
  icon: string;
  unlocked: boolean;
  equipped: boolean;
  modelStyle: string;
  bonusStat: string;
}

export interface UserAvatarState {
  name: string;
  title: string;
  genderModel: 'masculine' | 'feminine' | 'android';
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  equippedOutfitId: string;
  equippedHelmetId: string;
  equippedWingsId: string;
  equippedPose: 'Standing' | 'Floating' | 'DJing' | 'Breakdancing' | 'Meditating';
  reputationScore: number;
}

export interface VoxelBlockType {
  id: string;
  name: string;
  category: 'Structural' | 'Energy & Defense' | 'Interior & Luxury' | 'Neon & Lights';
  color: string;
  emissive?: boolean;
  roughness: number;
  costAeth: number;
  icon: string;
  defenseValue: number;
}

export interface VoxelBlockData {
  x: number;
  y: number;
  z: number;
  typeId: string;
}

export interface VoxelBlueprint {
  id: string;
  title: string;
  creatorName: string;
  creatorAvatar: string;
  description: string;
  totalBlocks: number;
  powerRating: number;
  defenseRating: number;
  estimatedValueAeth: number;
  priceAeth: number;
  blocks: VoxelBlockData[];
  category: 'Space Station' | 'Penthouse Pad' | 'Mining Outpost' | 'Battle Fortress';
}

export type MarketCategory = 'Ships & Hulls' | 'Voxel Blueprints' | 'Raw Space Ores' | 'Avatar Fashion' | 'Station Plots';

export interface MarketListing {
  id: string;
  title: string;
  category: MarketCategory;
  priceAeth: number;
  priceUSD: number;
  sellerName: string;
  sellerAvatar: string;
  quantity: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl: string;
  itemRefId: string;
  createdTime: string;
  verifiedExchangeable: boolean;
}

export interface CashoutTransaction {
  id: string;
  type: 'Deposit' | 'Cashout (Withdrawal)' | 'Market Sale' | 'Mining Reward' | 'Blueprint License';
  amountAeth: number;
  amountUSD: number;
  method: 'PayPal Instant' | 'Crypto (USDT / ETH)' | 'Bank Wire (ACH)' | 'Stripe Connect' | 'Galactic Vault';
  status: 'Completed' | 'Processing Payout' | 'Pending Verification';
  timestamp: string;
  txHash: string;
}

export interface WalletState {
  aethCredits: number;
  exchangeRateUSDPerAeth: number; // e.g. $0.01 per AETH credit
  pendingCashoutUSD: number;
  lifetimeEarningsUSD: number;
  payoutMethod: 'PayPal' | 'Crypto USDT' | 'Bank Wire';
  payoutAccount: string;
  history: CashoutTransaction[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membershipTier: 'Verified Creator' | 'VIP Pro Member' | 'Executive Pioneer' | 'Basic Typist' | 'Monthly Subscriber' | 'Annual Subscriber' | 'Lifetime Premium';
  preferredCashoutMethod: 'PayPal' | 'Crypto USDT' | 'Bank Wire';
  cashoutAddress: string;
  joinedDate: string;
  isLoggedIn: boolean;
  subscriptionPlan?: 'none' | 'monthly' | 'annual' | 'premium';
}

export interface TypingInfoSnippet {
  id: string;
  title: string;
  category: 'Quantum Code' | 'Cybernetic Intelligence' | 'Financial Markets' | 'Biotech Secrets' | 'Deep Space Logs';
  rewardUSD: number;
  wordCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  textToType: string;
  isLocked: boolean;
  unlockCostUSD: number;
  requiredPlan: 'free' | 'monthly' | 'annual' | 'premium';
  summaryText: string;
}

export interface TypingSessionResult {
  id: string;
  snippetId: string;
  snippetTitle: string;
  wpm: number;
  accuracyPercent: number;
  earnedUSD: number;
  completedAt: string;
}

export interface LoungePlayer {
  id: string;
  name: string;
  avatarUrl: string;
  outfitColor: string;
  position: [number, number, number];
  action: 'Standing' | 'Dancing' | 'Sitting' | 'Talking' | 'DJing';
  statusMessage?: string;
  badge?: string;
}

