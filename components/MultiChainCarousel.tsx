"use client"

import { motion } from "framer-motion"

const chains = [
  { name: "Ethereum", symbol: "ETH" },
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Solana", symbol: "SOL" },
  { name: "Polygon", symbol: "MATIC" },
  { name: "Binance", symbol: "BNB" },
  { name: "Avalanche", symbol: "AVAX" },
  { name: "EduChain", symbol: "EDU" },
  { name: "Cardano", symbol: "ADA" },
]

const duplicatedChains = [...chains, ...chains, ...chains]

export default function MultiChainCarousel() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-6">
              Multi-Chain Support
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Use your favorite cryptocurrencies across multiple blockchain networks.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{
                x: ["0%", "-33.33%"],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedChains.map((chain, index) => (
                <motion.div
                  key={`${chain.name}-${index}`}
                  className="group relative flex-shrink-0 w-[160px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 p-6 h-full transition-all duration-300">
                    <div className="aspect-square relative mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{chain.symbol}</span>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-400">{chain.name}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}