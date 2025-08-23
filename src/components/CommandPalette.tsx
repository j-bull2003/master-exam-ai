import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Home, 
  BookOpen, 
  DollarSign, 
  Users, 
  Settings, 
  Search,
  LogIn,
  UserPlus,
  Zap,
  Target,
  BarChart3,
  GraduationCap,
  HelpCircle
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CommandPalette = ({ open, setOpen }: CommandPaletteProps) => {
  const navigate = useNavigate();

  const pages = [
    {
      group: "Navigation",
      items: [
        { icon: Home, title: "Home", description: "Landing page", path: "/" },
        { icon: BookOpen, title: "Features", description: "Platform features", path: "/features" },
        { icon: DollarSign, title: "Pricing", description: "Subscription plans", path: "/pricing" },
        { icon: Users, title: "About", description: "About UniHack", path: "/about" },
      ]
    },
    {
      group: "Authentication",
      items: [
        { icon: LogIn, title: "Sign In", description: "Login to your account", path: "/auth/login" },
        { icon: UserPlus, title: "Sign Up", description: "Create new account", path: "/auth/register" },
      ]
    },
    {
      group: "Platform",
      items: [
        { icon: Target, title: "Diagnostic", description: "Take assessment", path: "/diagnostic" },
        { icon: GraduationCap, title: "Dashboard", description: "Study dashboard", path: "/dashboard" },
        { icon: Zap, title: "Practice", description: "Practice questions", path: "/practice" },
        { icon: BarChart3, title: "Analytics", description: "Progress tracking", path: "/analytics" },
      ]
    }
  ];

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {pages.map((group, index) => (
          <div key={group.group}>
            <CommandGroup heading={group.group}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => handleSelect(item.path)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {index < pages.length - 1 && <CommandSeparator />}
          </div>
        ))}
        
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem className="flex items-center gap-3 p-3">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-medium">Help & Support</span>
              <span className="text-xs text-muted-foreground">Get help with UniHack</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};