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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selectedExam: "",
    examDate: null as Date | null,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus first input when step changes
  useEffect(() => {
    if (currentStep === 1) {
      nameInputRef.current?.focus();
    }
  }, [currentStep]);

  const exams = [
    { id: "SAT", name: "SAT", description: "Standardized Assessment Test", region: "US" },
    { id: "ACT", name: "ACT", description: "American College Testing", region: "US" },
    { id: "UCAT", name: "UCAT", description: "University Clinical Aptitude Test", region: "UK" },
    { id: "STEP", name: "STEP", description: "Sixth Term Examination Paper", region: "UK" },
    { id: "MAT", name: "MAT", description: "Mathematics Admissions Test", region: "UK" },
    { id: "ESAT", name: "ESAT", description: "Engineering & Science Admissions Test", region: "UK" },
    { id: "LNAT", name: "LNAT", description: "Law National Aptitude Test", region: "UK" },
    { id: "TSA", name: "TSA", description: "Thinking Skills Assessment", region: "UK" },
    { id: "PAT", name: "PAT", description: "Physics Aptitude Test", region: "UK" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.email) {
        newErrors.email = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    } else if (step === 2) {
      if (!formData.selectedExam) newErrors.exam = "Please select an exam";
    } else if (step === 3) {
      if (!formData.examDate) {
        newErrors.examDate = "Please select your exam date";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(formData.examDate);
        selectedDate.setHours(0, 0, 0, 0);
        const twoYearsFromNow = new Date();
        twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
        
        if (selectedDate < today) {
          newErrors.examDate = "Exam date cannot be in the past";
        } else if (selectedDate > twoYearsFromNow) {
          newErrors.examDate = "Exam date must be within 2 years from now";
        }
      }
    } else if (step === 4) {
      // Validate payment fields
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Enter expiry as MM/YY";
      } else {
        // Check if expiry date is not in the past
        const [month, year] = formData.expiryDate.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        today.setDate(1); // Set to first day of current month for comparison
        if (expiryDate < today) {
          newErrors.expiryDate = "Card has expired";
        }
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = "Security code is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Enter a valid 3 or 4-digit security code";
      }
      
      if (!formData.nameOnCard.trim()) {
        newErrors.nameOnCard = "Name on card is required";
      } else if (formData.nameOnCard.trim().length < 2) {
        newErrors.nameOnCard = "Please enter a valid name";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
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
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.name,
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        setErrors({ submit: authError.message });
        setIsLoading(false);
        return;
      }

      console.log('User created successfully, updating profile...');

      // Wait a moment for the user to be fully created and profile trigger to run
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the user ID from auth data
      const userId = authData.user?.id;
      if (!userId) {
        throw new Error('No user ID returned from signup');
      }

      // Get the selected exam details
      const selectedExam = exams.find(exam => exam.id === formData.selectedExam);
      const examName = selectedExam ? selectedExam.name : formData.selectedExam;

      // Update the profile with exam details using upsert to ensure it exists
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          full_name: formData.name,
          email: formData.email,
          exam_type: examName, // Save the readable exam name (e.g., "STEP"), not ID
          exam_date: formData.examDate?.toISOString().split('T')[0], // Store as date only
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      console.log('Profile update result:', {
        userId,
        examType: examName, // Log the actual name being saved
        examDate: formData.examDate?.toISOString().split('T')[0],
        error: profileError
      });

      if (profileError) {
        console.error('Profile error:', profileError);
        toast({
          title: "Account Created", 
          description: "Your account was created but there was an issue saving your exam preferences. You can update them in your dashboard.",
          variant: "default",
        });
      } else {
        toast({
          title: "Welcome to UniHack.ai! 🎉",
          description: "Your account has been created successfully. Please check your email to verify your account.",
        });
      }

      // Redirect to dashboard - they can use it even without email verification
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Unexpected error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Format card number with spaces
    if (field === 'cardNumber') {
      const cleanValue = value.replace(/\s/g, '');
      if (cleanValue.length <= 16) {
        const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData(prev => ({ ...prev, [field]: formattedValue }));
      }
    }
    // Format expiry date as MM/YY
    else if (field === 'expiryDate') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 4) {
        const formattedValue = cleanValue.length >= 2 
          ? `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`
          : cleanValue;
        setFormData(prev => ({ ...prev, [field]: formattedValue }));
      }
    }
    // Limit CVV to 4 digits
    else if (field === 'cvv') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 4) {
        setFormData(prev => ({ ...prev, [field]: cleanValue }));
      }
    }
    else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handlePayment = async () => {
    if (!validateStep(4)) return;
    
    try {
      // TODO: Implement actual Stripe payment processing
      // For now, just proceed to confirmation step
      console.log('Processing payment with:', {
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        nameOnCard: formData.nameOnCard,
        email: formData.email,
        selectedExam: formData.selectedExam,
        examDate: formData.examDate
      });
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to confirmation step
      setCurrentStep(5);
    } catch (error) {
      console.error('Payment failed:', error);
      setErrors(prev => ({ 
        ...prev, 
        payment: 'Payment failed. Please check your card details and try again.' 
      }));
    }
  };

  // Compute payment form validity without side effects
  const isPaymentFormValid = () => {
    return formData.cardNumber.trim() && 
           formData.expiryDate.trim() && 
           formData.cvv.trim() && 
           formData.nameOnCard.trim() &&
           /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, '')) &&
           /^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate) &&
           /^\d{3,4}$/.test(formData.cvv) &&
           formData.nameOnCard.trim().length >= 2;
  };

  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-6">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-1 mx-2 transition-colors duration-300 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 5
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="ai-glass-card p-8">
          {/* Step 1: Account Creation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
                <p className="text-muted-foreground">Start your AI-powered learning journey</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full name
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      ref={nameInputRef}
                      id="name"
                      name="name"
                      autoComplete="name"
                      className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.name ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : "name-help"}
                    />
                  </div>
                  {errors.name ? (
                    <p id="name-error" className="text-sm text-destructive flex items-center gap-2 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  ) : (
                    <p id="name-help" className="text-sm text-muted-foreground mt-2">
                      Your name as it appears on official documents
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.email ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : "email-help"}
                    />
                    {!errors.email && formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warning" />
                    )}
                    {!errors.email && formData.email && /\S+@\S+\.\S+/.test(formData.email) && (
                      <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-success" />
                    )}
                  </div>
                  {errors.email ? (
                    <p id="email-error" className="text-sm text-destructive flex items-center gap-2 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  ) : (
                    <p id="email-help" className="text-sm text-muted-foreground mt-2">
                      We'll use this to send you study progress and reminders
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className={`pl-12 pr-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.password ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : "password-help"}
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
                  {errors.password ? (
                    <p id="password-error" className="text-sm text-destructive flex items-center gap-2 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  ) : (
                    <p id="password-help" className="text-sm text-muted-foreground mt-2">
                      Must be at least 8 characters with letters and numbers
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Exam Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Choose Your Exam</h2>
                <p className="text-muted-foreground">Select the admissions test you're preparing for</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="exam-search" className="text-sm font-medium text-foreground">
                    Search for your exam
                  </Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="exam-search"
                      className="pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="Type exam name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Can't find your exam? Contact support for custom exam preparation
                  </p>
                </div>

                {errors.exam && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.exam}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto"
                     role="radiogroup" 
                     aria-label="Select your exam"
                >
                  {filteredExams.map((exam) => (
                    <button
                      key={exam.id}
                      type="button"
                      role="radio"
                      aria-checked={formData.selectedExam === exam.id}
                      className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        formData.selectedExam === exam.id 
                          ? 'border-primary bg-primary/10 shadow-md' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                      onClick={() => {
                        handleInputChange('selectedExam', exam.id);
                        if (errors.exam) setErrors(prev => ({ ...prev, exam: "" }));
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{exam.name}</h3>
                          <p className="text-sm text-muted-foreground">{exam.description}</p>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded-md">
                            {exam.region}
                          </span>
                        </div>
                        {formData.selectedExam === exam.id && (
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Exam Date Selection */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">When is your exam?</h2>
                <p className="text-muted-foreground">Help us create a personalized study timeline for you</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-foreground">
                    Exam date
                  </Label>
                  <div className="mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !formData.examDate && "text-muted-foreground",
                            errors.examDate && "border-destructive focus:border-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-3 h-5 w-5" />
                          {formData.examDate ? format(formData.examDate, "PPP") : <span>Select your exam date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.examDate || undefined}
                          onSelect={(date) => {
                            setFormData(prev => ({ ...prev, examDate: date || null }));
                            if (errors.examDate) {
                              setErrors(prev => ({ ...prev, examDate: "" }));
                            }
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const twoYearsFromNow = new Date();
                            twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
                            return date < today || date > twoYearsFromNow;
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {errors.examDate ? (
                    <p className="text-sm text-destructive flex items-center gap-2 mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.examDate}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      This helps us create a study plan tailored to your timeline
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Payment Information</h2>
                <p className="text-muted-foreground">Secure your 7-day free trial</p>
                
                <div className="ai-trial-banner mt-6">
                  <p className="font-semibold text-success flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Free until {trialEndDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">$49.99/month after trial • Cancel anytime</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">
                    Card number
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      autoComplete="cc-number"
                      className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.cardNumber ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      aria-invalid={!!errors.cardNumber}
                      aria-describedby={errors.cardNumber ? "card-error" : "card-help"}
                    />
                  </div>
                  {errors.cardNumber ? (
                    <p id="card-error" className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cardNumber}
                    </p>
                  ) : (
                    <p id="card-help" className="text-sm text-muted-foreground">
                      Your card will not be charged during the 7-day trial
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-medium text-foreground">
                      Expiry date
                    </Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      autoComplete="cc-exp"
                      className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.expiryDate ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      aria-invalid={!!errors.expiryDate}
                      aria-describedby={errors.expiryDate ? "expiry-error" : undefined}
                    />
                    {errors.expiryDate && (
                      <p id="expiry-error" className="text-sm text-destructive flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-medium text-foreground">
                      Security code
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      autoComplete="cc-csc"
                      className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                        errors.cvv ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                      }`}
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      aria-invalid={!!errors.cvv}
                      aria-describedby={errors.cvv ? "cvv-error" : "cvv-help"}
                    />
                    {errors.cvv ? (
                      <p id="cvv-error" className="text-sm text-destructive flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.cvv}
                      </p>
                    ) : (
                      <p id="cvv-help" className="text-xs text-muted-foreground">
                        3-digit code on back
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameOnCard" className="text-sm font-medium text-foreground">
                    Name on card
                  </Label>
                  <Input
                    id="nameOnCard"
                    name="nameOnCard"
                    autoComplete="cc-name"
                    className={`h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                      errors.nameOnCard ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                    }`}
                    placeholder="Full name as on card"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    aria-invalid={!!errors.nameOnCard}
                    aria-describedby={errors.nameOnCard ? "name-card-error" : "name-card-help"}
                  />
                  {errors.nameOnCard ? (
                    <p id="name-card-error" className="text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.nameOnCard}
                    </p>
                  ) : (
                    <p id="name-card-help" className="text-sm text-muted-foreground">
                      Enter name exactly as it appears on your card
                    </p>
                  )}
                </div>

                {/* Payment Error Display */}
                {errors.payment && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.payment}
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border/40 rounded-lg">
                  <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Your payment is secure</p>
                    <p className="text-xs text-muted-foreground">
                      Powered by Stripe • 256-bit SSL encryption • PCI DSS compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment Action Buttons */}
          {currentStep === 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/20">
              <Button
                variant="ghost"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handlePayment}
                disabled={!isPaymentFormValid() || isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-semibold focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Complete Payment'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-success" />
              </div>
              
              <h2 className="text-3xl font-bold">Welcome to Your Trial!</h2>
              <p className="text-xl text-muted-foreground">Your trial is now active</p>
              
              <div className="ai-glass-card p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trial active until:</span>
                  <span className="font-semibold">{trialEndDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Your chosen exam:</span>
                  <span className="font-semibold">{formData.selectedExam}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly cost after trial:</span>
                  <span className="font-semibold">$49.99</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  className="ai-cta-button w-full"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Start Your Diagnostic Test'}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  You can cancel anytime from your account settings
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/20">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-semibold focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;