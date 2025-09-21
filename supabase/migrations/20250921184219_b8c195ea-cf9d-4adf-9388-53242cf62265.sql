-- Check and fix the database triggers that might be causing signup failures
-- Let's examine the current triggers and make sure they work properly

-- Check current triggers on auth.users
SELECT tgname, tgenabled FROM pg_trigger WHERE tgrelid = 'auth.users'::regclass;

-- Check if there are any issues with the trigger functions
SELECT proname FROM pg_proc WHERE proname IN ('auto_confirm_user', 'handle_new_user', 'ensure_user_confirmed');

-- Check if profiles table has the correct structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;