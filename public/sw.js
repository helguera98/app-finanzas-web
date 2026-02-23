// Minimal service worker for PWA installability
const CACHE_NAME = 'moneyos-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Simple pass-through for now
    event.respondWith(fetch(event.request));
});
