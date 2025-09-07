import type { ExamType } from "@/types/profile";
import type { University } from "@/data/universities";
import { isExamEnabled } from "@/data/admissionTests";

// Map exam types to the countries/regions they're primarily used for
const examToCountryMap: Record<ExamType, string[]> = {
  "SAT": ["US"],
  "UCAT": ["UK", "Australia"], // UCAT is used in UK and Australia
  "STEP": ["UK"],
  "GRE": ["US", "Canada", "Australia", "UK"], // Graduate programs worldwide
  "GMAT": ["US", "Canada", "Australia", "UK"], // MBA programs worldwide
  "MAT": ["UK"],
  "TMUA": ["UK"]
};

export const getRelevantUniversities = (
  universities: University[], 
  selectedExamTypes: ExamType[]
): University[] => {
  // Filter to only enabled exams
  const enabledExams = selectedExamTypes.filter(examType => isExamEnabled(examType));
  
  if (enabledExams.length === 0) {
    return universities; // Show all if no enabled exams selected
  }

  // Get all countries relevant to the enabled exam types
  const relevantCountries = new Set<string>();
  enabledExams.forEach(examType => {
    examToCountryMap[examType]?.forEach(country => {
      relevantCountries.add(country);
    });
  });

  // Filter universities by relevant countries
  return universities.filter(uni => relevantCountries.has(uni.country));
};

export const getExamRecommendations = (selectedUniversities: University[]): ExamType[] => {
  const recommendations = new Set<ExamType>();
  
  selectedUniversities.forEach(uni => {
    // Recommend exams based on university country
    switch (uni.country) {
      case "UK":
        recommendations.add("UCAT");
        recommendations.add("STEP");
        recommendations.add("MAT");
        recommendations.add("TMUA");
        break;
      case "US":
        recommendations.add("SAT");
        recommendations.add("GRE");
        recommendations.add("GMAT");
        break;
      case "Australia":
        recommendations.add("UCAT");
        recommendations.add("GRE");
        recommendations.add("GMAT");
        break;
      case "Canada":
        recommendations.add("SAT");
        recommendations.add("GRE");
        recommendations.add("GMAT");
        break;
    }
  });

  return Array.from(recommendations);
};