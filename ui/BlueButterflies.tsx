import React from 'react';
import { motion } from 'framer-motion';

const BlueWingLeft = () => (
  <svg viewBox="0 0 50 60" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,240,255,0.9)]">
    <defs>
      <linearGradient id="blueWingGrad" x1="1" y1="0.5" x2="0" y2="0">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="50%" stopColor="#0072ff" />
        <stop offset="100%" stopColor="#000c3a" />
      </linearGradient>
    </defs>
    <path
      d="M 50 30 
         C 40 10, 10 5, 5 15 
         C 0 25, 20 35, 45 35 
         C 30 45, 10 50, 15 58 
         C 20 62, 40 55, 50 30 Z"
      fill="url(#blueWingGrad)"
      stroke="#d2f7ff"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M 45 28 C 35 18, 20 15, 15 20 C 12 24, 25 30, 42 30"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.8"
      opacity="0.6"
    />
  </svg>
);

const BlueWingRight = () => (
  <div style={{ transform: "scaleX(-1)" }} className="w-full h-full">
    <BlueWingLeft />
  </div>
);

interface ButterflyProps {
  path: {
    x: number[];
    y: number[];
    scale: number[];
    rotateZ: number[];
    rotateX: number[];
    zIndex: number[];
    opacity: number[];
  };
  duration: number;
}

const Butterfly: React.FC<ButterflyProps> = ({ path, duration }) => {
  const flapDuration = 0.15 + Math.random() * 0.08;
  
  return (
    <motion.div
      className="absolute pointer-events-none select-none will-change-transform"
      animate={{
        x: path.x,
        y: path.y,
        scale: path.scale,
        rotateZ: path.rotateZ,
        rotateX: path.rotateX,
        zIndex: path.zIndex,
        opacity: path.opacity,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: "50px",
        height: "40px",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Main Butterfly Body & Wings Layout */}
      <div className="flex items-center justify-center w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Left Wing Container */}
        <motion.div
          style={{ 
            originX: "100%", 
            width: "24px", 
            height: "30px",
            backfaceVisibility: "hidden"
          }}
          animate={{ rotateY: [0, 75, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BlueWingLeft />
        </motion.div>

        {/* Center Body */}
        <div className="w-[3px] h-[22px] bg-gradient-to-b from-white to-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff] relative z-10 mx-[-1px] transform translate-z-[1px]" />

        {/* Right Wing Container */}
        <motion.div
          style={{ 
            originX: "0%", 
            width: "24px", 
            height: "30px",
            backfaceVisibility: "hidden"
          }}
          animate={{ rotateY: [0, -75, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BlueWingRight />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const BlueButterflies: React.FC = () => {
  // Beautiful 3D trajectories centered on the title
  const butterfliesData = [
    {
      path: {
        x: [0, 180, 260, 120, -120, -260, -180, 0],
        y: [0, -50, 30, 60, -60, -30, 50, 0],
        scale: [0.8, 1.2, 1.0, 0.7, 1.1, 1.3, 0.9, 0.8],
        rotateZ: [15, 45, 10, -35, 45, -15, -45, 15],
        rotateX: [0, 25, -25, 0, 20, -20, 0, 0],
        zIndex: [10, 30, 30, 10, 10, 30, 10, 10],
        opacity: [0.8, 1, 0.9, 0.7, 1, 0.8, 0.6, 0.8]
      },
      duration: 14
    },
    {
      path: {
        x: [-160, -80, 80, 160, 100, -100, -160],
        y: [60, -90, -60, 40, 90, 20, 60],
        scale: [1.1, 0.7, 0.9, 1.2, 0.8, 1.0, 1.1],
        rotateZ: [-30, 15, 60, -15, -45, 30, -30],
        rotateX: [15, -15, 10, -10, 20, -20, 15],
        zIndex: [30, 10, 10, 30, 30, 10, 30],
        opacity: [1, 0.6, 0.8, 1, 0.7, 0.9, 1]
      },
      duration: 11
    },
    {
      path: {
        x: [90, 150, 50, -70, -130, -40, 90],
        y: [-60, 20, 80, -10, -80, -20, -60],
        scale: [0.6, 0.8, 0.7, 0.5, 0.9, 0.7, 0.6],
        rotateZ: [45, -60, 30, 75, -45, 15, 45],
        rotateX: [-10, 20, -20, 10, -10, 20, -10],
        zIndex: [20, 20, 10, 30, 10, 30, 20],
        opacity: [0.9, 1, 0.5, 0.8, 0.6, 1, 0.9]
      },
      duration: 8
    },
    {
      path: {
        x: [-220, 0, 220, 110, -110, -220],
        y: [-90, 95, -40, -100, 40, -90],
        scale: [0.5, 1.5, 0.6, 1.3, 0.7, 0.5],
        rotateZ: [10, -15, 45, -60, 30, 10],
        rotateX: [30, -30, 25, -25, 0, 30],
        zIndex: [5, 40, 10, 40, 10, 5],
        opacity: [0.4, 1, 0.6, 0.9, 0.5, 0.4]
      },
      duration: 16
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-30">
      {butterfliesData.map((b, idx) => (
        <Butterfly key={idx} path={b.path} duration={b.duration} />
      ))}
    </div>
  );
};
