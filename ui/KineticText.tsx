import React from 'react';
import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const KineticText: React.FC<KineticTextProps> = ({ 
  text, 
  className = '', 
  as: Component = 'h1' 
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child: any = {
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      scaleY: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };


  return (
    <Component className={`flex flex-wrap items-center overflow-visible ${className}`}>
      <motion.span
        className="flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, wordIndex) => {
          // Calculate standard continuous index for proper delay staggered effect
          let startIdx = 0;
          for (let i = 0; i < wordIndex; i++) {
            startIdx += words[i].length + 1;
          }

          return (
            <span key={wordIndex} className="flex whitespace-nowrap mr-[0.25em] last:mr-0">
              {Array.from(word).map((letter, charIndex) => {
                const globalIndex = startIdx + charIndex;
                return (
                  <motion.span
                    key={charIndex}
                    custom={globalIndex}
                    variants={child}
                    className="inline-block bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};
