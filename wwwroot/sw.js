importScripts(
  'workbox-sw.js',
);
// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
    debug: true,
});

workbox.core.skipWaiting();
// update Cache 
workbox.core.clientsClaim();

//workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);






workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
    // ... other entries ...
]);



// Cache any images which are included the extention list
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
    cacheName: "image-content",
    cacheableResponse: { statuses: [0, 200] }
  })
);



// Cache any JavaScript and CSS which are included the extention list
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "static-resources",
    cacheableResponse: { statuses: [0, 200] }
  })
);


// Cache any HTTP Content
//workbox.routing.registerRoute(
//    /(?!.*?browserLinkSignalR)^.*$/,
//    new workbox.strategies.NetworkOnly()
//);

// Ensure that requests that include /browserLinkSignalR/ go against the network.
workbox.routing.registerRoute(
    ({ url }) => url.pathname.includes('/browserLinkSignalR'),
    new workbox.strategies.NetworkOnly()
);

// Cache any HTTP Content
workbox.routing.registerRoute(
  /^http.*/,
    new workbox.strategies.NetworkFirst({
    cacheName: "http-content",
    cacheableResponse: { statuses: [0, 200] }
  }),
  "GET"
);


//// Cache any HTTP Content
//workbox.routing.registerRoute(
//    '/(^http)(?:(?!browserLinkSignalR).)*$/',
//    new workbox.strategies.StaleWhileRevalidate({
//        cacheName: "http-content",
//        cacheableResponse: { statuses: [0, 200] }
//    }),
//    "GET"
//);