#!/bin/bash

# Start Nova Sonic Voice Server for Ring4 AI Receptionist
echo "🚀 Starting Nova Sonic Voice Server..."

cd nova-sonic-server

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found in nova-sonic-server directory"
    echo "Please copy .env.example to .env and configure your AWS credentials"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing Nova Sonic server dependencies..."
    npm install
fi

# Start the server
echo "🎯 Starting server on port 3002..."
npm start