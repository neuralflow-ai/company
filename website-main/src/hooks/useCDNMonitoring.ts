import { useState, useEffect, useCallback } from 'react';
import { cdnConfig } from '@/config/cdn';

interface CDNMetrics {
  cacheHitRatio: number;
  responseTime: number;
  bandwidthUsage: number;
  errorRate: number;
  availability: number;
  lastChecked: Date;
}

interface CDNMonitoringHook {
  metrics: CDNMetrics | null;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  refreshMetrics: () => Promise<void>;
}

export const useCDNMonitoring = (): CDNMonitoringHook => {
  const [metrics, setMetrics] = useState<CDNMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const measureResponseTime = async (url: string): Promise<number> => {
    const startTime = performance.now();
    try {
      await fetch(url, { method: 'HEAD', cache: 'no-cache' });
      return performance.now() - startTime;
    } catch (error) {
      return -1; // Error indicator
    }
  };

  const checkCDNHealth = async (): Promise<boolean> => {
    try {
      const response = await fetch('https://cdn.neuralflow.cloud/health-check.json', {
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const collectMetrics = useCallback(async (): Promise<CDNMetrics> => {
    const testUrls = [
      'https://cdn.neuralflow.cloud/test-asset.js',
      'https://images.neuralflow.cloud/test-image.jpg',
      'https://fonts.neuralflow.cloud/test-font.woff2'
    ];

    const responseTimes = await Promise.all(
      testUrls.map(url => measureResponseTime(url))
    );

    const validResponseTimes = responseTimes.filter(time => time > 0);
    const avgResponseTime = validResponseTimes.length > 0 
      ? validResponseTimes.reduce((sum, time) => sum + time, 0) / validResponseTimes.length
      : 0;

    const errorRate = (responseTimes.length - validResponseTimes.length) / responseTimes.length;
    const availability = await checkCDNHealth() ? 100 : 0;

    // Simulate cache hit ratio and bandwidth (in production, these would come from CDN APIs)
    const cacheHitRatio = Math.random() * 20 + 80; // 80-100%
    const bandwidthUsage = Math.random() * 1000 + 500; // 500-1500 MB

    return {
      cacheHitRatio,
      responseTime: avgResponseTime,
      bandwidthUsage,
      errorRate: errorRate * 100,
      availability,
      lastChecked: new Date()
    };
  }, []);

  const refreshMetrics = useCallback(async () => {
    try {
      const newMetrics = await collectMetrics();
      setMetrics(newMetrics);
    } catch (error) {
      console.error('Failed to collect CDN metrics:', error);
    }
  }, [collectMetrics]);

  const startMonitoring = useCallback(() => {
    if (isMonitoring) return;

    setIsMonitoring(true);
    
    // Initial metrics collection
    refreshMetrics();

    // Set up periodic monitoring (every 5 minutes)
    const id = setInterval(refreshMetrics, 5 * 60 * 1000);
    setIntervalId(id);
  }, [isMonitoring, refreshMetrics]);

  const stopMonitoring = useCallback(() => {
    if (!isMonitoring) return;

    setIsMonitoring(false);
    
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isMonitoring, intervalId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Auto-start monitoring if CDN is enabled
  useEffect(() => {
    if (cdnConfig.monitoring.realUserMonitoring && cdnConfig.providers.cloudflare.enabled) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    refreshMetrics
  };
};

export default useCDNMonitoring;