import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import uniHackLogo from "@/assets/unihack-logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={uniHackLogo} 
              alt="UniHack.ai Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-primary-variant bg-clip-text text-transparent">
              UniHack.ai
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary-variant hover:opacity-90">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};