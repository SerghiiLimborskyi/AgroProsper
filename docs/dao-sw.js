const CACHE_NAME = 'agroprosper-dao-v1';
const urlsToCache = [
  '/',
  '/DAO-suite-mobile.html',
  '/style.css',
  '/public/DAO-suite.js',
  '/public/directorBot.js',
  '/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
