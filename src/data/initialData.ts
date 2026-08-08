import { ResearchProject, Equation, Idea, DeviceModel, UniverseParams, MultiverseNode, KnowledgeNodeData, KnowledgeEdgeData, CodexChapter } from '../types/lab';

export const INITIAL_EQUATIONS: Equation[] = [
  {
    id: 'eq-uim-1',
    title: 'Universal Identity Transformation Equivalence',
    latex: 'I(\\mathcal{A}) \\oplus \\Delta_{\\text{diff}} \\xrightarrow{\\Phi} I(\\mathcal{B}) \\quad \\text{where } I(\\mathcal{A}) \\neq_{I} I(\\mathcal{B})',
    description: 'Defines identity preservation under ontological transformation, differentiating strict numerical equality from individual structural identity.',
    domain: 'UIM Mathematics',
    variables: [
      { symbol: 'I(\\mathcal{A})', name: 'Identity Tensor A', unit: 'ID-Units', defaultValue: 1.0, description: 'Base invariant identity measure of Entity A' },
      { symbol: '\\Delta_{\\text{diff}}', name: 'Differential Delta', unit: 'Diff-Units', defaultValue: 0.35, description: 'Transformational difference operator' },
      { symbol: '\\Phi', name: 'Transformation Function', unit: 'Operator', defaultValue: 1.25, description: 'Field transform operator' }
    ],
    assumptions: [
      'Identity is topological and invariant under continuous metric deformations.',
      'Numerical equality is a subset of identity equivalence.'
    ],
    isSpeculative: true
  },
  {
    id: 'eq-phys-vacuum',
    title: 'Quantum Vacuum Zero-Point Transduction',
    latex: '\\langle 0 | \\hat{T}_{\\mu\\nu} | 0 \\rangle = -\\frac{\\hbar c}{8\\pi^2} \\Lambda^4 g_{\\mu\\nu} + \\nabla_\\mu \\Psi_{\\text{field}}',
    description: 'Calculates local vacuum energy density coupling with gradient induction fields.',
    domain: 'Vacuum Physics',
    variables: [
      { symbol: '\\Lambda', name: 'Cutoff Momentum', unit: 'GeV/c', defaultValue: 1.21, description: 'Plancks scale momentum cutoff' },
      { symbol: '\\Psi_{\\text{field}}', name: 'Induction Vector Field', unit: 'Tesla-m', defaultValue: 0.08, description: 'Induced vacuum potential field' }
    ],
    assumptions: [
      'Vacuum state exhibits non-zero topological pressure under Casimiresque geometry.',
      'Energy conservation holds across high-dimensional manifolds.'
    ],
    isSpeculative: false
  },
  {
    id: 'eq-dim-36',
    title: '36-Dimensional Hyper-Volume Projection',
    latex: 'V_{36}(R) = \\frac{\\pi^{18}}{18!} R^{36} \\quad \\implies \\quad P_{3D}(V_{36}) = \\int_{\\mathcal{M}^{33}} d^{33}x \\,\\sqrt{-g}',
    description: 'Provides exact lower-dimensional spatial integral projections for a 36-dimensional hyper-sphere into 3D Cartesian coordinates.',
    domain: 'Dimensional Mathematics',
    variables: [
      { symbol: 'R', name: 'Hyper-Radius', unit: 'Meters', defaultValue: 5.0, description: 'Radius of the 36D manifold' }
    ],
    assumptions: [
      'Projections are conformal geometric maps.',
      'Higher dimensional manifolds maintain isotropic symmetries.'
    ],
    isSpeculative: true
  }
];

