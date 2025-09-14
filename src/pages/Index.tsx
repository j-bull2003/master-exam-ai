import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, Clock, Zap, CheckCircle, ArrowRight, Users, TrendingUp, Award, Star, Quote, Menu, X, BookOpen, Clipboard, BarChart3, User, AlertCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { LogoMarquee } from "@/components/LogoMarquee";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InteractiveCard } from "@/components/InteractiveCard";
import { MagneticButton } from "@/components/MagneticButton";
import { EmptyState } from "@/components/EmptyState";
import { PageProgressBar } from "@/components/PageProgressBar";
import { RealPlatformDemo } from "@/components/RealPlatformDemo";
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
            students: Math.floor(easeOut * 6500),
            questions: Math.floor(easeOut * 4000),
            accuracy: Math.floor(easeOut * 89)
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
      name: "Jessica M.",
      university: "MIT (Class of 2024)",
      exam: "SAT",
      score: "1540",
      improvement: "+220 points",
      quote: "After struggling with math for months, UniHack's personalized approach helped me understand my weak spots. Went from 1320 to 1540 in 8 weeks of focused practice.",
      avatar: "J"
    },
    {
      name: "David L.",
      university: "Stanford (Class of 2025)",
      exam: "SAT", 
      score: "1520",
      improvement: "+210 points",
      quote: "The diagnostic test was incredibly accurate - it identified exactly where I needed help. The daily practice plans actually fit my busy schedule, and the explanations are clear and detailed.",
      avatar: "D"
    },
    {
      name: "Maria S.",
      university: "Harvard (Class of 2024)",
      exam: "SAT",
      score: "1570",
      improvement: "+190 points",
      quote: "What impressed me most was how the platform adapted to my learning style. The reading comprehension strategies and math shortcuts saved me so much time on test day.",
      avatar: "M"
    },
    {
      name: "Alex K.",
      university: "UC Berkeley (Class of 2025)",
      exam: "SAT",
      score: "1510",
      improvement: "+230 points",
      quote: "I was stuck at 1280 for months. UniHack's AI spotted my grammar patterns and helped me master the writing section. Gained 230 points in just 10 weeks!",
      avatar: "A"
    },
    {
      name: "Sophia R.",
      university: "Yale (Class of 2024)",
      exam: "SAT",
      score: "1550",
      improvement: "+180 points",
      quote: "The practice questions felt exactly like the real test. The detailed explanations helped me understand not just what was wrong, but why. Couldn't have done it without this platform.",
      avatar: "S"
    },
    {
      name: "Michael T.",
      university: "Princeton (Class of 2025)",
      exam: "SAT",
      score: "1530",
      improvement: "+240 points",
      quote: "From 1290 to 1530 - I never thought I could improve this much. The step-by-step solutions and timing strategies completely changed my approach to the SAT.",
      avatar: "M"
    },
    {
      name: "Emma C.",
      university: "Northwestern (Class of 2024)",
      exam: "SAT",
      score: "1480",
      improvement: "+200 points",
      quote: "The reading comprehension section was my biggest weakness. After 6 weeks with UniHack, I finally understood how to approach passages strategically and efficiently.",
      avatar: "E"
    },
    {
      name: "Ryan P.",
      university: "Duke (Class of 2025)",
      exam: "SAT",
      score: "1500",
      improvement: "+190 points",
      quote: "The math section used to intimidate me. The AI identified exactly which algebra concepts I was missing and created a personalized study plan that actually worked.",
      avatar: "R"
    },
    {
      name: "Olivia H.",
      university: "Columbia (Class of 2024)",
      exam: "SAT",
      score: "1560",
      improvement: "+220 points",
      quote: "I tried other prep programs but none were as personalized. UniHack's diagnostic pinpointed my exact weak areas and the practice sessions were perfectly targeted.",
      avatar: "O"
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
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden bg-mesh" data-bg="mesh">
        {/* Animated background */}
        <AnimatedBackground className="opacity-80" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with enhanced glassmorphism */}
            {isLoaded ? (
              <div className="inline-flex items-center gap-2 glass border border-primary/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-in card-layered">
                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-primary group-hover:animate-pulse" />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-semibold">
                  Master the SAT in just 10 minutes daily
                </span>
              </div>
            ) : (
              <Skeleton className="h-6 sm:h-8 w-64 sm:w-80 mx-auto mb-4 sm:mb-6 rounded-full" />
            )}

            {/* Main Headline with enhanced typography */}
            {isLoaded ? (
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight mb-4 sm:mb-6 animate-fade-in px-2" style={{ animationDelay: '0.1s' }}>
                <span className="text-foreground block mb-1 sm:mb-2">Ace the SAT</span>
                <span className="bg-gradient-to-r from-primary via-primary-variant to-primary/80 bg-clip-text text-transparent">
                  with AI-Driven Precision
                </span>
              </h1>
            ) : (
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <Skeleton className="h-8 sm:h-12 md:h-16 w-full max-w-3xl mx-auto" />
                <Skeleton className="h-8 sm:h-12 md:h-16 w-full max-w-2xl mx-auto" />
              </div>
            )}

            {/* Subtext with better contrast */}
            {isLoaded ? (
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
                Master the SAT with AI-powered precision. Personalized study plans. Adaptive practice. Expert-authored content.
              </p>
            ) : (
              <Skeleton className="h-5 sm:h-6 w-full max-w-xl mx-auto mb-4 sm:mb-6" />
            )}

            {/* Enhanced pricing info with layered cards */}
            {isLoaded ? (
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 glass border border-success/30 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-success/15 transition-colors card-layered">
                  <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-success" />
                  <span className="text-success font-semibold">3-day free trial</span>
                </div>
                <div className="text-muted-foreground font-medium text-center">From $39.99/month (annual)</div>
                <div className="text-muted-foreground text-center">No setup fees • Cancel anytime</div>
              </div>
            ) : (
              <Skeleton className="h-5 sm:h-6 w-72 sm:w-96 mx-auto mb-6 sm:mb-8" />
            )}

            {/* Enhanced CTA with magnetic button */}
            {isLoaded ? (
              <div className="mb-6 sm:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                  <Link to="/auth/register" className="w-full sm:w-auto">
                    <MagneticButton className="px-6 sm:px-8 md:px-12 w-full sm:w-auto">
                      {/* Enhanced shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%] group-hover:transition-transform group-hover:duration-1000" />
                      <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-3">
                        Start Free Trial
                        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                      </Button>
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            ) : (
              <Skeleton className="h-12 sm:h-14 w-40 sm:w-48 mx-auto mb-6 sm:mb-8" />
            )}


            {/* University Logos Carousel with enhanced presentation */}
            {isLoaded ? (
              <div className="animate-fade-in px-4" style={{ animationDelay: '0.7s' }}>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-8 sm:mb-12">
                  Trusted by students preparing for top US universities
                </p>
                <div 
                  className="relative"
                  style={{ minHeight: '48px sm:72px' }}
                >
                  {/* Subtle gradient overlays for better integration */}
                  <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                  <LogoMarquee />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Skeleton className="h-3 sm:h-4 w-48 sm:w-64 mx-auto mb-3 sm:mb-4" />
                <Skeleton className="h-10 sm:h-14 w-full max-w-4xl mx-auto" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Revolutionary Analytics Intelligence Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Live Analytics Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Revolutionary </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Analytics Intelligence</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Watch your SAT scores transform with AI-powered insights that identify exactly where you need improvement and accelerate your progress by up to 300% faster than traditional methods.
            </p>
          </div>

          {/* Live Metrics Dashboard */}
          <div className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left: Score Projection */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Score Projection</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Current vs Target */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Current Score</span>
                      <span className="text-2xl font-bold text-foreground">1380</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '69%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Target Score</span>
                      <span className="text-2xl font-bold text-primary">1560</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-primary to-accent h-3 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/20">
                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+180 Point Improvement</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Based on your current trajectory and 8 weeks of focused practice</p>
                    </div>
                  </div>
                </div>

                {/* Breakthrough Metrics */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Breakthrough Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy Boost</span>
                      <span className="text-primary font-bold">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Speed Increase</span>
                      <span className="text-green-600 font-bold">+31%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weak Areas Fixed</span>
                      <span className="text-blue-600 font-bold">12/15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Study Efficiency</span>
                      <span className="text-purple-600 font-bold">3.2x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: AI Performance Analysis */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                      <Brain className="w-6 h-6 text-primary" />
                      AI Performance Analysis
                    </h3>
                    <Badge variant="secondary" className="animate-pulse">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Real-time
                    </Badge>
                  </div>

                  {/* Performance Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Math Performance */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-blue-500" />
                        Math Section Mastery
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Algebra</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '92%' }}></div>
                            </div>
                            <span className="text-blue-600 font-bold text-sm">92%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Geometry</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '87%' }}></div>
                            </div>
                            <span className="text-green-600 font-bold text-sm">87%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Advanced Math</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '78%' }}></div>
                            </div>
                            <span className="text-purple-600 font-bold text-sm">78%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reading & Writing Performance */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-500" />
                        Reading & Writing Excellence
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Information & Ideas</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '94%' }}></div>
                            </div>
                            <span className="text-green-600 font-bold text-sm">94%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Craft & Structure</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '81%' }}></div>
                            </div>
                            <span className="text-orange-600 font-bold text-sm">81%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Expression of Ideas</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 hover-scale" style={{ width: '89%' }}></div>
                            </div>
                            <span className="text-indigo-600 font-bold text-sm">89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">AI Recommendation</h5>
                        <p className="text-sm text-muted-foreground">
                          Focus 60% of your next study session on Advanced Math concepts, particularly polynomial functions. Your Reading & Writing performance is excellent - maintain current momentum with 2 passages daily.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Live Student Breakthroughs
                </h3>
                <div className="text-xs text-muted-foreground">Updates every 10 seconds</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Sarah M.</span>
                        <div className="text-xs text-muted-foreground">Just scored 1540 on practice test</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold text-sm">+210 pts</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Alex K.</span>
                        <div className="text-xs text-muted-foreground">Mastered quadratic equations</div>
                      </div>
                    </div>
                    <div className="text-blue-600 font-bold text-sm">95% accuracy</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Maria L.</span>
                        <div className="text-xs text-muted-foreground">Completed 50-day study streak</div>
                      </div>
                    </div>
                    <div className="text-purple-600 font-bold text-sm">🔥 50 days</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20 hover:scale-105 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div>
                        <span className="text-sm font-medium text-foreground">David R.</span>
                        <div className="text-xs text-muted-foreground">Reading speed increased 40%</div>
                      </div>
                    </div>
                    <div className="text-orange-600 font-bold text-sm">⚡ 40% faster</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground px-4">
              Why Students Choose UniHack for SAT Prep
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Advanced AI technology that adapts to your learning style and maximizes your SAT score potential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <InteractiveCard
                key={index}
                tiltEnabled={true}
                glowEnabled={true}
                className="text-center group hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Demo Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 mb-6 sm:mb-8 border border-white/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              Live Platform Preview
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight px-4">
              See Your Personalized
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Study Plan in Action
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Experience how our platform creates a customized study plan based on your diagnostic results and exam date
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white text-xs sm:text-sm font-medium"></div>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span>📍 Demo Preview</span>
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <RealPlatformDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 backdrop-blur-sm rounded-full text-sm font-medium text-blue-900 mb-8 border border-blue-200">
              <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
              AI-Powered Analytics Engine
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Deep-Dive Analytics That
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Rapidly Accelerate Your Score
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI-driven analytics engine detects patterns in your performance, pinpoints exact weaknesses, 
              and optimizes your learning plan for maximum score improvement in minimum time.
            </p>
          </div>

          {/* Analytics Features Grid */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            
            {/* Left Side - Feature Cards */}
            <div className="space-y-8">
              <InteractiveCard className="p-8 bg-white/95 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Weakness Detection AI</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Our advanced AI analyzes every question you answer, identifying not just what you got wrong, 
                      but the underlying concepts and patterns causing mistakes across different question types.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">Pattern Recognition</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">Root Cause Analysis</span>
                    </div>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard className="p-8 bg-white/95 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Adaptive Learning Optimization</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Dynamic study plans that evolve in real-time based on your progress. The AI adjusts difficulty, 
                      question types, and focus areas to maximize your improvement rate and test readiness.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Real-time Adaptation</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Smart Prioritization</span>
                    </div>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard className="p-8 bg-white/95 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Predictive Score Modeling</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Advanced algorithms predict your test-day performance and show exactly how much improvement 
                      you can expect with targeted practice in specific areas.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">Score Forecasting</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">Impact Analysis</span>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            {/* Right Side - Analytics Dashboard Preview */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden card-layered">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-500"></div>
                    </div>
                    <div className="text-white text-lg font-bold">AI Analytics Dashboard</div>
                    <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 text-xs font-medium">Live</span>
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-emerald-400 text-2xl font-bold">87%</div>
                      <div className="text-white/70 text-xs">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 text-2xl font-bold">1480</div>
                      <div className="text-white/70 text-xs">Predicted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 text-2xl font-bold">+220</div>
                      <div className="text-white/70 text-xs">Improvement</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 lg:p-6">
                  {/* SAT Subject Performance */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900">SAT Subject Breakdown</h4>
                      <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full w-fit">Real-time Analysis</div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-5">
                      {/* Reading & Writing */}
                      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div>
                            <div className="font-bold text-slate-900 text-sm sm:text-lg">Reading & Writing</div>
                            <div className="text-xs sm:text-sm text-emerald-700 font-medium">Craft & Structure</div>
                          </div>
                          <div className="text-right">
                            <div className="text-emerald-600 font-bold text-lg sm:text-xl">92%</div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs text-emerald-600 font-medium">+8%</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-emerald-200 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 sm:h-3 rounded-full transition-all duration-700 w-[92%]"></div>
                        </div>
                        <div className="mt-2 text-xs text-emerald-700 font-medium">✓ Strength Area</div>
                      </div>
                      
                      {/* Heart of Algebra */}
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div>
                            <div className="font-bold text-slate-900 text-sm sm:text-lg">Heart of Algebra</div>
                            <div className="text-xs sm:text-sm text-blue-700 font-medium">Linear Equations</div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-600 font-bold text-lg sm:text-xl">84%</div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-blue-600 font-medium">+5%</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-700 w-[84%]"></div>
                        </div>
                        <div className="mt-2 text-xs text-blue-700 font-medium">↗ Improving</div>
                      </div>
                      
                      {/* Problem Solving & Data Analysis */}
                      <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div>
                            <div className="font-bold text-slate-900 text-sm sm:text-lg">Problem Solving & Data</div>
                            <div className="text-xs sm:text-sm text-red-700 font-medium">Statistics & Probability</div>
                          </div>
                          <div className="text-right">
                            <div className="text-red-600 font-bold text-lg sm:text-xl">68%</div>
                            <div className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-red-600 font-medium">Focus</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-red-400 to-red-600 h-2 sm:h-3 rounded-full transition-all duration-700 w-[68%]"></div>
                        </div>
                        <div className="mt-2 text-xs text-red-700 font-medium">⚡ Priority Area</div>
                      </div>
                      
                      {/* Passport to Advanced Math */}
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <div>
                            <div className="font-bold text-slate-900 text-sm sm:text-lg">Passport to Advanced Math</div>
                            <div className="text-xs sm:text-sm text-yellow-700 font-medium">Quadratic Functions</div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-600 font-bold text-lg sm:text-xl">76%</div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-yellow-600 font-medium">+12%</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-yellow-200 rounded-full h-2 sm:h-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 sm:h-3 rounded-full transition-all duration-700 w-[76%]"></div>
                        </div>
                        <div className="mt-2 text-xs text-yellow-700 font-medium">📈 Rapid Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights Panel */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-xl shadow-lg card-layered">
                      <div className="flex items-center gap-3 mb-3">
                        <Brain className="w-6 h-6" />
                        <h5 className="font-bold text-lg">🎯 AI Priority Recommendation</h5>
                      </div>
                      <p className="text-purple-100 mb-3 leading-relaxed">
                        Focus 65% of study time on <strong>Problem Solving & Data Analysis</strong> - specifically Statistics & Probability concepts.
                      </p>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <div className="text-sm font-medium">Projected Score Increase: <span className="text-yellow-300 font-bold">+25 points</span> in 2 weeks</div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5" />
                        <h5 className="font-bold">⚡ Speed Insight</h5>
                      </div>
                      <p className="text-blue-100 text-sm">
                        You're 18% slower on data interpretation questions. Practice with timer mode for optimal pacing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="text-center">
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">89%</div>
                <div className="text-muted-foreground">Students see 200+ point gains</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">6.2x</div>
                <div className="text-muted-foreground">Faster improvement vs traditional prep</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-muted-foreground">Real-time performance tracking</div>
              </div>
            </div>
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
              Verified SAT Score Improvements
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real students, real results. Average improvement of 210+ points with our structured SAT preparation program.
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
              Choose your SAT preparation plan. 3-day free trial included with all plans.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Annual Plan - Best Value */}
              <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 to-primary-variant/5 border border-primary/20">
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                    BEST VALUE
                  </span>
                </div>
                
                <div className="pt-3 sm:pt-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Annual</h3>
                  <div className="mb-2">
                    <span className="text-3xl sm:text-4xl font-black">$39.99</span>
                    <span className="text-muted-foreground text-sm sm:text-base">/mo</span>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">$479.99 billed annually</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm">3-Day Free Trial</span>
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-3 sm:mb-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-3">
                    Start Free Trial
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </Button>
                </Link>
              </div>


              {/* Monthly Plan */}
              <div className="relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold mb-2">Monthly</h3>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-black">$159.99</span>
                  <span className="text-muted-foreground text-sm sm:text-base">/mo</span>
                </div>
                <div className="mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">$159.99 monthly</span>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold mb-1">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm">3-Day Free Trial</span>
                  </div>
                </div>

                <Link to="/auth/register" className="block mb-3 sm:mb-4">
                  <Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-3">
                    Start Free Trial
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
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