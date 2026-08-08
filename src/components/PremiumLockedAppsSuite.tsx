import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  CreditCard,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Landmark,
  Key,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Eye,
  FileText,
  Copy,
  CheckCircle2,
  RefreshCw,
  Plus,
  Plane,
  Radio,
  Sliders,
  Award,
  Wallet,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export type PremiumAppId =
  | 'vault_banking'
  | 'quantum_supercomputer'
  | 'algo_trading_bot'
  | 'sovereign_portfolio'
  | 'hologram_raytracer'
  | 'satellite_telemetry'
  | 'bio_longevity'
  | 'jet_concierge'
  | 'atmos_mastering'
  | 'aegis_cyber_shield';

export interface PremiumAppMeta {
  id: PremiumAppId;
  appNumber: number;
  title: string;
  subtitle: string;
  priceUSD: number;
  badge: string;
  tagline: string;
  icon: any;
  color: string;
  bannerImg: string;
  description: string;
  features: string[];
}

export const PREMIUM_APPS: PremiumAppMeta[] = [
  {
    id: 'vault_banking',
    appNumber: 31,
    title: 'Exquisite Vault Banking & Ledger',
    subtitle: 'Intricate Money Transaction & Multi-Currency Engine',
    priceUSD: 49.99,
    badge: 'APP 31 • EXQUISITE BANKING',
    tagline: 'Multi-currency wires • Holographic Debit Cards • Encrypted Vaults',
    icon: Landmark,
    color: 'from-amber-400 via-yellow-500 to-emerald-500',
    bannerImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    description: 'An exquisite, banking transaction suite with multi-currency IBANs, wire transfers, visual debit card management, encrypted yield vaults, and live audit ledgers.',
    features: [
      'Multi-Currency Wallet (USD, EUR, GBP, Quantum Token QNT)',
      'Holographic Black VIP Debit Card with PIN & Freeze Control',
      'Instant Wire Transfer Engine with Swift Routing & Receipts',
      'Encrypted High-Yield Lock Vaults with Daily Interest',
      'Real-Time Fiat & Crypto Currency Exchange Terminal',
      'Professional Client Invoice & Wire Receipt Generator'
    ]
  },
  {
    id: 'quantum_supercomputer',
    appNumber: 32,
    title: 'Apex AI Quantum Supercomputer',
    subtitle: 'Private Multi-Agent Fine-Tuning & Prompt Sandbox',
    priceUSD: 79.99,
    badge: 'APP 32 • AI SUPERCOMPUTER',
    tagline: '100B Parameter Models • Quantum Annealing • Multi-Agent Loops',
    icon: Cpu,
    color: 'from-cyan-400 via-blue-500 to-purple-600',
    bannerImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: 'An AI supercomputing interface for orchestrating multi-agent LLM teams, fine-tuning neural weights, and running quantum annealing algorithms.',
    features: [
      'Multi-Agent Collaborative Orchestration Grid',
      'Quantum Qubit Annealing Optimization Simulator',
      'Prompt Matrix Benchmarking & Token Cost Calculator',
      'Live GPU/TPU Memory Allocation Visualizer'
    ]
  },
  {
    id: 'algo_trading_bot',
    appNumber: 33,
    title: 'High-Frequency Algo Trading Terminal',
    subtitle: 'Automated Bot Strategies & Live Backtesting',
    priceUSD: 99.99,
    badge: 'APP 33 • ALGO TRADING BOT',
    tagline: 'Sub-millisecond execution • Arbitrage scanners • Risk limits',
    icon: TrendingUp,
    color: 'from-emerald-400 via-teal-500 to-cyan-500',
    bannerImg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    description: 'Deploy automated algorithmic trading bots with real-time arbitrage detection, automated stop-loss triggers, and strategy backtesting.',
    features: [
      'Sub-Millisecond Order Routing & Arbitrage Scanner',
      'Visual Strategy Backtester with Sharpe Ratio Metrics',
      'Automated Risk Limits & Stop-Loss Engine',
      'Multi-Exchange API Connection Hub'
    ]
  },
  {
    id: 'sovereign_portfolio',
    appNumber: 34,
    title: 'Sovereign Wealth & Luxury Assets',
    subtitle: 'Global Asset Portfolio & Wealth Ledger',
    priceUSD: 59.99,
    badge: 'APP 34 • SOVEREIGN WEALTH',
    tagline: 'Real estate, private equity, bullion & dividend tracking',
    icon: DollarSign,
    color: 'from-amber-300 via-yellow-400 to-amber-600',
    bannerImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    description: 'Track high-net-worth sovereign assets, physical gold reserves, prime real estate acquisitions, and quarterly dividend payout streams.',
    features: [
      'Multi-Asset Net Worth Aggregator & Allocation Chart',
      'Precious Metal & Bullion Reserve Valuation Engine',
      'Real Estate Cap Rate & Yield Calculator',
      'Tax Efficiency & Offshore Holding Structuring'
    ]
  },
  {
    id: 'hologram_raytracer',
    appNumber: 35,
    title: 'Ray-Traced Hologram CAD Studio',
    subtitle: '3D Architectural Spatial Render Pipeline',
    priceUSD: 69.99,
    badge: 'APP 35 • HOLOGRAM STUDIO',
    tagline: 'Real-time ray-tracing • Spatial light bounce • CAD exports',
    icon: Layers,
    color: 'from-purple-400 via-pink-500 to-rose-500',
    bannerImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Render architectural holograms with path-traced spatial lighting, glass caustics, and real-time volumetric fog.',
    features: [
      'Path-Traced Volumetric Hologram Renderer',
      'Physical Material Shader Presets (Titanium, Quartz, Neon Glass)',
      'Lighting Angle & Time-of-Day Shadow Bouncing',
      'Direct OBJ & USDZ Spatial File Exporter'
    ]
  },
  {
    id: 'satellite_telemetry',
    appNumber: 36,
    title: 'Orbital Satellite Telemetry',
    subtitle: 'Deep Space Observation & Telemetry Grid',
    priceUSD: 89.99,
    badge: 'APP 36 • SATELLITE TELEMETRY',
    tagline: 'Live orbit tracking • Spectral imaging • Ground station link',
    icon: Radio,
    color: 'from-blue-400 via-indigo-500 to-cyan-400',
    bannerImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Connect to simulated deep-space satellite telemetry feeds, track orbital trajectories in real-time, and download infrared planetary imagery.',
    features: [
      'Real-Time LEO & GEO Orbital Trackers',
      'Infrared & Multispectral Terrain Scanner',
      'Ground Station Uplink Speed & Latency Meters',
      'High-Resolution Celestial Coordinates Downloader'
    ]
  },
  {
    id: 'bio_longevity',
    appNumber: 37,
    title: 'BioSynth Longevity Suite',
    subtitle: 'Cellular Telomere Deceleration Lab',
    priceUSD: 99.99,
    badge: 'APP 37 • BIOSYNTH LONGEVITY',
    tagline: 'Bio-age analysis • Epigenetic protocol • Biomarker tracking',
    icon: Sparkles,
    color: 'from-emerald-300 via-teal-400 to-cyan-500',
    bannerImg: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    description: 'Optimize biological age and cellular telomere maintenance with longevity biomarker tracking, mitochondrial protocols, and gene therapy modeling.',
    features: [
      'Biological Age vs Chronological Age Epigenetic Calculator',
      'Mitochondrial Resuscitation Protocol Planner',
      'Blood Panel & Biomarker Range Optimizer',
      'Custom Longevity Nootropic Stack Generator'
    ]
  },
  {
    id: 'jet_concierge',
    appNumber: 38,
    title: 'Imperial Jet & Yacht Fleet',
    subtitle: 'Private Aviation & Yacht Concierge Ledger',
    priceUSD: 119.99,
    badge: 'APP 38 • LUXURY CONCIERGE',
    tagline: 'Private jet charters • Mega-yacht moorings • VIP crew logs',
    icon: Plane,
    color: 'from-amber-400 via-orange-500 to-yellow-600',
    bannerImg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    description: 'Manage ultra-luxury travel itineraries, book private supersonic aircraft charters, arrange superyacht Mediterranean berths, and handle VIP logistics.',
    features: [
      'Global Flight Leg & Range Fuel Estimator',
      'Superyacht Marina Berth Reservation Matrix',
      'In-Flight Gourmet Catering & Security Manifests',
      'Consolidated Executive Expense Reporting'
    ]
  },
  {
    id: 'atmos_mastering',
    appNumber: 39,
    title: 'Dolby Atmos AI Mastering Studio',
    subtitle: 'Acoustic Spatial Mastering & Stem Isolator',
    priceUSD: 64.99,
    badge: 'APP 39 • ATMOS MASTERING',
    tagline: 'Spatial 7.1.4 mixing • LUFS loudness normalizer • AI stem splitter',
    icon: Sliders,
    color: 'from-purple-400 via-indigo-500 to-pink-500',
    bannerImg: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    description: 'Master audio tracks into immersive 3D Dolby Atmos spatial sound fields, isolate vocals or drums with neural stem splitting, and optimize LUFS.',
    features: [
      '3D 7.1.4 Spatial Soundfield Panner & Visualizer',
      'Neural AI Vocal, Drum & Instrument Stem Separator',
      'LUFS Target Loudness Normalizer (-14 LUFS Streaming Standard)',
      'Multi-Format High-Res WAV & ADM BWF Exporter'
    ]
  },
  {
    id: 'aegis_cyber_shield',
    appNumber: 40,
    title: 'Aegis Quantum Cyber Shield',
    subtitle: 'Zero-Day Intrusion & Encryption Grid',
    priceUSD: 149.99,
    badge: 'APP 40 • CYBER WARFARE SHIELD',
    tagline: 'Post-quantum lattice encryption • Zero-day anomaly detection',
    icon: ShieldCheck,
    color: 'from-cyan-400 via-blue-600 to-indigo-600',
    bannerImg: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Deploy military-grade post-quantum encryption lattices, monitor live network intrusion anomalies, and enforce zero-trust access control.',
    features: [
      'Post-Quantum Lattice Encryption Key Generator',
      'Real-Time Network Packet Anomaly & Threat Radar',
      'Zero-Trust Access Control & Biometric Hash Validator',
      'Automated Firewall Countermeasure Scripting'
    ]
  }
];

