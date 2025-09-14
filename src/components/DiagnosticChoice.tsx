import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Clock, Target, CheckCircle, BookOpen } from 'lucide-react';

interface DiagnosticChoiceProps {
  onComplete?: () => void;
}

const DiagnosticChoice = ({ onComplete }: DiagnosticChoiceProps) => {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState<'diagnostic' | 'dashboard' | null>(null);

  const handleContinue = () => {
    if (selectedChoice === 'diagnostic') {
      navigate('/diagnostic');
    } else {
      navigate('/dashboard');
    }
    onComplete?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
            alt="UniHack.ai" 
            className="h-32 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground">Welcome to UniHack!</h1>
          <p className="text-muted-foreground">Your account is ready. How would you like to start?</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Choose Your Starting Point</h2>
            <p className="text-muted-foreground">Select how you'd like to begin your SAT preparation</p>
          </CardHeader>

          <CardContent className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Diagnostic Test Option */}
              <div 
                onClick={() => setSelectedChoice('diagnostic')}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  selectedChoice === 'diagnostic'
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Recommended Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-success to-success text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✨ RECOMMENDED
                  </div>
                </div>
                
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all ${
                  selectedChoice === 'diagnostic'
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {selectedChoice === 'diagnostic' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-4 pt-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground">Take Diagnostic Test</h3>
                    <p className="text-muted-foreground mb-4">
                      Get a personalized assessment of your current SAT level and receive a tailored study plan.
                    </p>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span>Takes about 30 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Target className="w-4 h-4" />
                        <span>Personalized study plan</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Identify weak areas</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Set target score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skip to Dashboard Option */}
              <div 
                onClick={() => setSelectedChoice('dashboard')}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  selectedChoice === 'dashboard'
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all ${
                  selectedChoice === 'dashboard'
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {selectedChoice === 'dashboard' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-4 pt-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-foreground">Skip to Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Go straight to your dashboard and start practicing with general SAT questions.
                    </p>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Start practicing immediately</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <ArrowRight className="w-4 h-4" />
                        <span>Jump right in</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <BookOpen className="w-4 h-4" />
                        <span>Access all features</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span>Take diagnostic later</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleContinue}
                disabled={!selectedChoice}
                className="flex items-center justify-center space-x-2 px-8 py-3 text-lg"
              >
                <span>Continue</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosticChoice;