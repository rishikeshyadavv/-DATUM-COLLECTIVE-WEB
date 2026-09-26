import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'a';
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  scrambleOnMount?: boolean;
}

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF!@#$%&*<>[]{}~_+=-/|';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  as: Component = 'span',
  className = '',
  href,
  target,
  rel,
  onClick,
  scrambleOnMount = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const animatingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const triggerScramble = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const chars = text.split('');
    const totalDuration = 22; // frames
    let frame = 0;

    const scramble = () => {
      frame++;
      const progress = frame / totalDuration;

      const result = chars.map((char, index) => {
        if (char === ' ') return ' ';
        // Resolve progressively from left to right with jitter
        const resolveThreshold = (index / chars.length) * 0.75;
        if (progress > resolveThreshold + 0.25) {
          return char;
        }
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });

      setDisplayText(result.join(''));

      if (frame < totalDuration) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
        animatingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(scramble);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      triggerScramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, scrambleOnMount]);

  const props: any = {
    className: `transition-colors duration-150 inline-block ${className}`,
    onMouseEnter: triggerScramble,
    onClick,
  };

  if (Component === 'a') {
    props.href = href;
    props.target = target;
    props.rel = rel;
  }

  return <Component {...props}>{displayText}</Component>;
};
