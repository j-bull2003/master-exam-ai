-- Add onboarding fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS target_university text,
ADD COLUMN IF NOT EXISTS target_course text,
ADD COLUMN IF NOT EXISTS study_mode text;