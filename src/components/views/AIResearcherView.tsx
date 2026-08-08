import React, { useState } from 'react';
import { AIRoleMode, AIMessage } from '../../types/lab';
import { askAIResearcher } from '../../utils/geminiClient';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';

const PERSONAS: AIRoleMode[] = [
  'Mathematician',
  'Physicist',
  'Engineer',
  'Philosopher',
  'Programmer',
  'Designer',
  'Skeptic',
  'Researcher'
];

export const AIResearcherView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AIRoleMode>('Mathematician');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      mode: 'Mathematician',
      text: 'Greetings. I am your AI Mathematician assistant in THE EVERYTHING LAB. What equations, topological identity structures, or proofs shall we derive today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: AIMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await askAIResearcher({
      prompt: userMsg.text,
      mode: activeMode,
      context: 'Universal Automation, Universal Identity Mathematics, and Theoretical Physics'
    });

    const aiMsg: AIMessage = {
      id: 'm-ai-' + Date.now(),
      sender: 'ai',
      mode: activeMode,
      text: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            AI RESEARCHER • MULTI-PERSONA COGNITIVE ASSISTANT
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">AI Scientific & Mathematical Partner</h1>
        </div>

        {/* Persona Selectors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {PERSONAS.map((p) => (
            <button
              key={p}
              onClick={() => setActiveMode(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                activeMode === p
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-3xl ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`p-2 rounded-xl shrink-0 h-8 w-8 flex items-center justify-center font-bold text-xs ${
              m.sender === 'user' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400 border border-slate-700'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl space-y-1 text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-cyan-600 text-slate-950 font-medium'
                : 'bg-slate-950 border border-slate-800 text-slate-200'
            }`}>
              {m.mode && m.sender === 'ai' && (
                <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase pb-1 border-b border-slate-800">
                  {m.mode} PERSPECTIVE
                </div>
              )}
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-[9px] font-mono text-slate-500 text-right">{m.timestamp}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 animate-pulse p-2">
            <Sparkles className="w-4 h-4" />
            <span>AI {activeMode} is processing higher-dimensional tensor formulas...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask the ${activeMode}... (e.g., "Derive energy density for Casimir plate distance 10nm")`}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
