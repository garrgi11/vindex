#!/bin/bash

echo "🚀 Installing Vindex CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install globally
echo "🌍 Installing globally..."
npm install -g .

echo "✅ Vindex CLI installed successfully!"
echo ""
echo "🎯 Usage:"
echo "  vindex          # Start Vindex"
echo "  vindex --demo   # Run demo mode"
echo "  vindex --dark   # Use dark theme"
echo "  vindex --light  # Use light theme"
echo ""
echo "🚀 Happy prioritizing!" 