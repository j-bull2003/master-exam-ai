import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, ArrowRight, Sparkles, Users, Target, Brain, Zap } from "lucide-react";
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

      {/* Group Classes Section */}
      <section className="py-16 bg-mesh">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Group Classes Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold">New: Live Group Classes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Learning Path</h2>
              <p className="text-muted-foreground">Flexible weekly options with expert tutors and AI-powered platform access</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Platform Access */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Platform Access</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">$40</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">AI-powered SAT prep</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">8,500+ expert-authored questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">AI-powered weakness detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Full analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Mock exams & detailed reports</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-primary-variant/5 border border-primary/20 rounded-xl p-3 mb-6">
                  <div className="text-sm font-medium text-primary text-center">
                    Add Group Classes for +$30/week
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Platform + Group Classes - Most Popular */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary-variant/5 border border-primary/30 shadow-lg">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Platform + Group Classes</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">$70</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">$40 platform + $30/week classes</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Everything in Platform Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Live group sessions (2x/week)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Math + Reading & Writing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Expert tutor instruction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Interactive peer learning</span>
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* 1-on-1 Program */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">1-on-1 Program</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">From $150</span>
                  <span className="text-muted-foreground">/week</span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">Elite SAT coaching</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Personalized study plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Weekly 1-on-1 sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Full platform access included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Average 250+ point gains</span>
                  </div>
                </div>

                <Link to="/tutoring" className="block mb-4">
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="mt-16 p-8 bg-muted/30 rounded-3xl">
              <h3 className="text-2xl font-bold text-center mb-8">Available Add-ons</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background rounded-2xl border border-border/50">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Group Classes</h4>
                  <p className="text-sm text-muted-foreground mb-2">Live sessions • Oct 13th cohort</p>
                  <div className="text-lg font-bold text-primary">+$30/week</div>
                </div>
                <div className="text-center p-6 bg-background rounded-2xl border border-border/50">
                  <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">1-on-1 Tutoring</h4>
                  <p className="text-sm text-muted-foreground mb-2">Personalized coaching</p>
                  <div className="text-lg font-bold text-primary">From $150/week</div>
                </div>
                <div className="text-center p-6 bg-background rounded-2xl border border-border/50">
                  <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Extra Mock Tests</h4>
                  <p className="text-sm text-muted-foreground mb-2">Additional practice exams</p>
                  <div className="text-lg font-bold text-primary">+$10/week</div>
                </div>
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