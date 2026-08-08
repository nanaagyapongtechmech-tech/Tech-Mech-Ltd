import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe2,
  RefreshCw,
  Clock,
  PieChart,
  ShieldAlert,
  Wallet
} from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  priceUSD: number;
  change24h: number;
  volume24h: string;
  category: 'Galactic Energy' | 'Quantum Tech' | 'Space Mining' | 'Crypto AI';
  priceHistory: number[];
}

const INITIAL_ASSETS: Asset[] = [
  {
    symbol: 'AETH',
    name: 'Aether Nexus Core',
    priceUSD: 142.85,
    change24h: 12.4,
    volume24h: '$4.2B',
    category: 'Galactic Energy',
    priceHistory: [120, 125, 130, 128, 135, 140, 142.85]
  },
  {
    symbol: 'QCHIP',
    name: 'Quantum Logic Foundry',
    priceUSD: 890.10,
    change24h: -3.2,
    volume24h: '$1.8B',
    category: 'Quantum Tech',
    priceHistory: [920, 915, 910, 895, 900, 880, 890.10]
  },
  {
    symbol: 'MARS',
    name: 'Terraform Mars RealEstate',
    priceUSD: 45.20,
    change24h: 24.8,
    volume24h: '$890M',
    category: 'Space Mining',
    priceHistory: [32, 35, 38, 40, 42, 44, 45.20]
  },
  {
    symbol: 'NEBU',
    name: 'Nebula Liquid Fuel',
    priceUSD: 12.40,
    change24h: 0.8,
    volume24h: '$520M',
    category: 'Galactic Energy',
    priceHistory: [11.8, 12.0, 12.1, 12.3, 12.2, 12.4, 12.40]
  },
  {
    symbol: 'CYBER',
    name: 'CyberSynth Neural AI',
    priceUSD: 310.50,
    change24h: 8.9,
    volume24h: '$3.1B',
    category: 'Crypto AI',
    priceHistory: [280, 285, 290, 300, 298, 305, 310.50]
  }
];

