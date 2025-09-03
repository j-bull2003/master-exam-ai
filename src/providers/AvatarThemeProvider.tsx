import { createContext, useContext, useEffect, ReactNode } from "react";
import { type AvatarId, getAvatarConfig } from "@/data/avatars";

interface AvatarThemeContextType {
  avatarId: AvatarId;
  setAvatarTheme: (avatarId: AvatarId) => void;
}

const AvatarThemeContext = createContext<AvatarThemeContextType | undefined>(undefined);

export const useAvatarTheme = () => {
  const context = useContext(AvatarThemeContext);
  if (context === undefined) {
    throw new Error("useAvatarTheme must be used within an AvatarThemeProvider");
  }
  return context;
};

interface AvatarThemeProviderProps {
  children: ReactNode;
  avatarId: AvatarId;
  onAvatarChange?: (avatarId: AvatarId) => void;
}

export const AvatarThemeProvider = ({ 
  children, 
  avatarId, 
  onAvatarChange 
}: AvatarThemeProviderProps) => {
  
  const setAvatarTheme = (newAvatarId: AvatarId) => {
    applyThemeToDocument(newAvatarId);
    onAvatarChange?.(newAvatarId);
  };

  const applyThemeToDocument = (selectedAvatarId: AvatarId) => {
    const config = getAvatarConfig(selectedAvatarId);
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--avatar-accent', config.theme.accent);
    root.style.setProperty('--avatar-card-radius', config.theme.card.radius);
    root.style.setProperty('--avatar-motion-intensity', config.theme.motion.intensity);
    root.style.setProperty('--avatar-success-fx', config.theme.motion.successFx);
    
    // Update body class for background gradient
    document.body.className = document.body.className
      .replace(/bg-gradient-to-br from-\S+ via-\S+ to-\S+/g, '')
      .trim();
    
    if (config.theme.bgGradient) {
      document.body.classList.add('bg-gradient-to-br', ...config.theme.bgGradient.split(' '));
    }
    
    // Apply motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      root.style.setProperty('--avatar-motion-intensity', 'low');
    }
  };

  // Apply theme on mount and when avatarId changes
  useEffect(() => {
    applyThemeToDocument(avatarId);
  }, [avatarId]);

  // Listen for system motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--avatar-motion-intensity', 'low');
      } else {
        const config = getAvatarConfig(avatarId);
        document.documentElement.style.setProperty('--avatar-motion-intensity', config.theme.motion.intensity);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [avatarId]);

  return (
    <AvatarThemeContext.Provider 
      value={{ 
        avatarId, 
        setAvatarTheme 
      }}
    >
      {children}
    </AvatarThemeContext.Provider>
  );
};