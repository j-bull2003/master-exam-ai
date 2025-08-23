import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight, Users, TrendingUp, Award, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { LogoMarquee } from "@/components/LogoMarquee";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsCounter, setStatsCounter] = useState({ students: 0, questions: 0, accuracy: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animate stats counters
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        
        let step = 0;
        const counter = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setStatsCounter({
            students: Math.floor(easeOut * 12847),
            questions: Math.floor(easeOut * 2500000),
            accuracy: Math.floor(easeOut * 94)
          });
          
          if (step >= steps) clearInterval(counter);
        }, interval);
        
        return () => clearInterval(counter);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

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

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "MIT",
      exam: "SAT",
      score: "1580",
      quote: "UniHack's AI identified exactly where I was struggling and helped me improve my score by 200 points!",
      avatar: "SC"
    },
    {
      name: "James Wilson",
      university: "Oxford",
      exam: "BMAT",
      score: "7.2/9",
      quote: "The adaptive practice was game-changing. I felt completely prepared on exam day.",
      avatar: "JW"
    },
    {
      name: "Maria Rodriguez",
      university: "Stanford",
      exam: "ACT",
      score: "35",
      quote: "The personalized study plan saved me months of preparation time. Absolutely brilliant!",
      avatar: "MR"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_50%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with glassmorphism */}
            {isLoaded ? (
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-in">
                <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
                 <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
                   Join 12,000+ students already using AI-powered prep
                 </span>
              </div>
            ) : (
              <Skeleton className="h-8 w-80 mx-auto mb-6 rounded-full" />
            )}

            {/* Main Headline with enhanced typography */}
            {isLoaded ? (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span className="text-foreground block mb-2">Ace Your Admissions Test</span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  with AI-Driven Precision
                </span>
              </h1>
            ) : (
              <div className="space-y-4 mb-6">
                <Skeleton className="h-16 w-full max-w-3xl mx-auto" />
                <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
              </div>
            )}

            {/* Subtext with better contrast */}
            {isLoaded ? (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Any admission test worldwide. Personalized study plan. Adaptive quizzes & mocks. Tutor-authored content.
              </p>
            ) : (
              <Skeleton className="h-6 w-full max-w-xl mx-auto mb-6" />
            )}

            {/* Pricing Info with glassmorphism */}
            {isLoaded ? (
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 bg-success/10 backdrop-blur-sm border border-success/20 rounded-full px-3 py-1.5 hover:bg-success/15 transition-colors">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">7-day free trial</span>
                </div>
                <div className="text-muted-foreground font-medium">$49.99/month after</div>
                <div className="text-muted-foreground">Cancel anytime</div>
              </div>
            ) : (
              <Skeleton className="h-6 w-96 mx-auto mb-8" />
            )}

            {/* CTA Button with enhanced interactions */}
            {isLoaded ? (
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/auth/register">
                  <Button
                    size="lg"
                    className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-6 shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                    <span className="relative z-10">Start Free Trial</span>
                    <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 relative z-10 ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
              </div>
            ) : (
              <Skeleton className="h-14 w-48 mx-auto mb-8" />
            )}

            {/* Supported Exams with enhanced glassmorphism */}
            {isLoaded ? (
              <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <p className="text-sm font-medium text-muted-foreground mb-4">Supports all major admissions tests</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8">
                  {exams.map((exam, index) => (
                    <span
                      key={exam}
                      className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-default"
                      style={{ 
                        animationDelay: `${0.6 + index * 0.05}s`,
                        animation: 'fade-in 0.3s ease-out forwards'
                      }}
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <Skeleton className="h-4 w-48 mx-auto mb-4" />
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-12" />
                  ))}
                </div>
              </div>
            )}

            {/* University Logos Carousel with enhanced presentation */}
            {isLoaded ? (
              <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Trusted by students preparing for top universities worldwide
                </p>
                <div 
                  className="relative"
                  style={{ minHeight: '72px' }}
                >
                  {/* Subtle gradient overlays for better integration */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                  <LogoMarquee />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Skeleton className="h-4 w-64 mx-auto mb-4" />
                <Skeleton className="h-14 w-full max-w-4xl mx-auto" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Trusted by Students Worldwide
            </h2>
            <p className="text-muted-foreground">Real results from real students</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.students.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">Active Students</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.questions.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">Questions Answered</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.accuracy}%
                </div>
                <div className="text-muted-foreground font-medium">Average Score Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
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
                className="bg-card rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our AI-powered platform helped students achieve their dream scores
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/60 mb-4 group-hover:text-primary transition-colors" />
                
                {/* Testimonial Quote */}
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    <span className="text-primary font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                </div>
                
                {/* Score Badge */}
                <div className="mt-4 inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 text-success" />
                  <span className="text-sm font-semibold text-success">{testimonial.exam}: {testimonial.score}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12">
            <Link to="/auth/register">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Join Them Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
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
            <div className="bg-background/90 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50 pointer-events-none" />
              <div className="inline-block bg-primary/15 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-6 border border-primary/20 relative z-10">🔥 Most Popular</div>
              <h3 className="text-2xl font-bold mb-2 text-foreground relative z-10">Premium Plan</h3>
              <div className="mb-6 relative z-10">
                <span className="text-5xl font-black text-foreground">$49.99</span>
                <span className="text-muted-foreground">/month</span>
                <div className="text-sm text-muted-foreground mt-1">
                  Save 20% with annual billing
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-8 relative z-10 hover:bg-success/15 transition-colors">
                <p className="font-semibold text-success">🎉 7-Day Free Trial</p>
                <p className="text-sm text-muted-foreground">Full access, no restrictions</p>
                <p className="text-xs text-success/80 mt-1">No credit card required</p>
              </div>

              <ul className="space-y-4 mb-8 text-left relative z-10">
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

              <Link to="/auth/register" className="block relative z-10">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4 relative z-10">
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <img 
              src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
              alt="UniHack.ai Logo" 
              className="h-6 w-auto object-contain"
            />
          </div>
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