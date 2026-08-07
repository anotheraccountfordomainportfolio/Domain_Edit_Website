import React, { useState, useEffect, useRef, useCallback } from 'react';

export const FooterGrid: React.FC<{ clearTrigger?: number }> = ({ clearTrigger = 0 }) => {
  const [grid, setGrid] = useState<{ id: string, active: boolean }[]>([]);
  const [cols, setCols] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFilledCellId = useRef<string | null>(null);
  
  const SIZE = 40;

  useEffect(() => {
    if (clearTrigger > 0) {
      setGrid(prev => prev.map(cell => ({ ...cell, active: false })));
    }
  }, [clearTrigger]);

  useEffect(() => {
    const updateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const numCols = Math.ceil(width / SIZE);
      const numRows = Math.ceil(height / SIZE);
      
      setCols(numCols);
      
      setGrid(prev => {
        // Keep existing active state if possible
        const prevActive = new Set(prev.filter(c => c.active).map(c => c.id));
        const newGrid = [];
        for (let y = 0; y < numRows; y++) {
          for (let x = 0; x < numCols; x++) {
            const id = `${x}-${y}`;
            newGrid.push({
              id,
              active: prevActive.has(id)
            });
          }
        }
        return newGrid;
      });
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  const toggleCell = useCallback((id: string) => {
    setGrid(prev => prev.map(cell => cell.id === id ? { ...cell, active: !cell.active } : cell));
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Check if drawing is active: buttons === 1 for mouse drag, or touch pointermove
    if (e.buttons === 1 || e.pointerType === 'touch') {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const cellId = element.getAttribute('data-cell-id');
        if (cellId && cellId !== lastFilledCellId.current) {
          lastFilledCellId.current = cellId;
          // Only update state if cell is not already active to avoid performance-killing re-renders
          setGrid(prev => {
            const cell = prev.find(c => c.id === cellId);
            if (cell && cell.active) {
              return prev; // No change, return same reference to skip React re-render
            }
            return prev.map(c => c.id === cellId ? { ...c, active: true } : c);
          });
        }
      }
    }
  }, []);

  const handlePointerUp = useCallback(() => {
    lastFilledCellId.current = null;
  }, []);

  return (
    <div 
      ref={containerRef} 
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="absolute inset-0 overflow-hidden pointer-events-auto z-0 grid touch-none"
      style={{ 
        gridTemplateColumns: `repeat(${cols}, ${SIZE}px)`,
        gridAutoRows: `${SIZE}px`,
        alignContent: 'start',
        justifyContent: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none z-10" />
      {grid.map(cell => (
        <div
          key={cell.id}
          data-cell-id={cell.id}
          onPointerDown={(e) => {
             e.currentTarget.releasePointerCapture(e.pointerId); // Allows pointer to move to next elements
             toggleCell(cell.id);
          }}
          onPointerEnter={(e) => {
             if (e.buttons === 1) toggleCell(cell.id);
          }}
          className={`border border-white/[0.03] transition-colors duration-[0.4s] ${cell.active ? 'bg-[#a8fbd3]/30 duration-[0s]' : 'hover:bg-white/10 hover:duration-[0s] cursor-crosshair'}`}
        />
      ))}
    </div>
  );
};
