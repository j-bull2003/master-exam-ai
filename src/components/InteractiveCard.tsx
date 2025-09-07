import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltEnabled?: boolean;
  glowEnabled?: boolean;
}

export const InteractiveCard = ({ 
  children, 
  className = "",
  style,
  tiltEnabled = false,
  glowEnabled = false 
}: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getTiltTransform = () => {
    if (!tiltEnabled || prefersReducedMotion || !cardRef.current) return "";
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / centerY * -3; // Max 3 degrees
    const rotateY = (mousePosition.x - centerX) / centerX * 3;   // Max 3 degrees
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const getGlowStyle = () => {
    if (!glowEnabled || prefersReducedMotion || !cardRef.current) return {};
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (mousePosition.x / rect.width) * 100;
    const y = (mousePosition.y / rect.height) * 100;
    
    return {
      background: `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary)/0.1) 0%, transparent 50%)`,
    };
  };

  return (
    <Card
      ref={cardRef}
      className={`
        relative overflow-hidden transition-all duration-300 ease-out
        ${isHovered ? 'shadow-lg -translate-y-1 border-primary/20' : 'shadow-sm border-border/50'}
        ${className}
      `}
      style={{
        transform: isHovered ? getTiltTransform() : "",
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effect overlay */}
      {glowEnabled && isHovered && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={getGlowStyle()}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
};