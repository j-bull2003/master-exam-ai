import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Pricing = () => {
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
      <section className="pt-32 pb-16 bg-mesh">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">SAT Prep</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your SAT preparation plan. Limited free access. Upgrade for full prep experience.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-mesh">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Annual Plan - Best Value */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary-variant/5 border border-primary/20">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-2 rounded-full text-sm font-semibold">
                    BEST VALUE
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Annual Plan</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black">$39.99</span>
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>
                <div className="mb-6">
                  <span className="text-muted-foreground">$479.99 billed annually</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-lg py-3">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Monthly Plan */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Monthly Plan</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black">$159.99</span>
                  <span className="text-muted-foreground text-lg">/mo</span>
                </div>
                <div className="mb-6">
                  <span className="text-muted-foreground">$159.99 monthly</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button variant="outline" className="w-full text-lg py-3">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Promo Code Link */}
            <div className="text-center mt-8">
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
                <p className="text-muted-foreground">You can explore the platform with limited access for 7 days. No credit card required upfront. Cancel anytime during the trial with no charges.</p>
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