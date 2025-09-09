import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Target, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Award,
  Calculator,
  PieChart,
  Activity,
  Play,
  Pause,
  BarChart3,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Import real dashboard screenshot
import realDashboard from "/lovable-uploads/dc3a612f-cad4-481e-be21-d059bcdeb96e.png";

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
  { icon: Target, title: "Pattern Analysis", description: "Based on 847 similar problems, you show 73% accuracy in algebraic manipulation", color: "text-orange-500" },
  { icon: Brain, title: "Learning Trajectory", description: "Your improvement rate suggests +150 points potential in 8 weeks", color: "text-blue-500" },
  { icon: Zap, title: "Adaptive Recommendation", description: "Focus on equation solving - it appears in 23% of SAT math questions", color: "text-green-500" },
];

const mathematicalElements = [
  { symbol: "∑", delay: 0, x: 15, y: 20 },
  { symbol: "∫", delay: 0.8, x: 75, y: 15 },
  { symbol: "∆", delay: 1.6, x: 25, y: 70 },
  { symbol: "π", delay: 2.4, x: 85, y: 75 },
  { symbol: "√", delay: 3.2, x: 50, y: 40 },
  { symbol: "∞", delay: 4.0, x: 10, y: 50 },
  { symbol: "θ", delay: 4.8, x: 90, y: 35 },
  { symbol: "λ", delay: 5.6, x: 60, y: 85 }
];

// Sketched sphere animation component
const SketchedSphere = ({ delay = 0, x, y, size = 1 }: { delay?: number; x: number; y: number; size?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0.6, 0.3, 0.1],
      scale: [0, size * 0.8, size * 1.2, size * 0.9, size * 1],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 8,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg width={60 * size} height={60 * size} viewBox="0 0 60 60" className="text-primary/30">
      <circle
        cx="30"
        cy="30"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4,2"
        className="animate-pulse"
      />
      <circle
        cx="30"
        cy="30"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3,3"
        className="opacity-60"
      />
      <circle
        cx="30"
        cy="30"
        r="8"
        fill="currentColor"
        className="opacity-40"
      />
    </svg>
  </motion.div>
);

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

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
      setTimeout(() => {
        setCurrentStep(1);
        setShowDashboard(true);
      }, 1000);
    }, 2000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAiAnalyzing(false);
    setProgress(0);
    setShowDashboard(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Enhanced Mathematical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-l from-blue-500/15 to-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-t from-orange-500/10 to-pink-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Sketched Spheres */}
        <SketchedSphere delay={0} x={20} y={15} size={0.8} />
        <SketchedSphere delay={1.2} x={80} y={25} size={1.2} />
        <SketchedSphere delay={2.4} x={15} y={70} size={0.9} />
        <SketchedSphere delay={3.6} x={85} y={80} size={1.1} />
        <SketchedSphere delay={4.8} x={60} y={60} size={0.7} />
        
        {/* Floating Mathematical Symbols with enhanced animation */}
        {mathematicalElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/25 font-bold select-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${3 + (index % 3)}rem`,
              fontFamily: 'serif'
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-10, 10, -10],
              rotate: [0, 360],
              opacity: [0.1, 0.4, 0.2, 0.6, 0.1],
              scale: [0.8, 1.2, 0.9, 1.1, 1]
            }}
            transition={{
              duration: 12 + (index * 2),
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {element.symbol}
          </motion.div>
        ))}
        
        {/* Particle Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${i * 200},0 Q${(i + 1) * 150},${200 + i * 100} ${(i + 2) * 200},400`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              className="text-primary"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-foreground">Experience Our </span>
            <motion.span 
              className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              AI in Action
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            See how our AI analyzes patterns from thousands of students to provide 
            <span className="text-primary font-semibold"> personalized insights</span> in real-time
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Interactive Question Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-primary/30 hover:bg-background/90 hover:scale-[1.02] relative overflow-hidden">
                {/* Card background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-primary/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Brain className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground">Practice Question</h3>
                        <p className="text-sm text-muted-foreground">{demoQuestion.topic} • {demoQuestion.difficulty}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Live Demo
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
                      className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-4 mb-4 border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-primary font-medium">AI analyzing response patterns from 847 similar problems...</span>
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
                </div>
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
                      <p className="text-muted-foreground">Select an answer to see AI pattern analysis</p>
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

              {/* Real Dashboard Preview */}
              {showDashboard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="p-6 border border-border/50 bg-background/95 backdrop-blur-sm">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Your Actual Dashboard
                    </h3>
                    <div className="relative overflow-hidden rounded-lg border border-border/50">
                      <img
                        src={realDashboard}
                        alt="Your actual dashboard"
                        className="w-full h-48 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-sm font-medium">Live data from your platform</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

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
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-blue-600">73%</div>
                        <div className="text-sm text-blue-600">Similar Problems</div>
                      </motion.div>
                      <motion.div 
                        className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-green-600">+150</div>
                        <div className="text-sm text-green-600">Point Potential</div>
                      </motion.div>
                      <motion.div 
                        className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl font-bold text-purple-600">8wk</div>
                        <div className="text-sm text-purple-600">Timeline</div>
                      </motion.div>
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