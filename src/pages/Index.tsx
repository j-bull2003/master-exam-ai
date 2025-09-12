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
      quote: "The combination of platform AI and group classes was perfect. Never felt more confident on test day.",
      avatar: "M"
    },
    {
      name: "Elena Rodriguez",
      university: "Harvard",
      exam: "SAT",
      score: "1590",
      improvement: "+280 points",
      quote: "From 1310 to 1590! The AI explanations and group discussions made every concept click.",
      avatar: "E"
    },
    {
      name: "David Kim",
      university: "Yale",
      exam: "SAT",
      score: "1570",
      improvement: "+220 points",
      quote: "The personalized study plan adapted to my schedule. 220 points improvement in 4 months was beyond my expectations.",
      avatar: "D"
    },
    {
      name: "Ashley Thompson",
      university: "Princeton",
      exam: "SAT",
      score: "1550",
      improvement: "+190 points",
      quote: "Group classes kept me motivated while the AI platform targeted my weak spots. Perfect combination!",
      avatar: "A"
    },
    {
      name: "Ryan Patel",
      university: "Columbia",
      exam: "SAT",
      score: "1580",
      improvement: "+260 points",
      quote: "I never thought I could break 1500. UniHack's system made the impossible possible. 260 points up!",
      avatar: "R"
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
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100" data-bg="mesh">
        {/* Animated background */}
        <AnimatedBackground className="opacity-80" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge with enhanced glassmorphism */}
            {isLoaded ? (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900/10 to-slate-700/10 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group animate-fade-in">
                <Sparkles className="w-4 h-4 text-slate-700 group-hover:animate-pulse" />
                <span className="text-slate-700 font-semibold">
                  Trusted by Students at Harvard, MIT, Stanford & More
                </span>
              </div>
            ) : (
              <Skeleton className="h-8 w-80 mx-auto mb-6 rounded-full" />
            )}

            {/* Main Headline with enhanced typography */}
            {isLoaded ? (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span className="text-slate-900 block mb-2">Elite SAT Mastery</span>
                <span className="bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  Guaranteed 200+ Point Gains
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
              <p className="text-xl text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto animate-fade-in font-light" style={{ animationDelay: '0.2s' }}>
                The world's most advanced SAT preparation system. Join elite students achieving unprecedented score improvements 
                with our AI-powered platform, expert-led group classes, and exclusive 1-on-1 coaching programs.
              </p>
            ) : (
              <Skeleton className="h-6 w-full max-w-xl mx-auto mb-6" />
            )}

            {/* Enhanced pricing info with layered cards */}
            {isLoaded ? (
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-full px-3 py-1.5 hover:bg-emerald-50 transition-colors">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-800 font-semibold">3-day free trial • No credit card required</span>
                </div>
                <div className="text-slate-600 font-medium">Plans starting from $149/month</div>
                <div className="text-slate-600">Save up to 16% with annual plans</div>
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
                      <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Elite SAT Preparation System
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology combined with expert instruction delivers unprecedented SAT score improvements.
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

      {/* Platform Pricing Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 font-display">
              Choose Your Plan
            </h2>
            <p className="text-slate-600 font-light">Start with our 3-day free trial, then select the perfect plan for your SAT preparation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 font-display">Monthly</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-slate-900 font-display">$149</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <p className="text-sm text-slate-600 font-light">Perfect for focused preparation</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">AI-powered personalized study plans</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">8,500+ expert-crafted SAT questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Real-time weakness detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Full-length practice tests</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Detailed performance analytics</span>
                </div>
              </div>

              <Link to="/auth/register" className="block">
                <Button className="w-full border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900" variant="outline">
                  Start 3-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* 3-Month Plan */}
            <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl scale-105 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 font-display">3-Month</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-slate-900 font-display">$399</span>
                  <span className="text-slate-600">/3 months</span>
                </div>
                <div className="text-xs bg-emerald-50 text-emerald-800 px-2 py-1 rounded-full mb-2">
                  Save $48 (11% off)
                </div>
                <p className="text-sm text-slate-600 font-light">Ideal for comprehensive preparation</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Everything in Monthly plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Priority customer support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Extended progress tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Advanced analytics dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Mobile app premium features</span>
                </div>
              </div>

              <Link to="/auth/register" className="block">
                <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 hover:scale-105">
                  Start 3-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Annual Plan */}
            <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 font-display">Annual</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-slate-900 font-display">$1,499</span>
                  <span className="text-slate-600">/year</span>
                </div>
                <div className="text-xs bg-emerald-50 text-emerald-800 px-2 py-1 rounded-full mb-2">
                  Save $289 (16% off)
                </div>
                <p className="text-sm text-slate-600 font-light">Best value for long-term success</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Everything in 3-Month plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Dedicated success manager</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Exclusive webinars & workshops</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">College application guidance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Lifetime progress tracking</span>
                </div>
              </div>

              <Link to="/auth/register" className="block">
                <Button className="w-full border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900" variant="outline">
                  Start 3-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-600 font-light">
              All plans include a 3-day free trial. Add group classes or 1-on-1 coaching during checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 font-display">
              Proven SAT Success
            </h2>
            <p className="text-slate-600 font-light">Join thousands of students who've achieved their dream SAT scores with our AI-powered platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 text-slate-700 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-slate-900 mb-2 font-display">
                  {statsCounter.students.toLocaleString()}+
                </div>
                <div className="text-slate-600 font-medium">SAT Students</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-12 h-12 text-slate-700 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-slate-900 mb-2 font-display">
                  {statsCounter.questions.toLocaleString()}+
                </div>
                <div className="text-slate-600 font-medium">SAT Practice Questions</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Award className="w-12 h-12 text-slate-700 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-slate-900 mb-2 font-display">
                  {statsCounter.accuracy}%
                </div>
                <div className="text-slate-600 font-medium">Score Improvement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 font-display">
              Why Students Choose UniHack for SAT Prep
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
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
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 text-slate-700 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 font-display">{feature.title}</h3>
                  <p className="text-slate-600 font-light">{feature.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 font-display">
              Real SAT Score Improvements
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Students are achieving 200+ point improvements with our AI-powered SAT preparation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <InteractiveCard
                key={index}
                tiltEnabled={true}
                className="group hover:border-slate-300/50 bg-white/80 backdrop-blur-sm border-slate-200/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-slate-400 mb-4 group-hover:text-slate-600 transition-colors group-hover:scale-110 transform duration-200" />
                  
                  {/* Testimonial Quote */}
                  <p className="text-slate-600 mb-6 italic leading-relaxed font-light">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200 group-hover:border-slate-300 transition-colors group-hover:scale-110 transform duration-200">
                      <span className="text-slate-700 font-semibold text-sm">{testimonial.avatar}</span>
                    </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-600">{testimonial.university}</div>
                  </div>
                </div>
                
                {/* Score Badge */}
                <div className="mt-4 flex gap-2">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 group-hover:bg-emerald-100 transition-colors">
                    <Star className="w-4 h-4 text-emerald-700 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-semibold text-emerald-800">SAT: {testimonial.score}</span>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-display">
              Ready to Transform Your SAT Score?
            </h2>
            <p className="text-slate-300 mb-8 text-lg font-light">
              Join thousands of students who've achieved their dream scores with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl px-8">
                  Start Your 3-Day Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-slate-300 text-slate-300 hover:bg-slate-300/10 px-8">
                  Explore All Services
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
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