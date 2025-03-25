"use client"

import { motion } from "framer-motion"
import { Wallet2, CreditCard, ShieldCheck, ArrowRightLeft } from "lucide-react"

export default function SpendAnywhere() {
  const features = [
    {
      title: "Pay Anywhere",
      description: "Use your crypto balance at any merchant that accepts traditional payments.",
      icon: Wallet2,
      gradient: "from-purple-500/20 to-violet-500/20"
    },
    {
      title: "Instant Conversion",
      description: "Your crypto is converted to local currency in real-time at the best rates.",
      icon: ArrowRightLeft,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Virtual Cards",
      description: "Generate virtual cards instantly for online purchases with full control.",
      icon: CreditCard,
      gradient: "from-violet-500/20 to-indigo-500/20"
    },
    {
      title: "Secure Transactions",
      description: "Every transaction is protected with military-grade encryption.",
      icon: ShieldCheck,
      gradient: "from-indigo-500/20 to-blue-500/20"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-background to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Spend Crypto{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 text-transparent bg-clip-text">
              Anywhere
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            FusionPay is a next-gen crypto payment solution that lets users seamlessly
            spend crypto anywhere—even on platforms that don't support it.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 p-8 h-full hover:border-white/20 transition-colors">
                <feature.icon className="w-12 h-12 text-white mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl font-medium text-white
                         hover:from-purple-700 hover:to-violet-700 transition-all duration-200
                         shadow-[0_8px_32px_rgba(168,85,247,0.3)]">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
} 