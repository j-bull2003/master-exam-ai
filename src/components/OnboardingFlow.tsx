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
import { ArrowRight, ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle, Users, Brain, Clock, Sparkles, Target, BookOpen, Calculator, Award } from 'lucide-react';
import PaymentForm from '@/components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { addDays, format } from 'date-fns';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51QEjGYLBctfCMRN8TJFZPn3I3GkgPJnZdpYSF0C5ePx8wvhv9x8MZnwmV3LDvLJu3zP1wJY6V8NlKFOe4mVl7JIY00hGRZDjsO');

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
  
  const totalSteps = 5; // Updated to include payment step
  const progress = (currentStep / totalSteps) * 100;
  
  // Calculate billing date (3 days after signup for free trial)
  const today = new Date();
  const billingDate = addDays(today, 3);
  const formattedBillingDate = format(billingDate, 'MMMM do, yyyy');

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
    if (currentStep === 1 && !validateStep(currentStep)) return;
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
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

      console.log('Account created successfully');
      toast({
        title: "Account Created!",
        description: "Please complete payment setup to finalize your registration.",
      });

      // Move to payment step
      setCurrentStep(5);
      
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
            <div className="text-center space-y-1 mb-4">
              <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
              <p className="text-muted-foreground text-sm">Select the plan that works best for your SAT preparation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Annual Plan */}
              <div 
                onClick={() => handleInputChange('planType', 'annual')}
                className={`relative p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  formData.planType === 'annual' 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Best Value Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary-variant text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✨ BEST VALUE
                  </div>
                </div>
                
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all ${
                  formData.planType === 'annual' 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {formData.planType === 'annual' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="pt-3">
                  <div className="text-center mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">Annual Plan</h3>
                    <p className="text-success font-semibold text-xs sm:text-sm">Save $1,439.89/year</p>
                  </div>
                  
                  <div className="text-center mb-3">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-xl sm:text-2xl font-black text-foreground">$39.99</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">/mo</span>
                    </div>
                    <div className="text-xs text-muted-foreground">$479.99 billed annually</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-success/15 to-success/5 border border-success/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-success font-semibold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>3-Day Free Trial Included</span>
                    </div>
                    <p className="text-xs text-success/80 mt-1">You'll be billed on {formattedBillingDate} • Cancel anytime during trial</p>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>Unlimited practice questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>AI-powered personalization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>Full-length mock exams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Plan */}
              <div 
                onClick={() => handleInputChange('planType', 'monthly')}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  formData.planType === 'monthly' 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all ${
                  formData.planType === 'monthly' 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {formData.planType === 'monthly' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="pt-3">
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-foreground">Monthly Plan</h3>
                    <p className="text-muted-foreground text-sm">Flexible monthly billing</p>
                  </div>
                  
                  <div className="text-center mb-3">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-black text-foreground">$159.99</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <div className="text-xs text-muted-foreground">$159.99 monthly</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-success/15 to-success/5 border border-success/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-success font-semibold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>3-Day Free Trial Included</span>
                    </div>
                    <p className="text-xs text-success/80 mt-1">You'll be billed on {formattedBillingDate} • Cancel anytime during trial</p>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>All features included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>No yearly commitment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                      <span>Perfect for short-term prep</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <h2 className="text-2xl font-bold text-foreground">Want Extra Support?</h2>
              <p className="text-muted-foreground text-sm">Add expert-led live group classes to accelerate your progress</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Add Group Classes Option */}
              <div 
                onClick={() => handleInputChange('groupClasses', true)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  formData.groupClasses 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Add-on Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ADD ON $50/w
                  </div>
                </div>
                
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all ${
                  formData.groupClasses 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {formData.groupClasses && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="pt-3">
                  <h3 className="text-lg font-bold text-foreground mb-2">Add Expert Live Group Classes</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    2x sessions per week (Reading and Writing and Maths) with expert instructors covering comprehensive SAT strategies
                  </p>
                  
                  {/* Strategy Overview */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-bold text-sm">Comprehensive SAT Strategy</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-foreground">Learn all tips, tricks and strategies for the highest score possible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calculator className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-foreground">Master all SAT modules with expert guidance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-foreground">Personalized strategies for maximum improvement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-primary flex-shrink-0" />
                        <span className="text-foreground">Small group sessions with expert instructors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skip Option */}
              <div 
                onClick={() => handleInputChange('groupClasses', false)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  !formData.groupClasses 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all ${
                  !formData.groupClasses 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {!formData.groupClasses && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">Continue with Platform Only</h3>
                    <p className="text-muted-foreground mb-4">
                      Start with your selected plan and add group classes later if needed.
                    </p>
                    <div className="text-sm text-primary">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Full platform access included</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Add group classes anytime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <h2 className="text-2xl font-bold text-foreground">Ready to Start?</h2>
              <p className="text-muted-foreground text-sm">Choose how you'd like to begin your SAT preparation</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* Diagnostic Test Option */}
              <div 
                onClick={() => handleInputChange('diagnostic', true)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  formData.diagnostic 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all ${
                  formData.diagnostic 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {formData.diagnostic && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-3 pt-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-foreground">Take Diagnostic Test</h3>
                    <p className="text-muted-foreground mb-3 text-sm">
                      Get a personalized assessment of your current SAT level and receive a tailored study plan.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span>Takes about 30 minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Target className="w-4 h-4" />
                        <span>Personalized study plan</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Identify weak areas</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Set target score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skip to Dashboard Option */}
              <div 
                onClick={() => handleInputChange('diagnostic', false)}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  !formData.diagnostic 
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/20' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all ${
                  !formData.diagnostic 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground/30'
                }`}>
                  {!formData.diagnostic && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-foreground">Skip to Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Go straight to your dashboard and start practicing with general SAT questions.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Start practicing immediately</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <ArrowRight className="w-4 h-4" />
                        <span>Jump right in</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <BookOpen className="w-4 h-4" />
                        <span>Access all features</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="w-4 h-4" />
                        <span>Take diagnostic later</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Summary */}
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/50">
              <h4 className="text-lg font-bold mb-4 text-foreground">Your Selection Summary</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">Plan Selected</span>
                  </div>
                  <span className="font-bold text-primary">
                    {formData.planType === 'annual' ? 'Annual ($39.99/mo)' : 'Monthly ($159.99/mo)'}
                  </span>
                </div>
                
                {formData.groupClasses && (
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">Group Classes</span>
                    </div>
                    <span className="font-bold text-primary">+$50/week</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      {formData.diagnostic ? <Brain className="w-4 h-4 text-primary" /> : <ArrowRight className="w-4 h-4 text-primary" />}
                    </div>
                    <span className="font-medium">Next Step</span>
                  </div>
                  <span className="font-bold text-primary">
                    {formData.diagnostic ? 'Diagnostic Test' : 'Dashboard'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <Elements stripe={stripePromise}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
              {/* Left side - Payment Form */}
              <div>
                <PaymentForm 
                  formData={formData}
                  onPaymentSuccess={() => {
                    toast({
                      title: "Welcome to UniHack!",
                      description: "Your account has been created successfully.",
                    });
                    if (onComplete) onComplete();
                  }}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
              
              {/* Right side - Summary */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/50">
                  <h4 className="text-lg font-bold mb-4 text-foreground">Your Selection Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Plan</span>
                          <span className="font-medium text-foreground">Selected</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">Annual</div>
                        <div className="font-bold text-primary">($39.99/mo)</div>
                      </div>
                    </div>
                    
                    {formData.groupClasses && (
                      <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">Group</span>
                            <span className="font-medium text-foreground">Classes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">+$50/week</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          {formData.diagnostic ? <Brain className="w-4 h-4 text-primary" /> : <ArrowRight className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">Next Step</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {formData.diagnostic ? 'Diagnostic Test' : 'Dashboard'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Features Included */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h4 className="text-lg font-bold mb-4 text-foreground">What's Included</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">AI-powered personalized practice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">Unlimited practice questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">Full-length mock exams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">Detailed performance analytics</span>
                    </div>
                    {formData.groupClasses && (
                      <>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">2x weekly live classes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">Expert SAT instructors</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Elements>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto"> {/* Added mx-auto for centering */}
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

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : currentStep === 4 ? (
                <Button
                  onClick={handleCompleteSignup}
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto"
                  disabled={isLoading}
                >
                  <span className="text-center">{isLoading ? 'Creating Account...' : 'Create Account & Continue'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : null}
              {/* Payment step (5) uses its own button from PaymentForm */}
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