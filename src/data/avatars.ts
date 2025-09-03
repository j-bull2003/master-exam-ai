export type AvatarId = "coach" | "mentor" | "buddy";

export interface AvatarConfig {
  name: string;
  assets: {
    avatar: string;
  };
  theme: {
    accent: string;
    bgGradient: string;
    backgroundPattern?: string;
    atmosphere: {
      primary: string;
      secondary: string;
      surface: string;
      muted: string;
    };
    card: {
      radius: string;
      shadow: string;
      border: string;
    };
    motion: {
      intensity: "low" | "medium" | "high";
      successFx: "pulse" | "checkmark" | "confetti-dots";
    };
    typography: {
      headingFont: string;
      bodyFont: string;
    };
    special: {
      name: string;
      description: string;
      effect: string;
    };
  };
  coaching: {
    tone: "energetic" | "calm-precise" | "casual";
    hintPolicy: "early-short" | "late-structured" | "on-demand";
    explainFormat: string;
    motivate: (context: { examType?: string; examDate?: string }) => string;
  };
}

export const avatars: Record<AvatarId, AvatarConfig> = {
  coach: {
    name: "Coach",
    assets: { 
      avatar: "/lovable-uploads/14f9398d-1ef4-4b74-b650-684a4e6ce4d2.png"
    },
    theme: {
      accent: "hsl(210, 90%, 55%)",
      bgGradient: "from-slate-900 via-blue-900 to-slate-900",
      backgroundPattern: "circuit-pattern",
      atmosphere: {
        primary: "hsl(210, 100%, 60%)",
        secondary: "hsl(210, 50%, 40%)",
        surface: "hsl(210, 40%, 8%)",
        muted: "hsl(210, 20%, 25%)"
      },
      card: { 
        radius: "1.25rem", 
        shadow: "shadow-lg shadow-blue-500/20",
        border: "border-blue-500/30"
      },
      motion: { intensity: "high", successFx: "pulse" },
      typography: {
        headingFont: "font-bold tracking-tight",
        bodyFont: "font-medium"
      },
      special: {
        name: "Performance Mode",
        description: "High-energy training environment with instant feedback",
        effect: "2x streak multiplier for correct answers in a row"
      }
    },
    coaching: {
      tone: "energetic",
      hintPolicy: "early-short",
      explainFormat: "3-5 steps + key takeaway",
      motivate: ({ examType, examDate }) =>
        examType && examDate
          ? `Sprint time: ${examType} on ${examDate}. One focused set now!`
          : "One focused set. Let's move the needle."
    }
  },
  mentor: {
    name: "Mentor",
    assets: { 
      avatar: "/lovable-uploads/34cb225c-7816-41e3-a03c-099855b1b4a0.png"
    },
    theme: {
      accent: "hsl(160, 70%, 45%)",
      bgGradient: "from-emerald-950 via-teal-900 to-emerald-950",
      backgroundPattern: "geometric-grid",
      atmosphere: {
        primary: "hsl(160, 80%, 50%)",
        secondary: "hsl(160, 40%, 35%)",
        surface: "hsl(160, 30%, 8%)",
        muted: "hsl(160, 15%, 25%)"
      },
      card: { 
        radius: "1rem", 
        shadow: "shadow-md shadow-emerald-500/15",
        border: "border-emerald-500/25"
      },
      motion: { intensity: "medium", successFx: "checkmark" },
      typography: {
        headingFont: "font-semibold tracking-normal",
        bodyFont: "font-normal"
      },
      special: {
        name: "Scholar Mode",
        description: "Academic environment with detailed explanations",
        effect: "Unlock detailed solution breakdowns for every question"
      }
    },
    coaching: {
      tone: "calm-precise",
      hintPolicy: "late-structured",
      explainFormat: "definition → principle → example",
      motivate: ({ examType, examDate }) =>
        examType && examDate
          ? `Steady progress toward ${examType} (${examDate}). Consistency wins.`
          : "Clarity first, then practice. I'm here."
    }
  },
  buddy: {
    name: "Buddy",
    assets: { 
      avatar: "/lovable-uploads/3a535299-2c20-4dc9-a443-a5b0e448a8cb.png"
    },
    theme: {
      accent: "hsl(280, 80%, 60%)",
      bgGradient: "from-purple-950 via-pink-900 to-purple-950",
      backgroundPattern: "dots-pattern",
      atmosphere: {
        primary: "hsl(280, 90%, 65%)",
        secondary: "hsl(280, 50%, 45%)",
        surface: "hsl(280, 40%, 8%)",
        muted: "hsl(280, 20%, 25%)"
      },
      card: { 
        radius: "1.5rem", 
        shadow: "shadow shadow-purple-500/20",
        border: "border-purple-500/30"
      },
      motion: { intensity: "low", successFx: "confetti-dots" },
      typography: {
        headingFont: "font-medium tracking-wide",
        bodyFont: "font-normal"
      },
      special: {
        name: "Zen Mode",
        description: "Relaxed learning with gentle encouragement",
        effect: "Stress-free practice with unlimited time per question"
      }
    },
    coaching: {
      tone: "casual",
      hintPolicy: "on-demand",
      explainFormat: "short tips + tiny example",
      motivate: ({ examType, examDate }) =>
        examType && examDate
          ? `${examType} in sight for ${examDate}. Tiny win time.`
          : "Tiny win time. Let's go."
    }
  }
} as const;

export const getAvatar = (avatarId: AvatarId): AvatarConfig => {
  return avatars[avatarId];
};

export const getAvatarIds = (): AvatarId[] => {
  return Object.keys(avatars) as AvatarId[];
};