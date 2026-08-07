import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

// Canvas Particle Interface
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

// Custom animated Cerata (the wing-like clusters of Glaucus Atlanticus)
// Wing flapping is dynamically driven by the wingFlap motion value
const CerataPair: React.FC<{ left: boolean; scale: number; wingFlap: any }> = ({ left, scale, wingFlap }) => {
  // Rotate the arms based on the flap phase
  const rotateVal = useTransform(
    wingFlap,
    [-1, 1],
    left ? [-18 * scale, 14 * scale] : [18 * scale, -14 * scale]
  );
  
  // Squeeze and stretch scaleY for fluid motion
  const scaleYVal = useTransform(
    wingFlap,
    [-1, 1],
    [0.85, 1.15]
  );

  // realistic wing squeeze: scaleX contracts on flap down/up
  const scaleXVal = useTransform(
    wingFlap,
    [-1, 0, 1],
    [1 * scale, 0.25 * scale, 1 * scale]
  );

  return (
    <motion.g
      style={{
        originX: left ? "100%" : "0%",
        originY: "50%",
        rotate: rotateVal,
        scaleY: scaleYVal,
        scaleX: scaleXVal,
      }}
    >
      {/* Primary cluster branch */}
      <path
        d={left 
          ? `M 0,0 C -15,-5 -30,5 -40,-10 C -45,-15 -50,-10 -45,-5 C -35,10 -20,15 0,5`
          : `M 0,0 C 15,-5 30,5 40,-10 C 45,-15 50,-10 45,-5 C 35,10 20,15 0,5`
        }
        fill="url(#glaucusBlueGrad)"
        stroke="#ffffff"
        strokeWidth="1.2"
      />
      
      {/* Cerata fingers branching off */}
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
            strokeWidth={3 - (i * 0.3)}
            strokeLinecap="round"
          />
        );
      })}
    </motion.g>
  );
};

