import {
  StarShip,
  ShipClass,
  StarSystem,
  AvatarFashionItem,
  UserAvatarState,
  VoxelBlockType,
  VoxelBlueprint,
  MarketListing,
  WalletState,
  LoungePlayer,
  PlayerLevelProgress,
  OpenWorldVehicle,
  PlanetWorld
} from '../types';

// Dynamic Procedural Generators for 200 Ships and 200 Star Systems
const SHIP_CLASSES: ShipClass[] = ['Interceptor Frigate', 'Assault Cruiser', 'Dreadnought Titan', 'Deep Space Mining Barge', 'Voxel Carrier'];
const SHIP_PREFIXES = ['Aether', 'Voxel', 'Titan', 'Apex', 'Shadow', 'Solar', 'Hyperion', 'Zero', 'Quantum', 'Nebula', 'Valkyrie', 'Phantom', 'Chronos', 'Genesis', 'Spectre', 'Obsidian', 'Cygnus', 'Orion', 'Centauri', 'Nova'];
const SHIP_SUFFIXES = ['Drake', 'Venture', 'Astarte', 'Stiletto', 'Leviathan', 'Reaper', 'Corsair', 'Falcon', 'Sentinel', 'Vanguard', 'Nemesis', 'Interceptor', 'Crusier', 'Juggernaut', 'Spectre', 'Striker', 'Titan', 'Dreadnought', 'Harvester', 'Matrix'];

const SHIP_IMAGES = [
  'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509210968527-03c6f17548d1?auto=format&fit=crop&w=800&q=80'
];

export const INITIAL_SHIPS: StarShip[] = Array.from({ length: 200 }, (_, i) => {
  const prefix = SHIP_PREFIXES[i % SHIP_PREFIXES.length];
  const suffix = SHIP_SUFFIXES[(i * 3) % SHIP_SUFFIXES.length];
  const classType = SHIP_CLASSES[i % SHIP_CLASSES.length];
  const isTitan = classType === 'Dreadnought Titan';
  const isMiner = classType === 'Deep Space Mining Barge';
  const isInterceptor = classType === 'Interceptor Frigate';

  const shieldPoints = isTitan ? 25000 + (i * 200) : isMiner ? 2000 + (i * 30) : 1200 + (i * 60);
  const dps = isTitan ? 2400 + (i * 20) : isInterceptor ? 400 + (i * 10) : 600 + (i * 15);
  const miningRate = isMiner ? 250 + (i * 5) : 20 + (i % 20);

  return {
    id: `ship_${i + 1}`,
    name: `${prefix} ${suffix} - MK-${(i % 10) + 1}`,
    classType,
    hullIntegrity: 100,
    shieldPoints,
    maxShields: shieldPoints,
    laserDPS: dps,
    miningRate,
    warpSpeed: Number((2.5 + (i % 8) * 0.8).toFixed(1)),
    cargoCapacity: 500 + i * 150,
    priceAeth: i < 2 ? 0 : 5000 + i * 800,
    blueprintRequired: `${prefix}-Blueprint-MK${i + 1}`,
    imageUrl: SHIP_IMAGES[i % SHIP_IMAGES.length],
    model3DType: isTitan ? 'titan' : isMiner ? 'miner' : isInterceptor ? 'fighter' : 'cruiser',
    unlocked: i < 6, // First 6 ships unlocked by default
    equippedModules: ['Heavy Pulse Cannon', 'Shield Hardener', 'MicroWarpDrive', 'Targeting Matrix']
  };
});