export const AstroTraderMarket: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset>(INITIAL_ASSETS[0]);
  const [portfolioBalanceUSD, setPortfolioBalanceUSD] = useState<number>(10000);
  const [holdings, setHoldings] = useState<{ [symbol: string]: number }>({
    AETH: 25,
    MARS: 100
  });
  const [tradeAmount, setTradeAmount] = useState<string>('5');
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  // Price ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          const delta = (Math.random() - 0.48) * (asset.priceUSD * 0.015);
          const newPrice = Math.max(0.1, Number((asset.priceUSD + delta).toFixed(2)));
          const newHistory = [...asset.priceHistory.slice(1), newPrice];
          return {
            ...asset,
            priceUSD: newPrice,
            priceHistory: newHistory
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Synchronize selected asset price
  useEffect(() => {
    const match = assets.find((a) => a.symbol === selectedAsset.symbol);
    if (match) setSelectedAsset(match);
  }, [assets]);

  const handleBuy = () => {
    const qty = parseFloat(tradeAmount);
    if (isNaN(qty) || qty <= 0) return;
    const totalCost = qty * selectedAsset.priceUSD;

    if (portfolioBalanceUSD < totalCost) {
      setTradeMessage('Insufficient balance for this order!');
      setTimeout(() => setTradeMessage(null), 3000);
      return;
    }

    setPortfolioBalanceUSD((prev) => prev - totalCost);
    setHoldings((prev) => ({
      ...prev,
      [selectedAsset.symbol]: (prev[selectedAsset.symbol] || 0) + qty
    }));

    setTradeMessage(`Bought ${qty} ${selectedAsset.symbol} for $${totalCost.toFixed(2)}`);
    setTimeout(() => setTradeMessage(null), 3500);
  };

  const handleSell = () => {
    const qty = parseFloat(tradeAmount);
    if (isNaN(qty) || qty <= 0) return;
    const currentQty = holdings[selectedAsset.symbol] || 0;

    if (currentQty < qty) {
      setTradeMessage(`You only hold ${currentQty} ${selectedAsset.symbol}!`);
      setTimeout(() => setTradeMessage(null), 3000);
      return;
    }

    const totalReturn = qty * selectedAsset.priceUSD;
    setPortfolioBalanceUSD((prev) => prev + totalReturn);
    setHoldings((prev) => ({
      ...prev,
      [selectedAsset.symbol]: currentQty - qty
    }));

    setTradeMessage(`Sold ${qty} ${selectedAsset.symbol} for $${totalReturn.toFixed(2)}`);
    setTimeout(() => setTradeMessage(null), 3500);
  };

  // Calculate Total Portfolio Net Worth
  const totalHoldingsValueUSD = Object.entries(holdings).reduce((sum, [sym, qty]) => {
    const asset = assets.find((a) => a.symbol === sym);
    const quantity = Number(qty) || 0;
    return sum + (asset ? asset.priceUSD * quantity : 0);
  }, 0);

  const totalNetWorthUSD = portfolioBalanceUSD + totalHoldingsValueUSD;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 p-6 rounded-3xl border border-amber-800/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> APP 7 • ASTROTRADER 3D
            </span>
            <span className="text-xs text-slate-400 font-mono">LIVE MARKET ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Activity className="w-8 h-8 text-amber-400" />
            AstroTrader Galactic Stock Exchange
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Trade simulated inter-stellar stocks, quantum tokens, and terraforming commodities with real-time price tickers, order books, and portfolio analytics.
          </p>
        </div>

        {/* Portfolio Balance Card */}
        <div className="bg-slate-950/80 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">TOTAL NET WORTH</div>
            <div className="text-xl font-extrabold text-white font-mono">
              ${totalNetWorthUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span>Cash: ${portfolioBalanceUSD.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Ticker List */}
        <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-amber-400" />
              Galactic Markets
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE
            </span>
          </h3>

          <div className="space-y-2">
            {assets.map((asset) => {
              const isSelected = selectedAsset.symbol === asset.symbol;
              const isPositive = asset.change24h >= 0;
              const userQty = holdings[asset.symbol] || 0;

              return (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-500/60 shadow-lg'
                      : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white font-mono">{asset.symbol}</span>
                      {userQty > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                          Held: {userQty}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{asset.name}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-sm text-white font-mono">${asset.priceUSD.toFixed(2)}</div>
                    <div className={`text-[11px] font-mono font-bold flex items-center justify-end gap-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{isPositive ? '+' : ''}{asset.change24h}%</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center & Right Chart + Order Terminal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Interactive Sparkline Chart Card */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div>
                <div className="text-xs text-amber-400 font-mono font-bold uppercase">{selectedAsset.category}</div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">{selectedAsset.name} ({selectedAsset.symbol})</h3>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-white font-mono">${selectedAsset.priceUSD.toFixed(2)}</div>
                <div className="text-xs text-slate-400 font-mono">24h Vol: {selectedAsset.volume24h}</div>
              </div>
            </div>

            {/* Sparkline Canvas Simulation */}
            <div className="relative h-44 w-full bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 flex items-end justify-between gap-2">
              {selectedAsset.priceHistory.map((val, idx) => {
                const min = Math.min(...selectedAsset.priceHistory);
                const max = Math.max(...selectedAsset.priceHistory);
                const range = max - min || 1;
                const heightPercent = Math.max(15, Math.min(100, ((val - min) / range) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-amber-500/40 via-amber-400 to-amber-300 rounded-t transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[9px] text-slate-500 font-mono">${val.toFixed(1)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trade Execution Order Panel */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Execute Instant Order</span>
              <span className="text-slate-400 font-normal">Holding: <strong className="text-white">{holdings[selectedAsset.symbol] || 0}</strong> {selectedAsset.symbol}</span>
            </h4>

            {tradeMessage && (
              <div className="mb-3 p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-mono">
                {tradeMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">QUANTITY UNITS</label>
                <input
                  type="number"
                  min="1"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono block mb-1">TOTAL VALUE (EST.)</label>
                <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-sm text-amber-400 font-mono font-bold">
                  ${((parseFloat(tradeAmount) || 0) * selectedAsset.priceUSD).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 sm:pt-0">
                <button
                  onClick={handleBuy}
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase cursor-pointer transition-all shadow-md"
                >
                  Buy {selectedAsset.symbol}
                </button>
                <button
                  onClick={handleSell}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs uppercase cursor-pointer transition-all shadow-md"
                >
                  Sell {selectedAsset.symbol}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
