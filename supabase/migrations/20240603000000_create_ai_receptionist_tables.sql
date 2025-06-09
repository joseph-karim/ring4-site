-- Create AI Receptionists table
CREATE TABLE IF NOT EXISTS ai_receptionists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_url TEXT NOT NULL,
  business_info JSONB NOT NULL,
  ai_config JSONB NOT NULL,
  sonic_nova_agent_id TEXT,
  status TEXT DEFAULT 'demo' CHECK (status IN ('demo', 'claimed', 'active')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Demo Calls table for storing test call transcripts
CREATE TABLE IF NOT EXISTS demo_calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  receptionist_id UUID REFERENCES ai_receptionists(id) ON DELETE CASCADE,
  transcript TEXT[] NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_ai_receptionists_website_url ON ai_receptionists(website_url);
CREATE INDEX idx_ai_receptionists_status ON ai_receptionists(status);
CREATE INDEX idx_ai_receptionists_created_at ON ai_receptionists(created_at DESC);
CREATE INDEX idx_demo_calls_receptionist_id ON demo_calls(receptionist_id);

-- Enable Row Level Security
ALTER TABLE ai_receptionists ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_calls ENABLE ROW LEVEL SECURITY;

-- Create policies for AI Receptionists
-- Anyone can create a demo receptionist
CREATE POLICY "Anyone can create demo receptionists" ON ai_receptionists
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'demo');

-- Anyone can read demo receptionists
CREATE POLICY "Anyone can read demo receptionists" ON ai_receptionists
  FOR SELECT TO anon, authenticated
  USING (status = 'demo' OR auth.uid() = user_id);

-- Only authenticated users can update their own receptionists
CREATE POLICY "Users can update own receptionists" ON ai_receptionists
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for Demo Calls
-- Anyone can create demo calls for demo receptionists
CREATE POLICY "Anyone can create demo calls" ON demo_calls
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_receptionists 
      WHERE id = receptionist_id 
      AND status = 'demo'
    )
  );

-- Anyone can read demo calls for demo receptionists
CREATE POLICY "Anyone can read demo calls" ON demo_calls
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ai_receptionists 
      WHERE id = receptionist_id 
      AND (status = 'demo' OR auth.uid() = user_id)
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_ai_receptionists_updated_at BEFORE UPDATE
  ON ai_receptionists FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();