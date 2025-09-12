import { useState } from "react";
import ProgramSelection from "./ProgramSelection";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<"program-selection" | "account-creation">("program-selection");
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const handleProgramSelection = (program: string) => {
    setSelectedProgram(program);
    // For now, complete the onboarding after program selection
    // In a real app, this would proceed to account creation/payment
    onComplete();
  };
  
  if (currentStep === "program-selection") {
    return <ProgramSelection onComplete={handleProgramSelection} />;
  }

  // Future: Add account creation step here
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Account Creation</h2>
        <p className="text-muted-foreground mb-8">
          Selected Program: {selectedProgram}
        </p>
      </div>
    </div>
  );
};

export default OnboardingFlow;