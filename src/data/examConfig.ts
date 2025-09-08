// Centralized exam configuration - SAT-only platform
export const AVAILABLE_EXAMS = ["SAT"];

export interface ExamConfig {
  id: string;
  name: string;
  fullName: string;
  description: string;
  region: string;
  duration: string;
  sections: string[];
  students: string;
  available: boolean;
  universities?: string[];
  scoreRange?: string;
}

export const EXAM_CONFIGS: ExamConfig[] = [
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    description: "The most comprehensive SAT preparation platform for achieving your target score",
    region: "US",
    duration: "3 hours",
    sections: ["Reading and Writing", "Math"],
    students: "2M+",
    universities: ["Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia"],
    scoreRange: "400-1600",
    available: true
  }
];

// For display on homepage - mix of available and coming soon
export const HOMEPAGE_EXAMS = EXAM_CONFIGS.map(exam => exam.name);

// For onboarding - only available exams
export const ONBOARDING_EXAMS = EXAM_CONFIGS.filter(exam => exam.available);