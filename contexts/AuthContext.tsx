"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
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

  const value = {
    user,
    loading,
    login,
    signUp,
    signOut,
    signInWithGoogle,
    setDisplayName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 