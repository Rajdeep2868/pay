"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, signInWithGoogle } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(email, password)
      router.push("/dashboard")
    } catch {
      setError("Failed to sign in")
    }
    setLoading(false)
  }

  async function handleGoogleSignIn() {
    try {
      setError("")
      setLoading(true)
      await signInWithGoogle()
      router.push("/dashboard")
    } catch {
      setError("Failed to sign in with Google")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0A0A0A] p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-blue-900/5"></div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full blur-sm opacity-80"></div>
            <div className="absolute inset-1 bg-black rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ml-3">
            FusionPay
          </span>
        </Link>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/[0.05] rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/[0.05]">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                         transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent
                         transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl px-4 py-3 font-medium
                         hover:from-purple-700 hover:to-violet-700 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-[0_8px_32px_rgba(168,85,247,0.3)]"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.08]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-6 w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3
                       hover:bg-white/[0.1] transition-all duration-200 flex items-center justify-center gap-3
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5" />
              <span className="text-white font-medium">Google</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}