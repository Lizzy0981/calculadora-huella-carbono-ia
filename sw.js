/* Service Worker — Calculadora de Huella de Carbono de IA (Díaz Familia, 2026)
   Estrategia: network-first para la app (siempre la versión más nueva, con respaldo offline),
   stale-while-revalidate para CDN/fuentes. No cachea ipapi.co ni ElectricityMaps (datos personales / token). */
const VERSION = 'v1.3.1';
const CACHE = 'ai-carbon-' + VERSION;
const CORE = ['./', './index.html', './manifest.json', './assets/favicon.svg', './assets/favicon.png'];
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ai-carbon-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putIfOk(req, res) {
  if (res && (res.ok || res.type === 'opaque')) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
  }
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // APIs con datos personales o token: nunca por el caché del SW
  if (url.hostname === 'ipapi.co' || url.hostname.endsWith('electricitymaps.com')) return;

  // Intensidad de carbono UK (datos públicos): red primero, caché como respaldo
  if (url.hostname === 'api.carbonintensity.org.uk') {
    e.respondWith(fetch(req).then((r) => putIfOk(req, r)).catch(() => caches.match(req)));
    return;
  }

  // La app (mismo origen): red primero, caché como respaldo offline
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then((r) => putIfOk(req, r))
        .catch(() => caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  // CDN y fuentes: stale-while-revalidate
  if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const net = fetch(req).then((r) => putIfOk(req, r)).catch(() => hit);
        return hit || net;
      })
    );
  }
});
