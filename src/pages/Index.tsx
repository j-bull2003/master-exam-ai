import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  const exams = [
    "SAT", "ACT", "UCAT", "BMAT", "STEP", "MAT", "ESAT", "LNAT", "TSA", "PAT"
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Driven Precision",
      description: "Adaptive learning that adjusts to your pace and identifies weak spots instantly."
    },
    {
      icon: Target,
      title: "Diagnostic Excellence",
      description: "Pinpoint your strengths and weaknesses with our comprehensive baseline assessment."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get detailed explanations and similar questions to master every concept."
    },
    {
      icon: Clock,
      title: "Timed Practice",
      description: "Train under real exam conditions with our advanced timing system."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="ai-hero-section">
        <div className="ai-floating-elements"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Floating Badge */}
            <div className="ai-badge mb-8 mx-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Join 10,000+ students already using AI-powered prep
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Ace Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                Admissions Test
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                with AI Precision
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Any exam, one platform. Advanced AI adapts to your learning style.
              <br />
              <span className="text-success font-semibold">7-day free trial</span> • 
              <span className="text-muted-foreground"> $49.99/month after</span> • 
              <span className="text-muted-foreground">Cancel anytime</span>
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Link to="/auth/register">
                <button
                  className="ai-cta-button text-xl px-12 py-6"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Free Trial
                    <Sparkles className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} />
                  </span>
                </button>
              </Link>
            </div>

            {/* Supported Exams */}
            <div className="ai-glass-card p-6 max-w-2xl mx-auto mb-16">
              <p className="text-sm text-muted-foreground mb-4">Supports all major admissions tests</p>
              <div className="flex flex-wrap justify-center gap-3">
                {exams.map((exam, index) => (
                  <div
                    key={exam}
                    className="ai-badge"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {exam}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform learns from your performance to create a personalized study experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="ai-glass-card p-8 text-center hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your free trial today. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="ai-pricing-card featured">
              <div className="ai-badge mb-6 mx-auto">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <div className="mb-6">
                <span className="text-5xl font-black">$49.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <div className="ai-trial-banner mb-8">
                <p className="font-semibold text-success">🎉 7-Day Free Trial</p>
                <p className="text-sm text-muted-foreground">Full access, no restrictions</p>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <span>Unlimited practice questions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <span>AI-powered personalization</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <span>Full mock exams</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <span>All exam types</span>
                </li>
              </ul>

              <Link to="/auth/register" className="block">
                <button className="ai-cta-button w-full">
                  Start Free Trial
                </button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4">
                <Shield className="w-4 h-4 inline mr-1" />
                Powered by Stripe • Secure payment • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 UniHack.ai. Empowering students with AI-driven test preparation.
          </p>
          <div className="mt-4 space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/support" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;