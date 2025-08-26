import { useState, useEffect } from "react";

export const usePageProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    
    // Simulate progressive loading
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return timer;
  };

  const completeProgress = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 200);
  };

  return {
    progress,
    isLoading,
    startProgress,
    completeProgress
  };
};