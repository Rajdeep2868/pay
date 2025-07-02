import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Using demo config that works without real Firebase
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id",
  measurementId: "G-DEMO123"
};

// Lazy initialization to avoid SSR issues
let app, auth, db, provider, analytics;

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
      prompt: 'select_account',
    });

    console.log("Firebase initialized successfully (demo mode)");
  } catch (error) {
    console.warn("Firebase initialization error (using demo mode):", error);
    // Create mock objects for demo
    auth = null;
    db = null;
    provider = null;
  }
}

// Export Firebase modules with fallbacks for SSR
export { 
  app, 
  auth, 
  db, 
  provider, 
  analytics
};