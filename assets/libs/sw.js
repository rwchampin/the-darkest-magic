const cacheName = "threejs-editor";

const assets = ["./assets/"];

self.addEventListener("install", async function () {
  const cache = await caches.open(cacheName);

  assets.forEach(async function (asset) {
    try {
      await cache.add(asset);
    } catch {
      console.warn("[SW] Cound't cache:", asset);
    }
  });
});

self.addEventListener("fetch", async function (event) {
  const request = event.request;

  if (request.url.startsWith("chrome-extension")) return;

  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  try {
    let response = await fetch(request);

    if (
      request.url.endsWith("editor/") ||
      request.url.endsWith("editor/index.html")
    ) {
      // copied from coi-serviceworker

      const newHeaders = new Headers(response.headers);
      newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
      newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }

    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cachedResponse = await caches.match(request);

    if (cachedResponse === undefined) {
      console.warn("[SW] Not cached:", request.url);
    }

    return cachedResponse;
  }
}
