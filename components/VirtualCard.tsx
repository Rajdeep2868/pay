"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckIcon, CopyIcon, CreditCard, RotateCw, Lock, ShieldAlert } from 'lucide-react';

export default function VirtualCard() {
  const { defaultWallet, cardNumber, connectedWallets } = useWallet();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isLocked, setIsLocked] = useState(true);

  // Generate random CVV and expiry date on first render
  useEffect(() => {
    const randomCVV = Math.floor(100 + Math.random() * 900).toString();
    setCvv(randomCVV);
    
    // Generate random expiry date (current year + 2-5 years)
    const currentYear = new Date().getFullYear();
    const expiryYear = currentYear + 2 + Math.floor(Math.random() * 4);
    const expiryMonth = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    setExpiryDate(`${expiryMonth}/${expiryYear.toString().slice(-2)}`);
  }, []);

  // Determine if card is locked (no connected wallets)
  useEffect(() => {
    setIsLocked(connectedWallets.length === 0 || !defaultWallet);
  }, [connectedWallets, defaultWallet]);

  const copyWalletAddress = () => {
    if (defaultWallet) {
      navigator.clipboard.writeText(defaultWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Truncate address for display
  const displayAddress = defaultWallet 
    ? `${defaultWallet.substring(0, 6)}...${defaultWallet.substring(defaultWallet.length - 4)}`
    : 'Connect a wallet';

  const handleFlip = () => {
    if (isLocked) return;
    setIsFlipped(!isFlipped);
  };

  const randomHue1 = Math.floor(Math.random() * 360);
  const randomHue2 = (randomHue1 + 120) % 360;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="group relative w-full h-56 sm:h-64 perspective-1000">
        {/* Card Front */}
        <motion.div
          className={`absolute w-full h-full backface-visibility-hidden transition-all duration-700 ease-out ${isFlipped ? 'rotateY-180 invisible' : 'rotateY-0 visible'}`}
          style={isFlipped ? { transform: 'rotateY(180deg)' } : {}}
        >
          <div className="relative w-full h-full">
            {/* Background glow */}
            <motion.div
              className="absolute -top-6 -left-6 right-6 bottom-6 rounded-2xl blur-xl z-0"
              style={{
                background: `linear-gradient(45deg, hsla(${randomHue1}, 100%, 50%, 0.4), hsla(${randomHue2}, 100%, 60%, 0.4))`,
              }}
              animate={{
                opacity: [0.6, 0.8, 0.6],
                scale: [0.98, 1.01, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* Card front content */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50 overflow-hidden z-10 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Locked overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                  <ShieldAlert className="h-12 w-12 text-red-500 mb-3" />
                  <h3 className="text-white font-bold text-lg mb-1">Card Locked</h3>
                  <p className="text-white/70 text-sm text-center max-w-xs">
                    Connect and set a default wallet in the dashboard to activate your card
                  </p>
                </div>
              )}

              {/* Glow effects */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/20 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-purple-500/20 rounded-full blur-2xl -ml-16 -mb-16" />
              <div className="absolute bottom-10 right-10 h-16 w-16 bg-cyan-500/20 rounded-full blur-xl" />

              {/* Card content */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">FusionPay Card</h3>
                  <p className="text-cyan-300/90 text-sm font-medium">Virtual Crypto Card</p>
                </div>
                <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse blur-sm"></div>
                  <div className="relative h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-cyan-300" />
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <div className="h-10 w-14 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md mb-3 flex items-center justify-center">
                  <div className="h-3 w-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"></div>
                </div>
                <div className="text-xl md:text-2xl text-white font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300">
                  {cardNumber}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-slate-400 text-xs mb-1">CARD HOLDER</p>
                  <p className="text-white text-sm font-medium">{user?.displayName || 'USER'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">EXPIRES</p>
                  <p className="text-white text-sm font-medium">{expiryDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-xs mb-1">LINKED WALLET</p>
                  <p className="text-cyan-300 text-sm font-mono">{displayAddress}</p>
                </div>
                
                {!isLocked && (
                  <button 
                    onClick={handleFlip}
                    className="text-xs px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
                  >
                    <RotateCw className="h-3 w-3" /> VIEW CVV
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Card Back */}
        <motion.div 
          className={`absolute w-full h-full backface-visibility-hidden transition-all duration-700 ease-out ${isFlipped ? 'rotateY-0 visible' : 'rotateY-180 invisible'}`}
          style={isFlipped ? {} : { transform: 'rotateY(180deg)' }}
        >
          <div className="relative w-full h-full">
            {/* Background glow */}
            <motion.div
              className="absolute -top-6 -left-6 right-6 bottom-6 rounded-2xl blur-xl z-0"
              style={{
                background: `linear-gradient(45deg, hsla(${randomHue2}, 100%, 50%, 0.4), hsla(${randomHue1}, 100%, 60%, 0.4))`,
              }}
              animate={{
                opacity: [0.6, 0.8, 0.6],
                scale: [0.98, 1.01, 0.98],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* Card back content */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50 overflow-hidden z-10 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Magnetic stripe */}
              <div className="w-full h-12 bg-black/50 -mx-6 mt-4"></div>
              
              {/* CVV */}
              <div className="mt-6 mb-6">
                <div className="bg-white/90 w-full py-3 px-4 rounded">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-600">Security Code</p>
                    <p className="font-mono text-lg font-bold text-gray-800">{cvv}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-sm text-white/60 mb-4">
                  This card is linked to your default wallet. All transactions will be processed through this wallet.
                </p>
                
                <button 
                  onClick={handleFlip}
                  className="w-full py-2 px-3 rounded-md bg-slate-700/70 text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCw className="h-4 w-4" /> BACK TO CARD
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Card Status */}
      <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${isLocked ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
        {isLocked ? (
          <>
            <Lock className="h-4 w-4 text-red-500" />
            <p className="text-sm text-red-500">Card locked. Connect a wallet to activate.</p>
          </>
        ) : (
          <>
            <CheckIcon className="h-4 w-4 text-green-500" />
            <p className="text-sm text-green-500">Card active and ready for payments.</p>
          </>
        )}
      </div>
    </div>
  );
} 