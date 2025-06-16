# Running Ring4 with Deepgram Voice Agent

## Quick Start

1. **Install Deepgram dependencies** (first time only):
   ```bash
   cd deepgram-voice-server
   npm install
   cd ..
   ```

2. **Start the Deepgram Voice Server** (in one terminal):
   ```bash
   cd deepgram-voice-server
   npm start
   ```
   
   You should see:
   ```
   🚀 Deepgram Voice Agent Server running on port 3003
   🎯 WebSocket endpoint available
   📊 Health check: http://localhost:3003/health
   ```

3. **Start the Vite Dev Server** (in another terminal):
   ```bash
   npm run dev
   ```

   Or use the convenience script to run both:
   ```bash
   npm run dev:deepgram
   ```

## Testing Voice Features

1. Navigate to http://localhost:5173
2. Click "Get AI Receptionist" 
3. Enter a website URL
4. When you get to the test call step, it will use Deepgram instead of Nova Sonic

## Key Differences from Nova Sonic

- **Better Audio Quality**: Deepgram handles audio encoding/decoding properly
- **Simpler Implementation**: No complex audio buffer management
- **Real-time Transcription**: Shows interim results while speaking
- **Multiple Voices**: Can choose from different Deepgram voices

## Troubleshooting

If the server won't start:
1. Check that port 3003 is not in use: `lsof -i :3003`
2. Verify the API key is loaded: Check the console output
3. Try running directly: `cd deepgram-voice-server && node server.js`

## Architecture

```
Browser <--WebSocket--> Deepgram Server <--API--> Deepgram Cloud
   |                         |                         |
   |- Audio Stream --------->|- Speech Recognition -->|
   |<- Audio Response -------|<- Text-to-Speech ------|
```

The Deepgram server acts as a bridge between the browser and Deepgram's cloud API, handling:
- WebSocket connections from the browser
- Audio streaming in both directions
- Real-time transcription
- Text-to-speech generation