import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, BookOpen, TrendingUp, Play, CheckCircle, Brain, Calculator, Trophy, Star } from "lucide-react";

export const RealPlatformDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const steps = [
    {
      title: "Take Diagnostic Test",
      description: "Complete our comprehensive assessment",
      component: "diagnostic"
    },
    {
      title: "View Results",
      description: "See your strengths and areas for improvement",
      component: "results"
    },
    {
      title: "Set Study Goals",
      description: "Choose your target score and exam date",
      component: "goals"
    },
    {
      title: "Get Your Plan",
      description: "Receive your personalized study roadmap",
      component: "plan"
    }
  ];

  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + 25);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (isAnimating && currentStep === steps.length - 1) {
      setIsAnimating(false);
    }
  }, [currentStep, isAnimating, steps.length]);

  const startDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(true);
    setSelectedAnswer("");
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(false);
    setSelectedAnswer("");
  };

  const renderDiagnosticStep = () => (
    <div className="min-h-[500px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 rounded-2xl relative overflow-hidden">
      {/* Background elements like actual platform */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header like actual platform */}
      <div className="p-4 border-b bg-white/95 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold">SAT Diagnostic</h3>
              <Badge variant="secondary" className="text-xs">Reading & Writing</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-xl">
            <Clock className="h-3 w-3 text-orange-600" />
            <span className="font-mono text-xs font-bold text-orange-700">28:45</span>
          </div>
        </div>
        <div className="mt-2">
          <Progress value={33} className="h-1.5" />
        </div>
      </div>

      {/* Question content */}
      <div className="p-6">
        <Card className="bg-white/95 backdrop-blur-2xl border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-slate-700 mb-4">
                  The recent study shows that students who engage in regular physical exercise perform better academically...
                </p>
                <p className="font-bold text-slate-900">
                  Which of the following can be concluded from the passage?
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                "All students should be required to exercise daily",
                "Physical exercise may improve academic performance",
                "Students who don't exercise will fail academically",
                "Cognitive function is entirely dependent on physical activity"
              ].map((choice, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === String.fromCharCode(65 + index) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setSelectedAnswer(String.fromCharCode(65 + index))}
                >
                  <span className="font-medium text-slate-600 mr-3">{String.fromCharCode(65 + index)}.</span>
                  {choice}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="min-h-[500px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Diagnostic Complete!</h3>
          <p className="text-slate-600">Here's your performance breakdown</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-700">75%</div>
              <p className="text-sm text-slate-600">Overall Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">1380</div>
              <p className="text-sm text-slate-600">Estimated Score</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Math</span>
              <span className="text-emerald-600 font-bold">Strong</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Reading & Writing</span>
              <span className="text-amber-600 font-bold">Needs Work</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsStep = () => (
    <div className="min-h-[500px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Set Your Goals</h3>
          <p className="text-slate-600">Tell us your target score and when you're taking the SAT</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target SAT Score</label>
            <div className="grid grid-cols-3 gap-3">
              {[1400, 1500, 1600].map((score) => (
                <button
                  key={score}
                  className={`p-4 text-center rounded-xl border-2 transition-all ${
                    score === 1500 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-lg font-bold text-slate-900">{score}</div>
                  <div className="text-xs text-slate-600">
                    {score === 1400 ? 'Good' : score === 1500 ? 'Excellent' : 'Perfect'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Exam Date</label>
            <div className="grid grid-cols-2 gap-3">
              {['December 2024', 'March 2025'].map((date) => (
                <button
                  key={date}
                  className={`p-4 text-center rounded-xl border-2 transition-all ${
                    date === 'December 2024' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-medium text-slate-900">{date}</div>
                  <div className="text-xs text-slate-600">
                    {date === 'December 2024' ? '8 weeks prep' : '20 weeks prep'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlanStep = () => (
    <div className="min-h-[500px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Study Plan</h3>
          <p className="text-slate-600">Personalized roadmap to reach your 1500 target</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-slate-900 mb-2">8-Week Intensive Plan</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">3x</div>
              <div className="text-slate-600">Practice Tests/Week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">45min</div>
              <div className="text-slate-600">Daily Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">120+</div>
              <div className="text-slate-600">Point Improvement</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg border-l-4 border-blue-500">
            <div className="font-medium text-slate-900">Week 1-2: Foundation Building</div>
            <div className="text-sm text-slate-600">Focus on Reading Comprehension strategies</div>
          </div>
          <div className="p-3 bg-white rounded-lg border-l-4 border-purple-500">
            <div className="font-medium text-slate-900">Week 3-5: Skill Development</div>
            <div className="text-sm text-slate-600">Advanced Math concepts and Writing techniques</div>
          </div>
          <div className="p-3 bg-white rounded-lg border-l-4 border-emerald-500">
            <div className="font-medium text-slate-900">Week 6-8: Test Mastery</div>
            <div className="text-sm text-slate-600">Full practice tests and final preparation</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8">
            <Star className="h-4 w-4 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderDiagnosticStep();
      case 1:
        return renderResultsStep();
      case 2:
        return renderGoalsStep();
      case 3:
        return renderPlanStep();
      default:
        return renderDiagnosticStep();
    }
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

      {/* Progress */}
      <div className="w-full max-w-md mx-auto">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-slate-600 mt-2">
          <span>Assessment</span>
          <span>Personalized Plan</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center items-center space-x-4 mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all ${
                  index < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Title */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-900">{steps[currentStep].title}</h3>
        <p className="text-slate-600">{steps[currentStep].description}</p>
      </div>

      {/* Demo Interface */}
      {renderCurrentStep()}
    </div>
  );
};