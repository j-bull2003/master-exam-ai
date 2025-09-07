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
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { admissionTests } from "@/data/admissionTests";
import { universityRequirements } from "@/data/universityRequirements";
import { ProfileAPI } from "@/lib/profile-api";
import type { ExamType } from "@/types/profile";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  examType: ExamType | "";
  examDate: Date | null;
  targetUniversity: string;
  targetCourse: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    examType: "",
    examDate: null,
    targetUniversity: "",
    targetCourse: "",
  });

  // Focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Get available universities
  const availableUniversities = universityRequirements;
  
  // Check if selected university has specific exam requirements
  const selectedUniversityReq = universityRequirements.find(
    uni => uni.universityId === formData.targetUniversity || uni.universityName === formData.targetUniversity
  );
  
  const shouldShowCourseInput = selectedUniversityReq && 
    (selectedUniversityReq.specificity === "VARIES" || selectedUniversityReq.specificity === "UNKNOWN");

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name";
    }
    
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.examType) {
      newErrors.examType = "Please select an exam type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.examDate) {
      newErrors.examDate = "Please select an exam date";
    } else {
      const selectedDate = new Date(formData.examDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        newErrors.examDate = "Exam date must be in the future";
      }
      
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 24);
      if (selectedDate > maxDate) {
        newErrors.examDate = "Exam date cannot be more than 24 months in the future";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (shouldShowCourseInput && !formData.targetCourse.trim()) {
      newErrors.targetCourse = "Please enter your intended course";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    } else if (currentStep === 4) {
      isValid = validateStep4();
    }
    
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;
    
    setIsLoading(true);
    try {
      // Sign up the user with Supabase
      const { error: authError } = await signUp(
        formData.email,
        formData.password,
        formData.name.split(' ')[0], // first name
        formData.name.split(' ').slice(1).join(' ') // last name
      );

      if (authError) {
        console.error('Registration error:', authError);
        throw new Error(authError.message || 'Registration failed');
      }

      // Wait a moment for the user to be created and profile triggered
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save onboarding data to profile
      await ProfileAPI.saveOnboardingData({
        examType: formData.examType as ExamType,
        examDate: formData.examDate!.toISOString().split('T')[0],
        targetUniversity: formData.targetUniversity,
        targetCourse: formData.targetCourse || undefined,
      });

      console.log('User registered and onboarding data saved successfully');
      
      toast({
        title: "Welcome to UniHack.ai!",
        description: "Your account has been created and your study plan is ready.",
      });

      // Navigate to dashboard instead of calling onComplete
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration/onboarding error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      if (currentStep < 5) {
        nextStep();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-4">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center group">
            <img 
              src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
              alt="UniHack.ai Logo" 
              className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step < currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : step === currentStep 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-0.5 transition-colors duration-300 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="ai-glass-card backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {currentStep === 1 && "Create Your Account"}
              {currentStep === 2 && "Choose Your Exam"}
              {currentStep === 3 && "Set Your Exam Date"}
              {currentStep === 4 && "Target University"}
              {currentStep === 5 && "Ready to Start!"}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {currentStep === 1 && "Let's get you set up with a secure account"}
              {currentStep === 2 && "Select the exam you're preparing for"}
              {currentStep === 3 && "When are you planning to take your exam?"}
              {currentStep === 4 && "Which university are you targeting?"}
              {currentStep === 5 && "You're all set! Time to begin your journey"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Account Creation */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {errors.submit && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      ref={nameInputRef}
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.name ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                      }}
                      onKeyDown={handleKeyDown}
                      aria-invalid={!!errors.name}
                    />
                    {!errors.name && formData.name && formData.name.length >= 2 && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.email ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      onKeyDown={handleKeyDown}
                      aria-invalid={!!errors.email}
                    />
                    {!errors.email && formData.email && /\S+@\S+\.\S+/.test(formData.email) && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className={`pl-12 pr-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.password ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, password: e.target.value }));
                        if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                      }}
                      onKeyDown={handleKeyDown}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                  {!errors.password && (
                    <p className="text-sm text-muted-foreground">
                      Must be at least 8 characters with uppercase, lowercase, and number
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Exam Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Choose the exam you're preparing for to get personalized practice content
                  </p>
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    Currently available: {admissionTests.map(e => e.name).join(', ')}
                  </p>
                </div>

                <RadioGroup 
                  value={formData.examType} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, examType: value as ExamType }));
                    if (errors.examType) setErrors(prev => ({ ...prev, examType: "" }));
                  }}
                  className="space-y-4"
                >
                  {admissionTests.map((exam) => (
                    <div key={exam.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={exam.id} id={exam.id} />
                      <div className="flex-1 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, examType: exam.id as ExamType }))}>
                        <Card className={`transition-all duration-200 hover:shadow-md ${
                          formData.examType === exam.id ? 'ring-2 ring-primary border-primary' : 'border-input'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{exam.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {exam.topics.length} topics: {exam.topics.slice(0, 3).join(', ')}
                                  {exam.topics.length > 3 && '...'}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {errors.examType && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.examType}
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Exam Date */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    When are you planning to take your {formData.examType} exam?
                  </p>
                </div>

                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !formData.examDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.examDate ? format(formData.examDate, "PPP") : <span>Pick an exam date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarPicker
                        mode="single"
                        selected={formData.examDate || undefined}
                        onSelect={(date) => {
                          setFormData(prev => ({ ...prev, examDate: date || null }));
                          if (errors.examDate) setErrors(prev => ({ ...prev, examDate: "" }));
                        }}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {errors.examDate && (
                  <p className="text-sm text-destructive flex items-center gap-2 justify-center">
                    <AlertCircle className="w-4 h-4" />
                    {errors.examDate}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: University Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">
                    Which university are you targeting? (Optional)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">Target University</Label>
                    <Select
                      value={formData.targetUniversity}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, targetUniversity: value }));
                        // Auto-suggest exam type if university has exact requirement
                        const universityReq = universityRequirements.find(
                          uni => uni.universityId === value || uni.universityName === value
                        );
                        if (universityReq?.specificity === "EXACT" && universityReq.defaultExamType && !formData.examType) {
                          setFormData(prev => ({ ...prev, examType: universityReq.defaultExamType as ExamType }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                      <SelectContent>
                        {universityRequirements.map((uni) => (
                          <SelectItem key={uni.universityId} value={uni.universityId}>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              {uni.universityName}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {shouldShowCourseInput && (
                    <div className="space-y-2">
                      <Label htmlFor="course">Intended Course</Label>
                      <Input
                        id="course"
                        value={formData.targetCourse}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, targetCourse: e.target.value }));
                          if (errors.targetCourse) setErrors(prev => ({ ...prev, targetCourse: "" }));
                        }}
                        placeholder="e.g., Medicine, Mathematics, Computer Science"
                      />
                      {selectedUniversityReq && (
                        <p className="text-sm text-muted-foreground">
                          {selectedUniversityReq.notes}
                        </p>
                      )}
                      {errors.targetCourse && (
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {errors.targetCourse}
                        </p>
                      )}
                    </div>
                  )}

                  {selectedUniversityReq && !shouldShowCourseInput && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {selectedUniversityReq.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Welcome to UniHack.ai!</h3>
                    <p className="text-muted-foreground">
                      Your account will be created and you'll be ready to start practicing for your {formData.examType} exam.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 text-left max-w-md mx-auto">
                    <h4 className="font-semibold mb-2">Your Study Plan:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Exam:</span>
                        <span>{formData.examType}</span>
                      </div>
                      {formData.examDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Exam Date:</span>
                          <span>{format(formData.examDate, "MMM d, yyyy")}</span>
                        </div>
                      )}
                      {formData.targetUniversity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target:</span>
                          <span>{universityRequirements.find(u => u.universityId === formData.targetUniversity)?.universityName || formData.targetUniversity}</span>
                        </div>
                      )}
                      {formData.targetCourse && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Course:</span>
                          <span>{formData.targetCourse}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              
              <div className={currentStep === 1 ? "ml-auto" : ""}>
                {currentStep < 5 ? (
                  <Button onClick={nextStep} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Trusted by 10,000+ students</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Free 7-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;