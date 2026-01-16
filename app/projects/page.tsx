"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Star, GitFork, Figma, Code, ArrowUpRight, FolderGit2, ChevronDown, Monitor, ArrowLeft, ArrowRight, Layout } from "lucide-react"

// --- Data ---
const featuredProjects = [
  {
    id: 1,
    title: "FocusFuze",
    category: "Productivity",
    description: "A full-stack task management ecosystem designed for high-performance individuals. Users can orchestrate personal goals, manage complex workflows, and visualize progress through an interactive calendar system.",
    image: "/placeholder.svg?height=800&width=1200",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
    githubUrl: "https://github.com/codinggita/focus_fuze",
    liveUrl: "https://focusfuze.netlify.app/",
    videoUrl: "https://www.youtube.com/embed/3Al7YsOAbs4",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 2,
    title: "Dayflow HRMS",
    category: "Enterprise",
    description: "An enterprise-grade Human Resource Management System architected for scalability. Streamlines complex HR workflows including onboarding, payroll computation, and attendance tracking with a role-based security model.",
    image: "/placeholder.svg?height=800&width=1200",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/yashvi-3106/Dayflow-human-resource-management-system-X-hackathon",
    liveUrl: "https://dayflow-final.netlify.app/",
    videoUrl: "https://www.youtube.com/embed/QTGuS0R7qug",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    title: "Ai-Mirror",
    category: "AI & Chatbot",
    description: "A next-generation AI conversational interface. Features real-time natural language processing, context-aware responses, and a modular backend architecture supporting news aggregation and student resource matching.",
    image: "https://camo.githubusercontent.com/d76032f5a707f5e901011806cd3a07fbcdf4b8430f826198de801b0f6a21030a/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6475706e36316d386d2f696d6167652f75706c6f61642f76313736363536303236382f53637265656e73686f745f323032352d31322d32345f3132333933335f6d62646f36652e706e67",
    technologies: ["React", "Gemini API", "Node.js", "Express"],
    githubUrl: "https://github.com/yashvi-3106/Ai-Mirror-chat-bot",
    liveUrl: "https://ai-mirror-chat-bot-js5c.vercel.app/",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 4,
    title: "API Explorer",
    category: "DevTools",
    description: "A comprehensive dashboard for exploring and testing multiple public APIs. Demonstrates complex state management and seamless integration of disparate data sources into a unified UI.",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-28%20144902.png?updatedAt=1754382164843",
    technologies: ["React", "Axios", "REST API"],
    githubUrl: "https://github.com/yashvi-3106/React-Route",
    liveUrl: "https://api-explorer-react.netlify.app/",
    color: "from-orange-500/20 to-red-500/20"
  },
]

const openSourceProjects = [
  {
    id: 1,
    title: "Noble Bids",
    description: "Real-time auction platform with WebSocket integration for live bidding updates. Implements complex state synchronization.",
    stars: 12,
    forks: 4,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/noble_bids",
    role: "Core Contributor",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768539715/Screenshot_2025-03-30_133705_sqhmrf.png"
  },
  {
    id: 2,
    title: "Borrowly",
    description: "Peer-to-peer lending marketplace for fashion items. Features a custom inventory management system.",
    stars: 8,
    forks: 2,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/borrowly",
    role: "Frontend Lead",
    videoUrl: "https://www.youtube.com/embed/AbQmcTB_wi8"
  },
  {
    id: 3,
    title: "Kofi Hub",
    description: "Community platform connecting coffee enthusiasts with local roasters. Built with a focus on local-first discovery.",
    stars: 15,
    forks: 5,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/kofi_hub",
    role: "Contributor",
    videoUrl: "https://www.youtube.com/embed/mg-Qrj5eXdw"
  },
]

const figmaDesigns = [
  {
    id: 1,
    title: "FreshMart UI",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1767191373/Screenshot_2025-12-31_195740_azitnd.png",
    url: "https://www.figma.com/design/MGKhDAgvV7yW8T6qMuap1N/Untitled?node-id=0-1&t=qe8QQdN31HBRCKIF-1",
    tag: "E-Commerce",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 2,
    title: "Task Master",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1766559669/Screenshot_2025-12-24_123026_p8sma6.png",
    url: "https://www.figma.com/design/3IMO60zfBer1J8ZciEVyI4/Untitled?node-id=81-2&t=cOWAM4iJt2UzqF2V-1",
    tag: "Productivity",
    span: "col-span-1"
  },
  {
    id: 3,
    title: "AI Mirror App",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1767191469/Screenshot_2025-12-31_195849_pdmukl.png",
    url: "https://www.figma.com/design/piATVvho8lgpKSg2guw9HO/ai-mirror-project?node-id=0-1&t=sl2GvS9cUCVja0PX-1",
    tag: "Mobile App",
    span: "col-span-1"
  },
  {
    id: 4,
    title: "Fashion Store",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1767191451/Screenshot_2025-12-31_195756_l27cha.png",
    url: "https://www.figma.com/design/1ji291Y1KmM2B76AUF58kA/Untitled?node-id=0-1&t=Vb02bmDb8vEZNZ5G-1",
    tag: "Retail",
    span: "col-span-1 md:col-span-2"
  },
  {
    id: 5,
    title: "CodingGita LMS",
    image: "https://camo.githubusercontent.com/236c1c7b758504e3921170cd5290c02b8da35a71fc2482239492e189835772bd/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6475706e36316d386d2f696d6167652f75706c6f61642f76313736373139313532322f53637265656e73686f745f323032352d31322d33315f3139353930365f7063326b6d6a2e706e67",
    url: "https://www.figma.com/design/puOmTG41Sl7ZGCokjpWkTk/Untitled?node-id=0-1&t=7qScYH6cCNVg5CbU-1",
    tag: "Education",
    span: "col-span-1"
  },
]

