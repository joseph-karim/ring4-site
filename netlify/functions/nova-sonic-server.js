// Nova Sonic Voice Server for Netlify Functions
// This creates a WebSocket-like interface using Server-Sent Events and HTTP endpoints
// Based on the working Nova Sonic implementation

const { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } = require("@aws-sdk/client-bedrock-runtime");
const { NodeHttp2Handler } = require("@smithy/node-http-handler");

// Create Bedrock client with proper configuration
const nodeHttp2Handler = new NodeHttp2Handler({
    requestTimeout: 300000,
    sessionTimeout: 300000,
});

const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    requestHandler: nodeHttp2Handler,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Store active sessions (in production, use Redis or similar)
const activeSessions = new Map();

class NovaSessionManager {
    constructor() {
        this.sessionId = null;
        this.promptId = null;
        this.contentId = null;
        this.isSessionActive = false;
        this.isPromptActive = false;
        this.isContentActive = false;
        this.stream = null;
    }

    async startSession() {
        if (this.isSessionActive) {
            throw new Error('Session already active');
        }
        
        this.sessionId = this.generateId();
        this.isSessionActive = true;
        console.log(`Nova Sonic session started: ${this.sessionId}`);
        return this.sessionId;
    }

    async startPrompt() {
        if (!this.isSessionActive) {
            throw new Error('No active session');
        }
        if (this.isPromptActive) {
            throw new Error('Prompt already active');
        }
        
        this.promptId = this.generateId();
        this.isPromptActive = true;
        console.log(`Nova Sonic prompt started: ${this.promptId}`);
        return this.promptId;
    }

    async startContent() {
        if (!this.isPromptActive) {
            throw new Error('No active prompt');
        }
        if (this.isContentActive) {
            throw new Error('Content already active');
        }
        
        this.contentId = this.generateId();
        this.isContentActive = true;
        console.log(`Nova Sonic content started: ${this.contentId}`);
        return this.contentId;
    }

    async endContent() {
        if (!this.isContentActive) {
            throw new Error('No active content to end');
        }
        
        this.isContentActive = false;
        console.log(`Nova Sonic content ended: ${this.contentId}`);
        this.contentId = null;
    }

    async endPrompt() {
        if (!this.isPromptActive) {
            throw new Error('No active prompt to end');
        }
        
        if (this.isContentActive) {
            await this.endContent();
        }
        
        this.isPromptActive = false;
        console.log(`Nova Sonic prompt ended: ${this.promptId}`);
        this.promptId = null;
    }

    async endSession() {
        if (!this.isSessionActive) {
            return;
        }
        
        if (this.isPromptActive) {
            await this.endPrompt();
        }
        
        this.isSessionActive = false;
        console.log(`Nova Sonic session ended: ${this.sessionId}`);
        this.sessionId = null;
        
        if (this.stream) {
            this.stream = null;
        }
    }

    generateId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    isActive() {
        return this.isSessionActive;
    }
}

// Main handler for Netlify functions
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { action, sessionId, data } = JSON.parse(event.body || '{}');

        switch (action) {
            case 'start_session':
                return await startSession(data, headers);
            case 'send_audio':
                return await sendAudio(sessionId, data, headers);
            case 'end_session':
                return await endSession(sessionId, headers);
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Invalid action' })
                };
        }

    } catch (error) {
        console.error('Nova Sonic error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

async function startSession(data, headers) {
    try {
        const sessionManager = new NovaSessionManager();
        const sessionId = await sessionManager.startSession();
        
        // Store session
        activeSessions.set(sessionId, sessionManager);
        
        // Configure system prompt
        const systemPrompt = data.systemPrompt || 
            "You are a helpful AI receptionist. Be professional, friendly, and concise in your responses.";

        // Create the bidirectional streaming command
        const command = new InvokeModelWithBidirectionalStreamCommand({
            modelId: "amazon.nova-sonic-v1:0",
            body: createEventStream(sessionManager, systemPrompt, data.businessInfo)
        });

        // Start streaming (this will be handled asynchronously)
        bedrockClient.send(command).then((response) => {
            if (response.body) {
                processResponseStream(response.body, sessionManager);
            }
        }).catch((error) => {
            console.error('Error starting Nova Sonic stream:', error);
            sessionManager.endSession();
            activeSessions.delete(sessionId);
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                sessionId,
                message: 'Nova Sonic session started'
            })
        };

    } catch (error) {
        console.error('Error starting session:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to start Nova Sonic session' })
        };
    }
}

