import React from 'react';
import { useHoverEffects } from '../context/HoverEffectsContext';
import { Sparkles } from 'lucide-react';

interface HoverEffectsToggleProps {
  className?: string;
}

/**
 * Minimalist, terminal-aesthetic toggle button for ertdfgcvb.xyz style hover effects.
 * Designed to fit seamlessly into the top navigation bar and bottom colophon without altering layout.
 */
export const HoverEffectsToggle: React.FC<HoverEffectsToggleProps> = ({ className = '' }) => {
  const { effectsEnabled, toggleEffects } = useHoverEffects();

  return (
    <button
      onClick={toggleEffects}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[10px] font-mono tracking-wider transition-all duration-200 select-none cursor-pointer focus:outline-none ${
        effectsEnabled
          ? 'border-neutral-600 bg-neutral-900/90 text-neutral-200 hover:border-neutral-400 hover:text-white'
          : 'border-neutral-800 bg-black/60 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400'
      } ${className}`}
      title={effectsEnabled ? 'Click to disable hover effects' : 'Click to enable hover effects'}
      aria-label="Toggle hover effects"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
          effectsEnabled ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-neutral-600'
        }`}
      />
      <span>FX: {effectsEnabled ? 'ON' : 'OFF'}</span>
    </button>
  );
};
