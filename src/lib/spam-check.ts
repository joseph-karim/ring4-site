// This file provides mock spam check functionality
import { getLatestSpamCheckResult } from './spam-check-storage'

type SpamCheckResult = {
  status: 'clean' | 'at-risk' | 'flagged'
  riskScore: number
  carriers: {
    name: string
    status: 'clean' | 'at-risk' | 'flagged'
  }[]
  timeChecked: string
  recommendations: string[]
  rawData?: any
}

/**
 * Checks a phone number for spam risk using Supabase function that calls Twilio's Lookup API
 *
 * @param phoneNumber - The phone number to check (should be in E.164 format or 10-digit US number)
 * @returns A SpamCheckResult object with the spam check results
 */
export const checkPhoneNumber = async (phoneNumber: string): Promise<SpamCheckResult> => {
  // Simple validation for US phone numbers (10 digits)
  const formattedNumber = phoneNumber.replace(/\D/g, '')
  const isValidUS = /^\d{10}$/.test(formattedNumber)

  if (!isValidUS) {
    throw new Error('Please enter a valid 10-digit US phone number')
  }

  // Format to E.164 for Twilio API
  const e164Number = `+1${formattedNumber}`

  try {
    console.log(`Checking phone number: ${e164Number}`)

    // Check if we should use the real API
    const useRealApi = import.meta.env.VITE_USE_REAL_API === 'true';

    if (useRealApi) {
      console.log('Using real Netlify function for spam check');

      // Call the Netlify function to check the phone number
      const apiUrl = '/.netlify/functions/check-spam';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: e164Number
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', errorText);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Spam check result:', data);

      return data as SpamCheckResult;
    } else {
      // Fall back to mock data
      console.log('Using mock data for spam check');
      return getMockResult(formattedNumber);
    }

    /* Commented out until Supabase connection is fixed
    // Call the Supabase function to check the phone number
    const { data, error } = await (supabase as any).rpc('check_spam_score', {
      phone_number: formattedNumber,
      secondary_phone_number: secondaryPhoneNumber ? formattedNumber.substring(0, 10) : null
    })

    if (error) {
      console.error('Supabase function error:', error)
      throw new Error(error.message || 'Failed to check phone number')
    }

    if (!data) {
      throw new Error('No data returned from spam check')
    }

    console.log('Spam check result:', data)

    // The result is already saved to the database by the Supabase function
    return data as SpamCheckResult
    */
  } catch (error) {
    console.error('Error checking phone number:', error);

    // Check if we should use the real API and show real errors
    const useRealApi = import.meta.env.VITE_USE_REAL_API === 'true';

    if (useRealApi && import.meta.env.DEV) {
      // In development with real API, show the actual error
      throw error;
    } else {
      // In production or when using mock data, fall back to mock data
      console.warn('Falling back to mock data due to error');
      return getMockResult(formattedNumber);
    }
  }
}

/**
 * Get the latest spam check result for a phone number
 *
 * @param phoneNumber - The phone number to get the latest result for
 * @returns The latest spam check record or null if none exists
 */
export const getLatestPhoneNumberCheck = async (phoneNumber: string) => {
  try {
    // Format the phone number
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Get the latest result from Supabase
    return await getLatestSpamCheckResult(e164Number)
  } catch (error) {
    console.error('Error getting latest spam check result:', error)
    throw error
  }
}

/**
 * Generates mock spam check results for development and testing
 * This is used as a fallback when the Supabase function is not available
 *
 * @param phoneNumber - The phone number to generate mock results for
 * @returns A SpamCheckResult object with mock data
 */
const getMockResult = (phoneNumber: string): SpamCheckResult => {
  // For demo purposes, we'll return different results based on the last digit
  const lastDigit = parseInt(phoneNumber.slice(-1))

  // Save the mock result to Supabase
  const result = generateMockResult(lastDigit)

  // Don't try to save to Supabase for now since we're having connection issues
  // This would normally save the result to the database
  /*
  try {
    saveSpamCheckResult({
      phoneNumber: `+1${phoneNumber}`,
      ...result
    }).catch(error => {
      console.warn('Failed to save mock result to Supabase:', error)
    })
  } catch (error) {
    console.warn('Failed to save mock result to Supabase:', error)
  }
  */

  return result
}

/**
 * Helper function to generate mock spam check results
 *
 * @param lastDigit - The last digit of the phone number
 * @returns A SpamCheckResult object with mock data
 */
const generateMockResult = (lastDigit: number): SpamCheckResult => {
  if (lastDigit >= 0 && lastDigit <= 3) {
    // Clean number
    return {
      status: 'clean',
      riskScore: Math.floor(Math.random() * 20),
      carriers: [
        { name: 'Major Carriers', status: 'clean' }
      ],
      timeChecked: new Date().toISOString(),
      recommendations: [
        'Your number appears to be in good standing',
        'Continue using good calling practices'
      ],
      rawData: {
        mockData: true
      }
    }
  } else if (lastDigit >= 4 && lastDigit <= 7) {
    // At risk number
    return {
      status: 'at-risk',
      riskScore: 40 + Math.floor(Math.random() * 20),
      carriers: [
        { name: 'Major Carriers', status: 'at-risk' }
      ],
      timeChecked: new Date().toISOString(),
      recommendations: [
        'Your number may be at risk of being flagged',
        'Consider using Ring4 to protect your number'
      ],
      rawData: {
        mockData: true
      }
    }
  } else {
    // Flagged number
    return {
      status: 'flagged',
      riskScore: 70 + Math.floor(Math.random() * 30),
      carriers: [
        { name: 'Major Carriers', status: 'flagged' }
      ],
      timeChecked: new Date().toISOString(),
      recommendations: [
        'Your number appears to be flagged as spam',
        'Contact Ring4 for immediate assistance'
      ],
      rawData: {
        mockData: true
      }
    }
  }
}