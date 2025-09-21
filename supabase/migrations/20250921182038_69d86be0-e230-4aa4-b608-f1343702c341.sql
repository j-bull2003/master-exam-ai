-- Fix critical security issue: Enable RLS on sat_questions table
ALTER TABLE public.sat_questions ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create a new one
DROP POLICY IF EXISTS "Authenticated users can view SAT questions" ON public.sat_questions;

-- Create policy to allow all authenticated users to read SAT questions
CREATE POLICY "Authenticated users can view SAT questions" 
ON public.sat_questions 
FOR SELECT 
TO authenticated
USING (true);

-- Fix the function search path issues by updating the functions with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, first_name, last_name, trial_start_date)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;