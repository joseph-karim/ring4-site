// Supabase storage for AI receptionist configurations
import { supabase } from './supabase'
import { BusinessInfo } from './website-crawler'
import { SonicNovaConfig } from './sonic-nova-config'
// No longer importing Database type - using any for JSON fields

// Type definitions from database schema
// These are automatically generated from Supabase

export interface AIReceptionistRecord {
  id?: string
  websiteUrl: string
  businessInfo: BusinessInfo
  aiConfig: SonicNovaConfig
  createdAt?: string
  updatedAt?: string
  userId?: string
  status: 'demo' | 'claimed' | 'active'
  isUsingFallback?: boolean
  fallbackType?: string
}

// Save AI receptionist configuration
export async function saveAIReceptionist(data: {
  websiteUrl: string
  businessInfo: BusinessInfo
  aiConfig: SonicNovaConfig
  isUsingFallback?: boolean
  fallbackType?: string
}): Promise<AIReceptionistRecord | null> {
  try {
    const { data: result, error } = await supabase
      .from('ai_receptionists')
      .insert({
        website_url: data.websiteUrl,
        business_info: data.businessInfo as any,
        ai_config: data.aiConfig as any,
        status: 'demo',
        is_using_fallback: data.isUsingFallback || false,
        fallback_type: data.fallbackType || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving AI receptionist:', error)
      return null
    }

    return {
      id: result.id,
      websiteUrl: result.website_url,
      businessInfo: result.business_info as unknown as BusinessInfo,
      aiConfig: result.ai_config as unknown as SonicNovaConfig,
      status: (result.status || 'demo') as 'demo' | 'claimed' | 'active',
      createdAt: result.created_at || undefined,
      updatedAt: result.updated_at || undefined,
      userId: result.user_id || undefined
    }
  } catch (error) {
    console.error('Error saving AI receptionist:', error)
    return null
  }
}

// Get AI receptionist by ID
export async function getAIReceptionist(id: string): Promise<AIReceptionistRecord | null> {
  try {
    const { data, error } = await supabase
      .from('ai_receptionists')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error('Error fetching AI receptionist:', error)
      return null
    }

    return {
      id: data.id,
      websiteUrl: data.website_url,
      businessInfo: data.business_info as unknown as BusinessInfo,
      aiConfig: data.ai_config as unknown as SonicNovaConfig,
      status: (data.status || 'demo') as 'demo' | 'claimed' | 'active',
      createdAt: data.created_at || undefined,
      updatedAt: data.updated_at || undefined,
      userId: data.user_id || undefined
    }
  } catch (error) {
    console.error('Error fetching AI receptionist:', error)
    return null
  }
}

// Update AI receptionist status
export async function updateAIReceptionistStatus(
  id: string, 
  status: 'demo' | 'claimed' | 'active'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ai_receptionists')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating AI receptionist status:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error updating AI receptionist status:', error)
    return false
  }
}

// Get recent AI receptionists (for analytics)
export async function getRecentAIReceptionists(limit: number = 10): Promise<AIReceptionistRecord[]> {
  try {
    const { data, error } = await supabase
      .from('ai_receptionists')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) {
      console.error('Error fetching recent AI receptionists:', error)
      return []
    }

    return data.map(item => ({
      id: item.id,
      websiteUrl: item.website_url,
      businessInfo: item.business_info as unknown as BusinessInfo,
      aiConfig: item.ai_config as unknown as SonicNovaConfig,
      status: (item.status || 'demo') as 'demo' | 'claimed' | 'active',
      createdAt: item.created_at || undefined,
      updatedAt: item.updated_at || undefined,
      userId: item.user_id || undefined
    }))
  } catch (error) {
    console.error('Error fetching recent AI receptionists:', error)
    return []
  }
}

// Save demo call transcript
export async function saveDemoCallTranscript(data: {
  receptionistId: string
  transcript: string[]
  duration: number
}): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('demo_calls')
      .insert({
        receptionist_id: data.receptionistId,
        transcript: data.transcript,
        duration: data.duration
      })

    if (error) {
      console.error('Error saving demo call transcript:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error saving demo call transcript:', error)
    return false
  }
}