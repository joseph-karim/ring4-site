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
  
  // Diagnostics
  private audioStats = {
    chunksReceived: 0,
    chunksPlayed: 0,
    totalLatency: 0,
    lastChunkTime: 0
  };

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
      this.audioStats.chunksReceived++;
      const now = Date.now();
      if (this.audioStats.lastChunkTime > 0) {
        const chunkInterval = now - this.audioStats.lastChunkTime;
        console.log(`🔊 Audio chunk #${this.audioStats.chunksReceived} - interval: ${chunkInterval}ms`);
      }
      this.audioStats.lastChunkTime = now;
      
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
      // Create audio processor with smaller buffer for lower latency
      // AWS example uses 1024 chunk size
      const bufferSize = 1024;
      this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
      
      // Send audio immediately with minimal buffering
      let silenceCounter = 0;
      const SILENCE_THRESHOLD = 0.01;
      
      this.processor.onaudioprocess = (event) => {
        if (!this.isRecording) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        
        // Check if audio contains actual sound (not silence)
        let maxAmplitude = 0;
        for (let i = 0; i < inputData.length; i++) {
          maxAmplitude = Math.max(maxAmplitude, Math.abs(inputData[i]));
        }
        
        // Only send if there's actual audio content
        if (maxAmplitude > SILENCE_THRESHOLD) {
          silenceCounter = 0;
          const base64Data = this.float32ToBase64(inputData);
          this.socket?.emit('audio_input', base64Data);
        } else {
          silenceCounter++;
          // Send silence periodically to keep connection alive
          if (silenceCounter % 50 === 0) {
            const base64Data = this.float32ToBase64(inputData);
            this.socket?.emit('audio_input', base64Data);
          }
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
      // Clamp to valid range but don't scale down
      const sample = Math.max(-1, Math.min(1, buffer[i]));
      int16Buffer[i] = Math.floor(sample * 0x7FFF); // Full scale, no 90% reduction
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
        
        this.audioStats.chunksPlayed++;
        
        // Convert to Int16Array (16-bit PCM format from Nova Sonic)
        const int16Array = new Int16Array(audioBuffer);
        
        // Analyze audio for diagnostics
        let maxValue = 0;
        let minValue = 0;
        for (let i = 0; i < int16Array.length; i++) {
          maxValue = Math.max(maxValue, int16Array[i]);
          minValue = Math.min(minValue, int16Array[i]);
        }
        
        if (this.audioStats.chunksPlayed % 10 === 0) {
          console.log(`📊 Audio stats - Chunks: ${this.audioStats.chunksPlayed}/${this.audioStats.chunksReceived}, Range: [${minValue}, ${maxValue}], Samples: ${int16Array.length}`);
        }
        
        // Create Float32Array normalized to -1 to 1 range WITHOUT clipping protection
        // Trust that Nova Sonic sends valid 16-bit PCM data
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
          float32Array[i] = int16Array[i] / 32768.0;
        }
        
        // Create audio buffer at 24kHz (Nova Sonic's ACTUAL output rate per AWS docs)
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