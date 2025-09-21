-- Check and fix the database triggers that might be causing signup failures
-- Let's examine the current triggers and make sure they work properly

-- First, let's check if the profiles table structure is correct
\d public.profiles;

-- Check current triggers on auth.users
SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = 'auth.users'::regclass;

-- Let's also check if there are any issues with the trigger functions
SELECT proname, prosrc FROM pg_proc WHERE proname IN ('auto_confirm_user', 'handle_new_user', 'ensure_user_confirmed');