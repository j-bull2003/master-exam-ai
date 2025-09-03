import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatars, type AvatarId, getAvatar } from "@/data/avatars";
import { Check, Palette } from "lucide-react";

interface AvatarPickerProps {
  currentAvatarId: AvatarId;
  onAvatarSelect: (avatarId: AvatarId) => void;
  trigger?: React.ReactNode;
  className?: string;
}

export const AvatarPicker = ({ 
  currentAvatarId, 
  onAvatarSelect, 
  trigger,
  className = ""
}: AvatarPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentAvatar = getAvatar(currentAvatarId);

  const handleAvatarSelect = (avatarId: AvatarId) => {
    onAvatarSelect(avatarId);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className={`flex items-center gap-2 ${className}`}>
      <Avatar className="h-6 w-6 text-lg">
        <AvatarFallback className="text-xs">{currentAvatar.assets.avatar}</AvatarFallback>
      </Avatar>
      <span className="hidden sm:inline">{currentAvatar.name}</span>
      <Palette className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold">Choose Your AI Avatar</DialogTitle>
          <DialogDescription className="text-base">
            Select an AI personality to transform your learning environment and get special powers!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3">
          {Object.entries(avatars).map(([id, avatar]) => {
            const isSelected = id === currentAvatarId;
            
            return (
              <Card 
                key={id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  isSelected ? 'ring-2 ring-primary border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleAvatarSelect(id as AvatarId)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                        {avatar.assets.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {avatar.name}
                          {isSelected && <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">ACTIVE</span>}
                        </CardTitle>
                        <CardDescription className="capitalize text-sm">
                          {avatar.coaching.tone.replace('-', ' ')} approach
                        </CardDescription>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {avatar.coaching.hintPolicy.replace('-', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {avatar.theme.motion.intensity} energy
                      </Badge>
                      <Badge 
                        variant="default" 
                        className="text-xs bg-gradient-to-r from-primary to-primary/80"
                      >
                        {avatar.theme.special.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {avatar.coaching.explainFormat}
                    </p>
                    <div className="p-2 bg-muted/50 rounded-md">
                      <p className="text-xs font-medium text-foreground mb-1">
                        🎁 Special Ability:
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {avatar.theme.special.description}
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">
                        {avatar.theme.special.effect}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2">
                      "{avatar.coaching.motivate({ examType: "SAT", examDate: "March 2024" })}"
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          🌟 Your choice transforms the entire learning environment and unlocks special abilities!
        </div>
      </DialogContent>
    </Dialog>
  );
};