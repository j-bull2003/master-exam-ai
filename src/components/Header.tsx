
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/CommandPalette";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Search, Menu, X } from "lucide-react";
import { Instagram, Linkedin } from "lucide-react";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

export const Header = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        } h-16
      `}>
      <nav className="container mx-auto px-6 h-full flex items-center">
      <div className="relative flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex md:flex-1">
  <Link
    to="/"
    className="flex items-center hover:opacity-80 transition-opacity group"
  >
    <img
      src={uniHackLogo}
      alt="UniHack.ai Logo"
      className="h-32 md:h-44 max-h-[128px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200 -ml-4 md:ml-0"
      style={{ backgroundColor: "transparent" }}
    />
  </Link>

  {/* Socials */}
  <div className="hidden md:flex items-center gap-3 text-muted-foreground">
    <a
      href="https://instagram.com/unihackai"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-foreground transition-colors"
    >
      <Instagram className="w-5 h-5" />
    </a>

    <a
      href="https://linkedin.com/company/yourorg"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-foreground transition-colors"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
</div>


          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-md">
            <Link 
              to="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group whitespace-nowrap"
            >
              Features
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group whitespace-nowrap"
            >
              Pricing
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group whitespace-nowrap"
            >
              About
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
            <Link
              to="/consulting"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group whitespace-nowrap"
            >
              SAT Program
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>

          {/* Command Palette Button & CTA Buttons */}
          <div className="flex items-center gap-2">
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
            
            {/* Desktop CTA Buttons */}
            <Link to="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/5 hover:text-primary border-hairline">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register" className="hidden md:block">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Start Free Trial
              </Button>
            </Link>
            
            {/* Mobile CTA Buttons */}
            <Link to="/auth/login" className="md:hidden">
              <Button variant="ghost" size="sm" className="font-medium text-xs px-2 py-1 h-8">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register" className="md:hidden">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-2 py-1 h-8 text-xs"
              >
                Free Trial
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-1 h-8 w-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>
    </header>

    {/* Mobile Navigation Menu */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-40 md:hidden">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-background border-l border-border shadow-xl">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex-1 p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Navigation</h3>
                <div className="space-y-3">
                  <Link 
                    to="/features" 
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    to="/about" 
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/consulting"
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SAT Program
                  </Link>
                </div>
              </div>
              
              {/* Search */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/unihackai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/yourorg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div className="p-6 border-t border-border space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setCommandPaletteOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Command Palette */}
    <CommandPalette 
      open={commandPaletteOpen} 
      setOpen={setCommandPaletteOpen} 
    />
    </>
  );
};
