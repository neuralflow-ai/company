// CDN Configuration for NeuralFlow AI
export const cdnConfig = {
  // Primary CDN providers
  providers: {
    cloudflare: {
      enabled: true,
      baseUrl: 'https://cdn.neuralflow.cloud',
      zones: {
        images: 'https://images.neuralflow.cloud',
        assets: 'https://assets.neuralflow.cloud',
        fonts: 'https://fonts.neuralflow.cloud'
      },
      settings: {
        caching: {
          browserTTL: 31536000, // 1 year
          edgeTTL: 2592000, // 30 days
          developmentMode: false
        },
        compression: {
          gzip: true,
          brotli: true,
          minify: {
            css: true,
            js: true,
            html: true
          }
        },
        optimization: {
          imageOptimization: true,
          webpConversion: true,
          lazyLoading: true,
          criticalCSS: true
        }
      }
    },
    
    aws: {
      enabled: false,
      baseUrl: 'https://d1234567890.cloudfront.net',
      region: 'us-east-1',
      settings: {
        caching: {
          defaultTTL: 86400, // 24 hours
          maxTTL: 31536000, // 1 year
          minTTL: 0
        }
      }
    },
    
    vercel: {
      enabled: false,
      baseUrl: 'https://neuralflow-ai.vercel.app',
      settings: {
        edgeNetwork: true,
        compression: true,
        imageOptimization: true
      }
    }
  },

  // Asset optimization settings
  assets: {
    images: {
      formats: ['webp', 'avif', 'jpg', 'png'],
      sizes: [320, 640, 768, 1024, 1280, 1920],
      quality: 85,
      lazyLoad: true,
      placeholder: 'blur'
    },
    
    fonts: {
      preload: [
        '/fonts/inter-var.woff2',
        '/fonts/display-font.woff2'
      ],
      display: 'swap',
      fallbacks: {
        'Inter': 'system-ui, -apple-system, sans-serif',
        'Display': 'Georgia, serif'
      }
    },
    
    scripts: {
      defer: true,
      async: true,
      preload: [
        '/js/critical.js',
        '/js/vendor.js'
      ]
    },
    
    styles: {
      critical: true,
      inline: ['critical.css'],
      preload: ['main.css', 'components.css']
    }
  },

  // Performance monitoring
  monitoring: {
    realUserMonitoring: true,
    syntheticMonitoring: true,
    coreWebVitals: true,
    customMetrics: [
      'cdn_cache_hit_ratio',
      'cdn_response_time',
      'bandwidth_usage',
      'error_rate'
    ]
  },

  // Security settings
  security: {
    ssl: {
      enabled: true,
      minTlsVersion: '1.2',
      hsts: true,
      hstsMaxAge: 31536000
    },
    
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.neuralflow.cloud; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;"
    },
    
    hotlinkProtection: true,
    rateLimiting: {
      enabled: true,
      requestsPerMinute: 1000,
      burstLimit: 100
    }
  },

  // Geographic distribution
  regions: {
    primary: 'us-east-1',
    secondary: ['us-west-2', 'eu-west-1', 'ap-southeast-1'],
    edgeLocations: [
      'New York', 'Los Angeles', 'London', 'Frankfurt', 
      'Singapore', 'Tokyo', 'Sydney', 'São Paulo'
    ]
  },

  // Caching strategies
  caching: {
    static: {
      pattern: /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
      ttl: 31536000, // 1 year
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    },
    
    dynamic: {
      pattern: /\.(html|json|xml)$/,
      ttl: 3600, // 1 hour
      headers: {
        'Cache-Control': 'public, max-age=3600, must-revalidate'
      }
    },
    
    api: {
      pattern: /\/api\//,
      ttl: 300, // 5 minutes
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
      }
    }
  }
};

// CDN URL helpers
export const getCDNUrl = (path: string, type: 'image' | 'asset' | 'font' = 'asset'): string => {
  const provider = cdnConfig.providers.cloudflare;
  
  if (!provider.enabled) {
    return path;
  }
  
  switch (type) {
    case 'image':
      return `${provider.zones.images}${path}`;
    case 'font':
      return `${provider.zones.fonts}${path}`;
    default:
      return `${provider.zones.assets}${path}`;
  }
};

// Image optimization helper
export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  quality: number = 85,
  format: 'webp' | 'avif' | 'jpg' | 'png' = 'webp'
): string => {
  const provider = cdnConfig.providers.cloudflare;
  
  if (!provider.enabled || !provider.settings.optimization.imageOptimization) {
    return src;
  }
  
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  params.set('f', format);
  
  return `${provider.zones.images}${src}?${params.toString()}`;
};

// Preload critical resources
export const preloadCriticalResources = (): void => {
  const { fonts, scripts, styles } = cdnConfig.assets;
  
  // Preload fonts
  fonts.preload.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getCDNUrl(fontUrl, 'font');
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Preload critical scripts
  scripts.preload.forEach(scriptUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getCDNUrl(scriptUrl);
    link.as = 'script';
    document.head.appendChild(link);
  });
  
  // Preload critical styles
  styles.preload.forEach(styleUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getCDNUrl(styleUrl);
    link.as = 'style';
    document.head.appendChild(link);
  });
};

export default cdnConfig;