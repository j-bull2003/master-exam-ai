import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, BookOpen, TrendingUp, Play, CheckCircle, Brain, Calculator, Trophy, Star, Zap, Home, BarChart3, Clipboard, User, LogOut } from "lucide-react";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

export const RealPlatformDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Real SAT questions from your uploads
  const diagnosticQuestions = [
    {
      id: 1,
      section: "Reading & Writing",
      domain: "Information and Ideas",
      subdomain: "Central Ideas and Details",
      difficulty: "Hard",
      passage: "One recognized social norm of gift giving is that the time spent obtaining a gift will be viewed as a reflection of the gift's thoughtfulness. Marketing experts Farnoush Reshadi, Julian Givi, and Gopal Das addressed this view in their studies of norms specifically surrounding the giving of gift cards, noting that while recipients tend to view digital gift cards (which can be purchased online from anywhere and often can be redeemed online as well) as superior to physical gift cards (which sometimes must be purchased in person and may only be redeemable in person) in terms of usage, 94.8 percent of participants surveyed indicated that it is more socially acceptable to give a physical gift card to a recipient. This finding suggests that ______",
      question: "Which choice most logically completes the text?",
      choices: [
        "gift givers likely overestimate the amount of effort required to use digital gift cards and thus mistakenly assume gift recipients will view them as less desirable than physical gift cards.",
        "physical gift cards are likely preferred by gift recipients because the tangible nature of those cards offers a greater psychological sense of ownership than digital gift cards do.",
        "physical gift cards are likely less desirable to gift recipients than digital gift cards are because of the perception that physical gift cards require unnecessary effort to obtain.",
        "gift givers likely perceive digital gift cards as requiring relatively low effort to obtain and thus wrongly assume gift recipients will appreciate them less than they do physical gift cards."
      ],
      correctAnswer: "D",
      explanation: "The text establishes that gift-giving norms connect thoughtfulness with effort, and while digital cards are easier to use, 94.8% find physical cards more socially acceptable to give, suggesting gift givers perceive digital cards as low-effort."
    },
    {
      id: 2,
      section: "Math",
      domain: "Algebra", 
      subdomain: "Systems of Linear Equations",
      difficulty: "Medium",
      passage: "Given the system of equations: y = x + 1 and y = x² + x",
      question: "What value of x satisfies both equations?",
      choices: ["-1", "0", "2", "3"],
      correctAnswer: "A",
      explanation: "Setting the equations equal: x + 1 = x² + x. Subtracting x from both sides: 1 = x². So x = ±1. Of the given choices, only -1 is available."
    }
  ];

  const steps = [
    {
      title: "Dashboard Overview",
      description: "Your personalized learning hub"
    },
    {
      title: "Diagnostic Assessment",
      description: "Interactive demo with sample questions"
    },
    {
      title: "Performance Analysis", 
      description: "Detailed breakdown by SAT domains"
    },
    {
      title: "Personalized Study Plan",
      description: "AI-generated roadmap based on your results"
    }
  ];

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < diagnosticQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Move to next step after last question
      setCurrentStep(prev => prev + 1);
      setProgress(prev => prev + 25);
    }
  };

  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        if (currentStep === 1) {
          // Skip automatic progression for diagnostic step - user interaction required
          return;
        }
        setCurrentStep(prev => prev + 1);
        setProgress(prev => prev + 25);
      }, currentStep === 0 ? 2000 : 3000);
      return () => clearTimeout(timer);
    } else if (isAnimating && currentStep === steps.length - 1) {
      setIsAnimating(false);
    }
  }, [currentStep, isAnimating, steps.length]);

  const startDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAnimating(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const renderDashboardStep = () => (
    <div className="min-h-[450px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      {/* Header like actual platform */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between">
          <img
            src={uniHackLogo}
            alt="UniHack.ai Logo"
            className="h-16 max-h-[64px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen"
          />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <div className="text-primary font-medium border-b-2 border-primary flex items-center gap-1 text-sm">
              <Target className="w-3 h-3" />Dashboard
            </div>
            <div className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm">
              <BookOpen className="w-3 h-3" />Practice
            </div>
            <div className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm">
              <Clipboard className="w-3 h-3" />Mocks
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 flex items-center gap-1 text-xs">
              <LogOut className="w-3 h-3" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-3">
        {/* Page Header */}
        <div className="mb-3 text-center">
          <h1 className="text-xl font-bold mb-1">Welcome back, Demo User! 👋</h1>
          <p className="text-muted-foreground text-xs">Ready to continue your SAT preparation?</p>
        </div>

        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20">
            <CardContent className="p-2 text-center">
              <Target className="h-3 w-3 text-emerald-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-emerald-700">0%</div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-2 text-center">
              <TrendingUp className="h-3 w-3 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-700">0%</div>
              <p className="text-xs text-muted-foreground">Progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-2 text-center">
              <Zap className="h-3 w-3 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-700">0</div>
              <p className="text-xs text-muted-foreground">Streak</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-orange-500/20">
            <CardContent className="p-2 text-center">
              <BookOpen className="h-3 w-3 text-orange-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-orange-700">0</div>
              <p className="text-xs text-muted-foreground">Questions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-600/10 border-yellow-500/20">
            <CardContent className="p-2 text-center">
              <Calendar className="h-3 w-3 text-yellow-600 mx-auto mb-1" />
              <Button size="sm" variant="outline" className="w-full text-xs h-7 px-2">
                Set Date
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Study Plan Section - Compact */}
        <div className="grid xl:grid-cols-3 gap-3">
          <div className="xl:col-span-2">
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-slate-700 text-base">
                  <Calendar className="w-4 h-4" />
                  Study Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-3">
                  <Calendar className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-sm font-semibold mb-1">Build Your Study Plan</h3>
                  <p className="text-muted-foreground mb-2 text-xs">
                    Complete diagnostic test for personalized plan
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                    <Brain className="w-3 h-3 mr-1" />
                    Take Diagnostic
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            {/* Target Universities */}
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardHeader className="pb-1">
                <CardTitle className="text-emerald-700 text-xs">Target Universities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="p-1 bg-white rounded border border-emerald-200 text-center font-medium text-xs">Harvard</div>
                <div className="p-1 bg-white rounded border border-emerald-200 text-center font-medium text-xs">MIT</div>
                <div className="p-1 bg-white rounded border border-emerald-200 text-center font-medium text-xs">Stanford</div>
              </CardContent>
            </Card>

            {/* Study Focus */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="pb-1">
                <CardTitle className="text-red-700 flex items-center gap-1 text-xs">
                  🎯 Study Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span>Math - Algebra</span>
                  <span className="text-red-600 font-bold">35%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Information & Ideas</span>
                  <span className="text-blue-600 font-bold">26%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiagnosticStep = () => {
    const currentQuestion = diagnosticQuestions[currentQuestionIndex];
    
    return (
      <div className="min-h-[450px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 rounded-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="h-3 w-3 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold">SAT Diagnostic Assessment</h3>
                <div className="flex gap-2 items-center">
                  <Badge variant="secondary" className="text-xs">{currentQuestion.section}</Badge>
                  <Badge variant="outline" className="text-xs">{currentQuestion.difficulty}</Badge>
                  <span className="text-xs text-muted-foreground">• Demo - Real test is 30 min</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 px-2 py-1 rounded-lg">
              <Clock className="h-3 w-3 text-orange-600" />
              <span className="font-mono text-xs font-bold text-orange-700">28:45</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100} className="h-1" />
          </div>
        </div>

        {/* Question content */}
        <div className="p-4">
          {/* Domain/Subdomain Info */}
          <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-blue-900">
              Testing: {currentQuestion.domain} → {currentQuestion.subdomain}
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {currentQuestionIndex + 1}
                </div>
                <div className="flex-1">
                  {currentQuestion.passage && (
                    <div className="text-slate-700 mb-3 leading-relaxed border-l-2 border-blue-200 pl-3 bg-slate-50 p-2 rounded-r text-sm">
                      {currentQuestion.passage}
                    </div>
                  )}
                  <p className="font-bold text-slate-900 text-base">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                {currentQuestion.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(String.fromCharCode(65 + index))}
                    disabled={showExplanation}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all text-sm ${
                      selectedAnswer === String.fromCharCode(65 + index)
                        ? selectedAnswer === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : !selectedAnswer
                          ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                          : String.fromCharCode(65 + index) === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 bg-white'
                    }`}
                  >
                    <span className="font-medium text-slate-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                    {choice}
                    {selectedAnswer === String.fromCharCode(65 + index) && selectedAnswer === currentQuestion.correctAnswer && (
                      <CheckCircle className="inline-block w-4 h-4 text-green-600 ml-2" />
                    )}
                    {selectedAnswer === String.fromCharCode(65 + index) && selectedAnswer !== currentQuestion.correctAnswer && (
                      <span className="inline-block w-4 h-4 text-red-600 ml-2">✗</span>
                    )}
                    {showExplanation && String.fromCharCode(65 + index) === currentQuestion.correctAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                      <CheckCircle className="inline-block w-4 h-4 text-green-600 ml-2" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Show explanation after answer selection */}
              {showExplanation && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900 mb-1 text-sm">
                        Correct Answer: {currentQuestion.correctAnswer}
                        {selectedAnswer === currentQuestion.correctAnswer ? " - Great job!" : " - Study this concept more"}
                      </div>
                      <div className="text-xs text-green-800">{currentQuestion.explanation}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Next button */}
              <div className="mt-4 flex justify-end">
                <Button 
                  onClick={handleNextQuestion}
                  className={`px-4 ${showExplanation ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'} text-white text-sm`}
                  disabled={!showExplanation}
                >
                  {currentQuestionIndex < diagnosticQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Demo Notice */}
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs text-amber-800">
              <strong>Demo Preview:</strong> The actual diagnostic test contains 30+ questions across all SAT domains and takes 30 minutes.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResultsStep = () => (
    <div className="min-h-[450px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      <div className="p-4">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Diagnostic Complete!</h3>
          <p className="text-slate-600 text-sm">Comprehensive analysis across all SAT domains</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20">
            <CardContent className="p-3 text-center">
              <Target className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-emerald-700">78%</div>
              <p className="text-xs text-slate-600">Overall Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-3 text-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-xl font-bold text-blue-700">1420</div>
              <p className="text-xs text-slate-600">Projected Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Domain Analysis - Compact */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 mb-2 text-sm">Performance by SAT Domain</h4>
          
          {/* Reading & Writing Domains */}
          <div className="space-y-2">
            <div className="p-2 bg-slate-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="font-medium text-sm">Information and Ideas</span>
                  <span className="text-xs text-slate-500 ml-1">(26% of R&W)</span>
                </div>
                <span className="text-green-600 font-bold text-sm">Strong</span>
              </div>
              <Progress value={85} className="h-1.5 mb-1" />
              <div className="text-xs text-slate-600">
                Mastered: Central Ideas • Command of Evidence
              </div>
            </div>
            
            <div className="p-2 bg-slate-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <span className="font-medium text-sm">Algebra</span>
                  <span className="text-xs text-slate-500 ml-1">(35% of Math)</span>
                </div>
                <span className="text-red-600 font-bold text-sm">Needs Work</span>
              </div>
              <Progress value={65} className="h-1.5 mb-1" />
              <div className="text-xs text-slate-600">
                Review: Systems of Equations • Linear Inequalities
              </div>
            </div>
          </div>
        </div>

        {/* Insight Box */}
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-xs text-blue-800">
            <strong>Key Insight:</strong> Focus your study time on Algebra fundamentals to maximize score improvement.
          </div>
        </div>
        
        {/* Demo Notice */}
        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-xs text-amber-800">
            <strong>Demo Results:</strong> Real 30-minute diagnostic provides comprehensive assessment across all SAT domains.
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlanStep = () => (
    <div className="min-h-[600px] bg-background bg-mesh rounded-2xl relative overflow-hidden">
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Personalized Study Plan</h3>
          <p className="text-slate-600">AI-generated roadmap targeting your specific weak areas</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-slate-900 mb-2">10-Week Strategic Plan (Target: 1550+)</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">4x</div>
              <div className="text-slate-600">Practice Tests/Week</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">60min</div>
              <div className="text-slate-600">Daily Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">130+</div>
              <div className="text-slate-600">Point Improvement</div>
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-3">
          <h5 className="font-medium text-slate-900">Priority Focus Areas (Based on Your Results)</h5>
          
          <div className="p-3 bg-white rounded-lg border-l-4 border-red-500">
            <div className="font-medium text-slate-900">Week 1-3: Algebra Mastery</div>
            <div className="text-sm text-slate-600 mb-2">Address your weakest domain (35% of Math section)</div>
            <div className="text-xs text-red-700 bg-red-50 p-2 rounded">
              • Systems of Linear Equations practice (2x/week)
              • Linear Inequalities in 1 or 2 variables 
              • Focus on word problems and application
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border-l-4 border-amber-500">
            <div className="font-medium text-slate-900">Week 4-6: Text Structure & Analysis</div>
            <div className="text-sm text-slate-600 mb-2">Strengthen Craft and Structure (28% of R&W)</div>
            <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded">
              • Text Structure and Purpose questions daily
              • Cross-Text Connections practice
              • Words in Context vocabulary building
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border-l-4 border-blue-500">
            <div className="font-medium text-slate-900">Week 7-8: Integration & Speed</div>
            <div className="text-sm text-slate-600 mb-2">Combine skills and improve timing</div>
            <div className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
              • Mixed domain practice tests
              • Time management strategies
              • Error pattern analysis
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-lg border-l-4 border-emerald-500">
            <div className="font-medium text-slate-900">Week 9-10: Final Preparation</div>
            <div className="text-sm text-slate-600 mb-2">Peak performance and test strategy</div>
            <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded">
              • Full-length practice tests (4x)
              • Review strongest areas (maintain confidence)
              • Test day strategy and mental preparation
            </div>
          </div>
        </div>

        {/* Study Schedule Preview */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
          <h5 className="font-medium text-slate-900 mb-3">Sample Week Schedule</h5>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="font-medium text-slate-700">Monday & Wednesday</div>
              <div className="text-slate-600">• Algebra practice (30 min)</div>
              <div className="text-slate-600">• Reading passages (30 min)</div>
            </div>
            <div>
              <div className="font-medium text-slate-700">Tuesday & Thursday</div>
              <div className="text-slate-600">• Full practice test section</div>
              <div className="text-slate-600">• Review with explanations</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8">
            <Star className="h-4 w-4 mr-2" />
            Begin Your Personalized Journey
          </Button>
          <div className="text-xs text-slate-500 mt-2">
            Study plan adapts based on your progress and performance
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderDashboardStep();
      case 1:
        return renderDiagnosticStep();
      case 2:
        return renderResultsStep();
      case 3:
        return renderPlanStep();
      default:
        return renderDashboardStep();
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
          <span>Dashboard</span>
          <span>Study Plan Ready</span>
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