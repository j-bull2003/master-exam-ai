import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BrandFrameProps {
  children: ReactNode;
  showLogo?: boolean;
}

const BrandFrame = ({ children, showLogo = true }: BrandFrameProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showLogo && (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              data-testid="unihack-logo"
            >
              <div className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                UNIHACK
              </div>
            </Link>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showLogo && (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-12 items-center justify-center text-sm text-muted-foreground">
            <span>© 2024 UNIHACK. All rights reserved.</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default BrandFrame;