"use client"

import { CreditCard, QrCode, ShieldCheck, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Virtual Crypto Cards",
      description: "Spend crypto like regular cards anywhere online"
    },
    {
      icon: <QrCode className="h-6 w-6 text-primary" />,
      title: "Scan & Pay",
      description: "Instant payments via QR with real-time conversion"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Reversible Payments",
      description: "Transaction protection against scams or mistakes"
    },
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "Multi-Wallet Support",
      description: "Connect & switch multiple wallets seamlessly"
    }
  ]

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
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-3">Key Features</h2>
          <p className="text-foreground/80">
            Bridging crypto and everyday payments
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-lg p-6 transition-all"
              whileHover={{ 
                y: -8, 
                boxShadow: "0 15px 30px -10px rgba(124,58,237,0.15)",
                borderColor: "rgba(124,58,237,0.5)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

