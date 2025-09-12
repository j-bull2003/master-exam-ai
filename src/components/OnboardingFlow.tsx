import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Shield, Users, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<"account-creation" | "program-selection">("account-creation");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [selectedProgram, setSelectedProgram] = useState<string>("platform-only");

  const handleAccountCreation = () => {
    setCurrentStep("program-selection");
  };

  const handleProgramSelection = (program: string) => {
    setSelectedProgram(program);
    onComplete();
  };

  if (currentStep === "account-creation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-muted-foreground">Start your 3-day free trial</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email"
                className="w-full p-3 border rounded-lg"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password"
                className="w-full p-3 border rounded-lg"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <Button 
              onClick={handleAccountCreation}
              className="w-full bg-gradient-to-r from-primary to-primary-variant py-6 text-lg"
            >
              Continue to Program Selection
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>3-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Choose Your SAT Program</h1>
          <p className="text-xl text-muted-foreground">Select the option that best fits your goals and schedule</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Platform Only */}
          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 ${
              selectedProgram === "platform-only" 
                ? 'ring-2 ring-primary border-primary/30' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedProgram("platform-only")}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">SAT Platform</h3>
              <p className="text-sm text-muted-foreground mb-4">AI-powered personalized SAT preparation</p>
              <div className="text-3xl font-bold text-primary">$40/month</div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                "8,500+ expert-authored questions",
                "AI weakness detection & targeting", 
                "Personalized study roadmap",
                "Full-length practice SATs",
                "Real-time performance analytics",
                "Mobile app with offline access"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className={`w-6 h-6 mx-auto rounded-full border-2 transition-all ${
                selectedProgram === "platform-only"
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground'
              }`}>
                {selectedProgram === "platform-only" && (
                  <CheckCircle className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </div>
          </Card>

          {/* Platform + Group Classes */}
          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 relative ${
              selectedProgram === "platform-plus-groups" 
                ? 'ring-2 ring-primary border-primary/30' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedProgram("platform-plus-groups")}
          >
            <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-variant text-white px-4 py-1">
              Most Popular
            </Badge>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Platform + Live Classes</h3>
              <p className="text-sm text-muted-foreground mb-4">Complete SAT mastery with live expert instruction</p>
              <div className="text-3xl font-bold text-primary">$160/month</div>
              <div className="text-sm text-muted-foreground">($40 platform + $120 weekly classes)</div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                "Everything in SAT Platform",
                "Live group sessions (2x per week, 60 mins each)",
                "Elite SAT coaches",
                "Interactive Math & Reading/Writing classes",
                "Real-time Q&A and strategy sessions",
                "Peer learning environment"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className={`w-6 h-6 mx-auto rounded-full border-2 transition-all ${
                selectedProgram === "platform-plus-groups"
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground'
              }`}>
                {selectedProgram === "platform-plus-groups" && (
                  <CheckCircle className="w-3 h-3 text-white m-0.5" />
                )}
              </div>
            </div>
          </Card>

          {/* 1-on-1 Program CTA */}
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="text-center">
              <Crown className="w-16 h-16 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Elite 1-on-1 Program</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Guaranteed 200+ point improvements with personal SAT coaching
              </p>
              
              <Link to="/tutoring">
                <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => handleProgramSelection(selectedProgram)}
            className="bg-gradient-to-r from-primary to-primary-variant px-12 py-6 text-lg"
          >
            Start My Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="mt-6 text-sm text-muted-foreground">
            Your 3-day free trial includes full platform access. Billing starts after trial ends.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;