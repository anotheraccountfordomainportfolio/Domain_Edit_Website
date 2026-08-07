/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  // Star field optimized with CSS translate3d for GPU acceleration
  const stars = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.6 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white opacity-40"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translate3d(0,0,0)',
            willChange: 'opacity, transform',
          }}
          initial={{ opacity: star.opacity }}
          animate={{
            opacity: [star.opacity, star.opacity * 1.8, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#242555] transform-gpu">
      
      <StarField />

      {/* Blob 1: Mint radial gradient */}
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[100vw] h-[100vw] rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(168,251,211,0.5) 0%, rgba(168,251,211,0) 70%)',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Blob 2: Teal radial gradient */}
      <motion.div
        className="absolute top-[15%] right-[-25%] w-[110vw] h-[90vw] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(79,183,179,0.5) 0%, rgba(79,183,179,0) 70%)',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 3: Periwinkle radial gradient */}
      <motion.div
        className="absolute bottom-[-25%] left-[10%] w-[90vw] h-[90vw] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99,122,185,0.5) 0%, rgba(99,122,185,0) 70%)',
          transform: 'translate3d(0,0,0)',
          willChange: 'transform',
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Static Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/50 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;