const SYSTEM_NAMES = ['Jita', 'Amarr', 'Rens', 'Dodixie', 'NullSec-Alpha', 'Voxel Haven', 'Aetherium Gate', 'Kepler-452', 'Alpha Centauri', 'Proxima Centauri', 'Sirius Major', 'Betelgeuse Prime', 'Andromeda Deep', 'Orion Core', 'Pleiades Sector', 'Cygnus Loop', 'Vega System', 'Altair Grid', 'Rigel Reach', 'Antares Rift'];
const FACTIONS = ['Caldari Federation', 'Amarr Empire', 'Gallente Federation', 'Minmatar Republic', 'NullSec Syndicate', 'Outer Ring Syndicate', 'Concord Peacekeepers'];
const ORES = ['Veldspar', 'Spodumain', 'Mercoxit', 'Pyroxeres', 'Plagioclase', 'Gneiss', 'Ochre', 'Bistot', 'Arkonor', 'Crokite'];

export const INITIAL_SYSTEMS: StarSystem[] = Array.from({ length: 200 }, (_, i) => {
  const nameBase = SYSTEM_NAMES[i % SYSTEM_NAMES.length];
  const secRating = Number((1.0 - (i * 0.01)).toFixed(1));
  const securityRating = Math.max(-1.0, secRating);
  const faction = FACTIONS[i % FACTIONS.length];
  const ore = ORES[i % ORES.length];

  return {
    id: `sys_${i + 1}`,
    name: `${nameBase} ${i + 1} - Sector ${String.fromCharCode(65 + (i % 26))}`,
    securityRating,
    faction,
    asteroidOre: ore,
    pirateThreat: securityRating > 0.5 ? 'Low' : securityRating > 0 ? 'Medium' : securityRating > -0.5 ? 'High' : 'Deadly',
    stationsCount: Math.floor(Math.random() * 12) + 2,
    jumpGates: [`Sector ${i > 0 ? i : 200}`, `Sector ${i < 199 ? i + 2 : 1}`]
  };
});

export const FASHION_CATALOG: AvatarFashionItem[] = [
  {
    id: 'fash_cyber_suit',
    name: 'Neon Cyberpunk Trench & Exosuit',
    category: 'Outfits',
    rarity: 'Legendary',
    priceAeth: 3500,
    previewColor: '#06b6d4',
    icon: '👕',
    unlocked: true,
    equipped: true,
    modelStyle: 'cyber_trench',
    bonusStat: '+15% Trading Charisma & Lounge VIP Access'
  },
  {
    id: 'fash_visor_hologram',
    name: 'Aetheric Tactical Visor',
    category: 'Helmets & Visors',
    rarity: 'Epic',
    priceAeth: 1800,
    previewColor: '#3b82f6',
    icon: '🥽',
    unlocked: true,
    equipped: true,
    modelStyle: 'hologram_visor',
    bonusStat: '+10% Ship HUD Scan Speed'
  },
  {
    id: 'fash_wings_plasma',
    name: 'Luminous Plasma Cyber-Wings',
    category: 'Cyber Wings & FX',
    rarity: 'Exotic',
    priceAeth: 8000,
    previewColor: '#a855f7',
    icon: '🪽',
    unlocked: false,
    equipped: false,
    modelStyle: 'plasma_wings',
    bonusStat: '3D Floating Avatar Effect & Particle Aura'
  },
  {
    id: 'fash_pose_dj',
    name: 'Galactic DJ & Club Dance Pack',
    category: 'Dance Poses',
    rarity: 'Rare',
    priceAeth: 950,
    previewColor: '#ec4899',
    icon: '🕺',
    unlocked: true,
    equipped: false,
    modelStyle: 'dance_breakdance',
    bonusStat: 'Unlocks DJ Booth Controls in 3D Lounge'
  },
  {
    id: 'fash_pet_drone',
    name: 'Sentinel Mini Floating Companion Drone',
    category: 'Pets & Drones',
    rarity: 'Epic',
    priceAeth: 2400,
    previewColor: '#eab308',
    icon: '🛸',
    unlocked: false,
    equipped: false,
    modelStyle: 'companion_drone',
    bonusStat: 'Follows Avatar in 3D Social Spaces'
  }
];

