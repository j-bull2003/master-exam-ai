-- Add exam_date column to profiles table for exam date tracking
ALTER TABLE public.profiles 
ADD COLUMN exam_date DATE;