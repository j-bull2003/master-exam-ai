import { Link } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Product configurations
  const plans = {
    annual: {
      priceId: "price_1QEjIsLBctfCMRN8GkkNjrFE", // Replace with actual Stripe price ID
      productId: "prod_annual",
      name: "Annual Plan",
      price: "$39.99",
      period: "/mo",
      billing: "$479.99 billed annually",
      savings: "Save $1,439.89/year"
    },
    monthly: {
      priceId: "price_1QEjI9LBctfCMRN8dM3Sx99m", // Replace with actual Stripe price ID  
      productId: "prod_monthly",
      name: "Monthly Plan", 
      price: "$159.99",
      period: "/mo",
      billing: "$159.99 monthly",
      savings: null
    }
  };

  const handleStartTrial = async (planType: 'annual' | 'monthly') => {
    if (!session) {
      // Redirect to registration
      window.location.href = '/auth/register';
      return;
    }

    setLoadingPlan(planType);
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: { priceId: plans[planType].priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const features = [
    "Unlimited SAT practice questions",
    "AI-powered personalization",
    "Full-length SAT mock exams",
    "Advanced analytics dashboard",
    "Comprehensive SAT preparation",
    "Detailed performance insights",
    "Expert-authored SAT content",
    "Mobile app access",
    "24/7 customer support",
    "Progress tracking",
    "Weakness identification",
    "SAT-specific study plans"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatedBackground className="opacity-80" />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-mesh">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 px-4">
              <span className="text-foreground">SAT Prep</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
              Choose your SAT preparation plan. Limited free access. Upgrade for full prep experience.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-12 sm:py-16 bg-mesh">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Annual Plan - Best Value */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary-variant/5 border border-primary/20">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    BEST VALUE
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plans.annual.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl font-black">{plans.annual.price}</span>
                  <span className="text-muted-foreground text-base sm:text-lg">{plans.annual.period}</span>
                </div>
                <div className="mb-2">
                  <span className="text-muted-foreground text-sm sm:text-base">{plans.annual.billing}</span>
                </div>
                <div className="mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm text-success font-semibold">{plans.annual.savings}</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    3-Day Free Trial
                  </div>
                </div>

                <Button 
                  onClick={() => handleStartTrial('annual')}
                  disabled={loadingPlan === 'annual'}
                  className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-base sm:text-lg py-2.5 sm:py-3 mb-4"
                >
                  {loadingPlan === 'annual' ? 'Loading...' : 'Start Free Trial'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Monthly Plan */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plans.monthly.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl font-black">{plans.monthly.price}</span>
                  <span className="text-muted-foreground text-base sm:text-lg">{plans.monthly.period}</span>
                </div>
                <div className="mb-4 sm:mb-6">
                  <span className="text-muted-foreground text-sm sm:text-base">{plans.monthly.billing}</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    3-Day Free Trial
                  </div>
                </div>

                <Button 
                  onClick={() => handleStartTrial('monthly')}
                  disabled={loadingPlan === 'monthly'}
                  variant="outline" 
                  className="w-full text-base sm:text-lg py-2.5 sm:py-3 mb-4"
                >
                  {loadingPlan === 'monthly' ? 'Loading...' : 'Start Free Trial'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Promo Code Link */}
            <div className="text-center mt-6 sm:mt-8">
              <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                + Add promo code
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Included */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Everything Included in Your Plan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">How does the free trial work?</h3>
                <p className="text-muted-foreground">You can explore the platform with limited access for 3 days. No credit card required upfront. Cancel anytime during the trial with no charges.</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">Do you only support SAT?</h3>
                <p className="text-muted-foreground">Yes, we specialize exclusively in SAT preparation to provide the most comprehensive and focused study experience possible.</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">Is the content created by real SAT experts?</h3>
                <p className="text-muted-foreground">Yes, all our SAT questions are authored by expert tutors and SAT specialists. We don't use AI-generated content for questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <section className="py-8 border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Powered by Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;