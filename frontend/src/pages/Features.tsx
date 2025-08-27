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

  const examTypes = [
    "SAT", "ACT", "UCAT", "STEP", "MAT", 
    "ESAT", "LNAT", "TSA", "PAT", "UKCAT", "GAMSAT"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatedBackground className="opacity-80" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-mesh">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Everything You Need to</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                Excel in Any Exam
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive AI-powered test preparation that adapts to your unique learning style and helps you achieve your target scores.
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
      <section className="py-16 bg-mesh">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-variant/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
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

      {/* Exam Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Supports Every Major Admission Test
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              From standardized tests to university-specific assessments, we've got you covered.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {examTypes.map((exam, index) => (
                <div
                  key={exam}
                  className="bg-background rounded-lg p-4 text-center border border-border/50 hover:border-primary/20 transition-colors"
                >
                  <span className="font-semibold text-lg">{exam}</span>
                </div>
              ))}
            </div>
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