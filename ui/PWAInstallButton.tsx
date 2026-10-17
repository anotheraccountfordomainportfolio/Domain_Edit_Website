import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Share } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-[#a8fbd3] text-black px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(168,251,211,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer"
        title="Install Website App for Offline Use"
      >
        <Download className="w-4 h-4" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 text-white px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 cursor-pointer"
        >
          <Share className="w-4 h-4 text-[#a8fbd3]" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-sm rounded-3xl bg-[#0a0a0a] border border-[#a8fbd3]/40 p-6 shadow-[0_0_40px_rgba(168,251,211,0.3)] text-white">
              <h3 className="text-lg font-heading font-bold text-[#a8fbd3] mb-3">Install on iPhone / iPad</h3>
              <p className="text-sm text-gray-300 font-mono leading-relaxed mb-6">
                1. Tap the <strong className="text-white">Share</strong> button in Safari toolbar.<br /><br />
                2. Scroll down and tap <strong className="text-white">Add to Home Screen</strong>.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-[#a8fbd3] text-black py-2.5 text-xs font-heading font-bold uppercase tracking-wider hover:opacity-95 transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
