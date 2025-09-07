import { admissionTests, isExamEnabled } from "@/data/admissionTests";
import type { ExamType } from "@/types/profile";

export const testTopics: Record<ExamType, string[]> = Object.fromEntries(
  admissionTests.map(test => [test.id as ExamType, test.topics])
) as Record<ExamType, string[]>;

export const getTopicsForExam = (examType: ExamType): string[] => {
  return testTopics[examType] || [];
};

export const getTopicsForExams = (examTypes: ExamType[]): string[] => {
  // Filter to only enabled exams
  const enabledExams = examTypes.filter(examType => isExamEnabled(examType));
  const allTopics = enabledExams.flatMap(examType => testTopics[examType] || []);
  return [...new Set(allTopics)]; // Remove duplicates
};