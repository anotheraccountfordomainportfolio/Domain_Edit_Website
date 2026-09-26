import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, WifiOff, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DinoGameProps {
  isOffline?: boolean;
  is404?: boolean;
}

export const DinoGame: React.FC<DinoGameProps> = ({ isOffline = false, is404 = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game loop refs
  const stateRef = useRef({
    isPlaying: false,
    score: 0,
    dino: {
      x: 60,
      y: 150,
      vy: 0,
      gravity: 0.6,
      jumpForce: -11.5,
      width: 48,
      height: 52,
      grounded: true,
    },
    obstacles: [] as { x: number; y: number; width: number; height: number; speed: number; type: number }[],
    buildings: [] as { x: number; y: number; width: number; height: number; windows: { x: number; y: number; lit: boolean }[]; speed: number }[],
    stars: [] as { x: number; y: number; size: number; alpha: number }[],
    frameCount: 0,
    speed: 5.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 900;
    canvas.height = 320;

    // Initialize starry night sky
    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 150,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }
    stateRef.current.stars = stars;

    // Initialize City Skyline Buildings
    const buildings = [];
    let currentX = 0;
    while (currentX < canvas.width + 200) {
      const bWidth = Math.floor(Math.random() * 60) + 50;
      const bHeight = Math.floor(Math.random() * 120) + 80;
      const windows = [];
      
      // Generate lit windows
      for (let wx = 10; wx < bWidth - 10; wx += 14) {
        for (let wy = 15; wy < bHeight - 20; wy += 20) {
          windows.push({ x: wx, y: wy, lit: Math.random() > 0.3 });
        }
      }

      buildings.push({
        x: currentX,
        y: 240 - bHeight,
        width: bWidth,
        height: bHeight,
        windows,
        speed: 1.2,
      });
      currentX += bWidth + 5;
    }
    stateRef.current.buildings = buildings;

    let animationFrameId: number;

    const jump = () => {
      const state = stateRef.current;
      if (!state.isPlaying) {
        // Start game
        state.isPlaying = true;
        state.score = 0;
        state.speed = 5.5;
        state.obstacles = [];
        state.dino.y = 240 - 52;
        state.dino.vy = 0;
        setGameState('PLAYING');
        setScore(0);
        return;
      }

      if (state.dino.grounded) {
        state.dino.vy = state.dino.jumpForce;
        state.dino.grounded = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        jump();
      } else {
        jump();
      }
    };

    const handleTouchOrClick = () => {
      jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleTouchOrClick);
    window.addEventListener('touchstart', handleTouchOrClick);

    // Main game loop
    const update = () => {
      const state = stateRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#04050a');
      skyGrad.addColorStop(0.7, '#0b0f19');
      skyGrad.addColorStop(1, '#111827');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Twinkling Stars
      state.stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // 2. City Skyline Buildings (Night Lights)
      state.buildings.forEach(b => {
        if (state.isPlaying) {
          b.x -= b.speed;
          if (b.x + b.width < 0) {
            b.x = canvas.width + Math.random() * 50;
            b.height = Math.floor(Math.random() * 120) + 80;
            b.y = 240 - b.height;
          }
        }

        // Building silhouette
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(b.x, b.y, b.width, b.height);

        // Neon rooftop glow
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(b.x, b.y, b.width, 2);

        // Windows
        b.windows.forEach(w => {
          ctx.fillStyle = w.lit ? (Math.random() > 0.99 ? '#facc15' : '#38bdf8') : '#1e293b';
          ctx.fillRect(b.x + w.x, b.y + w.y, 6, 10);
        });
      });

      // 3. Ground & Road
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 240, canvas.width, 80);

      // Neon road line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, 240);
      ctx.lineTo(canvas.width, 240);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Road markings
      ctx.fillStyle = '#cbd5e1';
      for (let rx = (state.frameCount * 8) % 40; rx < canvas.width; rx += 40) {
        ctx.fillRect(rx, 270, 20, 4);
      }

      if (state.isPlaying) {
        state.frameCount++;
        
        // Increment score
        if (state.frameCount % 5 === 0) {
          state.score += 1;
          setScore(state.score);
          if (state.score > highScore) {
            setHighScore(state.score);
          }
        }

        // Increase speed gradually
        if (state.frameCount % 400 === 0) {
          state.speed += 0.4;
        }

        // Update Dino Physics
        state.dino.vy += state.dino.gravity;
        state.dino.y += state.dino.vy;

        const groundLevel = 240 - state.dino.height;
        if (state.dino.y >= groundLevel) {
          state.dino.y = groundLevel;
          state.dino.vy = 0;
          state.dino.grounded = true;
        }

        // Spawn Realistic Cacti
        if (state.frameCount % Math.max(85 - Math.floor(state.speed * 3), 40) === 0) {
          const type = Math.floor(Math.random() * 3);
          state.obstacles.push({
            x: canvas.width,
            y: 240 - (type === 0 ? 54 : type === 1 ? 46 : 60),
            width: type === 0 ? 32 : type === 1 ? 26 : 38,
            height: type === 0 ? 54 : type === 1 ? 46 : 60,
            speed: state.speed,
            type,
          });
        }

        // Update & Draw Realistic Cacti
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= obs.speed;

          // Draw Realistic Saguaro Cactus
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#059669';
          ctx.shadowBlur = 8;

          if (obs.type === 0) {
            // Large Saguaro with 2 arms
            ctx.fillRect(obs.x + 10, obs.y, 12, obs.height); // main trunk
            ctx.fillRect(obs.x + 2, obs.y + 16, 10, 6); // left arm bottom
            ctx.fillRect(obs.x + 2, obs.y + 6, 6, 14); // left arm top
            ctx.fillRect(obs.x + 20, obs.y + 22, 10, 6); // right arm bottom
            ctx.fillRect(obs.x + 24, obs.y + 12, 6, 14); // right arm top
          } else if (obs.type === 1) {
            // Medium cactus with 1 arm
            ctx.fillRect(obs.x + 8, obs.y, 10, obs.height);
            ctx.fillRect(obs.x + 16, obs.y + 14, 8, 6);
            ctx.fillRect(obs.x + 20, obs.y + 6, 6, 14);
          } else {
            // Cluster cactus
            ctx.fillRect(obs.x + 4, obs.y + 10, 10, obs.height - 10);
            ctx.fillRect(obs.x + 18, obs.y, 12, obs.height);
            ctx.fillRect(obs.x + 8, obs.y + 20, 8, obs.height - 20);
          }

          // Cactus ridges / needle highlights
          ctx.fillStyle = '#6ee7b7';
          ctx.fillRect(obs.x + 12, obs.y + 4, 2, obs.height - 8);

          ctx.shadowBlur = 0;

          // Collision Detection (Precise Bounding Box)
          const dinoBox = { x: state.dino.x + 6, y: state.dino.y + 6, width: state.dino.width - 12, height: state.dino.height - 10 };
          const obsBox = { x: obs.x + 2, y: obs.y + 2, width: obs.width - 4, height: obs.height - 4 };

          if (
            dinoBox.x < obsBox.x + obsBox.width &&
            dinoBox.x + dinoBox.width > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.height &&
            dinoBox.y + dinoBox.height > obsBox.y
          ) {
            state.isPlaying = false;
            setGameState('GAME_OVER');
          }

          // Remove off-screen obstacles
          if (obs.x < -60) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // 4. Realistic T-Rex Dinosaur Drawing
      const dx = state.dino.x;
      const dy = state.dino.y;

      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#38bdf8'; // Cyber-teal / realistic sleek dinosaur armor

      // Tail
      ctx.fillRect(dx, dy + 22, 16, 8);
      ctx.fillRect(dx - 6, dy + 26, 8, 6);
      ctx.fillRect(dx - 12, dy + 30, 8, 4);

      // Body / Torso
      ctx.fillRect(dx + 14, dy + 18, 22, 22);

      // Neck & Head
      ctx.fillRect(dx + 28, dy + 4, 16, 18);
      ctx.fillRect(dx + 40, dy + 8, 10, 10); // Snout/Jaw

      // Eye (Glowing Red/Amber)
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(dx + 42, dy + 10, 3, 3);
      ctx.fillStyle = '#38bdf8';

      // Tiny T-Rex Arms
      ctx.fillRect(dx + 30, dy + 24, 6, 4);

      // Legs (Animated Running)
      const legFrame = Math.floor(state.frameCount / 6) % 2;
      if (state.isPlaying && state.dino.grounded) {
        if (legFrame === 0) {
          // Left leg forward, right leg back
          ctx.fillRect(dx + 18, dy + 40, 6, 12);
          ctx.fillRect(dx + 14, dy + 50, 10, 4); // foot

          ctx.fillRect(dx + 28, dy + 40, 6, 8);
        } else {
          // Right leg forward, left leg back
          ctx.fillRect(dx + 26, dy + 40, 6, 12);
          ctx.fillRect(dx + 22, dy + 50, 10, 4); // foot

          ctx.fillRect(dx + 18, dy + 40, 6, 8);
        }
      } else {
        // Jumping pose (legs tucked)
        ctx.fillRect(dx + 18, dy + 40, 6, 10);
        ctx.fillRect(dx + 26, dy + 40, 6, 10);
      }

      ctx.shadowBlur = 0; // reset shadow

      // Score Display
      if (state.isPlaying || gameState === 'GAME_OVER') {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`HI: ${String(highScore).padStart(5, '0')}  ${String(state.score).padStart(5, '0')}`, canvas.width - 200, 35);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleTouchOrClick);
      window.removeEventListener('touchstart', handleTouchOrClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [highScore, gameState]);

  return (
    <div className="min-h-screen bg-[#04050a] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10b981]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#38bdf8] font-mono text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
          {isOffline ? (
            <>
              <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Network Connection Lost</span>
            </>
          ) : is404 ? (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Error 404 • Page Not Found</span>
            </>
          ) : (
            <span>Cyber City T-Rex Runner</span>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4 text-white">
          {isOffline ? "You're Offline" : is404 ? "Lost in the City Night" : "T-Rex Night Runner"}
        </h1>
        <p className="text-gray-400 font-sans font-light text-sm md:text-base max-w-lg mx-auto mb-8">
          {isOffline 
            ? "Your internet connection was interrupted. Press any key or tap screen to jump over the cacti in the cyber city!"
            : is404 
            ? "The page you are looking for doesn't exist. Test your reflexes through the midnight skyline!"
            : "Press any key or tap screen to jump."}
        </p>

        {/* Game Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-4">
          <canvas
            ref={canvasRef}
            className="w-full max-w-full h-auto rounded-2xl cursor-pointer block mx-auto aspect-[45/16]"
          />

          {gameState === 'IDLE' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[3px] pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-8 py-4 rounded-2xl bg-[#38bdf8] text-black font-heading font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(56,189,248,0.6)]"
              >
                Press Any Key or Tap to Play
              </motion.div>
            </div>
          )}

          {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">
              <h3 className="text-3xl font-heading font-black uppercase text-white mb-2">Game Over</h3>
              <p className="text-[#38bdf8] font-mono text-xs uppercase tracking-widest mb-6">Score: {score} | High Score: {highScore}</p>
              <button
                onClick={() => {
                  setGameState('PLAYING');
                  window.location.reload();
                }}
                className="px-8 py-3 rounded-xl bg-[#38bdf8] text-black font-heading font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_25px_rgba(56,189,248,0.5)]"
              >
                <RefreshCw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold uppercase tracking-widest text-xs transition-colors border border-white/10"
          >
            Back to Home
          </Link>
          <Link
            to="/portfolio"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold uppercase tracking-widest text-xs transition-colors border border-white/10"
          >
            View Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DinoGame;
