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

      {/* Live Platform Demo */}
      <RealPlatformDemo />

      {/* AI-Powered Analytics Engine */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">AI-Powered </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Analytics Engine</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Watch your SAT scores transform with AI-powered insights that identify exactly where you need improvement and accelerate your progress by up to 300% faster than traditional methods.
            </p>
          </div>

          {/* Enhanced Analytics Dashboard */}
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

                {/* Live Stats */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Live Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Students</span>
                      <span className="text-primary font-bold">{statsCounter.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Questions Solved Today</span>
                      <span className="text-green-600 font-bold">{statsCounter.questions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Accuracy</span>
                      <span className="text-blue-600 font-bold">{statsCounter.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: SAT Domain Breakdown */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">SAT Domain Performance Analysis</h3>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-600 border-green-500/30">
                      Real-time Analytics
                    </Badge>
                  </div>
                  
                  {/* SAT Domain Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Reading & Writing */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground text-sm">Reading & Writing</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Craft & Structure</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-green-600">85%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Information & Ideas</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-orange-600">72%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Standard English</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '64%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-red-600">64%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Expression of Ideas</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-blue-600">78%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Math */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground text-sm">Math</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Heart of Algebra</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-red-600">58%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Problem Solving</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-green-600">82%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Advanced Math</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-orange-600">71%</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Geometry & Trig</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted/30 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                            </div>
                            <span className="text-xs font-medium text-blue-600">89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="pt-4 border-t border-border/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">AI Recommendation</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Focus on <strong className="text-red-600">Heart of Algebra - Linear Equations</strong> and <strong className="text-red-600">Standard English Conventions - Punctuation</strong>. 
                          Targeting these areas could boost your overall score by 60-80 points in the next 3 weeks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced animations and content */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            {isLoaded ? (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span className="text-foreground">Experience the </span>
                  <span className="bg-gradient-to-r from-primary via-primary-variant to-primary bg-clip-text text-transparent">Future of SAT Prep</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Join thousands of students who've transformed their SAT scores with our expert-crafted questions and AI-powered insights.
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-10 sm:h-12 md:h-16 w-full max-w-2xl mx-auto" />
                <Skeleton className="h-5 sm:h-6 w-full max-w-xl mx-auto" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <InteractiveCard
                key={index}
                className="p-6 sm:p-8 glass border border-border/50 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in group card-layered"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with enhanced design */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            {isLoaded ? (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span className="text-foreground">Real Students, </span>
                  <span className="bg-gradient-to-r from-primary via-primary-variant to-primary bg-clip-text text-transparent">Real Results</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Discover how students are achieving their dream SAT scores and getting into top universities.
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-10 sm:h-12 md:h-16 w-full max-w-2xl mx-auto" />
                <Skeleton className="h-5 sm:h-6 w-full max-w-xl mx-auto" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <InteractiveCard
                key={index}
                className="p-6 sm:p-8 glass border border-border/50 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in group card-layered"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="relative">
                  {/* Quote icon */}
                  <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-primary/30 mb-4 sm:mb-6" />
                  
                  {/* Testimonial content */}
                  <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Student info */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.university}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs bg-success/20 text-success border-success/30">
                          {testimonial.score}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{testimonial.improvement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with enhanced design */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            {isLoaded ? (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span className="text-foreground">Simple, </span>
                  <span className="bg-gradient-to-r from-primary via-primary-variant to-primary bg-clip-text text-transparent">Transparent Pricing</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Start your SAT prep journey with our free trial. No commitments, no hidden fees.
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-10 sm:h-12 md:h-16 w-full max-w-2xl mx-auto" />
                <Skeleton className="h-5 sm:h-6 w-full max-w-xl mx-auto" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <InteractiveCard className="p-8 sm:p-10 glass border border-border/50 rounded-3xl hover:shadow-2xl transition-all duration-500 animate-fade-in card-layered" style={{ animationDelay: '0.3s' }}>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Monthly</h3>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">$49.99</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Full access to SAT question bank</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">AI-powered analytics & insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Personalized study plans</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Full-length practice tests</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Expert explanations</span>
                  </li>
                </ul>
                
                <Link to="/auth/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-3">
                    Start Free Trial
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>

            {/* Annual Plan - Popular */}
            <InteractiveCard className="p-8 sm:p-10 glass border-2 border-primary/50 rounded-3xl hover:shadow-2xl transition-all duration-500 animate-fade-in relative card-layered" style={{ animationDelay: '0.4s' }}>
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-1 text-xs font-semibold shadow-lg">
                  Most Popular
                </Badge>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Annual</h3>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">$39.99</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                  <div className="text-sm text-success mt-1">Save 20% ($120/year)</div>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Everything in Monthly plan</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Priority customer support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">Advanced progress tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">College admission guidance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground font-medium">20% savings vs monthly</span>
                  </li>
                </ul>
                
                <Link to="/auth/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform text-sm sm:text-base py-2 sm:py-3">
                    Start Free Trial
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </div>

          {/* Trust indicators */}
          <div className="text-center mt-12 sm:mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>3-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-success" />
                <span>6,500+ active students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-gradient-to-br from-muted/50 to-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={uniHackLogo} alt="UniHack Logo" className="w-8 sm:w-10 h-8 sm:h-10" />
                <span className="text-xl sm:text-2xl font-bold text-foreground">UniHack</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Transforming SAT prep with AI-powered precision and expert-crafted content.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{statsCounter.students.toLocaleString()}+ students trust us</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/practice" className="hover:text-primary transition-colors">SAT Practice</Link></li>
                <li><Link to="/mocks" className="hover:text-primary transition-colors">Mock Tests</Link></li>
                <li><Link to="/analytics" className="hover:text-primary transition-colors">Analytics</Link></li>
                <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><a href="mailto:contact@unihack.ai" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:help@unihack.ai" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="mailto:support@unihack.ai" className="hover:text-primary transition-colors">Customer Support</a></li>
                <li><Link to="/auth/register" className="hover:text-primary transition-colors">Get Started</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2024 UniHack. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
              <a href="mailto:contact@unihack.ai" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;