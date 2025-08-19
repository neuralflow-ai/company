// Performance monitoring utilities for Core Web Vitals and SEO optimization

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  tti?: number; // Time to Interactive
}

interface NavigationTiming {
  dns: number;
  tcp: number;
  request: number;
  response: number;
  processing: number;
  load: number;
  total: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
    this.trackNavigationTiming();
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number;
          };
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          this.reportMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
              this.reportMetric('FCP', entry.startTime);
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer not supported');
      }
    }
  }

  private trackNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const timing: NavigationTiming = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            processing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
            load: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.navigationStart
          };

          this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
          this.reportNavigationTiming(timing);
        }
      }, 0);
    });
  }

  private reportMetric(name: string, value: number) {
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        non_interaction: true
      });
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${Math.round(value)}ms`);
    }

    // Send to custom analytics endpoint
    this.sendToAnalytics(name, value);
  }

  private reportNavigationTiming(timing: NavigationTiming) {
    Object.entries(timing).forEach(([key, value]) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation_timing', {
          event_category: 'Performance',
          event_label: key,
          value: Math.round(value),
          non_interaction: true
        });
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.table(timing);
    }
  }

  private async sendToAnalytics(metric: string, value: number) {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric,
          value: Math.round(value),
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      // Silently fail - don't impact user experience
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    const { fcp, lcp, fid, cls } = this.metrics;
    
    let score = 100;
    
    // FCP scoring (0-1800ms = good, 1800-3000ms = needs improvement, >3000ms = poor)
    if (fcp) {
      if (fcp > 3000) score -= 25;
      else if (fcp > 1800) score -= 15;
    }
    
    // LCP scoring (0-2500ms = good, 2500-4000ms = needs improvement, >4000ms = poor)
    if (lcp) {
      if (lcp > 4000) score -= 30;
      else if (lcp > 2500) score -= 20;
    }
    
    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (fid) {
      if (fid > 300) score -= 25;
      else if (fid > 100) score -= 15;
    }
    
    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (cls) {
      if (cls > 0.25) score -= 20;
      else if (cls > 0.1) score -= 10;
    }
    
    return Math.max(0, score);
  }

  public optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      // Add loading="lazy" if not present
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  public preloadCriticalResources() {
    const criticalResources = [
      '/fonts/inter-var.woff2',
      '/images/hero-bg.webp',
      '/images/logo.svg'
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.includes('.woff2')) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      } else if (resource.includes('.webp') || resource.includes('.jpg') || resource.includes('.png')) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const getPerformanceMonitor = (): PerformanceMonitor | null => {
  return performanceMonitor;
};

// Utility functions
export const measurePageLoad = (): Promise<number> => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve(performance.now());
    } else {
      window.addEventListener('load', () => {
        resolve(performance.now());
      });
    }
  });
};

export const measureResourceTiming = (resourceUrl: string): PerformanceResourceTiming | null => {
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  return resources.find(resource => resource.name.includes(resourceUrl)) || null;
};

export const optimizeForMobile = () => {
  // Reduce animations on mobile for better performance
  if (window.innerWidth < 768) {
    document.documentElement.style.setProperty('--animation-duration', '0.2s');
    document.documentElement.style.setProperty('--transition-duration', '0.1s');
  }
};

// Initialize on module load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initPerformanceMonitoring();
    optimizeForMobile();
  });
}

export default PerformanceMonitor;