import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, CreditCard, Calendar, GraduationCap, Target, Clock, Users, Star, Shield } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const universities = [
  'Harvard University', 'Stanford University', 'MIT', 'Yale University', 'Princeton University',
  'Columbia University', 'University of Pennsylvania', 'Dartmouth College', 'Brown University',
  'Cornell University', 'UCLA', 'UC Berkeley', 'Northwestern University', 'University of Chicago',
  'Duke University', 'Johns Hopkins University', 'Vanderbilt University', 'Rice University',
  'Georgetown University', 'Carnegie Mellon University'
];

const targetScores = [
  { range: '1200-1299', description: 'Good foundation, room for growth' },
  { range: '1300-1399', description: 'Strong performance, competitive' },
  { range: '1400-1499', description: 'Excellent, top-tier ready' },
  { range: '1500-1600', description: 'Elite level, Ivy League target' }
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const { signUp, signIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    targetUniversity: '',
    targetScore: '',
    examDate: '',
    currentScore: '',
    studyHours: '',
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

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        break;
      case 2:
        if (!formData.targetUniversity) newErrors.targetUniversity = 'Please select your target university';
        if (!formData.targetScore) newErrors.targetScore = 'Please select your target score range';
        break;
      case 3:
        if (!formData.examDate) newErrors.examDate = 'Please select your exam date';
        if (!formData.currentScore) newErrors.currentScore = 'Please enter your current score or estimate';
        if (!formData.studyHours) newErrors.studyHours = 'Please select your available study hours';
        break;
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

  const calculatePersonalizedPrice = () => {
    const basePrice = 159.99;
    const targetScoreIndex = targetScores.findIndex(score => score.range === formData.targetScore);
    const urgencyMultiplier = formData.examDate && new Date(formData.examDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? 1.2 : 1;
    
    return Math.round(basePrice * urgencyMultiplier * 100) / 100;
  };

  const handleCreateAccount = async () => {
    setIsLoading(true);
    try {
      // Try to sign up first
      const { error: authError } = await signUp(
        formData.email,
        formData.password,
        formData.name.split(' ')[0],
        formData.name.split(' ').slice(1).join(' ')
      );

      // If user already exists, sign them in
      if (authError && authError.message?.includes('already')) {
        const { error: signInError } = await signIn(formData.email, formData.password);
        if (signInError) {
          throw new Error("Email already registered. Please use a different email or sign in.");
        }
      } else if (authError) {
        throw new Error(authError.message || 'Registration failed');
      }

      // Wait for session to be established
      let retries = 0;
      let session = null;
      
      while (retries < 10 && !session) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const { data } = await supabase.auth.getSession();
        session = data.session;
        retries++;
      }

      if (!session) {
        throw new Error("Authentication successful but session not established. Please refresh and try again.");
      }

      // Update profile with onboarding data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          target_university: formData.targetUniversity,
          exam_date: formData.examDate,
          exam_type: 'SAT',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw new Error('Failed to save profile data');
      }

      // If group classes selected, process payment immediately
      if (formData.groupClasses) {
        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
          body: {
            priceId: 'price_1S6r2zLBctfCMRN8IkI7sagv', // Group classes price
            mode: 'payment',
            metadata: {
              exam_date: formData.examDate,
              target_university: formData.targetUniversity,
              target_score: formData.targetScore,
              group_classes: 'true'
            }
          }
        });

        if (checkoutError) {
          throw new Error('Failed to create payment session');
        }

        if (checkoutData?.url) {
          window.open(checkoutData.url, '_blank');
        }
      }

      // Start 3-day trial for platform access
      const { data: trialData, error: trialError } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: 'price_1S6XpdLBctfCMRN8nJ7Gqaus', // Monthly platform access
          mode: 'subscription',
          trial_period_days: 3,
          metadata: {
            exam_date: formData.examDate,
            target_university: formData.targetUniversity,
            target_score: formData.targetScore,
            trial_type: 'platform_access'
          }
        }
      });

      if (trialError) {
        throw new Error('Failed to create trial session');
      }

      if (trialData?.url) {
        window.location.href = trialData.url;
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
              <h2 className="text-2xl font-bold text-foreground">Welcome to UniHack</h2>
              <p className="text-muted-foreground">Let's create your personalized SAT prep journey</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <GraduationCap className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Your Dream University</h2>
              <p className="text-muted-foreground">Where do you see yourself studying?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="targetUniversity">Target University</Label>
                <Select value={formData.targetUniversity} onValueChange={(value) => handleInputChange('targetUniversity', value)}>
                  <SelectTrigger className={errors.targetUniversity ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your dream university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.targetUniversity && <p className="text-sm text-destructive mt-1">{errors.targetUniversity}</p>}
              </div>

              <div>
                <Label htmlFor="targetScore">Target SAT Score</Label>
                <div className="grid gap-3 mt-2">
                  {targetScores.map((score) => (
                    <div
                      key={score.range}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.targetScore === score.range 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('targetScore', score.range)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{score.range}</div>
                          <div className="text-sm text-muted-foreground">{score.description}</div>
                        </div>
                        {formData.targetScore === score.range && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.targetScore && <p className="text-sm text-destructive mt-1">{errors.targetScore}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Calendar className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Your Study Plan</h2>
              <p className="text-muted-foreground">Help us personalize your preparation timeline</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="examDate">SAT Test Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => handleInputChange('examDate', e.target.value)}
                  className={errors.examDate ? 'border-destructive' : ''}
                />
                {errors.examDate && <p className="text-sm text-destructive mt-1">{errors.examDate}</p>}
              </div>

              <div>
                <Label htmlFor="currentScore">Current SAT Score (or estimate)</Label>
                <Input
                  id="currentScore"
                  placeholder="e.g. 1200 or 'Haven't taken yet'"
                  value={formData.currentScore}
                  onChange={(e) => handleInputChange('currentScore', e.target.value)}
                  className={errors.currentScore ? 'border-destructive' : ''}
                />
                {errors.currentScore && <p className="text-sm text-destructive mt-1">{errors.currentScore}</p>}
              </div>

              <div>
                <Label htmlFor="studyHours">Available Study Hours per Week</Label>
                <Select value={formData.studyHours} onValueChange={(value) => handleInputChange('studyHours', value)}>
                  <SelectTrigger className={errors.studyHours ? 'border-destructive' : ''}>
                    <SelectValue placeholder="How many hours can you dedicate?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 hours (Light prep)</SelectItem>
                    <SelectItem value="4-6">4-6 hours (Moderate prep)</SelectItem>
                    <SelectItem value="7-10">7-10 hours (Intensive prep)</SelectItem>
                    <SelectItem value="10+">10+ hours (Max effort)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.studyHours && <p className="text-sm text-destructive mt-1">{errors.studyHours}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Users className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Boost Your Success</h2>
              <p className="text-muted-foreground">Add expert-led group classes to accelerate your progress</p>
            </div>

            <div className="grid gap-4">
              {/* Platform Only Option */}
              <div className={`p-6 border rounded-lg ${!formData.groupClasses ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 ${!formData.groupClasses ? 'border-primary bg-primary' : 'border-gray-300'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Platform Access Only</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                      <li>• AI-powered personalized study plans</li>
                      <li>• Unlimited practice questions</li>
                      <li>• Performance analytics & insights</li>
                      <li>• 3-day free trial, then $159.99/month</li>
                    </ul>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="w-3 h-3 mr-1" />
                      3-Day Free Trial
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Platform + Group Classes Option */}
              <div className={`p-6 border rounded-lg ${formData.groupClasses ? 'border-primary bg-primary/5' : 'border-border'}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 ${formData.groupClasses ? 'border-primary bg-primary' : 'border-gray-300'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Platform + Expert Group Classes</h3>
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                      <li>• Everything in Platform Access</li>
                      <li>• Live expert-led group sessions</li>
                      <li>• Weekly strategy workshops</li>
                      <li>• Direct access to SAT specialists</li>
                      <li>• $50 today + 3-day free trial on platform</li>
                    </ul>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        3-Day Platform Trial
                      </Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Immediate Access
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleInputChange('groupClasses', !formData.groupClasses)}>
              <Checkbox 
                checked={formData.groupClasses} 
                onCheckedChange={(checked) => handleInputChange('groupClasses', checked)}
              />
              <label className="text-sm cursor-pointer">
                Add group classes to accelerate my SAT prep
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CreditCard className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Ready to Start Your Journey</h2>
              <p className="text-muted-foreground">Your personalized SAT prep plan is ready</p>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Your Personalized Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Target University:</span>
                    <p className="font-semibold">{formData.targetUniversity}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target Score:</span>
                    <p className="font-semibold">{formData.targetScore}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Test Date:</span>
                    <p className="font-semibold">{new Date(formData.examDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Study Time:</span>
                    <p className="font-semibold">{formData.studyHours} hours/week</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Platform Access (3-day trial)</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    {formData.groupClasses && (
                      <div className="flex justify-between">
                        <span>Expert Group Classes</span>
                        <span className="font-semibold">$50.00</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total Today:</span>
                      <span>{formData.groupClasses ? '$50.00' : 'Free'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={handleCreateAccount}
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? 'Creating Your Account...' : 'Start My SAT Journey'}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Cancel anytime. No hidden fees.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
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

            {currentStep < totalSteps && (
              <Button
                onClick={nextStep}
                className="flex items-center space-x-2"
              >
                <span>Continue</span>
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
  );
};

export default OnboardingFlow;