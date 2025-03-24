"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  setDisplayName: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      // Import necessary functions
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        // First set up the auth state listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
          setLoading(false);
        }, (authError) => {
          console.error("Auth state change error:", authError);
          setError(authError.message);
          setLoading(false);
        });
        
        return () => unsubscribe();
      }).catch(error => {
        console.error("Failed to import auth functions:", error);
        setError("Authentication service unavailable");
        setLoading(false);
      });
    } catch (error) {
      console.error("Auth subscription error:", error);
      setError(error instanceof Error ? error.message : "Authentication service unavailable");
      setLoading(false);
      return () => {}; // Return empty cleanup function
    }
  }, [router]);

  const signIn = async () => {
    try {
      // Add a loading state to provide feedback to user
      setLoading(true);
      
      console.log('Starting Google sign-in process...');
      
      // Check if we're in a mobile browser
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // Track the sign-in event
      console.log(`Using ${isMobile ? 'mobile' : 'desktop'} sign-in strategy`);
      
      // Use signInWithPopup for better compatibility on both mobile and desktop
      const result = await signInWithPopup(auth, provider).catch((popupError) => {
        console.error('Popup sign-in error:', popupError);
        
        // If we got a popup blocked error, we can try redirect method
        if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
          console.log('Popup was blocked or closed, trying alternative method...');
          
          // Import and use signInWithRedirect as a fallback
          import('firebase/auth').then(({ signInWithRedirect }) => {
            signInWithRedirect(auth, provider);
          });
          
          throw new Error('Using redirect method. Please wait for page redirect...');
        }
        
        throw popupError;
      });
      
      // If we reach here, the popup sign-in was successful
      const user = result.user;
      console.log('Google sign-in successful', { uid: user.uid, email: user.email });
      
      try {
        // Check if this is a new user by looking for their document in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          // Create a new user document
          console.log('Creating new user document in Firestore');
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date(),
          });
          
          // Redirect to get name if first time
          console.log('Redirecting to onboarding');
          router.push('/onboarding');
        } else {
          // Existing user - redirect to dashboard
          console.log('User exists, redirecting to dashboard');
          router.push('/dashboard');
        }
      } catch (firestoreError) {
        console.error('Firestore operation failed:', firestoreError);
        // Even if Firestore fails, we should still redirect to dashboard
        // since the user is authenticated
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Only reset loading state if we're not doing a redirect
      if (!(error instanceof Error && error.message.includes('redirect'))) {
        setLoading(false);
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const setDisplayName = async (name: string) => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: name,
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating display name:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, setDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
}; 