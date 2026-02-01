"use client"

import { useState } from "react"
import { Download, ZoomIn, ZoomOut, Github } from "lucide-react"

// --- Resume Data ---
const resumeData = {
  header: {
    name: "YASHVI DHOLAKIYA",
    email: "yashvidholakiya.cg@gmail.com",
    phone: "9825164868",
    linkedin: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/yashvi-dholakiya",
    github: "GitHub",
    githubUrl: "https://github.com/yashvi-3106",
    leetcode: "LeetCode",
    leetcodeUrl: "https://leetcode.com/u/yashvi_3106/",
    portfolio: "Portfolio",
    portfolioUrl: "https://portfolio-yashvi-kd.netlify.app/",
  },
  experience: [
    {
      company: "KORSAQ",
      role: "",
      duration: "Nov 2025 – Jan 2026",
      links: [
        { label: "Live Demo", url: "https://numble0412.netlify.app/" },
        { label: "Certificate", url: "https://drive.google.com/file/d/1tUUmsH0lTcBprlfTDE6Gp-7yhFrQoS2q/view?usp=sharing" }
      ],
      points: [
        "Developed Numble, a React-based multiplayer number guessing web game featuring real-time feedback, attempt tracking, high/low hints, and game reset functionality.",
        "Built reusable React components with clean state management, designed a responsive minimal UI, and deployed the application on Netlify."
      ]
    }
  ],
  projects: [
    {
      name: "FOCUSFUZE",
      duration: "Dec 2024 – April 2025",
      links: [
        { label: "Live Demo", url: "https://www.youtube.com/watch?v=3Al7YsOAbs4&t=2s" },
        { label: "GitHub", url: "https://github.com/codinggita/focus_fuze" },
        { label: "API Documentation", url: "https://documenter.getpostman.com/view/39189384/2sAYXCmeic" }
      ],
      tech: "React.js, Node.js, Express.js, MongoDB, Mongoose, Tailwind CSS, Netlify, Render",
      points: [
        "Developed a full-stack team and personal management platform with goal tracking, project management, and collaboration features.",
        "Implemented tasks, comments, meetings, video notes, and calendar scheduling within a unified system.",
        "Built a responsive UI and deployed the application for production use."
      ]
    },
    {
      name: "DayFlow-Odoo X GCET Hackathon",
      duration: "2nd January 2026",
      links: [
        { label: "Live-Demo", url: "https://www.youtube.com/watch?v=QTGuS0R7qug" },
        { label: "GitHub", url: "https://github.com/yashvi-3106/Dayflow-human-resource-management-system-X-hackathon" }
      ],
      tech: "React.js, Node.js, MongoDB, Express.js",
      points: [
        "Developed a full-stack HRMS with employee management, attendance tracking, payroll, and role-based access modules within 8 hours during a virtual hackathon.",
        "Collaborated remotely to design and deliver a scalable solution under strict time constraints."
      ]
    },
    {
      name: "Rental Platform",
      tag: "[Open Source Contribution]",
      duration: "March 2025 - April 2025",
      links: [
        { label: "Live-Demo", url: "https://youtu.be/AbQmcTB_wi8" },
        { label: "GitHub", url: "https://github.com/codinggita/borrowly" },
        { label: "Pull Request", url: "http://github.com/codinggita/borrowly/pull/22" }
      ],
      tech: "React.js, Node.js, Express.js, MongoDB",
      points: [
        "Enhanced a clothing and accessories rental platform by adding product ratings, reviews, and a delivery-enabled checkout system.",
        "Implemented 1–5 star ratings, written reviews, and improved checkout flow with delivery detail collection."
      ]
    }
  ],
  figma: [
    { name: "Team/Personal Management Design", url: "https://www.figma.com/design/3IMO60zfBer1J8ZciEVyI4/Untitled?node-id=0-1&t=K2cuzgicBCNNANao-1" },
    { name: "FreshMart-Grocery Shopping App UI", url: "https://www.figma.com/design/MGKhDAgvV7yW8T6qMuap1N/Untitled?node-id=0-1&t=X6SbQGBwhszkjl0h-1" },
    { name: "Fashion Design-Clothing Store UI", url: "https://www.figma.com/design/1ji291Y1KmM2B76AUF58kA/Untitled?node-id=0-1&t=TjcXDUCvVZxuT9OE-1" },
    { name: "AI Mirror-AI Chatbot UI", url: "https://www.figma.com/design/piATVvho8lgpKSg2guw9HO/ai-mirror-project?node-id=0-1&t=InMFAO7Fn4xtgctL-1" },
    { name: "CodingGita Clone", url: "https://www.figma.com/design/puOmTG41Sl7ZGCokjpWkTk/Untitled?node-id=0-1&t=gwmaGIE0AZJh2hgo-1" }
  ],
  achievements: [
    { text: "DevQuest 2025 Sri Lanka : Top 10", link: "https://res.cloudinary.com/dupn61m8m/image/upload/v1767799472/WhatsApp_Image_2025-12-18_at_12.43.39_PM_rwxv2n.jpg" }
  ],
  education: [
    {
      institution: "Rai University X CodingGita",
      degree: "Bachelor of Technology in Computer Science",
      duration: "2024 – 2028 | CGPA: 9.63/10"
    }
  ],
  certificates: [
    { name: "Basics of Azure Services", link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODUzNjMxN184ODAyMDk3MTc1MTExODIyMzMxMC5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4621%2FIntroduction%2520to%2520the%2520Basics%2520of%2520Azure%2520Services%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1380895717508203191&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVNzZPr3QqzPAxj0yyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAPEySqT8AAAA%3D" },
    { name: "Azure Fundamentals", link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzI4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzODg2NF83NzcwMjQ0MTc0OTMwMDA0MDk1My5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F4225%2FAzure%2520Fundamentals%2Fcertificate%2Fdownload-skillup&%24web_only=true&_branch_match_id=1530091012537136964&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVN0oNdEz2dvc2j0yyrytKTUstKsrMS49PKsovL04tsnVNSU8FADSlI2g9AAAA" },
    { name: "Introduction to C++ - Sololearn", link: "https://www.sololearn.com/certificates/CC-NNDXKENC" },
    { name: "Introduction to JavaScript - Sololearn", link: "https://www.sololearn.com/certificates/CC-FB25QUL9" },
  ],
  skills: {
    languages: "JavaScript, C++ ,React.js, HTML5, CSS3, Tailwind CSS, Material UI, Redux Toolkit",
    backend: "Node.js, Express.js, MongoDB, Mongoose, RESTful APIs, Cloudinary, JWT, Bcrypt",
    tools: "Git, GitHub, Postman, Vercel, Netlify, Render"
  }
}

export default function ResumePage() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground font-sans py-12 px-4 shadow-inner">

      {/* Controls */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-end gap-2 print:hidden">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1 shadow-sm">
          <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))} data-text="ZOOM_OUT" className="p-1 hover:bg-muted rounded">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-muted-foreground">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(2, z + 0.1))} data-text="ZOOM_IN" className="p-1 hover:bg-muted rounded">
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <a
          href="https://drive.google.com/drive/folders/1qyHEYYK-gw7cKhdiVQ7lPWtI7mbbNz_d"
          target="_blank"
          rel="noopener noreferrer"
          data-text="DOWNLOAD"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" /> Download PDF
        </a>
      </div>

      {/* Resume Paper */}
      <div
        className="max-w-[210mm] mx-auto bg-card text-card-foreground shadow-2xl p-[10mm] min-h-[297mm] origin-top transition-transform duration-200 border border-border"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Header */}
        <header className="text-center mb-8 border-b-2 border-foreground pb-6">
          <h1 className="text-4xl font-serif font-bold text-foreground tracking-wide mb-2">
            {resumeData.header.name}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <a href={`mailto:${resumeData.header.email}`} className="hover:underline hover:text-primary flex items-center gap-1">
              ✉ {resumeData.header.email}
            </a>
            <span className="text-border">|</span>
            <a href={`tel:${resumeData.header.phone}`} className="hover:underline hover:text-primary flex items-center gap-1">
              📞 {resumeData.header.phone}
            </a>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column (Main Content) */}
          <div className="col-span-12 md:col-span-8 space-y-8 pr-4">

            {/* Experience */}
            <section>
              <h2 className="text-xl font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Experience</h2>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-foreground">{exp.company}</h3>
                    <span className="font-bold text-sm text-foreground">{exp.duration}</span>
                  </div>
                  <div className="flex gap-3 text-sm text-primary mb-2">
                    {exp.links.map((link, j) => (
                      <a key={j} href={link.url} className="hover:underline hover:text-primary/80">{link.label}</a>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
                    {exp.points.map((pt, k) => (
                      <li key={k}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xl font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Projects</h2>
              {resumeData.projects.map((proj, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg text-primary">
                      {proj.name} <span className="text-muted-foreground text-sm font-normal italic ml-2">{proj.tag}</span>
                    </h3>
                    <span className="font-bold text-sm text-foreground">{proj.duration}</span>
                  </div>
                  <div className="flex gap-2 text-sm mb-2 text-foreground">
                    <span className="font-bold mr-1">Links --</span>
                    {proj.links.map((link, j) => (
                      <a key={j} href={link.url} className="text-primary hover:underline hover:text-primary/80 mr-2">{link.label}</a>
                    ))}
                  </div>
                  <div className="text-sm mb-2 text-foreground">
                    <span className="font-bold">Tech Stack:</span> {proj.tech}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
                    {proj.points.map((pt, k) => (
                      <li key={k}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Figma */}
            <section>
              <h2 className="text-xl font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Figma - UI/UX</h2>
              <ul className="space-y-1">
                {resumeData.figma.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground font-medium">
                    <span className="text-foreground">•</span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline decoration-muted underline-offset-2 hover:text-primary transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="col-span-12 md:col-span-4 space-y-8 border-l border-border pl-8">

            {/* Social Links */}
            <section className="space-y-3">
              <a href={resumeData.header.linkedinUrl} target="_blank" data-text="LINKEDIN" className="flex items-center gap-3 text-muted-foreground hover:text-primary group">
                <div className="w-6 h-6 bg-foreground text-background rounded flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground">in</div>
                <span className="underline underline-offset-2">{resumeData.header.linkedin}</span>
              </a>
              <a href={resumeData.header.leetcodeUrl} target="_blank" data-text="LEETCODE" className="flex items-center gap-3 text-muted-foreground hover:text-primary group">
                <div className="w-6 h-6 flex items-center justify-center font-bold text-lg leading-none">L</div>
                <span className="underline underline-offset-2">{resumeData.header.leetcode}</span>
              </a>
              <a href={resumeData.header.githubUrl} target="_blank" data-text="GITHUB" className="flex items-center gap-3 text-muted-foreground hover:text-foreground group">
                <Github className="w-6 h-6" />
                <span className="underline underline-offset-2">{resumeData.header.github}</span>
              </a>
              <a href={resumeData.header.portfolioUrl} target="_blank" data-text="PORTFOLIO" className="flex items-center gap-3 text-muted-foreground hover:text-primary group">
                <div className="w-6 h-6 bg-foreground text-background rounded flex items-center justify-center text-xs group-hover:bg-primary group-hover:text-primary-foreground">Pf</div>
                <span className="underline underline-offset-2">{resumeData.header.portfolio}</span>
              </a>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-lg font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Achievements</h2>
              <ul className="space-y-3">
                {resumeData.achievements.map((ach, i) => (
                  <li key={i}>
                    <a href={ach.link} className="text-primary hover:underline text-sm leading-tight block">
                      {ach.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-lg font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Education</h2>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold text-sm text-foreground">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground mt-1">{edu.duration}</p>
                </div>
              ))}
            </section>

            {/* Certificates */}
            <section>
              <h2 className="text-lg font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Certificates</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                {resumeData.certificates.map((cert, i) => (
                  <li key={i}>
                    <span className="italic border-b border-border">{cert.name}</span>
                  </li>
                ))}
                <li className="list-none -ml-5 mt-2">
                  <strong className="text-foreground">View all certifications: </strong>
                  <a href="#" className="text-primary hover:underline">Link</a>
                </li>
              </ul>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-bold border-b-2 border-foreground pb-1 mb-4 tracking-wider uppercase text-foreground">Skill</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-bold italic mb-1 text-foreground">• Languages & Frameworks</h3>
                  <p className="text-muted-foreground leading-relaxed">{resumeData.skills.languages}</p>
                </div>
                <div>
                  <h3 className="font-bold italic mb-1 text-foreground">• Backend & Databases:</h3>
                  <p className="text-muted-foreground leading-relaxed">{resumeData.skills.backend}</p>
                </div>
                <div>
                  <h3 className="font-bold italic mb-1 text-foreground">• Tools & Platforms:</h3>
                  <p className="text-muted-foreground leading-relaxed">{resumeData.skills.tools}</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
