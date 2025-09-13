import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Mail, Lock, CreditCard, Clock, Users, Star, Shield, Eye, EyeOff } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51S6XkiLBctfCMRN8TY7LTUnCCtZHT5zKt6Ygl3Q88Ys5Nqg5aGdK0y5lUzGcwkmRHzUgO1XYYhKOOyEaGNGz4fRT008IG5n3Bd');

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const { signUp, signIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    billingPeriod: 'monthly' as 'monthly' | 'yearly',
    groupClasses: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 2;
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
      console.log('Starting complete signup process...');
      
      // Create the user account - NO EMAIL CONFIRMATION
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.name
          }
        }
      });

      if (authError) {
        console.error('Signup error:', authError);
        
        // If user already exists, sign them in
        if (authError.message?.includes('already') || authError.message?.includes('registered')) {
          console.log('User exists, signing in...');
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          });
          
          if (signInError) {
            throw new Error("Account exists but password is incorrect. Please try logging in instead.");
          }
        } else {
          throw authError;
        }
      }

      // Wait a moment for session to establish
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Welcome to UniHack!",
        description: "Your account is ready. Taking you to the dashboard...",
      });

      // Redirect directly to dashboard
      window.location.href = '/dashboard';
      
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Registration Failed",
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
              <p className="text-muted-foreground">Create your account in seconds</p>
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
              <CreditCard className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Complete Your Setup</h2>
              <p className="text-muted-foreground">Choose your plan and add payment details</p>
            </div>

            {/* Quick Plan Selection */}
            <div className="grid gap-3">
              <div 
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.billingPeriod === 'monthly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleInputChange('billingPeriod', 'monthly')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.billingPeriod === 'monthly' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`} />
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">$159.99/month</span>
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">3-Day Trial</Badge>
                  </div>
                </div>
              </div>

              <div 
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.billingPeriod === 'yearly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleInputChange('billingPeriod', 'yearly')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.billingPeriod === 'yearly' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`} />
                    <span className="font-medium">Yearly</span>
                    <Badge className="bg-green-600 text-white text-xs">Save $1,440</Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">$39.99/month</span>
                    <div className="text-xs text-muted-foreground">$479.99/year</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Classes Add-on */}
            <div 
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                formData.groupClasses ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('groupClasses', !formData.groupClasses)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    checked={formData.groupClasses}
                    onChange={() => handleInputChange('groupClasses', !formData.groupClasses)}
                  />
                  <div>
                    <span className="font-medium">Add Expert Group Classes</span>
                    <p className="text-xs text-muted-foreground">Live sessions with SAT specialists</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">+$50/week</span>
              </div>
            </div>

            {/* Embedded Payment Form */}
            <PaymentForm 
              formData={formData}
              onPaymentSuccess={() => window.location.href = '/dashboard'}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Elements stripe={stripePromise}>
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

              {currentStep < 2 && (
                <Button
                  onClick={currentStep === 1 ? handleCompleteSignup : nextStep}
                  className="flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <span>{currentStep === 1 ? (isLoading ? 'Creating Account...' : 'Create Account & Continue') : 'Continue'}</span>
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
    </Elements>
  );
};

export default OnboardingFlow;