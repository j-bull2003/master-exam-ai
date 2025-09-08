import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LogOut, Clock, PlayCircle, CheckCircle, Eye, Calendar, Home, BarChart3, User, Clipboard, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
// Removed Supabase import - using Django backend

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

const Mocks = () => {
  const [selectedMock, setSelectedMock] = useState<string | null>(null);
  const [userExam, setUserExam] = useState<string>("SAT"); // Default to SAT
  const { user } = useAuth();

  // Load user's exam type from profile
  useEffect(() => {
    const loadUserExam = async () => {
      if (!user) return;
      
      try {
        // TODO: Implement Django API endpoint for user profile
        console.log('Would load user exam type for:', user.id);
        // For now, keep default SAT
      } catch (error) {
        console.error('Error loading user exam:', error);
      }
    };
    
    loadUserExam();
  }, [user]);

  // Generate mock tests based on user's exam
  const getMockTestsForExam = (examType: string) => {
    const examConfigs: { [key: string]: any } = {
      SAT: {
        sections: ["Reading and Writing", "Math"],
        duration: "3 hours",
        totalQuestions: 154
      }
    };

    const config = examConfigs[examType] || examConfigs.SAT;
    
    return [
      {
        id: `${examType.toLowerCase()}-mock-1`,
        name: `${examType} Mock Test 1`,
        description: "Full-length official style practice test",
        duration: config.duration,
        sections: config.sections,
        difficulty: "Official",
        questions: config.totalQuestions,
        status: "available"
      },
      {
        id: `${examType.toLowerCase()}-mock-2`,
        name: `${examType} Mock Test 2`,
        description: "Advanced difficulty practice test",
        duration: config.duration,
        sections: config.sections,
        difficulty: "Hard",
        questions: config.totalQuestions,
        status: "available"
      },
      {
        id: `${examType.toLowerCase()}-sectional-1`,
        name: `${config.sections[0]} Only`,
        description: `Focused practice on ${config.sections[0].toLowerCase()}`,
        duration: "45 minutes",
        sections: [config.sections[0]],
        difficulty: "Mixed",
        questions: Math.floor(config.totalQuestions / config.sections.length),
        status: "available"
      }
    ];
  };

  const availableMocks = getMockTestsForExam(userExam);

  // Get config for the user's exam
  const examConfigs: { [key: string]: any } = {
    UCAT: {
      sections: ["Verbal Reasoning", "Decision Making", "Quantitative Reasoning", "Abstract Reasoning", "Situational Judgement"],
      duration: "2 hours",
      totalQuestions: 233
    },
    STEP: {
      sections: ["Mathematics Paper 1", "Mathematics Paper 2", "Mathematics Paper 3"],
      duration: "3 hours",
      totalQuestions: 12
    },
    SAT: {
      sections: ["Reading and Writing", "Math"],
      duration: "3 hours",
      totalQuestions: 154
    }
  };

  const config = examConfigs[userExam] || examConfigs.SAT;

  const completedMocks = [
    // Empty array - no completed mocks by default
    // Results will be added here when users actually complete mock tests
  ];

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
            <Link to="/mocks" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><BarChart3 className="w-4 h-4" />Analytics</Link>
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
              <Link to="/mocks" className="text-primary font-medium flex flex-col items-center gap-1 py-2 px-3">
                <Clipboard className="w-4 h-4" />
                <span className="text-xs">Mocks</span>
              </Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
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
        <div className="mb-4 sm:mb-6 lg:mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">SAT Mock Tests</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with full-length SAT mock tests to track your progress and prepare for test day
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Available Mocks */}
          <div className="xl:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <PlayCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Available Mock Tests
            </h2>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {availableMocks.map((mock) => (
                <Card 
                  key={mock.id} 
                  className={`transition-all duration-300 hover:shadow-xl ${
                    selectedMock === mock.id ? 'ring-2 ring-primary border-primary scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                  onClick={() => setSelectedMock(selectedMock === mock.id ? null : mock.id)}
                >
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-6 mb-4 lg:mb-6">
                      <div className="flex-1 w-full lg:w-auto">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{mock.name}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4">{mock.description}</p>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-sm">
                          <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{mock.duration}</span>
                          </div>
                          <div className="p-3 bg-emerald-500/10 rounded-lg text-center">
                            <div className="font-bold text-emerald-700">{mock.questions}</div>
                            <div className="text-xs text-muted-foreground">questions</div>
                          </div>
                          <div className="p-3 bg-purple-500/10 rounded-lg text-center">
                            <Badge variant="outline" className="text-purple-700 border-purple-300">
                              {mock.difficulty}
                            </Badge>
                          </div>
                          <div className="p-3 bg-orange-500/10 rounded-lg text-center">
                            <div className="font-bold text-orange-700">{mock.sections.length}</div>
                            <div className="text-xs text-muted-foreground">sections</div>
                          </div>
                        </div>

                        {selectedMock === mock.id && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                            <h4 className="font-semibold mb-3 text-primary">Sections included:</h4>
                            <div className="flex flex-wrap gap-2">
                              {mock.sections.map((section) => (
                                <Badge key={section} variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                                  {section}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        size={selectedMock === mock.id ? "lg" : "default"}
                        className={`w-full lg:w-auto lg:ml-6 ${selectedMock === mock.id ? 'bg-primary hover:bg-primary/90' : ''}`}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">{selectedMock === mock.id ? "Start Mock Test" : "Select Test"}</span>
                        <span className="sm:hidden">{selectedMock === mock.id ? "Start" : "Select"}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Instructions */}
            {selectedMock && (
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Mock Test Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Ensure you have a quiet environment for the full duration</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>You cannot pause once started - plan accordingly</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Review mode will be available after completion</span>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Results will be added to your analytics automatically</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Completed Mocks Sidebar */}
          <div className="xl:col-span-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              Your Results
            </h2>
            <div className="space-y-4">
              {completedMocks.map((mock) => (
                <Card key={mock.id} className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="font-semibold text-emerald-700">{mock.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(mock.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-emerald-500/20 rounded-lg">
                        <div className="text-3xl font-bold text-emerald-700">{mock.score}</div>
                        <div className="text-sm text-emerald-600 font-medium">
                          {mock.percentile}th percentile
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {mock.sections.map((section) => (
                          <div key={section.name} className="flex items-center justify-between text-sm">
                            <span className="truncate font-medium">{section.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-emerald-700">{section.score}</span>
                              <div className="w-16">
                                <Progress value={section.percentile} className="h-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-3 w-3 mr-2" />
                        Review Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {completedMocks.length === 0 && (
                <Card className="text-center p-8 border-dashed">
                  <CardContent>
                    <div className="text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">No completed mocks yet</p>
                      <p className="text-xs mt-1">Complete your first mock test to see results here</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mocks;