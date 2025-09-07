import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileAPI } from "@/lib/profile-api";
import { getTopicsForExams } from "@/lib/topicMap";
import { universities } from "@/data/universities";
import type { UserProfile } from "@/types/profile";
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
  GraduationCap,
  MapPin,
  Edit
} from "lucide-react";
import BrandFrame from "@/components/layouts/BrandFrame";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDenseMode, setIsDenseMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  
  // Auth state is managed by AuthContext
  const hasAccess = !authLoading && user !== null;
  const userEmail = user?.email || "";

  // Check if email is confirmed
  const isEmailConfirmed = true;

  useEffect(() => {
    const loadProfile = async () => {
      if (!hasAccess || authLoading) {
        setIsLoading(false);
        return;
      }

      try {
        const userProfile = await ProfileAPI.getProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [hasAccess, authLoading, toast]);

  // Don't render anything while auth is loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Required</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button asChild className="w-full">
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/register">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show onboarding prompt if no profile
  if (!isLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Welcome to UNIHACK!</CardTitle>
            <CardDescription>Let's set up your profile to get started</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button asChild className="w-full">
              <Link to="/exam-picker">Complete Setup</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate days until exam
  const getDaysUntilExam = (): string => {
    if (!profile?.examDate) return "Set Date";
    
    const examDate = new Date(profile.examDate);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Exam Passed";
    if (diffDays === 0) return "Today!";
    return `${diffDays} days left`;
  };

  // Get university names from IDs
  const getUniversityNames = (universityIds: string[]): string[] => {
    return universityIds.map(id => {
      const uni = universities.find(u => u.id === id);
      return uni?.name || id;
    });
  };

  // Get available topics for user's exams
  const availableTopics = profile ? getTopicsForExams(profile.examTypes) : [];

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <img
                src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png"
                alt="UNIHACK Logo"
                className="h-8 w-auto object-contain mix-blend-multiply dark:mix-blend-screen"
                style={{ backgroundColor: "transparent" }}
              />
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                to="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/practice"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Practice
              </Link>
              <Link
                to="/mocks"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Mocks
              </Link>
              <Link
                to="/analytics"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Analytics
              </Link>
              <Link
                to="/profile"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            <nav className="flex items-center">
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-background">
        {/* Email verification banner */}
        {!isEmailConfirmed && (
          <Alert className="rounded-none border-x-0 border-t-0 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please verify your email address to ensure you receive important updates.
              <Button variant="link" className="ml-2 h-auto p-0">
                Resend verification
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="container mx-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.full_name || "Student"}!
              </h1>
              <p className="text-muted-foreground">
                Here's your study progress and upcoming goals
              </p>
            </div>

            {/* Status Chip */}
            <div className="flex items-center gap-2">
              {profile?.examTypes && profile.examTypes.length > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  Tests: {profile.examTypes.join(", ")} • {getDaysUntilExam()}
                </Badge>
              )}
              
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Days Until Exam</p>
                    <p className="text-2xl font-bold">{getDaysUntilExam()}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Target Universities</p>
                    <p className="text-2xl font-bold">{profile?.targetUniversities?.length || 0}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Topics</p>
                    <p className="text-2xl font-bold">{availableTopics.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Study Mode</p>
                    <p className="text-2xl font-bold capitalize">{profile?.studyMode || "Focus"}</p>
                  </div>
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Goals & Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Goals Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.targetUniversities && profile.targetUniversities.length > 0 ? (
                    <div>
                      <h4 className="font-medium mb-2">Target Universities</h4>
                      <div className="space-y-2">
                        {getUniversityNames(profile.targetUniversities).map((uniName, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {uniName}
                            </span>
                            {profile.targetCourses?.[index] && (
                              <Badge variant="outline">{profile.targetCourses[index]}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium mb-2">Set Your Goals</h4>
                      <p className="text-muted-foreground mb-4">
                        Choose your target universities to get personalized study plans
                      </p>
                      <Button asChild>
                        <Link to="/exam-picker">Set Goals</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Study Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Topics
                    {profile?.examTypes && profile.examTypes.length > 1 && (
                      <Badge variant="outline">{profile.examTypes[0]}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {availableTopics.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTopics.slice(0, 8).map((topic, index) => (
                        <div key={index} className="p-2 border rounded text-sm">
                          {topic}
                        </div>
                      ))}
                      {availableTopics.length > 8 && (
                        <div className="p-2 border rounded text-sm text-center text-muted-foreground col-span-2">
                          +{availableTopics.length - 8} more topics
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-medium mb-2">No Topics Available</h4>
                      <p className="text-muted-foreground mb-4">
                        Select your exam types to see available study topics
                      </p>
                      <Button asChild>
                        <Link to="/exam-picker">Choose Exams</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link to="/practice">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Practice
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/mocks">
                      <Clipboard className="w-4 h-4 mr-2" />
                      Take Mock Exam
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>

                  <Separator />

                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/profile">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium mb-2">No Recent Activity</h4>
                    <p className="text-muted-foreground">
                      Start practicing to see your activity here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;