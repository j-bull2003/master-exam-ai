import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye,
  EyeOff,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SimpleRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      console.log('User authenticated, redirecting to dashboard:', user.email);
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Focus name input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});

    try {
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName
      );
      
      if (error) {
        console.error('Registration error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('already') || error.message?.includes('User already registered')) {
          setErrors({ 
            submit: "An account with this email already exists. Please try logging in instead." 
          });
          toast({
            title: "Account already exists",
            description: "Please try logging in with your existing account.",
            variant: "destructive",
          });
        } else {
          setErrors({ 
            submit: error.message || "Registration failed. Please try again." 
          });
          toast({
            title: "Registration failed",
            description: error.message || "Please try again.",
            variant: "destructive",
          });
        }
        return;
      }
      
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to dashboard after successful registration
      console.log('Registration successful, navigating to dashboard...');
      navigate("/dashboard");
      
    } catch (error: any) {
      setErrors({ 
        submit: "Registration failed. Please try again." 
      });
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-4">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center group">
            <img 
              src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
              alt="UniHack.ai Logo" 
              className="h-32 md:h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
        </div>

        {/* Registration Form */}
        <div className="ai-glass-card p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Get Started
            </h1>
            <p className="text-muted-foreground text-lg">Create your account and start learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errors.submit && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{errors.submit}</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                  First name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    ref={nameInputRef}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={`pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                      errors.firstName ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                    }`}
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, firstName: e.target.value }));
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: "" }));
                    }}
                    onKeyDown={handleKeyDown}
                    aria-invalid={!!errors.firstName}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                  Last name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="pl-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 border-input focus:border-primary"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <div className="relative">
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
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  onKeyDown={handleKeyDown}
                  aria-invalid={!!errors.email}
                />
                {!errors.email && formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                  <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warning" />
                )}
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
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
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
            </div>

            <Button 
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all flex items-center justify-center gap-3"
              disabled={!formData.firstName || !formData.email || !formData.password || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create your account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/auth/login" 
                className="text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
              >
                Sign in here
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span>256-bit SSL encryption</span>
            <span>•</span>
            <span>SOC 2 compliant</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Join 10,000+ students worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegister;