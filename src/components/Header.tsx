
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/CommandPalette";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Search, Keyboard } from "lucide-react";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

export const Header = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useKeyboardShortcuts({
    onCommandPaletteOpen: () => setCommandPaletteOpen(true),
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-lg' 
          : 'bg-background/80 backdrop-blur-sm border-b border-border/20'
        } h-20
      `}>
      <nav className="container mx-auto px-6 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity group">
            <img 
              src={uniHackLogo} 
              alt="UniHack.ai Logo" 
              className="h-22 md:h-28 max-h-[88px] md:max-h-[112px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              Pricing
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
            >
              About
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>

          {/* Command Palette Button & CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50 px-3 py-2 glass-subtle"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs">Search</span>
              <div className="flex items-center gap-1 ml-2">
                <kbd className="kbd">⌘K</kbd>
              </div>
            </Button>
            
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/5 hover:text-primary border-hairline">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>

    {/* Command Palette */}
    <CommandPalette 
      open={commandPaletteOpen} 
      setOpen={setCommandPaletteOpen} 
    />
    </>
  );
};
