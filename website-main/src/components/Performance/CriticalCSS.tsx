import React, { useEffect } from 'react';

const CriticalCSS: React.FC = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical CSS for immediate rendering */
      body {
        margin: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background-color: #111827;
        color: #ffffff;
        line-height: 1.6;
      }
      
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
      }
      
      .hero-title {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 800;
        text-align: center;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        text-align: center;
        margin-bottom: 2rem;
        opacity: 0.9;
      }
      
      .cta-button {
        display: inline-block;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: transform 0.2s ease;
      }
      
      .cta-button:hover {
        transform: translateY(-2px);
      }
      
      .header {
        position: fixed;
        top: 0;
        width: 100%;
        background: rgba(17, 24, 39, 0.95);
        backdrop-filter: blur(10px);
        z-index: 1000;
        padding: 1rem 0;
      }
      
      .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: #60a5fa;
      }
      
      .nav-menu {
        display: flex;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      
      .nav-link {
        color: #e5e7eb;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
      }
      
      .nav-link:hover {
        color: #60a5fa;
      }
      
      /* Loading states */
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #374151;
        border-top: 4px solid #60a5fa;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 2rem auto;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Performance optimizations */
      * {
        box-sizing: border-box;
      }
      
      img {
        max-width: 100%;
        height: auto;
      }
      
      .lazy-load {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lazy-load.loaded {
        opacity: 1;
      }
    `;

    // Create and inject critical CSS
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);

    // Preload non-critical CSS
    const preloadCSS = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    };

    // Preload main stylesheet after critical CSS is loaded
    setTimeout(() => {
      preloadCSS('/src/index.css');
    }, 100);

    return () => {
      // Cleanup critical CSS on unmount
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSS;