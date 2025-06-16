// Simplified Nova Sonic Voice Integration Client
// Following AWS best practices: 16kHz input, 24kHz output

import { io, Socket } from 'socket.io-client';
import { SonicNovaConfig } from './sonic-nova-config';

export interface NovaSessionConfig {
  systemPrompt?: string;
  voiceId?: string;
  businessInfo?: any;
}

export interface AudioResponse {
  audioBase64: string;
  role: string;
  content?: string;
}

export interface TranscriptMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export class NovaSonicClient {
  private socket: Socket | null = null;
  private audioContext: AudioContext | null = null;
  private playbackContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private isRecording = false;
  private isSessionActive = false;
  private onTranscriptCallback?: (message: TranscriptMessage) => void;
  private onAudioResponseCallback?: (audio: AudioResponse) => void;
  private onStatusCallback?: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void;
  
  // AWS Nova Sonic audio specifications
  private readonly RECORDING_SAMPLE_RATE = 16000; // 16kHz for microphone input
  private readonly PLAYBACK_SAMPLE_RATE = 24000;  // 24kHz for Nova Sonic output
  private readonly BUFFER_SIZE = 1024;             // Small buffer for low latency

  constructor(serverUrl?: string) {
    // Use environment variable or fallback to localhost
    const defaultUrl = (import.meta as any).env?.VITE_NOVA_SONIC_URL || 'http://localhost:3002';
    
    // Create a new socket connection
    this.socket = io(serverUrl || defaultUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      // Force new connection to prevent reusing existing ones
      forceNew: true
    });
    
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    // Remove any existing listeners first to prevent duplicates
    this.socket.off('connect');
    this.socket.off('disconnect');
    this.socket.off('session_ready');
    this.socket.off('transcript');
    this.socket.off('audioResponse');
    this.socket.off('error');

    this.socket.on('connect', () => {
      console.log('🎯 Connected to Nova Sonic server');
      this.onStatusCallback?.('Connected to voice server', 'connected');
    });

    this.socket.on('disconnect', () => {
      console.log('👋 Disconnected from Nova Sonic server');
      this.onStatusCallback?.('Disconnected from voice server', 'error');
      this.isSessionActive = false;
      this.stopRecording();
    });

    this.socket.on('session_ready', () => {
      console.log('✅ Nova Sonic session ready');
      this.isSessionActive = true;
      this.onStatusCallback?.('Voice session ready', 'connected');
    });

    this.socket.on('transcript', (data: { role: string; content: string }) => {
      console.log('💬 Nova Sonic transcript:', data);
      this.onTranscriptCallback?.({
        role: data.role as 'user' | 'assistant' | 'system',
        content: data.content,
        timestamp: Date.now()
      });
    });

    this.socket.on('audioResponse', (audioBase64: string) => {
      // Play audio directly - no queuing needed
      this.playAudioChunk(audioBase64);
      
      // Notify callback if set
      this.onAudioResponseCallback?.({
        audioBase64,
        role: 'assistant'
      });
    });

