// Test Nova Sonic locally to see detailed errors
import { BedrockRuntimeClient, InvokeModelWithBidirectionalStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { NodeHttp2Handler } from "@smithy/node-http-handler";
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Testing Nova Sonic Bidirectional Stream Locally...');
console.log('🔑 AWS Region:', process.env.AWS_REGION || 'us-east-1');
console.log('🔑 AWS Access Key:', process.env.AWS_ACCESS_KEY_ID ? '✅ Set' : '❌ Not set');

// Create AWS client
const nodeHttp2Handler = new NodeHttp2Handler({
    requestTimeout: 30000,
    sessionTimeout: 30000,
});

const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    requestHandler: nodeHttp2Handler,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

// Create simple input stream
async function* createInputStream() {
    const promptId = randomUUID();
    const contentId = randomUUID();
    
    console.log('\n📤 Sending sessionStart...');
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                sessionStart: {
                    inferenceConfiguration: {
                        maxTokens: 1024,
                        topP: 0.9,
                        temperature: 0.7
                    }
                }
            }))
        }
    };

    console.log('📤 Sending promptStart...');
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                promptStart: {
                    promptId: promptId,
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
            }))
        }
    };

    console.log('📤 Sending system content...');
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                contentStart: {
                    promptId: promptId,
                    contentId: contentId,
                    type: "TEXT",
                    interactive: false,
                    role: "SYSTEM",
                    textInputConfiguration: {
                        mediaType: "text/plain"
                    }
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                textInput: {
                    promptId: promptId,
                    contentId: contentId,
                    content: "You are a helpful assistant."
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                contentEnd: {
                    promptId: promptId,
                    contentId: contentId
                }
            }))
        }
    };

    console.log('📤 Sending user content...');
    const userContentId = randomUUID();
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                contentStart: {
                    promptId: promptId,
                    contentId: userContentId,
                    type: "TEXT",
                    interactive: false,
                    role: "USER",
                    textInputConfiguration: {
                        mediaType: "text/plain"
                    }
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                textInput: {
                    promptId: promptId,
                    contentId: userContentId,
                    content: "Say hello"
                }
            }))
        }
    };

    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                contentEnd: {
                    promptId: promptId,
                    contentId: userContentId
                }
            }))
        }
    };

    console.log('📤 Sending promptEnd...');
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                promptEnd: {
                    promptId: promptId
                }
            }))
        }
    };

    console.log('📤 Sending sessionEnd...');
    yield {
        chunk: {
            bytes: new TextEncoder().encode(JSON.stringify({
                sessionEnd: {}
            }))
        }
    };
}

async function testNovaSonic() {
    try {
        console.log('\n🚀 Creating bidirectional stream command...');
        
        const command = new InvokeModelWithBidirectionalStreamCommand({
            modelId: "amazon.nova-sonic-v1:0",
            body: createInputStream()
        });

        console.log('📡 Sending command to AWS Bedrock...');
        const response = await bedrockClient.send(command);

        console.log('\n✅ Response received! Processing stream...');
        
        let eventCount = 0;
        for await (const event of response.body) {
            eventCount++;
            console.log(`\n📨 Event #${eventCount}:`);
            
            if (event.chunk?.bytes) {
                const textResponse = new TextDecoder().decode(event.chunk.bytes);
                const jsonResponse = JSON.parse(textResponse);
                console.log('   Type:', Object.keys(jsonResponse)[0]);
                console.log('   Data:', JSON.stringify(jsonResponse, null, 2).substring(0, 200) + '...');
            } else {
                console.log('   Non-chunk event:', Object.keys(event));
            }
        }

        console.log(`\n✅ Stream completed! Received ${eventCount} events`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('   Error name:', error.name);
        console.error('   Error code:', error.code);
        console.error('   Status code:', error.$metadata?.httpStatusCode);
        console.error('   Request ID:', error.$metadata?.requestId);
        
        if (error.message.includes('credential')) {
            console.error('\n⚠️  This appears to be a credentials issue. Check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
        } else if (error.message.includes('region')) {
            console.error('\n⚠️  This appears to be a region issue. Make sure you\'re using the correct AWS_REGION');
        }
    }
}

testNovaSonic().then(() => process.exit(0)).catch(() => process.exit(1));