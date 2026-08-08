import React, { useState } from 'react';
import { MomentPost, MomentComment } from '../types';
import {
  Heart,
  MessageSquare,
  Share2,
  MapPin,
  Tag,
  Volume2,
  Camera,
  Play,
  Send,
  Sparkles,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface MomentsFeedProps {
  moments: MomentPost[];
  onAddComment: (postId: string, commentText: string) => void;
  onLikePost: (postId: string) => void;
  onSelectMusician: (musicianId: string) => void;
  onOpenNewPost: () => void;
}

export const MomentsFeed: React.FC<MomentsFeedProps> = ({
  moments,
  onAddComment,
  onLikePost,
  onSelectMusician,
  onOpenNewPost
}) => {
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (text && text.trim()) {
      onAddComment(postId, text.trim());
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-28">
      
      {/* Moments Header & Create Moment Prompt */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg font-mono">BACKSTAGE MOMENTS</h2>
            <p className="text-xs text-slate-400 font-mono">
              Raw studio clips, gear setups, tour vlogs & fan interactions
            </p>
          </div>
        </div>

        <button
          onClick={onOpenNewPost}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold font-mono text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>POST MOMENT</span>
        </button>
      </div>

      {/* Moments Posts Stream */}
      <div className="space-y-6">
        {moments.map((post) => {
          const isCommentsOpen = activeCommentPostId === post.id;

          return (
            <div
              key={post.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all"
            >
              {/* Post Header */}
              <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
                <div
                  onClick={() => onSelectMusician(post.artistId)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={post.artistAvatar}
                    alt={post.artistName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400/60 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 font-mono">
                        {post.artistName}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">
                      {post.artistRole} • {post.timestamp}
                    </p>
                  </div>
                </div>

                {post.location && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/50">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                )}
              </div>

              {/* Media Container */}
              <div className="relative bg-slate-950 aspect-video flex items-center justify-center overflow-hidden">
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />

                {post.mediaType === 'audio_demo' && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.8)] cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      🎵 AUDIO DEMO / VOICE MEMO ATTACHED
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Tags */}
              <div className="p-5 space-y-3 font-sans">
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {post.caption}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-cyan-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Bar */}
              <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onLikePost(post.id)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>

                <button
                  onClick={() => alert(`Shared link for ${post.artistName}'s moment copied to clipboard!`)}
                  className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Drawer */}
              {isCommentsOpen && (
                <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {post.comments.length === 0 ? (
                      <p className="text-xs font-mono text-slate-500 text-center py-2">
                        No comments yet. Be the first musician or fan to comment!
                      </p>
                    ) : (
                      post.comments.map((comment) => (
                        <div key={comment.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <img
                                src={comment.userAvatar}
                                alt={comment.userName}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span className="font-bold text-white">{comment.userName}</span>
                              {comment.isMusician && (
                                <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 rounded border border-cyan-800 font-mono">
                                  MUSICIAN
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans pl-7">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      placeholder="Write a comment or reaction..."
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
