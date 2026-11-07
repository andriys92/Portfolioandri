// Service Worker sederhana: jaringan dulu, cadangan dari cache saat offline
const C = 'portfolio-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && (r.type === 'basic' || r.type === 'cors')) {
        const cp = r.clone();
        caches.open(C).then(c => c.put(e.request, cp));
      }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))
  );
});
