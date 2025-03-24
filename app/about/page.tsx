"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About FusionPay</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            We're on a mission to bridge the gap between crypto and everyday payments, making digital currencies accessible to everyone.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-foreground/80 mb-4">
              At FusionPay, we envision a world where cryptocurrency is as easy to use as traditional currency, accessible to anyone regardless of technical expertise.
            </p>
            <p className="text-foreground/80 mb-4">
              We believe in financial inclusion and empowerment through blockchain technology, reducing costs, increasing accessibility, and creating new opportunities for people worldwide.
            </p>
            <p className="text-foreground/80">
              Our platform serves as a bridge between the innovative world of digital assets and everyday financial needs, helping users navigate both realms seamlessly.
            </p>
          </motion.div>
          
          <motion.div
            className="rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-video relative bg-gray-200">
              {/* In a real app, this would be an actual image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20">
                <p className="text-foreground/50">Vision Image</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard 
              title="Accessibility" 
              description="Making crypto usable for everyone, regardless of technical background or experience level."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              }
            />
            
            <ValueCard 
              title="Security" 
              description="Prioritizing robust security measures to protect user assets and data at all times."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              }
            />
            
            <ValueCard 
              title="Innovation" 
              description="Continuously improving our technology to adapt to the evolving landscape of digital finance."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              }
            />
          </div>
        </motion.div>
        
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Sarah Johnson" 
              role="Founder & CEO"
              bio="Former fintech executive with 15+ years of experience in payment solutions."
            />
            
            <TeamMember 
              name="David Chen" 
              role="CTO"
              bio="Blockchain architect who previously led development at a major cryptocurrency exchange."
            />
            
            <TeamMember 
              name="Maria Rodriguez" 
              role="Head of Product"
              bio="UX specialist focused on making complex financial products intuitive for everyday users."
            />
            
            <TeamMember 
              name="Alex Patel" 
              role="Head of Partnerships"
              bio="Expert in building strategic alliances with both traditional financial and crypto ecosystems."
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-8">
            We're constantly growing and looking for passionate individuals who share our vision of transforming digital payments.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-lg font-medium transition-all hover:bg-primary/90">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function ValueCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl p-6"
    >
      <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
}

function TeamMember({ name, role, bio }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden"
    >
      <div className="h-48 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20">
          <p className="text-foreground/50">Profile Photo</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3">{role}</p>
        <p className="text-foreground/70 text-sm">{bio}</p>
      </div>
    </motion.div>
  );
} 