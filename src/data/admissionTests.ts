export interface AdmissionTest {
  id: string;
  name: string;
  topics: string[];
}

export const admissionTests: AdmissionTest[] = [
  { 
    id: "SAT",  
    name: "SAT",
    topics: [
      "Reading Comprehension", 
      "Writing & Language", 
      "Algebra I/II", 
      "Advanced Math", 
      "Problem Solving & Data Analysis"
    ] 
  },
  { 
    id: "UCAT", 
    name: "UCAT",
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
    topics: [
      "Quantitative (Arithmetic/Algebra/Geometry/Data)", 
      "Verbal (Text Completion/SE/RC)", 
      "AWA (Issue/Argument)"
    ] 
  },
  { 
    id: "GMAT", 
    name: "GMAT",
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
    topics: [
      "Mathematical Thinking", 
      "Multiple Choice Questions", 
      "Longer Problems", 
      "Pure Mathematics"
    ] 
  },
  { 
    id: "TMUA", 
    name: "TMUA",
    topics: [
      "Mathematical Thinking", 
      "Mathematical Reasoning", 
      "Problem Solving"
    ] 
  }
];