export const PremiumLockedAppsSuite: React.FC = () => {
  const [unlockedApps, setUnlockedApps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aether_unlocked_premium_apps');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return ['vault_banking']; // Default App 31 Banking unlocked as starter preview
  });

  const [selectedAppId, setSelectedAppId] = useState<PremiumAppId>('vault_banking');
  const [unlockModalApp, setUnlockModalApp] = useState<PremiumAppMeta | null>(null);
  const [vipMasterUnlocked, setVipMasterUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('aether_vip_master_unlocked') === 'true';
  });

  // Banking App specific state
  const [accountBalanceUSD, setAccountBalanceUSD] = useState<number>(248590.50);
  const [accountBalanceEUR, setAccountBalanceEUR] = useState<number>(192400.00);
  const [accountBalanceQNT, setAccountBalanceQNT] = useState<number>(4500.00);
  const [activeCardFrozen, setActiveCardFrozen] = useState<boolean>(false);
  const [showCardCVV, setShowCardCVV] = useState<boolean>(false);

  // Wire transfer form state
  const [transferRecipient, setTransferRecipient] = useState<string>('Aetherius Quantum Corp');
  const [transferAmount, setTransferAmount] = useState<string>('15000');
  const [transferMemo, setTransferMemo] = useState<string>('QNT Research Grant Settlement');
  const [transferSuccessMsg, setTransferSuccessMsg] = useState<string | null>(null);

  // Transaction Ledger Log
  const [transactions, setTransactions] = useState([
    { id: 'tx-101', date: 'Today, 10:42 AM', title: 'Galactic Wire Outward', recipient: 'Aether Starships Inc.', amount: -15000.00, currency: 'USD', type: 'transfer' },
    { id: 'tx-102', date: 'Yesterday', title: 'Vault Interest Payout', recipient: 'High-Yield Lock #04', amount: +840.25, currency: 'USD', type: 'income' },
    { id: 'tx-103', date: '04 Aug 2026', title: 'AstroTrader Dividend', recipient: 'Exchange Liquidity Pool', amount: +3250.00, currency: 'USD', type: 'income' },
    { id: 'tx-104', date: '02 Aug 2026', title: 'NeuroCode IDE License', recipient: 'Neural Software Vault', amount: -299.00, currency: 'USD', type: 'expense' }
  ]);

  const isUnlocked = (id: string) => vipMasterUnlocked || unlockedApps.includes(id);

  const handleUnlockApp = (app: PremiumAppMeta) => {
    const updated = [...unlockedApps, app.id];
    setUnlockedApps(updated);
    try {
      localStorage.setItem('aether_unlocked_premium_apps', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    setUnlockModalApp(null);
  };

  const handleUnlockAllMasterVIP = () => {
    setVipMasterUnlocked(true);
    localStorage.setItem('aether_vip_master_unlocked', 'true');
  };

  const handleExecuteWireTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;

    if (amt > accountBalanceUSD) {
      alert('Insufficient USD funds in primary liquid account.');
      return;
    }

    setAccountBalanceUSD((prev) => prev - amt);
    const newTx = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      date: 'Just Now',
      title: transferMemo || 'Wire Transfer Out',
      recipient: transferRecipient,
      amount: -amt,
      currency: 'USD',
      type: 'transfer'
    };
    setTransactions([newTx, ...transactions]);
    setTransferSuccessMsg(`Successfully wired $${amt.toLocaleString()} to ${transferRecipient}!`);
    setTimeout(() => setTransferSuccessMsg(null), 4000);
  };

  const currentApp = PREMIUM_APPS.find((a) => a.id === selectedAppId) || PREMIUM_APPS[0];

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen font-sans py-6 px-3 sm:px-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top VIP Master Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 p-5 sm:p-7 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl shadow-2xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-extrabold px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wide">
                VIP LOCKED SUITE • APPS 31 - 40
              </span>
              {vipMasterUnlocked && (
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> MASTER VIP UNLOCKED
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Exquisite High-Value Premium Applications
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Unlock top-tier sovereign suite applications including the Exquisite Banking & Wire Ledger, AI Quantum Supercomputer, High-Frequency Algo Bot, and Dolby Atmos Mastering Studio.
            </p>
          </div>

          {!vipMasterUnlocked && (
            <button
              onClick={handleUnlockAllMasterVIP}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] shrink-0"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              UNLOCK ALL 10 PREMIUM APPS ($199 VIP PASS)
            </button>
          )}
        </div>

        {/* Selected Premium App Stage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Active Header Bar */}
          <div className="p-4 sm:p-6 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 text-amber-400">
                <currentApp.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400">{currentApp.badge}</span>
                  {!isUnlocked(currentApp.id) && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> LOCKED (${currentApp.priceUSD})
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-white">{currentApp.title}</h2>
              </div>
            </div>

            {!isUnlocked(currentApp.id) && (
              <button
                onClick={() => setUnlockModalApp(currentApp)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <Lock className="w-4 h-4" />
                UNLOCK APP FOR ${currentApp.priceUSD}
              </button>
            )}
          </div>

          {/* If LOCKED view */}
          {!isUnlocked(currentApp.id) ? (
            <div className="p-8 sm:p-12 text-center space-y-6 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
              <img
                src={currentApp.bannerImg}
                alt={currentApp.title}
                className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm"
              />
              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                  <Lock className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  {currentApp.title} is Locked
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentApp.description}
                </p>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-left space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Included VIP Features:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {currentApp.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setUnlockModalApp(currentApp)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 mx-auto transition-all shadow-xl shadow-amber-500/30 hover:scale-105"
                >
                  <Key className="w-4 h-4" />
                  UNLOCK NOW (${currentApp.priceUSD})
                </button>
              </div>
            </div>
          ) : (
            /* UNLOCKED VIEW: CUSTOM INTERACTIVE CONTENT */
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* APP 31: EXQUISITE VAULT BANKING ENGINE */}
              {currentApp.id === 'vault_banking' && (
                <div className="space-y-6 font-mono">
                  
                  {/* Top Stats & Balances */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2 relative overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>PRIMARY USD LIQUID BAL</span>
                        <Landmark className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                        ${accountBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +$840.25 Daily Yield
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>EURO SPREAD ACCOUNT</span>
                        <Globe className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-blue-300">
                        €{accountBalanceEUR.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        IBAN: DE89 3704 0044 0532 01
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>QUANTUM TOKEN VAULT</span>
                        <Zap className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-extrabold text-purple-300">
                        {accountBalanceQNT.toLocaleString()} QNT
                      </div>
                      <div className="text-[11px] text-purple-400">
                        1 QNT = $12.45 USD
                      </div>
                    </div>
                  </div>

                  {/* Debit Card & Wire Transfer Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Visual Holographic Card */}
                    <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <h3 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        Imperial VIP Holographic Card
                      </h3>

                      <div className={`p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-6 transition-all ${activeCardFrozen ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-amber-400 font-extrabold tracking-widest uppercase">
                            AETHER SOVEREIGN VIP
                          </span>
                          <span className="text-xs font-bold text-slate-400">DEBIT</span>
                        </div>

                        <div className="text-lg font-mono tracking-wider text-white">
                          4532 •••• •••• 8892
                        </div>

                        <div className="flex items-end justify-between text-xs text-slate-300">
                          <div>
                            <div className="text-[9px] text-slate-400">CARD HOLDER</div>
                            <div className="font-bold text-amber-300">MASON R. HOTH</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400">EXPIRES</div>
                            <div className="font-bold">08 / 31</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-slate-400">CVV</div>
                            <div className="font-bold text-amber-400">
                              {showCardCVV ? '892' : '•••'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setShowCardCVV(!showCardCVV)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {showCardCVV ? 'Hide CVV' : 'Show CVV'}
                        </button>

                        <button
                          onClick={() => setActiveCardFrozen(!activeCardFrozen)}
                          className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                            activeCardFrozen
                              ? 'bg-rose-950 text-rose-300 border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          {activeCardFrozen ? 'Card Frozen' : 'Card Active'}
                        </button>
                      </div>
                    </div>

                    {/* Wire Transfer Form */}
                    <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                      <h3 className="text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
                        <Send className="w-4 h-4 text-emerald-400" />
                        Execute Instant Wire Transfer
                      </h3>

                      {transferSuccessMsg && (
                        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{transferSuccessMsg}</span>
                        </div>
                      )}

                      <form onSubmit={handleExecuteWireTransfer} className="space-y-3">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase">Recipient Name or SWIFT/IBAN</label>
                          <input
                            type="text"
                            value={transferRecipient}
                            onChange={(e) => setTransferRecipient(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-slate-400 uppercase">Amount ($ USD)</label>
                            <input
                              type="number"
                              value={transferAmount}
                              onChange={(e) => setTransferAmount(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 uppercase">Reference Memo</label>
                            <input
                              type="text"
                              value={transferMemo}
                              onChange={(e) => setTransferMemo(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          EXECUTE WIRE TRANSFER
                        </button>
                      </form>
                    </div>

                  </div>

                  {/* Transaction Ledger Table */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase text-slate-300">
                        Live Multi-Currency Audit Ledger
                      </h3>
                      <span className="text-[10px] text-slate-400">Real-time Encrypted Receipts</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-2 px-3">Date</th>
                            <th className="py-2 px-3">Title / Description</th>
                            <th className="py-2 px-3">Recipient</th>
                            <th className="py-2 px-3 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-900/50">
                              <td className="py-2.5 px-3 text-slate-400">{tx.date}</td>
                              <td className="py-2.5 px-3 text-white font-medium">{tx.title}</td>
                              <td className="py-2.5 px-3 text-slate-300">{tx.recipient}</td>
                              <td className={`py-2.5 px-3 text-right font-bold ${
                                tx.amount > 0 ? 'text-emerald-400' : 'text-slate-200'
                              }`}>
                                {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* UNIVERSAL UNLOCKED VIEW FOR APPS 32 - 40 */}
              {currentApp.id !== 'vault_banking' && (
                <div className="space-y-6 font-mono">
                  <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                        ACTIVE UNLOCKED VIP MODULE
                      </span>
                      <span className="text-xs text-slate-400">Full Execution Authority Granted</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white">
                      {currentApp.title} Operational Console
                    </h3>
                    <p className="text-sm text-slate-300">
                      {currentApp.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {currentApp.features.map((feat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* 10 Premium Apps Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              VIP Premium Applications (Apps 31 - 40)
            </h2>
            <span className="text-xs font-mono text-slate-400">Select to inspect or unlock</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {PREMIUM_APPS.map((app) => {
              const Icon = app.icon;
              const unlocked = isUnlocked(app.id);
              const isSelected = selectedAppId === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2.5 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-lg text-white ring-1 ring-amber-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      APP {app.appNumber}
                    </span>
                    {unlocked ? (
                      <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">
                        ${app.priceUSD}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {app.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* UNLOCK PAYMENT MODAL */}
        {unlockModalApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{unlockModalApp.title}</h3>
                    <span className="text-xs text-amber-400 font-mono">{unlockModalApp.badge}</span>
                  </div>
                </div>
                <button
                  onClick={() => setUnlockModalApp(null)}
                  className="text-slate-400 hover:text-white font-mono text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                  <span>Unlock Price:</span>
                  <span className="text-lg font-bold text-amber-400">${unlockModalApp.priceUSD} USD</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-200">Select Instant Payment Method:</span>
                  <div className="grid grid-cols-2 gap-2 font-mono">
                    <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Credit Card / Apple Pay
                    </button>
                    <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] font-bold text-white flex items-center gap-1.5">
                      <Wallet className="w-3.5 h-3.5 text-cyan-400" /> Quantum Wallet
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setUnlockModalApp(null)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleUnlockApp(unlockModalApp)}
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-mono text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <Unlock className="w-4 h-4" />
                  CONFIRM PURCHASE
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
