import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error('Error rendering App:', error);
    // Fallback to simple component
    const root = createRoot(rootElement);
    root.render(<div style={{ padding: '20px', background: 'orange', color: 'white' }}>
      <h1>App Error - Check console for details</h1>
    </div>);
  }
}
