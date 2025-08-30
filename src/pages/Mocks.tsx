import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LogOut, Clock, PlayCircle, CheckCircle, Eye, Calendar, Home, BarChart3, User, Clipboard, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

const Mocks = () => {
  const [selectedMock, setSelectedMock] = useState<string | null>(null);
  const [userExam, setUserExam] = useState<string>("UCAT"); // Default fallback
  const { user } = useAuth();

  // Load user's exam type from profile
  useEffect(() => {
    const loadUserExam = async () => {
      if (!user) return;
      
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('exam_type')
          .eq('user_id', user.id.toString())
          .single();
          
        if (profile?.exam_type) {
          setUserExam(profile.exam_type);
        }
      } catch (error) {
        console.error('Error loading user exam:', error);
      }
    };
    
    loadUserExam();
  }, [user]);

  // Generate mock tests based on user's exam
  const getMockTestsForExam = (examType: string) => {
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
        sections: ["Reading", "Writing and Language", "Math (No Calculator)", "Math (Calculator)"],
        duration: "3 hours",
        totalQuestions: 154
      },
      ACT: {
        sections: ["English", "Mathematics", "Reading", "Science"],
        duration: "2 hours 55 minutes",
        totalQuestions: 215
      }
    };

    const config = examConfigs[examType] || examConfigs.UCAT;
    
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
      sections: ["Reading", "Writing and Language", "Math (No Calculator)", "Math (Calculator)"],
      duration: "3 hours",
      totalQuestions: 154
    },
    ACT: {
      sections: ["English", "Mathematics", "Reading", "Science"],
      duration: "2 hours 55 minutes",
      totalQuestions: 215
    }
  };

  const config = examConfigs[userExam] || examConfigs.UCAT;

  const completedMocks = [
    {
      id: "completed-1",
      name: `${userExam} Mock Test 1`,
      completedAt: "2024-01-15",
      score: userExam === "STEP" ? 85 : userExam === "SAT" ? 1480 : 2580,
      maxScore: userExam === "STEP" ? 100 : userExam === "SAT" ? 1600 : 3600,
      percentile: 85,
      timeSpent: "1h 54m",
      sections: [
        { name: config.sections[0] || "Section 1", score: userExam === "STEP" ? 85 : 520, percentile: 68 },
        { name: config.sections[1] || "Section 2", score: userExam === "STEP" ? 78 : 580, percentile: 82 }
      ]
    }
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">{userExam} Mock Tests</h1>
          <p className="text-muted-foreground">
            Practice with full-length {userExam} mock tests to improve your performance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Mocks */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-display font-semibold mb-4">Available {userExam} Mock Tests</h2>
            <div className="space-y-4 mb-8">
              {availableMocks.map((mock) => (
                <Card 
                  key={mock.id} 
                  className={`question-card cursor-pointer transition-all ${
                    selectedMock === mock.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-academic-lg'
                  }`}
                  onClick={() => setSelectedMock(selectedMock === mock.id ? null : mock.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{mock.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{mock.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {mock.duration}
                          </div>
                          <div>
                            <span className="font-medium">{mock.questions}</span> questions
                          </div>
                          <div>
                            <Badge variant="outline" className={`difficulty-${mock.difficulty.toLowerCase()}`}>
                              {mock.difficulty}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium">{mock.sections.length}</span> sections
                          </div>
                        </div>

                        {selectedMock === mock.id && (
                          <div className="mt-4 p-4 bg-muted/30 rounded-lg animate-slide-up">
                            <h4 className="font-medium mb-2">Sections included:</h4>
                            <div className="flex flex-wrap gap-2">
                              {mock.sections.map((section) => (
                                <Badge key={section} variant="secondary" className="text-xs">
                                  {section}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        size={selectedMock === mock.id ? "lg" : "default"}
                        className={selectedMock === mock.id ? "ml-4" : "ml-4"}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        {selectedMock === mock.id ? "Start Mock Test" : "Select"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Instructions */}
            {selectedMock && (
              <Card className="question-card animate-fade-in">
                <CardHeader>
                  <CardTitle>Mock Test Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Ensure you have a quiet environment for the full duration</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>You cannot pause once started - plan accordingly</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Review mode will be available after completion</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Results will be added to your analytics automatically</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Completed Mocks Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-display font-semibold mb-4">Your {userExam} Results</h2>
            <div className="space-y-4">
              {completedMocks.map((mock) => (
                <Card key={mock.id} className="question-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{mock.name}</CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(mock.completedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{mock.score}</div>
                      <div className="text-sm text-muted-foreground">
                        Best {userExam} Score ({mock.percentile}th percentile)
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {mock.sections.map((section) => (
                        <div key={section.name} className="flex items-center justify-between text-xs">
                          <span className="truncate">{section.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{section.score}</span>
                            <div className="w-12">
                              <Progress value={section.percentile} className="h-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-2" />
                      Review
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mocks;