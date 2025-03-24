"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, CreditCard, Wallet, Globe } from "lucide-react"

const stats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: "50,000+",
    label: "Active Users",
    description: "Growing community of crypto enthusiasts",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    value: "1M+",
    label: "Transactions",
    description: "Processed securely every month",
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    value: "15+",
    label: "Supported Chains",
    description: "All major blockchains integrated",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    value: "100+",
    label: "Countries",
    description: "Global coverage and accessibility",
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(124,58,237,0.1)" }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <motion.h3
                className="text-3xl font-bold mb-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-lg font-medium mb-2">{stat.label}</p>
              <p className="text-sm text-foreground/70">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

