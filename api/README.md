# Ring4 Spam Checker API

This serverless function integrates with Twilio's Lookup API and the Nomorobo Spam Score Add-on to check if a phone number is likely to be flagged as spam.

The API is available in both JavaScript (`check-spam.js`) and Python (`check_spam.py`) versions.

## Setup

1. Install dependencies:
   ```bash
   # For JavaScript version
   npm install

   # For Python version
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   - `TWILIO_ACCOUNT_SID`: Your Twilio account SID (default: AC1122b3207e35e21162e277551dfd5191)
   - `TWILIO_AUTH_TOKEN`: Your Twilio auth token (default: 389de81902c5b29cf6d9e0b506d08d84)
   - `NOMOROBO_ADDON_SID`: Your Nomorobo Add-on SID (default: XE3e2d5ca759ed15c838f7b39fd0b81346)

3. Deploy the function to your preferred serverless platform:
   - Netlify Functions
   - Vercel Serverless Functions
   - AWS Lambda
   - Google Cloud Functions
   - Azure Functions

## Usage

Send a POST request to the deployed function URL with the following JSON body:

```json
{
  "phoneNumber": "+15551234567",
  "secondaryPhoneNumber": "+15557654321"
}
```

The phone numbers should be in E.164 format (e.g., +15551234567).

- `phoneNumber`: The primary phone number to check for spam risk (required)
- `secondaryPhoneNumber`: A secondary phone number that the primary number frequently calls (optional, improves accuracy)

## Response

The function returns a JSON response with the following structure:

```json
{
  "status": "clean | at-risk | flagged",
  "riskScore": 85,
  "carriers": [
    { "name": "AT&T", "status": "clean | at-risk | flagged" },
    { "name": "Verizon", "status": "clean | at-risk | flagged" },
    { "name": "T-Mobile", "status": "clean | at-risk | flagged" }
  ],
  "timeChecked": "2023-05-01T12:34:56.789Z",
  "recommendations": [
    "Immediate number remediation required",
    "Implement branded caller ID solutions",
    "Register with carrier reputation systems",
    "Consider number rotation strategy"
  ],
  "rawData": {
    "nomoroboScore": 1
  }
}
```

## Twilio Setup

Before using this function, you need to:

1. Create a Twilio account at https://www.twilio.com/
2. Install the Nomorobo Spam Score Add-on from the Twilio Console:
   ```
   curl -X POST https://preview.twilio.com/marketplace/InstalledAddOns \
   --data 'AvailableAddOnSid=XB06d5274893cc9af4198667d2f7d74d09&AcceptTermsOfService=true&Configuration={}' \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```
3. Get your Account SID and Auth Token from the Twilio Console
4. Note your Nomorobo Add-on SID (e.g., XE3e2d5ca759ed15c838f7b39fd0b81346)
5. Set up these credentials as environment variables in your serverless function deployment

## Local Development

For local development, you can use tools like:
- Netlify CLI: `netlify dev`
- Vercel CLI: `vercel dev`
- AWS SAM: `sam local start-api`

This allows you to test the function locally before deploying.
