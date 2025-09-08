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
import { useAuth } from "@/contexts/AuthContext";
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
  targetUniversities: string[];
  targetScore: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const { signUp } = useAuth();
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
    targetUniversities: [],
    targetScore: "",
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
    } else {
      isValid = true; // No validation for step 3
    }
    
    if (isValid && currentStep < 4) {
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
      if (currentStep < 4) {
        nextStep();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-start justify-center p-4 pt-2 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-40"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-variant/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-3xl relative z-10 mt-1">
        {/* Enhanced Logo */}
        <div className="text-center mb-1">
          <Link to="/" className="inline-flex flex-col items-center justify-center group">
            <div className="relative mb-1">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <img 
                src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
                alt="UniHack.ai Logo" 
                className="relative h-32 md:h-40 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <p className="text-base text-muted-foreground">Your AI-powered SAT preparation journey starts here</p>
          </Link>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="flex justify-center mb-1">
          <div className="flex items-center space-x-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  step < currentStep 
                    ? 'bg-gradient-to-r from-primary to-primary-variant text-white shadow-lg scale-110' 
                    : step === currentStep 
                    ? 'bg-gradient-to-r from-primary to-primary-variant text-white shadow-xl shadow-primary/40 scale-125' 
                    : 'bg-muted/70 text-muted-foreground backdrop-blur-sm'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
                  {step === currentStep && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-primary-variant animate-pulse"></div>
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 rounded-full transition-all duration-500 ${
                    step < currentStep ? 'bg-gradient-to-r from-primary to-primary-variant' : 'bg-muted/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Step Content */}
        <Card className="backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent mb-2">
              {currentStep === 1 && "Create Your Account"}
              {currentStep === 2 && "Choose Your SAT Exam"}
              {currentStep === 3 && "Set Your Goals"}
              {currentStep === 4 && "Ready to Begin!"}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentStep === 1 && "Let's get you set up with a secure account"}
              {currentStep === 2 && "Select your SAT test details"}
              {currentStep === 3 && "Set your target score and universities for motivation"}
              {currentStep === 4 && "You're all set! Time to start your SAT journey"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-4">
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
                    Choose the SAT exam you're preparing for to get personalized practice content
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

            {/* Step 3: Goal Setting */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-primary-variant/20 rounded-2xl flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Set Your SAT Goals</h3>
                  <p className="text-muted-foreground">Let's create a personalized plan to keep you motivated and on track</p>
                </div>

                {/* Exam Date */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">When is your SAT exam?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full h-12 justify-start text-left font-normal ${
                          !formData.examDate ? "text-muted-foreground" : ""
                        }`}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5" />
                        {formData.examDate ? (
                          formData.examDate.toLocaleDateString()
                        ) : (
                          <span>Select your exam date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <input
                        type="date"
                        className="p-3 border rounded-lg w-full"
                        onChange={(e) => {
                          const date = e.target.value ? new Date(e.target.value) : null;
                          setFormData(prev => ({ ...prev, examDate: date }));
                        }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Target Score */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">What's your target SAT score?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["1400+", "1500+", "1600"].map((score) => (
                      <Button
                        key={score}
                        variant={formData.targetScore === score ? "default" : "outline"}
                        className={`h-12 text-center transition-all duration-200 ${
                          formData.targetScore === score 
                            ? "bg-gradient-to-r from-primary to-primary-variant shadow-lg scale-105" 
                            : "hover:scale-105"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, targetScore: score }))}
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Target Universities */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Which universities are you targeting?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Harvard", "MIT", "Stanford", "Princeton", "Yale", "Columbia", "Cornell", "UPenn"].map((uni) => (
                      <Button
                        key={uni}
                        variant={formData.targetUniversities.includes(uni) ? "default" : "outline"}
                        className={`h-12 text-sm transition-all duration-200 ${
                          formData.targetUniversities.includes(uni) 
                            ? "bg-gradient-to-r from-primary to-primary-variant shadow-lg scale-105" 
                            : "hover:scale-105"
                        }`}
                        onClick={() => {
                          const unis = formData.targetUniversities.includes(uni)
                            ? formData.targetUniversities.filter(u => u !== uni)
                            : [...formData.targetUniversities, uni];
                          setFormData(prev => ({ ...prev, targetUniversities: unis }));
                        }}
                      >
                        {uni}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Motivation Message */}
                {(formData.examDate || formData.targetScore || formData.targetUniversities.length > 0) && (
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-primary-variant/10 rounded-2xl border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary">Your Personalized Plan</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {formData.examDate && (
                            <p>📅 Exam Date: {formData.examDate.toLocaleDateString()}</p>
                          )}
                          {formData.targetScore && (
                            <p>🎯 Target Score: {formData.targetScore}</p>
                          )}
                          {formData.targetUniversities.length > 0 && (
                            <p>🏛️ Dream Universities: {formData.targetUniversities.join(", ")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-8 text-center">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-primary-variant/20 rounded-3xl flex items-center justify-center mx-auto">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-variant/20 rounded-3xl blur-xl animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-variant bg-clip-text text-transparent">
                      Welcome to UniHack.ai!
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      Your AI-powered SAT preparation journey is about to begin. Get ready to achieve your dream score!
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 text-left max-w-md mx-auto">
                    <h4 className="font-semibold mb-4 text-center">Your Journey Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Exam:</span>
                        <span className="font-medium">{formData.examType}</span>
                      </div>
                      {formData.examDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Exam Date:</span>
                          <span className="font-medium">{formData.examDate.toLocaleDateString()}</span>
                        </div>
                      )}
                      {formData.targetScore && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target Score:</span>
                          <span className="font-medium">{formData.targetScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 h-12 px-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Step {currentStep} of 4
              </div>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-all duration-200"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-primary to-primary-variant hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Start My Journey
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>7-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;