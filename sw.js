// Mude este número a cada deploy para forçar atualização do cache
const CACHE_NAME = 'dsync-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './supabase.js',
  './manifest.json',
  './logoDS.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // allSettled: se um arquivo falhar, o SW ainda instala
      Promise.allSettled(ASSETS.map(a => cache.add(a)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first: sempre tenta a versão nova; usa o cache só se estiver offline.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // CDN e Supabase passam direto

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});