import { type AvatarId, getAvatarConfig } from "@/data/avatars";

export interface CoachingContext {
  examType?: string;
  examDate?: string;
  accuracy?: number;
  streakDays?: number;
  currentLevel?: "easy" | "medium" | "hard";
  questionCount?: number;
  isCorrect?: boolean;
}

export class CoachingService {
  private avatarId: AvatarId;
  private lastNudges: string[] = [];

  constructor(avatarId: AvatarId) {
    this.avatarId = avatarId;
  }

  updateAvatar(avatarId: AvatarId) {
    this.avatarId = avatarId;
  }

  getHint(context: CoachingContext): string {
    const config = getAvatarConfig(this.avatarId);
    
    switch (config.coaching.hintPolicy) {
      case "early-short":
        return this.getEarlyShortHint(context);
      case "late-structured":
        return this.getLateStructuredHint(context);
      case "on-demand":
        return this.getOnDemandHint(context);
      default:
        return "Let me help you think through this step by step.";
    }
  }

  getExplanation(context: CoachingContext): string {
    const config = getAvatarConfig(this.avatarId);
    const format = config.coaching.explainFormat;
    
    if (format.includes("steps")) {
      return this.getStepByStepExplanation(context);
    } else if (format.includes("definition")) {
      return this.getDefinitionBasedExplanation(context);
    } else if (format.includes("tips")) {
      return this.getTipsBasedExplanation(context);
    }
    
    return "Let me break this down for you.";
  }

  getMotivationalMessage(context: CoachingContext): string {
    const config = getAvatarConfig(this.avatarId);
    const message = config.coaching.motivate({
      examType: context.examType,
      examDate: context.examDate
    });

    // Avoid repetition
    if (this.lastNudges.includes(message)) {
      return this.getAlternativeMotivation(context);
    }

    this.lastNudges.push(message);
    if (this.lastNudges.length > 3) {
      this.lastNudges.shift();
    }

    return message;
  }

  getSuccessMessage(context: CoachingContext): string {
    const config = getAvatarConfig(this.avatarId);
    
    switch (config.coaching.tone) {
      case "energetic":
        return this.getEnergeticSuccess(context);
      case "calm-precise":
        return this.getCalmSuccess(context);
      case "casual":
        return this.getCasualSuccess(context);
      default:
        return "Well done!";
    }
  }

  getEncouragement(context: CoachingContext): string {
    const config = getAvatarConfig(this.avatarId);
    
    switch (config.coaching.tone) {
      case "energetic":
        return "Don't sweat it! Every champion has missed shots. Reset and fire again! 🔥";
      case "calm-precise":
        return "This is valuable learning. Review the concept and try a similar problem.";
      case "casual":
        return "No worries! That's how we learn. Let's try another one.";
      default:
        return "Keep going, you're learning!";
    }
  }

  private getEarlyShortHint(context: CoachingContext): string {
    return "Quick tip: Focus on the key information in the question.";
  }

  private getLateStructuredHint(context: CoachingContext): string {
    return "Let's approach this systematically: 1) Identify what we know, 2) Determine what we need to find, 3) Choose the appropriate method.";
  }

  private getOnDemandHint(context: CoachingContext): string {
    return "Take your time. What part feels tricky?";
  }

  private getStepByStepExplanation(context: CoachingContext): string {
    return "Here's the breakdown: Step 1: Analyze the question. Step 2: Apply the concept. Step 3: Check your answer. Key takeaway: Remember this pattern for similar questions.";
  }

  private getDefinitionBasedExplanation(context: CoachingContext): string {
    return "Definition: Let's start with what this concept means. Principle: Here's how it works in practice. Example: This is how you'd apply it to this specific problem.";
  }

  private getTipsBasedExplanation(context: CoachingContext): string {
    return "Quick tip: Look for this pattern next time. Mini example: Just like this simple case.";
  }

  private getAlternativeMotivation(context: CoachingContext): string {
    const alternatives = [
      "You're building momentum. Keep it flowing!",
      "Each question makes you stronger. Next one!",
      "Progress beats perfection. Let's continue!"
    ];
    
    return alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  private getEnergeticSuccess(context: CoachingContext): string {
    const messages = [
      "YES! That's the energy we need! 🚀",
      "Boom! You nailed it! Keep that momentum!",
      "On fire! That's exactly right!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private getCalmSuccess(context: CoachingContext): string {
    const messages = [
      "Excellent work. Your understanding is solid.",
      "Perfect. You've grasped the concept well.",
      "Precisely right. Well reasoned."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private getCasualSuccess(context: CoachingContext): string {
    const messages = [
      "Nice one! 🎉",
      "Sweet! You got it!",
      "That's it! Easy when you know how."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}