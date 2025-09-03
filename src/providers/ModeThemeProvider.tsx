import React, { createContext, useContext, useEffect, useState } from 'react';
import { type ModeId, getStudyMode } from '@/data/modes';

interface ModeThemeContextType {
  currentModeId: ModeId;
  setModeId: (modeId: ModeId) => void;
  mode: ReturnType<typeof getStudyMode>;
}

const ModeThemeContext = createContext<ModeThemeContextType | undefined>(undefined);

export const useModeTheme = () => {
  const context = useContext(ModeThemeContext);
  if (!context) {
    throw new Error('useModeTheme must be used within ModeThemeProvider');
  }
  return context;
};

interface ModeThemeProviderProps {
  children: React.ReactNode;
  initialModeId?: ModeId;
}

export const ModeThemeProvider = ({ 
  children, 
  initialModeId = "focus" 
}: ModeThemeProviderProps) => {
  const [currentModeId, setCurrentModeId] = useState<ModeId>(initialModeId);
  const mode = getStudyMode(currentModeId);

  useEffect(() => {
    console.log('🎨 Applying study mode theme:', currentModeId, mode);
    
    // Apply mode theme CSS variables to document root
    const root = document.documentElement;
    
    // Set mode-specific CSS variables
    root.style.setProperty('--mode-accent', mode.theme.accent);
    root.style.setProperty('--mode-primary', mode.theme.atmosphere.primary);
    root.style.setProperty('--mode-secondary', mode.theme.atmosphere.secondary);
    root.style.setProperty('--mode-surface', mode.theme.atmosphere.surface);
    root.style.setProperty('--mode-muted', mode.theme.atmosphere.muted);
    root.style.setProperty('--mode-card-radius', mode.theme.card.radius);
    root.style.setProperty('--mode-card-shadow', mode.theme.card.shadow);
    root.style.setProperty('--mode-card-border', mode.theme.card.border);
    root.style.setProperty('--mode-motion-intensity', mode.theme.motion.intensity);
    
    // Apply background gradient classes
    const body = document.body;
    // Remove any existing mode gradient classes
    body.classList.remove(
      'bg-gradient-to-br',
      'from-slate-900', 'via-slate-800', 'to-slate-900',
      'from-slate-900', 'via-blue-900', 'to-slate-900',
      'from-emerald-950', 'via-teal-900', 'to-emerald-950',
      'from-purple-950', 'via-pink-900', 'to-purple-950',
      'circuit-pattern', 'geometric-grid', 'dots-pattern'
    );
    
    // Add new gradient classes based on mode
    const gradientClasses = mode.theme.bgGradient.split(' ');
    body.classList.add('bg-gradient-to-br', ...gradientClasses);
    
    // Add background pattern if specified
    if (mode.theme.backgroundPattern) {
      body.classList.add(mode.theme.backgroundPattern);
    }
    
    // Apply typography classes
    body.classList.remove('font-bold', 'font-semibold', 'font-medium', 'font-normal', 'tracking-tight', 'tracking-normal', 'tracking-wide');
    const typographyClasses = mode.theme.typography.headingFont.split(' ');
    body.classList.add(...typographyClasses);
    
    // Set data attributes for motion and effects
    root.setAttribute('data-mode', currentModeId);
    root.setAttribute('data-mode-motion', mode.theme.motion.intensity);
    root.setAttribute('data-mode-success-fx', mode.theme.motion.successFx);
    
    // Force a small visual indication that the theme changed
    body.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() => {
      body.style.transition = '';
    }, 500);
    
  }, [currentModeId, mode]);

  const setModeId = (modeId: ModeId) => {
    setCurrentModeId(modeId);
    // Persist to localStorage
    localStorage.setItem('selectedModeId', modeId);
  };

  // Load saved mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedModeId') as ModeId;
    if (saved && saved !== currentModeId) {
      setCurrentModeId(saved);
    }
  }, []);

  const value = {
    currentModeId,
    setModeId,
    mode
  };

  return (
    <ModeThemeContext.Provider value={value}>
      {children}
    </ModeThemeContext.Provider>
  );
};