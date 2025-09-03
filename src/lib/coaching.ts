import { type AvatarId, getAvatar } from '@/data/avatars';

export interface CoachingContext {
  examType?: string;
  examDate?: string;
  accuracy?: number;
  streakDays?: number;
  questionsAnswered?: number;
  isFirstSession?: boolean;
  lastNudges?: string[];
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

  getMotivationalMessage(context: CoachingContext): string {
    const avatar = getAvatar(this.avatarId);
    return avatar.coaching.motivate({
      examType: context.examType,
      examDate: context.examDate
    });
  }

  getHintStrategy(): 'early' | 'late' | 'on-demand' {
    const avatar = getAvatar(this.avatarId);
    
    switch (avatar.coaching.hintPolicy) {
      case 'early-short':
        return 'early';
      case 'late-structured':
        return 'late';
      case 'on-demand':
        return 'on-demand';
      default:
        return 'late';
    }
  }

  getExplanationStyle(): string {
    const avatar = getAvatar(this.avatarId);
    return avatar.coaching.explainFormat;
  }

  getSuccessFeedback(isCorrect: boolean): string {
    const avatar = getAvatar(this.avatarId);
    
    if (isCorrect) {
      switch (avatar.coaching.tone) {
        case 'energetic':
          return "Nailed it! Keep that momentum going! 🔥";
        case 'calm-precise':
          return "Correct. Well-reasoned approach.";
        case 'casual':
          return "Nice one! You're getting the hang of this.";
        default:
          return "Correct!";
      }
    } else {
      switch (avatar.coaching.tone) {
        case 'energetic':
          return "Not quite, but you're thinking! Let's break it down.";
        case 'calm-precise':
          return "Incorrect. Let's examine the reasoning step by step.";
        case 'casual':
          return "Oops! No worries, let's figure this out together.";
        default:
          return "Incorrect. Let's review this.";
      }
    }
  }

  getMilestoneNudge(context: CoachingContext): string | null {
    const avatar = getAvatar(this.avatarId);
    
    // Avoid repetition by checking recent nudges
    if (this.lastNudges.length >= 3) {
      this.lastNudges.shift();
    }
    
    let nudge: string | null = null;
    
    // Check for streak milestones
    if (context.streakDays && context.streakDays > 0 && context.streakDays % 7 === 0) {
      nudge = this.getStreakMessage(context.streakDays);
    }
    
    // Check for accuracy dips
    if (context.accuracy !== undefined && context.accuracy < 60) {
      nudge = this.getAccuracyEncouragement();
    }
    
    // Check for question milestones
    if (context.questionsAnswered && context.questionsAnswered > 0 && context.questionsAnswered % 50 === 0) {
      nudge = this.getProgressMilestone(context.questionsAnswered);
    }
    
    // First session welcome
    if (context.isFirstSession) {
      nudge = this.getWelcomeMessage(context);
    }
    
    // Avoid sending the same nudge twice
    if (nudge && !this.lastNudges.includes(nudge)) {
      this.lastNudges.push(nudge);
      return nudge;
    }
    
    return null;
  }

  private getStreakMessage(days: number): string {
    const avatar = getAvatar(this.avatarId);
    
    switch (avatar.coaching.tone) {
      case 'energetic':
        return `${days} days straight! You're on fire! 🚀`;
      case 'calm-precise':
        return `Consistent practice: ${days} consecutive days. Excellent habit formation.`;
      case 'casual':
        return `Wow, ${days} days in a row! You're totally crushing it!`;
      default:
        return `${days} day streak!`;
    }
  }

  private getAccuracyEncouragement(): string {
    const avatar = getAvatar(this.avatarId);
    
    switch (avatar.coaching.tone) {
      case 'energetic':
        return "Tough questions ahead, but you've got this! Focus and push through!";
      case 'calm-precise':
        return "Lower accuracy indicates challenging material. Review fundamentals.";
      case 'casual':
        return "These questions are tricky! Take your time, you're learning.";
      default:
        return "Keep practicing - you're improving!";
    }
  }

  private getProgressMilestone(questions: number): string {
    const avatar = getAvatar(this.avatarId);
    
    switch (avatar.coaching.tone) {
      case 'energetic':
        return `${questions} questions conquered! You're building serious momentum!`;
      case 'calm-precise':
        return `Milestone reached: ${questions} questions completed. Steady progress.`;
      case 'casual':
        return `Nice! ${questions} questions down. You're really putting in the work!`;
      default:
        return `${questions} questions completed!`;
    }
  }

  private getWelcomeMessage(context: CoachingContext): string {
    const avatar = getAvatar(this.avatarId);
    const examInfo = context.examType && context.examDate ? 
      `for your ${context.examType} on ${context.examDate}` : '';
    
    switch (avatar.coaching.tone) {
      case 'energetic':
        return `Welcome to your training ground ${examInfo}! Let's build that winning mindset!`;
      case 'calm-precise':
        return `Beginning focused practice session ${examInfo}. Consistency builds mastery.`;
      case 'casual':
        return `Hey there! Ready to tackle some questions ${examInfo}? Let's do this!`;
      default:
        return `Welcome! Let's start practicing ${examInfo}.`;
    }
  }

  getEmptyStateMessage(): string {
    const avatar = getAvatar(this.avatarId);
    
    switch (avatar.coaching.tone) {
      case 'energetic':
        return "Time to ignite your potential! Pick a practice session and let's get started!";
      case 'calm-precise':
        return "Ready to begin structured learning. Select your practice focus.";
      case 'casual':
        return "Nothing here yet, but that's about to change! What should we work on first?";
      default:
        return "Start your practice session to see your progress here.";
    }
  }

  getTone(): string {
    const avatar = getAvatar(this.avatarId);
    return avatar.coaching.tone;
  }

  getMotionIntensity(): 'low' | 'medium' | 'high' {
    const avatar = getAvatar(this.avatarId);
    return avatar.theme.motion.intensity;
  }

  getSuccessAnimation(): string {
    const avatar = getAvatar(this.avatarId);
    return avatar.theme.motion.successFx;
  }
}

// Utility function to create coaching service instance
export const createCoachingService = (avatarId: AvatarId): CoachingService => {
  return new CoachingService(avatarId);
};