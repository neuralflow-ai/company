import React, { useEffect } from 'react';
import { initPerformanceMonitoring, getPerformanceMonitor } from '../../utils/performanceMonitoring';

interface PerformanceOptimizerProps {
  enablePreloading?: boolean;
  enableImageOptimization?: boolean;
  enableCriticalResourceHints?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enablePreloading = true,
  enableImageOptimization = true,
  enableCriticalResourceHints = true,
}) => {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initPerformanceMonitoring();

    // Preload critical resources
    if (enablePreloading) {
      monitor.preloadCriticalResources();
    }

    // Optimize images
    if (enableImageOptimization) {
      monitor.optimizeImages();
    }

    // Add critical resource hints
    if (enableCriticalResourceHints) {
      const head = document.head;

      // Preconnect to critical domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com',
        'https://connect.facebook.net',
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        head.appendChild(link);
      });

      // DNS prefetch for external resources
      const dnsPrefetchDomains = [
        'https://cdn.jsdelivr.net',
        'https://unpkg.com',
        'https://cdnjs.cloudflare.com',
      ];

      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        head.appendChild(link);
      });
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          
          // Track navigation timing
          const metrics = {
            dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            tcp: navEntry.connectEnd - navEntry.connectStart,
            request: navEntry.responseStart - navEntry.requestStart,
            response: navEntry.responseEnd - navEntry.responseStart,
            dom: navEntry.domContentLoadedEventEnd - navEntry.responseEnd,
            load: navEntry.loadEventEnd - navEntry.loadEventStart,
          };

          console.log('Navigation Timing:', metrics);
          
          // Send to analytics if available
          if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
              name: 'navigation',
              value: Math.round(navEntry.loadEventEnd - navEntry.fetchStart),
            });
          }
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [enablePreloading, enableImageOptimization, enableCriticalResourceHints]);

  // This component doesn't render anything visible
  return null;
};

export default PerformanceOptimizer;