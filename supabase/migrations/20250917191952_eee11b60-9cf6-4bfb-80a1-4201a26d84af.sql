-- Enable Row Level Security on sat_questions table
ALTER TABLE public.sat_questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view SAT questions
CREATE POLICY "Anyone can view SAT questions" 
ON public.sat_questions 
FOR SELECT 
USING (true);

-- Create policy to allow admins to manage SAT questions
CREATE POLICY "Admins can manage SAT questions" 
ON public.sat_questions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));