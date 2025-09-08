import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";
import UserProfile from "@/components/UserProfile";
import { LogOut, Home, User, Clipboard, BookOpen, BarChart3 } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img
              src={uniHackLogo}
              alt="UniHack.ai Logo"
              className="h-20 sm:h-24 md:h-32 lg:h-36 max-h-[80px] sm:max-h-[96px] md:max-h-[128px] lg:max-h-[144px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Home className="w-4 h-4" />Dashboard</Link>
            <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BookOpen className="w-4 h-4" />Practice</Link>
            <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analytics</Link>
            <Link to="/profile" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><User className="w-4 h-4" />Profile</Link>
            <Link to="/">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/">
              <Button 
                size="sm" 
                variant="outline"
                className="px-3"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="container mx-auto px-2">
            <nav className="flex items-center justify-around py-2">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <Home className="w-4 h-4" />
                <span className="text-xs">Dashboard</span>
              </Link>
              <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs">Practice</span>
              </Link>
              <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <Clipboard className="w-4 h-4" />
                <span className="text-xs">Mocks</span>
              </Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs">Analytics</span>
              </Link>
              <Link to="/profile" className="text-primary font-medium flex flex-col items-center gap-1 py-2 px-3">
                <User className="w-4 h-4" />
                <span className="text-xs">Profile</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">Your Profile</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your account settings, exam preferences, and study goals
          </p>
        </div>

        {/* Profile */}
        <div className="max-w-4xl mx-auto">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;