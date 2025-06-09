// Mock storage for AI receptionist configurations
// This is a temporary solution until Supabase types are generated

import { BusinessInfo } from './website-crawler'
import { SonicNovaConfig } from './sonic-nova-config'

export interface AIReceptionistRecord {
  id?: string
  websiteUrl: string
  businessInfo: BusinessInfo
  aiConfig: SonicNovaConfig
  createdAt?: string
  updatedAt?: string
  userId?: string
  status: 'demo' | 'claimed' | 'active'
}

// In-memory storage for demo
const storage: Map<string, AIReceptionistRecord> = new Map()

// Save AI receptionist configuration (mock)
export async function saveAIReceptionist(data: {
  websiteUrl: string
  businessInfo: BusinessInfo
  aiConfig: SonicNovaConfig
}): Promise<AIReceptionistRecord | null> {
  try {
    const id = Date.now().toString()
    const record: AIReceptionistRecord = {
      id,
      websiteUrl: data.websiteUrl,
      businessInfo: data.businessInfo,
      aiConfig: data.aiConfig,
      status: 'demo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    storage.set(id, record)
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return record
  } catch (error) {
    console.error('Error saving AI receptionist:', error)
    return null
  }
}

// Get AI receptionist by ID (mock)
export async function getAIReceptionist(id: string): Promise<AIReceptionistRecord | null> {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return storage.get(id) || null
  } catch (error) {
    console.error('Error fetching AI receptionist:', error)
    return null
  }
}

// Update AI receptionist status (mock)
export async function updateAIReceptionistStatus(
  id: string, 
  status: 'demo' | 'claimed' | 'active'
): Promise<boolean> {
  try {
    const record = storage.get(id)
    if (!record) return false
    
    record.status = status
    record.updatedAt = new Date().toISOString()
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return true
  } catch (error) {
    console.error('Error updating AI receptionist status:', error)
    return false
  }
}

// Save demo call transcript (mock)
export async function saveDemoCallTranscript(data: {
  receptionistId: string
  transcript: string[]
  duration: number
}): Promise<boolean> {
  try {
    // For demo purposes, just log it
    console.log('Demo call transcript saved:', {
      receptionistId: data.receptionistId,
      transcriptLength: data.transcript.length,
      duration: data.duration
    })
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return true
  } catch (error) {
    console.error('Error saving demo call transcript:', error)
    return false
  }
}