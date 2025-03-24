"use client";

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon, Trash2Icon, Wallet, Check, ExternalLink, ShieldCheck, AlertCircle, X, Plus, ChevronDown } from 'lucide-react';
import Link from "next/link";

export default function WalletConnect() {
  const { 
    connectedWallets,
    defaultWallet,
    isConnecting,
    connectMetaMask,
    connectWalletConnect,
    disconnectWallet,
    setDefaultWallet
  } = useWallet();
  
  const [showPopup, setShowPopup] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleConnectWallet = (connectFn) => {
    if (consentGiven) {
      connectFn();
      setShowPopup(false);
      setConsentGiven(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Glowing background effect */}
      <div className="absolute -top-10 -right-10 h-40 w-40 bg-purple-600/10 rounded-full blur-3xl z-0"></div>
      
      {/* Connection Status */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`p-5 rounded-xl flex items-center gap-4 mb-6 backdrop-blur-sm z-10 ${
          connectedWallets.length > 0 
            ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30' 
            : 'bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/30'
        }`}
      >
        {connectedWallets.length > 0 ? (
          <>
            <div className="p-3 rounded-full bg-emerald-500/20">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-medium text-emerald-400 mb-1 text-lg">Wallet Connected</h3>
              <p className="text-sm text-foreground/80">
                You have {connectedWallets.length} wallet{connectedWallets.length !== 1 ? 's' : ''} connected to your account.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-full bg-amber-500/20">
              <AlertCircle className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium text-amber-400 mb-1 text-lg">No Wallet Connected</h3>
              <p className="text-sm text-foreground/80">
                Connect a wallet to use all features of the platform.
              </p>
            </div>
          </>
        )}
      </motion.div>

      {/* Add Wallet Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10"
      >
        <Button
          onClick={() => setShowPopup(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border border-purple-500/30 shadow-md shadow-purple-900/20 text-white rounded-xl group transition-all"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <span className="text-base font-medium">Add Wallet</span>
          </div>
        </Button>
      </motion.div>

      {/* Connected Wallets */}
      {connectedWallets.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 relative z-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
              <Wallet className="h-5 w-5 text-purple-400" />
              My Wallets
            </h3>
            <div className="text-xs text-foreground/60 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {connectedWallets.length} Connected
            </div>
          </div>
          
          <div className="space-y-3 bg-slate-900/60 rounded-xl p-4 border border-purple-500/10 backdrop-blur-sm">
            {connectedWallets.map((wallet, index) => (
              <WalletItem 
                key={wallet}
                address={wallet}
                isDefault={wallet === defaultWallet}
                onSetDefault={() => setDefaultWallet(wallet)}
                onDisconnect={() => disconnectWallet(wallet)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Popup for wallet selection */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-slate-900 rounded-2xl w-[90%] max-w-lg border border-purple-500/20 shadow-xl shadow-purple-900/20 overflow-hidden"
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <h2 className="text-2xl font-bold mb-1 text-white">Connect a Wallet</h2>
                <p className="text-sm text-slate-400 mb-6">Select from our popular wallet providers</p>
                
                <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* Group 1: Most Popular */}
                    <div className="sm:col-span-2 mb-2">
                      <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2">Most Popular</h3>
                    </div>
                    
                    <WalletOption 
                      name="MetaMask" 
                      icon="/metamask.svg" 
                      gradient="from-orange-500 to-amber-600"
                      onClick={() => handleConnectWallet(connectMetaMask)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Coinbase Wallet" 
                      icon="/coinbase.svg" 
                      gradient="from-blue-500 to-blue-600"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Trust Wallet" 
                      icon="/trustwallet.svg" 
                      gradient="from-blue-500 to-blue-700"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Phantom" 
                      icon="/phantom.svg" 
                      gradient="from-purple-700 to-fuchsia-500"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    {/* Group 2: More Options */}
                    <div className="sm:col-span-2 mb-2 mt-4">
                      <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2">More Options</h3>
                    </div>
                    
                    <WalletOption 
                      name="WalletConnect" 
                      icon="/walletconnect.svg" 
                      gradient="from-purple-600 to-indigo-700"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Rainbow" 
                      icon="/rainbow.svg" 
                      gradient="from-pink-500 to-blue-500"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Ledger" 
                      icon="/ledger.svg" 
                      gradient="from-slate-700 to-slate-900"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Argent" 
                      icon="/argent.svg" 
                      gradient="from-rose-500 to-red-700"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                    
                    <WalletOption 
                      name="Exodus" 
                      icon="/exodus.svg" 
                      gradient="from-blue-700 to-indigo-900"
                      onClick={() => handleConnectWallet(connectWalletConnect)}
                      disabled={!consentGiven}
                    />
                  </div>
                </div>
                
                <style jsx global>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.1);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(124, 58, 237, 0.3);
                    border-radius: 10px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(124, 58, 237, 0.5);
                  }
                `}</style>
                
                <div className="space-y-4 mt-6 pt-4 border-t border-slate-800">
                  <div className="flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className="mt-1 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                    />
                    <label htmlFor="consent" className="text-sm text-slate-400">
                      I confirm that I am of legal age in my jurisdiction and I agree to the 
                      <Link href="#" className="text-purple-400 hover:text-purple-300 ml-1">
                        Terms & Conditions
                      </Link>.
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-950 border-t border-slate-800">
                <div className="text-center text-xs text-slate-500 mb-2">
                  <span className="text-purple-400">New to crypto wallets?</span> Learn more about wallets
                </div>
                <div className="flex items-center justify-center gap-1 flex-wrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-slate-400 text-xs">Secure</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse mx-1"></span>
                  <p className="text-slate-400 text-xs">Non-custodial</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse mx-1"></span>
                  <p className="text-slate-400 text-xs">Multi-chain</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WalletOption({ name, icon, gradient, onClick, disabled }) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center p-3 rounded-lg border border-slate-800 hover:border-purple-500/30 bg-slate-800/50 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mr-3`}>
        <img src={icon} alt={name} width="20" height="20" />
      </div>
      <span className="text-white font-medium">{name}</span>
      <div className="ml-auto opacity-70">
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.button>
  );
}

function WalletItem({ address, isDefault, onSetDefault, onDisconnect, index }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={{ y: -2, boxShadow: "0 8px 20px -8px rgba(124, 58, 237, 0.25)" }}
      className="flex items-center justify-between p-4 rounded-xl bg-slate-800/90 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-200"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
          <Wallet className="h-6 w-6 text-purple-400" />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-2">
            <p className="font-medium text-white truncate">{`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</p>
            {isDefault && (
              <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                <Check className="h-3 w-3" /> Default
              </span>
            )}
          </div>
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground/60 hover:text-purple-400 flex items-center gap-1 mt-1 transition-colors"
          >
            View on Etherscan <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
      <div className={`flex items-center gap-2 transition-opacity ${showOptions ? 'opacity-100' : 'opacity-0'}`}>
        {!isDefault && (
          <Button
            onClick={onSetDefault}
            size="sm"
            variant="outline"
            className="h-8 text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500"
          >
            <StarIcon className="h-3 w-3 mr-1" />
            Set Default
          </Button>
        )}
        <Button
          onClick={onDisconnect}
          size="sm"
          variant="outline"
          className="h-8 text-xs border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500"
        >
          <Trash2Icon className="h-3 w-3 mr-1" />
          Disconnect
        </Button>
      </div>
    </motion.div>
  );
} 