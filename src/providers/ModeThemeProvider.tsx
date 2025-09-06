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
    
    // Apply dramatic theme changes via CSS variables
    const root = document.documentElement;
    
    // Set comprehensive theme CSS variables
    root.style.setProperty('--background', mode.theme.bg);
    root.style.setProperty('--card', mode.theme.cardBg);
    root.style.setProperty('--card-foreground', mode.theme.text);
    root.style.setProperty('--foreground', mode.theme.text);
    root.style.setProperty('--muted-foreground', mode.theme.textMuted);
    root.style.setProperty('--primary', mode.theme.accent);
    root.style.setProperty('--primary-foreground', mode.theme.accentForeground);
    root.style.setProperty('--border', mode.theme.border);
    root.style.setProperty('--input', mode.theme.cardBorder);
    root.style.setProperty('--ring', mode.theme.accent);
    
    // Custom mode-specific variables
    root.style.setProperty('--mode-gradient', mode.theme.gradient);
    root.style.setProperty('--mode-button-bg', mode.theme.buttonBg);
    root.style.setProperty('--mode-button-hover', mode.theme.buttonHover);
    root.style.setProperty('--mode-shadow', mode.theme.shadow);
    
    // Apply background styling directly to body
    const body = document.body;
    body.style.background = mode.theme.gradient;
    body.style.color = mode.theme.text;
    body.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Update card styling globally
    const style = document.getElementById('mode-theme-styles') || document.createElement('style');
    style.id = 'mode-theme-styles';
    style.textContent = `
      .mode-card {
        background: ${mode.theme.cardBg} !important;
        border-color: ${mode.theme.cardBorder} !important;
        color: ${mode.theme.text} !important;
        box-shadow: ${mode.theme.shadow} !important;
      }
      
      .mode-button {
        background: ${mode.theme.buttonBg} !important;
        color: ${mode.theme.accentForeground} !important;
      }
      
      .mode-button:hover {
        background: ${mode.theme.buttonHover} !important;
      }
      
      .mode-text {
        color: ${mode.theme.text} !important;
      }
      
      .mode-text-muted {
        color: ${mode.theme.textMuted} !important;
      }
      
      .mode-border {
        border-color: ${mode.theme.border} !important;
      }
    `;
    
    if (!document.head.contains(style)) {
      document.head.appendChild(style);
    }
    
    // Set data attributes
    root.setAttribute('data-mode', currentModeId);
    
    // Clean up transition after animation completes
    setTimeout(() => {
      body.style.transition = '';
    }, 600);
    
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