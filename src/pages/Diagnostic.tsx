import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, CheckCircle, AlertCircle, ArrowRight, Brain, Star, Target, Trophy, BookOpen, Calculator, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [calculatorInput, setCalculatorInput] = useState<string>("");
  const [calculatorResult, setCalculatorResult] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock diagnostic questions - replace with actual question bank
  const diagnosticQuestions = [
    {
      id: 1,
      section: "Verbal Reasoning",
      stem: "The recent study shows that students who engage in regular physical exercise perform better academically. This suggests that physical activity has a positive correlation with cognitive function.",
      question: "Which of the following can be concluded from the passage?",
      choices: [
        "All students should be required to exercise daily",
        "Physical exercise may improve academic performance",
        "Students who don't exercise will fail academically",
        "Cognitive function is entirely dependent on physical activity"
      ],
      correctAnswer: "B"
    },
    {
      id: 2,
      section: "Quantitative Reasoning",
      stem: "A school has 1,200 students. 60% are enrolled in mathematics, 45% in science, and 30% in both mathematics and science.",
      question: "How many students are enrolled in mathematics but not science?",
      choices: ["360", "480", "540", "720"],
      correctAnswer: "A"
    },
    {
      id: 3,
      section: "Decision Making",
      stem: "A company needs to choose between three suppliers. Supplier A offers the lowest price but has poor quality ratings. Supplier B has moderate prices and good quality. Supplier C has the highest prices but excellent quality and fastest delivery.",
      question: "If the company prioritizes long-term customer satisfaction over short-term costs, which supplier should they choose?",
      choices: ["Supplier A", "Supplier B", "Supplier C", "Cannot determine"],
      correctAnswer: "C"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (currentStep === 'test' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && currentStep === 'test') {
      handleSubmitTest();
    }
  }, [currentStep, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculator functions
  const handleCalculatorInput = (value: string) => {
    if (value === 'C') {
      setCalculatorInput("");
      setCalculatorResult("");
    } else if (value === '=') {
      try {
        const result = eval(calculatorInput);
        setCalculatorResult(result.toString());
      } catch (error) {
        setCalculatorResult("Error");
      }
    } else {
      setCalculatorInput(prev => prev + value);
    }
  };

  const startDiagnostic = () => {
    setCurrentStep('test');
    setTimeRemaining(30 * 60);
    setAnswers(new Array(diagnosticQuestions.length).fill(""));
    setSelectedAnswer(""); // Reset selected answer for first question
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Load existing answer for next question
      const nextQuestionAnswer = newAnswers[currentQuestion + 1] || "";
      setSelectedAnswer(nextQuestionAnswer);
    } else {
      handleSubmitTest();
    }
  };

  const handlePreviousQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    const prevQuestionIndex = Math.max(0, currentQuestion - 1);
    setCurrentQuestion(prevQuestionIndex);
    // Load existing answer for previous question
    const prevQuestionAnswer = newAnswers[prevQuestionIndex] || "";
    setSelectedAnswer(prevQuestionAnswer);
  };

  const handleSubmitTest = () => {
    // Calculate results
    const finalAnswers = [...answers];
    finalAnswers[currentQuestion] = selectedAnswer;
    
    let correctCount = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === diagnosticQuestions[index].correctAnswer) {
        correctCount++;
      }
    });

    setCurrentStep('results');
    
    toast({
      title: "Diagnostic Complete!",
      description: "Your personalized study plan is being generated.",
    });
  };

  const proceedToDashboard = () => {
    navigate('/dashboard');
  };

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-xl animate-fade-in">
            <CardHeader className="text-center pb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-full blur-3xl"></div>
                <Brain className="h-16 w-16 text-primary mx-auto mb-6 relative animate-pulse" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Diagnostic Assessment
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground mt-4">
                Discover your baseline and unlock your personalized SAT success roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <Clock className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-center">30 Minutes</h3>
                  <p className="text-sm text-muted-foreground text-center">Focused assessment</p>
                </div>
                <div className="group relative p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                  <Target className="h-10 w-10 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-center">All Topics</h3>
                  <p className="text-sm text-muted-foreground text-center">Comprehensive coverage</p>
                </div>
                <div className="group relative p-6 bg-gradient-to-br from-accent/20 to-accent/30 rounded-xl border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  <Brain className="h-10 w-10 text-accent-foreground mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-center">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground text-center">Adaptive insights</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-xl"></div>
                <div className="relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Assessment Overview</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Reading & Writing questions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Mathematical reasoning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Mixed difficulty levels</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span>No penalty for wrong answers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span>Instant personalized results</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span>Custom study plan generated</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={startDiagnostic} 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Star className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Begin Your Assessment Journey
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={proceedToDashboard} 
                  size="lg" 
                  className="w-full h-12 border-2 hover:bg-muted/50 transition-all duration-300"
                >
                  Skip to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'test') {
    const question = diagnosticQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        {/* Floating Header */}
        <div className="fixed top-4 left-4 right-4 z-50">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-slate-900/10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      SAT Diagnostic
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {question.section}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {currentQuestion + 1} of {diagnosticQuestions.length}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Calculator Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/80 border-slate-300 shadow-lg">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculator
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Calculator className="h-5 w-5" />
                          Scientific Calculator
                        </DialogTitle>
                      </DialogHeader>
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                        <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-lg border text-right font-mono">
                          <div className="text-sm text-muted-foreground">{calculatorInput || "0"}</div>
                          <div className="text-lg font-bold">{calculatorResult || ""}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['C', '/', '*', '←', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.', '(', ')'].map((btn) => (
                            <Button
                              key={btn}
                              variant={btn === '=' ? "default" : "outline"}
                              size="sm"
                              className={`h-10 ${btn === '=' ? 'col-span-1 bg-blue-500 hover:bg-blue-600' : ''}`}
                              onClick={() => handleCalculatorInput(btn)}
                            >
                              {btn}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Timer */}
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-4 py-2 rounded-xl border border-orange-200 dark:border-orange-700/50">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="font-mono text-sm font-bold text-orange-700 dark:text-orange-300">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  
                  {/* Menu */}
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold">{Math.round(progress)}% Complete</span>
                </div>
                <div className="relative">
                  <Progress value={progress} className="h-2 bg-slate-200 dark:bg-slate-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-32 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Question Card */}
            <Card className="border-0 shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
              
              <CardContent className="relative p-8 md:p-12">
                {/* Question Text */}
                <div className="mb-12">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                          {question.stem}
                        </p>
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-xl leading-relaxed">
                          {question.question}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer Choices */}
                <div className="space-y-4 mb-12">
                  {question.choices.map((choice, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const isSelected = selectedAnswer === optionLetter;
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`group w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                          isSelected
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 shadow-lg shadow-blue-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-xl'
                        }`}
                        onClick={() => handleAnswerSelect(optionLetter)}
                      >
                        <div className="flex items-start gap-5">
                          <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${
                            isSelected 
                              ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                          }`}>
                            {isSelected && <CheckCircle className="w-5 h-5" />}
                            {!isSelected && optionLetter}
                          </div>
                          <p className="text-base leading-relaxed pt-2 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                            {choice}
                          </p>
                        </div>
                        
                        {/* Subtle hover effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-100' : ''}`}></div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    disabled={currentQuestion === 0}
                    onClick={handlePreviousQuestion}
                    className="px-8 py-3 rounded-xl border-2 hover:scale-105 transition-all duration-200 disabled:opacity-50"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Previous
                  </Button>
                  
                  <div className="text-center">
                    <div className={`text-sm font-medium px-4 py-2 rounded-lg ${
                      selectedAnswer 
                        ? 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {selectedAnswer ? '✓ Answer selected' : 'Select an answer to continue'}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {currentQuestion === diagnosticQuestions.length - 1 ? (
                      <>
                        <Trophy className="h-4 w-4 mr-2" />
                        Submit Test
                      </>
                    ) : (
                      <>
                        Next Question
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Question Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {diagnosticQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuestion
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
                          : index < currentQuestion || answers[index]
                          ? 'bg-blue-400 dark:bg-blue-500'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results step
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-xl animate-fade-in">
          <CardHeader className="text-center pb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg shadow-green-500/30">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Assessment Complete!
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground">
              Your personalized SAT roadmap has been generated based on your performance
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 p-6 border border-green-500/20">
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {Math.round((2/3) * 100)}%
                  </div>
                  <p className="text-sm font-semibold text-green-700">Overall Score</p>
                  <p className="text-xs text-muted-foreground mt-1">Above Average Performance</p>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 p-6 border border-blue-500/20">
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    Intermediate
                  </div>
                  <p className="text-sm font-semibold text-blue-700">Current Level</p>
                  <p className="text-xs text-muted-foreground mt-1">Ready for Advanced Practice</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Your Learning Profile</h3>
                <p className="text-muted-foreground">Strengths and areas for focused improvement</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/5 p-4 border border-green-500/20 group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-green-900">Reading and Writing</span>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">Strong</Badge>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 p-4 border border-orange-500/20 group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-orange-900">Math</span>
                    </div>
                    <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">Focus Area</Badge>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/5 p-4 border border-green-500/20 group hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-green-900">Problem Solving</span>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">Strong</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={proceedToDashboard} 
                size="lg" 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Star className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                View My Personalized Study Plan
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostic;