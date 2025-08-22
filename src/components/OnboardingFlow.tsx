import { useState } from "react";
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
  Shield,
  Calendar,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OnboardingFlowProps {
  onComplete?: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selectedExam: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const exams = [
    { id: "SAT", name: "SAT", description: "Standardized Assessment Test", region: "US" },
    { id: "ACT", name: "ACT", description: "American College Testing", region: "US" },
    { id: "UCAT", name: "UCAT", description: "University Clinical Aptitude Test", region: "UK" },
    { id: "BMAT", name: "BMAT", description: "BioMedical Admissions Test", region: "UK" },
    { id: "STEP", name: "STEP", description: "Sixth Term Examination Paper", region: "UK" },
    { id: "MAT", name: "MAT", description: "Mathematics Admissions Test", region: "UK" },
    { id: "ESAT", name: "ESAT", description: "Engineering & Science Admissions Test", region: "UK" },
    { id: "LNAT", name: "LNAT", description: "Law National Aptitude Test", region: "UK" },
    { id: "TSA", name: "TSA", description: "Thinking Skills Assessment", region: "UK" },
    { id: "PAT", name: "PAT", description: "Physics Aptitude Test", region: "UK" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle subscription creation here
    onComplete?.();
  };

  const trialEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen ai-hero-section flex items-center justify-center p-6">
      <div className="ai-floating-elements"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 transition-colors duration-300 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 4
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="ai-glass-card p-8">
          {/* Step 1: Account Creation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
                <p className="text-muted-foreground">Start your AI-powered learning journey</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      className="ai-form-input pl-12"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                </div>

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
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="ai-form-input pl-12"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Exam Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Choose Your Exam</h2>
                <p className="text-muted-foreground">Select the admissions test you're preparing for</p>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  className="ai-form-input pl-12"
                  placeholder="Search for your exam..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredExams.map((exam) => (
                  <div
                    key={exam.id}
                    className={`ai-step-card cursor-pointer transition-all duration-300 ${
                      formData.selectedExam === exam.id 
                        ? 'border-primary bg-primary/10' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('selectedExam', exam.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{exam.name}</h3>
                        <p className="text-sm text-muted-foreground">{exam.description}</p>
                        <div className="ai-badge mt-2">{exam.region}</div>
                      </div>
                      {formData.selectedExam === exam.id && (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Payment Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Payment Information</h2>
                <p className="text-muted-foreground">Secure your 7-day free trial</p>
                
                <div className="ai-trial-banner mt-6">
                  <p className="font-semibold text-success flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Free until {trialEndDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">$49.99/month after trial • Cancel anytime</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      className="ai-form-input pl-12"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      className="ai-form-input"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      className="ai-form-input"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    className="ai-form-input"
                    placeholder="Full name as on card"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 p-4 rounded-lg">
                  <Shield className="w-5 h-5 text-success" />
                  <span>Powered by Stripe • 256-bit SSL encryption • PCI DSS compliant</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-success" />
              </div>
              
              <h2 className="text-3xl font-bold">Welcome to UniHack.ai!</h2>
              <p className="text-xl text-muted-foreground">Your trial is now active</p>
              
              <div className="ai-glass-card p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Trial active until:</span>
                  <span className="font-semibold">{trialEndDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Your chosen exam:</span>
                  <span className="font-semibold">{formData.selectedExam}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly cost after trial:</span>
                  <span className="font-semibold">$49.99</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  className="ai-cta-button w-full"
                  onClick={handleSubmit}
                >
                  Start Your Diagnostic Test
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  You can cancel anytime from your account settings
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/20">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.email || !formData.password)) ||
                  (currentStep === 2 && !formData.selectedExam) ||
                  (currentStep === 3 && (!formData.cardNumber || !formData.expiryDate || !formData.cvv))
                }
                className="ai-cta-button flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;