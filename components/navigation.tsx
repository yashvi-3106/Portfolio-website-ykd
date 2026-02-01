"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Shield, Clock } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Activity", href: "/activity" },
  { name: "Resume", href: "/resume" },
  { name: "Verify", href: "/certificates" },
  { name: "Contact", href: "/contact" },
]

const SystemClock = () => {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <span className="tabular-nums">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
    </span>
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none">
      <nav className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* Holographic Logo / ID Section */}
        <Link
          href="/"
          data-text="HOME"
          className="relative group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-all duration-500 cyber-pill"
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 leading-none mb-1">ID_VERIFIED</span>
            <span className="text-sm font-black tracking-tight text-white group-hover:text-primary transition-colors">YASHVI_D.SYS</span>
          </div>
        </Link>

        {/* Cyber-Deck Navigation Pill */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl cyber-pill">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                data-text={item.name.toUpperCase()}
                className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? "text-black" : "text-white/40 hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white rounded-full z-0 cyber-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* System Metrics Deck */}
        <div className="hidden md:flex items-center gap-6 px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 cyber-pill">
          <div className="flex items-center gap-3 pr-6 border-r border-white/10">
            <Shield className="w-4 h-4 text-primary opacity-50" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20 leading-none mb-1">Status</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">SECURE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-white/20" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20 leading-none mb-1">System_Clock</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none">
                <SystemClock />
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 text-white cyber-pill"
        >
          <Terminal className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 lg:hidden pointer-events-auto"
          >
            <div className="p-4 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 flex flex-col gap-2 scanline-effect shadow-2xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-text={item.name.toUpperCase()}
                  className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${pathname === item.href ? "bg-primary text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}