import { Users, Calendar, Clock, Star, CheckCircle, ArrowRight, Zap, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LiveZoomDemo from "./LiveZoomDemo";

const GroupClassSection = () => {
  const classTypes = [
    {
      title: "SAT Complete Mastery",
      schedule: "Mon & Wed • 7:00 PM EST",
      duration: "90 minutes per session",
      students: "8-12 students",
      difficulty: "All Levels",
      price: "$30/week",
      pricePerSession: "$15/session",
      startDate: "October 13th, 2024",
      features: [
        "Math + Reading & Writing combined",
        "Live interactive sessions",
        "Real-time Q&A with expert tutors", 
        "Collaborative problem solving",
        "Weekly progress tracking",
        "Small group attention"
      ],
      popular: true
    }
  ];

  const addOns = [
    {
      icon: Target,
      title: "1-on-1 Tutoring",
      description: "Weekly private sessions with expert SAT tutors",
      price: "+$40/week", 
      features: ["Personalized instruction", "Custom study plans", "Flexible scheduling"]
    },
    {
      icon: Zap,
      title: "Mock Test Package",
      description: "Additional full-length practice tests with detailed analysis",
      price: "+$10/week",
      features: ["Weekly mock exams", "Detailed score reports", "Improvement tracking"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">Optional Add-On: Live Group Classes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Enhance Your SAT Prep with Live Classes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Add live group learning to your platform access. Next cohort starts <span className="text-primary font-semibold">October 13th</span>. 
            Two sessions per week covering both Math and Reading & Writing for just <span className="text-primary font-semibold">$15 per session</span>
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Experience Live Learning</h3>
            <p className="text-muted-foreground">Interactive demo of our group class environment</p>
          </div>
          <LiveZoomDemo />
        </div>

        {/* Single Group Class Option */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            October 13th Cohort Now Enrolling
          </h3>
          
          <div className="max-w-lg mx-auto">
            {classTypes.map((classType, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary-variant/5 border border-primary/30 shadow-lg"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-2 rounded-full text-sm font-semibold">
                    NEXT COHORT
                  </span>
                </div>

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold mb-2 text-foreground">{classType.title}</h4>
                  <div className="text-3xl font-black text-primary mb-1">{classType.price}</div>
                  <div className="text-sm text-muted-foreground mb-2">{classType.pricePerSession}</div>
                  <div className="text-sm font-medium text-success">Starts: {classType.startDate}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{classType.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{classType.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{classType.students}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-4 h-4 text-primary" />
                    <span>{classType.difficulty}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {classType.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform">
                    Add to My Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Enhance Your Experience</h3>
            <p className="text-muted-foreground">Add these powerful tools to maximize your SAT prep</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <addon.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h4 className="text-lg font-bold mb-2 text-foreground">{addon.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{addon.description}</p>
                
                <div className="text-2xl font-bold text-primary mb-4">{addon.price}</div>
                
                <div className="space-y-2">
                  {addon.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-primary-variant/10 rounded-3xl p-12 border border-primary/20">
          <h3 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Add Group Classes to Your Plan?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our platform access, then add group classes for enhanced learning with peers. 
            Perfect combination of AI-powered prep and live instruction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/register">
              <Button className="bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform px-8">
                Add Group Classes
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="px-8">
                View All Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupClassSection;