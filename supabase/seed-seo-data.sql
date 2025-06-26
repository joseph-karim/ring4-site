-- Seed data for industries
INSERT INTO public.industries (vertical, persona_name, top_pain_points, sms_use_cases, phone_use_cases, avg_call_volume, snippet_templates) VALUES
('real-estate', 'Real Estate Agent', 
 ARRAY['Missed calls from potential buyers', 'Spam-labeled outbound calls', 'Managing multiple listings', 'After-hours inquiries'],
 ARRAY['Property showing confirmations', 'Price drop alerts', 'Open house reminders', 'Document requests'],
 ARRAY['Buyer consultations', 'Listing presentations', 'Negotiation calls', 'Contractor coordination'],
 150,
 '{"showing_confirm": "Hi {{name}}, confirming your showing at {{property}} for {{time}}. Reply Y to confirm or call to reschedule.", "followup": "Thanks for viewing {{property}} today! Any questions? I''m here to help with next steps."}'::jsonb),

('legal', 'Legal Professional',
 ARRAY['Client confidentiality concerns', 'Missed urgent calls', 'Call recording compliance', 'After-hours emergencies'],
 ARRAY['Appointment confirmations', 'Document ready notifications', 'Court date reminders', 'Billing updates'],
 ARRAY['Client consultations', 'Case updates', 'Court coordination', 'Expert witness calls'],
 75,
 '{"appointment": "Reminder: Your consultation is scheduled for {{date}} at {{time}}. Reply C to confirm.", "document": "Your documents are ready for review. Please call or text when you''d like to discuss."}'::jsonb),

('hvac', 'HVAC Technician',
 ARRAY['Missed emergency calls', 'Route optimization', 'Quote follow-ups', 'Parts availability'],
 ARRAY['Service reminders', 'Arrival notifications', 'Quote delivery', 'Maintenance schedules'],
 ARRAY['Emergency dispatch', 'Service consultations', 'Quote discussions', 'Supplier orders'],
 200,
 '{"on_way": "Your HVAC technician is on the way! ETA: {{time}}. Text back if you need to reschedule.", "service_due": "Time for your seasonal HVAC maintenance! Reply to schedule or call for same-day service."}'::jsonb),

('medical', 'Medical Practice',
 ARRAY['HIPAA compliance', 'Appointment no-shows', 'After-hours calls', 'Multi-location management'],
 ARRAY['Appointment reminders', 'Prescription ready', 'Lab results available', 'Recall notices'],
 ARRAY['Patient consultations', 'Referral coordination', 'Insurance verification', 'Emergency triage'],
 300,
 '{"appointment": "Reminder: You have an appointment on {{date}} at {{time}}. Reply C to confirm or R to reschedule.", "results": "Your test results are ready. Please call the office to discuss with your provider."}'::jsonb),

('saas', 'SaaS Sales Team',
 ARRAY['Demo no-shows', 'Follow-up timing', 'Lead response time', 'Territory management'],
 ARRAY['Demo confirmations', 'Trial check-ins', 'Feature announcements', 'Renewal reminders'],
 ARRAY['Discovery calls', 'Product demos', 'Negotiation calls', 'Customer success check-ins'],
 250,
 '{"demo_reminder": "Looking forward to showing you {{product}} tomorrow at {{time}}! Any specific features you''d like to see?", "trial_checkin": "How''s your {{product}} trial going? Happy to jump on a quick call to answer any questions."}'::jsonb);

-- Seed data for locations (major US cities)
INSERT INTO public.locations (city, state, area_code, population, business_density_score, pickup_rate_index, local_competitors) VALUES
('New York', 'NY', '212', 8336817, 95, 72, '{"providers": ["Google Voice", "OpenPhone", "Grasshopper"], "local_telcos": ["Verizon", "AT&T"]}'::jsonb),
('Los Angeles', 'CA', '213', 3898747, 88, 68, '{"providers": ["Google Voice", "OpenPhone", "RingCentral"], "local_telcos": ["Spectrum", "AT&T"]}'::jsonb),
('Chicago', 'IL', '312', 2746388, 85, 75, '{"providers": ["Google Voice", "Nextiva", "8x8"], "local_telcos": ["Comcast", "AT&T"]}'::jsonb),
('Houston', 'TX', '713', 2304580, 82, 78, '{"providers": ["Google Voice", "Vonage", "Ooma"], "local_telcos": ["Xfinity", "AT&T"]}'::jsonb),
('Phoenix', 'AZ', '602', 1608139, 78, 70, '{"providers": ["Google Voice", "OpenPhone", "Dialpad"], "local_telcos": ["Cox", "CenturyLink"]}'::jsonb),
('Philadelphia', 'PA', '215', 1603797, 83, 71, '{"providers": ["Google Voice", "Line2", "MightyCall"], "local_telcos": ["Comcast", "Verizon"]}'::jsonb),
('San Antonio', 'TX', '210', 1434625, 75, 76, '{"providers": ["Google Voice", "TextNow", "Sideline"], "local_telcos": ["Spectrum", "AT&T"]}'::jsonb),
('San Diego', 'CA', '619', 1386932, 80, 69, '{"providers": ["Google Voice", "OpenPhone", "Aircall"], "local_telcos": ["Cox", "AT&T"]}'::jsonb),
('Dallas', 'TX', '214', 1304379, 84, 77, '{"providers": ["Google Voice", "JustCall", "CloudTalk"], "local_telcos": ["Frontier", "Spectrum"]}'::jsonb),
('San Jose', 'CA', '408', 1013240, 90, 73, '{"providers": ["Google Voice", "OpenPhone", "Zoom Phone"], "local_telcos": ["Comcast", "AT&T"]}'::jsonb);

