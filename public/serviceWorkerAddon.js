/**
 * Will be imported into our service worker
 */


/**
 * This handler intercepts all GET requests and either responds with a
 * cached version of the resource or fetches the original one and then
 * adds it to the cache.
 * 
 * This is called "on network response" in
 * https://jakearchibald.com/2014/offline-cookbook/#on-network-response
 * 
 * We whitelist the URLs to cache in this manner.
 */
self.addEventListener('fetch', function(event) {
  var shouldRespond = false;
  if (event.request.method === 'GET') {
    // API
    if (event.request.url.indexOf('/api/v1/') !== -1) {
      // exclude our freshness check from cache
      if (event.request.url.indexOf('/api/v1/spider-results/last-updated/') === -1) {
        shouldRespond = true;
      }
    }

    // webfonts
    else if (event.request.url.indexOf('https://netzbegruenung.github.io/webfonts/') !== -1) {
      shouldRespond = true;
    }

    // ionicons
    else if (event.request.url.indexOf('https://unpkg.com/ionicons') !== -1) {
      shouldRespond = true;
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(event.request.url)).then(function(response) {
            return response || fetch(event.request).then(function(response) {
              console.log("Fetching and caching resource", event.request.url);
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    }
  }
});


/**
 * Pre-fetch some static resources on service worker installation.
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Pre-fetching some resources on SW install');
      return cache.addAll([
        'https://netzbegruenung.github.io/webfonts/fonts/Arvo_Gruen_2015_10.woff',
        'https://unpkg.com/ionicons@4.4.3/dist/fonts/ionicons.woff2',
        'https://netzbegruenung.github.io/webfonts/fonts/arvo_regular.woff',
        'https://netzbegruenung.github.io/webfonts/style.css',
        'https://unpkg.com/ionicons@4.4.3/dist/css/ionicons.min.css'
      ]);
    })
  );
});
