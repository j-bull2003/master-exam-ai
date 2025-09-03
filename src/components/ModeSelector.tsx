import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { studyModes, type ModeId, getStudyMode } from "@/data/modes";
import { Check, Settings, Lightbulb } from "lucide-react";

interface ModeSelectorProps {
  currentModeId: ModeId;
  onModeSelect: (modeId: ModeId) => void;
  trigger?: React.ReactNode;
  className?: string;
}

export const ModeSelector = ({ 
  currentModeId, 
  onModeSelect, 
  trigger,
  className = ""
}: ModeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(currentModeId);
  const currentMode = getStudyMode(currentModeId);

  const handleModeSelect = () => {
    onModeSelect(selectedMode);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg">{currentMode.icon}</span>
      <span className="hidden sm:inline">{currentMode.name}</span>
      <Settings className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Choose Your Study Mode
          </DialogTitle>
          <DialogDescription className="text-base">
            Select a learning environment that matches your goals and learning style.
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup 
          value={selectedMode} 
          onValueChange={(value) => setSelectedMode(value as ModeId)}
          className="grid gap-4"
        >
          {Object.values(studyModes).map((mode) => {
            const isSelected = mode.id === selectedMode;
            
            return (
              <div key={mode.id} className="relative">
                <Label htmlFor={mode.id} className="cursor-pointer">
                  <Card 
                    className={`transition-all hover:shadow-lg border-2 ${
                      isSelected 
                        ? 'ring-2 ring-primary border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                            {mode.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl flex items-center gap-3">
                              {mode.name}
                              {isSelected && (
                                <Badge className="text-xs bg-primary text-primary-foreground">
                                  SELECTED
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-base font-medium mt-1">
                              {mode.tagline}
                            </CardDescription>
                            <p className="text-sm text-muted-foreground mt-2">
                              {mode.optimizes}
                            </p>
                          </div>
                        </div>
                        <RadioGroupItem 
                          value={mode.id} 
                          id={mode.id}
                          className="mt-2"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                            <span>✨</span> What You Get:
                          </h4>
                          <ul className="space-y-1">
                            {mode.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground italic">
                            "{mode.coaching.motivate({ examType: "SAT", examDate: "March 2024" })}"
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            🎯 Your choice transforms the entire learning environment
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleModeSelect}
              disabled={selectedMode === currentModeId}
            >
              {selectedMode === currentModeId ? 'Current Mode' : 'Apply Mode'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};