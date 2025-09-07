console.log('🚀 main.tsx starting to load...');

import { createRoot } from 'react-dom/client';
console.log('📦 React imported successfully');

import App from './App.tsx';
console.log('📱 App imported successfully');

import './index.css';
console.log('💄 CSS imported successfully');

console.log('✅ All imports successful');

try {
  console.log('🔍 Looking for root element...');
  const rootElement = document.getElementById("root");
  console.log('Root element found:', rootElement);

  if (rootElement) {
    console.log('🏗️ Creating React root...');
    const root = createRoot(rootElement);
    
    console.log('🎨 Rendering simple test first...');
    // Render a simple test component first
    root.render(
      <div style={{ 
        padding: '20px', 
        fontSize: '18px', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh'
      }}>
        <h1>🎯 Test Render Successful!</h1>
        <p>If you see this, React is working correctly.</p>
        <p>Loading full app in 3 seconds...</p>
      </div>
    );
    
    // Load the full app after a delay
    setTimeout(() => {
      console.log('🚀 Loading full App component...');
      root.render(<App />);
    }, 3000);
    
  } else {
    console.error('❌ Root element not found!');
    document.body.innerHTML = '<h1 style="color: red; padding: 20px;">ERROR: Root element not found!</h1>';
  }
} catch (error) {
  console.error('💥 Critical error in main.tsx:', error);
  document.body.innerHTML = `<h1 style="color: red; padding: 20px;">ERROR: ${error}</h1>`;
}
