import { useEffect, useState } from 'react';
import { usePerformance } from '@/hooks/usePerformance';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);
  
  usePerformance();

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }
        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: (entry as PerformanceEventTiming).processingStart - entry.startTime }));
        }
        if (entry.entryType === 'layout-shift') {
          setMetrics(prev => ({ ...prev, cls: (prev.cls || 0) + (entry as LayoutShift).value }));
        }
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          setMetrics(prev => ({ ...prev, ttfb: navEntry.responseStart - navEntry.requestStart }));
        }
      }
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });

    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono"
      >
        Perf
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-black/90 text-white p-4 rounded-lg text-xs font-mono min-w-[200px]">
          <h3 className="font-bold mb-2">Core Web Vitals</h3>
          <div className="space-y-1">
            <div className={`${(metrics.fcp || 0) < 1800 ? 'text-green-400' : (metrics.fcp || 0) < 3000 ? 'text-yellow-400' : 'text-red-400'}`}>
              FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}
            </div>
            <div className={`${(metrics.lcp || 0) < 2500 ? 'text-green-400' : (metrics.lcp || 0) < 4000 ? 'text-yellow-400' : 'text-red-400'}`}>
              LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}
            </div>
            <div className={`${(metrics.fid || 0) < 100 ? 'text-green-400' : (metrics.fid || 0) < 300 ? 'text-yellow-400' : 'text-red-400'}`}>
              FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}
            </div>
            <div className={`${(metrics.cls || 0) < 0.1 ? 'text-green-400' : (metrics.cls || 0) < 0.25 ? 'text-yellow-400' : 'text-red-400'}`}>
              CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </div>
            <div className={`${(metrics.ttfb || 0) < 800 ? 'text-green-400' : (metrics.ttfb || 0) < 1800 ? 'text-yellow-400' : 'text-red-400'}`}>
              TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;