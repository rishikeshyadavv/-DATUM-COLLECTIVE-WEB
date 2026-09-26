import React, { useEffect, useRef } from 'react';

/**
 * Interactive Terminal Animation Canvas
 * Renders generative kinetic typography / ASCII field
 * Simulating the prompt and alive character matrix of ertdfgcvb.xyz
 * Optimized with IntersectionObserver and capped 30 FPS.
 */
export const TerminalHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let isVisible = true;

    const charW = 10;
    const charH = 16;
    let cols = 48;
    let rows = 24;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
      cols = Math.floor(rect.width / charW);
      rows = Math.floor(rect.height / charH);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // IntersectionObserver to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const chars = ' .:;=+*#%@';
    const charsLen = chars.length;

    let lastTime = performance.now();
    const frameInterval = 1000 / 30; // 30 FPS target

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);

      if (!isVisible) return;

      const delta = now - lastTime;
      if (delta < frameInterval) return;
      lastTime = now - (delta % frameInterval);

      t += 0.045;
      const width = canvas.width / (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);
      ctx.font = '12px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'top';

      const cx = cols * 0.5;
      const cy = rows * 0.5;

      for (let y = 0; y < rows; y++) {
        const py = y * charH;
        const dy = y - cy;

        for (let x = 0; x < cols; x++) {
          const px = x * charW;
          const dx = x - cx;

          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Combined wave forms
          const w1 = Math.sin(dist * 0.35 - t * 2.2);
          const w2 = Math.cos(angle * 4 + t);
          const v = (w1 + w2) * 0.5;
          const absV = Math.abs(v);

          const charIndex = Math.min(charsLen - 1, Math.floor(absV * charsLen));
          const char = chars[charIndex] || '.';

          const alpha = 0.18 + absV * 0.65;
          ctx.fillStyle = `rgba(240, 238, 230, ${alpha})`;
          ctx.fillText(char, px, py);
        }
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 border border-white/10 bg-[#060606] overflow-hidden rounded-none p-3 font-mono text-xs flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-neutral-400 select-none">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PROMPT_BUFFER :: RUNTIME_V1</span>
        </span>
        <span className="text-neutral-500">SYS.ENGINE_ACTIVE</span>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full my-1 pointer-events-none select-none opacity-80"
      />

      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="text-neutral-600">&gt;</span>
          <span className="text-neutral-300">datum.collective --init --stream</span>
          <span className="w-1.5 h-3 bg-neutral-300 inline-block animate-pulse" />
        </div>
        <div className="text-neutral-500 hidden sm:block">FPS: 60 // MONO_GRID</div>
      </div>
    </div>
  );
};
