import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

let lastNoticeAt = 0;

export function notifyProtectedAction(message = 'Client feedback & screenshots are protected against copying or downloading.') {
  const now = Date.now();
  if (now - lastNoticeAt > 2500) {
    lastNoticeAt = now;
    toast.error(message);
  }
}

export function decodeProtectedSource(token: string): string {
  try {
    if (token.startsWith('http://') || token.startsWith('https://') || token.startsWith('/')) {
      return token;
    }
    return atob(token);
  } catch {
    return token;
  }
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export const protectedContainerProps = {
  onContextMenu: (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    notifyProtectedAction();
  },
  onDragStart: (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    notifyProtectedAction('Dragging or opening client screenshots in a new tab is disabled.');
  },
  onCopy: (e: React.ClipboardEvent) => {
    if (!isEditableElement(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      notifyProtectedAction();
    }
  },
  onCut: (e: React.ClipboardEvent) => {
    if (!isEditableElement(e.target)) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  onMouseDown: (e: React.MouseEvent) => {
    if (e.button === 1) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
};

export interface ContentProtectionOptions {
  enabled?: boolean;
  blockContextMenu?: boolean;
  blockCopy?: boolean;
}

export function useContentProtection({
  enabled = true,
  blockContextMenu = false,
  blockCopy = false,
}: ContentProtectionOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = (e.key || '').toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      const inInput = isEditableElement(e.target);

      // Block F4, F3 (Find), F12 (DevTools), and PrintScreen
      if (e.key === 'F4' || e.key === 'F3' || e.key === 'F12' || e.key === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        notifyProtectedAction('Inspect, find, and capture shortcuts are disabled for client privacy.');
        return;
      }

      if (ctrlOrCmd) {
        // Block Find (Ctrl/Cmd+F, Ctrl/Cmd+G), Save/Download (Ctrl/Cmd+S), View Source (Ctrl/Cmd+U), Print (Ctrl/Cmd+P)
        if (key === 'f' || key === 'g' || key === 's' || key === 'u' || key === 'p') {
          e.preventDefault();
          e.stopPropagation();
          notifyProtectedAction('Searching, saving, or downloading protected client feedback is disabled.');
          return;
        }

        // Block DevTools combos: Ctrl+Shift+I/J/C/K, Cmd+Option+I/J/C/U
        if (
          (e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k' || key === 's')) ||
          (e.altKey && (key === 'i' || key === 'j' || key === 'c' || key === 'u'))
        ) {
          e.preventDefault();
          e.stopPropagation();
          notifyProtectedAction('Developer inspection shortcuts are disabled on protected feedback.');
          return;
        }

        // Block Copy/Cut/Select All outside editable inputs when blockCopy is active
        if (blockCopy && !inInput && (key === 'c' || key === 'x' || key === 'a')) {
          e.preventDefault();
          e.stopPropagation();
          notifyProtectedAction();
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (!blockContextMenu) return;
      if (!isEditableElement(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        notifyProtectedAction();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleCopyOrCut = (e: ClipboardEvent) => {
      if (!blockCopy) return;
      if (!isEditableElement(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        notifyProtectedAction();
      }
    };

    const handleSelectStart = (e: Event) => {
      if (!blockCopy) return;
      if (!isEditableElement(e.target)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('copy', handleCopyOrCut, true);
    document.addEventListener('cut', handleCopyOrCut, true);
    document.addEventListener('selectstart', handleSelectStart, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('copy', handleCopyOrCut, true);
      document.removeEventListener('cut', handleCopyOrCut, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
    };
  }, [enabled, blockContextMenu, blockCopy]);
}

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  canvasClassName?: string;
  eager?: boolean;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = React.memo(({
  src,
  alt,
  className = '',
  canvasClassName = 'w-full h-full object-contain rounded-xl',
  eager = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (eager || shouldLoad) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;
    setLoaded(false);

    const img = new window.Image();
    img.referrerPolicy = 'no-referrer';
    img.decoding = 'async';

    img.onload = () => {
      if (cancelled) return;
      const naturalW = img.naturalWidth || 1280;
      const naturalH = img.naturalHeight || 720;

      // Cap internal canvas resolution to keep GPU memory low while keeping crisp retina clarity
      const maxDim = 1920;
      const scale = Math.min(1, maxDim / Math.max(naturalW, naturalH));
      const targetW = Math.max(1, Math.round(naturalW * scale));
      const targetH = Math.max(1, Math.round(naturalH * scale));

      setDims({ w: targetW, h: targetH });

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, targetW, targetH);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetW, targetH);
        }
      }
      setLoaded(true);
    };

    img.src = decodeProtectedSource(src);

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center protected-media select-none ${className}`}
      draggable={false}
      onContextMenu={protectedContainerProps.onContextMenu}
      onDragStart={protectedContainerProps.onDragStart}
      onCopy={protectedContainerProps.onCopy}
      onCut={protectedContainerProps.onCut}
      onMouseDown={protectedContainerProps.onMouseDown}
    >
      {!loaded && (
        <div className="w-full h-full min-h-[120px] rounded-xl bg-white/[0.03] animate-pulse" />
      )}
      <canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        draggable={false}
        style={dims ? { aspectRatio: `${dims.w} / ${dims.h}` } : undefined}
        className={`${canvasClassName} pointer-events-none select-none ${loaded ? 'opacity-100' : 'opacity-0 absolute'}`}
      />
      {/* Transparent shield over canvas so no right-click or drag ever reaches the canvas element */}
      <div
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 z-10 bg-transparent protected-media select-none"
        onContextMenu={protectedContainerProps.onContextMenu}
        onDragStart={protectedContainerProps.onDragStart}
        onCopy={protectedContainerProps.onCopy}
        onCut={protectedContainerProps.onCut}
        onMouseDown={protectedContainerProps.onMouseDown}
      />
    </div>
  );
});

ProtectedImage.displayName = 'ProtectedImage';