export const INITIAL_AVATAR: UserAvatarState = {
  name: 'Captain Nova Vance',
  title: 'Starbase Architect & Fleet Commander',
  genderModel: 'masculine',
  skinTone: '#e2e8f0',
  hairStyle: 'Cyber Undercut',
  hairColor: '#06b6d4',
  equippedOutfitId: 'fash_cyber_suit',
  equippedHelmetId: 'fash_visor_hologram',
  equippedWingsId: '',
  equippedPose: 'Standing',
  reputationScore: 9850
};

export const VOXEL_BLOCK_TYPES: VoxelBlockType[] = [
  {
    id: 'block_titanium',
    name: 'Reinforced Titanium Hull',
    category: 'Structural',
    color: '#334155',
    roughness: 0.3,
    costAeth: 10,
    icon: '⬛',
    defenseValue: 50
  },
  {
    id: 'block_glass',
    name: 'Poly-Glass Composite Window',
    category: 'Structural',
    color: '#38bdf8',
    roughness: 0.1,
    costAeth: 15,
    icon: '🟦',
    defenseValue: 20
  },
  {
    id: 'block_neon_cyan',
    name: 'Cyan Neon Power Conduit',
    category: 'Neon & Lights',
    color: '#06b6d4',
    emissive: true,
    roughness: 0.2,
    costAeth: 25,
    icon: '🩵',
    defenseValue: 10
  },
  {
    id: 'block_solar',
    name: 'Solar Generator Panel Voxel',
    category: 'Energy & Defense',
    color: '#f59e0b',
    roughness: 0.4,
    costAeth: 40,
    icon: '🟧',
    defenseValue: 30
  },
  {
    id: 'block_turret',
    name: 'Automated Plasma Turret Core',
    category: 'Energy & Defense',
    color: '#ef4444',
    emissive: true,
    roughness: 0.5,
    costAeth: 120,
    icon: '🟥',
    defenseValue: 150
  },
  {
    id: 'block_luxury',
    name: 'Teak Lounge Flooring',
    category: 'Interior & Luxury',
    color: '#78350f',
    roughness: 0.8,
    costAeth: 20,
    icon: '🟫',
    defenseValue: 5
  }
];

export const SAMPLE_BLUEPRINTS: VoxelBlueprint[] = [
  {
    id: 'bp_omega_station',
    title: 'Omega Deep Space Outpost & Trading Hub',
    creatorName: 'Nova Vance',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    description: 'A modular 3D voxel space station featuring dual docking bays, solar wings, plasma defense towers, and VIP Lounge floor.',
    totalBlocks: 148,
    powerRating: 2400,
    defenseRating: 1850,
    estimatedValueAeth: 48000,
    priceAeth: 15000,
    category: 'Space Station',
    blocks: [
      // Base Core
      { x: 0, y: 0, z: 0, typeId: 'block_titanium' },
      { x: 1, y: 0, z: 0, typeId: 'block_titanium' },
      { x: -1, y: 0, z: 0, typeId: 'block_titanium' },
      { x: 0, y: 0, z: 1, typeId: 'block_titanium' },
      { x: 0, y: 0, z: -1, typeId: 'block_titanium' },
      // Solar wings
      { x: 2, y: 0, z: 0, typeId: 'block_solar' },
      { x: 3, y: 0, z: 0, typeId: 'block_solar' },
      { x: -2, y: 0, z: 0, typeId: 'block_solar' },
      { x: -3, y: 0, z: 0, typeId: 'block_solar' },
      // Tower level 1
      { x: 0, y: 1, z: 0, typeId: 'block_neon_cyan' },
      { x: 0, y: 2, z: 0, typeId: 'block_glass' },
      { x: 0, y: 3, z: 0, typeId: 'block_turret' }
    ]
  },
  {
    id: 'bp_penthouse_sky',
    title: 'Cloud Nine Sky Lounge & Penthouse',
    creatorName: 'Aria Eclipse',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    description: 'An exclusive Second Life style luxury penthouse pad built with transparent glass walls, neon ambient lighting, and dance floor.',
    totalBlocks: 92,
    powerRating: 850,
    defenseRating: 400,
    estimatedValueAeth: 22000,
    priceAeth: 8500,
    category: 'Penthouse Pad',
    blocks: [
      { x: 0, y: 0, z: 0, typeId: 'block_luxury' },
      { x: 1, y: 0, z: 0, typeId: 'block_luxury' },
      { x: -1, y: 0, z: 0, typeId: 'block_luxury' },
      { x: 0, y: 0, z: 1, typeId: 'block_luxury' },
      { x: 0, y: 0, z: -1, typeId: 'block_luxury' },
      { x: 1, y: 1, z: 1, typeId: 'block_glass' },
      { x: -1, y: 1, z: -1, typeId: 'block_glass' },
      { x: 0, y: 2, z: 0, typeId: 'block_neon_cyan' }
    ]
  }
];

