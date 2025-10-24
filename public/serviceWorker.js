// public/sw.js (Simplified)
const self = this;

const CACHE_NAME = 'illegal-fishing-v1';
const API_CACHE_NAME = 'api-cache-v1';

const urlsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Handle incident types API - this is your actual endpoint
    if (event.request.url.includes('/api/report/incidentType')) {
        event.respondWith(
            caches.open(API_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Cache the response
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // Return cached version when offline
                        return cache.match(event.request).then(cachedResponse => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // Return fallback data if no cache
                            return new Response(JSON.stringify({
                                success: true,
                                data: [
                                    "Fishing without license",
                                    "Fishing in restricted area",
                                    "Using explosives",
                                    "Using cyanide",
                                    "Using banned nets",
                                    "Catching undersized fish",
                                    "Exceeding quota",
                                    "Targeting endangered species",
                                    "Illegal fish trade",
                                    "Foreign vessel intrusion"
                                ]
                            }), {
                                headers: { 'Content-Type': 'application/json' }
                            });
                        });
                    });
            })
        );
    } else {
        // Network-first for other requests
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
    }
});