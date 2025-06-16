// Quick test to check Deepgram server
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3003,
  path: '/health',
  method: 'GET'
};

console.log('Testing Deepgram server at http://localhost:3003/health...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    console.log('Response:', chunk.toString());
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  console.log('\nMake sure the Deepgram server is running:');
  console.log('npm run deepgram');
});

req.end();