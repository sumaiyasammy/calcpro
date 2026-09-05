const CACHE_NAME = "calcpro-v3";

const FILES_TO_CACHE = [
  
  "./",
  
  "./index.html",
  
  "./general.html",
  
  "./student.html",
  
  "./business.html",
  
  "./scientific.html",
  
  "./offline.html",
  
  "./manifest.json",
  
  "./icon-192.png",
  
  "./icon-512.png",
  
  /* JavaScript */
  
  "./history.js",
  
  "./calculator-core.js",
  
  "./calcpro-engine.js"
  
];


/* =====================================
   INSTALL
===================================== */

self.addEventListener(
  "install",
  event => {
    
    event.waitUntil(
      
      caches.open(CACHE_NAME)
      
      .then(cache => {
        
        return cache.addAll(
          FILES_TO_CACHE
        );
        
      })
      
    );
    
    self.skipWaiting();
    
  }
);


/* =====================================
   ACTIVATE
===================================== */

self.addEventListener(
  "activate",
  event => {
    
    event.waitUntil(
      
      caches.keys()
      
      .then(keys => {
        
        return Promise.all(
          
          keys
          
          .filter(
            key =>
            key !== CACHE_NAME
          )
          
          .map(
            key =>
            caches.delete(key)
          )
          
        );
        
      })
      
    );
    
    self.clients.claim();
    
  }
);


/* =====================================
   FETCH
===================================== */

self.addEventListener(
  "fetch",
  event => {
    
    if (
      event.request.method !== "GET"
    ) {
      
      return;
      
    }
    
    
    event.respondWith(
      
      caches.match(
        event.request
      )
      
      .then(cachedResponse => {
        
        /*
         * আগে Cache থেকে দেওয়ার চেষ্টা
         */
        
        if (cachedResponse) {
          
          /*
           * পাশাপাশি নতুন version
           * network থেকে আনার চেষ্টা
           */
          
          fetch(event.request)
            
            .then(networkResponse => {
              
              if (
                networkResponse &&
                networkResponse.status === 200
              ) {
                
                caches.open(
                    CACHE_NAME
                  )
                  .then(cache => {
                    
                    cache.put(
                      event.request,
                      networkResponse.clone()
                    );
                    
                  });
                
              }
              
            })
            .catch(() => {});
          
          
          return cachedResponse;
          
        }
        
        
        /*
         * Cache-এ না থাকলে Network
         */
        
        return fetch(
            event.request
          )
          
          .then(networkResponse => {
            
            if (
              networkResponse &&
              networkResponse.status === 200
            ) {
              
              const copy =
                networkResponse.clone();
              
              caches.open(
                  CACHE_NAME
                )
                .then(cache => {
                  
                  cache.put(
                    event.request,
                    copy
                  );
                  
                });
              
            }
            
            
            return networkResponse;
            
          })
          
          .catch(() => {
            
            /*
             * Network + Cache দুটোই
             * না থাকলে Offline page
             */
            
            return caches.match(
              "./offline.html"
            );
            
          });
        
      })
      
    );
    
  }
);