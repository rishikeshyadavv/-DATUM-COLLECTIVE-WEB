import React, { useState, useRef, useEffect, ReactNode, memo } from 'react';
import { useHoverEffects } from '../context/HoverEffectsContext';

interface AsciiScrambleTextProps {
  children: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'a';
  speed?: number;
}

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレワヰヱヲン0123456789+*/\\[]{}<>~_!@#$%^&=·:-';
const GLYPHS_LEN = GLYPHS.length;

/**
 * ertdfgcvb.xyz style character scramble text effect.
 * Tuned to 0.79x speed (duration / 0.79) for a smoother, more deliberate, readable reveal.
 * Ultra-lightweight with zero layout thrashing or memory pressure:
 * - Single rAF step loop, stops immediately when complete or on unmount.
 * - Honors HoverEffectsContext toggle instantly.
 */
export const AsciiScrambleText: React.FC<AsciiScrambleTextProps> = memo(({
  children,
  className = '',
  as: Component = 'span',
}) => {
  const { effectsEnabled } = useHoverEffects();
  const originalText = children;
  const [displayText, setDisplayText] = useState(originalText);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(originalText);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [originalText]);

  const startScramble = () => {
    if (!effectsEnabled) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const length = originalText.length;
    if (length === 0) return;

    const startTime = performance.now();
    // 0.79 times slower: duration scaled by 1 / 0.79 = ~1.266x
    const baseDuration = Math.min(380, Math.max(200, length * 16));
    const duration = baseDuration / 0.79;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Smooth cubic ease-out curve for natural letter stabilization
      const eased = 1 - Math.pow(1 - progress, 1.3);
      const revealed = Math.floor(eased * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        const char = originalText[i];
        if (char === ' ' || char === '\n') {
          result += char;
        } else if (i < revealed) {
          result += char;
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS_LEN)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(originalText);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleMouseEnter = () => {
    if (effectsEnabled) {
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setDisplayText(originalText);
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-colors duration-300 ${effectsEnabled ? 'cursor-crosshair' : ''} ${className}`}
      data-original={originalText}
    >
      {displayText}
    </Component>
  );
});

interface AsciiHoverCardProps {
  children: ReactNode;
  className?: string;
  charDensity?: number;
  highlightBorder?: boolean;
}

/**
 * ertdfgcvb.xyz style interactive card container.
 * High performance hardware-accelerated spotlight using CSS translate3d:
 * - 0.79x tuned smooth CSS transition (0.11s ease-out)
 * - Zero component re-renders during mouse movement, zero lag.
 */
export const AsciiHoverCard: React.FC<AsciiHoverCardProps> = memo(({
  children,
  className = '',
  highlightBorder = true,
}) => {
  const { effectsEnabled } = useHoverEffects();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!effectsEnabled) return;
    setIsHovered(true);
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!effectsEnabled || !cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // GPU-accelerated translate3d with smooth CSS transition
    spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const activeHover = effectsEnabled && isHovered;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-300 ${
        activeHover && highlightBorder
          ? 'border-neutral-400 shadow-[0_0_20px_rgba(255,255,255,0.07)]'
          : 'border-neutral-800'
      } ${className}`}
    >
      {/* GPU hardware-accelerated spotlight that moves with zero React re-renders */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 ${
          activeHover ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div
          ref={spotlightRef}
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            transition: 'transform 0.11s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />
      </div>

      {/* Subtle corner ASCII markers with smooth color transition */}
      <span
        className={`absolute top-1 left-1.5 font-mono text-[9px] select-none transition-colors duration-300 ${
          activeHover ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute top-1 right-1.5 font-mono text-[9px] select-none transition-colors duration-300 ${
          activeHover ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute bottom-1 left-1.5 font-mono text-[9px] select-none transition-colors duration-300 ${
          activeHover ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute bottom-1 right-1.5 font-mono text-[9px] select-none transition-colors duration-300 ${
          activeHover ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>

      <div className="relative z-10">{children}</div>
    </div>
  );
});
