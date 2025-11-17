#!/bin/bash

# Foresight App Live - Quick Start Script

echo "🚀 Foresight App Live - Quick Start"
echo "===================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo ""
    echo "Please create .env.local from .env.example:"
    echo "  cp .env.example .env.local"
    echo ""
    echo "Then edit .env.local with your credentials."
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo ""
    echo "Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Check if container already exists
if docker ps -a | grep -q foresight-app; then
    echo "⚠️  Container 'foresight-app' already exists"
    echo ""
    read -p "Do you want to remove it and start fresh? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🗑️  Stopping and removing existing container..."
        docker stop foresight-app 2>/dev/null
        docker rm foresight-app 2>/dev/null
        echo "✅ Container removed"
        echo ""
    else
        echo "❌ Cancelled. Please remove the container manually or use a different name."
        exit 1
    fi
fi

# Pull latest image
echo "📥 Pulling latest Docker image..."
docker pull nematix/foresight-app-live:latest

if [ $? -ne 0 ]; then
    echo "❌ Failed to pull Docker image"
    exit 1
fi

echo "✅ Image pulled successfully"
echo ""

# Start container
echo "🐳 Starting container with volume mounts..."
docker run -d \
  --name foresight-app \
  -p 3000:3000 \
  -v "$(pwd)/agent/convo:/app/app/agent/convo" \
  -v "$(pwd)/public:/public" \
  nematix/foresight-app-live:latest

if [ $? -ne 0 ]; then
    echo "❌ Failed to start container"
    exit 1
fi

echo "✅ Container started successfully"
echo ""
echo "🎉 Foresight App Live is running!"
echo ""
echo "📍 Application URL: http://localhost:3000"
echo "📁 Volume mounts:"
echo "   • ./agent/convo → /app/agent/convo"
echo "   • ./public → /public"
echo ""
echo "📝 Useful commands:"
echo "   • View logs: docker logs -f foresight-app"
echo "   • Stop app: docker stop foresight-app"
echo "   • Restart app: docker restart foresight-app"
echo ""
echo "💡 Tip: Edit files in agent/convo/ or public/ - changes reflect immediately!"
echo ""
