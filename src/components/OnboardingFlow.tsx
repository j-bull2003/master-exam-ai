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

  const totalSteps = 5;
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

  const handlePaymentSuccess = () => {
    console.log('Payment successful, redirecting to dashboard...');
    // Redirect to dashboard after successful payment
    window.location.href = '/dashboard';
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      console.log('Starting signup process...');
      
      // Create the user account
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
        
        // If user already exists, try to sign them in
        if (authError.message?.includes('already') || authError.message?.includes('registered')) {
          console.log('User exists, trying to sign in...');
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
          });
          
          if (signInError) {
            throw new Error("Account exists but password is incorrect. Please try logging in instead.");
          }
          
          toast({
            title: "Welcome back!",
            description: "Signed in successfully. Proceeding to payment setup.",
          });
        } else {
          throw authError;
        }
      } else {
        console.log('Signup successful:', authData);
        
        // Check if email confirmation is required
        if (authData.user && !authData.session) {
          toast({
            title: "Check Your Email",
            description: "We've sent you a confirmation link. Please check your email and click the link to activate your account.",
            duration: 8000,
          });
          
          // Set a different step or state to show email confirmation message
          setCurrentStep(5); // We'll add this step
          setIsLoading(false);
          return;
        }
        
        toast({
          title: "Account Created!",
          description: "Your account has been created successfully.",
        });
      }

      // Proceed to payment step
      setCurrentStep(3);
      
    } catch (error: any) {
      console.error('Registration error:', error);
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
              <Users className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select your billing period and optional add-ons</p>
            </div>

            {/* Platform Billing Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Platform Access</h3>
              <div className="grid gap-4">
                {/* Monthly Option */}
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.billingPeriod === 'monthly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('billingPeriod', 'monthly')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        formData.billingPeriod === 'monthly' ? 'border-primary bg-primary' : 'border-gray-300'
                      }`} />
                      <div>
                        <h4 className="font-semibold">Monthly Billing</h4>
                        <p className="text-sm text-muted-foreground">Pay month-to-month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">$159.99/month</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">3-Day Trial</Badge>
                    </div>
                  </div>
                </div>

                {/* Yearly Option */}
                <div 
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.billingPeriod === 'yearly' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('billingPeriod', 'yearly')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        formData.billingPeriod === 'yearly' ? 'border-primary bg-primary' : 'border-gray-300'
                      }`} />
                      <div>
                        <h4 className="font-semibold">Yearly Billing</h4>
                        <p className="text-sm text-muted-foreground">Save with annual payment</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">$39.99/month</span>
                        <Badge className="bg-green-600 text-white">Save $1,440</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">$479.99 billed annually</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">3-Day Trial</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Optional Add-ons</h3>
              <div 
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
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
                      <h4 className="font-semibold">Expert Group Classes</h4>
                      <p className="text-sm text-muted-foreground">Live sessions with SAT specialists</p>
                      <ul className="text-xs text-muted-foreground mt-1">
                        <li>• Weekly strategy workshops</li>
                        <li>• Direct access to expert tutors</li>
                        <li>• Small group interactive sessions</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">+$50/week</div>
                    <p className="text-xs text-muted-foreground">Billed separately</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Platform Features (All Plans)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI-powered personalized study plans</li>
                <li>• Unlimited practice questions</li>
                <li>• Performance analytics & insights</li>
                <li>• Progress tracking & diagnostics</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return <PaymentForm 
          formData={formData}
          onPaymentSuccess={handlePaymentSuccess}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />;

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Star className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Welcome to UniHack!</h2>
              <p className="text-muted-foreground">Your account is set up and ready to go</p>
            </div>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    <span className="text-lg font-semibold text-green-800">
                      {formData.groupClasses ? 'Payment Processed & Trial Started' : 'Trial Started Successfully'}
                    </span>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>✓ Account created and payment method saved</li>
                      <li>✓ 3-day free trial activated</li>
                      {formData.groupClasses && <li>✓ Group classes access confirmed</li>}
                      <li>→ Time for your diagnostic test!</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/diagnostic'}
                size="lg"
                className="w-full h-14 text-lg"
              >
                Take Your Diagnostic Test →
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                This will help us create your personalized study plan
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Mail className="mx-auto h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Check Your Email</h2>
              <p className="text-muted-foreground">We've sent you a confirmation link</p>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">What to do next:</h4>
                    <ul className="text-sm space-y-2 text-blue-700">
                      <li>1. Check your email inbox for {formData.email}</li>
                      <li>2. Click the confirmation link in the email</li>
                      <li>3. Return here to continue your setup</li>
                    </ul>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Didn't receive the email? Check your spam folder or</p>
                    <button 
                      onClick={handleSignUp}
                      className="text-primary hover:underline"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'click here to resend'}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={() => window.location.href = '/auth/login'}
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg"
              >
                Go to Login Page
              </Button>
            </div>
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

                {currentStep < 3 && (
                  <Button
                    onClick={currentStep === 1 ? handleSignUp : nextStep}
                    className="flex items-center space-x-2"
                    disabled={isLoading}
                  >
                    <span>{currentStep === 1 ? (isLoading ? 'Creating Account...' : 'Create Account') : 'Continue'}</span>
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