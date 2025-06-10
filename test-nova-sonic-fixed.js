// Test Nova Sonic with corrected event format
import { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { NodeHttp2Handler } from "@smithy/node-http-handler";
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Testing Nova Sonic with Event Wrapper...');

const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    requestHandler: new NodeHttp2Handler({
        requestTimeout: 30000,
        sessionTimeout: 30000,
    }),
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Create input stream with event wrapper
async function* createInputStream() {
    const promptId = randomUUID();
    const contentId = randomUUID();
    
    // All events must be wrapped in "event" field
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    sessionStart: {
                        inferenceConfiguration: {
                            maxTokens: 1024,
                            topP: 0.9,
                            temperature: 0.7
                        }
                    }
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    promptStart: {
                        promptName: promptId,
                        textOutputConfiguration: {
                            mediaType: "text/plain"
                        },
                        audioOutputConfiguration: {
                            mediaType: "audio/lpcm",
                            sampleRateHertz: 24000,
                            sampleSizeBits: 16,
                            channelCount: 1,
                            voiceId: "matthew",
                            encoding: "base64",
                            audioType: "SPEECH"
                        }
                    }
                }
            }))
        }
    };

    // System prompt
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    contentStart: {
                        promptName: promptId,
                        contentName: contentId,
                        type: "TEXT",
                        interactive: false,
                        role: "SYSTEM",
                        textInputConfiguration: {
                            mediaType: "text/plain"
                        }
                    }
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    textInput: {
                        promptName: promptId,
                        contentName: contentId,
                        content: "You are a helpful assistant."
                    }
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    contentEnd: {
                        promptName: promptId,
                        contentName: contentId
                    }
                }
            }))
        }
    };

    // Keep session open for interactive audio
    const audioContentId = randomUUID();
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    contentStart: {
                        promptName: promptId,
                        contentName: audioContentId,
                        type: "AUDIO",
                        interactive: true,
                        role: "USER",
                        audioInputConfiguration: {
                            mediaType: "audio/lpcm",
                            sampleRateHertz: 16000,
                            sampleSizeBits: 16,
                            channelCount: 1,
                            encoding: "base64"
                        }
                    }
                }
            }))
        }
    };

    // Send a small silent audio chunk to satisfy the content requirement
    const silentAudio = Buffer.alloc(1600).toString('base64'); // 100ms of silence at 16kHz
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    audioInput: {
                        promptName: promptId,
                        contentName: audioContentId,
                        content: silentAudio
                    }
                }
            }))
        }
    };

    // End the audio content
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    contentEnd: {
                        promptName: promptId,
                        contentName: audioContentId
                    }
                }
            }))
        }
    };

    // End the prompt
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    promptEnd: {
                        promptName: promptId
                    }
                }
            }))
        }
    };

    // End the session
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                event: {
                    sessionEnd: {}
                }
            }))
        }
    };

    console.log('✅ All events sent with correct format');
}

async function testNovaSonic() {
    try {
        const command = new InvokeModelWithBidirectionalStreamCommand({
            modelId: "amazon.nova-sonic-v1:0",
            body: createInputStream()
        });

        console.log('📡 Sending to AWS Bedrock...');
        const response = await bedrockClient.send(command);

        console.log('✅ Success! Processing response stream...');
        
        for await (const event of response.body) {
            if (event.chunk?.bytes) {
                const textResponse = new TextDecoder().decode(event.chunk.bytes);
                const jsonResponse = JSON.parse(textResponse);
                console.log('📨 Event:', Object.keys(jsonResponse)[0]);
            }
        }

        console.log('✅ Test passed!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('event')) {
            console.error('   Still having event format issues');
        }
    }
}

testNovaSonic();