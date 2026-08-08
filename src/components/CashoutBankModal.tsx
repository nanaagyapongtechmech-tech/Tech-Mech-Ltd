import React, { useState } from 'react';
import { WalletState, CashoutTransaction } from '../types';
import { X, DollarSign, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard, Wallet, CheckCircle2, Building, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';

interface CashoutBankModalProps {
  wallet: WalletState;
  onClose: () => void;
  onCashout: (amountAeth: number, method: 'PayPal' | 'Crypto USDT' | 'Bank Wire', account: string) => void;
  onDeposit: (amountUSD: number) => void;
}

export const CashoutBankModal: React.FC<CashoutBankModalProps> = ({
  wallet,
  onClose,
  onCashout,
  onDeposit
}) => {
  const [mode, setMode] = useState<'withdraw' | 'deposit' | 'history'>('withdraw');
  const [withdrawAmountAeth, setWithdrawAmountAeth] = useState<number>(5000); // 5,000 AETH = $50.00 USD
  const [payoutMethod, setPayoutMethod] = useState<'PayPal' | 'Crypto USDT' | 'Bank Wire'>('PayPal');
  const [payoutAccount, setPayoutAccount] = useState<string>(wallet.payoutAccount);
  const [depositAmountUSD, setDepositAmountUSD] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState(false);

  const withdrawValueUSD = withdrawAmountAeth * wallet.exchangeRateUSDPerAeth;

  const handleExecuteCashout = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmountAeth <= 0 || withdrawAmountAeth > wallet.aethCredits) {
      alert('Invalid withdrawal amount or insufficient AETH credits!');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onCashout(withdrawAmountAeth, payoutMethod, payoutAccount);
      setIsProcessing(false);
      alert(`✅ CASHOUT SUCCESSFUL! $${withdrawValueUSD.toFixed(2)} USD transferred to ${payoutMethod} (${payoutAccount}). Transaction Hash generated.`);
    }, 1500);
  };

  const handleExecuteDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmountUSD <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      onDeposit(depositAmountUSD);
      setIsProcessing(false);
      alert(`🎉 Deposit successful! Purchased ${depositAmountUSD / wallet.exchangeRateUSDPerAeth} AETH Credits for $${depositAmountUSD.toFixed(2)} USD.`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto font-mono shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Galactic Currency Exchange & Bank</h2>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED REAL CURRENCY CASHOUT GATEWAY
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

        {/* Balance Card Banner */}
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/40 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">WALLET CREDIT BALANCE</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-white">{wallet.aethCredits.toLocaleString()}</span>
                <span className="text-xs font-bold text-cyan-400">AETH Credits</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-emerald-400 font-bold">
                  ≈ ${(wallet.aethCredits * wallet.exchangeRateUSDPerAeth).toFixed(2)} USD Real Value
                </span>
                <span className="text-[10px] text-slate-500">| 1 AETH = $0.01 USD</span>
              </div>
            </div>

            {/* Lifetime earnings */}
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">LIFETIME CASHOUT EARNINGS</span>
              <p className="text-xl font-black text-amber-400 mt-1">${wallet.lifetimeEarningsUSD.toFixed(2)} USD</p>
              <span className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                Verified Payouts
              </span>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setMode('withdraw')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'withdraw' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>CASHOUT TO REAL MONEY</span>
            </button>

            <button
              onClick={() => setMode('deposit')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'deposit' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>BUY AETH CREDITS</span>
            </button>

            <button
              onClick={() => setMode('history')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'history' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>LEDGER HISTORY</span>
            </button>
          </div>

          {/* MODE 1: CASHOUT WITHDRAWAL */}
          {mode === 'withdraw' && (
            <form onSubmit={handleExecuteCashout} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Select AETH Amount to Cash Out</label>
                <div className="relative">
                  <input
                    type="number"
                    max={wallet.aethCredits}
                    value={withdrawAmountAeth}
                    onChange={(e) => setWithdrawAmountAeth(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setWithdrawAmountAeth(wallet.aethCredits)}
                    className="absolute right-3 top-2.5 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Conversion Output Box */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-400">Real Money Payout Value:</span>
                <span className="text-lg font-black text-emerald-400">${withdrawValueUSD.toFixed(2)} USD</span>
              </div>

              {/* Payout Method */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 block">Payout Gateway Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'PayPal', label: 'PayPal Instant', icon: '💳' },
                    { id: 'Crypto USDT', label: 'Crypto (USDT/ETH)', icon: '🪙' },
                    { id: 'Bank Wire', label: 'Bank Wire (ACH)', icon: '🏛️' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayoutMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        payoutMethod === m.id
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payout Account Address */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">Payout Account / Wallet Address</label>
                <input
                  type="text"
                  value={payoutAccount}
                  onChange={(e) => setPayoutAccount(e.target.value)}
                  placeholder={payoutMethod === 'PayPal' ? 'PayPal Email Address' : 'Wallet or IBAN Number'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>PROCESSING REAL MONEY TRANSFER...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="w-4 h-4" />
                    <span>CONFIRM REAL CASHOUT (${withdrawValueUSD.toFixed(2)} USD)</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 2: BUY CREDITS */}
          {mode === 'deposit' && (
            <form onSubmit={handleExecuteDeposit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Select Purchase Amount ($ USD)</label>
                <input
                  type="number"
                  min={10}
                  value={depositAmountUSD}
                  onChange={(e) => setDepositAmountUSD(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-500/30 flex items-center justify-between text-xs">
                <span className="text-slate-400">You Will Receive:</span>
                <span className="text-lg font-black text-cyan-400">
                  {(depositAmountUSD / wallet.exchangeRateUSDPerAeth).toLocaleString()} AETH Credits
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4" />
                )}
                <span>BUY CREDITS NOW</span>
              </button>
            </form>
          )}

          {/* MODE 3: HISTORY LEDGER */}
          {mode === 'history' && (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {wallet.history.map((tx) => (
                <div key={tx.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{tx.type}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{tx.timestamp} • {tx.method}</p>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold ${tx.amountAeth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.amountAeth > 0 ? '+' : ''}{tx.amountAeth.toLocaleString()} AETH
                    </p>
                    <p className="text-[10px] text-slate-400">${Math.abs(tx.amountUSD).toFixed(2)} USD</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