export const INITIAL_MARKET_LISTINGS: MarketListing[] = [
  {
    id: 'list_01',
    title: 'Aether Drake Battlecruiser Hull (Fully Fitted)',
    category: 'Ships & Hulls',
    priceAeth: 25000,
    priceUSD: 250.00,
    sellerName: 'StarCorp Logistics',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    quantity: 3,
    rarity: 'Epic',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    itemRefId: 'ship_drake_01',
    createdTime: '10 mins ago',
    verifiedExchangeable: true
  },
  {
    id: 'list_02',
    title: 'Omega Space Station 3D Voxel Blueprint (NFT Edition)',
    category: 'Voxel Blueprints',
    priceAeth: 15000,
    priceUSD: 150.00,
    sellerName: 'Captain Nova Vance',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quantity: 12,
    rarity: 'Legendary',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    itemRefId: 'bp_omega_station',
    createdTime: '1 hour ago',
    verifiedExchangeable: true
  },
  {
    id: 'list_03',
    title: '5,000 Units Pure Compressed Mercoxit Ore',
    category: 'Raw Space Ores',
    priceAeth: 4500,
    priceUSD: 45.00,
    sellerName: 'DeepSpace Mining Corp',
    sellerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    quantity: 5000,
    rarity: 'Rare',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    itemRefId: 'ore_mercoxit',
    createdTime: '25 mins ago',
    verifiedExchangeable: true
  },
  {
    id: 'list_04',
    title: 'Luminous Plasma Cyber-Wings (Avatar Apparel)',
    category: 'Avatar Fashion',
    priceAeth: 8000,
    priceUSD: 80.00,
    sellerName: 'CyberCouture Studio',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    quantity: 5,
    rarity: 'Legendary',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    itemRefId: 'fash_wings_plasma',
    createdTime: '2 hours ago',
    verifiedExchangeable: true
  }
];

export const INITIAL_WALLET: WalletState = {
  aethCredits: 12500, // 12,500 Credits = $125.00 USD
  exchangeRateUSDPerAeth: 0.01,
  pendingCashoutUSD: 0,
  lifetimeEarningsUSD: 485.50,
  payoutMethod: 'PayPal',
  payoutAccount: 'masravenhoth@gmail.com',
  history: [
    {
      id: 'tx_9812',
      type: 'Market Sale',
      amountAeth: 15000,
      amountUSD: 150.00,
      method: 'Galactic Vault',
      status: 'Completed',
      timestamp: 'Today, 14:22',
      txHash: '0x8f3b2a19c...91a'
    },
    {
      id: 'tx_9811',
      type: 'Mining Reward',
      amountAeth: 2500,
      amountUSD: 25.00,
      method: 'Galactic Vault',
      status: 'Completed',
      timestamp: 'Yesterday, 19:10',
      txHash: '0x4e2c81d09...31f'
    },
    {
      id: 'tx_9809',
      type: 'Cashout (Withdrawal)',
      amountAeth: -10000,
      amountUSD: -100.00,
      method: 'PayPal Instant',
      status: 'Completed',
      timestamp: '3 days ago',
      txHash: 'PP-TX-99812301'
    }
  ]
};

