import React, { useState } from 'react';
import { SectionId, ResearchProject, Idea, Equation, UniverseParams, MultiverseNode, KnowledgeNodeData, KnowledgeEdgeData, CodexChapter } from '../types/lab';
import {
  INITIAL_PROJECTS,
  INITIAL_MULTIVERSE,
  INITIAL_KNOWLEDGE_NODES,
  INITIAL_KNOWLEDGE_EDGES
} from '../data/initialData';

// Navigation & Global UI Components
import { SidebarNav } from './SidebarNav';
import { TopBar } from './TopBar';
import { CommandPalette } from './CommandPalette';

// All View Components
import { HomeView } from './views/HomeView';
import { IdeaLabView } from './views/IdeaLabView';
import { ResearchLabView } from './views/ResearchLabView';
import { UniversalAutomationLabView } from './views/UniversalAutomationLabView';
import { UIMMathematicsLabView } from './views/UIMMathematicsLabView';
import { PhysicsLabView } from './views/PhysicsLabView';
import { IdentityLabView } from './views/IdentityLabView';
import { ConsciousnessLabView } from './views/ConsciousnessLabView';
import { VacuumLabView } from './views/VacuumLabView';
import { DimensionLabView } from './views/DimensionLabView';
import { UniverseSimulatorView } from './views/UniverseSimulatorView';
import { MultiverseMapView } from './views/MultiverseMapView';
import { EmergenceLabView } from './views/EmergenceLabView';
import { FractalLabView } from './views/FractalLabView';
import { EquationLabView } from './views/EquationLabView';
import { HypothesisLabView } from './views/HypothesisLabView';
import { TechnologyLabView } from './views/TechnologyLabView';
import { DeviceBuilderView } from './views/DeviceBuilderView';
import { SimulationEngineView } from './views/SimulationEngineView';
import { MachineMindLabView } from './views/MachineMindLabView';
import { CivilizationSimulatorView } from './views/CivilizationSimulatorView';
import { PossibilityEngineView } from './views/PossibilityEngineView';
import { ThreeWorkshopView } from './views/ThreeWorkshopView';
import { KnowledgeGraphView } from './views/KnowledgeGraphView';
import { AIResearcherView } from './views/AIResearcherView';
import { UniversalCodexView } from './views/UniversalCodexView';
import { ProjectsView } from './views/ProjectsView';

const INITIAL_CHAPTERS: CodexChapter[] = [
  {
    id: 'chap-1',
    title: 'Chapter 1: Foundational Axioms of Universal Identity Mathematics',
    summary: 'Formulating the foundational distinctions between quantitative similarity and qualitative identity.',
    content: `## 1.1 The Identity vs Equality Paradigm

Standard set theory equates entities through quantitative evaluation: A = B if and only if all properties match identically. However, in Universal Identity Mathematics (UIM), we formulate qualitative identity:

$$\\nabla_{\\text{ID}} I(\\mathcal{A}) \\neq_I I(\\mathcal{B})$$

Even if two structural patterns possess equivalent numerical signatures, their topological origins and causal trajectories differentiate them.

## 1.2 Transformation Preservation

An identity $I(\\mathcal{A})$ undergoing state transformation $\\Delta_{\\text{diff}}$ under operation $\\Phi$ maintains invariant continuity across high-dimensional manifolds:

$$I(\\mathcal{A}) \\oplus \\Delta_{\\text{diff}} \\xrightarrow{\\Phi} I(\\mathcal{B})$$

Where $\\Phi$ acts as an identity-preserving topological diffeomorphism.`,
    author: 'AI Research Suite',
    createdAt: '2026-08-01',
    lastModified: '2026-08-08',
    version: '1.0.4',
    tags: ['UIM', 'Axioms', 'Topology']
  },
  {
    id: 'chap-2',
    title: 'Chapter 2: Quantum Vacuum Transduction & Casimir Coupling',
    summary: 'Investigating zero-point field fluctuations and Casimir pressure differential engines.',
    content: `## 2.1 Zero-Point Energy Density

The zero-point energy density of free electromagnetic fields in Casimir geometry is given by:

$$\\langle 0 | \\hat{T}_{\\mu\\nu} | 0 \\rangle = -\\frac{\\hbar c}{8\\pi^2} \\Lambda^4 g_{\\mu\\nu} + \\nabla_\\mu \\Psi_{\\text{field}}$$

By constructing non-symmetric sub-nanometer vacuum plates, macroscopic mechanical potential is transduced into electrical charge carriers without violating thermodynamic conservation.`,
    author: 'Physics Lab Team',
    createdAt: '2026-08-03',
    lastModified: '2026-08-07',
    version: '2.1.0',
    tags: ['Vacuum', 'Casimir', 'Zero-Point']
  }
];

