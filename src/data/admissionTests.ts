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
      "Heart of Algebra", 
      "Problem Solving & Data Analysis",
      "Passport to Advanced Math",
      "Additional Topics in Math"
    ] 
  }
];