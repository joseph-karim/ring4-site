// Test Nova Sonic Bidirectional Streaming
import { io } from 'socket.io-client';
import fs from 'fs';

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔌 Testing Nova Sonic Bidirectional Streaming...');
console.log('📡 Server URL:', NOVA_SONIC_URL);

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

// Track session state
let sessionReady = false;
let audioResponseCount = 0;
let transcriptCount = 0;

socket.on('connect', () => {
  console.log('\n✅ Connected to Nova Sonic server!');
  console.log('📡 Socket ID:', socket.id);
  
  // Start a voice session
  console.log('\n🚀 Starting voice session...');
  socket.emit('start_session', {
    systemPrompt: 'You are a helpful AI receptionist for Ring4. Be professional, friendly, and concise.',
    businessInfo: {
      name: 'Ring4 AI Solutions',
      personality: 'Professional and friendly',
      knowledgeBase: {
        services: ['AI Receptionist', 'Voice Agents', 'Customer Support Automation'],
        hours: 'Monday-Friday 9am-5pm EST',
        contact: 'support@ring4.com'
      }
    }
  });
});

socket.on('session_ready', () => {
  console.log('\n🎤 Voice session ready!');
  sessionReady = true;
  
  // Simulate sending audio (send silent audio for testing)
  console.log('\n📤 Sending test audio input...');
  
  // Create a small buffer of silent audio (16-bit PCM, 16kHz)
  const sampleRate = 16000;
  const duration = 0.1; // 100ms
  const numSamples = Math.floor(sampleRate * duration);
  const audioBuffer = Buffer.alloc(numSamples * 2); // 2 bytes per sample
  
  // Convert to base64
  const audioBase64 = audioBuffer.toString('base64');
  
  // Send multiple chunks to simulate continuous audio
  let chunksSent = 0;
  const sendInterval = setInterval(() => {
    if (chunksSent < 5) {
      socket.emit('audio_input', audioBase64);
      chunksSent++;
      console.log(`   📊 Sent audio chunk ${chunksSent}/5`);
    } else {
      clearInterval(sendInterval);
      console.log('\n✅ Finished sending test audio');
      
      // Wait a bit then disconnect
      setTimeout(() => {
        console.log('\n📊 Test Results:');
        console.log(`   - Session established: ${sessionReady ? '✅' : '❌'}`);
        console.log(`   - Audio chunks sent: ${chunksSent}`);
        console.log(`   - Audio responses received: ${audioResponseCount}`);
        console.log(`   - Transcripts received: ${transcriptCount}`);
        console.log(`   - Bidirectional streaming: ${sessionReady && chunksSent > 0 ? '✅ WORKING' : '❌ NOT WORKING'}`);
        
        console.log('\n👋 Disconnecting...');
        socket.disconnect();
        process.exit(0);
      }, 2000);
    }
  }, 200);
});

socket.on('audioResponse', (audioBase64) => {
  audioResponseCount++;
  console.log(`\n🔊 Received audio response #${audioResponseCount}`);
  console.log(`   Size: ${Math.round(audioBase64.length / 1024)}KB`);
});

socket.on('transcript', (data) => {
  transcriptCount++;
  console.log(`\n💬 Transcript #${transcriptCount}:`);
  console.log(`   Role: ${data.role}`);
  console.log(`   Content: ${data.content}`);
});

socket.on('error', (error) => {
  console.error('\n❌ Socket error:', error);
});

socket.on('connect_error', (error) => {
  console.error('\n❌ Connection error:', error.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('\n🔌 Disconnected:', reason);
});

// Timeout after 15 seconds
setTimeout(() => {
  console.error('\n❌ Test timed out after 15 seconds');
  process.exit(1);
}, 15000);