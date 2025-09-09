import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle, Target, Zap, Clock, ArrowRight, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const demoQuestion: Question = {
  id: 1,
  text: "If 3x + 5 = 17, what is the value of x?",
  options: ["2", "4", "6", "8"],
  correct: 1,
  explanation: "Solve for x: 3x + 5 = 17 → 3x = 12 → x = 4",
  topic: "Algebra",
  difficulty: "Easy"
};

const aiInsights = [
  { icon: Target, title: "Weakness Detected", description: "You struggle with algebraic manipulation", color: "text-orange-500" },
  { icon: Brain, title: "AI Recommendation", description: "Practice isolating variables in equations", color: "text-blue-500" },
  { icon: Zap, title: "Quick Tip", description: "Always perform the same operation on both sides", color: "text-green-500" },
];

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const steps = [
    "question",
    "analysis", 
    "explanation",
    "insights"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 2 : 100);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAiAnalyzing(true);
    
    setTimeout(() => {
      setAiAnalyzing(false);
      setShowExplanation(true);
      setTimeout(() => setCurrentStep(1), 1000);
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAiAnalyzing(false);
    setProgress(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">See Our </span>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI in Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how our AI analyzes your performance and provides personalized insights in real-time
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Interactive Question Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Practice Question</h3>
                      <p className="text-sm text-muted-foreground">{demoQuestion.topic} • {demoQuestion.difficulty}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Demo Mode
                  </Badge>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    {demoQuestion.text}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {demoQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                        selectedAnswer === index
                          ? index === demoQuestion.correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          selectedAnswer === index
                            ? index === demoQuestion.correct
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-red-500 bg-red-500 text-white'
                            : 'border-border text-muted-foreground'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-foreground">{option}</span>
                        {selectedAnswer === index && index === demoQuestion.correct && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {aiAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-primary/10 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-primary font-medium">AI analyzing your response...</span>
                    </div>
                    <Progress value={progress} className="mt-3" />
                  </motion.div>
                )}

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
                    >
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Explanation:
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200">
                        {demoQuestion.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* AI Analysis Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-6 border border-border/50 bg-background/95 backdrop-blur-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Real-time AI Analysis
                </h3>
                
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="waiting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Select an answer to see AI analysis</p>
                    </motion.div>
                  )}

                  {currentStep >= 1 && (
                    <motion.div
                      key="insights"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {aiInsights.map((insight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center ${insight.color}`}>
                            <insight.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{insight.title}</h4>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>

              {/* Performance Metrics */}
              {currentStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="p-6 border border-border/50 bg-background/95 backdrop-blur-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Performance Insights
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <div className="text-sm text-green-600">Accuracy</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-2xl font-bold text-blue-600">1.2s</div>
                        <div className="text-sm text-blue-600">Avg Time</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedAnswer !== null && (
                  <Button onClick={resetDemo} variant="outline" className="flex-1">
                    Try Again
                  </Button>
                )}
                <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-transform">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};