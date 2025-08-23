import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual login logic with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-6">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-4">
          <Link to="/" className="inline-flex items-center justify-center">
            <img 
              src="/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png" 
              alt="UniHack.ai Logo" 
              className="h-32 md:h-36 w-auto object-contain"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
        </div>

        {/* Login Form */}
        <div className="ai-glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="ai-form-input pl-12"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="ai-form-input pl-12 pr-12"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link 
                to="/auth/forgot-password" 
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit"
              className="ai-cta-button w-full flex items-center justify-center gap-2"
              disabled={!formData.email || !formData.password || isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary hover:underline font-semibold">
                Start your free trial
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Trusted by 10,000+ students worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;