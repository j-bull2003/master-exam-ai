import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
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
  Calendar,
  Settings2,
  MoreVertical,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDenseMode, setIsDenseMode] = useState(false);
  
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

  const recentSessions = [
    { 
      id: "1", 
      topic: "Verbal Reasoning", 
      date: "2024-01-15", 
      time: "14:32",
      questions: 25, 
      correct: 19, 
      accuracy: 76, 
      duration: "32m", 
      status: "completed",
      difficulty: "medium"
    },
    { 
      id: "2", 
      topic: "Quantitative Reasoning", 
      date: "2024-01-15", 
      time: "09:15",
      questions: 20, 
      correct: 11, 
      accuracy: 55, 
      duration: "28m", 
      status: "completed",
      difficulty: "hard"
    },
    { 
      id: "3", 
      topic: "Decision Making", 
      date: "2024-01-14", 
      time: "16:45",
      questions: 15, 
      correct: 12, 
      accuracy: 80, 
      duration: "18m", 
      status: "completed",
      difficulty: "easy"
    },
    { 
      id: "4", 
      topic: "Abstract Reasoning", 
      date: "2024-01-14", 
      time: "11:20",
      questions: 30, 
      correct: 24, 
      accuracy: 80, 
      duration: "25m", 
      status: "completed",
      difficulty: "medium"
    },
    { 
      id: "5", 
      topic: "Verbal Reasoning", 
      date: "2024-01-13", 
      time: "15:10",
      questions: 22, 
      correct: 16, 
      accuracy: 73, 
      duration: "30m", 
      status: "completed",
      difficulty: "hard"
    }
  ];

  const studyPlan = [
    { 
      id: "1",
      topic: "Quantitative Reasoning", 
      priority: "high", 
      questions: 20, 
      estimatedTime: "30 min",
      dueDate: "Today",
      status: "pending",
      weakness: "Probability & Statistics"
    },
    { 
      id: "2",
      topic: "Decision Making", 
      priority: "medium", 
      questions: 15, 
      estimatedTime: "20 min",
      dueDate: "Today",
      status: "in_progress", 
      weakness: "Logical Reasoning"
    },
    { 
      id: "3",
      topic: "Verbal Reasoning", 
      priority: "low", 
      questions: 10, 
      estimatedTime: "15 min",
      dueDate: "Tomorrow",
      status: "pending",
      weakness: "Reading Comprehension"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-muted-foreground/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="bg-error/10 text-error border-error/20">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Easy</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "hard":
        return <Badge variant="destructive" className="bg-error/10 text-error border-error/20">Hard</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getTrendIcon = (current: number, baseline: number = 70) => {
    if (current > baseline + 5) return <ArrowUpIcon className="w-3 h-3 text-success" />;
    if (current < baseline - 5) return <ArrowDownIcon className="w-3 h-3 text-error" />;
    return <MinusIcon className="w-3 h-3 text-muted-foreground" />;
  };

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

          {/* Main Dashboard Content */}
          <div className="space-y-8">
            {/* Study Plan Table */}
            <Card className="border-border/40">
              <CardHeader className="border-b border-border/40 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Today's Study Plan
                    </CardTitle>
                    <CardDescription className="text-sm">
                      AI-recommended focus areas based on your performance
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Settings2 className="h-4 w-4" />
                      <span>Dense</span>
                      <Switch 
                        checked={isDenseMode} 
                        onCheckedChange={setIsDenseMode}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-muted/30 sticky top-0 z-10">
                      <TableRow className="border-border/40 hover:bg-muted/50">
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Topic</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Focus Area</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Priority</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Questions</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Est. Time</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Status</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studyPlan.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-12">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <BookOpen className="h-8 w-8" />
                              <p className="font-medium">No study plan available</p>
                              <p className="text-sm">Complete a diagnostic to generate your personalized plan</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        studyPlan.map((item) => (
                          <TableRow 
                            key={item.id} 
                            className="border-border/40 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className={`font-medium ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {item.topic}
                            </TableCell>
                            <TableCell className={`text-muted-foreground text-sm ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {item.weakness}
                            </TableCell>
                            <TableCell className={isDenseMode ? 'py-2' : 'py-3'}>
                              {getPriorityBadge(item.priority)}
                            </TableCell>
                            <TableCell className={`text-sm ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {item.questions}
                            </TableCell>
                            <TableCell className={`text-sm text-muted-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {item.estimatedTime}
                            </TableCell>
                            <TableCell className={isDenseMode ? 'py-2' : 'py-3'}>
                              {getStatusBadge(item.status)}
                            </TableCell>
                            <TableCell className={isDenseMode ? 'py-2' : 'py-3'}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Recent Sessions Table */}
            <Card className="border-border/40">
              <CardHeader className="border-b border-border/40 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Recent Practice Sessions
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Your latest performance across different topics
                    </CardDescription>
                  </div>
                  <Link to="/analytics">
                    <Button variant="outline" size="sm" className="text-xs">
                      View All Analytics
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-muted/30 sticky top-0 z-10">
                      <TableRow className="border-border/40 hover:bg-muted/50">
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Topic</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Date & Time</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Questions</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Accuracy</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Duration</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Difficulty</TableHead>
                        <TableHead className={`font-semibold text-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentSessions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-12">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Clock className="h-8 w-8" />
                              <p className="font-medium">No practice sessions yet</p>
                              <p className="text-sm">Start practicing to see your progress here</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        recentSessions.map((session) => (
                          <TableRow 
                            key={session.id} 
                            className="border-border/40 hover:bg-muted/30 transition-colors"
                          >
                            <TableCell className={`font-medium ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {session.topic}
                            </TableCell>
                            <TableCell className={`text-sm text-muted-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              <div className="space-y-1">
                                <div>{session.date}</div>
                                <div className="text-xs">{session.time}</div>
                              </div>
                            </TableCell>
                            <TableCell className={`text-sm ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {session.correct}/{session.questions}
                            </TableCell>
                            <TableCell className={`font-medium ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              <div className="flex items-center gap-2">
                                <span className={`${
                                  session.accuracy >= 80 ? 'text-success' :
                                  session.accuracy >= 60 ? 'text-warning' : 'text-error'
                                }`}>
                                  {session.accuracy}%
                                </span>
                                {getTrendIcon(session.accuracy)}
                              </div>
                            </TableCell>
                            <TableCell className={`text-sm text-muted-foreground ${isDenseMode ? 'py-2' : 'py-3'}`}>
                              {session.duration}
                            </TableCell>
                            <TableCell className={isDenseMode ? 'py-2' : 'py-3'}>
                              {getDifficultyBadge(session.difficulty)}
                            </TableCell>
                            <TableCell className={isDenseMode ? 'py-2' : 'py-3'}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
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