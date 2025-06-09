-- Add fallback tracking columns to ai_receptionists table
ALTER TABLE ai_receptionists 
ADD COLUMN IF NOT EXISTS is_using_fallback BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS fallback_type TEXT;

-- Create index for fallback queries
CREATE INDEX IF NOT EXISTS idx_ai_receptionists_fallback ON ai_receptionists(is_using_fallback, fallback_type);

-- Add comment for documentation
COMMENT ON COLUMN ai_receptionists.is_using_fallback IS 'Indicates if this AI receptionist was created using fallback mode due to website crawling failure';
COMMENT ON COLUMN ai_receptionists.fallback_type IS 'Type of fallback used: NETWORK_ERROR, INVALID_URL, CRAWL_FAILED, TIMEOUT, GENERIC';