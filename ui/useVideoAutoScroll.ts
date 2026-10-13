import { useEffect, useRef } from 'react';

export function useVideoAutoScroll(isPlaying: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
      containerRef.current.focus({ preventScroll: true });
    }
  }, [isPlaying]);

  return containerRef;
}
