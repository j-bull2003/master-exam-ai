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
  AlertTriangle
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
    if (!authLoading && user) {
      console.log('Auth state changed, loading profile for user:', user.id);
      loadProfileData(user);
    } else if (!authLoading && !user) {
      setUserData(null);
      setIsLoading(false);
    }
  }, [user, authLoading]);

  const loadProfileData = async (user: any) => {
    try {
      console.log('Loading profile data for user:', user.id);
      
      // For Django users, use user data directly
      const userName = `${user.first_name} ${user.last_name}`.trim() || user.email?.split('@')[0] || 'User';
      
      // Create userData object with Django user data
      const userData = {
        name: userName,
        exam: "No exam selected", // TODO: Store in Django profile model
        examDate: null, // TODO: Store in Django profile model
        totalQuestions: 0, // These could come from Django analytics
        correctAnswers: 0,
        accuracy: 0,
        weeklyTarget: 100,
        completedThisWeek: 0,
        streakDays: 0,
        nextSession: "Select your exam to start"
      };

      console.log('Setting user data:', userData);
      setUserData(userData);
    } catch (error) {
      console.error('Error loading profile data:', error);
      // Still set some default data for authenticated user
      setUserData({
        name: `${user.first_name} ${user.last_name}`.trim() || "User",
        exam: "No exam selected",
        examDate: null,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        weeklyTarget: 100,
        completedThisWeek: 0,
        streakDays: 0,
        nextSession: "Select your exam to start"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateExamDate = async (newDate: Date) => {
    try {
      console.log('Updating exam date. Current user:', user?.id);
      
      if (!user?.id) {
        toast({
          title: "Authentication Required",
          description: "Please refresh the page and try again. You may need to log in.",
          variant: "destructive"
        });
        return;
      }

      // TODO: Implement Django API endpoint for updating exam date
      console.log('Would update exam date to:', newDate);

      // Update local state for now
      setUserData(prev => ({ ...prev, examDate: newDate }));
      
      toast({
        title: "Success",
        description: "Exam date updated successfully!",
      });
    } catch (error) {
      console.error('Error updating exam date:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold">Please Log In</h2>
          <p className="text-muted-foreground">
            You need to be logged in to access your dashboard.
          </p>
          <Button onClick={() => window.location.href = '/auth/login'} size="lg">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate exam countdown
  const getExamCountdown = () => {
    if (!userData?.examDate) return null;
    
    const now = new Date();
    const examDate = new Date(userData.examDate);
    
    // Set exam date to end of day to avoid "passed" issues
    examDate.setHours(23, 59, 59, 999);
    
    const diffTime = examDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const examCountdown = getExamCountdown();
  const isExamPassed = examCountdown !== null && examCountdown < 0;

  return (
    <div className="min-h-screen bg-background bg-mesh">
      {/* Django users don't need email verification */}

      <div className="container mx-auto px-4 space-y-8">
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

        <div className="py-8 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Welcome back, {userData?.name || 'User'}! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to excel in your {userData?.exam ? `${userData.exam} exam` : 'upcoming exam'}?
            </p>
          </div>

        {/* Exam Info Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {userData?.exam || 'No Exam Selected'}
                </CardTitle>
                {userData?.examDate && (
                  <CardDescription className="text-lg mt-2">
                    {isExamPassed ? (
                      <span className="text-destructive font-medium">
                        Exam Date Passed
                      </span>
                    ) : (
                      examCountdown !== null && (
                        <span className="text-primary font-medium">
                          {examCountdown} days remaining
                        </span>
                      )
                    )}
                  </CardDescription>
                )}
              </div>
              <div className="text-right">
                {userData?.examDate ? (
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {new Date(userData.examDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Date not set
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isExamPassed && (
                <Alert className="border-destructive bg-destructive/10">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Your exam date has passed. Would you like to update it?
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="ml-4"
                      onClick={() => setIsDateModalOpen(true)}
                    >
                      Update Date
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              {!userData?.exam || userData?.exam === "No exam selected" && (
                <Alert>
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>Get started by selecting your exam type and target date.</span>
                      <Link to="/exam-picker">
                        <Button size="sm">
                          Choose Exam
                        </Button>
                      </Link>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {userData?.examDate && !isExamPassed && (
                <p className="text-muted-foreground">
                  Keep up the great work! You're making steady progress toward your SAT exam.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Start Practice</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link to="/practice">
                <Button className="w-full" size="sm">
                  Begin Session
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Take Mock Test</CardTitle>
              <Clipboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link to="/mocks">
                <Button className="w-full" variant="outline" size="sm">
                  Start Mock
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">View Analytics</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link to="/analytics">
                <Button className="w-full" variant="outline" size="sm">
                  View Progress
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Update Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link to="/profile">
                <Button className="w-full" variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.totalQuestions || 0}</div>
              <p className="text-xs text-muted-foreground">
                +0 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.accuracy || 0}%</div>
              <p className="text-xs text-muted-foreground">
                +0% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.streakDays || 0}</div>
              <p className="text-xs text-muted-foreground">
                consecutive days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.completedThisWeek || 0}/{userData?.weeklyTarget || 100}</div>
              <p className="text-xs text-muted-foreground">
                questions this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Exam Date Update Modal */}
        {isDateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <CardHeader>
                <CardTitle>Update Exam Date</CardTitle>
                <CardDescription>
                  Choose your new target exam date
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
    </div>
  );
};

export default Dashboard;