import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Award, 
  BookOpen, 
  Brain,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Target
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const About = () => {
  const stats = [
    { number: "5K+", label: "Questions Created by Top Scorers" },
    { number: "50+", label: "Universities Represented" },
    { number: "95%", label: "Score Improvement" },
    { number: "25+", label: "Exam Types Supported" }
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Expert-Created Content",
      description: "Every question is crafted by tutors from top universities. No AI-generated content, just genuine expertise."
    },
    {
      icon: Brain,
      title: "Intelligent Adaptation",
      description: "Our AI learns from your performance to create truly personalized study experiences."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on measurable improvements in your test scores and confidence."
    },
    {
      icon: Users,
      title: "Student-Centered",
      description: "Built by students, for students. We understand the pressure and provide the support you need."
    }
  ];

  const team = [
    {
      name: "Expert Tutors",
      description: "PhDs and graduates from Cambridge, Oxford, Harvard, MIT and other top universities worldwide.",
      icon: GraduationCap
    },
    {
      name: "AI Engineers", 
      description: "Machine learning specialists focused on adaptive learning and personalization algorithms.",
      icon: Brain
    },
    {
      name: "Education Specialists",
      description: "Former admissions officers and test prep experts with decades of combined experience.",
      icon: Award
    }
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
              <span className="text-foreground ">Empowering Students with</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                AI-Driven Excellence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              UniHack.ai was born from a simple belief: every student deserves access to world-class test preparation, regardless of their background or location.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're democratizing access to premium test preparation by combining the expertise of world-class tutors with cutting-edge AI technology.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our platform doesn't just help students practice—it learns from their unique patterns, adapts to their needs, and guides them toward their target scores with unprecedented precision.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Real questions from real tutors, not AI-generated content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Personalized learning paths that adapt to your progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>Comprehensive support for any admission test worldwide</span>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Our Promise</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're committed to helping every student achieve their academic dreams through personalized, effective, and accessible test preparation. Our platform combines expert-created content with intelligent technology to deliver results that matter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-variant/20 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meet Our Expert Team
            </h2>
            <div className="space-y-8">
              {team.map((member, index) => (
                <div key={index} className="flex items-start gap-6 p-6 rounded-xl bg-card border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-variant/20 flex items-center justify-center flex-shrink-0">
                    <member.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-muted-foreground">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              From SAT prep in Silicon Valley to UCAT preparation in London, students trust UniHack.ai to help them achieve their academic goals.
            </p>
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <blockquote className="text-lg italic text-muted-foreground mb-4">
                "The questions created by top scorers really challenged me and exposed my weak areas. My STEP scores improved by 40% in just 6 weeks."
              </blockquote>
              <div className="text-sm font-semibold">Sarah M., Cambridge Applicant</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-variant/5 rounded-3xl p-12 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who are already improving their scores with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-variant">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;