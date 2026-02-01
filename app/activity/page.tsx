"use client"

import { useState, useEffect } from "react"
import {
  Github,
  GitCommit,
  Star,
  Award,
  Youtube,
  Zap,
  TrendingUp,
  Code2,
  Terminal,
  ExternalLink,
  ArrowRight,
  Clock,
  Shield,
  LayoutDashboard
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { GitHubCalendar } from "react-github-calendar"
import { ActivityCalendar, type Activity } from "react-activity-calendar"
import { format, subYears } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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

// --- Stats Components ---

interface GitHubUser {
  login: string
  public_repos: number
  followers: number
  following: number
  public_gists: number
  avatar_url: string
}

interface Repo {
  name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  html_url: string
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubUser | null>(null)
  const [topRepos, setTopRepos] = useState<Repo[]>([])
  const username = "yashvi-3106"

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats(null))

    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
          setTopRepos(sorted.slice(0, 4))
        }
      })
  }, [username])

  if (!stats) return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Repositories", value: stats.public_repos, icon: LayoutDashboard },
          { label: "Followers", value: stats.followers, icon: Zap },
          { label: "Following", value: stats.following, icon: Shield },
          { label: "Gists", value: stats.public_gists, icon: Terminal },
        ].map((stat, i) => (
          <BentoCard key={i} className="!p-4 sm:!p-6" delay={i * 0.1}>
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className="w-4 h-4 text-primary opacity-50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-foreground">{stat.value}</p>
          </BentoCard>
        ))}
      </div>

      {/* Contribution Calendar */}
      <BentoCard className="p-8" delay={0.4}>
        <div className="flex items-center gap-3 mb-8 border-b border-border/20 pb-4">
          <GitCommit className="w-5 h-5 text-primary" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em]">Contribution Matrix</h3>
        </div>
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[700px] flex justify-center">
            <GitHubCalendar
              username={username}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
          </div>
        </div>
      </BentoCard>

      {/* Top Repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo, i) => (
          <BentoCard key={i} className="hover:border-primary/40" delay={0.5 + i * 0.1}>
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg text-foreground truncate">{repo.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    {repo.stargazers_count}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{repo.description}</p>
              </div>
              <div className="flex items-center justify-between">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{repo.language}</span>
                  </div>
                )}
                <a href={repo.html_url} target="_blank" className="p-2 rounded-full bg-muted/50 hover:bg-primary/20 text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  )
}

interface LeetCodeData {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  submissionCalendar: Record<string, number>
}

const CSSDonut = ({ easy, medium, hard, total }: { easy: number, medium: number, hard: number, total: number }) => {
  const cEasy = "#00b8a3"
  const cMed = "#ffc01e"
  const cHard = "#ef4743"
  const safeTotal = total || 1

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            ${cEasy} 0% ${(easy / safeTotal) * 100}%,
            ${cMed} ${(easy / safeTotal) * 100}% ${((easy + medium) / safeTotal) * 100}%,
            ${cHard} ${((easy + medium) / safeTotal) * 100}% 100%
          )`,
          mask: "radial-gradient(transparent 65%, black 66%)",
          WebkitMask: "radial-gradient(transparent 65%, black 66%)"
        }}
      />
      <div className="z-10 flex flex-col items-center">
        <span className="text-4xl font-black text-foreground">{total}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Solved</span>
      </div>
    </div>
  )
}

const LeetCodeStats = () => {
  const [stats, setStats] = useState<LeetCodeData | null>(null)
  const username = "yashvi_3106"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = "https://leetcodestatsfinder.vercel.app/api/leetcode"
        const [statsRes, calendarRes] = await Promise.all([
          fetch(`${apiBase}/${username}/stats`),
          fetch(`${apiBase}/${username}/calendar`)
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          if (statsData && statsData.submitStats) {
            const acNums = statsData.submitStats.acSubmissionNum
            const findCount = (diff: string) => acNums.find((item: any) => item.difficulty === diff)?.count || 0

            const calendarData = calendarRes.ok ? await calendarRes.json() : {}

            setStats({
              totalSolved: findCount("All"),
              easySolved: findCount("Easy"),
              mediumSolved: findCount("Medium"),
              hardSolved: findCount("Hard"),
              totalQuestions: 3300,
              ranking: statsData.ranking || 0,
              submissionCalendar: calendarData
            })
          }
        }
      } catch (err) {
        console.error("Failed to fetch LeetCode data", err)
      }
    }
    fetchData()
  }, [username])

  if (!stats) return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  )

  let calendarData: Activity[] = []
  const today = new Date()
  const start = subYears(today, 1)

  if (stats.submissionCalendar) {
    Object.entries(stats.submissionCalendar).forEach(([ts, count]) => {
      const date = new Date(parseInt(ts) * 1000)
      if (date >= start) {
        calendarData.push({
          date: format(date, "yyyy-MM-dd"),
          count: count,
          level: Math.min(4, Math.ceil(count / 2)) as 0 | 1 | 2 | 3 | 4
        })
      }
    })
  }

  if (calendarData.length === 0) {
    calendarData = [{ date: format(today, "yyyy-MM-dd"), count: 0, level: 0 }]
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Solved Breakdown */}
        <BentoCard className="lg:col-span-12 p-8" delay={0.1}>
          <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
            <CSSDonut easy={stats.easySolved} medium={stats.mediumSolved} hard={stats.hardSolved} total={stats.totalSolved} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 max-w-2xl">
              {[
                { label: "Easy", solved: stats.easySolved, color: "text-[#00b8a3]", bg: "bg-[#00b8a3]/10" },
                { label: "Medium", solved: stats.mediumSolved, color: "text-[#ffc01e]", bg: "bg-[#ffc01e]/10" },
                { label: "Hard", solved: stats.hardSolved, color: "text-[#ef4743]", bg: "bg-[#ef4743]/10" },
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-3xl ${item.bg} flex flex-col items-center justify-center space-y-2`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.label}</span>
                  <span className="text-4xl font-black text-foreground">{item.solved}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Heatmap */}
        <BentoCard className="lg:col-span-12 p-8" delay={0.3}>
          <div className="flex items-center gap-3 mb-8 border-b border-border/20 pb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Algorithm Pulse</h3>
          </div>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="min-w-[700px] flex justify-center">
              <ActivityCalendar
                data={calendarData}
                theme={{
                  light: ['#161b22', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
                  dark: ['#161b22', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
                }}
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  )
}

// --- Main Page ---

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
  const [activeTab, setActiveTab] = useState("archive")

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

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-4 bg-black/40 backdrop-blur-xl p-2 rounded-[2rem] border border-white/5">
            {[
              { id: 'github', label: 'Codebase', icon: Github },
              { id: 'leetcode', label: 'Algorithms', icon: Code2 },
              { id: 'archive', label: 'DSA Archive', icon: Youtube },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-white text-black scale-105 shadow-xl" : "text-white/40 hover:text-white"
                  }`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === "github" && <GitHubStats />}
            {activeTab === "leetcode" && <LeetCodeStats />}
            {activeTab === "archive" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              </div>
            )}
          </motion.div>
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
