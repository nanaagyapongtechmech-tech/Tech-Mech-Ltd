import React, { useState } from 'react';
import {
  Code2,
  Play,
  Terminal,
  Sparkles,
  Copy,
  Check,
  Download,
  RotateCcw,
  Cpu,
  Layers,
  FileCode2,
  Bug,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface CodeSnippet {
  id: string;
  name: string;
  language: 'typescript' | 'python' | 'quantum' | 'rust';
  code: string;
  description: string;
}

const PRESET_SNIPPETS: CodeSnippet[] = [
  {
    id: 'quantum_grover',
    name: 'quantum_grover_search.qsharp',
    language: 'quantum',
    description: 'Quantum Grover Search Algorithm for hyper-fast database querying',
    code: `// Quantum Grover Search Algorithm (Q# / Aether NeuroCode)
namespace Aether.Quantum.Algorithms {
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Measurement;

    operation SearchDatabase(targetState : Int, qubits : Qubit[]) : Unit {
        use ancilla = Qubit();
        X(ancilla);
        H(ancilla);
        
        // Oracle Phase Inversion
        ApplyToEach(H, qubits);
        Controlled X(qubits, ancilla);
        
        // Diffusion Operator
        ApplyToEach(H, qubits);
        ApplyToEach(X, qubits);
        Controlled Z(qubits[0..Length(qubits)-2], qubits[Length(qubits)-1]);
        ApplyToEach(X, qubits);
        ApplyToEach(H, qubits);
        
        Reset(ancilla);
    }
}`
  },
  {
    id: 'neural_agent',
    name: 'aether_neural_agent.py',
    language: 'python',
    description: 'Autonomous AI Reinforcement Agent for Multi-Threaded Execution',
    code: `# Autonomous Neural Agent Core
import numpy as np
import time

class AetherNeuralAgent:
    def __init__(self, state_dim=128, action_dim=16, learning_rate=0.001):
        self.state_dim = state_dim
        self.action_dim = action_dim
        self.lr = learning_rate
        self.weights = np.random.randn(state_dim, action_dim) * 0.01

    def compute_policy(self, state_vector):
        logits = np.dot(state_vector, self.weights)
        exp_logits = np.exp(logits - np.max(logits))
        policy = exp_logits / np.sum(exp_logits)
        return policy

    def execute_step(self, obs):
        policy = self.compute_policy(obs)
        action = np.random.choice(self.action_dim, p=policy)
        confidence = float(np.max(policy))
        return action, confidence

# Quick Test Run
agent = AetherNeuralAgent()
obs = np.random.randn(128)
action, conf = agent.execute_step(obs)
print(f"[AETHER AI] Selected Action #{action} | Decision Confidence: {conf * 100:.2f}%")`
  },
  {
    id: 'wasm_engine',
    name: 'cyber_engine.rs',
    language: 'rust',
    description: 'High-performance WebAssembly Physics & Render Kernel in Rust',
    code: `// CyberEngine WebAssembly Core (Rust)
#[no_mangle]
pub extern "C" fn calculate_particle_field(delta_time: f32, count: u32) -> f32 {
    let mut energy_sum: f32 = 0.0;
    for i in 0..count {
        let velocity = (i as f32 * 0.15).sin();
        let acceleration = delta_time * 9.81;
        energy_sum += velocity * acceleration;
    }
    energy_sum
}

pub struct QuantumParticle {
    pub x: f32,
    pub y: f32,
    pub z: f32,
    pub charge: f32,
}

impl QuantumParticle {
    pub fn collapse(&mut self) {
        self.x *= 0.98;
        self.y *= 0.98;
        self.z *= 0.98;
    }
}`
  },
  {
    id: 'ts_matrix',
    name: 'aether_matrix.ts',
    language: 'typescript',
    description: 'TypeScript Hyper-Matrix Math Library with GPU Acceleration Bindings',
    code: `export class AetherMatrix {
  public data: Float32Array;
  public rows: number;
  public cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Float32Array(rows * cols);
  }

  public static identity(size: number): AetherMatrix {
    const mat = new AetherMatrix(size, size);
    for (let i = 0; i < size; i++) {
      mat.data[i * size + i] = 1.0;
    }
    return mat;
  }

  public multiplyScalar(scalar: number): void {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] *= scalar;
    }
  }
}`
  }
];

export const NeuroCodeIDE: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(PRESET_SNIPPETS[0]);
  const [codeContent, setCodeContent] = useState<string>(PRESET_SNIPPETS[0].code);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'System ready. Select a file or type code to begin.',
    'Compiler: Aether NeuroCode v4.8 (x86_64-quantum-aether)'
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleSelectSnippet = (snip: CodeSnippet) => {
    setSelectedSnippet(snip);
    setCodeContent(snip.code);
    setTerminalOutput((prev) => [...prev, `[LOADED] File switched to ${snip.name}`]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput((prev) => [...prev, `[COMPILE] Compiling ${selectedSnippet.name}...`]);

    setTimeout(() => {
      setIsRunning(false);
      const timestamp = new Date().toLocaleTimeString();
      let outputMessage = `[EXECUTION OK ${timestamp}] Program completed successfully in 14.2ms.`;
      if (selectedSnippet.language === 'quantum') {
        outputMessage = `[QUANTUM SIM ${timestamp}] Grover Oracle Collapsed. Target state measured at Qubit[0, 1] with 99.8% fidelity.`;
      } else if (selectedSnippet.language === 'python') {
        outputMessage = `[AI INFERENCE ${timestamp}] Action #7 chosen with 98.42% policy confidence. Epoch loss: 0.0012.`;
      } else if (selectedSnippet.language === 'rust') {
        outputMessage = `[WASM OK ${timestamp}] 50,000 particles calculated. Energy total: 4,892.11 J.`;
      }
      setTerminalOutput((prev) => [...prev, outputMessage]);
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAiRefactor = () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const injectedComment = `\n// AI Optimisations (${aiPrompt}): Optimized memory layout and vectorized loop execution\n`;
      setCodeContent((prev) => prev + injectedComment);
      setTerminalOutput((prev) => [...prev, `[AI REFACTOR] Applied AI changes based on: "${aiPrompt}"`]);
      setAiPrompt('');
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedSnippet.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-100">
      
      {/* Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-cyan-800/60 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> APP 6 • AI NEUROCODE IDE
            </span>
            <span className="text-xs text-slate-400 font-mono">v4.8 QUANTUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Code2 className="w-8 h-8 text-cyan-400" />
            AI NeuroCode IDE & Quantum Lab
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Write, compile, and optimize high-level algorithms in Python, Rust, TypeScript, and Quantum Q#. Includes AI auto-refactoring and a simulated execution kernel.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all disabled:opacity-50"
          >
            {isRunning ? <Zap className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
            title="Download Code File"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left File Explorer */}
        <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              Project Explorer
            </h3>

            <div className="space-y-1.5">
              {PRESET_SNIPPETS.map((snip) => {
                const isActive = selectedSnippet.id === snip.id;
                return (
                  <button
                    key={snip.id}
                    onClick={() => handleSelectSnippet(snip)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-bold truncate">{snip.name}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{snip.description}</div>
                    </div>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Code Assistant Widget */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Neuro AI Refactor Assistant
            </h4>
            <div className="space-y-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Optimize loops, add quantum noise..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAiRefactor}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isGenerating ? <Zap className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Inject AI Refactor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Code Editor & Terminal Console */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Code Editor Container */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col">
            {/* Editor Header Bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-bold text-cyan-300">{selectedSnippet.name}</span>
                <span className="text-[10px] text-slate-500 uppercase">({selectedSnippet.language})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Editable Code Area */}
            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="w-full h-80 bg-slate-950 p-4 text-xs font-mono text-cyan-100 focus:outline-none resize-none leading-relaxed tracking-wide"
              spellCheck={false}
            />
          </div>

          {/* Terminal Console Output */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Compiler Terminal Output</span>
              </div>
              <button
                onClick={() => setTerminalOutput(['Console cleared.'])}
                className="text-[10px] text-slate-500 hover:text-slate-300 font-mono cursor-pointer"
              >
                Clear Log
              </button>
            </div>

            <div className="p-4 h-36 overflow-y-auto font-mono text-[11px] space-y-1 bg-slate-950/90 text-slate-300">
              {terminalOutput.map((log, idx) => (
                <div key={idx} className={log.includes('OK') || log.includes('LOADED') ? 'text-emerald-400' : log.includes('AI') ? 'text-cyan-300' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
