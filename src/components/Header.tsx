
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/CommandPalette";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Search, User, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

export const Header = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Mock auth state - replace with actual auth logic
  const isAuthenticated = ['/dashboard', '/profile', '/practice', '/mocks', '/analytics'].includes(location.pathname);
  const userName = "Alex Johnson";

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

  const isActiveRoute = (path: string) => location.pathname === path;

  const getNavLinkClass = (path: string) => 
    `relative text-sm font-medium transition-all duration-200 hover:text-primary ${
      isActiveRoute(path) 
        ? 'text-primary' 
        : 'text-muted-foreground'
    }`;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
              className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Enhanced Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Landing page navigation */}
            {!isAuthenticated && (
              <>
                <Link to="/features" className={getNavLinkClass('/features')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Features
                    {isActiveRoute('/features') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
                <Link to="/pricing" className={getNavLinkClass('/pricing')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Pricing
                    {isActiveRoute('/pricing') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
                <Link to="/about" className={getNavLinkClass('/about')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    About
                    {isActiveRoute('/about') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
              </>
            )}

            {/* Authenticated user navigation */}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Dashboard
                    {isActiveRoute('/dashboard') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
                <Link to="/practice" className={getNavLinkClass('/practice')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Practice
                    {isActiveRoute('/practice') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
                <Link to="/mocks" className={getNavLinkClass('/mocks')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Mocks
                    {isActiveRoute('/mocks') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
                <Link to="/analytics" className={getNavLinkClass('/analytics')}>
                  <span className="px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Analytics
                    {isActiveRoute('/analytics') && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"></span>
                    )}
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Command Palette Button & CTA Buttons */}
          <div className="flex items-center gap-3">
              {/* Command Palette Trigger */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCommandPaletteOpen(true)}
                  className="hidden lg:flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50 px-3 py-2 glass-subtle"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-xs">Search</span>
                  <div className="flex items-center gap-1 ml-2">
                    <kbd className="kbd">⌘K</kbd>
                  </div>
                </Button>
              )}
              
              {/* Authentication Buttons or User Menu */}
              {!isAuthenticated ? (
                <>
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
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        alex.johnson@example.com
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
