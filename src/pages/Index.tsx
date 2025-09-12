import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Brain, Target, Shield, CheckCircle, ArrowRight, Users, TrendingUp, Award, Star, Quote, CreditCard, Zap, Lock, Trophy, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { LogoMarquee } from "@/components/LogoMarquee";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InteractiveCard } from "@/components/InteractiveCard";
import { MagneticButton } from "@/components/MagneticButton";
import { PageProgressBar } from "@/components/PageProgressBar";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsCounter, setStatsCounter] = useState({ students: 0, improvement: 0, questions: 0 });
  
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
            students: Math.floor(easeOut * 15000),
            improvement: Math.floor(easeOut * 250),
            questions: Math.floor(easeOut * 8500)
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
      title: "AI-Powered Personalization",
      description: "Advanced algorithms analyze your performance to create a personalized study plan that adapts to your unique learning patterns."
    },
    {
      icon: Target,
      title: "Precision Weakness Detection",
      description: "Pinpoint exactly where you need improvement with granular analytics that identify specific question types and concepts."
    },
    {
      icon: Zap,
      title: "Expert Content & Explanations", 
      description: "8,500+ questions and explanations crafted by verified 1500+ SAT scorers and elite tutors from top universities."
    },
    {
      icon: Shield,
      title: "Proven Results System",
      description: "Our methodology has consistently delivered 200+ point improvements for thousands of students worldwide."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      university: "MIT",
      score: "1580",
      improvement: "+280 points",
      quote: "UniHack's AI completely transformed my approach. The personalized study plan was exactly what I needed.",
      avatar: "S"
    },
    {
      name: "Marcus Johnson", 
      university: "Stanford",
      score: "1560",
      improvement: "+240 points",
      quote: "The precision of the weakness detection was incredible. Every minute spent studying felt purposeful.",
      avatar: "M"
    },
    {
      name: "Elena Rodriguez",
      university: "Harvard", 
      score: "1590",
      improvement: "+270 points",
      quote: "From struggling with 1320 to achieving my dream score. The AI explanations made complex concepts simple.",
      avatar: "E"
    }
  ];

  const trustBadges = [
    { icon: Shield, text: "Bank-Level Security" },
    { icon: CreditCard, text: "Secure Payment Processing" },
    { icon: Lock, text: "Privacy Protected" },
    { icon: Trophy, text: "Proven Results" }
  ];


  return (
    <div className="min-h-screen bg-white">
      <PageProgressBar />
      <Header />
      
      {/* Premium Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-white to-accent/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-6 py-3 text-sm font-medium mb-8 shadow-sm">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary font-semibold">Trusted by 15,000+ students at elite universities</span>
            </div>

            {/* Premium Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-8">
              <span className="text-foreground">Master the SAT</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-variant to-accent bg-clip-text text-transparent">
                Score 1500+
              </span>
            </h1>

            {/* Premium Subtitle */}
            <p className="text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto font-light">
              The most advanced AI-powered SAT preparation platform. Join elite students achieving 
              <span className="font-semibold text-foreground"> average 250+ point improvements</span> in record time.
            </p>

            {/* Trial Badge */}
            <div className="inline-flex items-center gap-3 bg-success/10 border border-success/20 rounded-full px-6 py-3 mb-10">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-success font-semibold">3-Day Free Trial • Full Platform Access</span>
            </div>

            {/* Premium CTA */}
            <div className="mb-12">
              <Link to="/auth/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-all duration-300 text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">No credit card required • Cancel anytime</p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <badge.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* University Logos */}
            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground mb-8">
                Students accepted to these universities trust UniHack
              </p>
              <LogoMarquee />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold mb-6 text-foreground">
              Advanced AI SAT Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powered by cutting-edge artificial intelligence and created by elite SAT experts who scored 1500+
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Results That Speak for Themselves
            </h2>
            <p className="text-xl text-muted-foreground">Trusted by thousands of students worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-10">
                <Users className="w-16 h-16 text-primary mx-auto mb-6" />
                <div className="text-5xl font-display font-bold text-foreground mb-3">
                  {statsCounter.students.toLocaleString()}+
                </div>
                <div className="text-lg text-muted-foreground font-medium">Students Prepared</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-3xl p-10">
                <TrendingUp className="w-16 h-16 text-success mx-auto mb-6" />
                <div className="text-5xl font-display font-bold text-foreground mb-3">
                  {statsCounter.improvement}+
                </div>
                <div className="text-lg text-muted-foreground font-medium">Average Point Improvement</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-10">
                <Award className="w-16 h-16 text-accent mx-auto mb-6" />
                <div className="text-5xl font-display font-bold text-foreground mb-3">
                  {statsCounter.questions.toLocaleString()}+
                </div>
                <div className="text-lg text-muted-foreground font-medium">Expert Questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Success Stories from Elite Universities
            </h2>
            <p className="text-xl text-muted-foreground">See how UniHack transforms SAT scores and opens doors to top universities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-variant flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold text-primary">{testimonial.score}</div>
                    <div className="text-sm font-semibold text-success">{testimonial.improvement}</div>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed">{testimonial.quote}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-variant to-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-display font-bold text-white mb-6">
              Ready to Master the SAT?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join thousands of students who've transformed their SAT scores with our proven AI-powered platform.
              Start your 3-day free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-8">
              <Link to="/auth/register">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 transition-all duration-300 text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>3-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>Guaranteed Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;