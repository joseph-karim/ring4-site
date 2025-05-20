# Ring4 Verify API

This serverless function integrates with Twilio's Verify API to implement user verification via SMS, call, or email.

## Setup

1. Install dependencies:
   ```
   # For JavaScript version
   npm install

   # For Python version
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   - `TWILIO_ACCOUNT_SID`: Your Twilio account SID (default: AC1122b3207e35e21162e277551dfd5191)
   - `TWILIO_AUTH_TOKEN`: Your Twilio auth token (default: 389de81902c5b29cf6d9e0b506d08d84)
   - `TWILIO_VERIFY_SERVICE_SID`: Your Twilio Verify Service SID

3. Deploy the function to your preferred serverless platform:
   - Netlify Functions
   - Vercel Serverless Functions
   - AWS Lambda
   - Google Cloud Functions
   - Azure Functions

## Usage

### Send Verification Code

Send a POST request to the deployed function URL with the following JSON body:

```json
{
  "action": "send",
  "phoneNumber": "+15551234567"
}
```

The phone number should be in E.164 format (e.g., +15551234567).

### Verify Code

Send a POST request to the deployed function URL with the following JSON body:

```json
{
  "action": "verify",
  "phoneNumber": "+15551234567",
  "code": "123456"
}
```

## Response

### Send Verification Response

```json
{
  "success": true,
  "status": "pending"
}
```

### Verify Code Response

```json
{
  "success": true,
  "valid": true,
  "status": "approved"
}
```

## Twilio Setup

Before using this function, you need to:

1. Create a Twilio account at https://www.twilio.com/
2. Create a Verify Service in the Twilio Console or using the API:

```python
# Create a Verify Service using Python
from twilio.rest import Client

account_sid = 'AC1122b3207e35e21162e277551dfd5191'  # Your Twilio Account SID
auth_token = '389de81902c5b29cf6d9e0b506d08d84'  # Your Twilio Auth Token
client = Client(account_sid, auth_token)

service = client.verify.v2.services.create(
    friendly_name='My First Verify Service'
)

print(service.sid)  # Save this as TWILIO_VERIFY_SERVICE_SID
```

```javascript
// Create a Verify Service using JavaScript
const twilio = require('twilio');

const accountSid = 'AC1122b3207e35e21162e277551dfd5191';  // Your Twilio Account SID
const authToken = '389de81902c5b29cf6d9e0b506d08d84';  // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.verify.v2.services.create({
    friendlyName: 'My First Verify Service',
  });

  console.log(service.sid);  // Save this as TWILIO_VERIFY_SERVICE_SID
}

createService();
```
3. Get your Account SID, Auth Token, and Verify Service SID from the Twilio Console
4. Set up these credentials as environment variables in your serverless function deployment

## Local Development

For local development, you can use tools like:
- Netlify CLI: `netlify dev`
- Vercel CLI: `vercel dev`
- AWS SAM: `sam local start-api`
- Google Cloud Functions Framework: `functions-framework --target=handler` (Python)
- Azure Functions Core Tools: `func start`

This allows you to test the function locally before deploying.
