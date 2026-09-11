import React, { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const LiquidCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse physics coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch screens (only enable for mouse/laptop trackpad)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples(prev => [...prev.slice(-4), newRipple]);
    };

    // Smooth Lerp Animation Loop
    const loop = () => {
      // 0.15 lerp damping factor for buttery smooth follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${pos.current.x - 150}px, ${pos.current.y - 150}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  // Cleanup ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      
      {/* 1. Large Fluid Aurora Spotlight Glow (Soft and Ethereal) */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full will-change-transform opacity-60 dark:opacity-40 blur-3xl transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 70%)',
        }}
      />

      {/* 2. Focused Liquid Dot (Precision Cursor Lead) */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-3 h-3 rounded-full will-change-transform border border-white/60 bg-amber-400/90 shadow-[0_0_12px_rgba(245,158,11,0.8)] backdrop-blur-sm transition-opacity duration-300"
      />

      {/* 3. Liquid Click Ripples */}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full border border-amber-400/60 bg-amber-400/10 pointer-events-none animate-ping"
          style={{
            left: r.x - 24,
            top: r.y - 24,
            width: 48,
            height: 48,
            animationDuration: '650ms',
            animationTimingFunction: 'cubic-bezier(0, 0.2, 0.8, 1)',
          }}
        />
      ))}

    </div>
  );
};
