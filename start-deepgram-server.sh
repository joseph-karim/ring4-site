#!/bin/bash

echo "🚀 Starting Deepgram Voice Server..."

# Navigate to the Deepgram server directory
cd deepgram-voice-server

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🎯 Starting server on port 3003..."
npm start