"use client"

import { motion } from "framer-motion"
import { ArrowRight, CreditCard, Zap, ShieldCheck, Globe } from "lucide-react"

const features = [
  {
    title: "Pay Anywhere",
    description: "Use crypto for payments on any platform, even those that don't accept cryptocurrency directly.",
    icon: <Globe className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Instant Conversion",
    description: "Real-time crypto-to-fiat conversion ensures merchants receive their preferred currency seamlessly.",
    icon: <Zap className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Virtual Cards",
    description: "Generate virtual payment cards funded by your crypto wallet for online shopping anywhere.",
    icon: <CreditCard className="h-8 w-8" />,
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "Secure Transactions",
    description: "Reversible payments and escrow protection safeguard your funds against scams and mistakes.",
    icon: <ShieldCheck className="h-8 w-8" />,
    color: "from-orange-500 to-amber-400"
  }
]

export default function FeatureShowcase() {
  return (
    <section className="py-16 bg-background/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold leading-tight">
              Spend Crypto <span className="text-primary">Anywhere</span>
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed">
              FusionPay is a next-gen crypto payment solution that lets users seamlessly spend crypto anywhere—even on platforms that don't support it.
            </p>
            
            <div className="space-y-8 mt-10">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex gap-4"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative h-full"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-400/10 rounded-3xl p-8 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.1),transparent_60%)]"></div>
              
              <div className="grid grid-cols-1 gap-6 relative z-10">
                {features.slice(2, 4).map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3 + index * 0.2, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    className="bg-background/80 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 15px 30px -10px rgba(124,58,237,0.15)",
                      borderColor: "rgba(124,58,237,0.3)"
                    }}
                  >
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

