"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Mail, Github, Linkedin, MapPin, Calendar, GraduationCap } from "lucide-react"
import { SiReact, SiMongodb, SiNodedotjs, SiExpress, SiCss3, SiTailwindcss, SiMui, SiJavascript, SiFigma, SiHtml5 } from "react-icons/si"

const educationData = [
  {
    year: "2024-2028",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    institution: "Rai University x CodingGita",
    grade: "CGPA: 9.76",
    description: "Specialized in full-stack development, data structures, and software engineering principles.",
  },
  {
    year: "2022-2024",
    degree: "Higher Secondary Certificate",
    field: "Science Stream (PCM)",
    institution: "Bhagwan Mahaavir International School (CBSE)",
  },
  {
    year: "2021-2022",
    degree: "Secondary School Certificate",
    institution: "Lancers Army School",
  },
]

export default function AboutPage() {
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

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
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

      // Draw connecting lines
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - distance / 80)})`
            ctx.lineWidth = 0.8
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-screen">
          {/* Left Side - Fixed Card */}
          <div className="lg:sticky lg:top-30 lg:h-fit">
            <div className="relative bg-white border border-black rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up">
              {/* Background Particles */}
              <canvas
                ref={particlesRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: "transparent", zIndex: 0 }}
              />
              {/* Profile Photo */}
              <div className="relative mb-6 z-10">
                <div className="w-48 h-48 mx-auto rounded-lg overflow-hidden border-4 border-primary/20 bg-primary animate-float">
                  <Image
                    src="https://ik.imagekit.io/viik8o1ol/WhatsApp%20Image%202025-04-23%20at%2013.53.40_81c4f6f8.jpg"
                    alt="Yashvi Dholakiya"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="relative text-center mb-4 z-10">
                <h2 className="text-2xl font-bold text-black mb-2">Yashvi Dholakiya</h2>
              </div>

              {/* Dotted Line with Flame */}
              <div className="relative flex items-center justify-center mb-4 z-10">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t border-dashed border-primary"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.5c-2.24 0-4.3 1.08-5.6 2.9-1.3 1.82-2 4.02-2 6.1 0 2.08.7 4.28 2 6.1 1.3 1.82 3.36 2.9 5.6 2.9 2.24 0 4.3-1.08 5.6-2.9 1.3-1.82 2-4.02 2-6.1 0-2.08-.7-4.28-2-6.1-1.3-1.82-3.36-2.9-5.6-2.9zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                </div>
              </div>

              {/* Description */}
              <div className="relative text-center mb-40 z-10">
                <p className="text-sm text-black leading-relaxed">
                  A Full-Stack Developer who has developed countless innovative solutions.
                </p>
              </div>
                {/* Dotted Line with Flame */}
                <div className="relative flex items-center justify-center mb-4 z-10">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t border-dashed border-primary"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.5c-2.24 0-4.3 1.08-5.6 2.9-1.3 1.82-2 4.02-2 6.1 0 2.08.7 4.28 2 6.1 1.3 1.82 3.36 2.9 5.6 2.9 2.24 0 4.3-1.08 5.6-2.9 1.3-1.82 2-4.02 2-6.1 0-2.08-.7-4.28-2-6.1-1.3-1.82-3.36-2.9-5.6-2.9zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  </svg>
                </div>
              </div>

              {/* Contact Links */}
              <div className="relative flex justify-center space-x-4 z-10">
                <a href="mailto:yashvidholakiya.cg@gmail.com" className="text-primary hover:text-white p-2 rounded-full hover:bg-primary transition-all duration-200" title="Email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/yashvi-dholakiya/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white p-2 rounded-full hover:bg-primary transition-all duration-200" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/yashvi-3106" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white p-2 rounded-full hover:bg-primary transition-all duration-200" title="GitHub">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Education Timeline */}
            <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                <GraduationCap className="w-8 h-8 text-primary mr-3" />
                Education Journey
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

                <div className="space-y-8">
                  {educationData.map((edu, index) => (
                    <div key={index} className="relative flex items-start space-x-6 group">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                          <div className="flex items-center text-sm text-primary font-medium">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.year}
                          </div>
                        </div>

                        <p className="text-accent font-medium mb-2">{edu.field}</p>
                        <p className="text-muted-foreground mb-2">{edu.institution}</p>
                        <p className="text-sm font-medium text-primary mb-3">{edu.grade}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-3xl font-bold text-foreground mb-8">Skills</h2>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* React */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiReact className="text-teal-400 text-2xl" />
                    <span className="text-sm font-medium text-foreground">React</span>
                  </div>
                  {/* MongoDB */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiMongodb className="text-emerald-500 text-2xl" />
                    <span className="text-sm font-medium text-foreground">MongoDB</span>
                  </div>
                  {/* Node.js */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiNodedotjs className="text-green-500 text-2xl" />
                    <span className="text-sm font-medium text-foreground">Node.js</span>
                  </div>
                  {/* Express.js */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiExpress className="text-stone-300 text-2xl" />
                    <span className="text-sm font-medium text-foreground">Express.js</span>
                  </div>
                  {/* CSS */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiCss3 className="text-blue-500 text-2xl" />
                    <span className="text-sm font-medium text-foreground">CSS</span>
                  </div>
                  {/* Tailwind CSS */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiTailwindcss className="text-cyan-400 text-2xl" />
                    <span className="text-sm font-medium text-foreground">Tailwind CSS</span>
                  </div>
                  {/* Material UI */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiMui className="text-sky-500 text-2xl" />
                    <span className="text-sm font-medium text-foreground">Material UI</span>
                  </div>
                  {/* JavaScript */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiJavascript className="text-amber-400 text-2xl" />
                    <span className="text-sm font-medium text-foreground">JavaScript</span>
                  </div>
                  {/* UI/UX */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiFigma className="text-rose-400 text-2xl" />
                    <span className="text-sm font-medium text-foreground">UI/UX</span>
                  </div>
                  {/* HTML */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/40">
                    <SiHtml5 className="text-orange-500 text-2xl" />
                    <span className="text-sm font-medium text-foreground">HTML</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed About Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-3xl font-bold text-foreground mb-8">About Myself</h2>

              <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Hello! I'm Yashvi Dholakiya, a passionate full-stack developer with a love for creating innovative
                    digital solutions. My journey in technology began during my college years, where I discovered the
                    power of code to transform ideas into reality.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I specialize in modern web technologies including React, Next.js, Node.js, and various databases. My
                    approach to development is centered around creating user-centric applications that not only look
                    great but also provide exceptional user experiences.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source
                    projects, or sharing my knowledge with the developer community. I believe in continuous learning and
                    staying updated with the latest trends in technology.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Technical Skills</h4>
                      <p className="text-sm text-muted-foreground">
                        React, Next.js, JavaScript, Node.js, SQL, MongoDB, AWS, Docker
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Interests</h4>
                      <p className="text-sm text-muted-foreground">
                        Web Development, UI/UX Design, Open Source
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}