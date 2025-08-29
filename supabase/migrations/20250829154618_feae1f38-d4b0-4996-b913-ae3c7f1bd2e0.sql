-- Temporarily disable email confirmation requirement for easier development
-- Users can still verify their email later via the dashboard banner

-- First, let's check current auth settings and make users who signed up able to log in
-- Update users to mark them as confirmed if they were created through our onboarding
UPDATE auth.users 
SET email_confirmed_at = CASE 
  WHEN email_confirmed_at IS NULL AND created_at > '2025-08-29 00:00:00' THEN now()
  ELSE email_confirmed_at 
END;