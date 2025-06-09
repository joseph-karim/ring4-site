import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Initialize the Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kbtidlqxhgynacijtooa.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidGlkbHF4aGd5bmFjaWp0b29hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzc2NzkxOSwiZXhwIjoyMDYzMzQzOTE5fQ.yVmGw0XSe-TxDNxC7ueUyCTKIxYi0Y9EbHe_ig9VrBU'

// Create a single supabase client for interacting with your database
// No authentication required - using the anonymous key for public access
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: false, // Don't persist auth session
      autoRefreshToken: false, // Don't refresh token
    },
  }
)

/**
 * Utility function to handle Supabase errors
 * @param error The error object from Supabase
 * @returns A formatted error message
 */
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase error:', error)
  return error?.message || 'An unknown error occurred'
}

/**
 * Generic type-safe functions for Supabase tables
 */
type TableNames = 'spam_check_results' | 'verification_attempts' | 'ai_receptionists' | 'demo_calls'

/**
 * Fetch data from Supabase
 * @param tableName The name of the table to fetch data from
 * @param columns The columns to select (default: '*')
 * @returns The data from the table
 */
export const fetchFromSupabase = async <T>(tableName: TableNames, columns: string = '*'): Promise<T[]> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(columns)

    if (error) {
      throw error
    }

    return data as T[]
  } catch (error) {
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Insert data into Supabase
 * @param tableName The name of the table to insert data into
 * @param data The data to insert
 * @returns The inserted data
 */
export const insertIntoSupabase = async <T>(tableName: TableNames, data: any): Promise<T> => {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()

    if (error) {
      throw error
    }

    return insertedData?.[0] as T
  } catch (error) {
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Update data in Supabase
 * @param tableName The name of the table to update data in
 * @param id The ID of the record to update
 * @param data The data to update
 * @returns The updated data
 */
export const updateInSupabase = async <T>(tableName: TableNames, id: string, data: any): Promise<T> => {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select()

    if (error) {
      throw error
    }

    return updatedData?.[0] as T
  } catch (error) {
    throw new Error(handleSupabaseError(error))
  }
}

/**
 * Delete data from Supabase
 * @param tableName The name of the table to delete data from
 * @param id The ID of the record to delete
 * @returns The deleted data
 */
export const deleteFromSupabase = async <T>(tableName: TableNames, id: string): Promise<T> => {
  try {
    const { data: deletedData, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      throw error
    }

    return deletedData?.[0] as T
  } catch (error) {
    throw new Error(handleSupabaseError(error))
  }
}

export default supabase
