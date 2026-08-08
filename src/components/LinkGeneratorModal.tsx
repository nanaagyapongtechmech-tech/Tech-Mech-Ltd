import React, { useState, useEffect } from 'react';
import {
  X,
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  Sparkles,
  ExternalLink,
  QrCode,
  Smartphone,
  Download,
  PlusSquare,
  Globe,
  Info,
  CheckCircle2,
  Compass,
  Laptop
} from 'lucide-react';
import { BlueprintItem } from '../types';

interface LinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueprints: BlueprintItem[];
  defaultBlueprintId?: string;
  defaultTab?: 'share' | 'install';
}

export const LinkGeneratorModal: React.FC<LinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  blueprints,
  defaultBlueprintId,
  defaultTab = 'share'
}) => {
  const [activeTab, setActiveTab] = useState<'share' | 'install'>(defaultTab);
  const [selectedBpId, setSelectedBpId] = useState<string>(defaultBlueprintId || 'app');
  const [customAlias, setCustomAlias] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [nativeShareSuccess, setNativeShareSuccess] = useState<boolean>(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    if (defaultBlueprintId) {
      setSelectedBpId(defaultBlueprintId);
      const bp = blueprints.find((b) => b.id === defaultBlueprintId);
      if (bp) {
        setCustomAlias(bp.id.toLowerCase());
      }
    } else {
      setSelectedBpId('app');
      setCustomAlias('');
    }
  }, [defaultBlueprintId, blueprints, isOpen]);

  // Listen for PWA beforeinstallprompt & standalone display mode
  useEffect(() => {
    // Check if running as installed standalone app
    const isStandaloneApp = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneApp);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Generate Link
  const handleGenerate = async () => {
    setIsGenerating(true);
    setCopied(false);

    try {
      let targetUrl = window.location.origin + '/';
      if (selectedBpId !== 'app') {
        targetUrl = `${window.location.origin}/?bp=${selectedBpId}`;
      }

      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl,
          customCode: customAlias.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        const fullShortUrl = `${window.location.origin}/s/${data.code}`;
        setGeneratedLink(fullShortUrl);
        setShortCode(data.code);
      } else {
        const code = customAlias.trim() || Math.random().toString(36).substring(2, 7);
        const fallback = `${window.location.origin}/s/${code}`;
        setGeneratedLink(fallback);
        setShortCode(code);
      }
    } catch {
      const code = customAlias.trim() || Math.random().toString(36).substring(2, 7);
      const fallback = `${window.location.origin}/s/${code}`;
      setGeneratedLink(fallback);
      setShortCode(code);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleGenerate();
    }
  }, [isOpen, selectedBpId]);

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = generatedLink || window.location.href;
    const currentBp = blueprints.find((b) => b.id === selectedBpId);
    const title = currentBp ? `OmniBlueprint: ${currentBp.title}` : 'OmniBlueprint & Patent Archive';
    const text = currentBp
      ? `Check out this vector engineering schematic for ${currentBp.title}`
      : 'Explore interactive vector CAD schematics, patent blueprints, and AI blueprints.';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        setNativeShareSuccess(true);
        setTimeout(() => setNativeShareSuccess(false), 3000);
      } catch (err) {
        // User cancelled or error
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleTriggerPwaInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
    }
  };

  if (!isOpen) return null;

  const currentBp = blueprints.find((b) => b.id === selectedBpId);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generatedLink || window.location.href)}&color=06b6d4&bgcolor=020617`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#090D16] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-slate-200 font-sans flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Share & Add to Home Screen
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Generate short links, install app, or add shortcut to your home screen
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'share'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Short Link & Share</span>
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`pb-3 px-4 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'install'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Add to Home Screen / Install</span>
            {deferredPrompt && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 flex-1">
          {activeTab === 'share' ? (
            /* SHARE & LINK GENERATOR TAB */
            <div className="space-y-5">
              {/* Destination Target Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Select Link Destination Target
                </label>
                <select
                  value={selectedBpId}
                  onChange={(e) => setSelectedBpId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                >
                  <option value="app">🌐 Main Application Homepage</option>
                  <optgroup label="Specific Blueprints & Schematics">
                    {blueprints.map((bp) => (
                      <option key={bp.id} value={bp.id}>
                        📄 [{bp.patentNumber}] {bp.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Custom Short Alias */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
                  <span>Custom Short Code Alias (Optional)</span>
                  <span className="text-slate-500 text-[10px] font-normal">e.g. /s/tesla-coil</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 text-xs font-mono select-none">
                    /s/
                  </span>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="custom-alias"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-cyan-300 font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Output Result Box */}
              {generatedLink && (
                <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Shareable Short URL Ready
                    </span>
                    {shortCode && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md">
                        Code: <strong className="text-cyan-300">{shortCode}</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                    <img src="/icon.svg" alt="App Logo" className="w-5 h-5 rounded-md border border-cyan-500/40 flex-shrink-0 shadow-sm" />
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="bg-transparent text-slate-100 font-mono text-xs w-full focus:outline-none select-all font-bold"
                    />
                    <button
                      onClick={handleCopy}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all flex-shrink-0 ${
                        copied
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Native Share & QR Code row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleNativeShare}
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      <span>{nativeShareSuccess ? 'Shared!' : 'Native OS Share Drawer'}</span>
                    </button>

                    <a
                      href={generatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-200 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all text-center"
                    >
                      <img src="/icon.svg" alt="App Logo" className="w-4 h-4 rounded-sm flex-shrink-0" />
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Test Open Link</span>
                    </a>
                  </div>

                  {/* Phone Scan QR Code Box */}
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-4">
                    <img
                      src={qrCodeUrl}
                      alt="Blueprint Share QR Code"
                      className="w-16 h-16 rounded-lg bg-slate-950 p-1 border border-slate-800 flex-shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-white flex items-center gap-1">
                        <QrCode className="w-3.5 h-3.5 text-cyan-400" /> Scan with Phone Camera
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Point your mobile camera to open this blueprint directly and add it to your home screen.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* INSTALL & ADD TO HOME SCREEN TAB */
            <div className="space-y-5">
              {/* Check if running inside Google AI Studio preview iframe */}
              {typeof window !== 'undefined' && window.self !== window.top && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-2xl space-y-3">
                  <div className="flex items-start gap-3">
                    <img src="/icon.svg" alt="OmniBlueprint Logo" className="w-9 h-9 rounded-xl border border-cyan-500/40 shadow-md flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-amber-400" /> Preview Frame Installation Note
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        You are currently inside the AI Studio preview iframe. To install <strong>OmniBlueprint Archive</strong> with its custom app logo on your home screen (instead of AI Studio wrapper):
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(window.location.origin, '_blank')}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer uppercase tracking-wider"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open App in Direct Tab (Install App Logo)</span>
                  </button>
                </div>
              )}

              {/* App Identity Banner */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/app_icon.jpg" alt="OmniBlueprint App Logo" className="w-12 h-12 rounded-2xl border border-cyan-500/40 shadow-md object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-sm">OmniBlueprint Archive</h4>
                    <p className="text-xs font-mono text-cyan-400">40,000,000 Vector CAD Schematics</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
                  PWA Ready
                </span>
              </div>

              {/* Standalone Status or Native Install Prompt */}
              {isStandalone ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">App Already Installed!</h4>
                    <p className="text-xs text-emerald-400/80">
                      You are running OmniBlueprint in standalone app mode on your home screen.
                    </p>
                  </div>
                </div>
              ) : deferredPrompt ? (
                <div className="p-5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Direct Browser Installation Ready</h4>
                      <p className="text-xs text-slate-300">
                        Install OmniBlueprint as a standalone native app on your home screen or desktop.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleTriggerPwaInstall}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install OmniBlueprint Now</span>
                  </button>
                </div>
              ) : null}

              {/* Step-by-Step Home Screen Instructions */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                  <Smartphone className="w-4 h-4" /> How to Add to Home Screen Manually
                </h4>

                {/* Mobile iOS Guide */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white border-b border-slate-800/80 pb-2">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>Apple iPhone & iPad (Safari)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">
                      iOS
                    </span>
                  </div>

                  <ol className="space-y-2 text-xs text-slate-300 font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <span>
                        Tap the <strong className="text-white font-mono">Share</strong> button (<Share2 className="w-3.5 h-3.5 inline text-cyan-400" />) in your Safari browser navigation bar.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <span>
                        Scroll down the menu list and tap <strong className="text-white">"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-cyan-400" />).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <span>
                        Tap <strong className="text-white">"Add"</strong> in the top right corner to save the app icon to your home screen!
                      </span>
                    </li>
                  </ol>
                </div>

                {/* Android & Chrome Guide */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white border-b border-slate-800/80 pb-2">
                    <span className="flex items-center gap-1.5 text-slate-200">
                      <span>Android Phone & Chrome Desktop</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">
                      Android / Chrome
                    </span>
                  </div>

                  <ol className="space-y-2 text-xs text-slate-300 font-sans">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <span>
                        Tap the browser options menu (<strong className="text-white font-mono">⋮</strong> or three dots) in the top right.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <span>
                        Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <span>
                        Confirm to launch OmniBlueprint in full-screen offline-ready mode!
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>OmniBlueprint PWA • Vector CAD & AI Schematics</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
