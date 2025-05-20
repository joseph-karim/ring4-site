import { supabase, handleSupabaseError } from './supabase'

// Define the type for spam check results
export type SpamCheckRecord = {
  id?: string
  phone_number: string
  secondary_phone_number?: string | null
  status: string // Changed from enum to string to match database
  risk_score: number
  carriers: any // Changed to any to handle JSON type from database
  recommendations: string[]
  raw_data?: any
  created_at?: string
  updated_at?: string
}

/**
 * Save a spam check result to Supabase
 *
 * @param result The spam check result to save
 * @returns The saved record
 */
export const saveSpamCheckResult = async (result: {
  phoneNumber: string
  secondaryPhoneNumber?: string
  status: 'clean' | 'at-risk' | 'flagged'
  riskScore: number
  carriers: {
    name: string
    status: 'clean' | 'at-risk' | 'flagged'
  }[]
  timeChecked: string
  recommendations: string[]
  rawData?: any
}): Promise<SpamCheckRecord> => {
  try {
    // Format the data for Supabase
    const record: SpamCheckRecord = {
      phone_number: result.phoneNumber,
      secondary_phone_number: result.secondaryPhoneNumber,
      status: result.status,
      risk_score: result.riskScore,
      carriers: result.carriers,
      recommendations: result.recommendations,
      raw_data: result.rawData
    }

    // Insert the record into Supabase
    const { data, error } = await supabase
      .from('spam_check_results')
      .insert(record)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error saving spam check result:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Get spam check history for a phone number
 *
 * @param phoneNumber The phone number to get history for
 * @returns An array of spam check records
 */
export const getSpamCheckHistory = async (phoneNumber: string): Promise<SpamCheckRecord[]> => {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Query Supabase for the history
    const { data, error } = await supabase
      .from('spam_check_results')
      .select('*')
      .eq('phone_number', e164Number)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error getting spam check history:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Get the latest spam check result for a phone number
 *
 * @param phoneNumber The phone number to get the latest result for
 * @returns The latest spam check record or null if none exists
 */
export const getLatestSpamCheckResult = async (phoneNumber: string): Promise<SpamCheckRecord | null> => {
  try {
    // Format the phone number to E.164 format
    const formattedNumber = phoneNumber.replace(/\D/g, '')
    const e164Number = `+1${formattedNumber}`

    // Query Supabase for the latest result
    const { data, error } = await supabase
      .from('spam_check_results')
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
    console.error('Error getting latest spam check result:', error)
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Delete a spam check record
 *
 * @param id The ID of the record to delete
 * @returns The deleted record
 */
export const deleteSpamCheckRecord = async (id: string): Promise<SpamCheckRecord | null> => {
  try {
    // Delete the record from Supabase
    const { data, error } = await supabase
      .from('spam_check_results')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error deleting spam check record:', error)
    throw new Error(handleSupabaseError(error))
  }
}
