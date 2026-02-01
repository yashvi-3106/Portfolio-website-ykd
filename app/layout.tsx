import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Navigation from "@/components/navigation"
import { Suspense } from "react"
import RootShell from "@/components/RootShell"
import SmoothScroll from "@/components/SmoothScroll"
import CustomCursor from "@/components/CustomCursor"
import "./globals.css"

export const metadata: Metadata = {
  title: "Yashvi Dholakiya - Developer Portfolio",
  description: "Full-stack developer portfolio showcasing projects, skills, and experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CustomCursor />
        <Suspense fallback={<div>Loading...</div>}>
          <RootShell>
            {/* Native Scroll for performance isolation */}
            <Navigation />
            <main className="pt-16">{children}</main>
            <Analytics />
          </RootShell>
        </Suspense>
      </body>
    </html>
  )
}
