-- Seed data for spam_check_results
INSERT INTO public.spam_check_results (phone_number, status, risk_score, carriers, recommendations, raw_data)
VALUES
    ('+15551234567', 'clean', 10, 
     '[{"name": "AT&T", "status": "clean"}, {"name": "Verizon", "status": "clean"}, {"name": "T-Mobile", "status": "clean"}]'::jsonb, 
     ARRAY['Continue monitoring your number', 'Use branded caller ID to increase answer rates', 'Maintain consistent calling patterns'],
     '{"nomoroboScore": 0}'::jsonb),
    
    ('+15557654321', 'at-risk', 45, 
     '[{"name": "AT&T", "status": "clean"}, {"name": "Verizon", "status": "at-risk"}, {"name": "T-Mobile", "status": "clean"}]'::jsonb, 
     ARRAY['Register your number with carriers', 'Implement branded caller ID', 'Review your outbound calling practices'],
     '{"nomoroboScore": 0.5}'::jsonb),
    
    ('+15559876543', 'flagged', 85, 
     '[{"name": "AT&T", "status": "at-risk"}, {"name": "Verizon", "status": "flagged"}, {"name": "T-Mobile", "status": "flagged"}]'::jsonb, 
     ARRAY['Immediate number remediation required', 'Implement branded caller ID solutions', 'Register with carrier reputation systems', 'Consider number rotation strategy'],
     '{"nomoroboScore": 1}'::jsonb);

-- Seed data for verification_attempts
INSERT INTO public.verification_attempts (phone_number, status, channel)
VALUES
    ('+15551234567', 'approved', 'sms'),
    ('+15557654321', 'pending', 'sms'),
    ('+15559876543', 'failed', 'sms');
