-- Add subscription and trial information to user profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial',
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '3 days'),
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create subscription_status enum type
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status_enum') THEN
        CREATE TYPE subscription_status_enum AS ENUM ('trial', 'active', 'canceled', 'expired');
    END IF;
END $$;

-- First update existing rows to use valid enum values
UPDATE public.profiles SET subscription_status = 'trial' WHERE subscription_status IS NULL OR subscription_status = '';

-- Drop the default temporarily
ALTER TABLE public.profiles ALTER COLUMN subscription_status DROP DEFAULT;

-- Update the column to use the enum
ALTER TABLE public.profiles 
ALTER COLUMN subscription_status TYPE subscription_status_enum USING subscription_status::subscription_status_enum;

-- Add the default back with enum value
ALTER TABLE public.profiles ALTER COLUMN subscription_status SET DEFAULT 'trial'::subscription_status_enum;