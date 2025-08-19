import React from 'react';
import { Helmet } from 'react-helmet-async';

const ResourceHints: React.FC = () => {
  return (
    <Helmet>
      {/* DNS Prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="//unpkg.com" />

      {/* Preconnect for critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />

      {/* Preload critical images */}
      <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
      <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

      {/* Preload critical JavaScript modules */}
      <link rel="modulepreload" href="/src/main.tsx" />
      <link rel="modulepreload" href="/src/App.tsx" />
      <link rel="modulepreload" href="/src/pages/Index.tsx" />

      {/* Prefetch likely next pages */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/blog" />

      {/* Resource hints for performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* Preload critical CSS */}
      <style>{`
        /* Critical above-the-fold styles */
        body { 
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          margin: 0;
          background: #111827;
          color: #fff;
        }
        .hero-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* Performance hints */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Cache control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
    </Helmet>
  );
};

export default ResourceHints;