"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Download,
  Terminal,
  Code2,
  Globe,
  Cpu,
  Sparkles,
  Play,
  Clock,
  MapPin,
  ChevronRight,
  Database,
  ExternalLink
} from "lucide-react"

// --- Shared Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat shadow-inner" />
)

const MeshGradient = () => (
  <div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
)

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className={`group relative p-8 rounded-[2.5rem] bg-card/40 border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/20 overflow-hidden ${className}`}
  >
    {/* Subtle Glow on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

const TechPill = ({ name }: { name: string }) => (
  <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/20 transition-all cursor-default">
    {name}
  </span>
)

const LiveClock = () => {
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />

  return (
    <div className="flex items-center gap-3 font-mono">
      <div className="flex gap-1.5 items-center">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-black text-emerald-500/80 uppercase tracking-widest">LIVE_SYS_ONLINE</span>
      </div>
      <span className="text-2xl font-black tracking-tighter tabular-nums text-foreground">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </span>
    </div>
  )
}

// --- Main Template ---

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#060606] selection:bg-primary/30 pb-32 overflow-x-hidden">
      <GrainOverlay />
      <MeshGradient />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y: textY, opacity }} className="relative z-10 container max-w-7xl mx-auto text-center space-y-12">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-inner overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Operating in Flux Phase 1.0</span>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[10vw] font-black leading-[0.8] tracking-[-0.05em]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white"
              >
                YASHVI
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent stroke-text"
              >
                DHOLAKIYA
              </motion.span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-4xl mx-auto"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground/60 max-w-3xl mx-auto font-light leading-relaxed tracking-tight"
          >
            Engineering high-fidelity <span className="text-white font-medium">full-stack artifacts</span> optimized for the modern web ecosystem.
          </motion.p>
        </motion.div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] border border-white/[0.02] rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] border border-white/[0.02] rounded-full" />
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="container max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Intro Video Card */}
        <BentoCard className="md:col-span-12 lg:col-span-8 p-0 border-none bg-transparent" data-text="PLAY_REEL">
          <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#111]">
            <div className="absolute top-8 left-8 z-10 space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Visual_Briefing</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-end">
              <p className="max-w-md text-white/50 text-sm font-light">Synthesized demonstration of engineering and designer capabilities.</p>
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase text-white/40 tracking-widest">SEC_O3_INTEL</div>
            </div>

            <div className="h-full w-full aspect-video md:aspect-auto md:h-[500px]">
              <iframe
                src="https://www.youtube.com/embed/SUTEDFt9yQY?autoplay=1&loop=1&playlist=SUTEDFt9yQY&controls=0&modestbranding=1"
                className="w-full h-full object-cover grayscale-0 opacity-100 transition-all duration-700 group-hover:scale-105"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </BentoCard>

        {/* Stats Section */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-8">
          <BentoCard className="flex-1 bg-primary text-white border-none shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]">
            <div className="flex flex-col justify-between h-full space-y-12">
              <Cpu className="w-12 h-12 opacity-50" />
              <div>
                <h3 className="text-7xl font-black tracking-tighter">25.0</h3>
                <p className="text-xs font-black uppercase tracking-[0.3em] opacity-80">Full_Ops_Completed</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex flex-col justify-between h-full space-y-8">
              <div className="flex justify-between items-start">
                <Terminal className="w-6 h-6 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Core_Engine</span>
              </div>
              <h4 className="text-2xl font-black tracking-tight leading-tight">Full Stack Deployment Specialist</h4>
              <div className="pt-4 border-t border-white/5">
                <div className="flex gap-4">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Location & Links */}
        <BentoCard className="md:col-span-6">
          <div className="flex flex-col justify-between h-full space-y-10">
            <LiveClock />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Global_Pivot</p>
              <h4 className="text-3xl font-black flex items-center gap-3">GUJARAT, IN <MapPin className="w-6 h-6 text-primary" /></h4>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-6 lg:col-span-4 p-0">
          <Link href="/projects" data-text="VIEW_RECORDS" className="group flex flex-col h-full bg-white text-black p-8 hover:bg-primary hover:text-white transition-all duration-500">
            <div className="flex justify-between items-start mb-12">
              <ExternalLink className="w-10 h-10 -translate-x-1" />
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
            </div>
            <div>
              <h4 className="text-4xl font-black tracking-tighter uppercase leading-none">Access<br />Registry</h4>
              <p className="text-xs font-bold uppercase tracking-widest mt-4 opacity-70">Query_Artifact_Repository</p>
            </div>
          </Link>
        </BentoCard>

        {/* Social Transmitters */}
        <BentoCard className="md:col-span-12 lg:col-span-4">
          <div className="flex flex-col h-full justify-between gap-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Social_Synchronizer</span>
            <div className="flex justify-between items-center px-4">
              {[
                { icon: Github, href: "https://github.com/yashvi-3106" },
                { icon: Linkedin, href: "https://linkedin.com/in/yashvi-dholakiya/" },
                { icon: Mail, href: "mailto:yashvidholakiya.cg@gmail.com" }
              ].map((social, i) => (
                <a key={i} href={social.href} data-text="CONNECT" className="p-4 rounded-2xl bg-white/5 hover:bg-primary transition-all hover:-translate-y-2">
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
              <Link href="/resume" data-text="DOWNLOAD" className="p-4 rounded-2xl bg-primary text-white hover:scale-110 shadow-lg transition-all">
                <Download className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </BentoCard>

      </section>

      {/* --- REFINED NAVIGATION FOOTER --- */}
      <footer className="mt-48 py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center gap-12 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-[-0.05em] text-white opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default">YASHVI DHOLAKIYA</h2>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black tracking-[0.4em] uppercase text-muted-foreground/40">
            <Link href="/about" data-text="INFO" className="hover:text-primary transition-colors">Information</Link>
            <Link href="/projects" data-text="RECORDS" className="hover:text-primary transition-colors">Records</Link>
            <Link href="/activity" data-text="STREAM" className="hover:text-primary transition-colors">Stream</Link>
            <Link href="/certificates" data-text="VERIFY" className="hover:text-primary transition-colors">Verification</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .group:hover .group-hover\:animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  )
}
