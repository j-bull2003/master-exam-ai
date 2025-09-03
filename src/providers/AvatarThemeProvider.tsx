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
    // Apply avatar theme CSS variables to document root
    const root = document.documentElement;
    
    // Set avatar-specific CSS variables
    root.style.setProperty('--avatar-accent', avatar.theme.accent);
    root.style.setProperty('--avatar-card-radius', avatar.theme.card.radius);
    root.style.setProperty('--avatar-card-shadow', avatar.theme.card.shadow);
    root.style.setProperty('--avatar-motion-intensity', avatar.theme.motion.intensity);
    
    // Apply background gradient classes
    const body = document.body;
    // Remove any existing avatar gradient classes
    body.classList.remove(
      'bg-gradient-to-br',
      'from-slate-900', 'via-slate-800', 'to-slate-900',
      'from-zinc-950', 'via-zinc-900', 'to-zinc-950',
      'from-indigo-950', 'via-indigo-900', 'to-indigo-950'
    );
    
    // Add new gradient classes based on avatar
    const gradientClasses = avatar.theme.bgGradient.split(' ');
    body.classList.add('bg-gradient-to-br', ...gradientClasses);
    
    // Set data attribute for motion preferences
    root.setAttribute('data-avatar-motion', avatar.theme.motion.intensity);
    root.setAttribute('data-avatar-success-fx', avatar.theme.motion.successFx);
    
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