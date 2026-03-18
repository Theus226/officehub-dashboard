#!/bin/bash
set -e

echo "Installing dependencies..."
pnpm install

echo "Building server..."
cd server
npx tsc

echo "Build completed successfully!"
ls -la dist/server.js
