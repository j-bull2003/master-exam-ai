import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, BookOpen, TrendingUp, Play, CheckCircle } from "lucide-react";

export const PlatformDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: "Take Diagnostic Test",
      description: "Quick assessment to identify your strengths and areas for improvement",
      action: "Start Diagnostic",
      icon: Target
    },
    {
      title: "Set Your Goals",
      description: "Tell us your target score and exam date",
      action: "Continue",
      icon: Calendar
    },
    {
      title: "Generate Study Plan",
      description: "AI creates your personalized study roadmap",
      action: "Create Plan",
      icon: TrendingUp
    },
    {
      title: "Your Custom Plan",
      description: "Ready to begin your personalized SAT journey",
      action: "Start Studying",
      icon: CheckCircle
    }
  ];

  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + 25);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isAnimating && currentStep === steps.length - 1) {
      setIsAnimating(false);
    }
  }, [currentStep, isAnimating, steps.length]);

  const startDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(true);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-8">
      {/* Demo Control */}
      <div className="text-center">
        <Button 
          onClick={startDemo}
          disabled={isAnimating}
          className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Play className="w-5 h-5 mr-2" />
          {isAnimating ? "Demo in Progress..." : "Start Demo"}
        </Button>
        {currentStep === steps.length - 1 && !isAnimating && (
          <Button 
            onClick={resetDemo}
            variant="outline"
            className="ml-4 px-6 py-3"
          >
            Restart Demo
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-slate-600 mt-2">
          <span>Start</span>
          <span>Your Plan Ready</span>
        </div>
      </div>

      {/* Demo Interface */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Current Step */}
        <div className="space-y-6">
          <Card className={`transition-all duration-500 ${currentStep >= 0 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'} border-2 ${currentStep === 0 ? 'border-blue-500 shadow-lg' : 'border-slate-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${currentStep >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Diagnostic Test</h3>
                  <p className="text-slate-600 text-sm">Assess your current level</p>
                </div>
              </div>
              {currentStep === 0 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-sm text-slate-700">Sample Question:</div>
                  <div className="bg-slate-50 p-3 rounded-lg text-sm">
                    "Which choice best maintains the sentence pattern established in the passage?"
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border">A) Option A</div>
                    <div className="bg-white p-2 rounded border">B) Option B</div>
                    <div className="bg-white p-2 rounded border">C) Option C</div>
                    <div className="bg-blue-100 p-2 rounded border-2 border-blue-500">D) Option D ✓</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'} border-2 ${currentStep === 1 ? 'border-blue-500 shadow-lg' : 'border-slate-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${currentStep >= 1 ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Set Goals</h3>
                  <p className="text-slate-600 text-sm">Target score & exam date</p>
                </div>
              </div>
              {currentStep === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700">Target Score:</label>
                      <div className="bg-blue-50 p-2 rounded font-semibold text-blue-800">1450</div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-700">Exam Date:</label>
                      <div className="bg-blue-50 p-2 rounded font-semibold text-blue-800">Dec 2025</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Generated Plan */}
        <div className="space-y-6">
          <Card className={`transition-all duration-500 ${currentStep >= 2 ? 'opacity-100 scale-100' : 'opacity-50 scale-95'} border-2 ${currentStep >= 2 ? 'border-green-500 shadow-lg' : 'border-slate-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${currentStep >= 2 ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">AI Study Plan</h3>
                  <p className="text-slate-600 text-sm">Personalized roadmap</p>
                </div>
              </div>
              {currentStep >= 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">Your Custom Plan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>8 weeks until exam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <span>Focus: Reading Comprehension (+120 pts)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span>Weekly: 3 practice tests, 5 study sessions</span>
                      </div>
                    </div>
                  </div>
                  
                  {currentStep === 3 && (
                    <div className="space-y-3 animate-fade-in">
                      <h5 className="font-medium text-slate-900">Weekly Schedule:</h5>
                      <div className="grid gap-2 text-xs">
                        <div className="bg-white p-2 rounded border-l-4 border-blue-500">
                          <div className="font-medium">Mon: Reading Strategies</div>
                          <div className="text-slate-600">Passage analysis + 20 questions</div>
                        </div>
                        <div className="bg-white p-2 rounded border-l-4 border-green-500">
                          <div className="font-medium">Wed: Math Practice</div>
                          <div className="text-slate-600">Algebra focus + calculator tips</div>
                        </div>
                        <div className="bg-white p-2 rounded border-l-4 border-purple-500">
                          <div className="font-medium">Fri: Full Practice Test</div>
                          <div className="text-slate-600">Timed test + detailed review</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {currentStep === 3 && (
            <Card className="border-2 border-emerald-500 shadow-lg animate-fade-in">
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Plan Ready!</h3>
                  <p className="text-slate-600 mb-4">Your personalized study plan is ready to help you reach your 1450 target score.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Join Group Classes Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};