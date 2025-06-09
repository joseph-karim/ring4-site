// Standalone Nova Sonic Server for Ring4 AI Receptionist
// This runs as a separate Node.js server to handle WebSocket connections
// Based on the working Nova Sonic implementation

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { config } = require('dotenv');
const {
  BedrockRuntimeClient,
  InvokeModelWithBidirectionalStreamCommand,
} = require("@aws-sdk/client-bedrock-runtime");
const {
  NodeHttp2Handler,
} = require("@smithy/node-http-handler");
const { randomUUID } = require('crypto');

// Load environment variables
config();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "https://ring4.netlify.app", "https://ring4.com", "https://ring4-site-production.up.railway.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Create the AWS Bedrock client with HTTP/2 support
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

// Class to manage Nova Sonic sessions with proper lifecycle management
class NovaSessionManager {
    constructor(client) {
        this.client = client;
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
        
        this.sessionId = randomUUID();
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
        
        this.promptId = randomUUID();
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
        
        this.contentId = randomUUID();
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
        
        // Ensure content is closed first
        if (this.isContentActive) {
            await this.endContent();
        }
        
        this.isPromptActive = false;
        console.log(`Nova Sonic prompt ended: ${this.promptId}`);
        this.promptId = null;
    }

    async endSession() {
        if (!this.isSessionActive) {
            return; // Already ended
        }
        
        // Ensure prompt is closed first
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

    getSessionId() {
        return this.sessionId;
    }

    getPromptId() {
        return this.promptId;
    }

    getContentId() {
        return this.contentId;
    }

    isActive() {
        return this.isSessionActive;
    }
}

// Store active sessions
const activeSessions = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        novaSonicReady: !!process.env.AWS_ACCESS_KEY_ID,
        port: process.env.PORT || 3002,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('🎯 New client connected:', socket.id);
    
    // Create session manager for this client
    const sessionManager = new NovaSessionManager(bedrockClient);
    activeSessions.set(socket.id, sessionManager);

    // Handle session start
    socket.on('start_session', async (data) => {
        try {
            console.log('🚀 Starting Nova Sonic session for client:', socket.id);
            
            // Start session
            const sessionId = await sessionManager.startSession();
            
            // Configure system prompt with business context
            const systemPrompt = createBusinessSystemPrompt(data);

            // Create the bidirectional streaming command
            const command = new InvokeModelWithBidirectionalStreamCommand({
                modelId: "amazon.nova-sonic-v1:0",
                body: createEventStream(sessionManager, systemPrompt)
            });

            // Start streaming
            const response = await bedrockClient.send(command);
            
            if (response.body) {
                processResponseStream(response.body, socket, sessionManager);
            }

            socket.emit('session_ready');
            console.log('✅ Nova Sonic session ready for client:', socket.id);
            
        } catch (error) {
            console.error('❌ Error starting Nova Sonic session:', error);
            socket.emit('error', { message: 'Failed to start voice session: ' + error.message });
            await sessionManager.endSession();
        }
    });

    // Handle audio input
    socket.on('audio_input', async (audioBase64) => {
        try {
            const sessionManager = activeSessions.get(socket.id);
            if (!sessionManager || !sessionManager.isActive()) {
                socket.emit('error', { message: 'No active voice session' });
                return;
            }

            // Convert base64 to buffer for Nova Sonic
            const audioBuffer = Buffer.from(audioBase64, 'base64');
            
            // Log audio level for debugging
            const samples = new Int16Array(audioBuffer.buffer);
            let sum = 0;
            for (let i = 0; i < samples.length; i++) {
                sum += samples[i] * samples[i];
            }
            const rms = Math.sqrt(sum / samples.length);
            const level = Math.round((rms / 32768) * 100);
            
            console.log(`🎤 Processing audio for ${socket.id} - Level: ${level}% (${samples.length} samples)`);
            
            // TODO: Send audio to active Nova Sonic stream
            // This requires integrating with the bidirectional stream
            
        } catch (error) {
            console.error('❌ Error processing audio input:', error);
            socket.emit('error', { message: 'Failed to process audio' });
        }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
        console.log('👋 Client disconnected:', socket.id);
        const sessionManager = activeSessions.get(socket.id);
        if (sessionManager) {
            await sessionManager.endSession();
            activeSessions.delete(socket.id);
        }
    });
});

