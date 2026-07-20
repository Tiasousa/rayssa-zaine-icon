// Service Worker mínimo — necessário para o Chrome/Android reconhecer
// este site como um PWA instalável (ícone próprio, abre sem navegador).

const CACHE = 'rz-massoterapia-v1';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icone.png'];

self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (evento) {
  evento.waitUntil(self.clients.claim());
});

// Serve do cache quando possível (só afeta esta página de atalho,
// nunca o sistema em si, que abre em outro domínio).
self.addEventListener('fetch', function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (resposta) {
      return resposta || fetch(evento.request);
    })
  );
});