export const INITIAL_PROJECTS: ResearchProject[] = [
  {
    id: 'proj-uim-1',
    title: 'Universal Identity Mathematics & Non-Euclidean Consciousness Systems',
    category: 'Mathematics & Epistemology',
    summary: 'A unified framework establishing mathematical operators for distinction, self-reference, and identity transformation across multi-dimensional topological spaces.',
    status: 'active',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-07',
    ideas: [
      {
        id: 'idea-1',
        title: 'Identity vs Numerical Equality',
        content: 'Two entities can share identical attributes (numerical equality) while remaining fundamentally distinct in individual identity space.',
        type: 'theory',
        tags: ['UIM', 'Identity', 'Logic'],
        status: 'tested',
        createdAt: '2026-08-02'
      },
      {
        id: 'idea-2',
        title: 'Recursive Self-Observation Matrix',
        content: 'Can a computational feedback loop create a closed topological self-model without infinite regression?',
        type: 'question',
        tags: ['Consciousness', 'Recursion', 'AI'],
        status: 'developing',
        createdAt: '2026-08-04'
      }
    ],
    equations: [INITIAL_EQUATIONS[0], INITIAL_EQUATIONS[2]],
    hypotheses: [
      {
        id: 'hypo-1',
        title: 'Topological Invariance of Personal Identity',
        statement: 'A conscious observer state maintains identity continuity across transformation if and only if its structural feedback graph maintains non-trivial Betti numbers.',
        status: 'analyzed',
        confidenceScore: 84,
        overallVerdict: 'Mathematically coherent under graph topology assumptions; requires empirical verification in neural agent simulations.',
        createdAt: '2026-08-03',
        roles: [
          {
            role: 'Mathematician',
            perspective: 'The Betti number constraint guarantees topological persistence of internal feedback loops under continuous metric shifts.',
            rating: 9,
            keyPoints: ['Homology groups persist', 'Prevents disintegration under noise'],
            assumptionsFound: ['Graph vertices remain finite', 'Edges are smooth flow fields'],
            proposedExperiments: ['Construct a 100-node agent graph and compute homology under perturbations']
          },
          {
            role: 'Skeptic',
            perspective: 'Betti numbers describe geometric holes, not subjective awareness. Equating homology directly to consciousness is a category mistake.',
            rating: 4,
            keyPoints: ['Potential category error', 'Over-extension of algebraic topology'],
            assumptionsFound: ['Subjectivity equals graph invariant'],
            proposedExperiments: ['Benchmark against simple electrical circuits with non-zero Betti numbers']
          }
        ]
      }
    ],
    devices: [
      {
        id: 'dev-uim-1',
        title: 'Universal Identity Resonance Transducer',
        category: 'Information & Field Electronics',
        description: 'A conceptual optical device designed to align topological information states across quantum entanglements.',
        isSpeculative: true,
        nodes: [
          { id: 'n1', type: 'sensor', name: 'Quantum Vacuum Probe', x: 80, y: 120, inputs: [], outputs: ['Signal_Out'], params: { sensitivity: 0.95 } },
          { id: 'n2', type: 'computing', name: 'UIM Logic Matrix', x: 280, y: 120, inputs: ['Signal_In'], outputs: ['Field_Cmd'], params: { clockMHz: 4800 } },
          { id: 'n3', type: 'field', name: 'Topological Emitter', x: 480, y: 120, inputs: ['Field_Cmd'], outputs: ['Resonance_Field'], params: { frequencyGHz: 1420 } }
        ],
        connections: [
          { id: 'c1', fromId: 'n1', fromPort: 'Signal_Out', toId: 'n2', toPort: 'Signal_In', flowType: 'data' },
          { id: 'c2', fromId: 'n2', fromPort: 'Field_Cmd', toId: 'n3', toPort: 'Field_Cmd', flowType: 'control' }
        ]
      }
    ],
    universes: [
      {
        id: 'uni-1',
        name: 'Universe Alpha (UIM Standard Prime)',
        dimensions: 4,
        energyDensity: 1.0,
        massMultiplier: 1.0,
        informationRate: 2.5,
        vacuumFluctuation: 0.1,
        interactionStrength: 1.0,
        expansionRate: 1.02,
        recursionLevel: 1,
        isSpeculative: false
      }
    ],
    chapters: [
      {
        id: 'chap-1',
        title: 'Chapter 1: Axioms of Universal Identity',
        summary: 'Formulating the foundational distinctions between quantitative similarity and qualitative identity.',
        content: `In classical set theory and formal logic, equality is denoted by the standard relation x = y. However, when modeling complex dynamic entities, self-referential cognitive systems, or high-dimensional physical objects, simple attribute equality fails to capture structural persistence.

Universal Identity Mathematics (UIM) introduces the distinction operator ∇_ID and identity tensor I(A). We prove that under topological continuous deformation, an entity's identity is preserved along its transformational path.`,
        equations: []
      }
    ]
  },
  {
    id: 'proj-vacuum-2',
    title: 'Vacuum Energy Extraction & Space-Time Transducer Arrays',
    category: 'Physics & Advanced Engineering',
    summary: 'Investigating zero-point field fluctuations, Casimir pressure differential engines, and high-frequency plasma confinement for zero-emission energy generation.',
    status: 'active',
    createdAt: '2026-08-03',
    updatedAt: '2026-08-07',
    ideas: [
      {
        id: 'idea-vac-1',
        title: 'Casimir Differential Micro-Piston',
        content: 'Using asymmetric nanometer scale metallic plates to harness spatial vacuum pressure gradient forces.',
        type: 'invention',
        tags: ['Vacuum', 'Energy', 'Nanotech'],
        status: 'developing',
        createdAt: '2026-08-04'
      }
    ],
    equations: [INITIAL_EQUATIONS[1]],
    hypotheses: [],
    devices: [],
    universes: [],
    chapters: []
  }
];

