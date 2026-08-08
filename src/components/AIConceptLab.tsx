import React, { useState } from 'react';
import { BlueprintItem, BlueprintCategory, BlueprintStyleMode } from '../types';
import { Sparkles, Cpu, Compass, FileSearch, ArrowRight, Loader2, CheckCircle2, AlertCircle, Eye, Download, Layers } from 'lucide-react';
import { BlueprintCard } from './BlueprintCard';

interface AIConceptLabProps {
  onBlueprintCreated: (newBp: BlueprintItem) => void;
  styleMode: BlueprintStyleMode;
  onViewBlueprint: (bp: BlueprintItem) => void;
  onDownloadBlueprint: (bp: BlueprintItem) => void;
  onToggleBookmark: (id: string) => void;
  bookmarkedIds: string[];
}

const CONCEPT_PRESETS = [
  'Orbital Space Elevator Anchor & Carbon-Nanotube Tether',
  'Compact Household Fusion Battery (100 kW Output)',
  'Atmospheric Carbon Dioxide Vacuum & Mineralization Tower',
  'Superconducting Maglev Hyperloop Pod with Ion Thrusters',
  'Deep Trench Geothermal Borehole Generator (20 km Depth)',
  'Quantum Neuromorphic Processor with Photonic Bus',
  'Ionic Wind Solid-State Delivery Drone (Zero Moving Parts)'
];