export const EverythingLab: React.FC = () => {
  // Navigation State
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Lab Research Projects State
  const [projects, setProjects] = useState<ResearchProject[]>(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>(INITIAL_PROJECTS[0].id);

  // Shared Lab State
  const [multiverse, setMultiverse] = useState<MultiverseNode[]>(INITIAL_MULTIVERSE);
  const [knowledgeNodes, setKnowledgeNodes] = useState<KnowledgeNodeData[]>(INITIAL_KNOWLEDGE_NODES);
  const [knowledgeEdges, setKnowledgeEdges] = useState<KnowledgeEdgeData[]>(INITIAL_KNOWLEDGE_EDGES);
  const [codexChapters, setCodexChapters] = useState<CodexChapter[]>(INITIAL_CHAPTERS);

  // Search & Modal State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Handler methods
  const handleSelectSection = (section: SectionId) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddIdea = (newIdea: Idea) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeProjectId
          ? { ...p, ideas: [newIdea, ...p.ideas], updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
  };

  const handleDeleteIdea = (ideaId: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeProjectId
          ? { ...p, ideas: p.ideas.filter(i => i.id !== ideaId) }
          : p
      )
    );
  };

  const handleAddEquation = (newEq: Equation) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeProjectId
          ? { ...p, equations: [newEq, ...p.equations], updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
  };

  const handleAddUniverse = (newUni: UniverseParams) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeProjectId
          ? { ...p, universes: [newUni, ...p.universes], updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
  };

  const handleAddMultiverseNode = (node: MultiverseNode) => {
    setMultiverse(prev => [...prev, node]);
  };

  const handleAddChapter = (chapter: CodexChapter) => {
    setCodexChapters(prev => [chapter, ...prev]);
  };

  const handleAddProject = (proj: ResearchProject) => {
    setProjects(prev => [proj, ...prev]);
    setActiveProjectId(proj.id);
  };

  const handleDeleteProject = (projId: string) => {
    if (projects.length <= 1) return;
    setProjects(prev => prev.filter(p => p.id !== projId));
    setActiveProjectId(prev => (prev === projId ? projects.find(p => p.id !== projId)!.id : prev));
  };

  const handleQuickAskAI = (prompt: string) => {
    handleSelectSection('ai-researcher');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header Bar */}
      <TopBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        onOpenNewIdea={() => handleSelectSection('idea-lab')}
        onNavigateToAI={() => handleSelectSection('ai-researcher')}
      />

      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar Navigation */}
        <SidebarNav
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950/90 pb-16">
          {activeSection === 'home' && (
            <HomeView
              projects={projects}
              activeProject={activeProject}
              onNavigate={handleSelectSection}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onQuickAsk={handleQuickAskAI}
            />
          )}

          {activeSection === 'idea-lab' && (
            <IdeaLabView
              ideas={activeProject.ideas}
              onAddIdea={handleAddIdea}
              onDeleteIdea={handleDeleteIdea}
              onNavigate={handleSelectSection}
              onAskAI={handleQuickAskAI}
            />
          )}

          {activeSection === 'research-lab' && (
            <ResearchLabView
              project={activeProject}
              onNavigate={handleSelectSection}
              onAskAI={handleQuickAskAI}
            />
          )}

          {activeSection === 'ua-lab' && <UniversalAutomationLabView />}

          {activeSection === 'uim-lab' && (
            <UIMMathematicsLabView
              equations={activeProject.equations}
              onAddEquation={handleAddEquation}
              onAskAI={handleQuickAskAI}
            />
          )}

          {activeSection === 'physics-lab' && <PhysicsLabView />}

          {activeSection === 'identity-lab' && <IdentityLabView />}

          {activeSection === 'consciousness-lab' && <ConsciousnessLabView />}

          {activeSection === 'vacuum-lab' && <VacuumLabView />}

          {activeSection === 'dimension-lab' && <DimensionLabView />}

          {activeSection === 'universe-sim' && (
            <UniverseSimulatorView
              universes={activeProject.universes}
              onAddUniverse={handleAddUniverse}
            />
          )}

          {activeSection === 'multiverse-map' && (
            <MultiverseMapView
              multiverse={multiverse}
              onAddMultiverseNode={handleAddMultiverseNode}
            />
          )}

          {activeSection === 'emergence-lab' && <EmergenceLabView />}

          {activeSection === 'fractal-lab' && <FractalLabView />}

          {activeSection === 'equation-lab' && (
            <EquationLabView
              equations={activeProject.equations}
              onAddEquation={handleAddEquation}
            />
          )}

          {activeSection === 'hypothesis-lab' && <HypothesisLabView />}

          {activeSection === 'tech-lab' && <TechnologyLabView />}

          {activeSection === 'device-builder' && <DeviceBuilderView />}

          {activeSection === 'sim-engine' && <SimulationEngineView />}

          {activeSection === 'machine-mind' && <MachineMindLabView />}

          {activeSection === 'civ-sim' && <CivilizationSimulatorView />}

          {activeSection === 'possibility-engine' && <PossibilityEngineView />}

          {activeSection === '3d-workshop' && <ThreeWorkshopView />}

          {activeSection === 'knowledge-graph' && (
            <KnowledgeGraphView
              nodes={knowledgeNodes}
              edges={knowledgeEdges}
            />
          )}

          {activeSection === 'ai-researcher' && <AIResearcherView />}

          {activeSection === 'universal-codex' && (
            <UniversalCodexView
              chapters={codexChapters}
              onAddChapter={handleAddChapter}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectsView
              projects={projects}
              activeProjectId={activeProjectId}
              onSelectProject={setActiveProjectId}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeSection === 'settings' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-slate-100">Lab Environment Settings</h1>
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <p className="text-sm text-slate-400">
                  Configure simulation step intervals, LaTeX rendering, Gemini API personas, and export defaults.
                </p>
                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span>LaTeX Standard</span>
                    <span className="text-cyan-400">MathJax / KaTeX AST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span>Gemini AI Model Endpoint</span>
                    <span className="text-emerald-400">/api/gemini/research (Gemini Pro/Flash)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span>Max Simulation Dimensionality</span>
                    <span className="text-purple-400">36 Dimensions</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quick Access Command Palette (Ctrl+K or Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
};
