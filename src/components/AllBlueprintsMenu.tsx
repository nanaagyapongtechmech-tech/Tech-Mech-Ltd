import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  Filter,
  Layers,
  Sparkles,
  BookmarkCheck,
  Bookmark,
  Eye,
  Scale,
  Share2,
  Check,
  Calendar,
  User,
  Tag,
  Grid,
  List,
  FolderTree,
  FileText,
  Clock,
  ArrowUpDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Cpu,
  Database,
  ArrowRight
} from 'lucide-react';
import { BlueprintItem, BlueprintStatus } from '../types';
import {
  queryCatalog,
  TOTAL_CATALOG_COUNT,
  ORIGINAL_BLUEPRINTS_COUNT,
  AI_BLUEPRINTS_COUNT
} from '../data/catalogEngine';

interface AllBlueprintsMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  blueprints?: BlueprintItem[];
  onSelectBlueprint?: (bp: BlueprintItem) => void;
  onViewBlueprint?: (bp: BlueprintItem) => void;
  bookmarkedIds?: string[];
  onToggleBookmark?: (id: string) => void;
  onSelectForCompare?: (bp: BlueprintItem) => void;
  onCompareBlueprints?: (bp?: BlueprintItem) => void;
  compareList?: BlueprintItem[];
  onOpenLinkGenerator?: (bpId?: string) => void;
  styleMode?: any;
  isInline?: boolean;
}

const CATEGORIES_LIST = [
  'All Categories',
  'Aerospace & Aeronautics',
  'Mechanical & Engines',
  'Architecture & Mega-Structures',
  'Computing & Cybernetics',
  'Robotics & Automation',
  'Energy & Quantum',
  'Automotive & Transportation',
  'Medical & Biotechnology',
  'Optics & Astronomy',
  'Consumer Technology',
  'To Be Built Concepts'
];

