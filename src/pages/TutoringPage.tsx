import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Calendar, Clock, Users, Target, Trophy, Star, Award, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const TutoringPage = () => {
  const programFeatures = [
    "Personalized diagnostic assessment",
    "Custom study plan creation", 
    "Weekly 1-on-1 sessions with expert tutors",
    "Real-time strategy adjustments",
    "Full platform access included",
    "Progress tracking & analytics",
    "Mock exam review sessions",
    "College application guidance",
    "Flexible scheduling 7 days/week",
    "Average 250+ point improvements"
  ];

  const successStories = [
    {
      name: "Jennifer Liu",
      score: "1590",
      improvement: "+290 points",
      university: "Harvard",
      quote: "The 1-on-1 program transformed my approach to the SAT. My tutor identified exactly what I needed to work on."
    },
    {
      name: "Michael Rodriguez", 
      score: "1570",
      improvement: "+270 points",
      university: "Stanford",
      quote: "Personalized attention made all the difference. I went from struggling with math to scoring perfect 800s."
    },
    {
      name: "Sophia Patel",
      score: "1580", 
      improvement: "+310 points",
      university: "MIT",
      quote: "The weekly sessions kept me accountable and the custom study plan was perfectly tailored to my needs."
    }
  ];

  const pricingTiers = [
    {
      name: "Essential 1-on-1",
      price: "$150",
      period: "/week",
      features: [
        "2 hours of 1-on-1 tutoring weekly (4 sessions)",
        "Full platform access",
        "Custom study plan",
        "Progress tracking"
      ],
      popular: false
    },
    {
      name: "Intensive 1-on-1", 
      price: "$250",
      period: "/week",
      features: [
        "4 hours of 1-on-1 tutoring weekly (6-8 sessions)",
        "Full platform access",
        "Custom study plan",
        "Weekly mock exam reviews",
        "College guidance sessions"
      ],
      popular: true
    },
    {
      name: "Elite 1-on-1",
      price: "$400",
      period: "/week", 
      features: [
        "6 hours of 1-on-1 tutoring weekly (10+ sessions)",
        "Full platform access",
        "Custom study plan",
        "Daily check-ins",
        "Mock exam reviews",
        "College application support",
        "Priority scheduling"
      ],
      popular: false
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
              <span className="text-accent font-semibold">Elite SAT Coaching Program</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-foreground">1-on-1 SAT</span>{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                Mastery Program
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Accelerate your SAT success with personalized coaching from expert tutors. 
              Our 1-on-1 program delivers average improvements of 250+ points.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/auth/register">
                <Button className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform px-8">
                  Start Your 1-on-1 Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Elite Results from 1-on-1 Coaching
            </h2>
            <p className="text-muted-foreground">Real students, real transformations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <div key={index} className="p-8 rounded-3xl bg-card border border-border/50 hover:border-accent/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent/20">
                    <span className="text-accent font-bold">{story.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.university}</div>
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

      {/* Program Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              What's Included in Your 1-on-1 Program
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gradient-to-r from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Choose Your 1-on-1 Program
            </h2>
            <p className="text-muted-foreground">Flexible options to match your goals and schedule</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 shadow-lg'
                    : 'bg-card border-border/50 hover:border-accent/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-accent">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth/register" className="block">
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-accent to-accent/80 hover:scale-105' 
                        : ''
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-12 border border-accent/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Unlock Your SAT Potential?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Limited spots available for our 1-on-1 program. Schedule a consultation 
              to discuss your goals and find the perfect program fit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform px-8">
                  Apply for 1-on-1 Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 px-8">
                Book Consultation Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutoringPage;