// Offline cache for the MRT page. Page + data: network first (3.5 s), cached copy when the signal is bad.
// Photos (Wikimedia thumbnails): cached the first time they are seen.
const PAGES = "mrt-pages-v2", PHOTOS = "mrt-photos-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (![PAGES, PHOTOS].includes(k)) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.hostname.endsWith(".wikimedia.org")) e.respondWith(photo(r));
  else if (u.origin === location.origin) e.respondWith(page(r, u));
});
async function page(r, u){
  const c = await caches.open(PAGES);
  // scripts and data: always check with the server (a quick 304 when nothing changed); pages keep the normal request
  const net = fetch(r.mode === "navigate" ? r : new Request(r, {cache: "no-cache"})).then(async res => {
    if (res.ok){
      for (const k of await c.keys()) if (new URL(k.url).pathname === u.pathname && k.url !== r.url) c.delete(k);  // old ?v= copies
      await c.put(r, res.clone());
    }
    return res;
  });
  const old = await c.match(r, {ignoreSearch: true});
  if (!old) return net;
  return Promise.race([net.catch(() => old), new Promise(ok => setTimeout(() => ok(old), 3500))]);
}
async function photo(r){
  const c = await caches.open(PHOTOS);
  const hit = await c.match(r.url);
  if (hit) return hit;
  try {
    const res = await fetch(r.url, {mode: "cors", credentials: "omit", referrerPolicy: "no-referrer"});
    if (res.ok) await c.put(r.url, res.clone());
    return res;
  } catch (err) { return fetch(r); }
}
