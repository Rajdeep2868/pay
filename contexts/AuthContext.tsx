"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  uid: string;
  email: string;
  displayName: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  setDisplayName: (name: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading and check for existing session
    const checkAuth = () => {
      const savedUser = localStorage.getItem('demo-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login - accept any email/password
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: email.split('@')[0]
    };
    
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const signUp = async (email: string, password: string) => {
    // Demo signup - same as login
    await login(email, password);
  };

  const signInWithGoogle = async () => {
    // Demo Google signin
    const demoUser = {
      uid: 'demo-google-user-' + Date.now(),
      email: 'demo@google.com',
      displayName: 'Demo User'
    };
    
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const signOut = async () => {
    localStorage.removeItem('demo-user');
    setUser(null);
    router.push('/');
  };

  const setDisplayName = async (name: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, displayName: name };
    localStorage.setItem('demo-user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    router.push('/dashboard');
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