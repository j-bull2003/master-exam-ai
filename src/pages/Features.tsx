import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  Zap, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { EXAM_CONFIGS } from "@/data/examConfig";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Driven Personalization",
      description: "Advanced algorithms adapt to your learning style, identifying strengths and weaknesses to create a truly personalized study experience.",
      benefits: ["Adaptive question difficulty", "Smart content recommendations", "Learning style optimization"]
    },
    {
      icon: Target,
      title: "Diagnostic Excellence",
      description: "Comprehensive baseline assessments that pinpoint exactly where you stand and what you need to focus on.",
      benefits: ["Detailed performance analytics", "Skill gap identification", "Progress tracking"]
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get immediate, detailed explanations for every question with similar practice problems to reinforce learning.",
      benefits: ["Step-by-step explanations", "Alternative solution methods", "Related practice questions"]
    },
    {
      icon: Clock,
      title: "Realistic Exam Simulation",
      description: "Train under authentic exam conditions with precise timing, interface, and question formats.",
      benefits: ["Exact exam timing", "Official question formats", "Stress management training"]
    },
    {
      icon: BookOpen,
      title: "Tutor-Authored Content",
      description: "All questions created by expert tutors from top universities, not AI-generated content.",
      benefits: ["University-level expertise", "Real exam quality", "Continuously updated content"]
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Deep insights into your performance with detailed breakdowns and improvement recommendations.",
      benefits: ["Performance trends", "Comparative analysis", "Improvement strategies"]
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatedBackground className="opacity-80" />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-mesh">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 px-4">
              <span className="text-foreground">Everything You Need to</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                Excel on the SAT
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Comprehensive AI-powered SAT preparation that adapts to your unique learning style and helps you achieve your target SAT score.
            </p>
            <Link to="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-variant">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 bg-mesh">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-variant/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAT Focus Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Focused Exclusively on SAT Success
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Unlike other platforms, we specialize 100% in SAT preparation for maximum effectiveness. 
              Our entire platform, content, and methodology is designed specifically for SAT success, 
              ensuring you get the most targeted and effective preparation possible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-variant/5 rounded-3xl p-12 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have improved their scores with UniHack.ai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-variant">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;