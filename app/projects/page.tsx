"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Figma,
  Code,
  ArrowUpRight,
  FolderGit2,
  ChevronDown,
  Monitor,
  Layout,
  Terminal,
  Sparkles,
  Mail,
  ChevronRight,
} from "lucide-react"

// --- Shared Components ---

const GrainOverlay = () => (
  <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat shadow-inner" />
)

const MeshGradient = () => (
  <div className="fixed inset-0 -z-10 bg-[#060606] overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
)

// --- Data ---
const featuredProjects = [
  {
    id: 1,
    title: "FocusFuze",
    category: "Productivity",
    description: "A high-fidelity task orchestration ecosystem. Engineered for cognitive load reduction through advanced state management and an immersive spatial interface.",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-01-25%20172600.png?updatedAt=1737806175783",
    technologies: ["React", "Node.js", "MongoDB", "Framer"],
    githubUrl: "https://github.com/codinggita/focus_fuze",
    liveUrl: "https://focusfuze.netlify.app/",
    videoUrl: "https://www.youtube.com/embed/3Al7YsOAbs4",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 2,
    title: "DayflowHRM",
    category: "Enterprise",
    description: "Enterprise-grade Human Resource Management architecture. Streamlining complex organizational logic with automated payroll and security protocols.",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-01-25%20172648.png?updatedAt=1737806222858",
    technologies: ["React", "Express", "JWT", "MongoDB"],
    githubUrl: "https://github.com/yashvi-3106/Dayflow-human-resource-management-system-X-hackathon",
    liveUrl: "https://dayflow-final.netlify.app/",
    videoUrl: "https://www.youtube.com/embed/QTGuS0R7qug",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "AiMirror",
    category: "AI & Neural",
    description: "Next-generation conversational AI interface. Real-time context-aware processing for seamless intelligence aggregation.",
    image: "https://camo.githubusercontent.com/d76032f5a707f5e901011806cd3a07fbcdf4b8430f826198de801b0f6a21030a/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6475706e36316d386d2f696d6167652f75706c6f61642f76313736363536303236382f53637265656e73686f745f323032352d31322d32345f3132333933335f6d62646f36652e706e67",
    technologies: ["React", "Gemini", "Node.js", "Tailwind"],
    githubUrl: "https://github.com/yashvi-3106/Ai-Mirror-chat-bot",
    liveUrl: "https://ai-mirror-chat-bot-js5c.vercel.app/",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "ApiExplorer",
    category: "Dev Protocol",
    description: "Modular environment for real-time API exploration. Demonstrates integrated data handling and intuitive diagnostic UI.",
    image: "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-28%20144902.png?updatedAt=1754382164843",
    technologies: ["React", "Axios", "REST", "Vite"],
    githubUrl: "https://github.com/yashvi-3106/React-Route",
    liveUrl: "https://api-explorer-react.netlify.app/",
    color: "from-orange-500 to-red-500"
  },
]

