import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Search, 
  CreditCard, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  Clock,
  Users,
  Target,
  GraduationCap,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

// Group Classes pricing
const GROUP_CLASSES_PRICE_ID = "price_1S6XxxLBctfCMRN8KjKrel0Y"; // Weekly $50 subscription

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  examDate: Date | null;
  targetUniversities: string[];
  targetScore: string;
  interestedInGroupClasses: boolean;
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
    examDate: null,
    targetUniversities: [],
    targetScore: "",
    interestedInGroupClasses: false,
  });

  // Focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

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

  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else {
      isValid = true; // No validation for other steps
    }
    
    if (isValid && currentStep < 4) { // 4 steps total now
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

      // Wait a moment for the session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Please try again - session not established");

      // Update profile with comprehensive onboarding data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          email: formData.email,
          exam_type: 'SAT',
          exam_date: formData.examDate?.toISOString().split('T')[0] || null,
          target_university: formData.targetUniversities[0] || 'Harvard University',
          target_universities: formData.targetUniversities.length > 0 ? formData.targetUniversities : ['Harvard University'],
          subscription_status: 'trial',
          trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      // Create Stripe checkout for trial (collects payment method)
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: { 
          priceId: PRICING_PLANS.annual.price_id,
          mode: 'trial',
          metadata: {
            exam_date: formData.examDate?.toISOString().split('T')[0] || '',
            target_university: formData.targetUniversities[0] || '',
            target_score: formData.targetScore,
            group_classes: formData.interestedInGroupClasses.toString()
          }
        },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error) throw error;

      window.open(data.url, '_blank');
      
      toast({
        title: "Welcome to UniHack.ai!",
        description: `Your journey to ${formData.targetUniversities[0] || 'your dream university'} starts now!`,
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

      // Update profile with comprehensive onboarding data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          email: formData.email,
          exam_type: 'SAT',
          exam_date: formData.examDate?.toISOString().split('T')[0] || null,
          target_university: formData.targetUniversities[0] || 'Harvard University',
          target_universities: formData.targetUniversities.length > 0 ? formData.targetUniversities : ['Harvard University'],
          subscription_status: 'trial' // Will be updated to 'active' after successful payment
        })
        .eq('user_id', session.user.id);

      if (profileError) console.error('Profile update error:', profileError);

      // Create checkout session with metadata
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: { 
          priceId: PRICING_PLANS.annual.price_id,
          metadata: {
            exam_date: formData.examDate?.toISOString().split('T')[0] || '',
            target_university: formData.targetUniversities[0] || '',
            target_score: formData.targetScore,
            group_classes: formData.interestedInGroupClasses.toString()
          }
        },
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (error) throw error;

      window.open(data.url, '_blank');
      
      setTimeout(() => {
        toast({
          title: "Account created!",
          description: `Starting your journey to ${formData.targetUniversities[0] || 'your dream university'}...`,
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
      if (currentStep < 4) {
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
            {[1, 2, 3, 4].map((step) => (
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
                {step < 4 && (
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
              {currentStep === 2 && "Set Your SAT Goals"}
              {currentStep === 3 && "Choose Add-Ons"}
              {currentStep === 4 && "Choose Your Plan"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
              {currentStep === 1 && "Let's get you set up with a secure account"}
              {currentStep === 2 && "Set your target score and universities for motivation"}
              {currentStep === 3 && "Enhance your SAT prep with our premium add-ons"}
              {currentStep === 4 && "Start with a 3-day free trial, then continue with premium access"}
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

            {/* Step 2: SAT Goals & Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground px-2">
                    Set your SAT goals to help us personalize your prep experience
                  </p>
                </div>

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
                    <Label className="text-sm font-medium">SAT Test Date (Optional)</Label>
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
                    <p className="text-xs text-muted-foreground">
                      Help us create a personalized study timeline
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Add-Ons */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Enhance Your SAT Prep</h3>
                  <p className="text-sm sm:text-base text-muted-foreground px-2">
                    Optional add-ons to supercharge your SAT preparation
                  </p>
                </div>

                {/* Group Classes Add-On */}
                <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center h-5">
                        <Checkbox
                          id="groupClasses"
                          checked={formData.interestedInGroupClasses}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, interestedInGroupClasses: !!checked }))
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-lg">SAT Group Classes</h4>
                          <Badge variant="outline" className="border-purple-300 text-purple-700">
                            $50/week
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          Join small group sessions with expert instruction in Reading & Writing and Mathematics. 
                          Two 60-minute sessions per week starting October 13th, 2025.
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-purple-600" />
                            Expert-led small group sessions
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-purple-600" />
                            Interactive practice with real SAT questions
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-purple-600" />
                            Personalized feedback and support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    You can add these services later from your dashboard if you change your mind.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Payment Options with Personal Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Personal Goal Summary */}
                <div className="bg-gradient-to-r from-primary/10 to-primary-variant/10 p-6 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Your SAT Journey
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Dream University</span>
                      <span className="font-medium">{formData.targetUniversities[0] || 'Not selected'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Target Score</span>
                      <span className="font-medium">{formData.targetScore || 'Not set'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Exam Date</span>
                      <span className="font-medium">
                        {formData.examDate ? formData.examDate.toLocaleDateString() : 'Not scheduled'}
                      </span>
                    </div>
                  </div>
                  {formData.interestedInGroupClasses && (
                    <div className="mt-3 flex items-center gap-2 text-purple-700">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">Including SAT Group Classes</span>
                    </div>
                  )}
                </div>

                {/* Free Trial Option */}
                <div className="border-2 border-green-200 bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-lg text-green-800">3-Day Free Trial</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Recommended</Badge>
                  </div>
                  <p className="text-green-700 mb-4">
                    Start your journey to {formData.targetUniversities[0] || 'your dream university'} risk-free. 
                    We'll collect your payment details to activate premium features after your trial.
                  </p>
                  <ul className="space-y-2 text-sm text-green-700 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Unlimited practice questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      AI-powered personalization for your {formData.targetScore} goal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Full-length mock exams
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Detailed analytics & progress tracking
                    </li>
                    {formData.interestedInGroupClasses && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Access to SAT Group Classes ($50/week)
                      </li>
                    )}
                  </ul>
                  <Button 
                    onClick={handleStartTrial}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Setting Up Your Account...' : 'Start Free Trial'}
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
                    Skip the trial and get immediate access to everything. Perfect for students with upcoming 
                    {formData.examDate ? ` exams on ${formData.examDate.toLocaleDateString()}` : ' SAT dates'}.
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

                {/* Group Classes Confirmation if selected */}
                {formData.interestedInGroupClasses && (
                  <div className="border-2 border-orange-200 bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-orange-800">SAT Group Classes Included</h4>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        $50/week
                      </Badge>
                    </div>
                    <p className="text-orange-700 text-sm">
                      Group classes access will be activated with your trial. You'll receive enrollment details after signup.
                    </p>
                  </div>
                )}
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
              {currentStep < 4 && (
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