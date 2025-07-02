"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function QRCodeSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* QR Code */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-3xl blur-xl"></div>
                <div className="relative w-full h-full bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 p-4 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 ${
                            Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent mb-6">
                Scan for a Free Trial on your Device
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Boost your workflow, save time, and let AI handle the heavy lifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link 
                  href="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
                >
                  <span className="text-white">Try Demo Version</span>
                </Link>
                <Link 
                  href="/login"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl transition-colors text-white hover:from-purple-700 hover:to-violet-700"
                >
                  <span className="text-white">Get Started</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}