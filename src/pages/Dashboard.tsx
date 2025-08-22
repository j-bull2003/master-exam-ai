import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import AccessGate from "@/components/AccessGate";
import { 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Clock, 
  PlayCircle, 
  BookOpen, 
  CheckCircle,
  AlertCircle,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  // TODO: Replace with actual auth/subscription check
  const hasAccess = true; // For now, always allow access for demo
  const userEmail = "demo@unihack.ai"; // Mock user email
  // Mock data - replace with actual user data
  const userData = {
    name: "Alex Johnson",
    exam: "UCAT",
    totalQuestions: 450,
    correctAnswers: 315,
    accuracy: 70,
    weeklyTarget: 100,
    completedThisWeek: 65,
    streakDays: 7,
    nextSession: "Quantitative Reasoning - Hard"
  };

  const recentTopics = [
    { name: "Verbal Reasoning", accuracy: 75, trend: "up", questions: 45 },
    { name: "Decision Making", accuracy: 68, trend: "up", questions: 32 },
    { name: "Quantitative Reasoning", accuracy: 55, trend: "down", questions: 28 },
    { name: "Abstract Reasoning", accuracy: 82, trend: "up", questions: 38 }
  ];

  const studyPlan = [
    { topic: "Quantitative Reasoning", priority: "high", questions: 20, time: "30 min" },
    { topic: "Decision Making", priority: "medium", questions: 15, time: "20 min" },
    { topic: "Verbal Reasoning", priority: "low", questions: 10, time: "15 min" }
  ];

  return (
    <AccessGate hasAccess={hasAccess} userEmail={userEmail}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-display font-bold">UniHack.ai</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
              <Link to="/practice" className="text-muted-foreground hover:text-foreground">Practice</Link>
              <Link to="/mocks" className="text-muted-foreground hover:text-foreground">Mocks</Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground">Analytics</Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-muted-foreground">
              Preparing for {userData.exam} • {userData.streakDays} day streak 🔥
            </p>
          </div>

          {/* ... keep existing code (stats, study plan, etc.) */}
          
          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="question-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.accuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  {userData.correctAnswers}/{userData.totalQuestions} correct
                </p>
              </CardContent>
            </Card>

            <Card className="question-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.completedThisWeek}</div>
                <p className="text-xs text-muted-foreground">
                  of {userData.weeklyTarget} questions
                </p>
                <Progress value={(userData.completedThisWeek / userData.weeklyTarget) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="question-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.streakDays}</div>
                <p className="text-xs text-muted-foreground">
                  consecutive days
                </p>
              </CardContent>
            </Card>

            <Card className="question-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Session</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">{userData.nextSession}</div>
                <Link to="/practice">
                  <Button size="sm" className="mt-2 w-full">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Study Plan */}
            <Card className="question-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Today's Study Plan
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlan.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.priority === 'high' ? 'bg-error' :
                          item.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{item.topic}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.questions} questions • {item.time}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={item.priority === 'high' ? 'destructive' : 
                                item.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Link to="/practice">
                  <Button className="w-full mt-4">
                    Start Study Session
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card className="question-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Performance
                </CardTitle>
                <CardDescription>
                  Your accuracy by topic over the last week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-1 rounded ${
                          topic.trend === 'up' ? 'bg-success-light' : 'bg-error-light'
                        }`}>
                          {topic.trend === 'up' ? 
                            <CheckCircle className="h-4 w-4 text-success" /> :
                            <AlertCircle className="h-4 w-4 text-error" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm">{topic.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {topic.questions} questions attempted
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{topic.accuracy}%</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full mt-4">
                    View Detailed Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Link to="/practice">
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all">
                <CardContent className="flex items-center p-6">
                  <PlayCircle className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Continue Practice</h3>
                    <p className="text-sm text-muted-foreground">Resume your study session</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/mocks">
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all">
                <CardContent className="flex items-center p-6">
                  <Clock className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Take Mock Exam</h3>
                    <p className="text-sm text-muted-foreground">Full timed practice test</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/analytics">
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all">
                <CardContent className="flex items-center p-6">
                  <TrendingUp className="h-8 w-8 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">View Progress</h3>
                    <p className="text-sm text-muted-foreground">Detailed performance metrics</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </AccessGate>
  );
};

export default Dashboard;