export const BlueGlaucus: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<CanvasParticle[]>([]);

  // Framer motion values for position initialized nicely
  const getInitialCoords = () => {
    if (typeof window !== 'undefined') {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    return { x: 500, y: 500 };
  };

  const initialCoords = getInitialCoords();
  const cursorX = useMotionValue(initialCoords.x);
  const cursorY = useMotionValue(initialCoords.y);

  // High-fidelity spring configuration
  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Rotational Spring for intelligent rotation turn momentum
  const rotateSpring = useSpring(0, { damping: 20, stiffness: 200 });

  // Staggered wing-flapping motion values to create real wave ripples
  const wingFlap1 = useMotionValue(0);
  const wingFlap2 = useMotionValue(0);
  const wingFlap3 = useMotionValue(0);

  const prevX = useRef(initialCoords.x);
  const prevY = useRef(initialCoords.y);
  const wingPhase = useRef(0);

  // Handle tracking window mouse moves
  useEffect(() => {
    if (!active) return;

    const handleInitial = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      prevX.current = e.clientX;
      prevY.current = e.clientY;
      window.removeEventListener('mousemove', handleInitial);
    };
    window.addEventListener('mousemove', handleInitial);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleInitial);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active, cursorX, cursorY]);

  // Handle canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [active]);

  // Floating Sparkle Burst when active becomes true
  useEffect(() => {
    if (active) {
      const newParticles: CanvasParticle[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Spawn rising starry stellar canopy
      for (let i = 0; i < 40; i++) {
        const colors = [
          { r: 0, g: 240, b: 255 },   // electric blue
          { r: 255, g: 255, b: 255 }, // white
          { r: 79, g: 195, b: 247 },  // light blue
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
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
    } else {
      // Clear with elegant fade
      particlesRef.current = [];
    }
  }, [active]);

  // Central frame loop for physics, rotation solvers, and canvas drawing
  useAnimationFrame((time, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw active particles (allows existing particles to finish fading even if inactive)
    const particles = particlesRef.current;
    if (!active && particles.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    const currentX = smoothX.get();
    const currentY = smoothY.get();

    const dx = currentX - prevX.current;
    const dy = currentY - prevY.current;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (active && speed > 0.05) {
      // 2. Intelligent Directional Rotation & Shortest-Path Solver
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      const currentAngle = rotateSpring.get();
      let diff = angle - (currentAngle % 360);
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      rotateSpring.set(currentAngle + diff);

      // Generate spark trail particles behind the Glaucus' tail
      const angleRad = ((rotateSpring.get() - 90) * Math.PI) / 180;
      const tailX = currentX - Math.cos(angleRad) * 28;
      const tailY = currentY - Math.sin(angleRad) * 28;

      const numSparks = Math.min(3, Math.floor(speed / 2.5) + 1);
      for (let i = 0; i < numSparks; i++) {
        const colors = [
          { r: 0, g: 240, b: 255 },   // electric blue
          { r: 255, g: 255, b: 255 }, // white
          { r: 79, g: 195, b: 247 },  // light blue
          { r: 0, g: 114, b: 255 },   // deep sapphire
          { r: 224, g: 247, b: 250 },  // ice blue
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push({
          x: tailX + (Math.random() - 0.5) * 10,
          y: tailY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2 - Math.cos(angleRad) * (speed * 0.12),
          vy: (Math.random() - 0.5) * 2 - Math.sin(angleRad) * (speed * 0.12) + 0.35, // air friction gravity bias
          size: Math.random() * 5 + 3,
          r: color.r,
          g: color.g,
          b: color.b,
          alpha: 1.0,
          decay: Math.random() * 0.016 + 0.012,
        });
      }
    }

    // 3. Responsive Flapping Cycles (Dynamic Frequency & Idle Debounce)
    const idlePeriod = 2.2; 
    const activePeriod = Math.max(0.18, 2.2 - (speed * 0.075));
    const currentFlapSpeed = speed > 0.1 ? activePeriod : idlePeriod;

    const dt = Math.min(0.03, delta / 1000);
    wingPhase.current += (1 / currentFlapSpeed) * dt * Math.PI * 2;

    wingFlap1.set(Math.sin(wingPhase.current));
    wingFlap2.set(Math.sin(wingPhase.current - 0.6));
    wingFlap3.set(Math.sin(wingPhase.current - 1.2));

    // Update and draw particles on the canvas
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Air resistance (Friction)
      p.vx *= 0.96;
      p.vy *= 0.96;

      // Gravity Drift
      p.vy += 0.07;

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Age particle
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      // Fast optimized particle draw
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
      {/* High-performance full-screen sparkle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      {/* Majestic Blue Dragon Sea Slug */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.5 } }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: 0,
              top: 0,
              width: "100px",
              height: "100px",
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              rotate: rotateSpring,
              filter: "drop-shadow(0 10px 25px rgba(0, 114, 255, 0.45))",
            }}
          >
            <svg
              viewBox="-60 -60 120 120"
              className="w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <defs>
                {/* Metallic electric blue gradients */}
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

              {/* Main Body Shadow Glow */}
              <circle r="15" fill="#00f0ff" opacity="0.3" className="blur-[10px]" />

              {/* Pair 1 Cerata (Large Upper Arms) */}
              <g transform="translate(-14, -10)">
                <CerataPair left={true} scale={1} wingFlap={wingFlap1} />
              </g>
              <g transform="translate(14, -10)">
                <CerataPair left={false} scale={1} wingFlap={wingFlap1} />
              </g>

              {/* Pair 2 Cerata (Medium Mid Arms) */}
              <g transform="translate(-10, 12) scale(0.75)">
                <CerataPair left={true} scale={0.75} wingFlap={wingFlap2} />
              </g>
              <g transform="translate(10, 12) scale(0.75)">
                <CerataPair left={false} scale={0.75} wingFlap={wingFlap2} />
              </g>

              {/* Pair 3 Cerata (Small Lower Arms) */}
              <g transform="translate(-6, 32) scale(0.5)">
                <CerataPair left={true} scale={0.5} wingFlap={wingFlap3} />
              </g>
              <g transform="translate(6, 32) scale(0.5)">
                <CerataPair left={false} scale={0.5} wingFlap={wingFlap3} />
              </g>

              {/* Central Sleek Sea Dragon Body */}
              <motion.path
                d="M 0,-42 
                   C -6,-30 -8,-15 -8,0 
                   C -8,15 -14,28 -8,45 
                   C -4,55 -2,65 0,72
                   C 2,65 4,55 8,45 
                   C 14,28 8,15 8,0 
                   C 8,-15 6,-30 0,-42 Z"
                fill="url(#glaucusBodyGrad)"
                stroke="#00f0ff"
                strokeWidth="0.8"
                style={{
                  transformOrigin: "center",
                }}
              />

              {/* Silvery Dorsal Line Pattern */}
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

              {/* Cute little dragon head nodules */}
              <circle cx="-3" cy="-38" r="1.5" fill="#ffffff" />
              <circle cx="3" cy="-38" r="1.5" fill="#ffffff" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
