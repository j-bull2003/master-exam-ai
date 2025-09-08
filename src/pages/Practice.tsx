import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  PlayCircle, 
  Settings, 
  Filter, 
  BookOpen, 
  Target, 
  Clock, 
  LogOut, 
  Home, 
  BarChart3, 
  Clipboard, 
  User,
  Calculator,
  ChevronRight,
  TrendingUp
} from "lucide-react";

const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

const Practice = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSubdomain, setSelectedSubdomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("adaptive");
  const [instantFeedback, setInstantFeedback] = useState(false);
  const [questionCount, setQuestionCount] = useState("20");

  // Exact SAT structure with domains and subdomains
  const satStructure = {
    "reading-writing": {
      name: "Reading and Writing",
      icon: BookOpen,
      color: "blue",
      domains: {
        "information-ideas": {
          name: "Information and Ideas",
          percentage: 26,
          subdomains: [
            "Central Ideas and Details",
            "Command of Evidence: Quantitative", 
            "Command of Evidence: Textual",
            "Inference"
          ]
        },
        "craft-structure": {
          name: "Craft and Structure", 
          percentage: 28,
          subdomains: [
            "Cross-Text Connections",
            "Text Structure and Purpose",
            "Words in Context"
          ]
        },
        "expression-ideas": {
          name: "Expression of Ideas",
          percentage: 20,
          subdomains: [
            "Rhetorical Synthesis",
            "Transitions"
          ]
        },
        "standard-english": {
          name: "Standard English Conventions",
          percentage: 26,
          subdomains: [
            "Boundaries",
            "Form, Structure, Sense"
          ]
        }
      }
    },
    "math": {
      name: "Math",
      icon: Calculator,
      color: "emerald",
      domains: {
        "algebra": {
          name: "Algebra",
          percentage: 35,
          subdomains: [
            "Linear equations in 1 variable",
            "Linear equations in 2 variables", 
            "Linear functions",
            "Systems of 2 linear equations in 2 variables",
            "Linear inequalities in 1 or 2 variables"
          ]
        },
        "advanced-math": {
          name: "Advanced Math",
          percentage: 35,
          subdomains: [
            "Equivalent expressions",
            "Nonlinear equations in 1 variable and systems of equations in 2 variables",
            "Nonlinear functions"
          ]
        },
        "problem-solving-data": {
          name: "Problem-Solving and Data Analysis",
          percentage: 15,
          subdomains: [
            "Ratios, rates, proportional relationships, and units",
            "Percentages",
            "One-variable data: distributions and measures of center and spread",
            "Two-variable data: models and scatterplots",
            "Probability and conditional probability",
            "Inference from sample statistics and margin of error",
            "Evaluating statistical claims: observational studies and experiments"
          ]
        },
        "geometry-trigonometry": {
          name: "Geometry and Trigonometry",
          percentage: 15,
          subdomains: [
            "Area and volume formulas",
            "Lines, angles, and triangles",
            "Right triangles and trigonometry",
            "Circles"
          ]
        }
      }
    }
  };

  const recommendedSessions = [
    {
      title: "Advanced Math Focus",
      description: "Your weakest area - time to improve",
      section: "Math",
      domain: "Advanced Math",
      difficulty: "Medium",
      questions: 25,
      time: "35 min",
      priority: "high"
    },
    {
      title: "Craft and Structure Practice",
      description: "Reading & Writing improvement focus",
      section: "Reading and Writing", 
      domain: "Craft and Structure",
      difficulty: "Medium",
      questions: 20,
      time: "30 min",
      priority: "high"
    },
    {
      title: "Mixed Practice Session",
      description: "Balanced practice across all topics",
      section: "All Sections",
      domain: "Mixed",
      difficulty: "Adaptive",
      questions: 20,
      time: "30 min",
      priority: "medium"
    }
  ];

  const getSelectedDomains = () => {
    if (!selectedSection || selectedSection === "all") return [];
    return Object.entries(satStructure[selectedSection as keyof typeof satStructure]?.domains || {});
  };

  const getSelectedSubdomains = () => {
    if (!selectedSection || !selectedDomain || selectedSection === "all" || selectedDomain === "all") return [];
    const section = satStructure[selectedSection as keyof typeof satStructure];
    if (!section || !section.domains) return [];
    const domains = section.domains as any;
    const domain = domains[selectedDomain];
    return domain?.subdomains || [];
  };

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">SAT Practice Session</h1>
          <p className="text-muted-foreground">
            Choose your SAT section, domain, and subdomain to start targeted practice
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Practice Settings */}
          <div className="lg:col-span-1">
            <Card className="question-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Practice Settings
                </CardTitle>
                <CardDescription>Customize your SAT practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="section">SAT Section</Label>
                  <Select value={selectedSection} onValueChange={(value) => {
                    setSelectedSection(value);
                    setSelectedDomain("");
                    setSelectedSubdomain("");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      <SelectItem value="reading-writing">Reading and Writing</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedSection && selectedSection !== "all" && (
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Select value={selectedDomain} onValueChange={(value) => {
                      setSelectedDomain(value);
                      setSelectedSubdomain("");
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Domains</SelectItem>
                        {getSelectedDomains().map(([key, domain]) => (
                          <SelectItem key={key} value={key}>
                            {domain.name} ({domain.percentage}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedDomain && selectedDomain !== "all" && (
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">Subdomain</Label>
                    <Select value={selectedSubdomain} onValueChange={setSelectedSubdomain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subdomain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subdomains</SelectItem>
                        {getSelectedSubdomains().map((subdomain, index) => (
                          <SelectItem key={index} value={subdomain}>
                            {subdomain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adaptive">Adaptive</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="count">Number of Questions</Label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="30">30 Questions</SelectItem>
                      <SelectItem value="50">50 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="feedback"
                    checked={instantFeedback}
                    onCheckedChange={setInstantFeedback}
                  />
                  <Label htmlFor="feedback">Instant feedback</Label>
                </div>

                <Button className="w-full" size="lg">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Sessions */}
            <div>
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Recommended for You
              </h2>
              <div className="grid gap-4">
                {recommendedSessions.map((session, index) => (
                  <Card key={index} className="question-card hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{session.title}</h3>
                            <Badge 
                              variant={session.priority === 'high' ? 'destructive' : 
                                      session.priority === 'medium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {session.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1" />
                              {session.questions} questions
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {session.time}
                            </span>
                            <Badge variant="outline">
                              {session.section} - {session.domain}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SAT Sections Overview */}
            <div>
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Practice by SAT Section
              </h2>
              <div className="grid gap-4">
                {Object.entries(satStructure).map(([sectionKey, section]) => {
                  const IconComponent = section.icon;
                  return (
                    <Card key={sectionKey} className="question-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-${section.color}-500/20 rounded-lg`}>
                              <IconComponent className={`h-5 w-5 text-${section.color}-600`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{section.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {Object.keys(section.domains).length} domains available
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedSection(sectionKey)}
                          >
                            <ChevronRight className="h-4 w-4 mr-1" />
                            Select
                          </Button>
                        </div>
                        
                        {/* Domain breakdown */}
                        <div className="grid md:grid-cols-2 gap-3">
                          {Object.entries(section.domains).map(([domainKey, domain]) => (
                            <div key={domainKey} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{domain.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {domain.percentage}%
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {domain.subdomains.length} subdomains
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;