export const INITIAL_LOUNGE_PLAYERS: LoungePlayer[] = [
  {
    id: 'p_01',
    name: 'Aria Eclipse',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    outfitColor: '#ec4899',
    position: [1.2, 0, 0.8],
    action: 'DJing',
    statusMessage: '🔥 Playing Synthwave Live in 3D Stage!',
    badge: 'VIP Creator'
  },
  {
    id: 'p_02',
    name: 'Cypher Kai',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    outfitColor: '#06b6d4',
    position: [-1.8, 0, 1.5],
    action: 'Dancing',
    statusMessage: 'Selling Titanium Station Blueprints on Market!',
    badge: 'Fleet Ace'
  },
  {
    id: 'p_03',
    name: 'Seraphina Vox',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    outfitColor: '#eab308',
    position: [0.5, 0, -2.1],
    action: 'Talking',
    statusMessage: 'Looking for a Mining Fleet Corp in NullSec',
    badge: 'Trader PRO'
  }
];

export const INITIAL_BOSS_RAID = {
  id: 'boss_titan_01',
  name: 'TITAN OMEGA LEVIATHAN',
  title: 'Capital World Boss • Void Dreadnought',
  phase: 1 as const,
  health: 180000,
  maxHealth: 180000,
  shield: 80000,
  maxShield: 80000,
  bountyAeth: 50000, // $500 USD Cashout Bounty!
  bountyUSD: 500.00,
  specialAbility: 'DOOMSDAY ION BEAM & MISSILE BARRAGE',
  imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
  position: [0, 0, -25] as [number, number, number]
};

