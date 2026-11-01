// Kill switch replacing the old create-react-app service worker.
// That one cached the previous portfolio and served index.html for every
// navigation, so without this, browsers that visited before would keep seeing
// the old site at these new URLs. This unregisters itself and clears caches.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) {
        client.navigate(client.url);
      }
    })(),
  );
});
