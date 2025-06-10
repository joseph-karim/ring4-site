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

  constructor(serverUrl?: string) {
    // Use environment variable or fallback to localhost
    const defaultUrl = import.meta.env.VITE_NOVA_SONIC_URL || 'http://localhost:3002';
    
    this.socket = io(serverUrl || defaultUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });
    
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    if (!this.socket) return;

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
      this.onAudioResponseCallback?.({
        audioBase64,
        role: 'assistant'
      });
      
      // Automatically play the audio response
      this.playAudioResponse(audioBase64);
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

      this.audioContext = new AudioContext({ sampleRate: 24000 });
      this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);

      console.log('🎤 Audio initialized successfully');
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
      // Create audio processor
      this.processor = this.audioContext.createScriptProcessor(512, 1, 1);
      
      this.processor.onaudioprocess = (event) => {
        if (!this.isRecording) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        const base64Data = this.float32ToBase64(inputData);
        
        // Send audio data to Nova Sonic
        this.socket?.emit('audio_input', base64Data);
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

  private async playAudioResponse(audioBase64: string) {
    try {
      if (!this.audioContext) return;

      // Decode base64 to audio buffer
      const binaryString = atob(audioBase64);
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      // Convert to Int16Array (LPCM format)
      const int16Array = new Int16Array(uint8Array.buffer);
      
      // Nova Sonic sends audio at 24kHz, but our context might be different
      // We need to resample if necessary
      const sourceRate = 24000; // Nova Sonic output rate
      const targetRate = this.audioContext.sampleRate;
      
      if (sourceRate === targetRate) {
        // No resampling needed
        const audioBuffer = this.audioContext.createBuffer(1, int16Array.length, targetRate);
        const channelData = audioBuffer.getChannelData(0);
        
        // Convert Int16 to Float32 for Web Audio API
        for (let i = 0; i < int16Array.length; i++) {
          channelData[i] = int16Array[i] / 32768.0;
        }

        // Play the audio
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start();
      } else {
        // Use offline context for resampling
        const offlineContext = new OfflineAudioContext(1, 
          Math.ceil(int16Array.length * targetRate / sourceRate), 
          targetRate
        );
        
        // Create buffer at source rate
        const sourceBuffer = offlineContext.createBuffer(1, int16Array.length, sourceRate);
        const sourceData = sourceBuffer.getChannelData(0);
        
        // Convert Int16 to Float32
        for (let i = 0; i < int16Array.length; i++) {
          sourceData[i] = int16Array[i] / 32768.0;
        }
        
        // Play through offline context to resample
        const source = offlineContext.createBufferSource();
        source.buffer = sourceBuffer;
        source.connect(offlineContext.destination);
        source.start();
        
        // Render and play the resampled audio
        const resampledBuffer = await offlineContext.startRendering();
        const playSource = this.audioContext.createBufferSource();
        playSource.buffer = resampledBuffer;
        playSource.connect(this.audioContext.destination);
        playSource.start();
      }

      console.log('🔊 Playing Nova Sonic audio response');

    } catch (error) {
      console.error('Error playing audio response:', error);
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
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    if (this.socket) {
      this.socket.disconnect();
    }

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