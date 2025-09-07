import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 main.tsx loaded - checking root element');
const rootElement = document.getElementById("root");
console.log('📍 Root element found:', !!rootElement);

if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;">ERROR: Root element not found. Check index.html</div>';
} else {
  console.log('✅ Creating React root and rendering App...');
  try {
    createRoot(rootElement).render(<App />);
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering App:', error);
    document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;">ERROR: ' + error + '</div>';
  }
}
