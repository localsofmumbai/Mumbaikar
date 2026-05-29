const CACHE = 'mumbaikar-v6';
const ASSETS = [
  './',
  './index.html',
  './map.html',
  './about.html',
  './lines.html',
  './ticket.html',
  './tos.html',
  './privacy.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/LOM-ID.svg',
  './icons/screen-map.svg',
  './icons/thumb-hybrid.png',
  './icons/thumb-curve.png',
  './icons/lovemumbai-circle.svg',
  './icons/nav-map.svg',
  './icons/nav-suburban.svg',
  './icons/nav-ticket.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
