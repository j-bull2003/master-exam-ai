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
    totalQuestions: 1247,
    correctAnswers: 892,
    accuracy: 71.5,
    averageTime: 54, // seconds per question
    studyDays: 23,
    streakDays: 7
  };

  const topicPerformance = [
    { name: "Verbal Reasoning", questions: 345, correct: 268, accuracy: 77.7, trend: "up", improvement: "+5.2%" },
    { name: "Decision Making", questions: 298, correct: 216, accuracy: 72.5, trend: "up", improvement: "+3.1%" },
    { name: "Quantitative Reasoning", questions: 312, correct: 198, accuracy: 63.5, trend: "down", improvement: "-2.4%" },
    { name: "Abstract Reasoning", questions: 292, correct: 210, accuracy: 71.9, trend: "up", improvement: "+1.8%" }
  ];

  const weeklyProgress = [
    { week: "Week 1", accuracy: 58, questions: 156 },
    { week: "Week 2", accuracy: 64, questions: 198 },
    { week: "Week 3", accuracy: 69, questions: 234 },
    { week: "Current", accuracy: 71.5, questions: 189 }
  ];

  const difficultyBreakdown = [
    { level: "Easy", attempted: 412, correct: 356, accuracy: 86.4 },
    { level: "Medium", attempted: 598, correct: 398, accuracy: 66.6 },
    { level: "Hard", attempted: 237, correct: 138, accuracy: 58.2 }
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Performance Analytics</h1>
            <p className="text-muted-foreground">
              Track your progress and identify areas for improvement
            </p>
          </div>
          <div className="flex items-center space-x-4">
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
              Export CSV
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="question-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.accuracy}%</div>
              <p className="text-xs text-muted-foreground">
                {overallStats.correctAnswers}/{overallStats.totalQuestions} correct
              </p>
              <Progress value={overallStats.accuracy} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="question-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageTime}s</div>
              <p className="text-xs text-muted-foreground">per question</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingDown className="h-3 w-3 text-success" />
                <span className="text-xs text-success">-3s from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="question-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.studyDays}</div>
              <p className="text-xs text-muted-foreground">total active days</p>
              <div className="flex items-center space-x-1 mt-2">
                <Activity className="h-3 w-3 text-primary" />
                <span className="text-xs text-primary">{overallStats.streakDays} day streak</span>
              </div>
            </CardContent>
          </Card>

          <Card className="question-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">across all topics</p>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-success">+15% this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Topic Performance */}
          <Card className="question-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Performance by Topic
              </CardTitle>
              <CardDescription>Your accuracy across different subject areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicPerformance.map((topic) => (
                  <div key={topic.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{topic.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{topic.accuracy}%</span>
                        <div className="flex items-center space-x-1">
                          {topic.trend === 'up' ? 
                            <TrendingUp className="h-3 w-3 text-success" /> :
                            <TrendingDown className="h-3 w-3 text-error" />
                          }
                          <span className={`text-xs ${topic.trend === 'up' ? 'text-success' : 'text-error'}`}>
                            {topic.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{topic.correct}/{topic.questions} correct</span>
                      <Progress value={topic.accuracy} className="w-24 h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="question-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Weekly Progress
              </CardTitle>
              <CardDescription>Your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((week, index) => (
                  <div key={week.week} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{week.week}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{week.accuracy}%</span>
                        {index > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            +{(week.accuracy - weeklyProgress[index - 1].accuracy).toFixed(1)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{week.questions} questions</span>
                      <Progress value={week.accuracy} className="w-24 h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Analysis */}
        <Card className="question-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Performance by Difficulty
            </CardTitle>
            <CardDescription>How you perform across different difficulty levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {difficultyBreakdown.map((level) => (
                <div key={level.level} className="text-center space-y-3">
                  <div className={`p-4 rounded-lg difficulty-${level.level.toLowerCase()}`}>
                    <h3 className="font-semibold text-sm mb-1">{level.level}</h3>
                    <div className="text-2xl font-bold">{level.accuracy}%</div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{level.correct}/{level.attempted} correct</p>
                    <Progress value={level.accuracy} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;