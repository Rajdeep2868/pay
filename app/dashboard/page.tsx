"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import WalletConnect from "@/components/WalletConnect";
import TransactionHistory from "@/components/TransactionHistory";
import { Wallet, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  const { connectedWallets, defaultWallet, transactions } = useWallet();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <ProtectedRoute>
      <div className="pt-24 pb-20 md:pb-10 dashboard-page">
        <main className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome, {user?.displayName || "User"}
              </h1>
              <p className="text-slate-400">
                Manage your wallets and view your transaction history
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div 
              className="lg:col-span-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Wallet Overview
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
                      <div className="flex items-center">
                        <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                          <Wallet className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Connected Wallets</h3>
                          <p className="text-slate-400 text-sm">
                            {connectedWallets.length} {connectedWallets.length === 1 ? 'wallet' : 'wallets'} connected
                          </p>
                        </div>
                      </div>
                    </div>

                    {defaultWallet && (
                      <div className="bg-gradient-to-r from-blue-900/40 to-emerald-900/40 p-4 rounded-lg border border-emerald-700/30">
                        <h3 className="text-emerald-300 font-medium mb-1">Default Wallet</h3>
                        <p className="text-white font-mono text-sm mb-2">
                          {truncateAddress(defaultWallet)}
                        </p>
                        <Link
                          href="/pay"
                          className="flex items-center text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                          <span>Go to Pay</span>
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <WalletConnect />
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants}>
                <TransactionHistory />
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}