const websiteClones = [
  {
    id: 1,
    title: "Freelancer.com",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20132703.png?updatedAt=1754382490731",
    original: "Freelancer",
    liveUrl: "https://freelancer31.netlify.app/",
    githubUrl: "https://github.com/yashvi-3106/Free_lancer-clone"
  },
  {
    id: 2,
    title: "ManageEngine",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20132845.png?updatedAt=1754382511048",
    original: "ManageEngine",
    liveUrl: "https://tiny-marigold-a203d3.netlify.app/",
    githubUrl: "https://github.com/yashvi-3106/ManageEngine"
  },
  {
    id: 3,
    title: "Naturals Ice Cream",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20133030.png?updatedAt=1754382529678",
    original: "Naturals",
    liveUrl: "https://naturalsicecream-cg.netlify.app/",
    githubUrl: "https://github.com/yashvi-3106/Naturalsicecream"
  },
]

// --- Components ---

// Redesigned: Clean Bento Grid Card for Designs
const DesignCard = ({ item }: { item: any }) => {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener"
      className={`group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 ${item.span || 'col-span-1'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 text-white/80 group-hover:bg-primary group-hover:text-white transition-colors">
          <ArrowUpRight className="w-5 h-5" />
        </div>

        <div className="absolute bottom-0 left-0 p-6 w-full">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            {item.tag}
          </span>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-foreground transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-1">View Figma Prototype</p>
        </div>
      </div>
    </motion.a>
  )
}

// Redesigned: Browser Window Card for Clones
const CloneCard = ({ item }: { item: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Browser Header */}
      <div className="h-8 bg-muted border-b border-border flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-background/50 text-[10px] text-muted-foreground w-32 justify-center mx-auto">
            <Monitor className="w-3 h-3" />
            <span className="truncate">{item.original}.com</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden bg-background">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 origin-top"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground font-medium hover:bg-muted transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="text-xs text-muted-foreground">Clone of {item.original}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Redesigned: Accordion Style Repo Item
const RepoItem = ({ repo, index }: { repo: any, index: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-border/40 last:border-0"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 pr-6">
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {repo.title}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {repo.role}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-1">{repo.description}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span>{repo.language}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks}</span>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-muted/20"
          >
            <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {repo.description}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-card border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    <Github className="w-4 h-4" /> View Repository
                  </a>
                </div>
              </div>
              {repo.videoUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-white/10 mt-4 md:mt-0">
                  <iframe
                    src={repo.videoUrl}
                    title={repo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : repo.image ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-white/10 mt-4 md:mt-0">
                  <Image
                    src={repo.image}
                    alt={repo.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// --- Stacking Cards Section ---

const Card = ({
  i,
  project,
  progress,
  range,
  targetScale,
}: {
  i: number
  project: any
  progress: any
  range: number[]
  targetScale: number
}) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          backgroundColor: "#1e1e1e", // Fallback color
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-full max-w-5xl rounded-3xl p-10 origin-top border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />

        <div className="flex flex-col md:flex-row h-full gap-10 relative z-10">
          {/* Content */}
          <div className="w-full md:w-[40%] flex flex-col justify-center gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white/80">
                {project.category}
              </span>
              <h2 className="text-4xl font-bold mb-2 text-white">{project.title}</h2>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech: string) => (
                <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-white/50">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-white/20"
                >
                  Visit Site <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white font-medium hover:bg-white/20 transition-all"
                >
                  <Github className="w-4 h-4" /> Source
                </a>
              )}
            </div>
          </div>

          {/* Image/Video */}
          <div className="relative w-full md:w-[60%] h-full rounded-2xl overflow-hidden bg-black/50 border border-white/10">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              {project.videoUrl ? (
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const ProjectShowcase = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={container} className="relative mt-20 mb-20 space-y-32">
      {featuredProjects.map((project, i) => {
        const targetScale = 1 - (featuredProjects.length - i) * 0.05
        return (
          <Card
            key={project.id}
            i={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </div>
  )
}

// --- Main Page ---
export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Building the <br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Digital Future
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A curated collection of my work, ranging from full-stack applications to intricate UI/UX designs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-4 z-40 mb-12">
        <div className="container mx-auto flex justify-center">
          <div className="inline-flex items-center p-1.5 bg-card/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            {[
              { id: "all", label: "Featured", icon: Star },
              { id: "opensource", label: "Open Source", icon: Github },
              { id: "figma", label: "Designs", icon: Figma },
              { id: "clones", label: "Clones", icon: Layout },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="container mx-auto px-4 pb-32">
        {activeTab === "all" && <ProjectShowcase />}

        {activeTab === "opensource" && (
          <div className="max-w-4xl mx-auto border border-border rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl">
            <div className="p-4 bg-muted/50 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                yashvi-3106 / contributions
              </div>
            </div>
            <div className="divide-y divide-border/40">
              {openSourceProjects.map((repo, idx) => (
                <RepoItem key={repo.id} repo={repo} index={idx} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "figma" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            {figmaDesigns.map((item, i) => (
              <DesignCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {activeTab === "clones" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websiteClones.map((item, i) => (
              <CloneCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
