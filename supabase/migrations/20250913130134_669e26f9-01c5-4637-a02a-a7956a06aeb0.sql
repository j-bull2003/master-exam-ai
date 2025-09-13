-- Disable email confirmation requirement for immediate access
-- This will be handled in Supabase settings, but we'll create a function to auto-confirm users

CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS trigger AS $$
BEGIN
  -- This function will be called after user signup to auto-confirm
  NEW.email_confirmed_at = now();
  NEW.confirmed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;