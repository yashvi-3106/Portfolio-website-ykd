"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground">
            I’d love to hear about your project or questions. Send me a message and I’ll reply as soon as I can.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:col-span-1">
            <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-6">Feel free to reach out through the form or use the details below.</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><Mail className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:yashvidholakiya.cg@gmail.com" className="text-foreground hover:underline">yashvidholakiya.cg@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><Phone className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+919825164868" className="text-foreground hover:underline">+91 98251 64868</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-6">Send a Message</h2>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Your Name</label>
                  <Input name="name" placeholder="John Doe" value={form.name} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Email</label>
                  <Input name="email" type="email" placeholder="john@example.com" value={form.email} onChange={onChange} required />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Subject</label>
                <Input name="subject" placeholder="How can I help you?" value={form.subject} onChange={onChange} />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                <Textarea name="message" placeholder="Write your message here..." rows={6} value={form.message} onChange={onChange} required />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={submitting} className="inline-flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
