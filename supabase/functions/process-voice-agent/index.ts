// Supabase Edge Function for processing voice agent requests
// This handles the secure communication with Sonic Nova API

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceAgentRequest {
  action: 'create' | 'test' | 'deploy'
  receptionistId: string
  phoneNumber?: string
  config?: any
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { action, receptionistId, phoneNumber, config } = await req.json() as VoiceAgentRequest

    // Get Sonic Nova credentials from Supabase Vault
    const sonicNovaApiKey = Deno.env.get('SONIC_NOVA_API_KEY')
    const sonicNovaEndpoint = Deno.env.get('SONIC_NOVA_ENDPOINT')
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN')

    switch (action) {
      case 'create':
        return await createVoiceAgent(receptionistId, config, sonicNovaApiKey, sonicNovaEndpoint, supabaseClient)
      
      case 'test':
        return await testVoiceAgent(receptionistId, phoneNumber, twilioAccountSid, twilioAuthToken, supabaseClient)
      
      case 'deploy':
        return await deployVoiceAgent(receptionistId, sonicNovaApiKey, sonicNovaEndpoint, supabaseClient)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }
  } catch (error) {
    console.error('Error processing voice agent request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function createVoiceAgent(
  receptionistId: string,
  config: any,
  apiKey: string,
  endpoint: string,
  supabase: any
) {
  // Create voice agent in Sonic Nova
  const response = await fetch(`${endpoint}/agents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: config.agentName,
      personality: config.personality,
      voiceSettings: config.voiceSettings,
      knowledgeBase: config.knowledgeBase,
      systemPrompt: config.systemPrompt,
      conversationStarters: config.conversationStarters,
      escalationRules: config.escalationRules
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to create voice agent: ${response.statusText}`)
  }

  const agentData = await response.json()

  // Update receptionist record with agent ID
  const { error } = await supabase
    .from('ai_receptionists')
    .update({ 
      sonic_nova_agent_id: agentData.agentId,
      updated_at: new Date().toISOString()
    })
    .eq('id', receptionistId)

  if (error) {
    throw new Error(`Failed to update receptionist record: ${error.message}`)
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      agentId: agentData.agentId,
      message: 'Voice agent created successfully'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}

async function testVoiceAgent(
  receptionistId: string,
  phoneNumber: string,
  accountSid: string,
  authToken: string,
  supabase: any
) {
  // Get agent ID from database
  const { data: receptionist, error } = await supabase
    .from('ai_receptionists')
    .select('sonic_nova_agent_id')
    .eq('id', receptionistId)
    .single()

  if (error || !receptionist?.sonic_nova_agent_id) {
    throw new Error('Voice agent not found')
  }

  // Initiate test call using Twilio
  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`
  
  const response = await fetch(twilioUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      To: phoneNumber,
      From: Deno.env.get('TWILIO_PHONE_NUMBER') ?? '',
      Url: `${Deno.env.get('SONIC_NOVA_WEBHOOK_URL')}/voice/${receptionist.sonic_nova_agent_id}`,
      Method: 'POST'
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to initiate test call: ${response.statusText}`)
  }

  const callData = await response.json()

  return new Response(
    JSON.stringify({ 
      success: true, 
      callSid: callData.sid,
      message: 'Test call initiated'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}

async function deployVoiceAgent(
  receptionistId: string,
  apiKey: string,
  endpoint: string,
  supabase: any
) {
  // Get agent ID from database
  const { data: receptionist, error } = await supabase
    .from('ai_receptionists')
    .select('sonic_nova_agent_id')
    .eq('id', receptionistId)
    .single()

  if (error || !receptionist?.sonic_nova_agent_id) {
    throw new Error('Voice agent not found')
  }

  // Deploy agent in Sonic Nova
  const response = await fetch(`${endpoint}/agents/${receptionist.sonic_nova_agent_id}/deploy`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to deploy voice agent: ${response.statusText}`)
  }

  // Update status to active
  await supabase
    .from('ai_receptionists')
    .update({ 
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', receptionistId)

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Voice agent deployed successfully'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}