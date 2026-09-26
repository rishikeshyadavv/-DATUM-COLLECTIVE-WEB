import React, { useEffect, useRef } from 'react';

interface AsciiCanvasProps {
  density?: 'fine' | 'medium' | 'coarse';
  opacity?: number;
  className?: string;
  interactive?: boolean;
}

/**
 * ertdfgcvb.xyz-inspired character grid engine.
 * Renders an always-running generative character buffer with cursor reactivity.
 * Monospace glyphs morph and ripple based on continuous noise, time waves, and cursor motion.
 */
export const AsciiBackground: React.FC<AsciiCanvasProps> = ({
  opacity = 0.38,
  className = '',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const charW = 9;
    const charH = 14;

    // Density palette from dark to bright ASCII chars
    const charset = ' ·:;=+*#%@';
    const glyphs = ' .·:-=+*#%@█░▒▓01/\\[]{}<>~_';

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      speed: 0,
      radius: 120,
    };

    let prevMouseX = -9999;
    let prevMouseY = -9999;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      cols = Math.ceil(width / charW) + 1;
      rows = Math.ceil(height / charH) + 1;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    handleResize();

    let time = 0;

    const render = () => {
      time += 0.024;

      // Mouse inertia tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const dx = mouse.x - prevMouseX;
      const dy = mouse.y - prevMouseY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      prevMouseX = mouse.x;
      prevMouseY = mouse.y;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `11px 'IBM Plex Mono', 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'top';

      // Draw character matrix
      for (let r = 0; r < rows; r++) {
        const y = r * charH;

        for (let c = 0; c < cols; c++) {
          const x = c * charW;

          // Spatial wave math inspired by ertdfgcvb.xyz
          const nx = c * 0.055;
          const ny = r * 0.075;

          // Multilayer sinusoids
          const v1 = Math.sin(nx + time * 0.6) * Math.cos(ny - time * 0.4);
          const v2 = Math.sin((nx + ny) * 0.8 + time * 0.9);
          const v3 = Math.cos(Math.sqrt(nx * nx + ny * ny) - time * 0.5);
          let val = (v1 + v2 + v3) / 3; // -1 to 1

          // Mouse perturbation / ripple
          const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
          let mouseInfluence = 0;
          if (distToMouse < mouse.radius) {
            const factor = 1 - distToMouse / mouse.radius;
            // Ripple wave radiating from cursor
            const wave = Math.sin(distToMouse * 0.22 - time * 4);
            mouseInfluence = factor * wave * (1.2 + Math.min(mouse.speed * 0.05, 1.5));
          }

          val += mouseInfluence;

          // Map to glyph index
          const normalized = (val + 1) * 0.5; // 0 to 1
          const clamped = Math.max(0, Math.min(0.999, normalized));
          const glyphIndex = Math.floor(clamped * glyphs.length);
          const char = glyphs[glyphIndex] || '·';

          // Color calculation: subtle monochrome levels
          let alpha = 0.14 + clamped * 0.38;
          if (distToMouse < mouse.radius) {
            alpha = Math.min(0.95, alpha + (1 - distToMouse / mouse.radius) * 0.55);
          }

          if (char !== ' ') {
            ctx.fillStyle = `rgba(240, 240, 235, ${alpha * opacity})`;
            ctx.fillText(char, x, y);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [opacity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
