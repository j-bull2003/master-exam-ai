import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Focus email input on mount
  useEffect(() => {
    if (!emailSent) {
      emailInputRef.current?.focus();
    }
  }, [emailSent]);

  const validateEmail = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});

    try {
      // TODO: Implement actual password reset with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      setErrors({
        submit: "Unable to send reset email. Please try again."
      });
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-display font-bold">UniHack.ai</span>
          </Link>
        </div>

        {/* Forgot Password Form */}
        <Card className="border-border/40 shadow-xl backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-display font-bold">
              {emailSent ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-base">
              {emailSent 
                ? "We've sent password reset instructions to your email address."
                : "Enter your email address and we'll send you a link to reset your password."
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!emailSent ? (
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
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      onKeyDown={handleKeyDown}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : "email-help"}
                    />
                    {!errors.email && email && !/\S+@\S+\.\S+/.test(email) && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warning" />
                    )}
                    {!errors.email && email && /\S+@\S+\.\S+/.test(email) && (
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
                      We'll send reset instructions to this email address
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all" 
                  disabled={!email || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-success/20 border border-success/20 rounded-full">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-success">
                    Reset instructions sent!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                    setErrors({});
                  }} 
                  variant="outline" 
                  className="w-full h-12 text-base font-medium focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                >
                  Try different email
                </Button>
              </div>
            )}

            <div className="mt-8 text-center border-t border-border/40 pt-6">
              <Link 
                to="/auth/login" 
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;