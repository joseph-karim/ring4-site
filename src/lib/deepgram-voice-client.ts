// Deepgram Voice Agent Client for Ring4
import { io, Socket } from 'socket.io-client';

export interface VoiceSessionConfig {
  systemPrompt?: string;
  voiceId?: string;
  businessInfo?: any;
}

export interface TranscriptMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  interim?: boolean;
}

export class DeepgramVoiceClient {
  private socket: Socket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private isRecording = false;
  private isSessionActive = false;
  
  // Callbacks
  private onTranscriptCallback?: (message: TranscriptMessage) => void;
  private onStatusCallback?: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void;
  
  // Audio configuration
  private readonly SAMPLE_RATE = 16000;  // Deepgram expects 16kHz
  private readonly BUFFER_SIZE = 2048;   // Larger buffer for stability

  constructor(serverUrl?: string) {
    const defaultUrl = (import.meta as any).env?.VITE_DEEPGRAM_URL || 'http://localhost:3003';
    
    this.socket = io(serverUrl || defaultUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });
    
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🎯 Connected to Deepgram server');
      this.onStatusCallback?.('Connected to voice server', 'connected');
    });

    this.socket.on('disconnect', () => {
      console.log('👋 Disconnected from Deepgram server');
      this.onStatusCallback?.('Disconnected from voice server', 'error');
      this.isSessionActive = false;
      this.stopRecording();
    });

    this.socket.on('session_ready', () => {
      console.log('✅ Deepgram session ready');
      this.isSessionActive = true;
      this.onStatusCallback?.('Voice session ready', 'connected');
    });

    this.socket.on('transcript', (data: { role: string; content: string; interim?: boolean }) => {
      console.log(`💬 ${data.interim ? '[interim]' : ''} ${data.role}:`, data.content);
      
      this.onTranscriptCallback?.({
        role: data.role as 'user' | 'assistant',
        content: data.content,
        timestamp: Date.now(),
        interim: data.interim
      });
    });

    this.socket.on('audioResponse', (audioBase64Chunk: string) => {
      this.playAudioChunk(audioBase64Chunk);
    });

    this.socket.on('error', (error: { message: string }) => {
      console.error('❌ Deepgram error:', error);
      this.onStatusCallback?.(`Error: ${error.message}`, 'error');
    });
  }

  async initializeSession(config: VoiceSessionConfig = {}) {
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
      
      // Start Deepgram session
      this.socket.emit('start_session', {
        systemPrompt: config.systemPrompt || 'You are a helpful AI receptionist. Be professional, friendly, and concise.',
        voiceId: config.voiceId || 'aura-asteria-en',
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
      // Request microphone with Deepgram requirements
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: this.SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.audioContext = new AudioContext({ sampleRate: this.SAMPLE_RATE });
      this.audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      console.log(`🎤 Audio initialized at ${this.audioContext.sampleRate}Hz`);
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
      this.processor = this.audioContext.createScriptProcessor(this.BUFFER_SIZE, 1, 1);
      
      this.processor.onaudioprocess = (event) => {
        if (!this.isRecording) return;
        
        const inputData = event.inputBuffer.getChannelData(0);
        const pcmData = this.convertFloat32ToInt16(inputData);
        const base64Data = this.arrayBufferToBase64(pcmData.buffer);
        
        this.socket?.emit('audio_input', base64Data);
      };

      this.audioSource.connect(this.processor);
      this.processor.connect(this.audioContext.destination);

      this.isRecording = true;
      this.onStatusCallback?.('🎙️ Listening... Speak now!', 'recording');
      console.log('🎙️ Recording started');

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
      this.audioSource.disconnect();
      this.processor = null;
    }

    this.onStatusCallback?.('Processing...', 'processing');
    console.log('⏹️ Recording stopped');
  }

  private convertFloat32ToInt16(buffer: Float32Array): Int16Array {
    const l = buffer.length;
    const buf = new Int16Array(l);
    
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      buf[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    return buf;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private audioQueue: AudioBufferSourceNode[] = [];

  private playAudioChunk(audioBase64: string) {
    try {
      if (!this.audioContext) {
        console.warn('Audio context not available');
        return;
      }

      // Decode base64 to binary
      const binaryString = atob(audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Deepgram sends 24kHz audio
      const samples = bytes.length / 2;
      const audioBuffer = this.audioContext.createBuffer(1, samples, 24000);
      const channelData = audioBuffer.getChannelData(0);

      // Convert 16-bit PCM to float32
      const dataView = new DataView(bytes.buffer);
      for (let i = 0; i < samples; i++) {
        const sample = dataView.getInt16(i * 2, true); // little-endian
        channelData[i] = sample / 32768;
      }

      // Play the audio
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      // Queue management for smooth playback
      if (this.audioQueue.length > 0) {
        const lastSource = this.audioQueue[this.audioQueue.length - 1];
        source.start(lastSource.context.currentTime + (lastSource.buffer?.duration || 0));
      } else {
        source.start();
      }
      
      this.audioQueue.push(source);
      
      // Clean up old sources
      source.onended = () => {
        const index = this.audioQueue.indexOf(source);
        if (index > -1) {
          this.audioQueue.splice(index, 1);
        }
      };

    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }

  // Event listeners
  onTranscript(callback: (message: TranscriptMessage) => void) {
    this.onTranscriptCallback = callback;
  }

  onStatus(callback: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void) {
    this.onStatusCallback = callback;
  }

  // Cleanup
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
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.audioSource = null;
    this.processor = null;
    this.isSessionActive = false;
    this.audioQueue = [];
    
    console.log('🧹 Deepgram client disconnected');
  }
}

// Helper to check if browser supports required APIs
export function isVoiceAgentSupported(): boolean {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioContext = !!(typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');
  return hasMediaDevices && hasAudioContext;
}