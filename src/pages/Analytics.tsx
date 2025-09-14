import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";
import { 
  LogOut, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Home,
  User,
  Clipboard,
  BookOpen,
  Brain,
  Zap,
  Award,
  Calculator,
  FileText
} from "lucide-react";

const Analytics = () => {
  const { user } = useAuth();
  const { profileData } = useUserProfile();

  const overallStats = {
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    averageTime: 0,
    studyDays: 0,
    streakDays: 0
  };

  const topicPerformance = [
    { name: "Reading and Writing", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%", color: "hsl(var(--primary))" },
    { name: "Math - Algebra", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%", color: "hsl(var(--chart-1))" },
    { name: "Math - Advanced", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%", color: "hsl(var(--chart-2))" },
    { name: "Math - Problem Solving", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%", color: "hsl(var(--chart-3))" }
  ];

  const weeklyProgress = [
    { week: "Week 1", accuracy: 0, questions: 0, date: "Jan 1" },
    { week: "Week 2", accuracy: 0, questions: 0, date: "Jan 8" },
    { week: "Week 3", accuracy: 0, questions: 0, date: "Jan 15" },
    { week: "Current", accuracy: 0, questions: 0, date: "Jan 22" }
  ];

  const difficultyBreakdown = [
    { level: "Easy", attempted: 0, correct: 0, accuracy: 0, color: "hsl(var(--chart-1))" },
    { level: "Medium", attempted: 0, correct: 0, accuracy: 0, color: "hsl(var(--chart-2))" },
    { level: "Hard", attempted: 0, correct: 0, accuracy: 0, color: "hsl(var(--chart-3))" }
  ];

  const chartConfig = {
    accuracy: {
      label: "Accuracy",
      color: "hsl(var(--primary))",
    },
    questions: {
      label: "Questions",
      color: "hsl(var(--chart-1))",
    },
    reading: {
      label: "Reading & Writing",
      color: "hsl(var(--chart-1))",
    },
    math: {
      label: "Math",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img
              src={uniHackLogo}
              alt="UniHack.ai Logo"
              className="h-20 sm:h-24 md:h-32 lg:h-36 max-h-[80px] sm:max-h-[96px] md:max-h-[128px] lg:max-h-[144px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Home className="w-4 h-4" />Dashboard</Link>
            <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BookOpen className="w-4 h-4" />Practice</Link>
            <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
            <Link to="/analytics" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analytics</Link>
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><User className="w-4 h-4" />Profile</Link>
            <Link to="/">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/">
              <Button 
                size="sm" 
                variant="outline"
                className="px-3"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="container mx-auto px-2">
            <nav className="flex items-center justify-around py-2">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <Home className="w-4 h-4" />
                <span className="text-xs">Dashboard</span>
              </Link>
              <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs">Practice</span>
              </Link>
              <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <Clipboard className="w-4 h-4" />
                <span className="text-xs">Mocks</span>
              </Link>
              <Link to="/analytics" className="text-primary font-medium flex flex-col items-center gap-1 py-2 px-3">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs">Analytics</span>
              </Link>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
                <User className="w-4 h-4" />
                <span className="text-xs">Profile</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8 px-2">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Hey {profileData?.full_name || 'there'}! 📊
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                Track your SAT progress and identify areas for improvement
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Select defaultValue="30">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid - Similar to Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-emerald-700">Overall Accuracy</CardTitle>
              <Target className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-emerald-700">{overallStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {overallStats.correctAnswers}/{overallStats.totalQuestions} questions correct
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-blue-700">Study Streak</CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-700">{overallStats.streakDays} days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Practice daily to build streak
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-purple-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-purple-700">Total Practice</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-purple-700">{overallStats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Questions completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-orange-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-orange-700">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-orange-700">{overallStats.averageTime}s</div>
              <p className="text-xs text-muted-foreground mt-1">
                Average per question
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Performance Progress Chart */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Over Time
              </CardTitle>
              <CardDescription>
                Your accuracy trend across practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overallStats.totalQuestions === 0 ? (
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">No progress data yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete practice sessions to see your improvement over time
                  </p>
                  <Link to="/practice">
                    <Button>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Practicing
                    </Button>
                  </Link>
                </div>
              ) : (
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={weeklyProgress}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* Topic Performance Breakdown */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subject Performance
              </CardTitle>
              <CardDescription>
                Your accuracy by SAT section
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overallStats.totalQuestions === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">No subject data yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Practice different SAT sections to track your performance
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/practice">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Reading
                      </Button>
                    </Link>
                    <Link to="/practice">
                      <Button variant="outline" size="sm" className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Math
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {topicPerformance.map((topic, index) => (
                    <div key={topic.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{topic.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{topic.accuracy}%</span>
                          {topic.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {topic.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                      <Progress value={topic.accuracy} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {topic.correct}/{topic.questions} questions correct
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Difficulty Analysis & Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Difficulty Performance */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Performance by Difficulty
              </CardTitle>
              <CardDescription>
                How you handle questions of different difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overallStats.totalQuestions === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">No difficulty data yet</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Practice questions to see how you perform across difficulty levels
                  </p>
                  <Link to="/diagnostic">
                    <Button>
                      <Brain className="w-4 h-4 mr-2" />
                      Take Diagnostic Test
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {difficultyBreakdown.map((level, index) => (
                    <div key={level.level} className="text-center">
                      <div className={`p-4 rounded-lg border ${
                        index === 0 ? 'bg-green-50 border-green-200' :
                        index === 1 ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <h3 className={`font-semibold mb-2 ${
                          index === 0 ? 'text-green-700' :
                          index === 1 ? 'text-yellow-700' :
                          'text-red-700'
                        }`}>
                          {level.level}
                        </h3>
                        <div className={`text-2xl font-bold mb-1 ${
                          index === 0 ? 'text-green-800' :
                          index === 1 ? 'text-yellow-800' :
                          'text-red-800'
                        }`}>
                          {level.accuracy}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {level.correct}/{level.attempted} correct
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions - Similar to Dashboard */}
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Continue your SAT preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/practice" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Practice
                </Button>
              </Link>
              <Link to="/mocks" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Clipboard className="w-4 h-4 mr-2" />
                  Take Mock Test
                </Button>
              </Link>
              <Link to="/diagnostic" className="block">
                <Button className="w-full justify-start" variant="outline">
                  <Brain className="w-4 h-4 mr-2" />
                  Diagnostic Test
                </Button>
              </Link>
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-2">Next Session</div>
                <div className="text-sm font-medium">Math Practice</div>
                <div className="text-xs text-muted-foreground">15 questions remaining</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;