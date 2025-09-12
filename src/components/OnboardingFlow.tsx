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
  CheckCircle2,
  X,
  BarChart3,
  BookOpen,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ONBOARDING_EXAMS } from "@/data/examConfig";

// SAT Platform Access pricing - using Annual plan as default
const PRICING_PLANS = {
  annual: {
    price_id: "price_1S6XsQLBctfCMRN8sZGewfbK",
    name: "Annual Plan",
    price: "$39.99/month",
    billed: "Billed annually at $479.99",
    savings: "Best Value - Save 75%"
  }
};

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [universitySearch, setUniversitySearch] = useState("");
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

  const allUniversities = [
    "Harvard University", "MIT", "Stanford University", "Princeton University", 
    "Yale University", "Columbia University", "Cornell University", "University of Pennsylvania",
    "Brown University", "Dartmouth College", "Duke University", "University of Chicago",
    "Northwestern University", "Johns Hopkins University", "Washington University in St. Louis",
    "Vanderbilt University", "Rice University", "University of Notre Dame", "Georgetown University",
    "Carnegie Mellon University", "University of California, Berkeley", "UCLA", 
    "University of Southern California", "New York University", "Boston University"
  ];

  const filteredUniversities = allUniversities.filter(uni =>
    uni.toLowerCase().includes(universitySearch.toLowerCase())
  );

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
      isValid = true; // No validation for other steps
    }
    
    if (isValid && currentStep < 5) { // Updated to 5 steps
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartTrial = async () => {
    setIsLoading(true);
    try {
      // First sign up the user
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

      // Get the current user session to update profile
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Update profile with onboarding data and trial status
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: formData.name,
            exam_type: formData.examType,
            exam_date: formData.examDate?.toISOString().split('T')[0] || null,
            target_university: formData.targetUniversities[0] || null,
            target_universities: formData.targetUniversities,
            subscription_status: 'trial',
            trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
          })
          .eq('user_id', session.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      toast({
        title: "Welcome to UniHack.ai!",
        description: "Your 3-day free trial has started. Check your email to verify your account.",
      });

      onComplete();
    } catch (error: any) {
      console.error('Trial start error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeNow = async () => {
    setIsProcessingPayment(true);
    try {
      // First sign up the user
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

      // Wait a moment for the session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Please try again - session not established");

      // Update profile with onboarding data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          exam_type: formData.examType,
          exam_date: formData.examDate?.toISOString().split('T')[0] || null,
          target_university: formData.targetUniversities[0] || null,
          target_universities: formData.targetUniversities,
          subscription_status: 'trial' // Will be updated to 'active' after successful payment
        })
        .eq('user_id', session.user.id);

      if (profileError) console.error('Profile update error:', profileError);

      // Create checkout session
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: { priceId: PRICING_PLANS.annual.price_id },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      window.open(data.url, '_blank');
      
      // Complete onboarding after a short delay
      setTimeout(() => {
        toast({
          title: "Account created!",
          description: "Redirecting to secure payment...",
        });
        onComplete();
      }, 1000);

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Setup failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && !isProcessingPayment) {
      if (currentStep < 5) {
        nextStep();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-start justify-center p-2 sm:p-4 pt-2 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-40"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-variant/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-3xl relative z-10 mt-1">
        {/* Enhanced Logo */}
        <div className="text-center mb-2 sm:mb-4">
          <Link to="/" className="inline-flex flex-col items-center justify-center group">
            <div className="relative mb-1">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <img 
                src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
                alt="UniHack.ai Logo" 
                className="relative h-20 sm:h-24 md:h-32 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground px-4 text-center">Your AI-powered SAT preparation journey starts here</p>
          </Link>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="flex justify-center mb-3 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 ${
                  step < currentStep 
                    ? 'bg-gradient-to-r from-primary to-primary-variant text-white shadow-lg scale-110' 
                    : step === currentStep 
                    ? 'bg-gradient-to-r from-primary to-primary-variant text-white shadow-xl shadow-primary/40 scale-125' 
                    : 'bg-muted/70 text-muted-foreground backdrop-blur-sm'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" /> : step}
                  {step === currentStep && (
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-primary-variant animate-pulse"></div>
                  )}
                </div>
                {step < 5 && (
                  <div className={`w-8 sm:w-12 md:w-16 h-1 rounded-full transition-all duration-500 ${
                    step < currentStep ? 'bg-gradient-to-r from-primary to-primary-variant' : 'bg-muted/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Step Content */}
        <Card className="backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl shadow-primary/10 mx-2 sm:mx-0">
          <CardHeader className="text-center pb-2 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-primary via-primary-variant to-primary-glow bg-clip-text text-transparent mb-2">
              {currentStep === 1 && "Create Your Account"}
              {currentStep === 2 && "Choose Your SAT Exam"}
              {currentStep === 3 && "Set Your Goals"}
              {currentStep === 4 && "Profile Complete!"}
              {currentStep === 5 && "Choose Your Plan"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
              {currentStep === 1 && "Let's get you set up with a secure account"}
              {currentStep === 2 && "Select your SAT test details"}
              {currentStep === 3 && "Set your target score and universities for motivation"}
              {currentStep === 4 && "Your personalized SAT prep profile is ready"}
              {currentStep === 5 && "Start with a 3-day free trial, then continue with premium access"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-4 sm:px-6 pb-4 relative">
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
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-sm sm:text-base text-muted-foreground px-2">
                    Choose the SAT exam you're preparing for to get personalized practice content
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 rounded-lg px-2 sm:px-3 py-2 mx-2 sm:mx-0">
                    Currently available: {ONBOARDING_EXAMS.map(e => e.name).join(', ')}
                  </p>
                </div>

                <RadioGroup 
                  value={formData.examType} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, examType: value }));
                    if (errors.examType) setErrors(prev => ({ ...prev, examType: "" }));
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  {examTypes.map((exam) => (
                    <div key={exam.id} className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                      <RadioGroupItem value={exam.id} id={exam.id} className="mt-1 sm:mt-0" />
                      <div className="flex-1 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, examType: exam.id }))}>
                        <Label 
                          htmlFor={exam.id} 
                          className="text-sm sm:text-base font-medium cursor-pointer block"
                        >
                          {exam.name}
                        </Label>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {exam.description} • Score Range: {exam.scoreRange}
                        </p>
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

            {/* Step 3: Goals & Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Target Score (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 1500"
                      value={formData.targetScore}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetScore: e.target.value }))}
                      className="h-12 text-base"
                      min="400"
                      max="1600"
                    />
                    <p className="text-xs text-muted-foreground">
                      SAT scores range from 400 to 1600
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Target Universities (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full h-12 justify-between text-left font-normal text-base"
                        >
                          {formData.targetUniversities.length > 0
                            ? `${formData.targetUniversities.length} selected`
                            : "Select universities..."
                          }
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div className="p-3 border-b">
                          <Input
                            placeholder="Search universities..."
                            value={universitySearch}
                            onChange={(e) => setUniversitySearch(e.target.value)}
                            className="h-8"
                          />
                        </div>
                        <div className="max-h-40 overflow-auto">
                          {filteredUniversities.map((university) => (
                            <div
                              key={university}
                              className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                              onClick={() => {
                                const isSelected = formData.targetUniversities.includes(university);
                                if (isSelected) {
                                  setFormData(prev => ({
                                    ...prev,
                                    targetUniversities: prev.targetUniversities.filter(u => u !== university)
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    targetUniversities: [...prev.targetUniversities, university]
                                  }));
                                }
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.targetUniversities.includes(university)}
                                readOnly
                                className="h-4 w-4"
                              />
                              <Label className="text-sm cursor-pointer">{university}</Label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {formData.targetUniversities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.targetUniversities.map((uni) => (
                          <Badge
                            key={uni}
                            variant="secondary"
                            className="text-xs py-1 px-2 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                targetUniversities: prev.targetUniversities.filter(u => u !== uni)
                              }));
                            }}
                          >
                            {uni}
                            <X className="ml-1 h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Exam Date (Optional)</Label>
                    <Input
                      type="date"
                      value={formData.examDate ? formData.examDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        examDate: e.target.value ? new Date(e.target.value) : null 
                      }))}
                      className="h-12 text-base"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Profile Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-4">Your Profile Summary:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exam:</span>
                      <p className="font-medium">{formData.examType}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Date:</span>
                      <p className="font-medium">{formData.examDate?.toLocaleDateString() || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Score:</span>
                      <p className="font-medium">{formData.targetScore || 'Not specified'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Target Universities:</span>
                      <p className="font-medium">{formData.targetUniversities.length > 0 ? formData.targetUniversities.join(', ') : 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Payment Options */}
            {currentStep === 5 && (
              <div className="space-y-6">
                {/* Free Trial Option */}
                <div className="border-2 border-green-200 bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-lg text-green-800">3-Day Free Trial</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Recommended</Badge>
                  </div>
                  <p className="text-green-700 mb-4">
                    Get full access to all SAT prep features for 3 days. No payment required to start.
                  </p>
                  <ul className="space-y-2 text-sm text-green-700 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Unlimited practice questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      AI-powered personalization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Full-length mock exams
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Detailed analytics
                    </li>
                  </ul>
                  <Button 
                    onClick={handleStartTrial}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Creating Account...' : 'Start Free Trial'}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>

                {/* Premium Plan Option */}
                <div className="border-2 border-purple-200 bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-lg text-purple-800">Upgrade to Premium</h4>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      {PRICING_PLANS.annual.savings}
                    </Badge>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-purple-800">{PRICING_PLANS.annual.price}</span>
                      <span className="text-sm text-purple-600">per month</span>
                    </div>
                    <p className="text-sm text-purple-600">{PRICING_PLANS.annual.billed}</p>
                  </div>
                  <p className="text-purple-700 mb-4">
                    Skip the trial and get immediate access to everything plus premium features.
                  </p>
                  <Button 
                    onClick={handleUpgradeNow}
                    disabled={isProcessingPayment}
                    variant="outline" 
                    className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    {isProcessingPayment ? 'Processing...' : 'Upgrade Now'}
                    {!isProcessingPayment && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={prevStep} 
                  className="flex-1"
                  disabled={isLoading || isProcessingPayment}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              {currentStep < 5 && (
                <Button 
                  onClick={nextStep} 
                  className={`${currentStep === 1 ? 'w-full' : 'flex-1'}`}
                  disabled={isLoading || isProcessingPayment}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;