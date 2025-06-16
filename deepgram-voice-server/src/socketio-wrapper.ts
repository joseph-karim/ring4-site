import { createClient, AgentEvents } from '@deepgram/sdk';
import { Server } from 'socket.io';
import * as http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

if (!DEEPGRAM_API_KEY) {
  console.error('Please set your DEEPGRAM_API_KEY in the .env file');
  process.exit(1);
}

// Initialize Express and Socket.IO
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
// Configure CORS for Socket.IO
const corsOrigins = process.env.NODE_ENV === 'production' 
  ? [
      "https://ring4.netlify.app",
      "https://ring4.com",
      "https://get.ring4.com"
    ]
  : true; // Allow all origins in development

const io = new Server(server, {
  cors: {
    origin: corsOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Initialize Deepgram
const deepgram = createClient(DEEPGRAM_API_KEY);

// Store active sessions
const activeSessions = new Map<string, any>();

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Deepgram Voice Agent Server',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    service: 'Ring4 Deepgram Voice Agent Server',
    status: 'running',
    endpoints: {
      health: '/health',
      websocket: '/socket.io'
    }
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🎯 New client connected:', socket.id);

  socket.on('start_session', async (config) => {
    console.log('📞 Starting voice session for:', socket.id);
    
    try {
      // Create an agent connection
      const agent = deepgram.agent();
      activeSessions.set(socket.id, agent);

      // Set up event handlers
      agent.on(AgentEvents.Open, () => {
        console.log('✅ Agent connection established');
        socket.emit('session_ready');
      });

      agent.on('Welcome', (data) => {
        console.log('Server welcome message:', data);
        
        // Configure the agent with business context
        const systemPrompt = config.systemPrompt || 
          'You are a helpful AI receptionist. Be professional, friendly, and concise.';
        
        agent.configure({
          audio: {
            input: {
              encoding: 'linear16',
              sample_rate: 16000 // Match our client's recording rate
            },
            output: {
              encoding: 'linear16',
              sample_rate: 24000,
              container: 'none'
            }
          },
          agent: {
            listen: {
              provider: {
                type: 'deepgram',
                model: 'nova-3'
              }
            },
            think: {
              provider: {
                type: 'open_ai',
                model: 'gpt-4o-mini'
              },
              prompt: systemPrompt + `
              
              ${config.businessInfo ? `
              BUSINESS CONTEXT:
              - You are the AI receptionist for ${config.businessInfo.name || 'this business'}
              - Personality: ${config.businessInfo.personality || 'Professional and helpful'}
              
              KNOWLEDGE BASE:
              ${JSON.stringify(config.businessInfo.knowledgeBase, null, 2) || 'General business knowledge'}
              ` : ''}
              
              Remember to:
              - Keep responses conversational and concise (1-2 sentences)
              - Be professional and represent the business well
              - If you don't know something, offer to connect them with someone who can help`
            },
            speak: {
              provider: {
                type: 'deepgram',
                model: config.voiceId || 'aura-2-thalia-en'
              }
            },
            greeting: config.businessInfo?.name ? 
              `Hello! Thank you for calling ${config.businessInfo.name}. How can I help you today?` :
              "Hello! How can I help you today?"
          }
        });
      });

      agent.on('SettingsApplied', (data) => {
        console.log('Server confirmed settings:', data);
      });

      agent.on(AgentEvents.ConversationText, (message: { role: string; content: string }) => {
        console.log(`💬 ${message.role}:`, message.content);
        socket.emit('transcript', {
          role: message.role,
          content: message.content
        });
      });

      agent.on(AgentEvents.Audio, (audio: Buffer) => {
        // Convert audio buffer to base64 for Socket.IO transmission
        const audioBase64 = audio.toString('base64');
        socket.emit('audioResponse', audioBase64);
      });

      agent.on(AgentEvents.Error, (error: Error) => {
        console.error('❌ Agent error:', error);
        socket.emit('error', { message: error.message });
      });

      agent.on(AgentEvents.Close, () => {
        console.log('Agent connection closed');
        activeSessions.delete(socket.id);
      });

    } catch (error) {
      console.error('❌ Failed to start voice session:', error);
      socket.emit('error', { message: 'Failed to start voice session' });
    }
  });

  socket.on('audio_input', (audioBase64: string) => {
    const agent = activeSessions.get(socket.id);
    if (agent) {
      try {
        // Convert base64 to buffer and send to agent
        const audioBuffer = Buffer.from(audioBase64, 'base64');
        agent.send(audioBuffer);
      } catch (error) {
        console.error('Error sending audio to agent:', error);
      }
    }
  });

  socket.on('disconnect', async () => {
    console.log('👋 Client disconnected:', socket.id);
    
    const agent = activeSessions.get(socket.id);
    if (agent) {
      try {
        await agent.disconnect();
      } catch (error) {
        console.error('Error disconnecting agent:', error);
      }
      activeSessions.delete(socket.id);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Deepgram Voice Agent Server running on port ${PORT}`);
  console.log(`🎯 WebSocket endpoint available`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📥 SIGTERM received, shutting down gracefully');
  
  // Disconnect all active agents
  for (const [id, agent] of activeSessions) {
    try {
      await agent.disconnect();
    } catch (error) {
      console.error(`Error disconnecting agent ${id}:`, error);
    }
  }
  activeSessions.clear();
  
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});