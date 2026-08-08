import React, { useState, useEffect, useRef } from 'react';
import { UserAccount, WalletState, TypingInfoSnippet, TypingSessionResult } from '../types';
import { createSafeAudioContext } from '../utils/audioEngine';
import {
  Keyboard,
  DollarSign,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  ShieldCheck,
  CreditCard,
  UserPlus,
  LogIn,
  RotateCcw,
  Play,
  Check,
  Building,
  ArrowRight,
  FileText,
  Clock,
  BarChart2,
  Download,
  Share2,
  Globe,
  Star,
  Eye,
  AlertCircle
} from 'lucide-react';

// Default Information Snippets Library for Typing
const INITIAL_SNIPPETS: TypingInfoSnippet[] = [
  {
    id: 'info_1',
    title: 'Quantum Entanglement Data Transceiver Spec #809',
    category: 'Quantum Code',
    rewardUSD: 0.75,
    wordCount: 42,
    difficulty: 'Easy',
    textToType: 'The quantum transceiver utilizes non-local photon pairing to establish instantaneous data links across interstellar distances without signal attenuation.',
    isLocked: false,
    unlockCostUSD: 0,
    requiredPlan: 'free',
    summaryText: 'Publicly accessible blueprint snippet for fundamental quantum communications.'
  },
  {
    id: 'info_2',
    title: 'Neo-Chroma Financial Market Arbitrage Algorithm',
    category: 'Financial Markets',
    rewardUSD: 1.50,
    wordCount: 52,
    difficulty: 'Medium',
    textToType: 'High frequency arbitrage nodes monitor decentralized Liquidity Pools to execute sub-millisecond atomic swaps, guaranteeing micro-yield capital gains.',
    isLocked: false,
    unlockCostUSD: 0,
    requiredPlan: 'free',
    summaryText: 'Financial intelligence report detailing automated yield strategies.'
  },
  {
    id: 'info_3',
    title: 'Classified Cybernetic Neuro-Link Interface Core',
    category: 'Cybernetic Intelligence',
    rewardUSD: 2.25,
    wordCount: 65,
    difficulty: 'Hard',
    textToType: 'Neural synthetic axons interface directly with human motor cortex signals, translating thought impulse commands into mechanical dexterity at ninety-nine percent accuracy.',
    isLocked: true,
    unlockCostUSD: 2.00,
    requiredPlan: 'monthly',
    summaryText: 'Classified biotech integration manual. Unlocked with $2/mo Monthly Subscription or $2.00 typing balance.'
  },
  {
    id: 'info_4',
    title: 'Biotech Synthetic DNA Memory Storage Matrix',
    category: 'Biotech Secrets',
    rewardUSD: 3.50,
    wordCount: 78,
    difficulty: 'Extreme',
    textToType: 'Biological nucleotide sequencing allows exabytes of compressed digital information to be stored inside synthetic DNA strands, surviving extreme cosmic radiation.',
    isLocked: true,
    unlockCostUSD: 4.00,
    requiredPlan: 'annual',
    summaryText: 'Secret bio-archival dossier. Unlocked with $44/yr Annual Plan or $100 Lifetime Premium.'
  },
  {
    id: 'info_5',
    title: 'Aetherius Deep Space Portal Coordinates & Dark Energy Core',
    category: 'Deep Space Logs',
    rewardUSD: 5.00,
    wordCount: 90,
    difficulty: 'Extreme',
    textToType: 'Dark energy stabilization fields prevent singularity collapses during jump gate passage, allowing capital class dreadnoughts to traverse galactic sectors instantly.',
    isLocked: true,
    unlockCostUSD: 5.00,
    requiredPlan: 'premium',
    summaryText: 'Top Secret Galactic Vault Document. Unlocked with $100 Lifetime Premium Pass.'
  }
];