    this.socket.on('error', (error: { message: string }) => {
      console.error('❌ Nova Sonic error:', error);
      this.onStatusCallback?.(`Error: ${error.message}`, 'error');
    });
  }

  async initializeSession(config: NovaSessionConfig = {}) {
    if (!this.socket) {
      throw new Error('Socket not initialized');
    }

    if (this.isSessionActive) {
      console.log('Session already active');
      return;
    }

    try {
      this.onStatusCallback?.('Initializing voice session...', 'processing');
      
      // Request microphone access
      await this.initializeAudio();
      
      // Start Nova Sonic session
      this.socket.emit('start_session', {
        systemPrompt: config.systemPrompt || 'You are a helpful AI receptionist. Be professional, friendly, and concise.',
        voiceId: config.voiceId || 'tiffany',
        businessInfo: config.businessInfo
      });

    } catch (error) {
      console.error('Error initializing session:', error);
      this.onStatusCallback?.('Failed to initialize session', 'error');
      throw error;
    }
  }

  private async initializeAudio() {
    try {
      // Request microphone with AWS Nova Sonic requirements
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: this.RECORDING_SAMPLE_RATE, // 16kHz as required by AWS
          channelCount: 1,                        // Mono
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create AudioContext at 16kHz for recording
      this.audioContext = new AudioContext({ sampleRate: this.RECORDING_SAMPLE_RATE });
      this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Create separate context at 24kHz for Nova Sonic playback
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.playbackContext = new AudioContextClass({ sampleRate: this.PLAYBACK_SAMPLE_RATE });

      // CRITICAL: Check if browser actually gave us the requested sample rate
      const actualPlaybackRate = this.playbackContext.sampleRate;
      if (actualPlaybackRate !== this.PLAYBACK_SAMPLE_RATE) {
        console.warn(`⚠️ Browser gave us ${actualPlaybackRate}Hz instead of requested ${this.PLAYBACK_SAMPLE_RATE}Hz`);
      }

      console.log('🎤 Audio initialized (AWS Nova Sonic specs)');
      console.log(`🎤 Recording: ${this.audioContext.sampleRate}Hz mono | Playback: ${actualPlaybackRate}Hz mono`);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw new Error('Could not access microphone. Please check permissions.');
    }
  }

  startRecording() {
    if (!this.isSessionActive || this.isRecording || !this.audioContext || !this.audioSource) {
      console.warn('Cannot start recording: session not ready or already recording');
      return;
    }

    try {
      // Create simple audio processor - AWS recommends 1024 buffer size
      this.processor = this.audioContext.createScriptProcessor(this.BUFFER_SIZE, 1, 1);
      
      this.processor.onaudioprocess = (event) => {
        if (!this.isRecording) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        
        // Convert and send immediately - no complex silence detection
        const base64Data = this.float32ToBase64(inputData);
        this.socket?.emit('audio_input', base64Data);
      };

      this.audioSource.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      this.isRecording = true;
      this.onStatusCallback?.('🎙️ Listening... Speak now!', 'recording');
      console.log('🎙️ Recording started at 16kHz');

    } catch (error) {
      console.error('Error starting recording:', error);
      this.onStatusCallback?.('Failed to start recording', 'error');
    }
  }

  stopRecording() {
    if (!this.isRecording) return;

    this.isRecording = false;

    if (this.processor && this.audioSource) {
      this.processor.disconnect();
      this.audioSource.disconnect(this.processor);
      this.processor = null;
    }

    this.onStatusCallback?.('Processing your request...', 'processing');
    console.log('⏹️ Recording stopped');
  }

  private float32ToBase64(buffer: Float32Array): string {
    // Convert Float32 to Int16 PCM format as expected by Nova Sonic
    const int16Buffer = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      // Simple conversion: clamp and scale to 16-bit range
      const clamped = Math.max(-1, Math.min(1, buffer[i]));
      int16Buffer[i] = Math.round(clamped * 32767);
    }
    
    // Convert to base64
    const uint8Buffer = new Uint8Array(int16Buffer.buffer);
    const binaryString = Array.from(uint8Buffer, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
  }

  private playAudioChunk(audioBase64: string) {
    try {
      if (!this.playbackContext || this.playbackContext.state === 'closed') {
        console.warn('Playback context not available');
        return;
      }
      
      // DIFFERENT APPROACH: Use proper base64 to ArrayBuffer conversion
      // This handles binary data correctly without string encoding issues
      const binaryString = atob(audioBase64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Create Int16Array view with proper alignment
      // PCM data is little-endian by default
      const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const numSamples = bytes.length / 2;
      const float32Array = new Float32Array(numSamples);
      
      // Read samples as little-endian Int16 and convert to Float32
      for (let i = 0; i < numSamples; i++) {
        const sample = dataView.getInt16(i * 2, true); // true = little-endian
        float32Array[i] = sample / 32768.0;
      }
      
      // Create audio buffer using the ACTUAL sample rate the browser gave us
      // This is critical - if browser doesn't support 24kHz, we must use what it supports
      const contextSampleRate = this.playbackContext.sampleRate;
      
      const audioBuffer = this.playbackContext.createBuffer(
        1,                               // Mono
        float32Array.length,             // Number of samples
        contextSampleRate                // Use the actual context sample rate
      );
      audioBuffer.copyToChannel(float32Array, 0);
      
      // If the context sample rate doesn't match Nova Sonic's output, we need to adjust playback
      const source = this.playbackContext.createBufferSource();
      source.buffer = audioBuffer;
      
      // CRITICAL FIX: Adjust playback rate if browser doesn't support 24kHz
      if (contextSampleRate !== this.PLAYBACK_SAMPLE_RATE) {
        // Calculate playback rate adjustment
        // e.g., if browser is 48kHz and audio is 24kHz, play at 0.5x speed
        const playbackRate = this.PLAYBACK_SAMPLE_RATE / contextSampleRate;
        source.playbackRate.value = playbackRate;
        console.log(`⚠️ Adjusting playback rate to ${playbackRate} (context: ${contextSampleRate}Hz, audio: ${this.PLAYBACK_SAMPLE_RATE}Hz)`);
      }
      
      source.connect(this.playbackContext.destination);
      source.start();
      
      console.log(`🔊 Playing audio chunk: ${numSamples} samples at effective ${this.PLAYBACK_SAMPLE_RATE}Hz`);
      
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  // Event listener setters
  onTranscript(callback: (message: TranscriptMessage) => void) {
    this.onTranscriptCallback = callback;
  }

  onAudioResponse(callback: (audio: AudioResponse) => void) {
    this.onAudioResponseCallback = callback;
  }

  onStatus(callback: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void) {
    this.onStatusCallback = callback;
  }

  // Integration helper for existing Ring4 components
  static createFromBusinessConfig(config: SonicNovaConfig): NovaSessionConfig {
    return {
      systemPrompt: config.systemPrompt,
      voiceId: config.voiceSettings?.gender === 'female' ? 'tiffany' : 'tiffany', // Nova Sonic voice options
      businessInfo: {
        name: config.agentName,
        personality: config.personality,
        knowledgeBase: config.knowledgeBase
      }
    };
  }

  disconnect() {
    this.stopRecording();
    
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    if (this.playbackContext && this.playbackContext.state !== 'closed') {
      this.playbackContext.close();
      this.playbackContext = null;
    }
    
    if (this.socket) {
      // Remove all listeners before disconnecting
      this.socket.off('connect');
      this.socket.off('disconnect');
      this.socket.off('session_ready');
      this.socket.off('transcript');
      this.socket.off('audioResponse');
      this.socket.off('error');
      
      this.socket.disconnect();
      this.socket = null;
    }

    this.audioSource = null;
    this.processor = null;
    this.isSessionActive = false;
    console.log('🧹 Nova Sonic client disconnected');
  }
}

// Helper function to check if Nova Sonic is available
export function isNovaSonicAvailable(): boolean {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioContext = !!(typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');
  return hasMediaDevices && hasAudioContext;
}

// Helper function to test Nova Sonic connection
export async function testNovaSonicConnection(serverUrl?: string): Promise<boolean> {
  return new Promise((resolve) => {
    const testSocket = io(serverUrl || window.location.origin, {
      timeout: 5000,
      transports: ['websocket', 'polling']
    });

    testSocket.on('connect', () => {
      testSocket.disconnect();
      resolve(true);
    });

    testSocket.on('connect_error', () => {
      resolve(false);
    });

    setTimeout(() => {
      testSocket.disconnect();
      resolve(false);
    }, 5000);
  });
}