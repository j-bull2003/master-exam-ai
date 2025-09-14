import OnboardingFlow from "@/components/OnboardingFlow";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleOnboardingComplete = () => {
    // After successful registration and payment setup, redirect to diagnostic choice
    navigate("/get-started");
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};

export default Register;