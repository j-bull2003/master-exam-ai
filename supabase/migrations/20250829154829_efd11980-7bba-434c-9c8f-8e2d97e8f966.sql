-- Update the existing user profile to have STEP exam and exam date
-- This fixes the issue where the user went through onboarding but profile wasn't updated

UPDATE profiles 
SET 
  exam_type = 'STEP',
  exam_date = '2025-12-18',
  updated_at = now()
WHERE 
  user_id = 'd418e353-60d1-4a53-b062-0d8583e2d00a' 
  AND exam_type IS NULL;