"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import GridBackground from "./GridBackground"

export default function Hero() {
  const { user } = useAuth()
  const router = useRouter()
  
  const features = [
    "Multi-Wallet Support",
    "QR Scan & Pay",
    "Reversible Escrow Payments",
    "No KYC Required"
  ]

  const handleDashboard = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Grid Background */}
      <GridBackground />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Ultimate Platform for
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-500 text-transparent bg-clip-text">
                Web3 Payments
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
            >
              Fusion Pay is a seamless digital payment platform enabling fast, secure, and 
              integrated transactions across multiple financial services.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center backdrop-blur-sm">
                    <Check className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={handleDashboard}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium 
                         hover:from-purple-700 hover:to-purple-600 transition-all duration-200 
                         shadow-[0_8px_32px_rgba(168,85,247,0.3)] backdrop-blur-sm"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </div>

          {/* Right Content - Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative">
              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-violet-600/20 to-blue-600/20 rounded-full blur-[100px] opacity-75"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-[2rem] blur-2xl"></div>
              
              {/* Phone Image */}
              <div className="relative z-10">
                <Image
                  src="/handwall.png"
                  alt="Fusion Pay Mobile App"
                  width={600}
                  height={800}
                  className="w-full h-auto drop-shadow-2xl"
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

