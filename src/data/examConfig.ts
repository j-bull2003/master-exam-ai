// Centralized exam configuration with availability status
export const AVAILABLE_EXAMS = ["TMUA", "MAT", "SAT", "UCAT"];

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
    id: "ucat",
    name: "UCAT",
    fullName: "University Clinical Aptitude Test",
    description: "Required for medicine and dentistry applications in UK, Australia, and New Zealand",
    region: "UK",
    duration: "2 hours",
    sections: ["Verbal Reasoning", "Decision Making", "Quantitative Reasoning", "Abstract Reasoning", "Situational Judgement"],
    students: "30,000+",
    universities: ["Oxford Medical", "Cambridge Medical", "Imperial"],
    scoreRange: "1200-3600",
    available: true
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    description: "Standardized test for college admissions in the United States",
    region: "US",
    duration: "3 hours",
    sections: ["Reading and Writing", "Math"],
    students: "2M+",
    universities: ["Harvard", "Stanford", "MIT", "Yale"],
    scoreRange: "400-1600",
    available: true
  },
  {
    id: "act",
    name: "ACT",
    fullName: "American College Testing",
    description: "Standardized test for college admissions in the United States",
    region: "US",
    duration: "3 hours",
    sections: ["English", "Math", "Reading", "Science", "Writing (Optional)"],
    students: "1.8M+",
    universities: ["Northwestern", "University of Chicago", "Duke"],
    scoreRange: "1-36",
    available: false
  },
  {
    id: "step",
    name: "STEP",
    fullName: "Sixth Term Examination Paper",
    description: "Mathematics examination for Cambridge and other top UK universities",
    region: "UK",
    duration: "3 hours",
    sections: ["Pure Mathematics", "Mechanics", "Statistics"],
    students: "5,000+",
    universities: ["Cambridge", "Oxford"],
    scoreRange: "Grades 1-S",
    available: false
  },
  {
    id: "mat",
    name: "MAT",
    fullName: "Mathematics Admissions Test",
    description: "Required for mathematics courses at Oxford and other universities",
    region: "UK",
    duration: "2.5 hours",
    sections: ["Multiple Choice", "Longer Problems"],
    students: "3,000+",
    universities: ["Oxford", "Imperial", "Warwick"],
    scoreRange: "0-100",
    available: true
  },
  {
    id: "tmua",
    name: "TMUA",
    fullName: "Test of Mathematics for University Admission",
    description: "Mathematics test for university admissions in the UK",
    region: "UK",
    duration: "2.5 hours",
    sections: ["Mathematical Thinking", "Mathematical Reasoning"],
    students: "2,000+",
    universities: ["Cambridge", "Durham", "LSE"],
    scoreRange: "1.0-9.0",
    available: true
  },
  {
    id: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    description: "Standardized test for business school admissions",
    region: "INTL",
    duration: "3.5 hours",
    sections: ["Analytical Writing", "Integrated Reasoning", "Quantitative", "Verbal"],
    students: "200,000+",
    universities: ["Harvard Business", "Wharton", "Stanford GSB"],
    scoreRange: "200-800",
    available: false
  },
  {
    id: "gre",
    name: "GRE",
    fullName: "Graduate Record Examinations",
    description: "Standardized test for graduate school admissions",
    region: "INTL",
    duration: "3 hours 45 minutes",
    sections: ["Analytical Writing", "Verbal Reasoning", "Quantitative Reasoning"],
    students: "500,000+",
    universities: ["Stanford", "MIT", "Berkeley"],
    scoreRange: "260-340",
    available: false
  },
  {
    id: "lnat",
    name: "LNAT",
    fullName: "Law National Aptitude Test",
    description: "Required for law admissions at top UK universities",
    region: "UK",
    duration: "2.25 hours",
    sections: ["Multiple Choice", "Essay"],
    students: "10,000+",
    universities: ["Oxford Law", "Cambridge Law", "UCL Law"],
    scoreRange: "0-42",
    available: false
  }
];

// For display on homepage - mix of available and coming soon
export const HOMEPAGE_EXAMS = EXAM_CONFIGS.map(exam => exam.name);

// For onboarding - only available exams
export const ONBOARDING_EXAMS = EXAM_CONFIGS.filter(exam => exam.available);