import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  PlayCircle, 
  BookOpen, 
  Home, 
  BarChart3, 
  Clipboard, 
  User,
  Calculator,
  LogOut,
  Sparkles,
  Target,
  CheckCircle,
  Circle,
  AlertCircle,
  Grid3X3
} from "lucide-react";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

const Practice = () => {
  const [selectedSection, setSelectedSection] = useState<"reading-writing" | "math" | null>(null);
  const [difficulty, setDifficulty] = useState<string>("all");
  const [questionLimit] = useState<string>("all"); // Always use all questions

  // SAT Reading and Writing domains
  const readingWritingDomains = [
    {
      name: "Information and Ideas",
      percentage: 26,
      description: "Central ideas, evidence, and inference",
      subdomains: [
        "Central Ideas and Details",
        "Command of Evidence: Quantitative",
        "Command of Evidence: Textual",
        "Inference"
      ],
      color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
      textColor: "text-blue-700"
    },
    {
      name: "Craft and Structure",
      percentage: 28,
      description: "Text connections, structure, and vocabulary",
      subdomains: [
        "Cross-Text Connections",
        "Text Structure and Purpose",
        "Words in Context"
      ],
      color: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
      textColor: "text-purple-700"
    },
    {
      name: "Expression of Ideas",
      percentage: 20,
      description: "Rhetorical synthesis and transitions",
      subdomains: [
        "Rhetorical Synthesis",
        "Transitions"
      ],
      color: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
      textColor: "text-green-700"
    },
    {
      name: "Standard English Conventions",
      percentage: 26,
      description: "Grammar, punctuation, and structure",
      subdomains: [
        "Boundaries",
        "Form, Structure, Sense"
      ],
      color: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20",
      textColor: "text-orange-700"
    }
  ];

  // SAT Math domains
  const mathDomains = [
    {
      name: "Algebra",
      percentage: 35,
      description: "Linear equations, functions, and inequalities",
      subdomains: [
        "Linear equations in 1 variable",
        "Linear equations in 2 variables",
        "Linear functions",
        "Systems of 2 linear equations in 2 variables",
        "Linear inequalities in 1 or 2 variables"
      ],
      color: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
      textColor: "text-emerald-700"
    },
    {
      name: "Advanced Math",
      percentage: 35,
      description: "Nonlinear equations and functions",
      subdomains: [
        "Equivalent expressions",
        "Nonlinear equations in 1 variable and systems of equations in 2 variables",
        "Nonlinear functions"
      ],
      color: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20",
      textColor: "text-red-700"
    },
    {
      name: "Problem-Solving and Data Analysis",
      percentage: 15,
      description: "Statistics, probability, and data interpretation",
      subdomains: [
        "Ratios, rates, proportional relationships, and units",
        "Percentages",
        "One-variable data: distributions and measures of center and spread",
        "Two-variable data: models and scatterplots",
        "Probability and conditional probability",
        "Inference from sample statistics and margin of error",
        "Evaluating statistical claims: observational studies and experiments"
      ],
      color: "bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20",
      textColor: "text-indigo-700"
    },
    {
      name: "Geometry and Trigonometry",
      percentage: 15,
      description: "Shapes, angles, and trigonometric functions",
      subdomains: [
        "Area and volume formulas",
        "Lines, angles, and triangles",
        "Right triangles and trigonometry",
        "Circles"
      ],
      color: "bg-teal-500/10 border-teal-500/20 hover:bg-teal-500/20",
      textColor: "text-teal-700"
    }
  ];

  const buildPracticeUrl = (domain: string, subdomain?: string, isAllQuestions?: boolean) => {
    const params = new URLSearchParams();
    if (isAllQuestions) {
      // Use category instead of domain for "all questions" functionality
      params.set('category', domain);
    } else {
      params.set('domain', domain);
    }
    if (subdomain) params.set('subdomain', subdomain);
    if (difficulty !== 'all') params.set('difficulty', difficulty);
    // When difficulty is "all", automatically shuffle the questions
    if (difficulty === 'all') params.set('shuffle', 'true');
    if (questionLimit !== 'all') params.set('n', questionLimit);
    return `/practice/play?${params.toString()}`;
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'easy':
        return <div className="w-3 h-3 rounded-full bg-green-500"></div>;
      case 'medium':
        return <div className="w-3 h-3 rounded-full bg-yellow-500"></div>;
      case 'hard':
        return <div className="w-3 h-3 rounded-full bg-red-500"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-blue-500"></div>;
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'easy':
        return 'Easy Only';
      case 'medium':
        return 'Medium Only';
      case 'hard':
        return 'Hard Only';
      default:
        return 'All Levels';
    }
  };

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
            <Link to="/practice" className="text-primary font-medium border-b-2 border-primary flex items-center gap-2"><BookOpen className="w-4 h-4" />Practice</Link>
            <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"><Clipboard className="w-4 h-4" />Mocks</Link>
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
              <Link to="/practice" className="text-primary font-medium flex flex-col items-center gap-1 py-2 px-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs">Practice</span>
              </Link>
              <Link to="/mocks" className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 py-2 px-3">
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
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">SAT Practice</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a section to start your targeted practice. Each domain is designed to strengthen specific skills.
          </p>
        </div>

        {/* Section Selection */}
        {!selectedSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Reading and Writing Section */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-blue-500/20"
              onClick={() => setSelectedSection("reading-writing")}
            >
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-blue-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">Reading and Writing</h2>
                    <p className="text-muted-foreground mb-4">
                      Practice reading comprehension, grammar, and writing skills
                    </p>
                    <Badge variant="secondary" className="text-sm">
                      4 Domains Available
                    </Badge>
                  </div>
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Reading & Writing Practice
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Math Section */}
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 border-emerald-500/20"
              onClick={() => setSelectedSection("math")}
            >
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-emerald-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                    <Calculator className="h-10 w-10 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2">Math</h2>
                    <p className="text-muted-foreground mb-4">
                      Practice algebra, advanced math, geometry, and data analysis
                    </p>
                    <Badge variant="secondary" className="text-sm">
                      4 Domains Available
                    </Badge>
                  </div>
                  <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Math Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Domain Selection - Reading and Writing */}
        {selectedSection === "reading-writing" && (
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex justify-start">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSection(null)}
                className="mb-4"
              >
                ← Back to Sections
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Reading and Writing</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Configure your practice settings below.</p>
                </div>
              </div>
              
              {/* Quick Settings */}
              <div className="flex justify-end w-full sm:w-auto">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-full sm:w-32 bg-background/95 backdrop-blur border-2 z-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-2 shadow-lg z-50">
                      <SelectItem value="all">Shuffled</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Practice All Questions</h3>
              <Card className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 shadow-md hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">All Reading & Writing Questions</h4>
                        <p className="text-sm text-muted-foreground">
                          Practice questions from all Reading & Writing domains combined.
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Includes Information and Ideas, Craft and Structure, Expression of Ideas, and Standard English Conventions.
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-800 border-blue-500/30">
                        All Domains
                      </Badge>
                    </div>
                    
                    <Link to={buildPracticeUrl("Reading and Writing", undefined, true)}>
                      <Button variant="outline" className="w-full justify-center border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-500/70" size="sm">
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon()}
                          <span>Practice All Reading & Writing</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Targeted Practice by Domain & Subdomain</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {readingWritingDomains.map((domain, index) => (
                  <Card key={index} className={`transition-all duration-200 ${domain.color}`}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`text-lg font-semibold ${domain.textColor}`}>{domain.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              This domain is {domain.percentage}% of the R&W section.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {domain.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {domain.percentage}%
                          </Badge>
                        </div>
                        
                        <Link to={buildPracticeUrl(domain.name)}>
                          <Button variant="outline" className="w-full justify-center" size="sm">
                            <div className="flex items-center gap-2">
                              {getDifficultyIcon()}
                              <span>Practice This Domain</span>
                            </div>
                          </Button>
                        </Link>
                        
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-muted-foreground mb-2">Practice a subdomain:</p>
                          <div className="space-y-1">
                            {domain.subdomains.map((subdomain, subIndex) => (
                              <Link
                                key={subIndex}
                                to={buildPracticeUrl(domain.name, subdomain)}
                                className="text-sm hover:bg-muted/50 hover:text-foreground rounded p-2 block w-full text-left transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {getDifficultyIcon()}
                                  <span>{subdomain}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Domain Selection - Math */}
        {selectedSection === "math" && (
          <div className="space-y-6">
            {/* Back Button */}
            <div className="flex justify-start">
              <Button 
                variant="outline" 
                onClick={() => setSelectedSection(null)}
                className="mb-4"
              >
                ← Back to Sections
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Math</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">Configure your practice settings below.</p>
                </div>
              </div>
              
              {/* Quick Settings */}
              <div className="flex justify-end w-full sm:w-auto">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-full sm:w-32 bg-background/95 backdrop-blur border-2 z-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-2 shadow-lg z-50">
                      <SelectItem value="all">Shuffled</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-4">Targeted Practice by Domain & Subdomain</h3>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Practice All Questions</h3>
              <Card className="mb-6 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 shadow-md hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">All Math Questions</h4>
                        <p className="text-sm text-muted-foreground">
                          Practice questions from all Math domains combined.
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Includes Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry.
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-800 border-emerald-500/30">
                        All Domains
                      </Badge>
                    </div>
                    
                    <Link to={buildPracticeUrl("Math", undefined, true)}>
                      <Button variant="outline" className="w-full justify-center border-emerald-500/50 hover:bg-emerald-500/10 hover:border-emerald-500/70" size="sm">
                        <div className="flex items-center gap-2">
                          {getDifficultyIcon()}
                          <span>Practice All Math</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {mathDomains.map((domain, index) => (
                  <Card key={index} className={`transition-all duration-200 ${domain.color}`}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`text-lg font-semibold ${domain.textColor}`}>{domain.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              This domain is {domain.percentage}% of the Math section.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {domain.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {domain.percentage}%
                          </Badge>
                        </div>
                        
                        <Link to={buildPracticeUrl(domain.name)}>
                          <Button variant="outline" className="w-full justify-center" size="sm">
                            <div className="flex items-center gap-2">
                              {getDifficultyIcon()}
                              <span>Practice This Domain</span>
                            </div>
                          </Button>
                        </Link>
                        
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium text-muted-foreground mb-2">Practice a subdomain:</p>
                          <div className="space-y-1">
                            {domain.subdomains.map((subdomain, subIndex) => (
                              <Link
                                key={subIndex}
                                to={buildPracticeUrl(domain.name, subdomain)}
                                className="text-sm hover:bg-muted/50 hover:text-foreground rounded p-2 block w-full text-left transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {getDifficultyIcon()}
                                  <span>{subdomain}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;