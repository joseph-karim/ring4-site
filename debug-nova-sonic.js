// Debug Nova Sonic Connection
import { io } from 'socket.io-client';

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔍 Debugging Nova Sonic Connection...');

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

socket.on('connect', () => {
  console.log('✅ Connected:', socket.id);
  
  // Try minimal session start
  socket.emit('start_session', {
    systemPrompt: 'Hello',
    businessInfo: { name: 'Test' }
  });
});

socket.on('session_ready', () => {
  console.log('✅ Session ready - bidirectional stream established!');
  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 1000);
});

socket.on('error', (error) => {
  console.error('❌ Error:', JSON.stringify(error, null, 2));
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

setTimeout(() => {
  console.error('❌ Timeout');
  process.exit(1);
}, 10000);