interface Type2EarnInfoStudioProps {
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onSignup: (newUser: UserAccount) => void;
  wallet: WalletState;
  onEarnCashUSD: (amountUSD: number) => void;
  onOpenCashoutModal: () => void;
}

export const Type2EarnInfoStudio: React.FC<Type2EarnInfoStudioProps> = ({
  currentUser,
  onLogin,
  onSignup,
  wallet,
  onEarnCashUSD,
  onOpenCashoutModal
}) => {
  // Auth & Subscription Gate States
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'premium'>('monthly');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [payoutAccount, setPayoutAccount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState<'PayPal' | 'Crypto USDT' | 'Bank Wire'>('PayPal');
  const [gateError, setGateError] = useState<string | null>(null);

  // App Tabs
  const [activeTab, setActiveTab] = useState<'typing_arena' | 'info_vault' | 'earnings_payout'>('typing_arena');

  // Snippets & Unlocked State
  const [snippets, setSnippets] = useState<TypingInfoSnippet[]>(INITIAL_SNIPPETS);
  const [currentSnippet, setCurrentSnippet] = useState<TypingInfoSnippet>(INITIAL_SNIPPETS[0]);
  const [unlockedSnippetIds, setUnlockedSnippetIds] = useState<string[]>(['info_1', 'info_2']);

  // Typing Arena Engine States
  const [typedInput, setTypedInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Statistics
  const [sessionHistory, setSessionHistory] = useState<TypingSessionResult[]>([]);
  const [totalTypingEarnedUSD, setTotalTypingEarnedUSD] = useState(12.50);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mechanical Key Click Audio Synthesizer
  const playKeySound = (isError = false) => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isError ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(isError ? 120 : 600 + Math.random() * 200, ctx.currentTime);

      gain.gain.setValueAtTime(isError ? 0.2 : 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Audio fallback
    }
  };

  // Cash Reward Success Audio
  const playRewardSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = createSafeAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Audio fallback
    }
  };

  // Timer Effect
  useEffect(() => {
    let interval: any;
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  // Realtime WPM & Accuracy Calculation
  const calculateMetrics = () => {
    const timeInMinutes = (elapsedSeconds || 1) / 60;
    const wordsTyped = typedInput.trim().split(/\s+/).filter(Boolean).length;
    const wpm = Math.round(wordsTyped / timeInMinutes) || 0;

    let correctChars = 0;
    const targetText = currentSnippet.textToType;
    for (let i = 0; i < typedInput.length; i++) {
      if (typedInput[i] === targetText[i]) {
        correctChars++;
      }
    }

    const accuracyPercent = typedInput.length > 0
      ? Math.round((correctChars / typedInput.length) * 100)
      : 100;

    return { wpm, accuracyPercent };
  };

  const { wpm, accuracyPercent } = calculateMetrics();

  // Typing Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const targetText = currentSnippet.textToType;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const lastCharTyped = val[val.length - 1];
    const expectedChar = targetText[val.length - 1];
    if (lastCharTyped !== undefined) {
      playKeySound(lastCharTyped !== expectedChar);
    }

    setTypedInput(val);

    // Check completion
    if (val === targetText && !isCompleted) {
      setIsCompleted(true);

      // Calculate reward
      const multiplier = currentUser?.subscriptionPlan === 'premium' ? 2.0 : currentUser?.subscriptionPlan === 'annual' ? 1.5 : 1.0;
      const finalReward = Number((currentSnippet.rewardUSD * multiplier).toFixed(2));

      onEarnCashUSD(finalReward);
      setTotalTypingEarnedUSD((prev) => prev + finalReward);
      playRewardSound();

      // Add session result log
      const newResult: TypingSessionResult = {
        id: `sess_${Date.now()}`,
        snippetId: currentSnippet.id,
        snippetTitle: currentSnippet.title,
        wpm: Math.max(wpm, 35),
        accuracyPercent: 100,
        earnedUSD: finalReward,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessionHistory((prev) => [newResult, ...prev]);
    }
  };

  // Reset Typing Test
  const handleResetTyping = () => {
    setTypedInput('');
    setStartTime(null);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Select Snippet to Type
  const handleSelectSnippet = (s: TypingInfoSnippet) => {
    const isUnlocked = unlockedSnippetIds.includes(s.id) || !s.isLocked || currentUser?.subscriptionPlan === 'premium';
    if (!isUnlocked) {
      alert(`This information report requires a subscription or $${s.unlockCostUSD} unlock!`);
      return;
    }
    setCurrentSnippet(s);
    handleResetTyping();
  };

  // Unlock Snippet with Earnings or Plan
  const handleUnlockSnippet = (s: TypingInfoSnippet) => {
    if (totalTypingEarnedUSD < s.unlockCostUSD) {
      alert(`Insufficient typing balance ($${totalTypingEarnedUSD.toFixed(2)}). You need $${s.unlockCostUSD.toFixed(2)} to unlock!`);
      return;
    }

    setTotalTypingEarnedUSD((prev) => prev - s.unlockCostUSD);
    setUnlockedSnippetIds((prev) => [...prev, s.id]);
    alert(`🎉 Unlocked "${s.title}"! You can now view and type this intelligence dossier.`);
    playRewardSound();
  };

  // Handle Signup Gate Submission
  const handleGateSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      setGateError('Please enter your Name, Email and Password to activate account.');
      return;
    }

    const tierName = selectedPlan === 'premium' ? 'Lifetime Premium' : selectedPlan === 'annual' ? 'Annual Subscriber' : 'Monthly Subscriber';

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      name: signupName,
      email: signupEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      membershipTier: tierName as any,
      preferredCashoutMethod: payoutMethod,
      cashoutAddress: payoutAccount || signupEmail,
      joinedDate: 'August 2026',
      isLoggedIn: true,
      subscriptionPlan: selectedPlan
    };

    onSignup(newUser);
    setGateError(null);
    playRewardSound();
  };

  // IF USER IS NOT LOGGED IN OR HAS NO ACTIVE ACCOUNT -> SHOW MANDATORY SIGNUP & SUBSCRIPTION GATE
  if (!currentUser || !currentUser.isLoggedIn) {
    return (
      <div className="bg-[#080C14] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 font-mono shadow-2xl text-white space-y-8 max-w-5xl mx-auto">
        
        {/* Header Branding */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
            <DollarSign className="w-4 h-4 fill-slate-950" />
            <span>APP 5 • TYPE2EARN INFORMATION PORTAL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Make Real Money By Typing Information
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Transcribe high-value quantum reports, financial intelligence, and technical dossiers. Earn cash rewards for every document typed. Sign up now to unlock your typing dashboard!
          </p>
        </div>

        {/* Pricing & Subscription Plan Selection ($2/mo, $44/yr, $100 Lifetime) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Monthly $2 */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
              selectedPlan === 'monthly'
                ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">MONTHLY ACCESS</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">$2</span>
                <span className="text-xs text-slate-400 font-sans">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans">
                Full access to standard information typing tasks and monthly payout withdrawals.
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Standard Typing Payouts ($0.50 - $1.50)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Unlock Basic Info Vault</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>PayPal / Bank Cashout</span>
              </div>
            </div>

            <div className="mt-5 text-center py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-cyan-300">
              {selectedPlan === 'monthly' ? 'SELECTED PLAN ✓' : 'SELECT $2/MONTH'}
            </div>
          </div>

          {/* Annual $44 */}
          <div
            onClick={() => setSelectedPlan('annual')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
              selectedPlan === 'annual'
                ? 'bg-slate-900 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
              POPULAR (SAVE 25%)
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">ANNUAL PASS</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">$44</span>
                <span className="text-xs text-slate-400 font-sans">/ year</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans">
                1.5x earnings multiplier on all typing tasks and full access to intelligence dossiers.
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1.5x Cash Reward Multiplier</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlock Advanced Info Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Priority Instant Cashouts</span>
              </div>
            </div>

            <div className="mt-5 text-center py-2 bg-emerald-950 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300">
              {selectedPlan === 'annual' ? 'SELECTED PLAN ✓' : 'SELECT $44/YEAR'}
            </div>
          </div>

          {/* Premium Lifetime $100 */}
          <div
            onClick={() => setSelectedPlan('premium')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
              selectedPlan === 'premium'
                ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.02]'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
              VIP LIFETIME
            </div>

            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">PREMIUM PASS</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">$100</span>
                <span className="text-xs text-slate-400 font-sans">/ lifetime</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans">
                2x maximum cash rewards, all classified vaults unlocked forever, and zero payout fees.
              </p>
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2x Double Cash Payout Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Unlock ALL Classified Vaults</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero Withdrawal Fees Forever</span>
              </div>
            </div>

            <div className="mt-5 text-center py-2 bg-amber-950 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300">
              {selectedPlan === 'premium' ? 'SELECTED PLAN ✓' : 'SELECT $100 LIFETIME'}
            </div>
          </div>

        </div>

        {/* Interactive Signup Form */}
        <form onSubmit={handleGateSignupSubmit} className="bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> CREATE YOUR TYPE2EARN ACCOUNT & UNLOCK ACCESS
            </h3>
            <span className="text-xs text-slate-400">Selected: <strong className="text-white uppercase">{selectedPlan} PLAN</strong></span>
          </div>

          {gateError && (
            <div className="bg-rose-950/80 border border-rose-500/40 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{gateError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">FULL NAME</label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-emerald-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">EMAIL ADDRESS</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-emerald-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">PASSWORD</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-emerald-400 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold">CASHOUT PAYOUT METHOD</label>
              <div className="grid grid-cols-3 gap-2">
                {(['PayPal', 'Crypto USDT', 'Bank Wire'] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setPayoutMethod(m)}
                    className={`py-2 rounded-xl border text-[11px] font-bold ${
                      payoutMethod === m ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit & Quick Guest Demo */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20"
            >
              <ShieldCheck className="w-5 h-5 fill-slate-950" />
              <span>SIGN UP & UNLOCK TYPING PORTAL ({selectedPlan === 'premium' ? '$100' : selectedPlan === 'annual' ? '$44/yr' : '$2/mo'})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const demoUser: UserAccount = {
                  id: 'usr_demo_101',
                  name: 'Commander Raven',
                  email: 'masravenhoth@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  membershipTier: 'Lifetime Premium',
                  preferredCashoutMethod: 'PayPal',
                  cashoutAddress: 'masravenhoth@gmail.com',
                  joinedDate: 'August 2026',
                  isLoggedIn: true,
                  subscriptionPlan: 'premium'
                };
                onLogin(demoUser);
              }}
              className="px-5 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>QUICK DEMO LOGIN</span>
            </button>
          </div>
        </form>

      </div>
    );
  }

  // LOGGED-IN TYPE2EARN PORTAL APPLICATION
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-mono shadow-2xl space-y-6 p-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
              APP 5 • TYPE2EARN INFO PORTAL
            </span>
            <h2 className="text-xl font-black text-white">Typing Intelligence & Cash Rewards Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Welcome back, <strong className="text-emerald-400">{currentUser.name}</strong> ({currentUser.subscriptionPlan?.toUpperCase() || 'SUBSCRIBED'} PASS)
          </p>
        </div>

        {/* Live Wallet Cash Balance & Withdrawal */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              $
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">TYPING BALANCE</div>
              <div className="text-base font-black text-emerald-400">${totalTypingEarnedUSD.toFixed(2)} USD</div>
            </div>
          </div>

          <button
            onClick={onOpenCashoutModal}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <CreditCard className="w-4 h-4 fill-slate-950" />
            <span>CASHOUT CASH</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('typing_arena')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'typing_arena'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Typing Arena ($ Rewards)</span>
        </button>

        <button
          onClick={() => setActiveTab('info_vault')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'info_vault'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Unlocked Info Vault ({snippets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings_payout')}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'earnings_payout'
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Earnings & History</span>
        </button>
      </div>

      {/* ----------------- TAB 1: TYPING ARENA ----------------- */}
      {activeTab === 'typing_arena' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Typing Test Canvas (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Active Document Header */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-emerald-400 font-bold px-2.5 py-0.5 rounded uppercase">
                  {currentSnippet.category}
                </span>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-bold">REWARD: <strong className="text-emerald-400">${currentSnippet.rewardUSD.toFixed(2)} USD</strong></span>
                  <span className="text-slate-400 font-bold">DIFFICULTY: <strong className="text-amber-400">{currentSnippet.difficulty}</strong></span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white">{currentSnippet.title}</h3>
              <p className="text-xs text-slate-400 font-sans">{currentSnippet.summaryText}</p>
            </div>

            {/* Live Metrics HUD */}
            <div className="grid grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs">
              <div>
                <div className="text-slate-500 font-bold">WPM SPEED</div>
                <div className="text-xl font-black text-cyan-400">{wpm}</div>
              </div>

              <div>
                <div className="text-slate-500 font-bold">ACCURACY</div>
                <div className={`text-xl font-black ${accuracyPercent >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {accuracyPercent}%
                </div>
              </div>

              <div>
                <div className="text-slate-500 font-bold">TIME ELAPSED</div>
                <div className="text-xl font-black text-white">{elapsedSeconds}s</div>
              </div>

              <div>
                <div className="text-slate-500 font-bold">POTENTIAL CASH</div>
                <div className="text-xl font-black text-emerald-400">${currentSnippet.rewardUSD.toFixed(2)}</div>
              </div>
            </div>

            {/* Target Information Text to Type */}
            <div className="bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl space-y-4 relative leading-relaxed">
              <div className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>TARGET TEXT TO TRANSCRIBE</span>
                <button
                  onClick={() => setSoundEnabled((s) => !s)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  {soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND MUTED'}
                </button>
              </div>

              {/* Character by character rendering */}
              <div className="text-base font-mono tracking-wide p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 min-h-[100px]">
                {currentSnippet.textToType.split('').map((char, idx) => {
                  let colorClass = 'text-slate-500';
                  if (idx < typedInput.length) {
                    colorClass = typedInput[idx] === char ? 'text-emerald-400 bg-emerald-950/60 font-bold' : 'text-rose-400 bg-rose-950/80 font-bold underline';
                  } else if (idx === typedInput.length) {
                    colorClass = 'text-cyan-400 underline font-bold animate-pulse';
                  }

                  return (
                    <span key={idx} className={colorClass}>
                      {char}
                    </span>
                  );
                })}
              </div>

              {/* Input Area */}
              {!isCompleted ? (
                <div className="space-y-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={typedInput}
                    onChange={handleInputChange}
                    placeholder="Start typing the information text above to earn cash..."
                    className="w-full bg-slate-900 border-2 border-cyan-500/50 rounded-2xl px-4 py-3.5 text-sm text-white focus:border-cyan-400 outline-none font-mono"
                    autoFocus
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Progress: {typedInput.length} / {currentSnippet.textToType.length} characters</span>
                    <button
                      onClick={handleResetTyping}
                      className="text-cyan-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESET TYPING</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/80 border-2 border-emerald-500/50 p-6 rounded-2xl text-center space-y-3 animate-in fade-in">
                  <Award className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-black text-white">TYPING TASK COMPLETED!</h4>
                  <p className="text-xs text-emerald-300">
                    You earned <strong className="text-white text-base">${currentSnippet.rewardUSD.toFixed(2)} USD</strong> for transcribing this information snippet at {wpm} WPM!
                  </p>

                  <button
                    onClick={handleResetTyping}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-lg cursor-pointer"
                  >
                    TYPE AGAIN FOR MORE CASH
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Snippets List Selector Sidebar */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> INFORMATION JOBS LIBRARY
            </h3>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
              {snippets.map((s) => {
                const isSelected = currentSnippet.id === s.id;
                const isUnlocked = unlockedSnippetIds.includes(s.id) || !s.isLocked || currentUser.subscriptionPlan === 'premium';

                return (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSnippet(s)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">{s.category}</span>
                      <span className="text-xs font-black text-emerald-400">+${s.rewardUSD.toFixed(2)}</span>
                    </div>

                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {!isUnlocked ? <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      <span className="truncate">{s.title}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{s.wordCount} words</span>
                      {!isUnlocked && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnlockSnippet(s);
                          }}
                          className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-bold hover:bg-amber-500 hover:text-slate-950"
                        >
                          Unlock ${s.unlockCostUSD}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ----------------- TAB 2: UNLOCKED INFO VAULT ----------------- */}
      {activeTab === 'info_vault' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>CLASSIFIED KNOWLEDGE & INFORMATION DATABASE</span>
            </h3>

            <div className="text-xs text-slate-400">
              Unlocked Reports: <strong className="text-emerald-400">{unlockedSnippetIds.length} / {snippets.length}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {snippets.map((s) => {
              const isUnlocked = unlockedSnippetIds.includes(s.id) || !s.isLocked || currentUser.subscriptionPlan === 'premium';

              return (
                <div key={s.id} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-900 border border-slate-800 text-cyan-400 px-2.5 py-0.5 rounded font-bold uppercase">
                      {s.category}
                    </span>

                    <span className="text-xs font-black text-emerald-400">+${s.rewardUSD.toFixed(2)} / Task</span>
                  </div>

                  <h4 className="text-sm font-black text-white">{s.title}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{s.summaryText}</p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          setCurrentSnippet(s);
                          setActiveTab('typing_arena');
                          handleResetTyping();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>TYPE THIS REPORT NOW</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnlockSnippet(s)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Lock className="w-3.5 h-3.5 fill-slate-950" />
                        <span>UNLOCK DOSSIER (${s.unlockCostUSD})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------- TAB 3: EARNINGS & PAYOUT HISTORY ----------------- */}
      {activeTab === 'earnings_payout' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl">
              <div className="text-xs text-slate-500 font-bold uppercase">LIFETIME TYPING EARNED</div>
              <div className="text-3xl font-black text-emerald-400 mt-1">${totalTypingEarnedUSD.toFixed(2)} USD</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl">
              <div className="text-xs text-slate-500 font-bold uppercase">TASKS COMPLETED</div>
              <div className="text-3xl font-black text-white mt-1">{sessionHistory.length} Snippets</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl">
              <div className="text-xs text-slate-500 font-bold uppercase">CASHOUT METHOD</div>
              <div className="text-3xl font-black text-cyan-400 mt-1">{currentUser.preferredCashoutMethod || 'PayPal'}</div>
            </div>
          </div>

          {/* Session History Table */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> TYPING SESSIONS LOG
            </h4>

            {sessionHistory.length === 0 ? (
              <p className="text-xs text-slate-500 font-sans italic py-4">No typing tasks completed in this session yet. Complete your first information snippet in the Typing Arena to see payouts here!</p>
            ) : (
              <div className="space-y-2">
                {sessionHistory.map((res) => (
                  <div key={res.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{res.snippetTitle}</div>
                      <div className="text-[10px] text-slate-500">{res.completedAt} • {res.wpm} WPM • {res.accuracyPercent}% Accuracy</div>
                    </div>
                    <div className="font-black text-emerald-400">+${res.earnedUSD.toFixed(2)} USD</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
