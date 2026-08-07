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
    { name: 'WORK', path: '/portfolio', text: 'PORTFOLIO' },
    { name: 'SKILL', path: '/skill', text: 'SKILLS' },
    { name: 'ABOUT', path: '/about', text: 'ABOUT ME' },
    { name: 'CONTACT', path: '/contact', text: 'GET IN TOUCH' },
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered((prev) => !prev)}
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
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 px-2 py-0.5"
            >
              <span className="font-heading text-lg md:text-xl font-black tracking-wider text-white group-hover:text-[#a8fbd3] transition-colors">
                DE
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8fbd3] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8fbd3]" />
              </span>
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="w-3.5 h-3.5 text-white/50 group-hover:text-[#a8fbd3] transition-colors" />
              </motion.div>
            </motion.div>
          ) : (
            /* SPREAD / EXPANDED STATE: Show DE + WORK, SKILL, ABOUT, CONTACT */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-1 md:gap-3 px-1"
            >
              {/* DE Home Icon */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.02 }}
              >
                <Link
                  to="/"
                  onClick={(e) => e.stopPropagation()}
                  className={`font-heading text-base md:text-lg font-bold tracking-tight px-3 py-1.5 rounded-full transition-all flex items-center ${
                    location.pathname === '/'
                      ? 'text-[#a8fbd3] bg-white/10 shadow-[0_0_12px_rgba(168,251,211,0.2)]'
                      : 'text-white/80 hover:text-[#a8fbd3] hover:bg-white/5'
                  }`}
                >
                  DE
                </Link>
              </motion.div>

              <span className="w-1 h-1 rounded-full bg-white/20" />

              {/* Nav Links with staggered entrance */}
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.03 + idx * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => e.stopPropagation()}
                      className={`relative text-xs md:text-sm font-bold tracking-widest uppercase px-3 py-1.5 rounded-full transition-all inline-block ${
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
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#a8fbd3]"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Glaucus Summon Button if supported */}
              {setGlaucusActive && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: 0.15 }}
                    onClick={handleGlaucusToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all ${
                      glaucusActive
                        ? 'bg-[#a8fbd3]/20 border border-[#a8fbd3]/60 text-[#a8fbd3]'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/40'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{glaucusActive ? 'DISMISS' : 'GLAUCUS'}</span>
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
