self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("planner").then(cache =>
      cache.addAll([
        "./",
        "./page.html",
        "./stylin.css",
        "./load.js"
      ])
    )
  );
});
