"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowDown, ArrowUp, RefreshCw, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

export default function TransactionHistory() {
  const { transactions, refreshTransactions } = useWallet();
  const [filter, setFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTransactions();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'send') return tx.type === 'send';
    if (filter === 'receive') return tx.type === 'receive';
    if (filter === 'pending') return tx.status === 'pending';
    return true;
  });

  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Truncate wallet address
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get status icon based on transaction status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-700/50">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Transaction History</h2>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-700/60 rounded-lg overflow-hidden">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('send')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filter === 'send' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Sent
              </button>
              <button 
                onClick={() => setFilter('receive')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filter === 'receive' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Received
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Pending
              </button>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-md bg-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto">
        {filteredTransactions.length > 0 ? (
          <ul className="divide-y divide-slate-700/50">
            {filteredTransactions.map((tx) => (
              <motion.li 
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                      {tx.type === 'send' ? (
                        <ArrowUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {tx.type === 'send' ? 'Sent to' : 'Received from'}{' '}
                        <span className="text-cyan-300 font-mono">{truncateAddress(tx.address)}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-medium ${tx.type === 'send' ? 'text-red-400' : 'text-green-400'}`}>
                        {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.currency}
                      </span>
                      {getStatusIcon(tx.status)}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{tx.status}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <Filter className="h-10 w-10 text-slate-500 mb-3" />
            <h3 className="text-lg font-medium text-white mb-1">No transactions found</h3>
            <p className="text-sm text-slate-400 max-w-md">
              {filter !== 'all' 
                ? `No ${filter === 'send' ? 'outgoing' : filter === 'receive' ? 'incoming' : filter} transactions found.` 
                : 'Your transaction history will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 