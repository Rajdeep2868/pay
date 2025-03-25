"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
                <div className="relative w-full h-full bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 p-4">
                  <Image
                    src="/qr.png"
                    alt="FusionPay QR Code"
                    fill
                    className="object-contain p-2"
                    priority
                  />
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
                Scan for a Free Trial on your iOS Device
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Boost your workflow, save time, and let AI handle the heavy lifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link 
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M17.5 12.5C17.5 15.2614 15.2614 17.5 12.5 17.5C9.73858 17.5 7.5 15.2614 7.5 12.5C7.5 9.73858 9.73858 7.5 12.5 7.5C15.2614 7.5 17.5 9.73858 17.5 12.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12.5 2.5V4.5M12.5 20.5V22.5M4.5 12.5H2.5M22.5 12.5H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-white">Get it From App Store</span>
                </Link>
                <Link 
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-white">Get it From Play Store</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 