import { useState, useEffect } from "react";
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
import { UserProfile } from "@/components/UserProfile";
import { ExamCountdown } from "@/components/ExamCountdown";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Clock, 
  User,
  PlayCircle, 
  BarChart3,
  Clipboard,
  CheckCircle,
  AlertCircle,
  Calendar,
  Settings2,
  MoreVertical,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  LogOut,
  Home,
  BookOpen
} from "lucide-react";
import QuestionBank from "./QuestionBank";
import { ExamDateUpdateModal } from "@/components/ExamDateUpdateModal";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Separate auth loading state
  const [isDenseMode, setIsDenseMode] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Auth state will be managed properly through currentUser
  const hasAccess = !isAuthLoading && currentUser !== null; // Only check access after auth loads
  const userEmail = currentUser?.email || "";

  // Load user data from Supabase
  useEffect(() => {
    let mounted = true;
    
    const loadUserData = async () => {
      try {
        console.log('Setting up auth state listener...');
        
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.id);
          
          if (!mounted) return;
          
          // Store current user for later use
          setCurrentUser(session?.user || null);
          
          if (session?.user) {
            // User is authenticated, load their profile
            setIsAuthLoading(false); // Auth state resolved
            await loadProfileData(session.user);
          } else {
            // User is not authenticated - clear data and stop loading
            console.log('No authenticated user');
            setUserData(null);
            setIsLoading(false);
            setIsAuthLoading(false); // Auth state resolved (no user)
          }
        });

        // Then check for existing session
        console.log('Checking for existing session...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log('Session check result:', session?.user?.id, sessionError);
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setIsLoading(false);
          return;
        }
        
        if (session?.user && mounted) {
          setCurrentUser(session.user);
          setIsAuthLoading(false); // Auth state resolved
          await loadProfileData(session.user);
        } else if (mounted) {
          setCurrentUser(null);
          setIsLoading(false);
          setIsAuthLoading(false); // Auth state resolved (no user)
        }

        return () => {
          subscription.unsubscribe();
          mounted = false;
        };
      } catch (error) {
        console.error('Error setting up auth:', error);
        if (mounted) {
          setIsLoading(false);
          setIsAuthLoading(false); // Auth state resolved with error
        }
      }
    };

    const loadProfileData = async (user: any) => {
      if (!mounted) return;
      
      try {
        console.log('Loading profile data for user:', user.id);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        console.log('Profile query result:', profile, error);

        if (error) {
          console.error('Error loading profile:', error);
        }

        // Extract user name properly
        const extractUserName = () => {
          if (profile?.full_name) return profile.full_name;
          if (user.user_metadata?.full_name) return user.user_metadata.full_name;
          if (user.email) {
            // Extract first part of email as name (lewisistrefi@gmail.com -> lewisistrefi)
            return user.email.split('@')[0];
          }
          return "User";
        };

        // Set user data regardless of profile success/failure
        const userData = {
          name: extractUserName(),
          exam: profile?.exam_type || "Complete onboarding",
          examDate: profile?.exam_date ? new Date(profile.exam_date) : null,
          totalQuestions: 450,
          correctAnswers: 315,
          accuracy: 70,
          weeklyTarget: 100,
          completedThisWeek: 65,
          streakDays: 7,
          nextSession: "Quantitative Reasoning - Hard"
        };

        console.log('Setting user data:', userData);
        setUserData(userData);
      } catch (error) {
        console.error('Error loading profile data:', error);
        // Still set some default data for authenticated user
        setUserData({
          name: user.user_metadata?.full_name || "User",
          exam: "Error loading profile",
          examDate: null,
          totalQuestions: 0,
          correctAnswers: 0,
          accuracy: 0,
          weeklyTarget: 100,
          completedThisWeek: 0,
          streakDays: 0,
          nextSession: "Try refreshing the page"
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadUserData();
    
    return () => {
      mounted = false;
    };
  }, []);

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

  const handleUpdateExamDate = async (newDate: Date) => {
    try {
      console.log('Updating exam date. Current user:', currentUser?.id);
      
      // Use stored current user instead of making fresh auth call
      if (!currentUser?.id) {
        console.log('No current user available, trying fresh auth check...');
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('Fresh auth check - user:', user?.id, 'error:', authError);
        
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "Please refresh the page and try again. You may need to log in.",
            variant: "destructive"
          });
          return;
        }
        
        // Update stored user
        setCurrentUser(user);
      }

      const userId = currentUser?.id;
      console.log('Updating exam date for user:', userId);

      const { error } = await supabase
        .from('profiles')
        .update({ exam_date: newDate.toISOString().split('T')[0] })
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating exam date:', error);
        toast({
          title: "Error", 
          description: "Failed to update exam date. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Update local state
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
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
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

  // Show login prompt if not authenticated
  if (!currentUser) {
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

  // Show loading state if userData is still loading
  if (!userData) {
    return (
      <div className="min-h-screen bg-background bg-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <AccessGate hasAccess={hasAccess} userEmail={userEmail}>
      <div className="min-h-screen bg-background bg-mesh">
        {/* Enhanced Header with UniHack Logo */}
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
              <Link to="/dashboard" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><Home className="w-4 h-4" />Dashboard</Link>
              <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BookOpen className="w-4 h-4" />Practice</Link>
              <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analytics</Link>
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><User className="w-4 h-4" />Profile</Link>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 border border-primary/20 card-layered hover:shadow-lg hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
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
          
          {/* Exam Countdown */}
          <div className="mb-8">
            <ExamCountdown 
              examDate={userData.examDate} 
              examType={userData.exam}
              onUpdateDate={() => setIsDateModalOpen(true)}
            />
          </div>
          
          {/* Exam Date Update Modal */}
          <ExamDateUpdateModal
            isOpen={isDateModalOpen}
            onClose={() => setIsDateModalOpen(false)}
            currentDate={userData.examDate}
            onUpdateDate={handleUpdateExamDate}
            examType={userData.exam}
          />
          
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
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/40">
            <QuestionBank></QuestionBank>
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
          <div className="lg:col-span-1 space-y-4">
            <Link to="/practice">
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all mb-4">
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
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all mb-4">
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
              <Card className="question-card cursor-pointer hover:shadow-academic-lg transition-all mb-4">
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
      </div>
    </AccessGate>
  );
};

export default Dashboard;