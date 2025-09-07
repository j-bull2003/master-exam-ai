export interface AdmissionTest {
  id: string;
  name: string;
  topics: string[];
  enabled: boolean;
  note?: string;
}

export const admissionTests: AdmissionTest[] = [
  { 
    id: "SAT",  
    name: "SAT",
    enabled: true,
    topics: [
      "Reading Comprehension", 
      "Writing & Language", 
      "Algebra I/II", 
      "Advanced Math", 
      "Problem Solving & Data Analysis"
    ] 
  },
  { 
    id: "TMUA", 
    name: "TMUA",
    enabled: true,
    topics: [
      "Mathematical Thinking", 
      "Mathematical Reasoning", 
      "Problem Solving"
    ] 
  },
  { 
    id: "UCAT", 
    name: "UCAT",
    enabled: false,
    note: "Coming soon",
    topics: [
      "Verbal Reasoning", 
      "Decision Making", 
      "Quantitative Reasoning", 
      "Abstract Reasoning", 
      "Situational Judgement"
    ] 
  },
  { 
    id: "STEP", 
    name: "STEP",
    enabled: false,
    note: "Coming soon",
    topics: [
      "Algebra", 
      "Functions", 
      "Coordinate Geometry", 
      "Sequences & Series", 
      "Trigonometry", 
      "Calculus (Differential/Integral)", 
      "Vectors", 
      "Proof & Problem-Solving"
    ] 
  },
  { 
    id: "GRE",  
    name: "GRE",
    enabled: false,
    note: "Coming soon",
    topics: [
      "Quantitative (Arithmetic/Algebra/Geometry/Data)", 
      "Verbal (Text Completion/SE/RC)", 
      "AWA (Issue/Argument)"
    ] 
  },
  { 
    id: "GMAT", 
    name: "GMAT",
    enabled: false,
    note: "Coming soon",
    topics: [
      "Quantitative", 
      "Verbal", 
      "Data Insights", 
      "AWA (if applicable)"
    ] 
  },
  { 
    id: "MAT", 
    name: "MAT",
    enabled: false,
    note: "Coming soon",
    topics: [
      "Mathematical Thinking", 
      "Multiple Choice Questions", 
      "Longer Problems", 
      "Pure Mathematics"
    ] 
  }
];