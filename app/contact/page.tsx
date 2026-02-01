"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Sparkles, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    className={`bg-card/80 text-card-foreground border border-border/50 rounded-[2.5rem] p-8 shadow-xl hover:border-primary/20 transition-all group overflow-hidden relative ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing fields", description: "Name, email and message are required.", variant: "destructive" })
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send message")
      toast({ title: "Message sent", description: "Thanks for reaching out. I'll get back to you soon." })
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      toast({ title: "Failed to send", description: err.message || "Please try again later.", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

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
              CONTACT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">CHANNEL</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
              Initiate a <span className="text-foreground font-medium">direct bridge</span> for collaboration, inquiries, or technical discourse.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] px-6 py-3 bg-primary/10 text-primary rounded-full border border-primary/20 shadow-lg glow-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Sparkles className="w-4 h-4 animate-pulse ml-1" />
            System Reachable
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Contact Info Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <BentoCard delay={0.1}>
              <div className="space-y-8 text-left">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Email Terminal</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Official Registry</p>
                  <a href="mailto:yashvidholakiya.cg@gmail.com" className="text-xl font-bold hover:text-primary transition-colors">
                    yashvidholakiya.cg@gmail.com
                  </a>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.2}>
              <div className="space-y-8 text-left">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Voice Portal</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Direct Line</p>
                  <a href="tel:+919825164868" className="text-xl font-bold hover:text-primary transition-colors">
                    +91 98251 64868
                  </a>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.3}>
              <div className="space-y-8 text-left">
                <div className="flex items-center gap-3 border-b border-border/20 pb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">Physical Node</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Deployment Zone</p>
                  <p className="text-xl font-bold">Gujarat, India</p>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Contact Form Main */}
          <BentoCard className="md:col-span-8" delay={0.4}>
            <div className="space-y-12">
              <div className="flex items-center gap-3 border-b border-border/20 pb-4 text-left">
                <Send className="w-5 h-5 text-primary" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">New Transmission</h3>
              </div>

              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Entity Name</label>
                    <Input
                      name="name"
                      placeholder="IDENTIFY YOURSELF"
                      value={form.name}
                      onChange={onChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-2xl h-14 font-bold tracking-tight px-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Digital Address</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="EMAIL@DOMAIN.COM"
                      value={form.email}
                      onChange={onChange}
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50 rounded-2xl h-14 font-bold tracking-tight px-6"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Subject Vector</label>
                  <Input
                    name="subject"
                    placeholder="PURPOSE OF CONTACT"
                    value={form.subject}
                    onChange={onChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 rounded-2xl h-14 font-bold tracking-tight px-6"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Data Payload</label>
                  <Textarea
                    name="message"
                    placeholder="ENTER YOUR MESSAGE HERE..."
                    rows={6}
                    value={form.message}
                    onChange={onChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 rounded-[2rem] font-bold tracking-tight p-6 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
                  >
                    {submitting ? "UPLOADING..." : "SEND_MESSAGE"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </BentoCard>

        </div>

        {/* Footer Link Page */}
        <div className="pt-24 flex justify-center">
          <Link href="/" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all">
            RETURN_TO_CORE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
