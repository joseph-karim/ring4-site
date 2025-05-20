-- Create spam_check_results table
CREATE TABLE IF NOT EXISTS public.spam_check_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL,
    secondary_phone_number TEXT,
    status TEXT NOT NULL CHECK (status IN ('clean', 'at-risk', 'flagged')),
    risk_score INTEGER NOT NULL,
    carriers JSONB NOT NULL,
    recommendations TEXT[] NOT NULL,
    raw_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create verification_attempts table
CREATE TABLE IF NOT EXISTS public.verification_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'canceled', 'failed')),
    channel TEXT NOT NULL CHECK (channel IN ('sms', 'call', 'email', 'whatsapp')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_spam_check_results_phone_number ON public.spam_check_results (phone_number);
CREATE INDEX IF NOT EXISTS idx_verification_attempts_phone_number ON public.verification_attempts (phone_number);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_spam_check_results_updated_at
BEFORE UPDATE ON public.spam_check_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_verification_attempts_updated_at
BEFORE UPDATE ON public.verification_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add Row Level Security (RLS) policies
ALTER TABLE public.spam_check_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for spam_check_results
CREATE POLICY "Allow read access to spam_check_results for all users"
ON public.spam_check_results
FOR SELECT
USING (true);

CREATE POLICY "Allow insert access to spam_check_results for all users"
ON public.spam_check_results
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update access to spam_check_results for all users"
ON public.spam_check_results
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete access to spam_check_results for all users"
ON public.spam_check_results
FOR DELETE
USING (true);

-- Create policies for verification_attempts
CREATE POLICY "Allow read access to verification_attempts for all users"
ON public.verification_attempts
FOR SELECT
USING (true);

CREATE POLICY "Allow insert access to verification_attempts for all users"
ON public.verification_attempts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update access to verification_attempts for all users"
ON public.verification_attempts
FOR UPDATE
USING (true);

CREATE POLICY "Allow delete access to verification_attempts for all users"
ON public.verification_attempts
FOR DELETE
USING (true);
