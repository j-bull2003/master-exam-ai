export type ModeId = "focus" | "mentor" | "momentum";

export interface StudyMode {
  id: ModeId;
  name: string;
  tagline: string;
  icon: string;
  benefits: string[];
  optimizes: string;
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
  };
  coaching: {
    tone: "energetic" | "calm-precise" | "casual";
    hintPolicy: "early-short" | "late-structured" | "on-demand";
    explainFormat: string;
    motivate: (context: { examType?: string; examDate?: string }) => string;
  };
}

export const studyModes: Record<ModeId, StudyMode> = {
  focus: {
    id: "focus",
    name: "Focus Mode",
    tagline: "Peak performance training",
    icon: "⚡",
    benefits: [
      "Instant feedback for faster learning",
      "Performance tracking and streaks",
      "High-energy visual environment",
      "Quick hints to maintain momentum",
      "2x streak multiplier for accuracy"
    ],
    optimizes: "Speed and accuracy through intensive practice",
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
    id: "mentor",
    name: "Mentor Mode",
    tagline: "Deep understanding focus",
    icon: "🎓",
    benefits: [
      "Detailed explanations for every concept",
      "Academic environment design",
      "Structured learning progression",
      "Definition-based problem solving",
      "Comprehensive solution breakdowns"
    ],
    optimizes: "Thorough comprehension and long-term retention",
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
      }
    },
    coaching: {
      tone: "calm-precise",
      hintPolicy: "late-structured",
      explainFormat: "definition → principle → example",
      motivate: ({ examType, examDate }) =>
        examType && examDate
          ? `Steady progress toward ${examType} (${examDate}). Consistency wins.`
          : "Clarity first, then practice. Building understanding."
    }
  },
  momentum: {
    id: "momentum",
    name: "Momentum Mode",
    tagline: "Stress-free learning flow",
    icon: "🌊",
    benefits: [
      "Relaxed pace with unlimited time",
      "Gentle encouragement and support",
      "Minimized visual distractions",
      "Stress-reduction focused design",
      "On-demand help when needed"
    ],
    optimizes: "Confidence building and anxiety reduction",
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
      }
    },
    coaching: {
      tone: "casual",
      hintPolicy: "on-demand",
      explainFormat: "short tips + tiny example",
      motivate: ({ examType, examDate }) =>
        examType && examDate
          ? `${examType} in sight for ${examDate}. Steady progress.`
          : "Taking it step by step. You've got this."
    }
  }
} as const;

export const getStudyMode = (modeId: ModeId): StudyMode => {
  return studyModes[modeId];
};

export const getModeIds = (): ModeId[] => {
  return Object.keys(studyModes) as ModeId[];
};