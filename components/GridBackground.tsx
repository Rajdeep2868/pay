"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function GridBackground() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"></div>
      
      {/* Grid */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        <motion.div
          initial={{ rotateX: 45, rotateZ: 0 }}
          animate={{ rotateX: 45, rotateZ: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 grid grid-cols-8 gap-6 p-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-gradient-to-b from-purple-500/30 to-violet-500/30 rounded-lg"
                style={{
                  transform: `translateZ(${Math.sin((i / 64) * Math.PI) * 60}px)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gradient overlays - reduced opacity for more grid visibility */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_90%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-90"></div>
    </motion.div>
  )
} 