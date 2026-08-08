import React from 'react';
import { BlueprintItem, BlueprintStyleMode } from '../types';
import { BlueprintCard } from './BlueprintCard';
import { BookmarkCheck, Trash2, Download, Search } from 'lucide-react';
import { getBlueprintById } from '../data/catalogEngine';

interface BlueprintVaultProps {
  blueprints: BlueprintItem[];
  bookmarkedIds: string[];
  styleMode: BlueprintStyleMode;
  onViewBlueprint: (bp: BlueprintItem) => void;
  onDownloadBlueprint: (bp: BlueprintItem) => void;
  onToggleBookmark: (id: string) => void;
  onClearVault: () => void;
}

export const BlueprintVault: React.FC<BlueprintVaultProps> = ({
  blueprints,
  bookmarkedIds,
  styleMode,
  onViewBlueprint,
  onDownloadBlueprint,
  onToggleBookmark,
  onClearVault
}) => {
  const savedBlueprints = bookmarkedIds
    .map((id) => blueprints.find((b) => b.id === id) || getBlueprintById(id))
    .filter((b): b is BlueprintItem => b !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 font-sans text-slate-100">
      {/* Vault Header */}
      <div className="bg-slate-900/90 border border-emerald-900/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <BookmarkCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Saved Engineering Workspace</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">My Blueprint Vault</h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {savedBlueprints.length} bookmarked schematic blueprints ready for offline CAD export or inspection.
          </p>
        </div>

        {savedBlueprints.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={onClearVault}
              className="px-3 py-1.5 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Vault
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Items */}
      {savedBlueprints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBlueprints.map((bp) => (
            <BlueprintCard
              key={bp.id}
              blueprint={bp}
              styleMode={styleMode}
              onView={onViewBlueprint}
              onDownload={onDownloadBlueprint}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-dashed border-emerald-900/60 rounded-2xl p-16 text-center space-y-3 font-mono text-xs text-slate-400">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-emerald-800 mx-auto flex items-center justify-center text-emerald-400">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-200">Your Vault is Empty</h3>
          <p className="text-slate-400 max-w-md mx-auto font-sans">
            Click the bookmark icon on any blueprint card or create custom "To Be Built" blueprints in the AI Concept Lab to save them to your personal workspace.
          </p>
        </div>
      )}
    </div>
  );
};
