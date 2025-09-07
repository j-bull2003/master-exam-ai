export type ExamType = "SAT" | "TMUA" | "UCAT" | "STEP" | "GRE" | "GMAT" | "MAT";

export interface UserProfile {
  userId: string;
  email: string;
  full_name?: string;
  examType?: ExamType;
  examDate?: string; // ISO yyyy-mm-dd (date-only)
  targetUniversity?: string; // universityId or free-text
  targetCourse?: string;
  studyMode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingData {
  examType: ExamType;
  examDate: string;
  targetUniversity?: string;
  targetCourse?: string;
}