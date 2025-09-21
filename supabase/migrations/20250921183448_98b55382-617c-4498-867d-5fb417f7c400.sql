-- Force confirm all existing users using only email_confirmed_at
-- This will ensure no "Email not confirmed" errors occur

-- First, confirm all existing unconfirmed users (only email_confirmed_at)
UPDATE auth.users 
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- Drop and recreate the auto-confirmation trigger to be more robust
DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- Create improved auto-confirmation function (only handle email_confirmed_at)
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Always auto-confirm new users immediately
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, NOW());
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-confirm all new users
CREATE TRIGGER auto_confirm_user_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_user();

-- Also create an update trigger to catch any edge cases (only email_confirmed_at)
CREATE OR REPLACE FUNCTION public.ensure_user_confirmed()
RETURNS TRIGGER AS $$
BEGIN
  -- If a user update happens and they're not confirmed, confirm them
  IF NEW.email_confirmed_at IS NULL THEN
    NEW.email_confirmed_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS ensure_user_confirmed_trigger ON auth.users;
CREATE TRIGGER ensure_user_confirmed_trigger
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.ensure_user_confirmed();