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
    const { phoneNumber, secondaryPhoneNumber } = data;

    if (!phoneNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Phone number is required' })
      };
    }

    // Initialize Twilio client with environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const nomoroboAddOnSid = process.env.NOMOROBO_ADDON_SID;

    if (!accountSid || !authToken) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const client = twilio(accountSid, authToken);

    // Prepare options for Twilio Lookup API
    const lookupOptions = {
      addOns: nomoroboAddOnSid
    };

    // Add secondary_address if provided
    if (secondaryPhoneNumber) {
      // Format the parameter name using the Add-on SID
      const paramName = `addOns.${nomoroboAddOnSid}.secondary_address`;
      lookupOptions[paramName] = secondaryPhoneNumber;
    }

    // Call Twilio Lookup API with Nomorobo Spam Score Add-on
    const phoneNumberLookup = await client.lookups.v1
      .phoneNumbers(phoneNumber)
      .fetch(lookupOptions);

    // Process the response
    // Get the results using the Add-on SID
    const nomoroboResult = phoneNumberLookup.addOns?.results?.[nomoroboAddOnSid];

    if (!nomoroboResult || nomoroboResult.status !== 'successful') {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to retrieve spam score',
          details: nomoroboResult || 'No result from Nomorobo'
        })
      };
    }

    const spamScore = nomoroboResult.result?.score;

    // Map the Nomorobo score to our application's format
    let status = 'clean';
    let riskScore = 0;

    if (spamScore === 1) {
      status = 'flagged';
      riskScore = 85; // High risk score for confirmed spam
    } else {
      // You could implement additional logic here based on other factors
      // For example, checking carrier information or call patterns
      status = 'clean';
      riskScore = 10; // Low risk score for non-spam
    }

    // Return the formatted result
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status,
        riskScore,
        carriers: [
          { name: 'AT&T', status: spamScore === 1 ? 'flagged' : 'clean' },
          { name: 'Verizon', status: spamScore === 1 ? 'flagged' : 'clean' },
          { name: 'T-Mobile', status: spamScore === 1 ? 'flagged' : 'clean' }
        ],
        timeChecked: new Date().toISOString(),
        recommendations: spamScore === 1 ? [
          'Immediate number remediation required',
          'Implement branded caller ID solutions',
          'Register with carrier reputation systems',
          'Consider number rotation strategy'
        ] : [
          'Continue monitoring your number',
          'Use branded caller ID to increase answer rates',
          'Maintain consistent calling patterns'
        ],
        rawData: {
          nomoroboScore: spamScore
        }
      })
    };
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
