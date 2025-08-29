import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
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
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Login error:', error);
        setErrors({ 
          submit: error.message || "Invalid email or password. Please try again." 
        });
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      
      // Navigation will happen automatically via useEffect when user state updates
    } catch (error) {
      setErrors({ 
        submit: "Invalid email or password. Please try again." 
      });
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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

        {/* Login Form */}
        <div className="ai-glass-card p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-lg">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errors.submit && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{errors.submit}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  ref={emailInputRef}
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
                <p id="email-error" className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              ) : (
                <p id="email-help" className="text-sm text-muted-foreground">
                  We'll never share your email with anyone else
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
                  autoComplete="current-password"
                  className={`pl-12 pr-12 h-12 text-base transition-all focus:ring-2 focus:ring-primary/20 ${
                    errors.password ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, password: e.target.value }));
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  onKeyDown={handleKeyDown}
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
                <p id="password-error" className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              ) : (
                <p id="password-help" className="text-sm text-muted-foreground">
                  Minimum 6 characters
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm font-medium text-muted-foreground cursor-pointer"
                >
                  Remember me for 30 days
                </Label>
              </div>
              <Link 
                to="/auth/forgot-password" 
                className="text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all flex items-center justify-center gap-3"
              disabled={!formData.email || !formData.password || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to your account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/auth/register" 
                className="text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
              >
                Start your free trial
              </Link>
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
            Trusted by 10,000+ students worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;