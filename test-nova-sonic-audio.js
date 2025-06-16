// Test Nova Sonic audio streaming to diagnose distortion
import { io } from 'socket.io-client';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔌 Testing Nova Sonic Audio Processing...');

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

let audioChunks = [];
let chunkCount = 0;

socket.on('connect', () => {
  console.log('✅ Connected to Nova Sonic server');
  
  // Start a voice session
  socket.emit('start_session', {
    systemPrompt: 'You are a helpful AI. Please say: "Testing audio quality, one two three four five"',
    businessInfo: {
      name: 'Test Company',
      personality: 'Professional'
    }
  });
});

socket.on('session_ready', () => {
  console.log('🎤 Session ready - sending silence to trigger response');
  
  // Send a short burst of silence to trigger a response
  const sampleRate = 16000;
  const duration = 0.5; // 500ms
  const numSamples = Math.floor(sampleRate * duration);
  const silentBuffer = Buffer.alloc(numSamples * 2); // 2 bytes per sample
  
  const audioBase64 = silentBuffer.toString('base64');
  
  // Send a few chunks
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      socket.emit('audio_input', audioBase64);
    }, i * 100);
  }
});

socket.on('audioResponse', (audioBase64) => {
  chunkCount++;
  console.log(`\n🔊 Received audio chunk #${chunkCount}`);
  console.log(`   Base64 length: ${audioBase64.length}`);
  
  // Decode and analyze the audio
  const binaryString = Buffer.from(audioBase64, 'base64');
  console.log(`   Binary length: ${binaryString.length} bytes`);
  console.log(`   Samples: ${binaryString.length / 2}`);
  
  // Look at the first few bytes
  const firstBytes = Array.from(binaryString.slice(0, 20));
  console.log(`   First 20 bytes: ${firstBytes}`);
  
  // Convert to Int16Array and check values
  const int16Array = new Int16Array(
    binaryString.buffer,
    binaryString.byteOffset,
    binaryString.length / 2
  );
  
  // Calculate audio statistics
  let min = 32767;
  let max = -32768;
  let sum = 0;
  let nonZero = 0;
  
  for (let i = 0; i < int16Array.length; i++) {
    const sample = int16Array[i];
    min = Math.min(min, sample);
    max = Math.max(max, sample);
    sum += Math.abs(sample);
    if (sample !== 0) nonZero++;
  }
  
  const avg = sum / int16Array.length;
  const nonZeroPercent = (nonZero / int16Array.length) * 100;
  
  console.log(`   Min sample: ${min}`);
  console.log(`   Max sample: ${max}`);
  console.log(`   Avg magnitude: ${Math.round(avg)}`);
  console.log(`   Non-zero: ${nonZeroPercent.toFixed(1)}%`);
  
  // Store the chunk
  audioChunks.push({
    base64: audioBase64,
    stats: { min, max, avg, nonZeroPercent, samples: int16Array.length }
  });
  
  // If this looks like the end of audio (lots of silence), disconnect
  if (nonZeroPercent < 10 && chunkCount > 3) {
    console.log('\n📊 Audio stream appears complete');
    analyzeAllChunks();
    socket.disconnect();
  }
});

socket.on('transcript', (data) => {
  console.log(`\n💬 Transcript: [${data.role}] ${data.content}`);
});

socket.on('error', (error) => {
  console.error('❌ Error:', error);
});

socket.on('disconnect', () => {
  console.log('\n🔌 Disconnected');
  if (audioChunks.length > 0) {
    analyzeAllChunks();
  }
  process.exit(0);
});

function analyzeAllChunks() {
  console.log('\n=== AUDIO ANALYSIS ===');
  console.log(`Total chunks: ${audioChunks.length}`);
  
  // Combine all audio
  let totalSamples = 0;
  audioChunks.forEach(chunk => {
    totalSamples += chunk.stats.samples;
  });
  
  console.log(`Total samples: ${totalSamples}`);
  console.log(`Duration at 24kHz: ${(totalSamples / 24000).toFixed(2)}s`);
  console.log(`Duration at 16kHz: ${(totalSamples / 16000).toFixed(2)}s`);
  
  // Save first chunk for analysis
  if (audioChunks.length > 0) {
    const firstChunk = audioChunks[0];
    writeFile('nova-audio-chunk.txt', firstChunk.base64)
      .then(() => console.log('\n✅ Saved first audio chunk to nova-audio-chunk.txt'))
      .catch(err => console.error('Error saving audio chunk:', err));
  }
}

// Timeout
setTimeout(() => {
  console.error('\n❌ Test timed out');
  process.exit(1);
}, 15000);