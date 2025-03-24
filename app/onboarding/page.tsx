"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setDisplayName, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    setIsLoading(true);
    await setDisplayName(name);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background z-0"></div>
      
      <motion.div 
        className="max-w-md w-full p-8 rounded-xl bg-background/80 backdrop-blur-md border border-border/60 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to FusionPay!</h1>
          <p className="text-foreground/70">How should we address you on the platform?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your preferred name"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          
          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90 flex items-center justify-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Continue to Dashboard"
            )}
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/60">
            We'll use this name to personalize your experience
          </p>
        </div>
      </motion.div>
    </div>
  );
} 