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
        action = body.get('action')
        phone_number = body.get('phoneNumber')
        code = body.get('code')

        if not action:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Action is required'})
            }

        # Initialize Twilio client with environment variables
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID', 'AC1122b3207e35e21162e277551dfd5191')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '389de81902c5b29cf6d9e0b506d08d84')
        verify_sid = os.environ.get('TWILIO_VERIFY_SERVICE_SID')

        if not account_sid or not auth_token or not verify_sid:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({'error': 'Server configuration error'})
            }

        client = Client(account_sid, auth_token)

        # Handle different actions
        if action == 'send':
            # Validate phone number
            if not phone_number:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Phone number is required'})
                }

            # Send verification code
            try:
                verification = client.verify.v2.services(verify_sid) \
                    .verifications \
                    .create(to=phone_number, channel='sms')

                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'status': verification.status
                    })
                }
            except TwilioRestException as e:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'error': 'Failed to send verification code',
                        'message': str(e)
                    })
                }

        elif action == 'verify':
            # Validate phone number and code
            if not phone_number or not code:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'error': 'Phone number and verification code are required'
                    })
                }

            # Check verification code
            try:
                verification_check = client.verify.v2.services(verify_sid) \
                    .verification_checks \
                    .create(to=phone_number, code=code)

                return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({
                        'success': True,
                        'valid': verification_check.valid,
                        'status': verification_check.status
                    })
                }
            except TwilioRestException as e:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({
                        'error': 'Failed to verify code',
                        'message': str(e)
                    })
                }

        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Invalid action'})
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
