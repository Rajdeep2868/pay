import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL6X6M_JJ7ASeahgMCUyRVsmOifzEdVMI",
  authDomain: "easypay-4f113.firebaseapp.com",
  projectId: "easypay-4f113",
  storageBucket: "easypay-4f113.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "970452538410",
  appId: "1:970452538410:web:885c044a581a9218505f53",
  measurementId: "G-DFJEE50QGJ"
};

// Lazy initialization to avoid SSR issues
let app, auth, db, provider, analytics;
let setupOfflinePersistence: () => Promise<void>;

// Initialize Firebase only on client side
if (typeof window !== 'undefined') {
  try {
    // Initialize or get existing app
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    provider = new GoogleAuthProvider();
    
    // Configure Google Auth provider with custom parameters
    provider.setCustomParameters({
      // Allow redirects to work properly in production deployments
      prompt: 'select_account',
    });

    // Set auth persistence to LOCAL to survive page refreshes
    // Note: We import and use persistance in a try/catch to handle any issues
    import('firebase/auth').then(({ setPersistence, browserLocalPersistence }) => {
      setPersistence(auth, browserLocalPersistence).catch(error => {
        console.warn('Auth persistence setup failed:', error);
      });
    }).catch(error => {
      console.warn('Failed to import auth persistence:', error);
    });
    
    // Only initialize analytics if needed
    if (process.env.NODE_ENV === 'production') {
      import('firebase/analytics').then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
      }).catch(error => {
        console.warn('Analytics failed to load:', error);
      });
    }

    // Initialize Firestore with offline persistence
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
      })
    });

    // Set up offline capabilities
    setupOfflinePersistence = async () => {
      try {
        // Enable offline persistence
        await enableIndexedDbPersistence(db);
        console.log("Firestore offline persistence enabled");
      } catch (err) {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time
          console.warn("Multiple tabs open, offline persistence only works in one tab at a time");
        } else if (err.code === 'unimplemented') {
          // The current browser doesn't support offline persistence
          console.warn("This browser doesn't support offline persistence");
        } else {
          console.error("Error enabling offline persistence:", err);
        }
      }
    };
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

// Export Firebase modules with fallbacks for SSR
export { 
  app, 
  auth, 
  db, 
  provider, 
  analytics,
  setupOfflinePersistence 
}; 