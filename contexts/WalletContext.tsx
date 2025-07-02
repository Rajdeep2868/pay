"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const currencies = ['ETH', 'USDC', 'USDT', 'EDU'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));
    
    return {
      id: `tx-${Date.now()}-${i}`,
      date,
      amount: (Math.random() * 2).toFixed(4),
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      type: types[Math.floor(Math.random() * types.length)],
      address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [connectedWallets, setConnectedWallets] = useState<string[]>([]);
  const [defaultWallet, setDefaultWalletState] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cardNumber, setCardNumber] = useState<string>(generateCardNumber());
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Load user data from localStorage
  useEffect(() => {
    if (!user) {
      setConnectedWallets([]);
      setDefaultWallet(null);
      setTransactions([]);
      return;
    }
    
    const savedWallets = localStorage.getItem(`wallets-${user.uid}`);
    const savedDefault = localStorage.getItem(`default-wallet-${user.uid}`);
    const savedTransactions = localStorage.getItem(`transactions-${user.uid}`);
    const savedCard = localStorage.getItem(`card-${user.uid}`);
    
    if (savedWallets) {
      setConnectedWallets(JSON.parse(savedWallets));
    }
    
    if (savedDefault) {
      setDefaultWallet(savedDefault);
    }
    
    if (savedTransactions) {
      const txs = JSON.parse(savedTransactions);
      setTransactions(txs.map((tx: any) => ({
        ...tx,
        date: new Date(tx.date)
      })));
    } else {
      const mockTxs = generateMockTransactions();
      setTransactions(mockTxs);
      localStorage.setItem(`transactions-${user.uid}`, JSON.stringify(mockTxs));
    }
    
    if (savedCard) {
      setCardNumber(savedCard);
    } else {
      const newCard = generateCardNumber();
      setCardNumber(newCard);
      localStorage.setItem(`card-${user.uid}`, newCard);
    }
  }, [user]);

  const connectMetaMask = async () => {
    if (!user) return;
    setIsConnecting(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          const newWallet = accounts[0];
          
          if (connectedWallets.includes(newWallet)) {
            alert('Wallet already connected!');
            return;
          }
          
          const updatedWallets = [...connectedWallets, newWallet];
          setConnectedWallets(updatedWallets);
          
          if (updatedWallets.length === 1) {
            setDefaultWalletState(newWallet);
            localStorage.setItem(`default-wallet-${user.uid}`, newWallet);
          }
          
          localStorage.setItem(`wallets-${user.uid}`, JSON.stringify(updatedWallets));
        }
      } else {
        // Demo mode - generate random wallet
        const randomWallet = `0x${Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)).join('')}`;
        
        const updatedWallets = [...connectedWallets, randomWallet];
        setConnectedWallets(updatedWallets);
        
        if (updatedWallets.length === 1) {
          setDefaultWalletState(randomWallet);
          localStorage.setItem(`default-wallet-${user.uid}`, randomWallet);
        }
        
        localStorage.setItem(`wallets-${user.uid}`, JSON.stringify(updatedWallets));
        alert('Demo wallet connected successfully!');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Error connecting to MetaMask. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    if (!user) return;
    setIsConnecting(true);
    
    try {
      // Demo WalletConnect - generate random address
      const randomWallet = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
      
      const updatedWallets = [...connectedWallets, randomWallet];
      setConnectedWallets(updatedWallets);
      
      if (updatedWallets.length === 1) {
        setDefaultWalletState(randomWallet);
        localStorage.setItem(`default-wallet-${user.uid}`, randomWallet);
      }
      
      localStorage.setItem(`wallets-${user.uid}`, JSON.stringify(updatedWallets));
      alert('Successfully connected WalletConnect wallet!');
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
      alert('Error connecting with WalletConnect. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async (wallet: string) => {
    if (!user) return;
    
    const updatedWallets = connectedWallets.filter(w => w !== wallet);
    setConnectedWallets(updatedWallets);
    
    if (defaultWallet === wallet) {
      const newDefault = updatedWallets.length > 0 ? updatedWallets[0] : null;
      setDefaultWalletState(newDefault);
      if (newDefault) {
        localStorage.setItem(`default-wallet-${user.uid}`, newDefault);
      } else {
        localStorage.removeItem(`default-wallet-${user.uid}`);
      }
    }
    
    localStorage.setItem(`wallets-${user.uid}`, JSON.stringify(updatedWallets));
  };

  const setDefaultWallet = async (wallet: string | null) => {
    if (!user || (wallet !== null && !connectedWallets.includes(wallet))) return;
    
    setDefaultWalletState(wallet);
    if (wallet) {
      localStorage.setItem(`default-wallet-${user.uid}`, wallet);
    } else {
      localStorage.removeItem(`default-wallet-${user.uid}`);
    }
  };

  const refreshTransactions = async () => {
    if (!user) return;
    
    const mockTxs = generateMockTransactions();
    setTransactions(mockTxs);
    localStorage.setItem(`transactions-${user.uid}`, JSON.stringify(mockTxs));
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