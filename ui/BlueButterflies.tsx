import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BlueWingLeft = () => (
  <svg viewBox="0 0 50 60" className="w-full h-full">
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
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M 45 28 C 35 18, 20 15, 15 20 C 12 24, 25 30, 42 30"
      fill="none"
      stroke="#ffffff"
      strokeWidth="0.8"
      opacity="0.7"
    />
  </svg>
);

const BlueWingRight = () => (
  <div style={{ transform: 'scaleX(-1)' }} className="w-full h-full">
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
    opacity: number[];
  };
  duration: number;
  flapDuration: number;
}

const Butterfly: React.FC<ButterflyProps> = ({ path, duration, flapDuration }) => {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      animate={{
        x: path.x,
        y: path.y,
        scale: path.scale,
        rotateZ: path.rotateZ,
        rotateX: path.rotateX,
        opacity: path.opacity,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        width: '50px',
        height: '40px',
      }}
    >
      <div className="flex items-center justify-center w-full h-full relative">
        <motion.div
          style={{
            originX: '100%',
            width: '24px',
            height: '30px',
          }}
          animate={{ rotateY: [0, 72, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <BlueWingLeft />
        </motion.div>

        <div className="w-[3px] h-[22px] bg-gradient-to-b from-white to-[#00f0ff] rounded-full relative z-10 mx-[-1px]" />

        <motion.div
          style={{
            originX: '0%',
            width: '24px',
            height: '30px',
          }}
          animate={{ rotateY: [0, -72, 0] }}
          transition={{
            duration: flapDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <BlueWingRight />
        </motion.div>
      </div>
    </motion.div>
  );
};

const butterfliesData = [
  {
    path: {
      x: [0, 180, 260, 120, -120, -260, -180, 0],
      y: [0, -50, 30, 60, -60, -30, 50, 0],
      scale: [0.8, 1.15, 1.0, 0.75, 1.1, 1.25, 0.9, 0.8],
      rotateZ: [15, 45, 10, -35, 45, -15, -45, 15],
      rotateX: [0, 20, -20, 0, 20, -20, 0, 0],
      opacity: [0.8, 1, 0.9, 0.7, 1, 0.8, 0.65, 0.8],
    },
    duration: 14,
    flapDuration: 0.22,
  },
  {
    path: {
      x: [-160, -80, 80, 160, 100, -100, -160],
      y: [60, -90, -60, 40, 90, 20, 60],
      scale: [1.1, 0.75, 0.9, 1.15, 0.8, 1.0, 1.1],
      rotateZ: [-30, 15, 60, -15, -45, 30, -30],
      rotateX: [15, -15, 10, -10, 20, -20, 15],
      opacity: [1, 0.65, 0.8, 1, 0.75, 0.9, 1],
    },
    duration: 11,
    flapDuration: 0.24,
  },
  {
    path: {
      x: [90, 150, 50, -70, -130, -40, 90],
      y: [-60, 20, 80, -10, -80, -20, -60],
      scale: [0.65, 0.85, 0.75, 0.6, 0.9, 0.75, 0.65],
      rotateZ: [45, -60, 30, 75, -45, 15, 45],
      rotateX: [-10, 20, -20, 10, -10, 20, -10],
      opacity: [0.9, 1, 0.6, 0.8, 0.65, 1, 0.9],
    },
    duration: 9,
    flapDuration: 0.2,
  },
];

export const BlueButterflies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0 });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-30"
    >
      {isInView &&
        butterfliesData.map((b, idx) => (
          <Butterfly
            key={idx}
            path={b.path}
            duration={b.duration}
            flapDuration={b.flapDuration}
          />
        ))}
    </div>
  );
};
