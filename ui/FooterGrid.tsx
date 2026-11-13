import React, { useEffect, useRef, useCallback } from 'react';

const SIZE = 40;

export const FooterGrid: React.FC<{ clearTrigger?: number }> = ({ clearTrigger = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeCellsRef = useRef<Set<string>>(new Set());
  const hoverCellRef = useRef<string | null>(null);
  const lastDragCellRef = useRef<string | null>(null);
  const offsetRef = useRef<{ leftOffset: number; width: number; height: number }>({
    leftOffset: 0,
    width: 0,
    height: 0,
  });

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, leftOffset } = offsetRef.current;
    ctx.clearRect(0, 0, width, height);

    const cols = Math.ceil(width / SIZE) + 1;
    const rows = Math.ceil(height / SIZE) + 1;

    // Draw subtle grid lines in two paths
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= cols; x++) {
      const px = Math.floor(leftOffset + x * SIZE) + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
    }
    for (let y = 0; y <= rows; y++) {
      const py = Math.floor(y * SIZE) + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
    }
    ctx.stroke();

    // Draw hover highlight
    if (hoverCellRef.current && !activeCellsRef.current.has(hoverCellRef.current)) {
      const [hx, hy] = hoverCellRef.current.split('-').map(Number);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(leftOffset + hx * SIZE, hy * SIZE, SIZE, SIZE);
    }

    // Draw active cells
    if (activeCellsRef.current.size > 0) {
      ctx.fillStyle = 'rgba(168, 251, 211, 0.28)';
      activeCellsRef.current.forEach((id) => {
        const [cx, cy] = id.split('-').map(Number);
        ctx.fillRect(leftOffset + cx * SIZE, cy * SIZE, SIZE, SIZE);
      });
    }
  }, []);

  useEffect(() => {
    if (clearTrigger > 0) {
      activeCellsRef.current.clear();
      drawGrid();
    }
  }, [clearTrigger, drawGrid]);

  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      const numCols = Math.ceil(width / SIZE);
      const leftOffset = Math.floor((width - numCols * SIZE) / 2);

      canvas.width = width;
      canvas.height = height;
      offsetRef.current = { leftOffset, width, height };
      drawGrid();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [drawGrid]);

  const getCellId = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left - offsetRef.current.leftOffset) / SIZE);
    const y = Math.floor((clientY - rect.top) / SIZE);
    return `${x}-${y}`;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const id = getCellId(e.clientX, e.clientY);
    if (!id) return;
    if (activeCellsRef.current.has(id)) {
      activeCellsRef.current.delete(id);
    } else {
      activeCellsRef.current.add(id);
    }
    lastDragCellRef.current = id;
    drawGrid();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const id = getCellId(e.clientX, e.clientY);
    if (!id) return;

    let needsRedraw = false;
    if (hoverCellRef.current !== id) {
      hoverCellRef.current = id;
      needsRedraw = true;
    }

    if ((e.buttons === 1 || e.pointerType === 'touch') && id !== lastDragCellRef.current) {
      lastDragCellRef.current = id;
      if (!activeCellsRef.current.has(id)) {
        activeCellsRef.current.add(id);
        needsRedraw = true;
      }
    }

    if (needsRedraw) drawGrid();
  };

  const handlePointerUp = () => {
    lastDragCellRef.current = null;
  };

  const handlePointerLeave = () => {
    lastDragCellRef.current = null;
    if (hoverCellRef.current !== null) {
      hoverCellRef.current = null;
      drawGrid();
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto z-0 touch-none">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="w-full h-full block cursor-crosshair"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none z-10" />
    </div>
  );
};
