import { useEffect, useCallback } from "react";

interface UseKeyboardShortcutsProps {
  onCommandPaletteOpen: () => void;
  onHelpOpen?: () => void;
}

export const useKeyboardShortcuts = ({ 
  onCommandPaletteOpen, 
  onHelpOpen 
}: UseKeyboardShortcutsProps) => {
  

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMetaOrCtrl = e.metaKey || e.ctrlKey;
    
    // Command Palette: Cmd/Ctrl + K
    if (isMetaOrCtrl && e.key === 'k') {
      e.preventDefault();
      onCommandPaletteOpen();
      return;
    }
    
    // Help: ?
    if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      onHelpOpen?.();
      return;
    }
    
    // Navigation shortcuts (only if not in input field)
    const target = e.target as HTMLElement;
    const isInInput = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' || 
                     target.contentEditable === 'true';
    
    if (!isInInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
      // Go to Dashboard: g then d
      if (e.key === 'g') {
        const nextKeyHandler = (nextE: KeyboardEvent) => {
          if (nextE.key === 'd') {
            window.location.assign('/dashboard');
          }
          document.removeEventListener('keydown', nextKeyHandler);
        };
        
        // Set up temporary listener for next key
        setTimeout(() => {
          document.addEventListener('keydown', nextKeyHandler);
          setTimeout(() => {
            document.removeEventListener('keydown', nextKeyHandler);
          }, 2000); // Clear after 2 seconds
        }, 0);
      }
    }
  }, [onCommandPaletteOpen, onHelpOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};