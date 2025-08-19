import React, { createContext, useContext, useEffect, useState } from 'react';
import { cdnConfig, getCDNUrl, getOptimizedImageUrl, preloadCriticalResources } from '@/config/cdn';

interface CDNContextType {
  isEnabled: boolean;
  getCDNUrl: (path: string, type?: 'image' | 'asset' | 'font') => string;
  getOptimizedImageUrl: (src: string, width?: number, quality?: number, format?: 'webp' | 'avif' | 'jpg' | 'png') => string;
  preloadResource: (url: string, type: 'script' | 'style' | 'font' | 'image') => void;
  cdnHealth: boolean;
}

const CDNContext = createContext<CDNContextType | undefined>(undefined);

export const useCDN = () => {
  const context = useContext(CDNContext);
  if (!context) {
    throw new Error('useCDN must be used within a CDNProvider');
  }
  return context;
};

interface CDNProviderProps {
  children: React.ReactNode;
}

export const CDNProvider: React.FC<CDNProviderProps> = ({ children }) => {
  const [cdnHealth, setCdnHealth] = useState(true);
  const [isEnabled, setIsEnabled] = useState(cdnConfig.providers.cloudflare.enabled);

  // Check CDN health on mount
  useEffect(() => {
    const checkCDNHealth = async () => {
      try {
        const healthCheckUrl = getCDNUrl('/health-check.json');
        const response = await fetch(healthCheckUrl, {
          method: 'HEAD',
          cache: 'no-cache'
        });
        setCdnHealth(response.ok);
      } catch (error) {
        console.warn('CDN health check failed:', error);
        setCdnHealth(false);
      }
    };

    if (isEnabled) {
      checkCDNHealth();
      // Check health every 5 minutes
      const interval = setInterval(checkCDNHealth, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isEnabled]);

  // Preload critical resources on mount
  useEffect(() => {
    if (isEnabled && cdnHealth) {
      preloadCriticalResources();
    }
  }, [isEnabled, cdnHealth]);

  const preloadResource = (url: string, type: 'script' | 'style' | 'font' | 'image') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = isEnabled ? getCDNUrl(url) : url;
    link.as = type === 'font' ? 'font' : type === 'image' ? 'image' : type;
    
    if (type === 'font') {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  };

  const contextValue: CDNContextType = {
    isEnabled: isEnabled && cdnHealth,
    getCDNUrl: (path: string, type?: 'image' | 'asset' | 'font') => 
      isEnabled && cdnHealth ? getCDNUrl(path, type) : path,
    getOptimizedImageUrl: (src: string, width?: number, quality?: number, format?: 'webp' | 'avif' | 'jpg' | 'png') =>
      isEnabled && cdnHealth ? getOptimizedImageUrl(src, width, quality, format) : src,
    preloadResource,
    cdnHealth
  };

  return (
    <CDNContext.Provider value={contextValue}>
      {children}
    </CDNContext.Provider>
  );
};

export default CDNProvider;