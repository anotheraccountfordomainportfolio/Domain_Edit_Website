import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  title?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title = 'WELCOME TO DOMAIN EDITS' }) => {
  const [text, setText] = useState('');
  const fullText = title;

  useEffect(() => {
    let index = 0;
    setText('');
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,251,211,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative flex items-center gap-2">
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tighter uppercase">
            {text}
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1],
                ease: 'linear',
              }}
              className="inline-block w-[2px] h-[1em] bg-[#a8fbd3] ml-1 align-middle"
            />
          </h1>
        </div>

        <div className="mt-8 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3]"
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-12 left-12 w-24 h-px bg-white/10 origin-left"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute top-12 left-12 w-px h-24 bg-white/10 origin-top"
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute bottom-12 right-12 w-24 h-px bg-white/10 origin-right"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute bottom-12 right-12 w-px h-24 bg-white/10 origin-bottom"
      />

      <div className="absolute bottom-12 left-12 font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
        Initializing Experience
      </div>
    </div>
  );
};

export default LoadingScreen;
