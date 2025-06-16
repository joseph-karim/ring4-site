// Debug script to analyze actual audio chunk from Nova Sonic
// Run this in browser console when you get an audio chunk

function debugAudioChunk(base64Audio) {
  console.log('=== AUDIO CHUNK ANALYSIS ===');
  
  // Decode base64
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  console.log(`Total bytes: ${bytes.length}`);
  console.log(`Expected samples (16-bit): ${bytes.length / 2}`);
  
  // Check for common audio file headers
  const first4Bytes = Array.from(bytes.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`First 4 bytes (hex): ${first4Bytes}`);
  
  // Check if it might be WAV header (RIFF)
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
    console.log('⚠️ This looks like a WAV file with RIFF header!');
    
    // Parse WAV header
    const view = new DataView(bytes.buffer);
    const fileSize = view.getUint32(4, true);
    const format = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    console.log(`WAV file size: ${fileSize}`);
    console.log(`Format: ${format}`);
    
    // Find data chunk
    let offset = 12;
    while (offset < bytes.length - 8) {
      const chunkId = String.fromCharCode(bytes[offset], bytes[offset+1], bytes[offset+2], bytes[offset+3]);
      const chunkSize = view.getUint32(offset + 4, true);
      console.log(`Chunk: ${chunkId}, size: ${chunkSize}`);
      
      if (chunkId === 'data') {
        console.log(`Data starts at offset: ${offset + 8}`);
        console.log(`Audio data size: ${chunkSize} bytes`);
        console.log(`Audio samples: ${chunkSize / 2}`);
        break;
      }
      offset += 8 + chunkSize;
    }
  } else {
    console.log('No WAV header detected - appears to be raw PCM');
  }
  
  // Analyze first few samples as different interpretations
  console.log('\n--- Sample Analysis ---');
  const view = new DataView(bytes.buffer);
  
  console.log('First 10 samples as Little-Endian Int16:');
  const samplesLE = [];
  for (let i = 0; i < Math.min(10, bytes.length / 2); i++) {
    samplesLE.push(view.getInt16(i * 2, true));
  }
  console.log(samplesLE);
  
  console.log('\nFirst 10 samples as Big-Endian Int16:');
  const samplesBE = [];
  for (let i = 0; i < Math.min(10, bytes.length / 2); i++) {
    samplesBE.push(view.getInt16(i * 2, false));
  }
  console.log(samplesBE);
  
  // Check if data looks reasonable
  const maxLE = Math.max(...samplesLE.map(Math.abs));
  const maxBE = Math.max(...samplesBE.map(Math.abs));
  console.log(`\nMax amplitude LE: ${maxLE} (${(maxLE/32768*100).toFixed(1)}%)`);
  console.log(`Max amplitude BE: ${maxBE} (${(maxBE/32768*100).toFixed(1)}%)`);
  
  // Check for patterns
  const zerosLE = samplesLE.filter(s => s === 0).length;
  const zerosBE = samplesBE.filter(s => s === 0).length;
  console.log(`\nZeros in LE: ${zerosLE}/10`);
  console.log(`Zeros in BE: ${zerosBE}/10`);
  
  return bytes;
}

// To use: when you hear distorted audio, open console and run:
// debugAudioChunk(audioBase64String)