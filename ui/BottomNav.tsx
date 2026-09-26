import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

interface BottomNavProps {
  glaucusActive?: boolean;
  setGlaucusActive?: (active: boolean) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  glaucusActive = false,
  setGlaucusActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Review', path: '/#review' },
    { name: 'Graphic Design', path: 'https://domaindesign.vercel.app/' },
  ];

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
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.nav
        layout
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
          mass: 0.8,
        }}
        className="relative flex items-center justify-center rounded-full bg-slate-950/85 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] px-4 py-2.5 cursor-pointer hover:border-[#a8fbd3]/50 transition-colors group overflow-hidden"
      >
        {/* Glow backdrop behind dock */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#a8fbd3]/10 via-[#4fb7b3]/10 to-[#31326f]/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <AnimatePresence mode="popLayout" initial={false}>
          {!isHovered ? (
            /* COLLAPSED STATE: Only show "DE" */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-10 h-10"
            >
              <span className="text-xl font-heading font-black tracking-tighter text-white">
                DE
              </span>
            </motion.div>
          ) : (
            /* EXPANDED STATE: Show full nav */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1 md:gap-2 px-1 relative z-10"
            >
              {/* Nav Links */}
              {navItems.map((item, idx) => {
                const isExternal = item.path.startsWith('/#') || item.path.startsWith('http');
                const isFullExternal = item.path.startsWith('http');
                const isActive = location.pathname === item.path || (isExternal && location.pathname === '/' && location.hash === item.path.substring(1));
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {isExternal ? (
                      <a
                        href={item.path}
                        target={isFullExternal ? "_blank" : undefined}
                        rel={isFullExternal ? "noopener noreferrer" : undefined}
                        className={`relative text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-2 rounded-xl transition-all inline-block whitespace-nowrap ${
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
                        className={`relative text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-2 rounded-xl transition-all inline-block whitespace-nowrap ${
                          isActive
                            ? 'text-[#a8fbd3] bg-white/10 shadow-[0_0_12px_rgba(168,251,211,0.2)]'
                            : 'text-white/70 hover:text-[#a8fbd3] hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.span
                            layoutId="activeIndicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a8fbd3]"
                          />
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Glaucus Summon Button if supported */}
              {setGlaucusActive && (
                <>
                  <span className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onClick={handleGlaucusToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all ${
                      glaucusActive
                        ? 'bg-[#a8fbd3]/20 border border-[#a8fbd3]/60 text-[#a8fbd3]'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/40'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{glaucusActive ? 'OFF' : 'GL'}</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default BottomNav;