-- Seed data for competitor reviews
INSERT INTO public.competitor_reviews (competitor_name, platform, reviewer_role, star_rating, review_text, pain_points, review_date, is_verified) VALUES
('OpenPhone', 'G2', 'SaaS Sales Manager', 2, 'We switched from OpenPhone after 6 months. SMS approval took 3 weeks and support was non-existent. Our sales team couldn''t follow up with leads.', ARRAY['sms-delays', 'poor-support', 'setup-time'], '2024-11-15', true),
('OpenPhone', 'Reddit', 'Real Estate Broker', 1, 'Absolute nightmare. Our numbers got flagged as spam and OpenPhone support just said to wait. Lost multiple deals because clients wouldn''t answer.', ARRAY['spam-labeling', 'support-unresponsive', 'lost-business'], '2024-10-22', false),
('Google Voice', 'G2', 'Small Business Owner', 3, 'It''s free but you get what you pay for. No team features, can''t share access, and forget about any support.', ARRAY['no-team-features', 'no-support', 'limited-features'], '2024-11-01', true),
('Google Voice', 'Trustpilot', 'Consultant', 2, 'Worked ok for a while but then started missing important calls. No way to set up proper business hours or routing.', ARRAY['missed-calls', 'no-routing', 'basic-features'], '2024-09-30', true),
('Grasshopper', 'G2', 'Agency Owner', 2, 'Expensive for what you get. The app is clunky and team messaging doesn''t work half the time.', ARRAY['overpriced', 'app-issues', 'team-messaging-bugs'], '2024-10-15', true),
('Nextiva', 'Reddit', 'IT Manager', 1, 'Overly complex setup, requires IT involvement for everything. Our sales team hated it.', ARRAY['complex-setup', 'requires-it', 'poor-ux'], '2024-11-20', false),
('Line2', 'App Store', 'Field Sales Rep', 2, 'App crashes constantly. Missed several important client calls because the app just stopped working.', ARRAY['app-crashes', 'unreliable', 'missed-calls'], '2024-10-10', true),
('OpenPhone', 'ProductHunt', 'Startup Founder', 2, 'Seemed great at first but the spam labeling killed us. Half our outbound calls showed as spam. No fix from support.', ARRAY['spam-labeling', 'outbound-issues', 'support-failure'], '2024-11-25', false);

-- Seed initial SEO pages
INSERT INTO public.seo_pages (slug, bucket, template_type, meta_title, meta_description, h1_text, status, structured_data, content_blocks, cta_config) VALUES
('fix-spam-likely', 'spam-fix', 'diagnostic', 
 'Fix "Spam Likely" Caller ID - Free Phone Number Check | Ring4',
 'Is your business number showing as "Spam Likely"? Use our free checker to diagnose the issue and get a clean number instantly with Ring4.',
 'Your calls are showing as "Spam Likely"',
 'published',
 '{"@context": "https://schema.org", "@type": "HowTo", "name": "How to Fix Spam Likely Caller ID"}'::jsonb,
 '{"intro": "That spam label is costing you deals every day. We''ll help you fix it fast.", "tool": "spam-checker", "trust_signals": ["79% of spam-labeled calls go unanswered", "Get a clean number in under 5 minutes", "Trusted by 50,000+ businesses"]}'::jsonb,
 '{"primary": "Check My Number Now", "secondary": "Get a Clean Number", "style": "urgent"}'::jsonb),

('local-number-new-york', 'location', 'location',
 'Get a New York 212 Business Phone Number | Local NYC Number | Ring4',
 'Get a local 212 NYC phone number for your business. Instant setup, branded caller ID, and 72% higher pickup rates than out-of-state numbers.',
 'Get a trusted 212 New York business number',
 'published',
 '{"@context": "https://schema.org", "@type": "LocalBusiness", "areaServed": "New York, NY"}'::jsonb,
 '{"hero": "New Yorkers trust local numbers. Get yours in 30 seconds.", "stats": {"pickup_rate": "72%", "businesses": "15,000+ NYC businesses use Ring4"}, "local_features": ["Manhattan 212 numbers available", "All NYC boroughs covered", "Local presence from anywhere"]}'::jsonb,
 '{"primary": "Get Your 212 Number", "secondary": "See Available Numbers", "urgency": "Only 47 212 numbers left today"}'::jsonb),

('ring4-vs-openphone', 'comparison', 'comparison',
 'Ring4 vs OpenPhone: Which Business Phone Wins? (2024 Comparison)',
 'OpenPhone vs Ring4: Compare SMS approval time, spam protection, and team features. See why businesses switch to Ring4 for instant setup.',
 'Ring4 vs OpenPhone: The honest comparison',
 'published',
 '{"@context": "https://schema.org", "@type": "ComparisonTable", "compares": ["Ring4", "OpenPhone"]}'::jsonb,
 '{"comparison_matrix": {"sms_activation": {"ring4": "Instant", "openphone": "7-21 days"}, "spam_protection": {"ring4": "✓ Built-in", "openphone": "✗ None"}, "support": {"ring4": "Live chat", "openphone": "Email only"}}, "review_quotes": true}'::jsonb,
 '{"primary": "Switch to Ring4 Free", "secondary": "See Full Comparison", "social_proof": "Join 2,341 businesses who switched this month"}'::jsonb);