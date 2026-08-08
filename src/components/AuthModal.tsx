import React, { useState } from 'react';
import { UserAccount, WalletState } from '../types';
import {
  X,
  User,
  Mail,
  Lock,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  CreditCard,
  Building,
  Key,
  UserPlus,
  LogIn
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogin: (user: UserAccount) => void;
  onLogout: () => void;
  onSignup: (newUser: UserAccount) => void;
  wallet: WalletState;
  onOpenCashoutModal: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onSignup,
  wallet,
  onOpenCashoutModal
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(currentUser?.isLoggedIn ? 'login' : 'signup');

  // Form states for login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states for signup
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMethod, setSignupMethod] = useState<'PayPal' | 'Crypto USDT' | 'Bank Wire'>('PayPal');
  const [signupAddress, setSignupAddress] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(PRESET_AVATARS[0]);

  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setMessage('Please enter both email and password.');
      return;
    }

    const loggedUser: UserAccount = {
      id: `usr_${Date.now()}`,
      name: loginEmail.split('@')[0] || 'Aether Pilot',
      email: loginEmail,
      avatar: PRESET_AVATARS[0],
      membershipTier: 'Verified Creator',
      preferredCashoutMethod: 'PayPal',
      cashoutAddress: loginEmail,
      joinedDate: 'August 2026',
      isLoggedIn: true
    };

    onLogin(loggedUser);
    setMessage(`✅ Welcome back, ${loggedUser.name}!`);
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1000);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserAccount = {
      id: 'usr_demo_101',
      name: 'Commander Raven',
      email: 'masravenhoth@gmail.com',
      avatar: PRESET_AVATARS[0],
      membershipTier: 'Executive Pioneer',
      preferredCashoutMethod: 'PayPal',
      cashoutAddress: 'masravenhoth@gmail.com',
      joinedDate: 'August 2026',
      isLoggedIn: true
    };

    onLogin(demoUser);
    setMessage(`🎉 Logged in as Demo User: ${demoUser.name}`);
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1000);
  };

  const handleExecuteSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      setMessage('Please fill in all required sign up fields.');
      return;
    }

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      name: signupName,
      email: signupEmail,
      avatar: selectedAvatar,
      membershipTier: 'Verified Creator',
      preferredCashoutMethod: signupMethod,
      cashoutAddress: signupAddress || signupEmail,
      joinedDate: 'August 2026',
      isLoggedIn: true
    };

    onSignup(newUser);
    setMessage(`🎉 Account created successfully! Welcome ${newUser.name}.`);
    setTimeout(() => {
      setMessage(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#090D16] border-2 border-cyan-500/40 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl font-mono relative">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-lg">
              <User className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                {currentUser?.isLoggedIn ? 'Account & Cashout Profile' : 'Aether Identity & Auth'}
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {currentUser?.isLoggedIn
                  ? 'Manage your account settings, wallet, and cashout preferences.'
                  : 'Sign up or login to access instant real money cashouts across all 3 apps.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-full border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {message && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs text-center font-bold animate-in zoom-in-95">
              {message}
            </div>
          )}

          {/* IF CURRENTLY LOGGED IN: DISPLAY USER PROFILE CARD */}
          {currentUser && currentUser.isLoggedIn ? (
            <div className="space-y-5 font-sans">
              
              {/* User Identity Card */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-2xl border-2 border-cyan-500/50 object-cover shadow-lg"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{currentUser.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-3 h-3 text-cyan-400" /> {currentUser.membershipTier}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
                  <p className="text-[11px] text-slate-500 font-mono">Member Since: {currentUser.joinedDate}</p>
                </div>
              </div>

              {/* Wallet Cashout Direct Action Card */}
              <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/40 rounded-2xl font-mono space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">AVAILABLE CASHOUT BALANCE</span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Instant Payout Verified
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-white">{wallet.aethCredits.toLocaleString()}</span>
                    <span className="text-xs text-cyan-400 ml-1.5">AETH Credits</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-emerald-400">
                      ${(wallet.aethCredits * wallet.exchangeRateUSDPerAeth).toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Direct Cash Out Button */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCashoutModal();
                    }}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>CASH OUT REAL FUNDS NOW</span>
                  </button>
                </div>
              </div>

              {/* Preferred Cashout Details */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Preferred Payout Gateway:</span>
                  <span className="text-white font-bold">{currentUser.preferredCashoutMethod}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Payout Address / Email:</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">{currentUser.cashoutAddress}</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  onLogout();
                  setMessage('Signed out successfully.');
                  setTimeout(() => setMessage(null), 1200);
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-rose-950 hover:border-rose-800 border border-slate-800 text-slate-300 hover:text-rose-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <LogOut className="w-4 h-4" />
                <span>SIGN OUT OF ACCOUNT</span>
              </button>
            </div>
          ) : (
            /* IF LOGGED OUT: TAB SWITCHER (SIGN UP vs LOGIN) */
            <div className="space-y-5">
              
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 font-mono">
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'signup'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>CREATE ACCOUNT</span>
                </button>

                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === 'login'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>LOG IN</span>
                </button>
              </div>

              {/* TAB 1: SIGN UP FORM */}
              {activeTab === 'signup' && (
                <form onSubmit={handleExecuteSignup} className="space-y-4 font-mono">
                  
                  {/* Name Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Full Name / Display Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Commander Raven"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="e.g. user@domain.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  {/* Preferred Cashout Method Selection */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Preferred Cash Out Gateway</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'PayPal', label: 'PayPal', icon: '💳' },
                        { id: 'Crypto USDT', label: 'Crypto USDT', icon: '🪙' },
                        { id: 'Bank Wire', label: 'Bank Wire', icon: '🏛️' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSignupMethod(m.id as any)}
                          className={`p-2.5 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            signupMethod === m.id
                              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span>{m.icon}</span>
                          <span className="text-[11px]">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payout Address */}
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Payout Account Address / Email</label>
                    <input
                      type="text"
                      value={signupAddress}
                      onChange={(e) => setSignupAddress(e.target.value)}
                      placeholder={signupMethod === 'PayPal' ? 'PayPal Email Address' : 'Wallet Address or Bank Account #'}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>CREATE ACCOUNT & UNLOCK CASHOUT</span>
                  </button>
                </form>
              )}

              {/* TAB 2: LOGIN FORM */}
              {activeTab === 'login' && (
                <form onSubmit={handleExecuteLogin} className="space-y-4 font-mono">
                  
                  {/* Quick Demo Login Option */}
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-2">
                    <div className="text-xs">
                      <span className="text-slate-300 font-bold block">Quick Demo Login</span>
                      <span className="text-[10px] text-slate-400 font-sans">Instant access with 12,500 AETH ($125 USD) ready to cash out</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow cursor-pointer transition-all shrink-0"
                    >
                      Demo Login
                    </button>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="masravenhoth@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>LOG IN TO ACCOUNT</span>
                  </button>
                </form>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
