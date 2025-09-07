import { admissionTests } from "@/data/admissionTests";
import type { ExamType } from "@/types/profile";

export const testTopics: Record<ExamType, string[]> = Object.fromEntries(
  admissionTests.map(test => [test.id as ExamType, test.topics])
) as Record<ExamType, string[]>;

export const getTopicsForExam = (examType: ExamType): string[] => {
  return testTopics[examType] || [];
};

export const isExamEnabled = (examType: ExamType): boolean => {
  const exam = admissionTests.find(test => test.id === examType);
  return exam?.enabled || false;
};