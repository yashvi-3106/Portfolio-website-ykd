"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, type Variants } from "framer-motion"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Activity", href: "/activity" },
  { name: "Resume", href: "/resume" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: 90, 
      transition: { duration: 0.4 } 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 120,
        damping: 15
      }
    }
  }

  const particleVariants: Variants = {
    animate: (i: number) => ({
      x: Math.cos(i * Math.PI * 0.5) * 50,
      y: Math.sin(i * Math.PI * 0.5) * 50,
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    }),
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/30 backdrop-blur-xl border-b border-border/50 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Orbital Particle Effect */}
        {isScrolled && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-primary/40 rounded-full filter blur-md"
                style={{
                  width: 8 + i * 2,
                  height: 8 + i * 2,
                  left: "50%",
                  top: "50%",
                }}
                variants={particleVariants}
                custom={i}
                animate="animate"
              />
            ))}
          </motion.div>
        )}

        <div className="flex items-center justify-between h-16">
          {/* Holographic Logo */}
          <Link href="/" className="relative group">
            <motion.span
              className="text-2xl font-extrabold text-primary tracking-tight"
              animate={{
                textShadow: [
                  "0 0 5px rgba(0,0,0,0.3)",
                  "0 0 10px rgba(0,255,255,0.5)",
                  "0 0 5px rgba(0,0,0,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              Yashvi Dholakiya
            </motion.span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"
              animate={{
                scaleX: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </Link>

          {/* Desktop Navigation with Neon Glow */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href 
                    ? "text-primary shadow-[0_0_15px_rgba(0,255,255,0.4)]" 
                    : "text-foreground hover:text-accent hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                }`}
              >
                <motion.span
                  whileHover={{ 
                    scale: 1.05, 
                    textShadow: "0 0 12px rgba(0,255,255,0.6)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  {item.name}
                </motion.span>
                {/* Sound Wave Effect */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/80"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/40"
                  animate={{
                    scaleX: [0.3, 0.7, 0.3],
                    x: [-10, 10, -10],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.3, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-accent transition-colors duration-200 relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <motion.span
                className="absolute inset-0 bg-accent/20 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Radial Gradient and 3D Flip */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-gradient-to-br from-background/90 to-primary/20 backdrop-blur-lg border-t border-border/50"
          >
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 relative group ${
                      pathname === item.href 
                        ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,255,255,0.3)]" 
                        : "text-foreground hover:bg-primary/10 hover:text-accent hover:shadow-[0_0_8px_rgba(0,255,255,0.2)]"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}