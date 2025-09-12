import { useState } from "react";
import { Check, ArrowRight, Star, Shield, Zap, Target, Users, Trophy, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramOption {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  features: string[];
  recommended?: boolean;
  premium?: boolean;
  icon: any;
  badge?: string;
}

interface ProgramSelectionProps {
  onComplete: (selectedProgram: string) => void;
}

const ProgramSelection = ({ onComplete }: ProgramSelectionProps) => {
  const [selectedProgram, setSelectedProgram] = useState<string>("platform-plus-groups");

  const programOptions: ProgramOption[] = [
    {
      id: "platform-only",
      name: "Platform Access",
      description: "AI-powered SAT prep with comprehensive practice and analytics",
      price: "$40/month",
      features: [
        "8,500+ expert-authored questions",
        "AI weakness detection & targeting",
        "Comprehensive analytics dashboard", 
        "Full-length mock exams",
        "Personalized study recommendations",
        "Mobile app access"
      ],
      icon: Zap,
      badge: "Core Program"
    },
    {
      id: "platform-plus-groups",
      name: "Platform + Group Classes",
      description: "Complete SAT mastery with live expert instruction",
      price: "$70/month",
      originalPrice: "$160/month",
      savings: "Save $90/month",
      features: [
        "Everything in Platform Access",
        "Live group sessions (2x per week)",
        "Expert SAT tutors",
        "Interactive peer learning",
        "Math + Reading & Writing coverage",
        "Real-time Q&A support",
        "October 13th cohort enrollment"
      ],
      recommended: true,
      icon: Users,
      badge: "Most Popular"
    },
    {
      id: "elite-program",
      name: "Elite 1-on-1 Program",
      description: "Exclusive personalized coaching for maximum score gains",
      price: "From $150/week",
      features: [
        "Everything in Platform + Groups",
        "Weekly 1-on-1 expert coaching",
        "Fully personalized study plans",
        "Advanced strategy sessions",
        "College application guidance",
        "Priority tutor matching",
        "Average 250+ point improvements"
      ],
      premium: true,
      icon: Crown,
      badge: "Elite Results"
    }
  ];

  const handleContinue = () => {
    onComplete(selectedProgram);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">Choose Your SAT Success Path</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Start Your 7-Day Free Trial
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience our complete SAT preparation system. Choose the program that matches your goals and start achieving elite results today.
          </p>
        </div>

        {/* Program Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {programOptions.map((program) => (
            <Card
              key={program.id}
              className={`relative p-8 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedProgram === program.id
                  ? program.premium
                    ? 'ring-2 ring-accent bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30'
                    : program.recommended
                    ? 'ring-2 ring-primary bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
                    : 'ring-2 ring-primary border-primary/30'
                  : program.premium
                  ? 'border-accent/20 hover:border-accent/30'
                  : program.recommended
                  ? 'border-primary/20 hover:border-primary/30'
                  : 'border-border/50 hover:border-primary/20'
              }`}
              onClick={() => setSelectedProgram(program.id)}
            >
              {/* Badge */}
              {program.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge 
                    className={`${
                      program.premium
                        ? 'bg-gradient-to-r from-accent to-accent/80 text-white'
                        : program.recommended
                        ? 'bg-gradient-to-r from-primary to-primary-variant text-white'
                        : 'bg-muted text-muted-foreground'
                    } px-4 py-1`}
                  >
                    {program.badge}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  program.premium
                    ? 'bg-accent/10'
                    : program.recommended
                    ? 'bg-primary/10'
                    : 'bg-muted/50'
                }`}>
                  <program.icon className={`w-8 h-8 ${
                    program.premium
                      ? 'text-accent'
                      : program.recommended
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground">{program.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                
                <div className="mb-4">
                  <div className={`text-3xl font-black mb-1 ${
                    program.premium ? 'text-accent' : 'text-primary'
                  }`}>
                    {program.price}
                  </div>
                  {program.originalPrice && (
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground line-through">
                        {program.originalPrice}
                      </div>
                      <div className="text-sm font-semibold text-success">
                        {program.savings}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {program.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      program.premium ? 'text-accent' : 'text-success'
                    }`} />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              <div className="text-center">
                <div className={`w-6 h-6 mx-auto rounded-full border-2 transition-all ${
                  selectedProgram === program.id
                    ? program.premium
                      ? 'bg-accent border-accent'
                      : 'bg-primary border-primary'
                    : 'border-muted-foreground'
                }`}>
                  {selectedProgram === program.id && (
                    <Check className="w-3 h-3 text-white m-0.5" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trial Benefits */}
        <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-3xl p-8 mb-8 border border-success/20">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">7-Day Free Trial Includes</h3>
            <p className="text-muted-foreground">Experience everything risk-free</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Target className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-foreground">Full Platform Access</div>
              <div className="text-sm text-muted-foreground">Complete diagnostic & practice</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-foreground">Live Group Session</div>
              <div className="text-sm text-muted-foreground">Join October 13th cohort preview</div>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="font-semibold text-foreground">Personal Study Plan</div>
              <div className="text-sm text-muted-foreground">AI-generated roadmap</div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-transform px-12 py-6 text-lg font-semibold"
          >
            Start My Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-success" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-success" />
              <span>Full Access Immediately</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramSelection;