// Complete Nova Sonic test with real audio input
import { io } from 'socket.io-client';
import fs from 'fs';

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔬 Nova Sonic Complete Audio Test');
console.log('=================================\n');

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

let audioChunks = [];

socket.on('connect', () => {
  console.log('✅ Connected to Nova Sonic server');
  
  socket.emit('start_session', {
    systemPrompt: 'You are a helpful assistant. When someone says hello, respond with: "Hello, testing audio quality"',
    businessInfo: {
      name: 'Test Company',
      personality: 'Professional'
    }
  });
});

socket.on('session_ready', () => {
  console.log('🎤 Session ready - sending "hello" audio\n');
  
  // Generate a simple "hello" sound pattern
  // This simulates someone saying "hello" - not perfect but should trigger a response
  const sampleRate = 16000;
  const duration = 1; // 1 second
  const samples = sampleRate * duration;
  
  // Create audio with some variation (not just silence)
  const audioBuffer = Buffer.alloc(samples * 2); // 2 bytes per sample
  
  // Add some audio signal patterns
  for (let i = 0; i < samples; i++) {
    // Create a pattern that varies over time
    let value = 0;
    
    // Add some "speech-like" patterns
    if (i > samples * 0.2 && i < samples * 0.4) {
      // First syllable "hel"
      value = Math.sin(2 * Math.PI * 200 * i / sampleRate) * 5000;
      value += Math.sin(2 * Math.PI * 400 * i / sampleRate) * 3000;
    } else if (i > samples * 0.5 && i < samples * 0.7) {
      // Second syllable "lo"
      value = Math.sin(2 * Math.PI * 150 * i / sampleRate) * 4000;
      value += Math.sin(2 * Math.PI * 300 * i / sampleRate) * 2000;
    }
    
    // Add some noise
    value += (Math.random() - 0.5) * 1000;
    
    // Clamp to 16-bit range
    value = Math.max(-32768, Math.min(32767, Math.round(value)));
    
    // Write as little-endian 16-bit
    audioBuffer.writeInt16LE(value, i * 2);
  }
  
  const audioBase64 = audioBuffer.toString('base64');
  console.log(`Sending audio: ${audioBuffer.length} bytes, ${samples} samples`);
  
  // Send in chunks like a real recording would
  const chunkSize = 3200; // 100ms chunks at 16kHz
  let offset = 0;
  
  const sendChunk = () => {
    if (offset < audioBuffer.length) {
      const chunk = audioBuffer.slice(offset, offset + chunkSize);
      socket.emit('audio_input', chunk.toString('base64'));
      offset += chunkSize;
      setTimeout(sendChunk, 100);
    }
  };
  
  sendChunk();
});

socket.on('audioResponse', (audioBase64) => {
  const chunkNum = audioChunks.length + 1;
  
  console.log(`\n📦 Audio Response Chunk #${chunkNum}`);
  console.log('='.repeat(50));
  
  // Detailed analysis
  const binaryBuffer = Buffer.from(audioBase64, 'base64');
  const samples = binaryBuffer.length / 2;
  
  console.log(`Base64 length: ${audioBase64.length}`);
  console.log(`Binary length: ${binaryBuffer.length} bytes`);
  console.log(`Samples: ${samples}`);
  
  // Save for analysis
  fs.writeFileSync(`nova-response-${chunkNum}.bin`, binaryBuffer);
  fs.writeFileSync(`nova-response-${chunkNum}.base64`, audioBase64);
  
  // Analyze audio properties
  const int16Array = new Int16Array(binaryBuffer.buffer, binaryBuffer.byteOffset, binaryBuffer.length / 2);
  
  let maxValue = 0;
  let minValue = 0;
  let sumAbs = 0;
  
  for (let i = 0; i < int16Array.length; i++) {
    const sample = int16Array[i];
    maxValue = Math.max(maxValue, sample);
    minValue = Math.min(minValue, sample);
    sumAbs += Math.abs(sample);
  }
  
  console.log(`\nAudio properties:`);
  console.log(`  Max value: ${maxValue}`);
  console.log(`  Min value: ${minValue}`);
  console.log(`  Avg magnitude: ${Math.round(sumAbs / int16Array.length)}`);
  console.log(`  Dynamic range: ${maxValue - minValue}`);
  
  // First 20 samples
  console.log(`\nFirst 20 samples:`);
  console.log(Array.from(int16Array.slice(0, 20)));
  
  audioChunks.push({
    num: chunkNum,
    samples,
    maxValue,
    minValue,
    avgMagnitude: sumAbs / int16Array.length
  });
  
  // Create a test HTML file to play the audio
  if (chunkNum === 1) {
    const html = `<!DOCTYPE html>
<html>
<head><title>Nova Audio Test</title></head>
<body>
<h1>Nova Audio Playback Test</h1>
<button onclick="play16()">Play at 16kHz</button>
<button onclick="play24()">Play at 24kHz</button>
<button onclick="play48()">Play at 48kHz</button>
<pre id="info"></pre>
<script>
const audioBase64 = '${audioBase64}';
const binaryString = atob(audioBase64);
const samples = binaryString.length / 2;

document.getElementById('info').textContent = 'Samples: ' + samples + '\\nDuration at 16kHz: ' + (samples/16000) + 's\\nDuration at 24kHz: ' + (samples/24000) + 's';

function playAt(rate) {
  const ctx = new AudioContext();
  const buffer = ctx.createBuffer(1, samples, rate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < samples; i++) {
    const low = binaryString.charCodeAt(i * 2);
    const high = binaryString.charCodeAt(i * 2 + 1);
    const sample = low | (high << 8);
    const signed = sample < 32768 ? sample : sample - 65536;
    data[i] = signed / 32768;
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}

function play16() { playAt(16000); }
function play24() { playAt(24000); }
function play48() { playAt(48000); }
</script>
</body>
</html>`;
    
    fs.writeFileSync('nova-audio-test.html', html);
    console.log('\n💾 Created nova-audio-test.html - open this to test playback at different rates');
  }
});

socket.on('transcript', (data) => {
  console.log(`\n💬 [${data.role}] ${data.content}`);
});

socket.on('error', (error) => {
  console.error('\n❌ Error:', error);
});

// Timeout and analyze
setTimeout(() => {
  console.log('\n\n📊 FINAL ANALYSIS');
  console.log('='.repeat(50));
  
  if (audioChunks.length > 0) {
    console.log(`Total audio chunks: ${audioChunks.length}`);
    
    const sampleCounts = audioChunks.map(c => c.samples);
    console.log(`Sample patterns: [${sampleCounts.join(', ')}]`);
    
    console.log('\nIf audio sounds high-pitched:');
    console.log('- Nova is sending 16kHz but we play at 24kHz (1.5x speed)');
    console.log('- Nova is sending 16kHz but browser plays at 48kHz (3x speed)');
    console.log('- Nova is sending 24kHz but browser plays at 48kHz (2x speed)');
    
    console.log('\nOpen nova-audio-test.html to test playback at different rates!');
  } else {
    console.log('No audio chunks received!');
  }
  
  socket.disconnect();
  process.exit(0);
}, 8000);