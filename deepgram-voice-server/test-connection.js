// Test Deepgram connection
const { createClient } = require('@deepgram/sdk');
require('dotenv').config();

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

console.log('Testing Deepgram connection...');
console.log('API Key:', DEEPGRAM_API_KEY ? `${DEEPGRAM_API_KEY.substring(0, 10)}...` : 'NOT FOUND');

if (!DEEPGRAM_API_KEY) {
  console.error('❌ DEEPGRAM_API_KEY not found in environment');
  process.exit(1);
}

async function testConnection() {
  try {
    const deepgram = createClient(DEEPGRAM_API_KEY);
    console.log('✅ Deepgram client created');
    
    // Test the agent connection
    console.log('Creating agent connection...');
    const agent = deepgram.agent();
    
    console.log('✅ Agent created successfully');
    console.log('Agent type:', typeof agent);
    console.log('Agent methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(agent)));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

testConnection();