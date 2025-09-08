import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
// Removed Supabase import - using Django backend
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Target,
  TrendingUp,
  Users,
  Clock,
  Star,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Brain,
  Trophy,
  User,
  Settings,
  LogOut,
  Zap,
  Award,
  Clipboard,
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  Calculator
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDenseMode, setIsDenseMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  
  // Auth state is managed by AuthContext
  const hasAccess = !authLoading && user !== null;
  const userEmail = user?.email || "";

  // Check if email is confirmed (Django users are always confirmed)
  const isEmailConfirmed = true;

  // Load user data when auth state changes
  useEffect(() => {
    if (!authLoading && hasAccess) {
      // Initialize with default values - will be updated with real data as user interacts
      setUserData({
        name: userEmail.split('@')[0] || "Student",
        stats: {
          overall_accuracy: 0,
          weekly_progress: 0,
          study_streak: 0,
          total_questions: 0,
          correct_answers: 0,
          total_time: 0,
          sessions_completed: 0
        },
        target_universities: ["Harvard", "MIT", "Stanford"],
        exam_date: null,
        target_score: 1500
      });
      setIsLoading(false);
    }
  }, [authLoading, hasAccess, userEmail]);

  // Empty arrays - no mock data, starts at 0 for everything
  const recentSessions = [];
  const studyPlan = [];

  // Helper functions
  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      "In Progress": "default",
      "Completed": "secondary",
      "Due": "destructive",
      "Upcoming": "outline",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      "High": "destructive",
      "Medium": "default",
      "Low": "secondary",
    };
    return (
      <Badge variant={variants[priority] || "default"}>
        {priority}
      </Badge>
    );
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      "Hard": "destructive",
      "Medium": "default",
      "Easy": "secondary",
    };
    return (
      <Badge variant={variants[difficulty] || "default"}>
        {difficulty}
      </Badge>
    );
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down") return <RotateCcw className="w-4 h-4 text-red-500" />;
    return <Target className="w-4 h-4 text-muted-foreground" />;
  };

  const getExamCountdown = () => {
    if (!userData?.exam_date) return null;
    
    const examDate = new Date(userData.exam_date);
    const today = new Date();
    const timeDiff = examDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const handleUpdateExamDate = async (newDate: Date) => {
    try {
      // Update local state immediately for better UX
      setUserData(prev => ({
        ...prev,
        exam_date: newDate.toISOString().split('T')[0]
      }));
      
      toast({
        title: "Exam date updated",
        description: `Your SAT exam is scheduled for ${newDate.toLocaleDateString()}`,
      });
    } catch (error) {
      console.error('Error updating exam date:', error);
      toast({
        title: "Error",
        description: "Failed to update exam date. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader className="text-center">
            <CardTitle>Access Required</CardTitle>
            <CardDescription>
              Please log in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/auth/login">
              <Button>Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show email verification requirement
  if (!isEmailConfirmed) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <Card className="w-[500px]">
          <CardHeader className="text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <CardTitle>Email Verification Required</CardTitle>
            <CardDescription>
              Please check your email and click the verification link to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Verification email sent to: <strong>{userEmail}</strong>
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  toast({
                    title: "Verification email sent",
                    description: "Please check your inbox and spam folder.",
                  });
                }}
                className="w-full"
              >
                Resend Verification Email
              </Button>
              <Button variant="outline" onClick={signOut} className="w-full">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const examCountdown = getExamCountdown();
  const isExamPassed = examCountdown !== null && examCountdown < 0;

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
              src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png"
              alt="UniHack.ai Logo"
              className="h-36 md:h-44 max-h-[144px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><Target className="w-4 h-4" />Dashboard</Link>
            <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BookOpen className="w-4 h-4" />Practice</Link>
            <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analytics</Link>
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><User className="w-4 h-4" />Profile</Link>
            <Button 
              onClick={signOut}
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Welcome back, {userData?.name || 'User'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to continue your SAT preparation?
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left side - Stats and Actions (3/4 width) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="card-interactive">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData?.stats?.overall_accuracy || 0}%</div>
                    <p className="text-xs text-muted-foreground">
                      Start practicing to see your accuracy
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-interactive">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData?.stats?.weekly_progress || 0}%</div>
                    <p className="text-xs text-muted-foreground">
                      Complete sessions to track progress
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-interactive">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData?.stats?.study_streak || 0} days</div>
                    <p className="text-xs text-muted-foreground">
                      Practice daily to build your streak
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-interactive">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData?.stats?.total_questions || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Questions attempted
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Study Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Study Plan
                  </CardTitle>
                  <CardDescription>
                    Your personalized SAT study schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {studyPlan.length === 0 ? (
                    <div className="space-y-4">
                      <div className="text-center py-6">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Build Your Study Plan</h3>
                        <p className="text-muted-foreground mb-4">
                          Complete your diagnostic test to get a personalized SAT study plan
                        </p>
                        <Link to="/diagnostic">
                          <Button>
                            <Brain className="w-4 h-4 mr-2" />
                            Take Diagnostic Test
                          </Button>
                        </Link>
                      </div>
                      
                      {/* SAT Sections Overview */}
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 text-sm">SAT Test Sections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Calculator className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-sm">Math</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Algebra, Geometry, Statistics & Probability
                            </p>
                            <div className="flex justify-between text-xs">
                              <span>Questions: 0/44</span>
                              <span>Score: 0/800</span>
                            </div>
                          </div>
                          
                          <div className="p-3 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-sm">Reading & Writing</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Reading Comprehension & Language Usage
                            </p>
                            <div className="flex justify-between text-xs">
                              <span>Questions: 0/54</span>
                              <span>Score: 0/800</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {studyPlan.map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-sm">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-muted-foreground">{task.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Practice Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Practice Sessions
                  </CardTitle>
                  <CardDescription>
                    Your latest study activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentSessions.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Practice Sessions Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start practicing to see your session history here
                      </p>
                      <Link to="/practice">
                        <Button>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start Practicing
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentSessions.map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {getTrendIcon(session.trend)}
                            <div className="text-sm">
                              <div className="font-medium">{session.subject}</div>
                              <div className="text-muted-foreground">{session.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <div className="font-medium">{session.score}%</div>
                              <div className="text-muted-foreground">{session.questions} questions</div>
                            </div>
                            {getDifficultyBadge(session.difficulty)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Jump into your study activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/practice">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <BookOpen className="w-6 h-6" />
                        <span>Practice Questions</span>
                      </Button>
                    </Link>
                    <Link to="/mocks">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Clipboard className="w-6 h-6" />
                        <span>Mock Tests</span>
                      </Button>
                    </Link>
                    <Link to="/analytics">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <BarChart3 className="w-6 h-6" />
                        <span>View Analytics</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar - Timeline and Universities (1/4 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Your Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Your Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userData?.exam_date ? (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {isExamPassed ? 'Past' : examCountdown}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {isExamPassed ? 'Exam Date Passed' : 'days until exam'}
                        </div>
                      </div>
                      <div className="text-xs text-center">
                        <div className="font-medium">SAT Exam</div>
                        <div className="text-muted-foreground">
                          {new Date(userData.exam_date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">
                          {userData?.target_score || 1500}
                        </div>
                        <div className="text-xs text-muted-foreground">target score</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsDateModalOpen(true)}
                        className="w-full text-xs"
                      >
                        Update Date
                      </Button>
                    </>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="text-sm text-muted-foreground">No exam date set</div>
                      <Button 
                        size="sm" 
                        onClick={() => setIsDateModalOpen(true)}
                        className="w-full text-xs"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Set Exam Date
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Target Universities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Target Universities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userData?.target_universities?.slice(0, 3).map((university, index) => (
                      <div
                        key={index}
                        className="text-xs py-1.5 px-2 bg-muted rounded text-center"
                      >
                        {university}
                      </div>
                    ))}
                  </div>
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                      Manage List
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Exam Date Modal */}
          {isDateModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-[400px]">
                <CardHeader>
                  <CardTitle>Set Your SAT Exam Date</CardTitle>
                  <CardDescription>
                    Choose your target exam date to get personalized study plans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full p-2 border rounded"
                    onChange={async (e) => {
                      const newDate = new Date(e.target.value);
                      await handleUpdateExamDate(newDate);
                      setIsDateModalOpen(false);
                    }}
                  />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDateModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
    </div>
  );
};

export default Dashboard;