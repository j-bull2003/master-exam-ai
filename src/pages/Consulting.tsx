import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { 
  Users, 
  Calendar, 
  Target, 
  Star,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Award
} from "lucide-react";

const SATPrograms = () => {
  const scrollToSuccessStories = () => {
    const element = document.getElementById('success-stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programs = [
    {
      title: "1:1 SAT Tutoring",
      description: "Personalized one-on-one SAT coaching with expert tutors",
      icon: Users,
      features: [
        "Customized study plan based on diagnostic",
        "Weekly 1-hour sessions with SAT expert",
        "Unlimited practice test reviews",
        "24/7 WhatsApp support",
        "Target score guarantee"
      ],
      duration: "8-16 weeks",
      price: "Starting at $150/session",
      badge: "Most Popular"
    },
    {
      title: "Group SAT Programs",
      description: "Small group SAT preparation with peer motivation",
      icon: BookOpen,
      features: [
        "Groups of 4-6 students maximum",
        "Weekly 2-hour intensive sessions",
        "Collaborative learning environment",
        "Shared progress tracking",
        "Group competitions & rewards"
      ],
      duration: "10-12 weeks",
      price: "Starting at $80/session",
      badge: null
    },
    {
      title: "Admissions Guidance",
      description: "Complete college admissions strategy and support",
      icon: GraduationCap,
      features: [
        "College selection strategy",
        "Application essay review",
        "Interview preparation",
        "Scholarship guidance",
        "Timeline management"
      ],
      duration: "6-12 months",
      price: "Starting at $200/hour",
      badge: "Premium"
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      before: "1240",
      after: "1580",
      improvement: "+340",
      college: "Stanford University",
      quote: "The personalized approach helped me identify my weak areas and turn them into strengths. I couldn't have achieved my dream score without this program.",
      program: "1:1 Tutoring"
    },
    {
      name: "Marcus Williams", 
      before: "1180",
      after: "1520",
      improvement: "+340",
      college: "MIT",
      quote: "The group program was perfect - I learned from my peers while getting expert guidance. The collaborative environment kept me motivated throughout.",
      program: "Group Program"
    },
    {
      name: "Priya Patel",
      before: "1300",
      after: "1560",
      improvement: "+260", 
      college: "Harvard University",
      quote: "Beyond just SAT prep, the admissions guidance helped me craft a compelling application that stood out. The comprehensive support made all the difference.",
      program: "Premium Package"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnimatedBackground className="opacity-60" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-mesh relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm font-medium px-4 py-2">
              Premium SAT Preparation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              <span className="text-foreground">Elite</span>{" "}
              <span className="bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent">
                SAT Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Personalized SAT preparation programs designed to maximize your score potential with expert tutors and proven methodologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://calendly.com/etonstone-education/1-hour-consultation" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                  Book Free Consultation
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={scrollToSuccessStories}
              >
                View Success Stories
                <Star className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Students Tutored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1580</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">+340</div>
                <div className="text-sm text-muted-foreground">Avg Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Choose Your SAT Program
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From personalized 1:1 tutoring to comprehensive admissions guidance, we have the perfect program to help you achieve your SAT goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="relative h-full bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-2xl group">
                  {program.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-2">
                        {program.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                      <program.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">{program.title}</CardTitle>
                    <p className="text-muted-foreground mb-4">{program.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">{program.price}</div>
                      <div className="text-sm text-muted-foreground">{program.duration}</div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/auth/register" className="block">
                      <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Student Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real students, real results. See how our SAT programs have helped students achieve their dream scores and get into top universities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">{story.college}</p>
                      </div>
                      <Badge variant="secondary">{story.program}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 py-4 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-muted-foreground">{story.before}</div>
                        <div className="text-xs text-muted-foreground">Before</div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-success" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{story.after}</div>
                        <div className="text-xs text-muted-foreground">After</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{story.improvement}</div>
                        <div className="text-xs text-muted-foreground">Improvement</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <blockquote className="text-sm text-muted-foreground italic">
                      "{story.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary-variant/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Achieve Your Target SAT Score?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Book a free consultation to discuss your SAT goals and find the perfect program for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendly.com/etonstone-education/1-hour-consultation" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                  Book Free Consultation
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="px-12 py-4 text-lg">
                  View Pricing
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Expert SAT Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Score Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SATPrograms;