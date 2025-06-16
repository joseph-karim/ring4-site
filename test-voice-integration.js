// Test voice integration with Socket.IO
const io = require('socket.io-client');

const socket = io('http://localhost:3003');

console.log('Connecting to Deepgram server...');

socket.on('connect', () => {
  console.log('✅ Connected to server');
  
  // Start a session
  console.log('Starting voice session...');
  socket.emit('start_session', {
    systemPrompt: 'You are a helpful AI receptionist for Ring4. Be professional and friendly.',
    businessInfo: {
      name: 'Ring4 Test Company',
      personality: 'Professional and helpful'
    }
  });
});

socket.on('session_ready', () => {
  console.log('✅ Session ready!');
  console.log('Voice agent is now active and ready to receive audio');
  
  // Simulate sending some audio (in real use, this would be actual audio data)
  console.log('Sending test audio...');
  
  // Create a simple test audio buffer (silence)
  const testAudio = Buffer.alloc(1600, 0); // 100ms of silence at 16kHz
  socket.emit('audio_input', testAudio.toString('base64'));
});

socket.on('transcript', (data) => {
  console.log(`📝 ${data.role}: ${data.content}`);
});

socket.on('audioResponse', (audioBase64) => {
  console.log(`🔊 Received audio response: ${audioBase64.length} characters`);
});

socket.on('error', (error) => {
  console.error('❌ Error:', error);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Keep the script running
setTimeout(() => {
  console.log('Test complete');
  socket.disconnect();
  process.exit(0);
}, 10000);