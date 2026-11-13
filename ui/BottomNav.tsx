import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

interface ResponsiveNavProps {
  glaucusActive?: boolean;
  setGlaucusActive?: (active: boolean) => void;
}

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Graphic Design', path: 'https://domaindesign.vercel.app/' },
];

export const BottomNav: React.FC<ResponsiveNavProps> = ({
  glaucusActive = false,
  setGlaucusActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleGlaucusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setGlaucusActive) {
      const nextState = !glaucusActive;
      setGlaucusActive(nextState);
      if (nextState) {
        toast.success('Blue Glaucus summoned!', {
          description: 'Move your cursor to guide the glowing sea dragon.',
        });
      } else {
        toast('Blue Glaucus returned to the deep.');
      }
    }
  };

  return (
    <>
      {/* 1. MOBILE TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-transparent px-6 py-4 md:hidden pointer-events-auto">
        <div className="relative z-10 flex items-center justify-between">
          <div className="relative inline-block py-2">
            <Link
              to="/"
              className="relative z-10 font-heading text-lg font-bold tracking-tighter text-[#a8fbd3] inline-block"
            >
              DOMAIN EDITS
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {setGlaucusActive && (
              <button
                onClick={handleGlaucusToggle}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider uppercase bg-white/5 border ${
                  glaucusActive ? 'border-[#a8fbd3] text-[#a8fbd3]' : 'border-white/10 text-white/60'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{glaucusActive ? 'OFF' : 'GL'}</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white hover:text-[#a8fbd3] transition-colors rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(168,251,211,0.2)]"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-[#07080f]/98 flex flex-col items-center justify-center gap-6 md:hidden px-6"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-3 text-white hover:text-[#a8fbd3] transition-colors rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            {navItems.map((item) => {
              const isFullExternal = item.path.startsWith('http');
              if (isFullExternal) {
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

      {/* 2. DESKTOP BOTTOM DOCK */}
      <div
        className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.nav
          layout
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
          }}
          className="relative flex items-center justify-center rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] px-4 py-2.5 cursor-pointer hover:border-[#a8fbd3]/50 transition-colors group overflow-hidden"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a8fbd3]/10 via-[#4fb7b3]/10 to-[#31326f]/30 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <AnimatePresence mode="popLayout" initial={false}>
            {!isHovered ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.16 }}
                className="flex items-center justify-center w-10 h-10"
              >
                <span className="text-xl font-heading font-black tracking-tighter text-white">
                  DE
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 md:gap-2 px-1 relative z-10"
              >
                {navItems.map((item) => {
                  const isExternal = item.path.startsWith('/#') || item.path.startsWith('http');
                  const isFullExternal = item.path.startsWith('http');
                  const isActive =
                    location.pathname === item.path ||
                    (isExternal && location.pathname === '/' && location.hash === item.path.substring(1));

                  return (
                    <div key={item.name}>
                      {isExternal ? (
                        <a
                          href={item.path}
                          target={isFullExternal ? '_blank' : undefined}
                          rel={isFullExternal ? 'noopener noreferrer' : undefined}
                          className={`relative text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-2 rounded-xl transition-colors inline-block whitespace-nowrap ${
                            isActive
                              ? 'text-[#a8fbd3] bg-white/10 shadow-[0_0_12px_rgba(168,251,211,0.25)]'
                              : 'text-white/70 hover:text-[#a8fbd3] hover:bg-white/5'
                          }`}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.path}
                          className={`relative text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-2 rounded-xl transition-colors inline-block whitespace-nowrap ${
                            isActive
                              ? 'text-[#a8fbd3] bg-white/10 shadow-[0_0_12px_rgba(168,251,211,0.2)]'
                              : 'text-white/70 hover:text-[#a8fbd3] hover:bg-white/5'
                          }`}
                        >
                          {item.name}
                          {isActive && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a8fbd3]" />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {setGlaucusActive && (
                  <>
                    <span className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />
                    <button
                      onClick={handleGlaucusToggle}
                      className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 ${
                        glaucusActive
                          ? 'bg-[#a8fbd3]/20 border border-[#a8fbd3]/60 text-[#a8fbd3]'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/40'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{glaucusActive ? 'OFF' : 'GL'}</span>
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default BottomNav;
