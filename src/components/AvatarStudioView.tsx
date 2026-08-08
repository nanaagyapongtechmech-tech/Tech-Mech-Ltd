import React from 'react';
import { UserAvatarState, AvatarFashionItem } from '../types';
import { FASHION_CATALOG } from '../data/metaverseData';
import { Shirt, CheckCircle2, Sparkles, Shield, User, Crown, Flame, Unlock } from 'lucide-react';

interface AvatarStudioViewProps {
  userAvatar: UserAvatarState;
  onUpdateAvatar: (updated: UserAvatarState) => void;
  onToggleEquipItem: (itemId: string) => void;
  userAethCredits: number;
}

export const AvatarStudioView: React.FC<AvatarStudioViewProps> = ({
  userAvatar,
  onUpdateAvatar,
  onToggleEquipItem,
  userAethCredits
}) => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-cyan-950 border border-purple-500/30 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2.5 py-1 rounded-full bg-purple-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase">
              SECOND LIFE & AVAKIN STYLE STUDIO
            </span>
            <span className="text-xs text-purple-300">AVATAR CUSTOMIZATION & FASHION BOUTIQUE</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Cyber Avatar Fitting & Apparel</h2>
          <p className="text-xs text-slate-300">
            Customize your 3D persona, unlock legendary cyber wings & visors, and flex in the 3D Social Lounge!
          </p>
        </div>

        <div className="bg-slate-950/80 border border-purple-500/30 p-3 rounded-2xl flex items-center gap-3 font-mono text-xs">
          <Crown className="w-5 h-5 text-amber-400" />
          <div>
            <div className="font-bold text-white">REPUTATION SCORE</div>
            <div className="text-purple-400 font-extrabold">{userAvatar.reputationScore} POINTS</div>
          </div>
        </div>
      </div>

      {/* Main Avatar Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Avatar Preview Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 font-mono space-y-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="relative h-64 bg-gradient-to-b from-purple-950/40 to-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden">
              {/* Glowing Avatar Persona Icon */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-4xl shadow-2xl border-2 border-cyan-400 animate-pulse">
                👤
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-extrabold text-white text-base">{userAvatar.name}</h3>
                <p className="text-xs text-cyan-400 mt-0.5">{userAvatar.title}</p>
              </div>

              <span className="absolute top-3 right-3 text-[10px] bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-800 font-bold">
                POSE: {userAvatar.equippedPose}
              </span>
            </div>

            {/* Profile Form Details */}
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Avatar Handle / Display Name</label>
                <input
                  type="text"
                  value={userAvatar.name}
                  onChange={(e) => onUpdateAvatar({ ...userAvatar, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Title & Role</label>
                <input
                  type="text"
                  value={userAvatar.title}
                  onChange={(e) => onUpdateAvatar({ ...userAvatar, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300">
            ✨ Equipping Rare & Legendary items boosts your social lounge charisma and unlocks VIP DJ access!
          </div>
        </div>

        {/* Fashion & Apparel Catalog Grid */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 font-mono space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Shirt className="w-4 h-4" /> APPAREL & FASHION SHOP
            </h3>
            <span className="text-xs text-amber-400">CREDITS: {userAethCredits.toLocaleString()} AETH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FASHION_CATALOG.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-xs leading-tight">{item.name}</h4>
                      <span className="text-[10px] text-purple-400 font-bold">{item.category} • {item.rarity}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-400">{item.priceAeth} AETH</span>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-tight">{item.bonusStat}</p>

                <button
                  onClick={() => onToggleEquipItem(item.id)}
                  className={`w-full py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    item.equipped
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
                  }`}
                >
                  {item.equipped ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>EQUIPPED ON AVATAR</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>EQUIP ITEM</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
