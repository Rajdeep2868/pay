"use client";

import Hero from "@/components/hero"
import Features from "@/components/features"
import MultiChainCarousel from "@/components/multi-chain-carousel"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <MultiChainCarousel />
      <Features />
      <Testimonials />
    </div>
  )
}

