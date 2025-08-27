import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Search, MapPin, Clock, Users } from "lucide-react";

// Mock exam data - replace with actual API
const exams = [
  {
    id: "ucat",
    name: "UCAT",
    fullName: "University Clinical Aptitude Test",
    description: "Required for medicine and dentistry applications in UK, Australia, and New Zealand",
    region: "UK",
    duration: "2 hours",
    sections: ["Verbal Reasoning", "Decision Making", "Quantitative Reasoning", "Abstract Reasoning", "Situational Judgement"],
    students: "30,000+"
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    description: "Standardized test for college admissions in the United States",
    region: "US",
    duration: "3 hours",
    sections: ["Reading and Writing", "Math"],
    students: "2M+"
  },
  {
    id: "act",
    name: "ACT",
    fullName: "American College Testing",
    description: "Standardized test for college admissions in the United States",
    region: "US",
    duration: "3 hours",
    sections: ["English", "Math", "Reading", "Science", "Writing (Optional)"],
    students: "1.8M+"
  },
  {
    id: "step",
    name: "STEP",
    fullName: "Sixth Term Examination Paper",
    description: "Mathematics examination for Cambridge and other top UK universities",
    region: "UK",
    duration: "3 hours",
    sections: ["Pure Mathematics", "Mechanics", "Statistics"],
    students: "5,000+"
  },
  {
    id: "mat",
    name: "MAT",
    fullName: "Mathematics Admissions Test",
    description: "Required for mathematics courses at Oxford and other universities",
    region: "UK",
    duration: "2.5 hours",
    sections: ["Multiple Choice", "Longer Problems"],
    students: "3,000+"
  }
];

const ExamPicker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || exam.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold">UniHack.ai</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Choose Your Exam</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the university entrance exam you're preparing for to get started with personalized study plans.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="EU">European Union</SelectItem>
              <SelectItem value="INTL">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exam Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredExams.map((exam) => (
            <Card 
              key={exam.id} 
              className={`question-card cursor-pointer transition-all duration-200 ${
                selectedExam === exam.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-academic-lg'
              }`}
              onClick={() => handleExamSelect(exam.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-display">{exam.name}</CardTitle>
                    <CardDescription className="text-sm font-medium">{exam.fullName}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {exam.region}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration: {exam.duration}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {exam.students} students annually
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Sections:</p>
                  <div className="flex flex-wrap gap-1">
                    {exam.sections.slice(0, 3).map((section) => (
                      <Badge key={section} variant="secondary" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                    {exam.sections.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{exam.sections.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Button */}
        {selectedExam && (
          <div className="text-center animate-slide-up">
            <Link to="/diagnostic">
              <Button size="lg" className="px-8">
                Start Diagnostic Test
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Begin with a 30-minute diagnostic to assess your current level
            </p>
          </div>
        )}

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No exams found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPicker;