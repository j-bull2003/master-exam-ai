export interface UniversityRequirement {
  universityId: string;
  universityName: string;
  specificity: "EXACT" | "VARIES" | "UNKNOWN";
  defaultExamType?: string;
  notes?: string;
}

export const universityRequirements: UniversityRequirement[] = [
  { 
    universityId: "oxford",   
    universityName: "University of Oxford",   
    specificity: "VARIES",  
    notes: "Requirement varies by course. Medicine requires UCAT, Mathematics may require MAT." 
  },
  { 
    universityId: "cambridge", 
    universityName: "University of Cambridge", 
    specificity: "VARIES",  
    notes: "Requirement varies by course; math-heavy courses may use STEP or TMUA." 
  },
  { 
    universityId: "ucl",       
    universityName: "UCL",                    
    specificity: "VARIES",  
    notes: "Varies by programme. Medicine requires UCAT." 
  },
  { 
    universityId: "kcl",       
    universityName: "King's College London",  
    specificity: "VARIES",  
    notes: "Varies by programme. Medicine requires UCAT." 
  },
  { 
    universityId: "edinburgh", 
    universityName: "University of Edinburgh", 
    specificity: "VARIES",  
    notes: "Varies by programme. Medicine requires UCAT." 
  },
  { 
    universityId: "imperial", 
    universityName: "Imperial College London", 
    specificity: "VARIES",  
    notes: "Varies by programme. Mathematics courses may require MAT." 
  },
  { 
    universityId: "harvard", 
    universityName: "Harvard University", 
    specificity: "EXACT",
    defaultExamType: "SAT",
    notes: "Requires SAT or ACT for undergraduate admissions." 
  },
  { 
    universityId: "stanford", 
    universityName: "Stanford University", 
    specificity: "EXACT",
    defaultExamType: "SAT",
    notes: "Requires SAT or ACT for undergraduate admissions." 
  },
  { 
    universityId: "mit", 
    universityName: "MIT", 
    specificity: "EXACT",
    defaultExamType: "SAT",
    notes: "Requires SAT or ACT for undergraduate admissions." 
  },
  { 
    universityId: "yale", 
    universityName: "Yale University", 
    specificity: "EXACT",
    defaultExamType: "SAT",
    notes: "Requires SAT or ACT for undergraduate admissions." 
  }
];