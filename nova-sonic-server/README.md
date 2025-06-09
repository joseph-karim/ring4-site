# Nova Sonic Voice Server for Ring4

This is the real voice AI server that powers the Ring4 AI Receptionist using Amazon Nova Sonic.

## 🚀 Features

- **Real Voice AI**: Uses Amazon Nova Sonic for natural speech-to-speech conversations
- **WebSocket Integration**: Real-time bidirectional communication
- **Business Context**: AI knows about your business and can answer questions intelligently
- **Professional Voice**: High-quality voice synthesis
- **Session Management**: Proper connection lifecycle management

## 📋 Prerequisites

1. **AWS Account** with access to Amazon Bedrock Nova Sonic
2. **Node.js** (version 18 or higher)
3. **AWS Credentials** configured

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   cd nova-sonic-server
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your AWS credentials:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   PORT=3001
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

   The server will start on port 3001 and show:
   ```
   🚀 Nova Sonic server running on port 3001
   🎯 WebSocket endpoint: ws://localhost:3001
   📊 Health check: http://localhost:3001/health
   ✅ AWS credentials configured
   ```

## 🧪 Testing

1. **Health Check**
   Visit: http://localhost:3001/health
   
   Should return:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "novaSonicReady": true
   }
   ```

2. **Integration Test**
   Run the Ring4 site and go to the AI Receptionist demo. The voice features should work with real Amazon Nova Sonic.

## 🏗️ Architecture

```
Ring4 Frontend (React)
    ↓ WebSocket
Nova Sonic Server (Node.js)
    ↓ HTTP/2 Streaming
Amazon Bedrock Nova Sonic
```

## 🔍 How It Works

1. **Session Initialization**: Client connects via WebSocket
2. **Business Context**: AI is configured with your business information
3. **Voice Processing**: 
   - User speaks → microphone audio → server
   - Server → Nova Sonic → AI response (text + audio)
   - Server → client → audio playback + transcript

## 🐛 Troubleshooting

### "AWS credentials not configured"
- Check your `.env` file has the correct AWS credentials
- Verify the credentials have access to Amazon Bedrock

### "Voice model error"
- Ensure your AWS account has access to Nova Sonic
- Check the AWS region is supported (us-east-1 recommended)

### "No active voice session"
- The WebSocket connection may have dropped
- Refresh the page and try again

### Audio not working
- Check browser microphone permissions
- Ensure you're using a modern browser (Chrome, Firefox, Safari)
- Test with headphones to avoid feedback

## 🔐 Security Notes

- Never commit AWS credentials to version control
- Use IAM roles in production
- Consider using AWS Secrets Manager for credential management
- Enable CORS only for trusted domains in production

## 📝 Logs

The server provides detailed logging:
- `🎯` New connections
- `🚀` Session starts
- `💬` Text transcripts
- `🔊` Audio processing
- `❌` Errors

## 🚀 Production Deployment

For production:

1. Use environment variables or AWS IAM roles for credentials
2. Configure proper CORS origins
3. Add rate limiting and authentication
4. Use a process manager like PM2
5. Set up monitoring and logging
6. Consider using a load balancer for multiple instances

## 📄 License

MIT License - Ring4 AI Receptionist