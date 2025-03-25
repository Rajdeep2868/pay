"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const chains = [
  { name: "Ethereum", logo: "/chains/ethereum.svg" },
  { name: "Bitcoin", logo: "/chains/bitcoin.svg" },
  { name: "Solana", logo: "/chains/solana.svg" },
  { name: "Polygon", logo: "/chains/polygon.svg" },
  { name: "Binance", logo: "/chains/binance.svg" },
  { name: "Avalanche", logo: "/chains/avalanche.svg" },
]

// Duplicate the chains for seamless loop
const duplicatedChains = [...chains, ...chains, ...chains]

export default function MultiChainCarousel() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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

          {/* Chains Carousel */}
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
                    <div className="aspect-square relative mb-4">
                      <Image
                        src={chain.logo}
                        alt={chain.name}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full"
                      />
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