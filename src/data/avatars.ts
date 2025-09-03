export type AvatarId = "coach" | "mentor" | "buddy";

export interface AvatarConfig {
  name: string;
  assets: {
    avatar: string;
  };
  theme: {
    accent: string;
    bgGradient: string;
    card: {
      radius: string;
      shadow: string;
    };
    motion: {
      intensity: "low" | "medium" | "high";
      successFx: "pulse" | "checkmark" | "confetti-dots";
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
      bgGradient: "from-slate-900 via-slate-800 to-slate-900",
      card: {
        radius: "1.25rem",
        shadow: "shadow-lg"
      },
      motion: {
        intensity: "high",
        successFx: "pulse"
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
      bgGradient: "from-zinc-950 via-zinc-900 to-zinc-950",
      card: {
        radius: "1rem",
        shadow: "shadow-md"
      },
      motion: {
        intensity: "medium",
        successFx: "checkmark"
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
      bgGradient: "from-indigo-950 via-indigo-900 to-indigo-950",
      card: {
        radius: "1.5rem",
        shadow: "shadow"
      },
      motion: {
        intensity: "low",
        successFx: "confetti-dots"
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

export const getAvatarConfig = (avatarId: AvatarId): AvatarConfig => {
  return avatars[avatarId] || avatars.coach;
};