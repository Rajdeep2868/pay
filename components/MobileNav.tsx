"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Wallet, Send, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (!user && (pathname === "/" || pathname === "/login")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-3 shadow-lg">
      <div className="flex justify-around items-center">
        <NavItem 
          href="/" 
          icon={<Home className="h-5 w-5" />} 
          label="Home" 
          isActive={pathname === "/"} 
        />
        
        <NavItem 
          href="/dashboard" 
          icon={<Wallet className="h-5 w-5" />} 
          label="Dashboard" 
          isActive={pathname === "/dashboard"} 
        />
        
        {user && (
          <NavItem 
            href="/pay" 
            icon={<Send className="h-5 w-5" />} 
            label="Pay" 
            isActive={pathname === "/pay"} 
          />
        )}
        
        {!user && (
          <NavItem 
            href="/login" 
            icon={<User className="h-5 w-5" />} 
            label="Sign In" 
            isActive={pathname === "/login"} 
          />
        )}
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg ${
        isActive ? "text-emerald-400 bg-slate-800" : "text-slate-400 hover:text-white"
      }`}
    >
      <div className="relative">
        {icon}
        {isActive && (
          <motion.div 
            className="absolute -bottom-1 -left-1 -right-1 h-0.5 bg-emerald-400 rounded-full"
            layoutId="bottomNav"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}