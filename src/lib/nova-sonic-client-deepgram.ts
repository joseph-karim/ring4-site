// Nova Sonic Client API - Deepgram Implementation
// This maintains the same interface as nova-sonic-client.ts but uses Deepgram

import { DeepgramVoiceClient, TranscriptMessage as DeepgramTranscript } from './deepgram-voice-client';
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
  private deepgramClient: DeepgramVoiceClient;
  private onTranscriptCallback?: (message: TranscriptMessage) => void;
  private onStatusCallback?: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void;
  
  constructor(serverUrl?: string) {
    // Use Deepgram server URL from environment or default
    const deepgramUrl = serverUrl || (import.meta as any).env?.VITE_DEEPGRAM_URL || 'http://localhost:3000';
    this.deepgramClient = new DeepgramVoiceClient(deepgramUrl);
    
    // Set up pass-through callbacks
    this.deepgramClient.onTranscript((message: DeepgramTranscript) => {
      // Filter out interim results for compatibility
      if (!message.interim) {
        this.onTranscriptCallback?.(message);
      }
    });
    
    this.deepgramClient.onStatus((status, type) => {
      this.onStatusCallback?.(status, type);
    });
  }

  async initializeSession(config: NovaSessionConfig = {}) {
    await this.deepgramClient.initializeSession({
      systemPrompt: config.systemPrompt,
      voiceId: config.voiceId,
      businessInfo: config.businessInfo
    });
  }

  startRecording() {
    this.deepgramClient.startRecording();
  }

  stopRecording() {
    this.deepgramClient.stopRecording();
  }

  // Event listener setters - maintain same interface
  onTranscript(callback: (message: TranscriptMessage) => void) {
    this.onTranscriptCallback = callback;
  }

  onAudioResponse(_callback: (audio: AudioResponse) => void) {
    // Deepgram doesn't use this pattern, audio is played automatically
    // Keeping for interface compatibility
  }

  onStatus(callback: (status: string, type?: 'connected' | 'recording' | 'processing' | 'error') => void) {
    this.onStatusCallback = callback;
  }

  // Integration helper for existing Ring4 components
  static createFromBusinessConfig(config: SonicNovaConfig): NovaSessionConfig {
    return {
      systemPrompt: config.systemPrompt,
      voiceId: 'aura-asteria-en', // Deepgram voice
      businessInfo: {
        name: config.agentName,
        personality: config.personality,
        knowledgeBase: config.knowledgeBase
      }
    };
  }

  disconnect() {
    this.deepgramClient.disconnect();
  }
}

// Re-export helper functions with same names
export function isNovaSonicAvailable(): boolean {
  const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const hasAudioContext = !!(typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined');
  return hasMediaDevices && hasAudioContext;
}

export async function testNovaSonicConnection(serverUrl?: string): Promise<boolean> {
  // Test connection to Deepgram server
  const url = serverUrl || (import.meta as any).env?.VITE_DEEPGRAM_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${url}/health`);
    return response.ok;
  } catch {
    return false;
  }
}