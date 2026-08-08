import React, { useState, useEffect } from 'react';
import {
  StarShip,
  StarSystem,
  AvatarFashionItem,
  UserAvatarState,
  VoxelBlueprint,
  MarketListing,
  WalletState,
  LoungePlayer,
  CashoutTransaction,
  BossRaidEntity,
  PvPOpponent,
  SpaceGameMode,
  PlanetWorld,
  PlanetSimDistrict,
  PlayerLevelProgress,
  BlueprintItem,
  BlueprintStyleMode,
  MusicTrack,
  MusicianProfile,
  JamCollabRequest,
  LiveChatMessage,
  UserAccount
} from './types';

// Game Data
import {
  INITIAL_SHIPS,
  INITIAL_SYSTEMS,
  FASHION_CATALOG,
  INITIAL_AVATAR,
  SAMPLE_BLUEPRINTS,
  INITIAL_MARKET_LISTINGS,
  INITIAL_WALLET,
  INITIAL_LOUNGE_PLAYERS,
  INITIAL_BOSS_RAID,
  INITIAL_PVP_OPPONENTS,
  INITIAL_PLANETS,
  INITIAL_PLAYER_LEVEL
} from './data/metaverseData';

// Music Network Data
import {
  INITIAL_MUSICIANS,
  INITIAL_TRACKS,
  INITIAL_JAM_REQUESTS,
  INITIAL_LIVE_CHAT
} from './data/musicNetworkData';

// Blueprint Data
import { INITIAL_BLUEPRINTS } from './data/blueprints';

// Header Navigation & App Suite Launcher
import {
  HeaderNav,
  MainAppId,
  MusicTab,
  BlueprintTab,
  GameTab
} from './components/HeaderNav';
import { AppSuiteLauncher } from './components/AppSuiteLauncher';
import { GameDownloadModal } from './components/GameDownloadModal';
import { CashoutBankModal } from './components/CashoutBankModal';
import { AuthModal } from './components/AuthModal';

// App 1: Music Components
import { AISongLab } from './components/AISongLab';
import { TrackPlayer } from './components/TrackPlayer';
import { StemVault } from './components/StemVault';
import { MusicianMatchmaker } from './components/MusicianMatchmaker';
import { FanLoungeLive } from './components/FanLoungeLive';

// App 2: Blueprint Components
import { BlueprintVault } from './components/BlueprintVault';
import { BlueprintComparison } from './components/BlueprintComparison';
import { AllBlueprintsMenu } from './components/AllBlueprintsMenu';
import { SlareInfographicPoster } from './components/SlareInfographicPoster';
import { BlueprintViewer } from './components/BlueprintViewer';

// App 3: 3D Metaverse Game Components
import { ThreeSpaceCanvas } from './components/ThreeSpaceCanvas';
import { GTAWorldCanvas } from './components/GTAWorldCanvas';
import { CyberRacingGame } from './components/CyberRacingGame';
import { VoxelDefenseGame } from './components/VoxelDefenseGame';
import { AvatarStudioView } from './components/AvatarStudioView';
import { ThreeVoxelBuilder } from './components/ThreeVoxelBuilder';
import { GalacticMarketView } from './components/GalacticMarketView';

// App 4: Cartoon, Comic & Video Maker Component
import { CartoonVideoStudio } from './components/CartoonVideoStudio';

// App 5: Type2Earn Information Portal Component
import { Type2EarnInfoStudio } from './components/Type2EarnInfoStudio';

// App 6: AI NeuroCode IDE Component
import { NeuroCodeIDE } from './components/NeuroCodeIDE';

// App 7: AstroTrader 3D Market Component
import { AstroTraderMarket } from './components/AstroTraderMarket';

// App 8: HoloCad 3D Spatial Studio Component
import { HoloCadStudio } from './components/HoloCadStudio';

// App 9: BioSynth Alien Genome Lab Component
import { BioSynthGenomeLab } from './components/BioSynthGenomeLab';

// App 10: CyberVoice AI Studio Component
import { CyberVoiceStudio } from './components/CyberVoiceStudio';

// Apps 11-30: Minimalist & Abstract Apps Suite Component
import { MinimalistAppsSuite } from './components/MinimalistAppsSuite';

// Apps 31-40: VIP Premium Locked Apps & Exquisite Banking Suite Component
import { PremiumLockedAppsSuite } from './components/PremiumLockedAppsSuite';

// Universal Everything Lab Suite Component
import { EverythingLab } from './components/EverythingLab';

import {
  Rocket,
  Search,
  ChevronLeft,
  ChevronRight,
  Unlock,
  Globe,
  Download,
  Grid
} from 'lucide-react';

