// Comprehensive Nova Sonic Audio Format Analyzer
// This will help us determine the actual audio format and find the root cause

const { io } = require('socket.io-client');
const fs = require('fs');
const path = require('path');

const NOVA_SONIC_URL = process.env.NOVA_SONIC_URL || 'http://localhost:3002';

console.log('🔬 Nova Sonic Audio Format Analyzer');
console.log('===================================');
console.log(`Connecting to: ${NOVA_SONIC_URL}\n`);

class AudioAnalyzer {
  constructor() {
    this.chunks = [];
    this.allAudioData = Buffer.alloc(0);
  }

  analyzeChunk(audioBase64, chunkNum) {
    console.log(`\n📦 Analyzing Chunk #${chunkNum}`);
    console.log('='.repeat(60));
    
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    this.allAudioData = Buffer.concat([this.allAudioData, audioBuffer]);
    
    // Basic info
    console.log(`Base64 length: ${audioBase64.length}`);
    console.log(`Binary length: ${audioBuffer.length} bytes`);
    console.log(`Samples (if 16-bit): ${audioBuffer.length / 2}`);
    
    // Check for WAV header
    if (audioBuffer.length >= 44) {
      const possibleRiff = audioBuffer.slice(0, 4).toString('ascii');
      if (possibleRiff === 'RIFF') {
        console.log('\n⚠️  DETECTED WAV HEADER!');
        this.parseWavHeader(audioBuffer);
        return;
      }
    }
    
    // Analyze as raw PCM with different interpretations
    this.analyzePCMFormats(audioBuffer);
    
    // Pattern detection
    this.detectPatterns(audioBuffer);
    
    // Save chunk for external analysis
    fs.writeFileSync(`nova-chunk-${chunkNum}.raw`, audioBuffer);
    
    this.chunks.push({
      num: chunkNum,
      length: audioBuffer.length,
      samples16bit: audioBuffer.length / 2
    });
  }
  
  parseWavHeader(buffer) {
    if (buffer.length < 44) return;
    
    console.log('\nWAV Header Analysis:');
    console.log(`  RIFF: ${buffer.slice(0, 4).toString('ascii')}`);
    console.log(`  File size: ${buffer.readUInt32LE(4) + 8}`);
    console.log(`  WAVE: ${buffer.slice(8, 12).toString('ascii')}`);
    console.log(`  fmt : ${buffer.slice(12, 16).toString('ascii')}`);
    console.log(`  Audio format: ${buffer.readUInt16LE(20)} (1=PCM)`);
    console.log(`  Channels: ${buffer.readUInt16LE(22)}`);
    console.log(`  Sample rate: ${buffer.readUInt32LE(24)} Hz`);
    console.log(`  Byte rate: ${buffer.readUInt32LE(28)}`);
    console.log(`  Block align: ${buffer.readUInt16LE(32)}`);
    console.log(`  Bits per sample: ${buffer.readUInt16LE(34)}`);
  }
  
  analyzePCMFormats(buffer) {
    console.log('\n🔍 PCM Format Analysis:');
    
    // Test different endianness
    const formats = [
      { name: '16-bit LE (standard)', read: (buf, i) => buf.readInt16LE(i) },
      { name: '16-bit BE', read: (buf, i) => buf.readInt16BE(i) },
      { name: '16-bit unsigned LE', read: (buf, i) => buf.readUInt16LE(i) - 32768 },
      { name: '16-bit unsigned BE', read: (buf, i) => buf.readUInt16BE(i) - 32768 }
    ];
    
    formats.forEach(format => {
      let max = 0, min = 0, sum = 0, zeros = 0;
      const sampleCount = Math.floor(buffer.length / 2);
      
      for (let i = 0; i < sampleCount * 2; i += 2) {
        try {
          const sample = format.read(buffer, i);
          max = Math.max(max, sample);
          min = Math.min(min, sample);
          sum += Math.abs(sample);
          if (sample === 0) zeros++;
        } catch (e) {
          // Buffer overrun
        }
      }
      
      const avg = sum / sampleCount;
      console.log(`\n${format.name}:`);
      console.log(`  Range: [${min}, ${max}]`);
      console.log(`  Avg magnitude: ${Math.round(avg)}`);
      console.log(`  Zero samples: ${zeros} (${(zeros/sampleCount*100).toFixed(1)}%)`);
      console.log(`  First 10 samples: ${this.getFirstSamples(buffer, format.read, 10)}`);
    });
  }
  
