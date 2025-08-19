import React, { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/fonts/inter-var.woff2',
        '/fonts/exo-2-var.woff2',
        '/images/hero-bg.webp',
        '/images/logo.webp'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        if (resource.includes('font')) {
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
        } else if (resource.includes('image')) {
          link.as = 'image';
        }
        
        document.head.appendChild(link);
      });
    };

    // Optimize images with lazy loading and WebP support
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;
              
              if (src) {
                // Check WebP support
                const supportsWebP = document.createElement('canvas')
                  .toDataURL('image/webp')
                  .indexOf('data:image/webp') === 0;
                
                if (supportsWebP && src.includes('.jpg') || src.includes('.png')) {
                  img.src = src.replace(/\.(jpg|png)$/, '.webp');
                } else {
                  img.src = src;
                }
                
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Implement service worker for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);
        } catch (registrationError) {
          console.log('SW registration failed: ', registrationError);
        }
      }
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.defer = true;
        document.head.appendChild(newScript);
      });
    };

    // Memory management for large datasets
    const optimizeMemoryUsage = () => {
      // Clean up unused event listeners
      const cleanup = () => {
        // Remove unused DOM elements
        const unusedElements = document.querySelectorAll('[data-cleanup]');
        unusedElements.forEach(el => el.remove());
      };

      // Run cleanup every 5 minutes
      setInterval(cleanup, 5 * 60 * 1000);
    };

    // CDN optimization
    const optimizeCDN = () => {
      // Preconnect to CDN domains
      const cdnDomains = [
        'https://cdn.neuralflow.cloud',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      cdnDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Database connection pooling simulation for high traffic
    const optimizeDataFetching = () => {
      // Implement request batching
      const requestQueue: Array<() => Promise<unknown>> = [];
      let isProcessing = false;

      const processQueue = async () => {
        if (isProcessing || requestQueue.length === 0) return;
        
        isProcessing = true;
        const batch = requestQueue.splice(0, 10); // Process 10 requests at a time
        
        try {
          await Promise.all(batch.map(request => request()));
        } catch (error) {
          console.error('Batch processing error:', error);
        }
        
        isProcessing = false;
        
        if (requestQueue.length > 0) {
          setTimeout(processQueue, 100); // Small delay between batches
        }
      };

      // Expose batch processor globally
      (window as Record<string, unknown>).addToRequestQueue = (request: () => Promise<unknown>) => {
        requestQueue.push(request);
        processQueue();
      };
    };

    // Critical rendering path optimization
    const optimizeCriticalRenderingPath = () => {
      // Inline critical CSS
      const criticalCSS = `
        .hero-section { display: flex; align-items: center; min-height: 100vh; }
        .nav-header { position: fixed; top: 0; width: 100%; z-index: 1000; }
        .loading-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    };

    // Initialize all optimizations
    const initializeOptimizations = async () => {
      preloadCriticalResources();
      optimizeImages();
      await registerServiceWorker();
      optimizeThirdPartyScripts();
      optimizeMemoryUsage();
      optimizeCDN();
      optimizeDataFetching();
      optimizeCriticalRenderingPath();
      
      setIsOptimized(true);
    };

    initializeOptimizations();

    // Cleanup on unmount
    return () => {
      // Clear intervals and observers
      const intervals = (window as Record<string, unknown>).performanceIntervals as number[] || [];
      intervals.forEach((interval: number) => clearInterval(interval));
    };
  }, []);

  // Add performance monitoring
  useEffect(() => {
    if (!isOptimized) return;

    const monitorPerformance = () => {
      // Monitor Core Web Vitals
      if ('web-vitals' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
        });
      }

      // Monitor memory usage
      if ('memory' in performance) {
        const memoryInfo = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (memoryInfo.usedJSHeapSize > memoryInfo.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected');
          // Trigger garbage collection if possible
          if ('gc' in window) {
            (window as Record<string, unknown> & { gc?: () => void }).gc?.();
          }
        }
      }
    };

    const performanceInterval = setInterval(monitorPerformance, 30000); // Check every 30 seconds
    (window as Record<string, unknown>).performanceIntervals = [((window as Record<string, unknown>).performanceIntervals as number[]) || [], performanceInterval].flat();

    return () => clearInterval(performanceInterval);
  }, [isOptimized]);

  return <>{children}</>;
};

export default PerformanceOptimizer;