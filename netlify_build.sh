#!/bin/bash
# Custom build script for Netlify that avoids postinstall issues

set -e

echo "Node version:"
node -v

echo "NPM version:"
npm -v

echo "Installing main project dependencies..."
npm ci --ignore-scripts

echo "Building the project..."
npm run build

echo "Build completed successfully!" 