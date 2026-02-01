"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Award, Calendar, ExternalLink, Download, Sparkles, MapPin, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

const BentoCard = ({ children, className = "", delay = 0, onClick }: { children: React.ReactNode, className?: string, delay?: number, onClick?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay
    }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`bg-card/80 text-card-foreground border border-border/50 rounded-[2.5rem] p-6 shadow-xl hover:border-primary/20 transition-all group overflow-hidden relative cursor-pointer ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

const certificates = [
  {
    id: 1,
    title: "Azure Fundamentals",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542698/Screenshot_2026-01-16_112124_memztr.png",
    description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzI4IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzODg2NF83NzcwMjQ0MTc0OTMwMDA0MDk1My5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 2,
    title: "Getting Started with Amazon DocumentDB",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542747/Screenshot_2026-01-16_112223_pldguf.png",
    description: "Introduction to Amazon DocumentDB (with MongoDB compatibility), a fast, scalable, highly available, and fully managed document database service.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDkwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM1NDQ0Ml83NzcwMjQ0MTc0NzQ3MTMwMzAxMS5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 3,
    title: "Getting Started with Gateway Load Balancer",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542782/Screenshot_2026-01-16_112300_zsn1kd.png",
    description: "Overview of Gateway Load Balancer and how it helps you deploy, scale, and manage your third-party virtual appliances.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NTg2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODUzNjEwN184NzIwNjc4MTc2NTI4MzYyODU2MS5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 4,
    title: "GitHub Copilot Fundamentals",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542822/Screenshot_2026-01-16_112339_zo70re.png",
    description: "Fundamental concepts of GitHub Copilot and how to use it to write code faster and with less work.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0ODc2IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM3NTEwNF84NzIwNjc4MTc0NzkxMjU1Njc2OC5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 5,
    title: "Introduction to the Basics of Azure Services",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542858/Screenshot_2026-01-16_112413_sjrfo7.png",
    description: "Introduction to the basics of Azure services, including computing, networking, storage, and databases.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMDEwIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODUzNjMxN184ODAyMDk3MTc1MTExODIyMzMxMC5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 6,
    title: "Deep Dive on Container Security",
    issuer: "Simplilearn",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542903/Screenshot_2026-01-16_112458_wavow6.png",
    description: "Deep dive into container security concepts, best practices, and tools to secure your containerized applications.",
    verificationUrl: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0NDk1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODQzOTIwNl84ODAyMDk3MTc1MTExMzY5NTQzNy5wbmciLCJ1c2VybmFtZSI6Illhc2h2aSBEaG9sYWtpeWEifQ%3D%3D",
  },
  {
    id: 7,
    title: "Introduction to C++",
    issuer: "Sololearn",
    date: "2023",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768542956/Screenshot_2026-01-16_112553_y16u2g.png",
    description: "Foundational concepts of C++ programming language.",
    verificationUrl: "https://www.sololearn.com/certificates/CC-NNDXKENC",
  },
  {
    id: 8,
    title: "Introduction to JavaScript",
    issuer: "Sololearn",
    date: "2023",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543014/Screenshot_2026-01-16_112650_s31wom.png",
    description: "Core concepts of JavaScript programming language.",
    verificationUrl: "https://www.sololearn.com/certificates/CC-FB25QUL9",
  },
  {
    id: 9,
    title: "React (Basic)",
    issuer: "HackerRank",
    date: "2024",
    image: "https://res.cloudinary.com/dupn61m8m/image/upload/v1768543050/Screenshot_2026-01-16_112726_gva5gl.png",
    description: "To clear the assessment, one must have a good understanding of React, including components, props, state, and hooks.",
    verificationUrl: "https://www.hackerrank.com/certificates/2c8d22c1f205",
  },
]

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)

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
              VERIFIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">EXPERTISE</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
              Third-party validation of <span className="text-foreground font-medium">technical competencies</span> across cloud and web ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 shadow-lg"
          >
            <Award className="w-4 h-4 animate-bounce" />
            Integrity Check Passed
          </motion.div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, index) => (
            <BentoCard
              key={cert.id}
              delay={index * 0.05}
              onClick={() => setSelectedCertificate(cert)}
              className="p-0 !rounded-[2.5rem]"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                <div className="absolute top-6 right-6 p-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="p-8 text-left space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{cert.title}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded uppercase">{cert.date}</span>
                </div>
                <p className="text-primary font-black uppercase tracking-widest text-[10px]">{cert.issuer}</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light line-clamp-2">{cert.description}</p>

                <div className="pt-4 border-t border-border/20 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Digital Credential</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Modal / Certificate Detail */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-border/50 rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-muted/50 rounded-full hover:bg-primary hover:text-white transition-all shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:h-auto relative bg-muted">
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain p-8 md:p-12"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-left space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Award className="w-6 h-6" />
                    <span className="text-xs font-black uppercase tracking-[0.3em]">{selectedCertificate.issuer}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">{selectedCertificate.title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/30">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Issue Date</p>
                    <p className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {selectedCertificate.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Authenticity</p>
                    <p className="font-bold flex items-center gap-2 text-emerald-500"><MapPin className="w-4 h-4" /> Global Verified</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  {selectedCertificate.description}
                </p>

                <a
                  href={selectedCertificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Verify Credentials <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
