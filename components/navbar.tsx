"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-indigo-950/95 via-purple-900/95 to-indigo-950/95 backdrop-blur-md shadow-md border-b border-purple-500/20"
          : "bg-gradient-to-r from-indigo-950/70 via-purple-900/70 to-indigo-950/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full blur-sm opacity-80"></div>
              <div className="absolute inset-0.5 bg-indigo-950 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-white">FusionPay</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" text="Home" isActive={pathname === "/"} />
            <NavLink href="/dashboard" text="Dashboard" isActive={pathname === "/dashboard"} />
            {user && <NavLink href="/pay" text="Pay" isActive={pathname === "/pay"} />}
            
            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 transition-all"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-md bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white font-medium transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            <MobileNavLink href="/" text="Home" isActive={pathname === "/"} onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="/dashboard" text="Dashboard" isActive={pathname === "/dashboard"} onClick={() => setIsMenuOpen(false)} />
            {user && <MobileNavLink href="/pay" text="Pay" isActive={pathname === "/pay"} onClick={() => setIsMenuOpen(false)} />}
            
            {user ? (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-500"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-500 text-white font-medium"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ href, text, isActive }: { href: string; text: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? "text-purple-300 bg-purple-500/10" : "text-white hover:text-purple-300"
      }`}
    >
      {text}
    </Link>
  )
}

function MobileNavLink({ href, text, isActive, onClick }: { href: string; text: string; isActive: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-md text-sm font-medium ${
        isActive ? "bg-indigo-900/60 text-purple-300" : "text-white hover:bg-indigo-900/40"
      }`}
    >
      {text}
    </Link>
  )
}