import { UserProfile } from "@/components/UserProfile";
import { Header } from "@/components/Header";
import AccessGate from "@/components/AccessGate";

const Profile = () => {
  // TODO: Replace with actual auth/subscription check
  const hasAccess = true;
  const userEmail = "demo@unihack.ai";

  return (
    <AccessGate hasAccess={hasAccess} userEmail={userEmail}>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account information and study preferences
            </p>
          </div>

          {/* Profile Content */}
          <div className="max-w-4xl">
            <UserProfile />
          </div>
        </div>
      </div>
    </AccessGate>
  );
};

export default Profile;