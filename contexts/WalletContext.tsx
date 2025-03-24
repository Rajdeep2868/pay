"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

type Transaction = {
  id: string;
  date: Date;
  amount: string;
  currency: string;
  type: 'send' | 'receive';
  address: string;
  status: 'pending' | 'completed' | 'failed';
};

type WalletContextType = {
  connectedWallets: string[];
  defaultWallet: string | null;
  transactions: Transaction[];
  cardNumber: string;
  isConnecting: boolean;
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnectWallet: (wallet: string) => void;
  setDefaultWallet: (wallet: string | null) => void;
  refreshTransactions: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Generate a random card number for the virtual card
function generateCardNumber(): string {
  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    segments.push(Math.floor(1000 + Math.random() * 9000).toString());
  }
  return segments.join(' ');
}

// Generate mock transaction history
function generateMockTransactions(): Transaction[] {
  const types: ('send' | 'receive')[] = ['send', 'receive'];
  const statuses: ('pending' | 'completed' | 'failed')[] = ['completed', 'completed', 'completed', 'pending', 'failed'];
  const currencies = ['ETH', 'USDC', 'USDT'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14)); // Random date within last 14 days
    
    return {
      id: `tx-${Date.now()}-${i}`,
      date,
      amount: (Math.random() * 2).toFixed(4),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      type: types[Math.floor(Math.random() * types.length)],
      address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date (newest first)
}

// Add this at the top of the file, after the imports
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress?: string;
    };
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [defaultWallet, setDefaultWalletState] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cardNumber, setCardNumber] = useState<string>(generateCardNumber());
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentDefaultWallet, setCurrentDefaultWallet] = useState<string | null>(null);

  // Load user wallets and default wallet from Firestore
  useEffect(() => {
    async function loadUserWallets() {
      if (!user) {
        setConnectedWallets([]);
        setDefaultWallet(null);
        setTransactions([]);
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setConnectedWallets(userData.connectedWallets || []);
          setDefaultWallet(userData.defaultWallet || null);
          
          // If we have real transactions, use those, otherwise generate mock data
          if (userData.transactions && userData.transactions.length > 0) {
            setTransactions(userData.transactions.map((tx: any) => ({
              ...tx,
              date: tx.date.toDate() // Convert Firestore timestamp to Date
            })));
          } else {
            const mockTxs = generateMockTransactions();
            setTransactions(mockTxs);
            // Save mock transactions to Firestore
            await updateDoc(doc(db, 'users', user.uid), {
              transactions: mockTxs.map(tx => ({
                ...tx,
                date: new Date(tx.date) // Convert to Firestore timestamp
              }))
            });
          }
          
          // Set card number if it exists, otherwise generate a new one
          if (userData.cardNumber) {
            setCardNumber(userData.cardNumber);
          } else {
            const newCardNumber = generateCardNumber();
            setCardNumber(newCardNumber);
            await updateDoc(doc(db, 'users', user.uid), {
              cardNumber: newCardNumber
            });
          }
        }
      } catch (error) {
        console.error("Error loading user wallets:", error);
      }
    }
    
    loadUserWallets();
  }, [user]);

  // Connect with MetaMask wallet
  const connectMetaMask = async () => {
    if (!user) return;
    setIsConnecting(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          const newWallet = accounts[0];
          
          // Check if wallet is already connected
          if (connectedWallets.includes(newWallet)) {
            alert('Wallet already connected!');
            setIsConnecting(false);
            return;
          }
          
          // Update state
          const updatedWallets = [...connectedWallets, newWallet];
          setConnectedWallets(updatedWallets);
          
          // If this is the first wallet, set as default
          if (updatedWallets.length === 1) {
            setDefaultWalletState(newWallet);
          }
          
          // Update Firestore
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            connectedWallets: updatedWallets,
            defaultWallet: updatedWallets.length === 1 ? newWallet : defaultWallet
          });
        }
      } else {
        alert('MetaMask is not installed. Please install it to connect your wallet.');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error connecting to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect with WalletConnect
  const connectWalletConnect = async () => {
    if (!user) return;
    setIsConnecting(true);
    
    try {
      // In a real app, implement actual WalletConnect integration
      // For now, simulate connection with a random address
      const randomWallet = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      // Update state
      const updatedWallets = [...connectedWallets, randomWallet];
      setConnectedWallets(updatedWallets);
      
      // If this is the first wallet, set as default
      if (updatedWallets.length === 1) {
        setDefaultWalletState(randomWallet);
      }
      
      // Update Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        connectedWallets: updatedWallets,
        defaultWallet: updatedWallets.length === 1 ? randomWallet : defaultWallet
      });
      
      alert('Successfully connected WalletConnect wallet!');
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      alert('Error connecting with WalletConnect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect a wallet
  const disconnectWallet = async (wallet: string) => {
    if (!user) return;
    
    try {
      // Update state
      const updatedWallets = connectedWallets.filter(w => w !== wallet);
      setConnectedWallets(updatedWallets);
      
      // If we disconnected the default wallet, update default
      if (defaultWallet === wallet) {
        const newDefault = updatedWallets.length > 0 ? updatedWallets[0] : null;
        setDefaultWalletState(newDefault);
        
        // Update Firestore
        await updateDoc(doc(db, 'users', user.uid), {
          connectedWallets: updatedWallets,
          defaultWallet: newDefault
        });
      } else {
        // Just update connected wallets in Firestore
        await updateDoc(doc(db, 'users', user.uid), {
          connectedWallets: updatedWallets
        });
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      alert('Error disconnecting wallet. Please try again.');
    }
  };

  // Set a wallet as the default
  const setDefaultWallet = async (wallet: string | null) => {
    if (!user || (wallet !== null && !connectedWallets.includes(wallet))) return;
    
    try {
      setIsUpdating(true);
      
      if (wallet === null) {
        // If wallet is null, just update the local state
        setCurrentDefaultWallet(null);
      } else {
        // Update in Firestore if we have a valid wallet
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          defaultWallet: wallet
        });
        
        setCurrentDefaultWallet(wallet);
      }
    } catch (error) {
      console.error('Error setting default wallet:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Refresh transaction history
  const refreshTransactions = async () => {
    if (!user) return;
    
    try {
      // In a real app, this would fetch actual transaction history
      // For now, generate new mock transactions
      const mockTxs = generateMockTransactions();
      setTransactions(mockTxs);
      
      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        transactions: mockTxs.map(tx => ({
          ...tx,
          date: new Date(tx.date) // Convert to Firestore timestamp
        }))
      });
    } catch (error) {
      console.error('Error refreshing transactions:', error);
      alert('Error refreshing transactions. Please try again.');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        connectedWallets,
        defaultWallet,
        transactions,
        cardNumber,
        isConnecting,
        connectMetaMask,
        connectWalletConnect,
        disconnectWallet,
        setDefaultWallet,
        refreshTransactions
      }}
    >
      {children}
    </WalletContext.Provider>
  );
} 