// Analyze the first audio chunk we captured
const firstChunk = "AAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAA";

console.log('=== ANALYZING FIRST AUDIO CHUNK ===');

// Decode base64
const binaryString = atob(firstChunk);
console.log(`Binary length: ${binaryString.length} bytes`);

// Look at raw bytes
const bytes = new Uint8Array(binaryString.length);
for (let i = 0; i < binaryString.length; i++) {
  bytes[i] = binaryString.charCodeAt(i);
}

console.log('\nFirst 20 bytes (hex):');
console.log(Array.from(bytes.slice(0, 20)).map(b => b.toString(16).padStart(2, '0')).join(' '));

console.log('\nFirst 20 bytes (decimal):');
console.log(Array.from(bytes.slice(0, 20)));

// Check pattern
let zeroCount = 0;
for (let i = 0; i < bytes.length; i++) {
  if (bytes[i] === 0) zeroCount++;
}
console.log(`\nZero bytes: ${zeroCount}/${bytes.length} (${(zeroCount/bytes.length*100).toFixed(1)}%)`);

// Try different interpretations
console.log('\n=== As 16-bit samples (little-endian) ===');
const samples16 = [];
for (let i = 0; i < Math.min(20, bytes.length/2); i++) {
  const low = bytes[i * 2];
  const high = bytes[i * 2 + 1];
  const sample = low | (high << 8);
  const signed = sample < 32768 ? sample : sample - 65536;
  samples16.push(signed);
}
console.log(samples16);

console.log('\n=== As 16-bit samples (big-endian) ===');
const samples16BE = [];
for (let i = 0; i < Math.min(20, bytes.length/2); i++) {
  const high = bytes[i * 2];
  const low = bytes[i * 2 + 1];
  const sample = (high << 8) | low;
  const signed = sample < 32768 ? sample : sample - 65536;
  samples16BE.push(signed);
}
console.log(samples16BE);

// Check if it might be stereo
console.log('\n=== As stereo (alternating L/R channels) ===');
const leftChannel = [];
const rightChannel = [];
for (let i = 0; i < Math.min(10, bytes.length/4); i++) {
  // Left channel
  const lLow = bytes[i * 4];
  const lHigh = bytes[i * 4 + 1];
  const lSample = lLow | (lHigh << 8);
  leftChannel.push(lSample < 32768 ? lSample : lSample - 65536);
  
  // Right channel
  const rLow = bytes[i * 4 + 2];
  const rHigh = bytes[i * 4 + 3];
  const rSample = rLow | (rHigh << 8);
  rightChannel.push(rSample < 32768 ? rSample : rSample - 65536);
}
console.log('Left:', leftChannel);
console.log('Right:', rightChannel);

// Check if it's 32-bit float
console.log('\n=== As 32-bit float ===');
const dataView = new DataView(bytes.buffer);
const float32Samples = [];
for (let i = 0; i < Math.min(5, bytes.length/4); i++) {
  float32Samples.push(dataView.getFloat32(i * 4, true));
}
console.log(float32Samples);

// Pattern analysis
console.log('\n=== Pattern Analysis ===');
// Check if every other byte is 0
let everyOtherZero = true;
for (let i = 1; i < bytes.length; i += 2) {
  if (bytes[i] !== 0) {
    everyOtherZero = false;
    break;
  }
}
console.log(`Every other byte is zero: ${everyOtherZero}`);

// Check for repeating patterns
const pattern = [];
for (let i = 0; i < Math.min(16, bytes.length); i++) {
  pattern.push(bytes[i]);
}
console.log(`First 16 bytes pattern: [${pattern.join(', ')}]`);