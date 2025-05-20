import { supabase, handleSupabaseError } from './supabase'

// Define the type for verification records
export type VerificationRecord = {
  id?: string
  phone_number: string
  status: string // Changed from enum to string to match database
  channel: string // Changed from enum to string to match database
  created_at?: string
  updated_at?: string
}

/**
 * Save a verification attempt to Supabase
 *
 * @param phoneNumber The phone number being verified
 * @param status The status of the verification
 * @param channel The channel used for verification
 * @returns The saved record
 */
export const saveVerificationAttempt = async (
  phoneNumber: string,
  status: 'pending' | 'approved' | 'canceled' | 'failed' = 'pending',
  channel: 'sms' | 'call' | 'email' | 'whatsapp' = 'sms'
): Promise<VerificationRecord> => {
  try {
    // Format the data for Supabase
    const record: VerificationRecord = {
      phone_number: phoneNumber,
      status,
      channel
    }

    // Insert the record into Supabase
    const { data, error } = await supabase
      .from('verification_attempts')
      .insert(record)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error saving verification attempt:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Update a verification attempt status
 *
 * @param id The ID of the verification attempt
 * @param status The new status
 * @returns The updated record
 */
export const updateVerificationStatus = async (
  id: string,
  status: 'pending' | 'approved' | 'canceled' | 'failed'
): Promise<VerificationRecord> => {
  try {
    // Update the record in Supabase
    const { data, error } = await supabase
      .from('verification_attempts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error updating verification status:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Get verification history for a phone number
 *
 * @param phoneNumber The phone number to get history for
 * @returns An array of verification records
 */
export const getVerificationHistory = async (phoneNumber: string): Promise<VerificationRecord[]> => {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Query Supabase for the history
    const { data, error } = await supabase
      .from('verification_attempts')
      .select('*')
      .eq('phone_number', e164Number)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error getting verification history:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Get the latest verification attempt for a phone number
 *
 * @param phoneNumber The phone number to get the latest attempt for
 * @returns The latest verification record or null if none exists
 */
export const getLatestVerificationAttempt = async (phoneNumber: string): Promise<VerificationRecord | null> => {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Query Supabase for the latest attempt
    const { data, error } = await supabase
      .from('verification_attempts')
      .select('*')
      .eq('phone_number', e164Number)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      // If no records found, return null
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error getting latest verification attempt:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Check if a phone number has been verified
 *
 * @param phoneNumber The phone number to check
 * @returns True if the phone number has been verified, false otherwise
 */
export const isPhoneNumberVerified = async (phoneNumber: string): Promise<boolean> => {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Query Supabase for approved verifications
    const { data, error } = await supabase
      .from('verification_attempts')
      .select('*')
      .eq('phone_number', e164Number)
      .eq('status', 'approved')
      .limit(1)

    if (error) {
      throw error
    }

    return data && data.length > 0
  } catch (error) {
    console.error('Error checking if phone number is verified:', error)
    throw new Error(handleSupabaseError(error))
  }
}
