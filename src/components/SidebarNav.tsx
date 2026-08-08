import React from 'react';
import { SectionId } from '../types/lab';
import {
  Home,
  Lightbulb,
  BookOpen,
  Cpu,
  Calculator,
  Atom,
  Fingerprint,
  Brain,
  CircleDot,
  Boxes,
  Globe,
  GitFork,
  Sparkles,
  Sigma,
  ShieldCheck,
  Wrench,
  Layers,
  Activity,
  Network,
  Users,
  GitBranch,
  Box,
  Share2,
  Bot,
  FileText,
  FolderKanban,
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarNavProps {
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'home', label: 'Home Dashboard', icon: Home }
    ]
  },
  {
    title: 'IDEA & THEORY',
    items: [
      { id: 'idea-lab', label: 'Idea Lab', icon: Lightbulb },
      { id: 'research-lab', label: 'Research Lab', icon: BookOpen },
      { id: 'ua-lab', label: 'Universal Automation', icon: Cpu },
      { id: 'uim-lab', label: 'UIM Mathematics', icon: Calculator },
      { id: 'physics-lab', label: 'Physics Lab', icon: Atom }
    ]
  },
  {
    title: 'FOUNDATION & EXISTENCE',
    items: [
      { id: 'identity-lab', label: 'Identity Lab', icon: Fingerprint },
      { id: 'consciousness-lab', label: 'Consciousness Lab', icon: Brain },
      { id: 'vacuum-lab', label: 'Vacuum Lab', icon: CircleDot },
      { id: 'dimension-lab', label: 'Dimension Lab (0D-36D)', icon: Boxes }
    ]
  },
  {
    title: 'COSMOLOGY & SIMULATION',
    items: [
      { id: 'universe-sim', label: 'Universe Simulator', icon: Globe },
      { id: 'multiverse-map', label: 'Multiverse Map', icon: GitFork },
      { id: 'emergence-lab', label: 'Emergence Lab', icon: Sparkles },
      { id: 'fractal-lab', label: 'Recursion & Fractals', icon: Zap }
    ]
  },
  {
    title: 'RIGOR & HYPOTHESIS',
    items: [
      { id: 'equation-lab', label: 'Equation Lab', icon: Sigma },
      { id: 'hypothesis-lab', label: 'Hypothesis Lab', icon: ShieldCheck }
    ]
  },
  {
    title: 'ENGINEERING & SYSTEMS',
    items: [
      { id: 'tech-lab', label: 'Technology Lab', icon: Wrench },
      { id: 'device-builder', label: 'Device Builder', icon: Layers },
      { id: 'sim-engine', label: 'Simulation Engine', icon: Activity },
      { id: 'machine-mind', label: 'Machine Mind Lab', icon: Network },
      { id: 'civ-sim', label: 'Civilization Simulator', icon: Users },
      { id: 'possibility-engine', label: 'Possibility Engine', icon: GitBranch }
    ]
  },
  {
    title: 'SYNTHESIS & OUTPUT',
    items: [
      { id: '3d-workshop', label: '3D Workshop', icon: Box },
      { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Share2 },
      { id: 'ai-researcher', label: 'AI Researcher', icon: Bot },
      { id: 'universal-codex', label: 'Universal Codex', icon: FileText }
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'projects', label: 'Projects System', icon: FolderKanban },
      { id: 'settings', label: 'Lab Settings', icon: Settings }
    ]
  }
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse
}) => {
  return (
    <aside
      className={`relative flex flex-col bg-slate-950 border-r border-slate-800/80 transition-all duration-300 z-30 ${
        collapsed ? 'w-16' : 'w-64'
      } h-screen select-none`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold shrink-0">
            <Atom className="w-5 h-5 text-cyan-400 animate-spin-slow" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-black tracking-wider text-slate-100 uppercase font-mono">
                EVERYTHING<span className="text-cyan-400">.LAB</span>
              </span>
              <span className="text-[10px] text-slate-400 truncate">Universal Research Suite</span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav Groups Container */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <div className="px-2 pb-1 text-[10px] font-bold text-slate-500 tracking-wider font-mono uppercase">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/30 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>v3.6.0 Unified</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Active
          </span>
        </div>
      )}
    </aside>
  );
};
