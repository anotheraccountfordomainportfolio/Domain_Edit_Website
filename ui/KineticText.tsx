import React from 'react';

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
  return (
    <Component className={`flex flex-wrap items-center overflow-visible ${className}`}>
      <span className="flex flex-wrap">
        {words.map((word, wordIndex) => {
          let startIdx = 0;
          for (let i = 0; i < wordIndex; i++) {
            startIdx += words[i].length + 1;
          }
          return (
            <span key={wordIndex} className="flex whitespace-nowrap mr-[0.25em] last:mr-0">
              {Array.from(word).map((letter, charIndex) => {
                const globalIndex = startIdx + charIndex;
                return (
                  <span
                    key={charIndex}
                    className="inline-block bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent opacity-0 animate-kinetic"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animationDelay: `${globalIndex * 0.05}s`
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Component>
  );
};
