#!/bin/bash

# CI Check Script - Ensures proper project structure
# This script fails if there are stray React files in the project root

echo "🔍 Checking project structure..."

# Check for stray React files in root
if [ -f "package.json" ] || [ -f "tsconfig.json" ] || [ -f "vite.config.ts" ] || [ -f "next.config.js" ] || [ -d "src" ] || [ -d "public" ]; then
    echo "❌ FAIL: Found stray React app files in project root!"
    echo "   Expected structure: /frontend (React app) and /backend (Django app)"
    echo "   Found violations:"
    
    [ -f "package.json" ] && echo "   - package.json (should be in /frontend)"
    [ -f "tsconfig.json" ] && echo "   - tsconfig.json (should be in /frontend)"
    [ -f "vite.config.ts" ] && echo "   - vite.config.ts (should be in /frontend)"
    [ -f "next.config.js" ] && echo "   - next.config.js (should be in /frontend)"
    [ -d "src" ] && echo "   - /src directory (should be in /frontend)"
    [ -d "public" ] && echo "   - /public directory (should be in /frontend)"
    
    echo ""
    echo "To fix this:"
    echo "1. Move React files to /frontend directory"
    echo "2. Remove duplicate files from root"
    echo "3. Run this check again"
    
    exit 1
fi

# Check that required directories exist
if [ ! -d "frontend" ]; then
    echo "❌ FAIL: /frontend directory not found!"
    exit 1
fi

if [ ! -d "backend" ]; then
    echo "❌ FAIL: /backend directory not found!"
    exit 1
fi

# Check that frontend has required files
if [ ! -f "frontend/package.json" ]; then
    echo "❌ FAIL: frontend/package.json not found!"
    exit 1
fi

# Check that backend has required files
if [ ! -f "backend/requirements.txt" ]; then
    echo "❌ FAIL: backend/requirements.txt not found!"
    exit 1
fi

echo "✅ PASS: Project structure is correct!"
echo "   - /frontend contains React app"
echo "   - /backend contains Django app"
echo "   - No stray files in root"
echo ""
echo "Ready for development! 🚀"