// Test Nova Sonic WebSocket connection
import { io } from 'socket.io-client';

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔌 Connecting to Nova Sonic server:', NOVA_SONIC_URL);

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

socket.on('connect', () => {
  console.log('✅ Connected to Nova Sonic server!');
  console.log('📡 Socket ID:', socket.id);
  
  // Test starting a session
  console.log('🚀 Starting voice session...');
  socket.emit('start_session', {
    systemPrompt: 'You are a helpful AI receptionist.',
    businessInfo: {
      name: 'Ring4 AI',
      personality: 'Professional and friendly'
    }
  });
});

socket.on('session_ready', () => {
  console.log('🎤 Voice session ready!');
  console.log('✅ Nova Sonic WebSocket connection test PASSED');
  
  // Disconnect after successful test
  setTimeout(() => {
    console.log('👋 Disconnecting...');
    socket.disconnect();
    process.exit(0);
  }, 1000);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
  process.exit(1);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  console.error('   Type:', error.type);
  console.error('   Context:', error.context);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Disconnected:', reason);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.error('❌ Test timed out after 10 seconds');
  process.exit(1);
}, 10000);