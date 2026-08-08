import React, { useState } from 'react';
import { ResearchProject } from '../../types/lab';
import { FolderKanban, Plus, Download, Upload, Trash2, Check, BookOpen } from 'lucide-react';

interface ProjectsViewProps {
  projects: ResearchProject[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onAddProject: (proj: ResearchProject) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onAddProject,
  onDeleteProject
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Theoretical Physics');
  const [summary, setSummary] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newProj: ResearchProject = {
      id: 'proj-' + Date.now(),
      title: title.trim(),
      category,
      summary: summary.trim(),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      ideas: [],
      equations: [],
      hypotheses: [],
      devices: [],
      universes: [],
      chapters: []
    };

    onAddProject(newProj);
    setTitle('');
    setSummary('');
  };

  const handleExportJSON = (proj: ResearchProject) => {
    const blob = new Blob([JSON.stringify(proj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proj.title.replace(/\s+/g, '_')}_ResearchBundle.json`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <FolderKanban className="w-4 h-4" />
            PROJECTS SYSTEM • RESEARCH BUNDLE MANAGEMENT
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Research Projects & Data Bundles</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage projects, switch active research environments, and export complete JSON data archives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold text-slate-200 font-mono uppercase">CREATE RESEARCH PROJECT</h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">TITLE</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Higher-Dimensional Fluid Dynamics"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Theoretical Physics">Theoretical Physics</option>
                <option value="Mathematics & Epistemology">Mathematics & Epistemology</option>
                <option value="Universal Automation">Universal Automation</option>
                <option value="Cosmology & Multiverse">Cosmology & Multiverse</option>
                <option value="Cognitive Architecture">Cognitive Architecture</option>
                <option value="Advanced Engineering">Advanced Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">SUMMARY</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                placeholder="Core objectives and research questions..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Initialize Project</span>
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-200 font-mono uppercase">ALL PROJECTS ({projects.length})</h2>

          <div className="space-y-3">
            {projects.map((proj) => {
              const isActive = proj.id === activeProjectId;
              return (
                <div
                  key={proj.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isActive
                      ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase">
                        {proj.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-100 mt-1.5">{proj.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExportJSON(proj)}
                        className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
                        title="Export JSON Archive"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {projects.length > 1 && (
                        <button
                          onClick={() => onDeleteProject(proj.id)}
                          className="p-1.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{proj.summary}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-[10px] font-mono text-slate-500">
                      Ideas: {proj.ideas.length} • Equations: {proj.equations.length}
                    </span>

                    {!isActive && (
                      <button
                        onClick={() => onSelectProject(proj.id)}
                        className="px-3 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-colors"
                      >
                        Set as Active Focus →
                      </button>
                    )}
                    {isActive && (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-bold">
                        <Check className="w-3.5 h-3.5" /> ACTIVE FOCUS
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
