"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

export default function PhoneShowcase() {
  const features = [
    "Multi-Wallet Support",
    "QR Scan & Pay",
    "Reversible Escrow Payments",
    "No KYC Required"
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 lg:pr-8"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ultimate Platform for
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Web3 Payments
              </span>
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8">
              Fusion Pay is a seamless digital payment platform enabling fast, secure, and
              integrated transactions across multiple financial services.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-purple-500" />
                  </div>
                  <span className="text-foreground/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Go to Dashboard
            </motion.button>
          </motion.div>

          {/* Right Content - Phone Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-[100px] opacity-75"></div>
              
              {/* Phone image */}
              <div className="relative z-10">
                <Image
                  src="/handwall.png"
                  alt="Fusion Pay Mobile App"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 