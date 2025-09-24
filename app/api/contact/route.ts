import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body?.name || "").trim()
    const email = String(body?.email || "").trim()
    const subject = String(body?.subject || "New message from contact form").trim()
    const message = String(body?.message || "").trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com"
    const port = Number(process.env.SMTP_PORT || 465)
    const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!user || !pass) {
      return NextResponse.json(
        { error: "Email service is not configured. Missing SMTP_USER/SMTP_PASS envs." },
        { status: 500 },
      )
    }

    const to = process.env.CONTACT_TO || user
    const from = process.env.CONTACT_FROM || `Portfolio Contact <${user}>`

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background:#f7f7f8; padding:12px; border-radius:8px;">${escapeHtml(message)}</div>
        <hr />
        <p style="color:#666; font-size:12px;">Sent from your portfolio contact form.</p>
      </div>
    `

    await transporter.sendMail({
      from,
      to,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html,
      replyTo: email,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("/api/contact error", err)
    return NextResponse.json({ error: err?.message || "Failed to send message" }, { status: 500 })
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
