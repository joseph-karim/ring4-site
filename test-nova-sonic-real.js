// Test Nova Sonic with real server connection to analyze actual audio data
import { io } from 'socket.io-client';
import fs from 'fs';

const NOVA_SONIC_URL = 'https://ring4-site-2.onrender.com';

console.log('🔬 Nova Sonic Audio Analysis Test');
console.log('================================\n');

const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

let audioChunks = [];
let sessionStartTime = null;

socket.on('connect', () => {
  console.log('✅ Connected to Nova Sonic server');
  sessionStartTime = Date.now();
  
  // Start session
  socket.emit('start_session', {
    systemPrompt: 'You are a test assistant. Please say exactly: "Testing one two three"',
    businessInfo: {
      name: 'Audio Test',
      personality: 'Clear speaker'
    }
  });
});

socket.on('session_ready', () => {
  console.log('🎤 Session ready - sending test audio\n');
  
  // Send minimal audio to trigger response
  const silentAudio = Buffer.alloc(3200).toString('base64'); // 100ms of silence at 16kHz
  
  setTimeout(() => {
    socket.emit('audio_input', silentAudio);
  }, 100);
  
  setTimeout(() => {
    socket.emit('audio_input', silentAudio);
  }, 200);
});

socket.on('audioResponse', (audioBase64) => {
  const chunkNum = audioChunks.length + 1;
  const timestamp = Date.now() - sessionStartTime;
  
  console.log(`\n📦 Audio Chunk #${chunkNum} (at ${timestamp}ms)`);
  console.log('='.repeat(50));
  
  // Decode base64
  const binaryBuffer = Buffer.from(audioBase64, 'base64');
  console.log(`Base64 length: ${audioBase64.length}`);
  console.log(`Binary length: ${binaryBuffer.length} bytes`);
  console.log(`Samples (if 16-bit): ${binaryBuffer.length / 2}`);
  
  // Analyze first 40 bytes
  console.log('\nFirst 40 bytes (hex):');
  console.log(binaryBuffer.slice(0, 40).toString('hex').match(/.{2}/g).join(' '));
  
  console.log('\nFirst 40 bytes (decimal):');
  console.log(Array.from(binaryBuffer.slice(0, 40)));
  
  // Check for patterns
  let zeros = 0;
  let nonZeros = 0;
  for (let i = 0; i < binaryBuffer.length; i++) {
    if (binaryBuffer[i] === 0) zeros++;
    else nonZeros++;
  }
  
  console.log(`\nByte distribution:`);
  console.log(`  Zeros: ${zeros} (${(zeros/binaryBuffer.length*100).toFixed(1)}%)`);
  console.log(`  Non-zeros: ${nonZeros} (${(nonZeros/binaryBuffer.length*100).toFixed(1)}%)`);
  
  // Try different interpretations
  console.log('\n🔍 Audio Interpretations:');
  
  // 1. As 16-bit LE PCM
  const int16Array = new Int16Array(binaryBuffer.buffer, binaryBuffer.byteOffset, binaryBuffer.length / 2);
  const first10_16LE = Array.from(int16Array.slice(0, 10));
  console.log('As 16-bit LE PCM:', first10_16LE);
  
  // 2. Check amplitude
  let maxAmp = 0;
  let totalAmp = 0;
  for (let i = 0; i < int16Array.length; i++) {
    const amp = Math.abs(int16Array[i]);
    maxAmp = Math.max(maxAmp, amp);
    totalAmp += amp;
  }
  const avgAmp = totalAmp / int16Array.length;
  
  console.log(`\nAmplitude analysis (16-bit LE):`);
  console.log(`  Max: ${maxAmp} (${(maxAmp/32768*100).toFixed(1)}% of range)`);
  console.log(`  Average: ${avgAmp.toFixed(0)} (${(avgAmp/32768*100).toFixed(1)}% of range)`);
  
  // 3. Duration at different sample rates
  const samples = binaryBuffer.length / 2;
  console.log(`\nDuration at different rates:`);
  console.log(`  At 8kHz: ${(samples/8000*1000).toFixed(1)}ms`);
  console.log(`  At 16kHz: ${(samples/16000*1000).toFixed(1)}ms`);
  console.log(`  At 24kHz: ${(samples/24000*1000).toFixed(1)}ms`);
  console.log(`  At 48kHz: ${(samples/48000*1000).toFixed(1)}ms`);
  
  // Store chunk info
  audioChunks.push({
    num: chunkNum,
    timestamp,
    base64Length: audioBase64.length,
    binaryLength: binaryBuffer.length,
    samples,
    maxAmplitude: maxAmp,
    avgAmplitude: avgAmp,
    zeroPercent: (zeros/binaryBuffer.length*100).toFixed(1)
  });
  
  // Save first chunk for detailed analysis
  if (chunkNum === 1) {
    fs.writeFileSync('nova-chunk-1.bin', binaryBuffer);
    fs.writeFileSync('nova-chunk-1.base64', audioBase64);
    console.log('\n💾 Saved first chunk to nova-chunk-1.bin and nova-chunk-1.base64');
  }
});

socket.on('transcript', (data) => {
  console.log(`\n💬 [${data.role}] ${data.content}`);
});

socket.on('error', (error) => {
  console.error('\n❌ Error:', error);
});

// Disconnect after 10 seconds
setTimeout(() => {
  console.log('\n\n📊 FINAL ANALYSIS');
  console.log('='.repeat(50));
  
  if (audioChunks.length > 0) {
    console.log(`Total chunks received: ${audioChunks.length}`);
    console.log('\nChunk summary:');
    audioChunks.forEach(chunk => {
      console.log(`  Chunk ${chunk.num}: ${chunk.samples} samples, max amp: ${chunk.maxAmplitude}, zeros: ${chunk.zeroPercent}%`);
    });
    
    // Pattern analysis
    const sampleCounts = audioChunks.map(c => c.samples);
    console.log(`\nSample count pattern: [${sampleCounts.join(', ')}]`);
    
    // If we see 960, 8640 pattern
    if (sampleCounts.includes(960) || sampleCounts.includes(8640)) {
      console.log('\n⚠️  DETECTED NOVA SONIC PATTERN!');
      console.log('960 samples = 60ms@16kHz or 40ms@24kHz or 20ms@48kHz');
      console.log('8640 samples = 540ms@16kHz or 360ms@24kHz or 180ms@48kHz');
      console.log('\nThis suggests Nova Sonic chunks are designed for specific timing.');
    }
  }
  
  socket.disconnect();
  process.exit(0);
}, 10000);