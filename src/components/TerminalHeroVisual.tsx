import React, { useEffect, useRef } from 'react';

/**
 * Interactive Terminal Animation Canvas
 * Renders generative kinetic typography / ASCII field
 * Simulating the prompt and alive character matrix of ertdfgcvb.xyz
 */
export const TerminalHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const charW = 10;
    const charH = 16;
    let cols = 48;
    let rows = 24;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      cols = Math.floor(rect.width / charW);
      rows = Math.floor(rect.height / charH);
    };

    resize();
    window.addEventListener('resize', resize);

    const chars = ' .:;=+*#%@';
    const binary = '01';

    const loop = () => {
      t += 0.03;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);
      ctx.font = '12px "IBM Plex Mono", monospace';
      ctx.textBaseline = 'top';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * charW;
          const py = y * charH;

          // Geometric field calculation
          const cx = cols / 2;
          const cy = rows / 2;
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Combined wave forms
          const w1 = Math.sin(dist * 0.35 - t * 2.2);
          const w2 = Math.cos(angle * 4 + t);
          const v = (w1 + w2) * 0.5;

          const charIndex = Math.floor(Math.abs(v) * (chars.length - 1));
          const char = chars[charIndex] || '.';

          const alpha = 0.18 + Math.abs(v) * 0.65;
          ctx.fillStyle = `rgba(240, 238, 230, ${alpha})`;
          ctx.fillText(char, px, py);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
