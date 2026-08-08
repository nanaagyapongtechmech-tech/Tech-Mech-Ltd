import React, { useState } from 'react';
import { MarketListing, MarketCategory } from '../types';
import { INITIAL_MARKET_LISTINGS } from '../data/metaverseData';
import { ShoppingBag, DollarSign, Filter, Search, CheckCircle2, Plus, Sparkles, Tag } from 'lucide-react';

interface GalacticMarketViewProps {
  listings: MarketListing[];
  userAethCredits: number;
  onBuyListing: (listing: MarketListing) => void;
  onAddListing: (newListing: MarketListing) => void;
}

export const GalacticMarketView: React.FC<GalacticMarketViewProps> = ({
  listings,
  userAethCredits,
  onBuyListing,
  onAddListing
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Listing Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState<MarketCategory>('Ships & Hulls');
  const [priceAethInput, setPriceAethInput] = useState<number>(5000);

  const categories = ['All', 'Ships & Hulls', 'Voxel Blueprints', 'Raw Space Ores', 'Avatar Fashion'];

  const filteredListings = listings.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newListing: MarketListing = {
      id: `list_${Date.now()}`,
      title: titleInput.trim(),
      category: categoryInput,
      priceAeth: priceAethInput,
      priceUSD: priceAethInput * 0.01,
      sellerName: 'Captain Nova Vance',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quantity: 1,
      rarity: 'Epic',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
      itemRefId: `ref_${Date.now()}`,
      createdTime: 'Just now',
      verifiedExchangeable: true
    };

    onAddListing(newListing);
    setIsModalOpen(false);
    setTitleInput('');
    alert(`🎉 Listed "${newListing.title}" on Galactic Marketplace for ${priceAethInput} AETH Credits ($${(priceAethInput * 0.01).toFixed(2)} USD)!`);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-500/30 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase">
              GALACTIC TRADE MARKET
            </span>
            <span className="text-xs text-cyan-400">P2P REAL CURRENCY EXCHANGE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Interstellar Marketplace & Order Book</h2>
          <p className="text-xs text-slate-300">
            Trade player-crafted Starships, Voxel Station Blueprints, Rare Ores, and Avatar Fashion for real money value!
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono shadow-lg transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>LIST ITEM FOR REAL CASHOUT</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ships, blueprints..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <span className="absolute top-3 left-3 text-[10px] bg-slate-950/90 text-cyan-400 font-bold px-2.5 py-1 rounded-full border border-cyan-800">
                  {item.category}
                </span>

                <span className="absolute top-3 right-3 text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED CASHOUT
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-white text-sm leading-snug">{item.title}</h3>

                <div className="flex items-center gap-2">
                  <img
                    src={item.sellerAvatar}
                    alt={item.sellerName}
                    className="w-5 h-5 rounded-full object-cover border border-slate-700"
                  />
                  <span className="text-[11px] text-slate-400 font-sans">{item.sellerName}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">PRICE IN CREDITS</span>
                    <span className="text-base font-black text-amber-400">{item.priceAeth.toLocaleString()} AETH</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">REAL USD VALUE</span>
                    <span className="text-sm font-black text-emerald-400">${item.priceUSD.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onBuyListing(item)}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 fill-slate-950" />
                <span>BUY LISTING NOW</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-md w-full p-6 font-mono space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">List Item on Marketplace</h3>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Titan Class Blueprint"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Market Category</label>
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Ships & Hulls">Ships & Hulls</option>
                  <option value="Voxel Blueprints">Voxel Blueprints</option>
                  <option value="Raw Space Ores">Raw Space Ores</option>
                  <option value="Avatar Fashion">Avatar Fashion</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Price (AETH Credits)</label>
                <input
                  type="number"
                  min={100}
                  value={priceAethInput}
                  onChange={(e) => setPriceAethInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-bold flex justify-between">
                <span>Real USD Value:</span>
                <span>${(priceAethInput * 0.01).toFixed(2)} USD</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  PUBLISH LISTING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
