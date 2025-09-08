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
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img
              src={uniHackLogo}
              alt="UniHack.ai Logo"
              className="h-36 md:h-44 max-h-[144px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <nav className="flex items-center space-x-6">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Your Profile</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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