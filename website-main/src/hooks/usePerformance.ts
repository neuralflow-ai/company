import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

export const usePerformance = () => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackMetrics = () => {
      const metrics: PerformanceMetrics = {};

      // First Contentful Paint (FCP)
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            if (lastEntry) {
              metrics.lcp = lastEntry.startTime;
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: PerformanceEntry & { name: string; processingStart?: number; startTime: number }) => {
              if (entry.name === 'first-input' && entry.processingStart) {
                metrics.fid = entry.processingStart - entry.startTime;
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
              if (!entry.hadRecentInput && entry.value) {
                clsValue += entry.value;
              }
            });
            metrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Log metrics after page load
          setTimeout(() => {
            console.log('Performance Metrics:', metrics);
            
            // You can send these metrics to your analytics service
            // Example: analytics.track('performance', metrics);
          }, 5000);
        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }
    };

    // Track metrics when page is loaded
    if (document.readyState === 'complete') {
      trackMetrics();
    } else {
      window.addEventListener('load', trackMetrics);
    }

    return () => {
      window.removeEventListener('load', trackMetrics);
    };
  }, []);

  // Preload critical resources
  const preloadResource = (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  };

  // Prefetch resources for next navigation
  const prefetchResource = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  return {
    preloadResource,
    prefetchResource,
  };
};