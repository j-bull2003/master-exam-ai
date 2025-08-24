import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground = ({ className = "" }: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        {/* Static background for reduced motion */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_50%)]" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Cursor-following spotlight */}
      <div
        className="absolute w-96 h-96 rounded-full transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary)/0.15) 0%, hsl(var(--primary)/0.05) 30%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Secondary ambient light */}
      <div
        className="absolute w-64 h-64 rounded-full transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)/0.1) 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x * 0.3 - 128}px, ${mousePosition.y * 0.3 - 128}px)`,
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};