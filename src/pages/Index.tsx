import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight, Users, TrendingUp, Award, Star, Quote, Menu, X, BookOpen, Clipboard, BarChart3, User } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
            students: Math.floor(easeOut * 12000),
            questions: Math.floor(easeOut * 8500),
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
      title: "Expert-Crafted SAT Questions",
      description: "Every question created by verified top SAT scorers and educators - never AI-generated. Authentic test prep from real experts."
    },
    {
      icon: Target,
      title: "AI-Powered Weakness Detection",
      description: "Smart algorithms analyze your performance to identify weak areas, while expert-crafted questions target your specific needs."
    },
    {
      icon: Zap,
      title: "Expert SAT Explanations",
      description: "Detailed explanations written by top scorers with step-by-step solutions and strategies used by SAT masters."
    },
    {
      icon: Clock,
      title: "Verified SAT Content",
      description: "All questions reviewed by our team of verified high scorers and educators for accuracy and authenticity."
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

  const mobileNavItems = [
    { name: "SAT Practice", href: "/practice", icon: BookOpen, description: "Start practicing SAT questions" },
    { name: "Mock Tests", href: "/mocks", icon: Clipboard, description: "Take full-length practice tests" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Track your progress" },
    { name: "Sign Up", href: "/auth/register", icon: User, description: "Create your account" }
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
                <div className="text-muted-foreground font-medium">From $39.99/month (annual)</div>
                <div className="text-muted-foreground">No setup fees • Cancel anytime</div>
              </div>
            ) : (
              <Skeleton className="h-6 w-96 mx-auto mb-8" />
            )}

            {/* Enhanced CTA with magnetic button */}
            {isLoaded ? (
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Link to="/auth/register" className="w-full sm:w-auto">
                    <MagneticButton className="px-8 sm:px-12 w-full sm:w-auto">
                      {/* Enhanced shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                      <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            ) : (
              <Skeleton className="h-14 w-48 mx-auto mb-8" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Proven</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary/80 bg-clip-text text-transparent">SAT Success</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Why Students Choose</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary/80 bg-clip-text text-transparent">UniHack for SAT Prep</span>
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

      {/* Expert-Crafted Content Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Questions built by a team of 
              <span className="bg-gradient-to-r from-primary to-primary-variant bg-clip-text text-transparent"> educators, tutors, </span>
              and 
              <span className="bg-gradient-to-r from-primary to-primary-variant bg-clip-text text-transparent"> test-prep experts.</span>
            </h2>
            
            <div className="glass border border-primary/20 rounded-2xl p-8 mb-8 shadow-lg hover:shadow-primary/20 transition-all duration-300 card-layered">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our team has been working with students since 2017, and we know AI is the next step in education. 
                We believe that combining our quality education with cutting-edge AI tools allows us to elevate 
                your test prep experience and help you achieve your goal score.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our content is handcrafted by curriculum team members who are assisted by AI workflows. 
                The curriculum team consists of educators and test prep experts with experience in developing 
                questions for multiple standardized tests.
              </p>
              
              <div className="bg-gradient-to-r from-primary to-primary-variant text-white p-6 rounded-xl shadow-lg card-layered">
                <p className="text-lg font-medium">
                  All questions, answers, hints, and explanations are reviewed by our 
                  Curriculum Team for accuracy, difficulty, and structure.
                </p>
              </div>
            </div>
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
              Choose your SAT preparation plan. 7-day free trial included with all plans.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Annual Plan - Best Value */}
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-primary-variant/5 border border-primary/20">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                    BEST VALUE
                  </span>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-xl font-bold mb-2">Annual</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black">$39.99</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">$479.99 billed annually</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* 6-Month Plan */}
              <div className="relative p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">6-Month</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">$54.99</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">$329.99 every 6 months</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* 3-Month Plan */}
              <div className="relative p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">3-Month</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">$79.99</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">$239.99 every 3 months</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button variant="outline" className="w-full">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Monthly Plan */}
              <div className="relative p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">Monthly</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black">$159.99</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">$159.99 monthly</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-4 h-4" />
                    7-Day Free Trial
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-4">
                  <Button variant="outline" className="w-full">
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

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Quick Access</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {mobileNavItems.map((item, index) => (
                <Link 
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <div className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-center group">
                    <item.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-center text-xs text-muted-foreground">
                Get started with your SAT preparation journey
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <Button
          onClick={() => setIsMobileMenuOpen(true)}
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-variant shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;