import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GraduationCap, PlayCircle, Settings, Filter, BookOpen, Target, Clock } from "lucide-react";

const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("adaptive");
  const [instantFeedback, setInstantFeedback] = useState(false);
  const [questionCount, setQuestionCount] = useState("20");

  const topics = [
    { id: "verbal", name: "Verbal Reasoning", questions: 156, accuracy: 75 },
    { id: "quantitative", name: "Quantitative Reasoning", questions: 142, accuracy: 62 },
    { id: "decision", name: "Decision Making", questions: 98, accuracy: 78 },
    { id: "abstract", name: "Abstract Reasoning", questions: 134, accuracy: 84 }
  ];

  const recommendedSessions = [
    {
      title: "Quantitative Reasoning Focus",
      description: "Your weakest area - time to improve",
      difficulty: "Medium",
      questions: 25,
      time: "35 min",
      priority: "high"
    },
    {
      title: "Mixed Practice Session",
      description: "Balanced practice across all topics",
      difficulty: "Adaptive",
      questions: 20,
      time: "30 min",
      priority: "medium"
    },
    {
      title: "Speed Practice",
      description: "Focus on improving your pace",
      difficulty: "Easy",
      questions: 15,
      time: "20 min",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold">UniHack.ai</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/practice" className="text-primary font-medium">Practice</Link>
            <Link to="/mocks" className="text-muted-foreground hover:text-foreground">Mocks</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground">Analytics</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Practice Session</h1>
          <p className="text-muted-foreground">
            Choose your practice mode and start improving your skills
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
                <CardDescription>Customize your practice session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      <SelectItem value="verbal">Verbal Reasoning</SelectItem>
                      <SelectItem value="quantitative">Quantitative Reasoning</SelectItem>
                      <SelectItem value="decision">Decision Making</SelectItem>
                      <SelectItem value="abstract">Abstract Reasoning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <Card key={index} className="question-card">
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
                            <Badge variant="outline" className={`difficulty-${session.difficulty.toLowerCase()}`}>
                              {session.difficulty}
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

            {/* Topic Performance */}
            <div>
              <h2 className="text-xl font-display font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Practice by Topic
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <Card key={topic.id} className="question-card cursor-pointer hover:shadow-academic-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{topic.name}</h3>
                        <Badge variant="outline" className={topic.accuracy >= 70 ? 'bg-success-light' : 'bg-warning-light'}>
                          {topic.accuracy}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {topic.questions} questions available
                      </p>
                      <Button variant="outline" className="w-full">
                        Practice {topic.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;