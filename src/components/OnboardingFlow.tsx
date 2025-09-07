import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Calendar,
  CalendarIcon,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Search,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { admissionTests, getEnabledExams, isExamEnabled } from "@/data/admissionTests";
import { universities } from "@/data/universities";
import { universityExamMap, requiresCourseSpecification } from "@/data/universityExamMap";
import { ProfileAPI } from "@/lib/profile-api";
import type { ExamType } from "@/types/profile";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BrandFrame from "@/components/layouts/BrandFrame";
import { getRelevantUniversities, getExamRecommendations } from "@/lib/universityFilters";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  examTypes: ExamType[];
  examDate: Date | null;
  targetUniversities: string[];
  targetCourses: string[];
  universitySearch: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signIn, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(user ? 2 : 1); // Skip account creation if already logged in
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    examTypes: [],
    examDate: null,
    targetUniversities: [],
    targetCourses: [],
    universitySearch: ""
  });

  const steps = [
    { title: "Create Account", description: "Get started with your journey" },
    { title: "Select Exams", description: "Choose your admission tests" },
    { title: "Exam Date", description: "When is your exam?" },
    { title: "Target Universities", description: "Where do you want to study?" },
    { title: "Complete Setup", description: "Review and confirm" }
  ];

  const totalSteps = steps.length;

  // Skip account creation if user is already logged in
  useEffect(() => {
    if (user && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [user, currentStep]);

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, user ? 2 : 1));
  };

  const validateStep = (): boolean => {
    const stepErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1: // Account creation
        if (!formData.name.trim()) stepErrors.name = "Name is required";
        if (!formData.email.trim()) stepErrors.email = "Email is required";
        if (!formData.password.trim()) stepErrors.password = "Password is required";
        if (formData.password.length < 6) stepErrors.password = "Password must be at least 6 characters";
        break;

      case 2: // Exam selection
        if (formData.examTypes.length === 0) stepErrors.examTypes = "Please select at least one exam";
        break;

      case 3: // Exam date
        if (!formData.examDate) stepErrors.examDate = "Please select an exam date";
        else {
          const today = new Date();
          const maxDate = new Date();
          maxDate.setMonth(maxDate.getMonth() + 24);
          if (formData.examDate < today) stepErrors.examDate = "Exam date must be in the future";
          if (formData.examDate > maxDate) stepErrors.examDate = "Exam date must be within 24 months";
        }
        break;

      case 4: // Universities
        if (formData.targetUniversities.length === 0) stepErrors.targetUniversities = "Please select at least one university";
        
        // Check if course specification is required
        const requiresCourses = formData.targetUniversities.some(uniId => 
          formData.examTypes.some(examType => 
            requiresCourseSpecification(uniId, examType)
          )
        );
        
        if (requiresCourses && formData.targetCourses.length === 0) {
          stepErrors.targetCourses = "Please specify your intended courses for selected universities";
        }
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      // Step 1: Handle account creation if needed
      if (!user && currentStep === 1) {
        const result = await signUp(formData.email, formData.password, formData.name);
        if (result.error) {
          throw new Error(result.error || "Failed to create account");
        }
        nextStep();
        return;
      }

      // Final submission: Save profile data
      if (currentStep === totalSteps) {
        if (!formData.examDate) {
          throw new Error("Exam date is required");
        }

        await ProfileAPI.saveOnboardingData({
          examTypes: formData.examTypes,
          examDate: format(formData.examDate, "yyyy-MM-dd"),
          targetUniversities: formData.targetUniversities,
          targetCourses: formData.targetCourses.length > 0 ? formData.targetCourses : undefined
        });

        toast({
          title: "Setup Complete!",
          description: "Your profile has been saved successfully.",
        });

        onComplete();
        navigate("/dashboard");
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter universities based on selected exam types
  const relevantUniversities = getRelevantUniversities(universities, formData.examTypes);
  
  const filteredUniversities = relevantUniversities.filter(uni =>
    uni.name.toLowerCase().includes(formData.universitySearch.toLowerCase()) ||
    uni.aliases?.some(alias => alias.toLowerCase().includes(formData.universitySearch.toLowerCase()))
  );

  const getSelectedUniversityNames = () => {
    return formData.targetUniversities.map(id => {
      const uni = universities.find(u => u.id === id);
      return uni?.name || id;
    });
  };

  const toggleUniversity = (universityId: string) => {
    setFormData(prev => ({
      ...prev,
      targetUniversities: prev.targetUniversities.includes(universityId)
        ? prev.targetUniversities.filter(id => id !== universityId)
        : [...prev.targetUniversities, universityId]
    }));
  };

  const removeUniversity = (universityId: string) => {
    setFormData(prev => ({
      ...prev,
      targetUniversities: prev.targetUniversities.filter(id => id !== universityId)
    }));
  };

  const addCourse = (course: string) => {
    if (course.trim() && !formData.targetCourses.includes(course.trim())) {
      setFormData(prev => ({
        ...prev,
        targetCourses: [...prev.targetCourses, course.trim()]
      }));
    }
  };

  const removeCourse = (course: string) => {
    setFormData(prev => ({
      ...prev,
      targetCourses: prev.targetCourses.filter(c => c !== course)
    }));
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
              index + 1 <= currentStep 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-background text-muted-foreground border-muted"
            )}>
              {index + 1 <= currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-16 h-0.5 mx-2 transition-colors",
                index + 1 < currentStep ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="font-semibold">{steps[currentStep - 1]?.title}</h3>
        <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>Start your journey to university success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                  />
                </div>
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Select Your Admission Tests</CardTitle>
              <CardDescription>Choose the exams you're preparing for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {admissionTests.map((test) => {
                  const isSelected = formData.examTypes.includes(test.id as ExamType);
                  const isDisabled = !test.enabled;
                  
                  return (
                    <div
                      key={test.id}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg border p-4 transition-colors",
                        isDisabled 
                          ? "opacity-50 cursor-not-allowed bg-muted/30"
                          : "cursor-pointer",
                        isSelected && !isDisabled
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      )}
                      onClick={() => {
                        if (isDisabled) {
                          toast({
                            title: "Coming Soon",
                            description: `${test.name} will be available soon. Stay tuned!`,
                          });
                          return;
                        }
                        
                        const examType = test.id as ExamType;
                        setFormData(prev => ({
                          ...prev,
                          examTypes: prev.examTypes.includes(examType)
                            ? prev.examTypes.filter(t => t !== examType)
                            : [...prev.examTypes, examType]
                        }));
                      }}
                      role="button"
                      tabIndex={isDisabled ? -1 : 0}
                      aria-disabled={isDisabled}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (!isDisabled) {
                            const examType = test.id as ExamType;
                            setFormData(prev => ({
                              ...prev,
                              examTypes: prev.examTypes.includes(examType)
                                ? prev.examTypes.filter(t => t !== examType)
                                : [...prev.examTypes, examType]
                            }));
                          }
                        }
                      }}
                    >
                      <Checkbox 
                        checked={isSelected && !isDisabled}
                        disabled={isDisabled}
                        onChange={() => {}}
                        tabIndex={-1}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{test.name}</h4>
                          {isDisabled && (
                            <Badge variant="secondary" className="text-xs">
                              {test.note || "Coming soon"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Topics: {test.topics.slice(0, 3).join(", ")}
                          {test.topics.length > 3 && ` +${test.topics.length - 3} more`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.examTypes && <p className="text-sm text-red-500 mt-4">{errors.examTypes}</p>}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">When is your exam?</CardTitle>
              <CardDescription>Select your target exam date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Exam Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.examDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.examDate ? format(formData.examDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarPicker
                      mode="single"
                      selected={formData.examDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, examDate: date }))}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 24 * 30 * 24 * 60 * 60 * 1000)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {errors.examDate && <p className="text-sm text-red-500 mt-1">{errors.examDate}</p>}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        const requiresCourses = formData.targetUniversities.some(uniId => 
          formData.examTypes.some(examType => 
            requiresCourseSpecification(uniId, examType)
          )
        );

        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Target Universities</CardTitle>
              <CardDescription>Where do you want to study?</CardDescription>
              {formData.examTypes.length > 0 && relevantUniversities.length < universities.length && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <CheckCircle2 className="inline h-4 w-4 mr-1" />
                    Showing universities relevant to {formData.examTypes.join(", ")} 
                    ({relevantUniversities.length} of {universities.length} universities)
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* University Search */}
              <div>
                <Label>Search Universities</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search universities..."
                    value={formData.universitySearch}
                    onChange={(e) => setFormData(prev => ({ ...prev, universitySearch: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Selected Universities */}
              {formData.targetUniversities.length > 0 && (
                <div>
                  <Label>Selected Universities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getSelectedUniversityNames().map((name, index) => (
                      <Badge key={index} variant="secondary" className="pr-1">
                        {name}
                        <button
                          onClick={() => removeUniversity(formData.targetUniversities[index])}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* University List */}
              <div className="max-h-60 overflow-y-auto border rounded-lg">
                {filteredUniversities.slice(0, 20).map((university) => (
                  <div
                    key={university.id}
                    className={cn(
                      "flex items-center justify-between p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50",
                      formData.targetUniversities.includes(university.id) && "bg-primary/5 border-primary/20"
                    )}
                    onClick={() => toggleUniversity(university.id)}
                  >
                    <div>
                      <div className="font-medium">{university.name}</div>
                      <div className="text-sm text-muted-foreground">{university.country}</div>
                    </div>
                    <Checkbox 
                      checked={formData.targetUniversities.includes(university.id)}
                      onChange={() => {}}
                    />
                  </div>
                ))}
              </div>

              {/* Course Requirements */}
              {requiresCourses && (
                <div>
                  <Label>Intended Courses</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Some selected universities require course specification for your chosen exams.
                  </p>
                  
                  {formData.targetCourses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.targetCourses.map((course, index) => (
                        <Badge key={index} variant="outline" className="pr-1">
                          {course}
                          <button
                            onClick={() => removeCourse(course)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Input
                    placeholder="Enter course name and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCourse(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              )}

              {errors.targetUniversities && <p className="text-sm text-red-500">{errors.targetUniversities}</p>}
              {errors.targetCourses && <p className="text-sm text-red-500">{errors.targetCourses}</p>}
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Complete Your Setup</CardTitle>
              <CardDescription>Review your information and get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Selected Exams
                  </h4>
                  <p className="text-muted-foreground ml-6">{formData.examTypes.join(", ")}</p>
                </div>

                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Exam Date
                  </h4>
                  <p className="text-muted-foreground ml-6">
                    {formData.examDate ? format(formData.examDate, "PPP") : "Not set"}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Target Universities
                  </h4>
                  <p className="text-muted-foreground ml-6">{getSelectedUniversityNames().join(", ")}</p>
                </div>

                {formData.targetCourses.length > 0 && (
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Intended Courses
                    </h4>
                    <p className="text-muted-foreground ml-6">{formData.targetCourses.join(", ")}</p>
                  </div>
                )}
              </div>

              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Ready to start your journey!</h4>
                <p className="text-sm text-muted-foreground">
                  Your personalized study plan is waiting for you.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <BrandFrame>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          {renderProgressBar()}
          
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            {currentStep > (user ? 2 : 1) && (
              <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            <Button onClick={handleSubmit} disabled={isLoading} className="min-w-32">
              {isLoading ? (
                "Please wait..."
              ) : currentStep === totalSteps ? (
                "Complete Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </BrandFrame>
  );
};

export default OnboardingFlow;