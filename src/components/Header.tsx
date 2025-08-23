
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-sm h-20">
      <nav className="container mx-auto px-6 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity group">
            <img 
              src={uniHackLogo} 
              alt="UniHack.ai Logo" 
              className="h-12 group-hover:scale-105 transition-transform duration-200"
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm" className="font-medium hover:bg-primary/5 hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