export const AIConceptLab: React.FC<AIConceptLabProps> = ({
  onBlueprintCreated,
  styleMode,
  onViewBlueprint,
  onDownloadBlueprint,
  onToggleBookmark,
  bookmarkedIds
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'analyze'>('generate');

  // Generator State
  const [prompt, setPrompt] = useState<string>('');
  const [category, setCategory] = useState<BlueprintCategory>('To Be Built Concepts');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generatedResult, setGeneratedResult] = useState<BlueprintItem | null>(null);
  const [genError, setGenError] = useState<string | null>(null);

  // Patent Analyzer State
  const [analyzeQuery, setAnalyzeQuery] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzeResult, setAnalyzeResult] = useState<any | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  // Generate Concept Blueprint API Handler
  const handleGenerate = async (selectedPrompt?: string) => {
    const finalPrompt = selectedPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setIsGenerating(true);
    setGenError(null);
    setGeneratedResult(null);

    setGenerationStep('Calculating physics & structural geometry...');

    try {
      setTimeout(() => setGenerationStep('Synthesizing vector schematics & CAD paths...'), 1200);
      setTimeout(() => setGenerationStep('Formulating Bill of Materials & Assembly steps...'), 2500);

      const res = await fetch('/api/ai/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt, category })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate blueprint');
      }

      const newBlueprint: BlueprintItem = await res.json();
      setGeneratedResult(newBlueprint);
      onBlueprintCreated(newBlueprint);
    } catch (err: any) {
      console.error('Error generating blueprint:', err);
      setGenError(err.message || 'An error occurred during blueprint generation.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Analyze Patent API Handler
  const handleAnalyze = async () => {
    if (!analyzeQuery.trim()) return;

    setIsAnalyzing(true);
    setAnalyzeError(null);
    setAnalyzeResult(null);

    try {
      const res = await fetch('/api/ai/analyze-patent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: analyzeQuery })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze patent');
      }

      const data = await res.json();
      setAnalyzeResult(data);
    } catch (err: any) {
      console.error('Error analyzing patent:', err);
      setAnalyzeError(err.message || 'Error conducting patent analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-sans text-slate-100">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Blueprint Synthesis Engine • Powered by Gemini 3.6 Flash</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white">
            Architect & Synthesize <span className="text-cyan-400">"To Be Built"</span> Blueprints
          </h2>

          <p className="text-sm text-slate-400 font-sans leading-relaxed">
            Transform any futuristic idea, patent claim, or speculative technology into a complete, vector-drawn engineering blueprint complete with interactive callouts, technical specifications, materials breakdown, and CAD vector layers.
          </p>

          {/* Mode Switcher */}
          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'generate'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Blueprint Generator ("To Be Built")</span>
            </button>

            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'analyze'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <FileSearch className="w-4 h-4" />
              <span>Patent Claims Explainer</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: BLUEPRINT GENERATOR WORKBENCH */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5 font-mono text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-2 uppercase tracking-wider text-xs">
                Invention or Concept Idea
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your futuristic invention (e.g. 'Solar powered atmospheric water harvesting drone with ion propulsion')..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-cyan-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 font-sans text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-2 uppercase tracking-wider text-xs">
                Blueprint Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlueprintCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-cyan-200 focus:outline-none focus:border-cyan-500 font-sans text-xs"
              >
                <option value="To Be Built Concepts">To Be Built Concepts</option>
                <option value="Aerospace & Aeronautics">Aerospace & Aeronautics</option>
                <option value="Mechanical & Engines">Mechanical & Engines</option>
                <option value="Architecture & Mega-Structures">Architecture & Mega-Structures</option>
                <option value="Computing & Cybernetics">Computing & Cybernetics</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Energy & Quantum">Energy & Quantum</option>
                <option value="Automotive & Transportation">Automotive & Transportation</option>
                <option value="Medical & Biotechnology">Medical & Biotechnology</option>
              </select>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-slate-400 font-bold mb-2 uppercase text-[11px]">
                Inspiration Ideas ("To Be Built")
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CONCEPT_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(preset);
                      handleGenerate(preset);
                    }}
                    className="text-[11px] font-sans px-2.5 py-1 rounded bg-slate-950 border border-cyan-950 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 transition-colors text-left"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Generating Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize AI Blueprint Schema</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="p-3 bg-slate-950 rounded border border-cyan-800/50 text-cyan-300 text-xs flex items-center gap-2 animate-pulse">
                <Compass className="w-4 h-4 animate-spin" />
                <span>{generationStep || 'Analyzing AI reasoning model...'}</span>
              </div>
            )}

            {genError && (
              <div className="p-3 bg-rose-950/80 rounded border border-rose-800 text-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{genError}</span>
              </div>
            )}
          </div>

          {/* Right Result Display (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {generatedResult ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>New Blueprint Schema Successfully Synthesized & Indexed!</span>
                  </div>
                  <button
                    onClick={() => onViewBlueprint(generatedResult)}
                    className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400"
                  >
                    Open CAD Inspector
                  </button>
                </div>

                <BlueprintCard
                  blueprint={generatedResult}
                  styleMode={styleMode}
                  onView={onViewBlueprint}
                  onDownload={onDownloadBlueprint}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={bookmarkedIds.includes(generatedResult.id)}
                />
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-dashed border-cyan-900/60 rounded-xl p-12 text-center space-y-3 font-mono text-xs text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-cyan-800 mx-auto flex items-center justify-center text-cyan-400">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-200">AI Blueprint Workbench Ready</h3>
                <p className="text-slate-400 max-w-md mx-auto font-sans">
                  Enter an invention concept on the left or select a preset to synthesize a brand new downloadable schematic blueprint with vector layers and technical specs.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PATENT CLAIMS EXPLAINER & REVERSE ENGINEER */}
      {activeTab === 'analyze' && (
        <div className="bg-slate-900/90 p-6 rounded-xl border border-cyan-900/60 shadow-xl space-y-6 font-mono text-xs">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-lg font-bold text-white font-mono">Patent Claims Reverse-Engineer</h3>
            <p className="text-slate-300 font-sans text-xs">
              Enter any real patent number (e.g., "US Pat. 3,180,083" or "Nikola Tesla AC Motor") or technology query to extract key legal claims, operational principles, and material recommendations.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={analyzeQuery}
                onChange={(e) => setAnalyzeQuery(e.target.value)}
                placeholder="e.g. US Patent 381,968, James Watt Steam Engine, or Quantum Josephson Junction"
                className="flex-1 bg-slate-950 border border-cyan-900/60 rounded-lg px-3 py-2 text-cyan-100 placeholder-slate-500 font-sans text-sm focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !analyzeQuery.trim()}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSearch className="w-4 h-4" />}
                <span>Analyze Patent</span>
              </button>
            </div>
          </div>

          {analyzeError && (
            <div className="p-3 bg-rose-950/80 rounded border border-rose-800 text-rose-200 text-xs">
              {analyzeError}
            </div>
          )}

          {analyzeResult && (
            <div className="bg-slate-950 p-6 rounded-xl border border-cyan-900/50 space-y-6 font-sans text-slate-200 animate-in fade-in">
              <div className="border-b border-cyan-900/50 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{analyzeResult.patentClassification}</span>
                  <h3 className="text-xl font-bold font-mono text-white mt-0.5">{analyzeResult.patentName}</h3>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Simplified ELI5 Summary
                </h4>
                <p className="bg-slate-900 p-3 rounded border border-slate-800 leading-relaxed text-xs">
                  {analyzeResult.simplifiedSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Technical Operational Overview
                </h4>
                <p className="bg-slate-900 p-3 rounded border border-slate-800 leading-relaxed text-xs">
                  {analyzeResult.technicalOverview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="bg-slate-900 p-4 rounded-lg border border-cyan-900/40">
                  <h4 className="font-bold text-cyan-300 uppercase mb-2">Key Invention Claims</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans text-xs">
                    {analyzeResult.keyInventionClaims?.map((claim: string, idx: number) => (
                      <li key={idx}>{claim}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/40">
                  <h4 className="font-bold text-amber-300 uppercase mb-2">Engineering Challenges</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 font-sans text-xs">
                    {analyzeResult.engineeringChallenges?.map((ch: string, idx: number) => (
                      <li key={idx}>{ch}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
