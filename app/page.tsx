"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start space-y-6 animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">Hi, I am</h2>
              <div className="relative">
                <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-primary/20 animate-float">
                  <Image
                    src="https://ik.imagekit.io/viik8o1ol/db03b8da-1cea-4a9e-a017-627bd9ca0fb2.png?updatedAt=1754382100734"
                    alt="Yashvi Dholakiya"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>

            <h1 className="text-1xl md:text-3xl lg:text-6xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Yashvi Dholakiya
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-md text-center lg:text-left">
              Full-Stack Developer crafting digital experiences with passion and precision
            </p>

            <div className="flex space-x-6">
              <Link href="/projects">
                <button className="relative px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-2">
                    <span>View My Work</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </Link>
              <Link href="/contact">
                <button className="relative px-6 py-3 border-2 border-primary text-primary rounded-full overflow-hidden group">
                  <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-2">
                    <span>Get In Touch</span>
                    <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Center Section - Video Circle */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden animate-glow-pulse border-4 border-primary/30">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/coding-workspace-multimonitors.png"
                >
                  <source src="/intro-video.mp4" type="video/mp4" />
                  <Image
                    src="/modern-developer-setup.png"
                    alt="Introduction Video"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </video>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
              <div className="absolute -inset-4 rounded-full border border-accent/10 animate-pulse" />
              <div
                className="absolute -inset-8 rounded-full border border-primary/5 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>

          {/* Right Section - Animated Elements */}
          <div className="relative h-96 lg:h-full">
            <canvas
              ref={particlesRef}
              className="absolute inset-0 w-full h-full"
              style={{ background: "transparent" }}
            />

            {/* Floating geometric shapes */}
            <div
              className="absolute top-10 right-10 w-16 h-16 border-2 border-primary/30 rotate-45 animate-float"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-20 left-10 w-12 h-12 bg-accent/20 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-8 h-8 bg-primary/40 transform rotate-45 animate-float"
              style={{ animationDelay: "1.5s" }}
            />

            {/* Code-like text animations */}
            <div className="absolute top-10 right-10 font-mono text-sm text-muted-foreground/50 animate-pulse">
              <div>{"<Developer />"}</div>
              <div className="ml-4">{"passion: true"}</div>
              <div className="ml-4">{"creativity: ∞"}</div>
              <div>{"</>"}</div>
            </div>
            <div className="absolute bottom-10 left-10 font-mono text-sm text-muted-foreground/50 animate-pulse" style={{ animationDelay: "0.5s" }}>
              <div>{"<Code />"}</div>
              <div className="ml-4">{"innovation: 100%"}</div>
              <div className="ml-4">{"impact: global"}</div>
              <div>{"</>"}</div>
            </div>
            <div className="absolute top-1/2 right-1/4 font-mono text-sm text-muted-foreground/50 animate-pulse" style={{ animationDelay: "1s" }}>
              <div>{"<Build />"}</div>
              <div className="ml-4">{"quality: premium"}</div>
              <div className="ml-4">{"speed: optimized"}</div>
              <div>{"</>"}</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}