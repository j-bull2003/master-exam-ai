import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, AlertCircle, ArrowRight, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="question-card max-w-2xl">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl font-display">Diagnostic Assessment</CardTitle>
            <CardDescription className="text-lg">
              Let's find your baseline to create a personalized study plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">30 Minutes</h3>
                <p className="text-sm text-muted-foreground">Timed assessment</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Mixed Topics</h3>
                <p className="text-sm text-muted-foreground">All exam sections</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Adaptive Plan</h3>
                <p className="text-sm text-muted-foreground">Personalized results</p>
              </div>
            </div>

            <div className="bg-accent/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What to expect:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Questions from all exam sections</li>
                <li>• Mixed difficulty levels</li>
                <li>• No penalties for wrong answers</li>
                <li>• Results used to create your study plan</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button onClick={startDiagnostic} size="lg" className="w-full">
                Start 30-min Diagnostic
              </Button>
              <Button 
                variant="outline" 
                onClick={proceedToDashboard} 
                size="lg" 
                className="w-full"
              >
                Skip to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'test') {
    const question = diagnosticQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / diagnosticQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        {/* Test Header */}
        <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold">Diagnostic Assessment</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {diagnosticQuestions.length}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>
        </div>

        {/* Question Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="question-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{question.section}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {currentQuestion + 1}/{diagnosticQuestions.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground">{question.stem}</p>
                  <p className="font-medium text-foreground">{question.question}</p>
                </div>

                <div className="space-y-3">
                  {question.choices.map((choice, index) => {
                    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                    const isSelected = selectedAnswer === optionLetter;
                    return (
                      <button
                        key={index}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                        }`}
                        onClick={() => handleAnswerSelect(optionLetter)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleAnswerSelect(optionLetter);
                          }
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            isSelected 
                              ? 'border-primary bg-primary text-primary-foreground' 
                              : 'border-border bg-background'
                          }`}>
                            {isSelected ? '✓' : optionLetter}
                          </div>
                          <p className="flex-1 text-sm md:text-base">{choice}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-6">
                  <Button 
                    variant="outline" 
                    disabled={currentQuestion === 0}
                    onClick={handlePreviousQuestion}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                  >
                    {currentQuestion === diagnosticQuestions.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="question-card max-w-2xl">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <CardTitle className="text-3xl font-display">Assessment Complete!</CardTitle>
          <CardDescription className="text-lg">
            Your personalized study plan is ready
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-800">
                {Math.round((2/3) * 100)}%
              </div>
              <p className="text-sm text-green-700 font-medium">Overall Score</p>
            </div>
            <div className="p-4 bg-blue-100 border border-blue-200 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">
                Intermediate
              </div>
              <p className="text-sm text-blue-700 font-medium">Level Assessment</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Your Strengths & Areas for Improvement:</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-100 border border-green-200 rounded-lg">
                <span className="text-sm font-medium text-green-900">Reading and Writing</span>
                <span className="text-sm text-green-800 font-bold">Strong</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-100 border border-orange-200 rounded-lg">
                <span className="text-sm font-medium text-orange-900">Math</span>
                <span className="text-sm text-orange-800 font-bold">Needs Work</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-100 border border-green-200 rounded-lg">
                <span className="text-sm font-medium text-green-900">Problem Solving</span>
                <span className="text-sm text-green-800 font-bold">Strong</span>
              </div>
            </div>
          </div>

          <Button onClick={proceedToDashboard} size="lg" className="w-full">
            View My Study Plan
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Diagnostic;