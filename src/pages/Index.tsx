import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight, Users, TrendingUp, Award, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { LogoMarquee } from "@/components/LogoMarquee";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InteractiveCard } from "@/components/InteractiveCard";
import { MagneticButton } from "@/components/MagneticButton";
import { EmptyState } from "@/components/EmptyState";
import { PageProgressBar } from "@/components/PageProgressBar";
import { EXAM_CONFIGS } from "@/data/examConfig";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

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
            students: Math.floor(easeOut * 500),
            questions: Math.floor(easeOut * 50000),
            accuracy: Math.floor(easeOut * 96)
          });
          
          if (step >= steps) clearInterval(counter);
        }, interval);
        
        return () => clearInterval(counter);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);


  const features = [
    {
      icon: Brain,
      title: "AI-Powered SAT Mastery",
      description: "Smart algorithms analyze your SAT performance patterns and create personalized study paths for maximum score improvement."
    },
    {
      icon: Target,
      title: "SAT Weakness Detection",
      description: "Instantly identify which SAT topics need work with our comprehensive diagnostic that maps to real test sections."
    },
    {
      icon: Zap,
      title: "Real-Time SAT Explanations",
      description: "Get expert explanations for every SAT question with step-by-step solutions and similar practice problems."
    },
    {
      icon: Clock,
      title: "Official SAT Timing",
      description: "Practice with authentic SAT time constraints and pacing strategies to eliminate test day anxiety."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "MIT",
      exam: "SAT",
      score: "1580",
      improvement: "+240 points",
      quote: "UniHack's AI pinpointed my exact weaknesses and turned them into strengths. 240 point increase in just 3 months!",
      avatar: "S"
    },
    {
      name: "Marcus Johnson",
      university: "Stanford",
      exam: "SAT", 
      score: "1560",
      improvement: "+200 points",
      quote: "The bite-sized daily practice sessions fit perfectly into my schedule. Never felt more confident on test day.",
      avatar: "M"
    },
    {
      name: "Elena Rodriguez",
      university: "Harvard",
      exam: "SAT",
      score: "1590",
      improvement: "+180 points",
      quote: "The AI explanations were like having a personal tutor 24/7. Every mistake became a learning opportunity.",
      avatar: "E"
    }
  ];

  return (
    <div className="min-h-screen" data-bg="mesh" data-depth="1">
      <PageProgressBar />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-mesh" data-bg="mesh">
        {/* Animated background */}
        <AnimatedBackground className="opacity-80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with enhanced glassmorphism */}
            {isLoaded ? (
              <div className="inline-flex items-center gap-2 glass border border-primary/30 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-in card-layered">
                <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
                  Master the SAT in just 10 minutes daily
                </span>
              </div>
            ) : (
              <Skeleton className="h-8 w-80 mx-auto mb-6 rounded-full" />
            )}

            {/* Main Headline with enhanced typography */}
            {isLoaded ? (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span className="text-foreground block mb-2">Ace the SAT</span>
                <span className="bg-gradient-to-r from-primary via-primary-variant to-primary/80 bg-clip-text text-transparent">
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
                Master the SAT with AI-powered precision. Personalized study plans. Adaptive practice. Expert-authored content.
              </p>
            ) : (
              <Skeleton className="h-6 w-full max-w-xl mx-auto mb-6" />
            )}

            {/* Enhanced pricing info with layered cards */}
            {isLoaded ? (
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 glass border border-success/30 rounded-full px-3 py-1.5 hover:bg-success/15 transition-colors card-layered">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">7-day free trial</span>
                </div>
                <div className="text-muted-foreground font-medium">From $39.99/month</div>
                <div className="text-muted-foreground">Cancel anytime</div>
              </div>
            ) : (
              <Skeleton className="h-6 w-96 mx-auto mb-8" />
            )}

            {/* Enhanced CTA with magnetic button */}
            {isLoaded ? (
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/auth/register">
                  <MagneticButton
                    className="px-12"

                  >
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                    <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                    
                  </MagneticButton>
                </Link>
              </div>
            ) : (
              <Skeleton className="h-14 w-48 mx-auto mb-8" />
            )}

            {/* Enhanced exam badges with better styling */}
            {isLoaded ? (
              <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <p className="text-sm font-medium text-muted-foreground mb-4">SAT-focused preparation platform</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-8">
                  {EXAM_CONFIGS.map((exam, index) => {
                    const isAvailable = exam.available;
                    return (
                      <span
                        key={exam.name}
                        className={`glass border rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 card-layered ${
                          isAvailable
                            ? "border-border/50 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-md hover:scale-105 cursor-default"
                            : "border-border/30 text-muted-foreground opacity-60 cursor-not-allowed"
                        }`}
                        style={{ 
                          animationDelay: `${0.6 + index * 0.05}s`,
                          animation: 'fade-in 0.3s ease-out forwards'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {exam.name}
                          {!isAvailable && (
                            <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </span>
                    );
                  })}
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
              <div className=" animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <p className="text-sm font-medium text-muted-foreground mb-12">
                  Trusted by students preparing for top US universities
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
              Proven SAT Success
            </h2>
            <p className="text-muted-foreground">Join thousands of students who've achieved their dream SAT scores</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.students.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">SAT Students</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.questions.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">SAT Practice Questions</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-foreground mb-2">
                  {statsCounter.accuracy}%
                </div>
                <div className="text-muted-foreground font-medium">Score Improvement Rate</div>
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
              Why Students Choose UniHack for SAT Prep
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology that adapts to your learning style and maximizes your SAT score potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <InteractiveCard
                key={index}
                tiltEnabled={true}
                glowEnabled={true}
                className="text-center group hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Real SAT Score Improvements
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Students are achieving 200+ point improvements with our AI-powered SAT preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <InteractiveCard
                key={index}
                tiltEnabled={true}
                className="group hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/60 mb-4 group-hover:text-primary transition-colors group-hover:scale-110 transform duration-200" />
                  
                  {/* Testimonial Quote */}
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-colors group-hover:scale-110 transform duration-200">
                      <span className="text-primary font-semibold text-sm">{testimonial.avatar}</span>
                    </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                </div>
                
                {/* Score Badge */}
                <div className="mt-4 flex gap-2">
                  <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 py-1 group-hover:bg-success/15 transition-colors">
                    <Star className="w-4 h-4 text-success group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-semibold text-success">SAT: {testimonial.score}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{testimonial.improvement}</span>
                  </div>
                </div>
                </div>
              </InteractiveCard>
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
      <section className="pt-4 pb-4 ">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Simple,</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              <span className="text-foreground">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              One plan, unlimited potential. Start your free trial today and cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              
              {/* Monthly Plan */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-2">Monthly Plan</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black">$49.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                  <p className="text-sm text-muted-foreground">Explore the platform with limited access. Upgrade to unlock more</p>
                </div>

                <Link to="/auth/register" className="block mb-6">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground text-center">
                  Perfect for focused preparation
                </p>
              </div>

              {/* Lifetime Plan */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary-variant/5 border border-primary/20">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black">$299</span>
                  <span className="text-muted-foreground"> one-time</span>
                </div>
                <div className="mb-6">
                  <span className="text-lg line-through text-muted-foreground">$599.88/year</span>
                  <span className="text-success font-semibold ml-2">Pay once, use forever</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                  <p className="text-sm text-muted-foreground">Explore the platform with limited access. Upgrade to unlock more</p>
                </div>

                <Link to="/auth/register" className="block mb-6">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                <p className="text-sm text-muted-foreground text-center">
                  Unlimited access for life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>


      {/* Footer */}
      <footer className="py-12 border-t border-border/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
          <img
            src={uniHackLogo}
            alt="UniHack.ai Logo"
            className="h-36 md:h-44 max-h-[144px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
            style={{ backgroundColor: "transparent" }}
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