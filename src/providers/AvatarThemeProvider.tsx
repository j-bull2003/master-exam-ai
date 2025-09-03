import React, { createContext, useContext, useEffect, useState } from 'react';
import { type AvatarId, getAvatar } from '@/data/avatars';

interface AvatarThemeContextType {
  currentAvatarId: AvatarId;
  setAvatarId: (avatarId: AvatarId) => void;
  avatar: ReturnType<typeof getAvatar>;
}

const AvatarThemeContext = createContext<AvatarThemeContextType | undefined>(undefined);

export const useAvatarTheme = () => {
  const context = useContext(AvatarThemeContext);
  if (!context) {
    throw new Error('useAvatarTheme must be used within AvatarThemeProvider');
  }
  return context;
};

interface AvatarThemeProviderProps {
  children: React.ReactNode;
  initialAvatarId?: AvatarId;
}

export const AvatarThemeProvider = ({ 
  children, 
  initialAvatarId = "coach" 
}: AvatarThemeProviderProps) => {
  const [currentAvatarId, setCurrentAvatarId] = useState<AvatarId>(initialAvatarId);
  const avatar = getAvatar(currentAvatarId);

  useEffect(() => {
    console.log('🎨 Applying avatar theme:', currentAvatarId, avatar);
    
    // Apply avatar theme CSS variables to document root
    const root = document.documentElement;
    
    // Set avatar-specific CSS variables
    root.style.setProperty('--avatar-accent', avatar.theme.accent);
    root.style.setProperty('--avatar-primary', avatar.theme.atmosphere.primary);
    root.style.setProperty('--avatar-secondary', avatar.theme.atmosphere.secondary);
    root.style.setProperty('--avatar-surface', avatar.theme.atmosphere.surface);
    root.style.setProperty('--avatar-muted', avatar.theme.atmosphere.muted);
    root.style.setProperty('--avatar-card-radius', avatar.theme.card.radius);
    root.style.setProperty('--avatar-card-shadow', avatar.theme.card.shadow);
    root.style.setProperty('--avatar-card-border', avatar.theme.card.border);
    root.style.setProperty('--avatar-motion-intensity', avatar.theme.motion.intensity);
    
    // Apply background gradient classes
    const body = document.body;
    // Remove any existing avatar gradient classes
    body.classList.remove(
      'bg-gradient-to-br',
      'from-slate-900', 'via-slate-800', 'to-slate-900',
      'from-slate-900', 'via-blue-900', 'to-slate-900',
      'from-emerald-950', 'via-teal-900', 'to-emerald-950',
      'from-purple-950', 'via-pink-900', 'to-purple-950',
      'circuit-pattern', 'geometric-grid', 'dots-pattern'
    );
    
    // Add new gradient classes based on avatar
    const gradientClasses = avatar.theme.bgGradient.split(' ');
    body.classList.add('bg-gradient-to-br', ...gradientClasses);
    
    // Add background pattern if specified
    if (avatar.theme.backgroundPattern) {
      body.classList.add(avatar.theme.backgroundPattern);
    }
    
    // Apply typography classes
    body.classList.remove('font-bold', 'font-semibold', 'font-medium', 'font-normal', 'tracking-tight', 'tracking-normal', 'tracking-wide');
    const typographyClasses = avatar.theme.typography.headingFont.split(' ');
    body.classList.add(...typographyClasses);
    
    // Set data attributes for motion and effects
    root.setAttribute('data-avatar-motion', avatar.theme.motion.intensity);
    root.setAttribute('data-avatar-success-fx', avatar.theme.motion.successFx);
    root.setAttribute('data-avatar-special', avatar.theme.special.name.toLowerCase().replace(' ', '-'));
    
    // Force a small visual indication that the theme changed
    body.style.transition = 'all 0.5s ease-in-out';
    setTimeout(() => {
      body.style.transition = '';
    }, 500);
    
  }, [currentAvatarId, avatar]);

  const setAvatarId = (avatarId: AvatarId) => {
    setCurrentAvatarId(avatarId);
    // Persist to localStorage
    localStorage.setItem('selectedAvatarId', avatarId);
  };

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedAvatarId') as AvatarId;
    if (saved && saved !== currentAvatarId) {
      setCurrentAvatarId(saved);
    }
  }, []);

  const value = {
    currentAvatarId,
    setAvatarId,
    avatar
  };

  return (
    <AvatarThemeContext.Provider value={value}>
      {children}
    </AvatarThemeContext.Provider>
  );
};