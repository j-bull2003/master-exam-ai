import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccessGateProps {
  children: ReactNode;
  hasAccess?: boolean;
  userEmail?: string;
}

const AccessGate = ({ children, hasAccess = false, userEmail }: AccessGateProps) => {
  // If user has access, render the protected content
  if (hasAccess) {
    return <>{children}</>;
  }

  // Otherwise, show the subscription prompt
  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-6">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="ai-glass-card p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Subscription Required</h1>
          <p className="text-muted-foreground mb-8">
            {userEmail 
              ? "Your trial has expired or subscription is inactive. Upgrade to continue learning!"
              : "Start your free trial to access UniHack.ai's AI-powered test preparation."
            }
          </p>

          <div className="space-y-4">
            <Link to="/auth/register">
              <Button className="ai-cta-button w-full flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start 7-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            
            {userEmail && (
              <p className="text-sm text-muted-foreground">
                Already subscribed?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </p>
            )}
          </div>

          <div className="mt-8 p-4 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              ✓ 7-day free trial • ✓ All exam types • ✓ AI-powered personalization • ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessGate;
