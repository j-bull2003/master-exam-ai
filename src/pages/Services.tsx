import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Star, Trophy, Users, Clock, Target, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Services = () => {
  const services = [
    {
      name: "SAT Platform Access",
      price: "$149",
      period: "/month",
      description: "Comprehensive AI-powered SAT preparation platform with personalized learning",
      popular: false,
      features: [
        "AI-powered personalized study plans",
        "8,500+ expert-crafted SAT questions", 
        "Real-time weakness detection",
        "Adaptive learning algorithms",
        "Full-length practice tests",
        "Detailed performance analytics",
        "Mobile and desktop access",
        "Progress tracking dashboard"
      ],
      cta: "Start 3-Day Free Trial",
      badge: "Most Popular"
    },
    {
      name: "Platform + Live Group Classes",
      price: "$269",
      period: "/month",
      description: "Complete SAT preparation with platform access plus weekly group classes",
      popular: true,
      features: [
        "Everything in Platform Access",
        "2 hours weekly live group classes",
        "1 hour Math + 1 hour English/Reading",
        "Expert SAT instructors",
        "Interactive group discussions",
        "Weekly homework assignments",
        "Group study sessions",
        "Peer learning community"
      ],
      cta: "Start Free Trial + Classes",
      badge: "Best Value"
    },
    {
      name: "Elite 1-on-1 SAT Program",
      price: "$3,000",
      period: "20 sessions",
      description: "Premium personalized coaching with dedicated SAT expert tutors",
      popular: false,
      features: [
        "Everything in Platform Access",
        "20 one-on-one tutoring sessions",
        "Dedicated SAT expert tutor",
        "Customized study strategy",
        "Flexible scheduling 7 days/week",
        "Real-time strategy adjustments",
        "Mock exam review sessions",
        "College application guidance",
        "Average 250+ point improvements",
        "Priority platform support"
      ],
      cta: "Schedule Consultation",
      badge: "Elite Results"
    }
  ];

  const successStories = [
    {
      name: "Jennifer Liu",
      score: "1590",
      improvement: "+290 points",
      university: "Harvard",
      service: "Elite 1-on-1",
      quote: "The personalized attention made all the difference. My tutor identified exactly what I needed to work on."
    },
    {
      name: "Marcus Johnson", 
      score: "1560",
      improvement: "+200 points",
      university: "Stanford",
      service: "Platform + Classes",
      quote: "The combination of platform AI and group classes was perfect. Never felt more confident on test day."
    },
    {
      name: "Elena Rodriguez",
      score: "1590",
      improvement: "+280 points",
      university: "Harvard",
      service: "Platform Access",
      quote: "The AI platform alone gave me incredible results. The personalized study plan was spot-on."
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
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-accent font-semibold">Premium SAT Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">Choose Your</span>{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                SAT Success Path
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From AI-powered self-study to elite 1-on-1 coaching, we have the perfect solution 
              to help you achieve your target SAT score.
            </p>
          </div>
        </div>
      </section>

      {/* Services Pricing */}
      <section className="py-16 bg-gradient-to-r from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our SAT Preparation Services
            </h2>
            <p className="text-muted-foreground">Choose the level of support that matches your goals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  service.popular 
                    ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 shadow-lg lg:scale-105'
                    : 'bg-card border-border/50 hover:border-accent/20'
                }`}
              >
                {service.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{service.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-accent">{service.price}</span>
                    <span className="text-muted-foreground">{service.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth/register" className="block">
                  <Button 
                    className={`w-full ${
                      service.popular 
                        ? 'bg-gradient-to-r from-accent to-accent/80 hover:scale-105' 
                        : ''
                    }`}
                    variant={service.popular ? "default" : "outline"}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories by Service */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Success Stories from Each Service
            </h2>
            <p className="text-muted-foreground">Real students, real results across all our offerings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <div key={index} className="p-8 rounded-3xl bg-card border border-border/50 hover:border-accent/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent/20">
                      <span className="text-accent font-bold">{story.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{story.name}</div>
                      <div className="text-sm text-muted-foreground">{story.university}</div>
                    </div>
                  </div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {story.service}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-black text-accent mb-1">{story.score}</div>
                  <div className="text-success font-semibold">{story.improvement}</div>
                </div>
                
                <p className="text-muted-foreground italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Students Choose Our SAT Services
              </h2>
              <p className="text-muted-foreground">Proven methodology, expert instruction, and guaranteed results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Personalized Approach</h3>
                <p className="text-muted-foreground">Every service is tailored to your unique learning style and target score goals.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Expert Instructors</h3>
                <p className="text-muted-foreground">Learn from verified top SAT scorers and experienced educators.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Proven Results</h3>
                <p className="text-muted-foreground">Average score improvements of 200+ points across all service levels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-12 border border-accent/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Achieve Your Target SAT Score?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of students who've achieved their dream scores with our proven SAT preparation services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform px-8">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 px-8">
                Compare All Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;