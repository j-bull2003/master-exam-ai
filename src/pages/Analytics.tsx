import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  BookOpen
} from "lucide-react";

const Analytics = () => {
  const overallStats = {
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    averageTime: 0, // seconds per question
    studyDays: 0,
    streakDays: 0
  };

  const topicPerformance = [
    { name: "Reading and Writing", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%" },
    { name: "Heart of Algebra", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%" },
    { name: "Problem Solving & Data Analysis", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%" },
    { name: "Passport to Advanced Math", questions: 0, correct: 0, accuracy: 0, trend: "neutral", improvement: "+0%" }
  ];

  const weeklyProgress = [
    { week: "Week 1", accuracy: 0, questions: 0 },
    { week: "Week 2", accuracy: 0, questions: 0 },
    { week: "Week 3", accuracy: 0, questions: 0 },
    { week: "Current", accuracy: 0, questions: 0 }
  ];

  const difficultyBreakdown = [
    { level: "Easy", attempted: 0, correct: 0, accuracy: 0 },
    { level: "Medium", attempted: 0, correct: 0, accuracy: 0 },
    { level: "Hard", attempted: 0, correct: 0, accuracy: 0 }
  ];

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img
              src={uniHackLogo}
              alt="UniHack.ai Logo"
              className="h-36 md:h-44 max-h-[144px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <nav className="flex items-center space-x-6">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Performance Analytics</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your SAT progress and identify areas for improvement with detailed insights
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">Overall Accuracy</CardTitle>
              <Target className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-700">{overallStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground">
                {overallStats.correctAnswers}/{overallStats.totalQuestions} correct
              </p>
              <Progress value={overallStats.accuracy} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Average Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{overallStats.averageTime}s</div>
              <p className="text-xs text-muted-foreground">per question</p>
              <div className="flex items-center space-x-1 mt-3">
                <span className="text-xs text-muted-foreground font-medium">Start practicing to see data</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-purple-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Study Days</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{overallStats.studyDays}</div>
              <p className="text-xs text-muted-foreground">total active days</p>
              <div className="flex items-center space-x-1 mt-3">
                <span className="text-xs text-muted-foreground font-medium">{overallStats.streakDays} day streak</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-orange-500/20 hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Questions Answered</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">{overallStats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">across all topics</p>
              <div className="flex items-center space-x-1 mt-3">
                <span className="text-xs text-muted-foreground font-medium">Begin practicing to track progress</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Topic Performance */}
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-700">
                <PieChart className="h-5 w-5 mr-2" />
                SAT Section Performance
              </CardTitle>
              <CardDescription>Your accuracy across Reading & Writing and Math</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {overallStats.totalQuestions === 0 ? (
                  <div className="text-center py-8">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No practice data yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Start practicing to see your performance breakdown</p>
                  </div>
                ) : (
                  topicPerformance.map((topic, index) => (
                    <div key={topic.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{topic.name}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold">{topic.accuracy}%</span>
                          <div className="flex items-center space-x-1">
                            {topic.trend === 'up' ? 
                              <TrendingUp className="h-4 w-4 text-green-600" /> :
                              topic.trend === 'down' ?
                              <TrendingDown className="h-4 w-4 text-red-600" /> :
                              null
                            }
                            <span className={`text-sm font-medium ${
                              topic.trend === 'up' ? 'text-green-600' : 
                              topic.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                            }`}>
                              {topic.improvement}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={topic.accuracy} className="h-3" />
                        <p className="text-xs text-muted-foreground text-center">
                          {topic.correct}/{topic.questions} questions correct
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-700">
                <TrendingUp className="h-5 w-5 mr-2" />
                Weekly Progress
              </CardTitle>
              <CardDescription>Your improvement trajectory over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {overallStats.totalQuestions === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No weekly data yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Complete practice sessions to track your progress</p>
                  </div>
                ) : (
                  weeklyProgress.map((week, index) => (
                    <div key={week.week} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{week.week}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold">{week.accuracy}%</span>
                          {index > 0 && week.accuracy > 0 && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                              +{(week.accuracy - weeklyProgress[index - 1].accuracy).toFixed(1)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress value={week.accuracy} className="h-3" />
                        <p className="text-xs text-muted-foreground text-center">
                          {week.questions} questions practiced
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Analysis */}
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-700">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance by Difficulty Level
            </CardTitle>
            <CardDescription>How you perform across easy, medium, and hard questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {overallStats.totalQuestions === 0 ? (
                <div className="col-span-3 text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground">No difficulty data available</p>
                  <p className="text-sm text-muted-foreground mt-2">Practice questions at different difficulty levels to see your performance breakdown</p>
                </div>
              ) : (
                difficultyBreakdown.map((level, index) => (
                  <div key={level.level} className="text-center space-y-4">
                    <div className={`p-6 rounded-xl ${
                      index === 0 ? 'bg-green-100 border-2 border-green-300' :
                      index === 1 ? 'bg-yellow-100 border-2 border-yellow-300' :
                      'bg-red-100 border-2 border-red-300'
                    }`}>
                      <h3 className={`font-semibold text-lg mb-2 ${
                        index === 0 ? 'text-green-700' :
                        index === 1 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>{level.level}</h3>
                      <div className={`text-4xl font-bold ${
                        index === 0 ? 'text-green-700' :
                        index === 1 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>{level.accuracy}%</div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground font-medium">
                        {level.correct}/{level.attempted} questions correct
                      </p>
                      <Progress value={level.accuracy} className="h-2" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;