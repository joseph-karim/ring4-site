// Real Nova Sonic Voice Integration Client
// Based on the working implementation from /Users/josephkarim/Desktop/nova-sonic-test

import { io, Socket } from 'socket.io-client';
import { SonicNovaConfig } from './sonic-nova-config';

export interface NovaSessionConfig {
  systemPrompt?: string;
  voiceId?: string;
  sampleRate?: number;
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
  private mediaStream: MediaStream | null = null;
  private audioSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private isRecording = false;
  private isSessionActive = false;
  private onTranscriptCallback?: (message: TranscriptMessage) => void;
  private onAudioResponseCallback?: (audio: AudioResponse) => void;
  private onStatusCallback?: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void;
  
  // Audio buffering for smooth playback
  private audioQueue: ArrayBuffer[] = [];
  private isPlaying = false;
  private playbackContext: AudioContext | null = null;

  constructor(serverUrl?: string) {
    // Use environment variable or fallback to localhost
    const defaultUrl = import.meta.env.VITE_NOVA_SONIC_URL || 'http://localhost:3002';
    
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
      console.log('🔊 Nova Sonic audio response received');
      
      // Add to queue and process
      this.queueAudioChunk(audioBase64);
      
      // Also notify callback if set (for UI updates, etc)
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
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create AudioContext at 16kHz to match microphone input
      this.audioContext = new AudioContext({ sampleRate: 16000 });
      this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Create separate playback context at system default rate for better quality
      this.playbackContext = new AudioContext();

      console.log('🎤 Audio initialized successfully');
      console.log('🎤 Recording AudioContext sample rate:', this.audioContext.sampleRate);
      console.log('🎤 Playback AudioContext sample rate:', this.playbackContext.sampleRate);
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
      // Create audio processor with optimal buffer size
      // Using 4096 for better performance and less distortion
      const bufferSize = 4096;
      this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
      
      // Use a buffer to accumulate audio data before sending
      let audioBuffer: Float32Array[] = [];
      let lastSendTime = Date.now();
      const SEND_INTERVAL_MS = 100; // Send every 100ms
      
      this.processor.onaudioprocess = (event) => {
        if (!this.isRecording) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        audioBuffer.push(new Float32Array(inputData));
        
        // Send accumulated audio every SEND_INTERVAL_MS
        const now = Date.now();
        if (now - lastSendTime >= SEND_INTERVAL_MS) {
          // Combine all buffered audio
          const totalLength = audioBuffer.reduce((sum, buf) => sum + buf.length, 0);
          const combinedBuffer = new Float32Array(totalLength);
          let offset = 0;
          for (const buf of audioBuffer) {
            combinedBuffer.set(buf, offset);
            offset += buf.length;
          }
          
          // Convert and send
          const base64Data = this.float32ToBase64(combinedBuffer);
          this.socket?.emit('audio_input', base64Data);
          
          // Reset buffer and timer
          audioBuffer = [];
          lastSendTime = now;
        }
      };

      this.audioSource.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      this.isRecording = true;
      this.onStatusCallback?.('🎙️ Listening... Speak now!', 'recording');

      console.log('🎙️ Recording started with Nova Sonic');

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
    const int16Buffer = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      int16Buffer[i] = Math.max(-1, Math.min(1, buffer[i])) * 0x7FFF;
    }
    
    const uint8Buffer = new Uint8Array(int16Buffer.buffer);
    const binaryString = Array.from(uint8Buffer, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
  }

  private queueAudioChunk(audioBase64: string) {
    try {
      // Decode base64 to ArrayBuffer
      const binaryString = atob(audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Add to queue
      this.audioQueue.push(bytes.buffer);
      
      // Start playback if not already playing
      if (!this.isPlaying) {
        this.processAudioQueue();
      }
    } catch (error) {
      console.error('Error queueing audio chunk:', error);
    }
  }
  
  private async processAudioQueue() {
    if (this.isPlaying || this.audioQueue.length === 0) return;
    
    this.isPlaying = true;
    
    while (this.audioQueue.length > 0) {
      const audioBuffer = this.audioQueue.shift()!;
      await this.playAudioChunk(audioBuffer);
    }
    
    this.isPlaying = false;
  }
  
  private async playAudioChunk(audioBuffer: ArrayBuffer): Promise<void> {
    return new Promise((resolve) => {
      try {
        if (!this.playbackContext || this.playbackContext.state === 'closed') {
          console.warn('Playback context not available');
          resolve();
          return;
        }
        
        // Convert to Int16Array (16-bit PCM format from Nova Sonic)
        const int16Array = new Int16Array(audioBuffer);
        
        // Create Float32Array normalized to -1 to 1 range
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
          float32Array[i] = int16Array[i] / 32768.0;
        }
        
        // Create audio buffer at 24kHz (Nova Sonic's output rate)
        const tempBuffer = this.playbackContext.createBuffer(1, float32Array.length, 24000);
        tempBuffer.copyToChannel(float32Array, 0);
        
        // Create an offline context to resample to playback sample rate
        const targetSampleRate = this.playbackContext.sampleRate;
        const targetLength = Math.floor(float32Array.length * targetSampleRate / 24000);
        const offlineContext = new OfflineAudioContext(1, targetLength, targetSampleRate);
        
        const offlineSource = offlineContext.createBufferSource();
        offlineSource.buffer = tempBuffer;
        offlineSource.connect(offlineContext.destination);
        offlineSource.start();
        
        offlineContext.startRendering().then(resampledBuffer => {
          // Play the resampled audio
          const source = this.playbackContext!.createBufferSource();
          source.buffer = resampledBuffer;
          source.connect(this.playbackContext!.destination);
          
          source.onended = () => {
            resolve();
          };
          
          source.start();
        }).catch(error => {
          console.error('Error resampling audio:', error);
          resolve();
        });
        
      } catch (error) {
        console.error('Error playing audio chunk:', error);
        resolve();
      }
    });
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
    
    // Clear audio queue
    this.audioQueue = [];
    this.isPlaying = false;
    
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
    console.log('🧹 Nova Sonic client disconnected and cleaned up');
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