import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle, Users, Brain, Clock, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    planType: 'annual' as 'annual' | 'monthly',
    groupClasses: false,
    diagnostic: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (currentStep === 1) {
      const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
      nameInput?.focus();
    }
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCompleteSignup = async () => {
    setIsLoading(true);
    try {
      console.log('Starting account creation...');
      
      // Create the user account
      const { error: authError } = await signUp(
        formData.email, 
        formData.password, 
        formData.name.split(' ')[0], 
        formData.name.split(' ').slice(1).join(' ')
      );

      if (authError) {
        console.error('Signup error:', authError);
        
        // If user already exists, show appropriate message
        if (authError.message?.includes('already') || authError.message?.includes('User already registered')) {
          throw new Error("Account already exists. Please try logging in instead.");
        } else {
          throw authError;
        }
      }

      // Create subscription checkout if needed
      if (formData.planType) {
        try {
          const priceId = formData.planType === 'annual' 
            ? 'price_1QEjIsLBctfCMRN8GkkNjrFE' 
            : 'price_1QEjI9LBctfCMRN8dM3Sx99m';
            
          const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
            body: { priceId },
          });

          if (error) throw error;
          
          if (data?.url) {
            window.open(data.url, '_blank');
          }
        } catch (error) {
          console.error('Checkout error:', error);
          toast({
            title: "Payment Setup",
            description: "Account created! Visit pricing page to complete subscription setup.",
            variant: "default",
          });
        }
      }

      toast({
        title: "Welcome to UniHack!",
        description: `Account created! ${formData.diagnostic ? 'Taking you to diagnostic test.' : 'Taking you to dashboard.'}`,
      });

      // Wait for session to establish and call onComplete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect based on choice
      if (formData.diagnostic) {
        window.location.href = '/diagnostic';
      } else {
        window.location.href = '/dashboard';
      }
      
    } catch (error: any) {
      console.error('Account creation error:', error);
      toast({
        title: "Account Creation Failed",
        description: error.message || 'Please try again',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Get Started</h2>
              <p className="text-muted-foreground">Create your account and start your SAT journey</p>
            </div>
          
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`pl-12 h-12 ${errors.name ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-12 h-12 ${errors.email ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-12 pr-12 h-12 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select the plan that works best for your SAT preparation</p>
            </div>
            
            <div className="grid gap-4">
              {/* Annual Plan */}
              <div 
                onClick={() => handleInputChange('planType', 'annual')}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.planType === 'annual' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-primary-variant text-white px-3 py-1 rounded-full text-sm font-semibold">
                    BEST VALUE
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Annual Plan</h3>
                    <p className="text-muted-foreground">Save $1,439.89/year</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black">$39.99</div>
                    <div className="text-muted-foreground">/month</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold text-sm">
                    <Sparkles className="w-4 h-4" />
                    3-Day Free Trial Included
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Unlimited SAT practice questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>AI-powered personalization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Full-length SAT mock exams</span>
                  </div>
                </div>
              </div>
              
              {/* Monthly Plan */}
              <div 
                onClick={() => handleInputChange('planType', 'monthly')}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.planType === 'monthly' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Monthly Plan</h3>
                    <p className="text-muted-foreground">Flexible monthly billing</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black">$159.99</div>
                    <div className="text-muted-foreground">/month</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-success font-semibold text-sm">
                    <Sparkles className="w-4 h-4" />
                    3-Day Free Trial Included
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>All features included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Group Classes Add-on */}
            <div className="border rounded-xl p-4 bg-gradient-to-r from-accent/5 to-accent/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <h4 className="font-semibold">Expert Group Classes</h4>
                    <p className="text-sm text-muted-foreground">Live sessions with SAT experts + $50/week</p>
                  </div>
                </div>
                <Switch
                  checked={formData.groupClasses}
                  onCheckedChange={(checked) => handleInputChange('groupClasses', checked)}
                />
              </div>
              {formData.groupClasses && (
                <div className="mt-3 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium">+ $50/week will be added to your subscription</p>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Ready to Start?</h2>
              <p className="text-muted-foreground">Choose how you'd like to begin your SAT preparation</p>
            </div>
            
            <div className="grid gap-4">
              {/* Diagnostic Test Option */}
              <div 
                onClick={() => handleInputChange('diagnostic', true)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.diagnostic 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <Brain className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Take Diagnostic Test</h3>
                    <p className="text-muted-foreground mb-3">
                      Get a personalized assessment of your current SAT level and receive a tailored study plan.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Clock className="w-4 h-4" />
                      <span>Takes about 30 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skip to Dashboard Option */}
              <div 
                onClick={() => handleInputChange('diagnostic', false)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  !formData.diagnostic 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Skip to Dashboard</h3>
                    <p className="text-muted-foreground mb-3">
                      Go straight to your dashboard and start practicing with general SAT questions.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Start practicing immediately</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-muted/50 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Your Selection:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">
                    {formData.planType === 'annual' ? 'Annual ($39.99/mo)' : 'Monthly ($159.99/mo)'}
                  </span>
                </div>
                {formData.groupClasses && (
                  <div className="flex justify-between">
                    <span>Group Classes:</span>
                    <span className="font-medium">+$50/week</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Next Step:</span>
                  <span className="font-medium">
                    {formData.diagnostic ? 'Diagnostic Test' : 'Dashboard'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
            alt="UniHack.ai" 
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground">Welcome to UniHack</h1>
          <p className="text-muted-foreground">Your AI-powered SAT prep starts here</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-8">
            {renderStep()}

            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteSignup}
                  className="flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Creating Account...' : 'Complete Setup'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            {currentStep === 1 && (
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <a href="/auth/login" className="text-primary hover:underline">
                    Sign in here
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;