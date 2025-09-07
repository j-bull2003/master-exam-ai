import type { ExamType } from "@/types/profile";

export type Specificity = "EXACT" | "VARIES" | "NOT_USED" | "UNKNOWN";

export interface UniExamRule {
  universityId: string;
  examType: ExamType;
  specificity: Specificity;
  notes?: string;
  courses?: string[];
}

export const universityExamMap: UniExamRule[] = [
  // UK Universities - UCAT
  { universityId: "oxford", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "cambridge", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "imperial", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "ucl", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "kcl", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "edinburgh", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "manchester", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "birmingham", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "nottingham", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "leeds", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  { universityId: "sheffield", examType: "UCAT", specificity: "VARIES", notes: "Required for Medicine courses.", courses: ["Medicine"] },
  
  // UK Universities - STEP
  { universityId: "cambridge", examType: "STEP", specificity: "VARIES", notes: "Required for Mathematics and related courses.", courses: ["Mathematics", "Computer Science", "Natural Sciences"] },
  { universityId: "imperial", examType: "STEP", specificity: "VARIES", notes: "Some Mathematics and Computing offers.", courses: ["Mathematics", "Computing"] },
  { universityId: "warwick", examType: "STEP", specificity: "VARIES", notes: "Mathematics and related programmes.", courses: ["Mathematics", "MORSE"] },
  { universityId: "bath", examType: "STEP", specificity: "VARIES", notes: "Mathematics courses.", courses: ["Mathematics"] },
  { universityId: "durham", examType: "STEP", specificity: "VARIES", notes: "Mathematics courses.", courses: ["Mathematics"] },
  
  // UK Universities - MAT
  { universityId: "oxford", examType: "MAT", specificity: "VARIES", notes: "Required for Mathematics, Computer Science, and joint courses.", courses: ["Mathematics", "Computer Science", "Mathematics and Computer Science"] },
  { universityId: "imperial", examType: "MAT", specificity: "VARIES", notes: "Some Mathematics courses.", courses: ["Mathematics"] },
  { universityId: "warwick", examType: "MAT", specificity: "VARIES", notes: "Alternative to STEP for some courses.", courses: ["Mathematics"] },
  
  // UK Universities - TMUA
  { universityId: "cambridge", examType: "TMUA", specificity: "VARIES", notes: "Some colleges for Mathematics and Economics.", courses: ["Mathematics", "Economics"] },
  { universityId: "durham", examType: "TMUA", specificity: "VARIES", notes: "Mathematics courses.", courses: ["Mathematics"] },
  { universityId: "lancaster", examType: "TMUA", specificity: "VARIES", notes: "Mathematics and related courses.", courses: ["Mathematics"] },
  { universityId: "lse", examType: "TMUA", specificity: "VARIES", notes: "Mathematics and Economics.", courses: ["Mathematics and Economics"] },
  { universityId: "warwick", examType: "TMUA", specificity: "VARIES", notes: "Alternative to MAT/STEP.", courses: ["Mathematics"] },
  
  // US Universities - SAT (most undergraduate programs)
  { universityId: "harvard", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "yale", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "princeton", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "mit", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "stanford", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "columbia", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "pennsylvania", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "dartmouth", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "brown", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "cornell", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "caltech", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "chicago", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "northwestern", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  { universityId: "duke", examType: "SAT", specificity: "EXACT", notes: "Required for undergraduate admissions." },
  
  // US Universities - GRE (graduate programs)
  { universityId: "harvard", examType: "GRE", specificity: "VARIES", notes: "Required for most graduate programs.", courses: ["Graduate Programs"] },
  { universityId: "mit", examType: "GRE", specificity: "VARIES", notes: "Required for most graduate programs.", courses: ["Graduate Programs"] },
  { universityId: "stanford", examType: "GRE", specificity: "VARIES", notes: "Required for most graduate programs.", courses: ["Graduate Programs"] },
  
  // US Universities - GMAT (business schools)
  { universityId: "harvard", examType: "GMAT", specificity: "VARIES", notes: "Required for MBA programs.", courses: ["MBA"] },
  { universityId: "stanford", examType: "GMAT", specificity: "VARIES", notes: "Required for MBA programs.", courses: ["MBA"] },
  { universityId: "pennsylvania", examType: "GMAT", specificity: "VARIES", notes: "Required for Wharton MBA.", courses: ["MBA"] },
  { universityId: "northwestern", examType: "GMAT", specificity: "VARIES", notes: "Required for Kellogg MBA.", courses: ["MBA"] },
  { universityId: "chicago", examType: "GMAT", specificity: "VARIES", notes: "Required for Booth MBA.", courses: ["MBA"] },
];

export const getExamRequirementsForUniversity = (universityId: string): UniExamRule[] => {
  return universityExamMap.filter(rule => rule.universityId === universityId);
};

export const getUniversitiesForExam = (examType: ExamType): UniExamRule[] => {
  return universityExamMap.filter(rule => rule.examType === examType);
};

export const requiresCourseSpecification = (universityId: string, examType: ExamType): boolean => {
  const rule = universityExamMap.find(rule => 
    rule.universityId === universityId && 
    rule.examType === examType
  );
  return rule?.specificity === "VARIES" || rule?.specificity === "UNKNOWN";
};