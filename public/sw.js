const CACHE_NAME = 'neuralflow-ai-v1.2.0';
const STATIC_CACHE = 'neuralflow-static-v1.2.0';
const DYNAMIC_CACHE = 'neuralflow-dynamic-v1.2.0';
const IMAGE_CACHE = 'neuralflow-images-v1.2.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',

  '/robots.txt',
  '/sitemap.xml'
];

// Static assets to cache
const STATIC_ASSETS = [
  '/fonts/inter-var.woff2',
  '/fonts/exo-2-var.woff2',
  '/images/logo.webp',
  '/images/hero-bg.webp'
];

// API endpoints to cache with network-first strategy
const API_ENDPOINTS = [
  '/api/contact',
  '/api/newsletter',
  '/api/analytics'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching critical resources...');
        return cache.addAll(CRITICAL_RESOURCES.concat(STATIC_ASSETS));
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Strategy 2: Network First for API calls
    if (isApiCall(pathname)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 3: Stale While Revalidate for images
    if (isImage(pathname)) {
      return await staleWhileRevalidate(request, IMAGE_CACHE);
    }

    // Strategy 4: Network First with fallback for HTML pages
    if (isHtmlPage(request)) {
      return await networkFirstWithFallback(request, DYNAMIC_CACHE);
    }

    // Default: Network only for everything else
    return await fetch(request);

  } catch (error) {
    console.error('Fetch error:', error);
    
    // Return offline fallback for HTML pages
    if (isHtmlPage(request)) {
      return await getOfflineFallback();
    }
    
    throw error;
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Silently fail for background updates
  });
  
  return cachedResponse || await fetchPromise;
}

// Network First with Fallback
async function networkFirstWithFallback(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback
    return await getOfflineFallback();
  }
}

// Helper functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|woff2?|ttf|eot|ico|png|jpg|jpeg|gif|svg|webp)$/);
}

function isApiCall(pathname) {
  return pathname.startsWith('/api/') || API_ENDPOINTS.some(endpoint => pathname.startsWith(endpoint));
}

function isImage(pathname) {
  return pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/);
}

function isHtmlPage(request) {
  return request.headers.get('accept')?.includes('text/html');
}

async function getOfflineFallback() {
  const cache = await caches.open(STATIC_CACHE);
  return await cache.match('/') || new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>NeuralFlow AI - Offline</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .offline-message { max-width: 500px; margin: 0 auto; }
        .logo { width: 100px; height: 100px; margin: 0 auto 20px; }
      </style>
    </head>
    <body>
      <div class="offline-message">
        <div class="logo">🤖</div>
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>`,
    {
      headers: { 'Content-Type': 'text/html' }
    }
  );
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
  
  if (event.tag === 'newsletter-signup') {
    event.waitUntil(syncNewsletterSignup());
  }
});

async function syncContactForm() {
  // Handle offline contact form submissions
  const forms = await getStoredForms('contact-forms');
  
  for (const form of forms) {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      await removeStoredForm('contact-forms', form.id);
    } catch (error) {
      console.error('Failed to sync contact form:', error);
    }
  }
}

async function syncNewsletterSignup() {
  // Handle offline newsletter signups
  const signups = await getStoredForms('newsletter-signups');
  
  for (const signup of signups) {
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signup)
      });
      
      await removeStoredForm('newsletter-signups', signup.id);
    } catch (error) {
      console.error('Failed to sync newsletter signup:', error);
    }
  }
}

// IndexedDB helpers for offline form storage
async function getStoredForms(storeName) {
  // Simplified implementation - in production, use IndexedDB
  return [];
}

async function removeStoredForm(storeName, formId) {
  // Simplified implementation - in production, use IndexedDB
  return true;
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/placeholder.svg',
      badge: '/placeholder.svg',
    data: data.url,
    actions: [
      {
        action: 'open',
        title: 'Open',
        icon: '/placeholder.svg'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data || '/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    // Log performance metrics for monitoring
    console.log('Performance metrics:', event.data.metrics);
  }
});

console.log('NeuralFlow AI Service Worker loaded successfully');