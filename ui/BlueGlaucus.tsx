import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  decay: number;
}

const CerataPair: React.FC<{ left: boolean; scale: number; wingFlap: any }> = ({ left, scale, wingFlap }) => {
  const rotateVal = useTransform(
    wingFlap,
    [-1, 1],
    left ? [-18 * scale, 14 * scale] : [18 * scale, -14 * scale]
  );

  const scaleYVal = useTransform(wingFlap, [-1, 1], [0.85, 1.15]);

  const scaleXVal = useTransform(
    wingFlap,
    [-1, 0, 1],
    [1 * scale, 0.25 * scale, 1 * scale]
  );

  return (
    <motion.g
      style={{
        originX: left ? '100%' : '0%',
        originY: '50%',
        rotate: rotateVal,
        scaleY: scaleYVal,
        scaleX: scaleXVal,
      }}
    >
      <path
        d={
          left
            ? `M 0,0 C -15,-5 -30,5 -40,-10 C -45,-15 -50,-10 -45,-5 C -35,10 -20,15 0,5`
            : `M 0,0 C 15,-5 30,5 40,-10 C 45,-15 50,-10 45,-5 C 35,10 20,15 0,5`
        }
        fill="url(#glaucusBlueGrad)"
        stroke="#ffffff"
        strokeWidth="1.2"
      />

      {[...Array(6)].map((_, i) => {
        const angle = -45 + i * 18;
        const length = 20 + (3 - Math.abs(3 - i)) * 10;
        const rad = (angle * Math.PI) / 180;
        const targetX = left ? -length * Math.cos(rad) : length * Math.cos(rad);
        const targetY = length * Math.sin(rad);

        return (
          <path
            key={i}
            d={`M 0,0 C ${targetX * 0.3},${targetY * 0.1} ${targetX * 0.7},${targetY * 0.6} ${targetX},${targetY}`}
            fill="none"
            stroke="url(#cerataGrad)"
            strokeWidth={3 - i * 0.3}
            strokeLinecap="round"
          />
        );
      })}
    </motion.g>
  );
};

