import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SubscriptionProvider } from "@/components/SubscriptionProvider";
import { SupportChatbot } from "@/components/SupportChatbot";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Pages
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Consulting from "./pages/Consulting";
import GroupClasses from "./pages/GroupClasses";
import GroupClassesSuccess from "./pages/GroupClasses/Success";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ExamPicker from "./pages/ExamPicker";
import Diagnostic from "./pages/Diagnostic";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Mocks from "./pages/Mocks";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Quiz from "./routes/Quiz";
import TutorStudio from "./pages/TutorStudio";
import Admin from "./pages/Admin";
import DiagnosticChoice from "./components/DiagnosticChoice";
import FeedbackButton from "@/components/FeedbackButton";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop(); // This hook will scroll to top on route changes
  
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/group-classes" element={<GroupClasses />} />
        <Route path="/group-classes/success" element={<GroupClassesSuccess />} />
        
        {/* Authentication */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        
        {/* Legacy routes for backwards compatibility */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Core App Flow */}
        <Route path="/get-started" element={<DiagnosticChoice />} />
        <Route path="/exam-picker" element={<ExamPicker />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Practice & Assessment */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/mocks" element={<Mocks />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        
        {/* Role-based Pages */}
        <Route path="/tutor-studio" element={<TutorStudio />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SupportChatbot />
    </>
  );
};

const App = () => {
  console.log('App component rendering');
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;