const openSourceProjects = [
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

// --- Detailed Components (REVERTED TO ORIGINAL PREFERRED STYLE) ---

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
        data-text="EXPAND"
        className="group relative flex items-center justify-between p-6 cursor-pointer hover:bg-primary/5 transition-colors"
      >
        <div className="flex-1 pr-6 text-left">
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {repo.title}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {repo.role}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-1 font-light">{repo.description}</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="hidden md:flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span>{repo.language}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5" />
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
            className="overflow-hidden bg-muted/10 backdrop-blur-sm"
          >
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              <div className="space-y-6 pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{repo.description}</p>
                <div className="flex items-center gap-3">
                  <a href={repo.githubUrl} target="_blank" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                </div>
              </div>
              {repo.videoUrl ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
                  <iframe src={repo.videoUrl} className="w-full h-full" allowFullScreen />
                </div>
              ) : repo.image ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-white/5 shadow-2xl">
                  <Image src={repo.image} alt={repo.title} fill className="object-cover" />
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const DesignCard = ({ item }: { item: any }) => (
  <motion.a
    href={item.url}
    target="_blank"
    rel="noopener"
    data-text="FIGMA"
    className={`group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-xl ${item.span || 'col-span-1'}`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
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
      <div className="absolute bottom-0 left-0 p-6 w-full text-left">
        <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest uppercase text-white/90 bg-primary/20 backdrop-blur-md rounded-full border border-primary/20">
          {item.tag}
        </span>
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-white/60">View Figma Prototype</p>
      </div>
    </div>
  </motion.a>
)

const CloneCard = ({ item }: { item: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    viewport={{ once: true }}
    className="group relative bg-card rounded-3xl border border-border overflow-hidden shadow-xl hover:shadow-primary/5 transition-all duration-500"
  >
    <div className="h-8 bg-muted/30 border-b border-border/50 flex items-center px-4 gap-2">
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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <a href={item.liveUrl} target="_blank" data-text="LIVE_DEMO" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <ExternalLink className="w-3 h-3" /> Live Demo
        </a>
        <a href={item.githubUrl} target="_blank" data-text="CODE" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-foreground font-bold text-xs uppercase tracking-wider hover:bg-muted transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <Github className="w-3 h-3" /> Code
        </a>
      </div>
    </div>
    <div className="p-5 border-t border-border bg-card/50 text-left">
      <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
      <p className="text-xs text-muted-foreground">Premium replica of {item.original}</p>
    </div>
  </motion.div>
)

// --- Featured Component (PREMIUM REDESIGN) ---

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0d0d0d] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/20"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden bg-[#0a0a0a]">
          {project.videoUrl ? (
            <iframe
              src={`${project.videoUrl}?autoplay=0&mute=1&controls=1`}
              className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              allowFullScreen
            />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-primary shadow-xl">
              {project.category}
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left space-y-6">
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{project.title}</h3>
          <p className="text-muted-foreground/60 text-sm md:text-lg font-light leading-relaxed max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/30 uppercase tracking-widest">{tech}</span>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" data-text="EXPLORE" className="group/btn flex items-center gap-3 text-white hover:text-primary transition-colors text-xs font-black uppercase tracking-widest">
                Observe_Live <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" data-text="CODE" className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-primary transition-colors">
                <Github className="w-5 h-5 text-white/40" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="relative min-h-screen bg-[#060606] text-white scroll-smooth overflow-x-hidden">
      <GrainOverlay />
      <MeshGradient />

      <section className="relative pt-48 pb-20 px-6">
        <div className="container mx-auto text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-[-0.05em] leading-[0.8] uppercase">Archive</h1>
            <p className="text-lg md:text-xl text-muted-foreground/40 max-w-xl mx-auto font-light tracking-tight mt-10">
              Engineering full-stack artifacts and complex design systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-12 z-40 mb-32">
        <div className="flex justify-center gap-6 px-4">
          {[
            { id: "all", label: "Featured", icon: Star },
            { id: "opensource", label: "Open Source", icon: Github },
            { id: "figma", label: "Designs", icon: Figma },
            { id: "clones", label: "Clones", icon: Monitor }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-text="FILTER"
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${activeTab === tab.id ? "bg-white text-black scale-110 shadow-[0_0_40px_rgba(255,255,255,0.2)]" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <div className="container max-w-7xl mx-auto px-6 pb-48">
        <AnimatePresence mode="wait">
          {activeTab === "all" && (
            <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 md:space-y-24">
              {featuredProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
            </motion.div>
          )}

          {activeTab === "opensource" && (
            <motion.div key="os" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto border border-border/50 rounded-[2rem] overflow-hidden bg-card/20 backdrop-blur-xl shadow-2xl">
              <div className="divide-y divide-border/30">
                {openSourceProjects.map((repo, idx) => <RepoItem key={repo.id} repo={repo} index={idx} />)}
              </div>
            </motion.div>
          )}

          {activeTab === "figma" && (
            <motion.div key="figma" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[350px]">
              {figmaDesigns.map((item) => <DesignCard key={item.id} item={item} />)}
            </motion.div>
          )}

          {activeTab === "clones" && (
            <motion.div key="clones" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {websiteClones.map((item) => <CloneCard key={item.id} item={item} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="py-40 border-t border-white/5 text-center relative overflow-hidden">
        <span className="text-[15vw] font-black text-white/[0.01] absolute -bottom-10 left-1/2 -translate-x-1/2 select-none uppercase">Dholakiya</span>
        <div className="relative z-10 space-y-12">
          <p className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Core_Communication_Link</p>
          <div className="flex justify-center gap-12">
            <a href="https://github.com/yashvi-3106" target="_blank" className="text-white/30 hover:text-primary transition-all hover:scale-125"><Github /></a>
            <a href="mailto:yashvidholakiya.cg@gmail.com" className="text-white/30 hover:text-primary transition-all hover:scale-125"><Mail /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
