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

// Import demo images
import demoDashboard from "@/assets/demo-dashboard.jpg";
import demoAnalytics from "@/assets/demo-analytics.jpg";
import demoPractice from "@/assets/demo-practice.jpg";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  icon: any;
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Practice Dashboard",
    description: "Track your progress with comprehensive analytics and personalized study plans",
    image: demoDashboard,
    features: [
      "Real-time performance tracking",
      "Adaptive difficulty adjustment", 
      "Personalized study recommendations",
      "Progress visualization"
    ],
    icon: BarChart3
  },
  {
    id: 2,
    title: "AI-Powered Analysis", 
    description: "Our AI learns from 1000+ practice sessions to identify your unique patterns",
    image: demoAnalytics,
    features: [
      "Pattern recognition from historical data",
      "Predictive score modeling",
      "Weakness identification algorithms",
      "Personalized improvement strategies"
    ],
    icon: Brain
  },
  {
    id: 3,
    title: "Intelligent Practice",
    description: "Experience adaptive questioning that evolves based on your learning patterns",
    image: demoPractice,
    features: [
      "Algorithm-driven question selection",
      "Real-time difficulty adjustment",
      "Instant feedback and explanations",
      "Mathematical reasoning analysis"
    ],
    icon: Calculator
  }
];

const mathematicalElements = [
  { symbol: "∑", delay: 0 },
  { symbol: "∫", delay: 0.5 },
  { symbol: "∆", delay: 1 },
  { symbol: "π", delay: 1.5 },
  { symbol: "√", delay: 2 },
  { symbol: "∞", delay: 2.5 }
];

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-cycle through demo steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % demoSteps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Progress bar animation
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentStep]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setProgress(0);
  };

  const currentDemo = demoSteps[currentStep];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Mathematical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Floating Mathematical Symbols */}
        {mathematicalElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20 text-6xl font-bold"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${10 + (index % 2) * 70}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">See Our </span>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how our AI learns from thousands of practice sessions to create personalized learning experiences
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Demo Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-8 border-2 border-primary/20 bg-background/95 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentDemo.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{currentDemo.title}</h3>
                      <p className="text-sm text-muted-foreground">Interactive Demo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={togglePlayback}
                      className="border-primary/30"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      Live Demo
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Demo Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Demo Step Navigation */}
                <div className="flex gap-2 mb-6">
                  {demoSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => goToStep(index)}
                      className={`flex-1 p-3 rounded-lg text-center text-sm font-medium transition-all ${
                        currentStep === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <step.icon className="w-4 h-4 mx-auto mb-1" />
                      <div className="truncate">{step.title.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>

                {/* Demo Image */}
                <div className="relative overflow-hidden rounded-lg border border-border/50 mb-6">
                  <motion.img
                    key={currentDemo.id}
                    src={currentDemo.image}
                    alt={currentDemo.title}
                    className="w-full h-64 object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  
                  {/* Floating Stats */}
                  <motion.div
                    className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-primary">1450</div>
                    <div className="text-xs text-muted-foreground">Current Score</div>
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">{currentDemo.description}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentDemo.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
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
                  <Brain className="w-5 h-5 text-primary" />
                  AI Learning Engine
                </h3>
                
                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Pattern Recognition</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Analyzes 1000+ practice sessions to identify learning patterns</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100">Predictive Modeling</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">Forecasts score improvements based on historical data</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-900 dark:text-purple-100">Adaptive Algorithms</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Adjusts difficulty and content based on performance trends</p>
                    </div>
                  </motion.div>
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="p-6 border border-border/50 bg-background/95 backdrop-blur-sm">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Real-time Analytics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-blue-600">Accuracy</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-green-600">+150</div>
                    <div className="text-sm text-green-600">Score Gain</div>
                  </motion.div>
                  <motion.div 
                    className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-purple-600">24d</div>
                    <div className="text-sm text-purple-600">Study Streak</div>
                  </motion.div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setIsPlaying(true)} 
                  variant="outline" 
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
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