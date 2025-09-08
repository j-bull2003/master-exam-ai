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
      
      // Simulate onboarding data - in real app this would come from backend
      const mockOnboardingData = {
        examType: "SAT",
        examDate: new Date('2025-03-15'), // Future exam date
        targetUniversities: ["Harvard University", "MIT", "Stanford University"],
        targetScore: "1550",
        studyWeeksRemaining: 12,
        currentLevel: "Intermediate",
        weakestAreas: ["Advanced Math", "Reading Comprehension"],
        strongestAreas: ["Basic Math", "Grammar"]
      };
      
      // Create userData object with onboarding data
      const userData = {
        name: userName,
        exam: mockOnboardingData.examType,
        examDate: mockOnboardingData.examDate,
        dreamUniversities: mockOnboardingData.targetUniversities,
        targetScore: mockOnboardingData.targetScore,
        currentLevel: mockOnboardingData.currentLevel,
        weakestAreas: mockOnboardingData.weakestAreas,
        strongestAreas: mockOnboardingData.strongestAreas,
        studyWeeksRemaining: mockOnboardingData.studyWeeksRemaining,
        totalQuestions: 847,
        correctAnswers: 623,
        accuracy: 74,
        weeklyTarget: 100,
        completedThisWeek: 67,
        streakDays: 12,
        nextSession: "Math Practice Session"
      };

      console.log('Setting user data:', userData);
      setUserData(userData);
    } catch (error) {
      console.error('Error loading profile data:', error);
      // Still set some default data for authenticated user
      setUserData({
        name: `${user.first_name} ${user.last_name}`.trim() || "User",
        exam: "SAT",
        examDate: new Date('2025-03-15'),
        dreamUniversities: ["Harvard University", "MIT", "Stanford University"],
        targetScore: "1550",
        currentLevel: "Intermediate",
        weakestAreas: ["Advanced Math", "Reading Comprehension"],
        strongestAreas: ["Basic Math", "Grammar"],
        studyWeeksRemaining: 12,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        weeklyTarget: 100,
        completedThisWeek: 0,
        streakDays: 0,
        nextSession: "Start your SAT practice"
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

        <div className="py-6 space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">
              Welcome back, {userData?.name || 'User'}! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to excel in your SAT exam and get into your dream university?
            </p>
            {userData?.dreamUniversities && (
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-muted-foreground mr-2">Dream Universities:</span>
                {userData.dreamUniversities.slice(0, 3).map((uni, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {uni}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Main Layout - Split into two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Compact SAT Info & Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Compact SAT Exam Info */}
                <Card className="bg-gradient-to-r from-primary/10 to-primary-variant/10 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">SAT Exam</h3>
                        <p className="text-xs text-muted-foreground">Target: {userData?.targetScore}</p>
                      </div>
                    </div>
                    {userData?.examDate && (
                      <div className="space-y-2">
                        <div className="text-center p-2 bg-white/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {examCountdown || 0}
                          </div>
                          <p className="text-xs text-muted-foreground">days remaining</p>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          {new Date(userData.examDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Next Session */}
                <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-700">Next Session</h3>
                        <p className="text-xs text-muted-foreground">{userData?.nextSession}</p>
                      </div>
                    </div>
                    <Link to="/practice">
                      <Button size="sm" className="w-full">
                        Start Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-3">
                    <Link to="/practice" className="block">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Practice</h3>
                          <p className="text-xs text-muted-foreground">Daily questions</p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                  <CardContent className="p-3">
                    <Link to="/mocks" className="block">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                          <Clipboard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Mock Tests</h3>
                          <p className="text-xs text-muted-foreground">Full practice</p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
                  <CardContent className="p-3">
                    <Link to="/analytics" className="block">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                          <BarChart3 className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Analytics</h3>
                          <p className="text-xs text-muted-foreground">View progress</p>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Compact Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Target className="h-4 w-4 text-primary" />
                      <Badge variant="secondary" className="text-xs">+12</Badge>
                    </div>
                    <div className="text-xl font-bold">{userData?.totalQuestions || 847}</div>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">+3%</Badge>
                    </div>
                    <div className="text-xl font-bold">{userData?.accuracy || 74}%</div>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">🔥</Badge>
                    </div>
                    <div className="text-xl font-bold">{userData?.streakDays || 12}</div>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <Award className="h-4 w-4 text-blue-600" />
                      <div className="w-6 h-1 bg-blue-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${((userData?.completedThisWeek || 67) / (userData?.weeklyTarget || 100)) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xl font-bold">{userData?.completedThisWeek || 67}/{userData?.weeklyTarget || 100}</div>
                    <p className="text-xs text-muted-foreground">Weekly Goal</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Study Plan Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-fit sticky top-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg">Study Plan</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {userData?.studyWeeksRemaining || 12} weeks to target score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Level */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Current Level</h4>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {userData?.currentLevel || 'Intermediate'}
                    </Badge>
                  </div>

                  {/* Focus Areas */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-destructive mb-2">Areas to Improve</h4>
                      <div className="space-y-1">
                        {(userData?.weakestAreas || ['Advanced Math', 'Reading Comprehension']).map((area, index) => (
                          <Badge key={index} variant="destructive" className="text-xs mr-1 mb-1">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-primary mb-2">Strong Areas</h4>
                      <div className="space-y-1">
                        {(userData?.strongestAreas || ['Basic Math', 'Grammar']).map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1 bg-primary/10 text-primary">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Weekly Plan */}
                  <div className="border rounded-lg p-3 bg-muted/30">
                    <h4 className="font-medium text-sm mb-2">This Week</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Math Practice</span>
                        <Badge variant="outline" className="text-xs">3x</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Reading Comp</span>
                        <Badge variant="outline" className="text-xs">2x</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Full Test</span>
                        <Badge variant="outline" className="text-xs">1x</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <Link to="/practice">
                    <Button size="sm" className="w-full">
                      Continue Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
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
  );
};

export default Dashboard;