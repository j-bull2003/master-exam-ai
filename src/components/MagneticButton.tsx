import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  magneticStrength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, loading, magneticStrength = 8, onMouseMove, onMouseLeave, disabled, ...props }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / magneticStrength;
      const y = (e.clientY - centerY) / magneticStrength;
      
      setPosition({ x, y });
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPosition({ x: 0, y: 0 });
      onMouseLeave?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "magnetic transition-all duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "active:scale-95 active:shadow-inner",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || loading}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {children}
        </span>
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";