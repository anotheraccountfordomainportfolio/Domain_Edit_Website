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
      x: 50,
      y: 150,
      vy: 0,
      gravity: 0.6,
      jumpForce: -11,
      width: 36,
      height: 42,
      grounded: true,
    },
    obstacles: [] as { x: number; y: number; width: number; height: number; speed: number }[],
    clouds: [] as { x: number; y: number; speed: number }[],
    frameCount: 0,
    speed: 5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 300;

    // Initialize clouds
    stateRef.current.clouds = [
      { x: 200, y: 50, speed: 1 },
      { x: 500, y: 80, speed: 1.2 },
      { x: 750, y: 40, speed: 0.8 },
    ];

    let animationFrameId: number;

    const jump = () => {
      const state = stateRef.current;
      if (!state.isPlaying) {
        // Start game
        state.isPlaying = true;
        state.score = 0;
        state.speed = 5;
        state.obstacles = [];
        state.dino.y = 150;
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
        // Any key jump support
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

      // Background Grid / Atmosphere
      ctx.fillStyle = '#0b0c16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Ground Line
      ctx.strokeStyle = '#a8fbd3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 220);
      ctx.lineTo(800, 220);
      ctx.stroke();

      // Draw Clouds
      ctx.fillStyle = 'rgba(168, 251, 211, 0.15)';
      state.clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x < -60) cloud.x = 860;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, 20, 0, Math.PI * 2);
        ctx.arc(cloud.x + 15, cloud.y - 10, 15, 0, Math.PI * 2);
        ctx.arc(cloud.x + 30, cloud.y, 18, 0, Math.PI * 2);
        ctx.fill();
      });

      if (state.isPlaying) {
        state.frameCount++;
        
        // Increment score
        if (state.frameCount % 6 === 0) {
          state.score += 1;
          setScore(state.score);
          if (state.score > highScore) {
            setHighScore(state.score);
          }
        }

        // Increase speed gradually
        if (state.frameCount % 500 === 0) {
          state.speed += 0.5;
        }

        // Update Dino Physics
        state.dino.vy += state.dino.gravity;
        state.dino.y += state.dino.vy;

        const groundLevel = 220 - state.dino.height;
        if (state.dino.y >= groundLevel) {
          state.dino.y = groundLevel;
          state.dino.vy = 0;
          state.dino.grounded = true;
        }

        // Spawn Obstacles (Cacti)
        if (state.frameCount % Math.max(90 - Math.floor(state.speed * 3), 45) === 0) {
          const isDouble = Math.random() > 0.7;
          state.obstacles.push({
            x: 800,
            y: 220 - 36,
            width: isDouble ? 36 : 24,
            height: 36,
            speed: state.speed,
          });
        }

        // Update & Draw Obstacles
        ctx.fillStyle = '#a8fbd3';
        for (let i = state.obstacles.length - 1; i >= 0; i--) {
          const obs = state.obstacles[i];
          obs.x -= obs.speed;

          // Draw Cactus shape
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillRect(obs.x - 4, obs.y + 10, 6, 12);
          ctx.fillRect(obs.x + obs.width - 2, obs.y + 6, 6, 14);

          // Collision Detection (Bounding Box)
          const dinoBox = { x: 55, y: state.dino.y + 4, width: state.dino.width - 10, height: state.dino.height - 8 };
          const obsBox = { x: obs.x, y: obs.y, width: obs.width, height: obs.height };

          if (
            dinoBox.x < obsBox.x + obsBox.width &&
            dinoBox.x + dinoBox.width > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.height &&
            dinoBox.y + dinoBox.height > obsBox.y
          ) {
            // Game Over
            state.isPlaying = false;
            setGameState('GAME_OVER');
          }

          // Remove off-screen obstacles
          if (obs.x < -50) {
            state.obstacles.splice(i, 1);
          }
        }
      }

      // Draw Dino (Cyberpunk T-Rex style)
      const dx = 50;
      const dy = state.dino.y;
      
      // Neon Glow
      ctx.shadowColor = '#a8fbd3';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#a8fbd3';

      // Head & Body
      ctx.fillRect(dx + 16, dy, 20, 16); // head
      ctx.fillRect(dx + 28, dy + 6, 8, 8); // snout
      ctx.fillRect(dx + 8, dy + 14, 22, 18); // body
      
      // Eye
      ctx.fillStyle = '#0b0c16';
      ctx.fillRect(dx + 26, dy + 4, 3, 3);
      ctx.fillStyle = '#a8fbd3';

      // Tail
      ctx.fillRect(dx, dy + 16, 10, 6);
      ctx.fillRect(dx - 4, dy + 14, 6, 4);

      // Legs (animated if running)
      const legFrame = Math.floor(state.frameCount / 8) % 2;
      if (state.isPlaying && state.dino.grounded) {
        if (legFrame === 0) {
          ctx.fillRect(dx + 10, dy + 32, 6, 10);
          ctx.fillRect(dx + 20, dy + 32, 6, 7);
        } else {
          ctx.fillRect(dx + 10, dy + 32, 6, 7);
          ctx.fillRect(dx + 20, dy + 32, 6, 10);
        }
      } else {
        ctx.fillRect(dx + 10, dy + 32, 6, 10);
        ctx.fillRect(dx + 20, dy + 32, 6, 10);
      }

      ctx.shadowBlur = 0; // reset shadow

      // Draw Score on canvas if playing or game over
      if (state.isPlaying || gameState === 'GAME_OVER') {
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px monospace';
        ctx.fillText(`HI: ${String(highScore).padStart(5, '0')}  ${String(state.score).padStart(5, '0')}`, 640, 35);
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
    <div className="min-h-screen bg-[#07080f] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a8fbd3]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#31326f]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
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
            <span>T-Rex Cyber Runner</span>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4 text-white">
          {isOffline ? "You're Offline" : is404 ? "Lost in the Digital Void" : "Dino Runner"}
        </h1>
        <p className="text-gray-400 font-sans font-light text-sm md:text-base max-w-lg mx-auto mb-8">
          {isOffline 
            ? "Your internet connection was interrupted. Press any key or tap screen to jump over the obstacles!"
            : is404 
            ? "The page you are looking for doesn't exist or has been moved. While you're here, test your reflexes!"
            : "Press any key or tap screen to jump."}
        </p>

        {/* Game Container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-4">
          <canvas
            ref={canvasRef}
            className="w-full max-w-full h-auto rounded-2xl cursor-pointer block mx-auto aspect-[8/3]"
          />

          {gameState === 'IDLE' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-6 py-3 rounded-2xl bg-[#a8fbd3] text-black font-heading font-bold uppercase tracking-widest text-sm shadow-[0_0_25px_rgba(168,251,211,0.5)]"
              >
                Press Any Key or Tap to Play
              </motion.div>
            </div>
          )}

          {gameState === 'GAME_OVER' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md">
              <h3 className="text-2xl md:text-3xl font-heading font-black uppercase text-white mb-2">Game Over</h3>
              <p className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-6">Score: {score} | High Score: {highScore}</p>
              <button
                onClick={() => {
                  setGameState('PLAYING');
                  window.location.reload();
                }}
                className="px-8 py-3 rounded-xl bg-[#a8fbd3] text-black font-heading font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(168,251,211,0.4)]"
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
