export type ExamType = "SAT" | "UCAT" | "STEP" | "GRE" | "GMAT" | "MAT" | "TMUA";

export interface UserProfile {
  userId: string;
  email: string;
  full_name?: string;
  examTypes: ExamType[];        // allow multi-select
  examDate?: string;            // ISO yyyy-mm-dd (date-only)
  targetUniversities: string[]; // list of universityIds
  targetCourses?: string[];     // optional free-text per uni
  studyMode?: "focus" | "mentor" | "momentum";
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingData {
  examTypes: ExamType[];
  examDate: string;
  targetUniversities: string[];
  targetCourses?: string[];
}