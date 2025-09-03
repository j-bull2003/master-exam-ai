import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { avatars, type AvatarId } from "@/data/avatars";
import { cn } from "@/lib/utils";

interface AvatarPickerProps {
  currentAvatar: AvatarId;
  onSelect: (avatarId: AvatarId) => void;
  size?: "sm" | "md" | "lg";
  showNames?: boolean;
}

export const AvatarPicker = ({ 
  currentAvatar, 
  onSelect, 
  size = "md",
  showNames = true 
}: AvatarPickerProps) => {
  const [hoveredAvatar, setHoveredAvatar] = useState<AvatarId | null>(null);

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16", 
    lg: "h-20 w-20"
  };

  const cardSizes = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {(Object.keys(avatars) as AvatarId[]).map((avatarId) => {
        const avatar = avatars[avatarId];
        const isSelected = currentAvatar === avatarId;
        const isHovered = hoveredAvatar === avatarId;
        
        return (
          <Card
            key={avatarId}
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:scale-105",
              cardSizes[size],
              isSelected && "ring-2 ring-primary ring-offset-2",
              isHovered && "shadow-lg"
            )}
            onClick={() => onSelect(avatarId)}
            onMouseEnter={() => setHoveredAvatar(avatarId)}
            onMouseLeave={() => setHoveredAvatar(null)}
            style={{
              background: isSelected || isHovered 
                ? `linear-gradient(135deg, ${avatar.theme.accent}15, ${avatar.theme.accent}05)`
                : undefined
            }}
          >
            <CardContent className="flex flex-col items-center space-y-2 p-0">
              <div className="relative">
                <Avatar className={cn(sizeClasses[size], "border-2 transition-colors")}>
                  <AvatarImage src={avatar.assets.avatar} alt={avatar.name} />
                  <AvatarFallback
                    style={{ backgroundColor: avatar.theme.accent + "20", color: avatar.theme.accent }}
                  >
                    {avatar.name[0]}
                  </AvatarFallback>
                </Avatar>
                
                {isSelected && (
                  <div 
                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center border-2 border-background"
                    style={{ backgroundColor: avatar.theme.accent }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              
              {showNames && (
                <div className="text-center space-y-1">
                  <p className={cn(
                    "font-medium transition-colors",
                    size === "sm" ? "text-sm" : "text-base",
                    isSelected && "text-primary"
                  )}>
                    {avatar.name}
                  </p>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ 
                      borderColor: avatar.theme.accent + "40",
                      color: avatar.theme.accent 
                    }}
                  >
                    {avatar.coaching.tone.replace("-", " ")}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};