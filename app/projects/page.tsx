"use client"

import Image from "next/image"
import { useState } from "react"
import { ExternalLink, Github, Star, GitFork, Figma, Code } from "lucide-react"

const featuredProjects = [
  {
    id: 1,
    title: "FocusFuze",
    description:
      "A full-stack task management app where users can set personal goals, create notes, and schedule events on a calendar. Features goal tracking, task completion, and an intuitive UI.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/codinggita/focus_fuze",
    liveUrl: "https://focuss-fuze.netlify.app/",
    videoUrl: "https://www.youtube.com/embed/pY5dqOt33Js", // YouTube video embed
  },
  {
    id: 2,
    title: "API Explorer",
    description:
      "A React project integrating four APIs for exploring recipes, cocktails, Harry Potter info, and banking details.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-28%20144902.png?updatedAt=1754382164843",
    technologies: ["React", "Axios"],
    githubUrl: "https://github.com/yashvi-3106/React-Route",
    liveUrl: "https://api-explorer-react.netlify.app/",
  },
  {
    id: 3,
    title: "To-Do List",
    description:
      "A simple to-do list app with add/delete features and a dark/light mode toggle.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-28%20152556.png?updatedAt=1754382231666",
    technologies: ["React"],
    githubUrl: "https://github.com/yashvi-3106/Todo-List-React",
    liveUrl: "https://todo-list-react-0.netlify.app/",
  },
]

const openSourceProjects = [
  {
    id: 1,
    title: "Noble Bids",
    description:
      "A dynamic online bidding system built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform provides a secure and transparent environment for users to participate in live auctions, manage bids, and oversee platform activities.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20133705.png?updatedAt=1754382340168",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/noble_bids",
    contribution: "Contributor",
  },
  {
    id: 2,
    title: "Borrowly",
    description:
      "🚀 Borrowly is a web platform that allows users to rent and borrow clothes, fooytwears, and accessories for various occasions. It provides a seamless experience for users to explore, rent, and track their borrowed items.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20133520.png?updatedAt=1754382421699",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/borrowly",
    contribution: "Contributor",
  },
  {
    id: 3,
    title: "Kofi Hub",
    description:
      "Kofi Hub is a digital platform connecting coffee lovers and small vendors. It simplifies coffee discovery, enables seamless purchases, and fosters a community for enthusiasts.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-28%20162522.png?updatedAt=1754382280141",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    githubUrl: "https://github.com/codinggita/kofi_hub",
    contribution: "Contributor",
  },
]

const figmaDesigns = [
  {
    id: 1,
    title: "Untitled Design 1",
    description: "Figma prototype design project.",
    image: "/placeholder.svg",
    figmaUrl:
      "https://www.figma.com/design/MGKhDAgvV7yW8T6qMuap1N/Untitled?node-id=0-1&t=qe8QQdN31HBRCKIF-1",
    category: "UI/UX",
  },
  {
    id: 2,
    title: "Untitled Design 2",
    description: "Another Figma design project.",
    image: "/placeholder.svg",
    figmaUrl:
      "https://www.figma.com/design/1ji291Y1KmM2B76AUF58kA/Untitled?node-id=0-1&t=Vb02bmDb8vEZNZ5G-1",
    category: "UI/UX",
  },
  {
    id: 3,
    title: "Untitled Design 3",
    description: "UI/UX mockup in Figma.",
    image: "/placeholder.svg",
    figmaUrl:
      "https://www.figma.com/design/3IMO60zfBer1J8ZciEVyI4/Untitled?node-id=81-2&t=cOWAM4iJt2UzqF2V-1",
    category: "UI/UX",
  },
]

const websiteClones = [
  {
    id: 1,
    title: "Freelancer Static Clone",
    description: "A static clone of Freelancer's website focusing on UI replication.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20132703.png?updatedAt=1754382490731",
    technologies: ["React"],
    githubUrl: "https://github.com/yashvi-3106/Free_lancer-clone",
    liveUrl: "https://freelancer31.netlify.app/",
    original: "Freelancer",
  },
  {
    id: 2,
    title: "Manage Engine Static Clone",
    description: "A static landing page clone of a modern tech company.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20132845.png?updatedAt=1754382511048",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/yashvi-3106/ManageEngine",
    liveUrl: "https://tiny-marigold-a203d3.netlify.app/",
    original: "Manage Engine",
  },
  {
    id: 3,
    title: "Naturals Static Clone",
    description:
      "A static landing page clone of the Naturals Ice Cream website built with HTML & CSS.",
    image:
      "https://ik.imagekit.io/viik8o1ol/Screenshot%202025-03-30%20133030.png?updatedAt=1754382529678",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/yashvi-3106/Naturalsicecream",
    liveUrl: "https://naturalsicecream-cg.netlify.app/",
    original: "Naturals",
  },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("featured")

  const tabs = [
    { id: "featured", label: "Featured Projects", icon: Star },
    { id: "opensource", label: "Open Source", icon: Github },
    { id: "figma", label: "Figma Designs", icon: Figma },
    { id: "clones", label: "Website Clones", icon: Code },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work including featured projects, open source contributions, design work, and coding
            challenges.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Sections */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* Featured Projects */}
          {activeTab === "featured" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    {project.videoUrl ? (
                      <div className="w-full h-48">
                        <iframe
                          src={project.videoUrl}
                          title={project.title}
                          width="100%"
                          height="100%"
                          className="w-full h-full rounded-md"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Open Source Contributions */}
          {activeTab === "opensource" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {openSourceProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {project.contribution}
                    </div>
                    <div className="absolute top-4 right-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-background transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">
                        {project.language}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Figma Designs */}
          {activeTab === "figma" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {figmaDesigns.map((design, index) => (
                <div
                  key={design.id}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={design.image || "/placeholder.svg"}
                      alt={design.title}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {design.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{design.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{design.description}</p>

                    <a
                      href={design.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-purple-500 hover:text-purple-600 transition-colors"
                    >
                      <Figma className="w-4 h-4" />
                      <span className="text-sm">View Design</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Website Clones */}
          {activeTab === "clones" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {websiteClones.map((clone, index) => (
                <div
                  key={clone.id}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={clone.image || "/placeholder.svg"}
                      alt={clone.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Clone of {clone.original}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{clone.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{clone.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {clone.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <a
                        href={clone.githubUrl}
                        target="_blank"
                       
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                      <a
                        href={clone.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