export const INITIAL_MULTIVERSE: MultiverseNode[] = [
  {
    id: 'mult-1',
    name: 'Universe Prime (4D Standard)',
    universe: INITIAL_PROJECTS[0].universes[0],
    position: { x: 300, y: 250 },
    childrenIds: ['mult-2', 'mult-3'],
    tags: ['Standard', 'Stable']
  },
  {
    id: 'mult-2',
    name: 'Hyper-Dim Cosmos (11D M-Theory Branch)',
    universe: {
      id: 'uni-2',
      name: 'Hyper-Dim Cosmos',
      dimensions: 11,
      energyDensity: 4.2,
      massMultiplier: 0.4,
      informationRate: 12.8,
      vacuumFluctuation: 0.85,
      interactionStrength: 2.1,
      expansionRate: 0.95,
      recursionLevel: 3,
      isSpeculative: true,
      parentUniverseId: 'uni-1'
    },
    position: { x: 550, y: 140 },
    childrenIds: ['mult-4'],
    tags: ['Super-string', 'High-energy']
  },
  {
    id: 'mult-3',
    name: 'Sub-Zero Vacuum Matrix (3D Minimal)',
    universe: {
      id: 'uni-3',
      name: 'Sub-Zero Vacuum Matrix',
      dimensions: 3,
      energyDensity: 0.05,
      massMultiplier: 0.1,
      informationRate: 0.2,
      vacuumFluctuation: 3.5,
      interactionStrength: 0.02,
      expansionRate: 2.40,
      recursionLevel: 0,
      isSpeculative: true,
      parentUniverseId: 'uni-1'
    },
    position: { x: 550, y: 360 },
    childrenIds: [],
    tags: ['Vacuum-dominated', 'Cold']
  },
  {
    id: 'mult-4',
    name: '36-Dimensional Hyper-Omniverse',
    universe: {
      id: 'uni-4',
      name: '36D Hyper-Omniverse',
      dimensions: 36,
      energyDensity: 100.0,
      massMultiplier: 0.01,
      informationRate: 500.0,
      vacuumFluctuation: 0.01,
      interactionStrength: 10.0,
      expansionRate: 1.0,
      recursionLevel: 8,
      isSpeculative: true,
      parentUniverseId: 'uni-2'
    },
    position: { x: 800, y: 140 },
    childrenIds: [],
    tags: ['Topological', 'Ultra-complex']
  }
];

export const INITIAL_KNOWLEDGE_NODES: KnowledgeNodeData[] = [
  { id: 'kn-uim', label: 'Universal Identity Mathematics', type: 'Theory', category: 'Mathematics', description: 'Formal symbolic system defining qualitative identity vs quantitative equality.' },
  { id: 'kn-eq1', label: 'Identity Transformation Equivalence', type: 'Equation', category: 'Mathematics', description: 'I(A) + Delta -> I(B)' },
  { id: 'kn-vac', label: 'Quantum Vacuum Energy', type: 'Theory', category: 'Physics', description: 'Zero-point potential and Casimir interaction fields.' },
  { id: 'kn-hyp1', label: 'Topological Invariance Hypothesis', type: 'Idea', category: 'Consciousness', description: 'Observer continuity tied to non-zero Betti numbers.' },
  { id: 'kn-dev1', label: 'Identity Transducer', type: 'Technology', category: 'Engineering', description: 'Optical-quantum field resonator device.' },
  { id: 'kn-uni1', label: 'Universe Prime', type: 'Universe', category: 'Cosmology', description: '4D standard physical parameter benchmark.' }
];

export const INITIAL_KNOWLEDGE_EDGES: KnowledgeEdgeData[] = [
  { id: 'ke-1', source: 'kn-uim', target: 'kn-eq1', relation: 'Derived from' },
  { id: 'ke-2', source: 'kn-eq1', target: 'kn-hyp1', relation: 'Supports' },
  { id: 'ke-3', source: 'kn-hyp1', target: 'kn-dev1', relation: 'Depends on' },
  { id: 'ke-4', source: 'kn-vac', target: 'kn-dev1', relation: 'Related to' },
  { id: 'ke-5', source: 'kn-uni1', target: 'kn-vac', relation: 'Contains' }
];
