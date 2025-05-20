// This file provides utility functions for interacting with the Twilio Verify API
import { saveVerificationAttempt, updateVerificationStatus, getLatestVerificationAttempt } from './verify-storage'

// No API endpoint needed as we're using mock data

/**
 * Formats a phone number to E.164 format
 *
 * @param phoneNumber - The phone number to format
 * @returns The phone number in E.164 format
 */
export const formatToE164 = (phoneNumber: string): string => {
  // Remove all non-digits
  const digits = phoneNumber.replace(/\D/g, '');

  // Ensure it's a US number (10 digits)
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  // If it already has a country code
  if (digits.length > 10) {
    return `+${digits}`;
  }

  // Default case
  return `+1${digits}`;
};

/**
 * Formats a phone number for display
 *
 * @param value - The phone number to format
 * @returns The formatted phone number
 */
export const formatPhoneNumber = (value: string): string => {
  if (!value) return value;

  // Remove all non-digits
  const phoneNumber = value.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

/**
 * Sends a verification code to the specified phone number
 *
 * @param phoneNumber - The phone number to send the verification code to
 * @returns A promise that resolves to the verification status
 */
export const sendVerificationCode = async (phoneNumber: string): Promise<{ success: boolean; status: string }> => {
  // Format phone number to E.164 format
  const formattedNumber = formatToE164(phoneNumber);

  console.log(`Sending verification code to ${formattedNumber}`);

  // Always use mock data since we don't have a real API
  try {
    // Save mock verification attempt to Supabase
    await saveVerificationAttempt(formattedNumber, 'pending', 'sms');
  } catch (saveError) {
    console.warn('Failed to save mock verification attempt to Supabase:', saveError);
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, status: 'pending' };
};

/**
 * Verifies a code for the specified phone number
 *
 * @param phoneNumber - The phone number to verify
 * @param code - The verification code
 * @returns A promise that resolves to the verification result
 */
export const verifyCode = async (phoneNumber: string, code: string): Promise<{ success: boolean; valid: boolean; status: string }> => {
  // Format phone number to E.164 format
  const formattedNumber = formatToE164(phoneNumber);

  console.log(`Verifying code ${code} for ${formattedNumber}`);

  // Always use mock data since we don't have a real API
  // For testing, consider code '123456' as valid
  const valid = code === '123456';
  const status = valid ? 'approved' : 'pending';

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Update mock verification status in Supabase
  try {
    // Get the latest verification attempt
    const latestAttempt = await getLatestVerificationAttempt(formattedNumber);

    if (latestAttempt?.id) {
      // Update the status
      await updateVerificationStatus(latestAttempt.id, status);
    }
  } catch (saveError) {
    console.warn('Failed to update mock verification status in Supabase:', saveError);
  }

  return {
    success: true,
    valid,
    status
  };
};
