// Diagnostic to determine actual sample rate of Nova Sonic audio

// The symptom: "high pitched, distorted, it kind of resolves and sounds better as the sentence is ending"
// This is a HUGE clue - it suggests the sample rate changes during playback!

// Pattern analysis:
// 960 samples, then 8640 samples, repeatedly
// If we assume these are time-based chunks:

const patterns = [
  { samples: 960, desc: "First chunk" },
  { samples: 8640, desc: "Second chunk" }
];

const sampleRates = [8000, 16000, 24000, 48000];

console.log("=== TIMING ANALYSIS ===");
console.log("If Nova Sonic sends fixed-duration chunks:\n");

sampleRates.forEach(rate => {
  console.log(`At ${rate}Hz:`);
  patterns.forEach(p => {
    const ms = (p.samples / rate * 1000).toFixed(1);
    console.log(`  ${p.samples} samples = ${ms}ms`);
  });
  console.log();
});

// The key insight: What if Nova Sonic is sending:
// 1. Initial chunks at one sample rate (causing high pitch)
// 2. Later chunks at the correct rate (why it "resolves")

console.log("=== HYPOTHESIS ===");
console.log("What if Nova Sonic sends:");
console.log("1. Header/initial chunks at 48kHz (browser default)");
console.log("2. Main audio at 24kHz");
console.log("3. We're playing everything at 24kHz");
console.log();
console.log("Result: Initial audio plays at 0.5x speed (low), main audio correct");
console.log("OR");
console.log("1. Header/initial chunks at 16kHz");
console.log("2. Main audio at 24kHz");
console.log("3. We're playing everything at 24kHz");
console.log("Result: Initial audio plays at 1.5x speed (HIGH PITCH!), main audio correct");
console.log();
console.log("This matches the symptom perfectly!");

// Let's check if the audio might have a header
console.log("\n=== HEADER CHECK ===");
console.log("960 bytes could be a 480-sample header at 16-bit");
console.log("Common audio headers:");
console.log("- WAV: 44 bytes");
console.log("- Custom headers: varies");
console.log("- If 960 samples is metadata/silence at wrong rate...");

// The simplest explanation (Occam's Razor):
console.log("\n=== OCCAM'S RAZOR CONCLUSION ===");
console.log("Nova Sonic is likely sending:");
console.log("1. Initial audio at 16kHz (your recording rate)");
console.log("2. You're playing it at 24kHz (1.5x speed = high pitch)");
console.log("3. Later chunks might be at 24kHz (plays correctly)");
console.log();
console.log("OR the entire stream is 16kHz but you're playing at 24kHz!");