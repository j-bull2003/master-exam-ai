export type ModeId = "focus" | "mentor" | "momentum";

export interface StudyMode {
  id: ModeId;
  name: string;
  tagline: string;
  icon: string;
  benefits: string[];
  optimizes: string;
  theme: {
    // Core background and surfaces
    bg: string;
    cardBg: string;
    cardBorder: string;
    
    // Text colors
    text: string;
    textMuted: string;
    
    // Accent and interactive colors
    accent: string;
    accentForeground: string;
    border: string;
    
    // Visual effects
    gradient: string;
    buttonBg: string;
    buttonHover: string;
    shadow: string;
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
    tagline: "Bright, clean, minimal environment",
    icon: "⚡",
    benefits: [
      "Clean white interface for long study sessions",
      "High contrast text for better readability", 
      "Minimal distractions, maximum concentration",
      "Blue accents for mental clarity",
      "Professional, academic feel"
    ],
    optimizes: "Distraction-free learning with high visual clarity",
    theme: {
      // Light theme with bright, clean aesthetics
      bg: "hsl(0, 0%, 98%)",
      cardBg: "hsl(0, 0%, 100%)",
      cardBorder: "hsl(220, 13%, 91%)",
      text: "hsl(222, 84%, 5%)",
      textMuted: "hsl(215, 16%, 47%)",
      accent: "hsl(221, 83%, 53%)",
      accentForeground: "hsl(0, 0%, 98%)",
      border: "hsl(220, 13%, 91%)",
      gradient: "linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(220, 14%, 96%) 100%)",
      buttonBg: "hsl(221, 83%, 53%)",
      buttonHover: "hsl(221, 83%, 45%)",
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
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
    tagline: "Calm, dark interface for deep focus",
    icon: "🎓",
    benefits: [
      "Dark theme that's easier on eyes",
      "Soft teal accents for calm focus",
      "Gentle gradients reduce eye strain", 
      "Academic atmosphere for serious study",
      "Perfect for evening study sessions"
    ],
    optimizes: "Deep comprehension with calm, focused environment",
    theme: {
      // Dark theme with soft, calming colors
      bg: "hsl(222, 47%, 11%)",
      cardBg: "hsl(215, 28%, 17%)",
      cardBorder: "hsl(215, 20%, 25%)",
      text: "hsl(213, 31%, 91%)",
      textMuted: "hsl(215, 16%, 65%)",
      accent: "hsl(142, 76%, 36%)",
      accentForeground: "hsl(0, 0%, 98%)",
      border: "hsl(215, 20%, 25%)",
      gradient: "linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(215, 28%, 17%) 100%)",
      buttonBg: "hsl(142, 76%, 36%)",
      buttonHover: "hsl(142, 76%, 32%)",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)"
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
    tagline: "Energetic gradients and vibrant colors",
    icon: "🌊", 
    benefits: [
      "Vibrant purple-pink gradients energize",
      "Dynamic color scheme keeps motivation high",
      "Lively accents make studying fun",
      "Gradient backgrounds add visual interest",
      "Perfect for breaking through study fatigue"
    ],
    optimizes: "High energy and motivation through vibrant design",
    theme: {
      // Dark theme with energetic purple-pink gradients
      bg: "hsl(240, 10%, 4%)",
      cardBg: "hsl(240, 6%, 10%)",
      cardBorder: "hsl(262, 83%, 58%)",
      text: "hsl(0, 0%, 98%)",
      textMuted: "hsl(240, 5%, 65%)",
      accent: "hsl(262, 83%, 58%)",
      accentForeground: "hsl(0, 0%, 98%)",
      border: "hsl(262, 83%, 58%)",
      gradient: "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(328, 86%, 70%) 50%, hsl(262, 83%, 58%) 100%)",
      buttonBg: "linear-gradient(135deg, hsl(262, 83%, 58%) 0%, hsl(328, 86%, 70%) 100%)",
      buttonHover: "linear-gradient(135deg, hsl(262, 83%, 52%) 0%, hsl(328, 86%, 64%) 100%)",
      shadow: "0 10px 15px -3px rgb(139 92 246 / 0.3), 0 4px 6px -4px rgb(139 92 246 / 0.3)"
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