// Inner runner only mounts when active === true so idle pages pay zero RAF/canvas cost
const ActiveGlaucus: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<CanvasParticle[]>([]);

  const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 500;

  const cursorX = useMotionValue(initialX);
  const cursorY = useMotionValue(initialY);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const rotateSpring = useSpring(0, { damping: 20, stiffness: 200 });

  const wingFlap1 = useMotionValue(0);
  const wingFlap2 = useMotionValue(0);
  const wingFlap3 = useMotionValue(0);

  const prevX = useRef(initialX);
  const prevY = useRef(initialY);
  const wingPhase = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const newParticles: CanvasParticle[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    const colors = [
      { r: 0, g: 240, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 79, g: 195, b: 247 },
    ];

    for (let i = 0; i < 32; i++) {
      const color = colors[i % colors.length];
      newParticles.push({
        x: Math.random() * width,
        y: height + Math.random() * 30 + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 5 - 2,
        size: Math.random() * 4 + 2,
        r: color.r,
        g: color.g,
        b: color.b,
        alpha: 1.0,
        decay: Math.random() * 0.012 + 0.008,
      });
    }
    particlesRef.current = newParticles;

    return () => {
      particlesRef.current = [];
    };
  }, []);

  useAnimationFrame((_time, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = particlesRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    const currentX = smoothX.get();
    const currentY = smoothY.get();

    const dx = currentX - prevX.current;
    const dy = currentY - prevY.current;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.05) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const currentAngle = rotateSpring.get();
      let diff = angle - (currentAngle % 360);
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      rotateSpring.set(currentAngle + diff);

      const angleRad = ((rotateSpring.get() - 90) * Math.PI) / 180;
      const tailX = currentX - Math.cos(angleRad) * 28;
      const tailY = currentY - Math.sin(angleRad) * 28;

      const numSparks = Math.min(2, Math.floor(speed / 3) + 1);
      const colors = [
        { r: 0, g: 240, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 79, g: 195, b: 247 },
        { r: 0, g: 114, b: 255 },
        { r: 224, g: 247, b: 250 },
      ];
      for (let i = 0; i < numSparks; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x: tailX + (Math.random() - 0.5) * 10,
          y: tailY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2 - Math.cos(angleRad) * (speed * 0.12),
          vy: (Math.random() - 0.5) * 2 - Math.sin(angleRad) * (speed * 0.12) + 0.35,
          size: Math.random() * 4.5 + 2.5,
          r: color.r,
          g: color.g,
          b: color.b,
          alpha: 1.0,
          decay: Math.random() * 0.018 + 0.014,
        });
      }
    }

    const idlePeriod = 2.2;
    const activePeriod = Math.max(0.18, 2.2 - speed * 0.075);
    const currentFlapSpeed = speed > 0.1 ? activePeriod : idlePeriod;

    const dt = Math.min(0.03, delta / 1000);
    wingPhase.current += (1 / currentFlapSpeed) * dt * Math.PI * 2;

    wingFlap1.set(Math.sin(wingPhase.current));
    wingFlap2.set(Math.sin(wingPhase.current - 0.6));
    wingFlap3.set(Math.sin(wingPhase.current - 1.2));

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.vy += 0.07;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    prevX.current = currentX;
    prevY.current = currentY;
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.4 } }}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: 0,
          top: 0,
          width: '100px',
          height: '100px',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: rotateSpring,
        }}
      >
        <svg viewBox="-60 -60 120 120" className="w-full h-full">
          <defs>
            <radialGradient id="glaucusAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="glaucusBlueGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#00f0ff" />
              <stop offset="70%" stopColor="#0052cc" />
              <stop offset="100%" stopColor="#00113a" />
            </linearGradient>

            <linearGradient id="cerataGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#00f0ff" />
              <stop offset="75%" stopColor="#0033aa" />
              <stop offset="100%" stopColor="#050b14" />
            </linearGradient>

            <linearGradient id="glaucusBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="15%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#0044cc" />
              <stop offset="85%" stopColor="#020817" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          <circle r="28" fill="url(#glaucusAuraGrad)" />

          <g transform="translate(-14, -10)">
            <CerataPair left={true} scale={1} wingFlap={wingFlap1} />
          </g>
          <g transform="translate(14, -10)">
            <CerataPair left={false} scale={1} wingFlap={wingFlap1} />
          </g>

          <g transform="translate(-10, 12) scale(0.75)">
            <CerataPair left={true} scale={0.75} wingFlap={wingFlap2} />
          </g>
          <g transform="translate(10, 12) scale(0.75)">
            <CerataPair left={false} scale={0.75} wingFlap={wingFlap2} />
          </g>

          <g transform="translate(-6, 32) scale(0.5)">
            <CerataPair left={true} scale={0.5} wingFlap={wingFlap3} />
          </g>
          <g transform="translate(6, 32) scale(0.5)">
            <CerataPair left={false} scale={0.5} wingFlap={wingFlap3} />
          </g>

          <path
            d="M 0,-42 C -6,-30 -8,-15 -8,0 C -8,15 -14,28 -8,45 C -4,55 -2,65 0,72 C 2,65 4,55 8,45 C 14,28 8,15 8,0 C 8,-15 6,-30 0,-42 Z"
            fill="url(#glaucusBodyGrad)"
            stroke="#00f0ff"
            strokeWidth="0.8"
          />

          <path
            d="M 0,-35 C -2,-15 -3,5 -2,25 C -1,35 -4,45 -1,58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 0,-35 C 2,-15 3,5 2,25 C 1,35 4,45 1,58"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          <circle cx="-3" cy="-38" r="1.5" fill="#ffffff" />
          <circle cx="3" cy="-38" r="1.5" fill="#ffffff" />
        </svg>
      </motion.div>
    </>
  );
};

export const BlueGlaucus: React.FC<{ active: boolean }> = ({ active }) => {
  return <AnimatePresence>{active ? <ActiveGlaucus /> : null}</AnimatePresence>;
};
