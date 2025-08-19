import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

interface FacebookPixelProps {
  pixelId: string;
}

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Facebook Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // NoScript fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      document.head.removeChild(script);
      if (noscript.parentNode) {
        document.body.removeChild(noscript);
      }
    };
  }, [pixelId]);

  // Track page views on route changes
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
      
      // Track custom events based on page
      const page = location.pathname.split('/')[1] || 'home';
      window.fbq('trackCustom', 'PageVisit', {
        page_name: page,
        page_url: window.location.href
      });
    }
  }, [location]);

  return null;
};

export default FacebookPixel;