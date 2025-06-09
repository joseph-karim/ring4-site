// Supabase Edge Function for processing voice agent requests with AWS Bedrock
// This handles the secure communication with Amazon Nova Sonic via Bedrock

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VoiceAgentRequest {
  action: 'create' | 'test' | 'deploy' | 'configure'
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

    // Get AWS credentials for Bedrock
    const awsAccessKeyId = Deno.env.get('AWS_ACCESS_KEY_ID')
    const awsSecretAccessKey = Deno.env.get('AWS_SECRET_ACCESS_KEY')
    const awsRegion = Deno.env.get('AWS_REGION') || 'us-east-1'
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN')

    switch (action) {
      case 'configure':
        return await configureVoiceAgent(receptionistId, config, supabaseClient)
      
      case 'create':
        return await createVoiceAgentSession(receptionistId, config, awsAccessKeyId, awsSecretAccessKey, awsRegion, supabaseClient)
      
      case 'test':
        return await testVoiceAgent(receptionistId, phoneNumber, twilioAccountSid, twilioAuthToken, supabaseClient)
      
      case 'deploy':
        return await deployVoiceAgent(receptionistId, supabaseClient)
      
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

async function configureVoiceAgent(
  receptionistId: string,
  config: any,
  supabase: any
) {
  // Store the configuration in the database
  const { error } = await supabase
    .from('ai_receptionists')
    .update({ 
      ai_config: config,
      updated_at: new Date().toISOString()
    })
    .eq('id', receptionistId)

  if (error) {
    throw new Error(`Failed to update configuration: ${error.message}`)
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Voice agent configuration saved'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}

async function createVoiceAgentSession(
  receptionistId: string,
  config: any,
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  supabase: any
) {
  // For AWS Bedrock Nova Sonic, we don't create a persistent agent
  // Instead, we prepare the configuration for real-time streaming
  
  // Generate a unique session ID for this agent
  const sessionId = crypto.randomUUID()
  
  // Prepare the Nova Sonic configuration
  const novaSonicConfig = {
    sessionId,
    modelId: 'amazon.nova-sonic-v1',
    region,
    inferenceConfig: {
      maxTokens: 500,
      topP: 0.9,
      temperature: 0.7
    },
    voiceConfig: {
      voiceId: config.voiceSettings?.voiceId || 'tiffany',
      audioType: 'SPEECH',
      mediaType: 'audio/lpcm',
      sampleRateHertz: 24000,
      sampleSizeBits: 16,
      channelCount: 1,
      encoding: 'base64'
    },
    systemPrompt: config.systemPrompt,
    knowledgeBase: config.knowledgeBase
  }

  // Update receptionist record with session configuration
  const { error } = await supabase
    .from('ai_receptionists')
    .update({ 
      sonic_nova_agent_id: sessionId,
      ai_config: {
        ...config,
        novaSonicConfig
      },
      updated_at: new Date().toISOString()
    })
    .eq('id', receptionistId)

  if (error) {
    throw new Error(`Failed to update receptionist record: ${error.message}`)
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      sessionId,
      message: 'Voice agent session configured for AWS Bedrock'
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
  // Get agent configuration from database
  const { data: receptionist, error } = await supabase
    .from('ai_receptionists')
    .select('sonic_nova_agent_id, ai_config')
    .eq('id', receptionistId)
    .single()

  if (error || !receptionist) {
    throw new Error('Voice agent not found')
  }

  // For demo purposes, we'll simulate a test call
  // In production, this would connect to a WebSocket server that handles Bedrock streaming
  
  const testCallId = crypto.randomUUID()
  
  // Log the test call
  await supabase
    .from('demo_calls')
    .insert({
      receptionist_id: receptionistId,
      transcript: [`Test call initiated to ${phoneNumber}`],
      duration: 0
    })

  return new Response(
    JSON.stringify({ 
      success: true, 
      callId: testCallId,
      message: 'Test call simulated. In production, this would initiate a real call via WebSocket to Bedrock.'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}

async function deployVoiceAgent(
  receptionistId: string,
  supabase: any
) {
  // For AWS Bedrock, deployment means marking the agent as ready
  // The actual streaming happens in real-time when calls come in
  
  const { error } = await supabase
    .from('ai_receptionists')
    .update({ 
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', receptionistId)

  if (error) {
    throw new Error(`Failed to deploy agent: ${error.message}`)
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Voice agent activated and ready for AWS Bedrock streaming'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  )
}