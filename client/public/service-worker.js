const CACHE_NAME = 'fia-global-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on service worker install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/index.css',
  '/src/main.tsx',
];

// Install event - precache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// API requests - network first with cache fallback
const apiCacheStrategy = async (request) => {
  // Try network first
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Fetch failed; returning cached response instead.', error);
  }

  // If network fails, try cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // If both network and cache fail and it's an API request, return a custom response
  return new Response(JSON.stringify({ 
    error: 'You are offline and the request is not cached.',
    offlineMode: true
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

// Page/asset requests - cache first with network fallback
const cacheFirstStrategy = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network request failed', error);
  }

  // If it's a page navigation request and we're offline, show offline page
  if (request.mode === 'navigate') {
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
  }

  // If all else fails
  return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
};

// Fetch event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Special handling for API requests
  if (url.pathname.startsWith('/api')) {
    event.respondWith(apiCacheStrategy(event.request));
    return;
  }
  
  // For all other requests (pages, assets)
  event.respondWith(cacheFirstStrategy(event.request));
});

// Sync event for background syncing
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending-requests') {
    event.waitUntil(syncPendingRequests());
  }
});

// Function to sync pending requests when online
const syncPendingRequests = async () => {
  try {
    const db = await openDatabase();
    const tx = db.transaction('pendingSync', 'readonly');
    const pendingRequests = await tx.objectStore('pendingSync').getAll();
    
    for (const request of pendingRequests) {
      try {
        // Send the request to the server
        const response = await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: request.body ? JSON.stringify(request.body) : undefined
        });
        
        if (response.ok) {
          // If successful, remove from pending queue
          const deleteTx = db.transaction('pendingSync', 'readwrite');
          await deleteTx.objectStore('pendingSync').delete(request.id);
        }
      } catch (error) {
        console.error('Failed to sync request:', error);
      }
    }
  } catch (error) {
    console.error('Error during sync:', error);
  }
};

// Helper function to open IndexedDB
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('fia_global_db', 1);
    
    request.onerror = (event) => {
      reject('Error opening database');
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pendingSync')) {
        db.createObjectStore('pendingSync', { keyPath: 'id' });
      }
    };
  });
};

// Register periodic sync if supported (PWA enhancements)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'sync-data') {
      event.waitUntil(syncPendingRequests());
    }
  });
}
