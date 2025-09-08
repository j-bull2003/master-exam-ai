import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

import { 
  GraduationCap, 
  Upload, 
  FileText, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Package,
  Plus,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TutorStudio = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Mock data for content packs
  const contentPacks = [
    {
      id: "pack-1",
      name: "SAT Reading and Writing Advanced",
      status: "published",
      version: "2.1",
      questions: 156,
      createdAt: "2024-01-15",
      downloads: 1247
    },
    {
      id: "pack-2",
      name: "Quantitative Reasoning Basics",
      status: "review",
      version: "1.0",
      questions: 89,
      createdAt: "2024-01-10",
      downloads: 0
    },
    {
      id: "pack-3",
      name: "Decision Making Practice Set",
      status: "draft",
      version: "0.8",
      questions: 67,
      createdAt: "2024-01-08",
      downloads: 0
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} ready for validation`,
      });
    }
  };

  const handleValidateContent = () => {
    toast({
      title: "Validation complete",
      description: "All questions passed validation checks",
    });
  };

  const handlePublish = (packId: string) => {
    toast({
      title: "Content pack published",
      description: "Your content is now available to students",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/tutor-studio"
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
            <Link to="/tutor-studio" className="text-primary font-medium">Tutor Studio</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Tutor Studio</h1>
          <p className="text-muted-foreground">
            Create and manage your educational content for students
          </p>
        </div>

        <Tabs defaultValue="content-packs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content-packs">Content Packs</TabsTrigger>
            <TabsTrigger value="upload">Upload Content</TabsTrigger>
            <TabsTrigger value="editor">Question Editor</TabsTrigger>
          </TabsList>

          {/* Content Packs Tab */}
          <TabsContent value="content-packs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">My Content Packs</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Pack
              </Button>
            </div>

            <div className="grid gap-4">
              {contentPacks.map((pack) => (
                <Card key={pack.id} className="question-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{pack.name}</h3>
                          <Badge 
                            variant={
                              pack.status === 'published' ? 'default' :
                              pack.status === 'review' ? 'secondary' : 'outline'
                            }
                            className="flex items-center space-x-1"
                          >
                            {pack.status === 'published' && <CheckCircle className="h-3 w-3" />}
                            {pack.status === 'review' && <Clock className="h-3 w-3" />}
                            {pack.status === 'draft' && <AlertCircle className="h-3 w-3" />}
                            <span className="capitalize">{pack.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <div>
                            <span className="font-medium">{pack.questions}</span> questions
                          </div>
                          <div>
                            Version <span className="font-medium">{pack.version}</span>
                          </div>
                          <div>
                            Created {new Date(pack.createdAt).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">{pack.downloads}</span> downloads
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        {pack.status === 'draft' && (
                          <Button size="sm" onClick={() => handlePublish(pack.id)}>
                            Publish
                          </Button>
                        )}
                        {pack.status === 'published' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upload Content Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Bulk Upload Questions
                  </CardTitle>
                  <CardDescription>
                    Upload CSV or Markdown files with your questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Choose File</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".csv,.md,.markdown"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    {selectedFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exam">Target Exam</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ucat">UCAT</SelectItem>
                        <SelectItem value="sat">SAT</SelectItem>
                        <SelectItem value="act">ACT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verbal">Verbal Reasoning</SelectItem>
                        <SelectItem value="quantitative">Quantitative Reasoning</SelectItem>
                        <SelectItem value="decision">Decision Making</SelectItem>
                        <SelectItem value="abstract">Abstract Reasoning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!selectedFile}
                    onClick={handleValidateContent}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate & Preview
                  </Button>
                </CardContent>
              </Card>

              {/* Templates & Guidelines */}
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Templates & Guidelines
                  </CardTitle>
                  <CardDescription>
                    Download templates and learn the content format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">CSV Template</h4>
                    <p className="text-sm text-muted-foreground">
                      Structured spreadsheet format for bulk question upload
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV Template
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Markdown Template</h4>
                    <p className="text-sm text-muted-foreground">
                      Human-friendly format with YAML front-matter
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Markdown Template
                    </Button>
                  </div>

                  <div className="bg-accent/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Content Guidelines</h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• All questions must be original content</li>
                      <li>• Include detailed explanations</li>
                      <li>• Tag difficulty levels accurately</li>
                      <li>• Support LaTeX for mathematical content</li>
                      <li>• Images should be high quality</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Question Editor Tab */}
          <TabsContent value="editor" className="space-y-6">
            <Card className="question-card">
              <CardHeader>
                <CardTitle>Individual Question Editor</CardTitle>
                <CardDescription>
                  Create and edit questions one at a time with live preview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Editor Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="question-type">Question Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sc">Single Choice</SelectItem>
                            <SelectItem value="mc">Multiple Choice</SelectItem>
                            <SelectItem value="num">Numeric</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stem">Question Stem</Label>
                      <Textarea
                        id="stem"
                        placeholder="Enter the question text here. You can use LaTeX for math: $x^2 + y^2 = z^2$"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Answer Choices</Label>
                      <div className="space-y-2">
                        {['A', 'B', 'C', 'D'].map((option) => (
                          <Input
                            key={option}
                            placeholder={`Option ${option}`}
                            className="pl-8"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="explanation">Explanation</Label>
                      <Textarea
                        id="explanation"
                        placeholder="Provide a detailed explanation of the correct answer"
                        rows={3}
                      />
                    </div>

                    <Button className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      Save Question
                    </Button>
                  </div>

                  {/* Live Preview */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Live Preview</h3>
                    <Card className="p-4 bg-muted/30">
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          Preview will appear here as you type...
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorStudio;