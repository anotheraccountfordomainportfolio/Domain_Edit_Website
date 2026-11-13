/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useMemo } from 'react';

const StarField = React.memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: ((i * 7) % 2) + 1.5,
      x: (i * 19 + 7) % 96,
      y: (i * 23 + 11) % 92,
      opacity: 0.25 + ((i % 4) * 0.12),
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
});

StarField.displayName = 'StarField';

// Static GPU-cached multi-radial gradient background (zero per-frame full-screen repaints during scroll)
const FluidBackground: React.FC = React.memo(() => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#242555] pointer-events-none"
      style={{
        transform: 'translate3d(0,0,0)',
        contain: 'strict',
        backgroundImage: [
          'radial-gradient(60vw 60vw at 10% 10%, rgba(168,251,211,0.14) 0%, rgba(168,251,211,0) 70%)',
          'radial-gradient(65vw 55vw at 90% 35%, rgba(79,183,179,0.12) 0%, rgba(79,183,179,0) 70%)',
          'radial-gradient(55vw 55vw at 35% 85%, rgba(99,122,185,0.14) 0%, rgba(99,122,185,0) 70%)',
          'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        ].join(', '),
      }}
    >
      <StarField />
    </div>
  );
});

FluidBackground.displayName = 'FluidBackground';

export default FluidBackground;
