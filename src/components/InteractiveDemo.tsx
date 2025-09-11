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
  CheckCircle,
  HelpCircle,
  Timer,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { renderMath } from "@/lib/mathRenderer";

// Import real dashboard screenshot
import realDashboard from "/lovable-uploads/dc3a612f-cad4-481e-be21-d059bcdeb96e.png";

interface Question {
  id: number;
  text: string;
  latex?: string;
  options: string[];
  correct: number;
  explanation: string;
  hint?: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const demoQuestion: Question = {
  id: 1,
  text: "Chemical engineers often need precise data on element solubility in various solvents for industrial applications. In a comprehensive study, Dr. Nadia Patel and her team measured the solubility percentages of several alkali metals in common solvents at precisely 2° Fahrenheit. Their findings showed that solubility patterns vary significantly across different elements and solvents, with water generally providing better dissolution than other solvents. One unexpected finding was that some elements showed markedly different solubility profiles depending on the solvent type. For example, whereas chlorine dissolves in salt water at a rate of 73%, the solubility rate for ______ \n\nWhich choice most effectively uses data from the table to complete the example?",
  options: [
    "sodium in water is 93%.",
    "potassium in oil is 87%.", 
    "lithium in salt water is 58%.",
    "chlorine in alcohol is 82%."
  ],
  correct: 2,
  explanation: "The passage mentions chlorine's 73% solubility in salt water as an example, then asks for a contrasting example that shows 'markedly different solubility profiles.' Lithium in salt water (58%) provides the strongest contrast to chlorine in salt water (73%) - both are the same solvent but different dissolution rates, demonstrating the point about elements having different profiles.",
  hint: "Look for an option that creates a meaningful contrast with the chlorine/salt water example already given in the passage.",
  topic: "Command of Evidence: Quantitative",
  difficulty: "Medium"
};

const aiInsights = [
  { icon: Target, title: "Reading Strategy Analysis", description: "You used systematic table scanning (optimal approach). Students using this method score 34% higher on quantitative evidence questions", color: "text-green-500" },
  { icon: Brain, title: "Cognitive Pattern Recognition", description: "You identified the contrast pattern in 8 seconds. This cognitive speed correlates with 150+ point improvements in Reading & Writing", color: "text-blue-500" },
  { icon: Zap, title: "Weakness Identification", description: "You initially considered option A (water vs salt water comparison). 67% of students make this same mistake. Focus on same-solvent comparisons", color: "text-orange-500" },
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
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(10);

  const steps = [
    "question",
    "analysis", 
    "explanation",
    "insights"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAiAnalyzing(true);
    setShowDashboard(true); // Show dashboard immediately
    
    setTimeout(() => {
      setAiAnalyzing(false);
      setShowExplanation(true);
      setCurrentStep(1);
    }, 1500); // Reduced delay
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setAiAnalyzing(false);
    setProgress(0);
    setShowDashboard(false);
    setTimeElapsed(10);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Simple Gradient Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-l from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />
          
          {/* Reduced Mathematical Symbols */}
          {mathematicalElements.slice(0, 4).map((element, index) => (
            <motion.div
              key={index}
              className="absolute text-primary/20 font-bold select-none"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                fontSize: `${2 + (index % 2)}rem`,
                fontFamily: 'serif'
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 8,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {element.symbol}
            </motion.div>
          ))}
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
                        <h3 className="font-semibold text-foreground">SAT Practice: Reading & Writing</h3>
                        <p className="text-sm text-muted-foreground">{demoQuestion.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="w-4 h-4" />
                        00:00:{timeElapsed.toString().padStart(2, '0')}
                      </div>
                       <Badge 
                         variant="outline" 
                         className={`border-orange-500/30 text-orange-600 ${demoQuestion.difficulty === 'Medium' ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}
                       >
                         {demoQuestion.difficulty}
                       </Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/30 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-slate-300 dark:border-slate-600">
                              <th className="text-left p-2 font-semibold">Element</th>
                              <th className="text-center p-2 font-semibold">Water</th>
                              <th className="text-center p-2 font-semibold">Salt Water</th>
                              <th className="text-center p-2 font-semibold">Oil</th>
                              <th className="text-center p-2 font-semibold">Alcohol</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="p-2 font-medium">Potassium</td>
                              <td className="text-center p-2">99%</td>
                              <td className="text-center p-2">90%</td>
                              <td className="text-center p-2">87%</td>
                              <td className="text-center p-2">88%</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="p-2 font-medium">Chlorine</td>
                              <td className="text-center p-2">89%</td>
                              <td className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 font-semibold">73%</td>
                              <td className="text-center p-2">64%</td>
                              <td className="text-center p-2">82%</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="p-2 font-medium">Sodium</td>
                              <td className="text-center p-2">93%</td>
                              <td className="text-center p-2">71%</td>
                              <td className="text-center p-2">79%</td>
                              <td className="text-center p-2">76%</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                              <td className="p-2 font-medium">Lithium</td>
                              <td className="text-center p-2">82%</td>
                              <td className="text-center p-2 bg-green-100 dark:bg-green-900/30 font-semibold">58%</td>
                              <td className="text-center p-2">62%</td>
                              <td className="text-center p-2">61%</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-medium">Rubidium</td>
                              <td className="text-center p-2">87%</td>
                              <td className="text-center p-2">65%</td>
                              <td className="text-center p-2">66%</td>
                              <td className="text-center p-2">64%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <p className="text-lg text-foreground leading-relaxed">
                      {demoQuestion.text}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {demoQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 group ${
                          selectedAnswer === index
                            ? index === demoQuestion.correct
                              ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-lg'
                              : 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 shadow-lg'
                            : 'border-border hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-purple-500/5 hover:shadow-md'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        whileHover={{ scale: selectedAnswer === null ? 1.02 : 1, y: selectedAnswer === null ? -2 : 0 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-4">
                          <motion.span 
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              selectedAnswer === index
                                ? index === demoQuestion.correct
                                  ? 'border-green-500 bg-green-500 text-white shadow-lg'
                                  : 'border-red-500 bg-red-500 text-white shadow-lg'
                                : 'border-border text-muted-foreground group-hover:border-primary group-hover:bg-primary/10'
                            }`}
                            whileHover={{ rotate: 5 }}
                          >
                            {String.fromCharCode(65 + index)}
                          </motion.span>
                          <span className="text-foreground font-medium text-lg">{option}</span>
                          {selectedAnswer === index && index === demoQuestion.correct && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              className="ml-auto"
                            >
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {!selectedAnswer && demoQuestion.hint && (
                    <motion.div className="mb-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowHint(!showHint)}
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </Button>
                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="mt-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                          >
                            <div className="flex items-start gap-3">
                              <HelpCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <p className="text-orange-800 dark:text-orange-200 text-sm leading-relaxed">
                                {demoQuestion.hint}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {aiAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-4 mb-4 border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div>
                          <span className="text-primary font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            AI analyzing response patterns from 10,847 similar problems...
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">Processing learning patterns and performance data</p>
                        </div>
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
                          Strategic Analysis:
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