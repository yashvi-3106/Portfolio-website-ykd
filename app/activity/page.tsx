"use client"

import { useState, useEffect } from "react"
import {
  Github,
  GitCommit,
  Star,
  Award,
  Youtube,
  Search,
  Zap,
  TrendingUp,
  Code2,
  Terminal,
  Sparkles,
  ExternalLink,
  ArrowRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

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
    className={`bg-card/80 text-card-foreground border border-border/50 rounded-[2rem] p-6 shadow-xl hover:border-primary/20 transition-all group overflow-hidden relative ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

// Mock data
const githubStats = {
  profileUrl: "https://github.com/yashvi-3106",
  totalRepos: 42,
  totalStars: 1247,
  totalCommits: 1856,
}

const dsaVideos = [
  { title: "Longest Substring Without Repeating Characters", videoId: "_Z3HYfKOyWU", difficulty: "Medium" },
  { title: "Container With Most Water", videoId: "KyqPcgJwRIU", difficulty: "Medium" },
  { title: "Binary Tree Inorder Traversal", videoId: "O-H7M5X9K1w", difficulty: "Easy" },
  { title: "Reverse Linked List", videoId: "jkv2ozve5rI", difficulty: "Easy" },
  { title: "Search in Rotated Sorted Array", videoId: "pO9kNy0lKBo", difficulty: "Medium" },
  { title: "Maximum Subarray (Kadane's)", videoId: "Uefsdwvv_n0", difficulty: "Medium" },
  { title: "Merge Key Lists", videoId: "wHp4CP7qRW8", difficulty: "Hard" },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("dsa")
  const [githubData, setGithubData] = useState<any | null>(null)
  const [loading, setLoading] = useState({ github: true })

  // Fetch live GitHub stats
  useEffect(() => {
    async function run() {
      try {
        setLoading((s) => ({ ...s, github: true }))
        const res = await fetch(`/api/github?u=yashvi-3106`, { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          setGithubData(data)
        }
        setLoading((s) => ({ ...s, github: false }))
      } catch (e) {
        setLoading((s) => ({ ...s, github: false }))
      }
    }
    run()
  }, [])

  const mergedGithub = { ...githubStats, ...(githubData || {}) }

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
              LIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">ACTIVITY</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
              Real-time monitoring of <span className="text-foreground font-medium">algorithmic progress</span> and codebase evolution.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("github")}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'github' ? 'bg-primary text-primary-foreground shadow-xl scale-105' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            >
              Codebase
            </button>
            <button
              onClick={() => setActiveTab("dsa")}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'dsa' ? 'bg-primary text-primary-foreground shadow-xl scale-105' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            >
              Algorithms
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "github" && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Stats Grid */}
              <BentoCard className="md:col-span-4 bg-primary text-primary-foreground border-none flex flex-col justify-between" delay={0.1}>
                <TrendingUp className="w-10 h-10 opacity-50 mb-8" />
                <div className="space-y-1 text-left">
                  <h3 className="text-6xl font-black tracking-tighter">{mergedGithub.totalCommits}+</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Total Code Commits</p>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-4 flex flex-col justify-between" delay={0.2}>
                <Star className="w-10 h-10 text-yellow-500 mb-8" />
                <div className="space-y-1 text-left">
                  <h3 className="text-6xl font-black tracking-tighter text-foreground">{mergedGithub.totalStars}+</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Community Stars</p>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-4 flex flex-col justify-between" delay={0.3}>
                <Github className="w-10 h-10 text-primary mb-8" />
                <div className="space-y-1 text-left">
                  <h3 className="text-6xl font-black tracking-tighter text-foreground">{mergedGithub.totalRepos}+</h3>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Active Repositories</p>
                </div>
              </BentoCard>

              {/* Language Breakdown */}
              <BentoCard className="md:col-span-8 p-10" delay={0.4}>
                <div className="flex items-center gap-3 mb-8 border-b border-border/20 pb-4">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Technology Distribution</h3>
                </div>

                <div className="space-y-8">
                  {githubData?.languages?.map((lang: any, i: number) => (
                    <div key={lang.name} className="space-y-3">
                      <div className="flex justify-between items-center text-left">
                        <span className="text-sm font-black uppercase tracking-widest">{lang.name}</span>
                        <span className="font-mono text-xs text-primary">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-primary"
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  )) || (
                      <div className="py-12 text-center text-muted-foreground italic font-light">
                        Compiling live data streams...
                      </div>
                    )}
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-4 flex flex-col justify-center items-center text-center p-10 group" delay={0.5}>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 group-hover:bg-primary/30 transition-colors" />
                    <Zap className="relative w-16 h-16 text-primary animate-pulse" />
                  </div>
                  <h4 className="text-xl font-bold">Contribution Streak</h4>
                  <p className="text-4xl font-black text-foreground">12 Days</p>
                  <a href={mergedGithub.profileUrl} target="_blank" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:underline">
                    Synchronize Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </BentoCard>
            </motion.div>
          )}

          {activeTab === "dsa" && (
            <motion.div
              key="dsa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {dsaVideos.map((vid, i) => (
                <BentoCard key={vid.videoId} className="p-0 !rounded-[2rem]" delay={i * 0.05}>
                  <div className="aspect-video w-full bg-black relative group/vid">
                    <iframe
                      className="w-full h-full opacity-80 group-hover/vid:opacity-100 transition-opacity"
                      src={`https://www.youtube.com/embed/${vid.videoId}`}
                      title={vid.title}
                      allowFullScreen
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg
                           ${vid.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' :
                          vid.difficulty === 'Medium' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' :
                            'bg-red-500/20 text-red-500 border-red-500/30'}`}
                      >
                        {vid.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 text-left space-y-3">
                    <h4 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{vid.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <Youtube className="w-3 h-3 text-red-500" />
                      Problem Solving Logic
                    </div>
                  </div>
                </BentoCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Link Page */}
        <div className="pt-24 flex justify-center">
          <Link href="/certificates" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">
            VAL_CREDENTIALS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
