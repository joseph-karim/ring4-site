// HTTP-based Nova Sonic client for production use with Supabase Edge Functions
// This replaces WebSocket connections with HTTP requests for serverless compatibility

import { supabase } from './supabase';
import { SonicNovaConfig } from './sonic-nova-config';

export interface NovaSessionConfig {
  systemPrompt?: string;
  voiceId?: string;
  businessInfo?: any;
}

export interface TranscriptMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export class NovaSonicHttpClient {
  private sessionId: string | null = null;
  private isSessionActive = false;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private onTranscriptCallback?: (message: TranscriptMessage) => void;
  private onStatusCallback?: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void;

  async initializeSession(config: NovaSessionConfig = {}) {
    try {
      this.onStatusCallback?.('Initializing voice session...', 'processing');
      
      // Initialize audio
      await this.initializeAudio();
      
      // Start Nova Sonic session via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('nova-sonic-voice', {
        body: {
          action: 'start_session',
          data: {
            systemPrompt: config.systemPrompt || 'You are a helpful AI receptionist. Be professional, friendly, and concise.',
            voiceId: config.voiceId || 'tiffany',
            businessInfo: config.businessInfo
          }
        }
      });

      if (error) throw error;
      
      if (data?.success && data?.sessionId) {
        this.sessionId = data.sessionId;
        this.isSessionActive = true;
        this.onStatusCallback?.('Voice session ready', 'connected');
        
        // Process any initial transcripts
        if (data.transcripts) {
          data.transcripts.forEach((transcript: string) => {
            const [role, ...contentParts] = transcript.split(': ');
            this.onTranscriptCallback?.({
              role: role.toLowerCase() as 'user' | 'assistant' | 'system',
              content: contentParts.join(': '),
              timestamp: Date.now()
            });
          });
        }
        
        // Play any audio responses
        if (data.audioChunks && data.audioChunks.length > 0) {
          for (const audioBase64 of data.audioChunks) {
            await this.playAudioResponse(audioBase64);
          }
        }
      } else {
        throw new Error('Failed to start voice session');
      }

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

      this.audioContext = new AudioContext({ sampleRate: 16000 });
      console.log('🎤 Audio initialized successfully');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw new Error('Could not access microphone. Please check permissions.');
    }
  }

  async sendAudioInput(audioBase64: string) {
    if (!this.isSessionActive || !this.sessionId) {
      console.warn('Cannot send audio: session not active');
      return;
    }

    try {
      this.onStatusCallback?.('Processing audio...', 'processing');
      
      const { data, error } = await supabase.functions.invoke('nova-sonic-voice', {
        body: {
          action: 'process_audio',
          sessionId: this.sessionId,
          data: audioBase64
        }
      });

      if (error) throw error;
      
      if (data?.transcripts) {
        data.transcripts.forEach((transcript: string) => {
          const [role, ...contentParts] = transcript.split(': ');
          this.onTranscriptCallback?.({
            role: role.toLowerCase() as 'user' | 'assistant' | 'system',
            content: contentParts.join(': '),
            timestamp: Date.now()
          });
        });
      }
      
      if (data?.audioChunks) {
        for (const audioBase64 of data.audioChunks) {
          await this.playAudioResponse(audioBase64);
        }
      }
      
      this.onStatusCallback?.('Ready', 'connected');
      
    } catch (error) {
      console.error('Error processing audio:', error);
      this.onStatusCallback?.('Error processing audio', 'error');
    }
  }

  async recordAndSendAudio(durationMs: number = 5000) {
    if (!this.audioContext || !this.mediaStream) {
      console.warn('Audio not initialized');
      return;
    }

    try {
      this.onStatusCallback?.('Recording...', 'recording');
      
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      const processor = this.audioContext.createScriptProcessor(512, 1, 1);
      const chunks: Float32Array[] = [];

      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        chunks.push(new Float32Array(inputData));
      };

      source.connect(processor);
      processor.connect(this.audioContext.destination);

      // Record for specified duration
      await new Promise(resolve => setTimeout(resolve, durationMs));

      processor.disconnect();
      source.disconnect();

      // Convert to base64
      const audioData = this.mergeAudioChunks(chunks);
      const audioBase64 = this.float32ArrayToBase64(audioData);
      
      // Send to Nova Sonic
      await this.sendAudioInput(audioBase64);
      
    } catch (error) {
      console.error('Error recording audio:', error);
      this.onStatusCallback?.('Recording failed', 'error');
    }
  }

  private mergeAudioChunks(chunks: Float32Array[]): Float32Array {
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Float32Array(totalLength);
    let offset = 0;
    
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    
    return result;
  }

  private float32ArrayToBase64(buffer: Float32Array): string {
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

      const binaryString = atob(audioBase64);
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      const int16Array = new Int16Array(uint8Array.buffer);
      const audioBuffer = this.audioContext.createBuffer(1, int16Array.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < int16Array.length; i++) {
        channelData[i] = int16Array[i] / 32768.0;
      }

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();

      console.log('🔊 Playing Nova Sonic audio response');

    } catch (error) {
      console.error('Error playing audio response:', error);
    }
  }

  onTranscript(callback: (message: TranscriptMessage) => void) {
    this.onTranscriptCallback = callback;
  }

  onStatus(callback: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void) {
    this.onStatusCallback = callback;
  }

  static createFromBusinessConfig(config: SonicNovaConfig): NovaSessionConfig {
    return {
      systemPrompt: config.systemPrompt,
      voiceId: config.voiceSettings?.gender === 'female' ? 'tiffany' : 'tiffany',
      businessInfo: {
        name: config.agentName,
        personality: config.personality,
        knowledgeBase: config.knowledgeBase
      }
    };
  }

  disconnect() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.isSessionActive = false;
    this.sessionId = null;
    console.log('🧹 Nova Sonic HTTP client disconnected');
  }
}

// Helper to check if Nova Sonic is available
export function isNovaSonicAvailable(): boolean {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioContext = !!(typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');
  return hasMediaDevices && hasAudioContext;
}