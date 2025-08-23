import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { LogoMarquee } from "@/components/LogoMarquee";

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
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              Join 10,000+ students already using AI-powered prep
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              <span className="text-foreground">Ace Your Admissions Test</span>
              <br />
              <span className="text-primary">with AI-Driven Precision</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              Any admission test worldwide. Personalized study plan. Adaptive quizzes & mocks. Tutor-authored content.
            </p>

            {/* Pricing Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-success font-semibold">7-day free trial</span>
              </div>
              <div className="text-muted-foreground">$49.99/month after</div>
              <div className="text-muted-foreground">Cancel anytime</div>
            </div>

            {/* CTA Button */}
            <div className="mb-8">
              <Link to="/auth/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg px-12 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Free Trial
                  <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Button>
              </Link>
            </div>

            {/* Supported Exams */}
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-4">Supports all major admissions tests</p>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8">
                {exams.map((exam, index) => (
                  <span
                    key={exam}
                    className="bg-card border border-border/50 rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {exam}
                  </span>
                ))}
              </div>
            </div>

            {/* University Logos Carousel - Integrated into hero */}
            <div className="mb-4">
              <p className="text-sm font-medium text-muted-foreground mb-4">
                Trusted by students preparing for top universities worldwide
              </p>
              <div style={{ minHeight: '72px' }}>
                <LogoMarquee />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
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
                className="bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your free trial today. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-6">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Premium Plan</h3>
              <div className="mb-6">
                <span className="text-5xl font-black text-foreground">$49.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-8">
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
                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold text-lg py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </Button>
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