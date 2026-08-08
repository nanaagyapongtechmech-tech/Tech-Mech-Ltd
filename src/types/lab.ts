export type SectionId =
  | 'home'
  | 'idea-lab'
  | 'research-lab'
  | 'ua-lab'
  | 'uim-lab'
  | 'physics-lab'
  | 'identity-lab'
  | 'consciousness-lab'
  | 'vacuum-lab'
  | 'dimension-lab'
  | 'universe-sim'
  | 'multiverse-map'
  | 'emergence-lab'
  | 'fractal-lab'
  | 'equation-lab'
  | 'hypothesis-lab'
  | 'tech-lab'
  | 'device-builder'
  | 'sim-engine'
  | 'machine-mind'
  | 'civ-sim'
  | 'possibility-engine'
  | '3d-workshop'
  | 'knowledge-graph'
  | 'ai-researcher'
  | 'universal-codex'
  | 'projects'
  | 'settings';

export type IdeaType =
  | 'question'
  | 'hypothesis'
  | 'theory'
  | 'equation'
  | 'experiment'
  | 'simulation'
  | 'invention'
  | 'document'
  | 'project';

export interface Idea {
  id: string;
  title: string;
  content: string;
  type: IdeaType;
  tags: string[];
  status: 'draft' | 'developing' | 'tested' | 'archived';
  createdAt: string;
  projectId?: string;
  latex?: string;
}

export interface VariableDef {
  symbol: string;
  name: string;
  unit: string;
  defaultValue: number;
  description: string;
}

export interface Equation {
  id: string;
  title: string;
  latex: string;
  description: string;
  domain: string;
  variables: VariableDef[];
  assumptions: string[];
  isSpeculative: boolean;
  projectId?: string;
}

export interface HypothesisRoleAnalysis {
  role: 'Proponent' | 'Skeptic' | 'Mathematician' | 'Physicist' | 'Logician' | 'Experimentalist';
  perspective: string;
  rating: number; // 1-10
  keyPoints: string[];
  assumptionsFound: string[];
  proposedExperiments: string[];
}

export interface Hypothesis {
  id: string;
  title: string;
  statement: string;
  status: 'untested' | 'analyzed' | 'validated' | 'refuted';
  roles: HypothesisRoleAnalysis[];
  overallVerdict: string;
  confidenceScore: number; // 0 - 100
  createdAt: string;
}

export interface DeviceNode {
  id: string;
  type: 'energy' | 'data' | 'sensor' | 'computing' | 'field' | 'material' | 'robotics' | 'control';
  name: string;
  x: number;
  y: number;
  inputs: string[];
  outputs: string[];
  params: Record<string, number | string>;
}

export interface DeviceConnection {
  id: string;
  fromId: string;
  fromPort: string;
  toId: string;
  toPort: string;
  flowType: 'energy' | 'data' | 'material' | 'control' | 'field';
}

export interface DeviceModel {
  id: string;
  title: string;
  category: string;
  nodes: DeviceNode[];
  connections: DeviceConnection[];
  isSpeculative: boolean;
  description: string;
}

export interface UniverseParams {
  id: string;
  name: string;
  dimensions: number; // 1 to 36
  energyDensity: number;
  massMultiplier: number;
  informationRate: number;
  vacuumFluctuation: number;
  interactionStrength: number;
  expansionRate: number;
  recursionLevel: number;
  isSpeculative: boolean;
  parentUniverseId?: string;
}

export interface MultiverseNode {
  id: string;
  name: string;
  universe: UniverseParams;
  position: { x: number; y: number };
  childrenIds: string[];
  tags: string[];
}

export interface CognitiveNode {
  id: string;
  module: 'Memory' | 'Perception' | 'Reasoning' | 'Prediction' | 'Planning' | 'Feedback' | 'Goals' | 'Environment' | 'Self-model';
  name: string;
  description: string;
  activityLevel: number; // 0 to 1
  signals: string[];
}

export interface CivilizationState {
  id: string;
  name: string;
  populationBillions: number;
  techLevel: number; // K-scale 0 to 3
  energyLevelGW: number;
  stabilityPct: number;
  educationIndex: number;
  timelineYears: number;
  currentEra: string;
  logs: string[];
}

export interface PossibilityBranch {
  id: string;
  parentId?: string;
  title: string;
  condition: string;
  assumptions: string[];
  events: string[];
  consequences: string[];
  probability: number; // 0-1
}

export interface KnowledgeNodeData {
  id: string;
  label: string;
  type: 'Idea' | 'Theory' | 'Equation' | 'Definition' | 'Experiment' | 'Simulation' | 'Document' | 'Universe' | 'Technology';
  category: string;
  description: string;
  x?: number;
  y?: number;
}

export interface KnowledgeEdgeData {
  id: string;
  source: string;
  target: string;
  relation: 'Supports' | 'Contradicts' | 'Derived from' | 'Related to' | 'Similar to' | 'Depends on' | 'Transforms' | 'Contains';
}

export interface CodexChapter {
  id: string;
  title: string;
  summary: string;
  content: string;
  equations?: string[];
  diagramType?: '3d' | 'graph' | 'device' | 'circuit' | 'universe';
  author?: string;
  createdAt?: string;
  lastModified?: string;
  version?: string;
  tags?: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: 'active' | 'in-review' | 'archived';
  createdAt: string;
  updatedAt: string;
  ideas: Idea[];
  equations: Equation[];
  hypotheses: Hypothesis[];
  devices: DeviceModel[];
  universes: UniverseParams[];
  chapters: CodexChapter[];
}

export type AIRoleMode =
  | 'Mathematician'
  | 'Physicist'
  | 'Engineer'
  | 'Philosopher'
  | 'Programmer'
  | 'Designer'
  | 'Skeptic'
  | 'Researcher';

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  mode?: AIRoleMode;
  text: string;
  timestamp: string;
}
