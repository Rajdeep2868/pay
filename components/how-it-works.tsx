"use client"

import { motion } from "framer-motion"
import { LogIn, CreditCard, QrCode, ShieldCheck, Database } from "lucide-react"

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How FusionPay Works</h2>
          <p className="text-foreground/80">Simple steps to start using crypto for everyday payments</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={item}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-semibold">Sign In & Connect</h3>
            </div>
            <div className="flex items-center gap-3">
              <LogIn className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-xs text-foreground/70">Login with Google & connect your wallets</p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-semibold">Virtual Card</h3>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-xs text-foreground/70">Get your crypto-backed virtual card</p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-semibold">QR Scan & Pay</h3>
            </div>
            <div className="flex items-center gap-3">
              <QrCode className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-xs text-foreground/70">Pay merchants via QR with real-time conversion</p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                4
              </div>
              <h3 className="text-base font-semibold">Escrow Payments</h3>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-xs text-foreground/70">Reversible transactions for security</p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-4 hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                5
              </div>
              <h3 className="text-base font-semibold">EduChain Powered</h3>
            </div>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-xs text-foreground/70">Secure transaction records on blockchain</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