  getFirstSamples(buffer, readFunc, count) {
    const samples = [];
    for (let i = 0; i < Math.min(count * 2, buffer.length); i += 2) {
      try {
        samples.push(readFunc(buffer, i));
      } catch (e) {
        break;
      }
    }
    return samples;
  }
  
  detectPatterns(buffer) {
    console.log('\n🔎 Pattern Detection:');
    
    // Check for silence at start/end
    const startSilence = this.countSilence(buffer, 0, 1000);
    const endSilence = this.countSilence(buffer, buffer.length - 1000, buffer.length);
    
    console.log(`  Start silence: ${startSilence} samples`);
    console.log(`  End silence: ${endSilence} samples`);
    
    // Frequency analysis (simple zero-crossing)
    const zeroCrossings = this.countZeroCrossings(buffer);
    const estimatedFreq = (zeroCrossings / 2) / (buffer.length / 2 / 24000);
    console.log(`  Zero crossings: ${zeroCrossings}`);
    console.log(`  Estimated frequency (at 24kHz): ~${Math.round(estimatedFreq)} Hz`);
  }
  
  countSilence(buffer, start, end) {
    let silentSamples = 0;
    for (let i = start; i < end && i < buffer.length - 1; i += 2) {
      const sample = buffer.readInt16LE(i);
      if (Math.abs(sample) < 100) silentSamples++;
    }
    return silentSamples;
  }
  
  countZeroCrossings(buffer) {
    let crossings = 0;
    let lastSample = 0;
    
    for (let i = 0; i < buffer.length - 1; i += 2) {
      const sample = buffer.readInt16LE(i);
      if ((lastSample < 0 && sample > 0) || (lastSample > 0 && sample < 0)) {
        crossings++;
      }
      lastSample = sample;
    }
    return crossings;
  }
  
