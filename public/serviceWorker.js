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
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/incident-types')) {

        event.respondWith(
            caches.open(API_CACHE_NAME).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        return caches.match(event.request);
                    });
            })
        );
    } else {

        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
    }
});