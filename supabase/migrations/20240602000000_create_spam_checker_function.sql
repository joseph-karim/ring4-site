-- Create a function to check if a phone number is spam
-- This function will call the Twilio Lookup API with the Nomorobo Spam Score Add-on
CREATE OR REPLACE FUNCTION public.check_spam_score(
  phone_number TEXT,
  secondary_phone_number TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Run with the privileges of the function creator
SET search_path = public
AS $$
DECLARE
  result JSONB;
  twilio_account_sid TEXT;
  twilio_auth_token TEXT;
  nomorobo_addon_sid TEXT;
  api_url TEXT;
  api_response JSONB;
  auth_header TEXT;
  spam_score NUMERIC;
  status TEXT;
  risk_score INTEGER;
  carriers JSONB;
  recommendations JSONB;
BEGIN
  -- Validate phone number
  IF phone_number IS NULL OR length(regexp_replace(phone_number, '[^0-9]', '', 'g')) != 10 THEN
    RETURN jsonb_build_object(
      'error', 'Invalid phone number format. Please provide a 10-digit US phone number.'
    );
  END IF;

  -- Format phone number to E.164 format
  phone_number := '+1' || regexp_replace(phone_number, '[^0-9]', '', 'g');

  -- Format secondary phone number if provided
  IF secondary_phone_number IS NOT NULL AND length(regexp_replace(secondary_phone_number, '[^0-9]', '', 'g')) = 10 THEN
    secondary_phone_number := '+1' || regexp_replace(secondary_phone_number, '[^0-9]', '', 'g');
  ELSE
    secondary_phone_number := NULL;
  END IF;

  -- For development/testing, return mock data based on the last digit of the phone number
  -- In production, this would call the actual Twilio API
  -- This is a placeholder for the actual API call

  -- Get the last digit of the phone number
  spam_score := (substring(phone_number from length(phone_number) for 1))::NUMERIC % 10;

  -- Determine status and risk score based on the last digit
  IF spam_score >= 7 THEN
    status := 'flagged';
    risk_score := 85;
    carriers := jsonb_build_array(
      jsonb_build_object('name', 'AT&T', 'status', 'flagged'),
      jsonb_build_object('name', 'Verizon', 'status', 'flagged'),
      jsonb_build_object('name', 'T-Mobile', 'status', 'flagged')
    );
    recommendations := jsonb_build_array(
      'Immediate number remediation required',
      'Implement branded caller ID solutions',
      'Register with carrier reputation systems',
      'Consider number rotation strategy'
    );
  ELSIF spam_score >= 4 THEN
    status := 'at-risk';
    risk_score := 45;
    carriers := jsonb_build_array(
      jsonb_build_object('name', 'AT&T', 'status', 'clean'),
      jsonb_build_object('name', 'Verizon', 'status', 'at-risk'),
      jsonb_build_object('name', 'T-Mobile', 'status', 'clean')
    );
    recommendations := jsonb_build_array(
      'Register your number with carriers',
      'Implement branded caller ID',
      'Review your outbound calling practices'
    );
  ELSE
    status := 'clean';
    risk_score := 10;
    carriers := jsonb_build_array(
      jsonb_build_object('name', 'AT&T', 'status', 'clean'),
      jsonb_build_object('name', 'Verizon', 'status', 'clean'),
      jsonb_build_object('name', 'T-Mobile', 'status', 'clean')
    );
    recommendations := jsonb_build_array(
      'Continue monitoring your number',
      'Use branded caller ID to increase answer rates',
      'Maintain consistent calling patterns'
    );
  END IF;

  -- Build the result
  result := jsonb_build_object(
    'status', status,
    'riskScore', risk_score,
    'carriers', carriers,
    'timeChecked', to_char(now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
    'recommendations', recommendations,
    'rawData', jsonb_build_object(
      'nomoroboScore', CASE
        WHEN status = 'flagged' THEN 1
        WHEN status = 'at-risk' THEN 0.5
        ELSE 0
      END,
      'mockData', true
    )
  );

  -- Insert the result into the spam_check_results table
  INSERT INTO public.spam_check_results (
    phone_number,
    secondary_phone_number,
    status,
    risk_score,
    carriers,
    recommendations,
    raw_data
  ) VALUES (
    phone_number,
    secondary_phone_number,
    status,
    risk_score,
    carriers,
    recommendations::TEXT[],
    result->'rawData'
  );

  RETURN result;
END;
$$;

-- Create an API endpoint for the spam checker function
COMMENT ON FUNCTION public.check_spam_score IS 'Checks if a phone number is likely to be flagged as spam';

-- Grant access to the function for all users
ALTER FUNCTION public.check_spam_score SECURITY DEFINER;
REVOKE ALL ON FUNCTION public.check_spam_score FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_spam_score TO anon;
GRANT EXECUTE ON FUNCTION public.check_spam_score TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_spam_score TO service_role;
