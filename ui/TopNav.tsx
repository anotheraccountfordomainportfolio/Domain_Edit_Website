import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavProps {
  glaucusActive?: boolean;
  setGlaucusActive?: (active: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ glaucusActive = false, setGlaucusActive }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Graphic Design', path: 'https://domaindesign.vercel.app/' },
  ];

  return (
    <>
      {/* Fixed Top Header with Stacked Layout (Appearing strictly on top) */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-black/70 backdrop-blur-2xl border-b border-white/10 px-6 py-4 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
          
          {/* Row 1: Logo & Glaucus / Mobile Toggle */}
          <div className="w-full flex items-center justify-between">
            <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer">
              DE <span className="text-[#a8fbd3] text-xs font-mono ml-2">DOMINIC EDITS</span>
            </Link>

            <div className="flex items-center gap-3">
              {setGlaucusActive && (
                <button
                  onClick={() => setGlaucusActive(!glaucusActive)}
                  className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all bg-white/5 border ${
                    glaucusActive
                      ? 'border-[#a8fbd3]/60 text-[#a8fbd3] shadow-[0_0_15px_rgba(168,251,211,0.3)]'
                      : 'border-white/10 text-white/60 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/40'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{glaucusActive ? 'OFF' : 'GL'}</span>
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden z-50 p-2 text-white hover:text-[#a8fbd3] transition-colors rounded-xl bg-white/5 border border-white/10"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Row 2: Navigation Menu Links Centered On Top */}
          <div className="hidden md:flex items-center justify-center gap-8 pt-1 border-t border-white/5 w-full">
            {navItems.map((item) => {
              const isExternal = item.path.startsWith('http');
              const isActive = location.pathname === item.path;

              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono tracking-widest uppercase text-gray-400 hover:text-[#a8fbd3] transition-colors py-1"
                  >
                    {item.name}
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                    isActive ? 'text-[#a8fbd3]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="desktopActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a8fbd3]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay with Prominent Cross (Close) Button */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[9999] bg-[#07080f]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden px-6"
          >
            {/* Top Close / Cross Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-white hover:text-[#a8fbd3] transition-colors rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            {navItems.map((item) => {
              const isExternal = item.path.startsWith('http');

              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase text-center"
                  >
                    {item.name}
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase text-center"
                >
                  {item.name}
                </Link>
              );
            })}

            {setGlaucusActive && (
              <button
                onClick={() => {
                  setGlaucusActive(!glaucusActive);
                  setMobileMenuOpen(false);
                }}
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono tracking-wider uppercase bg-white/10 border border-white/20 text-[#a8fbd3]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Glaucus Effect: {glaucusActive ? 'OFF' : 'ON'}</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNav;
