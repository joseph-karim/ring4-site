// Test different audio format decodings

// μ-law decoding table
const ULAW_DECODE_TABLE = new Int16Array([
  -32124,-31100,-30076,-29052,-28028,-27004,-25980,-24956,
  -23932,-22908,-21884,-20860,-19836,-18812,-17788,-16764,
  -15996,-15484,-14972,-14460,-13948,-13436,-12924,-12412,
  -11900,-11388,-10876,-10364, -9852, -9340, -8828, -8316,
  -7932, -7676, -7420, -7164, -6908, -6652, -6396, -6140,
  -5884, -5628, -5372, -5116, -4860, -4604, -4348, -4092,
  -3900, -3772, -3644, -3516, -3388, -3260, -3132, -3004,
  -2876, -2748, -2620, -2492, -2364, -2236, -2108, -1980,
  -1884, -1820, -1756, -1692, -1628, -1564, -1500, -1436,
  -1372, -1308, -1244, -1180, -1116, -1052,  -988,  -924,
  -876,  -844,  -812,  -780,  -748,  -716,  -684,  -652,
  -620,  -588,  -556,  -524,  -492,  -460,  -428,  -396,
  -372,  -356,  -340,  -324,  -308,  -292,  -276,  -260,
  -244,  -228,  -212,  -196,  -180,  -164,  -148,  -132,
  -120,  -112,  -104,   -96,   -88,   -80,   -72,   -64,
  -56,   -48,   -40,   -32,   -24,   -16,    -8,     0,
  32124, 31100, 30076, 29052, 28028, 27004, 25980, 24956,
  23932, 22908, 21884, 20860, 19836, 18812, 17788, 16764,
  15996, 15484, 14972, 14460, 13948, 13436, 12924, 12412,
  11900, 11388, 10876, 10364,  9852,  9340,  8828,  8316,
  7932,  7676,  7420,  7164,  6908,  6652,  6396,  6140,
  5884,  5628,  5372,  5116,  4860,  4604,  4348,  4092,
  3900,  3772,  3644,  3516,  3388,  3260,  3132,  3004,
  2876,  2748,  2620,  2492,  2364,  2236,  2108,  1980,
  1884,  1820,  1756,  1692,  1628,  1564,  1500,  1436,
  1372,  1308,  1244,  1180,  1116,  1052,   988,   924,
  876,   844,   812,   780,   748,   716,   684,   652,
  620,   588,   556,   524,   492,   460,   428,   396,
  372,   356,   340,   324,   308,   292,   276,   260,
  244,   228,   212,   196,   180,   164,   148,   132,
  120,   112,   104,    96,    88,    80,    72,    64,
  56,    48,    40,    32,    24,    16,     8,     0
]);

function decodeULaw(ulawByte) {
  return ULAW_DECODE_TABLE[ulawByte & 0xFF];
}

function decodeALaw(alawByte) {
  alawByte ^= 0x55;
  let sign = (alawByte & 0x80) ? -1 : 1;
  let exponent = (alawByte >> 4) & 0x07;
  let mantissa = alawByte & 0x0F;
  
  let sample = mantissa << 4;
  sample += 8;
  
  if (exponent !== 0) {
    sample += 0x100;
  }
  
  if (exponent > 1) {
    sample <<= (exponent - 1);
  }
  
  return sign * sample;
}

function testAudioEncoding(base64Audio) {
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  console.log('=== AUDIO ENCODING TEST ===');
  console.log(`Total bytes: ${bytes.length}`);
  
  // Test as linear PCM
  const view = new DataView(bytes.buffer);
  const pcmSamples = [];
  for (let i = 0; i < Math.min(10, bytes.length / 2); i++) {
    pcmSamples.push(view.getInt16(i * 2, true));
  }
  console.log('\nAs Linear PCM (16-bit LE):', pcmSamples);
  
  // Test as μ-law
  const ulawSamples = [];
  for (let i = 0; i < Math.min(20, bytes.length); i++) {
    ulawSamples.push(decodeULaw(bytes[i]));
  }
  console.log('\nAs μ-law:', ulawSamples);
  
  // Test as A-law
  const alawSamples = [];
  for (let i = 0; i < Math.min(20, bytes.length); i++) {
    alawSamples.push(decodeALaw(bytes[i]));
  }
  console.log('\nAs A-law:', alawSamples);
  
  // Compare which looks more reasonable
  const pcmMax = Math.max(...pcmSamples.map(Math.abs));
  const ulawMax = Math.max(...ulawSamples.map(Math.abs));
  const alawMax = Math.max(...alawSamples.map(Math.abs));
  
  console.log('\nMax amplitudes:');
  console.log(`Linear PCM: ${pcmMax}`);
  console.log(`μ-law: ${ulawMax}`);
  console.log(`A-law: ${alawMax}`);
  
  // Check byte distribution
  const byteHistogram = new Array(256).fill(0);
  for (let i = 0; i < Math.min(1000, bytes.length); i++) {
    byteHistogram[bytes[i]]++;
  }
  
  const nonZeroBytes = byteHistogram.filter(count => count > 0).length;
  console.log(`\nUnique byte values in first 1000 bytes: ${nonZeroBytes}/256`);
  
  if (nonZeroBytes < 100) {
    console.log('⚠️ Low byte diversity suggests this might be compressed audio (μ-law/A-law)');
  }
}

// Export for use in console
window.testAudioEncoding = testAudioEncoding;