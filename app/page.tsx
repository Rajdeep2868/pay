"use client";

import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import MultiChainCarousel from "@/components/MultiChainCarousel"
import SpendAnywhere from "@/components/SpendAnywhere"
import QRCodeSection from "@/components/QRCodeSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <main className="relative">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-950/30 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-950/20 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-violet-950/20 rounded-full blur-[100px] opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative">
          <Hero />
          <MultiChainCarousel />
          <SpendAnywhere />
          <QRCodeSection />
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  )
}