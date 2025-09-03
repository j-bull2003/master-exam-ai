-- Add avatar_id column to profiles table
ALTER TABLE public.profiles ADD COLUMN avatar_id TEXT DEFAULT 'coach';

-- Add constraint to ensure valid avatar IDs
ALTER TABLE public.profiles ADD CONSTRAINT avatar_id_check CHECK (avatar_id IN ('coach', 'mentor', 'buddy'));