"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, ChevronDown, User, Home, Send, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface NavLinkProps {
  href: string;
  text: string;
  isActive: boolean;
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check initial size
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [pathname])

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setIsProfileOpen(false)
  }

  // Animation variants for the navbar
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
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

          <div className="hidden md:flex items-center space-x-1 relative">
            <div className="absolute bottom-0 h-full pointer-events-none">
              {pathname === "/" && (
                <motion.div 
                  layoutId="navIndicator"
                  className="absolute bottom-0 h-full w-full flex items-center justify-center"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <div className="h-[85%] w-full rounded-md bg-purple-500/10 border border-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)]" />
                </motion.div>
              )}
            </div>
            <NavLink href="/" text="Home" isActive={pathname === "/"} />
            
            <div className="absolute bottom-0 h-full left-[73px] pointer-events-none">
              {pathname === "/dashboard" && (
                <motion.div 
                  layoutId="navIndicator"
                  className="absolute bottom-0 h-full w-full flex items-center justify-center"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <div className="h-[85%] w-full rounded-md bg-purple-500/10 border border-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)]" />
                </motion.div>
              )}
            </div>
            <NavLink
              href="/dashboard"
              text="Dashboard"
              isActive={pathname === "/dashboard"}
            />
            
            {user && (
              <>
                <div className="absolute bottom-0 h-full left-[173px] pointer-events-none">
                  {pathname === "/pay" && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute bottom-0 h-full w-full flex items-center justify-center"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                      <div className="h-[85%] w-full rounded-md bg-purple-500/10 border border-purple-500/20 shadow-[0_0_10px_rgba(147,51,234,0.2)]" />
                    </motion.div>
                  )}
                </div>
                <NavLink
                  href="/pay"
                  text="Pay"
                  isActive={pathname === "/pay"}
                />
              </>
            )}
            
            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all ml-2 text-white bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-[0_0_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_15px_rgba(239,68,68,0.7)] relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Out</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700/60 to-rose-600/60 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -inset-1 rounded-md scale-[1.05] bg-gradient-to-r from-red-500/30 to-rose-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-5 py-2 rounded-md bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white font-medium transition-all shadow-[0_0_10px_rgba(147,51,234,0.5)] hover:shadow-[0_0_15px_rgba(147,51,234,0.7)] transform hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-700/60 to-purple-600/60 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -inset-1 rounded-md scale-[1.05] bg-gradient-to-r from-violet-500/30 to-purple-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            )}
          </div>

          {/* Hide hamburger menu on mobile when user is logged in and not in specific pages */}
          {(!isMobile || !user || (user && (pathname === '/about' || pathname === '/onboarding'))) && (
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            <MobileNavLink
              href="/"
              text="Home"
              isActive={pathname === "/"}
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              href="/dashboard"
              text="Dashboard"
              isActive={pathname === "/dashboard"}
              onClick={() => setIsMenuOpen(false)}
            />
            {user && (
              <MobileNavLink
                href="/pay"
                text="Pay"
                isActive={pathname === "/pay"}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
            
            {user ? (
              <motion.button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-[0_0_10px_rgba(239,68,68,0.4)] relative overflow-hidden"
              >
                <span className="relative z-10">Sign Out</span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-full w-1 bg-red-400"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ) : (
              <motion.div
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-md bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white font-medium shadow-[0_0_10px_rgba(147,51,234,0.4)] relative overflow-hidden"
                >
                  <span className="relative z-10">Sign In</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-full w-1 bg-violet-400"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ href, text, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-md text-sm font-medium transition-colors text-white hover:text-purple-300 group"
    >
      {text}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-violet-300 rounded-full"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: "70%", x: "-50%" }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut" 
          }}
        />
      )}
      <motion.div 
        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-purple-400/70 to-violet-300/70 rounded-full opacity-0 group-hover:opacity-100"
        initial={{ width: 0, x: "-50%" }}
        animate={isActive ? { width: 0 } : { width: "0%" }}
        whileHover={{ width: "50%", x: "-50%" }}
        transition={{ 
          duration: 0.2, 
          ease: "easeOut" 
        }}
      />
    </Link>
  )
}

function MobileNavLink({ href, text, isActive, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 rounded-md text-sm font-medium relative overflow-hidden transition-all ${
        isActive
          ? "bg-indigo-900/60 text-purple-300"
          : "text-white hover:bg-indigo-900/40"
      }`}
    >
      {text}
      {isActive && (
        <motion.div 
          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-violet-300"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  )
}

