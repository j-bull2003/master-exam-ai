import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Target } from "lucide-react";
import { fetchQuestions, shuffle, type SATQuestion } from "@/lib/supabase-questions";

const PracticePlay = () => {
  const [searchParams] = useSearchParams();
  const domain = searchParams.get('domain');
  const subdomain = searchParams.get('subdomain');
  const n = parseInt(searchParams.get('n') || '10');

  const [questions, setQuestions] = useState<SATQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!domain) {
        setError("Domain parameter is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestions(domain, subdomain || undefined);
        
        if (fetchedQuestions.length === 0) {
          setError("No questions found for this selection.");
          setLoading(false);
          return;
        }

        const shuffledQuestions = shuffle(fetchedQuestions).slice(0, n);
        setQuestions(shuffledQuestions);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [domain, subdomain, n]);

  useEffect(() => {
    // MathJax rendering after question changes
    if (typeof window !== 'undefined' && (window as any).MathJax && questions[currentIndex]) {
      (window as any).MathJax.typesetPromise?.();
    }
  }, [currentIndex, questions, selectedAnswer]);

  const currentQuestion = questions[currentIndex];
  const isAnswered = currentIndex in answers;
  const isCorrect = isAnswered && answers[currentIndex] === currentQuestion?.correct_choice;

  const handleAnswerSelect = (choice: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(choice);
    setAnswers(prev => ({ ...prev, [currentIndex]: choice }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(answers[currentIndex + 1] || null);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(answers[currentIndex - 1] || null);
    }
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((_, index) => 
      answers[index] === questions[index].correct_choice
    ).length;
    return { correct: correctAnswers, total: questions.length };
  };

  const getMissedQuestions = () => {
    return questions
      .map((question, index) => ({ question, index }))
      .filter(({ question, index }) => 
        index in answers && answers[index] !== question.correct_choice
      );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Questions</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/practice">
              <Button>Back to Practice</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSummary) {
    const score = calculateScore();
    const missedQuestions = getMissedQuestions();

    return (
      <div className="min-h-screen bg-background bg-mesh p-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Practice Complete!</CardTitle>
              <div className="text-6xl font-bold text-primary mb-4">
                {Math.round((score.correct / score.total) * 100)}%
              </div>
              <p className="text-lg text-muted-foreground">
                You got {score.correct} out of {score.total} questions correct
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {missedQuestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review Missed Questions</h3>
                  <div className="space-y-3">
                    {missedQuestions.map(({ question, index }) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">Question {index + 1}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setCurrentIndex(index);
                              setSelectedAnswer(answers[index]);
                              setShowSummary(false);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                        <div 
                          className="text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: question.stem_html.slice(0, 100) + '...' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center">
                <Link to="/practice">
                  <Button size="lg">
                    <Target className="h-4 w-4 mr-2" />
                    Back to Practice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const choices = [
    { letter: 'A', text: currentQuestion.choice_a },
    { letter: 'B', text: currentQuestion.choice_b },
    { letter: 'C', text: currentQuestion.choice_c },
    { letter: 'D', text: currentQuestion.choice_d },
  ];

  return (
    <div className="min-h-screen bg-background bg-mesh p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/practice">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Practice
            </Button>
          </Link>
          <Badge variant="secondary" className="text-sm">
            Question {currentIndex + 1} of {questions.length}
          </Badge>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">{domain}</h2>
                {subdomain && <p className="text-sm text-muted-foreground">{subdomain}</p>}
              </div>
              <Badge variant="outline">{currentQuestion.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: currentQuestion.stem_html }}
            />

            {/* Answer Choices */}
            <div className="space-y-3 mb-6">
              {choices.map((choice) => {
                const isSelected = selectedAnswer === choice.letter;
                const isCorrectChoice = choice.letter === currentQuestion.correct_choice;
                const showCorrectness = isAnswered;
                
                let buttonClass = "w-full text-left p-4 border rounded-lg transition-all duration-200 ";
                
                if (showCorrectness) {
                  if (isCorrectChoice) {
                    buttonClass += "bg-green-500/10 border-green-500/50 text-green-700";
                  } else if (isSelected && !isCorrectChoice) {
                    buttonClass += "bg-red-500/10 border-red-500/50 text-red-700";
                  } else {
                    buttonClass += "bg-muted/50 text-muted-foreground";
                  }
                } else {
                  if (isSelected) {
                    buttonClass += "bg-primary/10 border-primary/50 text-primary";
                  } else {
                    buttonClass += "hover:bg-muted/50 border-border";
                  }
                }

                return (
                  <button
                    key={choice.letter}
                    onClick={() => handleAnswerSelect(choice.letter)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                        showCorrectness && isCorrectChoice 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : showCorrectness && isSelected && !isCorrectChoice
                          ? 'bg-red-500 border-red-500 text-white'
                          : isSelected 
                          ? 'bg-primary border-primary text-white' 
                          : 'border-muted-foreground'
                      }`}>
                        {showCorrectness && isCorrectChoice ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : showCorrectness && isSelected && !isCorrectChoice ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          choice.letter
                        )}
                      </div>
                      <div 
                        className="flex-1"
                        dangerouslySetInnerHTML={{ __html: choice.text }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {isAnswered && currentQuestion.explanation_html && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Explanation:</h4>
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.explanation_html }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticePlay;