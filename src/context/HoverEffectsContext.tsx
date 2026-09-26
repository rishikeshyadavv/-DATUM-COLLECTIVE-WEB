import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HoverEffectsContextType {
  effectsEnabled: boolean;
  toggleEffects: () => void;
  setEffectsEnabled: (enabled: boolean) => void;
}

const HoverEffectsContext = createContext<HoverEffectsContextType>({
  effectsEnabled: true,
  toggleEffects: () => {},
  setEffectsEnabled: () => {},
});

export const HoverEffectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('datum_hover_effects_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('datum_hover_effects_enabled', String(effectsEnabled));
    } catch {
      // Ignore localStorage errors
    }
  }, [effectsEnabled]);

  const toggleEffects = () => {
    setEffectsEnabled((prev) => !prev);
  };

  return (
    <HoverEffectsContext.Provider value={{ effectsEnabled, toggleEffects, setEffectsEnabled }}>
      {children}
    </HoverEffectsContext.Provider>
  );
};

export const useHoverEffects = () => useContext(HoverEffectsContext);
