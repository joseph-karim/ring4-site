// Standalone Nova Sonic Server for Ring4 AI Receptionist
// This runs as a separate Node.js server to handle WebSocket connections
// Based on the working Nova Sonic implementation

console.log('🏁 Nova Sonic Server script loaded');
console.log('🏁 Node version:', process.version);
console.log('🏁 Current directory:', __dirname);
console.log('🏁 Process ID:', process.pid);

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
// Cloud platforms set environment variables directly, don't need .env file in production
if (process.env.NODE_ENV !== 'production') {
    config();
}

// Debug server environment
console.log('🔍 Starting Nova Sonic Server...');
console.log('🔍 Environment variables:');
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   PORT:', process.env.PORT);
console.log('   RENDER_SERVICE_NAME:', process.env.RENDER_SERVICE_NAME);
console.log('   RENDER_INSTANCE_ID:', process.env.RENDER_INSTANCE_ID);

// Create Express app and HTTP server
const app = express();

// Add middleware to log all requests
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url} from ${req.ip}`);
    next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000", 
      "http://localhost:5173", 
      "https://ring4.netlify.app", 
      "https://ring4.com", 
      "https://ring4-site.onrender.com",
      "https://*.onrender.com"  // Allow all Render deployments
    ],
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
        
        // End the stream handler if it exists
        if (this.streamHandler) {
            this.streamHandler.endStream();
            this.streamHandler = null;
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

// Bidirectional Stream Handler for Nova Sonic
class BidirectionalStreamHandler {
    constructor(sessionManager, systemPrompt) {
        this.sessionManager = sessionManager;
        this.systemPrompt = systemPrompt;
        this.inputQueue = [];
        this.isStreamActive = true;
    }

    // Get the input stream generator for AWS SDK
    async *getInputStream() {
        try {
            const promptId = this.sessionManager.getPromptId();
            const contentId = this.sessionManager.getContentId();
            const audioContentId = randomUUID();

            // 1. Session Start Event (with event wrapper)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            sessionStart: {
                                inferenceConfiguration: {
                                    maxTokens: 1024,
                                    topP: 0.9,
                                    temperature: 0.7
                                }
                            }
                        }
                    }))
                }
            };

            // 2. Prompt Start Event (with event wrapper)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            promptStart: {
                                promptName: promptId,
                                textOutputConfiguration: {
                                    mediaType: "text/plain"
                                },
                                audioOutputConfiguration: {
                                    mediaType: "audio/lpcm",
                                    sampleRateHertz: 24000,
                                    sampleSizeBits: 16,
                                    channelCount: 1,
                                    voiceId: "tiffany",
                                    encoding: "base64",
                                    audioType: "SPEECH"
                                }
                            }
                        }
                    }))
                }
            };

            // 3. System Content Start Event (with event wrapper)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            contentStart: {
                                promptName: promptId,
                                contentName: contentId,
                                type: "TEXT",
                                interactive: true,
                                role: "SYSTEM",
                                textInputConfiguration: {
                                    mediaType: "text/plain"
                                }
                            }
                        }
                    }))
                }
            };

            // 4. Send system prompt (with event wrapper)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            textInput: {
                                promptName: promptId,
                                contentName: contentId,
                                content: this.systemPrompt
                            }
                        }
                    }))
                }
            };

            // 5. End system content (with event wrapper)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            contentEnd: {
                                promptName: promptId,
                                contentName: contentId
                            }
                        }
                    }))
                }
            };

            // 6. Start Audio Content (Interactive - stays open for audio input)
            yield {
                chunk: {
                    bytes: new TextEncoder().encode(JSON.stringify({
                        event: {
                            contentStart: {
                                promptName: promptId,
                                contentName: audioContentId,
                                type: "AUDIO",
                                interactive: true,
                                role: "USER",
                                audioInputConfiguration: {
                                    mediaType: "audio/lpcm",
                                    sampleRateHertz: 16000,
                                    sampleSizeBits: 16,
                                    channelCount: 1,
                                    encoding: "base64"
                                }
                            }
                        }
                    }))
                }
            };

            console.log('✅ Nova Sonic session setup completed - ready for audio input');
            
            // Store audio content ID for later use
            this.sessionManager.audioContentId = audioContentId;
            
            // Keep the stream alive and process queued audio input
            while (this.isStreamActive) {
                // Check for queued audio input
                if (this.inputQueue.length > 0) {
                    const audioEvent = this.inputQueue.shift();
                    yield audioEvent;
                }
                
                // Small delay to prevent busy waiting
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            
        } catch (error) {
            console.error('❌ Error in Nova Sonic event stream:', error);
            await this.sessionManager.endSession();
            throw error;
        }
    }

    // Add audio input to the queue
    sendAudioInput(audioBase64) {
        if (!this.isStreamActive) {
            throw new Error('Stream is not active');
        }

        const audioEvent = {
            chunk: {
                bytes: new TextEncoder().encode(JSON.stringify({
                    event: {
                        audioInput: {
                            promptName: this.sessionManager.getPromptId(),
                            contentName: this.sessionManager.audioContentId,
                            content: audioBase64
                        }
                    }
                }))
            }
        };

        this.inputQueue.push(audioEvent);
    }

    // End the stream
    endStream() {
        this.isStreamActive = false;
    }
}

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        service: 'Nova Sonic Voice Server',
        status: 'running',
        endpoints: {
            health: '/health',
            websocket: '/socket.io'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        novaSonicReady: !!process.env.AWS_ACCESS_KEY_ID,
        port: process.env.PORT || 3000,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        headers: req.headers
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
            
            // Start session and prepare IDs
            await sessionManager.startSession();
            await sessionManager.startPrompt();
            await sessionManager.startContent();
            
            // Configure system prompt with business context
            const systemPrompt = createBusinessSystemPrompt(data);

            // Create a bidirectional stream handler
            const streamHandler = new BidirectionalStreamHandler(sessionManager, systemPrompt);
            
            // Store the stream handler for audio input
            sessionManager.streamHandler = streamHandler;
            
            // Create the bidirectional streaming command with the input stream
            const inputStream = streamHandler.getInputStream();
            const command = new InvokeModelWithBidirectionalStreamCommand({
                modelId: "amazon.nova-sonic-v1:0",
                body: inputStream
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
            console.error('   Error details:', {
                message: error.message,
                code: error.code,
                statusCode: error.$metadata?.httpStatusCode,
                requestId: error.$metadata?.requestId
            });
            socket.emit('error', { message: 'Failed to start voice session: ' + error.message });
            await sessionManager.endSession();
        }
    });

    // Handle audio input
    socket.on('audio_input', async (audioBase64) => {
        try {
            const sessionManager = activeSessions.get(socket.id);
            if (!sessionManager || !sessionManager.isActive() || !sessionManager.streamHandler) {
                socket.emit('error', { message: 'No active voice session or audio stream' });
                return;
            }

            // Log audio level for debugging
            const audioBuffer = Buffer.from(audioBase64, 'base64');
            const samples = new Int16Array(audioBuffer.buffer);
            let sum = 0;
            for (let i = 0; i < samples.length; i++) {
                sum += samples[i] * samples[i];
            }
            const rms = Math.sqrt(sum / samples.length);
            const level = Math.round((rms / 32768) * 100);
            
            console.log(`🎤 Processing audio for ${socket.id} - Level: ${level}% (${samples.length} samples)`);
            
            // Send audio input through the bidirectional stream handler
            sessionManager.streamHandler.sendAudioInput(audioBase64);
            
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
            try {
                // If there's an active stream handler, properly close the audio content first
                if (sessionManager.streamHandler && sessionManager.audioContentId) {
                    // Send content end event for the audio stream
                    const endEvent = {
                        chunk: {
                            bytes: new TextEncoder().encode(JSON.stringify({
                                event: {
                                    contentEnd: {
                                        promptName: sessionManager.getPromptId(),
                                        contentName: sessionManager.audioContentId
                                    }
                                }
                            }))
                        }
                    };
                    sessionManager.streamHandler.inputQueue.push(endEvent);
                    
                    // Give it a moment to process
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                // Now end the stream handler
                if (sessionManager.streamHandler) {
                    sessionManager.streamHandler.endStream();
                }
                
                // Finally end the session
                await sessionManager.endSession();
            } catch (error) {
                console.error('Error during disconnect cleanup:', error);
            }
            
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
- Keep responses conversational and concise
- IMPORTANT: Provide complete responses in a single statement. Do not split your response into multiple parts.
- When greeting, include everything in one sentence (e.g., "Hello, thank you for calling [business], I'm your AI receptionist, how can I help you today?")`;
}


