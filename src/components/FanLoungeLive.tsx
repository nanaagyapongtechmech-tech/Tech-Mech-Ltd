import React, { useState } from 'react';
import { LiveChatMessage } from '../types';
import {
  Tv,
  Send,
  Heart,
  DollarSign,
  Radio,
  Users,
  Award,
  Sparkles,
  MessageSquare,
  Gift,
  Flame,
  Star
} from 'lucide-react';

interface FanLoungeLiveProps {
  chatMessages: LiveChatMessage[];
  onSendMessage: (text: string, tipAmount?: number) => void;
}

export const FanLoungeLive: React.FC<FanLoungeLiveProps> = ({
  chatMessages,
  onSendMessage
}) => {
  const [chatInput, setChatInput] = useState('');
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(10);
  const [pollVotes, setPollVotes] = useState({ option1: 184, option2: 342, option3: 95 });

  const handleSend = () => {
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  const handleSendTip = () => {
    onSendMessage(`Tipped ${selectedTip} SoundPulse Gems! 💎🔥`, selectedTip);
    setTipModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Live Stage Stream & Fan Lounge Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-lg">LIVE STAGE & FAN LOUNGE</h2>
              <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                LIVE STREAM
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive live stream, fan chat, artist tipping & VIP Q&A
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400 hidden sm:block">
          <span className="text-cyan-400 font-bold">1,842</span> Fans Online
        </div>
      </div>

      {/* Main Grid: Stream Viewer (Left) + Live Chat & Tipping (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Animated Virtual Stage Player */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="relative bg-slate-950 border-2 border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl aspect-video flex flex-col justify-between p-6">
            
            {/* Background Stage Lights Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/80 via-slate-950 to-slate-950 opacity-90" />
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80')` }} />

            {/* Top Stage Overlay */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/40 text-cyan-300">
                <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>MAYA VANCE & JAX THORNE - LIVE JAM SESSION</span>
              </div>

              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/60 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                1080p 60FPS STAGE STREAM
              </span>
            </div>

            {/* Center Visualizer Animation */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 my-auto">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] animate-pulse">
                <Tv className="w-10 h-10 text-cyan-300" />
              </div>
              <div className="text-center space-y-1 font-mono">
                <h3 className="text-white font-bold text-lg">AUDIO-VISUAL STAGE LIVE</h3>
                <p className="text-xs text-slate-300">Turn up your speakers or headphones for full spatial sound</p>
              </div>
            </div>

            {/* Bottom Stream Controls */}
            <div className="relative z-10 flex items-center justify-between font-mono text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTipModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-lg transition-all cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>TIP ARTIST GEMS</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>1,842 Fans Connected</span>
              </div>
            </div>

          </div>

          {/* Live Artist Poll / Q&A Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                <Star className="w-4 h-4" /> LIVE ARTIST POLL FOR NEXT SONG
              </span>
              <span className="text-[10px] text-slate-400">Voting Ends in 2 mins</span>
            </div>

            <h4 className="text-white font-bold text-sm">Which style should Maya & Jax jam next on stage?</h4>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setPollVotes({ ...pollVotes, option1: pollVotes.option1 + 1 })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <span>A) 80s Cyberpunk Synthwave Solo</span>
                <span className="text-cyan-400 font-bold">{pollVotes.option1} Votes</span>
              </button>

              <button
                onClick={() => setPollVotes({ ...pollVotes, option2: pollVotes.option2 + 1 })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <span>B) Heavy Progressive Metal Riffing</span>
                <span className="text-cyan-400 font-bold">{pollVotes.option2} Votes</span>
              </button>

              <button
                onClick={() => setPollVotes({ ...pollVotes, option3: pollVotes.option3 + 1 })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-slate-200 transition-all cursor-pointer"
              >
                <span>C) Acoustic Lo-Fi Ballad Jam</span>
                <span className="text-cyan-400 font-bold">{pollVotes.option3} Votes</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Real-time Live Fan Chat & Tipping Log */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between h-[520px]">
          
          {/* Chat Header */}
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" /> FAN STAGE CHAT
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              SLOW MODE: OFF
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 my-3 pr-1 font-mono text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2.5 rounded-xl border space-y-1 ${
                  msg.tipAmount
                    ? 'bg-gradient-to-r from-amber-950/80 to-slate-950 border-amber-500/80'
                    : 'bg-slate-950/80 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <img
                      src={msg.userAvatar}
                      alt={msg.userName}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="font-bold text-white">{msg.userName}</span>
                    {msg.userBadge && (
                      <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 rounded border border-cyan-800">
                        {msg.userBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500">{msg.timestamp}</span>
                </div>

                <p className="text-slate-200 text-xs font-sans pl-6">{msg.text}</p>

                {msg.tipAmount && (
                  <div className="text-[10px] text-amber-300 font-bold pl-6 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    SUPPORTER TIP: {msg.tipAmount} GEMS
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input & Tipping Trigger */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Say something to Maya & Jax..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tip Modal */}
      {tipModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 max-w-md w-full space-y-6 font-mono shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">SUPPORT THE ARTISTS</h3>
              <p className="text-xs text-slate-300">
                Send virtual SoundPulse Gems to support Maya Vance & Jax Thorne during their live performance
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 25, 50, 100, 250].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedTip(amount)}
                  className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    selectedTip === amount
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  💎 {amount} Gems
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setTipModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold"
              >
                CANCEL
              </button>
              <button
                onClick={handleSendTip}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-bold"
              >
                CONFIRM TIP ({selectedTip} GEMS)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
