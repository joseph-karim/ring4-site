// Deepgram Voice Agent Client for Ring4
import { io, Socket } from 'socket.io-client';

export interface VoiceSessionConfig {
  systemPrompt?: string;
  voiceId?: string;
  businessInfo?: any;
  greeting?: string;
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
  private playbackContext: AudioContext | null = null;
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
    const defaultUrl = (import.meta as any).env?.VITE_DEEPGRAM_URL || 'http://localhost:3000';
    
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
        voiceId: config.voiceId || 'aura-2-asteria-en',
        businessInfo: config.businessInfo,
        greeting: config.greeting
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
      
      // Create separate context for playback
      // Most browsers don't support 24kHz natively, so we'll use the default rate
      // and resample the audio during playback
      this.playbackContext = new AudioContext();
      
      console.log(`🎤 Audio initialized - Recording: ${this.audioContext.sampleRate}Hz, Playback: ${this.playbackContext.sampleRate}Hz`);
      
      // Note the actual playback context sample rate for later use
      if (this.playbackContext.sampleRate !== 24000) {
        console.info(`ℹ️ Browser AudioContext is ${this.playbackContext.sampleRate}Hz (Deepgram sends 24kHz audio)`);
      }
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
  private lastPlayTime = 0;

  private async playAudioChunk(audioBase64: string) {
    try {
      if (!this.playbackContext) {
        console.warn('Playback context not available');
        return;
      }

      // Resume audio context if it's suspended
      if (this.playbackContext.state === 'suspended') {
        await this.playbackContext.resume();
      }

      // Decode base64 to binary
      const binaryString = atob(audioBase64);
      const rawBytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        rawBytes[i] = binaryString.charCodeAt(i);
      }

      // Create WAV header for the raw PCM data
      // IMPORTANT: The audio from Deepgram is ALWAYS 24000Hz
      // We MUST specify 24000Hz in the WAV header so decodeAudioData knows the source sample rate
      const wavBytes = this.addWavHeader(rawBytes, 24000, 16, 1);

      // decodeAudioData will automatically resample from 24kHz to the context's sample rate
      this.playbackContext.decodeAudioData(wavBytes.buffer).then(audioBuffer => {
        // The audioBuffer.sampleRate will match the context's sample rate after resampling
        const currentTime = this.playbackContext!.currentTime;
        const startTime = Math.max(currentTime, this.lastPlayTime);
        
        console.log(`🎵 Audio decoded - Duration: ${audioBuffer.duration.toFixed(2)}s, Resampled to: ${audioBuffer.sampleRate}Hz, Start: ${startTime.toFixed(2)}s`);
        
        const source = this.playbackContext!.createBufferSource();
        source.buffer = audioBuffer;
        
        // CRITICAL: Do NOT set playbackRate - let the resampling handle the rate conversion
        // source.playbackRate.value = 1.0 is the default and correct value
        
        source.connect(this.playbackContext!.destination);
      
        // Schedule playback for seamless audio
        source.start(startTime);
        this.lastPlayTime = startTime + audioBuffer.duration;
        
        this.audioQueue.push(source);
        
        // Clean up old sources
        source.onended = () => {
          const index = this.audioQueue.indexOf(source);
          if (index > -1) {
            this.audioQueue.splice(index, 1);
          }
        };
      }).catch(error => {
        console.error('Error decoding audio:', error);
        console.error('Audio data length:', rawBytes.length);
        console.error('First few bytes:', Array.from(rawBytes.slice(0, 10)));
      });

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
    
    if (this.playbackContext && this.playbackContext.state !== 'closed') {
      this.playbackContext.close();
      this.playbackContext = null;
    }
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.audioSource = null;
    this.processor = null;
    this.isSessionActive = false;
    this.audioQueue = [];
    this.lastPlayTime = 0;
    
    console.log('🧹 Deepgram client disconnected');
  }

  private addWavHeader(pcmData: Uint8Array, sampleRate: number, bitDepth: number, channels: number): Uint8Array {
    const dataLength = pcmData.length;
    const header = new ArrayBuffer(44);
    const view = new DataView(header);

    // RIFF chunk descriptor
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true); // file size - 8
    writeString(8, 'WAVE');

    // fmt sub-chunk
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk size
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * (bitDepth / 8), true); // byte rate
    view.setUint16(32, channels * (bitDepth / 8), true); // block align
    view.setUint16(34, bitDepth, true);

    // data sub-chunk
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Combine header and PCM data
    const wavData = new Uint8Array(header.byteLength + dataLength);
    wavData.set(new Uint8Array(header), 0);
    wavData.set(pcmData, header.byteLength);

    // Debug log to verify WAV header
    console.log(`📝 WAV Header: ${sampleRate}Hz, ${bitDepth}bit, ${channels}ch, Data: ${dataLength} bytes`);

    return wavData;
  }
}

// Helper to check if browser supports required APIs
export function isVoiceAgentSupported(): boolean {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioContext = !!(typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');
  return hasMediaDevices && hasAudioContext;
}