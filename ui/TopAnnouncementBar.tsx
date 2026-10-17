import React from 'react';
import { Wifi, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const TopAnnouncementBar: React.FC = () => {
  const tickerItems = [
    {
      icon: Wifi,
      iconColor: 'text-[#a8fbd3]',
      badge: 'OFFLINE MODE ACTIVE',
      badgeClass: 'text-[#a8fbd3] bg-[#a8fbd3]/10 border-[#a8fbd3]/30',
      text: 'NO CONNECTION? NO PROBLEM — BROWSE OUR ENTIRE WEBSITE & SHOWCASE FULLY OFFLINE',
    },
    {
      icon: Zap,
      iconColor: 'text-[#4fb7b3]',
      badge: 'ZERO-NETWORK READY',
      badgeClass: 'text-[#4fb7b3] bg-[#4fb7b3]/10 border-[#4fb7b3]/30',
      text: 'ALL PAGES & EDITS REMAIN ACCESSIBLE ANYTIME, ANYWHERE WITHOUT INTERNET',
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-[#a8fbd3]',
      badge: 'PWA INSTANT ACCESS',
      badgeClass: 'text-[#a8fbd3] bg-[#a8fbd3]/10 border-[#a8fbd3]/30',
      text: 'INSTALLED OR CACHED IN YOUR BROWSER FOR SEAMLESS 24/7 OFFLINE VISITS',
    },
    {
      icon: Sparkles,
      iconColor: 'text-[#6ee7b7]',
      badge: 'ALWAYS AVAILABLE',
      badgeClass: 'text-[#6ee7b7] bg-[#6ee7b7]/10 border-[#6ee7b7]/30',
      text: 'EXPERIENCE THE COMPLETE PORTFOLIO EVEN WHEN YOUR NET GOES DOWN',
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] bg-[#07080f]/95 backdrop-blur-xl border-b border-[#a8fbd3]/25 text-white text-[11px] font-mono uppercase tracking-widest h-[40px] flex items-center overflow-hidden select-none shadow-[0_4px_20px_rgba(0,0,0,0.7),0_1px_10px_rgba(168,251,211,0.15)]">
      {/* Subtle top ambient glow line */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#a8fbd3]/40 to-transparent pointer-events-none" />

      <div className="animate-ticker items-center">
        {/* Render two identical groups for seamless -50% infinite marquee loop */}
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex items-center shrink-0">
            {tickerItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-4 shrink-0 px-8">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0 animate-pulse`} />
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md border ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-gray-100 tracking-wider font-medium whitespace-nowrap drop-shadow-sm">
                    {item.text}
                  </span>
                  <span className="text-[#a8fbd3]/50 text-xs ml-4">✦</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
