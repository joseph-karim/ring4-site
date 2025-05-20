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
    const body = JSON.parse(event.body);
    const phoneNumber = body.phoneNumber;
    const secondaryPhoneNumber = body.secondaryPhoneNumber;

    if (!phoneNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Phone number is required' })
      };
    }

    // Initialize Twilio client with environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC1122b3207e35e21162e277551dfd5191';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '389de81902c5b29cf6d9e0b506d08d84';
    const nomoroboAddOnSid = process.env.NOMOROBO_ADDON_SID || 'XE3e2d5ca759ed15c838f7b39fd0b81346';
    
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

    try {
      // Call Twilio Lookup API with Nomorobo Spam Score Add-on
      const phoneNumberLookup = await client.lookups.v1.phoneNumbers(phoneNumber).fetch(lookupOptions);
      
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
      
      // Get the spam score from the result
      const spamScore = nomoroboResult.result?.score;
      
      // Map the Nomorobo score to our application's format
      let status = 'clean';
      let riskScore = 0;
      
      if (spamScore === 1) {
        status = 'flagged';
        riskScore = 85;  // High risk score for confirmed spam
      } else if (spamScore === 0.5) {
        status = 'at-risk';
        riskScore = 45;  // Medium risk score for potential spam
      } else {
        // You could implement additional logic here based on other factors
        // For example, checking carrier information or call patterns
        status = 'clean';
        riskScore = 10;  // Low risk score for non-spam
      }
      
      // Return the formatted result
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: status,
          riskScore: riskScore,
          carriers: [
            { name: 'AT&T', status: spamScore === 1 ? 'flagged' : spamScore === 0.5 ? 'at-risk' : 'clean' },
            { name: 'Verizon', status: spamScore === 1 ? 'flagged' : spamScore === 0.5 ? 'at-risk' : 'clean' },
            { name: 'T-Mobile', status: spamScore === 1 ? 'flagged' : spamScore === 0.5 ? 'at-risk' : 'clean' }
          ],
          timeChecked: new Date().toISOString(),
          recommendations: spamScore === 1 ? [
            'Immediate number remediation required',
            'Implement branded caller ID solutions',
            'Register with carrier reputation systems',
            'Consider number rotation strategy'
          ] : spamScore === 0.5 ? [
            'Register your number with carriers',
            'Implement branded caller ID',
            'Review your outbound calling practices'
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
    } catch (twilioError) {
      console.error('Twilio API error:', twilioError);
      
      // For development/testing, return mock data if Twilio API fails
      if (process.env.NODE_ENV !== 'production') {
        console.log('Returning mock data for development');
        
        // Generate a deterministic result based on the phone number
        // This ensures the same phone number always gets the same result during testing
        const lastDigit = parseInt(phoneNumber.slice(-1));
        let mockStatus, mockRiskScore;
        
        if (lastDigit >= 7) {
          mockStatus = 'flagged';
          mockRiskScore = 85;
        } else if (lastDigit >= 4) {
          mockStatus = 'at-risk';
          mockRiskScore = 45;
        } else {
          mockStatus = 'clean';
          mockRiskScore = 10;
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: mockStatus,
            riskScore: mockRiskScore,
            carriers: [
              { name: 'AT&T', status: mockStatus },
              { name: 'Verizon', status: mockStatus },
              { name: 'T-Mobile', status: mockStatus }
            ],
            timeChecked: new Date().toISOString(),
            recommendations: mockStatus === 'flagged' ? [
              'Immediate number remediation required',
              'Implement branded caller ID solutions',
              'Register with carrier reputation systems',
              'Consider number rotation strategy'
            ] : mockStatus === 'at-risk' ? [
              'Register your number with carriers',
              'Implement branded caller ID',
              'Review your outbound calling practices'
            ] : [
              'Continue monitoring your number',
              'Use branded caller ID to increase answer rates',
              'Maintain consistent calling patterns'
            ],
            rawData: {
              nomoroboScore: mockStatus === 'flagged' ? 1 : mockStatus === 'at-risk' ? 0.5 : 0,
              mockData: true
            }
          })
        };
      }
      
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Failed to check phone number',
          message: twilioError.message
        })
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
