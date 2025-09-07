import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { 
  Users, 
  Trophy, 
  Target, 
  BookOpen, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  GraduationCap,
  Globe,
  Clock
} from "lucide-react";

export const Consulting = () => {
  console.log('Consulting component rendering');

  const programmes = [
    {
      title: "US University Admissions",
      description: "Comprehensive support for Ivy League and top-tier US universities",
      features: [
        "SAT/ACT preparation and strategy",
        "Application essay coaching",
        "Extracurricular planning",
        "Interview preparation",
        "Financial aid guidance"
      ],
      duration: "12-18 months",
      icon: <Globe className="w-6 h-6" />,
      highlight: "Most Popular"
    },
    {
      title: "UK University Admissions", 
      description: "Expert guidance for Oxford, Cambridge, and Russell Group universities",
      features: [
        "UCAT/MAT/TMUA preparation",
        "Personal statement crafting",
        "Interview training",
        "Course selection strategy",
        "UCAS application support"
      ],
      duration: "8-12 months",
      icon: <GraduationCap className="w-6 h-6" />,
      highlight: "Premium"
    },
    {
      title: "Test Prep Plus",
      description: "Intensive exam preparation with personalized tutoring",
      features: [
        "1-on-1 tutoring sessions",
        "Custom study plans",
        "Practice test analysis",
        "Weakness targeting",
        "Progress tracking"
      ],
      duration: "3-6 months",
      icon: <Target className="w-6 h-6" />,
      highlight: "Results Focused"
    }
  ];

  const services = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Academic Planning",
      description: "Strategic course selection and academic timeline development"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Essay Coaching",
      description: "Expert guidance on personal statements and application essays"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Interview Training",
      description: "Mock interviews and personalized feedback for admissions success"
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Test Strategy",
      description: "Customized preparation plans for standardized tests"
    }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", description: "Students accepted to top-choice universities" },
    { number: "200+", label: "Students Placed", description: "At Ivy League and Russell Group universities" },
    { number: "15", label: "Years Experience", description: "In elite university admissions" },
    { number: "24/7", label: "Support", description: "Dedicated advisor access" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            Elite University Consulting
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Your Path to Elite Universities
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Expert consulting services for students aspiring to study at the world's most competitive universities. 
            From test prep to application strategy, we guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              onClick={() => window.open('https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-e', '_blank')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Consulting Programmes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support tailored to your university goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programmes.map((programme, index) => (
              <Card key={index} className="card-layered hover:shadow-xl transition-all duration-300 border-hairline relative">
                {programme.highlight && (
                  <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
                    {programme.highlight}
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {programme.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{programme.title}</CardTitle>
                  <CardDescription className="text-base">{programme.description}</CardDescription>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{programme.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {programme.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    variant={programme.highlight === "Most Popular" ? "default" : "outline"}
                    onClick={() => window.open('https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-e', '_blank')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 px-6 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from students who trusted us with their university journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-layered p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah M.</h3>
                <p className="text-muted-foreground text-sm mb-4">SAT: 1480 → 1560</p>
              </div>
              <blockquote className="text-muted-foreground mb-4 italic">
                "The personalized SAT prep strategy helped me improve by 80 points. Now I'm studying Computer Science at MIT!"
              </blockquote>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                MIT - Class of 2028
              </Badge>
            </Card>

            <Card className="card-layered p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">James L.</h3>
                <p className="text-muted-foreground text-sm mb-4">UCAT: 2640</p>
              </div>
              <blockquote className="text-muted-foreground mb-4 italic">
                "The interview preparation was incredible. I felt confident and prepared for my Oxford Medicine interviews."
              </blockquote>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Oxford Medicine - 2024
              </Badge>
            </Card>

            <Card className="card-layered p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emma R.</h3>
                <p className="text-muted-foreground text-sm mb-4">TMUA: 7.8/9.0</p>
              </div>
              <blockquote className="text-muted-foreground mb-4 italic">
                "The TMUA preparation was exactly what I needed. The practice questions were spot-on for the actual exam."
              </blockquote>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Cambridge Mathematics - 2024
              </Badge>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Join 200+ students who achieved their dream university placements
            </p>
            <Button 
              size="lg"
              onClick={() => window.open('https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-e', '_blank')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
            >
              Start Your Success Story
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support across every aspect of university admissions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-layered text-center p-8 hover:shadow-lg transition-all duration-300">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven process that has helped hundreds of students reach their dream universities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Initial Consultation</h3>
              <p className="text-muted-foreground">
                We begin with a personal consultation to understand your academic background, goals, and target universities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Strategy</h3>
              <p className="text-muted-foreground">
                Once enrolled, we create a tailored admissions strategy and guide you through our platform and timeline.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Guided Execution</h3>
              <p className="text-muted-foreground">
                From test prep to essay coaching and interview training, we support you every step of the way to admission success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our next cohort starting September 2025. Limited spots available for our elite university preparation programme.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
            onClick={() => window.open('https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-e', '_blank')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Your Strategy Call
          </Button>
        </div>
      </section>
    </div>
  );
};