async function sendAudio(sessionId, audioData, headers) {
    try {
        const sessionManager = activeSessions.get(sessionId);
        if (!sessionManager || !sessionManager.isActive()) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'No active session' })
            };
        }

        // Process audio with Nova Sonic
        // This would need to be integrated with the active stream
        console.log('Processing audio data for session:', sessionId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Audio processed'
            })
        };

    } catch (error) {
        console.error('Error processing audio:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to process audio' })
        };
    }
}

async function endSession(sessionId, headers) {
    try {
        const sessionManager = activeSessions.get(sessionId);
        if (sessionManager) {
            await sessionManager.endSession();
            activeSessions.delete(sessionId);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Session ended'
            })
        };

    } catch (error) {
        console.error('Error ending session:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to end session' })
        };
    }
}

// Create event stream for Nova Sonic
async function* createEventStream(sessionManager, systemPrompt, businessInfo) {
    try {
        // 1. Start session event
        const sessionId = sessionManager.sessionId;
        yield {
            chunk: {
                bytes: new TextEncoder().encode(JSON.stringify({
                    sessionStart: {
                        sessionId: sessionId,
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
        const promptId = await sessionManager.startPrompt();
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
        const contentId = await sessionManager.startContent();
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
        await sessionManager.endContent();
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
        await sessionManager.endPrompt();
        yield {
            chunk: {
                bytes: new TextEncoder().encode(JSON.stringify({
                    promptEnd: {
                        promptId: promptId
                    }
                }))
            }
        };

        console.log('Nova Sonic initial session setup completed successfully');

    } catch (error) {
        console.error('Error in Nova Sonic event stream:', error);
        await sessionManager.endSession();
        throw error;
    }
}

// Create business-specific system prompt
function createBusinessSystemPrompt(basePrompt, businessInfo) {
    if (!businessInfo) return basePrompt;

    return `${basePrompt}

BUSINESS CONTEXT:
- Business Name: ${businessInfo.name || 'Your Business'}
- Personality: ${businessInfo.personality || 'Professional and helpful'}

KNOWLEDGE BASE:
${businessInfo.knowledgeBase ? JSON.stringify(businessInfo.knowledgeBase, null, 2) : 'General business knowledge'}

Always identify yourself as the AI receptionist for ${businessInfo.name || 'this business'} and use the business knowledge to provide accurate information.`;
}

// Process response stream from Nova Sonic
async function processResponseStream(stream, sessionManager) {
    try {
        for await (const event of stream) {
            if (event.chunk?.bytes) {
                try {
                    const textResponse = new TextDecoder().decode(event.chunk.bytes);
                    const jsonResponse = JSON.parse(textResponse);

                    console.log('📨 Nova Sonic event:', Object.keys(jsonResponse));

                    if (jsonResponse.textOutput) {
                        const content = jsonResponse.textOutput.content;
                        const role = jsonResponse.textOutput.role || 'assistant';
                        console.log(`💬 Nova Sonic text (${role}):`, content);
                        
                        // Store transcript for later retrieval
                        // In production, emit to client via WebSocket or store in database
                    } 
                    else if (jsonResponse.audioOutput) {
                        console.log('🔊 Nova Sonic audio output received');
                        const audioBase64 = jsonResponse.audioOutput.content;
                        
                        // Store audio for later retrieval
                        // In production, emit to client via WebSocket or store in database
                    }
                    else if (jsonResponse.contentStart) {
                        console.log('📝 Nova Sonic content start:', jsonResponse.contentStart.type);
                    }
                    else if (jsonResponse.contentEnd) {
                        console.log('📝 Nova Sonic content end');
                    }
                    else if (jsonResponse.completionEnd) {
                        console.log('🏁 Nova Sonic completion end');
                    }

                } catch (parseError) {
                    console.error('❌ Error parsing Nova Sonic response:', parseError);
                }
            }
        }
    } catch (error) {
        console.error('Error processing Nova Sonic response stream:', error);
    } finally {
        await sessionManager.endSession();
    }
}