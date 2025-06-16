// Test audio processing locally without needing to run the full app
import fs from 'fs';

// Simulate the audio processing pipeline
function testAudioProcessing() {
  // Create test PCM data (16-bit, 24kHz, 1 second of sine wave)
  const sampleRate = 24000;
  const frequency = 440; // A4 note
  const duration = 1; // seconds
  const numSamples = sampleRate * duration;
  
  // Generate sine wave as Int16 PCM
  const int16Buffer = new Int16Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t);
    int16Buffer[i] = Math.round(sample * 32767);
  }
  
  // Convert to base64 (simulating what Nova Sonic sends)
  const uint8Buffer = new Uint8Array(int16Buffer.buffer);
  const binaryString = Array.from(uint8Buffer, byte => String.fromCharCode(byte)).join('');
  const base64Audio = btoa(binaryString);
  
  console.log('Test audio generated:');
  console.log(`- Samples: ${numSamples}`);
  console.log(`- Base64 length: ${base64Audio.length}`);
  console.log(`- First few Int16 values: ${Array.from(int16Buffer.slice(0, 10))}`);
  
  // Test Method 1: Direct Int16Array conversion (current approach)
  console.log('\n--- Method 1: Direct Int16Array ---');
  const decoded1 = atob(base64Audio);
  const bytes1 = new Uint8Array(decoded1.length);
  for (let i = 0; i < decoded1.length; i++) {
    bytes1[i] = decoded1.charCodeAt(i);
  }
  const int16Array1 = new Int16Array(bytes1.buffer, bytes1.byteOffset, bytes1.length / 2);
  console.log(`Decoded samples: ${int16Array1.length}`);
  console.log(`First few values: ${Array.from(int16Array1.slice(0, 10))}`);
  
  // Test Method 2: DataView with little-endian
  console.log('\n--- Method 2: DataView Little-Endian ---');
  const decoded2 = atob(base64Audio);
  const bytes2 = new Uint8Array(decoded2.length);
  for (let i = 0; i < decoded2.length; i++) {
    bytes2[i] = decoded2.charCodeAt(i);
  }
  const dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  const numSamples2 = bytes2.length / 2;
  const samples2 = [];
  for (let i = 0; i < 10; i++) { // Just first 10 samples
    samples2.push(dataView.getInt16(i * 2, true));
  }
  console.log(`Decoded samples: ${numSamples2}`);
  console.log(`First few values: ${samples2}`);
  
  // Test Method 3: DataView with big-endian
  console.log('\n--- Method 3: DataView Big-Endian ---');
  const samples3 = [];
  for (let i = 0; i < 10; i++) { // Just first 10 samples
    samples3.push(dataView.getInt16(i * 2, false));
  }
  console.log(`First few values: ${samples3}`);
  
  // Compare results
  console.log('\n--- Comparison ---');
  const match12 = JSON.stringify(Array.from(int16Array1.slice(0, 10))) === JSON.stringify(samples2);
  const match13 = JSON.stringify(Array.from(int16Array1.slice(0, 10))) === JSON.stringify(samples3);
  console.log(`Method 1 matches Method 2 (LE): ${match12}`);
  console.log(`Method 1 matches Method 3 (BE): ${match13}`);
  
  // Check if values look reasonable (should be in range -32768 to 32767)
  const reasonable1 = Array.from(int16Array1.slice(0, 100)).every(v => v >= -32768 && v <= 32767);
  console.log(`\nMethod 1 values reasonable: ${reasonable1}`);
  
  // Test the actual float conversion
  const float32Array = new Float32Array(10);
  for (let i = 0; i < 10; i++) {
    float32Array[i] = int16Array1[i] / 32768.0;
  }
  console.log(`\nFloat32 values: ${Array.from(float32Array)}`);
  const floatsReasonable = Array.from(float32Array).every(v => v >= -1.0 && v <= 1.0);
  console.log(`Float values in range [-1, 1]: ${floatsReasonable}`);
}

testAudioProcessing();