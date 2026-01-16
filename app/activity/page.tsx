"use client"

import { useState, useEffect } from "react"
import {
  Github,
  GitCommit,
  Star,
  Award,
  Youtube,
} from "lucide-react"

// Mock data - in a real app, this would come from APIs
const githubStats = {
  profileUrl: "https://github.com/yashvi-3106",
  totalRepos: 42,
  totalStars: 1247,
  totalForks: 234,
  totalCommits: 1856,
  contributionsThisYear: 892,
  longestStreak: 47,
  currentStreak: 12,
  languages: [
    { name: "JavaScript", percentage: 35, color: "#f1e05a" },
    { name: "TypeScript", percentage: 28, color: "#2b7489" },
    { name: "Python", percentage: 18, color: "#3572A5" },
    { name: "CSS", percentage: 12, color: "#563d7c" },
    { name: "HTML", percentage: 7, color: "#e34c26" },
  ],
}

// DSA videos (YouTube) provided by user
const dsaVideos = [
  { title: "DSA Video 6", videoId: "_Z3HYfKOyWU", channel: "YouTube" },
  { title: "DSA Video 7", videoId: "KyqPcgJwRIU", channel: "YouTube" },
  { title: "DSA Video 1", videoId: "O-H7M5X9K1w", channel: "YouTube" },
  { title: "DSA Video 2", videoId: "jkv2ozve5rI", channel: "YouTube" },
  { title: "DSA Video 3", videoId: "pO9kNy0lKBo", channel: "YouTube" },
  { title: "DSA Video 4", videoId: "Uefsdwvv_n0", channel: "YouTube" },
  { title: "DSA Video 5", videoId: "wHp4CP7qRW8", channel: "YouTube" },
]

// LeetCode UI removed per request; also removed recentActivity and contributionData per request

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("dsa")
  const [animatedStats, setAnimatedStats] = useState({
    repos: 0,
    stars: 0,
    commits: 0,
  })
  const [githubData, setGithubData] = useState<any | null>(null)
  const [loading, setLoading] = useState({ github: true })
  const [error, setError] = useState<{ github?: string }>({})

  // Fetch live GitHub stats
  useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        setLoading((s) => ({ ...s, github: true }))
        const res = await fetch(`/api/github?u=yashvi-3106`, { cache: "no-store" })
        if (!cancelled) {
          if (res.ok) {
            const data = await res.json()
            setGithubData(data)
            setError((e) => ({ ...e, github: undefined }))
          } else {
            setError((e) => ({ ...e, github: "Failed to load GitHub stats" }))
          }
          setLoading((s) => ({ ...s, github: false }))
        }
      } catch (e: any) {
        if (!cancelled) {
          setError((er) => ({ ...er, github: e?.message || "Failed to load GitHub stats" }))
          setLoading((s) => ({ ...s, github: false }))
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const mergedGithub = { ...githubStats, ...(githubData || {}) }

  // Animate numbers when data changes
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, key: string) => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = Math.floor(start + (end - start) * progress)
        setAnimatedStats((prev) => ({ ...prev, [key]: current }))
        if (progress < 1) requestAnimationFrame(animate)
      }
      animate()
    }

    animateValue(0, mergedGithub.totalRepos || 0, 1000, "repos")
    animateValue(0, mergedGithub.totalStars || 0, 1500, "stars")
    animateValue(0, mergedGithub.totalCommits || 0, 2000, "commits")
  }, [githubData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              My <span className="text-primary">Activity</span>
            </h1>
            <div className="flex space-x-4 mt-4">
              <a
                href={mergedGithub.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track my coding journey and contributions on GitHub, plus watch handpicked DSA problem-solving videos.
          </p>
        </div>

        {/* Platform Toggle */}
        <div className="flex justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <button
            onClick={() => setActiveTab("github")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === "github"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
          >
            <Github className="w-5 h-5" />
            <span>GitHub Activity</span>
          </button>
          <button
            onClick={() => setActiveTab("dsa")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === "dsa"
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
          >
            <Youtube className="w-5 h-5" />
            <span>DSA Videos</span>
          </button>
        </div>

        {/* GitHub Activity */}
        {activeTab === "github" && (
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href={mergedGithub.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Github className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{animatedStats.repos}</span>
                </div>
                <p className="text-muted-foreground text-sm">Total Repositories</p>
              </a>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <span className="text-2xl font-bold text-foreground">{animatedStats.stars}</span>
                </div>
                <p className="text-muted-foreground text-sm">Total Stars</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <GitCommit className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-foreground">{animatedStats.commits}</span>
                </div>
                <p className="text-muted-foreground text-sm">Total Commits</p>
              </div>
            </div>

            {/* Language Stats & Recent Activity */}
            <div className="grid grid-cols-1 gap-8">
              {/* Language Distribution */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Award className="w-5 h-5 text-primary mr-2" />
                  Top Languages
                </h3>
                <div className="space-y-4">
                  {(mergedGithub.languages || []).map((lang: { name: string; percentage: number; color?: string }, index: number) => (
                    <div key={lang.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            backgroundColor: (lang as any).color ?? 'var(--primary)',
                            width: `${lang.percentage}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* DSA Videos */}
        {activeTab === "dsa" && (
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-foreground">DSA Problem-Solving Videos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dsaVideos.map((vid) => (
                <div key={vid.videoId} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${vid.videoId}`}
                      title={vid.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">{vid.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{vid.channel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