// Process response stream from Nova Sonic
async function processResponseStream(stream, socket, sessionManager) {
    let currentContentRole = null; // Track role from contentStart events
    let currentAudioContentId = null; // Track audio content ID
    let audioChunkCount = 0;
    let shouldPlayAudio = true; // Track if we should play audio for current content
    
    try {
        for await (const event of stream) {
            if (event.chunk?.bytes) {
                try {
                    const textResponse = new TextDecoder().decode(event.chunk.bytes);
                    const jsonResponse = JSON.parse(textResponse);

                    // Nova Sonic responses have an "event" wrapper
                    if (jsonResponse.event) {
                        // Handle content start event - tells us what type of content is coming
                        if (jsonResponse.event.contentStart) {
                            const contentStart = jsonResponse.event.contentStart;
                            let stage = 'unknown';
                            try {
                                if (contentStart.additionalModelFields) {
                                    const fields = JSON.parse(contentStart.additionalModelFields);
                                    stage = fields.generationStage || 'unknown';
                                }
                            } catch (e) {}
                            
                            console.log(`📝 Content start: ${contentStart.type} | role: ${contentStart.role} | stage: ${stage} | contentId: ${contentStart.contentId || contentStart.contentName}`);
                            
                            // Remember the role for text outputs
                            if (contentStart.type === 'TEXT') {
                                currentContentRole = contentStart.role?.toLowerCase() || 'assistant';
                                // Store the contentStart for checking generation stage
                                sessionManager.lastContentStart = contentStart;
                            } else if (contentStart.type === 'AUDIO') {
                                currentAudioContentId = contentStart.contentId || contentStart.contentName;
                                audioChunkCount = 0;
                                
                                // Only play audio if this is FINAL generation (not SPECULATIVE)
                                shouldPlayAudio = stage === 'FINAL' || stage === 'unknown';
                                
                                console.log(`🎵 Audio content starting - ID: ${currentAudioContentId}, stage: ${stage}, will play: ${shouldPlayAudio}`);
                            }
                        }
                        // Handle audio output event (AI speaking)
                        else if (jsonResponse.event.audioOutput) {
                            audioChunkCount++;
                            
                            if (shouldPlayAudio) {
                                console.log(`🔊 Nova Sonic audio chunk #${audioChunkCount} - sending to client`);
                                socket.emit('audioResponse', jsonResponse.event.audioOutput.content);
                            } else {
                                console.log(`🔇 Nova Sonic audio chunk #${audioChunkCount} - skipping (SPECULATIVE)`);
                            }
                        }
                        // Handle text output event (transcriptions for display)
                        else if (jsonResponse.event.textOutput) {
                            const content = jsonResponse.event.textOutput.content;
                            const role = currentContentRole === 'user' ? 'user' : 'assistant';
                            
                            // Check if we have generation stage info from the last contentStart
                            let generationStage = 'unknown';
                            if (sessionManager.lastContentStart && sessionManager.lastContentStart.additionalModelFields) {
                                try {
                                    const fields = JSON.parse(sessionManager.lastContentStart.additionalModelFields);
                                    generationStage = fields.generationStage || 'unknown';
                                } catch (e) {}
                            }
                            
                            console.log(`💬 ${role} (${generationStage}):`, content);
                            
                            // For assistant responses, only show FINAL text to avoid duplicates
                            // For user transcriptions, always show them
                            if (content && content.trim()) {
                                if (role === 'user' || generationStage === 'FINAL' || generationStage === 'unknown') {
                                    socket.emit('transcript', {
                                        role: role,
                                        content: content
                                    });
                                }
                            }
                        }
                        // Handle content end event
                        else if (jsonResponse.event.contentEnd) {
                            const contentEnd = jsonResponse.event.contentEnd;
                            if (currentAudioContentId && (contentEnd.contentId === currentAudioContentId || contentEnd.contentName === currentAudioContentId)) {
                                console.log(`🎵 Audio content ended - ID: ${currentAudioContentId}, sent ${audioChunkCount} chunks`);
                                currentAudioContentId = null;
                            }
                        }
                        // Log other events
                        else {
                            console.log('📨 Nova Sonic event:', Object.keys(jsonResponse.event)[0]);
                        }
                    } else {
                        console.log('⚠️ Unexpected response format:', Object.keys(jsonResponse));
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
        console.error('   Stream error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        socket.emit('error', { message: 'Stream processing failed' });
    } finally {
        // Ensure session cleanup
        await sessionManager.endSession();
    }
}

// Start the server
const PORT = parseInt(process.env.PORT || '3000', 10);

// Use standard binding for cloud platforms
const startServer = () => {
    // Use default binding (works on most cloud platforms)
    server.listen(PORT, () => {
        console.log(`🚀 Nova Sonic server running on port ${PORT}`);
        console.log(`🎯 WebSocket endpoint available`);
        console.log(`📊 Health check: /health`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🚉 PORT from env: ${process.env.PORT || 'not set (using 3000)'}`);
        console.log(`🌐 Listening on all available interfaces`);
        console.log(`🚄 Server started successfully!`);
        
        // Get actual address info
        const address = server.address();
        console.log(`📍 Actual binding:`, address);
        
        if (!process.env.AWS_ACCESS_KEY_ID) {
            console.warn('⚠️  AWS credentials not configured - Nova Sonic will not work');
        } else {
            console.log('✅ AWS credentials configured');
        }
    });
};

// Handle server errors
server.on('error', (error) => {
    console.error('❌ Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else if (error.code === 'EACCES') {
        console.error(`No permission to use port ${PORT}`);
    } else if (error.code === 'EAFNOSUPPORT') {
        console.error('IPv6 is not supported on this system');
        console.log('Falling back to IPv4 only...');
        // Fallback to IPv4 if IPv6 is not supported
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Nova Sonic server running on port ${PORT} (IPv4 only)`);
        });
        return;
    }
    process.exit(1);
});

// Start the server
startServer();

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