// Create business-specific system prompt
function createBusinessSystemPrompt(data) {
    const basePrompt = data.systemPrompt || 
        "You are a helpful AI receptionist. Be professional, friendly, and concise in your responses.";
        
    if (!data.businessInfo) return basePrompt;

    const businessInfo = data.businessInfo;
    return `${basePrompt}

BUSINESS CONTEXT:
- You are the AI receptionist for ${businessInfo.name || 'this business'}
- Personality: ${businessInfo.personality || 'Professional and helpful'}
- Always identify yourself as the AI receptionist for this business

KNOWLEDGE BASE:
${businessInfo.knowledgeBase ? JSON.stringify(businessInfo.knowledgeBase, null, 2) : 'General business knowledge available'}

INSTRUCTIONS:
- Use the business knowledge to provide accurate information
- Always be professional and represent the business well
- If you don't know something specific, offer to connect them with someone who can help
- Keep responses conversational and concise`;
}

// Create event stream with proper AWS SDK format
async function* createEventStream(sessionManager, systemPrompt) {
    try {
        // 1. Start session event
        const sessionId = sessionManager.getSessionId();
        if (!sessionId) {
            throw new Error('No active session');
        }

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

        // 4. Send system prompt as text input
        yield {
            chunk: {
                bytes: new TextEncoder().encode(JSON.stringify({
                    textInput: {
                        promptId: promptId,
                        contentId: contentId,
                        content: systemPrompt
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

        console.log('✅ Nova Sonic initial session setup completed successfully');

        // Keep the stream alive for future interactions
        
    } catch (error) {
        console.error('❌ Error in Nova Sonic event stream:', error);
        // Ensure cleanup on error
        await sessionManager.endSession();
        throw error;
    }
}

// Process response stream from Nova Sonic
async function processResponseStream(stream, socket, sessionManager) {
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
                        
                        socket.emit('transcript', {
                            role: role,
                            content: content
                        });
                    } 
                    else if (jsonResponse.audioOutput) {
                        console.log('🔊 Nova Sonic audio output received, sending to client');
                        const audioBase64 = jsonResponse.audioOutput.content;
                        socket.emit('audioResponse', audioBase64);
                    }
                    else if (jsonResponse.contentStart) {
                        console.log('📝 Nova Sonic content start:', jsonResponse.contentStart.type);
                    }
                    else if (jsonResponse.contentEnd) {
                        console.log('📝 Nova Sonic content end');
                    }
                    else if (jsonResponse.completionEnd) {
                        console.log('🏁 Nova Sonic completion end - conversation finished');
                    }

                } catch (parseError) {
                    console.error('❌ Error parsing Nova Sonic response:', parseError);
                    console.log('Raw response:', new TextDecoder().decode(event.chunk.bytes).substring(0, 200));
                }
            } else if (event.modelStreamErrorException) {
                console.error('❌ Nova Sonic model stream error:', event.modelStreamErrorException);
                socket.emit('error', { message: 'Voice model error' });
            } else if (event.internalServerException) {
                console.error('❌ Nova Sonic internal server error:', event.internalServerException);
                socket.emit('error', { message: 'Voice service error' });
            } else if (event.error) {
                console.error('❌ Nova Sonic stream error:', event.error);
                socket.emit('error', { message: event.error.message });
                break;
            }
        }
    } catch (error) {
        console.error('❌ Error processing Nova Sonic response stream:', error);
        socket.emit('error', { message: 'Stream processing failed' });
    } finally {
        // Ensure session cleanup
        await sessionManager.endSession();
    }
}

// Start the server
const PORT = parseInt(process.env.PORT || '3002', 10);
// For Railway, we need to listen on all interfaces including IPv6
const HOST = process.env.RAILWAY_STATIC_URL ? '::' : '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`🚀 Nova Sonic server running on port ${PORT}`);
    console.log(`🎯 WebSocket endpoint: ws://${HOST === '::' ? 'localhost' : HOST}:${PORT}`);
    console.log(`📊 Health check: http://${HOST === '::' ? 'localhost' : HOST}:${PORT}/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🚉 Railway PORT: ${process.env.PORT}`);
    console.log(`🌐 Listening on: ${HOST}`);
    
    if (!process.env.AWS_ACCESS_KEY_ID) {
        console.warn('⚠️  AWS credentials not configured - Nova Sonic will not work');
    } else {
        console.log('✅ AWS credentials configured');
    }
});

// Handle server errors
server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('📥 SIGTERM received, shutting down gracefully');
    
    // Close all active sessions
    for (const [, sessionManager] of activeSessions) {
        await sessionManager.endSession();
    }
    activeSessions.clear();
    
    server.close(() => {
        console.log('👋 Nova Sonic server closed');
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('📥 SIGINT received, shutting down gracefully');
    
    // Close all active sessions
    for (const [clientId, sessionManager] of activeSessions) {
        await sessionManager.endSession();
    }
    activeSessions.clear();
    
    server.close(() => {
        console.log('👋 Nova Sonic server closed');
        process.exit(0);
    });
});