export const AllBlueprintsMenu: React.FC<AllBlueprintsMenuProps> = ({
  isOpen = true,
  onClose,
  blueprints = [],
  onSelectBlueprint,
  onViewBlueprint,
  bookmarkedIds = [],
  onToggleBookmark = (_id: string) => {},
  onSelectForCompare,
  onCompareBlueprints,
  compareList = [],
  onOpenLinkGenerator,
  isInline = false
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [tierFilter, setTierFilter] = useState<'all' | 'original' | 'ai'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'year-asc' | 'year-desc' | 'popular'>('popular');
  const [viewMode, setViewMode] = useState<'compact' | 'cards' | 'grouped'>('compact');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>('1');
  const limit = 48;

  const handleSelect = (bp: BlueprintItem) => {
    if (onSelectBlueprint) onSelectBlueprint(bp);
    if (onViewBlueprint) onViewBlueprint(bp);
    if (onClose) onClose();
  };

  const handleCompare = (bp: BlueprintItem) => {
    if (onSelectForCompare) onSelectForCompare(bp);
    if (onCompareBlueprints) onCompareBlueprints(bp);
  };

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setPage(1);
    setPageInput('1');
  }, [search, selectedStatus, selectedCategory, tierFilter, sortBy]);

  // Keep pageInput synced with page
  useEffect(() => {
    setPageInput(page.toString());
  }, [page]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scrolling on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Query Catalog Engine across 39,700,000 Blueprints
  const catalogResult = useMemo(() => {
    return queryCatalog({
      searchQuery: search,
      category: selectedCategory === 'All Categories' ? 'All' : selectedCategory,
      status: selectedStatus,
      tierFilter: tierFilter,
      sortBy: sortBy as any,
      page: page,
      limit: limit
    });
  }, [search, selectedCategory, selectedStatus, tierFilter, sortBy, page, limit]);

  const displayedItems = catalogResult.items;
  const totalItems = catalogResult.total;
  const totalPages = catalogResult.totalPages;

  // Grouped by Category for 'grouped' viewMode
  const groupedBlueprints = useMemo<Record<string, BlueprintItem[]>>(() => {
    const groups: Record<string, BlueprintItem[]> = {};
    displayedItems.forEach((bp) => {
      if (!groups[bp.category]) groups[bp.category] = [];
      groups[bp.category].push(bp);
    });
    return groups;
  }, [displayedItems]);

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPage = parseInt(pageInput, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      setPage(targetPage);
    } else {
      setPageInput(page.toString());
    }
  };

  const handleShare = async (e: React.MouseEvent, bp: BlueprintItem) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/?bp=${bp.id}`;
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl, customCode: bp.id })
      });
      if (res.ok) {
        const data = await res.json();
        await navigator.clipboard.writeText(data.shortUrl || fullUrl);
      } else {
        await navigator.clipboard.writeText(fullUrl);
      }
    } catch {
      await navigator.clipboard.writeText(fullUrl);
    }
    setCopiedId(bp.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!isOpen) return null;

  const getStatusBadge = (status: BlueprintStatus) => {
    switch (status) {
      case 'Historical Patent':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Historic Patent
          </span>
        );
      case 'Active Standard':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Active Standard
          </span>
        );
      case 'To Be Built Concept':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> AI Concept
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer / Main Container */}
      <div className="relative w-full max-w-5xl bg-[#090D16] border-l border-slate-800 h-full shadow-2xl flex flex-col z-10 font-sans">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold relative overflow-hidden">
              <img src="/icon.svg" alt="App Logo" className="w-8 h-8 rounded-lg" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                  OmniBlueprint Catalogue
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" />
                  {TOTAL_CATALOG_COUNT.toLocaleString()} Schematics
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Full Capacity: 19.7M Original Blueprints + 20M AI Added Schematics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Vault</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Close Directory Menu (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tier Capacity Quick Stats Banner */}
        <div className="px-6 py-2.5 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setTierFilter('all'); setSelectedStatus('All'); }}
              className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                tierFilter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>All ({TOTAL_CATALOG_COUNT.toLocaleString()})</span>
            </button>

            <button
              onClick={() => { setTierFilter('original'); setSelectedStatus('All'); }}
              className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                tierFilter === 'original'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Original Tier ({ORIGINAL_BLUEPRINTS_COUNT.toLocaleString()})</span>
            </button>

            <button
              onClick={() => { setTierFilter('ai'); setSelectedStatus('To Be Built Concept'); }}
              className={`px-3 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                tierFilter === 'ai'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-purple-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Added Tier ({AI_BLUEPRINTS_COUNT.toLocaleString()})</span>
            </button>
          </div>

          <div className="text-slate-400 text-[11px] hidden lg:block">
            Showing Page <strong className="text-cyan-400">{page.toLocaleString()}</strong> of <strong className="text-slate-200">{totalPages.toLocaleString()}</strong> ({totalItems.toLocaleString()} matching)
          </div>
        </div>

        {/* Controls Bar: Search, Filters & View Mode */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/40 space-y-3">
          {/* Search Row */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 39.7M schematics by title, patent # (e.g. BP-AI20M-1, BP-M19M-50), inventor, keyword..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-11 pr-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters & View Switches Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Type Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-sans cursor-pointer"
              >
                <option value="All">All Blueprint Types</option>
                <option value="Historical Patent">Historical Patents (19.7M Original)</option>
                <option value="Active Standard">Active Standards (Modern CAD)</option>
                <option value="To Be Built Concept">To Be Built Concepts (20M AI)</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-sans cursor-pointer max-w-[200px] truncate"
              >
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Sort Order */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-sans cursor-pointer"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="title">Sort: Title (A-Z)</option>
                <option value="year-desc">Sort: Year (Newest First)</option>
                <option value="year-asc">Sort: Year (Oldest First)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('compact')}
                title="Compact Directory Table View"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'compact' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                title="Cards Grid View"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'cards' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grouped')}
                title="Grouped by Category View"
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grouped' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderTree className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Blueprint List Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {displayedItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-600">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-300">No Schematics Match Your Filter</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting search keywords, clearing filters, or switching catalog tiers.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedStatus('All');
                  setSelectedCategory('All Categories');
                  setTierFilter('all');
                }}
                className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs text-cyan-400 rounded-xl hover:bg-slate-800 font-mono transition-colors"
              >
                Reset Catalogue Filters
              </button>
            </div>
          ) : viewMode === 'compact' ? (
            /* COMPACT LIST DIRECTORY VIEW */
            <div className="space-y-2">
              {displayedItems.map((bp) => {
                const isBookmarked = bookmarkedIds.includes(bp.id);
                const isCompared = compareList.some((c) => c.id === bp.id);

                return (
                  <div
                    key={bp.id}
                    onClick={() => {
                      onSelectBlueprint(bp);
                      onClose();
                    }}
                    className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl p-3.5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Blueprint Thumbnail Icon */}
                      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800/80 flex-shrink-0 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                        <FileText className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white group-hover:text-cyan-300 transition-colors text-sm">
                            {bp.title}
                          </span>
                          {getStatusBadge(bp.status)}
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                            {bp.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
                          <span className="text-cyan-400 font-semibold">{bp.patentNumber}</span>
                          <span>• Inventor: <strong className="text-slate-300">{bp.inventor}</strong></span>
                          <span>• Year: <strong className="text-slate-300">{bp.year}</strong></span>
                          <span>• Hotspots: <strong className="text-slate-300">{bp.hotspots?.length || 0}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      {/* Compare Button */}
                      <button
                        onClick={() => handleCompare(bp)}
                        title={isCompared ? 'In Schematic Comparator' : 'Add to Comparator'}
                        className={`p-2 rounded-lg text-xs font-mono border transition-all ${
                          isCompared
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <Scale className="w-4 h-4" />
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => onToggleBookmark(bp.id)}
                        title={isBookmarked ? 'Remove from Vault' : 'Save to Vault'}
                        className={`p-2 rounded-lg text-xs font-mono border transition-all ${
                          isBookmarked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      {/* Share short link button */}
                      <button
                        onClick={(e) => handleShare(e, bp)}
                        title="Copy Short URL Link"
                        className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-all text-xs"
                      >
                        {copiedId === bp.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      </button>

                      {/* View Blueprint Action */}
                      <button
                        onClick={() => handleSelect(bp)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : viewMode === 'cards' ? (
            /* CARDS GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedItems.map((bp) => {
                const isBookmarked = bookmarkedIds.includes(bp.id);

                return (
                  <div
                    key={bp.id}
                    onClick={() => handleSelect(bp)}
                    className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between cursor-pointer space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {getStatusBadge(bp.status)}
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">{bp.patentNumber}</span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {bp.title}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {bp.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                      <div>
                        <span>{bp.inventor}</span> • <span>{bp.year}</span>
                      </div>

                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleBookmark(bp.id)}
                          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleSelect(bp)}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px]"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* GROUPED BY CATEGORY VIEW */
            <div className="space-y-6">
              {(Object.entries(groupedBlueprints) as Array<[string, BlueprintItem[]]>).map(([catName, items]) => (
                <div key={catName} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <FolderTree className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{catName}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800">
                      {items.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map((bp) => (
                      <div
                        key={bp.id}
                        onClick={() => handleSelect(bp)}
                        className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-slate-200 hover:text-cyan-300">{bp.title}</span>
                            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2 mt-0.5">
                              <span className="text-cyan-400">{bp.patentNumber}</span>
                              <span>• {bp.inventor} ({bp.year})</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          {getStatusBadge(bp.status)}
                          <button
                            onClick={() => handleSelect(bp)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-slate-300 text-[11px] transition-colors"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Catalogue Pagination Bar */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          {/* Page Info */}
          <div className="text-slate-400 flex items-center gap-2">
            <span>Page <strong className="text-cyan-400">{page.toLocaleString()}</strong> of <strong className="text-slate-200">{totalPages.toLocaleString()}</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">Showing {displayedItems.length} items</span>
          </div>

          {/* Jump to page form */}
          <form onSubmit={handlePageJump} className="flex items-center gap-1.5">
            <span className="text-slate-500">Jump:</span>
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="w-16 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center text-cyan-300 font-bold focus:outline-none focus:border-cyan-500 text-xs"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-cyan-400 font-bold text-xs"
            >
              Go
            </button>
          </form>

          {/* Pagination Navigation Controls */}
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => setPage(1)}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              title="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page <= 100}
              onClick={() => setPage(Math.max(1, page - 100))}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px] disabled:opacity-30 disabled:pointer-events-none"
              title="-100 Pages"
            >
              -100
            </button>
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 py-1 text-cyan-300 font-bold">
              {page}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              disabled={page + 100 > totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 100))}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px] disabled:opacity-30 disabled:pointer-events-none"
              title="+100 Pages"
            >
              +100
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              title="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
