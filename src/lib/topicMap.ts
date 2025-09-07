import { admissionTests } from "@/data/admissionTests";
import type { ExamType } from "@/types/profile";

export const testTopics: Record<ExamType, string[]> = Object.fromEntries(
  admissionTests.map(test => [test.id as ExamType, test.topics])
) as Record<ExamType, string[]>;

export const getTopicsForExam = (examType: ExamType): string[] => {
  return testTopics[examType] || [];
};