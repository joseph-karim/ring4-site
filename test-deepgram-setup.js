// Quick test of Deepgram setup
require('dotenv').config({ path: './deepgram-voice-server/.env' });

console.log('Testing Deepgram configuration...');
console.log('API Key present:', !!process.env.DEEPGRAM_API_KEY);

const { createClient } = require('@deepgram/sdk');

try {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
  console.log('✅ Deepgram client created successfully');
  
  // Test creating an agent
  const agent = deepgram.agent();
  console.log('✅ Agent object created');
  console.log('Agent methods:', Object.keys(agent));
} catch (error) {
  console.error('❌ Error:', error.message);
}