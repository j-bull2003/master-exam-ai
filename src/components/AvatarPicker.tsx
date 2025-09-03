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
      <Avatar className="h-6 w-6">
        <AvatarImage src={currentAvatar.assets.avatar} alt={currentAvatar.name} />
        <AvatarFallback>{currentAvatar.name[0]}</AvatarFallback>
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your AI Avatar</DialogTitle>
          <DialogDescription>
            Select an AI personality to customize your learning experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4">
          {Object.entries(avatars).map(([id, avatar]) => {
            const isSelected = id === currentAvatarId;
            
            return (
              <Card 
                key={id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleAvatarSelect(id as AvatarId)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={avatar.assets.avatar} alt={avatar.name} />
                        <AvatarFallback>{avatar.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{avatar.name}</CardTitle>
                        <CardDescription className="capitalize">
                          {avatar.coaching.tone.replace('-', ' ')} approach
                        </CardDescription>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {avatar.coaching.hintPolicy.replace('-', ' ')}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {avatar.theme.motion.intensity} energy
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {avatar.coaching.explainFormat}
                    </p>
                    <div className="text-xs text-muted-foreground italic">
                      "{avatar.coaching.motivate({ examType: "SAT", examDate: "March 2024" })}"
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Your choice will be saved and applied across all learning sessions.
        </div>
      </DialogContent>
    </Dialog>
  );
};