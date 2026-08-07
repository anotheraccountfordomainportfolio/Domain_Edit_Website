import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Snail: React.FC = () => {
  const [isScared, setIsScared] = useState(false);

  // Handle click to shrink the snail into its shell and stop walking
  const handleScare = () => {
    if (isScared) return;
    setIsScared(true);
    // Stay inside shell for 5 seconds, then peek out and continue walking
    setTimeout(() => {
      setIsScared(false);
    }, 5000);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-0 overflow-visible pointer-events-none z-30">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes snailwalk {
          0% { left: -5%; transform: scaleX(1); }
          49.5% { left: 105%; transform: scaleX(1); }
          50% { left: 105%; transform: scaleX(-1); }
          99.5% { left: -5%; transform: scaleX(-1); }
          100% { left: -5%; transform: scaleX(1); }
        }
        .animate-snailwalk {
          animation: snailwalk 380s linear infinite;
        }
      `}} />
      <div
        className="absolute bottom-[-1.5px] pointer-events-auto cursor-pointer animate-snailwalk"
        style={{
          width: "70px",
          height: "45px",
          animationPlayState: isScared ? "paused" : "running",
        }}
        onClick={handleScare}
        data-hover="true"
        data-cursor-text="SNAIL"
      >
        <div className="relative w-full h-full flex items-end justify-start overflow-visible">
          
          {/* Slime Trail left behind with beautiful neon teal glow strictly on the border */}
          <div 
            className="absolute right-[45px] bottom-[3px] h-[2px] bg-gradient-to-l from-[#a8fbd3]/50 via-[#50dcd6]/15 to-transparent blur-[0.5px] shadow-[0_0_6px_rgba(168,251,211,0.3)]" 
            style={{ 
              width: "300px", 
              transformOrigin: "right center",
              pointerEvents: "none"
            }} 
          />

          {/* Snail Body & Shell */}
          <div className="relative w-[65px] h-[35px] flex items-end overflow-visible select-none">
            
            {/* The Snail Body */}
            <motion.div
              className="absolute left-[2px] bottom-[1px] h-[9px] bg-[#fdf5e6] rounded-full border border-black/10 origin-bottom-left"
              animate={{
                // Crawling inching effect: squeeze & stretch
                scaleX: isScared ? 0.15 : [1, 1.15, 0.95, 1],
                scaleY: isScared ? 0.3 : [1, 0.9, 1.05, 1],
                x: isScared ? 12 : [0, 4, -2, 0],
              }}
              transition={{
                duration: isScared ? 0.3 : 4.5, // much slower body crawl cycle (4.5s)
                repeat: isScared ? 0 : Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "44px",
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {/* Snail Tail */}
              <div className="absolute left-[-4px] bottom-0 w-[8px] h-[5px] bg-[#fdf5e6] rounded-l-full border-l border-black/10" />

              {/* Snail Neck and Head */}
              <motion.div 
                className="absolute right-[-10px] bottom-0 w-[14px] h-[24px] bg-[#fdf5e6] rounded-t-full flex flex-col items-center justify-start origin-bottom"
                animate={{
                  height: isScared ? 2 : [24, 25, 23, 24],
                  rotate: isScared ? -15 : [0, 4, -3, 0],
                  y: isScared ? 6 : 0,
                }}
                transition={{
                  duration: isScared ? 0.25 : 5.0, // much slower neck movement (5.0s)
                  repeat: isScared ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Antennas / Eye stalks */}
                <motion.div 
                  className="flex justify-between w-[12px] absolute top-[-8px]"
                  animate={{
                    scaleY: isScared ? 0 : 1,
                    opacity: isScared ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Left Eye stalk */}
                  <motion.div 
                    className="w-[2px] h-[9px] bg-[#fdf5e6] flex flex-col items-center justify-start rounded-full origin-bottom"
                    animate={{ rotate: [-5, 8, -5] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} // much slower eye wiggle
                  >
                    <div className="w-[3.5px] h-[3.5px] bg-black rounded-full mt-[-2px]" />
                  </motion.div>

                  {/* Right Eye stalk */}
                  <motion.div 
                    className="w-[2px] h-[9px] bg-[#fdf5e6] flex flex-col items-center justify-start rounded-full origin-bottom"
                    animate={{ rotate: [8, -6, 8] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} // much slower eye wiggle
                  >
                    <div className="w-[3.5px] h-[3.5px] bg-black rounded-full mt-[-2px]" />
                  </motion.div>
                </motion.div>

                {/* Blushing cheek */}
                <div className="w-1.5 h-1 bg-red-400/40 rounded-full absolute top-[6px] right-[2px] blur-[0.5px]" />
              </motion.div>
            </motion.div>

            {/* Snail Shell */}
            <motion.div
              className="absolute left-[6px] bottom-[3px] z-10 origin-bottom"
              animate={{
                scale: isScared ? 0.95 : [1, 1.03, 0.97, 1],
                rotateZ: isScared ? -3 : [0, 2, -2, 0],
                y: isScared ? 2 : 0,
              }}
              transition={{
                duration: isScared ? 0.2 : 2.5,
                repeat: isScared ? 0 : Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "32px",
                height: "26px",
              }}
            >
              <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <defs>
                  {/* Beautiful golden-brown snail shell gradient */}
                  <linearGradient id="snailShellGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d2b48c" />
                    <stop offset="50%" stopColor="#8b5a2b" />
                    <stop offset="100%" stopColor="#3d2314" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 65 
                     C 5 45, 10 15, 45 10
                     C 80 5, 95 30, 90 55
                     C 85 75, 55 78, 30 70
                     C 15 65, 20 40, 40 35
                     C 60 30, 75 45, 70 60
                     C 65 70, 50 70, 45 60
                     C 40 50, 50 45, 55 50"
                  fill="none"
                  stroke="url(#snailShellGrad)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Spiral shell highlight */}
                <path
                  d="M 30 18 C 50 12, 75 22, 80 40 C 85 55, 75 68, 60 68"
                  fill="none"
                  stroke="#ffebcd"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </motion.div>

            {/* Interactive Sweat/Scared droplets when scared */}
            {isScared && (
              <>
                <motion.div
                  className="absolute left-[38px] top-[-8px] w-1 h-2 bg-blue-400 rounded-full"
                  initial={{ opacity: 1, y: 0, scale: 0.6 }}
                  animate={{ opacity: 0, y: -10, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute left-[20px] top-[-5px] w-1.5 h-1.5 bg-blue-400 rounded-full"
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
