"use client"

import type React from "react"

import { useState } from "react"
import { Download, FileText, GraduationCap, Award, Calendar, MapPin, ZoomIn, ZoomOut } from "lucide-react"

const resumeData = {
  personalInfo: {
    name: "YASHVI DHOLAKIYA",
    title: "Full-Stack Developer",
    email: "yashvidholakiya.cg@gmail.com",
    phone: "+91 9825164868",
    location: "Gujarat, India",
    linkedin: "www.linkedin.com/in/yashvi-dholakiya",
    github: "github.com/yashvi-3106",
  },
  summary:
    "I develop intuitive, scalable web applications with current JavaScript technology. I have a solid background in both frontend and backend development and enjoy building seamless user experiences and efficient server logic. I love learning new tools, contributing to open-source projects, and solving hard problems with clean, readable code. Open-source collaboration and meticulousness characterize my development process.",
  education: [
    {
      degree: "Bachelor of Technology",
      field: "Information Technology",
      institution: "RAI UNIVERSITY",
      duration: "",
      grade: "1st Semester CGPA: 9.76 | 2nd Semester CGPA: 9.63",
    },
  ],
  skills: {
    technical: [
      "Node.js, Express",
      "React",
      "JavaScript",
      "C Language",
      "Git & GitHub",
      "MongoDB, Mongoose",
      "Render, Netlify",
      "HTML, CSS",
    ],
    soft: [],
  },
  certifications: [],
  projects: [
    {
      name: "Focus Fuze",
      details:
        "A comprehensive productivity and collaboration platform for goal setting, note-taking, and task scheduling with real-time features.",
      bullets: [
        "Key Features: Real-time chat, NoteTube integration, calendar scheduling, dashboard, profile customization.",
        "Tech Stack: React.js, Node.js, Express.js, MongoDB, Mongoose, Netlify, Render",
        "Postman Docs · GitHub | Open Source Contributions",
      ],
    },
    {
      name: "Kofi Hub – Coffee Discovery & E-Commerce",
      details: "Coffee product platform with rich product views and user testimonial system.",
      bullets: [
        "Contributions: Product page, rating/review system, checkout workflow, Testimonials page.",
        "Tech Stack: React.js, Node.js, Express.js, MongoDB",
        "Pull Request",
      ],
    },
    {
      name: "Noble Bids – Online Auction Platform",
      details: "MERN-based auction system supporting real-time bidding and user alerts.",
      bullets: [
        'Contributions: Shareable auction links, "Notify Me" feature for category-based notifications.',
        "Tech Stack: React.js, Node.js, Express.js, MongoDB",
        "Pull Request",
      ],
    },
    {
      name: "Owly – Rental Platform",
      details: "Rent clothes, accessories, and footwear with full delivery and review system.",
      bullets: [
        "Contributions: Ratings/reviews, enhanced checkout flow.",
        "Tech Stack: MERN Stack",
        "Pull Request",
      ],
    },
    {
      name: "API Explorer",
      details:
        "A no-code React.js tool to explore and test public APIs like MealDB, CocktailDB, Harry Potter, and Bank APIs.",
      bullets: [
        "Key Features: Dynamic API selection, real-time response display.",
        "Tech Stack: React.js",
      ],
    },
    {
      name: "Freelancer Static Clone",
      details:
        "Developed a static clone of the Freelancer website using React.js, focusing on replicating its clean UI/UX.",
      bullets: ["Tech Stack: React.js"],
    },
  ],
}

export default function ResumePage() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View, zoom, and download my latest resume.
          </p>
        </div>

        {/* Zoom & Download Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
            <button
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(0.6, parseFloat((z - 0.1).toFixed(2))))}
              className="p-2 rounded-md hover:bg-muted"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground w-14 text-center">{Math.round(zoom * 100)}%</span>
            <button
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(2, parseFloat((z + 0.1).toFixed(2))))}
              className="p-2 rounded-md hover:bg-muted"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <a href="/resume.pdf" download className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow">
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>

        {/* Resume Content */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-primary text-primary-foreground p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{resumeData.personalInfo.name}</h2>
                <p className="text-xl mb-4">{resumeData.personalInfo.title}</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <a className="hover:underline" href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                  <a className="hover:underline" href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noreferrer">{resumeData.personalInfo.github}</a>
                  <a className="hover:underline" href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noreferrer">{resumeData.personalInfo.linkedin}</a>
                  <a className="hover:underline" href={`tel:${resumeData.personalInfo.phone.replace(/\s/g,'')}`}>{resumeData.personalInfo.phone}</a>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {resumeData.personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8" style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}>
              {/* Summary */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-primary mr-2" />
                  Professional Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed">{resumeData.summary}</p>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 text-primary mr-2" />
                  Education
                </h3>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.field}</p>
                      <p className="text-muted-foreground">{edu.institution}</p>
                      {Boolean(edu.duration || edu.grade) && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-2">
                          {edu.duration && (
                            <span className="inline-flex items-center"><Calendar className="w-4 h-4 mr-1" />{edu.duration}</span>
                          )}
                          {edu.duration && edu.grade && <span className="mx-1">•</span>}
                          {edu.grade && <span>{edu.grade}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Award className="w-5 h-5 text-primary mr-2" />
                  Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.technical.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <FileText className="w-5 h-5 text-primary mr-2" />
                  Projects
                </h3>
                <div className="space-y-6">
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx} className="border-l-2 border-primary/20 pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                      <h4 className="text-lg font-semibold text-foreground">{proj.name}</h4>
                      <p className="text-muted-foreground mt-1">{proj.details}</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
