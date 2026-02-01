"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Code2,
  Database,
  Globe,
  Cpu,
  Terminal,
  Layout,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  Server,
  Wrench,
  Layers
} from "lucide-react"
import { useState, useEffect } from "react"

// --- Shared Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat shadow-inner" />
)

const MeshGradient = () => (
  <div className="fixed inset-0 -z-10 bg-background overflow-hidden">
    <div className="absolute top-[-15%] left-[-15%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[60px]" />
    <div className="absolute bottom-[-15%] right-[-15%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[60px]" />
  </div>
)

const BentoCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay
    }}
    viewport={{ once: true }}
    className={`bg-card/80 text-card-foreground border border-border/50 rounded-[2.5rem] p-8 shadow-xl hover:border-primary/20 transition-all group overflow-hidden relative ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

const TechPill = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-muted/30 rounded-full text-xs font-bold tracking-tight text-muted-foreground border border-border/50 group/pill hover:border-primary/30 transition-colors">
    <Icon className="w-4 h-4 group-hover/pill:text-primary transition-colors" />
    <span>{label}</span>
  </div>
)

const LiveClock = () => {
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground h-[20px]" />
  }

  return (
    <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
      <Clock className="w-4 h-4 text-primary" />
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden pb-24">
      <GrainOverlay />
      <MeshGradient />

      <div className="container max-w-7xl mx-auto px-6 pt-32 space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-border/20 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
              ABOUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">MYSYSTEM</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
              Full-Stack Engineer dedicated to crafting <span className="text-foreground font-medium">high-performance</span> digital realities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 shadow-lg glow-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Sparkles className="w-4 h-4 animate-pulse ml-1" />
            Direct Access Active
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">

          {/* 1. Profile Bio (Large) */}
          <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col justify-between" delay={0.1}>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl skew-x-3 hover:skew-x-0 transition-transform duration-500">
                  <Image
                    src="https://ik.imagekit.io/viik8o1ol/WhatsApp%20Image%202025-04-23%20at%2013.53.40_81c4f6f8.jpg"
                    alt="Yashvi"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full scale-110"
                  />
                </div>
                <div className="text-left">
                  <h2 className="text-4xl font-black tracking-tighter">YASHVI DHOLAKIYA</h2>
                  <p className="text-primary font-mono text-sm tracking-widest uppercase mt-1">Foundational Entity</p>
                </div>
              </div>

              <div className="space-y-6 max-w-3xl text-left">
                <p className="text-xl text-foreground font-medium leading-relaxed">
                  I engineer full-stack applications with a focus on organized logic and immersive aesthetics.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  My mission is to transform complex business requirements into seamless, high-speed digital products. Based in India, I've spent thousands of hours mastering the Node-React ecosystem, ensuring that every project I touch is architected for both scale and visual excellence.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/20 flex flex-wrap gap-8 items-center">
              <Link href="mailto:yashvidholakiya.cg@gmail.com" className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-primary transition-all">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                Transmit Message
              </Link>
              <Link href="https://github.com/yashvi-3106" target="_blank" className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:text-primary transition-all">
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                Codebase Registry
              </Link>
            </div>
          </BentoCard>

          {/* 2. Map / Location */}
          <BentoCard className="md:col-span-4 bg-primary/5 flex flex-col items-center justify-center text-center gap-6 group" delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 group-hover:bg-primary/40 transition-colors" />
              <div className="relative w-20 h-20 bg-card rounded-3xl border border-border flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight">Gujarat, India</h3>
              <LiveClock />
            </div>
          </BentoCard>

          {/* 3. Education (Stats style) */}
          <BentoCard className="md:col-span-4 bg-primary text-primary-foreground border-none flex flex-col justify-between" delay={0.3}>
            <Award className="w-12 h-12 mb-6 opacity-50" />
            <div className="space-y-1 text-left">
              <h3 className="text-6xl font-black">9.76</h3>
              <p className="text-sm font-black uppercase tracking-[0.2em] opacity-80">Academy GPA Score</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 text-left text-xs font-bold uppercase tracking-widest opacity-70 leading-relaxed">
              B.Tech Computer Science and Engineering<br />Rai University Systems
            </div>
          </BentoCard>

          {/* 4. Skills Registry (Categorized) */}
          <BentoCard className="md:col-span-12" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* Languages & Frameworks */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Languages & Frameworks</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TechPill icon={Terminal} label="JavaScript" />
                  <TechPill icon={Cpu} label="C++" />
                  <TechPill icon={Code2} label="React.js" />
                  <TechPill icon={Layout} label="HTML5" />
                  <TechPill icon={Layout} label="CSS3" />
                  <TechPill icon={Layout} label="Tailwind CSS" />
                  <TechPill icon={Layers} label="Material UI" />
                  <TechPill icon={Layers} label="Redux Toolkit" />
                </div>
              </div>

              {/* Backend & Databases */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <Server className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Backend & Databases</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TechPill icon={Database} label="Node.js" />
                  <TechPill icon={Server} label="Express.js" />
                  <TechPill icon={Database} label="MongoDB" />
                  <TechPill icon={Database} label="Mongoose" />
                  <TechPill icon={Globe} label="RESTful APIs" />
                  <TechPill icon={Globe} label="Cloudinary" />
                  <TechPill icon={Cpu} label="JWT" />
                  <TechPill icon={Cpu} label="Bcrypt" />
                </div>
              </div>

              {/* Tools & Platforms */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Tools & Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TechPill icon={Github} label="Git" />
                  <TechPill icon={Github} label="GitHub" />
                  <TechPill icon={Terminal} label="Postman" />
                  <TechPill icon={Globe} label="Vercel" />
                  <TechPill icon={Globe} label="Netlify" />
                  <TechPill icon={Globe} label="Render" />
                </div>
              </div>

            </div>
          </BentoCard>

          {/* 5. LinkedIn / Social */}
          <BentoCard className="md:col-span-4 bg-[#0A66C2] text-white flex flex-col justify-between border-none group cursor-pointer" delay={0.5}>
            <div className="flex justify-between items-start">
              <Linkedin className="w-10 h-10" />
              <div className="p-3 bg-white/20 rounded-2xl group-hover:bg-white group-hover:text-[#0A66C2] transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
            <div className="text-left">
              <h4 className="text-3xl font-black tracking-tighter">NETWORK</h4>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Synchronize Professional Data</p>
            </div>
            <Link href="https://www.linkedin.com/in/yashvi-dholakiya/" className="absolute inset-0" target="_blank" />
          </BentoCard>

          {/* 6. Experience Stats */}
          <BentoCard className="md:col-span-4 flex flex-col justify-center items-center text-center py-12" delay={0.6}>
            <span className="text-7xl font-black text-primary tracking-tighter">25+</span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">Successful Operations</span>
          </BentoCard>

          {/* 7. Philosophy/Quote (Large) */}
          <BentoCard className="md:col-span-8 bg-muted/20 flex flex-col justify-center px-12 italic" delay={0.7}>
            <div className="space-y-4">
              <div className="text-primary text-6xl font-serif text-left opacity-30">"</div>
              <p className="text-3xl font-serif text-foreground leading-snug">
                The most powerful digital tool is not the code itself, but the clarity with which it solves human problems.
              </p>
              <div className="text-primary text-6xl font-serif text-right opacity-30">"</div>
            </div>
          </BentoCard>

        </div>

        {/* Footer Link Page */}
        <div className="pt-24 flex justify-center">
          <Link href="/projects" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">
            VIEW_RECORDS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}