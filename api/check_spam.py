import os
import json
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

def handler(event, context):
    # Enable CORS
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }

    # Handle preflight OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }

    try:
        # Parse the incoming request body
        body = json.loads(event['body'])
        phone_number = body.get('phoneNumber')
        secondary_phone_number = body.get('secondaryPhoneNumber')

        if not phone_number:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Phone number is required'})
            }

        # Initialize Twilio client with environment variables
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID', 'AC1122b3207e35e21162e277551dfd5191')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '389de81902c5b29cf6d9e0b506d08d84')
        nomorobo_addon_sid = os.environ.get('NOMOROBO_ADDON_SID', 'XE3e2d5ca759ed15c838f7b39fd0b81346')

        if not account_sid or not auth_token:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'Server configuration error'})
            }

        client = Client(account_sid, auth_token)

        # Prepare options for Twilio Lookup API
        lookup_options = {
            'add_ons': nomorobo_addon_sid
        }

        # Add secondary_address if provided
        if secondary_phone_number:
            # Format the parameter name using the Add-on SID
            param_name = f'add_ons.{nomorobo_addon_sid}.secondary_address'
            lookup_options[param_name] = secondary_phone_number

        try:
            # Call Twilio Lookup API with Nomorobo Spam Score Add-on
            phone_number_lookup = client.lookups.v1.phone_numbers(phone_number).fetch(**lookup_options)

            # Process the response
            # Get the results using the Add-on SID
            nomorobo_result = phone_number_lookup.add_ons.get('results', {}).get(nomorobo_addon_sid)

            if not nomorobo_result or nomorobo_result.get('status') != 'successful':
                return {
                    'statusCode': 500,
                    'headers': headers,
                    'body': json.dumps({
                        'error': 'Failed to retrieve spam score',
                        'details': nomorobo_result or 'No result from Nomorobo'
                    })
                }

            # Get the spam score from the result
            spam_score = nomorobo_result.get('result', {}).get('score')

            # Map the Nomorobo score to our application's format
            status = 'clean'
            risk_score = 0

            if spam_score == 1:
                status = 'flagged'
                risk_score = 85  # High risk score for confirmed spam
            else:
                # You could implement additional logic here based on other factors
                # For example, checking carrier information or call patterns
                status = 'clean'
                risk_score = 10  # Low risk score for non-spam

            # Return the formatted result
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'status': status,
                    'riskScore': risk_score,
                    'carriers': [
                        {'name': 'AT&T', 'status': 'flagged' if spam_score == 1 else 'clean'},
                        {'name': 'Verizon', 'status': 'flagged' if spam_score == 1 else 'clean'},
                        {'name': 'T-Mobile', 'status': 'flagged' if spam_score == 1 else 'clean'}
                    ],
                    'timeChecked': phone_number_lookup.date_created.isoformat(),
                    'recommendations': [
                        'Immediate number remediation required',
                        'Implement branded caller ID solutions',
                        'Register with carrier reputation systems',
                        'Consider number rotation strategy'
                    ] if spam_score == 1 else [
                        'Continue monitoring your number',
                        'Use branded caller ID to increase answer rates',
                        'Maintain consistent calling patterns'
                    ],
                    'rawData': {
                        'nomoroboScore': spam_score
                    }
                })
            }
        except TwilioRestException as e:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'error': 'Failed to check phone number',
                    'message': str(e)
                })
            }

    except Exception as e:
        print(f'Error processing request: {str(e)}')

        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }
