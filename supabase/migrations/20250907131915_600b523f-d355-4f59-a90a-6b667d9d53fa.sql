-- Add columns to profiles table to support multi-select
ALTER TABLE public.profiles 
ADD COLUMN exam_types text[] DEFAULT '{}',
ADD COLUMN target_universities text[] DEFAULT '{}',
ADD COLUMN target_courses text[] DEFAULT '{}';

-- Update existing single values to arrays (for backward compatibility)
UPDATE public.profiles 
SET 
  exam_types = CASE WHEN exam_type IS NOT NULL THEN ARRAY[exam_type] ELSE '{}' END,
  target_universities = CASE WHEN target_university IS NOT NULL THEN ARRAY[target_university] ELSE '{}' END,
  target_courses = CASE WHEN target_course IS NOT NULL THEN ARRAY[target_course] ELSE '{}' END;