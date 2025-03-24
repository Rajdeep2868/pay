"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bitcoin, Wallet, ArrowRightLeft, Layers, ShieldCheck, Lock } from "lucide-react"

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const blockchainAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      },
    },
  }

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      {/* Purple grid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-background to-background"></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`, 
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-20 right-[20%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-[10%] w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div className="flex-1 space-y-8 mt-[-60px] md:mt-[-80px]" variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-block">
              <div className="px-4 py-2 rounded-full border border-purple-500/30 bg-background/60 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground/80">Pay with Crypto Anywhere</p>
              </div>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ultimate Platform for <br />
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-400 blur-lg opacity-30"></span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-400 relative">Web3 Payments</span>
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-foreground/80 max-w-xl">
              Robust payment solutions designed to simplify crypto transactions effortlessly, even on platforms that
              don't accept crypto.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleGetStarted} className="px-8 bg-primary hover:bg-primary/90">
                {user ? 'Go to Dashboard' : 'Get Started'}
              </Button>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8 border-primary text-primary hover:bg-primary/10">
                  About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex-1">
            {isClient && (
              <motion.div
                variants={blockchainAnimation}
                initial="hidden"
                animate="show"
                className="relative mx-auto max-w-md"
              >
                {/* Blockchain Visualization */}
                <motion.div
                  className="absolute -top-6 -left-6 h-full w-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.98, 1.01, 0.98],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "mirror",
                  }}
                />

                {/* 3D Blockchain Visualization */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 shadow-xl border border-emerald-500/20 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Glowing background effects */}
                  <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 h-32 w-32 bg-purple-500/10 rounded-full blur-2xl -ml-16 -mb-16" />
                  <div className="absolute top-1/2 left-1/2 h-24 w-24 bg-emerald-500/20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Main hexagon grid background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                          <path d="M25,17.3 L25,0 L0,8.7 L0,25.9 L25,34.6 L50,25.9 L50,8.7 Z" 
                                fill="none" 
                                stroke="rgba(52, 211, 153, 0.4)" 
                                strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                  </div>

                  {/* Blockchain Network Visualization */}
                  <div className="relative h-64 flex items-center justify-center mb-4">
                    {/* Central Node */}
                    <motion.div 
                      className="absolute w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center z-10 shadow-lg shadow-blue-500/30"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 20px rgba(59, 130, 246, 0.6)",
                          "0 0 0 rgba(59, 130, 246, 0.4)"
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "mirror" 
                      }}
                    >
                      <Wallet className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Orbiting Nodes */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: i === 3 ? 
                            'linear-gradient(225deg, rgb(16, 185, 129), rgb(5, 150, 105))' : 
                            `linear-gradient(225deg, ${i % 2 === 0 ? 'rgb(79, 70, 229)' : 'rgb(6, 182, 212)'}, ${i % 3 === 0 ? 'rgb(236, 72, 153)' : 'rgb(59, 130, 246)'})`,
                        }}
                        animate={{
                          x: Math.cos(i * (Math.PI * 2) / 5) * 100,
                          y: Math.sin(i * (Math.PI * 2) / 5) * 100,
                          boxShadow: i === 3 ? ['0 0 0px rgba(16, 185, 129, 0.4)', '0 0 15px rgba(16, 185, 129, 0.7)', '0 0 0px rgba(16, 185, 129, 0.4)'] : undefined
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "mirror"
                          }
                        }}
                      >
                        {i === 0 && <Bitcoin className="h-5 w-5 text-white" />}
                        {i === 1 && <ArrowRightLeft className="h-5 w-5 text-white" />}
                        {i === 2 && <ShieldCheck className="h-5 w-5 text-white" />}
                        {i === 3 && <Layers className="h-5 w-5 text-white" />}
                        {i === 4 && <Lock className="h-5 w-5 text-white" />}
                      </motion.div>
                    ))}

                    {/* Connection Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={`line-${i}`}
                        className={`absolute left-1/2 top-1/2 h-0.5 ${i === 3 ? 'bg-gradient-to-r from-emerald-500/80 to-emerald-500/0' : 'bg-gradient-to-r from-blue-500/80 to-blue-500/0'} origin-left z-0`}
                        style={{
                          width: 100,
                          transformOrigin: "0% 50%",
                          rotate: `${i * (360 / 5)}deg`,
                        }}
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">Decentralized Payment Network</h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <p className="text-white/80 text-sm">Secure</p>
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      <p className="text-white/80 text-sm">Fast</p>
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                      <p className="text-white/80 text-sm">Global</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Built-in Features</h3>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-foreground/80">Multi-Wallet Support</p>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-foreground/80">QR Scan & Pay</p>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-foreground/80">Reversible Escrow Payments</p>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-sm text-foreground/80">No KYC Required</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

