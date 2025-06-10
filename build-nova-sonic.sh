#!/bin/bash

echo "🔨 Building Nova Sonic Server..."
echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la

echo "Navigating to nova-sonic-server directory..."
cd nova-sonic-server

echo "Current directory after cd: $(pwd)"
echo "Contents of nova-sonic-server:"
ls -la

echo "Installing dependencies..."
npm install

echo "✅ Build complete!"