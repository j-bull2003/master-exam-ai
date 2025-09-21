-- Delete all existing users from both tables
-- This will clean slate the user database

-- First check if there are any users
SELECT COUNT(*) as total_users FROM auth.users;
SELECT COUNT(*) as total_profiles FROM public.profiles;

-- Delete all users (this will cascade to profiles table due to foreign key)
DELETE FROM auth.users;

-- Verify deletion
SELECT COUNT(*) as remaining_users FROM auth.users;
SELECT COUNT(*) as remaining_profiles FROM public.profiles;