  generateTestHTML() {
    console.log('\n📊 Generating test HTML...');
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Nova Sonic Audio Format Test</title>
  <style>
    body { font-family: monospace; margin: 20px; }
    button { margin: 5px; padding: 10px; }
    .info { background: #f0f0f0; padding: 10px; margin: 10px 0; }
    .test-row { margin: 10px 0; }
  </style>
</head>
<body>
  <h1>Nova Sonic Audio Format Test</h1>
  
  <div class="info">
    <p>Total audio data: ${this.allAudioData.length} bytes</p>
    <p>Chunks received: ${this.chunks.length}</p>
    <p>Pattern: [${this.chunks.map(c => c.samples16bit).join(', ')}] samples</p>
  </div>
  
  <h2>Playback Tests</h2>
  <div class="test-row">
    <h3>Test 1: Raw PCM at different sample rates</h3>
    <button onclick="playPCM(8000, false)">8kHz LE</button>
    <button onclick="playPCM(16000, false)">16kHz LE</button>
    <button onclick="playPCM(24000, false)">24kHz LE</button>
    <button onclick="playPCM(48000, false)">48kHz LE</button>
  </div>
  
  <div class="test-row">
    <h3>Test 2: Big-Endian PCM</h3>
    <button onclick="playPCM(16000, true)">16kHz BE</button>
    <button onclick="playPCM(24000, true)">24kHz BE</button>
  </div>
  
  <div class="test-row">
    <h3>Test 3: Skip potential header</h3>
    <button onclick="playWithOffset(44, 24000)">Skip 44 bytes (WAV header)</button>
    <button onclick="playWithOffset(1920, 24000)">Skip 960 samples</button>
  </div>
  
  <pre id="log"></pre>
  
  <script>
    const audioData = '${this.allAudioData.toString('base64')}';
    const binaryData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
    
    function log(msg) {
      document.getElementById('log').textContent += msg + '\\n';
    }
    
    function playPCM(sampleRate, bigEndian) {
      const ctx = new AudioContext();
      const samples = binaryData.length / 2;
      const buffer = ctx.createBuffer(1, samples, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      log(\`Playing at \${sampleRate}Hz, \${bigEndian ? 'BE' : 'LE'}, duration: \${(samples/sampleRate).toFixed(2)}s\`);
      
      for (let i = 0; i < samples; i++) {
        let sample;
        if (bigEndian) {
          sample = (binaryData[i * 2] << 8) | binaryData[i * 2 + 1];
        } else {
          sample = binaryData[i * 2] | (binaryData[i * 2 + 1] << 8);
        }
        
        // Convert to signed
        if (sample > 32767) sample -= 65536;
        channelData[i] = sample / 32768;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
    
    function playWithOffset(offsetBytes, sampleRate) {
      const ctx = new AudioContext();
      const dataWithOffset = binaryData.slice(offsetBytes);
      const samples = dataWithOffset.length / 2;
      const buffer = ctx.createBuffer(1, samples, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      log(\`Playing with \${offsetBytes} byte offset at \${sampleRate}Hz\`);
      
      for (let i = 0; i < samples; i++) {
        const sample = dataWithOffset[i * 2] | (dataWithOffset[i * 2 + 1] << 8);
        const signed = sample > 32767 ? sample - 65536 : sample;
        channelData[i] = signed / 32768;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
  </script>
</body>
</html>`;
    
    fs.writeFileSync('nova-audio-format-test.html', html);
    console.log('Created nova-audio-format-test.html');
  }
}

// Run the test
const analyzer = new AudioAnalyzer();
const socket = io(NOVA_SONIC_URL, {
  transports: ['websocket'],
  upgrade: false
});

let chunkCount = 0;

socket.on('connect', () => {
  console.log('✅ Connected to Nova Sonic server');
  
  socket.emit('start_session', {
    systemPrompt: 'You are a test assistant. Say exactly: "Testing audio format. One two three four five."',
    businessInfo: { name: 'Format Test' }
  });
});

socket.on('session_ready', () => {
  console.log('🎤 Session ready - triggering response\n');
  
  // Send some audio to trigger a response
  const trigger = Buffer.alloc(1600, 0).toString('base64'); // 100ms silence
  setTimeout(() => socket.emit('audio_input', trigger), 100);
  setTimeout(() => socket.emit('audio_input', trigger), 200);
});

socket.on('audioResponse', (audioBase64) => {
  chunkCount++;
  analyzer.analyzeChunk(audioBase64, chunkCount);
});

socket.on('transcript', (data) => {
  console.log(`\n💬 [${data.role}] ${data.content}`);
});

socket.on('error', (error) => {
  console.error('\n❌ Socket error:', error);
});

socket.on('connect_error', (error) => {
  console.error('\n❌ Connection error:', error.message);
});

// Generate report after timeout
setTimeout(() => {
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 FINAL ANALYSIS REPORT');
  console.log('='.repeat(60));
  
  if (analyzer.chunks.length > 0) {
    analyzer.generateTestHTML();
    
    console.log('\n🎯 RECOMMENDED NEXT STEPS:');
    console.log('1. Open nova-audio-format-test.html in a browser');
    console.log('2. Try each playback option and note which sounds correct');
    console.log('3. The correct option will have:');
    console.log('   - Clear speech (not high-pitched or low-pitched)');
    console.log('   - Natural pacing');
    console.log('   - No distortion');
    console.log('\n4. Based on which button produces correct audio, we\'ll know:');
    console.log('   - The actual sample rate Nova sends');
    console.log('   - The correct endianness');
    console.log('   - Whether there\'s a header to skip');
  }
  
  socket.disconnect();
  process.exit(0);
}, 8000);