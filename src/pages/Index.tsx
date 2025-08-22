import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { UniversityCarousel } from "@/components/UniversityCarousel";

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
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 ai-hero-section overflow-hidden">
        <div className="ai-floating-elements"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <div className="space-y-8 animate-[slideUpFade_0.8s_ease-out]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-variant/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                Join 10,000+ students already using AI-powered prep
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span className="text-foreground">Ace Your</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                  Admissions Test
                </span>
                <br />
                <span className="text-foreground">with AI-Driven Precision</span>
              </h1>

              {/* Subtext */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Any admission test worldwide. Personalized study plan. Adaptive quizzes & mocks. Tutor-authored content.
              </p>

              {/* Pricing Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">7-day free trial</span>
                </div>
                <div className="text-muted-foreground">$49.99/month after</div>
                <div className="text-muted-foreground">Cancel anytime</div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link to="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-all duration-300 text-lg px-8 py-6 group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Start Free Trial
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
              </div>

              {/* Supported Exams */}
              <div className="pt-8">
                <p className="text-sm text-muted-foreground mb-4">Supports all major admissions tests</p>
                <div className="flex flex-wrap gap-2">
                  {exams.map((exam, index) => (
                    <span
                      key={exam}
                      className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-1 text-sm font-medium"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: University Carousel */}
            <div className="animate-[scaleIn_1s_ease-out_0.3s_both]">
              <UniversityCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
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