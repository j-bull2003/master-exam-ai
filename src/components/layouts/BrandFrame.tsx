import { ReactNode } from "react";
import { Link } from "react-router-dom";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

interface BrandFrameProps {
  children: ReactNode;
  showLogo?: boolean;
}

const BrandFrame = ({ children, showLogo = true }: BrandFrameProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showLogo && (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              data-testid="unihack-logo"
            >
              <img
                src={uniHackLogo}
                alt="UNIHACK Logo"
                className="h-10 w-auto object-contain mix-blend-multiply dark:mix-blend-screen hover:scale-105 transition-transform duration-200"
                style={{ backgroundColor: "transparent" }}
              />
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