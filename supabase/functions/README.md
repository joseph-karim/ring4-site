# Supabase Edge Functions Setup

## Environment Variables

To properly configure the AI Receptionist functionality, you need to set the following environment variables in your Supabase project:

### Required Variables

```bash
# Sonic Nova API Configuration
SONIC_NOVA_API_KEY=your_sonic_nova_api_key
SONIC_NOVA_ENDPOINT=https://api.sonicnova.ai/v1
SONIC_NOVA_WEBHOOK_URL=https://your-domain.com/webhooks/sonic-nova

# Twilio Configuration (for test calls)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Crawl4AI Configuration (optional, falls back to smart extraction)
CRAWL4AI_API_KEY=your_crawl4ai_api_key
CRAWL4AI_ENDPOINT=https://api.crawl4ai.com/v1
```

### Setting Environment Variables

1. **Via Supabase Dashboard:**
   ```
   1. Go to your project dashboard
   2. Navigate to Settings > Edge Functions
   3. Add each environment variable
   ```

2. **Via Supabase CLI:**
   ```bash
   supabase secrets set SONIC_NOVA_API_KEY=your_key
   supabase secrets set TWILIO_ACCOUNT_SID=your_sid
   # ... repeat for each variable
   ```

## Deploying Edge Functions

1. **Deploy all functions:**
   ```bash
   supabase functions deploy
   ```

2. **Deploy individual function:**
   ```bash
   supabase functions deploy process-voice-agent
   supabase functions deploy crawl-website
   ```

## Testing Edge Functions

1. **Test locally:**
   ```bash
   supabase functions serve process-voice-agent --env-file .env.local
   ```

2. **Test deployed function:**
   ```bash
   curl -X POST https://your-project.supabase.co/functions/v1/crawl-website \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://example.com"}'
   ```

## Security Considerations

1. **API Keys:** All sensitive API keys are stored in Supabase Vault and never exposed to the client
2. **CORS:** Edge functions are configured with appropriate CORS headers
3. **Authentication:** Functions can be secured with Supabase Auth if needed
4. **Rate Limiting:** Consider implementing rate limiting for production use

## Function Endpoints

### `crawl-website`
Extracts business information from a website URL.

**Request:**
```json
{
  "url": "https://example.com",
  "extractionStrategy": "llm" // optional: "default" | "llm" | "css"
}
```

**Response:**
```json
{
  "success": true,
  "businessInfo": {
    "name": "Example Business",
    "description": "...",
    "services": ["..."],
    "hours": {"...": "..."},
    "contact": {"...": "..."}
  }
}
```

### `process-voice-agent`
Manages voice agent creation, testing, and deployment.

**Request:**
```json
{
  "action": "create", // "create" | "test" | "deploy"
  "receptionistId": "uuid",
  "phoneNumber": "+1234567890", // for "test" action
  "config": {} // for "create" action
}
```

**Response:**
```json
{
  "success": true,
  "agentId": "agent_123", // for "create"
  "callSid": "call_123", // for "test"
  "message": "Success message"
}
```