export const INITIAL_PVP_OPPONENTS = [
  {
    id: 'pvp_01',
    name: 'Ghost Squadron Ace',
    title: 'Rank #1 Apex Corsair',
    shipName: 'Stiletto Interceptor Prime',
    shipClass: 'Interceptor Frigate' as const,
    rankTitle: 'GRANDMASTER I',
    pvpRating: 2840,
    health: 4500,
    maxHealth: 4500,
    shield: 3500,
    maxShield: 3500,
    bountyAeth: 12000, // $120.00 USD
    position: [-18, 5, -20] as [number, number, number],
    status: 'Flying' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'pvp_02',
    name: 'Valkyrie Riven',
    title: 'Rank #3 Bounty Hunter',
    shipName: 'Vanguard Assault Dreadnought',
    shipClass: 'Assault Cruiser' as const,
    rankTitle: 'DIAMOND II',
    pvpRating: 2410,
    health: 8200,
    maxHealth: 8200,
    shield: 6000,
    maxShield: 6000,
    bountyAeth: 18000, // $180.00 USD
    position: [22, -8, -15] as [number, number, number],
    status: 'Flying' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'pvp_03',
    name: 'Dreadlord Malakor',
    title: 'NullSec Renegade Leader',
    shipName: 'Obsidian Carrier',
    shipClass: 'Dreadnought Titan' as const,
    rankTitle: 'LEGENDARY ACE',
    pvpRating: 3100,
    health: 15000,
    maxHealth: 15000,
    shield: 12000,
    maxShield: 12000,
    bountyAeth: 35000, // $350.00 USD
    position: [0, 12, -35] as [number, number, number],
    status: 'Flying' as const,
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_PLAYER_LEVEL: PlayerLevelProgress = {
  level: 42,
  currentExp: 8450,
  expToNextLevel: 10000,
  prestigeTitle: 'Level 42 Cyber Syndicate Boss',
  totalQuestsCompleted: 18,
  unlockedDistricts: ['sim_gta_downtown', 'sim_avakin_beach', 'sim_volcanic_forge']
};

export const INITIAL_VEHICLES: OpenWorldVehicle[] = [
  { id: 'v_01', name: 'Viper Cyber Hovercraft', type: 'Hover Roadster', speed: 180, color: '#06b6d4', priceAeth: 0, unlocked: true },
  { id: 'v_02', name: 'Apex Syndicate Police Interceptor', type: 'Police Cruiser', speed: 220, color: '#ec4899', priceAeth: 3000, unlocked: true },
  { id: 'v_03', name: 'Titan Mech Walker Mark IV', type: 'Titan Mech', speed: 120, color: '#f59e0b', priceAeth: 8500, unlocked: false },
  { id: 'v_04', name: 'Ghost Rider Cyberbike', type: 'Cyber Bike', speed: 250, color: '#a855f7', priceAeth: 12000, unlocked: false }
];

export const INITIAL_PLANETS: PlanetWorld[] = [
  {
    id: 'planet_terran_prime',
    name: 'AETHERIA PRIME',
    category: 'Terran Metropolis',
    atmosphereColor: '#38bdf8',
    radius3D: 12,
    rings: true,
    minLevel: 1,
    description: 'The glowing capital planet of the galaxy featuring sprawling GTA-style Cyber Cities, luxury Second Life beach resorts, and sky-high trade towers.',
    sims: [
      {
        id: 'sim_gta_downtown',
        name: 'Neo-Veridia Cyber Downtown (GTA Sim)',
        planetId: 'planet_terran_prime',
        category: 'GTA Cyber Downtown',
        description: 'Open world GTA district with hovercars, syndicate quests, street race betting, and crystal mining nodes!',
        minLevelRequired: 1,
        imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
        themeColor: '#06b6d4',
        npcs: [
          {
            id: 'npc_01',
            name: 'Hector "Giga" Vance',
            title: 'Syndicate Underboss',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            locationDistrict: 'sim_gta_downtown',
            dialogue: ['Hey kid, you want real cash credits? Steal the prototype data truck or mine 50 Cyber Gold nodes!'],
            questTitle: 'The Cyber Bank Heist',
            questDescription: 'Infiltrate the Central Core Vault and hack the security terminal for $50.00 USD cashout reward!',
            questRewardAeth: 5000,
            questRewardExp: 1200,
            questCompleted: false
          },
          {
            id: 'npc_02',
            name: 'Trixie Cyber-DJ',
            title: 'Club VIP Manager',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            locationDistrict: 'sim_gta_downtown',
            dialogue: ['Welcome to the 24/7 Neon Lounge! Dance on stage to boost your charisma level!'],
            questTitle: 'Lounge Celebrity',
            questDescription: 'Perform a dance pose for 30 seconds in front of 5 avatar patrons.',
            questRewardAeth: 2000,
            questRewardExp: 600,
            questCompleted: false
          }
        ],
        miningNodes: [
          { id: 'm_01', name: 'Cyber Gold Deposit', type: 'Cyber Gold', valueAeth: 250, expYield: 150, position: [-12, 0, 8], mined: false },
          { id: 'm_02', name: 'Pure Aetherium Node', type: 'Aetherium Crystal', valueAeth: 500, expYield: 300, position: [15, 0, -10], mined: false }
        ],
        featuredVehicles: INITIAL_VEHICLES
      },
      {
        id: 'sim_avakin_beach',
        name: 'Oceanic Haven Paradise Resort (Second Life Sim)',
        planetId: 'planet_terran_prime',
        category: 'Second Life Beach Resort',
        description: 'Luxurious tropical island sim with crystal clear water, VIP beach clubs, fashion runways, and pearl diving.',
        minLevelRequired: 5,
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        themeColor: '#ec4899',
        npcs: [
          {
            id: 'npc_03',
            name: 'Captain Serena',
            title: 'Resort Hostess',
            avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
            locationDistrict: 'sim_avakin_beach',
            dialogue: ['Welcome to Oceanic Haven! Wear your exotic avatar wings and flex on the runway!'],
            questTitle: 'Fashion Runway Star',
            questDescription: 'Equip any Legendary outfit and showcase it to the resort guests.',
            questRewardAeth: 3500,
            questRewardExp: 800,
            questCompleted: false
          }
        ],
        miningNodes: [
          { id: 'm_03', name: 'Aquatic Pearl Node', type: 'Plasma Gem', valueAeth: 800, expYield: 450, position: [5, 0, 18], mined: false }
        ],
        featuredVehicles: INITIAL_VEHICLES
      }
    ]
  },
  {
    id: 'planet_volcanic_forge',
    name: 'IGNIS VOLCANO FORGE',
    category: 'Volcanic Forge',
    atmosphereColor: '#f97316',
    radius3D: 10,
    rings: false,
    minLevel: 15,
    description: 'A fiery inferno planet rich in rare Titanium Ore and volcanic boss titans. Requires high thermal shields.',
    sims: [
      {
        id: 'sim_volcanic_forge',
        name: 'Magma Core Outpost',
        planetId: 'planet_volcanic_forge',
        category: 'Volcanic Outpost',
        description: 'Extreme heat industrial mining sector with magma titanium nodes and raid boss portals.',
        minLevelRequired: 15,
        imageUrl: 'https://images.unsplash.com/photo-1509210968527-03c6f17548d1?auto=format&fit=crop&w=800&q=80',
        themeColor: '#f97316',
        npcs: [
          {
            id: 'npc_04',
            name: 'Forge Master Vex',
            title: 'Titanium Smelter',
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            locationDistrict: 'sim_volcanic_forge',
            dialogue: ['Bring me 100 Titanium Ore units from the magma crater and I will forge you a Titan Mech!'],
            questTitle: 'Forging the Titan',
            questDescription: 'Mine 100 Volcanic Titanium Ore nodes.',
            questRewardAeth: 10000,
            questRewardExp: 2500,
            questCompleted: false
          }
        ],
        miningNodes: [
          { id: 'm_04', name: 'Volcanic Titanium Cluster', type: 'Titanium Ore', valueAeth: 1200, expYield: 800, position: [0, 0, -15], mined: false }
        ],
        featuredVehicles: INITIAL_VEHICLES
      }
    ]
  },
  {
    id: 'planet_sky_citadel',
    name: 'AETHERIA CLOUD CITADEL',
    category: 'Gas Giant Citadel',
    atmosphereColor: '#a855f7',
    radius3D: 15,
    rings: true,
    minLevel: 50,
    description: 'Floating cloud metropolis high above the gas giant atmosphere, home to highsec trade markets and level 1000 prestige arenas.',
    sims: [
      {
        id: 'sim_sky_citadel',
        name: 'Cloud Nine Sky Haven',
        planetId: 'planet_sky_citadel',
        category: 'Sky Citadel',
        description: 'High altitude penthouse district with anti-gravity drone racing, high-rollers casino, and prestige level trainers.',
        minLevelRequired: 50,
        imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
        themeColor: '#a855f7',
        npcs: [
          {
            id: 'npc_05',
            name: 'High Archon Sol',
            title: 'Level 1000 Master',
            avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
            locationDistrict: 'sim_sky_citadel',
            dialogue: ['Only true legends reach Level 1000 and claim the Emperor Title with $10,000 USD payout pool!'],
            questTitle: 'Path to Prestige 1000',
            questDescription: 'Reach Level 100 in open world quests.',
            questRewardAeth: 50000,
            questRewardExp: 10000,
            questCompleted: false
          }
        ],
        miningNodes: [
          { id: 'm_05', name: 'Gas Giant Plasma Crystal', type: 'Plasma Gem', valueAeth: 2500, expYield: 1500, position: [-20, 0, 10], mined: false }
        ],
        featuredVehicles: INITIAL_VEHICLES
      }
    ]
  }
];

