// Nova Sonic Voice AI Integration for Supabase Edge Functions
// Uses AWS Bedrock Nova Sonic with credentials from Supabase secrets

import { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } from "https://esm.sh/@aws-sdk/client-bedrock-runtime@3.785.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

interface NovaSessionManager {
  sessionId: string;
  promptId: string | null;
  contentId: string | null;
  isSessionActive: boolean;
  isPromptActive: boolean;
  isContentActive: boolean;
}

function createSessionManager(): NovaSessionManager {
  return {
    sessionId: crypto.randomUUID(),
    promptId: null,
    contentId: null,
    isSessionActive: false,
    isPromptActive: false,
    isContentActive: false
  };
}

async function startSession(manager: NovaSessionManager): Promise<string> {
  if (manager.isSessionActive) {
    throw new Error('Session already active');
  }
  
  manager.isSessionActive = true;
  console.log(`Nova Sonic session started: ${manager.sessionId}`);
  return manager.sessionId;
}

async function startPrompt(manager: NovaSessionManager): Promise<string> {
  if (!manager.isSessionActive) {
    throw new Error('No active session');
  }
  if (manager.isPromptActive) {
    throw new Error('Prompt already active');
  }
  
  manager.promptId = crypto.randomUUID();
  manager.isPromptActive = true;
  console.log(`Nova Sonic prompt started: ${manager.promptId}`);
  return manager.promptId;
}

async function startContent(manager: NovaSessionManager): Promise<string> {
  if (!manager.isPromptActive) {
    throw new Error('No active prompt');
  }
  if (manager.isContentActive) {
    throw new Error('Content already active');
  }
  
  manager.contentId = crypto.randomUUID();
  manager.isContentActive = true;
  console.log(`Nova Sonic content started: ${manager.contentId}`);
  return manager.contentId;
}

async function* createEventStream(manager: NovaSessionManager, systemPrompt: string, businessInfo?: any) {
  try {
    // 1. Start session event
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          sessionStart: {
            sessionId: manager.sessionId,
            inferenceConfiguration: {
              maxTokens: 1024,
              topP: 0.9,
              temperature: 0.7
            }
          }
        }))
      }
    };

    // 2. Start prompt event
    const promptId = await startPrompt(manager);
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          promptStart: {
            promptId: promptId,
            textOutputConfiguration: {
              mediaType: "text/plain"
            },
            audioOutputConfiguration: {
              audioType: "SPEECH",
              encoding: "base64",
              mediaType: "audio/lpcm",
              sampleRateHertz: 24000,
              sampleSizeBits: 16,
              channelCount: 1,
              voiceId: "tiffany"
            }
          }
        }))
      }
    };

    // 3. Start content event
    const contentId = await startContent(manager);
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          contentStart: {
            promptId: promptId,
            contentId: contentId,
            type: "TEXT",
            role: "SYSTEM",
            textInputConfiguration: {
              mediaType: "text/plain"
            }
          }
        }))
      }
    };

    // 4. Send enhanced system prompt with business context
    const enhancedPrompt = createBusinessSystemPrompt(systemPrompt, businessInfo);
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          textInput: {
            promptId: promptId,
            contentId: contentId,
            content: enhancedPrompt
          }
        }))
      }
    };

    // 5. End content
    manager.isContentActive = false;
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          contentEnd: {
            promptId: promptId,
            contentId: contentId
          }
        }))
      }
    };

    // 6. End prompt  
    manager.isPromptActive = false;
    yield {
      chunk: {
        bytes: new TextEncoder().encode(JSON.stringify({
          promptEnd: {
            promptId: promptId
          }
        }))
      }
    };

    console.log('✅ Nova Sonic initial session setup completed successfully');

  } catch (error) {
    console.error('❌ Error in Nova Sonic event stream:', error);
    throw error;
  }
}

function createBusinessSystemPrompt(basePrompt: string, businessInfo?: any): string {
  if (!businessInfo) return basePrompt;

  return `${basePrompt}

BUSINESS CONTEXT:
- Business Name: ${businessInfo.name || 'Your Business'}
- Personality: ${businessInfo.personality || 'Professional and helpful'}

KNOWLEDGE BASE:
${businessInfo.knowledgeBase ? JSON.stringify(businessInfo.knowledgeBase, null, 2) : 'General business knowledge'}

Always identify yourself as the AI receptionist for ${businessInfo.name || 'this business'} and use the business knowledge to provide accurate information.`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get AWS credentials from Supabase secrets
    const awsAccessKeyId = Deno.env.get('AWS_ACCESS_KEY_ID');
    const awsSecretAccessKey = Deno.env.get('AWS_SECRET_ACCESS_KEY');
    const awsRegion = Deno.env.get('AWS_REGION') || 'us-east-1';

    if (!awsAccessKeyId || !awsSecretAccessKey) {
      throw new Error('AWS credentials not configured in Supabase secrets');
    }

    // Create Bedrock client
    const bedrockClient = new BedrockRuntimeClient({
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      }
    });

    const { action, data } = await req.json();

    switch (action) {
      case 'start_session': {
        const sessionManager = createSessionManager();
        await startSession(sessionManager);
        
        // Configure system prompt
        const systemPrompt = data.systemPrompt || 
          "You are a helpful AI receptionist. Be professional, friendly, and concise in your responses.";

        // Create the bidirectional streaming command
        const command = new InvokeModelWithBidirectionalStreamCommand({
          modelId: "amazon.nova-sonic-v1:0",
          body: createEventStream(sessionManager, systemPrompt, data.businessInfo)
        });

        // Start streaming
        const response = await bedrockClient.send(command);
        
        // Process response stream
        const transcripts: string[] = [];
        const audioChunks: string[] = [];
        
        if (response.body) {
          for await (const event of response.body) {
            if (event.chunk?.bytes) {
              try {
                const textResponse = new TextDecoder().decode(event.chunk.bytes);
                const jsonResponse = JSON.parse(textResponse);

                if (jsonResponse.textOutput) {
                  const content = jsonResponse.textOutput.content;
                  const role = jsonResponse.textOutput.role || 'assistant';
                  console.log(`💬 Nova Sonic text (${role}):`, content);
                  transcripts.push(`${role}: ${content}`);
                } 
                else if (jsonResponse.audioOutput) {
                  console.log('🔊 Nova Sonic audio output received');
                  const audioBase64 = jsonResponse.audioOutput.content;
                  audioChunks.push(audioBase64);
                }

              } catch (parseError) {
                console.error('❌ Error parsing Nova Sonic response:', parseError);
              }
            }
          }
        }

        return new Response(JSON.stringify({
          success: true,
          sessionId: sessionManager.sessionId,
          transcripts,
          audioChunks,
          message: 'Nova Sonic session completed'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'process_audio': {
        // For now, return success - full implementation would require 
        // bidirectional streaming support in Edge Functions
        return new Response(JSON.stringify({
          success: true,
          message: 'Audio processing would happen here'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid action'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

  } catch (error) {
    console.error('Nova Sonic Edge Function error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});