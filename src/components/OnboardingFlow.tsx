import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Search, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Shield,
  Calendar,
  CalendarIcon,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/auth-api";
import { ONBOARDING_EXAMS } from "@/data/examConfig";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  examType: string;
  examDate: Date | null;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
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
  });

  // Focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const examTypes = ONBOARDING_EXAMS.map(exam => ({
    id: exam.id.toUpperCase(),
    name: exam.name,
    description: exam.fullName,
    universities: exam.universities || [],
    scoreRange: exam.scoreRange || 'N/A'
  }));

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

  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }
    
    if (isValid && currentStep < 3) {
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
    setIsLoading(true);
    try {
      // Sign up the user with Django
      const { user: authUser, error: authError } = await authAPI.register(
        formData.email,
        formData.password,
        formData.name.split(' ')[0], // first name
        formData.name.split(' ').slice(1).join(' ') // last name
      );

      if (authError) {
        console.error('Registration error:', authError);
        throw new Error(authError);
      }

      console.log('User registered successfully:', formData.email);
      
      toast({
        title: "Registration successful!",
        description: "Welcome to UniHack.ai! Check your email to verify your account.",
      });

      onComplete();
    } catch (error: any) {
      console.error('Registration error:', error);
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
      if (currentStep < 3) {
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
            {[1, 2, 3].map((step) => (
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
                {step < 3 && (
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
              {currentStep === 3 && "Ready to Start!"}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {currentStep === 1 && "Let's get you set up with a secure account"}
              {currentStep === 2 && "Select the exam you're preparing for"}
              {currentStep === 3 && "You're all set! Time to begin your journey"}
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
                    Currently available: {ONBOARDING_EXAMS.map(e => e.name).join(', ')}
                  </p>
                </div>

                <RadioGroup 
                  value={formData.examType} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, examType: value }));
                    if (errors.examType) setErrors(prev => ({ ...prev, examType: "" }));
                  }}
                  className="space-y-4"
                >
                  {examTypes.map((exam) => (
                    <div key={exam.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={exam.id} id={exam.id} />
                      <div className="flex-1 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, examType: exam.id }))}>
                        <Card className={`transition-all duration-200 hover:shadow-md ${
                          formData.examType === exam.id ? 'ring-2 ring-primary border-primary' : 'border-input'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{exam.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{exam.description}</p>
                                <p className="text-sm text-muted-foreground">Score Range: {exam.scoreRange}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-muted-foreground mb-1">Target Universities:</p>
                                <div className="flex flex-wrap gap-1 justify-end">
                                  {exam.universities.slice(0, 2).map((uni) => (
                                    <span key={uni} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                      {uni}
                                    </span>
                                  ))}
                                  {exam.universities.length > 2 && (
                                    <span className="text-xs text-muted-foreground">+{exam.universities.length - 2} more</span>
                                  )}
                                </div>
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

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Welcome to UniHack.ai!</h3>
                    <p className="text-muted-foreground">
                      You're all set to start your {examTypes.find(e => e.id === formData.examType)?.name} preparation journey.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Exam:</span>
                      <span>{examTypes.find(e => e.id === formData.examType)?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Start Learning
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              to="/auth/login" 
              className="text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Trust Signals */}
        <div className="text-center mt-6 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-success" />
            <span>256-bit SSL encryption</span>
            <span>•</span>
            <span>GDPR compliant</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Join 10,000+ students achieving their dream scores
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;