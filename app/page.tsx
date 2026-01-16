"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, Mail, Github, Linkedin, Twitter, Download, Terminal } from "lucide-react"

// --- Hook: Decrypt Effect (HyperText) ---
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"

const HyperText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text)
  const iterations = useRef(0)

  const triggerAnimation = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)]
          })
          .join("")
      )
      if (iteration >= text.length) {
        clearInterval(interval)
      }
      iteration += 1 / 3
    }, 30)
  }

  return (
    <span
      className={className}
      onMouseEnter={triggerAnimation}
      onLoad={triggerAnimation} // Optional: trigger on mount?
    >
      {displayText}
    </span>
  )
}

// --- Component: Magnetic Button ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const position = { x: useMotionValue(0), y: useMotionValue(0) }

  // Smooth physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(position.x, springConfig)
  const y = useSpring(position.y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    position.x.set(middleX * 0.15) // Adjust strength
    position.y.set(middleY * 0.15)
  }

  const reset = () => {
    position.x.set(0)
    position.y.set(0)
  }

  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

// --- Component: Social Link with Theme Colors ---
const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <Link
    href={href}
    target="_blank"
    className="p-3 rounded-full bg-secondary/10 border border-border/50 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-110"
  >
    <Icon className="w-5 h-5" />
  </Link>
)

export default function HomePage() {
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // --- Particles Effect (Theme Aware) ---
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get Theme Color from CSS Variable
    const getThemeColor = () => {
      const style = getComputedStyle(document.body)
      // Try to get --primary. If it returns oklch, canvas might need a fallback or direct parsing
      // Ideally, we'd convert oklch to hex/rgb for canvas, but modern browsers support oklch in fillStyle.
      // Let's grab the value and wrap it in oklch() if needed, or just assume the browser handles the variable.
      // Actually, retrieving the variable value is safer. 
      // For simplicity/robustness in this environment, I'll rely on a known fallback or basic check.
      // BUT, since user wants "ACCORDING TO THEME", I will try to use the computed property.

      // Quick Hack: Create a temp element to resolve the color
      const temp = document.createElement('div');
      temp.style.color = 'var(--primary)';
      document.body.appendChild(temp);
      const color = getComputedStyle(temp).color; // This resolves to rgb(...) usually
      document.body.removeChild(temp);
      return color || 'rgba(120, 50, 200, 1)'; // Fallback: Purple-ish
    }

    let primaryColor = getThemeColor();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      primaryColor = getThemeColor(); // Refresh on resize (in case theme changes)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.globalAlpha = particle.opacity
        ctx.fill()
        ctx.globalAlpha = 1.0
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 130) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = primaryColor
            ctx.globalAlpha = 0.1 * (1 - distance / 130)
            ctx.lineWidth = 0.5
            ctx.stroke()
            ctx.globalAlpha = 1.0
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-hidden font-sans">

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas
          ref={particlesRef}
          className="absolute inset-0 w-full h-full opacity-50"
        />
        {/* Deep, ambient glows using Theme Colors */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

          {/* Typography Section (Spans 7 columns) */}
          <motion.div
            style={{ y }}
            className="lg:col-span-7 space-y-8 lg:pr-12 relative z-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
            >
              {/* Terminal Subtext */}
              <div className="flex items-center gap-3 mb-6 overflow-hidden">
                <Terminal className="w-4 h-4 text-primary animate-pulse" />
                <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-primary/80 uppercase">
                  System.Initialize(<span className="text-foreground">Dev_Profile</span>)
                </span>
              </div>

              {/* Decrypting Title */}
              <h1 className="relative text-6xl sm:text-7xl lg:text-[7.5rem] font-bold leading-[0.9] tracking-tighter mb-8 cursor-default">
                <div className="flex flex-col">
                  <HyperText text="Yashvi" className="text-foreground" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                    Dholakiya
                  </span>
                </div>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed border-l-2 border-primary/20 pl-6 backdrop-blur-sm">
                Architecting <span className="text-primary font-medium">digital realities</span>.
                I turn chaotic ideas into clean, performant code. Full-stack engineering with a focus on
                <span className="text-primary ml-1 border-b border-primary/30 pb-0.5">future-proof design</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-wrap gap-6 pt-8 items-center"
            >
              <Magnetic>
                <Link href="/projects" className="relative group overflow-hidden px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link href="/resume" className="group flex items-center gap-2 px-6 py-4 rounded-full border border-border/50 bg-background/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-sm font-medium backdrop-blur-md">
                  <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  <span>Resume</span>
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="pt-16 flex items-center gap-6 text-muted-foreground/30"
            >
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <SocialLink href="https://github.com/yashvi-3106" icon={Github} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="mailto:your@email.com" icon={Mail} />
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Ghost Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="lg:col-span-5 relative h-[500px] flex items-center justify-center lg:justify-end perspective-1000"
          >
            <div className="relative w-full h-full max-w-[500px] flex items-center justify-center transform-style-3d group">
              {/* Ethereal Mask */}
              <div
                className="absolute inset-0 z-0 bg-transparent"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/3Al7YsOAbs4?autoplay=1&mute=1&controls=0&loop=1&playlist=3Al7YsOAbs4"
                  className="w-full h-full object-cover opacity-80 mix-blend-screen scale-110 pointer-events-none group-hover:scale-115 transition-transform duration-700 ease-out"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Theme-Colored Decorative Lines */}
              <div className="absolute inset-0 border border-primary/20 rounded-full scale-75 opacity-20 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-0 border border-t-secondary/30 border-r-transparent border-b-transparent border-l-transparent rounded-full scale-110 opacity-30 animate-pulse pointer-events-none" />

              {/* Floating Particles/Glints around video */}
              <div className="absolute top-1/4 -right-10 w-2 h-2 bg-primary rounded-full animate-ping opacity-50" />
              <div className="absolute bottom-1/4 -left-10 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse opacity-50 delay-700" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}