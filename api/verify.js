// This file would be deployed as a serverless function
// For example, as a Netlify function, Vercel serverless function, or AWS Lambda

const twilio = require('twilio');

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    const { action, phoneNumber, code } = data;

    if (!action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Action is required' })
      };
    }

    // Initialize Twilio client with environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!accountSid || !authToken || !verifySid) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const client = twilio(accountSid, authToken);

    // Handle different actions
    switch (action) {
      case 'send': {
        // Validate phone number
        if (!phoneNumber) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Phone number is required' })
          };
        }

        // Send verification code
        const verification = await client.verify.v2
          .services(verifySid)
          .verifications.create({
            to: phoneNumber,
            channel: 'sms' // You can also use 'call', 'email', etc.
          });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            status: verification.status
          })
        };
      }

      case 'verify': {
        // Validate phone number and code
        if (!phoneNumber || !code) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Phone number and verification code are required'
            })
          };
        }

        // Check verification code
        const verificationCheck = await client.verify.v2
          .services(verifySid)
          .verificationChecks.create({
            to: phoneNumber,
            code
          });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            valid: verificationCheck.valid,
            status: verificationCheck.status
          })
        };
      }

      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' })
        };
    }
  } catch (error) {
    console.error('Error processing request:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
