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
    <Button variant="outline" size="sm" className={`mode-button flex items-center gap-2 ${className}`}>
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
      <DialogContent className="dialog-content sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 mode-text">
            <Lightbulb className="h-6 w-6" style={{ color: 'var(--primary)' }} />
            Choose Your Study Mode
          </DialogTitle>
          <DialogDescription className="text-base mode-text-muted">
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
                    className={`mode-card transition-all hover:shadow-lg border-2 ${
                      isSelected 
                        ? 'ring-2 border-4' 
                        : 'hover:border-2'
                    }`}
                    style={{
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="text-4xl p-3 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, var(--primary) 0%, var(--primary) 100%)`,
                              opacity: 0.2
                            }}
                          >
                            {mode.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl flex items-center gap-3 mode-text">
                              {mode.name}
                              {isSelected && (
                                <Badge 
                                  className="text-xs text-white" 
                                  style={{ 
                                    background: 'var(--primary)',
                                    color: 'var(--primary-foreground)'
                                  }}
                                >
                                  SELECTED
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-base font-medium mt-1 mode-text-muted">
                              {mode.tagline}
                            </CardDescription>
                            <p className="text-sm mode-text-muted mt-2">
                              {mode.optimizes}
                            </p>
                          </div>
                        </div>
                        <RadioGroupItem 
                          value={mode.id} 
                          id={mode.id}
                          className="mt-2"
                          style={{ borderColor: 'var(--primary)' }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold mode-text mb-2 flex items-center gap-1">
                            <span>✨</span> What You Get:
                          </h4>
                          <ul className="space-y-1">
                            {mode.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm mode-text-muted flex items-start gap-2">
                                <span style={{ color: 'var(--primary)' }} className="mt-0.5">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-2 mode-border border-t border-opacity-50">
                          <p className="text-xs mode-text-muted italic">
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
        
        <div className="flex items-center justify-between pt-4 mode-border border-t">
          <div className="text-xs mode-text-muted">
            🎯 Your choice transforms the entire learning environment
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="btn-outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleModeSelect}
              disabled={selectedMode === currentModeId}
              className="mode-button"
            >
              {selectedMode === currentModeId ? 'Current Mode' : 'Apply Mode'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};