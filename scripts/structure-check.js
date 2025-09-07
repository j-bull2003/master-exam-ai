#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking project structure...\n');

let errors = 0;

// Check for prohibited files/directories in root
const prohibitedPaths = [
  'src',
  'public', 
  'vite.config.ts',
  'vite.config.js',
  'tailwind.config.ts',
  'tailwind.config.js',
  'tsconfig.app.json'
];

prohibitedPaths.forEach(pathName => {
  if (fs.existsSync(pathName)) {
    console.error(`❌ ERROR: Root /${pathName} found - should be in /frontend only`);
    errors++;
  }
});

// Check package.json doesn't have frontend dev scripts
if (fs.existsSync('package.json')) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts.dev && packageJson.scripts.dev.includes('vite')) {
      console.error('❌ ERROR: Root package.json contains vite dev script - should be workspace-only');
      errors++;
    }
  } catch (e) {
    console.warn('⚠️  WARNING: Could not parse root package.json');
  }
}

// Verify required directories exist
const requiredDirs = ['frontend', 'backend'];
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.error(`❌ ERROR: /${dir} directory missing`);
    errors++;
  }
});

// Verify required files exist
const requiredFiles = ['frontend/package.json', 'backend/requirements.txt'];
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ ERROR: ${file} missing`);
    errors++;
  }
});

if (errors > 0) {
  console.error(`\n❌ Project structure check failed with ${errors} errors`);
  console.error('The project structure is incorrect. Please consolidate duplicate React apps.');
  process.exit(1);
}

console.log('✅ Project structure check passed');
console.log('✅ Required directories and files present');
console.log('\n🎉 All checks successful!');