export default function App() {
  // Master Active Separate App State
  const [activeApp, setActiveApp] = useState<MainAppId>('dashboard');

  // Sub-tab Navigation for each separate app
  const [musicTab, setMusicTab] = useState<MusicTab>('song_lab');
  const [blueprintTab, setBlueprintTab] = useState<BlueprintTab>('vault');
  const [gameTab, setGameTab] = useState<GameTab>('space');

  // Game Space Mode
  const [gameMode, setGameMode] = useState<SpaceGameMode>('mining_pve');

  // Download & Share Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadModalAppId, setDownloadModalAppId] = useState<MainAppId>('dashboard');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>({
    id: 'usr_demo_101',
    name: 'Commander Raven',
    email: 'masravenhoth@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    membershipTier: 'Executive Pioneer',
    preferredCashoutMethod: 'PayPal',
    cashoutAddress: 'masravenhoth@gmail.com',
    joinedDate: 'August 2026',
    isLoggedIn: true
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Read URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appParam = params.get('app');
    if (['everything-lab', 'music', 'blueprints', 'game', 'studio', 'typing', 'ide', 'trading', 'holocad', 'biosynth', 'voice', 'minimalist', 'premium', 'dashboard'].includes(appParam || '')) {
      setActiveApp(appParam as MainAppId);
    }
  }, []);

  const handleSelectActiveApp = (appId: MainAppId) => {
    setActiveApp(appId);
    const url = new URL(window.location.href);
    url.searchParams.set('app', appId);
    window.history.replaceState({}, '', url.toString());
  };

  const handleOpenDownloadModal = (appId?: MainAppId) => {
    setDownloadModalAppId(appId || activeApp);
    setIsDownloadModalOpen(true);
  };

  // -------------------------------------------------------------
  // STATE: APP 1 - MUSIC LAB
  // -------------------------------------------------------------
  const [tracks, setTracks] = useState<MusicTrack[]>(INITIAL_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(INITIAL_TRACKS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [musicians, setMusicians] = useState<MusicianProfile[]>(INITIAL_MUSICIANS);
  const [jamRequests, setJamRequests] = useState<JamCollabRequest[]>(INITIAL_JAM_REQUESTS);
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(INITIAL_LIVE_CHAT);

  const handleSendChatMessage = (text: string, tipAmount?: number) => {
    const newMessage: LiveChatMessage = {
      id: `chat_${Date.now()}`,
      userId: 'fan_1',
      userName: 'You (Fan)',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      text,
      timestamp: 'Just now',
      userBadge: tipAmount ? 'Top Supporter' : 'VIP Fan',
      tipAmount: tipAmount
    };
    setChatMessages((prev) => [...prev, newMessage]);

    if (tipAmount) {
      handleEarnAeth(tipAmount * 100);
    }
  };

  // -------------------------------------------------------------
  // STATE: APP 2 - BLUEPRINT VAULT
  // -------------------------------------------------------------
  const [blueprints, setBlueprintsList] = useState<BlueprintItem[]>(INITIAL_BLUEPRINTS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    INITIAL_BLUEPRINTS[0]?.id || 'bp-1',
    INITIAL_BLUEPRINTS[1]?.id || 'bp-2'
  ]);
  const [blueprintStyleMode, setBlueprintStyleMode] = useState<BlueprintStyleMode>('cyberpunk');
  const [selectedBlueprint, setSelectedBlueprint] = useState<BlueprintItem | null>(null);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleClearVault = () => {
    setBookmarkedIds([]);
  };

  // -------------------------------------------------------------
  // STATE: APP 3 - 3D METAVERSE GAME
  // -------------------------------------------------------------
  const [ships, setShips] = useState<StarShip[]>(INITIAL_SHIPS);
  const [currentShip, setCurrentShip] = useState<StarShip>(INITIAL_SHIPS[0]);
  const [systems, setSystems] = useState<StarSystem[]>(INITIAL_SYSTEMS);
  const [currentSystem, setCurrentSystem] = useState<StarSystem>(INITIAL_SYSTEMS[0]);

  // Filters for Ships & Systems
  const [shipSearch, setShipSearch] = useState('');
  const [shipClassFilter, setShipClassFilter] = useState<string>('All');
  const [shipPage, setShipPage] = useState(1);
  const SHIPS_PER_PAGE = 12;

  const [systemSearch, setSystemSearch] = useState('');
  const [systemSecFilter, setSystemSecFilter] = useState<string>('All');

  const [avatar, setAvatar] = useState<UserAvatarState>(INITIAL_AVATAR);
  const [fashionItems, setFashionItems] = useState<AvatarFashionItem[]>(FASHION_CATALOG);
  const [voxelBlueprints, setVoxelBlueprints] = useState<VoxelBlueprint[]>(SAMPLE_BLUEPRINTS);
  const [marketListings, setMarketListings] = useState<MarketListing[]>(INITIAL_MARKET_LISTINGS);
  const [wallet, setWallet] = useState<WalletState>(INITIAL_WALLET);
  const [loungePlayers, setLoungePlayers] = useState<LoungePlayer[]>(INITIAL_LOUNGE_PLAYERS);

  // Boss & PvP State
  const [bossRaid, setBossRaid] = useState<BossRaidEntity>(INITIAL_BOSS_RAID);
  const [pvpOpponents, setPvpOpponents] = useState<PvPOpponent[]>(INITIAL_PVP_OPPONENTS);

  // Planets, Open-World Sims & 1000 Level State
  const [planets, setPlanets] = useState<PlanetWorld[]>(INITIAL_PLANETS);
  const [currentPlanet, setCurrentPlanet] = useState<PlanetWorld>(INITIAL_PLANETS[0]);
  const [currentSim, setCurrentSim] = useState<PlanetSimDistrict>(INITIAL_PLANETS[0].sims[0]);
  const [playerLevel, setPlayerLevel] = useState<PlayerLevelProgress>(INITIAL_PLAYER_LEVEL);

  // Cashout Modal State
  const [isCashoutModalOpen, setIsCashoutModalOpen] = useState(false);

  const handleUnlockShip = (shipId: string, price: number) => {
    if (wallet.aethCredits < price) {
      alert(`Insufficient AETH Credits! You need ${price} AETH ($${(price * 0.01).toFixed(2)} USD). Mine ore or complete quests to earn more!`);
      return;
    }
    setWallet((w) => ({ ...w, aethCredits: w.aethCredits - price }));
    setShips((prev) =>
      prev.map((s) => (s.id === shipId ? { ...s, unlocked: true } : s))
    );
  };

  const handleGainExp = (expGain: number) => {
    setPlayerLevel((prev) => {
      let newExp = prev.currentExp + expGain;
      let newLevel = prev.level;
      let expNeeded = prev.expToNextLevel;

      while (newExp >= expNeeded && newLevel < 1000) {
        newExp -= expNeeded;
        newLevel += 1;
        expNeeded = Math.floor(expNeeded * 1.15);
      }

      let title = prev.prestigeTitle;
      if (newLevel >= 1000) title = 'Level 1000 GALACTIC EMPEROR PRESTIGE';
      else if (newLevel >= 500) title = `Level ${newLevel} Grand Overlord`;
      else if (newLevel >= 100) title = `Level ${newLevel} Apex City Mogul`;
      else title = `Level ${newLevel} Cyber Syndicate Boss`;

      return {
        ...prev,
        level: newLevel,
        currentExp: newExp,
        expToNextLevel: expNeeded,
        prestigeTitle: title
      };
    });
  };

  const handleEarnAeth = (aeth: number) => {
    setWallet((w) => ({
      ...w,
      aethCredits: w.aethCredits + aeth
    }));
  };

  const handleCompleteQuest = (npcId: string, questTitle: string, rewardAeth: number, rewardExp: number) => {
    handleEarnAeth(rewardAeth);
    handleGainExp(rewardExp);
    setPlayerLevel((prev) => ({
      ...prev,
      totalQuestsCompleted: prev.totalQuestsCompleted + 1
    }));
  };

  const handleMineOre = (amount: number) => {
    const oreRewardAeth = amount * 10;
    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits + oreRewardAeth
    }));
  };

  const handleDefeatPirate = (bountyAeth: number) => {
    const bountyUSD = bountyAeth * wallet.exchangeRateUSDPerAeth;
    const newTx: CashoutTransaction = {
      id: `tx_${Date.now()}`,
      type: 'Mining Reward',
      amountAeth: bountyAeth,
      amountUSD: bountyUSD,
      method: 'Galactic Vault',
      status: 'Completed',
      timestamp: 'Just now',
      txHash: `0x${Math.random().toString(16).substring(2, 10)}`
    };

    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits + bountyAeth,
      history: [newTx, ...prev.history]
    }));
  };

  const handleAttackBoss = (damage: number) => {
    setBossRaid((prev) => {
      const newHealth = Math.max(0, prev.health - damage);
      let newPhase = prev.phase;
      if (newHealth < prev.maxHealth * 0.3) newPhase = 3;
      else if (newHealth < prev.maxHealth * 0.65) newPhase = 2;

      if (newHealth === 0) {
        const bountyAeth = prev.bountyAeth;
        const bountyUSD = prev.bountyUSD;
        const newTx: CashoutTransaction = {
          id: `tx_${Date.now()}`,
          type: 'Mining Reward',
          amountAeth: bountyAeth,
          amountUSD: bountyUSD,
          method: 'Galactic Vault',
          status: 'Completed',
          timestamp: 'Just now',
          txHash: `BOSS-VICTORY-${Math.floor(Math.random() * 899999 + 100000)}`
        };

        setWallet((w) => ({
          ...w,
          aethCredits: w.aethCredits + bountyAeth,
          history: [newTx, ...w.history]
        }));

        alert(`🎉 WORLD BOSS DEFEATED! You destroyed TITAN OMEGA LEVIATHAN and claimed the $500.00 USD (${bountyAeth.toLocaleString()} AETH Credits) Bounty!`);
      }

      return {
        ...prev,
        health: newHealth,
        phase: newPhase
      };
    });
  };

  const handleDefeatPvPOpponent = (opponentId: string, bountyAeth: number) => {
    setPvpOpponents((prev) =>
      prev.map((p) => (p.id === opponentId ? { ...p, health: 0, status: 'Destroyed' } : p))
    );

    const bountyUSD = bountyAeth * wallet.exchangeRateUSDPerAeth;
    const newTx: CashoutTransaction = {
      id: `tx_${Date.now()}`,
      type: 'Mining Reward',
      amountAeth: bountyAeth,
      amountUSD: bountyUSD,
      method: 'Galactic Vault',
      status: 'Completed',
      timestamp: 'Just now',
      txHash: `PVP-${Math.floor(Math.random() * 899999 + 100000)}`
    };

    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits + bountyAeth,
      history: [newTx, ...prev.history]
    }));
  };

  const handleToggleEquipFashion = (itemId: string) => {
    setFashionItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, equipped: !item.equipped };
        }
        return item;
      })
    );
  };

  const handleSaveVoxelBlueprint = (newBp: VoxelBlueprint) => {
    setVoxelBlueprints((prev) => [newBp, ...prev]);

    const newListing: MarketListing = {
      id: `list_${Date.now()}`,
      title: newBp.title,
      category: 'Voxel Blueprints',
      priceAeth: newBp.priceAeth,
      priceUSD: newBp.priceAeth * wallet.exchangeRateUSDPerAeth,
      sellerName: avatar.name,
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quantity: 10,
      rarity: 'Legendary',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      itemRefId: newBp.id,
      createdTime: 'Just now',
      verifiedExchangeable: true
    };

    setMarketListings((prev) => [newListing, ...prev]);
  };

  const handleBuyListing = (listing: MarketListing) => {
    if (wallet.aethCredits < listing.priceAeth) {
      alert(`Insufficient AETH Credits! You need ${listing.priceAeth} AETH. Please top up or earn credits from space mining.`);
      setIsCashoutModalOpen(true);
      return;
    }

    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits - listing.priceAeth
    }));

    alert(`🎉 PURCHASED "${listing.title}" for ${listing.priceAeth} AETH ($${listing.priceUSD.toFixed(2)} USD)! Added to your inventory.`);
  };

  const handleCashout = (amountAeth: number, method: 'PayPal' | 'Crypto USDT' | 'Bank Wire', account: string) => {
    const amountUSD = amountAeth * wallet.exchangeRateUSDPerAeth;

    const newTx: CashoutTransaction = {
      id: `tx_${Date.now()}`,
      type: 'Cashout (Withdrawal)',
      amountAeth: -amountAeth,
      amountUSD: -amountUSD,
      method: method === 'PayPal' ? 'PayPal Instant' : method === 'Crypto USDT' ? 'Crypto (USDT / ETH)' : 'Bank Wire (ACH)',
      status: 'Completed',
      timestamp: 'Just now',
      txHash: `PP-TX-${Math.floor(Math.random() * 899999 + 100000)}`
    };

    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits - amountAeth,
      lifetimeEarningsUSD: prev.lifetimeEarningsUSD + amountUSD,
      history: [newTx, ...prev.history]
    }));
  };

  const handleDepositUSD = (amountUSD: number) => {
    const addedCredits = amountUSD / wallet.exchangeRateUSDPerAeth;

    const newTx: CashoutTransaction = {
      id: `tx_${Date.now()}`,
      type: 'Deposit',
      amountAeth: addedCredits,
      amountUSD: amountUSD,
      method: 'Stripe Connect',
      status: 'Completed',
      timestamp: 'Just now',
      txHash: `DEP-${Math.floor(Math.random() * 899999 + 100000)}`
    };

    setWallet((prev) => ({
      ...prev,
      aethCredits: prev.aethCredits + addedCredits,
      history: [newTx, ...prev.history]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar Header */}
      <HeaderNav
        activeApp={activeApp}
        setActiveApp={handleSelectActiveApp}
        musicTab={musicTab}
        setMusicTab={setMusicTab}
        blueprintTab={blueprintTab}
        setBlueprintTab={setBlueprintTab}
        gameTab={gameTab}
        setGameTab={setGameTab}
        wallet={wallet}
        onOpenCashoutModal={() => setIsCashoutModalOpen(true)}
        onOpenDownloadModal={handleOpenDownloadModal}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      {activeApp === 'everything-lab' ? (
        <EverythingLab />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* ========================================================= */}
          {/* APP 0: DASHBOARD SUITE HUB                                 */}
          {/* ========================================================= */}
          {activeApp === 'dashboard' && (
            <AppSuiteLauncher
              onLaunchApp={(appId) => handleSelectActiveApp(appId)}
              onOpenDownloadModal={handleOpenDownloadModal}
              wallet={wallet}
            />
          )}

        {/* ========================================================= */}
        {/* APP 1: AETHER MUSIC LAB                                    */}
        {/* ========================================================= */}
        {activeApp === 'music' && (
          <div className="space-y-6">
            
            {/* Music App Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-pink-500/30 p-4 rounded-2xl font-mono">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg">
                  🎵
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-pink-950 text-pink-400 px-2 py-0.5 rounded font-bold border border-pink-800">
                      APP 1 • MUSIC LAB
                    </span>
                    <h2 className="text-base font-black text-white">Aether AI Music Creator & Audio Suite</h2>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">Generate AI tracks, split stems, discover musicians, and stream audio.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenDownloadModal('music')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download App 1 Link</span>
                </button>
                <button
                  onClick={() => handleSelectActiveApp('dashboard')}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Grid className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>

            {/* Render Music Sub-tabs */}
            {musicTab === 'song_lab' && <AISongLab />}

            {musicTab === 'player' && (
              <TrackPlayer
                currentTrack={currentTrack}
                isPlaying={isPlayingAudio}
                onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
                onNextTrack={() => {
                  const idx = tracks.findIndex((t) => t.id === currentTrack.id);
                  const nextTrack = tracks[(idx + 1) % tracks.length];
                  setCurrentTrack(nextTrack);
                }}
                onPrevTrack={() => {
                  const idx = tracks.findIndex((t) => t.id === currentTrack.id);
                  const prevTrack = tracks[(idx - 1 + tracks.length) % tracks.length];
                  setCurrentTrack(prevTrack);
                }}
                onToggleStemVault={() => setMusicTab('stems')}
              />
            )}

            {musicTab === 'stems' && (
              <StemVault
                currentTrack={currentTrack}
                isPlaying={isPlayingAudio}
                onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
                allTracks={tracks}
                onSelectTrack={(t) => setCurrentTrack(t)}
              />
            )}

            {musicTab === 'matchmaker' && (
              <MusicianMatchmaker
                musicians={musicians}
                jamRequests={jamRequests}
                onSelectMusician={(id) => {}}
                onApplyJamRequest={(title) => alert(`Applied for jam request "${title}"! The band leader will contact you.`)}
                onOpenNewPost={() => {}}
              />
            )}

            {musicTab === 'lounge' && (
              <FanLoungeLive
                chatMessages={chatMessages}
                onSendMessage={handleSendChatMessage}
              />
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* APP 2: AETHER BLUEPRINT VAULT                              */}
        {/* ========================================================= */}
        {activeApp === 'blueprints' && (
          <div className="space-y-6">
            
            {/* Blueprint App Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl font-mono">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  📐
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-800">
                      APP 2 • BLUEPRINT VAULT
                    </span>
                    <h2 className="text-base font-black text-white">Aether Engineering CAD & Specs Vault</h2>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">Inspect architectural schematics, run spec matrices, and print posters.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenDownloadModal('blueprints')}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download App 2 Link</span>
                </button>
                <button
                  onClick={() => handleSelectActiveApp('dashboard')}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Grid className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>

            {/* Render Selected Blueprint Viewer Modal */}
            {selectedBlueprint && (
              <BlueprintViewer
                blueprint={selectedBlueprint}
                onClose={() => setSelectedBlueprint(null)}
                styleMode={blueprintStyleMode}
                setStyleMode={setBlueprintStyleMode}
                onDownload={(bp) => alert(`Downloaded CAD schematic for "${bp.title}"!`)}
              />
            )}

            {/* Render Blueprint Sub-tabs */}
            {blueprintTab === 'vault' && (
              <BlueprintVault
                blueprints={blueprints}
                bookmarkedIds={bookmarkedIds}
                styleMode={blueprintStyleMode}
                onViewBlueprint={(bp) => setSelectedBlueprint(bp)}
                onDownloadBlueprint={(bp) => alert(`Downloaded CAD Blueprint file for "${bp.title}"!`)}
                onToggleBookmark={handleToggleBookmark}
                onClearVault={handleClearVault}
              />
            )}

            {blueprintTab === 'comparison' && (
              <BlueprintComparison
                blueprints={blueprints}
                styleMode={blueprintStyleMode}
                onView={(bp) => setSelectedBlueprint(bp)}
              />
            )}

            {blueprintTab === 'catalog' && (
              <AllBlueprintsMenu
                isOpen={true}
                onClose={() => setBlueprintTab('vault')}
                blueprints={blueprints}
                bookmarkedIds={bookmarkedIds}
                styleMode={blueprintStyleMode}
                onSelectBlueprint={(bp) => setSelectedBlueprint(bp)}
                onViewBlueprint={(bp) => setSelectedBlueprint(bp)}
                onToggleBookmark={handleToggleBookmark}
                onCompareBlueprints={() => setBlueprintTab('comparison')}
              />
            )}

            {blueprintTab === 'poster' && (
              <SlareInfographicPoster
                blueprint={selectedBlueprint || blueprints[0]}
                onClose={() => setBlueprintTab('vault')}
              />
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* APP 3: AETHER 3D METAVERSE GAME                           */}
        {/* ========================================================= */}
        {activeApp === 'game' && (() => {
          const filteredSystems = systems.filter((sys) => {
            const matchesSearch = sys.name.toLowerCase().includes(systemSearch.toLowerCase()) || sys.faction.toLowerCase().includes(systemSearch.toLowerCase());
            if (systemSecFilter === 'HighSec') return matchesSearch && sys.securityRating >= 0.5;
            if (systemSecFilter === 'LowSec') return matchesSearch && sys.securityRating < 0.5 && sys.securityRating >= 0.0;
            if (systemSecFilter === 'NullSec') return matchesSearch && sys.securityRating < 0.0;
            return matchesSearch;
          });

          const filteredShips = ships.filter((ship) => {
            const matchesSearch = ship.name.toLowerCase().includes(shipSearch.toLowerCase()) || ship.classType.toLowerCase().includes(shipSearch.toLowerCase());
            const matchesClass = shipClassFilter === 'All' || ship.classType === shipClassFilter;
            return matchesSearch && matchesClass;
          });

          const totalPages = Math.ceil(filteredShips.length / SHIPS_PER_PAGE) || 1;
          const paginatedShips = filteredShips.slice((shipPage - 1) * SHIPS_PER_PAGE, shipPage * SHIPS_PER_PAGE);

          return (
            <div className="space-y-6">
              
              {/* Game App Header Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-amber-500/30 p-4 rounded-2xl font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    🎮
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-800">
                        APP 3 • 3D GAME SUITE
                      </span>
                      <h2 className="text-base font-black text-white">Aether 3D Metaverse Game</h2>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">Space Warships, GTA Open-World CyberCity RPG, Avatar Fashion & Voxel Creator.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDownloadModal('game')}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download App 3 Link</span>
                  </button>
                  <button
                    onClick={() => handleSelectActiveApp('dashboard')}
                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dashboard</span>
                  </button>
                </div>
              </div>

              {/* Render Game Sub-tabs */}
              {gameTab === 'space' && (
                <div className="space-y-6">
                  
                  {/* System Warp Bar */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3 font-mono shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-400">ACTIVE STAR SYSTEM ({systems.length} WORLDS):</span>
                        <span className="font-bold text-white">{currentSystem.name}</span>
                        <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800 font-bold">
                          Sec: {currentSystem.securityRating} ({currentSystem.faction})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search 200 systems..."
                            value={systemSearch}
                            onChange={(e) => setSystemSearch(e.target.value)}
                            className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 w-44"
                          />
                        </div>

                        <select
                          value={systemSecFilter}
                          onChange={(e) => setSystemSecFilter(e.target.value)}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          <option value="All">All Security Levels</option>
                          <option value="HighSec">HighSec (0.5 to 1.0)</option>
                          <option value="LowSec">LowSec (0.0 to 0.4)</option>
                          <option value="NullSec">NullSec (-1.0 to -0.1)</option>
                        </select>

                        <select
                          value={currentSystem.id}
                          onChange={(e) => {
                            const sys = systems.find((s) => s.id === e.target.value);
                            if (sys) setCurrentSystem(sys);
                          }}
                          className="px-3 py-1 bg-cyan-500 text-slate-950 font-black rounded-xl text-xs focus:outline-none cursor-pointer"
                        >
                          {filteredSystems.map((sys) => (
                            <option key={sys.id} value={sys.id}>
                              {sys.name} (Sec {sys.securityRating})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick System Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {filteredSystems.slice(0, 10).map((sys) => (
                        <button
                          key={sys.id}
                          onClick={() => setCurrentSystem(sys)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                            currentSystem.id === sys.id
                              ? 'bg-cyan-500 text-slate-950 shadow-md'
                              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                          }`}
                        >
                          {sys.name.split('-')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3D WebGL Canvas for Space Flight */}
                  <ThreeSpaceCanvas
                    currentShip={currentShip}
                    currentSystem={currentSystem}
                    bossRaid={bossRaid}
                    pvpOpponents={pvpOpponents}
                    gameMode={gameMode}
                    setGameMode={setGameMode}
                    onMineOre={handleMineOre}
                    onDefeatPirate={handleDefeatPirate}
                    onAttackBoss={handleAttackBoss}
                    onDefeatPvPOpponent={handleDefeatPvPOpponent}
                  />

                  {/* 200 Pilotable Ships Fleet Hangar Collection */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 font-mono shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <h3 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                          <Rocket className="w-5 h-5" /> GALACTIC FLEET HANGAR ({ships.length} PILOTABLE SHIPS)
                        </h3>
                        <p className="text-xs text-slate-400">Filter, unlock, and equip any of the 200 battlecruisers, titans, miners & interceptors.</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search 200 ships..."
                            value={shipSearch}
                            onChange={(e) => {
                              setShipSearch(e.target.value);
                              setShipPage(1);
                            }}
                            className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 w-48"
                          />
                        </div>

                        <select
                          value={shipClassFilter}
                          onChange={(e) => {
                            setShipClassFilter(e.target.value);
                            setShipPage(1);
                          }}
                          className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                        >
                          <option value="All">All 5 Ship Classes</option>
                          <option value="Interceptor Frigate">Interceptor Frigate</option>
                          <option value="Assault Cruiser">Assault Cruiser</option>
                          <option value="Dreadnought Titan">Dreadnought Titan</option>
                          <option value="Deep Space Mining Barge">Deep Space Mining Barge</option>
                          <option value="Voxel Carrier">Voxel Carrier</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {paginatedShips.map((ship) => (
                        <div
                          key={ship.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                            currentShip.id === ship.id
                              ? 'bg-slate-950 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                              : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800/60">
                              <img
                                src={ship.imageUrl}
                                alt={ship.name}
                                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute top-2 right-2 text-[10px] bg-slate-950/90 text-cyan-400 px-2 py-0.5 rounded-md font-bold border border-cyan-800/50">
                                DPS: {ship.laserDPS}
                              </span>
                            </div>

                            <h4 className="font-extrabold text-white text-xs leading-tight mb-1">{ship.name}</h4>
                            <div className="text-[10px] text-slate-400 mb-2 flex items-center justify-between">
                              <span>{ship.classType}</span>
                              <span className="text-cyan-400 font-bold">{ship.shieldPoints} HP Shield</span>
                            </div>
                          </div>

                          {ship.unlocked ? (
                            <button
                              onClick={() => setCurrentShip(ship)}
                              className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                currentShip.id === ship.id
                                  ? 'bg-cyan-500 text-slate-950 shadow-lg'
                                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white hover:border-cyan-500/50'
                              }`}
                            >
                              <Rocket className="w-3.5 h-3.5" />
                              <span>{currentShip.id === ship.id ? 'EQUIPPED IN COCKPIT' : 'PILOT SHIP'}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnlockShip(ship.id, ship.priceAeth)}
                              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
                            >
                              <Unlock className="w-3.5 h-3.5" />
                              <span>UNLOCK ({ship.priceAeth.toLocaleString()} AETH)</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Pagination Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                      <span className="text-slate-400">
                        Showing {paginatedShips.length} of {filteredShips.length} ships (Page {shipPage} of {totalPages})
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          disabled={shipPage === 1}
                          onClick={() => setShipPage((p) => Math.max(1, p - 1))}
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-white px-2">{shipPage} / {totalPages}</span>
                        <button
                          disabled={shipPage === totalPages}
                          onClick={() => setShipPage((p) => Math.min(totalPages, p + 1))}
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40 hover:text-white cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {gameTab === 'cybercity' && (
                <GTAWorldCanvas
                  currentPlanet={currentPlanet}
                  currentSim={currentSim}
                  playerLevel={playerLevel}
                  userAvatar={avatar}
                  allPlanets={planets}
                  onSelectSim={(sim) => {
                    setCurrentSim(sim);
                    const p = planets.find((planet) => planet.id === sim.planetId) || planets[0];
                    setCurrentPlanet(p);
                  }}
                  onGainExp={handleGainExp}
                  onEarnAeth={handleEarnAeth}
                  onCompleteQuest={handleCompleteQuest}
                />
              )}

              {gameTab === 'racing' && (
                <CyberRacingGame onEarnAeth={handleEarnAeth} />
              )}

              {gameTab === 'defense' && (
                <VoxelDefenseGame onEarnAeth={handleEarnAeth} />
              )}

              {gameTab === 'avatar' && (
                <AvatarStudioView
                  userAvatar={avatar}
                  onUpdateAvatar={setAvatar}
                  onToggleEquipItem={handleToggleEquipFashion}
                  userAethCredits={wallet.aethCredits}
                />
              )}

              {gameTab === 'voxel' && (
                <ThreeVoxelBuilder onSaveBlueprint={handleSaveVoxelBlueprint} />
              )}

              {gameTab === 'market' && (
                <GalacticMarketView
                  listings={marketListings}
                  userAethCredits={wallet.aethCredits}
                  onBuyListing={handleBuyListing}
                  onAddListing={(newListing) => setMarketListings((prev) => [newListing, ...prev])}
                />
              )}

            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* APP 4: TOONSTUDIO CARTOON & VIDEO MAKER                    */}
        {/* ========================================================= */}
        {activeApp === 'studio' && (
          <CartoonVideoStudio />
        )}

        {/* ========================================================= */}
        {/* APP 5: TYPE2EARN INFORMATION PORTAL                       */}
        {/* ========================================================= */}
        {activeApp === 'typing' && (
          <Type2EarnInfoStudio
            currentUser={currentUser}
            onLogin={(usr) => setCurrentUser(usr)}
            onSignup={(usr) => setCurrentUser(usr)}
            wallet={wallet}
            onEarnCashUSD={handleEarnAeth}
            onOpenCashoutModal={() => setIsCashoutModalOpen(true)}
          />
        )}

        {/* ========================================================= */}
        {/* APP 6: AI NEUROCODE IDE & QUANTUM LAB                     */}
        {/* ========================================================= */}
        {activeApp === 'ide' && (
          <NeuroCodeIDE />
        )}

        {/* ========================================================= */}
        {/* APP 7: ASTROTRADER 3D GALACTIC MARKET                     */}
        {/* ========================================================= */}
        {activeApp === 'trading' && (
          <AstroTraderMarket />
        )}

        {/* ========================================================= */}
        {/* APP 8: HOLOCAD 3D SPATIAL STUDIO                          */}
        {/* ========================================================= */}
        {activeApp === 'holocad' && (
          <HoloCadStudio />
        )}

        {/* ========================================================= */}
        {/* APP 9: BIOSYNTH ALIEN GENOME LAB                          */}
        {/* ========================================================= */}
        {activeApp === 'biosynth' && (
          <BioSynthGenomeLab />
        )}

        {/* ========================================================= */}
        {/* APP 10: CYBERVOICE AI PODCASTER STUDIO                    */}
        {/* ========================================================= */}
        {activeApp === 'voice' && (
          <CyberVoiceStudio />
        )}

        {/* ========================================================= */}
        {/* APPS 11-30: 20 MINIMALISTIC & ABSTRACT CREATIVE APPS      */}
        {/* ========================================================= */}
        {activeApp === 'minimalist' && (
          <MinimalistAppsSuite />
        )}

        {/* ========================================================= */}
        {/* APPS 31-40: 10 VIP PREMIUM LOCKED APPS & BANKING LEDGER   */}
        {/* ========================================================= */}
        {activeApp === 'premium' && (
          <PremiumLockedAppsSuite />
        )}

      </main>
      )}

      {/* Game / App Download & Links Modal */}
      <GameDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        initialAppId={downloadModalAppId}
      />

      {/* Cashout Bank & Real Money Exchange Modal */}
      {isCashoutModalOpen && (
        <CashoutBankModal
          wallet={wallet}
          onClose={() => setIsCashoutModalOpen(false)}
          onCashout={handleCashout}
          onDeposit={handleDepositUSD}
        />
      )}

      {/* Identity & Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(usr) => setCurrentUser(usr)}
        onLogout={() => setCurrentUser(null)}
        onSignup={(usr) => setCurrentUser(usr)}
        wallet={wallet}
        onOpenCashoutModal={() => setIsCashoutModalOpen(true)}
      />

    </div>
  );
}
