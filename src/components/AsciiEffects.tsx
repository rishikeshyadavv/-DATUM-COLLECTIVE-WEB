import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface AsciiScrambleTextProps {
  children: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'a';
  hoverEffect?: 'scramble' | 'invert' | 'matrix';
  speed?: number;
}

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレワヰヱヲン0123456789+*/\\[]{}<>~_!@#$%^&=·:-';

/**
 * ertdfgcvb.xyz style character scramble text effect.
 * On mouse hover, characters dynamically cycle through ASCII / Katakana / binary glyphs
 * before snapping back into place, mimicking a live terminal buffer resolving memory.
 */
export const AsciiScrambleText: React.FC<AsciiScrambleTextProps> = ({
  children,
  className = '',
  as: Component = 'span',
  hoverEffect = 'scramble',
  speed = 30,
}) => {
  const originalText = children;
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(originalText);
  }, [originalText]);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const maxIterations = originalText.length * 2.5;

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < iteration / 2.5) {
              return originalText[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }

      iteration += 1;
    }, speed);
  };

  const handleMouseEnter = () => {
    startScramble();
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-colors cursor-crosshair ${className}`}
      data-original={originalText}
    >
      {displayText}
    </Component>
  );
};

interface AsciiHoverCardProps {
  children: ReactNode;
  className?: string;
  charDensity?: number;
  highlightBorder?: boolean;
}

/**
 * ertdfgcvb.xyz style interactive card container.
 * When hovered, an animated micro ASCII character matrix sweeps across the background
 * or follows the cursor across the card surface.
 */
export const AsciiHoverCard: React.FC<AsciiHoverCardProps> = ({
  children,
  className = '',
  highlightBorder = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden transition-all duration-200 ${
        isHovered && highlightBorder ? 'border-neutral-400 shadow-[0_0_15px_rgba(255,255,255,0.06)]' : ''
      } ${className}`}
    >
      {/* Interactive ASCII glyph ripple overlay on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-25 select-none font-mono text-[9px] leading-[10px] text-neutral-300 overflow-hidden mix-blend-screen transition-opacity"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle 80px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.18), transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* Subtle corner ASCII markers that illuminate on hover */}
      <span
        className={`absolute top-1 left-1.5 font-mono text-[9px] select-none transition-colors duration-200 ${
          isHovered ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute top-1 right-1.5 font-mono text-[9px] select-none transition-colors duration-200 ${
          isHovered ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute bottom-1 left-1.5 font-mono text-[9px] select-none transition-colors duration-200 ${
          isHovered ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>
      <span
        className={`absolute bottom-1 right-1.5 font-mono text-[9px] select-none transition-colors duration-200 ${
          isHovered ? 'text-neutral-200' : 'text-neutral-800'
        }`}
      >
        +
      </span>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
